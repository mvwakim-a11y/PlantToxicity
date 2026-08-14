# Pet-Safe Plant Catalog — Field Reference

A searchable, filterable field reference for pet toxicity in floral work — 124 specimens,
each sourced from ASPCA's plant-specific toxicity pages and verified individually.

**This is a single file.** Everything — the page, the styling, the search/filter logic,
and all 124 plants — lives inside `index.html`. There's nothing else to upload, no folder
structure to get wrong, and no separate file that can go missing or 404.

**Live demo (once deployed):** `https://<your-username>.github.io/<repo-name>/`

## Fixing the repo you already have

You hit a 404 earlier because the CSS and JS files didn't make it into the repo at the
right path. Easiest fix now that everything is one file:

1. Open your repo on github.com
2. Delete the old `index.html`, `css/`, `js/`, and `data.json` (select each, click the
   trash icon, commit)
3. Click **Add file → Upload files**
4. Drag in *only* this one `index.html` — don't create any folders
5. Commit directly to `main`
6. Wait ~60 seconds, hard-refresh your Pages URL (Cmd/Ctrl+Shift+R)

That's it. One file in, page works.

## Running it locally

Double-click `index.html` — it opens directly in any browser, no local server needed.
(This is different from before: because the data is embedded in the file instead of
fetched separately, there's no `file://` restriction to work around.)

## Putting it on GitHub Pages from scratch

If you're starting a fresh repo instead of fixing the old one:

### 1. Create the repository

- Go to [github.com/new](https://github.com/new)
- Name it something like `plant-safety-catalog`
- Keep it **Public** (required for free GitHub Pages)
- Don't initialize with a README — leave it empty
- Click **Create repository**

### 2. Upload the one file

On the empty repo's page, click **uploading an existing file**, drag in `index.html`,
and commit.

### 3. Turn on GitHub Pages

- **Settings → Pages**
- Source: `Deploy from a branch`
- Branch: `main`, folder: `/ (root)`
- **Save**, wait ~60 seconds, refresh

Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Updating the catalog

Plant data lives inside `index.html` itself, near the top of the big `<script>` block at
the bottom of the file, as a variable called `PLANT_DATA` — a plain JSON array. Open the
file in any text editor (or GitHub's own web editor — click the pencil icon on the file),
find `PLANT_DATA`, and edit the array. Each plant looks like:

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

Save, re-upload the one file to GitHub (or edit it directly in GitHub's web editor and
commit), and the live site updates.

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

