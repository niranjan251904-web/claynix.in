import {
    collection,
    getDocs,
    query,
    orderBy,
    where,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from './types';

const PRODUCTS_COLLECTION = 'products';

// Generate slug from string
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Convert Firestore document to Product
function docToProduct(doc: any): Product & { category?: string } {
    const data = doc.data();
    const name = data.name || 'Unnamed Product';
    const categories = data.categories || (data.category ? [data.category] : []);

    return {
        id: doc.id,
        name: name,
        slug: data.slug || generateSlug(name),
        description: data.description || '',
        price: data.price,
        discountedPrice: data.discountedPrice,
        comparePrice: data.comparePrice,
        categories: categories,
        category: data.category || categories[0] || '',
        tags: data.tags || [],
        material: data.material,
        stone: data.stone,
        images: data.images || [],
        variants: data.variants || [],
        featured: data.featured || false,
        isActive: data.isActive !== false,
        stock: data.stock || 0,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
    };
}

// Get all active products (sorted client-side to avoid index requirements)
export async function getProducts(): Promise<Product[]> {
    const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where('isActive', '==', true)
    );
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(docToProduct);
    // Sort by createdAt descending client-side
    return products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
    const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where('isActive', '==', true),
        where('featured', '==', true)
    );
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(docToProduct);
    // Sort by createdAt descending client-side
    return products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Get products by category (using array-contains for multi-category support)
export async function getProductsByCategory(category: string): Promise<Product[]> {
    const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where('isActive', '==', true),
        where('categories', 'array-contains', category)
    );
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(docToProduct);
    // Sort by createdAt descending client-side
    return products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
