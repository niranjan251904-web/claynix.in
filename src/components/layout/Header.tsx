'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import {
    Search,
    ShoppingBag,
    Heart,
    User,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';

interface HeaderProps {
    transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartCount] = useState(0); // Will be connected to cart context

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClasses = cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        {
            'bg-white/95 backdrop-blur-md shadow-sm': isScrolled || !transparent,
            'bg-transparent': !isScrolled && transparent,
        }
    );

    return (
        <>
            <header className={headerClasses}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-charcoal hover:text-gold-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span className="font-serif text-2xl md:text-3xl font-medium text-charcoal tracking-tight">
                                {SITE_NAME}
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {NAV_LINKS.slice(0, 5).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-charcoal hover:text-gold-600 transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <Link
                                href="/search"
                                className="p-2 text-charcoal hover:text-gold-600 transition-colors"
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Header Spacer */}
            <div className="h-16 md:h-20" />
        </>
    );
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-charcoal/50 z-50"
                        onClick={onClose}
                    />

                    {/* Menu */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-charcoal hover:text-gold-600 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>

                            {/* Logo */}
                            <Link href="/" onClick={onClose} className="block mb-8">
                                <span className="font-serif text-2xl font-medium text-charcoal">
                                    {SITE_NAME}
                                </span>
                            </Link>

                            {/* Navigation Links - Two Column Layout */}
                            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                                {/* Shop Section */}
                                <div>
                                    <h3 className="font-serif text-base font-medium text-charcoal mb-3">Shop</h3>
                                    <nav className="space-y-2">
                                        {NAV_LINKS.slice(2).map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={onClose}
                                                className="block text-sm text-warm-gray-600 hover:text-gold-600 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                        <Link
                                            href="/shop?category=clay-jewelry"
                                            onClick={onClose}
                                            className="block text-sm text-warm-gray-600 hover:text-gold-600 transition-colors"
                                        >
                                            Clay Jewelry
                                        </Link>
                                        <Link
                                            href="/shop?category=phone-charms"
                                            onClick={onClose}
                                            className="block text-sm text-warm-gray-600 hover:text-gold-600 transition-colors"
                                        >
                                            Phone Charms
                                        </Link>
                                        <Link
                                            href="/shop"
                                            onClick={onClose}
                                            className="block text-sm text-gold-600 font-medium hover:text-gold-700 transition-colors"
                                        >
                                            All Products
                                        </Link>
                                    </nav>
                                </div>

                                {/* Customer Care Section */}
                                <div>
                                    <h3 className="font-serif text-base font-medium text-charcoal mb-3">Customer Care</h3>
                                    <nav className="space-y-2">
                                        <Link
                                            href="/contact"
                                            onClick={onClose}
                                            className="block text-sm text-warm-gray-600 hover:text-gold-600 transition-colors"
                                        >
                                            Contact Us
                                        </Link>
                                        <Link
                                            href="/faq"
                                            onClick={onClose}
                                            className="block text-sm text-warm-gray-600 hover:text-gold-600 transition-colors"
                                        >
                                            FAQ
                                        </Link>
                                        <Link
                                            href="/size-guide"
                                            onClick={onClose}
                                            className="block text-sm text-warm-gray-600 hover:text-gold-600 transition-colors"
                                        >
                                            Size Guide
                                        </Link>
                                        <Link
                                            href="/shipping"
                                            onClick={onClose}
                                            className="block text-sm text-warm-gray-600 hover:text-gold-600 transition-colors"
                                        >
                                            Shipping Info
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
