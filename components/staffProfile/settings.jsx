"use client"

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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
  Container,
  Select,
  NumberInput,
  Space,
} from '@mantine/core';
import { studentDashboard } from '@/clients/studentClient';
import { staffDashboard, updateStaff } from '@/clients/staffClient';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

export function AccountSettingsForm() {

  const [staffData, setStudentData] = useState({});

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    staffDashboard()
      .then((data) => setStudentData(data))
      .catch((error) => console.error(error));
  }, []);

  const form = useForm({
    initialValues: {
      first_name: undefined,
      last_name: undefined,
      username: undefined,
      email: undefined,
      employee_number: undefined,
      department: undefined,
      title: undefined,
      education_background: undefined
    },

    //validateInputOnChange,
    //validate: zodResolver(schema),
  });

  const handleSubmit = () => {
    // Get the updated user data from the form
    const updatedUserData = {
      first_name: form.values.first_name,
      last_name: form.values.last_name,
      username: form.values.username,
      email: form.values.email,
      employee_number: form.values.employee_number,
      department: form.values.department,
      title: form.values.title,
      education_background: form.values.education_background
    };

    
    dispatch(updateStaff(updatedUserData));
  };

  return (
    <Container size="70rem">
      <Paper color='' radius="md" shadow='xl' p="xl" withBorder {...props}>
        <Text color='' size="lg" weight={500} >
          Edit your account profile,
        </Text>

        <Space h={15} />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Group spacing="xl" grow={true}>
              <TextInput
                label="First Name"
                placeholder={staffData.first_name}
                {...form.getInputProps("first_name")}
                
                radius="md"
              />

              <TextInput
                label="Last Name"
                placeholder={staffData.last_name}
                {...form.getInputProps("last_name")}

                radius="md"
              />

            </Group>

            <Space h={15} />

            <Group spacing="xl" grow={true}>
              <TextInput
                label="Username"
                placeholder={staffData.username}
                {...form.getInputProps("username")}
                onChange={(event) =>
                  form.setFieldValue("username", event.currentTarget.value)
                }
                radius="md"
              />
              <TextInput
                label="Email"
                placeholder={staffData.email}
                {...form.getInputProps("email")}
                //value={form.values.email}

                error={form.errors.email && "Invalid email address"}
                radius="md"
              //disabled
              />
            </Group>

            <Space h={15} />

            <Group spacing="xl" grow={true}>
              <NumberInput
                //maw={400}
                label="Employee Number"
                placeholder={staffData.employee_number}
                {...form.getInputProps('employee_number')}
                radius="md"
              //disabled
              />

              <Select
                label="Title"
                placeholder={staffData.title}
                searchable
                {...form.getInputProps("title")}
                //onSearchChange={onDepartmentChange}
                //searchValue={departmentValue}
                nothingFound="No options"
                data={[
                  "Lecture",
                  "Head Of Department",
                ]}
                clearable
              />

              <Select
                label="Department"
                placeholder={staffData.department}
                searchable
                //value={staffData.department}
                {...form.getInputProps("department")}
                //onSearchChange={onDepartmentChange}
                //searchValue={departmentValue}
                nothingFound="No options"
                data={[
                  "Computer Department",
                  "Mining Department",
                  "Mechanical Engineering Department",
                  "BioTech Department",
                ]}
                clearable
              />

              <TextInput
                label="Education background"
                placeholder={staffData.education_background}
                {...form.getInputProps('education_background')}

                radius="md"
              />
            </Group>

          </Stack>


          <Group position="apart" mt="xl">

            <Button variant={'outline'} type="submit" radius="xl">
              Update Profile
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>

  );
}