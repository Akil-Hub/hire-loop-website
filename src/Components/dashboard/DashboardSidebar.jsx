import { Button, Drawer } from "@heroui/react";
import { Briefcase, FileMagnifier, LayoutSideContentLeft } from '@gravity-ui/icons';

import { Bars, Bell, Envelope, Gear, House, Magnifier, Person, Search } from "@gravity-ui/icons";

import Link from "next/link";



const navItems = [
    { icon: House, href: '/dashboard/recruiter', label: "Home" },
    { icon: FileMagnifier, href: '/dashboard/recruiter/jobs', label: "Jobs" },
    { icon: Bell, href: '/dashboard/recruiter/jobs/new', label: "Post A job" },
    { icon: Envelope,  href: '/dashboard/recruiter/jobs/new',label: "Messages" },
    { icon:Briefcase ,  href: '/dashboard/recruiter/company',label: "Company Profile" },
    { icon: Person,  href: '/dashboard/recruiter/jobs/new',label: "Profile" },
    { icon: Gear, href: '/dashboard/recruiter/jobs/new', label: "Settings" },
];

const navLinks = <nav className="flex flex-col gap-1">
    {navItems.map((item) => (
        <Link

            href={item.href}
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
            <item.icon className="size-5 text-muted" />
            {item.label}
        </Link>
    ))}
</nav>




export function DashboardSidebar() {






    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block h-screen">
                {navLinks}
            </aside>

            <Drawer>
                <Button variant="secondary" className={'lg:hidden'}><LayoutSideContentLeft /></Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.Header>
                                <Drawer.Heading>Drawer Title</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navLinks}
                            </Drawer.Body>
                            <Drawer.Footer>
                                <Button slot="close" variant="secondary">
                                    Cancel
                                </Button>
                                <Button slot="close">Confirm</Button>
                            </Drawer.Footer>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer></>
    );
}