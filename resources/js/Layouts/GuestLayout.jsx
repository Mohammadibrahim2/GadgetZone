import { AppShell } from "@mantine/core";
import MainTopNavbar from "./Components/MainLayoutTopbar";

export default function GuestLayout({ children }) {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
            classNames={{
                main: "bg-gray-50 min-h-screen flex flex-col",
            }}
        >
            <AppShell.Header className="shadow-sm bg-white border-b border-gray-200">
                <MainTopNavbar />
            </AppShell.Header>

            <AppShell.Main className="flex-1 flex items-center justify-center ">
                <div className="w-full max-w-8xl mx-auto bg-white  shadow-sm">
                    {children}
                </div>
            </AppShell.Main>
        </AppShell>
    );
}
