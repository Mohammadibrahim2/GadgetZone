import {
    IconBrandWhatsapp,
    IconChartTreemap,
    IconMessage,
    IconPhone,
} from "@tabler/icons-react";

// WhatsAppFloatingButton.jsx
const WhatsAppFloatingButton = () => {
    const phoneNumber = "01885905423";
    const message = "Hello, I want to know more about your services.";

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                message
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",

                color: "white",
                padding: "10px",
                borderRadius: "50%",
                textAlign: "center",
                fontSize: "24px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                zIndex: 1000,
            }}
            className="bg-orange-500"
        >
            <IconBrandWhatsapp />
        </a>
    );
};

export default WhatsAppFloatingButton;
