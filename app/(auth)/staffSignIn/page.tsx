import React from "react";
import StaffSignUp from "@/components/account/staffSignUp";
import StaffLogin from "@/components/account/staffLogin"

export const metadata = {
  title: "Staff SignUp || PRIMS",
  description: "PRIMS platform",
};

const page = () => {
  return (
    <div>
      <StaffLogin />
    </div>
  );
};

export default page;
