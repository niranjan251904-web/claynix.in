'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getAllReviews, deleteReview, toggleReviewApproval, Review } from '@/lib/reviewService';
import { Button } from '@/components/ui/Button';
import {
    Star,
    Trash2,
    Loader2,
    MessageSquare,
    CheckCircle,
    XCircle,
    RefreshCw
} from 'lucide-react';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const fetchReviews = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getAllReviews();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleDelete = async (reviewId: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            setDeletingId(reviewId);
            await deleteReview(reviewId);
            setReviews(prev => prev.filter(r => r.id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        } finally {
            setDeletingId(null);
        }
    };

    const handleToggleApproval = async (reviewId: string, currentStatus: boolean) => {
        try {
            setTogglingId(reviewId);
            await toggleReviewApproval(reviewId, !currentStatus);
            setReviews(prev => prev.map(r =>
                r.id === reviewId ? { ...r, isApproved: !currentStatus } : r
            ));
        } catch (error) {
            console.error('Error toggling approval:', error);
            alert('Failed to update review');
        } finally {
            setTogglingId(null);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-serif font-semibold text-charcoal">
                        Customer Reviews
                    </h1>
                    <p className="text-warm-gray-600 mt-1">
                        Manage customer feedback and reviews
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={fetchReviews}
                    disabled={isLoading}
                >
                    <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-warm-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gold-100 rounded-lg">
                            <MessageSquare size={20} className="text-gold-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-charcoal">{reviews.length}</p>
                            <p className="text-sm text-warm-gray-500">Total Reviews</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-warm-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-charcoal">
                                {reviews.filter(r => r.isApproved).length}
                            </p>
                            <p className="text-sm text-warm-gray-500">Approved</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-warm-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Star size={20} className="text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-charcoal">
                                {reviews.length > 0
                                    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                                    : '0.0'
                                }
                            </p>
                            <p className="text-sm text-warm-gray-500">Avg Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 size={32} className="animate-spin text-gold-500" />
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-warm-gray-200">
                    <MessageSquare size={48} className="mx-auto text-warm-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-charcoal mb-2">No Reviews Yet</h3>
                    <p className="text-warm-gray-500">Customer reviews will appear here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`bg-white rounded-xl border p-5 ${review.isApproved
                                    ? 'border-warm-gray-200'
                                    : 'border-yellow-300 bg-yellow-50'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-medium text-charcoal">{review.name}</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < review.rating
                                                        ? 'fill-gold-400 text-gold-400'
                                                        : 'text-warm-gray-200'
                                                    }
                                                />
                                            ))}
                                        </div>
                                        {!review.isApproved && (
                                            <span className="px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-warm-gray-700 mb-3">{review.text}</p>
                                    <div className="flex items-center gap-4 text-sm text-warm-gray-500">
                                        {review.email && (
                                            <span>{review.email}</span>
                                        )}
                                        <span>{formatDate(review.createdAt)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleToggleApproval(review.id, review.isApproved)}
                                        disabled={togglingId === review.id}
                                        className={review.isApproved
                                            ? 'text-yellow-600 hover:text-yellow-700'
                                            : 'text-green-600 hover:text-green-700'
                                        }
                                    >
                                        {togglingId === review.id ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : review.isApproved ? (
                                            <XCircle size={16} />
                                        ) : (
                                            <CheckCircle size={16} />
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(review.id)}
                                        disabled={deletingId === review.id}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        {deletingId === review.id ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={16} />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
