import { Link, usePage } from "@inertiajs/react";
import { Button } from "@mantine/core";
import {
    IconSearch,
    IconBell,
    IconMessage,
    IconChevronDown,
    IconSettings,
    IconLogout,
    IconShoppingCart,
    IconUserCircle,
} from "@tabler/icons-react";
import { route } from "ziggy-js";
import { useState } from "react";

function MainTopNavbar() {
    const { auth } = usePage().props;
    console.log(auth?.user);
    const [currentShop, setCurrentShop] = useState("Main Store");
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const hotels = [
        "GrandVista Hotel",
        "OceanView Hotel",
        "CityNest Inn",
        "Mountain Retreat Lodge",
    ];

    const notifications = [
        { id: 1, text: "New order received", time: "2 min ago", read: false },
        {
            id: 2,
            text: "Inventory low on Product X",
            time: "1 hour ago",
            read: true,
        },
        { id: 3, text: "New customer review", time: "3 hours ago", read: true },
    ];

    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        {/* <img
                            src="/logo.svg"
                            alt="Company Logo"
                            className="h-8 w-auto"
                        /> */}
                        <span className="ml-2 text-xl font-bold text-gray-800 hidden md:inline">
                            Hotel<span className="text-orange-500">Hub</span>
                        </span>
                    </div>
                </div>

                {/* Right side - Navigation elements */}
                <div className="flex items-center space-x-4">
                    {/* Shop Selector */}
                    <div className="relative">
                        <select
                            value={currentShop}
                            onChange={(e) => setCurrentShop(e.target.value)}
                            className="appearance-none bg-gray-100 border-none rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        >
                            {hotels.map((hotel) => (
                                <option key={hotel} value={hotel}>
                                    {hotel}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <IconChevronDown className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Search Bar (hidden on mobile) */}
                    <div className="hidden md:block relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IconSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 w-64 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-3">
                        {/* Messages */}
                        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
                            <IconMessage className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
                        </button>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setNotificationsOpen(!notificationsOpen)
                                }
                                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative"
                            >
                                <IconBell className="h-5 w-5" />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
                            </button>

                            {notificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                                    <div className="py-2 px-4 bg-gray-50 border-b border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-700">
                                            Notifications
                                        </h3>
                                    </div>
                                    <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                                                    !notification.read
                                                        ? "bg-blue-50"
                                                        : ""
                                                }`}
                                            >
                                                <p className="text-sm font-medium text-gray-800">
                                                    {notification.text}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="py-2 px-4 bg-gray-50 border-t border-gray-200 text-center">
                                        <a
                                            href="#"
                                            className="text-xs font-medium text-orange-600 hover:text-orange-700"
                                        >
                                            View all notifications
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
                            <IconShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {/* Profile dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://i.pinimg.com/736x/c4/65/c5/c465c58541e0841fcf56b83cd8c3f45f.jpg"
                                    alt="User profile"
                                />
                                <span className="hidden md:inline text-sm font-medium text-gray-700">
                                    {auth?.user?.name}
                                </span>
                                <IconChevronDown
                                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                        profileOpen
                                            ? "transform rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                                    <div className="py-1">
                                        <Link
                                            href={route("profile.edit", {
                                                id: auth?.user?.id,
                                            })}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Your Profile
                                        </Link>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Billing
                                        </a>
                                        <div className="border-t border-gray-100"></div>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default MainTopNavbar;
