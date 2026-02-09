'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
    User,
    Package,
    Heart,
    MapPin,
    CreditCard,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react';

const menuItems = [
    { icon: Package, label: 'Orders', href: '/account/orders', description: 'Track your orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist', description: 'Your saved items' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses', description: 'Manage addresses' },
    { icon: CreditCard, label: 'Payment Methods', href: '/account/payment', description: 'Saved cards' },
    { icon: Settings, label: 'Settings', href: '/account/settings', description: 'Account settings' },
];

export default function AccountPage() {
    // In a real app, this would check auth state
    const isLoggedIn = false;

    if (!isLoggedIn) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md"
                >
                    <div className="w-20 h-20 mx-auto bg-gold-100 rounded-full flex items-center justify-center mb-6">
                        <User size={32} className="text-gold-600" />
                    </div>
                    <h1 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-4">
                        Welcome to Claynix
                    </h1>
                    <p className="text-warm-gray-600 mb-8">
                        Sign in to access your account, track orders, and manage your wishlist.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/login">
                            <Button size="lg" className="w-full sm:w-auto">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-br from-charcoal to-warm-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white text-2xl font-serif font-medium">
                            J
                        </div>
                        <div>
                            <h1 className="font-serif text-2xl font-medium text-white">
                                John Doe
                            </h1>
                            <p className="text-warm-gray-300">john@example.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden">
                    {menuItems.map((item, index) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center justify-between p-4 hover:bg-warm-gray-50 transition-colors ${index < menuItems.length - 1 ? 'border-b border-warm-gray-100' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-warm-gray-100 rounded-full flex items-center justify-center">
                                    <item.icon size={20} className="text-charcoal" />
                                </div>
                                <div>
                                    <p className="font-medium text-charcoal">{item.label}</p>
                                    <p className="text-sm text-warm-gray-500">{item.description}</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-warm-gray-400" />
                        </Link>
                    ))}
                </div>

                {/* Logout Button */}
                <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-red-500 hover:text-red-600 font-medium">
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
