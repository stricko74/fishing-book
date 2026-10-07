# Fishing Book landing site

Static files, no build step, hosted free on GitHub Pages at
**https://stricko74.github.io/fishing-book/** (a separate PUBLIC repo, `stricko74/fishing-book`,
so the app's own repo and docs stay private).

## Two repos, two folders — know which one you are in

| Folder | Repo | Visibility | What it is |
|---|---|---|---|
| `C:\Users\stric\fish-logbook` | `stricko74/fish-logbook` | **private** | the Expo app, all docs, and `site/` — the SOURCE |
| `C:\Users\stric\fishing-book` | `stricko74/fishing-book` | **public** | a robocopy of `site/`, nothing else — the PUBLISHED copy |

Two repos because GitHub Pages serves only from a public repo on the free plan, and the app repo
must stay private. The names differ because `fish-logbook` is the original project slug (still the
app's slug, scheme and database name) while the app was later renamed *Fishing Book*, which is what
the public URL had to read.

**Never edit anything in `C:\Users\stric\fishing-book`.** It is a copy. Edit `site/` in this repo,
then robocopy — a direct edit there is silently overwritten on the next copy, and is not in the
private repo's history either. The only commands that belong in that folder are the
`git add` / `commit` / `push` after a robocopy.

| File | What it is |
|---|---|
| `index.html` | The landing page. |
| `privacy.html` | Forwards to the published Google Doc policy (the one copy — source text in `docs/PRIVACY_POLICY.txt`). |
| `config.js` | **The only file to edit on launch day** — Apple ID, live flag, provider token. |
| `go/<slug>/` | One forwarding link per promotion channel (see `docs/CHANNEL_LINKS.md`). |
| `qr/<slug>.png` | QR codes of those links (`card.png` for the tackle-shop counter card). |
| `og.png` | The picture Facebook / Messages show when a link is posted. |
| `screens/1–6.jpg` | The screenshot strip. |
| `badge.svg` | Apple's official badge — you add this (step 2). |
| `channels.json` | The channel list `scripts/make_channel_links.py` builds `go/` and `qr/` from. |

## 1. Put it online (once, ~10 minutes)

**Done 20 Sep 2026** — live at the address above. Steps kept for reference.

1. github.com → **New repository** → name `fishing-book`, **Public**, no README → Create.
2. In PowerShell:

```
robocopy C:\Users\stric\fish-logbook\site C:\Users\stric\fishing-book /E
cd C:\Users\stric\fishing-book
git init -b main
git add -A
git commit -m "Landing page"
git remote add origin https://github.com/stricko74/fishing-book.git
git push -u origin main
```

3. The repo on github.com → **Settings → Pages** → Source **Deploy from a branch** → Branch
   **main** / **(root)** → Save. A minute later the page is at the address above.
4. App Store Connect → Fishing Book → the version page's **Support URL** and **Marketing URL**:
   `https://stricko74.github.io/fishing-book/`. (The Privacy Policy URL is the published Google Doc:
   https://docs.google.com/document/d/e/2PACX-1vTtFQir34pVQ4NUEc1ZtVXbTZe6N0DA0IsiBX_ZASrpDp0cOUeYycDwFbYxtIt83tv-iTi_0PPH5Igk/pub)

To update the site later: edit in `fish-logbook\site`, then run the `robocopy` line and the
`git add` / `commit` / `push` lines again from `C:\Users\stric\fishing-book`.

## 2. Apple's badge

developer.apple.com/app-store/marketing/guidelines → **App Store badges** → download the
badge set, take the black **US-UK** "Download on the App Store" SVG, rename it `badge.svg`,
put it in `site\`. Apple requires its own artwork, unaltered — don't redraw it. (Apple's
Marketing Tools site only makes a badge + QR for an app that is already live; the QR codes
here point at our own `go/` links instead, so they work now and never need reprinting.)

## 3. Launch day (the app is approved and released)

`config.js`: set `appStoreId` to the Apple ID and `live: true` → robocopy + push.
The page button, the landing-page QR and every `go/` link then go to the App Store.
(Same day, in the app: `lib/store.ts` → `APP_STORE_ID`, `STORE_LIVE = true` → `eas update`.)

## 4. A day or two after launch (the provider token)

App Store Connect → Fishing Book → **Analytics → Acquisition → Campaigns** → **+** — the
button appears once the live app has a few downloads. Create one campaign per name in
`docs/CHANNEL_LINKS.md` (fb-groups, fishwrecked, …). Every generated link contains
`pt=<digits>`: that number goes into `config.js` → `providerToken`, and into `lib/store.ts` →
`PROVIDER_TOKEN` (then `eas update`). From then on every `go/` link — including the ones
already posted and printed — reports under its own campaign.
