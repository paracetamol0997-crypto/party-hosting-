# 🔥 NIGHT OUT — Hitesh's Party Invitation & Guest Registration Website

A responsive, digital party invitation and registration web application designed based on the **"NIGHT OUT"** event poster. 

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase PostgreSQL** (with automatic zero-config local fallback), **Resend Email**, and optional **Meta WhatsApp Cloud API**.

---

## 🌟 Key Features

1. **Poster-Accurate Visual Identity**:
   - Dark cinematic nightlife canvas (`#08080c`) with warm glowing string lights across the top.
   - Hand-drawn neon yellow brush strokes, chalk lines, and signature crown doodles.
   - Distinctive typography inspired by street-art chalk & grunge lettering.
   - Special badge: `★ SPECIAL ITEM ★ JON`.
   - `DJ PRINCE PAVAN`, `ELITE MEMBERS`, `DELIGHT MEMBERS`, and `CHEF JINNA BHAI`.

2. **Real-Time Asia/Kolkata Countdown**:
   - Live Days : Hours : Minutes : Seconds ticker calculated to **October 12, 2026, at 10:00 PM IST**.
   - Handles global timezones dynamically (countdown updates accurately regardless of guest location).
   - Switches to `"THE NIGHT HAS STARTED 🔥"` when the party begins.

3. **Robust RSVP & Registration System**:
   - Validation for Full Name, Indian Mobile (`^[6-9]\d{9}$`), Email, Guest Count (1–25), and Custom Message for Hitesh.
   - **Anti-duplicate protection**: Prevents multiple submissions using the same phone number.
   - Friendly error handling without leaking raw server or database details.

4. **Celebration Success Pass Screen**:
   - Dynamic **canvas confetti explosion** upon registration.
   - Personalized VIP Entry Pass (`#ADMIT-ONE`) displaying guest name, party squad size, total share (`₹300 × guests`), and personalized live countdown ticker.
   - **One-click WhatsApp Share** button to share the confirmation pass with friends.

5. **Notification System**:
   - **Transactional Email (Resend)**: Sends an alert with guest details to the host (`ADMIN_EMAIL`).
   - **WhatsApp Cloud API (Meta)**: Dispatches automated WhatsApp template/text messages if credentials are provided.
   - Non-blocking asynchronous notification queue with graceful skips if credentials are not configured.

6. **Host Admin Dashboard (`/admin`)**:
   - Password-protected with secure session cookie (`ADMIN_PASSWORD`).
   - Live metrics: Total RSVPs, Headcount, Total Pool Share (`₹300 × headcount`).
   - Real-time search across guests (name, phone, email, message).
   - Instant **CSV Export** for guest lists.
   - Quick WhatsApp/Call links and delete action.

7. **Interactive Nightclub Audio**:
   - Optional ambient party beat synthesized with Web Audio API.
   - Strictly user-initiated via `"ENTER THE NIGHT 🎵"` button (no autoplay).

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18.x, 20.x, or 24.x
- npm / pnpm / yarn

### 2. Installation
```bash
# Clone or navigate to the folder
cd "c:\Users\Princ\Documents\hitesh party"

# Install dependencies
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
ADMIN_PASSWORD=9347478875
ADMIN_EMAIL=your-email@example.com
RESEND_API_KEY=re_your_resend_api_key_here
EMAIL_FROM=Night Out <onboarding@resend.dev>

# Supabase (optional for local dev; if blank, uses automatic local storage fallback)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Meta WhatsApp Cloud API (optional)
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_RECIPIENT_NUMBER=
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

Access the Host Admin Dashboard at [http://localhost:3000/admin](http://localhost:3000/admin) with password: `9347478875`.

---

## 🗄️ Database Setup (Supabase PostgreSQL)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project.
3. Paste the contents of `supabase-schema.sql`:
```sql
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  number_of_people INTEGER NOT NULL DEFAULT 1 CHECK (number_of_people >= 1),
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'confirmed',
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registrations_phone ON registrations(phone);
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(registered_at DESC);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on registrations"
  ON registrations FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow service role full access on registrations"
  ON registrations FOR ALL TO service_role USING (true) WITH CHECK (true);
```
4. Copy your **Project URL** and **anon/service_role API Keys** from `Project Settings > API` into your `.env.local` or Vercel environment variables.

> **Note**: If Supabase variables are left empty, the application automatically uses a local file-based database (`data/registrations.json`). Everything works seamlessly out-of-the-box!

---

## 📧 Email Notification Setup (Resend)

1. Sign up for a free account at [resend.com](https://resend.com).
2. Generate an API Key under **API Keys**.
3. In your `.env.local`:
   ```env
   RESEND_API_KEY=re_123456789
   ADMIN_EMAIL=hitesh@yourdomain.com
   EMAIL_FROM=Night Out <onboarding@resend.dev>
   ```
4. When a guest registers, Hitesh immediately receives a formatted email notification.

---

## 💬 WhatsApp Notification Setup (Meta WhatsApp Cloud API)

1. Go to [developers.facebook.com](https://developers.facebook.com) and create a **WhatsApp Business App**.
2. Navigate to **WhatsApp > API Setup**.
3. Copy:
   - **Temporary/Permanent Access Token** -> `WHATSAPP_ACCESS_TOKEN`
   - **Phone Number ID** -> `WHATSAPP_PHONE_NUMBER_ID`
   - Your receiving WhatsApp phone number (in international format without + or spaces) -> `WHATSAPP_RECIPIENT_NUMBER`
4. If WhatsApp credentials are omitted, the app will log a note and gracefully continue without interruption.

---

## 🚢 Production Deployment (Vercel)

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In **Settings > Environment Variables**, add:
   - `ADMIN_PASSWORD`
   - `ADMIN_EMAIL`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `WHATSAPP_ACCESS_TOKEN` (optional)
   - `WHATSAPP_PHONE_NUMBER_ID` (optional)
   - `WHATSAPP_RECIPIENT_NUMBER` (optional)
4. Click **Deploy**. Your custom digital party invitation will be live in seconds!

---

## 🔒 Security & Best Practices

- **Strict Server Validation**: All inputs sanitized and validated with Zod.
- **In-Memory Rate Limiting**: Prevents bot abuse and registration spam.
- **Secure HttpOnly Cookie**: Host admin dashboard authenticated via session cookie or bearer token.
- **No Leaked Secrets**: All API keys, tokens, and database passwords are kept server-side.
