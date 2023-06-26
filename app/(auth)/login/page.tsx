import React from 'react'
import { Login } from '@/components/account/login';
import { Container } from "@mantine/core";

export const metadata = {
  title: "ZEDI || Login",
  description: "Climax research platform",
};

const page = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default page