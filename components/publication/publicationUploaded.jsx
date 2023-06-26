import { Card, Group, Paper, SimpleGrid, Spoiler, createStyles, rem, Text, Badge } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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


async function getPublicationFiles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/publication/get-publications`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch publications data");
  }

  return res.json();
}


export const PublicationUploaded = ({
  image,
  title,
  description,
  stats,
}) => {
  const { classes } = useStyles();
  const [publicationFile, setPublication] = useState([]);

  useEffect(() => {
    getPublicationFiles()
      .then((data) => setPublication(data))
      .catch((error) => console.error(error));

   
  }, []);


  return (
    <div>
      <Paper withBorder h={900} p={20}>
        <Group>Your Publications:</Group>
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
          {publicationFile.map((publication) => (
            <Card key={publication.id} className={classes.item} shadow="lg">
              <Card.Section>
                <Image
                  src={publication.innovation_file}
                  alt={publication.title}
                  height={100}
                />
              </Card.Section>

              <Group position="apart" mt="xl">
                <Text fz="sm" fw={700} className={classes.title} color="blue.9">
                  {publication.innovation_name}
                </Text>
                <Badge variant="outline"> {publication.status}</Badge>
              </Group>

              <Spoiler
                maxHeight={120}
                showLabel="Show more"
                hideLabel="Hide"
                transitionDuration={1000}
              >
                {" "}
                <Text mt="sm" mb="md" c="dimmed" fz="xs">
                  {publication.abstract}
                </Text>
              </Spoiler>

              <Card.Section className={classes.footer}>
                view
              </Card.Section>
            </Card>
          ))}
        </SimpleGrid>
      </Paper>
    </div>
  );
};
