'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    Package,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

// Sales data - to be populated from Firebase
const salesData: Array<{ name: string; sales: number; orders: number }> = [];

// Recent orders - to be populated from Firebase
const recentOrders: Array<{
    id: string;
    customer: string;
    product: string;
    amount: number;
    status: string;
}> = [];

// KPIs - to be calculated from real data
const kpis = [
    { label: 'Total Revenue', value: '$0', change: '0%', positive: true, icon: DollarSign },
    { label: 'Total Orders', value: '0', change: '0%', positive: true, icon: ShoppingBag },
    { label: 'Active Customers', value: '0', change: '0%', positive: true, icon: Users },
    { label: 'Conversion Rate', value: '0%', change: '0%', positive: true, icon: TrendingUp },
];

export default function DashboardPage() {
    // Get low stock products
    const lowStockProducts = products.filter((p) => p.stock < 10).slice(0, 5);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'success';
            case 'shipped':
                return 'luxury';
            case 'processing':
                return 'warning';
            case 'pending':
                return 'default';
            default:
                return 'default';
        }
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-medium text-charcoal">Dashboard</h1>
                <p className="text-warm-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {kpis.map((kpi, index) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-warm-gray-500">{kpi.label}</p>
                                    <p className="font-serif text-2xl font-medium text-charcoal mt-1">
                                        {kpi.value}
                                    </p>
                                </div>
                                <div className="p-2 bg-gold-100 rounded-lg">
                                    <kpi.icon size={20} className="text-gold-600" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mt-4">
                                {kpi.positive ? (
                                    <ArrowUpRight size={16} className="text-emerald" />
                                ) : (
                                    <ArrowDownRight size={16} className="text-red-500" />
                                )}
                                <span
                                    className={`text-sm font-medium ${kpi.positive ? 'text-emerald' : 'text-red-500'
                                        }`}
                                >
                                    {kpi.change}
                                </span>
                                <span className="text-sm text-warm-gray-500 ml-1">vs last month</span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Sales Chart */}
                <Card>
                    <CardHeader>
                        <h3 className="font-medium text-charcoal">Sales Overview</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#c9a962" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#c9a962" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4e0" />
                                    <XAxis dataKey="name" stroke="#78716c" fontSize={12} />
                                    <YAxis stroke="#78716c" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e8e4e0',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#c9a962"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorSales)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Chart */}
                <Card>
                    <CardHeader>
                        <h3 className="font-medium text-charcoal">Orders by Month</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4e0" />
                                    <XAxis dataKey="name" stroke="#78716c" fontSize={12} />
                                    <YAxis stroke="#78716c" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e8e4e0',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Bar dataKey="orders" fill="#c9a962" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-charcoal">Recent Orders</h3>
                            <a href="/orders" className="text-sm text-gold-600 hover:text-gold-700">
                                View All
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {recentOrders.length === 0 ? (
                            <div className="text-center py-8">
                                <ShoppingBag size={32} className="mx-auto text-warm-gray-300 mb-2" />
                                <p className="text-warm-gray-500">No orders yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-warm-gray-100">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="font-medium text-charcoal">{order.id}</p>
                                            <p className="text-sm text-warm-gray-500">{order.customer}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-charcoal">{formatPrice(order.amount)}</p>
                                            <Badge variant={getStatusColor(order.status) as any} size="sm">
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Low Stock Alert */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-charcoal flex items-center gap-2">
                                <Package size={18} className="text-red-500" />
                                Low Stock Alert
                            </h3>
                            <a href="/inventory" className="text-sm text-gold-600 hover:text-gold-700">
                                View Inventory
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {lowStockProducts.length === 0 ? (
                            <div className="text-center py-8">
                                <Package size={32} className="mx-auto text-emerald mb-2" />
                                <p className="text-warm-gray-500">All products are well stocked!</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-warm-gray-100">
                                {lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-warm-gray-100 rounded-lg flex items-center justify-center">
                                                <span className="text-lg opacity-30">💎</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-charcoal line-clamp-1">{product.name}</p>
                                                <p className="text-sm text-warm-gray-500 capitalize">{product.category}</p>
                                            </div>
                                        </div>
                                        <Badge variant={product.stock < 5 ? 'error' : 'warning'}>
                                            {product.stock} left
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
