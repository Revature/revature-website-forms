# Revature Forms

This repository contains the source code for Revature website forms. Each form is built as a **web component** (a reusable block of HTML/JavaScript) that runs on the live **Webflow** site.

This document is written for:

- **Business stakeholders** — to understand what gets delivered and how it reaches the website
- **Technical contractors** — to build, test, and publish form updates without guessing from the code alone

---

## Quick summary (non-technical)

| Step | Who | What happens |
|------|-----|----------------|
| 1 | Developer | Changes form code in this repository |
| 2 | Developer | Runs a **build** command for the form that changed |
| 3 | Developer | Hands you a **`.txt` file** from the `forms/` folder |
| 4 | You / Webflow admin | Uploads that file to **Webflow → Assets** |
| 5 | You / Webflow admin | Updates the page (or site) so it loads the new file URL |
| 6 | — | Visitors see the updated form on the live site |

The file you upload is plain JavaScript saved with a `.txt` extension. Webflow hosts it as an asset; the site loads it with a `<script>` tag, same pattern as other script assets already on the site.

---

## Forms in this project

Each form is built and deployed **independently**. Changing one form does not require rebuilding the others (unless you want to refresh all of them).

| Form | Build command | Output file(s) to deploy | HTML tag on the Webflow page |
|------|---------------|--------------------------|------------------------------|
| Sourcing | `npm run build-sourcing` | `forms/sourcing-form.txt` | `<sourcing-form></sourcing-form>` |
| Recruitment | `npm run build-recruitment` | `forms/recruitment-form.txt` | `<recruitment-form></recruitment-form>` |
| B2C (consumer / job application) | `npm run build-b2c` | `forms/b2c-form.txt` | `<b2c-form></b2c-form>` |
| B2B (business lead) | `npm run build-b2b` | `forms/b2b-form.txt` | `<b2b-form></b2b-form>` |
| DSAR (privacy request) | `npm run build-dsar` | `forms/dsar-form.txt` | `<dsar-form></dsar-form>` |

**Deploy the `.txt` file**, not the `.js` file. Both contain the same code; the build creates both, but Webflow assets use the `.txt` copy (this matches the existing site workflow).

---

## Repository layout

```
revature-forms/
├── src/                    # Form source code (Angular components)
│   └── app/
│       ├── sourcing-form/
│       ├── recruitment-form/
│       ├── b2c-form/
│       ├── b2b-form/
│       ├── dsar-form/
│       └── common/         # Shared settings (API URLs, dropdown data, etc.)
├── forms/                  # ★ BUILD OUTPUT — files you upload to Webflow
│   ├── sourcing-form.txt
│   ├── recruitment-form.txt
│   ├── b2c-form.txt
│   ├── b2b-form.txt
│   └── dsar-form.txt
├── native_forms/           # Reference HTML/snippets used in Webflow (not build output)
├── dist/                   # Temporary Angular build folder (do not upload as-is)
├── *-form.js               # Post-build scripts (concatenate dist → forms/)
├── package.json            # Build commands and dependencies
└── README.md               # This file
```

### `forms/` folder (what you care about for go-live)

After a successful build, the **only folder you need for Webflow** is:

**`forms/<form-name>-form.txt`**

Example: after `npm run build-sourcing`, use:

**`forms/sourcing-form.txt`**

### `dist/` folder (developers only)

Angular writes intermediate files to:

**`dist/revature-forms/browser/`**

(mainly `main.js` and `polyfills.js`). A small Node script merges those into one file in `forms/`. **Do not upload `dist/` to Webflow** — always use the finished file in `forms/`.

### `native_forms/` folder

Contains **reference** HTML, CSS, and legacy script snippets already used on Webflow (templates, DSAR styles, ROI calculator, etc.). These are **not** produced by `npm run build-*`. They are kept in the repo for documentation and copy/paste into Webflow embeds. Only update them if your contractor is explicitly changing those page sections.

---

## For technical contractors

### Prerequisites

- **Node.js** 18.x or 20.x (LTS recommended)
- **npm** (included with Node.js)

Check versions:

```bash
node -v
npm -v
```

### First-time setup

From the project root:

```bash
npm install
```

### Local development (optional)

Run the dev server to preview forms in a browser:

```bash
npm start
```

Then open:

| Form | URL |
|------|-----|
| Sourcing | http://localhost:4200/sourcing-form |
| Recruitment | http://localhost:4200/recruitment-form |
| B2C | http://localhost:4200/b2c-form |
| B2B | http://localhost:4200/b2b-form |
| DSAR | http://localhost:4200/dsar-form |

**Note:** `npm start` runs the full app (all forms via routes). Production uses **one bundle per form** (`npm run build-<form>`). Preview the same form you will ship.

API URLs and reCAPTCHA keys come from `src/app/common/form-contants.ts` (file name is spelled `form-contants`, not “constants”). That file is bundled into each build, but **staging vs production is chosen at runtime** when the script runs in the visitor’s browser (based on the site hostname — see [Staging vs production](#staging-vs-production)).

### Production build (step by step)

Build **only the form you changed** (there is no single “build everything” command):

```bash
npm run build-sourcing
npm run build-recruitment
npm run build-b2c
npm run build-b2b
npm run build-dsar
```

Each command does two things:

1. **Angular build** — compiles that form into `dist/revature-forms/browser/`
2. **Post-build script** — runs the matching `*-form.js` in the project root, which:
   - Concatenates `dist/revature-forms/browser/polyfills.js` + `main.js` (component styles are already inside `main.js`)
   - Writes `forms/<name>-form.js`
   - Copies the same content to `forms/<name>-form.txt`

On success you should see: **`Forms created successfully!`**  
(Angular may show budget warnings — the build can still succeed.)

### What to hand off after a build

| Deliverable | Path |
|-------------|------|
| File for Webflow upload | `forms/<form-name>-form.txt` |

Optionally include the matching `.js` file; content is identical.

### Environment / API configuration

Edit **`src/app/common/form-contants.ts`**, then **rebuild and redeploy** any affected form(s).

**Important:** Staging vs production is **not** picked when you run `npm run build-*`. It is decided **when the form runs on the website**, using `window.location.hostname`:

| Condition | Environment used |
|-----------|------------------|
| Hostname contains `webflow.io`, `localhost`, or `staging` | Staging webhooks / keys |
| Any other hostname (e.g. `revature.com`) | Production webhooks / keys |

So the same `forms/sourcing-form.txt` can behave differently on a `*.webflow.io` preview URL vs the live domain — no separate “staging build” file is required.

If API URLs or keys change, edit `form-contants.ts`, rebuild the affected form(s), and redeploy the new `.txt` asset.

---

## Deploying to Webflow (site workflow)

This matches how Revature already hosts form scripts: upload as a **text asset**, then reference it with a **script URL** on the page.

### Step 1 — Build the form

```bash
npm run build-sourcing
```

(Use the correct command from the table above.)

### Step 2 — Upload to Webflow Assets

1. Log in to **Webflow** for the Revature site.
2. Open **Assets** (site-wide file library).
3. Upload **`forms/<form-name>-form.txt`** from this repository.
4. After upload, open the asset and **copy its public URL**  
   (usually `https://cdn.prod.website-files.com/.../<filename>.txt`; older assets may use `https://uploads-ssl.webflow.com/...` — either is fine as long as the page `src` matches the file you uploaded).

**Replace** the previous version of the same form asset when publishing an update (same filename if possible), or upload a new file and update the script URL on the page (Step 3).

### Step 3 — Point the page at the new script

On each Webflow page that uses the form, ensure there is a **before `</body>`** (or site-wide) custom code block similar to:

```html
<script
  src="https://cdn.prod.website-files.com/YOUR-SITE-ID/YOUR-UPLOADED-FILE.txt"
  type="text/javascript">
</script>
```

Replace the `src` URL with the URL from Step 2.

**Important:** Load this script **before** the custom element tag (Step 4). If the page also loads shared legacy scripts (for example `Form Constants.txt` or `EnvironmentVariables.txt` on older B2C pages), keep their existing order unless your developer says otherwise.

### Step 4 — Place the form on the page

In the Webflow designer (or embed block), add the custom element where the form should appear:

```html
<sourcing-form></sourcing-form>
```

Use the tag from the [Forms table](#forms-in-this-project) (`recruitment-form`, `b2c-form`, etc.).

**Page attributes (B2C and B2B only):** Sourcing, recruitment, and DSAR use a plain tag with no options. B2C and B2B support extra attributes on the tag (set in Webflow embed HTML), for example:

```html
<b2c-form showgraduationfields="true" downloadmessage="Submit"></b2c-form>
<b2b-form showyourmessage="true" downloadmessage="Let's Talk"></b2b-form>
```

Full list: `src/app/b2c-form/b2c-form.component.ts` and `src/app/b2b-form/b2b-form.component.ts` (`@Input` names are lowercase in HTML).

### Step 5 — Publish

1. **Publish** the site in Webflow (staging domain first if you use `*.webflow.io` for QA).
2. Open the page in the browser, hard-refresh (Ctrl+F5 / Cmd+Shift+R).
3. Submit a **test** entry and confirm it reaches the expected backend (Workato / resume API, etc.).

### Staging vs production

| Environment | Typical hostname | Notes |
|-------------|------------------|--------|
| Staging | `*.webflow.io`, `localhost`, or hostname containing `staging` | Staging Workato webhook and reCAPTCHA keys (see `form-contants.ts`) |
| Production | `revature.com` and other hosts that do not match the rules above | Production webhooks and reCAPTCHA |

Test on staging before publishing production.

---

## Legacy / shared Webflow assets (`native_forms/`)

Some pages still use **separate** `.txt` assets that are **not** generated by `npm run build-*`, for example:

| File in repo | Typical use on site |
|--------------|---------------------|
| `native_forms/Form Constants.txt` | Dropdown data (majors, schools, etc.) for legacy job form pages |
| `native_forms/EnvironmentVariables.txt` | API endpoints for legacy inline scripts |
| `native_forms/DSARForm`, `dsar_style.txt`, `DSARScript.txt`, `dsar_jquery_autotab.txt` | DSAR page layout and scripts (legacy; separate from `npm run build-dsar` output) |
| `native_forms/JobFormTemplate.html`, `JobFormScript.txt`, `B2BFormTemplate.html`, `B2BFromScript.txt` | Legacy job / B2B markup and scripts |
| Other files in `native_forms/` (e.g. `FederalElement.html`, `ROICalculator.html`) | Page embed references — not Angular build output |

Example of how legacy pages load shared scripts (from `native_forms/JobFormTemplate.html`):

```html
<script src="https://uploads-ssl.webflow.com/.../Form%20Constants.txt" type="text/javascript"></script>
<script src="https://cdn.prod.website-files.com/.../EnvironmentVariables.txt" type="text/javascript"></script>
```

Angular-built forms (sourcing, recruitment, b2c, b2b, dsar) bundle most configuration **inside** `forms/*-form.txt`. Only update `native_forms/` assets when those specific legacy pages change.

---

## End-to-end workflow diagram

```
  Developer                          Webflow                         Visitor
  ---------                          -------                         -------
  Edit src/app/...
       |
  npm run build-<form>
       |
  forms/<form>-form.txt  --------->  Upload to Assets
       |                                  |
       |                             Copy asset URL
       |                                  |
       |                             <script src="...txt">
       |                             <<form-tag>>
       |                                  |
       |                             Publish site  ------------->  Form runs in browser
```

---

## Troubleshooting

| Problem | What to check |
|---------|----------------|
| Build fails | Run `npm install`, use Node 18+, read the error in the terminal |
| `Forms created successfully!` but no file | Look in `forms/`; confirm the matching `*-form.js` post-build script ran |
| Form blank on site | Script URL wrong, script not published, or custom element tag missing / misspelled |
| Form old version after deploy | Browser cache — hard refresh; confirm Webflow publish completed and `src` points to new asset |
| Submissions wrong environment | Test on the correct hostname (`*.webflow.io` = staging behavior); rebuild only if you changed `form-contants.ts` |
| reCAPTCHA errors | Keys in `form-contants.ts` must match the domain (staging vs production) |

---

## Other files (reference)

| File | Purpose |
|------|---------|
| `vimeoPlayer.html` | Standalone Vimeo embed example; not part of form build/deploy |
| `stringParser.js` | Utility script; not part of standard form deploy |
| `angular.json` | Angular CLI build configurations per form |

---

## Support checklist for handoffs

When delivering an update to the client, include:

1. **Which form(s)** changed (name from the table above)
2. **The built file(s)** from `forms/*.txt`
3. **Whether** `src/app/common/form-contants.ts` changed (requires rebuild of affected forms)
4. **Staging test URL** and confirmation that test submissions worked
5. **Reminder** to replace the Webflow asset and publish

---

## Further technical reference

- [Angular CLI documentation](https://angular.dev/tools/cli)
- Angular Elements (web components): each form module calls `customElements.define()` in `src/app/*-form.module.ts`
