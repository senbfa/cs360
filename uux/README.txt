UUX Beta Consumer Package — chore/core-design-system
=========================================================

Snapshot date (UTC): 2026-07-15T08:37:59Z
Source branch:       chore/core-design-system
Source commit:       d1dd1e77e
Built with:          yarn install && yarn build:web && yarn build:web:umd  (packages/web)

Since previous snapshot (2026-07-14, commit 9925a6935), 9 new commits merged:
- flex-table: responsive columns (FRW-5912)
- dialog: footer tag fix (FRW-4060), other dialog-cds alignment
- tooltip: persists on hover, dismissed by Escape (WCAG 1.4.13, FRW-4092)
- breadcrumbs-cds, card-cds token alignment
- compact-flagset rework
- xrange chart doc mention (FRW-7433)
- latest tokens from develop
- dependency bump: echarts 5.5 -> 6.1 (ran `yarn install` before rebuilding
  to pick this up)

Contents
--------
- base.css                    Global CDS token / theme stylesheet
- unified-ux-web.min.js       All uwc-* web components, incl. uwc-flex-table (resizable columns)
- unified-ux-web.license.txt  Third-party license notices for the bundled dependencies
- DESIGN.md                   CDS token/spec reference (colors, typography, spacing, component tokens)

Known issue in this snapshot (carried over, not introduced by today's merges)
-------------------------------------------------------------------------------
uwc-avatar color="secondary" reads --uwc-avatar-text-color: var(--accent-1-forground)
(typo, missing "e") — that token isn't defined anywhere, so it silently falls back
to inherited text color instead of the intended accent color. The correct token is
--accent-1-foreground. Not fixed in this snapshot; flagged for a follow-up PR.

How to consume in a Wicket page
--------------------------------
1. Add these two tags to the page:

     <link href="base.css" rel="stylesheet" />
     <script src="unified-ux-web.min.js"></script>

2. IMPORTANT: CDS styling only activates if the <html> tag carries the "cds"
   marker class, e.g.:

     <html ... class="cds sm xs" data-theme="light">

   Without "cds" in the class list, components render with default/legacy
   styling, not the new CDS look.

3. Drop uwc-* elements (e.g. <uwc-flex-table>) directly into Wicket markup.
   Routing/state/data-layer stays entirely in Wicket — UUX only owns
   rendering.

Replacing this snapshot later
------------------------------
This is a one-off manual snapshot, not the daily automated build. To refresh:
pull latest, run `yarn install` if package.json/yarn.lock changed, then
`yarn build:web && yarn build:web:umd`, and copy the same 3 files over —
file names don't change, so it's a drop-in replacement.
