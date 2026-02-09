// Test script to add a sample product to Firestore
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAerCNgRKEN9u8kPwfea0WZszlDKDL5jmc",
    authDomain: "claynix-9923c.firebaseapp.com",
    projectId: "claynix-9923c",
    storageBucket: "claynix-9923c.firebasestorage.app",
    messagingSenderId: "440442625151",
    appId: "1:440442625151:web:e53c53ddf50696a560334a",
};

async function addSampleProducts() {
    console.log('Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const sampleProducts = [
        {
            name: 'Elegant Gold Necklace',
            slug: 'elegant-gold-necklace',
            description: 'Beautiful handcrafted 14K gold necklace with intricate design',
            price: 1999,
            comparePrice: 2499,
            categories: ['necklaces', 'handmade-jewelry'],
            material: '14K Gold',
            stone: null,
            images: ['/images/products/necklace-1.jpg'],
            tags: ['new', 'featured'],
            variants: [],
            featured: true,
            isActive: true,
            stock: 50,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        },
        {
            name: 'Rose Gold Diamond Ring',
            slug: 'rose-gold-diamond-ring',
            description: 'Stunning rose gold ring with brilliant diamond center',
            price: 2999,
            comparePrice: 3499,
            categories: ['rings'],
            material: 'Rose Gold',
            stone: 'Diamond',
            images: ['/images/products/ring-1.jpg'],
            tags: ['trending'],
            variants: [],
            featured: true,
            isActive: true,
            stock: 25,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        },
        {
            name: 'Pearl Drop Earrings',
            slug: 'pearl-drop-earrings',
            description: 'Classic pearl drop earrings for elegant occasions',
            price: 899,
            comparePrice: 1199,
            categories: ['earrings', 'handmade-jewelry'],
            material: 'Sterling Silver',
            stone: 'Pearl',
            images: ['/images/products/earrings-1.jpg'],
            tags: ['new'],
            variants: [],
            featured: false,
            isActive: true,
            stock: 100,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        },
        {
            name: 'Clay Flower Bracelet',
            slug: 'clay-flower-bracelet',
            description: 'Handmade polymer clay bracelet with delicate flower charms',
            price: 599,
            comparePrice: null,
            categories: ['bracelets', 'clay-jewelry'],
            material: 'Polymer Clay',
            stone: null,
            images: ['/images/products/bracelet-1.jpg'],
            tags: ['trending', 'featured'],
            variants: [],
            featured: true,
            isActive: true,
            stock: 75,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        },
    ];

    console.log('Adding sample products to Firestore...');

    for (const product of sampleProducts) {
        try {
            const docRef = await addDoc(collection(db, 'products'), product);
            console.log(`✓ Added: ${product.name} (ID: ${docRef.id})`);
        } catch (error) {
            console.error(`✗ Failed to add ${product.name}:`, error.message);
        }
    }

    console.log('\nDone! Check your Firestore database and the user/admin apps.');
    process.exit(0);
}

addSampleProducts();
