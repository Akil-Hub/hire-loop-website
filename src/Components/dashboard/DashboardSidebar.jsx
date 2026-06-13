import { Button, Drawer } from "@heroui/react";
import { Bookmark, Briefcase, ChartBar, CreditCard, Factory, FileMagnifier, FileText, LayoutCellsLarge, LayoutSideContentLeft } from '@gravity-ui/icons';

import { Bars, Bell, Envelope, Gear, House, Magnifier, Person, Search } from "@gravity-ui/icons";

import Link from "next/link";
import { getUserSession } from "@/lib/api/core/session";







export async function DashboardSidebar () {



const user =await getUserSession()


    const recruiterNavLinks = [
    { icon: House, href: '/dashboard/recruiter', label: "Home" },
    { icon: FileMagnifier, href: '/dashboard/recruiter/jobs', label: "Jobs" },
    { icon: Bell, href: '/dashboard/recruiter/jobs/new', label: "Post A job" },
    { icon: Envelope,  href: '/dashboard/recruiter/jobs/new',label: "Messages" },
    { icon:Briefcase ,  href: '/dashboard/recruiter/company',label: "Company Profile" },
    { icon: Person,  href: '/dashboard/recruiter/jobs/new',label: "Profile" },
    { icon: Gear, href: '/dashboard/recruiter/jobs/new', label: "Settings" },
];

const seekerNavLinks = [
    { icon: LayoutCellsLarge, href: '/dashboard/seeker', label: "Dashboard" },
    { icon: Magnifier, href: '/dashboard/seeker/jobs', label: "Jobs" },
    { icon: Bookmark, href: '/dashboard/seeker/saved', label: "Saved Jobs" },
    { icon: FileText, href: '/dashboard/seeker/applications', label: "Applications" },
    { icon: CreditCard, href: '/dashboard/seeker/billing', label: "Billing" },
    { icon: Gear, href: '/dashboard/seeker/settings', label: "Settings" },
]
const adminNavLinks = [
    { icon: House, href: '/dashboard/admin', label: "Dashboard" },
    { icon: Person, href: '/dashboard/admin/users', label: "Users" },
    { icon: Briefcase, href: '/dashboard/admin/jobs', label: "Jobs" },
    { icon: FileText, href: '/dashboard/admin/applications', label: "Applications" },
    { icon: Factory, href: '/dashboard/admin/companies', label: "Companies" },
    { icon: CreditCard, href: '/dashboard/admin/plans', label: "Plans" },
    { icon: ChartBar, href: '/dashboard/admin/analytics', label: "Analytics" },
    { icon: Gear, href: '/dashboard/admin/settings', label: "Settings" },
]

const navLinksMap = {
    seeker:seekerNavLinks,
    recruiter:recruiterNavLinks,
    admin:adminNavLinks,
}

const navItems = navLinksMap[user?.role || 'seeker']

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