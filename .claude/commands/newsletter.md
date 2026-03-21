---
description: Full newsletter pipeline — scan magazines, pick a topic, research it, write an opinion piece, publish to the website, and generate a LinkedIn PDF
allowed-tools: Read, Glob, WebSearch, WebFetch, Write, Edit, Bash, Agent
---

# Newsletter Pipeline — The World Unravelled

You are running the end-to-end newsletter production workflow for **The World Unravelled**. Follow each stage in order and pause for user confirmation where instructed. Never proceed past a confirmation gate without explicit user approval.

---

## STAGE 1 — Scan the magazines

1. Use Glob to list every file inside `Magazine_collaterals/` (relative to the project root).
2. Read each file. If a file is a PDF or image, use the Read tool to extract text / view it.
3. From the content, identify **exactly 10 strong story angles** — real topics, not generic themes. Read as deeply as needed across all magazines to surface 10 distinct angles; do not stop at fewer. For each, write a one-sentence pitch that names the core tension or question (e.g. *"Central banks are quietly buying gold at record pace — are they preparing for dollar collapse?"*).
4. Present the list to the user in a numbered format and ask:

> **Which topic should this week's newsletter cover? Reply with the number.**

⛔ STOP HERE. Wait for the user to pick a topic before continuing.

---

## STAGE 2 — Confirm the brief

Restate the chosen topic as a one-paragraph editorial brief covering:
- The central question or controversy
- Why it matters right now
- The two sides of the argument (establishment / mainstream view vs. sceptical / conservative view)

Then ask the user:

> **Does this brief look right? Any changes before I start researching? (yes to continue / tell me what to change)**

⛔ STOP HERE. Wait for explicit confirmation.

---

## STAGE 3 — Research

Using **WebSearch** and **WebFetch**, gather material from at least 6 distinct sources:

- 2–3 mainstream / left-leaning outlets (BBC, Guardian, Reuters, NYT, etc.)
- 2–3 conservative / right-leaning outlets (Telegraph, Daily Mail, Spectator, WSJ Opinion, Breitbart, etc.)
- 1–2 YouTube video transcripts or summaries (search YouTube for the topic; fetch the page and extract the description / comment highlights)

For each source, note:
- Publication name + URL
- The key claim or argument made
- Any data, quotes, or statistics

Compile a **Research Summary** and show it to the user before writing.

---

## STAGE 4 — Write the opinion piece

Write a long-form newsletter article (~800–1,000 words) using this structure:

### Article format

**Headline** — punchy, slightly provocative, ~10 words
**Subheading** — one sentence expanding the headline
**Opening hook** (1–2 paragraphs) — a striking fact, quote, or scenario that draws the reader in
**The mainstream view** (2–3 paragraphs) — fairly represent the establishment/left-of-centre perspective, using the sources gathered
**The other side** (3–4 paragraphs) — present the conservative/sceptical view with equal rigour but give this section slightly more weight and the final word; let the logic land here
**What it means for you** (1–2 paragraphs) — practical implications for the reader; lean into personal responsibility, self-reliance, free-market thinking
**Closing thought** — a memorable, opinion-forward final line

### Tone guidelines
- Voice: authoritative but accessible; think Spectator or WSJ Opinion, not academic
- Lean conservative/right-of-centre in framing without being partisan or inflammatory
- Both sides must be presented honestly — no straw-manning the other side
- No jargon; short sentences; active voice
- Do NOT use the word "delve"

Present the full draft and ask:

> **Here is the draft. Approve it as-is, or give me edits and I'll revise.**

⛔ STOP HERE. Wait for approval or revision instructions.

---

## STAGE 5 — Hero image

Before publishing, source a hero image for the article:

1. Search Unsplash for a relevant, high-quality photo using a URL like:
   `https://source.unsplash.com/1200x630/?[keyword1],[keyword2]`
   Pick 2–3 keyword options that match the article topic. Present the candidate image URLs to the user and let them pick one (or approve the default).
2. The chosen image URL will be used as the hero in the article HTML. No download needed — reference it directly via URL or use `https://images.unsplash.com/` direct links.
3. Also generate a Canva-style visual using the Canva MCP tools if available, as an alternative option.

⛔ STOP HERE only if you need user input on image choice. Otherwise proceed with the best matching image.

---

## STAGE 6 — Publish to the website

Once the article is approved:

1. Read `index.html` to understand the current newsletter/article structure.
2. Create a new HTML file for the article (e.g. `articles/YYYY-MM-DD-slug.html`) that:
   - Inherits the site's brand (colours, fonts, logo from `brand_assets/`)
   - Uses the same base template/nav as `index.html`
   - Renders the article with correct heading hierarchy, pull-quotes for key lines, and a readable body width (~680px)
   - Includes article metadata: publication date and estimated read time (no word count)
   - Includes the hero image at the top of the article with a gradient overlay
3. Link the new article from `index.html` (add it as the latest issue in whatever "recent issues" or featured section exists, or create one if absent).
4. Commit everything:
   ```
   git add articles/ index.html
   git commit -m "Publish newsletter: [headline]"
   git push
   ```
5. Report the live URL of the article (based on CNAME / custom domain in the repo).

---

## STAGE 7 — LinkedIn one-pager PDF + caption

### The PDF

Create a **single A4 page** (`linkedin/YYYY-MM-DD-slug.html` → `linkedin/YYYY-MM-DD-slug.pdf`) that combines the cover and highlights in one layout. Do NOT produce multiple pages.

**Single-page layout (top to bottom):**
1. Gradient colour bar across the top (lavender → blush → sage → sky, 7px)
2. Eyebrow line: category · date (Inter 11px, all-caps, with short rule)
3. Headline (Cormorant Garamond ~72px, bold, tight leading) + italic subheading (~20px)
4. Stat strip — exactly 3 key numbers (Cormorant ~46px) with short labels (Inter 12px), separated by dividers
5. Section label ("Four things worth knowing", Inter 10px small-caps)
6. **4 insight cards in a 2×2 grid** — each card has: number (14px), bold title (22px serif), single short paragraph (Inter 13px). Cards use the brand pastels as background fills (lavender, blush, sage, sky)
7. Bottom padding — no URL bar, no article link

**Readability rules — non-negotiable:**
- Minimum body font size: 13px Inter — never smaller
- Maximum 4 insight cards — never 7; less is more
- Each card body: 2–3 sentences max, no more
- Generous padding inside cards (22px+)
- Lots of white space — do not try to fit everything

**Brand rules:**
- Palette: cream `#F5F4ED`, ink `#1C1C1A`, muted `#5D5D5A`, lavender `#CBCEEA`, blush `#F8E5E5`, sage `#DEF1D0`, sky `#CDEBF1`
- Fonts: Cormorant Garamond (headlines/display numbers), Inter (body/labels/eyebrow)
- No logo, no "The World Unravelled" wordmark — content-first
- Radial gradient blobs at all 4 corners, grain texture overlay (opacity ~0.025), doodle SVG circles top-right
- Portrait A4 (794 × 1123 px)

**Generate the PDF (always use deviceScaleFactor: 2 for HD output):**
```bash
node -e "
const puppeteer = require('C:/Users/sgarg/AppData/Local/Temp/puppeteer-install/node_modules/puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto('file:///PATH_TO_HTML', { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'PATH_TO_PDF', format: 'A4', printBackground: true, pageRanges: '1', margin: { top:'0', right:'0', bottom:'0', left:'0' } });
  await page.screenshot({ path: 'PATH_TO_PREVIEW_PNG', clip: { x:0, y:40, width:794, height:1123 } });
  await browser.close();
})();
"
```

Read the preview PNG with the Read tool and visually verify the layout looks clean and readable before confirming to the user.

### The LinkedIn caption

Output a ready-to-paste LinkedIn post **in the chat** (not in the PDF). The caption must:
- NOT repeat the bullet points or stats that are already in the PDF
- Open with a strong personal/opinion hook (1–2 short lines)
- Tell a brief narrative or raise the key question the article answers
- End with "Attached is a one-pager with the key data." + link to the live article
- Include 5–7 relevant hashtags on the final line

---

## Final summary

When all stages are complete, output:
- Topic covered
- Live article URL
- LinkedIn PDF file path
- The LinkedIn caption (ready to copy-paste)
