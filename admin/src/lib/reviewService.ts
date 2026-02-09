import {
    collection,
    doc,
    getDocs,
    deleteDoc,
    updateDoc,
    Timestamp,
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
        email: data.email || '',
        rating: data.rating,
        text: data.text,
        product: data.product || '',
        isApproved: data.isApproved !== false,
        createdAt: data.createdAt?.toDate() || new Date(),
    };
}

// Get all reviews (for admin)
export async function getAllReviews(): Promise<Review[]> {
    const snapshot = await getDocs(collection(db, REVIEWS_COLLECTION));
    const reviews = snapshot.docs.map(docToReview);
    return reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Delete a review
export async function deleteReview(reviewId: string): Promise<void> {
    const docRef = doc(db, REVIEWS_COLLECTION, reviewId);
    await deleteDoc(docRef);
}

// Toggle approval status
export async function toggleReviewApproval(reviewId: string, isApproved: boolean): Promise<void> {
    const docRef = doc(db, REVIEWS_COLLECTION, reviewId);
    await updateDoc(docRef, { isApproved });
}
