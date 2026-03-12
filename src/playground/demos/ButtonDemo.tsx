import { Button } from '../../components/ui/Button';

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button loading>Saving…</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
