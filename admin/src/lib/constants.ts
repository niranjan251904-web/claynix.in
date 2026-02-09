export const SITE_NAME = 'Claynix';
export const SITE_DESCRIPTION = 'Handcrafted Jewelry for the Modern Soul';

export const CATEGORIES = [
    { id: 'necklaces', name: 'Necklaces', icon: '💎' },
    { id: 'rings', name: 'Rings', icon: '💍' },
    { id: 'earrings', name: 'Earrings', icon: '✨' },
    { id: 'bracelets', name: 'Bracelets', icon: '⭐' },
    { id: 'clay-jewelry', name: 'Clay Jewelry', icon: '🎨' },
    { id: 'phone-charms', name: 'Phone Charms', icon: '📱' },
    { id: 'handmade-jewelry', name: 'Handmade Jewelry', icon: '❤️' },
    { id: 'office-girl', name: 'Office Girl', icon: '💼' },
    { id: 'dreamy-girl', name: 'Dreamy Girl', icon: '🌙' },
    { id: 'island-girl', name: 'Island Girl', icon: '🌴' },
    { id: 'instagram-viral', name: 'Instagram Viral Finds', icon: '📸' },
] as const;

export const MATERIALS = [
    '14K Gold',
    '18K Gold',
    'Rose Gold',
    'Sterling Silver',
    'Platinum',
    'Mixed Metals',
] as const;

export const STONES = [
    'Diamond',
    'Ruby',
    'Sapphire',
    'Emerald',
    'Pearl',
    'Opal',
    'Amethyst',
    'Topaz',
] as const;

export const ORDER_STATUSES = [
    { id: 'pending', label: 'Pending', color: 'yellow' },
    { id: 'processing', label: 'Processing', color: 'blue' },
    { id: 'shipped', label: 'Shipped', color: 'purple' },
    { id: 'delivered', label: 'Delivered', color: 'green' },
    { id: 'cancelled', label: 'Cancelled', color: 'red' },
    { id: 'refunded', label: 'Refunded', color: 'gray' },
] as const;

export const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/shop?category=necklaces', label: 'Necklaces' },
    { href: '/shop?category=rings', label: 'Rings' },
    { href: '/shop?category=earrings', label: 'Earrings' },
    { href: '/shop?category=bracelets', label: 'Bracelets' },
] as const;

export const ADMIN_NAV_LINKS = [
    { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/inventory', label: 'Inventory', icon: 'Package' },
    { href: '/orders', label: 'Orders', icon: 'ShoppingBag' },
    { href: '/reviews', label: 'Reviews', icon: 'MessageSquare' },
    { href: '/users', label: 'Users', icon: 'Users' },
    { href: '/analytics', label: 'Analytics', icon: 'BarChart3' },
] as const;
