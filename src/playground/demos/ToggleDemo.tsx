import { useState } from 'react';
import { Toggle } from '../../components/ui/Toggle';

export function ToggleDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="flex flex-col gap-5">
      <Toggle
        label="Push notifications"
        description="Receive alerts when someone mentions you."
        checked={notifications}
        onChange={setNotifications}
      />
      <Toggle
        label="Dark mode"
        description="Switch between light and dark themes."
        checked={darkMode}
        onChange={setDarkMode}
      />
      <Toggle
        label="Auto-save"
        description="Automatically save changes every 30 seconds."
        checked={autoSave}
        onChange={setAutoSave}
        disabled
      />
    </div>
  );
}
