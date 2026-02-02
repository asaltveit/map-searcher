'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, Send, Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PipecatClient } from '@pipecat-ai/client-js';

import { DailyTransport } from '@pipecat-ai/daily-transport';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface PipecatChatProps {
  alertId: string;
  onClose?: () => void;
}

export function PipecatChat({ alertId }: PipecatChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const clientRef = useRef<PipecatClient | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Pipecat client
  useEffect(() => {
    const initClient = async () => {
      try {
        const client = new PipecatClient({
          transport: new DailyTransport(),
          enableMic: false,
          enableCam: false,
        });

        // Handle incoming text from the bot
        client.on('botLlmText', (data: { text: string }) => {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: data.text,
              timestamp: Date.now(),
            },
          ]);
        });

        client.on('connected', () => {
          console.log('[PIPECAT] Connected to bot');
          setIsConnected(true);
          setIsConnecting(false);
        });

        client.on('disconnected', () => {
          console.log('[PIPECAT] Disconnected from bot');
          setIsConnected(false);
          setIsConnecting(false);
          setIsMicEnabled(false);
        });

        client.on('error', (error) => {
          console.error('[PIPECAT] Error:', error);
          setIsConnecting(false);
        });

        clientRef.current = client;
      } catch (error) {
        console.error('[PIPECAT] Failed to initialize client:', error);
      }
    };

    initClient();

    return () => {
      if (clientRef.current?.connected) {
        clientRef.current.disconnect();
      }
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const connect = async () => {
    if (!clientRef.current || isConnecting) return;

    setIsConnecting(true);
    try {
      await clientRef.current.startBotAndConnect({
        endpoint: `${process.env.NEXT_PUBLIC_API_URL || '/api'}/pipecat/connect`,
        requestData: {
          alertId,
        },
      });
    } catch (error) {
      console.error('[PIPECAT] Connection failed:', error);
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (!clientRef.current) return;

    try {
      await clientRef.current.disconnect();
      setIsMicEnabled(false);
    } catch (error) {
      console.error('[PIPECAT] Disconnect failed:', error);
    }
  };

  const toggleMic = async () => {
    if (!clientRef.current || !isConnected) return;

    try {
      if (isMicEnabled) {
        clientRef.current.enableMic(false);
        setIsMicEnabled(false);
      } else {
        clientRef.current.enableMic(true);
        setIsMicEnabled(true);
      }
    } catch (error) {
      console.error('[PIPECAT] Mic toggle failed:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !clientRef.current || !isConnected) return;

    const userMessage = input.trim();

    // Add user message to display
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userMessage,
        timestamp: Date.now(),
      },
    ]);

    setInput('');
    setIsLoading(true);

    try {
      // Send message to bot via text transport
      clientRef.current.sendClientMessage('send-text', { text: userMessage });
    } catch (error) {
      console.error('[PIPECAT] Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-sm">Voice Chat Assistant</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        <div className="flex gap-2">
          {isConnected ? (
            <>
              <Button
                onClick={toggleMic}
                size="sm"
                variant={isMicEnabled ? 'default' : 'outline'}
                className="text-xs"
              >
                {isMicEnabled ? (
                  <Mic className="h-3.5 w-3.5 mr-1.5" />
                ) : (
                  <MicOff className="h-3.5 w-3.5 mr-1.5" />
                )}
                {isMicEnabled ? 'Mic On' : 'Mic Off'}
              </Button>
              <Button
                onClick={disconnect}
                size="sm"
                variant="destructive"
                className="text-xs"
              >
                <PhoneOff className="h-3.5 w-3.5 mr-1.5" />
                End Call
              </Button>
            </>
          ) : (
            <Button
              onClick={connect}
              size="sm"
              disabled={isConnecting}
              className="text-xs bg-teal-600 hover:bg-teal-700"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  Start Call
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !isConnected && (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                Connect to start voice chat
              </p>
              <Button
                onClick={connect}
                disabled={isConnecting}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isConnecting ? 'Connecting...' : 'Start Voice Chat'}
              </Button>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md text-sm rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-teal-600 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg p-3 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {isConnected && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type or speak..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
