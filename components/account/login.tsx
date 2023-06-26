"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { loginStudent, getStudentCsrfToken } from "@/clients/studentClient";
import { loginStaff, getStaffCsrfToken } from "@/clients/staffClient";
import { notifications } from "@mantine/notifications";
import { toast } from "react-toastify";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";

const schema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  password: z.string({ required_error: "Password is required" }),
});

export function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isStudentAuthenticated } = useAppSelector((state) => state.student);

  React.useEffect(() => {
    dispatch(getStudentCsrfToken());
  }, [dispatch]);

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: zodResolver(schema),
  });

  const handleSubmit = () => {
    dispatch(loginStudent(form.values));
    //dispatch(loginStaff(form.values))
  };

  if (isStudentAuthenticated) {
    router.push("/dashboard");

    toast.success(`Successfully loged in `);

    /* notifications.show({
      title: "Successfully loged in",
      message: "You are now signed in to your account",
      icon: <IconCheck size="1rem" />,
    });*/
  }

  React.useEffect(() => {
    if (isStudentAuthenticated) {
      router.replace("/dashboard");
    }
  });

  return (
    <Container
      my={-120}
      px="sm"
      h={924}
      fluid={true}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        //textAlign: "center",
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
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Link href={"/studentSignUp"}>
            {" "}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="you@mantine.dev"
              {...form.getInputProps("email")}
              required
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
              required
            />
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button
              radius={"lg"}
              variant="outline"
              type="submit"
              fullWidth
              mt="xl"
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </Container>
  );
}
