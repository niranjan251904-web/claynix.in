import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'new' | 'sale' | 'limited' | 'luxury' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md';
    className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
    const variants = {
        default: 'bg-warm-gray-100 text-charcoal',
        new: 'bg-emerald-100 text-emerald-700',
        sale: 'bg-rose-100 text-rose-700',
        limited: 'bg-purple-100 text-purple-700',
        luxury: 'bg-gold-100 text-gold-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        error: 'bg-red-100 text-red-700',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center font-medium rounded-full',
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
}
