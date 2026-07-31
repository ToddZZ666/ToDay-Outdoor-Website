# Development Workflow — ToDay

> **Purpose:** Define the engineering roles, processes, and quality gates for maintaining the ToDay website.
> This document is tool-agnostic — it describes *what* must happen, not *which tool* must do it.

---

## 1. Development Roles

Every change to this repository passes through one or more of the following roles. A single contributor may fill multiple roles, but each role's responsibilities must be fulfilled.

| Role | Responsibility |
|------|----------------|
| **Architecture** | Defines system structure, technology choices, and cross-cutting concerns. |
| **Planning** | Converts requirements into executable tasks with scope and acceptance criteria. |
| **Implementation** | Writes code and tests that fulfil the planned tasks. |
| **Code Review** | Reviews changes for correctness, maintainability, and adherence to standards. |
| **Testing** | Verifies changes meet acceptance criteria and do not introduce regressions. |
| **Documentation** | Keeps documentation accurate and up-to-date with each change. |
| **Deployment** | Manages the release process from merge to production. |
| **Maintenance** | Monitors production, addresses issues, and applies incremental improvements. |

## 2. Working Principles

| Principle | Description |
|-----------|-------------|
| **Small changes** | Each modification should be the smallest unit of meaningful work |
| **One concern at a time** | Do not mix refactoring with feature work |
| **Documentation follows code** | Every code change that affects architecture, API, or behaviour must update documentation |
| **Quality gates before merge** | Linting, type checking, and build must pass before merging |
| **Main branch is sacred** | `main` must always be deployable — no exceptions |
| **Review before merge** | Every change must be reviewed (by another person, or by the same person after a time delay) |

## 3. Required Reading Order

New contributors (human or automated) should read the documentation in this order:

1. **README.md** — Project overview, quick start
2. **docs/ARCHITECTURE.md** — System architecture and folder structure
3. **docs/CODING_STANDARDS.md** — Code conventions and quality gates
4. **docs/DEVELOPMENT_WORKFLOW.md** — This document: process and roles
5. **docs/PROJECT.md** — Business context and requirements
6. **docs/DESIGN_SYSTEM.md** — Visual tokens and component specs
7. **docs/SEO_GUIDE.md** — SEO rules
8. **docs/DEPLOYMENT.md** — Deployment and release
9. **docs/ROADMAP.md** — Current priorities and future plans
10. **docs/BRAND_GUIDELINES.md** — Voice and tone
11. **docs/CONTENT_STRATEGY.md** — Content architecture
12. **docs/CHANGELOG_GUIDELINES.md** — Changelog maintenance

## 4. Decision Hierarchy

When making decisions, consult sources in this order of authority:

1. **docs/PROJECT.md** — Business requirements (highest authority)
2. **docs/ARCHITECTURE.md** — Technical architecture constraints
3. **docs/CODING_STANDARDS.md** — Code conventions
4. **docs/DESIGN_SYSTEM.md** — Design tokens and visual rules
5. **Configuration files** — `astro.config.mjs`, `tsconfig.json`, `eslint.config.js`, `.prettierrc`
6. **Existing codebase patterns** — When documentation is silent, follow established patterns
7. **Package documentation** — Third-party library documentation

## 5. Documentation Update Rules

| Trigger | Required Action |
|---------|-----------------|
| New component added to `src/components/` | No doc update needed unless it adds a new pattern |
| New folder created | Update `ARCHITECTURE.md` folder structure |
| Technology changed or added | Update `ARCHITECTURE.md` tech stack |
| Design token changed | Update `DESIGN_SYSTEM.md` relevant section |
| Brand voice or terminology changes | Update `BRAND_GUIDELINES.md` |
| SEO rules changed | Update `SEO_GUIDE.md` |
| Deployment process changed | Update `DEPLOYMENT.md` |
| Development process changed | Update `DEVELOPMENT_WORKFLOW.md` |
| Roadmap changed | Update `ROADMAP.md` |

## 6. Refactoring Rules

| Rule | Detail |
|------|--------|
| **No refactoring + features** | Refactoring and feature work must be separate commits |
| **Preserve behaviour** | Refactoring must not change observable behaviour |
| **Tests pass** | If tests exist, they must pass before and after |
| **Documentation updated** | If the refactoring changes structure, update docs |
| **Small scope** | Each refactoring should be limited to one area |

## 7. Architecture Change Rules

| Rule | Detail |
|------|--------|
| **Written justification** | Any architecture change must be documented in the PR description |
| **Impact analysis** | List all files that will be affected |
| **Documentation updated** | `ARCHITECTURE.md` and any other affected docs must be updated in the same PR |
| **Review required** | Architecture changes require review with full context |
| **Backward compatibility** | Prefer additive changes over breaking changes |

## 8. Deletion Rules

| Rule | Detail |
|------|--------|
| **No silent deletion** | Deleting code, files, or features requires explicit PR description |
| **Check references** | Verify nothing else depends on the deleted file or export |
| **Update imports** | Remove or update all import references |
| **Clean up documentation** | Remove or update references in docs |
| **One deletion per scope** | Do not combine deletion with unrelated additions |

## 9. Quality Gates

Every change must pass these gates before merging to `main`:

| Gate | Check | Who |
|------|-------|-----|
| Lint | `npm run lint` — zero errors | Implementation |
| Type check | `npm run typecheck` — zero errors | Implementation |
| Format | `npm run format:check` — no formatting issues | Implementation |
| Build | `npm run build` — exits with code 0 | Implementation |
| Review | Changes reviewed against CODING_STANDARDS.md | Code Review |
| Documentation | No docs left outdated by the change | Documentation |

## 10. Definition of Done

A task is complete when all of these are true:

- [ ] Implementation satisfies the acceptance criteria
- [ ] All quality gates pass (lint, typecheck, format, build)
- [ ] Code review has been completed and approved
- [ ] Documentation has been updated to reflect the change
- [ ] CHANGELOG has been updated (see [CHANGELOG_GUIDELINES.md](./CHANGELOG_GUIDELINES.md))
- [ ] Changes are merged to `main`
- [ ] Production deployment is verified

---

**See also:** [CODING_STANDARDS.md](./CODING_STANDARDS.md) | [DEPLOYMENT.md](./DEPLOYMENT.md) | [ROADMAP.md](./ROADMAP.md)
