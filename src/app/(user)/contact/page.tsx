'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const WHATSAPP_NUMBER = '918129628680';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleWhatsAppContact = () => {
        const message = `Hi! I'm contacting from the Claynix website.\n\nName: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\nSubject: ${formData.subject || 'General Inquiry'}\n\nMessage: ${formData.message || 'I have a question about your products.'}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-warm-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-warm-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-3xl md:text-4xl font-medium text-charcoal"
                    >
                        Contact Us
                    </motion.h1>
                    <p className="text-warm-gray-600 mt-3 max-w-2xl mx-auto">
                        We'd love to hear from you! Reach out to us with any questions, feedback, or just to say hello.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-8 shadow-sm border border-warm-gray-200"
                    >
                        <h2 className="font-serif text-2xl font-medium text-charcoal mb-6">
                            Send us a Message
                        </h2>
                        <div className="space-y-4">
                            <Input
                                label="Your Name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <Input
                                label="Subject"
                                placeholder="What is this about?"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 border border-warm-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>
                            <Button
                                onClick={handleWhatsAppContact}
                                className="w-full"
                                size="lg"
                                leftIcon={<MessageCircle size={18} />}
                            >
                                Send via WhatsApp
                            </Button>
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-gray-200">
                            <h2 className="font-serif text-2xl font-medium text-charcoal mb-6">
                                Get in Touch
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gold-100 rounded-full">
                                        <MapPin size={20} className="text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-charcoal">Address</h3>
                                        <p className="text-warm-gray-600 text-sm mt-1">
                                            Edappally Ernakulam, Kerala 682024
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gold-100 rounded-full">
                                        <Phone size={20} className="text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-charcoal">Phone</h3>
                                        <a href="tel:+918129628680" className="text-warm-gray-600 text-sm mt-1 hover:text-gold-600 transition-colors">
                                            +91 81296 28680
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gold-100 rounded-full">
                                        <Mail size={20} className="text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-charcoal">Email</h3>
                                        <a href="mailto:claynixin@gmail.com" className="text-warm-gray-600 text-sm mt-1 hover:text-gold-600 transition-colors">
                                            claynixin@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick WhatsApp Button */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
                            <h3 className="font-serif text-xl font-medium mb-3">
                                Need Quick Help?
                            </h3>
                            <p className="text-green-100 mb-6">
                                Chat with us directly on WhatsApp for instant support!
                            </p>
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-medium hover:bg-green-50 transition-colors"
                            >
                                <MessageCircle size={20} />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
