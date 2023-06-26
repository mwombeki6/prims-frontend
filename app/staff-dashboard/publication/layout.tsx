import { SideNav } from "@/components/ui/sideNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <div>
   
      <section>{children}</section>
    </div>
  );
}
