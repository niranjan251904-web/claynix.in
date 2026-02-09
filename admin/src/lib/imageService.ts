import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Uploads an image file to Firebase Storage and returns the download URL
 * @param file - The file to upload
 * @param folder - The folder path in storage (e.g., 'products')
 * @returns The download URL of the uploaded image
 */
export async function uploadImage(file: File, folder: string = 'products'): Promise<string> {
    // Create a unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `${timestamp}_${sanitizedName}`;
    const storageRef = ref(storage, `${folder}/${filename}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get and return the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

/**
 * Uploads multiple image files to Firebase Storage
 * @param files - Array of files to upload
 * @param folder - The folder path in storage
 * @returns Array of download URLs
 */
export async function uploadImages(files: File[], folder: string = 'products'): Promise<string[]> {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    return Promise.all(uploadPromises);
}
