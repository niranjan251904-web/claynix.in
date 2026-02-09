'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-warm-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-warm-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <div className="p-3 bg-gold-100 rounded-full">
                            <Shield size={24} className="text-gold-600" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-4xl font-medium text-charcoal"
                    >
                        Privacy Policy
                    </motion.h1>
                    <p className="text-warm-gray-600 mt-3">
                        Last updated: February 2026
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 border border-warm-gray-200 shadow-sm"
                >
                    <div className="prose prose-warm-gray max-w-none">
                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Introduction</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                At Claynix, we are committed to protecting your privacy and ensuring the security of your personal information.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Information We Collect</h2>
                            <p className="text-warm-gray-600 leading-relaxed mb-4">
                                We collect information that you provide directly to us, including:
                            </p>
                            <ul className="list-disc list-inside text-warm-gray-600 space-y-2">
                                <li>Name and contact information (email address, phone number)</li>
                                <li>Shipping and billing address</li>
                                <li>Order and transaction details</li>
                                <li>Communication preferences</li>
                                <li>Any other information you choose to provide</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">How We Use Your Information</h2>
                            <p className="text-warm-gray-600 leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-warm-gray-600 space-y-2">
                                <li>Process and fulfill your orders</li>
                                <li>Communicate with you about your orders and inquiries</li>
                                <li>Send you updates about new products and promotions (with your consent)</li>
                                <li>Improve our products and services</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Information Sharing</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to fulfill your orders
                                (e.g., shipping partners) or as required by law. We may share anonymized, aggregated data for analytical purposes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Data Security</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                                However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Cookies</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences
                                and provide personalized content. You can disable cookies in your browser settings, but this may affect some website functionality.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Your Rights</h2>
                            <p className="text-warm-gray-600 leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside text-warm-gray-600 space-y-2">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Contact Us</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                If you have any questions about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-warm-gray-50 rounded-xl">
                                <p className="text-charcoal font-medium">Claynix</p>
                                <p className="text-warm-gray-600 text-sm">Email: claynixin@gmail.com</p>
                                <p className="text-warm-gray-600 text-sm">Phone: +91 81296 28680</p>
                                <p className="text-warm-gray-600 text-sm">Address: Edappally Ernakulam, Kerala 682024</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Changes to This Policy</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                                We encourage you to review this policy periodically.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
