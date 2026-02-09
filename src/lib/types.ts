export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    discountedPrice?: number;
    comparePrice?: number;
    category?: string; // Single category field for backwards compatibility
    categories: string[];
    tags: string[];
    material?: string;
    stone?: string;
    images: string[];
    variants: ProductVariant[];
    featured: boolean;
    isActive: boolean;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductVariant {
    id: string;
    name: string;
    size?: string;
    color?: string;
    stock: number;
    priceModifier?: number;
}

export interface CartItem {
    productId: string;
    variantId?: string;
    quantity: number;
    product?: Product;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export interface User {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    role: 'admin' | 'customer';
    addresses: Address[];
    createdAt: Date;
}

export interface Address {
    id: string;
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
}

export interface Order {
    id: string;
    userId?: string;
    guestEmail?: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    status: OrderStatus;
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    variantId?: string;
    variantName?: string;
    quantity: number;
    price: number;
}

export type OrderStatus =
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

export interface WishlistItem {
    productId: string;
    addedAt: Date;
}
