import {
  Group,
  Paper,
  createStyles,
  Text,
  SimpleGrid,
  Card,
  Spoiler,
  rem,
  Badge
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
  item: {
    //display: "flex",
    //flexDirection: "column",
    //alignItems: "center",
    justifyContent: "center",
    //textAlign: "center",
    borderRadius: theme.radius.md,
    //height: rem(90),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[2],
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: theme.shadows.lg,
      transform: "scale(1.01)",
    },
  },
}));

async function getResearchFiles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/research/get-researches`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch research data");
  }

  return res.json();
}

export const ResearchUploaded = ({
  image,
  title,
  description,
  stats,
}) => {
  const { classes } = useStyles();
  const [researchFile, setResearch] = useState([]);

  useEffect(() => {
    getResearchFiles()
      .then((data) => setResearch(data))
      .catch((error) => console.error(error));


  }, []);

  return (
    <div>
      <Paper withBorder h={900} p={20}>
        <Group>Your Researches:</Group>

        <SimpleGrid
          cols={4}
          mt="md"
          spacing="xl"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          
          {researchFile.map((research) => (
            <Card key={research.id} className={classes.item} shadow="lg">
              <Card.Section>
                <Image src={research.research_file} alt={title} height={100} />
              </Card.Section>

              <Group position="apart" mt="xl">
                <Text fz="sm" fw={700} className={classes.title} color="blue.9">
                  {research.research_name}
                </Text>
                <Badge variant="outline"> {research.status}</Badge>
              </Group>

              <Spoiler
                maxHeight={120}
                showLabel="Show more"
                hideLabel="Hide"
                transitionDuration={1000}
              >
                {" "}
                <Text mt="sm" mb="md" c="dimmed" fz="xs">
                  {research.abstract}
                </Text>
              </Spoiler>

              <Card.Section className={classes.footer}>
                View
              </Card.Section>
            </Card>
          ))}
        </SimpleGrid>
      </Paper>
    </div>
  );
};
