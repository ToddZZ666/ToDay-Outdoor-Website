# Deployment Guide — ToDay

> **Purpose:** Document the build, deployment, environment configuration, and release process.

---

## 1. Git Workflow

### Branch Strategy

```
main          Production-ready code (deployed to Cloudflare Pages)
  │
  ├── feat/*          New features (branched from main)
  ├── fix/*           Bug fixes (branched from main)
  ├── refactor/*      Code restructuring (branched from main)
  ├── docs/*          Documentation changes (branched from main)
  └── chore/*         Tooling, dependency updates (branched from main)
```

### Rules

- `main` must always be deployable
- Feature branches are short-lived (days, not weeks)
- Squash-merge into `main` with a conventional commit message
- Delete the source branch after merge

## 2. Deployment Workflow

### Automated (Default)

```
1. Developer pushes to main
2. Cloudflare Pages detects the push
3. Cloudflare runs: npm ci
4. Cloudflare runs: npm run build
5. Cloudflare deploys dist/client/ to edge
6. Deployment URL is available immediately (typically < 1 minute)
```

### Manual (CLI)

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist/client/ --branch main

# Deploy to a preview environment
npx wrangler pages deploy dist/client/ --branch preview-branch-name
```

### Preview Deployments

Cloudflare Pages automatically creates preview deployments for all pull requests. The preview URL is shown in the PR checks. This allows testing changes before merging to `main`.

## 3. Environment Variables

### Build-time Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_SITE_URL` | Yes | Canonical site URL (e.g., `https://today-outdoor.com`) |
| `PUBLIC_ANALYTICS_ID` | No | Analytics tracking ID (future) |

Variables prefixed with `PUBLIC_` are available in client-side code. All other variables are server-only.

### Setting Variables in Cloudflare Pages

```
Cloudflare Dashboard → Pages → [Project] → Settings → Environment Variables
```

## 4. Production Checklist

Before deploying to production, verify:

- [ ] Build succeeds: `npm run build` exits with code 0
- [ ] Lint passes: `npm run lint` exits with code 0
- [ ] All checks pass (typecheck, format:check)
- [ ] No console errors in preview deployment
- [ ] All pages load at expected URL paths
- [ ] 404 page works for non-existent routes
- [ ] SEO meta tags present on every page:
  - [ ] `<title>` tag
  - [ ] `<meta name="description">`
  - [ ] Open Graph tags
  - [ ] Twitter Card tags
  - [ ] Canonical URL tag
- [ ] Images load with correct dimensions (no CLS)
- [ ] All links are valid (no 404s, no broken anchors)
- [ ] Dark mode renders correctly
- [ ] Mobile layout renders correctly
- [ ] Lighthouse scores ≥ 95 on desktop and mobile
- [ ] Page speed test passes (Cloudflare analytics)

## 5. Rollback Strategy

### If a production deployment has issues:

1. **Instant rollback via Cloudflare Dashboard:**
   - Go to Cloudflare Pages → [Project] → Deployments
   - Find the last known-good deployment
   - Click "Rollback to this deployment"

2. **Git revert (permanent fix):**
   ```bash
   git revert HEAD
   git push origin main
   ```
   This creates a new deployment with the revert.

### Rollback Considerations

- Rollback is instant — Cloudflare Pages serves the previous deployment from edge cache
- No downtime during rollback — the previous deployment is already cached globally
- After rollback, investigate the root cause before re-deploying

## 6. Release Checklist

For each production release:

- [ ] All changes merged to `main`
- [ ] `npm run build` passes locally
- [ ] `npm run lint` passes
- [ ] Preview deployment verified
- [ ] Production checklist (section 4) reviewed
- [ ] CHANGELOG updated (see [CHANGELOG_GUIDELINES.md](./CHANGELOG_GUIDELINES.md))
- [ ] Tag the release: `git tag v1.0.0 && git push --tags`

---

**See also:** [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md) | [ARCHITECTURE.md](./ARCHITECTURE.md)
