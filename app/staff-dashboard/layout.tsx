//import SideNav from "@/components/ui/sideNav";
import { SideNav } from "@/components/ui/sideNav";
import { SideBar } from "@/components/staff-dashboard/sideBar";
import { HeaderMegaMenu } from "@/components/head/staffHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <div>
      <SideBar/>

      <section><HeaderMegaMenu />{children}</section>
    </div>
  );
}
