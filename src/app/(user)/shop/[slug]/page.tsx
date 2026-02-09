'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { getProducts } from '@/lib/productService';
import { formatPrice } from '@/lib/utils';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/lib/types';
import {
    MessageCircle,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    Truck,
    Heart,
    Shield,
    Share2,
    Loader2,
} from 'lucide-react';

// WhatsApp number - update with your actual WhatsApp business number
const WHATSAPP_NUMBER = '918129628680';

interface ProductDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    const { addToCart } = useCart();
    const { wishlistIds, toggleWishlist, isInWishlist } = useWishlist();

    // Fetch products from sessionStorage or Firestore
    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                // First try sessionStorage
                const cached = sessionStorage.getItem('claynix_products');
                let products: Product[] = [];

                if (cached) {
                    products = JSON.parse(cached);
                } else {
                    // Fetch from Firestore
                    products = await getProducts();
                    sessionStorage.setItem('claynix_products', JSON.stringify(products));
                }

                setAllProducts(products);

                // Find product by slug or id
                const foundProduct = products.find(p => p.slug === slug || p.id === slug);
                if (foundProduct) {
                    setProduct(foundProduct);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-gold-500" />
            </div>
        );
    }

    if (!product) {
        notFound();
    }

    const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100)
        : 0;

    const isOutOfStock = product.stock === 0;

    // Get similar products from same category
    const similarProducts = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id && p.isActive)
        .slice(0, 4);

    // Handle Chat to Buy - opens WhatsApp with product details
    const handleChatToBuy = () => {
        const price = hasDiscount ? product.discountedPrice : product.price;
        const message = encodeURIComponent(
            `Hi! I'm interested in buying:\n\n` +
            `*${product.name}*\n` +
            `Price: ₹${price?.toFixed(2)}\n` +
            `Quantity: ${quantity}\n` +
            (selectedVariant ? `Variant: ${selectedVariant}\n` : '') +
            `Product Link: ${window.location.href}\n\n` +
            `Please share more details.`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    const getTagVariant = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'new':
                return 'new';
            case 'sale':
                return 'sale';
            case 'limited':
                return 'limited';
            case 'bestseller':
            case 'trending':
                return 'luxury';
            default:
                return 'default';
        }
    };

    const images = product.images && product.images.length > 0 ? product.images : [];

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-warm-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-warm-gray-500 hover:text-gold-600">
                            Home
                        </Link>
                        <span className="text-warm-gray-300">/</span>
                        <Link href="/shop" className="text-warm-gray-500 hover:text-gold-600">
                            Shop
                        </Link>
                        <span className="text-warm-gray-300">/</span>
                        <Link
                            href={`/shop?category=${product.category}`}
                            className="text-warm-gray-500 hover:text-gold-600 capitalize"
                        >
                            {product.category?.replace(/-/g, ' ')}
                        </Link>
                        <span className="text-warm-gray-300">/</span>
                        <span className="text-charcoal">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Product Detail */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-square bg-warm-gray-100 rounded-2xl overflow-hidden"
                        >
                            {/* Main Image */}
                            {images.length > 0 ? (
                                <img
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-[120px] opacity-30">💎</span>
                                </div>
                            )}

                            {/* Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() =>
                                            setCurrentImageIndex((prev) =>
                                                prev > 0 ? prev - 1 : images.length - 1
                                            )
                                        }
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setCurrentImageIndex((prev) =>
                                                prev < images.length - 1 ? prev + 1 : 0
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}

                            {/* Discount Badge */}
                            {hasDiscount && (
                                <Badge variant="sale" className="absolute top-4 left-4 text-sm">
                                    -{discountPercent}% OFF
                                </Badge>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${currentImageIndex === index
                                            ? 'border-gold-500'
                                            : 'border-warm-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="lg:py-4">
                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.tags.map((tag) => (
                                    <Badge key={tag} variant={getTagVariant(tag)}>
                                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="font-serif text-3xl font-medium text-charcoal">
                                ₹{hasDiscount ? product.discountedPrice?.toFixed(2) : product.price.toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <span className="text-xl text-warm-gray-400 line-through">
                                    ₹{product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-warm-gray-600 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Material & Stone */}
                        <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-warm-gray-200">
                            {product.material && (
                                <div>
                                    <span className="text-sm text-warm-gray-500">Material</span>
                                    <p className="font-medium text-charcoal">{product.material}</p>
                                </div>
                            )}
                            {product.stone && (
                                <div>
                                    <span className="text-sm text-warm-gray-500">Stone</span>
                                    <p className="font-medium text-charcoal">{product.stone}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-sm text-warm-gray-500">Availability</span>
                                <p className={`font-medium ${isOutOfStock ? 'text-red-500' : 'text-emerald-600'}`}>
                                    {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                                </p>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-charcoal mb-3">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-warm-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-warm-gray-50 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-warm-gray-50 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={handleChatToBuy}
                                disabled={isOutOfStock}
                                className="flex-1 flex items-center justify-center gap-2 py-4 bg-charcoal text-white text-lg font-medium rounded-lg hover:bg-charcoal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <MessageCircle size={22} />
                                {isOutOfStock ? 'Out of Stock' : 'Chat to Buy'}
                            </button>
                            <button
                                className="p-4 border border-warm-gray-300 rounded-lg text-charcoal hover:bg-warm-gray-50 transition-colors"
                                aria-label="Share"
                            >
                                <Share2 size={22} />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 py-6 border-t border-warm-gray-200">
                            <div className="text-center">
                                <div className="w-10 h-10 mx-auto bg-gold-100 rounded-full flex items-center justify-center mb-2">
                                    <Truck size={18} className="text-gold-600" />
                                </div>
                                <p className="text-xs text-warm-gray-600">Shipping All Over India</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 mx-auto bg-gold-100 rounded-full flex items-center justify-center mb-2">
                                    <Heart size={18} className="text-gold-600" />
                                </div>
                                <p className="text-xs text-warm-gray-600">Happiness Certified</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 mx-auto bg-gold-100 rounded-full flex items-center justify-center mb-2">
                                    <Shield size={18} className="text-gold-600" />
                                </div>
                                <p className="text-xs text-warm-gray-600">Secure Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-8">
                            Similar Products
                        </h2>
                        <ProductGrid
                            products={similarProducts}
                            onAddToCart={(p) => addToCart(p.id)}
                            onToggleWishlist={(p) => toggleWishlist(p.id)}
                            wishlistIds={wishlistIds}
                            columns={4}
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

