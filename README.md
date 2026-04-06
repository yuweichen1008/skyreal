# Skyreal

Warm, cozy B2B media agency website — built with Next.js 15, Tailwind CSS, Framer Motion, and Appwrite.

Live at **skyreal.org** · Hosted on GCP Compute Engine

---

## Quick start (local dev)

```bash
git clone https://github.com/your-user/skyreal.git
cd skyreal
cp .env.local.example .env.local   # fill in your Appwrite credentials
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Copy `.env.local.example` → `.env.local` and fill in each value.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint (e.g. `https://fra.cloud.appwrite.io/v1`) |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your Appwrite project ID |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Your Appwrite database ID |
| `NEXT_PUBLIC_APPWRITE_INQUIRIES_COLLECTION_ID` | Collection for B2B contact inquiries |
| `NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID` | Collection for course enrollment requests |
| `NEXT_PUBLIC_APPWRITE_SPONSORSHIP_COLLECTION_ID` | Collection for sponsorship inquiries |

### Appwrite collection schemas

**inquiries** — B2B contact form
| Attribute | Type | Required |
|---|---|---|
| name | string | ✓ |
| company | string | |
| email | string | ✓ |
| message | string | ✓ |
| submittedAt | string | ✓ |

**course_enrollments** — Course enrollment requests
| Attribute | Type | Required |
|---|---|---|
| name | string | ✓ |
| email | string | ✓ |
| courseTitle | string | ✓ |
| submittedAt | string | ✓ |

**sponsorship_inquiries** — Sponsorship contact form
| Attribute | Type | Required |
|---|---|---|
| brandName | string | ✓ |
| contactEmail | string | ✓ |
| website | string | |
| message | string | ✓ |
| submittedAt | string | ✓ |

---

## Deploy to GCP Compute Engine

### First-time VM setup

SSH into your VM, then run:

```bash
# 1. Copy setup script to the VM
scp scripts/setup-vm.sh user@<vm-ip>:~/

# 2. SSH in and run it
ssh user@<vm-ip>
chmod +x setup-vm.sh
./setup-vm.sh https://github.com/your-user/skyreal.git skyreal.org
```

The setup script handles everything:
- Node 20 (via NVM), PM2, Nginx, Certbot
- Clones the repo and builds the app
- Starts the app with PM2 (auto-restarts on reboot)
- Writes an Nginx reverse proxy config
- Optionally provisions a free SSL certificate via Let's Encrypt

### DNS

Point your domain at the VM's external IP:

```
A    @    <GCP-VM-EXTERNAL-IP>    TTL 300
A    www  <GCP-VM-EXTERNAL-IP>    TTL 300
```

### Firewall (GCP Console)

Make sure these ports are open:
- **tcp:80** (HTTP)
- **tcp:443** (HTTPS)

GCP Console → VPC Network → Firewall → Create rule → `allow-http-https`

### Deploying updates

```bash
./scripts/deploy.sh user@<vm-ip>
```

This pulls the latest code, rebuilds, and restarts PM2 automatically.

---

## Project structure

```
skyreal/
├── scripts/
│   ├── setup-vm.sh        ← one-command VM setup
│   ├── deploy.sh          ← deploy updates to VM
│   └── nginx.conf         ← Nginx config reference
├── src/
│   ├── app/
│   │   ├── page.tsx           ← homepage (6-section landing)
│   │   ├── courses/
│   │   │   └── page.tsx       ← online courses + enrollment
│   │   ├── sponsorship/
│   │   │   └── page.tsx       ← brand integration / sponsorship
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── Navbar.tsx
│   └── lib/
│       ├── appwrite.ts        ← all Appwrite functions
│       └── courses.ts         ← static course catalogue
├── .env.local.example
└── package.json
```

---

## Available scripts

| Command | Description |
|---|---|
| `yarn dev` | Start dev server with Turbopack at localhost:3000 |
| `yarn build` | Production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `./scripts/deploy.sh user@host` | Deploy to GCP VM |
| `./scripts/setup-vm.sh <repo> [domain]` | One-time VM setup |

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Animations | Framer Motion |
| Backend | Appwrite (database, collections) |
| Hosting | GCP Compute Engine + Nginx + PM2 |
| SSL | Let's Encrypt via Certbot |

---

## License

MIT
