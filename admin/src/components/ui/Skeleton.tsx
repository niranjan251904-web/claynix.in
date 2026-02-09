import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'shimmer' | 'none';
}

export function Skeleton({
    className,
    variant = 'rectangular',
    width,
    height,
    animation = 'shimmer',
}: SkeletonProps) {
    const variants = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const animations = {
        pulse: 'animate-pulse bg-warm-gray-200',
        shimmer: 'shimmer',
        none: 'bg-warm-gray-200',
    };

    return (
        <div
            className={cn(variants[variant], animations[animation], className)}
            style={{
                width: width,
                height: height,
            }}
        />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-warm-gray-200 overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4 space-y-3">
                <Skeleton height={20} width="80%" />
                <Skeleton height={16} width="60%" />
                <div className="flex justify-between items-center pt-2">
                    <Skeleton height={24} width="40%" />
                    <Skeleton height={32} width={32} variant="circular" />
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
