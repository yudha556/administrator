import BurgerButton from "./burgerButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function topbar ({ toggleSidebar, isOpen }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(''); // Menyimpan nilai input pencarian

    // Fungsi untuk menangani pencarian
    const handleSearch = (e) => {
        e.preventDefault(); // Mencegah refresh halaman
        if (searchTerm) {
            console.log('Mencari:', searchTerm);
            // Lakukan tindakan pencarian, misalnya fetch data atau filter list
        }
    };
    return (
        <div className="navbar flex bg-white w-full h-[60px] text-black sticky top-0 z-50 ">
            <div className="flex w-full h-full items-center justify-between lg:px-8 px-5">
                <BurgerButton onClick={toggleSidebar} isOpen={isOpen} />
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update nilai input
                        placeholder="Cari..."
                        style={{ padding: '8px', fontSize: '16px', paddingLeft: '10px' }}
                        className="w-full border border-gray-300 rounded-md"
                    />
                    {/* <button type="submit" style={{ padding: '8px 12px', marginLeft: '10px' }}>
                        Search
                    </button> */}
                </form>
                <img src="/profil.jpg" alt="Logo" className="w-10 h-10 border-2 rounded-full cursor-pointer" onClick={() => router.push('/user')} />
            </div>
        </div>
    );
}