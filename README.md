<div align="center">

# 👟 KedaiKasut

**Kasut original, harga jujur.**

Kedai kasut dalam talian — mockup landing page & katalog yang dibina atas Laravel 13, Inertia 3 dan React 19.

[![Tests](https://github.com/wafirocky/KedaiKasut/actions/workflows/tests.yml/badge.svg)](https://github.com/wafirocky/KedaiKasut/actions/workflows/tests.yml)
[![PHP](https://img.shields.io/badge/PHP-8.3%2B-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](./Dockerfile)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#-lesen)

[Demo](https://wafiazmi.com) · [Panduan Deploy](./DEPLOY.md) · [Lapor Isu](https://github.com/wafirocky/KedaiKasut/issues)

</div>

---

## 📖 Tentang Projek

KedaiKasut ialah aplikasi web kedai kasut dalam talian. Ia memaparkan katalog
sneaker, kasut formal dan sukan daripada lapan brand terpilih, lengkap dengan
penapis brand, harga dalam Ringgit dan paparan saiz.

Di sebalik tabir, projek ini menggunakan Laravel React Starter Kit — jadi
pengesahan pengguna, dashboard dan halaman tetapan sudah tersedia sejak hari
pertama.

## ✨ Ciri-ciri

| | |
|---|---|
| 🏷️ **Katalog produk** | 16 produk merentas 8 brand dengan penapis interaktif |
| 🔐 **Autentikasi penuh** | Log masuk, daftar, sahkan e-mel, reset kata laluan |
| 🛡️ **2FA & Passkey** | Two-factor authentication dan log masuk tanpa kata laluan (Laravel Fortify) |
| 🌗 **Mod gelap** | Tema terang/gelap mengikut pilihan pengguna |
| 📱 **Responsif** | Reka bentuk mobile-first dengan Tailwind CSS 4 |
| 🐳 **Docker-ready** | App + Postgres via `compose.prod.yaml`, sama seperti produksi |
| ✅ **CI lengkap** | Lint, format, type-check dan ujian automatik pada setiap push |

## 🛠️ Teknologi

**Backend**
- [Laravel 13](https://laravel.com/) · PHP 8.3+
- [Inertia.js 3](https://inertiajs.com/) — jambatan Laravel ↔ React tanpa API berasingan
- [Laravel Fortify](https://laravel.com/docs/fortify) — autentikasi, 2FA, passkey
- [Wayfinder](https://github.com/laravel/wayfinder) — route Laravel dengan type-safety di sisi TypeScript
- SQLite untuk pembangunan, PostgreSQL untuk produksi

**Frontend**
- [React 19](https://react.dev/) + TypeScript 5.7
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- [Vite 8](https://vite.dev/) · [Lucide](https://lucide.dev/) icons

**Kualiti kod**
- [Pint](https://laravel.com/docs/pint) · [Larastan](https://github.com/larastan/larastan) (PHPStan) · PHPUnit 12
- ESLint 9 · Prettier 3 · `tsc --noEmit`

## 🚀 Mula Cepat

**Keperluan:** PHP 8.3+, Composer 2, Node.js 20+

```bash
# 1. Klon repo
git clone https://github.com/wafirocky/KedaiKasut.git
cd KedaiKasut

# 2. Pasang & sediakan (composer install, .env, key, migrate, npm build)
composer setup

# 3. Jalankan server pembangunan
composer dev
```

Buka **http://localhost:8000** — siap.

> `composer dev` menjalankan Laravel, queue worker, log viewer dan Vite serentak.

<details>
<summary><b>Pemasangan manual (langkah demi langkah)</b></summary>

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate

npm install
npm run dev          # terminal 1
php artisan serve    # terminal 2
```

</details>

## 🐳 Jalankan dengan Docker

```bash
cp .env.docker.example .env.docker
php artisan key:generate --show      # salin ke APP_KEY dalam .env.docker

docker compose -f compose.prod.yaml up -d --build
curl -I http://localhost:8000/up     # patut 200
```

Berhenti: `docker compose -f compose.prod.yaml down`
Reset database: `docker compose -f compose.prod.yaml down -v`

## 📜 Arahan Berguna

| Arahan | Fungsi |
|---|---|
| `composer dev` | Server pembangunan (app + queue + logs + Vite) |
| `composer test` | Jalankan lint, PHPStan dan ujian PHPUnit |
| `composer lint` | Format kod PHP dengan Pint |
| `composer ci:check` | Semua semakan CI secara tempatan |
| `npm run dev` | Vite dev server sahaja |
| `npm run build` | Build asset untuk produksi |
| `npm run lint` | ESLint dengan auto-fix |
| `npm run types:check` | Semakan jenis TypeScript |

## 📁 Struktur Projek

```
├── app/                    # Model, controller, provider Laravel
├── database/               # Migration, factory, seeder
├── docker/                 # Entrypoint & konfigurasi opcache
├── resources/js/
│   ├── components/         # Komponen React & shadcn/ui
│   ├── data/catalog.ts     # Data katalog produk
│   ├── layouts/            # Layout app, auth, settings
│   └── pages/              # Halaman Inertia (welcome, dashboard, auth, settings)
├── routes/                 # web.php, settings.php, console.php
├── tests/                  # Ujian Feature & Unit
├── Dockerfile              # Imej produksi satu-container
└── DEPLOY.md               # Panduan deploy ke EasyPanel
```

## 🌐 Deploy

Panduan penuh untuk deploy ke **EasyPanel** (termasuk DNS, volume, env dan
penyelesaian masalah) ada dalam **[DEPLOY.md](./DEPLOY.md)**.

Ringkasnya:

```bash
git push origin main    # EasyPanel auto-build daripada Dockerfile
```

## 🤝 Menyumbang

Pull request dialu-alukan. Sebelum hantar, pastikan semakan lulus:

```bash
composer ci:check
```

## 📄 Lesen

Projek ini dilesenkan di bawah [Lesen MIT](https://opensource.org/licenses/MIT).

---

<div align="center">
<sub>Dibina dengan ❤️ menggunakan Laravel &amp; React</sub>
</div>
