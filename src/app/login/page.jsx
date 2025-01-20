'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Langsung redirect ke dashboard tanpa validasi
        router.push('/dashboard');
    };

    const handleClick = () => {
        setIsRegister(!isRegister);
    };

    return (
        <div className="relative w-full h-screen flex lg:flex-row flex-col overflow-hidden">
            {/* Bagian Welcome */}
            <div
                className={`absolute top-0 left-0 w-1/2 h-full bg-primary-blue  flex justify-center items-center transition-transform duration-500 ${isRegister ? 'translate-x-full' : ''}`}
            >
                <div className="flex flex-col gap-7">
                    <h1 className="font-bold lg:text-4xl text-xl md:text-2xl xl:text-3xl mt-[40px] lg:mt-0 text-primary-text-dark">Hallo admin selamat Datang</h1>
                    <div className="flex flex-col text-primary-text-dark text-lg">
                        <p className="font-bold lg:text-lg text-sm">Kamu berada di perusahaan yang bagus</p>
                        <p className="lg:text-sm text-xs mt-[10px] lg:mt-0">Kelola produk kamu di sini</p>
                    </div>
                </div>
            </div>

            {/* Bagian Form Login/Register */}
            <div
                className={`absolute top-0 right-0 w-1/2 h-full bg-dark-bg dark:bg-primary-bg text-primary-text-dark dark:text-primary-text flex flex-col justify-center items-center transition-transform duration-500 ${isRegister ? '-translate-x-full' : ''}`}
            >
                <div className="flex flex-col w-full lg:p-16 p-10 items-start text-primary-text-dark dark:text-primary-text">
                    <h1 className="font-bold text-3xl text-primary-text-dark dark:text-primary-text">{isRegister ? 'Register' : 'Sign In'}</h1>
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
                <div className="flex flex-col gap-6 w-full lg:p-16 p-10 ">
                    <h1 className="font-medium text-primary-text-dark dark:text-primary-text text-xl">{isRegister ? 'Buat akun baru' : 'Login dengan akunmu'}</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 '>
                        {/* Label dan input email */}
                        {!isRegister && (
                            <>
                                <label htmlFor="email" className="text-sm"></label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark-bg dark:bg-primary-bg"
                                />
                                <label htmlFor="password" className="text-sm"></label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark-bg dark:bg-primary-bg"
                                />
                            </>
                        )}

                        {/* Label dan input untuk register */}
                        {isRegister && (
                            <>
                                <label htmlFor="email" className="text-sm"></label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark dark:bg-primary-bg"
                                />
                                <label htmlFor="password" className="text-sm"></label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark dark:bg-primary-bg"
                                />
                                <label htmlFor="confirmPassword" className="text-sm"></label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark-bg dark:bg-primary-bg"
                                />
                            </>
                        )}

                        <div className="flex gap-2 items-center">
                            <input type="checkbox" id="remember" name="remember" className="w-4 h-4 cursor-pointer accent-blue-600 hover:accent-blue-600 transition-colors" />
                            <label htmlFor="remember" className='text-primary-text-dark dark:text-primary-text'>Remember me</label>
                        </div>
                        <button type='submit' className="py-2 rounded-md bg-blue-500 hover:bg-gray-600 transition-all hover:text-lg text-white font-semibold mt-4">
                            {isRegister ? 'Register' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
