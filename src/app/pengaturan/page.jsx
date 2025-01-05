"use client";

import { useState } from 'react'
import Swal from 'sweetalert2'
import { auth } from '@/lib/firebase'
import { updateUserData } from '@/helpers/userProfile'

export default function pengaturan() {
    const [oldPassword, setOldPassword] = useState('')
    const [confirmOldPassword, setConfirmOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChangePassword = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (oldPassword !== confirmOldPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password lama tidak cocok!'
            })
            return
        }

        if (newPassword !== confirmNewPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password baru tidak cocok!'
            })
            return
        }

        try {
            const user = auth.currentUser
            await updateUserData(user.uid, {
                password: newPassword
            })
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Password berhasil diubah'
            })
            setOldPassword('')
            setConfirmOldPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal mengubah password: ' + error.message
            })
        }
    }

    return (
        <div className="h-full p-5">

            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Ubah Password</h2>
                <form onSubmit={handleChangePassword}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password Lama
                        </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Konfirmasi Password Lama
                        </label>
                        <input
                            type="password"
                            value={confirmOldPassword}
                            onChange={(e) => setConfirmOldPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password Baru
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Konfirmasi Password Baru
                        </label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Ubah Password
                    </button>
                </form>
            </div>
        </div>
    )
}