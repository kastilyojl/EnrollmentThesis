import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    DollarSign,
    Frame,
    GalleryVerticalEnd,
    Grid2x2,
    Map,
    Notebook,
    PieChart,
    School,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { ScrollArea } from "./ui/scroll-area";

export function AppSidebar({ ...props }) {
    const user = usePage().props.auth.user;

    // This is sample data.
    const data = {
        user: {
            name: user.name,
            email: user.email,
            avatar: "/avatars/shadcn.jpg",
        },
        teams: [
            {
                name: "Westbridge",
                logo: GalleryVerticalEnd,
                plan: "Enrollment System",
            },
        ],
        navMain: [
            {
                title: "Dashboard",
                url: "#",
                icon: Grid2x2,
                isActive: true,
                items: [
                    {
                        title: "Home",
                        url: route("dashboard"),
                    },
                    {
                        title: "Enrollment",
                        url: route("admin.dashboard.enrollment"),
                    },
                    {
                        title: "Billing",
                        url: "#",
                    },
                    {
                        title: "Audit Trail",
                        url: route("admin.dashboard.audit-trail"),
                    },
                ],
            },
            {
                title: "Enrollment",
                url: "#",
                icon: Notebook,
                items: [
                    {
                        title: "Application",
                        url: route("admin.application"),
                    },
                    {
                        title: "Documents",
                        url: route("admin.documents"),
                    },

                    {
                        title: "Course Selection",
                        url: "",
                    },
                    {
                        title: "Evaluation",
                        url: "",
                    },
                    {
                        title: "Enrollment Processing",
                        url: route("admin.enrollment"),
                    },
                ],
            },
            {
                title: "Curriculum Management",
                url: "#",
                icon: BookOpen,
                items: [
                    {
                        title: "Program",
                        url: route("admin.program"),
                    },
                    {
                        title: "Subject",
                        url: route("admin.subject"),
                    },
                    {
                        title: "Curriculum",
                        url: route("admin.curriculum"),
                    },
                    {
                        title: "Section",
                        url: route("admin.section"),
                    },
                ],
            },

            {
                title: "Billing",
                url: "#",
                icon: DollarSign,
                items: [
                    {
                        title: "Setup",
                        url: route("admin.billing"),
                    },
                    {
                        title: "Payment",
                        url: route("admin.payment"),
                    },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
                items: [
                    {
                        title: "General",
                        url: "#",
                    },
                    {
                        title: "User Management",
                        url: route("admin.user.management"),
                    },
                    {
                        title: "Help",
                        url: "#",
                    },
                ],
            },
        ],
        // projects: [
        //     // {
        //     //     name: "Design Engineering",
        //     //     url: "#",
        //     //     icon: Frame,
        //     // },
        //     // {
        //     //     name: "Sales & Marketing",
        //     //     url: "#",
        //     //     icon: PieChart,
        //     // },
        //     // {
        //     //     name: "Travel",
        //     //     url: "#",
        //     //     icon: Map,
        //     // },
        // ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>

            <SidebarContent>
                <ScrollArea>
                    <NavMain items={data.navMain} />
                    {/* <NavProjects projects={data.projects} /> */}
                </ScrollArea>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
