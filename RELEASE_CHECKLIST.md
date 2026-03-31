# n8n Community Verification Release Checklist

Use this checklist before submitting the package in the n8n Creator Portal.

## 1) Code and package quality

- [ ] All changes are committed in GitHub.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] No deprecated n8n helper functions are used (for example `requestWithAuthentication`).
- [ ] `package.json` includes:
  - [ ] Name starts with `n8n-nodes-`
  - [ ] Keyword `n8n-community-node-package`
  - [ ] `license` is `MIT`
  - [ ] `n8n.nodes` and `n8n.credentials` are correctly set
- [ ] README is complete and in English (auth, usage, examples, support).
- [ ] No secrets are present in docs or code examples.

## 2) Versioning

- [ ] Version is bumped in `package.json` (`major.minor.patch`).
- [ ] Git tag is created using format `vX.Y.Z` (example `v1.1.6`).
- [ ] Tag is pushed to GitHub.

## 3) Publish from GitHub Actions with provenance

- [ ] `.github/workflows/publish.yml` exists.
- [ ] npm Trusted Publisher is configured for this repository, or `NPM_TOKEN` secret is configured.
- [ ] Release tag triggers workflow and npm publish succeeds.
- [ ] npm package page shows the new version.

## 4) Post-publish verification

- [ ] Run scanner against published package:

```bash
npx @n8n/scan-community-package n8n-nodes-context-sms
```

- [ ] Scanner returns pass (no security or lint failures).
- [ ] Install package into local n8n and run a real workflow test.

## 5) Submit to n8n Creator Portal

- [ ] Open: https://creators.n8n.io/nodes
- [ ] Submit package name and repository URL.
- [ ] Provide any requested docs or notes.
- [ ] Track review status and respond quickly to feedback.
