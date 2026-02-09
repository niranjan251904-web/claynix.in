'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatPrice, cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { ORDER_STATUSES } from '@/lib/constants';
import {
    Search,
    Filter,
    Eye,
    ChevronLeft,
    ChevronRight,
    Package
} from 'lucide-react';

// Sample orders data
const sampleOrders = [
    {
        id: 'ORD-001',
        customer: { name: 'Sarah Mitchell', email: 'sarah@example.com' },
        items: [{ name: 'Aurora Gold Chain Necklace', quantity: 1, price: 389 }],
        total: 389,
        status: 'delivered',
        date: '2024-03-15',
    },
    {
        id: 'ORD-002',
        customer: { name: 'Emily Rodriguez', email: 'emily@example.com' },
        items: [
            { name: 'Eternal Diamond Ring', quantity: 1, price: 3500 },
            { name: 'Diamond Stud Earrings', quantity: 1, price: 850 },
        ],
        total: 4350,
        status: 'processing',
        date: '2024-03-14',
    },
    {
        id: 'ORD-003',
        customer: { name: 'Jessica Lee', email: 'jessica@example.com' },
        items: [{ name: 'Pearl Drop Earrings', quantity: 2, price: 590 }],
        total: 590,
        status: 'shipped',
        date: '2024-03-13',
    },
    {
        id: 'ORD-004',
        customer: { name: 'Amanda Kim', email: 'amanda@example.com' },
        items: [{ name: 'Layered Rose Gold Set', quantity: 1, price: 195 }],
        total: 195,
        status: 'pending',
        date: '2024-03-12',
    },
    {
        id: 'ORD-005',
        customer: { name: 'Rachel Thompson', email: 'rachel@example.com' },
        items: [{ name: 'Rose Gold Cuff', quantity: 1, price: 195 }],
        total: 195,
        status: 'delivered',
        date: '2024-03-11',
    },
    {
        id: 'ORD-006',
        customer: { name: 'Nicole Brown', email: 'nicole@example.com' },
        items: [{ name: 'Sapphire Statement Ring', quantity: 1, price: 2800 }],
        total: 2800,
        status: 'cancelled',
        date: '2024-03-10',
    },
];

type Order = typeof sampleOrders[0];

export default function OrdersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    // Filter orders
    const filteredOrders = useMemo(() => {
        let result = [...sampleOrders];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (o) =>
                    o.id.toLowerCase().includes(query) ||
                    o.customer.name.toLowerCase().includes(query) ||
                    o.customer.email.toLowerCase().includes(query)
            );
        }

        if (statusFilter) {
            result = result.filter((o) => o.status === statusFilter);
        }

        return result;
    }, [searchQuery, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const getStatusBadge = (status: string) => {
        const statusConfig = ORDER_STATUSES.find((s) => s.id === status);
        const variants: Record<string, 'success' | 'warning' | 'error' | 'default' | 'luxury'> = {
            pending: 'default',
            processing: 'warning',
            shipped: 'luxury',
            delivered: 'success',
            cancelled: 'error',
            refunded: 'default',
        };
        return (
            <Badge variant={variants[status] || 'default'}>
                {statusConfig?.label || status}
            </Badge>
        );
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-medium text-charcoal">Orders</h1>
                <p className="text-warm-gray-600 mt-1">
                    Manage and track all customer orders
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Orders', value: sampleOrders.length, color: 'bg-gold-100 text-gold-700' },
                    { label: 'Pending', value: sampleOrders.filter((o) => o.status === 'pending').length, color: 'bg-warm-gray-100 text-charcoal' },
                    { label: 'Processing', value: sampleOrders.filter((o) => o.status === 'processing').length, color: 'bg-yellow-100 text-yellow-700' },
                    { label: 'Delivered', value: sampleOrders.filter((o) => o.status === 'delivered').length, color: 'bg-green-100 text-green-700' },
                ].map((stat) => (
                    <Card key={stat.label} className="p-4">
                        <p className="text-sm text-warm-gray-500">{stat.label}</p>
                        <p className={cn('font-serif text-2xl font-medium mt-1', stat.color.split(' ')[1])}>
                            {stat.value}
                        </p>
                    </Card>
                ))}
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
                                placeholder="Search by order ID, customer..."
                                className="w-full pl-10 pr-4 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                            />
                        </div>
                        <select
                            value={statusFilter || ''}
                            onChange={(e) => setStatusFilter(e.target.value || null)}
                            className="px-4 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        >
                            <option value="">All Statuses</option>
                            {ORDER_STATUSES.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Orders List */}
            <Card>
                <div className="divide-y divide-warm-gray-100">
                    {paginatedOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 hover:bg-warm-gray-50 transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 font-medium">
                                        {order.customer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <p className="font-medium text-charcoal">{order.id}</p>
                                            {getStatusBadge(order.status)}
                                        </div>
                                        <p className="text-sm text-warm-gray-600 mt-0.5">
                                            {order.customer.name} • {order.customer.email}
                                        </p>
                                        <p className="text-sm text-warm-gray-500 mt-1">
                                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • {order.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 ml-14 sm:ml-0">
                                    <p className="font-serif text-lg font-medium text-charcoal">
                                        {formatPrice(order.total)}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedOrder(order)}
                                        leftIcon={<Eye size={16} />}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {paginatedOrders.length === 0 && (
                    <div className="text-center py-12">
                        <Package size={48} className="mx-auto text-warm-gray-300 mb-4" />
                        <p className="text-warm-gray-600">No orders found</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 border-t border-warm-gray-100">
                        <p className="text-sm text-warm-gray-600">
                            Showing {(currentPage - 1) * ordersPerPage + 1} to{' '}
                            {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of{' '}
                            {filteredOrders.length} orders
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={16} />
                            </Button>
                            <span className="text-sm text-charcoal">
                                {currentPage} / {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Order Detail Modal */}
            <Modal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                title={`Order ${selectedOrder?.id}`}
                size="lg"
            >
                {selectedOrder && (
                    <>
                        <ModalBody>
                            <div className="space-y-6">
                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    <span className="text-warm-gray-600">Status</span>
                                    {getStatusBadge(selectedOrder.status)}
                                </div>

                                {/* Customer */}
                                <div>
                                    <h4 className="font-medium text-charcoal mb-2">Customer</h4>
                                    <p className="text-warm-gray-700">{selectedOrder.customer.name}</p>
                                    <p className="text-sm text-warm-gray-500">{selectedOrder.customer.email}</p>
                                </div>

                                {/* Items */}
                                <div>
                                    <h4 className="font-medium text-charcoal mb-2">Items</h4>
                                    <div className="space-y-2">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-3 bg-warm-gray-50 rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-medium text-charcoal">{item.name}</p>
                                                    <p className="text-sm text-warm-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium text-charcoal">{formatPrice(item.price)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex items-center justify-between pt-4 border-t border-warm-gray-200">
                                    <span className="font-medium text-charcoal">Total</span>
                                    <span className="font-serif text-xl font-medium text-charcoal">
                                        {formatPrice(selectedOrder.total)}
                                    </span>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
                                Close
                            </Button>
                            <Button>Update Status</Button>
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </div>
    );
}
