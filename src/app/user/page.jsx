"use client";

import React, { createContext } from 'react';
import { Suitcase, MapPin, Calendar, EnvelopeSimple, Phone, Globe } from 'phosphor-react';
export default function user() {
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

            <div className='w-full flex flex-col gap-3 rounded-xl bg-white shadow-lg p-8'>
                <div className='w-full flex flex-col gap-3 text-gray-500'>
                    <h1 className='font-bold '>Perusahaan Apa Ini</h1>
                    <p>Jadi ini adalah perusahaan teknologi web ini gunanya buat tugas akhir boy jadi ini adalah perusahaan teknologi web ini gunanya buat tugas akhir boy</p>
                </div>
                <div className='border-t-2 w-full mt-7 gap-3 flex flex-col'>
                    <h1 className='py-4 border-b-2 font-bold'>Personal Detail</h1>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1>Full Name</h1>
                                <p>Hendrian Yudha Pratama</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1>Email</h1>
                                <p>hendrian.yudha@gmail.com</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1>No Telepon</h1>
                                <p>+62 856 0145 5805</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1>Negara</h1>
                                <p>Indonesia</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1>Alamat</h1>
                                <p>Kab. Banjarnegara, Kec. Pandanarum</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='border-t-2 w-full mt-7 gap-3 flex flex-col'>
                    <h1 className='py-4 border-b-2 font-bold'>Pekerjaan</h1>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1>Nama Pekerjaan</h1>
                                <p>Developer</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1>Pengalaman</h1>
                                <p>1000 Tahun</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mx-5  border-b-2'>
                            <div className='flex flex-col w-full'>
                                <h1>Alamat</h1>
                                <p>Kab. Banjarnegara, kec. Pandanarum</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1>Negara</h1>
                                <p>Indonesia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 