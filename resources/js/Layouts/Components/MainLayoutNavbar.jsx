import { Link, usePage } from "@inertiajs/react";
import {
    IconHome,
    IconBed,
    IconCategory,
    IconUser,
    IconChartBar,
    IconMail,
    IconSettings,
    IconLogout,
} from "@tabler/icons-react";

const navLinks = [
    { icon: IconHome, label: "Dashboard", href: "/" },
    { icon: IconCategory, label: "Hotels", href: "/hotels" },
    { icon: IconBed, label: "Rooms", href: "/rooms" },
    { icon: IconCategory, label: "Categories", href: "/categories/categories" },
    { icon: IconUser, label: "Contacts", href: "/contacts" },
    { icon: IconChartBar, label: "Analytics", href: "/analytics" },
    { icon: IconMail, label: "Messages", href: "/messages" },
];

function MainLayoutNavbar() {
    const { auth } = usePage().props;

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex-1 overflow-y-auto p-2">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 mb-1"
                    >
                        <link.icon size={20} className="mr-3" />
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t">
                <Link
                    href="/settings"
                    className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 mb-1"
                >
                    <IconSettings size={20} className="mr-3" />
                    <span>Settings</span>
                </Link>
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                    <IconLogout size={20} className="mr-3" />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
}

export default MainLayoutNavbar;
