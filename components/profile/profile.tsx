"use client";

import {
  Avatar,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Highlight,
  Paper,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import { Tab } from "./tabs";

export const Profile = () => {
  return (
    <div className="b bg-slate-600">
      <Container
        px="sm"
        my={-60}
        h={924}
        fluid={true}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: "start",
          padding: theme.spacing.xl,
          //borderRadius: theme.radius.md,
          cursor: "pointer",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <Container color="red" size="60rem" px={0}>
          <Paper radius="lg" shadow="xl" p="lg" withBorder>
            <Group spacing="lg">
              <Avatar variant="outline" radius="xl" size="xl" color="indigo" />{" "}
              <Space w={50} />{" "}
              <Stack>
                <Flex><div className="text-3xl font-extralight">mwombeki</div></Flex>
                <Flex>
                  <div className="flex space-x-1">
                    <div className="font-black">0</div>
                    <div className="font-light">research</div>
                  </div>

                  <Space w={40} />
                  <div className="flex space-x-1">
                    <div className="font-extrabold ">0</div>
                    <div className="font-light">publications</div>
                  </div>

                  <Space w={40} />
                  <div className="flex space-x-1">
                    <div className="font-extrabold ">0</div>
                    <div className="font-light">innovations</div>
                  </div>
                </Flex>
                <div className="text-lg font-bold">erick mwombeki.</div>
              </Stack>
              <Space w={100} />
            </Group>
            <Space h={20} />
            
            <Space h={70} />
            <Tab />
          </Paper>

          <Space h={15} />

          <Card radius="lg" shadow="xl" withBorder>
            hellen
          </Card>
        </Container>
      </Container>
    </div>
  );
};
