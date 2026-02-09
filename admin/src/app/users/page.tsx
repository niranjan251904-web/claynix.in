'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal';
import {
    Search,
    UserPlus,
    Mail,
    MoreVertical,
    Shield,
    User,
    Users as UsersIcon
} from 'lucide-react';

// Sample users data
const sampleUsers = [
    { id: 'usr-001', name: 'Sarah Mitchell', email: 'sarah@example.com', role: 'customer', orders: 12, totalSpent: 4580, joinDate: '2024-01-15', status: 'active' },
    { id: 'usr-002', name: 'John Admin', email: 'admin@claynix.com', role: 'admin', orders: 0, totalSpent: 0, joinDate: '2023-06-01', status: 'active' },
    { id: 'usr-003', name: 'Emily Rodriguez', email: 'emily@example.com', role: 'customer', orders: 8, totalSpent: 7200, joinDate: '2024-02-20', status: 'active' },
    { id: 'usr-004', name: 'Jessica Lee', email: 'jessica@example.com', role: 'customer', orders: 3, totalSpent: 890, joinDate: '2024-03-01', status: 'inactive' },
    { id: 'usr-005', name: 'Amanda Kim', email: 'amanda@example.com', role: 'customer', orders: 15, totalSpent: 12500, joinDate: '2023-12-10', status: 'active' },
];

type UserType = typeof sampleUsers[0];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

    const filteredUsers = useMemo(() => {
        let result = [...sampleUsers];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (u) =>
                    u.name.toLowerCase().includes(query) ||
                    u.email.toLowerCase().includes(query)
            );
        }

        if (roleFilter) {
            result = result.filter((u) => u.role === roleFilter);
        }

        return result;
    }, [searchQuery, roleFilter]);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-serif text-3xl font-medium text-charcoal">Users</h1>
                    <p className="text-warm-gray-600 mt-1">
                        {filteredUsers.length} users
                    </p>
                </div>
                <Button leftIcon={<UserPlus size={18} />}>Add User</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Users', value: sampleUsers.length, icon: UsersIcon },
                    { label: 'Admins', value: sampleUsers.filter((u) => u.role === 'admin').length, icon: Shield },
                    { label: 'Active', value: sampleUsers.filter((u) => u.status === 'active').length, icon: User },
                    { label: 'Inactive', value: sampleUsers.filter((u) => u.status === 'inactive').length, icon: User },
                ].map((stat) => (
                    <Card key={stat.label} className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gold-100 rounded-lg">
                                <stat.icon size={18} className="text-gold-600" />
                            </div>
                            <div>
                                <p className="text-sm text-warm-gray-500">{stat.label}</p>
                                <p className="font-serif text-xl font-medium text-charcoal">{stat.value}</p>
                            </div>
                        </div>
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
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                            />
                        </div>
                        <select
                            value={roleFilter || ''}
                            onChange={(e) => setRoleFilter(e.target.value || null)}
                            className="px-4 py-2.5 border border-warm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Users Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user, index) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 font-serif font-medium text-lg">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-charcoal">{user.name}</p>
                                        <p className="text-sm text-warm-gray-500 flex items-center gap-1">
                                            <Mail size={12} />
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="p-1 text-warm-gray-400 hover:text-charcoal"
                                >
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <div className="mt-4 pt-4 border-t border-warm-gray-100 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <Badge variant={user.role === 'admin' ? 'luxury' : 'default'}>
                                        {user.role}
                                    </Badge>
                                    <Badge variant={user.status === 'active' ? 'success' : 'error'}>
                                        {user.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-warm-gray-500">{user.orders} orders</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <Card className="p-12 text-center">
                    <UsersIcon size={48} className="mx-auto text-warm-gray-300 mb-4" />
                    <p className="text-warm-gray-600">No users found</p>
                </Card>
            )}

            {/* User Detail Modal */}
            <Modal
                isOpen={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                title="User Details"
                size="md"
            >
                {selectedUser && (
                    <>
                        <ModalBody>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 font-serif font-medium text-2xl">
                                        {selectedUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-charcoal">{selectedUser.name}</h3>
                                        <p className="text-warm-gray-500">{selectedUser.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="p-3 bg-warm-gray-50 rounded-lg">
                                        <p className="text-sm text-warm-gray-500">Total Orders</p>
                                        <p className="font-medium text-charcoal">{selectedUser.orders}</p>
                                    </div>
                                    <div className="p-3 bg-warm-gray-50 rounded-lg">
                                        <p className="text-sm text-warm-gray-500">Total Spent</p>
                                        <p className="font-medium text-charcoal">{formatCurrency(selectedUser.totalSpent)}</p>
                                    </div>
                                    <div className="p-3 bg-warm-gray-50 rounded-lg">
                                        <p className="text-sm text-warm-gray-500">Role</p>
                                        <p className="font-medium text-charcoal capitalize">{selectedUser.role}</p>
                                    </div>
                                    <div className="p-3 bg-warm-gray-50 rounded-lg">
                                        <p className="text-sm text-warm-gray-500">Joined</p>
                                        <p className="font-medium text-charcoal">{selectedUser.joinDate}</p>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" onClick={() => setSelectedUser(null)}>
                                Close
                            </Button>
                            <Button>Edit User</Button>
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </div>
    );
}
