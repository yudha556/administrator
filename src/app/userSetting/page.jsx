"use client";

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserData, updateUserData } from '@/helpers/userProfile';
import { Suitcase, MapPin, Calendar, EnvelopeSimple, Phone, Globe, PencilLine } from 'phosphor-react';
import Swal from 'sweetalert2';

export default function userSetting() {
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        alamat: '',
        detailPerusahaan: '',
        fullName: '',
        namaPekerjaan: '',
        negara: '',
        noTelepon: '',
        pengalaman: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
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
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userId) {
            try {
                await updateUserData(userId, formData);
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data berhasil disimpan!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Gagal menyimpan data: ' + error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
                setUserId(user.uid);
            }
        });

        return () => unsubscribe();
    }, [])

    return (
        <div className="h-full w-full flex flex-col lg:flex-row p-2  gap-5 justify-center items-center">
            <div className="w-full lg:w-[60%] flex flex-col rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-[150px] md:h-[200px]">
                    <img src="./contoh_sampul.jpeg" className="w-full h-full object-cover" alt="Deskripsi Gambar" />
                </div>
                <div className="bg-gray-dark dark:bg-gray-light w-full h-full flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-4 md:gap-6 justify-center items-center w-[95%] md:w-[90%] translate-y-[-20%] p-3 md:p-5">
                        <img src="./profil.jpg" className="rounded-full w-20 md:w-28 border-4 border-black"></img>
                        <div className="flex flex-col justify-center items-center w-full">
                            <h1 className="font-semibold text-lg md:text-xl text-primary-text-dark dark:text-primary-text">Hendrian Yudha Pratama</h1>
                            <ul className="flex flex-row flex-wrap justify-center gap-3 md:gap-5 mt-3 md:mt-5 text-xs md:text-sm font-gray-500">
                                <li className='flex flex-row gap-1 md:gap-2 items-center'>
                                    <Suitcase size={20} weight="duotone" />
                                    <p>Developer</p>
                                </li>
                                <li className='flex flex-row items-center gap-1 md:gap-2'>
                                    <MapPin size={20} weight="duotone" />
                                    <p>Yogyakarta</p>
                                </li>
                                <li className='flex flex-row items-center gap-1 md:gap-2'>
                                    <Calendar size={20} weight="duotone" />
                                    <p>Developer</p>
                                </li>
                            </ul>
                            <div className='w-full flex flex-col gap-2 md:gap-3 mt-3 md:mt-5 p-2'>
                                <div className='flex flex-row gap-2 items-center justify-between text-sm md:text-base'>
                                    <EnvelopeSimple size={20} weight="duotone" />
                                    <p className="break-all">{email ? email : 'loading Email....'}</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between text-sm md:text-base'>
                                    <Phone size={20} weight="duotone" />
                                    <p>+62 812 345 6789</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between text-sm md:text-base'>
                                    <Globe size={20} weight="duotone" />
                                    <p>Indonesia</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between text-sm md:text-base'>
                                    <MapPin size={20} weight="duotone" />
                                    <p>Jl. Contoh No. 123, Yogyakarta</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col gap-3 rounded-xl bg-gray-dark dark:bg-gray-light shadow-lg p-4 md:p-8'>
                <form onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col gap-3'>
                        <div className='w-full'>
                            <h1 className='py-2 md:py-4 border-b-2 border-primary-bg dark:border-dark-bg font-bold text-sm md:text-base text-primary-text-dark dark:text-primary-text'>Perusahaan apa ini</h1>
                        </div>
                        <textarea 
                            name="detailPerusahaan" 
                            value={formData.detailPerusahaan} 
                            onChange={handleInputChange} 
                            className='bg-gray-dark dark:bg-gray-light text-sm md:text-base p-2'
                            rows="3"
                        />
                    </div>
                    <div className='w-full mt-5 md:mt-7 gap-2 md:gap-3 flex flex-col'>
                        <div className='w-full'>
                            <h1 className='py-2 md:py-4 border-b-2 border-primary-bg dark:border-dark-bg font-bold text-lg md:text-xl text-primary-text-dark dark:text-primary-text'>Personal Detail</h1>
                        </div>
                        <div className='w-full flex flex-col gap-3 md:gap-4'>
                            <div className='flex flex-col md:flex-row justify-between mx-2 md:mx-5 border-b-2 border-primary-bg dark:border-dark-bg'>
                                <div className='flex flex-col w-full mb-2 md:mb-0'>
                                    <h1 className='text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg'>Full Name</h1>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className='bg-gray-dark dark:bg-gray-light text-sm md:text-base p-2' />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg'>Email</h1>
                                    <p className='bg-gray-dark dark:bg-gray-light text-sm md:text-base p-2'>{email ? email : 'loading Email....'}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between mx-2 md:mx-5 border-b-2 border-primary-bg dark:border-dark-bg'>
                                <div className='flex flex-col w-full mb-2 md:mb-0'>
                                    <h1 className='text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg'>No Telepon</h1>
                                    <input type="text" name="noTelepon" value={formData.noTelepon} onChange={handleInputChange} className='bg-gray-dark dark:bg-gray-light text-sm md:text-base p-2' />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg'>Negara</h1>
                                    <input type="text" name="negara" value={formData.negara} onChange={handleInputChange} className='bg-gray-dark dark:bg-gray-light text-sm md:text-base p-2' />
                                </div>
                            </div>
                            <div className='flex flex-row justify-between mx-2 md:mx-5 border-b-2 border-primary-bg dark:border-dark-bg'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg'>Alamat</h1>
                                    <input type="text" name="alamat" value={formData.alamat} onChange={handleInputChange} className='bg-gray-dark dark:bg-gray-light text-sm md:text-base p-2' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full mt-5 md:mt-7 gap-2 md:gap-3 flex flex-col'>
                        <div className='w-full'>
                            <h1 className='py-2 md:py-4 border-b-2 border-primary-bg dark:border-dark-bg font-bold text-lg md:text-xl text-primary-text-dark dark:text-primary-text'>Pekerjaan</h1>
                        </div>
                        <div className='w-full flex flex-col gap-3 md:gap-4'>
                            <div className='flex flex-col md:flex-row justify-between mx-2 md:mx-5 border-b-2 border-primary-bg dark:border-dark-bg'>
                                <div className='flex flex-col w-full mb-2 md:mb-0'>
                                    <h1 className='text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg'>Nama Pekerjaan</h1>
                                    <input type="text" name="namaPekerjaan" value={formData.namaPekerjaan} onChange={handleInputChange} className='bg-gray-dark dark:bg-gray-light text-sm md:text-base p-2' />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg'>Pengalaman</h1>
                                    <input type="text" name="pengalaman" value={formData.pengalaman} onChange={handleInputChange} className='bg-gray-dark dark:bg-gray-light text-sm md:text-base p-2' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm md:text-base'>Save Changes</button>
                </form>
            </div>
        </div>
    )
}