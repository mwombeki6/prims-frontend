//import SideNav from "@/components/ui/sideNav";
import { SideNav } from "@/components/ui/sideNav";
import { HeaderMegaMenu } from "@/components/head/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <div>
      <SideNav />

      <section><HeaderMegaMenu/>{children}</section>
    </div>
  );
}
