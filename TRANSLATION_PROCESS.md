# Documenso Internationalization (i18n) – Source of Truth

## Purpose

This document defines our official process for **adding and maintaining language translations** (e.g., pt-BR) in Documenso.  
It ensures **translation safety, quality, and developer productivity**.

---

## 1. Translation File Management

- All translation catalogs are `.po` files, one per language (e.g., `packages/translations/pt/web.po`).
- All translation files **must match the keys and structure of the English source** (i.e., every `msgid` in English must exist in the target language file).
- **No merge markers or invalid syntax.** Validate with Lingui or similar tools before commit.

---

## 2. Adding or Updating a Language (pt-BR Example)

### Step 1: Generate or Update the `.po` File

- Export from Crowdin, Lingui, or your translation tool.
- Ensure all entries present and valid. No placeholders or untranslated keys unless marked as `#, fuzzy`.

### Step 2: Update Supported Languages

- Edit `packages/lib/constants/i18n.ts` (or equivalent) to add `'pt'` (or new code) in `SUPPORTED_LANGUAGE_CODES` and `SUPPORTED_LANGUAGES`.

### Step 3: Validate the Translation File

- Use Lingui or similar to validate `.po` syntax.
    ```bash
    npm run translate
    ```
- Fix any reported errors.

### Step 4: Compile and Test Locally

- Rebuild translations:
    ```bash
    npm run translate
    npm run build
    ```
- Run app locally:
    ```bash
    npm run dev
    ```
- **Manual QA:**
    - Use the language switcher to select pt-BR.
    - Browse all UI sections; verify major flows are in Portuguese and nothing is obviously missing/broken.

### Step 5: Automated Testing

- Run end-to-end tests to confirm the language switcher and i18n routing work:
    ```bash
    npm run test:e2e -- -g language-switcher
    ```
- Confirm no broken tests or missing keys.

### Step 6: Lint and Build

- Run:
    ```bash
    npm run lint
    npm run build
    ```
- Fix any issues.

---

## 3. Documentation

- Document all new languages and translation steps in `translations.mdx` or an equivalent dev doc.
- Note the process for running `npm run translate` and updating supported languages.

---

## 4. Pull Request Process

- PR must include:
    - Complete, validated `.po` file for new/updated language.
    - Updates to language config and docs.
    - CI passing (lint, build, E2E test).
    - PR description referencing related issue (e.g., #1773 for pt-BR).
- Reviewer must:
    - Check `.po` file for completeness and syntax.
    - Confirm config and docs updated.
    - Ensure all tests pass and language is visible in the UI.

---

## 5. Deployment/Release

- After PR merge:
    - Pull latest on staging.
    - **Manual smoke test:** Switch to the new language, browse app.
    - Monitor logs for translation-related errors.
    - Release to production once validated.

---

## 6. Ongoing Maintenance

- For updates, repeat above steps.
- Use Crowdin integration for crowdsourced/AI translation management.
- Always recompile and test after any `.po` file change.

---

## Validation Checklist (For Every PR)

| Check                              | Status |
|-------------------------------------|--------|
| `.po` file has all keys             | [ ]    |
| `.po` file has no merge markers     | [ ]    |
| No placeholder/English-only keys    | [ ]    |
| Config updated for new language     | [ ]    |
| Docs updated                        | [ ]    |
| `npm run translate` successful      | [ ]    |
| `npm run lint` passes               | [ ]    |
| `npm run build` passes              | [ ]    |
| E2E test (language switcher) ok     | [ ]    |
| Manual QA in UI                     | [ ]    |

---

## Best Practices

- **Never commit incomplete or invalid translation files.**
- **Never add secrets or sensitive config to translation files.**
- **Keep translation file structure 100% in sync with the source language.**
- **Automate as much validation as possible (CI/CD).**
- **Review PRs for translation quality and completeness.**

---

## Approval

> This plan follows industry best practices for i18n in open-source and SaaS projects, ensures safety and quality, and is easy to maintain and scale as more languages are added.
