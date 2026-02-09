'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn, formatPrice } from '@/lib/utils';
import { Product } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { MessageCircle, Eye } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
}

// WhatsApp number - update this with your actual WhatsApp business number
const WHATSAPP_NUMBER = '918129628680'; // Format: country code + number without +

export function ProductCard({
    product,
    onQuickView,
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100)
        : 0;

    // Get tag badge variant
    const getTagVariant = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'new':
                return 'new';
            case 'sale':
                return 'sale';
            case 'limited':
                return 'limited';
            case 'bestseller':
            case 'trending':
                return 'luxury';
            default:
                return 'default';
        }
    };

    // Handle Chat to Buy - opens WhatsApp with product details
    const handleChatToBuy = (e: React.MouseEvent) => {
        e.preventDefault();
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

    return (
        <motion.div
            className="group relative bg-white rounded-xl border border-warm-gray-200 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            {/* Image Container */}
            <Link href={`/shop/${product.slug || product.id}`} className="block relative aspect-square overflow-hidden">
                {/* Placeholder */}
                {!imageLoaded && (
                    <div className="absolute inset-0 shimmer bg-warm-gray-200" />
                )}

                {/* Product Image */}
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className={cn(
                            "w-full h-full object-cover",
                            "transition-transform duration-500 group-hover:scale-105"
                        )}
                        onLoad={() => setImageLoaded(true)}
                    />
                ) : (
                    <div
                        className={cn(
                            "w-full h-full bg-gradient-to-br from-warm-gray-100 to-warm-gray-200 flex items-center justify-center",
                            "transition-transform duration-500 group-hover:scale-105"
                        )}
                    >
                        {/* Placeholder jewelry icon */}
                        <div className="text-6xl opacity-30">💎</div>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {hasDiscount && (
                        <Badge variant="sale">-{discountPercent}%</Badge>
                    )}
                    {product.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant={getTagVariant(tag)}>
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </Badge>
                    ))}
                </div>

                {/* Action Buttons (appear on hover) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    className="absolute bottom-3 left-3 right-3 flex gap-2"
                >
                    <button
                        onClick={handleChatToBuy}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors"
                    >
                        <MessageCircle size={16} />
                        Chat to Buy
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onQuickView?.(product);
                        }}
                        className="p-2.5 bg-white rounded-lg hover:bg-warm-gray-100 transition-colors"
                        aria-label="Quick view"
                    >
                        <Eye size={16} className="text-charcoal" />
                    </button>
                </motion.div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                <Link href={`/shop/${product.slug}`}>
                    <h3 className="font-medium text-charcoal hover:text-gold-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm text-warm-gray-500 mt-1">{product.material}</p>

                <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                    <span className="font-semibold text-lg text-charcoal whitespace-nowrap">
                        ₹{hasDiscount ? product.discountedPrice?.toFixed(2) : product.price.toFixed(2)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-warm-gray-400 line-through whitespace-nowrap">
                            ₹{product.price.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
