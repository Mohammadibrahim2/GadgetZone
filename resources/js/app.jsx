import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { MantineProvider } from "@mantine/core";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <MantineProvider
                MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colors: {
                        primary: [
                            "#fff7ed",
                            "#ffedd5",
                            "#fed7aa",
                            "#fdba74",
                            "#fb923c",
                            "#f97316",
                            "#ea580c",
                            "#c2410c",
                            "#9a3412",
                            "#7c2d12",
                        ],
                    },
                    primaryColor: "primary",
                }}
            >
                <App {...props} />
            </MantineProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
