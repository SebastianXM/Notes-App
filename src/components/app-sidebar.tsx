import * as React from "react";

import { SearchForm } from "@/components/search-form";
import CreateNoteButton from "@/components/create-note";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Sign } from "crypto";
import { SignOutButton } from "./SignOutButton";

type Note = {
  id: string;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
} 

const data = {
  navMain: [
    {
      title: "Notes",
      items: [
        { title: "All Notes", url: "/notes", isActive: true },
        { title: "Starred", url: "/notes/starred", isActive: false },
        { title: "Trash", url: "/notes/trash", isActive: false },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
        <CreateNoteButton />
        <SignOutButton />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarMenu>
            {item.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <a href={item.url}>{item.title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
