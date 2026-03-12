import { Tooltip } from '../../components/ui/Tooltip';
import { Button } from '../../components/ui/Button';

export function TooltipDemo() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Tooltip content="Appears above the trigger" placement="top">
          <Button variant="outline" size="sm">Top</Button>
        </Tooltip>
        <Tooltip content="Appears below the trigger" placement="bottom">
          <Button variant="outline" size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip content="Appears to the left" placement="left">
          <Button variant="outline" size="sm">Left</Button>
        </Tooltip>
        <Tooltip content="Appears to the right" placement="right">
          <Button variant="outline" size="sm">Right</Button>
        </Tooltip>
      </div>
      <div className="flex gap-4 items-center">
        <Tooltip content="Keyboard accessible — try Tab + focus">
          <Button variant="ghost" size="sm">Hover or focus me</Button>
        </Tooltip>
      </div>
    </div>
  );
}
