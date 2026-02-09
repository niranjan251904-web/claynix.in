'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProducts } from '@/lib/productService';
import { semanticSearch } from '@/lib/searchUtils';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductQuickView } from '@/components/product/ProductQuickView';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/lib/types';
import { Search as SearchIcon, X, Sparkles, Clock } from 'lucide-react';

const categories = [
    { id: 'necklaces', name: 'Necklaces', image: '/images/categories/necklaces.jpg' },
    { id: 'rings', name: 'Rings', image: '/images/categories/rings.jpg' },
    { id: 'earrings', name: 'Earrings', image: '/images/categories/earrings.jpg' },
    { id: 'bracelets', name: 'Bracelets', image: '/images/categories/bracelets.jpg' },
    { id: 'clay-jewelry', name: 'Clay Jewelry', image: '/images/categories/clay-jewelry.jpg' },
    { id: 'phone-charms', name: 'Phone Charms', image: '/images/categories/phone-charms.jpg' },
    { id: 'handmade-jewelry', name: 'Handmade Jewelry', image: '/images/categories/handmade-jewelry.jpg' },
];

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const { addToCart } = useCart();
    const { wishlistIds, toggleWishlist } = useWishlist();

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    // Semantic search results
    const results = useMemo(() => {
        return debouncedQuery.length > 1 ? semanticSearch(allProducts, debouncedQuery) : [];
    }, [allProducts, debouncedQuery]);

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setAllProducts(products);

                // Sort by createdAt descending and take first 4 for recent
                const sorted = products
                    .filter(p => p.isActive)
                    .sort((a, b) => {
                        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                        return dateB - dateA;
                    })
                    .slice(0, 4);
                setRecentProducts(sorted);

                // Cache products in sessionStorage
                sessionStorage.setItem('claynix_products', JSON.stringify(products));
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Search Header */}
            <div className="bg-white border-b border-warm-gray-200 sticky top-16 md:top-20 z-30">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="relative">
                        <SearchIcon
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray-400"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for jewelry..."
                            className="w-full pl-12 pr-12 py-4 rounded-xl bg-warm-gray-50 border border-warm-gray-200 text-charcoal placeholder:text-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                            autoFocus
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-warm-gray-400 hover:text-charcoal"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {query.length > 1 ? (
                    <>
                        {/* Results Count */}
                        <p className="text-warm-gray-600 mb-6">
                            {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                        </p>

                        {results.length > 0 ? (
                            <ProductGrid
                                products={results}
                                onQuickView={setSelectedProduct}
                            />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12"
                            >
                                <div className="text-6xl mb-4">🔍</div>
                                <h2 className="font-serif text-xl font-medium text-charcoal mb-2">
                                    No results found
                                </h2>
                                <p className="text-warm-gray-600 mb-6">
                                    Try searching with different keywords
                                </p>
                                <Link href="/shop" className="text-gold-600 font-medium hover:text-gold-700">
                                    Browse all products
                                </Link>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Browse Categories */}
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles size={20} className="text-gold-500" />
                            <h2 className="font-serif text-xl font-medium text-charcoal">Browse Categories</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                            {categories.map((category, index) => (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={`/shop?category=${category.id}`}
                                        className="block relative aspect-square rounded-2xl overflow-hidden group"
                                    >
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.currentTarget.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-medium text-lg">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recently Arrived */}
                        <div className="flex items-center gap-2 mb-6">
                            <Clock size={20} className="text-gold-500" />
                            <h2 className="font-serif text-xl font-medium text-charcoal">Recently Arrived</h2>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="aspect-square bg-warm-gray-100 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : recentProducts.length > 0 ? (
                            <ProductGrid
                                products={recentProducts}
                                onQuickView={setSelectedProduct}
                            />
                        ) : (
                            <div className="text-center py-8 text-warm-gray-500">
                                <p>No recent products to display</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Quick View Modal */}
            <ProductQuickView
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={(product, variantId, quantity) => addToCart(product.id, variantId, quantity)}
                onToggleWishlist={(product) => toggleWishlist(product.id)}
                isInWishlist={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
            />
        </div>
    );
}
