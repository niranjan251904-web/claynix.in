'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WishlistItem } from '@/lib/types';

interface WishlistContextType {
    wishlistIds: string[];
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    toggleWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'claynix_wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) {
            try {
                setWishlistIds(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse wishlist from storage', e);
            }
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    }, [wishlistIds]);

    const addToWishlist = useCallback((productId: string) => {
        setWishlistIds((prev) => {
            if (prev.includes(productId)) return prev;
            return [...prev, productId];
        });
    }, []);

    const removeFromWishlist = useCallback((productId: string) => {
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
    }, []);

    const toggleWishlist = useCallback((productId: string) => {
        setWishlistIds((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId);
            }
            return [...prev, productId];
        });
    }, []);

    const isInWishlist = useCallback(
        (productId: string) => wishlistIds.includes(productId),
        [wishlistIds]
    );

    return (
        <WishlistContext.Provider
            value={{
                wishlistIds,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
                wishlistCount: wishlistIds.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
