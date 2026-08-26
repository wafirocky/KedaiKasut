# Deploy KedaiKasut ke EasyPanel (wafiazmi.com)

Imej ni satu container sahaja: PHP 8.4 + SQLite + asset Vite yang dah di-build.
Tak perlu MySQL, tak perlu Redis, tak perlu Nginx berasingan.

---

## 0. Test dulu di lokal

```bash
cp .env.docker.example .env.docker
php artisan key:generate --show    # copy hasilnya ke APP_KEY dalam .env.docker

docker compose -f compose.prod.yaml up -d --build
curl -I http://localhost:8000/up   # patut 200
```

Berhenti: `docker compose -f compose.prod.yaml down`
Reset database: `docker compose -f compose.prod.yaml down -v`

---

## 1. Push repo ke GitHub

EasyPanel build terus dari Git, jadi repo kena ada kat GitHub dulu.

```bash
gh repo create wafirocky/KedaiKasut --private --source=. --remote=origin --push
# atau manual:
# git remote add origin https://github.com/wafirocky/KedaiKasut.git
# git push -u origin main
```

---

## 2. DNS — arahkan wafiazmi.com ke server

Kat registrar/DNS provider domain `wafiazmi.com`, set:

| Type  | Name  | Value                  | TTL  |
|-------|-------|------------------------|------|
| A     | `@`   | `<IP server EasyPanel>` | Auto |
| A     | `www` | `<IP server EasyPanel>` | Auto |

IP server ada kat EasyPanel → **Settings** (atau ikut IP VPS anda).
Kalau guna Cloudflare, set proxy **DNS only (grey cloud)** dulu supaya
Let's Encrypt boleh issue sijil. Lepas HTTPS jalan, baru boleh tukar ke orange.

Semak: `nslookup wafiazmi.com` — mesti keluar IP server tu.

---

## 3. Buat service kat EasyPanel

1. **Project** → `+ Service` → **App**. Nama: `kedaikasut`.
2. Tab **Source**:
   - Provider: **GitHub**
   - Repository: `wafirocky/KedaiKasut`
   - Branch: `main`
   - Build path: `/`
3. Tab **Build**:
   - Method: **Dockerfile**
   - Dockerfile path: `Dockerfile`

---

## 4. Environment variables

Tab **Environment**, paste:

```
APP_NAME=Kedai Kasut
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:GANTI_DENGAN_KEY_SENDIRI
APP_URL=https://wafiazmi.com

DB_CONNECTION=sqlite
DB_DATABASE=/data/database.sqlite

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
CACHE_STORE=database
QUEUE_CONNECTION=database
LOG_CHANNEL=stderr
```

Jana `APP_KEY`: `php artisan key:generate --show`

> **Penting:** kalau `APP_KEY` tak diset, entrypoint akan jana key sementara —
> maknanya semua session/login logout balik setiap kali redeploy.

---

## 5. Volume — supaya database tak hilang

Tab **Mounts** → `+ Volume`:

- Type: **Volume**
- Name: `kedaikasut-data`
- Mount path: `/data`

Tanpa ni, `database.sqlite` reset kosong setiap kali deploy.

---

## 6. Domain

Tab **Domains** → `+ Domain`:

- Host: `wafiazmi.com`
- Port: **8000**
- HTTPS: **On** (Let's Encrypt auto-issue)
- Path: `/`

Tambah lagi satu untuk `www.wafiazmi.com` kalau nak, atau set redirect ke apex.

---

## 7. Deploy

Klik **Deploy**. Build pertama ambil ~3-5 minit (composer + npm + vite build).

Semak selepas siap:

```bash
curl -I https://wafiazmi.com/up      # 200
curl -I https://wafiazmi.com/        # 200
```

---

## Checklist bila ada masalah

| Simptom | Punca biasa | Fix |
|---|---|---|
| 502 Bad Gateway | Port domain salah | Set port `8000`, bukan 80 |
| Sijil SSL gagal | Cloudflare proxy on | Tukar ke DNS-only, deploy semula |
| CSS/JS tak load, mixed content | `APP_URL` masih `http://` | Set `APP_URL=https://wafiazmi.com` |
| Logout sendiri lepas deploy | `APP_KEY` tak diset | Set `APP_KEY` tetap dalam env |
| Data hilang lepas deploy | Volume tak mount | Mount volume ke `/data` |
| Build gagal masa `npm run build` | Memory VPS rendah | Naikkan RAM/swap server |

Logs: EasyPanel → service → tab **Logs** (app tulis ke stderr).

---

## Update selepas ni

```bash
git push origin main
```

Kemudian tekan **Deploy** kat EasyPanel (atau hidupkan Auto Deploy dalam tab
Source supaya setiap push terus deploy). Migration jalan automatik masa
container start.
