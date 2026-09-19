---
name: coss.work
description: engineering jobs at companies that build in the open
colors:
    ink: 'light-dark(#222222, #e8e8e8)'
    ink-muted: 'light-dark(#6b6b6b, #8e8e93)'
    page-grey: 'light-dark(#f6f6f6, #1f2023)'
    sheet: 'light-dark(#ffffff, #25262a)'
    hairline: 'light-dark(#ededed, #2e2f33)'
    field-grey: 'light-dark(#ececec, #2b2c30)'
    badge-grey: 'light-dark(#ececec, #34353a)'
    carbon: 'light-dark(#2b2b2b, #111111)'
    carbon-text: '#ffffff'
    marker-yellow: 'light-dark(#fdf0c4, #34353a)'
    signal-green: '#22c55e'
typography:
    display:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: 'clamp(1.75rem, 7vw, 2.25rem)'
        fontWeight: 600
        lineHeight: 1.1
        letterSpacing: '-0.02em'
    headline:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: '1.375rem'
        fontWeight: 600
        lineHeight: 1.1
        letterSpacing: '-0.02em'
    title:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: '1.125rem'
        fontWeight: 600
        letterSpacing: '-0.01em'
    title-sm:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: '0.875rem'
        fontWeight: 600
        letterSpacing: '-0.01em'
    lede:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: '0.875rem'
        fontWeight: 400
    body:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: '0.75rem'
        fontWeight: 400
        lineHeight: 1.5
    table-head:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: '0.75rem'
        fontWeight: 700
    label:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: '0.625rem'
        fontWeight: 500
        letterSpacing: '0.02em'
    micro:
        fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize: '0.625rem'
        fontWeight: 400
        lineHeight: 1.4
rounded:
    none: '0'
spacing:
    xs: '4px'
    sm: '8px'
    md: '12px'
    lg: '32px'
    xl: '40px'
    section: '64px'
    page-top: '96px'
    column: '760px'
components:
    button-solid:
        backgroundColor: '{colors.carbon}'
        textColor: '{colors.carbon-text}'
        rounded: '{rounded.none}'
        padding: '0 14px'
        height: '34px'
    button-outline:
        backgroundColor: '{colors.sheet}'
        textColor: '{colors.ink}'
        rounded: '{rounded.none}'
        padding: '0 14px'
        height: '38px'
    input-field:
        backgroundColor: '{colors.field-grey}'
        textColor: '{colors.ink}'
        typography: '{typography.body}'
        rounded: '{rounded.none}'
        height: '34px'
    badge:
        backgroundColor: '{colors.badge-grey}'
        textColor: '{colors.ink-muted}'
        typography: '{typography.micro}'
        rounded: '{rounded.none}'
        padding: '0 4px'
    table-card:
        backgroundColor: '{colors.sheet}'
        textColor: '{colors.ink}'
        rounded: '{rounded.none}'
        padding: '0 12px'
        width: '760px'
    table-row:
        typography: '{typography.body}'
        padding: '0 8px'
        height: '34px'
    field-label:
        textColor: '{colors.ink-muted}'
        typography: '{typography.label}'
---

# Design System: coss.work

## Overview

**Creative North Star: "The Terminal Index"**

coss.work reads like `ls -la` for open-source jobs. One mono typeface, one narrow column, one white sheet of rows on grey paper. Every company is a line; every fact sits in a cell. The page trusts the engineer to scan, so it removes everything that is not data: no logos, no cards, no hero art.

Density is high but calm. Body text is 12px, rows are 34px tall, and contrast steps down through three greys instead of rising through colour. The only loud element on a page is the dark `find jobs` button. Colour appears in two tiny doses: yellow text selection (and the parked marker phrase), and a 5px green status square.

It is mono without the costume. The system borrows the terminal's honesty (plain text, lowercase, fixed width), not its props. It must never look like a generic SaaS job board (rounded cards, logo grids, gradient heroes, pill "Apply now" buttons), like hacker cosplay (green-on-black, scanlines, fake prompts), or like recruiter spam (urgency badges, "hot job", countdowns, ads dressed as listings).

**Key Characteristics:**

- Geist Mono for everything, 12px (0.75rem) base. Sizes are in rem, so user font settings apply.
- Square corners everywhere, enforced globally.
- Flat surfaces; depth from grey steps, not shadows.
- One 760px centred column.
- Lowercase voice in headings, buttons, and labels (company and tech names keep their own case).
- Light and dark themes from one token set via `light-dark()`.

## Colors

A near-monochrome grey ramp with one ink, one carbon action colour, and two small accents.

### Primary

- **Carbon** (`light-dark(#2b2b2b, #111111)`): the solid button fill. The one heavy mass on the page. Text on it is **Carbon Text** (`#ffffff`).

### Tertiary

- **Marker Yellow** (`light-dark(#fdf0c4, #34353a)`): text selection (`::selection`), and a highlighter stroke behind one phrase (`<mark>`) in the subscribe heading, which is parked until email alerts ship. In dark mode it becomes a grey lift, not yellow.
- **Signal Green** (`#22c55e`): the 5px status square only. Means "live / active".

### Neutral

- **Ink** (`light-dark(#222222, #e8e8e8)`): all primary text and links.
- **Ink Muted** (`light-dark(#6b6b6b, #8e8e93)`): subtitles, labels, placeholders, row numbers, footer meta, the `&` in directory links.
- **Page Grey** (`light-dark(#f6f6f6, #1f2023)`): the page background.
- **Sheet** (`light-dark(#ffffff, #25262a)`): table card and outline button surface.
- **Hairline** (`light-dark(#ededed, #2e2f33)`): row dividers, outline button border and offset.
- **Field Grey** (`light-dark(#ececec, #2b2c30)`): inputs and select triggers.
- **Badge Grey** (`light-dark(#ececec, #34353a)`): badge fill.

### Named Rules

**The Two Drops Rule.** Yellow and green are the only hues. Each appears at most once per section, at small size. Never use them for fills, borders, or large areas.

**The Grey Ladder Rule.** Hierarchy comes from Page Grey → Sheet → Field Grey and Ink → Ink Muted. Do not add a new colour to separate things; use the next grey step.

## Typography

**Display Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)
**Body Font:** Geist Mono
**Label/Mono Font:** Geist Mono

**Character:** A single fixed-width family at every size. Hierarchy comes from size and weight (400 → 600 → 700), with slight negative tracking on large headings.

### Hierarchy

- **Display** (600, `clamp(1.75rem, 7vw, 2.25rem)`, 1.1, -0.02em): home hero headline only.
- **Headline** (600, 1.375rem, 1.1, -0.02em): company name on company pages, and the 404 heading.
- **Title** (600, 1.125rem, -0.01em): section headings such as the subscribe prompt (parked).
- **Title Small** (600, 0.875rem, -0.01em): secondary section headings ("hiring at an open-source company?").
- **Lede** (400, 0.875rem): the muted line under the hero headline.
- **Body** (400, 0.75rem / 12px, 1.5): all running text, table cells, inputs, buttons. Paragraphs cap at 70ch.
- **Table Head** (700, body size): table column headers. Weight, not size, sets them apart.
- **Label** (500, 0.625rem / 10px, 0.02em, uppercase): field labels and directory headings. The only uppercase text.
- **Micro** (400, 0.625rem / 10px, 1.4): badges, row index numbers, footer meta. Same size as Label; case and weight tell them apart.

### Named Rules

**The One Family Rule.** Geist Mono only. Never add a sans or serif for "readability" or "headlines".

**The Lowercase Voice Rule.** UI copy is lowercase (headings, buttons, links, placeholders). Proper nouns and tech names keep their case. Table headers and data values (categories, job types) keep Title Case. Uppercase is reserved for 10px labels, applied by CSS.

**The Weight-Not-Pixels Rule.** Never separate two roles by 1px. If size alone cannot carry the difference, keep the size and change weight or case (Table Head vs Body, Label vs Micro).

## Layout

A single centred column, max 760px, with 16px side gutters. `main` pads 96px top and 40px bottom and stacks sections with a 64px gap. Inside sections, gaps step 4 / 8 / 12 / 32 / 40px.

The home page order is: hero (centred header + labelled search), company table, subscribe (parked until email alerts ship), post-a-job row, five-column directory, footer search and bar. Company pages and the 404 page replace the hero with a left-aligned header (headline + one line), then the same footer stack.

Tables scroll horizontally inside their card on narrow screens (`overflow-x: auto`, `white-space: nowrap`). 560px is the only breakpoint: the directory drops from five columns to two, and the subscribe form (parked) collapses from three columns to two with the email field spanning the full row.

## Elevation & Depth

Flat. Surfaces sit on the page with no ambient shadow. Depth comes from the Grey Ladder: a white Sheet on Page Grey, grey fields inside it. Focus rings come from the remix/ui primitives.

### Shadow Vocabulary

- **Keycap offset** (`--rmx-button-shadow: 3px 3px 0 var(--border)`, hover/active `1px 1px 0`): outline button only. A hard, hairline-coloured offset that presses in on hover. Low contrast by design, so it reads as a detail, not a lift.

### Named Rules

**The Flat Sheet Rule.** No blurred shadows, no glows, no glassmorphism. The keycap offset is the single allowed shadow, and it stays in the Hairline colour.

## Shapes

Square. `border-radius: 0 !important` applies to every element and pseudo-element, including remix/ui popovers. Borders are 1px Hairline and appear only as row dividers and the outline button edge. The status dot is a 5px square, not a circle.

## Components

Precise and quiet. Small, square, low contrast. Only the carbon button speaks loudly.

### Buttons

- **Shape:** square (0).
- **Solid** (`solidButton()`): Carbon fill, white text, 700 weight, 34px tall, 14px side padding, no border. Hover drops opacity to 0.9. The primary action: `find jobs`, `subscribe`. Pending and done states change the label (`subscribing…`, `subscribed ✓`).
- **Outline** (`outlineButton()`): Sheet fill, Ink text, 400 weight, 1px Hairline border, 38px tall, keycap offset shadow. Used for leaving the site to act (`add your company`).
- Both wrap remix/ui `button` for behaviour and focus ring.

### Badges

- **Style:** Badge Grey fill, Ink Muted text, Micro (10px, 1.4), 0 4px padding. Content is a glyph or count (`$`, `+3`) with an `aria-label` that spells it out.

### Table Card

- **Background:** Sheet, 0 12px side padding, 760px max width.
- **Header cells:** body size / 700, padding 14px 8px 10px.
- **Rows:** 34px tall, 0 8px padding, 1px Hairline top border.
- **Row index:** Micro, Ink Muted, right-aligned.
- **Result caption:** when searching, a muted left-aligned `<caption>` (padding 14px 8px 0): `19 companies match “go” · clear`.
- **Empty state:** one centred cell, 24px vertical padding, three short lines: `no companies match “…”` (Ink), a pointer back to the stack line with `see all companies`, and `know an open-source company hiring for it? add it` (links to the repo).

### Inputs / Fields

- **Style:** Field Grey fill, no border, 34px tall, body-size mono text, Ink Muted placeholder, 12px leading icon in Ink Muted. Built on remix/ui `input`; select triggers match.
- **Focus:** remix/ui focus ring; the resting box shadow is removed.
- **Touch:** on `pointer: coarse` devices input text is 1rem (16px), so iOS Safari does not zoom the page on focus. The only exception to body size.
- **Label:** Field Label above (10px / 500 / uppercase / Ink Muted, 8px below).

### Links

- **Text link:** Ink, no underline at rest, underline on hover and focus (2px offset). The `apply` link is underlined at rest.
- **Icon link:** same, with a 10px icon and 4px gap. Used for company header links (home, site, github, x, edit).

### Navigation

- **Directory:** five columns (languages, tech, type, cloud, offices). Label-style heading with a 10px icon, then a plain list at 1.7 line height. Plain text links.
- **Footer bar:** `coss.work` wordmark (1.125rem / 600), then GitHub icon, privacy, and year in Micro Ink Muted.

### Search Guidance

Onboarding is the first search, not a tour. Under the hero search, one muted line reads `try Go · TypeScript · Python · C++ · Kubernetes`: the five stacks most companies hire for, computed from the data (`popularStacks`). Names are Ink text links to `/?q=<stack>`, separated by muted `·`. The active stack renders as plain text. No chips, no pills. A query that equals a known tech name matches exactly (`go` never returns Django or Nango); any other query matches substrings.

### Status Dot

A 5px Signal Green square. Marks live data, such as the "hiring" header column.

## Do's and Don'ts

### Do:

- **Do** use Geist Mono at `var(--type-body)` for new UI text, and step hierarchy only with the existing sizes: `var(--type-small)` (10px), `var(--type-body)` (12px), 0.875rem, 1.125rem, 1.375rem, and the hero clamp. Use rem, never px, for font sizes.
- **Do** keep every corner square. The global reset already enforces it; don't fight it.
- **Do** put new lists of companies or jobs in a Table Card with 34px rows and Hairline dividers.
- **Do** write UI copy in lowercase, short and literal (`apply`, `find jobs`, `add your company`).
- **Do** use existing tokens (`var(--text-muted)`, `var(--field-bg)`, …) so both themes work.
- **Do** keep content inside the 760px column.

### Don't:

- **Don't** make it look like a generic SaaS job board: no rounded cards, company logo grids, gradient heroes, or pill "Apply now" buttons.
- **Don't** do hacker cosplay: no green-on-black, scanlines, blinking cursors, or fake shell prompts.
- **Don't** add recruiter-spam signals: no "hot job" or urgency badges, no countdowns, no ads styled as listings.
- **Don't** add blurred shadows, glows, or new hues. Use the Grey Ladder.
- **Don't** add a second typeface.
- **Don't** add a second loud button to a section. One Carbon button per form.
