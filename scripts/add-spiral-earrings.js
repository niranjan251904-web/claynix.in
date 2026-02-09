// Script to add Spiral Stud Earrings product to Firestore
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addProduct() {
    try {
        const product = {
            name: 'Gold Plated Anti Tarnish Stainless Steel Spiral Stud Earrings',
            description: 'Elegant gold plated stainless steel spiral stud earrings. Anti-tarnish finish for lasting beauty. Perfect for the modern office woman.',
            price: 399,
            discountedPrice: 299,
            images: ['/images/products/spiral-stud-earrings.jpg'],
            categories: ['earrings', 'office-girl'],
            tags: ['new', 'trending', 'gold-plated', 'spiral', 'anti-tarnish', 'stud', 'earrings'],
            stock: 50,
            featured: true,
            isActive: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, 'products'), product);
        console.log('✅ Product added successfully with ID:', docRef.id);
        console.log('Product details:', product);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding product:', error);
        process.exit(1);
    }
}

addProduct();
