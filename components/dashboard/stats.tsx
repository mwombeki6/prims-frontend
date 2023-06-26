import {
  createStyles,
  Group,
  SimpleGrid,
  Text,
  rem,
  Card,
} from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 0.1)`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  deno: {
    fontSize: rem(15),
    fontWeight: 500,
    lineHeight: 1.5,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

interface StatsGridProps {
  data: {
    title: string;
    icon: keyof typeof icons;
    value: string;
    diff: number;
  }[];
}

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

export function StatsGrid() {
  const { classes } = useStyles();
  const [innovationFile, setInnovation] = useState([]);
  const [publicationFile, setPublication] = useState([]);
  const [researchFile, setResearch] = useState([]);

 /* useEffect(() => {
    getInnovationFiles()
      .then((data) => setInnovation(data))
      .catch((error) => console.error(error));

    getPublicationFiles()
      .then((data) => setPublication(data))
      .catch((error) => console.error(error));

    getResearchFiles()
      .then((data) => setResearch(data))
      .catch((error) => console.error(error));
  }, []);*/

  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        <Card withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              RESEARCH
            </Text>
            <IconReceipt2 />
          </Group>

          <Group align="flex-end" spacing="xs" mt={25}>
            <Text className={classes.value}>0</Text>
            <Text className={classes.deno}>research</Text>
            <Text color={"teal"} fz="sm" fw={500} className={classes.diff}>
              <span>0%</span>
            </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
            Research submitted so far!
          </Text>
        </Card>

        <Card withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              PUBLICATION
            </Text>
            <IconReceipt2 />
          </Group>

          <Group align="flex-end" spacing="xs" mt={25}>
            <Text className={classes.value}>0</Text>
            <Text className={classes.deno}>publish papers</Text>
            <Text color={"teal"} fz="sm" fw={500} className={classes.diff}>
              <span>0%</span>
            </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
            Publication submitted so far!
          </Text>
        </Card>

        <Card withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              INNOVATION
            </Text>
            <IconReceipt2 />
          </Group>

          <Group align="flex-end" spacing="xs" mt={25}>
            <Text className={classes.value}>0</Text>
            <Text className={classes.deno}>innovation</Text>
            <Text color={"teal"} fz="sm" fw={500} className={classes.diff}>
              <span>0%</span>
            </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
            Innovation submitted so far!
          </Text>
        </Card>
      </SimpleGrid>
    </div>
  );
}
