# Changelog Guidelines — ToDay

> **Purpose:** Define how to maintain the project changelog for long-term traceability.

---

## 1. Format

This project follows **Keep a Changelog** format: [https://keepachangelog.com/en/1.1.0/](https://keepachangelog.com/en/1.1.0/)

```
# Changelog

## [1.0.0] — 2026-07-13

### Added
- New feature or component

### Changed
- Modification to existing functionality

### Deprecated
- Features to be removed in future releases

### Removed
- Features removed in this release

### Fixed
- Bug fixes

### Security
- Security improvements
```

## 2. Sections

| Section | When to Use |
|---------|-------------|
| **Added** | New features, components, pages, documentation |
| **Changed** | Modifications to existing functionality, refactoring |
| **Deprecated** | Features that will be removed in a future release |
| **Removed** | Features removed in this release |
| **Fixed** | Bug fixes, error corrections |
| **Security** | Vulnerability fixes, security improvements |

## 3. Writing Style

- Use present tense: "Add hero section" (not "Added" or "Adds")
- Be specific: "Add product card component with image, title, and price" (not "Improve product display")
- Include PR or issue reference when applicable: `[#42]`
- One bullet per logical change
- Write for human readers — explain the impact, not just the change

## 4. When to Update

| Trigger | Required |
|---------|----------|
| New feature merged to `main` | Yes |
| Bug fix merged to `main` | Yes |
| Dependency update | No (unless breaking change) |
| Documentation-only change | Yes |
| Refactoring (no user-facing change) | Optional |
| Tooling/CI change | Optional |

## 5. Location

The changelog lives at the repository root: `CHANGELOG.md`

## 6. Versioning

This project uses [Semantic Versioning 2.0.0](https://semver.org/):

| Increment | When |
|-----------|------|
| **Major** | Breaking changes to architecture, design tokens, or deployment |
| **Minor** | New features, new pages, new components |
| **Patch** | Bug fixes, performance improvements, documentation |

---

**See also:** [CODING_STANDARDS.md](./CODING_STANDARDS.md) | [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)
