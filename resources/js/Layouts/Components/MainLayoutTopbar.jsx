import { Link, router, usePage } from "@inertiajs/react";
import {
    Button,
    Indicator,
    Menu,
    Text,
    Badge,
    Divider,
    ScrollArea,
    Group,
    ActionIcon,
} from "@mantine/core";
import {
    IconSearch,
    IconBell,
    IconMessage,
    IconChevronDown,
    IconSettings,
    IconLogout,
    IconShoppingCart,
    IconUserCircle,
    IconTrash,
    IconArrowRight,
} from "@tabler/icons-react";
import { route } from "ziggy-js";
import { useState } from "react";
import { useCart } from "@/hooks/Cart/CartContext";
import CartMenu from "@/Components/cart/cart-menu";
import Logo from "@/Components/Logo/logo";
import { useSearch } from "@/hooks/Search/SearchContext";

function MainTopNavbar() {
    const { auth } = usePage().props;
    const [currentShop, setCurrentShop] = useState("Main Store");
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { cart, removeItem, clearCart } = useCart();

    const { search, setSearch } = useSearch();

    const handleSearch = (e) => {
        e.preventDefault();

        router.visit("/filteredProdcts");
    };

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
        <header className="sticky top-0 z-10 bg-orange-500">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        <Link href={route("home")}>
                            <Logo />
                        </Link>
                    </div>
                </div>
                {/* Right side - Navigation elements */}
                <div className="flex items-center space-x-4">
                    {/* Shop Selector */}
                    {/* <div className="relative">
                        <select
                            value={currentShop}
                            onChange={(e) => setCurrentShop(e.target.value)}
                            className="appearance-none bg-orange-400 border-none rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-white focus:outline-none"
                        >
                            {hotels.map((hotel) => (
                                <option key={hotel} value={hotel}>
                                    {hotel}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <IconChevronDown className="h-4 w-4" />
                        </div>
                    </div> */}

                    {/* Search Bar (hidden on mobile) */}
                    <div className="hidden md:block relative">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="rounded-md pl-2 pr-4 py-2 w-64 text-sm text-gray-700 bg-white  border border-orange-300 focus:ring-2 focus:ring-white focus:border-white"
                            />
                            <button
                                type="submit"
                                className="absolute inset-y-0 right-0 pr-2 flex items-center"
                            >
                                <IconSearch className="h-5 w-5 text-orange-500" />
                            </button>
                        </form>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-3">
                        {/* Messages - Only show if logged in */}
                        {/* {auth.user && (
                            <button className="p-2 rounded-full text-white hover:bg-orange-400 relative">
                                <IconMessage className="h-5 w-5" />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-white"></span>
                            </button>
                        )} */}

                        {/* Notifications - Only show if logged in */}
                        {auth.user && (
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setNotificationsOpen(!notificationsOpen)
                                    }
                                    className="p-2 rounded-full text-white hover:bg-orange-400 relative"
                                >
                                    <IconBell className="h-5 w-5" />
                                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-white"></span>
                                </button>

                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                                        <div className="py-2 px-4 bg-gray-50 border-b border-gray-200">
                                            <h3 className="text-sm font-medium text-gray-700">
                                                Notifications
                                            </h3>
                                        </div>
                                        <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                                            {notifications.map(
                                                (notification) => (
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
                                                )
                                            )}
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
                        )}

                        {/* Cart Menu */}
                        <CartMenu cart={cart} />

                        {/* Profile dropdown or Login button */}
                        {auth.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <Indicator
                                        inline
                                        size={12}
                                        offset={6}
                                        position="bottom-end"
                                        withBorder
                                        processing
                                        color="green"
                                    >
                                        {auth.user.profile_image ? (
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={auth.user.profile_image}
                                                alt="User profile"
                                            />
                                        ) : (
                                            <IconUserCircle className="h-8 w-8 text-white" />
                                        )}
                                    </Indicator>
                                    <span className="hidden md:inline text-sm font-medium text-white">
                                        {auth.user.name}
                                    </span>
                                    <IconChevronDown
                                        className={`h-4 w-4 text-white transition-transform duration-200 ${
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
                                                    id: auth.user.id,
                                                })}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Your Profile
                                            </Link>
                                            <Link
                                                href={route("dashboard")}
                                                method="get"
                                                as="button"
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Dashboard
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
                        ) : (
                            <div className="flex space-x-2">
                                <Link
                                    href={route("login.view")}
                                    className="px-3 py-1 text-sm font-medium text-white hover:bg-orange-400 rounded-lg"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route("register.view")}
                                    className="px-3 py-1 text-sm font-medium bg-white text-orange-500 hover:bg-gray-100 rounded-lg"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default MainTopNavbar;
