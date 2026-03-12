import { ToastProvider, useToast } from '../../components/ui/Toast';
import { Button } from '../../components/ui/Button';

function ToastButtons() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button variant="outline" size="sm" onClick={() => toast('Profile updated successfully.', 'success')}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast('Your session expires in 5 minutes.', 'warning')}>
        Warning
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast('Failed to save changes. Try again.', 'danger')}>
        Error
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast('New message from Alex Chen.')}>
        Default
      </Button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButtons />
    </ToastProvider>
  );
}
