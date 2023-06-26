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
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

async function getUser() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/student/get_user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "include",
    }
  );
  const user = await res.json();
  console.log(user);
  return user;
}



export const StudentProfile = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/get_user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": cookies.get("csrftoken"),
          },
          credentials: "include",
        })
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('error fetching data: ', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="">
      <Container
        px="sm"
        h={924}
        fluid={true}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
          textAlign: "start",
          padding: theme.spacing.xl,
          //borderRadius: theme.radius.md,
        })}
      >
        <Container color="red" size="60rem" px={0}>
          <Paper radius="lg" shadow="xl" p="lg" withBorder>
            <Group spacing="lg">
              <Avatar variant="outline" radius="xl" size="xl" color="indigo" />{" "}
              <Space w={50} />{" "}
              <Stack>
                <Flex>
                  <div className="text-3xl font-extralight">
                    {data.username}
                  </div>
                </Flex>
                <Flex>
                  <div className="flex space-x-1">
                    <div className="font-black">1000</div>
                    <div className="font-light">research</div>
                  </div>

                  <Space w={40} />
                  <div className="flex space-x-1">
                    <div className="font-extrabold ">1000</div>
                    <div className="font-light">publications</div>
                  </div>

                  <Space w={40} />
                  <div className="flex space-x-1">
                    <div className="font-extrabold ">1000</div>
                    <div className="font-light">innovations</div>
                  </div>
                </Flex>
                <div className="flex">
                  <div className="font-bold font-mono text-lg">
                    {data.first_name}
                  </div>
                  <Space w={5} />
                  <div className="font-bold font-mono text-lg">
                    {data.last_name}
                  </div>
                </div>
              </Stack>
              <Space w={100} />
            </Group>
            <Space h={60} />
            <Paper radius="lg" shadow="xl" p="lg" withBorder>
              <Group position="apart">
                <div className="text-lg font-bold text-white font-mono">
                  Profile information
                </div>
              </Group>
              <Space h={30} />
              <div className="flex">
                <div className="font-extrabold text-white font-mono">
                  Full Name:
                </div>
                <Space w={10} />
                <div className="font-light font-mono">{data.first_name}</div>
                <Space w={5} />
                <div className="font-light font-mono">{data.last_name}</div>
              </div>
              <Space h={10} />
              <div className="flex">
                <div className="font-extrabold text-white font-mono">
                  Username:
                </div>
                <Space w={10} />
                <div className="font-light font-mono">{data.username}</div>
              </div>
              <Space h={10} />
              <div className="flex">
                <div className="font-extrabold text-white font-mono">
                  Email:
                </div>
                <Space w={10} />

                <div className="font-light">{data.email}</div>
              </div>
              <Space h={10} />
              <div className="flex">
                <div className="font-extrabold text-white font-mono">
                  Department:
                </div>
                <Space w={10} />
                <div className="font-light">{data.department}</div>
              </div>
              <Space h={10} />
              <div className="flex">
                <div className="font-extrabold text-white font-mono">
                  Title:
                </div>
                <Space w={10} />
                <div className="font-light">{data.class_course}</div>
              </div>
              <Space h={10} />
              <div className="flex">
                <div className="font-extrabold text-white font-mono">
                  Student reg number:
                </div>
                <Space w={10} />
                <div className="font-light">{data.student_reg}</div>
              </div>
            </Paper>
            <Space h={40} />
          </Paper>

          <Space h={15} />
        </Container>
      </Container>
    </div>
  );
};
