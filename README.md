# PackThisTrip

PackThisTrip is a Next.js App Router MVP for a smart travel packing list generator.

## What is included

- Next.js App Router + TypeScript + Tailwind CSS
- Homepage, generator page, about/privacy/terms/contact pages
- Data-driven packing engine
- Smart clothing quantity logic
- Destination/activity/traveler/luggage rules
- LocalStorage persistence
- Print-friendly checklist
- No database, no auth, no paid APIs, no affiliate links yet

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Set `NEXT_PUBLIC_MICROSOFT_CLARITY_ID` when you want Microsoft Clarity tracking enabled.

## Checks

```bash
npm run typecheck
npm run build
```

## Install note

This project intentionally does not include `package-lock.json` so npm will generate a clean lockfile from the public npm registry on your machine.

If install issues occur, run:

```bash
npm config set registry https://registry.npmjs.org/
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```
