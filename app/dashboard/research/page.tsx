import React from "react";
import { Research } from "@/components/research/research";

export const metadata = {
  title: "Climax || Dashboard",
  description: "Climax research platform",
};

const page = () => {
  return (
    <div className="s space-y-10">
      <div className="p-4 -my-12 sm:ml-64">
      
      </div>
      <div className="p-4 -my-12 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

          <Research />
        </div>
      </div>
    </div>

  );
};

export default page;
