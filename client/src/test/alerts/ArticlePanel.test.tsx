import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArticlePanel } from '@/components/alerts/ArticlePanel';
import type { AlertDetail } from '@/lib/api';

const mockAlert: AlertDetail = {
  id: '1',
  query: 'robberies',
  region: 'Savannah, GA',
  maxArticles: 20,
  frequency: 'DAILY',
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  articles: [
    {
      id: 'a1',
      url: 'https://example.com/article1',
      title: 'Test Article 1',
      author: 'John Doe',
      source: 'Test News',
      publishedAt: '2024-01-15T10:00:00Z',
      summary: 'This is a test summary for article 1.',
      sentiment: 'negative',
      locationCount: 2,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 'a2',
      url: 'https://example.com/article2',
      title: 'Test Article 2',
      source: 'Another Source',
      publishedAt: '2024-01-14T10:00:00Z',
      locationCount: 1,
      createdAt: '2024-01-14T10:00:00Z',
    },
  ],
};

describe('ArticlePanel', () => {
  it('renders when open with alert data', () => {
    render(
      <ArticlePanel
        open={true}
        onOpenChange={vi.fn()}
        alert={mockAlert}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('robberies')).toBeInTheDocument();
    expect(screen.getByText('Savannah, GA')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ArticlePanel
        open={false}
        onOpenChange={vi.fn()}
        alert={mockAlert}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders article cards', () => {
    render(
      <ArticlePanel
        open={true}
        onOpenChange={vi.fn()}
        alert={mockAlert}
      />
    );

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    expect(screen.getByText('Test News')).toBeInTheDocument();
    expect(screen.getByText('Another Source')).toBeInTheDocument();
  });

  it('renders article metadata', () => {
    render(
      <ArticlePanel
        open={true}
        onOpenChange={vi.fn()}
        alert={mockAlert}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('This is a test summary for article 1.')).toBeInTheDocument();
    expect(screen.getByText('negative')).toBeInTheDocument();
    expect(screen.getByText('2 locations')).toBeInTheDocument();
    expect(screen.getByText('1 location')).toBeInTheDocument();
  });

  it('renders external links for articles', () => {
    render(
      <ArticlePanel
        open={true}
        onOpenChange={vi.fn()}
        alert={mockAlert}
      />
    );

    const links = screen.getAllByRole('link', { name: /open article/i });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/article1');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/article2');
  });

  it('shows loading skeletons when loading', () => {
    render(
      <ArticlePanel
        open={true}
        onOpenChange={vi.fn()}
        alert={null}
        loading={true}
      />
    );

    // Should show skeleton loaders
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows empty message when no articles', () => {
    const alertWithNoArticles: AlertDetail = {
      ...mockAlert,
      articles: [],
    };

    render(
      <ArticlePanel
        open={true}
        onOpenChange={vi.fn()}
        alert={alertWithNoArticles}
      />
    );

    expect(screen.getByText(/no articles found/i)).toBeInTheDocument();
  });

  it('calls onOpenChange when close button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <ArticlePanel
        open={true}
        onOpenChange={onOpenChange}
        alert={mockAlert}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
