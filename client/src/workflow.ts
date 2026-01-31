/**
 * Workflow runner: research agent → update shared block → map agent.
 * Handles approval requests by executing research tools (API) or map tools (map instance + announcer).
 */
import * as api from './api';
import { researchClientTools, mapClientTools } from './client-tools';
import { executeMapTool } from './mapTools';
import type { Map as MapLibreMap } from 'maplibre-gl';

type MessageLike = {
  message_type?: string;
  content?: string;
  tool_call?: { name: string; arguments: string; tool_call_id: string };
};

export type RunWorkflowOptions = {
  userMessage: string;
  agentIds: api.AgentIds;
  map: MapLibreMap | null;
  announceMap: (msg: string) => void;
  onMessages?: (messages: MessageLike[]) => void;
};

export async function runWorkflow(options: RunWorkflowOptions): Promise<{ researchMessages: MessageLike[]; mapMessages: MessageLike[]; error?: string }> {
  const { userMessage, agentIds, map, announceMap, onMessages } = options;
  const researchMessages: MessageLike[] = [];
  const mapMessages: MessageLike[] = [];

  try {
    // Step 1: Research agent
    let response = await api.sendMessage(agentIds.researchAgentId, {
      messages: [{ role: 'user', content: userMessage }],
      client_tools: researchClientTools,
    });

    const pushResearch = (r: { messages?: unknown[] }) => {
      if (r.messages) researchMessages.push(...(r.messages as MessageLike[]));
      onMessages?.(researchMessages);
    };
    pushResearch(response);

    while (response.stop_reason === 'requires_approval') {
      const approvalMsg = (response.messages as MessageLike[]).find((m) => m.message_type === 'approval_request_message');
      if (!approvalMsg?.tool_call) {
        break;
      }
      const { name, arguments: argsStr, tool_call_id } = approvalMsg.tool_call;
      let tool_return = '';
      let status: 'success' | 'error' = 'success';
      try {
        const args = JSON.parse(argsStr || '{}');
        if (name === 'search_stored_research') {
          const q = String(args.query ?? '');
          const results = await api.searchResearch(q);
          tool_return = JSON.stringify(results.slice(0, 20));
        } else if (name === 'save_research') {
          const { content, source_url, title } = args;
          await api.saveResearch({ content: String(content ?? ''), source_url: String(source_url ?? ''), title: args.title != null ? String(args.title) : undefined });
          tool_return = 'Saved.';
        } else {
          tool_return = `Unknown tool: ${name}`;
          status = 'error';
        }
      } catch (e) {
        tool_return = e instanceof Error ? e.message : 'Tool failed';
        status = 'error';
      }

      response = await api.sendMessage(agentIds.researchAgentId, {
        messages: [
          {
            type: 'approval',
            approvals: [{ type: 'tool', tool_call_id, tool_return, status }],
          },
        ],
        client_tools: researchClientTools,
      });
      pushResearch(response);
    }

    // Update shared block with last assistant content for map agent context
    const lastAssistant = (response.messages as MessageLike[]).slice().reverse().find((m) => m.message_type === 'assistant_message' && (m as { content?: string }).content);
    const summary = lastAssistant && typeof (lastAssistant as { content?: string }).content === 'string' ? (lastAssistant as { content: string }).content : 'Research completed. Create a map from the research in your context.';
    await api.updateBlock(agentIds.researchBlockId, summary);

    // Step 2: Map agent
    response = await api.sendMessage(agentIds.mapAgentId, {
      messages: [
        {
          role: 'user',
          content: `Create a map from the research in your context. Add point layers for places (circle or symbol), a line layer for any route between stops in order, then set_map_view to fit the data. Use human-readable layerName for each layer. Coordinates must be [longitude, latitude].`,
        },
      ],
      client_tools: mapClientTools,
    });

    const pushMap = (r: { messages?: unknown[] }) => {
      if (r.messages) mapMessages.push(...(r.messages as MessageLike[]));
      onMessages?.(mapMessages);
    };
    pushMap(response);

    while (response.stop_reason === 'requires_approval' && map) {
      const approvalMsg = (response.messages as MessageLike[]).find((m) => m.message_type === 'approval_request_message');
      if (!approvalMsg?.tool_call) break;
      const { name, arguments: argsStr, tool_call_id } = approvalMsg.tool_call;
      let tool_return = '';
      let status: 'success' | 'error' = 'success';
      try {
        const args = JSON.parse(argsStr || '{}');
        const result = executeMapTool(map, name, args, announceMap);
        tool_return = result.tool_return;
        status = result.status;
      } catch (e) {
        tool_return = e instanceof Error ? e.message : 'Map tool failed';
        status = 'error';
      }

      response = await api.sendMessage(agentIds.mapAgentId, {
        messages: [
          {
            type: 'approval',
            approvals: [{ type: 'tool', tool_call_id, tool_return, status }],
          },
        ],
        client_tools: mapClientTools,
      });
      pushMap(response);
    }

    return { researchMessages, mapMessages };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Workflow failed';
    return { researchMessages, mapMessages, error };
  }
}
