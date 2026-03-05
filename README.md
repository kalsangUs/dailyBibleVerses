# Bible Quotes

Discover, save, and revisit Bible verses — one at a time.

**[Try it live at bible-quotes-mus5.vercel.app](https://bible-quotes-mus5.vercel.app/)**

## What it does

Each visit surfaces a random verse from the World English Bible. Read it, save it for later, or like it — your lists persist across sessions so you can build a personal collection of verses that matter to you.

- **Discover** — a new random verse every time you refresh
- **Save** — bookmark verses to revisit whenever you want
- **Like** — keep a separate list of your favourites
- **Sidebar navigation** — jump between Discover, Saved, and Liked with a clean collapsible nav
- **Dark mode** — easy on the eyes day or night

## Running locally

```bash
npm install
npx convex dev   # start Convex backend (requires a free Convex account)
npm run dev      # start Next.js dev server at http://localhost:3000
```

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) — UI components
- [Convex](https://convex.dev) — backend database and serverless functions
- [bible-api.com](https://bible-api.com) — free Bible verse API (World English Bible, Public Domain)
