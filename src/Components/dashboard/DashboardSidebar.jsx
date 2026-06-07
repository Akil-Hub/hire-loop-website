import { Button, Drawer } from "@heroui/react";
import { LayoutSideContentLeft } from '@gravity-ui/icons';

import { Bars, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";



const navItems = [
    { icon: House, label: "Home" },
    { icon: Magnifier, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: Envelope, label: "Messages" },
    { icon: Person, label: "Profile" },
    { icon: Gear, label: "Settings" },
];

const navLinks = <nav className="flex flex-col gap-1">
    {navItems.map((item) => (
        <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
        >
            <item.icon className="size-5 text-muted" />
            {item.label}
        </button>
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