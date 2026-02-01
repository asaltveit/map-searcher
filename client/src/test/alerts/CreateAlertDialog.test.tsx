import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateAlertDialog, CreateAlertDialogTrigger } from '@/components/alerts/CreateAlertDialog';

describe('CreateAlertDialog', () => {
  it('renders dialog when open', () => {
    render(
      <CreateAlertDialog
        open={true}
        onOpenChange={vi.fn()}
        onCreated={vi.fn()}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Create News Alert')).toBeInTheDocument();
    expect(screen.getByText(/Set up a recurring search/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <CreateAlertDialog
        open={false}
        onOpenChange={vi.fn()}
        onCreated={vi.fn()}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when close button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <CreateAlertDialog
        open={true}
        onOpenChange={onOpenChange}
        onCreated={vi.fn()}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders form fields', () => {
    render(
      <CreateAlertDialog
        open={true}
        onOpenChange={vi.fn()}
        onCreated={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/search query/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/region/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max articles/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/frequency/i)).toBeInTheDocument();
  });
});

describe('CreateAlertDialogTrigger', () => {
  it('renders trigger button', () => {
    render(<CreateAlertDialogTrigger onOpenChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: /new alert/i })).toBeInTheDocument();
  });

  it('calls onOpenChange with true when clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<CreateAlertDialogTrigger onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: /new alert/i }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
