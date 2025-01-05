"use client";

import React, { createContext } from 'react';
import { Suitcase, MapPin, Calendar, EnvelopeSimple, Phone, Globe } from 'phosphor-react';
export default function user() {
    return (
        <div className="h-full w-full  flex p-5  gap-5 justify-center items-center">
            <div className="w-[60%] bg-gray-dark dark:bg-primary-bg text-primary-text-dark dark:text-primary-text  flex flex-col rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-[200px]">
                    <img src="./contoh_sampul.jpeg" className="w-full h-full object-cover" alt="Deskripsi Gambar" />
                </div>
                <div className=" w-full h-full flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-6 justify-center items-center w-[90%] translate-y-[-20%] p-5">
                        <img src="./profil.jpg" className="rounded-full w-28 border-4 border-primary-bg dark:border-dark-bg "></img>
                        <div className="flex flex-col justify-center items-center w-full ">
                            <h1 className="font-semibold text-xl text-primary-text-dark dark:text-primary-text ">Hendrian Yudha Pratama</h1>
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
                                    <p>hendrianYudha@gmail.com</p>
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

            <div className='w-full flex flex-col gap-3 rounded-xl text-primary-text-dark dark:text-primary-text bg-gray-dark dark:bg-primary-bg  shadow-lg p-8'>
                <div className='w-full flex flex-col gap-3 text-primary-text-dark dark:text-primary-text'>
                    <h1 className='font-bold text-xl text-primary-text-dark dark:text-primary-text '>Perusahaan Apa Ini</h1>
                    <p>Jadi ini adalah perusahaan teknologi web ini gunanya buat tugas akhir boy jadi ini adalah perusahaan teknologi web ini gunanya buat tugas akhir boy</p>
                </div>
                <div className='border-t-2 w-full mt-7 gap-3 flex flex-col'>
                    <h1 className='py-4 border-b-2 font-bold text-xl text-primary-text-dark dark:text-primary-text'>Personal Detail</h1>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">Full Name</h1>
                                <p className=''>Hendrian Yudha Pratama</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">Email</h1>
                                <p className=''>hendrian.yudha@gmail.com</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">No Telepon</h1>
                                <p className=''>+62 856 0145 5805</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">Negara</h1>
                                <p className=''>Indonesia</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">Alamat</h1>
                                <p className=''>Kab. Banjarnegara, Kec. Pandanarum</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='border-t-2 w-full mt-7 gap-3 flex flex-col'>
                    <h1 className='py-4 border-b-2 font-bold text-xl text-primary-text-dark dark:text-primary-bg'>Pekerjaan</h1>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">Nama Pekerjaan</h1>
                                <p className=''>Developer</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">Pengalaman</h1>
                                <p className=''>1000 Tahun</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">Alamat</h1>
                                <p className=''>Kab. Banjarnegara, kec. Pandanarum</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1 className="text-primary-text-dark dark:text-primary-text font-bold text-lg">Negara</h1>
                                <p className=''>Indonesia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 