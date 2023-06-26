import {
  Card,
  Avatar,
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
  Menu,
  rem,
  Flex,
  SimpleGrid,
} from "@mantine/core";

import {
  IconDots,
  IconEye,
  IconFilePlus,
  IconNotebook,
  IconUpload,
} from "@tabler/icons-react";

const avatars = [
  "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
];

export function TaskCard() {
  return (
    <SimpleGrid
      cols={2}
      breakpoints={[
        { maxWidth: "62rem", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "36rem", cols: 1, spacing: "sm" },
      ]}
    >
      <Card withBorder padding="lg" radius="md" shadow="lg">
        <Group position="apart">
          <IconNotebook type="mark" size="2rem" />

          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconEye size={rem(14)} />} color="blue">
                Preview all
              </Menu.Item>
              <Menu.Item icon={<IconFilePlus size={rem(14)} />} color="green">
                New Research
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Text fz="lg" fw={600} mt="md">
          Research
        </Text>
        <Text fz="sm" c="dimmed" mt={5}>
          0 research
        </Text>
        <div className="flex">
          <div className="">
            <Text c="dimmed" fz="sm" mt="md">
              Research completed:{" "}
              <Text
                span
                fw={500}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark" ? theme.white : theme.black,
                })}
              >
                0/0
              </Text>
            </Text>

            <Progress value={(0 / 0) * 100} mt={5} />

            <Text c="dimmed" fz="sm" mt="md" color="green">
              Research passed:{" "}
              <Text
                span
                fw={500}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark" ? theme.white : theme.black,
                })}
              >
                0/0
              </Text>
            </Text>

            <Progress
              value={(0 / 0) * 100}
              mt={5}
              //style={{ backgroundColor: "seagreen" }}
            />
          </div>

          <div></div>
        </div>
        {/**<Group position="apart" mt="md">
        <Avatar.Group spacing="sm">
          <Avatar src={avatars[0]} radius="xl" />
          <Avatar src={avatars[1]} radius="xl" />
          <Avatar src={avatars[2]} radius="xl" />
          <Avatar radius="xl">+5</Avatar>
        </Avatar.Group>
        <ActionIcon variant="default">
          <IconUpload size="1.1rem" />
        </ActionIcon>
        </Group>*/}
      </Card>
    </SimpleGrid>
  );
}
