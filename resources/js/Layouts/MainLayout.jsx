// ✅ Updated MainLayout.jsx
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MainLayoutNavbar from "./Components/MainLayoutNavbar";
import MainTopNavbar from "./Components/MainLayoutTopbar";
import { usePage } from "@inertiajs/react";
import { SearchQueryProvider } from "@/hooks/Search/SearchContext";

function MainLayout({ children }) {
    const [opened, { toggle }] = useDisclosure();
    const { auth } = usePage().props;

    return (
        <SearchQueryProvider settings={{ locale: "bn", firstDayOfWeek: 0 }}>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 250,
                    breakpoint: "sm",
                    collapsed: { mobile: !opened },
                }}
                padding="md"
                classNames={{
                    main: "bg-gray-50 min-h-screen overflow-hidden",
                }}
            >
                {/* Top Navbar */}

                <AppShell.Header className="shadow-sm bg-white border-b border-gray-200 z-10">
                    <MainTopNavbar />
                </AppShell.Header>

                {/* Sidebar + Content Layout */}

                <div className="flex h-[calc(100vh-60px)]">
                    {auth.user && (
                        <AppShell.Navbar className="bg-white  border-gray-200 overflow-y-auto">
                            <MainLayoutNavbar />
                        </AppShell.Navbar>
                    )}
                    {/* Main Content */}
                    <AppShell.Main className=" flex-1 min-w-0">
                        <div className="h-full w-full overflow-y-auto bg-white shadow-sm ">
                            {children}
                        </div>
                    </AppShell.Main>
                </div>
            </AppShell>
        </SearchQueryProvider>
    );
}

export default MainLayout;
