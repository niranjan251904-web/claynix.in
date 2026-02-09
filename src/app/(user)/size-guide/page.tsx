'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Circle, Info } from 'lucide-react';

const ringSizes = [
    { indian: 6, us: 4, uk: 'H', circumference: '46.8 mm', diameter: '14.9 mm' },
    { indian: 7, us: 4.5, uk: 'I', circumference: '48.0 mm', diameter: '15.3 mm' },
    { indian: 8, us: 5, uk: 'J', circumference: '49.3 mm', diameter: '15.7 mm' },
    { indian: 9, us: 5.5, uk: 'K', circumference: '50.6 mm', diameter: '16.1 mm' },
    { indian: 10, us: 6, uk: 'L', circumference: '51.9 mm', diameter: '16.5 mm' },
    { indian: 11, us: 6.5, uk: 'M', circumference: '53.1 mm', diameter: '16.9 mm' },
    { indian: 12, us: 7, uk: 'N', circumference: '54.4 mm', diameter: '17.3 mm' },
    { indian: 13, us: 7.5, uk: 'O', circumference: '55.7 mm', diameter: '17.7 mm' },
    { indian: 14, us: 8, uk: 'P', circumference: '56.9 mm', diameter: '18.1 mm' },
    { indian: 15, us: 8.5, uk: 'Q', circumference: '58.2 mm', diameter: '18.5 mm' },
    { indian: 16, us: 9, uk: 'R', circumference: '59.5 mm', diameter: '19.0 mm' },
];

const braceletSizes = [
    { size: 'XS', wrist: '14-15 cm', bracelet: '16 cm' },
    { size: 'S', wrist: '15-16 cm', bracelet: '17 cm' },
    { size: 'M', wrist: '16-17 cm', bracelet: '18 cm' },
    { size: 'L', wrist: '17-18 cm', bracelet: '19 cm' },
    { size: 'XL', wrist: '18-19 cm', bracelet: '20 cm' },
];

const necklaceLengths = [
    { name: 'Choker', length: '35-40 cm / 14-16"', sits: 'Tight around the neck' },
    { name: 'Princess', length: '43-48 cm / 17-19"', sits: 'Below the collarbone' },
    { name: 'Matinee', length: '50-60 cm / 20-24"', sits: 'Above the bust' },
    { name: 'Opera', length: '70-86 cm / 28-34"', sits: 'At or below the bust' },
];

export default function SizeGuidePage() {
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
                            <Ruler size={24} className="text-gold-600" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-4xl font-medium text-charcoal"
                    >
                        Size Guide
                    </motion.h1>
                    <p className="text-warm-gray-600 mt-3 max-w-2xl mx-auto">
                        Find your perfect fit with our comprehensive sizing charts.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                {/* Ring Size Guide */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Circle size={24} className="text-gold-600" />
                        <h2 className="font-serif text-2xl font-medium text-charcoal">Ring Sizes</h2>
                    </div>

                    <div className="bg-white rounded-2xl border border-warm-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-warm-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Indian Size</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">US Size</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">UK Size</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Circumference</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Diameter</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-warm-gray-200">
                                    {ringSizes.map((size) => (
                                        <tr key={size.indian} className="hover:bg-warm-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-charcoal font-medium">{size.indian}</td>
                                            <td className="px-4 py-3 text-sm text-warm-gray-600">{size.us}</td>
                                            <td className="px-4 py-3 text-sm text-warm-gray-600">{size.uk}</td>
                                            <td className="px-4 py-3 text-sm text-warm-gray-600">{size.circumference}</td>
                                            <td className="px-4 py-3 text-sm text-warm-gray-600">{size.diameter}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-gold-50 rounded-xl border border-gold-200">
                        <div className="flex items-start gap-3">
                            <Info size={18} className="text-gold-600 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-charcoal text-sm">How to measure</h4>
                                <p className="text-warm-gray-600 text-sm mt-1">
                                    Wrap a piece of string or paper around your finger, mark where it overlaps, and measure the length in mm. Match this to the circumference column.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Bracelet Size Guide */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Circle size={24} className="text-gold-600" />
                        <h2 className="font-serif text-2xl font-medium text-charcoal">Bracelet Sizes</h2>
                    </div>

                    <div className="bg-white rounded-2xl border border-warm-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-warm-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Size</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Wrist Size</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Bracelet Length</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-warm-gray-200">
                                    {braceletSizes.map((size) => (
                                        <tr key={size.size} className="hover:bg-warm-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-charcoal font-medium">{size.size}</td>
                                            <td className="px-4 py-3 text-sm text-warm-gray-600">{size.wrist}</td>
                                            <td className="px-4 py-3 text-sm text-warm-gray-600">{size.bracelet}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.section>

                {/* Necklace Length Guide */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Circle size={24} className="text-gold-600" />
                        <h2 className="font-serif text-2xl font-medium text-charcoal">Necklace Lengths</h2>
                    </div>

                    <div className="bg-white rounded-2xl border border-warm-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-warm-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Style</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Length</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Where it Sits</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-warm-gray-200">
                                    {necklaceLengths.map((style) => (
                                        <tr key={style.name} className="hover:bg-warm-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-charcoal font-medium">{style.name}</td>
                                            <td className="px-4 py-3 text-sm text-warm-gray-600">{style.length}</td>
                                            <td className="px-4 py-3 text-sm text-warm-gray-600">{style.sits}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.section>

                {/* Adjustable Jewelry Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-gold-100 to-rose-100 rounded-2xl p-8 text-center"
                >
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                        Most of Our Jewelry is Adjustable! ✨
                    </h3>
                    <p className="text-warm-gray-600 max-w-2xl mx-auto">
                        Don't worry if you're between sizes. Many of our rings and bracelets are adjustable to ensure a perfect fit. Check the product description for specific sizing information.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
