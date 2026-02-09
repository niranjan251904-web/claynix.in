'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn, formatPrice } from '@/lib/utils';
import { CartItem as CartItemType } from '@/lib/types';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (quantity: number) => void;
    onRemove: () => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const [swipeOffset, setSwipeOffset] = React.useState(0);
    const [isRemoving, setIsRemoving] = React.useState(false);

    const handlers = useSwipeable({
        onSwiping: (e) => {
            if (e.dir === 'Left') {
                setSwipeOffset(Math.min(0, e.deltaX));
            }
        },
        onSwipedLeft: () => {
            if (swipeOffset < -80) {
                setIsRemoving(true);
                setTimeout(onRemove, 300);
            } else {
                setSwipeOffset(0);
            }
        },
        onTouchEndOrOnMouseUp: () => {
            if (swipeOffset > -80) {
                setSwipeOffset(0);
            }
        },
        trackMouse: false,
        trackTouch: true,
    });

    if (!item.product) return null;

    const variant = item.product.variants.find((v) => v.id === item.variantId);

    return (
        <motion.div
            {...handlers}
            initial={{ opacity: 1, height: 'auto' }}
            animate={{
                opacity: isRemoving ? 0 : 1,
                height: isRemoving ? 0 : 'auto',
                x: swipeOffset
            }}
            className="relative bg-white border-b border-warm-gray-100 last:border-b-0"
        >
            {/* Delete Background */}
            <div
                className={cn(
                    "absolute right-0 top-0 bottom-0 w-20 bg-red-500 flex items-center justify-center",
                    swipeOffset < -20 ? 'opacity-100' : 'opacity-0'
                )}
            >
                <X size={24} className="text-white" />
            </div>

            <div className="flex gap-4 p-4">
                {/* Product Image */}
                <Link
                    href={`/shop/${item.product.slug}`}
                    className="relative w-20 h-20 flex-shrink-0 bg-warm-gray-100 rounded-lg overflow-hidden"
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl opacity-30">💎</span>
                    </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-medium text-charcoal hover:text-gold-600 transition-colors line-clamp-1"
                    >
                        {item.product.name}
                    </Link>

                    {variant && (
                        <p className="text-sm text-warm-gray-500 mt-0.5">
                            {variant.name}
                        </p>
                    )}

                    <p className="font-medium text-charcoal mt-1">
                        {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={() => onUpdateQuantity(item.quantity - 1)}
                            className="p-1 border border-warm-gray-300 rounded hover:bg-warm-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.quantity + 1)}
                            className="p-1 border border-warm-gray-300 rounded hover:bg-warm-gray-50 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>

                {/* Remove Button (Desktop) */}
                <button
                    onClick={onRemove}
                    className="hidden md:flex p-2 text-warm-gray-400 hover:text-red-500 transition-colors self-start"
                    aria-label="Remove item"
                >
                    <X size={18} />
                </button>
            </div>
        </motion.div>
    );
}

interface CartSummaryProps {
    subtotal: number;
    shipping?: number;
    tax?: number;
    total: number;
    onCheckout?: () => void;
    isLoading?: boolean;
}

export function CartSummary({
    subtotal,
    shipping = 0,
    tax = 0,
    total,
    onCheckout,
    isLoading = false,
}: CartSummaryProps) {
    const freeShippingThreshold = 200;
    const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const hasFreeShipping = subtotal >= freeShippingThreshold;

    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 p-6">
            <h3 className="font-serif text-lg font-medium text-charcoal mb-4">
                Order Summary
            </h3>

            {/* Free Shipping Progress */}
            {!hasFreeShipping && subtotal > 0 && (
                <div className="mb-4 p-3 bg-gold-50 rounded-lg">
                    <p className="text-sm text-gold-700">
                        Add <span className="font-medium">{formatPrice(amountToFreeShipping)}</span> more for free shipping!
                    </p>
                    <div className="mt-2 h-2 bg-gold-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gold-500 transition-all duration-500"
                            style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-warm-gray-600">Subtotal</span>
                    <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-warm-gray-600">Shipping</span>
                    <span className="font-medium text-charcoal">
                        {hasFreeShipping ? (
                            <span className="text-emerald">Free</span>
                        ) : shipping > 0 ? (
                            formatPrice(shipping)
                        ) : (
                            'Calculated at checkout'
                        )}
                    </span>
                </div>

                {tax > 0 && (
                    <div className="flex justify-between">
                        <span className="text-warm-gray-600">Tax</span>
                        <span className="font-medium text-charcoal">{formatPrice(tax)}</span>
                    </div>
                )}

                <div className="pt-3 border-t border-warm-gray-200 flex justify-between">
                    <span className="font-medium text-charcoal">Total</span>
                    <span className="font-serif text-xl font-medium text-charcoal">
                        {formatPrice(total)}
                    </span>
                </div>
            </div>

            <Link
                href="/checkout"
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-medium rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all"
            >
                <ShoppingBag size={18} />
                Proceed to Checkout
            </Link>

            <p className="mt-4 text-xs text-center text-warm-gray-500">
                Secure checkout powered by Stripe
            </p>
        </div>
    );
}
