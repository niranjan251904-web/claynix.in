import { Product } from '@/lib/types';

// Products array - to be populated from Firebase
export const products: Product[] = [];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category === category && p.isActive);
}

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured && p.isActive);
}

export function searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
        (p) =>
            p.isActive &&
            (p.name.toLowerCase().includes(lowercaseQuery) ||
                p.description.toLowerCase().includes(lowercaseQuery) ||
                p.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
                p.material.toLowerCase().includes(lowercaseQuery) ||
                (p.stone && p.stone.toLowerCase().includes(lowercaseQuery)))
    );
}
