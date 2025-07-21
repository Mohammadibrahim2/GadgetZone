import { Text, Title } from "@mantine/core";
import {
    IconAddressBook,
    IconBrandFacebook,
    IconBrandInstagram,
    IconLocation,
    IconMail,
    IconMap,
    IconPhone,
} from "@tabler/icons-react";

export function Footer() {
    const infoLinks = [
        "New Products",
        "Our Blog",
        "About Us",
        "Services",
        "Top Sellers",
        "Contact Us",
    ];

    const accountLinks = [
        "My Account",
        "Checkout",
        "Validation",
        "Waitlist",
        "Cart",
        "Terms of Use",
    ];

    return (
        <div className="bg-white text-gray-800 pt-12  border-t border-gray-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pl-4">
                {/* Contact Info */}
                <div className="space-y-4">
                    <Title
                        order={3}
                        className="text-xl font-bold flex items-center text-black"
                    >
                        Nexonic<span className="text-orange-500 ml-1">✔</span>
                    </Title>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <IconLocation className="mt-1 text-orange-500" />
                            <Text>Mirpurr 11,Dhaka Bangladesh</Text>
                        </div>
                        <div className="flex items-center gap-3">
                            <IconPhone className="text-orange-500" />
                            <Text>(+01) 632846454</Text>
                        </div>
                        <div className="flex items-center gap-3">
                            <IconMail className="text-orange-500" />
                            <div className="flex flex-col">
                                <a
                                    href="mailto:support@domain.com"
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    nexonic@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Links */}
                <div className="space-y-4">
                    <Title order={3} className="text-xl font-bold text-black">
                        INFORMATION
                    </Title>
                    <div className="space-y-2">
                        {infoLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="block hover:text-orange-500 transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Account Links */}
                <div className="space-y-4">
                    <Title order={3} className="text-xl font-bold text-black">
                        MY ACCOUNT
                    </Title>
                    <div className="space-y-2">
                        {accountLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="block hover:text-orange-500 transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Instagram */}
                <div className="space-y-4">
                    <Title order={3} className="text-xl font-bold text-black">
                        INSTAGRAM
                    </Title>
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="text-3xl text-orange-500 hover:text-orange-600 transition-colors"
                            aria-label="Instagram"
                        >
                            <IconBrandInstagram />
                        </a>
                        <span className="text-2xl text-orange-500 hover:text-orange-600 transition-colors">
                            <IconBrandFacebook />
                        </span>
                    </div>
                    <Text className="text-sm text-gray-500 mt-2">
                        Follow us for latest updates
                    </Text>
                </div>
            </div>

            <div className="border-t bg-orange-500 mt-4 p-2 text-center text-white font-semibold">
                <Text>
                    © {new Date().getFullYear()} Nexonic. All rights reserved.
                </Text>
            </div>
        </div>
    );
}
