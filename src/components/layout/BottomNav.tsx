'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <>
            {/* Spacer */}
            <div className="h-16 md:hidden" />

            {/* Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-warm-gray-200 z-40">
                <div className="flex items-center justify-around h-16 px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors',
                                    isActive ? 'text-gold-600' : 'text-warm-gray-500'
                                )}
                            >
                                <Icon size={20} />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
