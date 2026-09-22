# AGENTS.md

## Scope

This repo contains Loon plugins. Keep each plugin in its own top-level directory with its `.plugin` manifest and referenced script together.

Current plugins:

- `trakt/`: modifies Trakt settings responses for "Trakt Upsell Remover".
- `maimai/`: cleans colleague feeds and opens the colleague tab by default.

## Commands

No project build/test/lint setup exists. Use syntax checks for edited JavaScript files:

```sh
node --check trakt/trakt.js
node --check maimai/maimai.js
```

Scripts rely on Loon globals such as `$response` and `$done`, so they are not directly runnable in Node without a harness.

## Plugin conventions

- `.plugin` files contain metadata in `#!` header lines, script wiring in `[Script]`, and MITM hosts in `[MITM]`.
- When updating a plugin, update its `#!date` and increment `#!version` in the matching `.plugin` file.
- If a script path changes, update the manifest's `script-path` raw GitHub URL.
- If response body access is needed, keep `requires-body=true`.
- If intercepting a new host, update `[MITM] hostname`.
- Hosted plugin/script URLs point at the `main` branch, so published behavior changes only after changes land on `main`.

## JavaScript style

- Plain JavaScript, no imports or dependencies.
- Two-space indentation.
- Guard optional response objects before mutating fields.
- Return modified responses with `$done({ body: JSON.stringify(obj) })`.

## Gotchas

- Loon runtime APIs (`$response`, `$done`) are intentional; do not replace them with Node/browser APIs.
- The current Trakt plugin targets `apiz.trakt.tv`, not `api.trakt.tv`.
- Maimai's `data[].card_type` value `team_checkin_activity` identifies the team check-in prize promotion. Preserve pagination metadata when filtering feed cards.
