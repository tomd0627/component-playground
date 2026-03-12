import { Accordion, AccordionItem } from '../../components/ui/Accordion';

export function AccordionDemo() {
  return (
    <div className="w-full max-w-md">
      <Accordion>
        <AccordionItem id="what" trigger="What is a component playground?">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            A component playground is a live environment where you can explore, interact with, and inspect UI components in isolation — without needing a full application context.
          </p>
        </AccordionItem>
        <AccordionItem id="a11y" trigger="How is accessibility handled?">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Each component follows WCAG 2.1 AA guidelines. This accordion uses <code className="text-[var(--color-accent)] text-xs">aria-expanded</code>, <code className="text-[var(--color-accent)] text-xs">aria-controls</code>, and <code className="text-[var(--color-accent)] text-xs">role="region"</code> — fully operable by keyboard and screen reader.
          </p>
        </AccordionItem>
        <AccordionItem id="gsap" trigger="What powers the animation?">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            GSAP animates the panel height from <code className="text-[var(--color-accent)] text-xs">0</code> to its natural height. The animation is suppressed automatically when <code className="text-[var(--color-accent)] text-xs">prefers-reduced-motion</code> is set.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
