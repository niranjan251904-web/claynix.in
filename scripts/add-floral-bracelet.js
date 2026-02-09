// Script to add Floral Cuff Bracelet product to Firestore
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
            name: 'Gold Plated Anti Tarnish Stainless Steel Floral Themed Cuff Bracelet',
            description: 'Beautiful gold plated stainless steel floral themed cuff bracelet. Anti-tarnish finish ensures lasting beauty. A dreamy piece perfect for everyday elegance.',
            price: 599,
            discountedPrice: 399,
            images: ['/images/products/floral-cuff-bracelet.jpg'],
            categories: ['bracelets', 'dreamy-girl'],
            tags: ['new', 'trending', 'gold-plated', 'floral', 'anti-tarnish', 'cuff', 'bracelet'],
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
