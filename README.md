# Sistem Pengurusan Disiplin - Kolej Vokasional Arau

Sistem Pengurusan Disiplin (SPD) dibangunkan khas untuk memudahkan pensyarah dan pentadbir Kolej Vokasional Arau merekod salah laku pelajar, memantau trend disiplin, dan menjana Surat Amaran rasmi dalam format PDF secara automatik.

## 🛠️ Stack Teknologi

- **Frontend**: React (Vite) + Tailwind CSS v4 + Recharts (Charts) + Lucide (Ikon)
- **Backend**: Node.js + Express.js
- **Database**: MySQL + Prisma ORM
- **Security**: JWT (Role-Based Access Control) + Bcrypt (Hashing Kata Laluan)
- **PDF Gen**: pdf-lib (Penjanaan surat amaran A4)

---

## ⚙️ Cara Pemasangan & Persediaan

### 1. Prasyarat (Prerequisites)
Pastikan anda telah memasang:
- [Node.js](https://nodejs.org/) (Versi 18 atau ke atas)
- [MySQL Server](https://dev.mysql.com/downloads/installer/) (Pastikan MySQL sedang berjalan secara lokal)

---

### 2. Persediaan Database & Backend

1. Buka folder `backend` dan salin/pastikan fail `.env` telah dikonfigurasi dengan maklumat MySQL anda:
   ```env
   # Format: mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
   DATABASE_URL="mysql://root:password@localhost:3306/kv_arau_discipline"
   JWT_SECRET="kv_arau_discipline_management_system_secure_key_2026_x92!"
   PORT=5000
   ```

2. Jalankan perintah pemasangan pakej & sync database di dalam terminal folder `backend`:
   ```bash
   # Pasang dependencies
   npm install

   # Jana Prisma Client
   npx prisma generate

   # Lakukan migration untuk membina table dalam MySQL database
   npx prisma db push
   ```

3. Jalankan **seed script** untuk memasukkan data permulaan (rekod pelajar, jenis kesalahan am, dan akaun log masuk):
   ```bash
   # Masukkan data mock permulaan
   npm run db:seed
   ```

4. Jalankan server backend dalam mod pembangunan:
   ```bash
   npm run dev
   ```
   *Backend akan berjalan di `http://localhost:5000`*

---

### 3. Persediaan Frontend (React)

1. Buka folder `frontend` di terminal baru.
2. Pasang dependencies:
   ```bash
   npm install
   ```
3. Jalankan server pembangunan:
   ```bash
   npm run dev
   ```
   *Frontend akan berjalan di `http://localhost:5173`*

---

## 🔑 Akaun Log Masuk Default (Untuk Ujian)

Sistem ini mempunyai Role-Based Access Control (RBAC):

1. **Akaun Pentadbir (Admin Role)** - Boleh mengakses semua fungsi (CRUD Pelajar, Padam Rekod, Dashboard Analitis & Cetak Surat Amaran):
   - **Username**: `admin`
   - **Password**: `admin123`

2. **Akaun Pensyarah (Teacher Role)** - Boleh mencari profil pelajar, melihat sejarah, dan merekod salah laku baharu (Tiada kebenaran untuk memadam data atau melihat dashboard pentadbir):
   - **Username**: `teacher`
   - **Password**: `teacher123`

---

## 📋 Syarat Penjanaan Surat Amaran PDF
Unit Disiplin menetapkan syarat amaran seperti berikut:
- **Kes ke-3 (3rd Offence)**: Surat Amaran Pertama (1)
- **Kes ke-4 (4th Offence)**: Surat Amaran Kedua (2)
- **Kes ke-5 ke atas (5th+ Offence)**: Surat Amaran Ketiga / Penggantungan Sekolah (7 hari)
