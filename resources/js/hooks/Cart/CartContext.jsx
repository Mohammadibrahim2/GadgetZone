import {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load from localStorage on mount

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    // Update localStorage whenever cart changes

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //add and calculate quantity
    const addToCart = (item) => {
        const existingItem = cart.find(
            (i) =>
                i.variant_id === item.variant_id &&
                i.product_id === item.product_id
        );
        if (existingItem) {
            setCart(
                cart.map((i) =>
                    i.variant_id === item.variant_id
                        ? { ...i, quantity: (i.quantity += item.quantity) }
                        : i
                )
            );
        } else {
            setCart([...cart, item]);
        }
    };

    //remove cartitem
    const removeItem = (variant_id) => {
        setCart(cart.filter((i) => i.variant_id !== variant_id));
    };

    const cartTotal = cart.reduce((total, item) => {
        return total + parseFloat(item.price) * item.quantity;
    }, 0);
    //clear cart
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeItem, clearCart, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook

export const useCart = () => useContext(CartContext);
