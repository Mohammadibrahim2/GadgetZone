import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MainLayoutNavbar from "./Components/MainLayoutNavbar";
import MainTopNavbar from "./Components/MainLayoutTopbar";
import { Head } from "@inertiajs/react";

function MainLayout({ children, title }) {
    const [opened, { toggle }] = useDisclosure();
    return (
        <>
            <Head title={title} />
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 250,
                    breakpoint: "sm",
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <AppShell.Header className="shadow-sm">
                    <MainTopNavbar />
                </AppShell.Header>

                <div className="flex" style={{ height: "calc(100vh - 60px)" }}>
                    <AppShell.Navbar className="border-r-0">
                        <MainLayoutNavbar />
                    </AppShell.Navbar>

                    <AppShell.Main className="p-0 flex-1 min-w-0">
                        <div className="h-full w-full overflow-auto">
                            {children}
                        </div>
                    </AppShell.Main>
                </div>
            </AppShell>
        </>
    );
}
export default MainLayout;
