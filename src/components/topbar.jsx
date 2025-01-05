import BurgerButton from "./burgerButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon, Bell } from 'phosphor-react'; // Menambahkan ikon bulan untuk dark mode

export default function Topbar({ toggleSidebar, isOpen }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            console.log('Mencari:', searchTerm);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="navbar flex w-full h-[60px] text-primary-text-dark bg-dark-bg dark:bg-primary-bg dark:text-primary-text sticky top-0 z-50 shadow-lg">
            <div className="flex w-full justify-between h-full items-center px-4 sm:px-5 lg:px-8">
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
                <div className="relative flex flex-row gap-5 items-center">
                    <button onClick={toggleTheme} className="text-primary-bg dark:text-dark-bg">
                        {theme === 'light' ? <Moon size={28} /> : <Sun size={28} />}
                    </button>
                    <button>
                        <Bell size={28} weight="duotone"/>
                    </button>

                    <div className="relative group">
                        <img
                            src="/profil.jpg"
                            alt="Profile"
                            className="w-10 h-10 border-2 rounded-full cursor-pointer"
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50 dark:bg-gray-800 dark:border-gray-600 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
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
                            <button
                                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                onClick={() => router.push('/logout')}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}