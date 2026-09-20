# Project facts for resume writing

Checked against the local folders in `/Users/ameerrahman/Documents/projects` on September 16, 2026. This is a source guide, **not** proof of personal authorship, employment dates, deployments, or performance results. Re-check code before using a claim if a project changes.

## Resume preferences confirmed by Ameer

- Resume must be **one rendered page**. Verify the compiled PDF, not just the LaTeX source.
- Put **Technical Skills immediately after Education**. Use real bullet points, selective bold emphasis, and reverse-chronological dated experience.
- Always include **NASA L'SPACE NPWEE**. While ongoing, describe participation and only completed work that Ameer confirms; add outcome bullets as work is finished.
- Ameer stated Archly ended **September 2026**. The portfolio source still says `Present`; confirm the exact role title before changing it. Do not silently swap “Software Engineering Intern” and “Co-Founder & Engineer.”
- Do not turn repository existence into a claim that Ameer personally implemented every feature. Verify contribution details with him.

## Folder inventory and defensible technical facts

| Folder | What was found | Safe resume angle / caution |
|---|---|---|
| `Archly` | TypeScript monorepo: React/Vite web app, Hono API on Cloudflare Workers, PostgreSQL via Drizzle; signed sessions, student/firm/admin flows, tests, Playwright, GitHub Actions CI and deployment. Evidence: `apps/web/package.json`, `apps/api/package.json`, `packages/db/package.json`, `apps/api/src/lib/session.ts`, `.github/workflows/ci.yml`. | Strong full-stack, API, relational-data, testing, CI/CD example. Code verifies features, not Ameer’s exact contribution or title. |
| `Archly-main-preview` | Separate checkout of the same Archly application at a different commit, not a second independent project. | Do not list separately. |
| `Audit-Ready Content Management System` | Capstone CMS with Java/Spring Boot API, React/TypeScript/Vite UI, PostgreSQL schema/migrations, and create/update/delete audit events with before/after JSON snapshots and searchable history. Evidence: `README.md`, `backend/src/main/java/com/auditready/cms/service/ContentItemService.java`, `AuditLogService.java`. | Useful for enterprise software, data governance, and auditability. No tests were found in the inspected tree; do not invent test coverage or production use. |
| `NetworkAnalyzer` | Python/Scapy CLI with packet capture, protocol parsing, filters, statistics, anomaly detection, PCAP/JSON/CSV export, and tests. Evidence: `README.md`, `core/`, `features/`, `tests/`. | Strong networking/systems project; do not claim performance or detection accuracy not measured. |
| `Portfolio` | React/TypeScript portfolio and source descriptions in `src/data/projects.ts` and `src/data/experience.ts`. | Useful as self-reported context, not independent verification. Its Archly role/dates differ from Ameer’s newer instructions. |
| `RUPlanner` | Python/FastAPI planner and PostgreSQL-backed app, Next.js frontend, course and program data, prerequisite-aware planning, saved plans, progress UI, scheduled course ingestion and seat polling, Docker files, tests. Evidence: `backend/app/core/planner.py`, `backend/app/worker.py`, `frontend/src/app/planner/page.tsx`, `docker-compose.yml`. | Strong algorithm, full-stack, data-pipeline and automation example. `README.md` links to `ruplanner.app`; source alone does not prove the site is currently live. |
| `chest-xray-classifier` | PyTorch code for ImageNet-pretrained ResNet18, class-weighted loss, validation/test evaluation; FastAPI prediction endpoint; README describes about 21,000 X-rays and four categories. Evidence: `train/train.py`, `backend/app/main.py`, `README.md`. | **Precision:** training code freezes the backbone and trains the classifier head. No saved model weights or training logs were found in the inspected folder. Prefer “implemented a transfer-learning training pipeline” until Ameer confirms an actual completed training run/results. Educational, not diagnostic. |
| `clinical-lab-monitoring` | Flask/SQLite API, React/TypeScript dashboard, synthetic lab/vital/medication data, configurable reference ranges, server-side status interpretation, read-only FHIR R4 resources. Evidence: `README.md`, `backend/app/ranges.py`, `backend/app/fhir.py`, `frontend/src/`. | Good healthcare-data, data integrity and API example; always state data is synthetic. |
| `fileTransfer` | Single Python `securefile.py` implementing TLS sockets, RSA key wrapping/signatures, AES-CBC encryption, HMAC, and hash checks; a log file exists. | Possible security project, but no tests/README found. Do not call it production-grade or independently security-audited. Do not quote or expose log contents. |
| `intellicustoms` | Astro static business site with four pages and component/data files. `README.md` lists trust-critical placeholders and an unconfigured form key. | Can show client-site/frontend work if Ameer confirms role. Do not describe as launched or claim client credentials/results while placeholders remain. |
| `johana` | Six-page static personal site with HTML/CSS/JS, SVG/canvas interactions, media, localStorage, accessibility notes. | Personal project; do not include by default on professional resumes or reveal private content. |
| `mini-redis` | Java 25/Maven cache with hash map + doubly linked list, average O(1) operations, TTL/LRU, lock-protected state, TCP server, worker pool and tests. Evidence: `README.md`, `src/main/`, `src/test/`. | Strong data structures, concurrency and networking example. State **average**, not worst-case, O(1). |
| `nev` | React/Vite site for GB Renovations NYC; services and project sections in `src/App.jsx`. | Frontend/client work if Ameer confirms role. Project imagery in source is placeholder text; do not claim completed published case studies. |
| `njcu-community-analysis-internal` | Public repo despite name; Jupyter/Pandas/GeoPandas ACS 2019–2023 tract analysis and exported charts/maps. README gives 71,673–574,162 population range; NJ-only tracts; Jersey City catchments overlap and are non-additive. Evidence: `README.md`, `notebooks/03_demographic_profile.ipynb`, `outputs/figures/`. | Strong data profiling, visualization, statistical caveats and communication example. The repo has roughly 207 tracts, **not** evidence for the separate 50,000+ Jasfel-record claim. |
| `vanessa` | Small editable three-page personal HTML/CSS/JS site with browser-local storage and media. | Personal project; do not include by default on professional resumes or reveal private content. |

## Claims requiring Ameer’s confirmation or another source

- NASA L'SPACE: participation status, dates, and any completed proposal/evaluation work; there is no NASA project folder here. Portfolio currently says “Incoming NPWEE Participant.”
- Archly: exact role title, personal contributions, and September 2026 end date versus the portfolio’s stale `Present` entry.
- Jasfel: internship title/dates and the `50,000+` U.S. Census records claim are described in the portfolio, but no separate Jasfel pipeline folder was found. The NJCU repo supports the demographic analysis, not that record count.
- Rutgers education/GPA, Run Club membership count, and other employment details require personal or institutional records; software folders cannot verify them.
- Claims that any app is live, used by customers, or produced a measured outcome need a current deployment or metric check.

## Best-fit project selection

- Software engineering: Archly, RUPlanner, Mini Redis; use Audit-Ready CMS for enterprise/audit-oriented roles.
- Data science/analytics: NJCU Community Analysis, Jasfel experience if personally verified, Chest X-Ray Classifier with precise training wording; RUPlanner for analytical automation.
- Healthcare data: Clinical Lab & Patient Monitoring, Chest X-Ray Classifier, with synthetic/educational limits stated.
- Systems/security: Mini Redis, NetworkAnalyzer; fileTransfer only after deeper validation.
