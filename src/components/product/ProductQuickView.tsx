'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn, formatPrice } from '@/lib/utils';
import { Product } from '@/lib/types';
import { Modal, ModalBody } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    Heart,
    ShoppingBag,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    Check
} from 'lucide-react';

interface ProductQuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart?: (product: Product, variantId?: string, quantity?: number) => void;
    onToggleWishlist?: (product: Product) => void;
    isInWishlist?: boolean;
}

export function ProductQuickView({
    product,
    isOpen,
    onClose,
    onAddToCart,
    onToggleWishlist,
    isInWishlist = false,
}: ProductQuickViewProps) {
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
    const selectedVariantData = product.variants.find((v) => v.id === selectedVariant);
    const isOutOfStock = selectedVariantData ? selectedVariantData.stock === 0 : product.stock === 0;

    const handleAddToCart = () => {
        onAddToCart?.(product, selectedVariant || undefined, quantity);
        onClose();
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

                        {/* Variants */}
                        {product.variants.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-charcoal mb-3">
                                    {product.variants[0].size ? 'Size' : product.variants[0].color ? 'Color' : 'Option'}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant.id)}
                                            disabled={variant.stock === 0}
                                            className={cn(
                                                'px-4 py-2 border rounded-lg text-sm font-medium transition-all',
                                                selectedVariant === variant.id
                                                    ? 'border-gold-500 bg-gold-50 text-gold-700'
                                                    : 'border-warm-gray-300 text-charcoal hover:border-gold-300',
                                                variant.stock === 0 && 'opacity-50 cursor-not-allowed line-through'
                                            )}
                                        >
                                            {variant.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-charcoal mb-3">
                                Quantity
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 border border-warm-gray-300 rounded-lg hover:bg-warm-gray-50 transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 border border-warm-gray-300 rounded-lg hover:bg-warm-gray-50 transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-auto">
                            <Button
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className="flex-1"
                                leftIcon={<ShoppingBag size={18} />}
                            >
                                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                            <button
                                onClick={() => onToggleWishlist?.(product)}
                                className={cn(
                                    'p-3 border rounded-lg transition-all',
                                    isInWishlist
                                        ? 'bg-rose border-rose text-white'
                                        : 'border-warm-gray-300 text-charcoal hover:border-rose hover:text-rose'
                                )}
                                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
