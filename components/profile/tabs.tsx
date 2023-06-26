import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

export const Tab = () => {
  return (
    <Tabs color='indigo' variant="outline" defaultValue="gallery">
      <Tabs.List grow>
        <Tabs.Tab value="gallery" icon={<IconPhoto size="1.2rem" color='red' />}>Research</Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconMessageCircle size="1.2rem" color='green' />}>Publications</Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconSettings size="1.2rem" color='blue' />}>Innovations</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        Research tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Publication tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Innovation tab content
      </Tabs.Panel>
    </Tabs>
  );
}
