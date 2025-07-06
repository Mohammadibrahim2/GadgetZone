import { Link, router, usePage } from "@inertiajs/react";
import { IconSearch, IconBell, IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";

function MainTopNavbar({ toggleMenu }) {
    const { auth } = usePage().props;
    const [currentShop, setCurrentShop] = useState("Main Store");

    return (
        <div className="flex items-center justify-between h-full px-4 bg-white">
            <div className="flex items-center">
                <button onClick={toggleMenu} className="mr-4 text-gray-500">
                    <IconMenu2 size={20} />
                </button>
                <span className="text-xl font-bold">
                    Hotel<span className="text-orange-500">Hub</span>
                </span>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <IconSearch size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 w-64 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <IconBell size={20} />
                    </button>

                    <div className="flex items-center space-x-2">
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://i.pravatar.cc/150?img=3"
                            alt="User"
                        />
                        <span className="hidden md:inline text-sm font-medium">
                            {auth?.user?.name}
                        </span>
                        <span>
                            <Link href={"logout"} method="post">
                                Logout
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainTopNavbar;
