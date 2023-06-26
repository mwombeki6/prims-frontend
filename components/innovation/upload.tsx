"use client";

import {
  Card,
  Paper,
  UnstyledButton,
  createStyles,
  rem,
  Text,
  Group,
  SimpleGrid,
  Anchor,
  TextInput,
  Select,
  FileInput,
  Space,
  Button,
} from "@mantine/core";
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCoin,
  IconCashBanknote,
} from "@tabler/icons-react";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useForm } from "@mantine/form";
import { uploadInnovation } from "@/clients/studentClient";
import { useAppDispatch } from "@/app/hooks";

const cookies = new Cookies();

const mockdata = [
  { title: "Credit cards", icon: IconCreditCard, color: "violet" },
  { title: "Banks nearby", icon: IconBuildingBank, color: "indigo" },
  { title: "Transfers", icon: IconRepeat, color: "blue" },
  { title: "Refunds", icon: IconReceiptRefund, color: "green" },
  { title: "Receipts", icon: IconReceipt, color: "teal" },
  { title: "Taxes", icon: IconReceiptTax, color: "cyan" },
  { title: "Reports", icon: IconReport, color: "pink" },
  { title: "Payments", icon: IconCoin, color: "red" },
  { title: "Cashback", icon: IconCashBanknote, color: "orange" },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));

export const UploadInnovation = () => {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  const dispatch = useAppDispatch();
  const [searchValue, onSearchChange] = useState("");

  const [file] = useState(null);

  const [updated, setUpdated] = useState(false);

  const form = useForm({
    initialValues: {
      innovation_name: "",
      abstract: "",
      category: "",
      innovation_file: file,
    },
  });

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    const body = form.values;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/innovation/upload-innovation`,
        body,
        config
      );

      if (res.status === 201) {
        setUpdated(!updated);
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-5">
      <Card withBorder radius="md" className={classes.card} shadow="xl">
        <Group position="apart">
          <Text className={classes.title}>Upload your Innovation</Text>
          <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            + innovation
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md" className="">
          <form onSubmit={onSubmit}>
            <Select
              withAsterisk
              label="Category"
              data={[
                { value: '1', label: 'mining'},
                { value: '2', label: 'computer-engineering'},
                { value: '3', label: "mechanical-engineering"},
                { value: '4', label: "bioTechnology"}
              ]}
              //value={category}
              placeholder="category"
              //onChange={onCategoryChange}
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              {...form.getInputProps("category")}
            />
            <TextInput
              withAsterisk
              label="Innovation title"
              placeholder="title of innovation"
              //value={innovation_name}
              //onChange={onInnovationNameChange}
              {...form.getInputProps("innovation_name")}
            />
            <TextInput
              withAsterisk
              label="Abstract"
              placeholder="abstract of the innovation"
              //value={innovation_name}
              //onChange={onInnovationNameChange}
              {...form.getInputProps("abstract")}
            />
            <FileInput
              required
              accept=".pdf, .docx"
              label="Your file"
              placeholder="Your innovation file"
              aria-label="your innovation file"
              {...form.getInputProps("innovation_file")}
              icon={<IconUpload size={rem(14)} />}
            />
            <Space h={"xl"} />
            <Button
              type="submit"
              variant="outline"
              //onClick={handleUpload}
            >
              Upload
            </Button>
          </form>
          

        </SimpleGrid>
      </Card>

      {/** <Paper shadow="xl" p={"md"} withBorder className={classes.card}>
        <Card withBorder radius="md" className={classes.card} shadow="xl">
          <Group position="apart">
            <Text className={classes.title}>Services</Text>
            <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
              + 21 other services
            </Anchor>
          </Group>
          <SimpleGrid cols={3} mt="md">
            {items}
          </SimpleGrid>
        </Card>
      </Paper>*/}
    </div>
  );
};
