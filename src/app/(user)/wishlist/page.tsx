'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Heart, ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistPage() {
    const { wishlistIds, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

    // Get products from sessionStorage (cached from homepage/shop)
    useEffect(() => {
        const cachedProducts = sessionStorage.getItem('claynix_products');
        if (cachedProducts) {
            try {
                const products: Product[] = JSON.parse(cachedProducts);
                const filtered = products.filter((p) => wishlistIds.includes(p.id));
                setWishlistProducts(filtered);
            } catch (e) {
                console.error('Failed to parse cached products', e);
            }
        }
    }, [wishlistIds]);

    if (wishlistProducts.length === 0 && wishlistIds.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 mx-auto bg-warm-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Heart size={32} className="text-warm-gray-400" />
                    </div>
                    <h1 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-4">
                        Your Wishlist is Empty
                    </h1>
                    <p className="text-warm-gray-600 mb-8 max-w-md">
                        Save your favorite pieces to your wishlist and never lose track of what you love.
                    </p>
                    <Link href="/shop">
                        <Button size="lg" leftIcon={<ArrowLeft size={18} />}>
                            Explore Collection
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
                        My Wishlist
                    </h1>
                    <p className="text-warm-gray-600 mt-2">
                        {wishlistIds.length} {wishlistIds.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>
            </div>

            {/* Wishlist Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden group"
                        >
                            {/* Image */}
                            <Link href={`/shop/${product.slug || product.id}`} className="block relative aspect-square overflow-hidden">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-warm-gray-100 flex items-center justify-center">
                                        <span className="text-4xl opacity-30">💎</span>
                                    </div>
                                )}
                            </Link>

                            {/* Product Info */}
                            <div className="p-4">
                                <Link href={`/shop/${product.slug || product.id}`}>
                                    <h3 className="font-medium text-charcoal hover:text-gold-600 transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="font-semibold text-lg text-charcoal">
                                        ₹ {product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}
                                    </span>
                                    {product.discountedPrice && product.discountedPrice < product.price && (
                                        <span className="text-sm text-warm-gray-400 line-through">
                                            ₹{product.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => addToCart(product.id)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/90 transition-colors"
                                    >
                                        <ShoppingBag size={16} />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => toggleWishlist(product.id)}
                                        className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors"
                                        aria-label="Remove from wishlist"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {wishlistIds.length > 0 && wishlistProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-warm-gray-600 mb-4">
                            You have {wishlistIds.length} items saved. Visit the shop to see your wishlist items.
                        </p>
                        <Link href="/shop">
                            <Button>Go to Shop</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
