# coss.work

Get paid to work on open source.

[coss.work](https://coss.work) is a free job board for engineering roles at commercial open-source (COSS) companies. Search by the stack you want to work with, compare companies and apply on their own site.

## How it works

- Only companies whose core product is open source are listed.
- Each company is one JSON file in this repo, in [`app/data/companies/`](app/data/companies).
- Companies add and update their listings by pull request. A validator checks each change.
- It is free for job hunters, and it is free for companies to post.

## Post a job

1. Copy [`app/data/companies/c/cal-com.json`](app/data/companies/c/cal-com.json) to `app/data/companies/<first letter>/<slug>.json`. The slug can use only lowercase letters, digits and dashes.
2. Fill in your company and your open roles. Keep the `"$schema"` line so that your editor can autocomplete the fields.
3. Set `updated` to the current time in ISO 8601 format, for example `2026-09-19T12:00:00.000Z`. Listings show newest first.
4. Optional: run `bun run validate:companies` to check the file locally.
5. Open a pull request. The **Validate companies** check marks errors on the matching lines under "Files changed".

To update or remove a listing, click **edit** on your company page, or change or delete the file in a pull request.

### Company fields

All fields are required.

| Field       | Value                                                   |
| ----------- | ------------------------------------------------------- |
| `name`      | Company name                                            |
| `url`       | Company website                                         |
| `at`        | Short label, for example `"jobs"`                       |
| `building`  | What the company is building, in 5 words or fewer       |
| `products`  | List of `{ "name", "url" }`                             |
| `socials`   | Profile URLs, for example `https://github.com/<org>`    |
| `offices`   | Location ids, for example `"san-francisco"`, `"remote"` |
| `headcount` | Whole number                                            |
| `founded`   | Year                                                    |
| `jobs`      | At least one job (see below)                            |
| `updated`   | ISO 8601 timestamp of the last edit                     |

### Job fields

| Field      | Value                                                                                  |
| ---------- | -------------------------------------------------------------------------------------- |
| `position` | Id from [`positions.json`](app/data/positions.json)                                    |
| `category` | `frontend`, `backend`, `full-stack`, `mobile`, `devops`, `data`, `security`, `systems` |
| `level`    | `any`, `junior`, `senior`                                                              |
| `type`     | `full-time`, `part-time`, `contract`, `freelance`                                      |
| `tech`     | Ids from [`tech.json`](app/data/tech.json)                                             |
| `url`      | Where to apply                                                                         |
| `salary`   | Optional. `{ "amount": [min, max], "range": "yearly", "currency": "usd" }`             |
| `equity`   | Optional. `[min, max]` in percent                                                      |

`range` can be `yearly`, `monthly` or `hourly`. `currency` can be `usd`, `eur`, `gbp`, `cad`, `aud`, `chf` or `inr`. [`company.schema.json`](app/data/company.schema.json) has the full rules.

## FAQ

### Is it free?

Yes. Job hunters never pay, and posting a listing is always free.

### Which companies can post?

Companies whose core product is open source.

### Must I show a salary or equity?

No. Leave `salary` and `equity` out if they are not public.

### Can I pay for a higher place on the list?

No. Money never buys a place on the list. Paid featured listings may come later, but they will only add emphasis.

### How are listings ordered?

By `updated`, newest first.

### Can I get job alerts?

Not yet. Email alerts by stack are planned.

### A listing is wrong or out of date. What do I do?

Open a pull request with the fix, or [open an issue](https://github.com/aureliushq/coss.work/issues).

### My tech or position is not in the list.

Add it to [`tech.json`](app/data/tech.json) or [`positions.json`](app/data/positions.json) in the same pull request.

### Can I use the data?

Yes. See [Attribution](#attribution).

## Attribution

The listing data in [`app/data/`](app/data) is free to use. If you use it, credit coss.work by name and link:

```md
Data from [coss.work](https://coss.work)
```

## Development

Built with [Remix 3](https://remix.run), [Vite+](https://viteplus.dev) and Cloudflare Workers. Uses bun 1.4.2 and Node 24.3 or later.

```sh
bun i
bun run dev                 # start the dev server
bun run build
bun run preview
bun run test
bun run typecheck
bun run check               # format, lint and type check
bun run validate:companies  # check the company files
```

See [`AGENTS.md`](AGENTS.md) for the code layout.

## Deploying

Cloudflare Workers Builds deploys every push to `main`. A failed build does not deploy. Set it up once in the Cloudflare dashboard:

1. Go to **Workers & Pages**, open the `coss-work` Worker, then **Settings → Builds → Connect**. If the Worker does not exist yet, use **Create → Import a repository** and name it `coss-work`. The Worker name must match `name` in `wrangler.jsonc`.
2. Pick the `aureliushq/coss.work` repository and the `main` branch.
3. Set **Build command** to `bun run build`. Keep the default **Deploy command**, `npx wrangler deploy`.
4. Under **Build variables**, add `BUN_VERSION` = `1.4.2` to match `devEngines` in `package.json`.
5. Keep **Builds for non-production branches** on. Other branches run `npx wrangler versions upload`, which uploads a preview version without touching production, and Cloudflare posts the preview URL on the pull request.
