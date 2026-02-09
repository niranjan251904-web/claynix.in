'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { CATEGORIES, MATERIALS, STONES } from '@/lib/constants';
import { addProduct } from '@/lib/productService';
import { uploadImage } from '@/lib/imageService';
import { Product } from '@/lib/types';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface ProductFormData {
    name: string;
    description: string;
    price: string;
    comparePrice: string;
    categories: string[];
    material: string;
    stone: string;
    stock: string;
    featured: boolean;
    isActive: boolean;
}

const initialFormData: ProductFormData = {
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    categories: [],
    material: '14K Gold',
    stone: '',
    stock: '',
    featured: false,
    isActive: true,
};

// Memoized style classes
const labelClass = 'block text-sm font-medium text-charcoal mb-1.5';
const inputClass = 'w-full px-3 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors';

export function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    const toggleCategory = useCallback((categoryId: string) => {
        setFormData((prev) => ({
            ...prev,
            categories: prev.categories.includes(categoryId)
                ? prev.categories.filter((c) => c !== categoryId)
                : [...prev.categories, categoryId],
        }));
    }, []);

    // Image handling functions
    const handleFileSelect = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('Image size must be less than 5MB');
            return;
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setError(null);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    }, [handleFileSelect]);

    const removeImage = useCallback(() => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.name.trim()) {
            setError('Product name is required');
            return;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            setError('Valid price is required');
            return;
        }
        if (!formData.stock || parseInt(formData.stock) < 0) {
            setError('Valid stock quantity is required');
            return;
        }
        if (formData.categories.length === 0) {
            setError('Please select at least one category');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            let imageUrl = '';

            // Upload image if one is selected
            if (imageFile) {
                setIsUploading(true);
                console.log('Uploading image...');
                imageUrl = await uploadImage(imageFile, 'products');
                console.log('Image uploaded:', imageUrl);
                setIsUploading(false);
            }

            console.log('Starting product add...');
            const productId = await addProduct({
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.price),
                comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
                categories: formData.categories,
                material: formData.material,
                stone: formData.stone || null,
                stock: parseInt(formData.stock),
                featured: formData.featured,
                isActive: formData.isActive,
                images: imageUrl ? [imageUrl] : [],
                tags: [],
                variants: [],
            });
            console.log('Product added successfully with ID:', productId);

            // Reset form and close
            setFormData(initialFormData);
            setImageFile(null);
            setImagePreview(null);
            setIsSubmitting(false);
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Error adding product:', err);
            const errorMessage = err?.message || err?.code || 'Unknown error occurred';
            setError(`Failed to add product: ${errorMessage}`);
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setFormData(initialFormData);
            setImageFile(null);
            setImagePreview(null);
            setError(null);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Add New Product" size="lg">
            <form onSubmit={handleSubmit}>
                <ModalBody>
                    <div className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className={labelClass}>
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Enter product name"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className={labelClass}>
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className={inputClass}
                                placeholder="Enter product description"
                            />
                        </div>

                        {/* Price Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className={labelClass}>
                                    Price (₹) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label htmlFor="comparePrice" className={labelClass}>
                                    Compare Price (₹)
                                </label>
                                <input
                                    type="number"
                                    id="comparePrice"
                                    name="comparePrice"
                                    value={formData.comparePrice}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Original price"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        {/* Categories (Multi-select) */}
                        <div>
                            <label className={labelClass}>
                                Categories <span className="text-red-500">*</span>
                                <span className="text-warm-gray-400 font-normal ml-2">(select multiple)</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                {CATEGORIES.map((cat) => (
                                    <label
                                        key={cat.id}
                                        className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${formData.categories.includes(cat.id)
                                            ? 'border-gold-500 bg-gold-50 text-gold-700'
                                            : 'border-warm-gray-300 hover:border-gold-300'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.categories.includes(cat.id)}
                                            onChange={() => toggleCategory(cat.id)}
                                            className="w-4 h-4 rounded border-warm-gray-300 text-gold-500 focus:ring-gold-500"
                                        />
                                        <span className="text-sm">{cat.icon} {cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Material Row */}
                        <div>
                            <label htmlFor="material" className={labelClass}>
                                Material <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="material"
                                name="material"
                                value={formData.material}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                {MATERIALS.map((mat) => (
                                    <option key={mat} value={mat}>
                                        {mat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Stone and Stock Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="stone" className={labelClass}>
                                    Stone (Optional)
                                </label>
                                <select
                                    id="stone"
                                    name="stone"
                                    value={formData.stone}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">No Stone</option>
                                    {STONES.map((st) => (
                                        <option key={st} value={st}>
                                            {st}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="stock" className={labelClass}>
                                    Stock Quantity <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className={labelClass}>
                                Product Image
                            </label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileSelect(file);
                                }}
                                className="hidden"
                            />

                            {imagePreview ? (
                                <div className="relative group">
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gold-300">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-warm-gray-500 mt-2 text-center">
                                        {imageFile?.name}
                                    </p>
                                </div>
                            ) : (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging
                                        ? 'border-gold-500 bg-gold-50'
                                        : 'border-warm-gray-300 hover:border-gold-400 hover:bg-warm-gray-50'
                                        }`}
                                >
                                    <Upload className={`w-10 h-10 mb-3 ${isDragging ? 'text-gold-500' : 'text-warm-gray-400'}`} />
                                    <p className="text-sm font-medium text-charcoal mb-1">
                                        {isDragging ? 'Drop your image here' : 'Drag & drop an image here'}
                                    </p>
                                    <p className="text-xs text-warm-gray-500">
                                        or click to browse (max 5MB)
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Checkboxes */}
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-warm-gray-300 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm text-charcoal">Featured Product</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-warm-gray-300 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm text-charcoal">Active (visible in shop)</span>
                            </label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" variant="ghost" onClick={handleClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin mr-2" />
                                {isUploading ? 'Uploading Image...' : 'Adding Product...'}
                            </>
                        ) : (
                            'Add Product'
                        )}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
