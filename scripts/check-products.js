// Script to check product image paths in Firestore
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
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

async function checkProducts() {
    try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);

        console.log(`Found ${snapshot.docs.length} products:\n`);

        snapshot.docs.forEach((docSnap, index) => {
            const product = docSnap.data();
            console.log(`${index + 1}. ${product.name}`);
            console.log(`   ID: ${docSnap.id}`);
            console.log(`   Price: ${product.price}`);
            console.log(`   DiscountedPrice: ${product.discountedPrice}`);
            console.log(`   Images: ${JSON.stringify(product.images)}`);
            console.log(`   Categories: ${JSON.stringify(product.categories)}`);
            console.log('');
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkProducts();
