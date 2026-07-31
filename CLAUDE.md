# ToDay Website Agent Working Rules

## Purpose

This document defines how the agent should work on this project.

The primary goal is to minimize unnecessary context growth, reduce token usage, improve task accuracy, and avoid API context limit errors.

---

# Context Management

## Read only what is required

Always read the minimum number of files needed to complete the current task.

Do not scan the entire repository unless the user explicitly requests a full project analysis.

When possible, inspect one file before reading related files.

---

## Avoid duplicate reading

Do not repeatedly read files that have not changed during the current session.

Reuse existing context whenever possible.

---

## Ignore generated content

Do not read or analyze generated folders unless explicitly requested.

Ignore:

- node_modules/
- dist/
- build/
- coverage/
- .next/
- .astro/
- .cache/

Ignore large lock files:

- package-lock.json
- pnpm-lock.yaml
- yarn.lock

---

## Limit terminal output

Do not analyze long terminal output.

If terminal logs exceed roughly 200 lines, inspect only the relevant error section.

Do not include complete build logs in context.

---

# Task Scope

Every task should have a clearly defined scope.

Before modifying code:

- Identify the target files.
- Modify only those files.
- Avoid unrelated refactoring.

Do not edit multiple independent features in one task.

---

# File Reading Strategy

Preferred workflow:

1. Read project structure if necessary.
2. Read target file.
3. Read directly related files only.
4. Perform modifications.
5. Stop reading additional files unless required.

Never recursively inspect every directory by default.

---

# Session Management

Large features should be divided into multiple sessions.

When one feature is complete:

- Summarize completed work.
- Summarize remaining work.
- Suggest starting a new session if the context becomes large.

Avoid continuing extremely long conversations.

---

# Context Compression

Instead of relying on the complete conversation history:

Summarize:

- completed work
- pending work
- important decisions

Use summaries instead of previous chat whenever possible.

---

# Output Rules

Keep responses concise.

Do not explain unrelated implementation details.

Do not include unnecessary code examples.

Only generate code related to the requested task.

---

# Browser Verification

If browser verification is required to continue, stop immediately and ask the developer to verify manually instead of attempting browser automation.

Never attempt to automate browser interactions (clicking, scrolling, inspecting console logs, taking screenshots) as a substitute for manual developer review.

---

# Repository Safety

Do not modify unrelated files.

Do not rename directories unless requested.

Do not reorganize project structure without permission.

Do not delete files unless requested.

---

# Performance Priority

When multiple approaches exist:

Prefer the solution that:

- reads fewer files
- consumes fewer tokens
- minimizes context growth
- keeps changes localized

Context efficiency is a project requirement.

---

## Agent skills

### Issue tracker

问题追踪器使用本地 Markdown，文件存放在 `.scratch/<feature>/` 下。见 `docs/agents/issue-tracker.md`。

### Domain docs

单上下文布局：根目录 `CONTEXT.md` + `docs/adr/` 存放 ADR。见 `docs/agents/domain.md`。
