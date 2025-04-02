// import * as React from "react";
// import {
//     AudioWaveform,
//     BookOpen,
//     Bot,
//     Coins,
//     Command,
//     DollarSign,
//     Frame,
//     GalleryVerticalEnd,
//     Grid2x2,
//     Map,
//     Notebook,
//     Pen,
//     PhilippinePeso,
//     PieChart,
//     School,
//     Settings2,
//     SquareTerminal,
// } from "lucide-react";

// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarHeader,
//     SidebarRail,
// } from "@/components/ui/sidebar";
// import { usePage } from "@inertiajs/react";
// import { ScrollArea } from "./ui/scroll-area";

// export function AppSidebar({ ...props }) {
//     const user = usePage().props.auth.user;

//     // This is sample data.
//     const data = {
//         user: {
//             name: user.name,
//             email: user.email,
//             avatar: "/avatars/shadcn.jpg",
//         },
//         teams: [
//             {
//                 name: "Westbridge",
//                 logo: GalleryVerticalEnd,
//                 plan: "Enrollment System",
//             },
//         ],
//         navMain: [
//             ...(user.role === "student"
//                 ? [
//                       {
//                           title: "General",
//                           url: route("admin.billing"),
//                           icon: Grid2x2,
//                           isActive: true,
//                           items: [
//                               {
//                                   title: "Home",
//                                   url: route("dashboard"),
//                               },
//                               {
//                                   title: "Schedule",
//                                   url: route("student.schedule"),
//                               },
//                               {
//                                   title: "Subjects",
//                                   url: route("student.subject"),
//                               },
//                               {
//                                   title: "Personal Information",
//                                   url: route("student.personal.info"),
//                               },
//                           ],
//                       },
//                       {
//                           title: "Enrollment",
//                           url: route("admin.billing"),
//                           icon: BookOpen,
//                           items: [
//                               {
//                                   title: "Enrollment",
//                                   url: route("student.enrollment"),
//                               },
//                               {
//                                   title: "Documents",
//                                   url: route("student.documents"),
//                               },
//                               {
//                                   title: "Grades",
//                                   url: route("student.grades"),
//                               },
//                               {
//                                   title: "Evaluation",
//                                   url: "#",
//                               },
//                           ],
//                       },
//                       {
//                           title: "Payment",
//                           url: route("admin.billing"),
//                           icon: PhilippinePeso,
//                           items: [
//                               {
//                                   title: "Payment Plan",
//                                   url: route("admin.dashboard.audit-trail"),
//                               },
//                               {
//                                   title: "Payment History",
//                                   url: route("student.payment.transaction"),
//                               },
//                           ],
//                       },
//                   ]
//                 : []),
//             ...(user.role === "super admin"
//                 ? [
//                       {
//                           title: "Dashboard",
//                           url: "#",
//                           icon: Grid2x2,
//                           isActive: true,
//                           items: [
//                               {
//                                   title: "Home",
//                                   url: route("dashboard"),
//                               },
//                               {
//                                   title: "Enrollment",
//                                   url: route("admin.dashboard.enrollment"),
//                                   //   url: route("admin.dashboard.billing"),
//                               },
//                               {
//                                   title: "Billing",
//                                   url: route("admin.dashboard.billing"),
//                               },
//                               {
//                                   title: "Audit Trail",
//                                   url: route("admin.dashboard.audit-trail"),
//                               },
//                           ],
//                       },

//                       {
//                           title: "Enrollment",
//                           url: "#",
//                           icon: Notebook,
//                           items: [
//                               {
//                                   title: "Application",
//                                   url: route("admin.application"),
//                               },
//                               {
//                                   title: "Documents",
//                                   url: route("admin.documents"),
//                               },

//                               {
//                                   title: "Course Selection",
//                                   url: route("admin.course.selection"),
//                               },
//                               {
//                                   title: "Evaluation",
//                                   url: "",
//                               },
//                               {
//                                   title: "Enrollment Processing",
//                                   url: route("admin.enrollment"),
//                               },
//                           ],
//                       },
//                       {
//                           title: "Curriculum Management",
//                           url: "#",
//                           icon: BookOpen,
//                           items: [
//                               {
//                                   title: "Program",
//                                   url: route("admin.program"),
//                               },
//                               {
//                                   title: "Subject",
//                                   url: route("admin.subject"),
//                               },
//                               {
//                                   title: "Curriculum",
//                                   url: route("admin.curriculum"),
//                               },
//                               {
//                                   title: "Section",
//                                   url: route("admin.section"),
//                               },
//                           ],
//                       },
//                       {
//                           title: "Billing",
//                           url: "#",
//                           icon: PhilippinePeso,
//                           items: [
//                               {
//                                   title: "Setup",
//                                   url: route("admin.billing"),
//                               },
//                               {
//                                   title: "Fee Selection",
//                                   url: route("admin.assign-fee.index"),
//                               },
//                               {
//                                   title: "Payment",
//                                   url: route("admin.payment"),
//                               },
//                           ],
//                       },
//                       {
//                           title: "Grades",
//                           url: "#",
//                           icon: Pen,
//                           items: [
//                               {
//                                   title: "Setup",
//                                   url: route("admin.billing"),
//                               },
//                               {
//                                   title: "Payment",
//                                   url: route("admin.payment"),
//                               },
//                           ],
//                       },
//                       {
//                           title: "Settings",
//                           url: "#",
//                           icon: Settings2,
//                           items: [
//                               {
//                                   title: "General",
//                                   url: route("admin.setting.general"),
//                               },

//                               {
//                                   title: "User Management",
//                                   url: route("admin.user.management"),
//                               },
//                               {
//                                   title: "Account",
//                                   url: route("profile.edit"),
//                               },
//                               {
//                                   title: "Help",
//                                   url: "#",
//                               },
//                           ],
//                       },
//                   ]
//                 : []),
//         ],
//         // projects: [
//         //     // {
//         //     //     name: "Design Engineering",
//         //     //     url: "#",
//         //     //     icon: Frame,
//         //     // },
//         //     // {
//         //     //     name: "Sales & Marketing",
//         //     //     url: "#",
//         //     //     icon: PieChart,
//         //     // },
//         //     // {
//         //     //     name: "Travel",
//         //     //     url: "#",
//         //     //     icon: Map,
//         //     // },
//         // ],
//     };

//     return (
//         <Sidebar collapsible="icon" {...props}>
//             <SidebarHeader>
//                 <TeamSwitcher teams={data.teams} />
//             </SidebarHeader>

//             <SidebarContent>
//                 <ScrollArea>
//                     <NavMain items={data.navMain} />
//                     {/* <NavProjects projects={data.projects} /> */}
//                 </ScrollArea>
//             </SidebarContent>

//             <SidebarFooter>
//                 <NavUser user={data.user} />
//             </SidebarFooter>
//             <SidebarRail />
//         </Sidebar>
//     );
// }

import * as React from "react";
import {
    BookOpen,
    GalleryVerticalEnd,
    Grid2x2,
    Notebook,
    Pen,
    PhilippinePeso,
    Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
import { getSidebarState, setSidebarState } from "./utils/sidebarStorage";

export function AppSidebar({ ...props }) {
    const user = usePage().props.auth.user;
    const [expandedSections, setExpandedSections] = React.useState(() =>
        getSidebarState()
    );

    // Update session storage when state changes
    React.useEffect(() => {
        setSidebarState(expandedSections);
    }, [expandedSections]);

    const toggleSection = (title) => {
        setExpandedSections((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    // Generate nav items with expanded state
    const generateNavItems = () => {
        const baseItems = [
            ...(user.role === "student"
                ? [
                      {
                          title: "General",
                          url: route("admin.billing"),
                          icon: Grid2x2,
                          items: [
                              { title: "Home", url: route("dashboard") },
                              {
                                  title: "Schedule",
                                  url: route("student.schedule"),
                              },
                              {
                                  title: "Subjects",
                                  url: route("student.subject"),
                              },
                              {
                                  title: "Personal Information",
                                  url: route("student.personal.info"),
                              },
                          ],
                      },
                      {
                          title: "Enrollment",
                          url: route("admin.billing"),
                          icon: BookOpen,
                          items: [
                              {
                                  title: "Enrollment",
                                  url: route("student.enrollment"),
                              },
                              {
                                  title: "Documents",
                                  url: route("student.documents"),
                              },
                              { title: "Grades", url: route("student.grades") },
                              { title: "Evaluation", url: "#" },
                          ],
                      },
                      {
                          title: "Payment",
                          url: route("admin.billing"),
                          icon: PhilippinePeso,
                          items: [
                              {
                                  title: "Payment Plan",
                                  url: route("admin.dashboard.audit-trail"),
                              },
                              {
                                  title: "Payment History",
                                  url: route("student.payment.transaction"),
                              },
                          ],
                      },
                  ]
                : []),
            ...(user.role === "super admin"
                ? [
                      {
                          title: "Dashboard",
                          url: "#",
                          icon: Grid2x2,
                          items: [
                              { title: "Home", url: route("dashboard") },
                              {
                                  title: "Enrollment",
                                  url: route("admin.dashboard.enrollment"),
                              },
                              {
                                  title: "Billing",
                                  url: route("admin.dashboard.billing"),
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
                                  url: route("admin.course.selection"),
                              },
                              { title: "Evaluation", url: "" },
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
                              { title: "Program", url: route("admin.program") },
                              { title: "Subject", url: route("admin.subject") },
                              {
                                  title: "Curriculum",
                                  url: route("admin.curriculum"),
                              },
                              { title: "Section", url: route("admin.section") },
                          ],
                      },
                      {
                          title: "Billing",
                          url: "#",
                          icon: PhilippinePeso,
                          items: [
                              { title: "Setup", url: route("admin.billing") },
                              {
                                  title: "Fee Selection",
                                  url: route("admin.assign-fee.index"),
                              },
                              { title: "Payment", url: route("admin.payment") },
                          ],
                      },
                      {
                          title: "Grades",
                          url: "#",
                          icon: Pen,
                          items: [
                              { title: "Setup", url: route("admin.billing") },
                              { title: "Payment", url: route("admin.payment") },
                          ],
                      },
                      {
                          title: "Settings",
                          url: "#",
                          icon: Settings2,
                          items: [
                              {
                                  title: "General",
                                  url: route("admin.setting.general"),
                              },
                              {
                                  title: "User Management",
                                  url: route("admin.user.management"),
                              },
                              { title: "Account", url: route("profile.edit") },
                              { title: "Help", url: "#" },
                          ],
                      },
                  ]
                : []),
            ...(user.role === "accounting"
                ? [
                      {
                          title: "Dashboard",
                          url: "#",
                          icon: Grid2x2,
                          items: [
                              {
                                  title: "Billing",
                                  url: route("admin.dashboard.billing"),
                              },
                          ],
                      },
                      {
                          title: "Billing",
                          url: "#",
                          icon: PhilippinePeso,
                          active: true,
                          items: [
                              { title: "Setup", url: route("admin.billing") },
                              {
                                  title: "Fee Selection",
                                  url: route("admin.assign-fee.index"),
                              },
                              { title: "Payment", url: route("admin.payment") },
                          ],
                      },
                  ]
                : []),
            ...(user.role === "registrar"
                ? [
                      {
                          title: "Dashboard",
                          url: "#",
                          icon: Grid2x2,
                          items: [
                              {
                                  title: "Enrollment",
                                  url: route("admin.dashboard.enrollment"),
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
                                  url: route("admin.course.selection"),
                              },
                              { title: "Evaluation", url: "" },
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
                              { title: "Program", url: route("admin.program") },
                              { title: "Subject", url: route("admin.subject") },
                              {
                                  title: "Curriculum",
                                  url: route("admin.curriculum"),
                              },
                              { title: "Section", url: route("admin.section") },
                          ],
                      },
                  ]
                : []),
        ];

        return baseItems.map((item) => ({
            ...item,
            isActive: expandedSections[item.title] ?? false,
        }));
    };

    const data = {
        user: {
            name: user.name,

            role: user.role,
            avatar: "/avatars/shadcn.jpg",
        },
        teams: [
            {
                name: "Westbridge",
                logo: GalleryVerticalEnd,
                plan: "Enrollment System",
            },
        ],
        navMain: generateNavItems(),
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>

            <SidebarContent>
                <ScrollArea>
                    <NavMain
                        items={data.navMain}
                        onSectionToggle={toggleSection}
                    />
                </ScrollArea>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
