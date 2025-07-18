import React from "react";
import {
    Menu,
    Indicator,
    Group,
    Text,
    Badge,
    Divider,
    ScrollArea,
    ActionIcon,
    Image,
    Box,
} from "@mantine/core";
import {
    IconShoppingCart,
    IconTrash,
    IconArrowRight,
} from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useCart } from "@/hooks/Cart/CartContext";

const CartMenu = () => {
    const { cart, removeItem, cartTotal } = useCart();

    return (
        <Menu
            width={350}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            withinPortal
        >
            <Menu.Target>
                <button className="p-2 rounded-full text-white hover:bg-orange-400 relative">
                    <Indicator
                        inline
                        label={cart.length}
                        size={20}
                        color="orange"
                        disabled={cart.length === 0}
                    >
                        <IconShoppingCart className="h-5 w-5" />
                    </Indicator>
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>
                    <Group justify="space-between">
                        <Text fw={600}>Your Cart</Text>
                        <Badge color="orange" variant="filled">
                            {cart.length} items
                        </Badge>
                    </Group>
                </Menu.Label>
                <Divider />

                <ScrollArea.Autosize mah={300}>
                    {cart.length > 0 ? (
                        <>
                            {cart.map((item) => (
                                <Menu.Item
                                    key={`${item.product_id}-${item.variant_id}`}
                                    rightSection={
                                        <ActionIcon
                                            variant="subtle"
                                            color="red"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeItem(item.variant_id);
                                            }}
                                        >
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    }
                                >
                                    <Group wrap="nowrap">
                                        {item.image && (
                                            <Box
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Image
                                                    src={item?.image}
                                                    width={40}
                                                    height={40}
                                                    fit="contain"
                                                    radius="sm"
                                                    withPlaceholder
                                                />
                                            </Box>
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" lineClamp={1}>
                                                {item.title}
                                            </Text>
                                            <Group gap="xs">
                                                <Text size="sm" c="dimmed">
                                                    {item.quantity} × ৳
                                                    {item.price}
                                                </Text>
                                            </Group>
                                        </div>
                                    </Group>
                                </Menu.Item>
                            ))}
                            <Divider />
                            <Menu.Label>
                                <Group justify="space-between">
                                    <Text fw={600}>Total</Text>
                                    <Text fw={700} className="text-black">
                                        ৳{cartTotal.toFixed(2)}
                                    </Text>
                                </Group>
                            </Menu.Label>
                            <Menu.Item
                                component={Link}
                                href={route("checkout.index")}
                                rightSection={<IconArrowRight size={14} />}
                                className="bg-orange-500 text-white hover:bg-orange-600"
                            >
                                Proceed to Checkout
                            </Menu.Item>
                        </>
                    ) : (
                        <Menu.Item disabled>
                            <Text c="dimmed" ta="center" py="sm">
                                Your cart is empty
                            </Text>
                        </Menu.Item>
                    )}
                </ScrollArea.Autosize>
            </Menu.Dropdown>
        </Menu>
    );
};

export default CartMenu;
