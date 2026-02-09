'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Eye } from 'lucide-react';

// Sample analytics data
const revenueData = [
    { month: 'Jan', revenue: 12400, orders: 45 },
    { month: 'Feb', revenue: 15600, orders: 52 },
    { month: 'Mar', revenue: 18200, orders: 63 },
    { month: 'Apr', revenue: 14800, orders: 48 },
    { month: 'May', revenue: 21500, orders: 71 },
    { month: 'Jun', revenue: 19200, orders: 65 },
    { month: 'Jul', revenue: 24800, orders: 82 },
];

const categoryData = [
    { name: 'Necklaces', value: 35, color: '#c9a962' },
    { name: 'Rings', value: 28, color: '#d4a5a5' },
    { name: 'Earrings', value: 22, color: '#2d6a4f' },
    { name: 'Bracelets', value: 15, color: '#78716c' },
];

const trafficData = [
    { source: 'Organic Search', visitors: 4200, conversion: 3.2 },
    { source: 'Direct', visitors: 2800, conversion: 4.1 },
    { source: 'Social Media', visitors: 1900, conversion: 2.8 },
    { source: 'Email', visitors: 1200, conversion: 5.2 },
    { source: 'Referral', visitors: 800, conversion: 3.9 },
];

const topProducts = [
    { name: 'Eternal Diamond Ring', sales: 45, revenue: 157500 },
    { name: 'Aurora Gold Chain', sales: 38, revenue: 14782 },
    { name: 'Diamond Stud Earrings', sales: 32, revenue: 27200 },
    { name: 'Diamond Tennis Bracelet', sales: 12, revenue: 54000 },
    { name: 'Pearl Drop Earrings', sales: 28, revenue: 8260 },
];

export default function AnalyticsPage() {
    const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
    const totalOrders = revenueData.reduce((sum, d) => sum + d.orders, 0);
    const avgOrderValue = totalRevenue / totalOrders;

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-medium text-charcoal">Analytics</h1>
                <p className="text-warm-gray-600 mt-1">Track your store performance and insights</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Revenue', value: formatPrice(totalRevenue), change: '+18.5%', positive: true, icon: DollarSign },
                    { label: 'Total Orders', value: totalOrders.toString(), change: '+12.3%', positive: true, icon: ShoppingBag },
                    { label: 'Avg Order Value', value: formatPrice(avgOrderValue), change: '+5.2%', positive: true, icon: TrendingUp },
                    { label: 'Conversion Rate', value: '3.8%', change: '-0.4%', positive: false, icon: Eye },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="p-2 bg-gold-100 rounded-lg">
                                    <stat.icon size={18} className="text-gold-600" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-emerald' : 'text-red-500'}`}>
                                    {stat.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-sm text-warm-gray-500 mt-3">{stat.label}</p>
                            <p className="font-serif text-2xl font-medium text-charcoal mt-1">{stat.value}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                <Card>
                    <CardHeader>
                        <h3 className="font-medium text-charcoal">Revenue Overview</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#c9a962" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#c9a962" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4e0" />
                                    <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
                                    <YAxis stroke="#78716c" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e8e4e0', borderRadius: '8px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#c9a962"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card>
                    <CardHeader>
                        <h3 className="font-medium text-charcoal">Sales by Category</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}%`}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <Card>
                    <CardHeader>
                        <h3 className="font-medium text-charcoal">Traffic Sources</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trafficData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4e0" />
                                    <XAxis type="number" stroke="#78716c" fontSize={12} />
                                    <YAxis dataKey="source" type="category" stroke="#78716c" fontSize={12} width={100} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e8e4e0', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="visitors" fill="#c9a962" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Products */}
                <Card>
                    <CardHeader>
                        <h3 className="font-medium text-charcoal">Top Selling Products</h3>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-warm-gray-100">
                            {topProducts.map((product, index) => (
                                <div key={product.name} className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 text-sm font-medium">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="font-medium text-charcoal line-clamp-1">{product.name}</p>
                                            <p className="text-sm text-warm-gray-500">{product.sales} sales</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-charcoal">{formatPrice(product.revenue)}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
