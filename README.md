# Vote Yes for Easthampton

Informational campaign website supporting the Prop 2.5 override vote on **June 9, 2026** in Easthampton, MA.

Live site: **https://yesforeasthampton.org/**

---

## What's in this repo

```
index.html      — the entire site (single page)
style.css       — all styles
main.js         — sticky nav, FAQ accordion, mobile menu, copy-link button
netlify.toml    — Netlify deployment config (no build step)
assets/         — place og-image.png here for social sharing previews
```

No framework, no build step, no dependencies. Every page section is a clearly commented block in `index.html`. To update content, open that file and search for the section you want — or search for `<!-- UPDATE:` to find remaining placeholders.

---

## Making changes

### Small edits (text, numbers, links)

1. Edit `index.html` (or `style.css`) directly on GitHub, or clone the repo and edit locally
2. Open a pull request against `main`
3. Netlify will automatically generate a **deploy preview URL** for your PR — you'll see it posted as a comment by the Netlify bot. Click it to review your changes live before merging

### Working locally

```bash
# Clone the repo
git clone git@github.com:pmaclellan/easthampton-override.git
cd easthampton-override

# Open the site in your browser — no server needed
open index.html
```

Because the site is plain HTML with no build step, you can open `index.html` directly in any browser. Changes you save are visible immediately on refresh.

For a closer match to the Netlify environment (proper base URL, correct headers), you can run a local server:

```bash
# Python (comes pre-installed on macOS)
python3 -m http.server 8080
# then open http://localhost:8080
```

### Submitting a change

1. Create a branch: `git checkout -b your-branch-name`
2. Make your edits
3. Commit: `git add index.html && git commit -m "describe what you changed"`
4. Push: `git push -u origin your-branch-name`
5. Open a pull request on GitHub — Netlify will post a preview link automatically

---

## Netlify deploy

The site deploys automatically when changes are merged to `main`.

- **Publish directory:** `.` (repo root)
- **Build command:** *(none)*
- Every pull request gets a temporary preview URL from Netlify before it's merged

To connect a new Netlify site to this repo: go to [netlify.com](https://netlify.com), click **Add new site → Import an existing project**, select this repo, set publish directory to `.`, and leave the build command blank.

---

## Content guide

| What to change | Where to find it |
|---|---|
| Election dates / polling location | `#dates` section in `index.html` |
| Ballot YES/NO outcomes | `#ballot` section |
| Department-by-department cuts | `#cuts` section |
| Tax impact table | `#tax` section |
| Why Override explainer | `#why` section |
| FAQ answers | `#faq` section |
| Lawn sign / volunteer contact info | `#involved` section |
| Social media links | `#involved` section (replace `href="#"`) |
| Contact email | `#involved` and `#footer` sections |
| Color scheme | `style.css` — `:root` custom properties at top of file |

---

*Paid for by Vote Yes for Easthampton. Unofficial campaign website.*
