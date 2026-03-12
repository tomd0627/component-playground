import { useState } from 'react';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';

export function ProgressBarDemo() {
  const [upload, setUpload] = useState(68);

  function randomize() {
    setUpload(Math.floor(Math.random() * 101));
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm">
      <ProgressBar label="Upload progress" value={upload} variant="default" />
      <ProgressBar label="Storage used" value={82} variant="warning" />
      <ProgressBar label="Tests passing" value={95} variant="success" />
      <ProgressBar label="Disk health" value={23} variant="danger" />
      <Button variant="outline" size="sm" onClick={randomize} className="self-start">
        Randomize upload
      </Button>
    </div>
  );
}
