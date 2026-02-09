'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            <WishlistProvider>
                <div className="min-h-screen bg-cream flex flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <BottomNav />
                </div>
            </WishlistProvider>
        </CartProvider>
    );
}
