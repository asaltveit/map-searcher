'use client';

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ExternalLink, MapPin, Calendar, User, Search, Loader2, MessageCircle, Mic, MessageSquare } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { chatWithArticles } from '@/lib/api';
import { PipecatChat } from './PipecatChat';
import type { AlertDetail, AlertArticle } from '@/lib/api';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ArticlePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: AlertDetail | null;
  loading?: boolean;
}

export function ArticlePanel({ open, onOpenChange, alert, loading }: ArticlePanelProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [showPipecatChat, setShowPipecatChat] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  console.log(`[PANEL] ArticlePanel RENDER - open=${open}, loading=${loading}, alertId=${alert?.id}, articleCount=${alert?.articles?.length || 0}`);
  if (!loading && alert?.articles && alert.articles.length === 0) {
    console.warn(`[PANEL] ArticlePanel NO ARTICLES - query="${alert.query}", region="${alert.region}"`);
  }

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Reset chat when alert changes
  useEffect(() => {
    setChatMessages([]);
    setChatInput('');
  }, [alert?.id]);

  const handleSendMessage = async () => {
    console.log(`[PANEL] handleSendMessage START - chatInput="${chatInput}", alertId=${alert?.id}, chatLoading=${chatLoading}`);

    if (!chatInput.trim() || !alert?.id || chatLoading) {
      console.log(`[PANEL] handleSendMessage EARLY RETURN - trim=${!!chatInput.trim()}, hasAlertId=${!!alert?.id}, chatLoading=${chatLoading}`);
      return;
    }

    const userMessage = chatInput.trim();
    console.log(`[PANEL] handleSendMessage - userMessage="${userMessage.substring(0, 50)}..."`);

    setChatInput('');
    setChatMessages((prev) => {
      console.log(`[PANEL] adding user message, new count=${prev.length + 1}`);
      return [...prev, { role: 'user', content: userMessage }];
    });
    setChatLoading(true);
    console.log(`[PANEL] calling API for alertId=${alert.id}`);

    try {
      const response = await chatWithArticles(alert.id, userMessage);
      console.log(`[PANEL] API returned agentId=${response.agentId}, responseLength=${response.response.length}`);

      setChatMessages((prev) => {
        console.log(`[PANEL] adding assistant message, new count=${prev.length + 1}`);
        return [...prev, { role: 'assistant', content: response.response }];
      });
    } catch (error) {
      console.error('[PANEL] Chat API error:', error instanceof Error ? error.message : String(error));
      console.error('[PANEL] Full error:', error);

      setChatMessages((prev) => {
        console.log(`[PANEL] adding error message`);
        return [
          ...prev,
          { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
        ];
      });
    } finally {
      setChatLoading(false);
      console.log(`[PANEL] handleSendMessage DONE`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log(`[PANEL] handleKeyDown - key=${e.key}, shiftKey=${e.shiftKey}`);
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle>
                {loading ? (
                  <Skeleton className="h-6 w-48" />
                ) : (
                  <>
                    {console.log(`[PANEL] SheetTitle displaying - query="${alert?.query}"`)}
                    {alert?.query ?? 'Alert Articles'}
                  </>
                )}
              </SheetTitle>
              <SheetDescription>
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <>
                    {console.log(`[PANEL] SheetDescription displaying - region="${alert?.region}"`)}
                    {alert?.region ?? ''}
                  </>
                )}
              </SheetDescription>
            </div>
            {alert && !loading && (
              <Button
                onClick={() => setShowPipecatChat(!showPipecatChat)}
                variant={showPipecatChat ? 'default' : 'outline'}
                size="sm"
                className="ml-2 shrink-0"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* Scrollable content area */}
        {showPipecatChat && alert?.id ? (
          <PipecatChat alertId={alert.id} onClose={() => setShowPipecatChat(false)} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto mt-6 space-y-4" ref={chatContainerRef}>
              {/* Articles list */}
              {loading ? (
                <>
                  {console.log(`[PANEL] ArticlePanel LOADING state`)}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ArticleSkeleton key={i} />
                  ))}
                </>
              ) : alert?.articles && alert.articles.length > 0 ? (
                <>
                  {console.log(`[PANEL] ArticlePanel DISPLAYING ${alert.articles.length} articles`)}
                  {alert.articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </>
              ) : (
                <>
                  {console.log(`[PANEL] ArticlePanel EMPTY state - no articles found`)}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
                    No articles found for this alert.
                  </p>
                </>
              )}

              {/* Chat messages */}
              {chatMessages.length > 0 && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-4 space-y-3">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Chat</p>
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`text-sm rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-zinc-100 dark:bg-zinc-800 ml-4'
                          : 'bg-teal-50 dark:bg-teal-900/20 mr-4'
                      }`}
                    >
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                        {msg.role === 'user' ? 'You' : 'Assistant'}
                      </p>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="bg-teal-50 dark:bg-teal-900/20 mr-4 rounded-lg p-3">
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                        Assistant
                      </p>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Chat input - fixed at bottom */}
            {alert && !loading && alert.articles && alert.articles.length > 0 && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                  Chat with your alert&apos;s articles below.
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about the selected alert's articles..."
                      disabled={chatLoading}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                    />
                  </div>
                  <Button
                    onClick={() => setShowPipecatChat(true)}
                    variant="outline"
                    size="icon"
                    className="shrink-0 h-10 w-10"
                    title="Use voice chat"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || chatLoading}
                    className="bg-teal-700 hover:bg-teal-800 text-white shrink-0 gap-2 px-4"
                  >
                    {chatLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  Use the mic to speak your question.
                </p>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ArticleCard({ article }: { article: AlertArticle }) {
  const publishedDate = article.publishedAt
    ? format(new Date(article.publishedAt), 'MMM d, yyyy')
    : null;

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-sm leading-tight line-clamp-2">
          {article.title}
        </h3>
        <Button
          variant="ghost"
          size="icon-xs"
          asChild
          className="shrink-0"
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open article"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      {article.summary && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {article.summary}
        </p>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1">
          <span className="font-medium">{article.source}</span>
        </span>
        {publishedDate && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {publishedDate}
          </span>
        )}
        {article.author && (
          <span className="inline-flex items-center gap-1">
            <User className="h-3 w-3" />
            {article.author}
          </span>
        )}
        {article.locationCount > 0 && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {article.locationCount} location{article.locationCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {article.sentiment && (
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full ${
            article.sentiment === 'positive'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : article.sentiment === 'negative'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
          }`}
        >
          {article.sentiment}
        </span>
      )}
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-12 w-full" />
      <div className="flex gap-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  );
}
