'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduk } from '@/helpers/fetchProduk';
import Swal from 'sweetalert2';

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
            await addProduk(produkBaru);
            
            // SweetAlert success
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Produk berhasil ditambahkan.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirect setelah alert OK
                router.push('/produk');
            });
        } catch (error) {
            // SweetAlert error
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal menambahkan produk: ' + error.message,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Coba Lagi'
            });
        }
    };

    return (
        <div className=' w-full h-full p-4'>
            <h1 className='text-xl mb-4 text-primary-text-dark dark:text-primary-text'>Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label className='block'>Nama Produk:</label>
                    <input 
                        type='text' 
                        className='border p-2 w-full bg-dark-bg dark:bg-primary-bg border-gray-500 dark:border-primary-text-dark' 
                        value={nama} 
                        onChange={(e) => setNama(e.target.value)} 
                        required
                    />
                </div>
                <div className='mb-2'>
                    <label className='block'>Harga:</label>
                    <input 
                        type='number' 
                        className='border p-2 w-full bg-dark-bg dark:bg-primary-bg border-gray-500 dark:border-primary-text-dark' 
                        value={harga} 
                        onChange={(e) => setHarga(e.target.value)} 
                        required
                    />
                </div>
                <div className='mb-2'>
                    <label className='block'>Stok:</label>
                    <input 
                        type='number' 
                        className='border p-2 w-full bg-dark-bg dark:bg-primary-bg border-gray-500 dark:border-primary-text-dark' 
                        value={stok} 
                        onChange={(e) => setStok(e.target.value)} 
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block'>Kategori:</label>
                    <input 
                        type='text' 
                        className='border p-2 w-full bg-dark-bg dark:bg-primary-bg border-gray-500 dark:border-primary-text-dark' 
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
