'use client';

import { format } from 'date-fns';
import { ExternalLink, MapPin, Calendar, User } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { AlertDetail, AlertArticle } from '@/lib/api';

interface ArticlePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: AlertDetail | null;
  loading?: boolean;
}

export function ArticlePanel({ open, onOpenChange, alert, loading }: ArticlePanelProps) {
  console.log(`[PANEL] ArticlePanel RENDER - open=${open}, loading=${loading}, alertId=${alert?.id}, articleCount=${alert?.articles?.length || 0}`);
  if (!loading && alert?.articles && alert.articles.length === 0) {
    console.warn(`[PANEL] ArticlePanel NO ARTICLES - query="${alert.query}", region="${alert.region}"`);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
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
        </SheetHeader>

        <div className="mt-6 space-y-4">
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
        </div>
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
