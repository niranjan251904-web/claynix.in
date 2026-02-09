import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from './types';

const PRODUCTS_COLLECTION = 'products';

// Helper to generate slug from name
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Convert Firestore document to Product
function docToProduct(doc: any): Product {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        price: data.price,
        comparePrice: data.comparePrice,
        categories: data.categories || [],
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

// Add a new product
export async function addProduct(productData: Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const slug = generateSlug(productData.name);
    const now = Timestamp.now();

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
        ...productData,
        slug,
        createdAt: now,
        updatedAt: now,
    });

    return docRef.id;
}

// Get all products (sorted client-side to avoid index requirements)
export async function getProducts(): Promise<Product[]> {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products = snapshot.docs.map(docToProduct);
    // Sort by createdAt descending
    return products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    return docToProduct(docSnap);
}

// Update a product
export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);

    // If name is being updated, regenerate slug
    const updateData: any = {
        ...data,
        updatedAt: Timestamp.now(),
    };

    if (data.name) {
        updateData.slug = generateSlug(data.name);
    }

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.createdAt;

    await updateDoc(docRef, updateData);
}

// Delete a product
export async function deleteProduct(id: string): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
}
