'use client';

import React, { useState, useMemo, Suspense, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getProducts } from '@/lib/productService';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductQuickView } from '@/components/product/ProductQuickView';
import { ProductFilters, MobileFilters, defaultFilters, FilterState } from '@/components/product/ProductFilters';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

function ShopContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        ...defaultFilters,
        category: categoryParam || null,
    });
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { addToCart } = useCart();
    const { wishlistIds, toggleWishlist } = useWishlist();

    // Fetch products from Firestore
    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            const products = await getProducts();
            setProductsList(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = productsList.filter((p) => p.isActive);

        // Category filter
        if (filters.category) {
            result = result.filter((p) => p.categories?.includes(filters.category!));
        }

        // Price range filter
        result = result.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // Material filter
        if (filters.materials.length > 0) {
            result = result.filter((p) => p.material && filters.materials.includes(p.material));
        }

        // Stone filter
        if (filters.stones.length > 0) {
            result = result.filter((p) => p.stone && filters.stones.includes(p.stone));
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case 'newest':
            default:
                result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                break;
        }

        return result;
    }, [productsList, filters, sortBy]);

    const categoryName = filters.category
        ? CATEGORIES.find((c) => c.id === filters.category)?.name
        : 'All Jewelry';

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-br from-charcoal to-warm-gray-900 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-3xl md:text-5xl font-medium text-white mb-4"
                    >
                        {categoryName}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-warm-gray-300 max-w-2xl mx-auto"
                    >
                        Discover our exquisite collection of handcrafted jewelry
                    </motion.p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Filters Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <ProductFilters
                                filters={filters}
                                onFiltersChange={setFilters}
                                onClearFilters={() => setFilters(defaultFilters)}
                            />
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setShowMobileFilters(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-warm-gray-300 rounded-lg text-sm font-medium"
                                >
                                    <SlidersHorizontal size={18} />
                                    Filters
                                </button>

                                <p className="text-sm text-warm-gray-600">
                                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                                </p>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="appearance-none px-4 py-2 pr-10 bg-white border border-warm-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                                <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* Products */}
                        <ProductGrid
                            products={filteredProducts}
                            onQuickView={setSelectedProduct}
                            columns={3}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            <MobileFilters
                isOpen={showMobileFilters}
                onClose={() => setShowMobileFilters(false)}
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={() => setFilters(defaultFilters)}
            />

            {/* Quick View Modal */}
            <ProductQuickView
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}

function ShopLoading() {
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-br from-charcoal to-warm-gray-900 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="h-12 w-48 bg-warm-gray-700 rounded mx-auto mb-4 animate-pulse" />
                    <div className="h-6 w-96 bg-warm-gray-700 rounded mx-auto animate-pulse" />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProductGridSkeleton count={6} />
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<ShopLoading />}>
            <ShopContent />
        </Suspense>
    );
}
