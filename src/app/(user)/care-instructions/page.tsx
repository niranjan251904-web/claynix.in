'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Droplets, Sun, AlertTriangle, Shield, Heart } from 'lucide-react';

const careTips = [
    {
        icon: Droplets,
        title: 'Keep Away from Water',
        description: 'Remove jewelry before swimming, showering, or washing hands. Water can damage the plating and cause tarnishing.',
        color: 'blue',
    },
    {
        icon: Sparkles,
        title: 'Avoid Chemicals',
        description: 'Keep your jewelry away from perfumes, lotions, hairspray, and cleaning products. Apply these before wearing your jewelry.',
        color: 'purple',
    },
    {
        icon: Sun,
        title: 'Store Properly',
        description: 'Store your jewelry in a cool, dry place away from direct sunlight. Use the pouch or box provided to prevent scratches.',
        color: 'amber',
    },
    {
        icon: Shield,
        title: 'Clean Gently',
        description: 'Use a soft, dry cloth to gently wipe your jewelry after each wear. This removes oils and maintains shine.',
        color: 'green',
    },
];

const dosDonts = {
    dos: [
        'Remove jewelry before sleeping',
        'Put jewelry on last, after makeup and perfume',
        'Store pieces separately to avoid scratching',
        'Clean regularly with a soft microfiber cloth',
        'Keep in airtight bags to prevent oxidation',
        'Handle with clean, dry hands',
    ],
    donts: [
        'Wear while exercising or swimming',
        'Expose to harsh chemicals or chlorine',
        'Store in humid bathrooms',
        'Pull or tug on delicate chains',
        'Wear during household chores',
        'Sleep with jewelry on',
    ],
};

const materialCare = [
    {
        material: 'Gold Plated Stainless Steel',
        tips: [
            'Extremely durable and resistant to rust',
            'Wipe with a soft cloth after wearing',
            'Avoid abrasive cleaners',
            'Safe for daily wear with proper care',
        ],
    },
    {
        material: 'Polymer Clay Jewelry',
        tips: [
            'Handle with care - avoid dropping',
            'Keep away from extreme heat',
            'Clean with a slightly damp cloth',
            'Store flat to prevent warping',
        ],
    },
    {
        material: 'Cubic Zirconia / AD Stones',
        tips: [
            'Clean with a soft brush and mild soap solution',
            'Rinse thoroughly and pat dry',
            'Avoid ultrasonic cleaners',
            'Store separately to prevent scratching',
        ],
    },
];

export default function CareInstructionsPage() {
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
                            <Heart size={24} className="text-gold-600" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-4xl font-medium text-charcoal"
                    >
                        Jewelry Care Guide
                    </motion.h1>
                    <p className="text-warm-gray-600 mt-3 max-w-2xl mx-auto">
                        Keep your Claynix pieces looking beautiful for years to come with these care tips.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                {/* Essential Care Tips */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="font-serif text-2xl font-medium text-charcoal mb-6 text-center">
                        Essential Care Tips
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {careTips.map((tip, index) => (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                className="bg-white rounded-2xl p-6 border border-warm-gray-200 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gold-100 rounded-full flex-shrink-0">
                                        <tip.icon size={20} className="text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-charcoal mb-2">{tip.title}</h3>
                                        <p className="text-warm-gray-600 text-sm">{tip.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Do's and Don'ts */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="font-serif text-2xl font-medium text-charcoal mb-6 text-center">
                        Do's & Don'ts
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                            <h3 className="font-medium text-green-800 mb-4 flex items-center gap-2">
                                <span className="text-lg">✓</span> Do's
                            </h3>
                            <ul className="space-y-3">
                                {dosDonts.dos.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-green-700 text-sm">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                            <h3 className="font-medium text-red-800 mb-4 flex items-center gap-2">
                                <span className="text-lg">✗</span> Don'ts
                            </h3>
                            <ul className="space-y-3">
                                {dosDonts.donts.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-red-700 text-sm">
                                        <span className="text-red-500 mt-0.5">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Material-Specific Care */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="font-serif text-2xl font-medium text-charcoal mb-6 text-center">
                        Care by Material
                    </h2>
                    <div className="space-y-4">
                        {materialCare.map((material) => (
                            <div
                                key={material.material}
                                className="bg-white rounded-2xl p-6 border border-warm-gray-200"
                            >
                                <h3 className="font-medium text-charcoal mb-4">{material.material}</h3>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {material.tips.map((tip) => (
                                        <li key={tip} className="flex items-start gap-2 text-warm-gray-600 text-sm">
                                            <Sparkles size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Warning Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-amber-50 rounded-2xl p-6 border border-amber-200"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 rounded-full flex-shrink-0">
                            <AlertTriangle size={20} className="text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-amber-800 mb-2">Important Note</h3>
                            <p className="text-amber-700 text-sm">
                                While our jewelry is designed to be durable and long-lasting, improper care can reduce its lifespan.
                                Following these guidelines will help ensure your pieces stay beautiful for years to come.
                                If you have any questions about caring for your jewelry, please don't hesitate to contact us!
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Love Your Jewelry Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-gold-100 to-rose-100 rounded-2xl p-8 text-center"
                >
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                        Love Your Jewelry, and It Will Love You Back! 💕
                    </h3>
                    <p className="text-warm-gray-600 max-w-2xl mx-auto">
                        With proper care, your Claynix pieces will remain a cherished part of your collection for years.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
