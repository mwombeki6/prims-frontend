"use client"

import React, { useEffect, useState } from 'react'
import { redirect, useRouter } from "next/navigation";
import NextLink from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { registerStaff } from "@/clients/staffClient";
import { Container, NumberInput } from "@mantine/core";
import { z } from "zod";

import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Select,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { toast } from "react-toastify";
import { IconCheck } from "@tabler/icons-react";

const schema = z
  .object({
    first_name: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "first name must be a string",
      })
      .min(2, { message: "first name should have at least 2 letters" }),
    last_name: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "last name must be a string",
      })
      .min(2, { message: "last name should have at least 2 letters" }),
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "username must be a string",
      })
      .min(2, { message: "username should have at least 2 letters" }),
    email: z
      .string({ required_error: "Email address is required" })
      .email({ message: "Invalid email address" })
      .toLowerCase(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8)
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*[0-9].*"), "One number")
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*")),
    password2: z.string({
      required_error: "Confirmation password is required",
    }),
    employee_number: z.number({
      required_error: "Registration number is required",
    }),
    department: z.string({ required_error: "Department is required" }),
    title: z.string({ required_error: "title is required" }),
    education_background: z.string({ required_error: "education background required"})
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

const StaffSignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isStaffRegistered } = useAppSelector((state) => state.staff);
  const [departmentValue, onDepartmentChange] = useState("");

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      employee_number: undefined,
      department: "",
      title: '',
      education_background: ""
    },
    //validateInputOnChange,
    validate: zodResolver(schema),
  });

  const handleSubmit = () => {
    dispatch(registerStaff(form.values));
  };

  if (isStaffRegistered) {
    router.push('staffSignIn')
    toast.success("Account created successfully");
  }

  return (
    <Container
      my={-80}
      px="sm"
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
      <Container size="60rem">
        <Paper shadow="xl" radius="md" p="xl" withBorder >
          <Text size="lg" weight={500} sx={{ textAlign: "center" }}>
            Welcome to PRIMS, Register with
          </Text>

          <Divider
            label="Staff personal information"
            labelPosition="center"
            my="lg"
          />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <Group spacing="xl" grow={true}>
                <TextInput
                  //maw={400}
                  withAsterisk
                  label="First name"
                  placeholder="Your first name"
                  {...form.getInputProps("first_name")}
                  onChange={(event) =>
                    form.setFieldValue("first_name", event.currentTarget.value)
                  }
                  radius="md"
                  required
                />
                <TextInput
                  //maw={400}
                  withAsterisk
                  label="Last name"
                  placeholder="Your last name"
                  {...form.getInputProps("last_name")}
                  onChange={(event) =>
                    form.setFieldValue("last_name", event.currentTarget.value)
                  }
                  radius="md"
                  required
                />
              </Group>

              <Group spacing="xl" grow={true}>
                <TextInput
                  //maw={400}
                  withAsterisk
                  label="Username"
                  placeholder="Your Username"
                  {...form.getInputProps("username")}
                  onChange={(event) =>
                    form.setFieldValue("username", event.currentTarget.value)
                  }
                  radius="md"
                  required
                />
                <TextInput
                  //maw={400}
                  withAsterisk
                  label="Email address"
                  placeholder="hello@climax.dev"
                  {...form.getInputProps("email")}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email address"}
                  radius="md"
                  required
                />
              </Group>

              <Group spacing="xl" grow={true}>
                <PasswordInput
                  //maw={400}
                  withAsterisk
                  label="Password"
                  placeholder="Your password"
                  {...form.getInputProps("password")}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={form.errors.password}
                  radius="md"
                  required
                />

                <PasswordInput
                  //maw={400}
                  withAsterisk
                  label="Confirm Password"
                  placeholder="Confirmaton password"
                  {...form.getInputProps("password2")}
                  onChange={(event) =>
                    form.setFieldValue("password2", event.currentTarget.value)
                  }
                  error={form.errors.password2}
                  radius="md"
                  required
                />
              </Group>

              <Divider
                label="Extra Account credentials"
                labelPosition="center"
                my="lg"
              />

              <Group spacing="xl" grow={true}>
                <NumberInput
                  //maw={400}
                  withAsterisk
                  label="Registration Number"
                  placeholder="Your employee number"
                  {...form.getInputProps('employee_number')}
                  radius="md"
                  required
                />

                <Select
                  withAsterisk
                  label="Department"
                  placeholder="department"
                  searchable
                  {...form.getInputProps("department")}
                  onSearchChange={onDepartmentChange}
                  searchValue={departmentValue}
                  nothingFound="No options"
                  data={[
                    "Computer Department",
                    "Mining Department",
                    "Mechanical Engineering Department",
                    "BioTech Department",
                  ]}
                  clearable
                  required
                />

                <TextInput
                  //maw={400}
                  withAsterisk
                  label="Title"
                  placeholder="your title"
                  {...form.getInputProps('title')}
                  onChange={(event) =>
                    form.setFieldValue('title', event.currentTarget.value)
                  }
                  //error={form.errors.title && "Invalid title"}
                  radius="md"
                  required
                />

                <TextInput
                  //maw={400}
                  withAsterisk
                  label="Education background"
                  placeholder="your education background"
                  {...form.getInputProps('education_background')}
                  onChange={(event) =>
                    form.setFieldValue('education_background', event.currentTarget.value)
                  }
                  //error={form.errors.title && "Invalid edu"}
                  radius="md"
                  required
                />

              </Group>

              <Checkbox
                label="I accept terms and conditions"
                //checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            </Stack>

            <Divider
              //label="Extra Account credentials"
              labelPosition="center"
              my="lg"
              variant="dotted"
            />

            <Group position="apart" mt="xl">
              <NextLink href={"/staffSignIn"}>
                <Anchor
                  component="button"
                  type="button"
                  color="dimmed"
                  //onClick={() => toggle()}
                  size="xs"
                >
                  Already have an account? Login
                </Anchor>
              </NextLink>
              <Button variant={'outline'} type="submit" radius="xl">
                Register
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Container>
  )
}

export default StaffSignUp
