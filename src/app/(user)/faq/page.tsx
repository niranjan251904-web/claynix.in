'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        category: 'Orders & Shipping',
        questions: [
            {
                question: 'How long does shipping take?',
                answer: 'We typically process orders within 1-2 business days. Delivery takes 3-7 business days depending on your location within India. For remote areas, it may take up to 10 days.',
            },
            {
                question: 'Is shipping free?',
                answer: 'Yes! We offer free shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹49 applies.',
            },
            {
                question: 'Can I track my order?',
                answer: 'Absolutely! Once your order is shipped, you will receive a tracking number via WhatsApp and SMS. You can use this to track your package in real-time.',
            },
            {
                question: 'Do you ship internationally?',
                answer: 'Currently, we only ship within India. We are working on expanding to international shipping soon!',
            },
        ],
    },
    {
        category: 'Products & Quality',
        questions: [
            {
                question: 'Are your products anti-tarnish?',
                answer: 'Yes! All our gold-plated and stainless steel jewelry is anti-tarnish coated, ensuring your pieces stay beautiful for a long time with proper care.',
            },
            {
                question: 'What materials do you use?',
                answer: 'We use high-quality stainless steel with gold plating for most of our pieces. Our clay jewelry is handcrafted using premium polymer clay. All materials are hypoallergenic and skin-safe.',
            },
            {
                question: 'Are the rings adjustable?',
                answer: 'Most of our rings are adjustable to fit a range of sizes. Please check the product description for specific sizing information.',
            },
            {
                question: 'How do I care for my jewelry?',
                answer: 'Keep your jewelry away from water, perfume, and chemicals. Store in a cool, dry place. Clean gently with a soft cloth. Check our Jewelry Care page for detailed instructions.',
            },
        ],
    },
    {
        category: 'Returns & Exchanges',
        questions: [
            {
                question: 'What is your return policy?',
                answer: 'We accept returns within 7 days of delivery for unused items in original packaging. Contact us on WhatsApp to initiate a return.',
            },
            {
                question: 'Can I exchange a product?',
                answer: 'Yes, exchanges are available for items of equal or greater value. Please reach out to us within 7 days of receiving your order.',
            },
            {
                question: 'How long do refunds take?',
                answer: 'Once we receive your returned item, refunds are processed within 5-7 business days to your original payment method.',
            },
        ],
    },
    {
        category: 'Payment & Security',
        questions: [
            {
                question: 'What payment methods do you accept?',
                answer: 'We currently process orders via WhatsApp and accept UPI, bank transfers, and cash on delivery (COD) for select locations.',
            },
            {
                question: 'Is my payment information secure?',
                answer: 'Absolutely! We never store your payment details. All transactions are processed securely through trusted payment gateways.',
            },
        ],
    },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-warm-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left hover:text-gold-600 transition-colors"
            >
                <span className="font-medium text-charcoal pr-8">{question}</span>
                <ChevronDown
                    size={20}
                    className={`text-warm-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-warm-gray-600 text-sm leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQPage() {
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
                            <HelpCircle size={24} className="text-gold-600" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-4xl font-medium text-charcoal"
                    >
                        Frequently Asked Questions
                    </motion.h1>
                    <p className="text-warm-gray-600 mt-3 max-w-2xl mx-auto">
                        Find answers to common questions about our products, orders, and policies.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {faqs.map((category, index) => (
                    <motion.div
                        key={category.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-8"
                    >
                        <h2 className="font-serif text-xl font-medium text-charcoal mb-4">
                            {category.category}
                        </h2>
                        <div className="bg-white rounded-2xl border border-warm-gray-200 px-6">
                            {category.questions.map((faq) => (
                                <FAQItem
                                    key={faq.question}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* Still have questions? */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center bg-gradient-to-r from-gold-100 to-rose-100 rounded-2xl p-8"
                >
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-warm-gray-600 mb-6">
                        Can't find what you're looking for? We're here to help!
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-xl font-medium hover:bg-charcoal/90 transition-colors"
                    >
                        Contact Us
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
