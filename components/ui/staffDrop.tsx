"use client";

import { Avatar, Menu, Text } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconLogout,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useAppDispatch } from "@/app/hooks";
import { logoutStaff } from "@/clients/staffClient";

export function StaffDrop() {
  const dispatch = useAppDispatch();

  return (
    <Menu
      shadow="md"
      width={250}
      trigger="hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <Avatar
          size="sm"
          radius="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
      </Menu.Target>
      {/* ... menu items */}
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item icon={<IconUser stroke={2} color="green" size={20} />}>
          Profile
        </Menu.Item>
        <Menu.Item icon={<IconSettings color="yellow" size={20} />}>
          Settings
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle color="blue" size={20} />}>
          Messages
        </Menu.Item>
        <Menu.Item icon={<IconPhoto color="purple" size={20} />}>
          Gallery
        </Menu.Item>
        <Menu.Item
          icon={<IconSearch color="orange" size={20} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight color="violet" size={20} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item
          onClick={() => dispatch(logoutStaff())}
          color="red"
          icon={<IconLogout size={20} />}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}