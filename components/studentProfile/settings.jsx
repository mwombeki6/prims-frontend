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
import { studentDashboard, updateStudent } from '@/clients/studentClient';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

export function AccountSettingsForm() {

  const [studentData, setStudentData] = useState({});

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    studentDashboard()
      .then((data) => setStudentData(data))
      .catch((error) => console.error(error));
  }, []);

  const form = useForm({
    initialValues: {
      first_name: undefined,
      last_name: undefined,
      username: undefined,
      email: undefined,
      student_reg: undefined,
      department: undefined,
      class_course: undefined,
      
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
      student_reg: form.values.student_reg,
      department: form.values.department,
      class_course: form.values.class_course,
  
    };

    
    dispatch(updateStudent(updatedUserData));
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
                placeholder={studentData.first_name}
                {...form.getInputProps("first_name")}
                
                radius="md"
              />

              <TextInput
                label="Last Name"
                placeholder={studentData.last_name}
                {...form.getInputProps("last_name")}

                radius="md"
              />

            </Group>

            <Space h={15} />

            <Group spacing="xl" grow={true}>
              <TextInput
                label="Username"
                placeholder={studentData.username}
                {...form.getInputProps("username")}
                onChange={(event) =>
                  form.setFieldValue("username", event.currentTarget.value)
                }
                radius="md"
              />
              <TextInput
                label="Email"
                placeholder={studentData.email}
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
                label="Student reg no"
                placeholder={studentData.student_reg}
                {...form.getInputProps('student_reg')}
                radius="md"
              //disabled
              />

              <Select
                label="Class"
                placeholder={studentData.class_course}
                searchable
                {...form.getInputProps('class_course')}
                //onSearchChange={onDepartmentChange}
                //searchValue={departmentValue}
                nothingFound="No options"
                data={["OD20-COE", "OD21-COE", "OD22-COE"]}
                clearable
              />

              <Select
                label="Department"
                placeholder={studentData.department}
                searchable
                //value={studentData.department}
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