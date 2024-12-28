'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProduk } from '@/helpers/fetchProduk';

export default function TambahProduk() {
    const [nama, setNama] = useState(''); 
    const [harga, setHarga] = useState('');
    const [stok, setStok] = useState('');
    const [kategori, setKategori] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const produkBaru = {
            nama,
            harga: Number(harga),
            stok: Number(stok),
            kategori,
            tanggal: new Date()
        };

        try {
            await updateProduk( produkBaru);
            alert('Produk berhasil ditambahkan!');
            router.push('/produk');
        } catch (error) {
            alert('Gagal menambahkan produk: ' + error.message);
        }
    };

    return (
        <div className='border-2 border-black w-full h-full p-4'>
            <h1 className='text-xl mb-4'>Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label className='block'>Nama Produk:</label>
                    <input 
                        type='text' 
                        className='border p-2 w-full' 
                        value={nama} 
                        onChange={(e) => setNama(e.target.value)} 
                        required
                    />
                </div>
                <div className='mb-2'>
                    <label className='block'>Harga:</label>
                    <input 
                        type='number' 
                        className='border p-2 w-full' 
                        value={harga} 
                        onChange={(e) => setHarga(e.target.value)} 
                        required
                    />
                </div>
                <div className='mb-2'>
                    <label className='block'>Stok:</label>
                    <input 
                        type='number' 
                        className='border p-2 w-full' 
                        value={stok} 
                        onChange={(e) => setStok(e.target.value)} 
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block'>Kategori:</label>
                    <input 
                        type='text' 
                        className='border p-2 w-full' 
                        value={kategori} 
                        onChange={(e) => setKategori(e.target.value)} 
                        required
                    />
                </div>
                <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>
                    Tambah Produk
                </button>
            </form>
        </div>
    );
}
