import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gauge, Package, ChartLine, UserList, Gear, SignOut } from 'phosphor-react';

function Sidebar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex flex-col   gap-9 sticky top-0 z-10 h-screen bg-[#f5f5f5] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-gray-600 w-64 transition-transform duration-300 overflow-hidden ${isOpen ? 'translate-x-64' : 'translate-x-0'}`}>
            <h1 className="mt-[40px] text-blue-500 ml-6 font-bold text-xl ">Teknologi WEB</h1>
            <div className='flex flex-col justify-between items-center h-full mb-16'>
                <div className="flex flex-col  mt-[20px] font-bold justify-between  w-full text-sm">
                    {/* dashboard */}
                    <button
                        onClick={() => router.push('dashboard')}
                        className='flex gap-6  w-full h-14 items-center justify-between rounded-xl hover:bg-gray-300  transition-all'>
                        <div className='flex gap-4 p-4'>
                            <Gauge size={25} weight="duotone" />
                            <p className='items-center justify-center flex'>Dashboard</p>
                        </div>
                    </button>
                    {/* produk */}
                    <button
                        onClick={() => router.push('/produk')}
                        className='flex rounded-xl w-full hover:bg-gray-300 h-14 items-center justify-between '>
                        <div className='flex gap-4 p-4'>
                            <Package size={25} weight="duotone" />
                            <p>Product</p>
                        </div>
                    </button>
                    {/* statistik */}
                    <button
                        onClick={() => router.push('/statistik')}
                        className='flex w-full rounded-xl hover:bg-gray-300 h-14 items-center justify-between'>
                        <div className='flex gap-4 p-4'>
                            <ChartLine size={25} weight="duotone" />

                            <p>Statsistik</p>
                        </div>
                    </button>
                    {/* user */}
                    <button
                        onClick={() => router.push('/user')}
                        className='flex w-full rounded-xl hover:bg-gray-300 h-14 items-center justify-between'>
                        <div className='flex gap-4 p-4'>
                            <UserList size={25} weight="duotone" />
                            <p>User</p>
                        </div>
                    </button>
                </div>
                <div className='flex flex-col  mt-[20px] font-bold justify-between  w-full text-sm'>
                    <button
                        onClick={() => router.push('/pengaturan')}
                        className='flex gap-6  w-full h-14 items-center justify-between rounded-xl hover:bg-gray-300  transition-all'>
                        <div className='flex gap-4 p-4'>
                        <Gear size={24} weight="duotone" />
                            <p>Pengaturan</p>
                        </div>
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className='flex gap-6  w-full h-14 items-center justify-between rounded-xl hover:bg-gray-300  transition-all'>
                        <div className='flex gap-4 p-4'>
                        <SignOut size={24} weight="duotone" />
                            <p>Keluar</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;