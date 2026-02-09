'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';

export interface FilterState {
    category: string | null;
    priceRange: [number, number];
    materials: string[];
    stones: string[];
    tags: string[];
}

interface ProductFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClearFilters: () => void;
    className?: string;
}

export const defaultFilters: FilterState = {
    category: null,
    priceRange: [0, 5000],
    materials: [],
    stones: [],
    tags: [],
};

export function ProductFilters({
    filters,
    onFiltersChange,
    onClearFilters,
    className,
}: ProductFiltersProps) {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        category: true,
    });

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const updateFilter = useCallback(
        <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
            onFiltersChange({ ...filters, [key]: value });
        },
        [filters, onFiltersChange]
    );

    const toggleArrayFilter = (key: 'materials' | 'stones' | 'tags', value: string) => {
        const current = filters[key];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateFilter(key, updated);
    };

    const hasActiveFilters =
        filters.category !== null ||
        filters.tags.length > 0;

    return (
        <div className={cn('bg-white rounded-xl border border-warm-gray-200 p-4', className)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-charcoal flex items-center gap-2">
                    <SlidersHorizontal size={18} />
                    Filters
                </h3>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <FilterSection
                title="Category"
                isExpanded={expandedSections.category}
                onToggle={() => toggleSection('category')}
            >
                <div className="space-y-2">
                    <button
                        onClick={() => updateFilter('category', null)}
                        className={cn(
                            'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                            filters.category === null
                                ? 'bg-gold-100 text-gold-700 font-medium'
                                : 'text-charcoal hover:bg-warm-gray-50'
                        )}
                    >
                        All Categories
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => updateFilter('category', cat.id)}
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2',
                                filters.category === cat.id
                                    ? 'bg-gold-100 text-gold-700 font-medium'
                                    : 'text-charcoal hover:bg-warm-gray-50'
                            )}
                        >
                            <span>{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </FilterSection>
        </div>
    );
}

interface FilterSectionProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
    return (
        <div className="border-b border-warm-gray-100 last:border-b-0 py-4">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-sm font-medium text-charcoal"
            >
                {title}
                <ChevronDown
                    size={16}
                    className={cn(
                        'transition-transform',
                        isExpanded && 'rotate-180'
                    )}
                />
            </button>
            {isExpanded && <div className="mt-3">{children}</div>}
        </div>
    );
}

// Mobile Filter Drawer
interface MobileFiltersProps extends ProductFiltersProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileFilters({ isOpen, onClose, ...props }: MobileFiltersProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-charcoal/50" onClick={onClose} />

            {/* Drawer */}
            <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-warm-gray-100">
                    <h3 className="font-medium text-lg">Filters</h3>
                    <button onClick={onClose} className="p-2 hover:bg-warm-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-4">
                    <ProductFilters {...props} />
                </div>
                <div className="p-4 border-t border-warm-gray-100">
                    <Button onClick={onClose} className="w-full">
                        Apply Filters
                    </Button>
                </div>
            </div>
        </div>
    );
}
