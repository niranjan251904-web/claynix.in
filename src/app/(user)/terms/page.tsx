'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
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
                            <FileText size={24} className="text-gold-600" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-4xl font-medium text-charcoal"
                    >
                        Terms of Service
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
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Agreement to Terms</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                By accessing or using the Claynix website and purchasing our products, you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use our website or services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Products and Orders</h2>
                            <ul className="list-disc list-inside text-warm-gray-600 space-y-2">
                                <li>All products are handcrafted and may have slight variations, which adds to their unique character</li>
                                <li>Product images are for illustration purposes; actual colors may vary slightly</li>
                                <li>We reserve the right to refuse or cancel any order for any reason</li>
                                <li>Prices are subject to change without notice</li>
                                <li>Orders are processed via WhatsApp and confirmed through direct communication</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Pricing and Payment</h2>
                            <ul className="list-disc list-inside text-warm-gray-600 space-y-2">
                                <li>All prices are listed in Indian Rupees (₹) and include applicable taxes</li>
                                <li>Shipping is free for orders above ₹999; orders below ₹999 incur a ₹49 shipping fee</li>
                                <li>We accept UPI, bank transfers, and Cash on Delivery (COD) for select locations</li>
                                <li>Payment must be completed before or upon delivery depending on the chosen method</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Shipping and Delivery</h2>
                            <ul className="list-disc list-inside text-warm-gray-600 space-y-2">
                                <li>Orders are typically processed within 1-2 business days</li>
                                <li>Delivery takes 3-7 business days depending on location within India</li>
                                <li>We are not responsible for delays caused by shipping carriers or unforeseen circumstances</li>
                                <li>Risk of loss passes to you upon delivery to the shipping carrier</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Returns and Refunds</h2>
                            <ul className="list-disc list-inside text-warm-gray-600 space-y-2">
                                <li>Returns are accepted within 7 days of delivery for unused items in original packaging</li>
                                <li>Items must be in original condition with tags attached</li>
                                <li>Contact us via WhatsApp to initiate a return</li>
                                <li>Refunds are processed within 5-7 business days after receiving the returned item</li>
                                <li>Custom or personalized items are not eligible for returns</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Intellectual Property</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                All content on this website, including images, text, graphics, logos, and designs, is the property of Claynix and is protected by intellectual property laws.
                                You may not reproduce, distribute, or use any content without our written permission.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Product Care Disclaimer</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                Our jewelry requires proper care to maintain its beauty. Damage resulting from improper care, misuse, or normal wear and tear is not covered under our return policy.
                                Please refer to our Jewelry Care Guide for maintenance instructions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Limitation of Liability</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                Claynix shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services.
                                Our liability is limited to the purchase price of the product in question.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Governing Law</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                These Terms of Service are governed by and construed in accordance with the laws of India.
                                Any disputes shall be subject to the exclusive jurisdiction of the courts in Ernakulam, Kerala.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Contact Information</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                For any questions regarding these Terms of Service, please contact us:
                            </p>
                            <div className="mt-4 p-4 bg-warm-gray-50 rounded-xl">
                                <p className="text-charcoal font-medium">Claynix</p>
                                <p className="text-warm-gray-600 text-sm">Email: claynixin@gmail.com</p>
                                <p className="text-warm-gray-600 text-sm">Phone: +91 81296 28680</p>
                                <p className="text-warm-gray-600 text-sm">WhatsApp: +91 81296 28680</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Changes to Terms</h2>
                            <p className="text-warm-gray-600 leading-relaxed">
                                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website.
                                Your continued use of our services after any changes constitutes acceptance of the new terms.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
