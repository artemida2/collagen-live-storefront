---
name: Collagen Live — Distributor Surface
description: Warm paper, botanical green, and one fixed film seen through holes cut in opaque plates.
colors:
  paper: "#f7f3ec"
  paper-2: "#f0eae0"
  paper-3: "#e6ddce"
  white: "#ffffff"
  ink: "#1c1b17"
  ink-70: "rgba(28, 27, 23, 0.7)"
  ink-64: "rgba(28, 27, 23, 0.64)"
  ink-58: "rgba(28, 27, 23, 0.58)"
  ink-20: "rgba(28, 27, 23, 0.2)"
  green: "#17301f"
  green-3: "#2b5636"
  stone: "#17140f"
  lume: "#f2eee5"
  lume-72: "rgba(242, 238, 229, 0.72)"
  lume-60: "rgba(242, 238, 229, 0.6)"
  orange: "#e2701b"
  orange-2: "#f0913a"
  cherry: "#b4222f"
  gold: "#c08a2e"
  olive: "#7d8f3a"
  plum: "#8e1f38"
  rule: "rgba(28, 27, 23, 0.14)"
  rule-soft: "rgba(28, 27, 23, 0.08)"
  rule-lume: "rgba(242, 238, 229, 0.18)"
  rule-lume-soft: "rgba(242, 238, 229, 0.09)"
typography:
  # The enumerated ramp the detector checks literal font-sizes against.
  # Consolidated from 27 drifting values; see "Size ramp" below for what each
  # step carries. svg-label and svg-meta are SVG user units inside the jar's
  # 320-wide viewBox, not CSS pixels — they scale with the artwork.
  scale:
    micro: "9.5px"
    mono: "10.5px"
    tiny: "12px"
    small: "13.5px"
    ui: "14.5px"
    body: "15px"
    base: "16px"
    lede: "17px"
    card-title: "19px"
    label: "21px"
    heading: "24px"
    heading-lg: "26px"
    section-min: "28px"
    total: "30px"
    display-sm: "32px"
    display-md: "38px"
    count: "40px"
    display-lg: "46px"
    mark: "46px"
    display-xl: "54px"
    display-2xl: "64px"
    stat: "72px"
    hero: "96px"
    svg-label: "8.5px"
    svg-meta: "6.5px"
  display-hero:
    fontFamily: "Spectral, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(48px, 6.1vw, 96px)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  display-section:
    fontFamily: "Spectral, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(30px, 3.5vw, 54px)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  display-numeral:
    fontFamily: "Spectral, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(42px, 4.6vw, 72px)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tabular-nums"
  title:
    fontFamily: "Manrope, 'Segoe UI', system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.24
    letterSpacing: "-0.014em"
  body:
    fontFamily: "Manrope, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(15px, 1.02vw, 17px)"
    fontWeight: 400
    lineHeight: 1.66
    letterSpacing: "normal"
  lede:
    fontFamily: "Manrope, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(15px, 1.14vw, 18.5px)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "'Geist Mono', ui-monospace, 'SFMono-Regular', monospace"
    fontSize: "10.5px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.1em"
    fontFeature: "tabular-nums"
rounded:
  hair: "2px"
  soft: "3px"
  pill: "999px"
spacing:
  gutter: "clamp(18px, 3.1vw, 56px)"
  band: "clamp(58px, 8vw, 136px)"
  column-gap: "clamp(16px, 1.5vw, 28px)"
  page-max: "1560px"
  hairline: "1px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-solid-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.ink-64}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-light-solid:
    backgroundColor: "{colors.lume}"
    textColor: "{colors.green}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  add-to-cart:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  add-to-cart-added:
    backgroundColor: "{colors.green}"
    textColor: "{colors.lume}"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.soft}"
    padding: "11px 20px"
  tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-70}"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
  input-text:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.soft}"
    padding: "12px 14px"
  card-product:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.soft}"
    padding: "16px 0 0"
---

# Design System: Collagen Live — Distributor Surface

## Overview

**Creative North Star: "The Cold-Room Print Shop"**

This is the wellness-category canon played straight at a craft bar, executed with print-shop
materials: warm uncoated paper, dry near-black ink, one deep botanical green that drenches whole
sections rather than accenting them, and hairline rules doing every job a card and a shadow would
normally do. Nothing floats. There is no elevation anywhere on the page — depth is made entirely by
opaque plates stacked over one fixed layer of live film, and by tone changes between paper and
green.

The signature device is the **aperture**: the page decodes one video, fixed at the very back at
`z-index: 0`, and everything above it is an opaque plate. Where the film is meant to be seen, a hole
is left in the plate instead of a second video being placed there. The hero and the "живой" half of
the comparison are those two holes. A third, smaller aperture in the green technology section works
by the same grammar but with its own local media: an SVG plate painted the colour of its section
with the jar's glass punched out of it, sitting over a `jar.mp4`. Both cases obey the same rule —
what fills the shape is moving picture, not a photograph of the shape.

Density is editorial rather than promotional: numbered section heads, mono meta labels in the
margins, tabular figures, generous vertical bands, and copy set to a real measure (48ch prose,
54ch lede). The page carries no benefit icons, no discount badges, no drop-shadowed cards, and no
glyph pictograms. Saturated colour is rationed to the film's own orange and cherry.

**Key Characteristics:**
- One fixed film layer; every other surface is an opaque plate or a hole in one.
- Flat by construction — zero `box-shadow` on any surface in the build.
- Hairline rules (1px at 8–18% alpha) instead of containers.
- Spectral for display and every number, Manrope for prose, Geist Mono for every label.
- Green sections are grounds, not accents; they switch the whole ink system via `.on-green`.
- Reveals are one heading (and its immediate lede) per section. Everything else is static.

## Colors

A paper-and-ink press palette with one botanical ground, signalled only in colours sampled from the
client's own film.

### Primary
- **Film Orange** (`#e2701b`): the single signal colour on paper. Section numerals, the italic
  emphasis word in a display heading, the roman numerals in composition, hover fill on the solid
  button, the cart count pip, the "Хит" flag, the shipping-progress bar, `::selection`, and the
  focus ring. Never a background for a whole area.
- **Lifted Orange** (`#f0913a`): the same signal one step brighter, used *only* on green — stat
  numerals, ritual step numbers, footer link hover, the dashed legal note.

### Secondary
- **Botanical Green** (`#17301f`): a ground, not an accent. It fills the technology section, the
  ritual section and the footer edge to edge, and it is the confirmation colour on the add-to-cart
  button and the order-placed tick.
- **Field Green** (`#2b5636`): flavour-tone strip on the two herbal products only.

### Tertiary
- **Cherry** (`#b4222f`), **Gold** (`#c08a2e`), **Olive** (`#7d8f3a`), **Plum** (`#8e1f38`): the
  flavour tone system. These appear *only* as the 3px strip along the bottom edge of a product
  card's image and nowhere else. Cherry additionally serves as the destructive hover colour on the
  cart line's remove control.

### Neutral
- **Warm Paper** (`#f7f3ec`): the page ground and the default plate colour of every section.
- **Second Paper** (`#f0eae0`): the alternating band, and the placeholder behind a card image
  before it loads.
- **Third Paper** (`#e6ddce`): the film layer's own backing, seen only if the video has not painted.
- **Dry Ink** (`#1c1b17`): body text, the solid button, the selected tab.
- **Ink 70 / 52 / 38**: prose, mono labels and captions, struck prices and non-essential meta.
- **Ink 20**: borders and rules only.
- **Lume** (`#f2eee5`) and **Lume 72 / 46**: the same ink ladder inverted for green grounds.

### Named Rules
**The Measured Alpha Rule.** Every ink and lume level that carries text has a measured contrast
ratio in the comment beside it and clears 4.5:1 on its ground — `--ink-70` 6.0:1, `--ink-64` 4.96:1,
`--ink-58` 4.11:1 *(this one is below 4.5:1 and is therefore restricted to struck prices and
non-essential meta that duplicate information available elsewhere)*, `--lume-72` 7.1:1, `--lume-60`
5.4:1, and the drawer's input placeholder 4.67:1. The number in a token's *name* is legacy and is
not its alpha: `--ink-64` is `0.64`, `--ink-58` is `0.58`, `--lume-60` is `0.6`. Change the value,
re-measure, and rewrite the comment; never rename to match.

**The Rules-Only Rule.** `--ink-20` sets borders, hairline dividers and the drawer's progress track.
It never sets text. (`--lume-22` is declared for the same purpose on green but is unused in the
build — the green rules all resolve to `--rule-lume` / `--rule-lume-soft`. Use those.)

**The Sampled-Signal Rule.** Saturated colour on this page comes from the client's film — the citrus
orange and the cherry red — plus the botanical green. Do not introduce a hue that is not already in
the token file; a new flavour tone is the only admissible exception, and it lives on the 3px card
strip.

## Typography

**Display Font:** Spectral (with Georgia, Times New Roman)
**Body Font:** Manrope (with Segoe UI, system-ui)
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular)

**Character:** A light serif at large sizes with negative tracking against a neutral grotesque at a
long measure, refereed by an uppercase mono that handles every label, caption and unit. The serif
never sets a paragraph and the grotesque never sets a headline.

### Hierarchy
- **Display Hero** (Spectral 300, `clamp(48px, 6.1vw, 96px)`, 1.02, `-0.028em`): the hero headline
  only, one word-block per line inside an overflow-clipped span. Its emphasis line is Spectral 600
  italic in Film Orange.
- **Display Section** (Spectral 300, `clamp(30px, 3.5vw, 54px)`, 1.02, `-0.02em`): every section
  headline, via `.disp`. Per-section variants step down to `clamp(28px, 3.2vw, 46–48px)` for the
  shorter heads (benefits, ritual, delivery, footer CTA), and each caps its measure at 12–24ch on
  desktop, uncapped below 900px.
- **Display Numeral** (Spectral, 300 or 400, `clamp(24px, 2.1vw, 32px)` for hero facts up to
  `clamp(42px, 4.6vw, 72px)` for stats, `-0.02` to `-0.03em`, `tabular-nums`): every number that is
  an argument — facts, stats, temperatures, roman type numerals, prices, cart total. Prices are
  Spectral 400 at 18–30px.
- **Title** (Manrope 700, 15–19px, 1.24–1.28, `-0.01em`): card names, benefit and delivery point
  titles, ritual steps, FAQ questions (600 at 16px).
- **Body** (Manrope 400, `clamp(15px, 1.02vw, 17px)`, 1.66, max 48ch): `.prose`, in Ink 70 on paper
  and Lume 72 on green. `strong` goes to weight 700 and full Ink/Lume — the only in-copy emphasis.
  The hero lede runs one step larger at 54ch; FAQ answers run 14.5px at 62ch.
- **Label** (Geist Mono 400, 10.5px, `0.1em`, uppercase, tabular): `.mono` — section names, captions,
  units, meta rows, legal notes. Local sizes step down to 8.5–9.5px with tracking opening to
  `0.11–0.18em`.

### Named Rules
**The Three-Instrument Rule.** Every text node on the page belongs to exactly one of `.disp`
(Spectral), `.prose`/default body (Manrope), or `.mono` (Geist Mono). There is no fourth voice, and
no instrument borrows another's job — a heading is never Manrope, a paragraph is never Spectral, and
any label, unit or caption is Geist Mono.

**The Tabular Number Rule.** Anything numeric carries `.num` (`font-variant-numeric: tabular-nums`),
which `.mono` also sets by default. Prices, quantities, percentages and temperatures must not shift
horizontally when they change.

**The Italic-Is-the-Argument Rule.** Italic on this page means one thing: the pivot word of a
headline, set with `<em>` inside `.disp`, which renders italic in Film Orange. Do not use italic for
emphasis in prose (that is `strong`), and do not use it decoratively.

### Size ramp

Two ramps, both enumerated in the frontmatter `typography.scale` so the detector can check literal
values against them.

**Fixed sizes** were consolidated from 27 drifting values — 13px next to 13.5px next to 13.8px, 14px
next to 14.2px — that were accidents of authoring rather than decisions.

**Fluid `clamp()` endpoints** had the same drift (22 distinct values) and were snapped to a 12-step
display ramp: 15 · 17 · 19 · 24 · 28 · 32 · 38 · 46 · 54 · 64 · 72 · 96. Only the endpoints are on
the ramp; the `vw` term between them stays free.

| px | used for |
|---|---|
| 9.5 | micro mono: rail sub-label, chips, captions, legal, fine print |
| 10.5 | `.mono` default — section heads, meta rows, tags |
| 12 | quantity stepper, struck hero price |
| 13.5 | card note, footer link, small prose |
| 14.5 | UI text: rail links, buttons, spec rows, list bodies |
| 15 | drawer line title, verdict copy, form input |
| 16 | document base, FAQ question, benefit and delivery titles |
| 19 | card title |
| 21 | rail wordmark, SKU label |
| 26 | drawer heading, footer mark |
| 30 | drawer total |
| 40 | composition count numerals |
| 46 | preloader mark |

**Exempt:** the three `.jar__*` sizes (16 / 8.5 / 6.5) are SVG user units inside a 320-wide
`viewBox`, not CSS pixels. They scale with the artwork and are not on this ramp. Anything else that
sets a literal size in SVG user space is exempt on the same grounds; say so in a comment.

## Layout

The page is a single centred column of `1560px` max width (`--page`) with a fluid gutter
(`--gut`, `clamp(18px, 3.1vw, 56px)`) applied by `.shell`. A 12-column grid (`.grid12`) with a
`clamp(16px, 1.5vw, 28px)` column gap is available, but most sections compose with explicit
asymmetric two- and three-column `grid-template-columns` in fractional ratios (1.35/1, 1/0.82,
1.25/0.75, 0.92/1.08) — the asymmetry is the editorial signal.

Vertical rhythm is one token: `--band` (`clamp(58px, 8vw, 136px)`) as `padding-block` on `.sec`.
Everything inside a section spaces itself in clamps anchored to that band —
`clamp(36px, 4vw, 62px)` from section head to headline, `clamp(40px, 4.4vw, 70px)` from headline to
the main grid, `clamp(48px, 5.4vw, 92px)` before a second body block.

Every section opens with `.sec-head`: a baseline-aligned flex row, a two-digit section number in
Film Orange beside the section name in mono on the left, a mono qualifier on the right, closed by a
hairline bottom rule. Numbering runs 01–06 across the page; the right-hand qualifier is dropped
below 760px.

**Responsive.** The page is authored desktop-first with four breakpoints, and it collapses in
reading order rather than reflowing:
- **≤1180px** — nav gap tightens, three-column lists become two, benefits become 2×2, footer becomes
  1.4fr + 2 columns.
- **≤900px** — nav links and phone number leave the rail entirely (wordmark + cart only); every
  two-column pairing becomes one column; the technology jar and the benefits photo take `order: -1`
  so the image leads on a phone; hero switches to `100svh`.
- **≤760px** — the three videos are gone (see the Aperture rules below); hero facts become a 2×2
  quadrant divided by hairlines; the shop grid becomes single-column; the cart drawer goes
  full-width and drops its left border.
- **≤460px** — remaining grids go single-column, buttons go full-width, tabs stretch to fill.
- **`(hover: none)`** — the card image zoom is disabled; no information is hover-only anywhere.

## Elevation & Depth

**There are no shadows on this page.** Not one `box-shadow` exists in the stylesheets. Depth is
built two ways and only two ways: (1) **stacking** — one fixed film at `z-index: 0`, opaque
paper/green plates at `z-index: 1`, the rail at 60, the cart drawer at 200, the preloader at 300, and
a fixed grain veil at 40 sitting above the content but below the drawer; and (2) **tone** — a paper
section against a green section, or `--paper-2` against `--paper`.

The only two `text-shadow` values in the build are functional, not decorative: the temperature
figures laid over the comparison media carry a wide soft halo (`0 1px 24px rgba(0,0,0,0.45)` on the
dark half, `0 1px 20px rgba(247,243,236,0.85)` on the light half) purely so a large numeral stays
legible over moving picture.

Atmosphere is two flat alpha layers: a fixed grain (`noise.svg`, 180px tile, `opacity: 0.2`) and a
warm radial wash over the film (`rgba(226,112,27,0.1)` to `rgba(28,27,23,0.16)`).

### Named Rules
**The No-Blend Rule.** No `mix-blend-mode` on any full-viewport layer, ever. A blended full-screen
layer folds the entire page into one composited group and repaints it on every scroll frame. Plain
alpha reaches the same look for free — both the grain and the warm wash are plain alpha.

**The Flat Plate Rule.** A surface earns separation by being a different tone or by having a hairline
drawn along it. It does not get a shadow, a lift, or a border-radius above 3px. Product cards, the
benefits grid, the composition lists and the delivery points are all borderless blocks separated by
a single 1px top rule.

**The Verifiable-Render Rule.** `content-visibility: auto` was implemented on `.sec` and deliberately
removed; the comment at its former site records why — whole sections came back blank from every
screenshot pipeline, and a render nobody can verify is worse than a render nobody optimised. Do not
reintroduce it without first solving the verification problem. The performance work lives elsewhere:
no blended full-screen layers, videos paused the moment they are covered, posters instead of video
below 760px.

## Shapes

The form language is rectangular and hairline-drawn. Two radii exist: **soft** (3px) on anything with
a photographic or input surface — card media, section figures, text inputs, tabs, the dashed legal
notes, the cart line thumbnail — and **pill** (999px) on anything that is pressed or counted:
buttons, chips, the cart control, the "Хит" flag, the quantity stepper, the close and tick discs.
Nothing else is rounded; sections, plates, tables of figures and photo bleeds are square.

Borders are always `var(--hair)` (1px) and always one of the four rule tokens or `--ink-20`, never
full-strength ink. Rules are used as *organisers*: a rule under a section head, a rule above every
grid cell, a rule above a price row, a rule between FAQ entries. Two dashed borders exist, both on
legal/demo notices, both in orange.

Media aspect ratios are declared, never inherited: 16/10 (comparison, dropping to 16/9 below 900px),
20/9 for the full-bleed plate (4/3 below 760px), 4/3 for card media (16/10 below 760px), 4/5 and 5/4
for the editorial figures, 8/5 for the ritual figure, and 320/372 for the jar aperture — the squat
proportion of the real 0.5 kg tin.

### Named Rules
**The Definite-Box Rule.** `img, svg, video` carry `height: auto` in the reset and it is
load-bearing. Without it, the `width`/`height` attributes make the box definite and *every*
`aspect-ratio` in the stylesheet is silently ignored. Keep the attributes (they reserve layout), keep
`height: auto`.

**The Aperture Rule.** A section that contains an aperture must not paint its own background. The
page has one fixed film at `z-index: 0`; sections above it are opaque plates, and an aperture is a
hole left in the plate. `.sec.compare` therefore sets `background: transparent` and lets its
children (`.compare__plate`, `.chalf__body`, `.compare__foot`) paint paper individually, while
`.chalf--live` and its media stay transparent so the film shows through. Painting a background on the
section, on `.chalf--live`, or on the media box closes the hole. This was gotten wrong three times
during the build.

**The One-Decode Rule.** The fixed film serves both of its apertures with a single decode and pauses
itself once the technology section covers it. Every other video is scoped, IntersectionObserver-
paused, and never more than one at a time. Do not add a second full-frame video to serve a second
window — cut a hole instead.

**The Inset-Centring Rule.** Framer Motion owns `transform` on `.film__v`. Any element whose
transform is animated from JS is centred by `inset: 0; width: 100%; height: 100%` alone — a centring
translate written in CSS is overwritten at runtime and the media renders off-centre.

## Components

### Buttons
- **Shape:** full pill (999px), 1px transparent border, `overflow: hidden` with an `::before` fill
  layer beneath the label.
- **Primary (`.btn--solid`):** dry ink fill, paper label, Manrope 600 at 14.5px, 15px/26px padding.
- **Hover:** the fill layer transitions ink → Film Orange over 0.3s; the label does not move.
- **Ghost (`.btn--ghost`):** ink label on a 20%-ink hairline border; on hover the ink fill scales
  from 0.4 to 1 over 0.44s on `--ease-out` and the label inverts to paper.
- **Disabled:** its own state, not a faded primary — the fill is removed entirely, leaving an Ink 52
  label inside an Ink 20 hairline, so the enabled button stays the only filled dark pill in view.
- **On green (`.btn--light`):** the same two variants inverted — lume fill with green label (hover to
  Lifted Orange), or lume label on a lume-rule hairline.

### Chips
- **Style:** pill, 1px Ink 20 border, transparent ground, 9.5px Ink 70 label, 6px/13px padding.
- **Affirmative variant (`.comp__chips--ok`):** green border at 32%, green label, 5% green wash — used
  for the "free from" list.

### Cards / Containers
- **Corner Style:** the card itself is unenclosed; only its media has a 3px radius.
- **Background:** none. The card sits directly on the section's paper; the media placeholder is
  `--paper-2`.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** a single hairline above the price row. No outline around the card.
- **Internal Padding:** 16px above the body, 14px above the price row; the body is a 4-row grid
  (`auto auto 1fr auto`) so price rows align across the whole row regardless of copy length.
- **Distinctive:** a 3px flavour-tone strip pinned to the bottom edge of the media, and a 1.045×
  image zoom on hover over 0.8s (disabled on coarse pointers).

### Inputs / Fields
- **Style:** white ground, 1px Ink 20 border, 3px radius, 12px/14px padding, 15px Manrope. Label
  above in mono.
- **Focus:** border goes to full ink; the browser outline is suppressed on the field itself but the
  global `:focus-visible` ring (2px Film Orange, 3px offset) governs every other control.
- **Placeholder:** `rgba(28,27,23,0.62)` — measured at 4.67:1.

### Navigation
- **Rail:** fixed, full width, transparent with a transparent bottom hairline; once scrolled it
  transitions to a 94%-opaque paper ground with a rule beneath, over 0.38s. Three-column grid:
  wordmark (Spectral 400/21px over an 8.5px mono descriptor), centred links, right cluster.
- **Links:** 14px Ink 70, going to full ink on hover with a 1px Film Orange underline that scales
  from the left over 0.34s.
- **Cart control:** pill with an Ink 20 hairline, inline SVG glyph at 16px, mono label, and an orange
  count pip; hover darkens the border and adds a 4% ink wash.
- **Mobile:** below 900px the links and phone leave entirely; below 460px the cart label is hidden
  and only the icon and count remain.

### FAQ (signature)
Each entry is a full-width button between hairlines. The marker is two 1px CSS bars forming a plus;
the vertical bar rotates to horizontal on open. The panel animates
`grid-template-rows: 0fr → 1fr` over 0.44s with the paragraph clipped by `overflow: hidden` — height
is never animated and no fixed height is measured.

### Jar Aperture (signature)
An SVG plate painted the colour of its host section (`--paper` or `--green`), with the jar's body
path punched out by `fill-rule: evenodd`, laid over a video. The glass contents, highlights, label
band, thread ring, knurled lid and fill line are painted back on top in SVG. The video is biased
`object-position: 61% 46%` so the glass fills with citrus peel rather than pale ground. On green it
carries no frame at all, so it reads as a hole rather than an illustration.

### Cart Drawer
Right-anchored panel, `min(460px, 92vw)`, paper ground, left hairline, three-row grid with a sticky
head. It slides on `x: 100% → 0` behind a `rgba(23,27,22,0.42)` veil. Line items are a
74px / 1fr / 24px grid separated by soft hairlines; quantity is a pill stepper; the free-shipping
threshold is a 2px orange bar that scales on its X axis. Below 760px it goes full width.

## Do's and Don'ts

### Do:
- **Do** leave a section transparent when it contains an aperture and let its inner plates paint the
  paper instead (`.sec.compare` is the worked example).
- **Do** keep `height: auto` on `img, svg, video` and keep the intrinsic `width`/`height` attributes.
- **Do** centre any JS-animated media box with `inset: 0` and full width/height, never a CSS
  translate.
- **Do** separate surfaces with a 1px rule token and a tone change; that is the whole depth system.
- **Do** set every number in Spectral with `tabular-nums`, and every label, unit and caption in
  uppercase Geist Mono at `0.1em`.
- **Do** measure the contrast of any new text-bearing alpha, clear 4.5:1, and record the ratio in a
  comment beside the token.
- **Do** swap video for its poster still in React below 760px and under `prefers-reduced-data` —
  `useStills()` — rather than hiding it in CSS, so the file is never fetched.
- **Do** pause every video the moment it leaves the viewport (`usePlayInView`), and pause the fixed
  film once the technology section covers it.
- **Do** animate only `transform` and `opacity`.
- **Do** cap prose at its measure: 48ch for `.prose`, 54ch for the hero lede, 62ch for FAQ answers.

### Don't:
- **Don't** paint a background on a section that holds an aperture, on `.chalf--live`, or on an
  aperture's media box. *(The green technology section and the footer do paint their own ground and
  are correct to: the footer holds no aperture at all, and the jar aperture carries its own local
  plate colour rather than showing the fixed film.)*
- **Don't** put `mix-blend-mode` on any full-viewport layer.
- **Don't** reintroduce `content-visibility: auto` without solving the screenshot-verification
  problem it caused.
- **Don't** add a `box-shadow`. There are none in the build and none belong here; `text-shadow` is
  admissible only as a legibility halo over moving picture.
- **Don't** add a second full-frame video to serve a second window. Cut a hole in the plate.
- **Don't** reveal list items, cards, stats, grid cells, or figures other than the one already
  animating per section. **Reveals are one heading — plus, where the build already does it, its
  immediate lede paragraph — per section**, an `opacity 0 → 1` with a 22–26px rise over 0.8–1s on
  `cubic-bezier(0.16, 1, 0.3, 1)`, `viewport: { once: true }`. The hero's clipped word-rise is the
  only pure-transform reveal (`y: 110% → 0` inside an `overflow: hidden` span, 0.07s stagger). The
  shop card's enter/exit is the one exception and it is functional: tab-switch feedback under
  `AnimatePresence initial={false}`, so it never plays on first paint.
- **Don't** use `--ink-20` (or any rule token) for text, and don't use `--ink-58` for text a user
  must read — it measures 4.11:1 and is reserved for struck prices and duplicate meta.
- **Don't** introduce a hue outside the token file, and don't promote a flavour tone off the 3px card
  strip.
- **Don't** add benefit icons, glyph pictograms, kickers/eyebrows above headings, discount badges, or
  outlined cards. The section number in `.sec-head` is the only label that precedes a heading, and it
  is a numbered index, not a kicker.
- **Don't** exceed 3px radius on anything that is not a pill.
- **Don't** make any content reachable only on hover; `(hover: none)` must lose nothing.
