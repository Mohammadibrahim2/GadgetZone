import {
    IconBulb,
    IconCheckbox,
    IconPlus,
    IconUser,
    IconSettings,
    IconLogout,
    IconHome,
    IconChartBar,
    IconMail,
    IconChevronDown,
    IconCategory,
    IconBrand4chan,
    IconUniverse,
    IconTriangleInverted,
    IconTrianglePlus2,
    IconTriangleSquareCircleFilled,
    IconTriangles,
    IconBox,
    IconUsers,
    IconChecklist,
    IconColorPicker,
    IconColorSwatch,
    IconColorFilter,
    IconBrandAdobe,
    IconBrandAbstract,
    IconBrandAirbnb,
    IconBrandAmazon,
    IconBrandAirtable,
    IconUserBolt,
    IconUsersGroup,
    IconUserShare,
    IconMenuOrder,
    IconPackage,
    IconPackages,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Indicator } from "@mantine/core";

const mainLinks = [
    {
        icon: IconHome,
        label: "Dashboard",
        route: "dashboard",
        notifications: 0,
        subLinks: [],
    },
    {
        icon: IconBox,
        label: "Product",
        route: "products.index",
        notifications: 3,
        // subLinks: [
        //     { label: "All Hotels", route: "hotels.index" },
        //     { label: "Create New", route: "hotels.create" },
        // ],attributes
    },
    {
        icon: IconChecklist,
        label: "Variant Attributes",
        route: "attributes.index",
        subLinks: [],
    },
    {
        icon: IconCategory,
        label: "Category",
        route: "categories.categories",
        subLinks: [],
    },

    {
        icon: IconBrandAirtable,
        label: "Brands",
        route: "brands.index",
        notifications: 2,
        subLinks: [],
    },
    {
        icon: IconColorFilter,
        label: "Color",
        route: "colors.index",
        subLinks: [],
    },
    {
        icon: IconUsersGroup,
        label: "Customers",
        route: "customers.customers",
        // subLinks: [
        //     { label: "Reports", route: "analytics.reports" },
        //     { label: "Statistics", route: "analytics.statistics" },
        // ],
    },
    {
        icon: IconPackages,
        label: "Order",
        route: "orders.index",
        notifications: 3,
        // subLinks: [
        //     { label: "All Hotels", route: "hotels.index" },
        //     { label: "Create New", route: "hotels.create" },
        // ],attributes
    },
    {
        icon: IconPackages,
        label: "MarketPalce",
        route: "orders.index",
        notifications: 3,
        // subLinks: [
        //     { label: "All Hotels", route: "hotels.index" },
        //     { label: "Create New", route: "hotels.create" },
        // ],attributes
    },
];

const collections = [
    {
        emoji: "🚚",
        label: "Rooms",
        route: "customers.customers",
        // subCollections: [
        //     { label: "Pending", route: "collections.rooms.pending" },
        //     { label: "Completed", route: "collections.rooms.completed" },
        // ],
    },
    {
        emoji: "💸",
        label: "Discounts",
        route: "customers.customers",
        subCollections: [],
    },
    {
        emoji: "💰",
        label: "Profits",
        route: "customers.customers",
        subCollections: [],
    },
];

function AccordionItem({ item, active, setActive, children, hasSubItems }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <Link
                href={route(item.route)}
                onClick={() => {
                    if (hasSubItems) {
                        setIsOpen(!isOpen);
                    }
                    setActive(item.label);
                }}
                className={`flex items-center w-full p-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    route().current(item.route.split(".")[0] + ".*") ||
                    route().current(item.route)
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                <span
                    className={`transition-transform duration-300 ${
                        isOpen ? "rotate-0" : "-rotate-90"
                    }`}
                >
                    {hasSubItems ? (
                        <IconChevronDown className="w-4 h-4 mr-1" />
                    ) : (
                        <span className="w-4 h-4 mr-1"></span>
                    )}
                </span>
                {item.icon ? (
                    <item.icon className="w-5 h-5 mr-2" />
                ) : (
                    <span className="w-5 h-5 mr-2">{item.emoji}</span>
                )}
                <span className="flex-1 text-left">{item.label}</span>

                {item.notifications > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full">
                        {item.notifications}
                    </span>
                )}
            </Link>
            {hasSubItems && (
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                    <div className="ml-8 mt-1">{children}</div>
                </div>
            )}
        </li>
    );
}

function MainLayoutNavbar() {
    const [active, setActive] = useState("Dashboard");
    const [activeCollection, setActiveCollection] = useState("Hotels");

    const { auth } = usePage().props;
    return (
        <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
            {/* User Profile Section */}
            {auth.user && (
                <Link
                    href={route("profile.edit", { id: auth?.user?.id })}
                    className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50"
                >
                    <div className="relative">
                        <Indicator
                            inline
                            size={12}
                            offset={6}
                            position="bottom-end"
                            withBorder
                            processing
                            color="green"
                        >
                            <img
                                className="w-10 h-10 rounded-full"
                                src={auth?.user?.profile_image}
                                alt={auth?.user?.name}
                            />
                        </Indicator>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">
                            {auth.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {auth.user.role === "super_admin"
                                ? "Super admin"
                                : auth?.user?.role || "User"}
                        </p>
                    </div>
                </Link>
            )}
            {/* Main Navigation Links */}
            <div className="flex-1 overflow-y-auto">
                <nav className="p-2">
                    <ul className="space-y-1">
                        {mainLinks.map((link) => (
                            <AccordionItem
                                key={link.label}
                                item={link}
                                active={active}
                                setActive={setActive}
                                //    hasSubItems={link?.subLinks.length > 0}
                            >
                                {/* <ul className="space-y-1">
                                    {link?.subLinks.map((subLink) => (
                                        <li key={subLink.label}>
                                            <Link
                                                href={route(subLink.route)}
                                                className={`flex items-center w-full p-2 pl-6 text-sm rounded-lg transition-colors duration-200 ${
                                                    route().current(
                                                        subLink.route
                                                    )
                                                        ? "bg-orange-50 text-orange-600"
                                                        : "text-gray-600 hover:bg-gray-100"
                                                }`}
                                            >
                                                <span className="flex-1 text-left">
                                                    {subLink.label}
                                                </span>
                                                {subLink.notifications > 0 && (
                                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full">
                                                        {subLink.notifications}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul> */}
                            </AccordionItem>
                        ))}
                    </ul>
                </nav>

                {/* Collections Section */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Collections
                        </h3>
                        <Link
                            href={route("customers.customers")}
                            className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
                        >
                            <IconPlus className="w-4 h-4" />
                        </Link>
                    </div>
                    <ul className="space-y-1">
                        {collections.map((collection) => (
                            <AccordionItem
                                key={collection.label}
                                item={collection}
                                active={activeCollection}
                                setActive={setActiveCollection}
                                // hasSubItems={
                                //     collection.subCollections.length > 0
                                // }
                            >
                                {/* <ul className="space-y-1">
                                    {collection.subCollections.map(
                                        (subCollection) => (
                                            <li key={subCollection.label}>
                                                <Link
                                                    href={route(
                                                        subCollection.route
                                                    )}
                                                    className={`flex items-center w-full p-2 pl-6 text-sm rounded-lg transition-colors duration-200 ${
                                                        route().current(
                                                            subCollection.route
                                                        )
                                                            ? "bg-orange-50 text-orange-600"
                                                            : "text-gray-600 hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <span>
                                                        {subCollection.label}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul> */}
                            </AccordionItem>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Settings/Logout */}
            <div className="p-4 border-t border-gray-200">
                <Link
                    href={route("customers.customers")}
                    className="flex items-center w-full p-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100"
                >
                    <IconSettings className="w-5 h-5 mr-3" />
                    <span>Settings</span>
                </Link>
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center w-full p-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100"
                >
                    <IconLogout className="w-5 h-5 mr-3" />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
}

export default MainLayoutNavbar;
