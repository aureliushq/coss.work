# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Engineers looking for a job. They want to be paid to work on open source. They search by the stack they want to use (Rust, Go, TypeScript, Kubernetes…), compare companies, and then apply on the company's own site.

Secondary audience: commercial open-source companies that add their openings to reach these engineers.

## Product Purpose

coss.work lists engineering jobs at commercial open-source (COSS) companies. Success: an engineer finds a relevant open-source role for their stack quickly and clicks through to apply.

## Positioning

Curated and open. Only companies whose core product is open source are eligible. The listings are open JSON data in a public GitHub repo (`aureliushq/coss.work`). Companies add and update listings by pull request, and a validator checks each change. Posting is free.

## Operating Context

- Job hunters browse and search the site. They apply off-site through each job's `url`.
- Companies contribute through GitHub: one JSON file per company at `app/data/companies/<first letter>/<slug>.json`, following `company.schema.json`. The `validate-companies` GitHub workflow annotates errors on the PR.
- Tech, position and office names come from fixed id lists (`tech.json`, `positions.json`, `locations.json`).

## Capabilities and Constraints

Current:

- Home page: search by stack, table of hiring companies with stack, first role, salary flag, and extra-role count.
- Company, job, tech, category and location pages. Every job has its own page with an apply link to the company's own posting.
- Job data: position, category, level, type, optional salary range (USD, EUR, GBP, CAD, AUD, CHF, INR), optional equity, tech, apply URL.
- Subscribe form (email + stack). Backend is a stub today.

Committed, not built yet:

- Email job alerts filtered by stack.
- Company activity signal: how many people viewed a company's openings in the past few days (site analytics, not GitHub activity).
- Paid featured listings for companies.
- Minimal ads, only after the site has a lot of traffic.

Rules:

- Always free for job hunters.
- Posting a listing is always free. Only featuring is paid.

## Evidence on Hand

- 51 company files in `app/data/companies/`, all dummy test data. No real listings yet.
- No testimonials, placement numbers, traffic figures, or partner logos exist. Do not invent them.

## Product Principles

1. Job hunters never pay and never hit a wall.
2. The data is open. Anyone can read it, fix it, or add to it by PR.
3. Only real open-source companies. Curation is the value.
4. Stack first. The fastest path is "what I want to work with" to "where I can apply".
5. Money never buys a place on the list. It only buys emphasis.
