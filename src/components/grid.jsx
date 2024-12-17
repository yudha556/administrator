'use client';

import React, { useState, useEffect } from 'react';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import fetchProduk  from '@/helpers/fetchProduk';

const ProductGrid = () => {
  const [product, setProduk] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const produk = await fetchProduk();  // Ambil data dari helper
      setProduk(produk);  // Set data produk ke state
    };
    getData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Grid
        data={product.map(produk => [
          produk.nama,
          produk.tanggal,
          produk.stok,
          produk.harga,
          produk.kategori,
        ])}
        columns={['nama', 'tanggal', 'stok', 'harga', 'kategori']}
        search={true}
        pagination={{
          enabled: true,
          limit: 5,
        }}
        style={{
          td: {
            border: 'none', // Hilangkan border di dalam kolom
          },
          th: {
            border: 'none', // Hilangkan border di header kolom
          },
          table: {
            'font-size': '15px', 
          },
          search: {
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            width: '200px',
            marginBottom: '10px',
          }
        }}
        className={{
          table: 'min-w-full border-none',
          th: 'px-4 py-2 text-left ',
          td: 'px-4 py-2',
        }}
      />
    </div>
  );
};

export default ProductGrid;
