# Bible Quotes

A web app to discover, save, and like random Bible verses, built with Next.js and the [bible-api.com](https://bible-api.com) API.

## Features

- Fetches a random verse from the World English Bible (WEB) translation on each page load
- Save verses to a personal saved list, stored in Convex
- Like verses to a separate liked list, stored in Convex
- Remove saved or unlike liked verses from their respective pages
- Collapsible sidebar navigation between Discover, Saved, and Liked pages
- Dark mode support

## Tech Stack

- **[Next.js 16](https://nextjs.org)** — App Router, client components
- **[React 19](https://react.dev)**
- **[Tailwind CSS v4](https://tailwindcss.com)**
- **[shadcn/ui](https://ui.shadcn.com)** — Button, Sidebar, and other UI components
- **[Convex](https://convex.dev)** — backend database and serverless functions
- **[bible-api.com](https://bible-api.com)** — free Bible verse API

## Getting Started

```bash
npm install
npx convex dev   # start Convex backend (requires Convex account)
npm run dev      # start Next.js dev server
```

Open [http://localhost:3000](http://localhost:3000) to see a random verse.

## Project Structure

```
app/
  page.tsx              # Discover page (home)
  saved/page.tsx        # Saved quotes list
  liked/page.tsx        # Liked quotes list
  layout.tsx            # Root layout with sidebar
  ConvexClientProvider.tsx
components/
  app-sidebar.tsx       # Navigation sidebar
  ui/                   # shadcn/ui components
convex/
  schema.ts             # savedQuotes and likedQuotes tables
  quotes.ts             # Convex queries and mutations
```

## API

Verses are fetched from:

```
GET https://bible-api.com/data/web/random
```

Response shape:

```json
{
  "translation": {
    "identifier": "web",
    "name": "World English Bible",
    "language": "English",
    "license": "Public Domain"
  },
  "random_verse": {
    "book_id": "JHN",
    "book": "John",
    "chapter": 3,
    "verse": 16,
    "text": "For God so loved the world..."
  }
}
```

Rate limit: 15 requests per 30 seconds per IP.
