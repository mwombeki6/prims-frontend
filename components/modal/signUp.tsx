"use client";

import { useDisclosure } from "@mantine/hooks";
import NextLink from "next/link";

import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Modal,
  useMantineTheme,
} from "@mantine/core";

export default function SignUpModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        variant='outlined'
        size={"xl"}
        opened={opened}
        onClose={close}
        title="Authentication"
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        centered
      >
        {/* Modal content */}
        <Grid justify="space-around">
          <Grid.Col style={{ maxWidth: 550 }} sm={6} xs={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Sudent account creation</Text>
                <Badge color="pink" variant="light">
                  Student
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                Register your details here if Student of DIT Institute Provide
                your personal credentials, account details and institute details
              </Text>

              <NextLink href={"/studentSignUp"}>
                <Button
                  onClick={close}
                  variant="light"
                  color="blue"
                  mt="md"
                  radius="md"
                >
                  Sign up as Student!
                </Button>
              </NextLink>
            </Card>
          </Grid.Col>
          <Grid.Col style={{ maxWidth: 550 }} sm={6} xs={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Staff account creation</Text>
                <Badge color="pink" variant="light">
                  Staff
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                Register your details here if Student of DIT Institute Provide
                your personal credentials, account details and institute details
              </Text>

              <NextLink href={"/staffSignUp"}>
                <Button
                  onClick={close}
                  variant="light"
                  color="blue"
                  mt="md"
                  radius="md"
                >
                  Sign up as Staff!
                </Button>
              </NextLink>
            </Card>
          </Grid.Col>
        </Grid>
      </Modal>

      <Group position="center">
        <Button onClick={open}>SignUp</Button>
      </Group>
    </>
  );
}
