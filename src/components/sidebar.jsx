import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gauge, Package, ChartLine, UserList } from 'phosphor-react';

function Sidebar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex flex-col  justify-start gap-9 sticky top-0 z-10 h-screen bg-[#f5f5f5] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-gray-600 w-64 transition-transform duration-300 overflow-y-auto ${isOpen ? 'translate-x-64' : 'translate-x-0'}`}>
            <h1 className="mt-[40px] text-blue-500 ml-6 font-bold text-2xl ">Teknologi WEB</h1>
            <div className="flex flex-col  mt-[20px] font-bold justify-between  w-full">
                <button
                onClick={() => router.push('dashboard')} 
                className='flex gap-6  w-full h-14 items-center justify-between rounded-xl hover:bg-gray-300  transition-all'>
                    <div className='flex gap-4 p-4'>
                        <Gauge size={32} weight="duotone"/>
                        <p className='items-center justify-center flex'>Dashboard</p>
                    </div>
                    {/* <svg className='mr-[30px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-arrow-left">
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg> */}
                </button>
                <button
                onClick={() => router.push('/produk')} 
                className='flex rounded-xl w-full hover:bg-gray-300 h-14 items-center justify-between '>
                    <div className='flex gap-4 p-4'>
                        <Package size={32} weight="duotone"/>
                        <p>Product</p>
                    </div>
                    {/* <svg className='mr-[30px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-arrow-left">
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg> */}
                </button>
                <button className='flex w-full rounded-xl hover:bg-gray-300 h-14 items-center justify-between'>
                    <div className='flex gap-4 p-4'>
                        <ChartLine size={32} weight="duotone" />

                        <p>Statsistik</p>
                    </div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-left">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg> */}
                </button>
                <button className='flex w-full rounded-xl hover:bg-gray-300 h-14 items-center justify-between'>
                    <div className='flex gap-4 p-4'>
                        <UserList size={32} weight="duotone" />
                        <p>User</p>
                    </div>
                </button>
             </div>
        </div>
    )
}

export default Sidebar;