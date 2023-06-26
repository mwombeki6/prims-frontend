"use client";

import {
  Container,
  Box,
  Text,
  Title,
  Center,
  Highlight,
  Button,
  Flex,
  Space,
} from "@mantine/core";
import React, { useEffect } from "react";
import Cards from "../ui/Grid";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { checkAuth } from "@/clients/studentClient";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { IconLocationFilled, IconLogin } from "@tabler/icons-react";

const HomePage = () => {
  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 1.0,
        duration: 1.75,
      }}
      className="header-content"
    >
      <Container
        my={-80}
        px="sm"
        h="auto"
        //h={924}
        fluid={true}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          //textAlign: "center",
          padding: theme.spacing.xl,
          //borderRadius: theme.radius.md,
          //cursor: "pointer",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[1],
          },
        })}
      >
        <Center maw={1100} h={100} mx="auto" my={290}>
          <Title order={1}>
            <Highlight
              highlight={[
                "featured",
                //"PRIMS",
                "researchers",
                "",
                "publishers",
                "innovators",
              ]}
              color="white"
              highlightStyles={(theme) => ({
                backgroundImage: theme.fn.linearGradient(
                  45,
                  //theme.colors.cyan[8],
                  theme.colors.cyan[5],
                  theme.colors.indigo[3]
                ),
                fontWeight: 900,
                fontSize: 74,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              })}
            >
              PRIMS-platform for researchers, publishers and innovators
            </Highlight>
          </Title>
        </Center>

        <Center maw={1100} h={100} mx="auto" my={-120}>
          <Container maw={1100} size="70rem" px={0} mr={300}>
            <Title
              order={3}
              fw={500}
              sx={{
                // or anywhere else
                fontFamily: "Greycliff CF, sans-serif",
              }}
            >
              Build and showcase vast of researches, publications and
              innovations – PRIMS includes a set of interfaces that powers up
              academias, publishers and innovators to setup and upload their
              projects
            </Title>
          </Container>
        </Center>

        <Container size="75rem" px={0} mr={300}>
          <Center inline h={100} mx="auto" my={130}>
            <Button
              leftIcon={<IconLocationFilled />}
              variant="outline"
              size="lg"
            >
              Explore
            </Button>
            <Space w={"sm"} />
            <Button leftIcon={<IconLogin />} variant="default" size="lg">
              Login
            </Button>
          </Center>
        </Container>
      </Container>
    </motion.div>
  );
};

export default HomePage;
