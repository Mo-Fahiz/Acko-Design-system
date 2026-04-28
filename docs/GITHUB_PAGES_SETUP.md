# GitHub Pages — fix 404 and verify the playground

Your production build is **valid** locally (`apps/playground/dist` contains `index.html` and hashed assets with base path `/Acko-Design-system/`). A **404** at the GitHub.io URL means GitHub is **not serving a deployment** yet, or the URL is wrong — not a bug in the Vite app itself.

**Expected project URL (user pages):**  
`https://mo-fahiz.github.io/Acko-Design-system/`

(Owner segment is **lowercased** in the real URL; the repository name segment is **case-sensitive** and must match the repo: `Acko-Design-system`.)

---

## 1. Turn on “GitHub Actions” as the Pages source (required)

The workflow only publishes after this is set once in the **GitHub** UI (the YAML file does not do this for you).

1. Open **https://github.com/Mo-Fahiz/Acko-Design-system/settings/pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Save if prompted.

If Source stayed on an empty branch or **/docs** without a successful build, the site will 404.

---

## 2. Confirm the workflow run succeeded

1. Open **https://github.com/Mo-Fahiz/Acko-Design-system/actions**
2. Open the **Deploy to GitHub Pages** workflow.
3. You need at least one run on a branch that contains `.github/workflows/deploy.yml` (e.g. `Version-4.2` or `main`) with a **green** checkmark.
4. If it failed, open the failed job, expand **Build all packages** and **Build playground**, and fix the first error (Node/pnpm, TypeScript, etc.).

**Manual run (if there is no run yet):**  
**Actions** → **Deploy to GitHub Pages** → **Run workflow** → pick branch `Version-4.2` (or `main` once that branch has the workflow) → **Run workflow**.

---

## 3. First-time “github-pages” environment (rare)

If the deploy job is **waiting** or “pending”:

- **Settings** → **Environments** → **github-pages**  
- If there are **required reviewers** or **deployment rules**, add yourself or allow deployments from Actions.

On public repos, this is usually open by default.

---

## 4. Private repository

**GitHub Pages** for a **private** repository requires a **paid** GitHub plan (or Enterprise) in many cases. A **public** repo under a personal account can use Pages for free. If the repo is private and you are on a free plan, the site may not publish — treat that as a policy limit, not an app bug.

---

## 5. After a good deploy, get the real URL

- **Settings** → **Pages** — the banner often shows **“Your site is live at …”**  
- Or the **Actions** run → **deploy** job summary → `page_url` / environment link.

Use **that** exact URL. If it still 404, compare path segments to the repo name (`Acko-Design-system`) and your `base` in `apps/playground/vite.config.ts` (must match: `/Acko-Design-system/`).

---

## 6. View the site in Cursor (Simple Browser or Browser panel)

**Option A — Simple Browser**

1. `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Run **“Simple Browser: Show”** (or search **Simple Browser**)
3. Paste: `https://mo-fahiz.github.io/Acko-Design-system/`
4. Enter

**Option B — Local playground (for UI dev, not the published URL)**

- In the repo: `pnpm dev` (starts the Vite app; often `http://localhost:5173`)
- Then Simple Browser to that `localhost` URL (no `GITHUB_ACTIONS` base path — local dev uses `/`)

**Option C — Local preview of the *same* build as CI**

```bash
cd apps/playground
CI=true GITHUB_ACTIONS=true pnpm build
CI=true GITHUB_ACTIONS=true pnpm preview
```

Open the printed `localhost` URL in Simple Browser. This matches the **base** used on GitHub Pages.

---

## 7. Quick local verification (same as CI)

```bash
# From repo root
CI=true pnpm install --frozen-lockfile
CI=true pnpm build
CI=true GITHUB_ACTIONS=true pnpm --filter=playground build
ls -la apps/playground/dist
```

`dist/index.html` should reference script/link paths under `/Acko-Design-system/`.

---

## Checklist

| Step | Done? |
|------|--------|
| Pages → Source = **GitHub Actions** | ☐ |
| At least one **green** “Deploy to GitHub Pages” run | ☐ |
| Using URL from **Settings → Pages** (or run output) | ☐ |
| Repo name = **Acko-Design-system** matches Vite `base` | ☐ |
| (If private) Plan allows private Pages | ☐ |

If all are checked and it still 404, open a support discussion with a screenshot of **Settings → Pages** and the latest **Actions** run (build + deploy jobs).
