'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Cart, Product } from '@/lib/types';

interface CartContextType {
    cart: Cart;
    addToCart: (productId: string, variantId?: string, quantity?: number) => void;
    removeFromCart: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
    clearCart: () => void;
    isInCart: (productId: string, variantId?: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'claynix_cart';

// Helper function to get product from sessionStorage cache
function getProductById(productId: string): Product | undefined {
    if (typeof window === 'undefined') return undefined;
    const cachedProducts = sessionStorage.getItem('claynix_products');
    if (cachedProducts) {
        try {
            const products: Product[] = JSON.parse(cachedProducts);
            return products.find(p => p.id === productId);
        } catch (e) {
            console.error('Failed to parse cached products', e);
        }
    }
    return undefined;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart>({
        items: [],
        total: 0,
        itemCount: 0,
    });
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            try {
                const parsed = JSON.parse(storedCart);
                // Rehydrate with product data from sessionStorage
                const items = parsed.items.map((item: CartItem) => ({
                    ...item,
                    product: getProductById(item.productId),
                }));
                const total = calculateTotal(items);
                const itemCount = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
                setCart({ items, total, itemCount });
            } catch (e) {
                console.error('Failed to parse cart from storage', e);
            }
        }
        setIsHydrated(true);
    }, []);

    // Rehydrate products when sessionStorage is updated (e.g., when homepage loads)
    useEffect(() => {
        if (!isHydrated) return;

        // Try to rehydrate products that might not have been loaded yet
        setCart(prev => {
            const items = prev.items.map(item => ({
                ...item,
                product: item.product || getProductById(item.productId),
            }));
            const total = calculateTotal(items);
            return { ...prev, items, total };
        });
    }, [isHydrated]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!isHydrated) return;
        const toStore = {
            items: cart.items.map(({ productId, variantId, quantity }) => ({
                productId,
                variantId,
                quantity,
            })),
        };
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toStore));
    }, [cart, isHydrated]);

    const calculateTotal = (items: CartItem[]): number => {
        return items.reduce((sum, item) => {
            const price = item.product?.discountedPrice || item.product?.price || 0;
            return sum + price * item.quantity;
        }, 0);
    };

    const addToCart = useCallback(
        (productId: string, variantId?: string, quantity: number = 1) => {
            setCart((prev) => {
                const existingIndex = prev.items.findIndex(
                    (item) => item.productId === productId && item.variantId === variantId
                );

                let newItems: CartItem[];

                if (existingIndex >= 0) {
                    // Update existing item
                    newItems = prev.items.map((item, index) =>
                        index === existingIndex
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                } else {
                    // Add new item
                    const product = getProductById(productId);
                    newItems = [
                        ...prev.items,
                        { productId, variantId, quantity, product },
                    ];
                }

                const total = calculateTotal(newItems);
                const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

                return { items: newItems, total, itemCount };
            });
        },
        []
    );

    const removeFromCart = useCallback((productId: string, variantId?: string) => {
        setCart((prev) => {
            const newItems = prev.items.filter(
                (item) => !(item.productId === productId && item.variantId === variantId)
            );
            const total = calculateTotal(newItems);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return { items: newItems, total, itemCount };
        });
    }, []);

    const updateQuantity = useCallback(
        (productId: string, variantId: string | undefined, quantity: number) => {
            if (quantity <= 0) {
                removeFromCart(productId, variantId);
                return;
            }

            setCart((prev) => {
                const newItems = prev.items.map((item) =>
                    item.productId === productId && item.variantId === variantId
                        ? { ...item, quantity }
                        : item
                );
                const total = calculateTotal(newItems);
                const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

                return { items: newItems, total, itemCount };
            });
        },
        [removeFromCart]
    );

    const clearCart = useCallback(() => {
        setCart({ items: [], total: 0, itemCount: 0 });
    }, []);

    const isInCart = useCallback(
        (productId: string, variantId?: string) => {
            return cart.items.some(
                (item) => item.productId === productId && item.variantId === variantId
            );
        },
        [cart.items]
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
