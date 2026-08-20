# IndexNow URL submissions

Use IndexNow manually when a PackThisTrip URL has been added, updated, or deleted. The script does not run during builds and does not submit the sitemap.

## Configure the key locally

Set the key in your shell before running the command.

PowerShell:

```powershell
$env:INDEXNOW_KEY="your-indexnow-key"
```

macOS or Linux:

```bash
export INDEXNOW_KEY="your-indexnow-key"
```

The same key must be publicly available at `https://packthistrip.com/<INDEXNOW_KEY>.txt`. After choosing the key, add a matching text file under `public/` containing only that key and deploy it before submitting URLs.

## Submit one changed URL

```bash
npm run indexnow -- /packing-list/mexico/july
```

## Submit several changed URLs

```bash
npm run indexnow -- /packing-list/mexico/july /packing-list/japan/october
```

Only submit URLs that were newly added, materially updated, or deleted. IndexNow notifies participating search engines about a change, but it does not guarantee crawling or indexing.
