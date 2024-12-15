'use client';

// pages/index.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Cek status login di localStorage
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn) {
      // Jika sudah login, arahkan ke halaman home
      router.push('/dashboard');
    } else {
      // Jika belum login, arahkan ke halaman login
      router.push('/login');
    }
  }, []);

  return null; // Halaman kosong selama redirect
}
