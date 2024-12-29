import { db } from '@/lib/firebase'; 
import { collection, getDocs, deleteDoc, updateDoc, doc, addDoc } from 'firebase/firestore'; 

// Fetch data produk dari Firestore
const fetchProduk = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Produk'));
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      const formattedDate = new Date(docData.tanggal.seconds * 1000).toLocaleDateString('id-ID'); 

      return {
        id: doc.id, 
        nama: docData.nama,
        tanggal: formattedDate,
        stok: docData.stok,
        harga: docData.harga,
        kategori: docData.kategori,
      };
    });
    console.log("Data fetched from Firestore:", data); 
    return data;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    throw error; 
  }
};

// Hapus produk dari Firestore
const hapusProduk = async (id) => {
  try {
    const docRef = doc(db, 'Produk', id); 
    await deleteDoc(docRef); 
    console.log(`data ${id} deleted from Firestore`);
  } catch (error) {
    console.error("Error deleting data from Firestore:", error);
    throw error;
  }
};

// Update produk di Firestore
const updateProduk = async (id, produkBaru) => {
  try {
    const docRef = doc(db, 'Produk', id);
    await updateDoc(docRef, produkBaru);
    console.log("Produk berhasil diperbarui dengan ID:", id);
    return id;
  } catch (error) {
    console.error("Error memperbarui produk di Firestore:", error);
    throw error;
  }
};

const addProduk = async (produkBaru) => {
  try {
    const docRef = await addDoc(collection(db, 'Produk'), {
      nama: produkBaru.nama,
      kategori: produkBaru.kategori,
      stok: produkBaru.stok,
      harga: produkBaru.harga,
      tanggal: produkBaru.tanggal
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};


export { fetchProduk, hapusProduk, updateProduk, addProduk };
