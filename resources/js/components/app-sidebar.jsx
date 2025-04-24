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
import routeWithYear from "./utils/routeWithYear";

// export function AppSidebar({ ...props }) {
//     const user = usePage().props.auth.user;
//     const [expandedSections, setExpandedSections] = React.useState(() =>
//         getSidebarState()
//     );

//     // Update session storage when state changes
//     React.useEffect(() => {
//         setSidebarState(expandedSections);
//     }, [expandedSections]);

//     const toggleSection = (title) => {
//         setExpandedSections((prev) => ({
//             ...prev,
//             [title]: !prev[title],
//         }));
//     };

//     // Generate nav items with expanded state
//     const generateNavItems = () => {
//         const baseItems = [
//             ...(user.role === "student"
//                 ? [
//                       {
//                           title: "General",
//                           url: route("admin.billing"),
//                           icon: Grid2x2,
//                           items: [
//                               { title: "Home", url: route("dashboard") },
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
//                               { title: "Grades", url: route("student.grades") },
//                               { title: "Evaluation", url: "#" },
//                           ],
//                       },
//                       {
//                           title: "Payment",
//                           url: route("admin.billing"),
//                           icon: PhilippinePeso,
//                           items: [
//                               {
//                                   title: "Payment Plan",
//                                   url: route("student.payment.plan"),
//                               },
//                               {
//                                   title: "Payment History",
//                                   url: route("student.payment.transaction"),
//                               },
//                           ],
//                       },
//                   ]
//                 : []),
//             ...(user.role === "professor"
//                 ? [
//                       {
//                           title: "General",
//                           url: route("admin.billing"),
//                           icon: Grid2x2,
//                           items: [
//                               { title: "Home", url: route("dashboard") },
//                               {
//                                   title: "Schedule",
//                                   url: route("student.schedule"),
//                               },
//                               //   {
//                               //       title: "Subjects",
//                               //       url: "",
//                               //   },
//                           ],
//                       },
//                       {
//                           title: "Grades",
//                           url: "#",
//                           icon: Pen,
//                           active: true,
//                           items: [
//                               {
//                                   title: "Upload Grades",
//                                   url: route("index.csv"),
//                               },
//                               {
//                                   title: "Submitted Grade",
//                                   url: route("index.submitted.grade"),
//                               },
//                               { title: "Grade Change Request", url: "#" },
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
//                           items: [
//                               { title: "Home", url: route("dashboard") },
//                               {
//                                   title: "Enrollment",
//                                   url: route("admin.dashboard.enrollment"),
//                               },
//                               {
//                                   title: "Billing",
//                                   url: route("admin.dashboard.billing"),
//                               },
//                               {
//                                   title: "Trend Analysis",
//                                   url: "#",
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
//                                   url: routeWithYear("admin.application"),
//                               },
//                               {
//                                   title: "Documents",
//                                   url: route("admin.documents"),
//                               },
//                               {
//                                   title: "Course Selection",
//                                   url: route("admin.course.selection"),
//                               },
//                               { title: "Evaluation", url: "" },
//                               {
//                                   title: "Enrollment Confirmation",
//                                   url: route("enrollment.final.step"),
//                               },
//                               //   {
//                               //       title: "Enrollment Processing",
//                               //       url: route("admin.enrollment"),
//                               //   },
//                           ],
//                       },
//                       {
//                           title: "Curriculum Management",
//                           url: "#",
//                           icon: BookOpen,
//                           items: [
//                               { title: "Program", url: route("admin.program") },
//                               { title: "Subject", url: route("admin.subject") },
//                               {
//                                   title: "Curriculum",
//                                   url: route("admin.curriculum"),
//                               },
//                               { title: "Section", url: route("admin.section") },
//                           ],
//                       },
//                       {
//                           title: "Billing",
//                           url: "#",
//                           icon: PhilippinePeso,
//                           items: [
//                               { title: "Setup", url: route("admin.billing") },
//                               {
//                                   title: "Fee Selection",
//                                   url: route("admin.assign-fee.index"),
//                               },
//                               { title: "Payment", url: route("admin.payment") },
//                           ],
//                       },
//                       {
//                           title: "Grades",
//                           url: "#",
//                           icon: Pen,
//                           items: [
//                               { title: "Upload", url: route("index.csv") },
//                               { title: "List", url: "#" },
//                               { title: "Request", url: "#" },
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
//                                   title: "Controller",
//                                   url: "#",
//                               },
//                               {
//                                   title: "Display",
//                                   url: "#",
//                               },
//                               {
//                                   title: "User Management",
//                                   url: routeWithYear("admin.user.management"),
//                               },
//                               { title: "Account", url: route("profile.edit") },
//                               { title: "Help", url: "#" },
//                           ],
//                       },
//                   ]
//                 : []),
//             ...(user.role === "accounting"
//                 ? [
//                       {
//                           title: "Dashboard",
//                           url: "#",
//                           icon: Grid2x2,
//                           items: [
//                               {
//                                   title: "Billing",
//                                   url: route("admin.dashboard.billing"),
//                               },
//                           ],
//                       },
//                       {
//                           title: "Billing",
//                           url: "#",
//                           icon: PhilippinePeso,
//                           active: true,
//                           items: [
//                               { title: "Setup", url: route("admin.billing") },
//                               {
//                                   title: "Fee Selection",
//                                   url: route("admin.assign-fee.index"),
//                               },
//                               { title: "Payment", url: route("admin.payment") },
//                           ],
//                       },
//                   ]
//                 : []),
//             ...(user.role === "registrar"
//                 ? [
//                       {
//                           title: "Dashboard",
//                           url: "#",
//                           icon: Grid2x2,
//                           items: [
//                               {
//                                   title: "Enrollment",
//                                   url: route("admin.dashboard.enrollment"),
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
//                               { title: "Evaluation", url: "" },
//                               {
//                                   title: "Enrollment Processing",
//                                   url: route("admin.enrollment"),
//                               },
//                           ],
//                       },
//                   ]
//                 : []),
//         ];

//         return baseItems.map((item) => ({
//             ...item,
//             isActive: expandedSections[item.title] ?? false,
//         }));
//     };

//     const data = {
//         user: {
//             name: user.name,

//             role: user.role,
//             avatar: "/avatars/shadcn.jpg",
//         },
//         teams: [
//             {
//                 name: "Westbridge",
//                 logo: GalleryVerticalEnd,
//                 plan: "Enrollment System",
//             },
//         ],
//         navMain: generateNavItems(),
//     };

//     return (
//         <Sidebar collapsible="icon" {...props}>
//             <SidebarHeader>
//                 <TeamSwitcher teams={data.teams} />
//             </SidebarHeader>

//             <SidebarContent>
//                 <ScrollArea>
//                     <NavMain
//                         items={data.navMain}
//                         onSectionToggle={toggleSection}
//                     />
//                 </ScrollArea>
//             </SidebarContent>

//             <SidebarFooter>
//                 <NavUser user={data.user} />
//             </SidebarFooter>
//             <SidebarRail />
//         </Sidebar>
//     );
// }

export function AppSidebar({ ...props }) {
    // Get the authenticated user data
    const { auth } = usePage().props;
    const user = auth?.user;

    // Initialize the expandedSections state safely, falling back to an empty object if undefined
    const [expandedSections, setExpandedSections] = React.useState(() => {
        return getSidebarState() || {}; // Ensure it defaults to an empty object
    });

    // Update session storage when expandedSections state changes
    React.useEffect(() => {
        setSidebarState(expandedSections); // Save the expanded sections state in session storage
    }, [expandedSections]);

    // Function to toggle the expanded/collapsed state of each section
    const toggleSection = (title) => {
        setExpandedSections((prev) => ({
            ...prev,
            [title]: !prev[title], // Toggle the state for the specific section
        }));
    };

    // Inside AppSidebar component
    const sidebarDisplay = usePage().props.sidebarDisplay || [];

    const getIcon = (title) => {
        switch (title) {
            case "Dashboard":
                return Grid2x2;
            case "Enrollment":
                return Notebook;
            case "Billing":
                return PhilippinePeso;
            case "Grades":
                return Pen;
            case "Settings":
                return Settings2;
            default:
                return BookOpen;
        }
    };

    const generateNavItems = () => {
        const selectedYear = usePage().props.selected_year;

        return sidebarDisplay.map((section) => ({
            title: section.title,
            url: "#",
            icon: getIcon(section.title),
            items: section.items.map((item) => {
                if (!item.url) return item;

                const url = new URL(item.url, window.location.origin);
                url.searchParams.set("academic_year_id", selectedYear);

                return {
                    title: item.title,
                    url: url.toString().replace(window.location.origin, ""), // Keep it relative
                };
            }),
            isActive: expandedSections[section.title] ?? false,
        }));
    };

    // Generate the navigation items (safe check to ensure it's an array)
    const navMainItems = generateNavItems();

    // Conditional rendering if navMainItems is empty or undefined
    if (!Array.isArray(navMainItems) || navMainItems.length === 0) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* Example of TeamSwitcher, customize based on your needs */}
                <TeamSwitcher
                    teams={[
                        {
                            name: "Westbridge",
                            logo: GalleryVerticalEnd,
                            plan: "Enrollment System",
                        }, // Replace with actual data
                    ]}
                />
            </SidebarHeader>

            <SidebarContent>
                <ScrollArea>
                    {/* Passing the nav items and toggle handler */}
                    <NavMain
                        items={navMainItems}
                        onSectionToggle={toggleSection}
                    />
                </ScrollArea>
            </SidebarContent>

            <SidebarFooter>
                {/* Example user information */}
                <NavUser
                    user={{
                        name: user?.name,
                        role: user?.role,
                        avatar: "/avatars/shadcn.jpg", // Replace with actual avatar path
                    }}
                />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
