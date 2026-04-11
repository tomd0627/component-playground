import accordionA11y from '../../components/ui/Accordion/Accordion.a11y.md?raw';
import accordionSource from '../../components/ui/Accordion/Accordion.tsx?raw';
import badgeA11y from '../../components/ui/Badge/Badge.a11y.md?raw';
import badgeSource from '../../components/ui/Badge/Badge.tsx?raw';
import buttonA11y from '../../components/ui/Button/Button.a11y.md?raw';
import buttonSource from '../../components/ui/Button/Button.tsx?raw';
import commandPaletteA11y from '../../components/ui/CommandPalette/CommandPalette.a11y.md?raw';
import commandPaletteSource from '../../components/ui/CommandPalette/CommandPalette.tsx?raw';
import designTokensA11y from '../../components/ui/DesignTokens/DesignTokens.a11y.md?raw';
import designTokensSource from '../../components/ui/DesignTokens/DesignTokens.tsx?raw';
import dropdownA11y from '../../components/ui/DropdownMenu/DropdownMenu.a11y.md?raw';
import dropdownSource from '../../components/ui/DropdownMenu/DropdownMenu.tsx?raw';
import modalA11y from '../../components/ui/Modal/Modal.a11y.md?raw';
import modalSource from '../../components/ui/Modal/Modal.tsx?raw';
import progressBarA11y from '../../components/ui/ProgressBar/ProgressBar.a11y.md?raw';
import progressBarSource from '../../components/ui/ProgressBar/ProgressBar.tsx?raw';
import scrollRevealA11y from '../../components/ui/ScrollReveal/ScrollReveal.a11y.md?raw';
import scrollRevealSource from '../../components/ui/ScrollReveal/ScrollReveal.tsx?raw';
import tabsA11y from '../../components/ui/Tabs/Tabs.a11y.md?raw';
import tabsSource from '../../components/ui/Tabs/Tabs.tsx?raw';
import toastA11y from '../../components/ui/Toast/Toast.a11y.md?raw';
import toastSource from '../../components/ui/Toast/Toast.tsx?raw';
import toggleA11y from '../../components/ui/Toggle/Toggle.a11y.md?raw';
import toggleSource from '../../components/ui/Toggle/Toggle.tsx?raw';
import tooltipA11y from '../../components/ui/Tooltip/Tooltip.a11y.md?raw';
import tooltipSource from '../../components/ui/Tooltip/Tooltip.tsx?raw';
import { AccordionDemo } from '../demos/AccordionDemo';
import { BadgeDemo } from '../demos/BadgeDemo';
import { ButtonDemo } from '../demos/ButtonDemo';
import { CommandPaletteDemo } from '../demos/CommandPaletteDemo';
import { DesignTokensDemo } from '../demos/DesignTokensDemo';
import { DropdownMenuDemo } from '../demos/DropdownMenuDemo';
import { ModalDemo } from '../demos/ModalDemo';
import { ProgressBarDemo } from '../demos/ProgressBarDemo';
import { ScrollRevealDemo } from '../demos/ScrollRevealDemo';
import { TabsDemo } from '../demos/TabsDemo';
import { ToastDemo } from '../demos/ToastDemo';
import { ToggleDemo } from '../demos/ToggleDemo';
import { TooltipDemo } from '../demos/TooltipDemo';
import type { Category, ComponentEntry } from './types';


export const registry: ComponentEntry[] = [
  {
    slug: 'design-tokens',
    name: 'Design Tokens',
    category: 'Design Tokens',
    description: 'The semantic color, spacing, typography, and easing tokens that power every component in this library.',
    tags: ['tokens', 'colors', 'typography', 'spacing', 'theming'],
    component: DesignTokensDemo,
    code: designTokensSource,
    a11yNotes: designTokensA11y,
  },
  {
    slug: 'button',
    name: 'Button',
    category: 'Primitives',
    description: 'Interactive button with multiple variants and accessible states.',
    tags: ['interactive', 'form', 'cta'],
    component: ButtonDemo,
    code: buttonSource,
    a11yNotes: buttonA11y,
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Primitives',
    description: 'Small status label with color-coded semantic variants.',
    tags: ['label', 'tag', 'status'],
    component: BadgeDemo,
    code: badgeSource,
    a11yNotes: badgeA11y,
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    category: 'Primitives',
    description: 'Binary switch control with full ARIA switch role support.',
    tags: ['switch', 'boolean', 'form'],
    component: ToggleDemo,
    code: toggleSource,
    a11yNotes: toggleA11y,
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Keyboard-navigable tab panels following the ARIA tabs pattern.',
    tags: ['navigation', 'panel', 'keyboard'],
    component: TabsDemo,
    code: tabsSource,
    a11yNotes: tabsA11y,
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Primitives',
    description: 'GSAP-animated collapsible sections with full keyboard support.',
    tags: ['collapsible', 'disclosure', 'animation'],
    component: AccordionDemo,
    code: accordionSource,
    a11yNotes: accordionA11y,
  },
  {
    slug: 'progress-bar',
    name: 'Progress Bar',
    category: 'Feedback',
    description: 'Animated progress indicator with ARIA progressbar role.',
    tags: ['loading', 'status', 'animation'],
    component: ProgressBarDemo,
    code: progressBarSource,
    a11yNotes: progressBarA11y,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Primitives',
    description: 'Hover and focus-triggered tooltip with smart viewport positioning.',
    tags: ['overlay', 'hint', 'popup'],
    component: TooltipDemo,
    code: tooltipSource,
    a11yNotes: tooltipA11y,
  },
  {
    slug: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Navigation',
    description: 'Keyboard-navigable menu following the ARIA menu pattern.',
    tags: ['menu', 'select', 'keyboard'],
    component: DropdownMenuDemo,
    code: dropdownSource,
    a11yNotes: dropdownA11y,
  },
  {
    slug: 'modal',
    name: 'Modal',
    category: 'Feedback',
    description: 'Accessible dialog with focus trap, scroll-lock, and GSAP entrance.',
    tags: ['dialog', 'overlay', 'focus-trap'],
    component: ModalDemo,
    code: modalSource,
    a11yNotes: modalA11y,
  },
  {
    slug: 'toast',
    name: 'Toast',
    category: 'Feedback',
    description: 'Queued notification system with GSAP slide animation.',
    tags: ['notification', 'alert', 'animation'],
    component: ToastDemo,
    code: toastSource,
    a11yNotes: toastA11y,
  },
  {
    slug: 'scroll-reveal',
    name: 'Scroll Reveal',
    category: 'Animation',
    description: 'GSAP ScrollTrigger entrance animations that respect prefers-reduced-motion.',
    tags: ['scroll', 'animation', 'gsap'],
    component: ScrollRevealDemo,
    code: scrollRevealSource,
    a11yNotes: scrollRevealA11y,
  },
  {
    slug: 'command-palette',
    name: 'Command Palette',
    category: 'Navigation',
    description: 'Full-featured command palette with fuzzy search and keyboard navigation.',
    tags: ['search', 'combobox', 'keyboard'],
    component: CommandPaletteDemo,
    code: commandPaletteSource,
    a11yNotes: commandPaletteA11y,
  },
];

export const bySlug: Record<string, ComponentEntry> = Object.fromEntries(
  registry.map((e) => [e.slug, e])
);

export const byCategory: Record<Category, ComponentEntry[]> = registry.reduce(
  (acc, entry) => {
    (acc[entry.category] ??= []).push(entry);
    return acc;
  },
  {} as Record<Category, ComponentEntry[]>
);

export const CATEGORY_ORDER: Category[] = ['Design Tokens', 'Primitives', 'Feedback', 'Navigation', 'Animation'];
