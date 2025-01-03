"use client";

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserData, updateUserData } from '@/helpers/userProfile';
import { Suitcase, MapPin, Calendar, EnvelopeSimple, Phone, Globe, PencilLine } from 'phosphor-react';
export default function userSetting() {
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null); // Add userId state
    const [formData, setFormData] = useState({
        alamat: '',
        detailPerusahaan: '',
        fullName: '',
        namaPekerjaan: '',
        negara: '',
        noTelepon: '',
        pengalaman: ''
    });

    // ini buat fungsi dari database user
    useEffect(() => {
        const fetchData = async () => {
            if (userId) { // Check if userId is defined
                const userData = await getUserData(userId);
                if (userData) {
                    setFormData({
                        alamat: userData.Alamat || '',
                        detailPerusahaan: userData.detailPerusahaan || '',
                        fullName: userData.fullName || '',
                        namaPekerjaan: userData.namaPekerjaan || '',
                        negara: userData.negara || '',
                        noTelepon: userData.noTelepon || '',
                        pengalaman: userData.pengalaman || ''
                    });
                }
            }
        };
        fetchData();
    }, [userId]); // Add userId as a dependency

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (name) => {
        // Function to handle editing and adding data
        const newValue = prompt(`Enter new value for ${name}:`, formData[name]);
        if (newValue !== null) {
            setFormData({
                ...formData,
                [name]: newValue
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserData(userId, formData);
    }

    // in ifungsi buat ambil info email yang login
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
                setUserId(user.uid); // Set userId when user is authenticated
            }
        });

        return () => unsubscribe();
    }, [])

    return (
        <div className="h-full w-full bg-[#f5f5f5]  flex p-5  gap-5 justify-center items-center">
            <div className="w-[60%]  flex flex-col rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-[200px]">
                    <img src="./contoh_sampul.jpeg" className="w-full h-full object-cover" alt="Deskripsi Gambar" />
                </div>
                <div className="bg-white w-full h-full flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-6 justify-center items-center w-[90%] translate-y-[-20%] p-5">
                        <img src="./profil.jpg" className="rounded-full w-28 border-4 border-black "></img>
                        <div className="flex flex-col justify-center items-center w-full ">
                            <h1 className="font-semibold text-xl ">Hendrian Yudha Pratama</h1>
                            <ul className="flex flex-row gap-5 mt-5 text-sm font-gray-500">
                                <li className='flex flex-row gap-2 items-center'>
                                    <Suitcase size={24} weight="duotone" />
                                    <p>Developer</p>
                                </li>
                                <li className='flex flex-row items-center gap-2'>
                                    <MapPin size={24} weight="duotone" />
                                    <p>Yogyakarta</p>
                                </li>
                                <li className='flex flex-row items-center gap-2'>
                                    <Calendar size={24} weight="duotone" />
                                    <p>Developer</p>
                                </li>
                            </ul>
                            <div className='w-full flex flex-col gap-3 mt-5 p-2 '>
                                <div className='flex flex-row gap-2 items-center justify-between'>
                                    <EnvelopeSimple size={24} weight="duotone" />
                                    <p>{email ? email : 'loading Email....'}</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between'>
                                    <Phone size={24} weight="duotone" />
                                    <p>+62 812 345 6789</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between'>
                                    <Globe size={24} weight="duotone" />
                                    <p>Indonesia</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between'>
                                    <MapPin size={24} weight="duotone" />
                                    <p>Jl. Contoh No. 123, Yogyakarta</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col gap-3 rounded-xl bg-white shadow-lg p-8'>
                <form onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col gap-3 text-gray-500'>
                        <div className='w-full flex flex-row justify-between items-center '>
                            <h1 className='py-4 border-b-2 font-bold text-black'>Perusahaan apa ini</h1>
                            <button type="button" className='opacity-[50%] hover:opacity-[100%] transition-opacity duration-200 text-black py-2 px-4 rounded-lg flex gap-2' onClick={() => handleEdit('detailPerusahaan')}>
                                <PencilLine size={24} weight="duotone" />
                                Edit
                            </button>
                        </div>
                        <p>{formData.detailPerusahaan}</p>
                    </div>
                    <div className='w-full mt-7 gap-3 flex flex-col'>
                        <div className='w-full flex flex-row justify-between items-center '>
                            <h1 className='py-4 border-b-2 font-bold'>Personal Detail</h1>
                            <button type="button" className='opacity-[50%] hover:opacity-[100%] transition-opacity duration-200 text-black py-2 px-4 rounded-lg flex gap-2' onClick={() => handleEdit('fullName')}>
                                <PencilLine size={24} weight="duotone" />
                                Edit
                            </button>
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <div className='flex flex-row justify-between mx-5  border-b-2'>
                                <div className='flex flex-col w-full'>
                                    <h1>Full Name</h1>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className='text-gray-500' />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h1>Email</h1>
                                    <p className='text-gray-500'>{email ? email : 'loading Email....'}</p>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between mx-5  border-b-2'>
                                <div className='flex flex-col w-full'>
                                    <h1>No Telepon</h1>
                                    <input type="text" name="noTelepon" value={formData.noTelepon} onChange={handleInputChange} className='text-gray-500' />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h1>Negara</h1>
                                    <input type="text" name="negara" value={formData.negara} onChange={handleInputChange} className='text-gray-500' />
                                </div>
                            </div>
                            <div className='flex flex-row justify-between mx-5  border-b-2'>
                                <div className='flex flex-col w-full'>
                                    <h1>Alamat</h1>
                                    <input type="text" name="alamat" value={formData.alamat} onChange={handleInputChange} className='text-gray-500' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=' w-full mt-7 gap-3 flex flex-col'>
                        <div className='w-full flex flex-row justify-between items-center '>
                            <h1 className='py-4 border-b-2 font-bold'>Pekerjaan</h1>
                            <button type="button" className='opacity-[50%] hover:opacity-[100%] transition-opacity duration-200 text-black py-2 px-4 rounded-lg flex gap-2' onClick={() => handleEdit('namaPekerjaan')}>
                                <PencilLine size={24} weight="duotone" />
                                Edit
                            </button>
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <div className='flex flex-row justify-between mx-5  border-b-2'>
                                <div className='flex flex-col w-full'>
                                    <h1>Nama Pekerjaan</h1>
                                    <input type="text" name="namaPekerjaan" value={formData.namaPekerjaan} onChange={handleInputChange} className='text-gray-500' />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h1>Pengalaman</h1>
                                    <input type="text" name="pengalaman" value={formData.pengalaman} onChange={handleInputChange} className='text-gray-500' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>Save Changes</button>
                </form>
            </div>
        </div>
    )
}