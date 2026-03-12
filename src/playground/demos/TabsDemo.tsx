import { Tabs, TabList, Tab, TabPanel } from '../../components/ui/Tabs';

export function TabsDemo() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultTab="overview">
        <TabList label="Project sections">
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>
        <TabPanel id="overview">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            This is the overview panel. Navigate between tabs using arrow keys — full roving tabindex and ARIA tabs pattern.
          </p>
        </TabPanel>
        <TabPanel id="activity">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Recent activity would appear here. Tab trigger state is communicated via <code className="text-[var(--color-accent)] text-xs">aria-selected</code>.
          </p>
        </TabPanel>
        <TabPanel id="settings">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Settings panel. Each panel is linked to its tab via <code className="text-[var(--color-accent)] text-xs">aria-controls</code> and <code className="text-[var(--color-accent)] text-xs">aria-labelledby</code>.
          </p>
        </TabPanel>
      </Tabs>
    </div>
  );
}
