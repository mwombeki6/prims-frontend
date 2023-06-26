"use client";

import {
  Button,
  Card,
  Container,
  FileInput,
  Group,
  NumberInput,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import React, { useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { ResearchUploaded } from "./researchUploaded";

export const Research = () => {
  const [searchValue, onSearchChange] = useState("");

  const [file] = useState(null);

  const [updated, setUpdated] = useState(false);

  const form = useForm({
    initialValues: {
      research_name: "",
      abstract: "",
      category: "",
      research_file: file,
      research_duration: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/research/upload-research`,
        body,
        config
      );

      if (res.status === 201) {
        setUpdated(!updated);
      }
    } catch (err) {}
  };

  return (
    <div>
      <Container
        px="sm"
        h={'auto'}
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
        <Container size="70rem" px="xs">
          <Card withBorder shadow={"xl"} radius={"lg"}>
            <Group>
              <Title
                variant="gradient"
                //gradient={{ from: 'black', to: 'blue', deg: 45 }}
                sx={{ fontFamily: "Greycliff CF" }}
                ta="center"
                fz="xl"
                fw={700}
                order={3}
              >
                Research information
              </Title>
            </Group>
            <Space h={20} />
            <form onSubmit={onSubmit}>
              <Stack>
                <Group grow>
                  <TextInput
                    radius={"md"}
                    size="md"
                    placeholder="research name"
                    label="Research name"
                    {...form.getInputProps("research_name")}
                  />
                  <Select
                    radius={"md"}
                    size="md"
                    label="Category"
                    data={[
                      { value: 'computer-engineering', label: 'computer-engineering'},
                      { value: 'mining', label: 'mining'},
                      { value: 'mechanical-engineering', label: "mechanical-engineering"},
                     
                    ]}
                    //value={category}
                    placeholder="category"
                    //onChange={onCategoryChange}
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    {...form.getInputProps("category")}
                  />
                </Group>

                <Group grow>
                  <NumberInput
                    radius={"md"}
                    size="md"
                    description="(in_months format)"
                    //defaultValue={18}
                    placeholder="eg. 13"
                    label="Research duration"
                    {...form.getInputProps("research_duration")}
                  />

                  <FileInput
                    radius={"md"}
                    size="md"
                    accept=".pdf, .docx"
                    label="File"
                    description="(upload research file)"
                    placeholder="...click to upload research file"
                    aria-label="your innovation file"
                    {...form.getInputProps("research_file")}
                    icon={<IconUpload color="blue" size={rem(18)} />}
                  />
                </Group>

                <Group grow>
                  <Textarea
                    label="Abstract"
                    description="(description)"
                    autosize
                    minRows={2}
                    maxRows={4}
                    radius={"md"}
                    size="md"
                    {...form.getInputProps("abstract")}
                  />
                </Group>

                <Group>
                  <Button type="submit" variant="outline">
                    Upload
                  </Button>
                </Group>
              </Stack>
            </form>
          </Card>
          <Space h={40}/>
          <ResearchUploaded image={undefined} title={undefined} description={undefined} stats={undefined}/>
        </Container>
      </Container>
    </div>
  );
};
