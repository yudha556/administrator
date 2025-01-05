"use client";

import React, { createContext, useState, useEffect } from 'react';
import { Suitcase, MapPin, Calendar, EnvelopeSimple, Phone, Globe } from 'phosphor-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserData } from '@/helpers/userProfile';

export default function user() {
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState({
        alamat: '',
        detailPerusahaan: '',
        fullName: '',
        namaPekerjaan: '',
        negara: '',
        noTelepon: '',
        pengalaman: ''
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email)
                setUserId(user.uid)
            }
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const data = await getUserData(userId)
                if (data) {
                    setUserData({
                        alamat: data.alamat || '',
                        detailPerusahaan: data.detailPerusahaan || '',
                        fullName: data.fullName || '',
                        namaPekerjaan: data.namaPekerjaan || '',
                        negara: data.negara || '',
                        noTelepon: data.noTelepon || '',
                        pengalaman: data.pengalaman || ''
                    })
                }
            }
        }
        fetchData()
    }, [userId])

    return (
        <div className="h-full w-full flex flex-col lg:flex-row p-2 md:p-5 gap-5 justify-center items-center">
            <div className="w-full lg:w-[60%] bg-gray-dark dark:bg-primary-bg text-primary-text-dark dark:text-primary-text flex flex-col rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-[150px] md:h-[200px]">
                    <img src="./contoh_sampul.jpeg" className="w-full h-full object-cover" alt="Deskripsi Gambar" />
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-4 md:gap-6 justify-center items-center w-[95%] md:w-[90%] translate-y-[-20%] p-3 md:p-5">
                        <img src="./profil.jpg" className="rounded-full w-20 md:w-28 border-4 border-primary-bg dark:border-dark-bg"></img>
                        <div className="flex flex-col justify-center items-center w-full">
                            <h1 className="font-semibold text-lg md:text-xl text-primary-text-dark dark:text-primary-text">{userData.fullName || 'Nama belum diisi'}</h1>
                            <ul className="flex flex-row gap-3 md:gap-5 mt-3 md:mt-5 text-xs md:text-sm font-gray-500">
                                <li className='flex flex-row gap-2 items-center'>
                                    <Suitcase size={20} weight="duotone" />
                                    <p>{userData.namaPekerjaan || 'Pekerjaan belum diisi'}</p>
                                </li>
                                <li className='flex flex-row items-center gap-2'>
                                    <MapPin size={20} weight="duotone" />
                                    <p>{userData.alamat || 'Alamat belum diisi'}</p>
                                </li>
                                <li className='flex flex-row items-center gap-2'>
                                    <Calendar size={20} weight="duotone" />
                                    <p>{userData.pengalaman || 'Pengalaman belum diisi'}</p>
                                </li>
                            </ul>
                            <div className='w-full flex flex-col gap-3 mt-5 p-2'>
                                <div className='flex flex-row gap-2 items-center justify-between text-sm md:text-base'>
                                    <EnvelopeSimple size={20} weight="duotone" />
                                    <p>{email || 'Email belum diisi'}</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between text-sm md:text-base'>
                                    <Phone size={20} weight="duotone" />
                                    <p>{userData.noTelepon || 'No Telepon belum diisi'}</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between text-sm md:text-base'>
                                    <Globe size={20} weight="duotone" />
                                    <p>{userData.negara || 'Negara belum diisi'}</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-between text-sm md:text-base'>
                                    <MapPin size={20} weight="duotone" />
                                    <p>{userData.alamat || 'Alamat belum diisi'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col gap-3 rounded-xl text-primary-text-dark dark:text-primary-text bg-gray-dark dark:bg-primary-bg shadow-lg p-4 md:p-8'>
                <div className='w-full flex flex-col gap-3 text-primary-text-dark dark:text-primary-text'>
                    <h1 className='font-bold text-lg md:text-xl text-primary-text-dark dark:text-primary-text'>Perusahaan Apa Ini</h1>
                    <p className='text-sm md:text-base'>{userData.detailPerusahaan || 'Detail perusahaan belum diisi'}</p>
                </div>
                <div className='border-t-2 w-full mt-5 md:mt-7 gap-3 flex flex-col'>
                    <h1 className='py-3 md:py-4 border-b-2 font-bold text-lg md:text-xl text-primary-text-dark dark:text-primary-text'>Personal Detail</h1>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col md:flex-row justify-between mx-2 md:mx-5 border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg">Full Name</h1>
                                <p className='text-sm md:text-base'>{userData.fullName || 'Nama belum diisi'}</p>
                            </div>
                            <div className='flex flex-col w-full mt-2 md:mt-0'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg">Email</h1>
                                <p className='text-sm md:text-base'>{email || 'Email belum diisi'}</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row justify-between mx-2 md:mx-5 border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg">No Telepon</h1>
                                <p className='text-sm md:text-base'>{userData.noTelepon || 'No Telepon belum diisi'}</p>
                            </div>
                            <div className='flex flex-col w-full mt-2 md:mt-0'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg">Negara</h1>
                                <p className='text-sm md:text-base'>{userData.negara || 'Negara belum diisi'}</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mx-2 md:mx-5 border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg">Alamat</h1>
                                <p className='text-sm md:text-base'>{userData.alamat || 'Alamat belum diisi'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border-t-2 w-full mt-5 md:mt-7 gap-3 flex flex-col'>
                    <h1 className='py-3 md:py-4 border-b-2 font-bold text-lg md:text-xl text-primary-text-dark dark:text-primary-bg'>Pekerjaan</h1>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col md:flex-row justify-between mx-2 md:mx-5 border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg">Nama Pekerjaan</h1>
                                <p className='text-sm md:text-base'>{userData.namaPekerjaan || 'Pekerjaan belum diisi'}</p>
                            </div>
                            <div className='flex flex-col w-full mt-2 md:mt-0'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-base md:text-lg">Pengalaman</h1>
                                <p className='text-sm md:text-base'>{userData.pengalaman || 'Pengalaman belum diisi'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}