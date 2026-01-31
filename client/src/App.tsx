import { useState, useRef, useCallback } from 'react';
import type { Map as MapLibreMap } from 'maplibre-gl';
import * as api from './api';
import { runWorkflow } from './workflow';
import { MapView } from './MapView';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentIds, setAgentIds] = useState<api.AgentIds | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const announceRef = useRef<((msg: string) => void) | null>(null);

  const onMapReady = useCallback((map: MapLibreMap) => {
    mapRef.current = map;
  }, []);

  const loadAgents = useCallback(async () => {
    try {
      const ids = await api.getAgents();
      setAgentIds(ids);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load agents');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    if (!agentIds) {
      setError('Agents not loaded. Check backend and try again.');
      return;
    }

    setInput('');
    setLoading(true);
    setError(null);
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content: text }]);

    try {
      const { researchMessages, mapMessages, error: err } = await runWorkflow({
        userMessage: text,
        agentIds,
        map: mapRef.current,
        announceMap: (msg) => announceRef.current?.(msg),
        onMessages: () => {},
      });

      if (err) {
        setError(err);
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: `Error: ${err}` }]);
      } else {
        const assistantContent = (mapMessages as { message_type?: string; content?: string }[])
          .filter((m) => m.message_type === 'assistant_message' && m.content)
          .map((m) => m.content)
          .join('\n\n');
        if (assistantContent) {
          setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: assistantContent }]);
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Workflow failed';
      setError(msg);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: `Error: ${msg}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>Weave Hacks – Research & Map</h1>
        <p>Ask for research and a map (e.g. “Route between museums in Portland”). Results appear on the map and in chat.</p>
        {!agentIds ? (
          <button type="button" onClick={loadAgents} className="btn">
            Load agents
          </button>
        ) : (
          <span className="status">Agents ready</span>
        )}
      </header>

      {error && (
        <div role="alert" className="error">
          {error}
        </div>
      )}

      <MapView onMapReady={onMapReady} announceRef={announceRef} />

      <section aria-label="Chat" className="chat-section">
        <h2>Chat</h2>
        <ul className="message-list">
          {messages.map((m) => (
            <li key={m.id} className={`message message--${m.role}`}>
              <span className="message-role">{m.role}</span>
              <span className="message-content">{m.content}</span>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="chat-form">
          <label htmlFor="chat-input">Message</label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Research museums in Portland and show a route on the map"
            disabled={loading || !agentIds}
            aria-describedby="chat-hint"
          />
          <span id="chat-hint" className="hint">
            Say or type what you want to search; the map updates with results.
          </span>
          <button type="submit" disabled={loading || !input.trim() || !agentIds} className="btn">
            {loading ? 'Working…' : 'Send'}
          </button>
        </form>
      </section>
    </main>
  );
}
