import { db } from '@/lib/firebase';  
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Ambil data pengguna berdasarkan userId
export const getUserData = async (userId) => {
  const docRef = doc(db, "users", userId);  // "users" adalah collection yang berisi data pengguna
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();  // Mengembalikan data pengguna
  } else {
    console.log("No such document!");
    return null;
  }
};

// Fungsi untuk menyimpan dan memperbarui data pengguna
export const updateUserData = async (userId, newUserData) => {
  const docRef = doc(db, "users", userId);
  try {
    await setDoc(docRef, newUserData, { merge: true });  // Menyimpan data baru atau memperbarui data yang ada
    console.log("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
