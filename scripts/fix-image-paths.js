// Script to fix product image paths in Firestore
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');
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

// Mapping of product names to correct image paths
const imageFixMap = {
    'Gold Plated Evil Eye Dual Strand Necklace': '/images/products/evil-eye-necklace.jpg',
    'Gold Plated Anti Tarnish Stainless Steel Bow Themed Pendant': '/images/products/bow-pendant.jpg',
};

async function fixImagePaths() {
    try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);

        let fixedCount = 0;

        for (const docSnap of snapshot.docs) {
            const product = docSnap.data();
            const correctPath = imageFixMap[product.name];

            if (correctPath) {
                // Check if image path needs fixing
                const currentImages = product.images || [];
                const needsFix = currentImages.length === 0 ||
                    !currentImages[0].startsWith('/images/') ||
                    currentImages[0].includes('D:') ||
                    currentImages[0].includes('assets');

                if (needsFix || currentImages[0] !== correctPath) {
                    await updateDoc(doc(db, 'products', docSnap.id), {
                        images: [correctPath]
                    });
                    console.log(`✅ Fixed: ${product.name}`);
                    console.log(`   Old path: ${currentImages[0] || 'none'}`);
                    console.log(`   New path: ${correctPath}`);
                    fixedCount++;
                }
            }
        }

        if (fixedCount === 0) {
            console.log('ℹ️ No products needed fixing');
        } else {
            console.log(`\n✅ Fixed ${fixedCount} product(s)`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error fixing products:', error);
        process.exit(1);
    }
}

fixImagePaths();
