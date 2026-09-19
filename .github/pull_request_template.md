<!-- Adding or updating a company? Fill in the checklist. For other changes, delete it and describe what changed. -->

## Company listing

- [ ] The file is at `app/data/companies/<first letter>/<slug>.json` (lowercase letters, digits and dashes only)
- [ ] Position ids come from [positions.json](https://github.com/aureliushq/coss.work/blob/main/app/data/positions.json), and tech ids from [tech.json](https://github.com/aureliushq/coss.work/blob/main/app/data/tech.json)
- [ ] `updated` is the current time in ISO 8601 format, e.g. `2026-09-19T12:00:00.000Z`
- [ ] `salary` and `equity` are left out if they are not public
- [ ] The website, social and apply links work

The **Validate companies** check shows any errors on the matching lines under "Files changed". If you edit the file locally, your editor autocompletes fields from [company.schema.json](https://github.com/aureliushq/coss.work/blob/main/app/data/company.schema.json).
