import { db } from '@/lib/firebase'; // Impor db dari konfigurasi Firebase
import { collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

const fetchProduk = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Produk'));
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      const formattedDate = new Date(docData.tanggal.seconds * 1000).toLocaleDateString('id-ID'); // Format tanggal

      return {
        id: doc.id, 
        nama: docData.nama,
        tanggal: formattedDate,
        stok: docData.stok,
        harga: docData.harga,
        kategori: docData.kategori,
      };
    });
    console.log("Data fetched from Firestore:", data); // Log data untuk debugging
    return data;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
  }
};

export { fetchProduk };

const hapusProduk = async (id) => {
  try {
    const docRef = doc(db, 'Produk', id);
    await deleteDoc(docRef);
    console.log(`data ${id} deleted from Firestore`);
  } catch (error) {
    console.error("Error deleting data from Firestore:", error);
  }
};

export  { hapusProduk };

const updateProduk = async (id, updatedData) => {
  try {
    const docRef = doc(db, 'Produk', id);
    await updateDoc(docRef, updatedData);
    console.log(`data ${id} updated in Firestore`);
  } catch (error) {
    console.error("Error updating data in Firestore:", error);
  }
};

export { updateProduk };