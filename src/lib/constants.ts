export const SITE_NAME = 'Claynix';
export const SITE_DESCRIPTION = 'Handcrafted Jewelry for the Modern Soul';

export const CATEGORIES = [
    { id: 'necklaces', name: 'Necklaces', icon: '💎', image: '/images/categories/necklaces.jpg' },
    { id: 'rings', name: 'Rings', icon: '💍', image: '/images/categories/rings.jpg' },
    { id: 'earrings', name: 'Earrings', icon: '✨', image: '/images/categories/earrings.jpg' },
    { id: 'bracelets', name: 'Bracelets', icon: '⭐', image: '/images/categories/bracelets.jpg' },
    { id: 'clay-jewelry', name: 'Clay Jewelry', icon: '🎨', image: '/images/categories/clay-jewelry.jpg' },
    { id: 'phone-charms', name: 'Phone Charms', icon: '📱', image: '/images/categories/phone-charms.jpg' },
    { id: 'handmade-jewelry', name: 'Handmade Jewelry', icon: '❤️', image: '/images/categories/handmade-jewelry.jpg' },
    { id: 'office-girl', name: 'Office Girl', icon: '💼', image: '/images/trends/office-girl.jpg' },
    { id: 'dreamy-girl', name: 'Dreamy Girl', icon: '🌙', image: '/images/trends/dreamy-girl.jpg' },
    { id: 'island-girl', name: 'Island Girl', icon: '🌴', image: '/images/trends/island-girl.jpg' },
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
    { href: '/users', label: 'Users', icon: 'Users' },
    { href: '/analytics', label: 'Analytics', icon: 'BarChart3' },
] as const;

export const TRENDS = [
    { id: 'office-girl', name: 'Office Girl', subtitle: 'jewellery', color: '#8B7355', image: '/images/trends/office-girl.jpg' },
    { id: 'dreamy-girl', name: 'Dreamy Girl', subtitle: 'jewellery', color: '#F5D0E0', image: '/images/trends/dreamy-girl.jpg' },
    { id: 'island-girl', name: 'Island Girl', subtitle: 'jewellery', color: '#C9A962', image: '/images/trends/island-girl.jpg' },
] as const;

export const VIRAL_FINDS = [
    { id: 'viral-1', name: 'Crystal Drop Earrings', isHotSelling: false, image: null },
    { id: 'viral-2', name: 'Black Chain Earrings', isHotSelling: true, image: null },
    { id: 'viral-3', name: 'Floral Enamel Bangle', isHotSelling: true, image: null },
    { id: 'viral-4', name: 'Colorful Bead Bracelets', isHotSelling: false, image: null },
] as const;
