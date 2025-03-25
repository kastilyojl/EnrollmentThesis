import React from "react";

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { MenuIcon } from "lucide-react";
import ApplicationLogo from "./application-logo";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";

const navigation = [
    { name: "Login", href: route("login"), current: false },
    {
        name: "Apply Now",
        href: route("landing-page.section.application"),
        current: false,
    },
    { name: "FAQ", href: route("landing-page.section.FAQ"), current: false },
    {
        name: "Requirements",
        href: route("landing-page.section.Requirements"),
        current: false,
    },
    {
        name: "Tuition Fee",
        href: route("public.payment.submit"),
        current: false,
    },
    {
        name: "Admission Guide",
        href: route("public.admission.guide"),
        current: false,
    },
    {
        name: "Senior High School",
        href: route("landing-page.section.SHS"),
        current: false,
    },
    {
        name: "College",
        href: route("landing-page.section.College"),
        current: false,
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Topbar() {
    const about = [
        {
            title: "FAQ",
            href: route("landing-page.section.FAQ"),
        },
    ];

    const admission = [
        {
            title: "Requirements",
            href: route("landing-page.section.Requirements"),
        },
        {
            title: "Tuition Fee",
            href: route("public.payment.submit"),
        },
        {
            title: "Admission Guide",
            href: route("public.admission.guide"),
        },
    ];

    const program = [
        {
            title: "Senior High School",
            href: route("landing-page.section.SHS"),
        },
        {
            title: "College",
            href: route("landing-page.section.College"),
        },
    ];

    return (
        <Disclosure
            as="nav"
            className="bg-white border-b shadow-sm fixed top-0 right-0 left-0 z-50"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-end">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <ApplicationLogo className="h-14 w-auto" />
                        </div>
                        <div className="hidden  sm:ml-6 md:flex items-center justify-center">
                            <div className="flex">
                                <NavigationMenu>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>
                                            About
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid p-4 w-[200px]">
                                                {about.map((component) => (
                                                    <ListItem
                                                        key={component.title}
                                                        title={component.title}
                                                        href={component.href}
                                                    >
                                                        {component.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenu>
                                <NavigationMenu>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>
                                            Admission
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid p-4 w-[200px]">
                                                {admission.map((admission) => (
                                                    <ListItem
                                                        key={admission.title}
                                                        title={admission.title}
                                                        href={admission.href}
                                                    >
                                                        {admission.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenu>
                                <NavigationMenu>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>
                                            Program
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid p-4 w-[200px]">
                                                {program.map((program) => (
                                                    <ListItem
                                                        key={program.title}
                                                        title={program.title}
                                                        href={program.href}
                                                    >
                                                        {program.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenu>
                            </div>
                        </div>
                    </div>
                    <div className="hidden gap-2 inset-y-0 right-0 md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Link href={route("login")}>
                            <Button>Login</Button>
                        </Link>
                        <Link href={route("landing-page.section.application")}>
                            <Button className="group flex items-center bg-transparent relative  overflow-hidden border border-indigo-600 px-8 py-3 focus:ring-3 focus:outline-hidden">
                                <span className="absolute inset-y-0 right-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
                                <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                    Apply Now
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-900 hover:bg-primary hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}

const ListItem = React.forwardRef(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">
                            {title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    }
);

ListItem.displayName = "ListItem";

export { ListItem };
