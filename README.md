This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

# 🐠 Scuba Traders

**Scuba Traders** is something I’ve been wanting to build for a while — kind of like a social and trading hub for divers.
It’s a place where people can post, comment, share gear, and eventually buy, sell, or trade scuba stuff.

This repo is the start of it all. The plan is to keep things simple for now — just get the core feed, posts, comments, and auth working — and then build out from there. I’m doing this in a **7-day sprint**, more like a personal challenge to actually _ship_ something instead of sitting on ideas.

---

## 🚀 Stack

- **Next.js 14 + TypeScript**
- **Tailwind CSS** for styling
- **Prisma** for database
- **Supabase** for Postgres + Auth
- **Shadcn/UI** for the clean component setup

---

## 🗓️ 7-Day Sprint Breakdown

**Day 1:**
Setup Next.js, Tailwind, Prisma, and Supabase Auth.
Get connected to the Supabase DB and make sure Prisma can talk to it.

---

## 🧠 Why I’m Building This

I just wanted to move on something real — no overthinking, no tutorial hell.
This is more than just a test project. I want Scuba Traders to turn into an actual platform where divers can post, trade gear, and eventually connect directly with local dive shops.

For now though, I’m keeping it lean. MVP first. Fancy features later.

---

## 💡 Future Features

- User profiles
- Image uploads (R2 or Supabase Storage)
- Gear trading / marketplace
- Likes + saved posts
- Admin panel
- Notifications + messages

---

## 🧰 Setup

Clone and run locally:

```bash
git clone https://github.com/yourusername/scuba-traders.git
cd scuba-traders
npm install
npm run dev
```

Set up your `.env`:

```env
DATABASE_URL="your_supabase_postgres_url"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

Then migrate:

```bash
npx prisma db push
```

Start the app:

```bash
npm run dev
```

Now you should see the local version running at `localhost:3000`.

---

## ✨ Current Status

Right now, this project is in **active development**.
The goal is to have the base version live by the end of this sprint — with real posts, real comments, and real users.

This is my starting line. From here, I’ll keep improving it piece by piece until it feels like a full platform.
