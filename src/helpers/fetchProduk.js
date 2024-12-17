// helper/fetchProducts.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";

// Fungsi untuk mengambil data produk
const fetchProducts = async () => {
  try {
    const produkCollection = collection(db, "Produk");
    const produkSnapshot = await getDocs(produkCollection);
    const produkList = produkSnapshot.docs.map(doc => {
        const data = doc.data();
        console.log("Produk Data:", data);
        if (data.tanggal instanceof Timestamp) {
            data.tanggal = data.tanggal.toDate().toLocaleDateString();
          }
        return {
          id: doc.id,
          ...data,
        };
      });
    return produkList;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};

export default fetchProducts;