import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main>
        {" "}
        <SidebarTrigger className="fixed bg-white dark:bg-black h-full items-center border border-slate-200" />
        {children}
      </main>
    </SidebarProvider>
  );
}
