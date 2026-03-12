import { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(true)}>
        Delete item
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="modal-name">
              Display name
            </label>
            <input
              id="modal-name"
              type="text"
              defaultValue="Tom DeLuca"
              className="w-full px-3 py-2 rounded-lg text-sm bg-surface border border-border text-text-primary focus:outline-2 focus:outline-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="modal-role">
              Role
            </label>
            <input
              id="modal-role"
              type="text"
              defaultValue="Senior Front-End Developer"
              className="w-full px-3 py-2 rounded-lg text-sm bg-surface border border-border text-text-primary focus:outline-2 focus:outline-accent"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Save changes</Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete this item?"
        description="This action cannot be undone. The item will be permanently removed."
      >
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(false)}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
