import type { ComponentType } from 'react';

export type Category = 'Primitives' | 'Feedback' | 'Navigation' | 'Animation';

export interface ComponentEntry {
  slug: string;
  name: string;
  category: Category;
  description: string;
  component: ComponentType;
  code: string;
  a11yNotes: string;
  tags?: string[];
}
