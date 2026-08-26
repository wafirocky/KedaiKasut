# Deploy KedaiKasut ke EasyPanel (wafiazmi.com)

Dua service dalam EasyPanel:

| Service | Jenis | Fungsi |
|---|---|---|
| `kedaikasut` | App (Dockerfile) | Laravel + React, port 8000 |
| `kedaikasut-postgres` | Postgres | Database |

App container **stateless** — semua data duduk dalam Postgres, jadi app tak
perlu volume langsung.

---

## 0. Test dulu di lokal

`compose.prod.yaml` jalankan app + Postgres serentak, sama macam EasyPanel.

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

```bash
git push origin main
```

Repo: `https://github.com/wafirocky/KedaiKasut` (public — EasyPanel boleh pull
tanpa GitHub App).

---

## 2. DNS — arahkan wafiazmi.com ke server

| Type  | Name  | Value                   | TTL  |
|-------|-------|-------------------------|------|
| A     | `@`   | `<IP server EasyPanel>` | Auto |
| A     | `www` | `<IP server EasyPanel>` | Auto |

IP ada kat EasyPanel → **Settings**.
Kalau guna Cloudflare, set proxy **DNS only (grey cloud)** dulu supaya
Let's Encrypt boleh issue sijil. Lepas HTTPS jalan, baru tukar ke orange.

Semak: `nslookup wafiazmi.com`

---

## 3. Service Postgres

**Project** → `+ Service` → **Postgres**. Nama: `kedaikasut-postgres`.

Catat dari tab **Credentials**:

| Field | Nilai |
|---|---|
| User | `postgres` |
| Password | (klik ikon mata untuk lihat) |
| Database Name | `kedaikasut` |
| Internal Host | `kedaikasut_kedaikasut-postgres` |
| Internal Port | `5432` |

Postgres service uruskan storage sendiri — tak perlu mount volume manual.

---

## 4. Service App

**Project** → `+ Service` → **App**. Nama: `kedaikasut`.

Tab **Source**:
- Provider: **GitHub** (atau **Git** + URL repo)
- Repository: `wafirocky/KedaiKasut`
- Branch: `main`
- Build path: `/`

Tab **Build**:
- Method: **Dockerfile**
- Dockerfile path: `Dockerfile`

---

## 5. Environment variables

Tab **Environment**, paste (ganti `<PASSWORD>` dengan password Postgres):

```
APP_NAME=Kedai Kasut
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:GANTI_DENGAN_KEY_SENDIRI
APP_URL=https://wafiazmi.com

DB_CONNECTION=pgsql
DB_HOST=kedaikasut_kedaikasut-postgres
DB_PORT=5432
DB_DATABASE=kedaikasut
DB_USERNAME=postgres
DB_PASSWORD=<PASSWORD>

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
CACHE_STORE=database
QUEUE_CONNECTION=database
LOG_CHANNEL=stderr
```

Jana `APP_KEY`: `php artisan key:generate --show`

> **Penting:** kalau `APP_KEY` tak diset, entrypoint akan jana key sementara —
> maknanya semua session/login logout balik setiap kali redeploy.

`DB_HOST` mesti **Internal Host** dari tab Credentials Postgres, bukan
`localhost` — dua service tu container berasingan.

---

## 6. Domain

Tab **Domains** → `+ Domain`:

- Host: `wafiazmi.com`
- Port: **8000**
- Protocol: **http** (dalaman — TLS tamat kat Traefik)
- HTTPS: **On** (Let's Encrypt auto-issue)
- Path: `/`

---

## 7. Deploy

Klik **Deploy**. Build pertama ambil ~3-5 minit (composer + npm + vite build).

Masa container start, `docker/entrypoint.sh` akan:
1. Tunggu Postgres terima connection (sampai 120s)
2. `php artisan migrate --force`
3. Cache config, route, view
4. Start server port 8000

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
| `could not find driver` | Imej lama tanpa `pdo_pgsql` | Rebuild — `Dockerfile` dah pasang `pdo_pgsql` |
| `database unreachable after 120s` | `DB_HOST` salah | Guna Internal Host penuh dari tab Credentials |
| `password authentication failed` | `DB_PASSWORD` salah | Copy semula dari tab Credentials |
| Sijil SSL gagal | Cloudflare proxy on | Tukar ke DNS-only, deploy semula |
| CSS/JS tak load, mixed content | `APP_URL` masih `http://` | Set `APP_URL=https://wafiazmi.com` |
| Logout sendiri lepas deploy | `APP_KEY` tak diset | Set `APP_KEY` tetap dalam env |
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
