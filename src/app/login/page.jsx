'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
    
        try {
            if (isRegister) {
                // Register logic
                if (password !== confirmPassword) {
                    setError("Password tidak cocok");
                    return;
                }
    
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("User registered:", user);
                alert("Akun berhasil dibuat! Selamat datang, " + user.email);
                setIsRegister(false); // Switch to login screen
            } else {
                // Login logic
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("Login berhasil:", user);
                alert("Selamat datang kembali, " + user.email);
                router.push('/dashboard'); // Redirect to dashboard
    
                // Handle "Remember Me" feature
                // if (rememberMe) {
                //     localStorage.setItem("email", email);
                //     localStorage.setItem("password", password);
                // } else {
                //     localStorage.removeItem("email");
                //     localStorage.removeItem("password");
                // }
            }
        } catch (error) {
            console.error("Login/Registration error:", error.code, error.message);
            
            // Menampilkan pesan error yang lebih umum
            let errorMessage = "Terjadi kesalahan, coba lagi.";
    
            if (error.code === 'auth/wrong-password') {
                errorMessage = "Password yang Anda masukkan salah.";
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = "Akun dengan email ini tidak ditemukan.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Email yang Anda masukkan tidak valid.";
            }
            
            setError(errorMessage); // Set error message for UI
        }
    };
    
    


    const handleClick = () => {
        setIsRegister(!isRegister);
    }

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
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 '>
                        {!isRegister && (
                            <>
                            <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark-bg dark:bg-primary-bg"
                            required
                        />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark-bg dark:bg-primary-bg"
                                required
                            />
                        </>
                            
                        )}
                        
                        {isRegister && (
                            <>
                                <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark dark:bg-primary-bg"
                                required
                            />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark dark:bg-primary-bg"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="border-[1px] border-gray-300 rounded-md p-2 w-full bg-dark-bg dark:bg-primary-bg"
                                    required
                                />
                            </>
                        )}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" id="remember" name="remember" className="w-4 h-4 cursor-pointer accent-blue-600 hover:accent-blue-600 transition-colors" />
                            <label htmlFor="remember" className='text-primary-text-dark dark:text-primary-text'>Remember me</label>
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
}export default LoginPage;
