import { Product } from './types';

// Static product data - add your products here
export const staticProducts: Product[] = [
    {
        id: '1',
        name: 'Gold Plated Anti Tarnish Stainless Steel Bow Themed Pendant',
        slug: 'gold-plated-bow-pendant',
        description: 'Elegant bow-themed pendant crafted from premium stainless steel with anti-tarnish gold plating. Perfect for everyday wear.',
        price: 599.00,
        discountedPrice: 499.00,
        categories: ['necklaces', 'pendants'],
        tags: ['new', 'trending'],
        material: 'Stainless Steel',
        images: ['/images/products/bow-pendant.jpg'],
        variants: [],
        featured: true,
        isActive: true,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        name: 'Xuping Jewelry Contemporary Cat Shaped AD Studded Hoop Earrings',
        slug: 'xuping-cat-hoop-earrings',
        description: 'Adorable cat-shaped hoop earrings with AD stone studs. A playful addition to any jewelry collection.',
        price: 599.00,
        discountedPrice: 499.00,
        categories: ['earrings'],
        tags: ['new', 'trending'],
        material: 'Alloy',
        images: ['/images/products/cat-hoop-earrings.jpg'],
        variants: [],
        featured: true,
        isActive: true,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        name: 'Gold-Plated Anti Tarnish Stainless Steel Contemporary Adjustable Ring',
        slug: 'contemporary-adjustable-ring',
        description: 'Modern adjustable ring with contemporary design. Anti-tarnish coating ensures lasting shine.',
        price: 449.00,
        discountedPrice: 399.00,
        categories: ['rings'],
        tags: ['bestseller'],
        material: 'Stainless Steel',
        images: ['/images/products/contemporary-ring.jpg'],
        variants: [],
        featured: true,
        isActive: true,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '4',
        name: 'Gold Plated Stainless Steel Anti Tarnish Green Emerald Studded Adjustable Finger Ring',
        slug: 'emerald-studded-ring',
        description: 'Luxurious adjustable ring featuring a stunning green emerald. Gold plated with anti-tarnish finish.',
        price: 549.00,
        discountedPrice: 449.00,
        categories: ['rings'],
        tags: ['new'],
        material: 'Stainless Steel',
        stone: 'Emerald',
        images: ['/images/products/emerald-ring.jpg'],
        variants: [],
        featured: true,
        isActive: true,
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '5',
        name: 'Gold Plated Stainless Steel Anti Tarnish Snake Chain Green Emerald Studded Wraparound Bracelet',
        slug: 'emerald-wraparound-bracelet',
        description: 'Elegant wraparound bracelet with snake chain design and green emerald accents.',
        price: 699.00,
        discountedPrice: 599.00,
        categories: ['bracelets'],
        tags: ['trending'],
        material: 'Stainless Steel',
        stone: 'Emerald',
        images: ['/images/products/emerald-wraparound-bracelet.jpg'],
        variants: [],
        featured: true,
        isActive: true,
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '6',
        name: 'Stainless Steel Gold Plated Evil Eye Anti-Tarnish Bracelet For Women',
        slug: 'evil-eye-bracelet',
        description: 'Protective evil eye bracelet with gold plating and anti-tarnish coating. A meaningful accessory.',
        price: 499.00,
        discountedPrice: 399.00,
        categories: ['bracelets'],
        tags: ['bestseller'],
        material: 'Stainless Steel',
        images: ['/images/products/evil-eye-bracelet.jpg'],
        variants: [],
        featured: true,
        isActive: true,
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '7',
        name: 'Gold Plated Stainless Steel Anti Tarnish Evil Eye themed Dual Strand Necklace',
        slug: 'evil-eye-dual-strand-necklace',
        description: 'Beautiful dual strand necklace with evil eye charm. Gold plated for lasting elegance.',
        price: 799.00,
        discountedPrice: 699.00,
        categories: ['necklaces'],
        tags: ['new'],
        material: 'Stainless Steel',
        images: ['/images/products/evil-eye-necklace.jpg'],
        variants: [],
        featured: true,
        isActive: true,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '8',
        name: 'Gold Plated Anti Tarnish Stainless Steel Floral Themed Cuff Bracelet',
        slug: 'floral-cuff-bracelet',
        description: 'Delicate floral-themed cuff bracelet with intricate detailing. Perfect for special occasions.',
        price: 649.00,
        discountedPrice: 549.00,
        categories: ['bracelets'],
        tags: ['trending'],
        material: 'Stainless Steel',
        images: ['/images/products/floral-cuff-bracelet.jpg'],
        variants: [],
        featured: false,
        isActive: true,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '9',
        name: 'Gold Plated Stainless Steel Anti Tarnish Floral Themed Stud Earrings',
        slug: 'floral-stud-earrings',
        description: 'Charming floral stud earrings with anti-tarnish gold plating. Lightweight and comfortable.',
        price: 399.00,
        discountedPrice: 349.00,
        categories: ['earrings'],
        tags: ['bestseller'],
        material: 'Stainless Steel',
        images: ['/images/products/floral-stud-earrings.jpg'],
        variants: [],
        featured: false,
        isActive: true,
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '10',
        name: 'Gold-Plated Anti Tarnish Green Geometric Pendant',
        slug: 'green-geometric-pendant',
        description: 'Modern geometric pendant with vibrant green stone. A statement piece for any outfit.',
        price: 549.00,
        discountedPrice: 449.00,
        categories: ['necklaces', 'pendants'],
        tags: ['new'],
        material: 'Alloy',
        images: ['/images/products/green-geometric-pendant.jpg'],
        variants: [],
        featured: false,
        isActive: true,
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '11',
        name: 'Gold-Plated Anti Tarnish Heart Themed Layered Necklace',
        slug: 'heart-layered-necklace',
        description: 'Romantic heart-themed layered necklace. Perfect for gifting or self-expression.',
        price: 699.00,
        discountedPrice: 599.00,
        categories: ['necklaces'],
        tags: ['trending', 'bestseller'],
        material: 'Stainless Steel',
        images: ['/images/products/heart-layered-necklace.jpg'],
        variants: [],
        featured: true,
        isActive: true,
        stock: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '12',
        name: 'Gold Plated Stainless Steel Anti Tarnish Heart Themed Stud Earrings',
        slug: 'heart-stud-earrings',
        description: 'Sweet heart-shaped stud earrings with gold plating. A timeless classic.',
        price: 349.00,
        discountedPrice: 299.00,
        categories: ['earrings'],
        tags: ['bestseller'],
        material: 'Stainless Steel',
        images: ['/images/products/heart-stud-earrings.jpg'],
        variants: [],
        featured: false,
        isActive: true,
        stock: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

// Get all active products
export async function getProducts(): Promise<Product[]> {
    return staticProducts.filter(p => p.isActive);
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
    return staticProducts.filter(p => p.isActive && p.featured);
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
    return staticProducts.filter(p =>
        p.isActive &&
        (p.categories?.includes(category) || p.category === category)
    );
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
    return staticProducts.find(p => p.slug === slug);
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
    return staticProducts.find(p => p.id === id);
}

// Search products
export function searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return staticProducts.filter(
        (p) =>
            p.isActive &&
            (p.name.toLowerCase().includes(lowercaseQuery) ||
                p.description.toLowerCase().includes(lowercaseQuery) ||
                p.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
                (p.material && p.material.toLowerCase().includes(lowercaseQuery)) ||
                (p.stone && p.stone.toLowerCase().includes(lowercaseQuery)))
    );
}
