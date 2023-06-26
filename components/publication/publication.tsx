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
import { PublicationUploaded } from "./publicationUploaded";

export const Publication = () => {
  const [searchValue, onSearchChange] = useState("");

  const [file] = useState(null);

  const [updated, setUpdated] = useState(false);

  const form = useForm({
    initialValues: {
      publication_name: "",
      abstract: "",
      category: "",
      published_file: file,
      pages: "",
      publisher: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/publication/upload-publication`,
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
        {" "}
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
                Publication information
              </Title>
            </Group>
            <Space h={20} />
            <form onSubmit={onSubmit}>
              <Stack>
                <Group grow>
                  <TextInput
                    radius={"md"}
                    size="md"
                    placeholder="eg. Rust-server chat rooms"
                    label="Publication name"
                    {...form.getInputProps("publication_name")}
                  />
                  <Select
                    radius={"md"}
                    size="md"
                    label="Category"
                    data={[
                      { value: 'mining', label: 'mining'},
                      { value: 'computer-engineering', label: 'computer-engineering'},
                      { value: 'mechanical-engineering', label: "mechanical-engineering"},
                      { value: 'bioTechnology', label: "bioTechnology"}
                    ]}
                    //value={category}
                    placeholder="...pick your category"
                    //onChange={onCategoryChange}
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    {...form.getInputProps("category")}
                    clearable
                    allowDeselect
                  />
                </Group>

                <Group grow>
                  <NumberInput
                    radius={"md"}
                    size="md"
                    description="(no. of pages the publication contains)"
                    //defaultValue={18}
                    placeholder="eg. 450"
                    label="Pages"
                    {...form.getInputProps("pages")}
                  />

                  <FileInput
                    radius={"md"}
                    size="md"
                    accept=".pdf, .docx"
                    label="File"
                    description="(upload publication file/doc)"
                    placeholder="...click to upload publication doc/pdf"
                    aria-label="your publication file"
                    {...form.getInputProps("published_file")}
                    icon={<IconUpload color="blue" size={rem(18)} />}
                  />
                </Group>

                <Group grow>
                  <Textarea
                    label="Abstract"
                    description="(publication description summary)"
                    autosize
                    minRows={2}
                    maxRows={4}
                    radius={"md"}
                    size="md"
                    {...form.getInputProps("abstract")}
                  />

                  <TextInput
                    radius={"md"}
                    size="md"
                    placeholder="eg. Serexon Inc Publisher"
                    label="Published by"
                    {...form.getInputProps("publisher")}
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
          <PublicationUploaded image={undefined} title={undefined} description={undefined} stats={undefined} />
        </Container>
      </Container>
    </div>
  );
};
