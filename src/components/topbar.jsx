import BurgerButton from "./burgerButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon } from 'phosphor-react'; // Menambahkan ikon bulan untuk dark mode

export default function Topbar({ toggleSidebar, isOpen }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState('light'); // Menambahkan state tema

    // Menyimpan tema ke localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme); // Menambahkan kelas untuk tema
        }
    }, []);

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

    // Fungsi untuk toggle tema
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="navbar flex w-full h-[60px] text-primary-text-dark bg-dark-bg dark:bg-primary-bg dark:text-primary-text sticky top-0 z-50 shadow-lg ">
            <div className="flex w-full h-full items-center justify-between lg:px-8 px-5">
                <BurgerButton onClick={toggleSidebar} isOpen={isOpen} />
                {/* <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="Cari..."
                        style={{ padding: '8px', fontSize: '16px', paddingLeft: '10px' }}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </form> */}
                {/* Profil Section */}
                <div className="relative flex flex-row gap-5 items-center">
                    {/* Ikon Tema */}
                    <button onClick={toggleTheme} className="text-primary-bg dark:text-dark-bg ">
                        {theme === 'light' ? <Moon size={28} /> : <Sun size={28} />}
                    </button>

                    {/* Profil */}
                    <img
                        src="/profil.jpg"
                        alt="Profile"
                        className="w-10 h-10 border-2 rounded-full cursor-pointer"
                        onClick={toggleDropdown} // Klik untuk toggle dropdown
                    />

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-40 w-48 bg-white border rounded-lg shadow-lg py-2 z-50 dark:bg-gray-800 dark:border-gray-600">
                            <button
                                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                onClick={() => router.push('/user')}
                            >
                                View Profile
                            </button>
                            <button
                                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
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
