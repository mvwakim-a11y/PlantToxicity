# Pet-Safe Plant Catalog — Field Reference

A searchable, filterable field reference for pet toxicity in floral work — 124 specimens,
each sourced from ASPCA's plant-specific toxicity pages and verified individually.

**Live demo (once deployed):** `https://mvwakim-a11y.github.io/PlantToxicity/`

## What's here

```
index.html      the whole app shell
css/styles.css  design system
js/app.js       search, filter, and render logic
data.json       the plant data — edit this to add/update plants
README.md       this file
```

No build step, no dependencies to install. It's a static site — open `index.html` in a
browser (via a local server, see below) or host it anywhere that serves static files.

## Running it locally

Browsers block `fetch()` on `file://` URLs, so double-clicking `index.html` won't load the
data. Run a tiny local server instead, from inside this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

(No Python? Any static server works — `npx serve`, VS Code's "Live Server" extension, etc.)

## Putting it on GitHub Pages

This gets you a real URL you can bookmark, share, and pull up on your phone at a venue.

### 1. Create the repository

- Go to [github.com/new](https://github.com/new)
- Name it something like `plant-safety-catalog`
- Keep it **Public** (required for free GitHub Pages) or use a Pro plan for private Pages
- Don't initialize with a README (this folder already has one) — leave it empty
- Click **Create repository**

### 2. Push this folder to it

From inside this folder, in a terminal:

```bash
git init
git add .
git commit -m "Initial plant catalog"
git branch -M main
git remote add origin https://mvwakim-a11y.github.io/PlantToxicity/
git push -u origin main
```

(Replace `<your-username>` and `<repo-name>` with your actual GitHub username and the
repo name you chose. GitHub will show you this exact command on the empty repo's page too.)

If you don't have git set up locally, GitHub also lets you drag-and-drop these files
directly into the repo through the web UI ("uploading an existing file") — no terminal
needed.

### 3. Turn on GitHub Pages

- In the repo, go to **Settings → Pages**
- Under "Build and deployment," set **Source** to `Deploy from a branch`
- Set **Branch** to `main` and folder to `/ (root)`
- Click **Save**
- Wait ~1 minute, then refresh — GitHub will show your live URL at the top of that page

Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Updating the catalog

Everything the page displays comes from `data.json` — one object per plant. To add a
plant or fix an entry, edit that file directly (it's plain JSON, readable in any text
editor or GitHub's own web editor) and push the change. No other file needs to change.

Each plant object looks like:

```json
{
  "name": "Common Name",
  "sci": "Scientific name",
  "fam": "Family",
  "tj": "Trader Joe's label, or empty string if not typically sold there",
  "cat": "Non-toxic | Toxic | Toxic (mild) | FATAL | Unknown — ...",
  "dog": "same format as cat",
  "horse": "same format as cat",
  "principle": "toxic principle and symptoms, in plain language",
  "climate": "native climate/region",
  "zone": "hardiness zone",
  "season": "bloom or availability window",
  "light": "light needs",
  "water": "water needs",
  "dried": "Yes | No | Yes (note)",
  "wholesale": "estimated wholesale cost",
  "retail": "estimated retail cost",
  "tags": ["SAFE" | "TOXIC-CAT" | "TOXIC-DOG" | "FUCK NO" | "MILD" | "SEASONAL" | "DRY-FRIENDLY" | "UNVERIFIED"]
}
```

**On the `cat` / `dog` / `horse` fields:** the app reads the *first word* of each string
to decide how to badge it — `FATAL`, `Non-toxic`, `Toxic`, or anything else (treated as
`Unknown`/unverified). Keep that leading word consistent and put all the nuance
(dosage, severity, sourcing caveats) after it.

**On `UNVERIFIED`:** this tag means no confident source was found either way — the
site is deliberately strict about this rather than guessing. If you verify one later,
update the `cat`/`dog`/`horse` text and drop the `UNVERIFIED` tag.

## A note on the data

Toxicity data is compiled from ASPCA Animal Poison Control Center pages, each fetched
and verified individually rather than assumed from category or family resemblance.
It is not a substitute for veterinary guidance. For a suspected ingestion, call ASPCA
Poison Control at (888) 426-4435 or the Pet Poison Helpline at (855) 764-7661.
