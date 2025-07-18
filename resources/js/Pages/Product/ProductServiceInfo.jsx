import {
    Box,
    Text,
    Group,
    Badge,
    Divider,
    Button,
    Stack,
    ActionIcon,
} from "@mantine/core";
import {
    IconMapPin,
    IconClock,
    IconShield,
    IconStar,
    IconMessage,
    IconDownload,
} from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";

export function ProductServiceInfo({ seller }) {
    return (
        <Box
            p="md"
            style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            {/* Delivery Section */}
            <Stack gap="xs">
                <Group gap="xs">
                    <IconMapPin size={18} color="#228be6" />
                    <Text fw={600}>Delivery Options</Text>
                </Group>

                <Text size="sm">
                    Dhaka, Dhaka North, Banani
                    <br />
                    Road No. 12 - 19
                </Text>

                <Group gap="xs" mt={4}>
                    <IconClock size={16} color="#40c057" />
                    <Text size="sm">
                        <Text span fw={500}>
                            Standard Delivery:
                        </Text>{" "}
                        Guaranteed by 17-20 Jul
                    </Text>
                </Group>

                <Badge
                    color="green"
                    variant="light"
                    leftSection="✓ "
                    style={{ alignSelf: "flex-start" }}
                >
                    Cash on Delivery Available
                </Badge>
            </Stack>

            <Divider my="sm" />

            {/* Return & Warranty */}
            <Stack gap="xs">
                <Group gap="xs">
                    <IconShield size={18} color="#fd7e14" />
                    <Text fw={600}>Return & Warranty</Text>
                </Group>

                <Group gap={4}>
                    <Text size="sm">14 days easy return</Text>
                    <Badge color="blue" variant="light" size="xs">
                        Free
                    </Badge>
                </Group>

                <Group gap={4}>
                    <Text size="sm">1 Year Brand Warranty</Text>
                    <Badge color="orange" variant="light" size="xs">
                        Official
                    </Badge>
                </Group>
            </Stack>

            <Divider my="sm" />

            {/* App Download */}
            <Stack gap="xs" align="center">
                <Text size="sm" c="dimmed" ta="center">
                    Download app to enjoy exclusive discounts!
                </Text>

                <Group gap="xs">
                    <Text size="xs" fw={500}>
                        Scan with mobile
                    </Text>
                    <ActionIcon variant="subtle" color="gray">
                        <IconDownload size={16} />
                    </ActionIcon>
                </Group>

                <QRCodeSVG
                    value="https://yourapp.com/download"
                    size={80}
                    level="H"
                    bgColor="transparent"
                />
            </Stack>

            <Divider my="sm" />

            {/* Seller Info */}
            <Stack gap="xs">
                <Text fw={600}>Sold by</Text>
                <Text size="sm" fw={500}>
                    {seller?.name || "kamal"}
                </Text>

                <Group gap="xs">
                    <Badge variant="outline" color="gray" radius="sm">
                        Mall
                    </Badge>
                    <Badge variant="outline" color="gray" radius="sm">
                        Flagship Store
                    </Badge>
                </Group>

                <Group gap="xl" mt={4}>
                    <Box>
                        <Text size="xs" c="dimmed">
                            Seller Ratings
                        </Text>
                        <Group gap={4}>
                            <IconStar
                                size={14}
                                fill="#ffd43b"
                                color="#ffd43b"
                            />
                            <Text size="sm" fw={500}>
                                4.8/5
                            </Text>
                        </Group>
                    </Box>

                    <Box>
                        <Text size="xs" c="dimmed">
                            Response Rate
                        </Text>
                        <Text size="sm" fw={500}>
                            72%
                        </Text>
                    </Box>
                </Group>

                <Button
                    variant="outline"
                    size="xs"
                    leftSection={<IconMessage size={14} />}
                    mt="sm"
                    fullWidth
                >
                    Chat with Seller
                </Button>
            </Stack>
        </Box>
    );
}
