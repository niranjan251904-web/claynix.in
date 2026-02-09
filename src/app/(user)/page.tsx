'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { getProducts, getFeaturedProducts, getProductsByCategory } from '@/lib/productService';
import { getApprovedReviews, addReview, Review } from '@/lib/reviewService';
import { CATEGORIES, TRENDS, VIRAL_FINDS, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductQuickView } from '@/components/product/ProductQuickView';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/lib/types';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Star,
    Truck,
    Shield,
    Gift,
    Heart,
    Send,
    Loader2
} from 'lucide-react';

// Hero slides - to be populated from CMS/Firebase
const heroSlides: Array<{
    id: number;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    href: string;
    image: string;
}> = [];

export default function HomePage() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllArrivals, setShowAllArrivals] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [newArrivals, setNewArrivals] = useState<Product[]>([]);
    const [viralFinds, setViralFinds] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);

    // Review form state
    const [reviewForm, setReviewForm] = useState({
        name: '',
        phone: '',
        rating: 5,
        text: '',
    });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);
    const [reviewError, setReviewError] = useState<string | null>(null);

    const { addToCart } = useCart();
    const { wishlistIds, toggleWishlist } = useWishlist();

    // Fetch products and reviews from Firestore
    const fetchData = useCallback(async () => {
        try {
            const [allProducts, fetchedReviews, viralProducts] = await Promise.all([
                getProducts(),
                getApprovedReviews(6),
                getProductsByCategory('instagram-viral')
            ]);
            // Cache all products in sessionStorage for wishlist page
            sessionStorage.setItem('claynix_products', JSON.stringify(allProducts));
            // Featured Collection shows ALL products (up to 8)
            setFeaturedProducts(allProducts.filter(p => p.isActive).slice(0, 8));
            // New arrivals - products with 'new' or 'trending' tags, or just latest products
            const arrivals = allProducts.filter(p => p.tags.includes('new') || p.tags.includes('trending'));
            setNewArrivals(arrivals.length > 0 ? arrivals.slice(0, 4) : allProducts.slice(0, 4));
            // Instagram Viral Finds
            setViralFinds(viralProducts.slice(0, 4));
            setReviews(fetchedReviews);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handle review form submission - send via WhatsApp
    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewForm.name.trim() || !reviewForm.phone.trim() || !reviewForm.text.trim()) {
            setReviewError('Please fill in all required fields');
            return;
        }

        setIsSubmittingReview(true);
        setReviewError(null);

        try {
            // Build WhatsApp message
            const stars = '⭐'.repeat(reviewForm.rating);
            let message = `💖 *New Review from Claynix Website*\n\n`;
            message += `*Name:* ${reviewForm.name.trim()}\n`;
            message += `*Phone:* ${reviewForm.phone.trim()}\n`;
            message += `*Rating:* ${stars} (${reviewForm.rating}/5)\n\n`;
            message += `*Review:*\n${reviewForm.text.trim()}\n`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/918129628680?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');

            setReviewSuccess(true);
            setReviewForm({ name: '', phone: '', rating: 5, text: '' });
            setTimeout(() => setReviewSuccess(false), 3000);
        } catch (error) {
            console.error('Error submitting review:', error);
            setReviewError('Failed to submit review. Please try again.');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    React.useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', () => {
            setCurrentSlide(emblaApi.selectedScrollSnap());
        });
    }, [emblaApi]);

    return (
        <div className="min-h-screen">
            {/* Hero Section with Background Image */}
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
                {/* Hero Background Image */}
                <img
                    src="/images/hero.png"
                    alt="Elegant jewelry collection"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />

                {/* Hero Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-xl"
                    >
                        <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 text-sm font-medium rounded-full mb-4 backdrop-blur-sm border border-gold-500/30">
                            Handcrafted with Love
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-4 leading-tight">
                            Timeless Elegance
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 leading-relaxed">
                            Discover our new collection of exquisite jewelry pieces designed for the modern soul.
                        </p>
                        <Link href="/shop">
                            <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                                Shop Collection
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="bg-white border-b border-warm-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="flex items-center justify-center gap-3 text-center md:text-left">
                            <div className="p-3 bg-gold-100 rounded-full">
                                <Truck size={20} className="text-gold-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-charcoal text-sm md:text-base">Free Shipping</h4>
                                <p className="text-xs md:text-sm text-warm-gray-500">On orders over ₹999</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-center md:text-left">
                            <div className="p-3 bg-gold-100 rounded-full">
                                <Shield size={20} className="text-gold-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-charcoal text-sm md:text-base">Delivery Guarantee</h4>
                                <p className="text-xs md:text-sm text-warm-gray-500">Across All Over India</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-center md:text-left">
                            <div className="p-3 bg-gold-100 rounded-full">
                                <Heart size={20} className="text-gold-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-charcoal text-sm md:text-base">Happiness Certified</h4>
                                <p className="text-xs md:text-sm text-warm-gray-500">Feels like a hug for your buy</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-center md:text-left">
                            <div className="p-3 bg-gold-100 rounded-full">
                                <Truck size={20} className="text-gold-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-charcoal text-sm md:text-base">Delivered In</h4>
                                <p className="text-xs md:text-sm text-warm-gray-500">Within 10 working days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop by Category */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-warm-gray-600 max-w-2xl mx-auto">
                            Explore our curated collections of handcrafted jewelry
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {CATEGORIES
                            .filter(c => !['office-girl', 'dreamy-girl', 'island-girl'].includes(c.id))
                            .slice(0, showAllCategories ? undefined : 4)
                            .map((category, index) => (
                                <Link
                                    key={category.id}
                                    href={`/shop?category=${category.id}`}
                                    className="group"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex flex-col"
                                    >
                                        {/* Image Card */}
                                        <div className="relative aspect-square bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                                            {/* Category Image or Placeholder */}
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-6xl opacity-40">{category.icon}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Category Name - Below the card */}
                                        <div className="mt-4 text-center">
                                            <h3 className="font-serif text-base md:text-lg font-medium text-charcoal group-hover:text-gold-600 transition-colors">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                    </div>

                    {/* Show More / Show Less Button */}
                    {CATEGORIES.filter(c => !['office-girl', 'dreamy-girl', 'island-girl'].includes(c.id)).length > 4 && (
                        <div className="mt-10 text-center">
                            <button
                                onClick={() => setShowAllCategories(!showAllCategories)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-warm-gray-300 rounded-full text-charcoal font-medium hover:border-gold-500 hover:text-gold-600 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                {showAllCategories ? (
                                    <>
                                        Show Less
                                        <ChevronLeft size={18} />
                                    </>
                                ) : (
                                    <>
                                        Show More
                                        <ChevronRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Shop By Trend */}
            <section className="py-16 md:py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal">
                            Shop By Trend
                        </h2>
                        <p className="text-warm-gray-500 text-sm mt-2 md:hidden">
                            ← Swipe to explore →
                        </p>
                    </div>

                    {/* Mobile: Horizontal scroll / Desktop: Flex wrap */}
                    <div
                        className="flex md:flex-wrap md:justify-center gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide scroll-smooth"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        {TRENDS.map((trend, index) => (
                            <Link
                                key={trend.id}
                                href={`/shop?category=${trend.id}`}
                                className="group flex-shrink-0 md:flex-shrink"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
                                    style={{ backgroundColor: trend.color }}
                                >
                                    {/* Trend Image or Gradient Background */}
                                    {trend.image ? (
                                        <img
                                            src={trend.image}
                                            alt={trend.name}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                                    )}

                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram Viral Finds Section */}
            {viralFinds.length > 0 && (
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal uppercase tracking-wide">
                                Instagram Viral Finds
                            </h2>
                            <p className="text-warm-gray-600 mt-2">
                                Trending pieces loved by our community
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {viralFinds.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="relative aspect-square bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300">
                                        {/* Product Image */}
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-6xl opacity-30">✨</span>
                                            </div>
                                        )}

                                        {/* Hot Selling Badge */}
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2">
                                            <span className="px-4 py-1.5 bg-rose-500 text-white text-xs font-medium rounded-full shadow-md">
                                                Hot Selling
                                            </span>
                                        </div>

                                        {/* Wishlist Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleWishlist(product.id);
                                            }}
                                            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-rose-50"
                                        >
                                            <Heart
                                                size={16}
                                                className={wishlistIds.includes(product.id) ? 'text-rose-500 fill-rose-500' : 'text-warm-gray-400 hover:text-rose-500'}
                                            />
                                        </button>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <h4 className="font-medium text-charcoal text-sm line-clamp-1">
                                            {product.name}
                                        </h4>
                                        <div className="flex items-center justify-center gap-2 mt-1">
                                            <span className="text-gold-600 font-semibold">
                                                ₹ {product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}
                                            </span>
                                            {product.discountedPrice && product.discountedPrice < product.price && (
                                                <span className="text-warm-gray-400 text-sm line-through">
                                                    ₹{product.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">
                                Featured Collection
                            </h2>
                            <p className="text-warm-gray-600">
                                Our most beloved pieces, handpicked for you
                            </p>
                        </div>
                        <Link
                            href="/shop"
                            className="hidden md:flex items-center gap-2 text-gold-600 font-medium hover:text-gold-700 transition-colors"
                        >
                            View All
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <ProductGrid
                        products={featuredProducts.slice(0, 4)}
                        onQuickView={setSelectedProduct}
                        onAddToCart={(product) => addToCart(product.id)}
                        onToggleWishlist={(product) => toggleWishlist(product.id)}
                        wishlistIds={wishlistIds}
                    />

                    <div className="mt-8 text-center md:hidden">
                        <Link href="/shop">
                            <Button variant="outline" rightIcon={<ArrowRight size={18} />}>
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* New Arrivals Banner */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-charcoal via-warm-gray-900 to-charcoal relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,169,98,0.1),transparent_50%)]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 text-sm font-medium rounded-full mb-4">
                                Just Arrived
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-6 leading-tight">
                                New Arrivals
                            </h2>
                            <p className="text-white text-lg mb-8 leading-relaxed">
                                Be the first to discover our latest creations. Each piece is designed
                                to make a statement and become a cherished part of your collection.
                            </p>
                            <Link href="/shop?tags=new">
                                <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                                    Shop New Arrivals
                                </Button>
                            </Link>
                        </div>

                        <div className="relative overflow-hidden">
                            {/* Left Arrow */}
                            <button
                                onClick={() => {
                                    const container = document.getElementById('new-arrivals-scroll');
                                    if (container) container.scrollBy({ left: -220, behavior: 'smooth' });
                                }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-warm-gray-800/90 border border-warm-gray-600 rounded-full text-white hover:border-gold-500 hover:text-gold-400 transition-all hidden md:flex items-center justify-center"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {/* Products Container */}
                            <div
                                id="new-arrivals-scroll"
                                className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide scroll-smooth"
                                style={{
                                    WebkitOverflowScrolling: 'touch',
                                    scrollBehavior: 'smooth'
                                }}
                            >
                                {newArrivals.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-warm-gray-800 rounded-xl p-4 group cursor-pointer flex-shrink-0 w-[200px]"
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        <div className="aspect-square bg-warm-gray-700 rounded-lg mb-3 overflow-hidden group-hover:bg-warm-gray-600 transition-colors">
                                            {product.images && product.images.length > 0 ? (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-4xl opacity-40">💎</span>
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="text-white font-medium text-sm line-clamp-1">
                                            {product.name}
                                        </h4>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="text-gold-400 text-sm font-medium">
                                                ₹ {product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}
                                            </span>
                                            {product.discountedPrice && product.discountedPrice < product.price && (
                                                <span className="text-warm-gray-500 text-xs line-through">
                                                    ₹{product.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Right Arrow */}
                            <button
                                onClick={() => {
                                    const container = document.getElementById('new-arrivals-scroll');
                                    if (container) container.scrollBy({ left: 220, behavior: 'smooth' });
                                }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-warm-gray-800/90 border border-warm-gray-600 rounded-full text-white hover:border-gold-500 hover:text-gold-400 transition-all hidden md:flex items-center justify-center"
                                aria-label="Scroll right"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        {newArrivals.length > 2 && (
                            <p className="text-warm-gray-400 text-sm mt-3 text-center md:hidden">
                                ← Swipe to see more →
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Reviews & Feedback Section */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-warm-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-warm-gray-600 max-w-2xl mx-auto">
                            We love hearing from you! Share your experience with our jewelry
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Review Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-white rounded-2xl border border-warm-gray-200 p-6 shadow-sm sticky top-24">
                                <h3 className="font-serif text-xl font-medium text-charcoal mb-4">
                                    Share Your Feedback
                                </h3>

                                {reviewSuccess && (
                                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                                        Thank you for your review! 💖
                                    </div>
                                )}

                                {reviewError && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                        {reviewError}
                                    </div>
                                )}

                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                                            Your Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={reviewForm.name}
                                            onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full px-3 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={reviewForm.phone}
                                            onChange={(e) => setReviewForm(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full px-3 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                                            placeholder="+91 XXXXX XXXXX"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                                            Rating
                                        </label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                                                    className="p-1 hover:scale-110 transition-transform"
                                                >
                                                    <Star
                                                        size={24}
                                                        className={star <= reviewForm.rating
                                                            ? 'fill-gold-400 text-gold-400'
                                                            : 'text-warm-gray-300'
                                                        }
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                                            Your Review <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={reviewForm.text}
                                            onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
                                            className="w-full px-3 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors resize-none"
                                            rows={4}
                                            placeholder="Share your experience with our jewelry..."
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isSubmittingReview}
                                    >
                                        {isSubmittingReview ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin mr-2" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} className="mr-2" />
                                                Submit Review
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Reviews Display */}
                        <div className="lg:col-span-2">
                            {reviews.length > 0 ? (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {reviews.map((review, index) => (
                                        <motion.div
                                            key={review.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="bg-white rounded-2xl border border-warm-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex gap-1 mb-3">
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
                                            <p className="text-warm-gray-700 mb-4 leading-relaxed text-sm">
                                                &ldquo;{review.text}&rdquo;
                                            </p>
                                            <div className="flex items-center justify-between pt-3 border-t border-warm-gray-100">
                                                <span className="font-medium text-charcoal text-sm">{review.name}</span>
                                                <span className="text-xs text-warm-gray-400">
                                                    {review.createdAt.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                                    <div className="w-16 h-16 bg-warm-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Star size={24} className="text-warm-gray-400" />
                                    </div>
                                    <h3 className="font-medium text-charcoal mb-2">No Reviews Yet</h3>
                                    <p className="text-warm-gray-500 text-sm max-w-xs">
                                        Be the first to share your experience with our beautiful jewelry!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick View Modal */}
            <ProductQuickView
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={(product, variantId, quantity) => addToCart(product.id, variantId, quantity)}
                onToggleWishlist={(product) => toggleWishlist(product.id)}
                isInWishlist={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
            />
        </div>
    );
}
