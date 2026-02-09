'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

const WHATSAPP_NUMBER = '918129628680';

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate WhatsApp checkout message
    const handleWhatsAppCheckout = () => {
        const shipping = cart.total >= 999 ? 0 : 49;
        const finalTotal = cart.total + shipping;

        let message = `🛍️ *New Order from Claynix*\n\n`;
        message += `*Order Details:*\n`;
        message += `━━━━━━━━━━━━━━━━━\n\n`;

        cart.items.forEach((item, index) => {
            const price = item.product?.discountedPrice || item.product?.price || 0;
            message += `*${index + 1}. ${item.product?.name || 'Product'}*\n`;
            message += `   Qty: ${item.quantity} × ₹${price.toFixed(2)}\n`;
            message += `   Subtotal: ₹${(price * item.quantity).toFixed(2)}\n\n`;
        });

        message += `━━━━━━━━━━━━━━━━━\n`;
        message += `*Cart Subtotal:* ₹${cart.total.toFixed(2)}\n`;
        message += `*Shipping:* ${shipping === 0 ? 'Free 🎉' : `₹${shipping.toFixed(2)}`}\n`;
        message += `*Total Amount:* ₹${finalTotal.toFixed(2)}\n\n`;
        message += `━━━━━━━━━━━━━━━━━\n\n`;
        message += `Please confirm this order and share your delivery details:\n`;
        message += `📍 Name:\n`;
        message += `📍 Address:\n`;
        message += `📍 Phone:\n`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    if (!mounted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="w-20 h-20 mx-auto bg-warm-gray-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <ShoppingBag size={32} className="text-warm-gray-400" />
                </div>
                <p className="text-warm-gray-600">Loading your cart...</p>
            </div>
        );
    }

    if (cart.items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 mx-auto bg-warm-gray-100 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag size={32} className="text-warm-gray-400" />
                    </div>
                    <h1 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="text-warm-gray-600 mb-8 max-w-md">
                        Looks like you haven&apos;t added any jewelry to your cart yet. Explore our beautiful collection!
                    </p>
                    <Link href="/shop">
                        <Button size="lg" leftIcon={<ArrowLeft size={18} />}>
                            Continue Shopping
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-warm-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal">
                        Shopping Cart
                    </h1>
                    <p className="text-warm-gray-600 mt-2">
                        {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>
            </div>

            {/* Cart Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden divide-y divide-warm-gray-200">
                            {cart.items.map((item) => (
                                <div
                                    key={`${item.productId}-${item.variantId}`}
                                    className="p-4 flex gap-4"
                                >
                                    {/* Product Image */}
                                    <div className="w-24 h-24 bg-warm-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.product?.images && item.product.images.length > 0 ? (
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-2xl opacity-30">💎</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-charcoal line-clamp-1">
                                            {item.product?.name || 'Product'}
                                        </h3>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="font-semibold text-charcoal">
                                                ₹ {(item.product?.discountedPrice || item.product?.price || 0).toFixed(2)}
                                            </span>
                                            {item.product?.discountedPrice && item.product.discountedPrice < item.product.price && (
                                                <span className="text-sm text-warm-gray-400 line-through">
                                                    ₹{item.product.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center border border-warm-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                                                    className="p-2 hover:bg-warm-gray-50 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                                                    className="p-2 hover:bg-warm-gray-50 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.productId, item.variantId)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right">
                                        <span className="font-semibold text-charcoal">
                                            ₹ {((item.product?.discountedPrice || item.product?.price || 0) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Shopping */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                            <Link href="/shop">
                                <Button variant="outline" leftIcon={<ArrowLeft size={18} />}>
                                    Continue Shopping
                                </Button>
                            </Link>
                            <button
                                onClick={clearCart}
                                className="text-sm text-red-500 hover:text-red-600 font-medium"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-xl border border-warm-gray-200 p-6">
                                <h2 className="font-serif text-xl font-medium text-charcoal mb-4">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-warm-gray-600">Subtotal</span>
                                        <span className="font-medium text-charcoal">₹ {cart.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-warm-gray-600">Shipping</span>
                                        {cart.total >= 999 ? (
                                            <span className="font-medium text-green-600">Free</span>
                                        ) : (
                                            <span className="font-medium text-charcoal">₹ 49.00</span>
                                        )}
                                    </div>
                                    {cart.total < 999 && (
                                        <div className="text-xs text-gold-600 bg-gold-50 p-2 rounded-lg">
                                            Add ₹{(999 - cart.total).toFixed(2)} more for free shipping!
                                        </div>
                                    )}
                                    <div className="border-t border-warm-gray-200 pt-3">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-charcoal">Total</span>
                                            <span className="font-bold text-lg text-charcoal">
                                                ₹ {(cart.total >= 999 ? cart.total : cart.total + 49).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full" size="lg" onClick={handleWhatsAppCheckout}>
                                    Proceed to Checkout
                                </Button>
                            </div>

                            {/* Secure Checkout Note */}
                            <div className="mt-4 p-4 bg-warm-gray-50 rounded-xl border border-warm-gray-200">
                                <h4 className="font-medium text-charcoal mb-2">
                                    Secure Checkout
                                </h4>
                                <p className="text-sm text-warm-gray-600">
                                    Your payment information is encrypted and securely processed. We accept all major credit cards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
