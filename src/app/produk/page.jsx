'use client';

import Grid from '@/components/grid';
import { useRouter } from 'next/navigation'; // Router Next.js untuk navigasi
import { useState } from 'react'; // Tambahkan state management

export default function Produk() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all'); // State untuk tab aktif

    // Fungsi untuk menavigasi ke halaman tambah produk
    const handleTambahProduk = () => {
        router.push('/produk/tambahProduk'); // Gunakan path absolut untuk routing
    };

    // Fungsi untuk mengatur tab yang aktif
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='w-full h-full flex flex-col gap-3 p-6'>
            <div className='flex flex-row justify-between items-center w-full p-5'>
                <ul className='flex flex-row items-center gap-3 text-sm cursor-pointer'>
                    <li
                        className={`border-b-0 p-2 transition-all duration-150 ${activeTab === 'all' ? 'border-b-2 border-b-blue-500 text-blue-500' : 'hover:border-b-2 hover:border-b-blue-500 hover:text-blue-500'}`}
                        onClick={() => handleTabClick('all')}
                    >
                        All
                    </li>
                    <li
                        className={`border-b-0 p-2 transition-all duration-150 ${activeTab === 'inStock' ? 'border-b-2 border-b-blue-500 text-blue-500' : 'hover:border-b-2 hover:border-b-blue-500 hover:text-blue-500'}`}
                        onClick={() => handleTabClick('inStock')}
                    >
                        In Stock
                    </li>
                    <li
                        className={`border-b-0 p-2 transition-all duration-150 ${activeTab === 'outOfStock' ? 'border-b-2 border-b-blue-500 text-blue-500' : 'hover:border-b-2 hover:border-b-blue-500 hover:text-blue-500'}`}
                        onClick={() => handleTabClick('outOfStock')}
                    >
                        Out of Stock
                    </li>
                </ul>

                <button
                    onClick={handleTambahProduk}
                    className='bg-blue-500 text-white p-2 rounded-md mb-4'
                >
                    Tambah Produk
                </button>
            </div>

            <div className='w-full h-auto  rounded-2xl'>
                <Grid />
            </div>
        </div>
    );
}
