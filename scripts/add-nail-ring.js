// Script to add Nail Ring product to Firestore
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
            name: 'Gold Plated Anti Tarnish Stainless Steel Nail Shaped AD Studded Adjustable Finger Ring',
            description: 'Stylish gold plated stainless steel nail shaped ring with AD studs. Anti-tarnish finish for lasting beauty. Perfect island girl statement piece.',
            price: 599,
            discountedPrice: 499,
            images: ['/images/products/nail-ring.jpg'],
            categories: ['rings', 'island-girl'],
            tags: ['new', 'trending', 'gold-plated', 'nail', 'anti-tarnish', 'adjustable', 'ring', 'studded'],
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
