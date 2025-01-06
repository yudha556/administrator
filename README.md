
# THis is Last Project Web Technology
Ini adalah proyek akhir untuk mata kuliah Teknologi Web. Dalam proyek ini, saya mengembangkan aplikasi web administrator menggunakan Next.js sebagai framework frontend dan Firebase sebagai backend. Proyek ini berfokus pada desain antarmuka pengguna agar ramah pengguna dan responsif, sehingga dapat diakses dari berbagai perangkat.


## Fitur
## 1. Login Page 
![image](https://github.com/user-attachments/assets/f89ca424-e9a4-4789-9082-61e7a8b54202)
Halaman login terintegrasi dengan Firebase Authentication untuk pembuatan akun dan login pengguna.

## 2. Dashboard Page
![image](https://github.com/user-attachments/assets/e149b70e-10f0-450a-ba9c-4065bbab7be0) 
![image](https://github.com/user-attachments/assets/831b8a4f-a1da-4f9e-8c52-dc3af87eb103)
Dashboard menyediakan ringkasan dari seluruh halaman utama yang ditampilkan secara singkat untuk akses cepat.

## 3. Produk Page
![image](https://github.com/user-attachments/assets/fbc03d87-193d-4ea3-9fd6-f89548b5d383)
![image](https://github.com/user-attachments/assets/af197261-eef5-4b17-81da-336ebbae0b71)
Halaman ini menampilkan daftar produk yang terhubung langsung dengan Firebase untuk pembaruan real-time.

## 4. Statistik Page
![image](https://github.com/user-attachments/assets/5fbbcaef-dc4f-4840-a6f9-1db46ad0c87e)
![image](https://github.com/user-attachments/assets/fe528fed-d495-4533-b6aa-97fc6564a9d8)
disini berisikan informasi statistik dari penjualan maupun pendapatan

## 5. Profil Page
![image](https://github.com/user-attachments/assets/91953c24-5d8c-4b59-9be5-0930725b8ca5)
![image](https://github.com/user-attachments/assets/0a5f30bd-2f5d-404a-ba62-82b5f546e804)
Disini adalah profile page yang terhubung langsung dengan firebase


## Teknologi yang digunakan

- **Next.js**: Sebagai framework frontend untuk membuat antarmuka.
- **Firebase**: Digunakan untuk otentikasi pengguna dan penyimpanan data secara real-time.
- **Tailwind CSS**: Library CSS yang digunakan untuk styling dan mempercepat proses desain antarmuka.
- **ApexCharts**: Digunakan untuk membuat visualisasi data dan grafik pada halaman statistik.
- **MUI (Material-UI)**: Framework desain berbasis komponen untuk membuat tampilan yang modern dan responsif.
- **Phosphor Icon**: Library ikon yang ringan dan mudah digunakan untuk memperindah antarmuka aplikasi.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di broweser mu


## Pelajari Lebih Lanjut Bang

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy ke Vercel

Deployment ke Vercel sedang dalam proses. Namun, di Vercel, hanya tampilan frontend yang akan disertakan, sementara backend Firebase tidak akan diikutsertakan.



| **⚠️ Catatan** Firebase tidak dapat di-deploy secara otomatis bersamaan dengan aplikasi di Vercel. Jika Anda ingin menggunakan Firebase sebagai backend, Anda perlu menghubungkannya secara manual setelah melakukan deployment frontend di Vercel. |
