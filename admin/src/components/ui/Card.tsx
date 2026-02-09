'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-xl border border-warm-gray-200 overflow-hidden',
                hover && 'transition-all duration-300 hover:shadow-lg hover:border-gold-200 cursor-pointer',
                onClick && 'cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn('px-6 py-4 border-b border-warm-gray-100', className)}>
            {children}
        </div>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <div className={cn('px-6 py-4 border-t border-warm-gray-100 bg-warm-gray-50', className)}>
            {children}
        </div>
    );
}

interface CardImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: 'square' | 'video' | 'portrait';
}

export function CardImage({ src, alt, className, aspectRatio = 'square' }: CardImageProps) {
    const aspectRatios = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
    };

    return (
        <div className={cn('relative overflow-hidden', aspectRatios[aspectRatio], className)}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>
    );
}
