import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    Timestamp,
    where,
    limit,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Review {
    id: string;
    name: string;
    email: string;
    rating: number;
    text: string;
    product?: string;
    isApproved: boolean;
    createdAt: Date;
}

const REVIEWS_COLLECTION = 'reviews';

// Convert Firestore document to Review
function docToReview(doc: any): Review {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name,
        email: data.email,
        rating: data.rating,
        text: data.text,
        product: data.product || '',
        isApproved: data.isApproved || false,
        createdAt: data.createdAt?.toDate() || new Date(),
    };
}

// Add a new review
export async function addReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'isApproved'>): Promise<string> {
    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
        ...reviewData,
        isApproved: true, // Auto-approve for now, can add moderation later
        createdAt: Timestamp.now(),
    });
    return docRef.id;
}

// Get all approved reviews (sorted by createdAt descending)
export async function getApprovedReviews(limitCount: number = 10): Promise<Review[]> {
    const q = query(
        collection(db, REVIEWS_COLLECTION),
        where('isApproved', '==', true)
    );
    const snapshot = await getDocs(q);
    const reviews = snapshot.docs.map(docToReview);
    // Sort client-side to avoid composite index requirement
    return reviews
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limitCount);
}

// Get all reviews (for admin)
export async function getAllReviews(): Promise<Review[]> {
    const snapshot = await getDocs(collection(db, REVIEWS_COLLECTION));
    const reviews = snapshot.docs.map(docToReview);
    return reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
