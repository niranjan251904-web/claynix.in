'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

interface ProductGridProps {
    products: Product[];
    isLoading?: boolean;
    onQuickView?: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
    onToggleWishlist?: (product: Product) => void;
    wishlistIds?: string[];
    columns?: 2 | 3 | 4;
    className?: string;
}

export function ProductGrid({
    products,
    isLoading = false,
    onQuickView,
    onAddToCart,
    onToggleWishlist,
    wishlistIds = [],
    columns = 4,
    className,
}: ProductGridProps) {
    if (isLoading) {
        return <ProductGridSkeleton count={8} />;
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                    No products found
                </h3>
                <p className="text-warm-gray-500">
                    Try adjusting your filters or search term
                </p>
            </div>
        );
    }

    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    };

    return (
        <div
            className={cn(
                'grid gap-4 md:gap-6',
                gridCols[columns],
                className
            )}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isInWishlist={wishlistIds.includes(product.id)}
                />
            ))}
        </div>
    );
}
