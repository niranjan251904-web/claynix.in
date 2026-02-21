'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn, formatPrice } from '@/lib/utils';
import { Product } from '@/lib/types';
import { Modal, ModalBody } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
    MessageCircle,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface ProductQuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

// WhatsApp number - update this with your actual WhatsApp business number
const WHATSAPP_NUMBER = '918129628680'; // Format: country code + number without +

export function ProductQuickView({
    product,
    isOpen,
    onClose,
}: ProductQuickViewProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
    const isOutOfStock = product.stock === 0;

    // Handle Chat to Buy - opens WhatsApp with product details
    const handleChatToBuy = () => {
        const price = hasDiscount ? product.discountedPrice : product.price;
        const message = encodeURIComponent(
            `Hi! I'm interested in buying:\n\n` +
            `*${product.name}*\n` +
            `Price: ₹${price?.toFixed(2)}\n` +
            `Product Link: ${window.location.origin}/shop/${product.slug || product.id}\n\n` +
            `Please share more details.`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev < product.images.length - 1 ? prev + 1 : 0
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev > 0 ? prev - 1 : product.images.length - 1
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalBody className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative aspect-square bg-warm-gray-100">
                        {/* Product Image */}
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-8xl opacity-30">💎</div>
                            </div>
                        )}

                        {/* Image Navigation */}
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                {/* Image Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {product.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={cn(
                                                'w-2 h-2 rounded-full transition-all',
                                                currentImageIndex === index
                                                    ? 'bg-charcoal w-4'
                                                    : 'bg-charcoal/30'
                                            )}
                                            aria-label={`View image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 md:p-8 flex flex-col">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {product.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant={tag === 'sale' ? 'sale' : tag === 'new' ? 'new' : 'default'}
                                >
                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                </Badge>
                            ))}
                        </div>

                        {/* Title */}
                        <h2 className="font-serif text-2xl font-medium text-charcoal mb-2">
                            {product.name}
                        </h2>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl font-semibold text-charcoal">
                                ₹ {hasDiscount ? product.discountedPrice?.toFixed(2) : product.price.toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <span className="text-lg text-warm-gray-400 line-through">
                                    ₹{product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-warm-gray-600 text-sm leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Material & Stone */}
                        <div className="flex flex-wrap gap-4 mb-6 text-sm">
                            <div>
                                <span className="text-warm-gray-500">Material:</span>
                                <span className="ml-2 font-medium text-charcoal">{product.material}</span>
                            </div>
                            {product.stone && (
                                <div>
                                    <span className="text-warm-gray-500">Stone:</span>
                                    <span className="ml-2 font-medium text-charcoal">{product.stone}</span>
                                </div>
                            )}
                        </div>

                        {/* Chat to Buy Action */}
                        <div className="flex gap-3 mt-auto">
                            <button
                                onClick={handleChatToBuy}
                                disabled={isOutOfStock}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-charcoal text-white text-base font-medium rounded-lg hover:bg-charcoal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <MessageCircle size={20} />
                                {isOutOfStock ? 'Out of Stock' : 'Chat to Buy'}
                            </button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
