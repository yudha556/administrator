'use client';

import Grid from '@/components/grid';
import { useRouter } from 'next/navigation'; // Router Next.js untuk navigasi

export default function Produk() {
    const router = useRouter();

    // Fungsi untuk menavigasi ke halaman tambah produk
    const handleTambahProduk = () => {
        router.push('/produk/tambahProduk'); // Gunakan path absolut untuk routing
    };

    return (
        <div className=' w-full h-full flex flex-col gap-3 p-6 mb-20 overflow-y-auto'>
            <div className='flex flex-row justify-between items-center w-full p-5'>
                <ul className='flex flex-row items-center gap-3 text-sm cursor-pointer'>
                    <li className='border-b-0 p-2 hover:border-b-2 hover:border-b-blue-500 hover:text-blue-500 tranisiton-all duration-150'>All</li>
                    <li className='border-b-0 p-2 hover:border-b-2 hover:border-b-blue-500 hover:text-blue-500'>in Stock</li>
                    <li className='border-b-0 p-2'>Out of Stock</li>
                </ul>
        
                    <button
                        onClick={handleTambahProduk}
                        className='bg-blue-500 text-white p-2 rounded-md mb-4'
                    >
                        Tambah Produk
                    </button>

            </div>
            <div className='w-full h-auto bg-white rounded-2xl '>
                <Grid />
            </div>
           
        </div>
    );
}
