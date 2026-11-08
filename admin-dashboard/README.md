# ScubaSwap Admin & Project Desk

A lightweight static dashboard for tracking the ScubaSwap build and browsing community posts from Supabase.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server.

## Connect Supabase

In the dashboard, open **Supabase setup** and enter the Project URL, a publishable (or legacy anon) key, and the table/view containing posts. If Row Level Security requires a signed-in admin, sign in with a Supabase Auth account. The dashboard reads posts through the Supabase Data API and supports search and paging. It does not edit or delete posts.

Use only a publishable/anon key in the browser. Never use a `service_role` or secret key. Connection details are stored in the local browser; milestone progress is local to that browser as well.

## Files

- `index.html`: dashboard pages and connection forms
- `styles.css`: responsive visual styles
- `app.js`: milestone state, Supabase connection, auth, and posts browser

This folder is a standalone static dashboard alongside the main ScubaSwap Next.js application.
