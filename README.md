# lighthouse-ci-budgets

Lighthouse runs on PRs, blocks the merge if Core Web Vitals regress, posts the diff back as a comment. That's the whole idea.

I built this after watching too many "this looks fine in review" PRs land and quietly add 300KB to first paint. Code review catches logic. It doesn't catch a designer adding a 2MB hero image to a layout file two folders away.

## The budgets

```
Performance category ≥ 95
Accessibility       ≥ 95
Best practices      ≥ 95
SEO                 ≥ 95
LCP                 ≤ 2.0s
CLS                 ≤ 0.05
TBT                 ≤ 200ms
Total JS            ≤ 200KB
Total CSS           ≤ 50KB
```

Per-route overrides live in `budgets.json` — for example, project detail pages get a tighter JS budget than the home page because they're text-heavy and shouldn't need much script.

## Run locally

```bash
npm install
npm run build
npx @lhci/cli@latest autorun
```

## Wiring it into your repo

Three files:

- `.lighthouserc.js` — what Lighthouse runs and what it asserts.
- `budgets.json` — per-route resource and timing budgets.
- `.github/workflows/lighthouse.yml` — PR gate.

The workflow builds the app, starts it on a port, runs Lighthouse 3 times per URL, takes the median, and asserts every budget. The median-of-3 thing is important — without it, network jitter on a CI runner will produce false positives.

## Reading a failure

When the gate fails, the GitHub check links to the full Lighthouse report. The summary shows which metric exceeded budget and the actual value. The Treemap view in the report tells you which dependency added the bytes — usually a third-party script or an oversized image. Almost always one of those two.

## Companion

- The same idea applied to real users, not lab runs: [web-vitals-rum-dashboard](https://github.com/Kubes1598/web-vitals-rum-dashboard).
- Portfolio case study: [ajimati-portfolio](https://github.com/Kubes1598/ajimati-portfolio).

## License

MIT. See [LICENSE](./LICENSE).
