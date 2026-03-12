import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';

export function BadgeDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'GSAP', 'a11y']);

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="default">Default</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="accent"
            removable
            onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
          >
            {tag}
          </Badge>
        ))}
        {tags.length === 0 && (
          <button
            type="button"
            onClick={() => setTags(['React', 'TypeScript', 'GSAP', 'a11y'])}
            className="text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            Reset tags
          </button>
        )}
      </div>
    </div>
  );
}
