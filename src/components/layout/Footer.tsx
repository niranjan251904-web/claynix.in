import React from 'react';
import Link from 'next/link';
import { SITE_NAME, CATEGORIES } from '@/lib/constants';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
    Facebook,
    Instagram,
    Twitter,
    Mail,
    MapPin,
    Phone
} from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-charcoal text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* About */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <span className="font-serif text-2xl font-medium">{SITE_NAME}</span>
                        </Link>
                        <p className="text-warm-gray-400 text-sm leading-relaxed mb-4">
                            Handcrafted jewelry for the modern soul. Each piece is made with love,
                            precision, and the finest materials.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://facebook.com/claynix"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-warm-gray-800 rounded-full text-warm-gray-400 hover:text-gold-500 hover:bg-warm-gray-700 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="https://instagram.com/claynix"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-warm-gray-800 rounded-full text-warm-gray-400 hover:text-gold-500 hover:bg-warm-gray-700 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://x.com/Claynix_26"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-warm-gray-800 rounded-full text-warm-gray-400 hover:text-gold-500 hover:bg-warm-gray-700 transition-colors"
                                aria-label="X"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://wa.me/918129628680"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-warm-gray-800 rounded-full text-warm-gray-400 hover:text-gold-500 hover:bg-warm-gray-700 transition-colors"
                                aria-label="WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-medium text-lg mb-4">Shop</h4>
                        <ul className="space-y-3">
                            {CATEGORIES.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/shop?category=${category.id}`}
                                        className="text-warm-gray-400 hover:text-gold-500 transition-colors text-sm"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/shop"
                                    className="text-warm-gray-400 hover:text-gold-500 transition-colors text-sm"
                                >
                                    All Products
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="font-medium text-lg mb-4">Customer Care</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-warm-gray-400 hover:text-gold-500 transition-colors text-sm"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-warm-gray-400 hover:text-gold-500 transition-colors text-sm"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/size-guide"
                                    className="text-warm-gray-400 hover:text-gold-500 transition-colors text-sm"
                                >
                                    Size Guide
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/care-instructions"
                                    className="text-warm-gray-400 hover:text-gold-500 transition-colors text-sm"
                                >
                                    Jewelry Care
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-medium text-lg mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-warm-gray-400 text-sm">
                                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                                <span>Edappally Ernakulam, Kerala 682024</span>
                            </li>
                            <li className="flex items-center gap-3 text-warm-gray-400 text-sm">
                                <Phone size={16} className="flex-shrink-0" />
                                <a href="tel:+918129628680" className="hover:text-gold-500 transition-colors">
                                    +91 81296 28680
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-warm-gray-400 text-sm">
                                <Mail size={16} className="flex-shrink-0" />
                                <a href="mailto:claynix.in@gmail.com" className="hover:text-gold-500 transition-colors">
                                    claynix.in@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-warm-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-warm-gray-400">
                        <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="hover:text-gold-500 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-gold-500 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
