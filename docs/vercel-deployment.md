# AUTOVERSE Frontend Deployment Manual (Vercel)

This document provides step-by-step instructions for deploying the **AUTOVERSE** Next.js frontend to Vercel with zero friction and enterprise-grade performance.

---

## 1. Project Configuration Summary

- **Framework:** Next.js 14 (App Router)
- **Root Directory in Repository:** `frontend`
- **Build Command:** `next build` (or `npm run build`)
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node.js Version:** 18.x or 20.x (Recommended: Node 20 LTS)

---

## 2. Environment Variables Configuration

In your Vercel Project Dashboard (**Settings -> Environment Variables**), add the following environment variables:

| Variable Name | Environment | Value Description | Example Value |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Production, Preview, Development | Base URL of your deployed Node.js/Express backend | `https://api.autoverse.com/api/v1` |
| `NEXT_PUBLIC_CDN_BASE_URL` | Production, Preview, Development | Public CDN domain for vehicle images | `https://media.autoverse.com` |
| `NEXT_PUBLIC_SITE_URL` | Production, Preview | Canonical domain of the frontend | `https://autoverse.vercel.app` |

> ⚠️ **CRITICAL SECURITY RULE:**  
> Never add `MONGODB_URI`, `JWT_SECRET`, or private server credentials to Vercel frontend variables. The frontend connects solely through the authenticated REST API.

---

## 3. Step-by-Step Vercel Import Guide

1. Log in to [Vercel](https://vercel.com) and click **"Add New..." -> "Project"**.
2. Select your GitHub repository: **`arifranabk3/autoverse-marketplace`**.
3. In the **Configure Project** screen:
   - **Project Name:** `autoverse-marketplace`
   - **Framework Preset:** `Next.js`
   - **Root Directory:** Click **Edit** and choose **`frontend`** (Important!).
4. Expand **Environment Variables** and paste the variables from Section 2.
5. Click **"Deploy"**.

---

## 4. Built-in Security & Optimization Features

- **Security Headers (`next.config.js`):**
  - Strict Content-Type-Options: `nosniff`
  - Strict Transport Security (HSTS): `max-age=63072000; includeSubDomains; preload`
  - Frame Protection: `DENY`
  - Cross-Origin Resource Policy: `origin-when-cross-origin`
- **Remote Image Optimization:**
  - Whitelisted CDNs: `images.unsplash.com`, `*.amazonaws.com`, `media.autoverse.com`.
- **Fault-Tolerant Progressive Fallbacks:**
  - If the backend is under maintenance or temporarily unavailable, public showroom pages gracefully display curated vehicle specifications without broken UI or blank screens.

