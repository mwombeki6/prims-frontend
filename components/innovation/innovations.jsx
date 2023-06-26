import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  RingProgress,
  rem,
  Paper,
  SimpleGrid,
  Spoiler,
  Badge,
} from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PSPDFKit from "pspdfkit";

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

async function getInnovationFiles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/innovation/get-innovations`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch innovations data");
  }

  return res.json();
}

export const Innovations = ({ image, title, description, stats }) => {
  const { classes } = useStyles();

  //const data = getInnovationFiles();
  //const [fileData, setFileData] = useState(null);
  const [innovationFile, setInnovation] = useState([]);
  const [pdfInstance, setPdfInstance] = useState(null);

  useEffect(() => {
    getInnovationFiles()
      .then((data) => setInnovation(data))
      .catch((error) => console.error(error));
  }, []);

  

  return (
    <div>
      <Card shadow="lg" className={classes.card}>
        <Text color="blue.5" weight={"bold"}>
          Your innovations:{" "}
        </Text>
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
          {innovationFile.map((innovation) => (
            <Card key={innovation.id} className={classes.item} shadow="lg">
              <Card.Section>
                <Image
                  src={innovation.innovation_file}
                  alt={title}
                  height={100}
                />
              </Card.Section>

              {innovation.innovation_file}
              <div id="pdf-container" style={{ height: "600px" }}></div>

              <Group position="apart" mt="xl">
                <Text fz="sm" fw={700} className={classes.title} color="blue.9">
                  {innovation.innovation_name}
                </Text>
                <Badge variant="outline"> {innovation.status}</Badge>
              </Group>

              <Spoiler
                maxHeight={120}
                showLabel="Show more"
                hideLabel="Hide"
                transitionDuration={1000}
              >
                {" "}
                <Text mt="sm" mb="md" c="dimmed" fz="xs">
                  {innovation.abstract}
                </Text>
              </Spoiler>

              <Card.Section className={classes.footer}>
              view
              </Card.Section>
            </Card>
          ))}
        </SimpleGrid>
      </Card>
    </div>
  );
};
