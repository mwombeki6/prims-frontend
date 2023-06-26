import Image from "next/image";
import HomePage from "@/components/home/home";
import { HeaderMegaMenu } from "@/components/head/header";

export default function Home() {
  return (
    <>
      <HeaderMegaMenu/>
      <HomePage />
    </>
  );
}
