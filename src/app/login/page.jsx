'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            router.push('/dashboard');
        } else {
            setError("Username atau password salah");
        }
    };

    const handleClick = () => {
        setIsRegister(!isRegister); 
    }

    return (
        <div className="relative w-full h-screen flex overflow-hidden">
            {/* Bagian Welcome */}
            <div 
                className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500 text-white flex justify-center items-center transition-transform duration-500 ${isRegister ? 'translate-x-full' : ''}`}
            >
                <div className="flex flex-col gap-7">
                    <h1 className="font-bold lg:text-4xl text-xl md:text-2xl xl:text-3xl mt-[40px] lg:mt-0">Hallo admin selamat Datang</h1>
                    <div className="flex flex-col">
                        <p className="font-bold lg:text-lg text-sm">Kamu berada di perusahaan yang bagus</p>
                        <p className="lg:text-sm text-xs mt-[10px] lg:mt-0">Kelola produk kamu di sini</p>
                    </div>
                </div>
            </div>

            {/* Bagian Form Login/Register */}
            <div 
                className={`absolute top-0 right-0 w-1/2 h-full bg-white text-black flex flex-col justify-center items-center transition-transform duration-500 ${isRegister ? '-translate-x-full' : ''}`}
            >
                <div className="flex flex-col w-full lg:p-16 p-10 items-start">
                    <h1 className="font-bold text-3xl">{isRegister ? 'Register' : 'Sign In'}</h1>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className="text-sm">{isRegister ? 'Sudah Punya Akun?' : 'Pengguna Baru?'}</p>
                        <button 
                        className="text-blue-600 hover:text-gray-600 cursor-pointer"
                        onClick={handleClick}
                        >
                            {isRegister ? 'Login' : 'Buat Akun'}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-full lg:p-16 p-10 text-black">
                    <h1 className="font-medium text-black">{isRegister ? 'Buat akun baru' : 'Login dengan akunmu'}</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-[1px] border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-[1px] border-gray-300 rounded-md p-2 w-full"
                        />
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" id="remember" name="remember" className="w-4 h-4 cursor-pointer accent-blue-600 hover:accent-blue-600 transition-colors" />
                            <label htmlFor="remember" className='text-black'>Remember me</label>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                        <button type='submit' className="py-2 rounded-md bg-blue-500 hover:bg-gray-600 transition-all hover:text-lg text-white font-semibold">
                            {isRegister ? 'Register' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
