import React from "react";
import { AccountSettingsForm } from "@/components/staffProfile/settings";

export const metadata = {
  title: "Account-Settings || Dashboard",
  description: "PRIMS research platform",
};

const page = () => {
  return (
    <>
      <div className="p-4 -my-12 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

          <AccountSettingsForm />
        </div>
      </div>
    </>
  );
};

export default page;
