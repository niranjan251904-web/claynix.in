'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getProducts, deleteProduct } from '@/lib/productService';
import { formatPrice, cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { AddProductModal } from '@/components/AddProductModal';
import { CATEGORIES } from '@/lib/constants';
import { Product } from '@/lib/types';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    ChevronUp,
    ChevronDown,
    Package,
    Loader2
} from 'lucide-react';

type SortKey = 'name' | 'price' | 'stock' | 'category';
type SortDirection = 'asc' | 'desc';

export default function InventoryPage() {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch products from Firestore
    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            const products = await getProducts();
            setProductsList(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...productsList];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query) ||
                    p.material.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (categoryFilter) {
            result = result.filter((p) => p.categories?.includes(categoryFilter));
        }

        // Sort
        result.sort((a, b) => {
            let comparison = 0;
            switch (sortKey) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'price':
                    comparison = a.price - b.price;
                    break;
                case 'stock':
                    comparison = a.stock - b.stock;
                    break;
                case 'category':
                    comparison = (a.categories?.[0] || '').localeCompare(b.categories?.[0] || '');
                    break;
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [productsList, searchQuery, categoryFilter, sortKey, sortDirection]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortKey !== column) return null;
        return sortDirection === 'asc' ? (
            <ChevronUp size={14} />
        ) : (
            <ChevronDown size={14} />
        );
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { label: 'Out of Stock', variant: 'error' as const };
        if (stock < 5) return { label: 'Critical', variant: 'error' as const };
        if (stock < 15) return { label: 'Low Stock', variant: 'warning' as const };
        return { label: 'In Stock', variant: 'success' as const };
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-serif text-3xl font-medium text-charcoal">Inventory</h1>
                    <p className="text-warm-gray-600 mt-1">
                        {filteredProducts.length} products
                    </p>
                </div>
                <Button leftIcon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>Add Product</Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="py-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={categoryFilter || ''}
                                onChange={(e) => setCategoryFilter(e.target.value || null)}
                                className="px-4 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                            >
                                <option value="">All Categories</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 size={32} className="animate-spin text-gold-500" />
                        <span className="ml-3 text-warm-gray-600">Loading products...</span>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-warm-gray-200">
                                    <th className="text-left p-4 font-medium text-warm-gray-600">
                                        <button
                                            onClick={() => handleSort('name')}
                                            className="flex items-center gap-1 hover:text-charcoal"
                                        >
                                            Product
                                            <SortIcon column="name" />
                                        </button>
                                    </th>
                                    <th className="text-left p-4 font-medium text-warm-gray-600">
                                        <button
                                            onClick={() => handleSort('category')}
                                            className="flex items-center gap-1 hover:text-charcoal"
                                        >
                                            Category
                                            <SortIcon column="category" />
                                        </button>
                                    </th>
                                    <th className="text-left p-4 font-medium text-warm-gray-600">
                                        <button
                                            onClick={() => handleSort('price')}
                                            className="flex items-center gap-1 hover:text-charcoal"
                                        >
                                            Price
                                            <SortIcon column="price" />
                                        </button>
                                    </th>
                                    <th className="text-left p-4 font-medium text-warm-gray-600">
                                        <button
                                            onClick={() => handleSort('stock')}
                                            className="flex items-center gap-1 hover:text-charcoal"
                                        >
                                            Stock
                                            <SortIcon column="stock" />
                                        </button>
                                    </th>
                                    <th className="text-left p-4 font-medium text-warm-gray-600">Status</th>
                                    <th className="text-right p-4 font-medium text-warm-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, index) => {
                                    const stockStatus = getStockStatus(product.stock);
                                    return (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.02 }}
                                            className="border-b border-warm-gray-100 hover:bg-warm-gray-50"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-warm-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xl opacity-30">💎</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-charcoal line-clamp-1">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-sm text-warm-gray-500">{product.material}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 capitalize text-warm-gray-700">
                                                {product.categories?.join(', ') || 'N/A'}
                                            </td>
                                            <td className="p-4 font-medium text-charcoal">
                                                {formatPrice(product.price)}
                                            </td>
                                            <td className="p-4 text-charcoal">{product.stock}</td>
                                            <td className="p-4">
                                                <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedProduct(product)}
                                                        className="p-2 text-warm-gray-500 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-colors"
                                                        aria-label="Edit product"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setProductToDelete(product);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                        className="p-2 text-warm-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        aria-label="Delete product"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {filteredProducts.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <Package size={48} className="mx-auto text-warm-gray-300 mb-4" />
                        <p className="text-warm-gray-600">No products found</p>
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
                title="Delete Product"
                size="sm"
            >
                <ModalBody>
                    <p className="text-warm-gray-600">
                        Are you sure you want to delete{' '}
                        <span className="font-medium text-charcoal">{productToDelete?.name}</span>?
                        This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        disabled={isDeleting}
                        onClick={async () => {
                            if (!productToDelete) return;
                            setIsDeleting(true);
                            try {
                                await deleteProduct(productToDelete.id);
                                await fetchProducts();
                                setIsDeleteModalOpen(false);
                                setProductToDelete(null);
                            } catch (error) {
                                console.error('Error deleting product:', error);
                            } finally {
                                setIsDeleting(false);
                            }
                        }}
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 size={16} className="animate-spin mr-2" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={fetchProducts}
            />
        </div>
    );
}
