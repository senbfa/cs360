---
version: alpha
name: Temenos Core Design System (CDS)
description: >-
  CDS is the LIT v3 web-component design system in packages/web of unified-ux.
  Tokens are generated from Figma via Style Dictionary into SCSS
  (packages/web/src/theme/tokens/_global.scss = primitive ramps,
  _cds.scss = semantic + component tokens) and surfaced as CSS custom properties
  under the .cds container class in packages/web/src/theme/base.scss. Components
  consume them through --uwc-* aliases. Token NAMES and VALUES in this file mirror
  the real CSS custom properties (a token `brand-default` = `var(--brand-default)`).
  Front-matter holds the normative LIGHT values; dark theme (.cds.cds-dark /
  html.uux-dark) remaps the same semantic tokens and is documented in prose.
colors:
  # ===== Brand (Warm Blue) — the primary role =====
  # `primary` is design.md's canonical anchor; in CDS it IS --brand-default.
  primary: "#293276"
  brand-default: "#293276"
  brand-light: "#4a57ba"
  brand-dark: "#21285e"
  brand-darkest: "#171e5a"
  brand-lightest: "#d8dae9"
  brand-muted: "#d8dae9"
  brand-foreground: "#ffffff"
  brand-states-hover: "rgba(48,59,130,0.04)"
  brand-states-selected: "rgba(48,59,130,0.08)"
  brand-states-focus: "rgba(48,59,130,0.30)"
  brand-states-outlinedborder: "rgba(48,59,130,0.50)"
  # ===== Accent 1 (Energy Violet) — secondary =====
  accent-1-default: "#925fb9"
  accent-1-light: "#c2aed0"
  accent-1-lightest: "#d3c7dc"
  accent-1-dark: "#8246af"
  accent-1-darkest: "#55356e"
  accent-1-foreground: "#ffffff"
  accent-1-states-hover: "rgba(130,70,175,0.04)"
  accent-1-states-selected: "rgba(130,70,175,0.08)"
  accent-1-states-outlinedborder: "rgba(130,70,175,0.50)"
  # ===== Accent 2 (Renewal Green) — tertiary =====
  accent-2-default: "#51afa9"
  accent-2-light: "#dee8e8"
  accent-2-lightest: "#cadedc"
  accent-2-dark: "#73bfba"
  accent-2-darkest: "#3c7c78"
  accent-2-foreground: "#ffffff"
  accent-2-states-hover: "rgba(78,176,168,0.04)"
  accent-2-states-selected: "rgba(78,176,168,0.08)"
  accent-2-states-outlinedborder: "rgba(78,176,168,0.50)"
  # ===== Text =====
  text-default: "#212121"
  text-secondary: "#455a64"
  text-disabled: "#9e9e9e"
  text-brandtext: "#21285e"
  text-brandtext-muted: "#d8dae9"
  # ===== Surfaces =====
  background-default: "#ffffff"
  background-paper: "#ffffff"
  # ===== Interaction states, dividers & focus =====
  divider: "rgba(0,0,0,0.12)"
  action-hover: "rgba(0,0,0,0.04)"
  action-selected: "rgba(0,0,0,0.08)"
  action-disabled: "rgba(0,0,0,0.26)"
  action-active: "rgba(0,0,0,0.54)"
  action-disabled-background: "rgba(0,0,0,0.12)"
  text-states-hover: "rgba(0,0,0,0.04)"
  error-states-hover: "rgba(211,47,47,0.04)"
  focus-halo: "#c2aed0"
  icons-icons-contrast-color: "#263238"
  # ===== Status: Error (Red) =====
  error-default: "#ea0005"
  error-dark: "#b60c0f"
  error-darkest: "#861315"
  error-light: "#dd787a"
  error-lightest: "#e6dada"
  error-foreground: "#ffffff"
  # ===== Status: Warning (Amber) =====
  warning-default: "#9e6309"
  warning-dark: "#7f5310"
  warning-darkest: "#7f5310"
  warning-light: "#eba337"
  warning-lightest: "#e4d1b4"
  warning-foreground: "#ffffff"
  # ===== Status: Success (Green) =====
  success-default: "#076911"
  success-dark: "#0c5513"
  success-darkest: "#0c5513"
  success-light: "#1dcd2f"
  success-lightest: "#acd2b0"
  success-foreground: "#ffffff"
  # ===== Status: Info (Warm Blue) =====
  info-default: "#4a57ba"
  info-dark: "#171e5a"
  info-darkest: "#161a36"
  info-light: "#acb1d8"
  info-lightest: "#acb1d8"
  info-foreground: "#ffffff"
  # ===== Neutral ramp (Grey) =====
  grey-50: "#fafafa"
  grey-100: "#f5f5f5"
  grey-200: "#eeeeee"
  grey-300: "#e0e0e0"
  grey-400: "#bdbdbd"
  grey-500: "#9e9e9e"
  grey-600: "#757575"
  grey-700: "#616161"
  grey-800: "#424242"
  grey-900: "#212121"
  grey-1000: "#121212"
  # ===== Component tokens (--components-*) =====
  components-input-filled-enabledfill: "#eff4fb"
  components-input-filled-hoverfill: "#e9f0fa"
  components-input-outlined-enabledborder: "#d8dae9"
  components-input-outlined-hoverborder: "#4a57ba"
  components-input-standard-enabledborder: "#d8dae9"
  components-input-standard-hoverborder: "#4a57ba"
  components-table-border: "#e0e0e0"
  components-table-column-and-footerfill: "#fafafa"
  components-tooltip-fill: "#263238"
  components-app-bar-defaultfill: "#f5f5f5"
  components-backdrop-fill: "rgba(21,23,41,0.6)"
  components-chip-defaultenabledborder: "#bdbdbd"
  components-chip-defaulthoverfill: "rgba(0,0,0,0.12)"
  components-rating-activefill: "#eba337"
  components-stepper-connector: "#bdbdbd"
  components-breadcrumbs-collapsefill: "#f5f5f5"
  components-avatar-brand-avatar: "#21285e"
  components-alert-error-background: "#f4f0f0"
  components-alert-error-color: "#1b0e0e"
  components-alert-warning-background: "#f4f3f0"
  components-alert-warning-color: "#1a150f"
  components-alert-info-background: "#f0f1f5"
  components-alert-info-color: "#3a46a1"
  components-alert-success-background: "#f0f4f1"
  components-alert-success-color: "#0c5513"
  components-switch-slidefill: "#000000"
  components-switch-knobfillenabled: "#fafafa"
  components-switch-knowfilldisabled: "#f5f5f5"
  # ===== Charting categorical palette (--charting-color-category-*) =====
  charting-color-category-1: "#581393"
  charting-color-category-2: "#303b82"
  charting-color-category-3: "#26a69a"
  charting-color-category-4: "#c0ca33"
  charting-color-category-5: "#eb3693"
  charting-color-category-6: "#c8a1ff"
  charting-color-category-7: "#d602ee"
  charting-color-category-8: "#6200ee"
  charting-color-category-9: "#3b00ed"
  charting-color-category-10: "#d81b60"
  charting-color-category-11: "#ee6002"
  charting-color-category-12: "#ffc107"
  charting-color-category-error: "#b00020"
  charting-color-category-success: "#43a047"
  charting-color-category-warning: "#ff9800"
  # ===== Charting structure (--charting-base-*) =====
  charting-base-chart-title: "#212121"
  charting-base-chart-subtitle: "rgba(0,0,0,0.6)"
  charting-base-axis-and-legendlabel: "rgba(0,0,0,0.6)"
  charting-base-baseaxis: "rgba(0,0,0,0.24)"
  charting-base-gridline: "rgba(0,0,0,0.12)"
  charting-base-gray: "#e0e0e0"
  charting-base-lightgray: "#eeeeee"
  charting-base-surface: "#ffffff"
  charting-base-tooltip: "#ffffff"
typography:
  # Display / super-heading scale (--typography-s*) — Utile
  s1:
    fontFamily: Utile
    fontSize: 3rem
    fontWeight: "700"
    lineHeight: 1.2
  s2:
    fontFamily: Utile
    fontSize: 2.75rem
    fontWeight: "700"
    lineHeight: 1.2
  s3:
    fontFamily: Utile
    fontSize: 2.5rem
    fontWeight: "700"
    lineHeight: 1.2
  s4:
    fontFamily: Utile
    fontSize: 2.25rem
    fontWeight: "600"
    lineHeight: 1.2
  s5:
    fontFamily: Utile
    fontSize: 2rem
    fontWeight: "600"
    lineHeight: 1.25
  s6:
    fontFamily: Utile
    fontSize: 1.75rem
    fontWeight: "600"
    lineHeight: 1.25
  # Headings (--typography-h*)
  h1:
    fontFamily: Utile
    fontSize: 2.4rem
    fontWeight: "700"
    lineHeight: 1.2
  h2:
    fontFamily: Utile
    fontSize: 2.2rem
    fontWeight: "700"
    lineHeight: 1.2
  h3:
    fontFamily: Utile
    fontSize: 1.875rem
    fontWeight: "600"
    lineHeight: 1.25
  h4:
    fontFamily: Utile
    fontSize: 1.5rem
    fontWeight: "600"
    lineHeight: 1.3
  h5:
    fontFamily: Utile
    fontSize: 0.875rem
    fontWeight: "600"
    lineHeight: 1.4
  h6:
    fontFamily: Utile
    fontSize: 0.75rem
    fontWeight: "600"
    lineHeight: 1.4
  # Subtitles (--typography-subtitle*)
  subtitle1:
    fontFamily: Work Sans
    fontSize: 1rem
    fontWeight: "500"
    lineHeight: 1.5
  subtitle2:
    fontFamily: Work Sans
    fontSize: 0.875rem
    fontWeight: "500"
    lineHeight: 1.5
  # Body (--typography-body*)
  body1:
    fontFamily: Work Sans
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: 1.5
  body2:
    fontFamily: Work Sans
    fontSize: 0.875rem
    fontWeight: "400"
    lineHeight: 1.5
  body3:
    fontFamily: Work Sans
    fontSize: 0.75rem
    fontWeight: "400"
    lineHeight: 1.5
  body4:
    fontFamily: Work Sans
    fontSize: 0.625rem
    fontWeight: "400"
    lineHeight: 1.5
  # Meta (--typography-overline / --typography-caption)
  overline:
    fontFamily: Work Sans
    fontSize: 0.75rem
    fontWeight: "600"
    lineHeight: 1.4
    letterSpacing: "0.08em"
  caption:
    fontFamily: Work Sans
    fontSize: 0.75rem
    fontWeight: "400"
    lineHeight: 1.4
rounded:
  # Keys mirror the raw --radius-* tokens
  radius-0: 0px
  radius-4: 0.25rem
  radius-8: 0.5rem
  radius-12: 0.75rem
  radius-16: 1rem
  radius-20: 1.25rem
  radius-24: 1.5rem
  radius-28: 1.75rem
  radius-32: 2rem
  radius-999: 62.4375rem
spacing:
  # Curated subset of the --spacing-* ramp (rem); full ramp documented in Layout
  none: 0px
  xxs: 0.25rem
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 2.5rem
  3xl: 4rem
  4xl: 7rem
components:
  # ===== Buttons (brand = primary) =====
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.brand-foreground}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-999}"
    height: 40px
    padding: 0 16px
  button-primary-hover:
    backgroundColor: "{colors.brand-dark}"
  button-primary-active:
    backgroundColor: "{colors.brand-darkest}"
  button-primary-focus:
    backgroundColor: "{colors.brand-states-focus}"
  button-primary-selected:
    backgroundColor: "{colors.brand-states-selected}"
  button-ghost-hover:
    backgroundColor: "{colors.brand-states-hover}"
  button-outlined:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.brand-default}"
    borderColor: "{colors.brand-states-outlinedborder}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-999}"
    height: 40px
    padding: 0 16px
  button-text:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.brand-default}"
    typography: "{typography.body1}"
  button-secondary:
    backgroundColor: "{colors.accent-1-default}"
    textColor: "{colors.accent-1-foreground}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-999}"
    height: 40px
    padding: 0 16px
  button-secondary-hover:
    backgroundColor: "{colors.accent-1-dark}"
  button-secondary-ghost-hover:
    backgroundColor: "{colors.accent-1-states-hover}"
  button-secondary-selected:
    backgroundColor: "{colors.accent-1-states-selected}"
  button-secondary-outlined:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.accent-1-default}"
    borderColor: "{colors.accent-1-states-outlinedborder}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-999}"
    height: 40px
    padding: 0 16px
  button-tertiary:
    backgroundColor: "{colors.accent-2-default}"
    textColor: "{colors.accent-2-foreground}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-999}"
    height: 40px
    padding: 0 16px
  button-tertiary-hover:
    backgroundColor: "{colors.accent-2-dark}"
  button-tertiary-ghost-hover:
    backgroundColor: "{colors.accent-2-states-hover}"
  button-tertiary-selected:
    backgroundColor: "{colors.accent-2-states-selected}"
  button-tertiary-outlined:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.accent-2-darkest}"
    borderColor: "{colors.accent-2-states-outlinedborder}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-999}"
    height: 40px
    padding: 0 16px
  button-destructive:
    backgroundColor: "{colors.error-default}"
    textColor: "{colors.error-foreground}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-999}"
    height: 40px
    padding: 0 16px
  button-destructive-hover:
    backgroundColor: "{colors.error-dark}"
  # ===== Filled inputs (default variant) =====
  input-filled:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  input-filled-hover:
    backgroundColor: "{colors.components-input-filled-hoverfill}"
  input-outlined:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-input-outlined-enabledborder}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  input-outlined-hover:
    borderColor: "{colors.components-input-outlined-hoverborder}"
  input-disabled:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-disabled}"
    typography: "{typography.body1}"
  input-label:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body3}"
  input-label-focused:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.brand-default}"
    typography: "{typography.body3}"
  input-error:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.error-default}"
    borderColor: "{colors.error-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  # ===== Surfaces =====
  card:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.grey-300}"
    rounded: "{rounded.radius-12}"
    padding: "{spacing.lg}"
  dialog:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    rounded: "{rounded.radius-12}"
    padding: "{spacing.lg}"
  menu:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.grey-300}"
    rounded: "{rounded.radius-8}"
    padding: "{spacing.xs}"
  app-bar:
    backgroundColor: "{colors.components-app-bar-defaultfill}"
    textColor: "{colors.text-default}"
    height: 64px
  tooltip:
    backgroundColor: "{colors.components-tooltip-fill}"
    textColor: "{colors.brand-foreground}"
    typography: "{typography.body3}"
    rounded: "{rounded.radius-4}"
    padding: 4px 8px
  # ===== Data display =====
  table-header-cell:
    backgroundColor: "{colors.components-table-column-and-footerfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.subtitle2}"
    padding: 12px 16px
  table-cell:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-table-border}"
    typography: "{typography.body2}"
    padding: 12px 16px
  table-row-hover:
    backgroundColor: "{colors.brand-states-hover}"
  table-row-selected:
    backgroundColor: "{colors.brand-states-selected}"
  chip:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-chip-defaultenabledborder}"
    typography: "{typography.body3}"
    rounded: "{rounded.radius-16}"
    height: 30px
    padding: 0 8px
  chip-hover:
    backgroundColor: "{colors.components-chip-defaulthoverfill}"
  avatar:
    backgroundColor: "{colors.components-avatar-brand-avatar}"
    textColor: "{colors.brand-foreground}"
    typography: "{typography.body2}"
    rounded: "{rounded.radius-999}"
    height: 40px
    width: 40px
  badge:
    backgroundColor: "{colors.error-default}"
    textColor: "{colors.error-foreground}"
    typography: "{typography.body4}"
    rounded: "{rounded.radius-999}"
  stepper-connector:
    backgroundColor: "{colors.components-stepper-connector}"
  breadcrumb-collapse:
    backgroundColor: "{colors.components-breadcrumbs-collapsefill}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.radius-4}"
    padding: 0 8px
  # ===== Feedback (alerts) =====
  alert-error:
    backgroundColor: "{colors.components-alert-error-background}"
    textColor: "{colors.error-default}"
    rounded: "{rounded.radius-4}"
    padding: "{spacing.md}"
  alert-warning:
    backgroundColor: "{colors.components-alert-warning-background}"
    textColor: "{colors.warning-default}"
    rounded: "{rounded.radius-4}"
    padding: "{spacing.md}"
  alert-info:
    backgroundColor: "{colors.components-alert-info-background}"
    textColor: "{colors.info-default}"
    rounded: "{rounded.radius-4}"
    padding: "{spacing.md}"
  alert-success:
    backgroundColor: "{colors.components-alert-success-background}"
    textColor: "{colors.success-default}"
    rounded: "{rounded.radius-4}"
    padding: "{spacing.md}"
  # ===== Additional actions =====
  button-toggle:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body2}"
    rounded: "{rounded.radius-16}"
    height: 32px
    padding: 0 12px
  button-toggle-selected:
    backgroundColor: "{colors.brand-default}"
    textColor: "{colors.brand-foreground}"
  icon-button:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-default}"
    rounded: "{rounded.radius-999}"
    height: 44px
    width: 44px
  icon-button-hover:
    backgroundColor: "{colors.action-hover}"
  icon-button-small:
    height: 30px
    width: 30px
  # ===== Additional form inputs =====
  text-area:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    padding: 0 12px
  select:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  checkbox:
    backgroundColor: "{colors.background-default}"
    borderColor: "{colors.action-active}"
    textColor: "{colors.brand-default}"
    size: 18px
  checkbox-checked:
    backgroundColor: "{colors.brand-default}"
    textColor: "{colors.brand-foreground}"
  checkbox-disabled:
    textColor: "{colors.action-disabled}"
  checkbox-group:
    textColor: "{colors.text-default}"
    typography: "{typography.body2}"
  radio:
    backgroundColor: "{colors.background-default}"
    borderColor: "{colors.grey-300}"
    textColor: "{colors.brand-default}"
    size: 20px
  radio-checked:
    backgroundColor: "{colors.brand-default}"
    textColor: "{colors.brand-foreground}"
  radio-disabled:
    textColor: "{colors.action-disabled}"
  radio-group:
    textColor: "{colors.text-default}"
    typography: "{typography.body2}"
  switch-track:
    backgroundColor: "{colors.components-switch-slidefill}"
    height: 14px
    rounded: "{rounded.radius-8}"
  switch-track-on:
    backgroundColor: "{colors.brand-default}"
  switch-thumb:
    backgroundColor: "{colors.components-switch-knobfillenabled}"
    rounded: "{rounded.radius-999}"
  switch-track-disabled:
    backgroundColor: "{colors.action-disabled-background}"
    rounded: "{rounded.radius-8}"
  switch-thumb-disabled:
    backgroundColor: "{colors.components-switch-knowfilldisabled}"
    rounded: "{rounded.radius-999}"
  slider-track:
    backgroundColor: "{colors.grey-300}"
    height: 6px
  slider-track-active:
    backgroundColor: "{colors.brand-default}"
  slider-thumb:
    backgroundColor: "{colors.brand-default}"
  amount-field:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  form-field:
    textColor: "{colors.text-secondary}"
    typography: "{typography.body2}"
  combobox:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  combobox-chip:
    backgroundColor: "{colors.brand-states-hover}"
    textColor: "{colors.text-default}"
    typography: "{typography.body3}"
    rounded: "{rounded.radius-16}"
    height: 24px
    padding: 0 8px
  text-field-picker:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  autocomplete:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
  # ===== Additional surfaces & overlays =====
  drawer:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    padding: "{spacing.lg}"
  expandable-card:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-table-border}"
    rounded: "{rounded.radius-12}"
    padding: "{spacing.lg}"
  accordion:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.divider}"
    rounded: "{rounded.radius-12}"
    padding: 12px 16px
  expansion-panel:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.divider}"
    rounded: "{rounded.radius-8}"
  snackbar:
    backgroundColor: "{colors.brand-default}"
    textColor: "{colors.brand-foreground}"
    typography: "{typography.body2}"
    rounded: "{rounded.radius-4}"
    padding: 12px 16px
  linear-progress-track:
    backgroundColor: "{colors.grey-200}"
    height: 4px
  linear-progress-bar:
    backgroundColor: "{colors.brand-default}"
  skeleton:
    backgroundColor: "{colors.grey-100}"
    rounded: "{rounded.radius-4}"
  divider:
    backgroundColor: "{colors.divider}"
    height: 1px
  icon:
    textColor: "{colors.icons-icons-contrast-color}"
    size: 24px
  icon-small:
    size: 20px
  icon-large:
    size: 36px
  # ===== Data display & navigation =====
  list:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    typography: "{typography.body2}"
  list-item:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    typography: "{typography.body2}"
    height: 48px
    padding: 0 16px
  list-item-hover:
    backgroundColor: "{colors.action-hover}"
  list-item-selected:
    backgroundColor: "{colors.brand-states-selected}"
  tab:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body2}"
    height: 48px
    padding: 0 16px
  tab-selected:
    textColor: "{colors.brand-default}"
  tab-bar:
    backgroundColor: "{colors.background-paper}"
    borderColor: "{colors.divider}"
    height: 48px
  breadcrumb-link:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.brand-dark}"
    typography: "{typography.body2}"
  breadcrumb-current:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body2}"
  navigation-rail:
    backgroundColor: "{colors.brand-dark}"
    textColor: "{colors.brand-foreground}"
    width: 72px
    padding: "{spacing.sm}"
  navigation-rail-item-hover:
    backgroundColor: "{colors.brand-states-hover}"
  tree:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    typography: "{typography.body2}"
  tree-item-hover:
    backgroundColor: "{colors.brand-states-hover}"
  tree-item-disabled:
    backgroundColor: "{colors.grey-100}"
    textColor: "{colors.text-disabled}"
  notifications-panel:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    width: 380px
    padding: "{spacing.md}"
  error-summary:
    backgroundColor: "{colors.components-alert-error-background}"
    textColor: "{colors.error-default}"
    rounded: "{rounded.radius-4}"
    padding: "{spacing.md}"
  grid:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-table-border}"
    rounded: "{rounded.radius-12}"
  grid-box-primary:
    borderColor: "{colors.brand-default}"
  table-pagination:
    backgroundColor: "{colors.components-table-column-and-footerfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body3}"
    padding: 0 16px
  # ===== Hierarchy control cluster =====
  hierarchy-field:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  hierarchy-search-field:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body2}"
    rounded: "{rounded.radius-4}"
  hierarchy-chip:
    backgroundColor: "{colors.brand-states-hover}"
    textColor: "{colors.text-default}"
    typography: "{typography.body3}"
    rounded: "{rounded.radius-16}"
    height: 24px
  hierarchy-search-menu:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-table-border}"
    rounded: "{rounded.radius-12}"
    padding: "{spacing.xs}"
  hierarchy-search-menu-item-hover:
    backgroundColor: "{colors.action-hover}"
  # ===== Charts =====
  chart2:
    backgroundColor: "{colors.charting-base-surface}"
    textColor: "{colors.charting-base-axis-and-legendlabel}"
    height: 400px
  # ===== Date pickers =====
  date-calendar:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-table-border}"
    rounded: "{rounded.radius-12}"
    padding: "{spacing.md}"
  date-calendar-header:
    backgroundColor: "{colors.brand-default}"
    textColor: "{colors.brand-foreground}"
  date-calendar-day-selected:
    backgroundColor: "{colors.brand-default}"
    textColor: "{colors.brand-foreground}"
  date-calendar-day-disabled:
    textColor: "{colors.text-disabled}"
  date-picker:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body1}"
    rounded: "{rounded.radius-4}"
    height: 48px
    padding: 0 12px
  date-range-picker:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-table-border}"
    rounded: "{rounded.radius-12}"
    padding: "{spacing.lg}"
  date-period-picker:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    rounded: "{rounded.radius-4}"
  date-multi-period-picker:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
  date-frequency-picker:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-table-border}"
    rounded: "{rounded.radius-12}"
  date-recurrence-picker:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-table-border}"
    rounded: "{rounded.radius-12}"
  date-relative-picker:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
  # ===== File, upload & misc composites =====
  file-upload:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-input-outlined-enabledborder}"
    rounded: "{rounded.radius-4}"
    padding: "{spacing.md}"
  file-upload-dragover:
    backgroundColor: "{colors.components-input-filled-hoverfill}"
  file-dragdrop-area:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-default}"
    borderColor: "{colors.components-input-outlined-enabledborder}"
    rounded: "{rounded.radius-4}"
  file-dragdrop-staged:
    textColor: "{colors.success-default}"
  file-dragdrop-error:
    textColor: "{colors.error-default}"
  add-favourites:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    typography: "{typography.body2}"
  advanced-filter:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
    rounded: "{rounded.radius-4}"
  analytics-enq-renderer:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-default}"
  compact-flagset:
    backgroundColor: "{colors.background-paper}"
    textColor: "{colors.text-default}"
  code-editor:
    backgroundColor: "{colors.grey-50}"
    textColor: "{colors.text-default}"
    typography: "{typography.body3}"
  evidence-management:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-default}"
  srms-form-renderer:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-default}"
  swagger-renderer:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-default}"
  # ===== Conversational UX (CUI) — composes existing CDS tokens, no new tokens =====
  cui-bubble-user:
    backgroundColor: "{colors.brand-default}"
    textColor: "{colors.brand-foreground}"
    typography: "{typography.body3}"
    rounded: "{rounded.radius-8}"
    padding: "{spacing.sm}"
  cui-bubble-assistant:
    backgroundColor: "{colors.components-input-filled-enabledfill}"
    textColor: "{colors.text-default}"
    typography: "{typography.body3}"
    rounded: "{rounded.radius-8}"
    padding: "{spacing.sm}"
  cui-bubble-system:
    backgroundColor: "{colors.grey-100}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body3}"
    rounded: "{rounded.radius-8}"
    padding: "{spacing.sm}"
  cui-thinking:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.accent-1-default}"
    typography: "{typography.body3}"
  cui-confidence-high:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.success-default}"
    typography: "{typography.body3}"
  cui-confidence-medium:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.warning-default}"
    typography: "{typography.body3}"
  cui-confidence-low:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.error-default}"
    typography: "{typography.body3}"
---

# Temenos Core Design System (CDS)

## Overview

CDS is the visual foundation of the **unified-ux LIT v3 web-component library**.
It powers Temenos banking experiences and is built to feel **trustworthy, calm,
and precise** — clarity over decoration, appropriate for high-stakes financial
workflows.

Tokens originate in **Figma** and are generated through **Style Dictionary** into
SCSS — primitive ramps in `packages/web/src/theme/tokens/_global.scss`
(warm-blue, energy-violet, renewal-green, red/amber/green status, grey/blue-grey)
and semantic + component tokens in `_cds.scss`. They surface as CSS custom
properties under the **`.cds`** container class in
`packages/web/src/theme/base.scss`, and components consume them via **`--uwc-*`**
aliases (e.g. `--uwc-temenos-primary: var(--brand-default)`), so one token change
propagates library-wide. **Always consume semantic tokens** (`var(--brand-default)`)
— never raw primitives — so theming and dark mode keep working.

Two type families carry the brand: **Utile** drives **all headings** (display
s1–s6 and h1–h6) for editorial character; **Work Sans** drives body, subtitles,
captions, and labels. The icon font is **Material Icons Outlined** (use Outlined
icons only). Root size is `16px` on `.cds`.

**Dark mode** is first-class: `html.uux-dark` (and `.cds.cds-dark`) remap the same
semantic tokens — `brand-default` → `warm-blue-200`, surfaces deepen to grey-900,
status hues lighten for legibility, the grey ramp inverts, and elevation shadows
shift from black to grey. No component restyling needed.

## Colors

Roles map onto primitive ramps and are exposed as semantic tokens. Token names
here equal the CSS variables.

- **Brand / primary (`brand-default` `#293276`, Warm Blue)** — primary actions,
  links, active/focus states. Ramp: `-light` `#4a57ba`, `-dark` `#21285e`,
  `-darkest` `#171e5a`, `-lightest`/`-muted` `#d8dae9`; text on brand =
  `brand-foreground` `#ffffff`. Interaction overlays: `brand-states-hover/
  selected/focus/outlinedborder`.
- **Accent 1 (`accent-1-default` `#925fb9`, Energy Violet)** — secondary actions,
  tags, complementary accents (full ramp + `-states-*`).
- **Accent 2 (`accent-2-default` `#51afa9`, Renewal Green)** — tertiary accent for
  highlights and emphasis (full ramp + `-states-*`).
- **Status** — `error` `#ea0005`, `warning` `#9e6309`, `success` `#076911`,
  `info` `#4a57ba`; each has `-light`/`-lightest`/`-dark`/`-darkest` and a
  `-foreground`.
- **Text** — `text-default` `#212121` (body), `text-secondary` `#455a64` (helper/
  metadata/resting labels), `text-disabled` `#9e9e9e` (disabled only),
  `text-brandtext`/`-muted` for brand-colored text.
- **Surfaces** — `background-default` and `background-paper` (`#ffffff`); the grey
  ramp (`grey-50…1000`) provides neutral fills, borders, and dividers.
- **Component colors** — input fills (`components-input-filled-enabledfill`
  `#eff4fb` / `-hoverfill` `#e9f0fa`), input borders
  (`components-input-outlined-enabledborder` `#d8dae9` / `-hoverborder` `#4a57ba`),
  table (`-border` `#e0e0e0`, `-column-and-footerfill` `#fafafa`), `tooltip-fill`
  `#263238`, `app-bar-defaultfill` `#f5f5f5`, `backdrop-fill` `rgba(21,23,41,0.6)`,
  chip/rating/stepper/breadcrumbs/avatar, and the four `alert-*` background/color
  pairs (dark text on a soft tint).
- **Focus halo** — `--uwc-focus-halo-color` resolves to `accent-1-light` `#c2aed0`.

Accent 2 and the lighter status tints have low contrast against white — reserve
them for large fills, surfaces, and data-viz, not small text.

## Typography

19 levels. **Utile** drives display (`s1` 3rem → `s6` 1.75rem) and **all
headings** (`h1` 2.4rem → `h6` 0.75rem, including the small `h5`/`h6` UI
headings); **Work Sans** drives `subtitle1/2`, body (`body1` 1rem → `body4`
0.625rem), and meta (`overline`, `caption`). Weights available
(`--fontweight-300…700`): 300/400/500/600/700; display & h1–h4 sit at 600–700,
body at 400, subtitles at 500. Required-field indicators use `--uwc-mandatory-color`
(falls back to the label-ink colour, or the error colour when invalid).

Sizes are `rem` (scale with the `16px` root). Mobile breakpoints step several
heading sizes down — treat front-matter values as the **desktop** baseline. In
the SCSS, `--typography-*` tokens carry the **size**; family/weight/line-height
are applied by the component mixins (encoded here for completeness).

## Layout

Spacing is the Figma-sourced `--spacing-*` ramp on an **8px base grid** (rem):
`spacing-0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28,
30, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112` (plus negatives
`spacing-neg-1…4`). The front-matter exposes a curated t-shirt subset
(`xxs` 4px → `4xl` 112px) for readability; the full ramp remains available as raw
tokens.

- `xs`/`sm` (8–12px) — intra-component gaps (icon↔label, input padding).
- `md`/`lg` (16–24px) — component padding, gaps between related groups.
- `xl`+ (32px+) — section separation, page gutters.

**Breakpoints:** `xs` 0, `sm` 600px, `md` 960px, `lg` 1280px, `xl` 1920px.

## Elevation & Depth

Depth uses a layered shadow scale — `--uwc-elevation-2/4/6/8/16/24` — each a
composite of **three** stacked drop shadows at increasing y-offset and blur. Light
theme shadows are black at low alpha (`rgba(0,0,0,0.12/0.14/0.20)`); dark theme
softens them to grey (`rgba(76,76,76,*)`). There is also an `elevation-1-container`
subtle container shadow.

- **elevation-2** — resting cards, subtle separation.
- **elevation-4 / 6** — raised cards, dropdowns, hovered surfaces.
- **elevation-8** — menus / popovers; **elevation-16** — navigation drawers.
- **elevation-24** — modals/dialogs (highest). Dialog scrim =
  `components-backdrop-fill`.

Reach for the lowest elevation that still reads as separated.

## Shapes

Corner radii come from `--radius-*`: `radius-4` 4px and `radius-8` 8px cover most
controls (buttons, inputs, chips with square-ish corners); `radius-12` 12px and
`radius-16` 16px are for cards and larger containers; `radius-20/24/28/32` step up
for prominent surfaces; **`radius-999` (62.4375rem)** makes pills and circular
avatars. Keep rounding consistent within a component family.

## Components

Component tokens reference the semantic/component colors above (so they inherit
dark mode automatically).

- **Buttons** — `button-primary` (brand fill, +`-hover`/`-active`/`-focus`/
  `-selected` and ghost-hover overlay), `button-secondary` (accent-1),
  `button-tertiary` (accent-2), `button-outlined`/`button-text` (transparent,
  brand text), `button-destructive` (error). 40px tall, `radius-4`, `body2` label.
- **Filled inputs** (default) — `input-filled` (+`-hover`), `input-outlined`
  (+`-hover` border via `components-input-outlined-hoverborder`), `input-disabled`,
  `input-error`, and `input-label`/`-focused`. Underline/border progress:
  enabled `#d8dae9` → hover/focus `brand`/`#4a57ba` → error `error-default`.
- **Surfaces** — `card`/`dialog`/`menu` (grey-300 border, radius 12/12/8),
  `tooltip` (`tooltip-fill` dark), `app-bar` (`app-bar-defaultfill`).
- **Form controls** — `checkbox`/`radio` (18/20px, brand check-fill,
  `action-active` unchecked outline, ripple + focus ring recolored per `color`
  variant); `switch` (`components-switch-slidefill` track at 50% opacity,
  `components-switch-knobfillenabled` thumb, `radius-8` track / `radius-999`
  handle, same `color` variants as checkbox/icon, plus an `.uwc-invalid` state
  forcing `error-default`).
- **Icons** — 24px default (`-small` 20px, `-large` 36px); default tint is
  `icons-icons-contrast-color`, not `text-default`; `color` variants map to
  brand/accent/status tokens (`secondary` resolves to the darker `accent-1-dark`
  for legibility).
- **Data** — `table-header-cell` (`column-and-footerfill`), `table-cell` (+ row
  hover/selected via `brand-states-*`), `chip` (pill, +hover), `avatar`
  (`avatar-brand` fill, circular via themeable `--uwc-avatar-border-radius`,
  initials pinned to font-weight 500 via `--uwc-avatar-font-weight`), `badge`,
  `stepper-connector`, `breadcrumb-collapse`.
- **Feedback** — `alert-{error,warning,info,success}` pair a soft `*-background`
  tint with dark `*-color` text (all AA-legible).
- **Charts** — Recharts/data-viz read the 12-step `charting-color-category-*`
  palette (+ `-error/-success/-warning`) and structure tokens
  (`charting-base-*`: title, subtitle, axis-and-legendlabel, baseaxis, gridline,
  gray, lightgray, surface, tooltip). Exposed to components as `--uwc-palette-color-0…11`.
- **Conversational UX (CUI)** — built by **composing existing CDS tokens** (no new
  variables): `cui-bubble-user` = `brand-default`, `cui-bubble-assistant` =
  `components-input-filled-enabledfill`, `cui-bubble-system` = `grey-100`,
  `cui-thinking` = `accent-1`, and confidence high/medium/low =
  `success`/`warning`/`error`.

## Do's and Don'ts

- **Do** consume `var(--token)` for every color, size, and radius — never hardcode
  hex/rgba (CDS exposes `--uwc-*` aliases for component authors).
- **Do** keep `brand` for primary actions; use `accent-1`/`accent-2` sparingly and
  never behind small text (low contrast on white).
- **Do** default form inputs to the **filled** variant; use **Material Icons
  Outlined** only.
- **Do** respect the 8px spacing grid and the `--radius-*` scale; reserve
  `radius-999` for pills/avatars.
- **Don't** use raw primitive ramps (`warm-blue-700`, `grey-500`) directly in
  components — go through semantic tokens so dark mode works.
- **Don't** over-elevate; prefer the lowest `--uwc-elevation-*` that conveys the
  layer, and reserve shadows for genuinely floating surfaces.
- **Don't** introduce one-off colors, type sizes, or radii — extend the tokens in
  Figma/Style Dictionary and regenerate `_cds.scss`/`_global.scss`.
- **Don't** wire a component to a token name that isn't in generated output yet —
  it silently falls back to inherited/initial value with no build error. Check
  `_cds.scss`/`_global.scss` (and the Figma export) for the token first.