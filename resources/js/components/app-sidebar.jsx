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
                name: "Acme Inc",
                logo: GalleryVerticalEnd,
                plan: "Enterprise",
            },
            {
                name: "Acme Corp.",
                logo: AudioWaveform,
                plan: "Startup",
            },
            {
                name: "Evil Corp.",
                logo: Command,
                plan: "Free",
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
                        title: "History",
                        url: "#",
                    },
                    {
                        title: "Starred",
                        url: "#",
                    },
                    {
                        title: "Settings",
                        url: "#",
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
                        url: "#",
                    },
                    {
                        title: "Documents",
                        url: "#",
                    },
                    {
                        title: "Quantum",
                        url: "#",
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
                        title: "Tuition Fee",
                        url: "#",
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
                        title: "ID",
                        url: "#",
                    },
                    {
                        title: "Landing Page",
                        url: "#",
                    },
                ],
            },
        ],
        projects: [
            {
                name: "Design Engineering",
                url: "#",
                icon: Frame,
            },
            {
                name: "Sales & Marketing",
                url: "#",
                icon: PieChart,
            },
            {
                name: "Travel",
                url: "#",
                icon: Map,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
