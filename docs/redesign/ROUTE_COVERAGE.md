# Route coverage

The responsive smoke matrix ran all 15 route URLs in dark and light mode at 1920×1080, 1440×900, 1366×768, 1280×800, 1024×768, 768×1024, 430×932, 390×844 and 360×800. The matrix checked rendering, page exceptions and document width. Screenshots at 1440, 768 and 390 px supported the visual review.

| Route | Design changes in this pass | Dark and light, desktop and mobile | Functional coverage | Remaining |
|---|---|---|---|---|
| `/` | Native filters, card actions, stable artwork stage and fallback, detail navigation | Rendered and reviewed | Search, filter, details, comparison, game selection and theme smoke | Full forms, favorite persistence and infinite pagination |
| `/moves` | Existing dedicated design with shared shell and contrast updates | Rendered and reviewed | Route and data render | Full filter, sort, lookup and drawer regression |
| `/abilities` | Existing dedicated design with updated shared shell and accent contrast | Rendered and reviewed | Route and data render | Generation filters and details regression |
| `/items` | Existing sprite library design with updated shared shell and accent contrast | Rendered and reviewed | Route and data render | Category and details regression |
| `/locations` | Compact heading, readable version accents and keyboard dialog | Rendered and reviewed | Route and data render | Game-specific encounter regression, desktop split view |
| `/types` | Labeled selectors, semantic multiplier labels and subdued chart | Rendered and reviewed | Route smoke, calculation source unchanged | Full selector and matchup regression |
| `/natures` | Compact heading and keyboard-visible filter choices | Rendered and reviewed | Route smoke | Full search and nature filter verification |
| `/teambuilder` | Compact slots, shared heading, picker focus and contextual badge colors | Rendered and reviewed | Open and dismiss add picker | Team writes, import/export and configured member workflows |
| `/tracker` | Simplified progress panel and accessible confirmation prompts | Rendered and reviewed | Open and dismiss reset prompt | Catch persistence and bulk actions |
| `/calculator` | Larger labeled inputs and contextual type badges | Rendered and reviewed | 36 baseline-equivalent engine scenarios | Full browser input parity and remaining contrast |
| `/walkthrough` | Collapsible chapters, keyboard TOC, readable article layout and admin-only editor visibility | Rendered and reviewed | Chapter and language controls | Review stored rich-content alternative text |
| `/login` | Shared form, labeled controls and visible validation | Rendered and reviewed | Anonymous required-field validation | End-to-end sign-in |
| `/register` | Shared form, email and password autocomplete | Rendered and reviewed | Route smoke | Test-account registration |
| `/dashboard` | Profile header, team and favorites panels from existing query | Anonymous redirect observed | Guest access | Authenticated rendering and account workflow |
| `/admin/walkthrough` | CMS heading, editor color improvements and visibility through existing admin check | Guest access state rendered and reviewed | Guest editor hidden | Authorized editor rendering, save and publish |
