'use client';

import React from 'react';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';

const ProductGrid = () => {
  const data = [
    { id: 1, name: 'Produk A', price: 100000 },
    { id: 2, name: 'Produk B', price: 150000 },
    { id: 3, name: 'Produk C', price: 200000 },
    { id: 4, name: 'Produk D', price: 129999 },
    { id: 5, name: 'Produk E', price: 180000 },
    { id: 6, name: 'Produk F', price: 220000 },
    // Tambahkan data produk lainnya
  ];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Grid
        data={data.map(product => [product.id, product.name, product.price])}
        columns={['ID', 'Nama Produk', "di Publish", "Stock", "Harga"]}
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
