'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
    ChevronLeft,
    CreditCard,
    Lock,
    Check,
    Truck
} from 'lucide-react';

const checkoutSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().min(1, 'Phone number is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutForm>({
        resolver: zodResolver(checkoutSchema),
    });

    const shipping = cart.total >= 200 ? 0 : 15;
    const tax = cart.total * 0.08;
    const total = cart.total + shipping + tax;

    const onSubmit = async (data: CheckoutForm) => {
        setIsSubmitting(true);
        // Simulate order processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        clearCart();
        router.push('/account?order=success');
    };

    if (cart.items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="font-serif text-2xl font-medium text-charcoal mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="text-warm-gray-600 mb-6">
                        Add some items to your cart before checkout.
                    </p>
                    <Link href="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-warm-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-warm-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/cart"
                            className="flex items-center gap-2 text-warm-gray-600 hover:text-charcoal"
                        >
                            <ChevronLeft size={20} />
                            <span>Back to Cart</span>
                        </Link>
                        <h1 className="font-serif text-xl font-medium text-charcoal">Checkout</h1>
                        <div className="flex items-center gap-2 text-emerald">
                            <Lock size={16} />
                            <span className="text-sm">Secure</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="bg-white border-b border-warm-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-center gap-4">
                        {['Shipping', 'Payment', 'Confirm'].map((label, index) => (
                            <React.Fragment key={label}>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step > index + 1
                                                ? 'bg-gold-500 text-white'
                                                : step === index + 1
                                                    ? 'bg-gold-500 text-white'
                                                    : 'bg-warm-gray-200 text-warm-gray-500'
                                            }`}
                                    >
                                        {step > index + 1 ? <Check size={16} /> : index + 1}
                                    </div>
                                    <span
                                        className={`hidden sm:inline text-sm ${step >= index + 1 ? 'text-charcoal font-medium' : 'text-warm-gray-400'
                                            }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                                {index < 2 && (
                                    <div
                                        className={`w-12 sm:w-24 h-0.5 ${step > index + 1 ? 'bg-gold-500' : 'bg-warm-gray-200'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl border border-warm-gray-200 p-6"
                            >
                                <h2 className="font-serif text-xl font-medium text-charcoal mb-6">
                                    Shipping Information
                                </h2>

                                <div className="space-y-4">
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="your@email.com"
                                        error={errors.email?.message}
                                        {...register('email')}
                                    />

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <Input
                                            label="First Name"
                                            placeholder="John"
                                            error={errors.firstName?.message}
                                            {...register('firstName')}
                                        />
                                        <Input
                                            label="Last Name"
                                            placeholder="Doe"
                                            error={errors.lastName?.message}
                                            {...register('lastName')}
                                        />
                                    </div>

                                    <Input
                                        label="Address"
                                        placeholder="123 Main St"
                                        error={errors.address?.message}
                                        {...register('address')}
                                    />

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <Input
                                            label="City"
                                            placeholder="New York"
                                            error={errors.city?.message}
                                            {...register('city')}
                                        />
                                        <Input
                                            label="State"
                                            placeholder="NY"
                                            error={errors.state?.message}
                                            {...register('state')}
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <Input
                                            label="Postal Code"
                                            placeholder="10001"
                                            error={errors.postalCode?.message}
                                            {...register('postalCode')}
                                        />
                                        <Input
                                            label="Country"
                                            placeholder="United States"
                                            error={errors.country?.message}
                                            {...register('country')}
                                        />
                                    </div>

                                    <Input
                                        label="Phone"
                                        type="tel"
                                        placeholder="+1 (234) 567-8900"
                                        error={errors.phone?.message}
                                        {...register('phone')}
                                    />
                                </div>

                                <div className="mt-8 pt-6 border-t border-warm-gray-200">
                                    <h2 className="font-serif text-xl font-medium text-charcoal mb-6">
                                        Payment
                                    </h2>
                                    <div className="p-6 bg-warm-gray-50 rounded-lg border border-warm-gray-200 text-center">
                                        <CreditCard size={32} className="mx-auto text-warm-gray-400 mb-3" />
                                        <p className="text-warm-gray-600">
                                            Payment integration coming soon. For now, orders are simulation only.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        isLoading={isSubmitting}
                                        leftIcon={<Lock size={18} />}
                                    >
                                        Place Order • {formatPrice(total)}
                                    </Button>
                                </div>
                            </motion.div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-warm-gray-200 p-6 sticky top-24">
                            <h3 className="font-serif text-lg font-medium text-charcoal mb-4">
                                Order Summary
                            </h3>

                            {/* Items */}
                            <div className="space-y-3 mb-4 pb-4 border-b border-warm-gray-200">
                                {cart.items.map((item) => (
                                    <div
                                        key={`${item.productId}-${item.variantId}`}
                                        className="flex gap-3"
                                    >
                                        <div className="w-12 h-12 bg-warm-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-lg opacity-30">💎</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-charcoal line-clamp-1">
                                                {item.product?.name}
                                            </p>
                                            <p className="text-sm text-warm-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="text-sm font-medium text-charcoal">
                                            {formatPrice((item.product?.price || 0) * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-warm-gray-600">Subtotal</span>
                                    <span className="font-medium">{formatPrice(cart.total)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-warm-gray-600">Shipping</span>
                                    <span className="font-medium">
                                        {shipping === 0 ? (
                                            <span className="text-emerald">Free</span>
                                        ) : (
                                            formatPrice(shipping)
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-warm-gray-600">Tax</span>
                                    <span className="font-medium">{formatPrice(tax)}</span>
                                </div>
                                <div className="pt-2 border-t border-warm-gray-200 flex justify-between">
                                    <span className="font-medium text-charcoal">Total</span>
                                    <span className="font-serif text-xl font-medium text-charcoal">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            {/* Free Shipping Notice */}
                            {shipping > 0 && (
                                <div className="mt-4 p-3 bg-gold-50 rounded-lg flex items-start gap-2">
                                    <Truck size={16} className="text-gold-600 mt-0.5" />
                                    <p className="text-sm text-gold-700">
                                        Add {formatPrice(200 - cart.total)} more for free shipping!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
