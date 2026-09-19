# Coss.work

A minimal Remix application starter with a home page.

## Starter Shape

- `app/actions/controller.tsx` owns the top-level route actions.
- `app/actions/home-page.tsx` and `app/actions/document.tsx` render the route-owned starter UI.
- `app/actions/public/` contains the browser runtime entry and interactive prompt button.
- `app/routes.ts` defines the shared route contract used by server and browser modules for type-safe hrefs.
- `app/router.ts` wires routes to handlers and installs the standard Remix UI renderer used by actions, and default-exports the router as the Cloudflare Worker fetch handler.
- `vite.config.ts` (Pitlane `remix()` + `@cloudflare/vite-plugin`) and `wrangler.jsonc` configure the Worker build, `vp dev` and `vp preview`.
- Root `public/` contains static files served unchanged from the app root as Workers static assets.

## Growing The App

- Put top-level route actions in `app/actions/controller.tsx`.
- Add `app/actions/<route-key>/controller.tsx` when a nested route map needs its own actions or middleware.
- Add directories like `app/data/` or `test/` when the app actually needs them.
- Move shared UI into `app/ui/` once more than one route needs it.

## Commands

```sh
npm i
npm run dev
npm run build
npm run preview
npm test
npm run typecheck
```

## Deploying

Cloudflare Workers Builds deploys every push to `main`. A failed build does not deploy. Set it up once in the Cloudflare dashboard:

1. Go to **Workers & Pages**, open the `coss-work` Worker, then **Settings → Builds → Connect**. If the Worker does not exist yet, use **Create → Import a repository** and name it `coss-work`. The Worker name must match `name` in `wrangler.jsonc`.
2. Pick the `aureliushq/coss.work` repository and the `main` branch.
3. Set **Build command** to `bun run build`. Keep the default **Deploy command**, `npx wrangler deploy`.
4. Under **Build variables**, add `BUN_VERSION` = `1.4.2` to match `devEngines` in `package.json`.
5. Keep **Builds for non-production branches** on. Other branches run `npx wrangler versions upload`, which uploads a preview version without touching production, and Cloudflare posts the preview URL on the pull request.
