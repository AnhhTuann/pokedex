# Visual QA report

Baseline `d37b8ff` and final Chromium screenshots are available under the local `artifacts/redesign/v2-full-pass/` directory. The route sets each contain 90 captures at desktop, tablet and mobile widths, in both themes. They include the guest dashboard redirect and guest CMS state. The state screenshots include comparison, Pokémon Detail, empty search, version selector, mobile navigation, team picker and tracker confirmation when those scenarios rendered.

The first mobile review found an unstyled updater that appeared alongside public page content. Once the shell and notifier were fixed, a second review found the detail navigation clipping at 390 px. The final detail pass shortened the artwork stage and reserved the full tab-row height. The screenshot review covered each major public page group. Individual captures can show in-progress lazy artwork depending on image completion at capture time.

Automated accessibility findings remain in the JSON reports. The remaining observations can include contrast in legacy calculator, trainer and tracker treatments and a missing alternative text in existing walkthrough content. Automated scans provide partial accessibility coverage. The branch needs broader keyboard review and an authorized account pass before merge consideration.

Final artifact layout:

- `baseline/{dark,light}/{1440,768,390}/` and `final/{dark,light}/{1440,768,390}/` contain the route PNGs.
- `states/{dark,light}/{1440,390}/` contains the important interactive states and axe results.
- `reports/` contains contact sheets, build output, Playwright results and the local browser harnesses.

The final route matrix completed 270 checks with zero observed document overflows and zero page exceptions. Both theme variants of the mobile Pokémon Detail dialog were recaptured after the tab-height correction.
