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
const tambahProduk = async (produkBaru) => {
  try {
    const docRef = await addDoc(collection(db, 'Produk'), produkBaru);
    console.log('Produk baru ditambahkan dengan ID:', docRef.id);
    return docRef.id; 
  } catch (error) {
    console.error('Error menambahkan produk ke Firestore:', error);
    throw error; 
  }
};

export { fetchProduk, hapusProduk, tambahProduk };
