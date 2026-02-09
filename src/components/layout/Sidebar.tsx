'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ADMIN_NAV_LINKS, SITE_NAME } from '@/lib/constants';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    Settings,
    LogOut
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    BarChart3,
};

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                'fixed top-0 left-0 bottom-0 bg-charcoal text-white transition-all duration-300 z-40',
                isCollapsed ? 'w-20' : 'w-64'
            )}
        >
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-between h-20 px-4 border-b border-warm-gray-700">
                    <Link href="/dashboard" className="flex items-center">
                        <span
                            className={cn(
                                'font-serif text-xl font-medium whitespace-nowrap transition-opacity',
                                isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                            )}
                        >
                            {SITE_NAME}
                        </span>
                        {isCollapsed && (
                            <span className="font-serif text-xl font-medium">C</span>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                    {ADMIN_NAV_LINKS.map((link) => {
                        const Icon = iconMap[link.icon];
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                                    isActive
                                        ? 'bg-gold-500 text-white'
                                        : 'text-warm-gray-400 hover:bg-warm-gray-800 hover:text-white'
                                )}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                <span
                                    className={cn(
                                        'text-sm font-medium whitespace-nowrap transition-opacity',
                                        isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                                    )}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-3 border-t border-warm-gray-700 space-y-2">
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-warm-gray-400 hover:bg-warm-gray-800 hover:text-white transition-all duration-200"
                    >
                        <Settings size={20} className="flex-shrink-0" />
                        <span
                            className={cn(
                                'text-sm font-medium whitespace-nowrap transition-opacity',
                                isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                            )}
                        >
                            Settings
                        </span>
                    </Link>

                    <button
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-warm-gray-400 hover:bg-warm-gray-800 hover:text-white transition-all duration-200"
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        <span
                            className={cn(
                                'text-sm font-medium whitespace-nowrap transition-opacity',
                                isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                            )}
                        >
                            Logout
                        </span>
                    </button>
                </div>

                {/* Collapse Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute top-24 -right-3 p-1.5 bg-gold-500 text-white rounded-full shadow-md hover:bg-gold-600 transition-colors"
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>
        </aside>
    );
}

export function SidebarSpacer({ isCollapsed }: { isCollapsed?: boolean }) {
    return (
        <div
            className={cn(
                'flex-shrink-0 transition-all duration-300',
                isCollapsed ? 'w-20' : 'w-64'
            )}
        />
    );
}
