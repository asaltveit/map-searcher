'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreateAlertForm } from './CreateAlertForm';

interface CreateAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

export function CreateAlertDialog({ open, onOpenChange, onCreated }: CreateAlertDialogProps) {
  const handleCreated = () => {
    onOpenChange(false);
    onCreated();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create News Alert</DialogTitle>
          <DialogDescription>
            Set up a recurring search for news articles in a specific region.
          </DialogDescription>
        </DialogHeader>
        <CreateAlertForm onCreated={handleCreated} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}

interface CreateAlertDialogTriggerProps {
  onOpenChange: (open: boolean) => void;
}

export function CreateAlertDialogTrigger({ onOpenChange }: CreateAlertDialogTriggerProps) {
  return (
    <Button onClick={() => onOpenChange(true)} size="sm">
      New Alert
    </Button>
  );
}
