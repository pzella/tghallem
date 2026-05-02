// Design tokens — canonical values from the Tgħallem handoff
// All dimensions are logical pixels (390×844 base).

export const Colors = {
  // Brand
  red: '#cf142b',
  redTint: '#fbe6e8',
  // Backgrounds
  cream: '#f7f3ec',
  cream2: '#ede5d6',
  // Accents
  ochre: '#c8924a',
  ochreTint: '#f5ead6',
  sage: '#cfe0d0',
  sageDeep: '#6e8c72',
  // Text
  ink: '#2a1f1a',
  ink2: '#5e504a',
  ink3: '#9b8d86',
  // Utility
  white: '#ffffff',
  black: '#000000',
} as const;

export const Fonts = {
  display: 'BricolageGrotesque_600SemiBold',
  displayBold: 'BricolageGrotesque_700Bold',
  body: undefined, // system Inter / system-ui
} as const;

export const FontSizes = {
  hero: 38,
  h1Large: 28,
  h1: 26,
  h2: 22,
  h2Small: 20,
  bodyLarge: 18,
  body: 15,
  bodySmall: 14,
  small: 12,
  micro: 11,
  label: 10,
} as const;

export const Spacing = {
  screenH: 20,      // horizontal screen padding
  screenH2: 24,
  cardPad: 16,
  cardPadLg: 18,
  gap: 10,
  gapMd: 12,
  gapLg: 16,
  gapXl: 20,
} as const;

export const Radii = {
  chip: 10,
  pill: 14,
  card: 16,
  cardMd: 18,
  cardLg: 20,
  cardXl: 22,
  button: 28,       // full-pill primary CTA
  avatar: 9999,
} as const;

export const Shadows = {
  cta: {
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  card: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
  sheet: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export const Layout = {
  screenWidth: 390,
  screenHeight: 844,
  statusBarHeight: 54,
  headerHeight: 56,
  tabBarHeight: 88,
  ctaBottom: 40,
  ctaHeight: 56,
} as const;
