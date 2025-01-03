import BurgerButton from "./burgerButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function topbar ({ toggleSidebar, isOpen }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Fungsi untuk menangani pencarian
    const handleSearch = (e) => {
        e.preventDefault(); // Mencegah refresh halaman
        if (searchTerm) {
            console.log('Mencari:', searchTerm);
            // Lakukan tindakan pencarian, misalnya fetch data atau filter list
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="navbar flex bg-white w-full h-[60px] text-black sticky top-0 z-50  ">
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
                {/* Profil Section */}
                <div className="relative">
                    <img
                        src="/profil.jpg"
                        alt="Profile"
                        className="w-10 h-10 border-2 rounded-full cursor-pointer"
                        onClick={toggleDropdown} // Klik untuk toggle dropdown
                    />

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                            <button
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => router.push('/user')}
                            >
                                View Profile
                            </button>
                            <button
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => router.push('/userSetting')} 
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}