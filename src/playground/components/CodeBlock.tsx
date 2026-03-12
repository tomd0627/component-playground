import { useEffect, useState } from 'react';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let cancelled = false;
    import('shiki').then(({ codeToHtml }) =>
      codeToHtml(code, { lang: language, theme: 'github-dark' })
    ).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => { cancelled = true; };
  }, [code, language]);

  return (
    <div className="relative rounded-lg overflow-hidden border border-border">
      <div className="flex items-center justify-between px-4 py-2 bg-surface-raised border-b border-border">
        <span className="text-xs text-text-muted font-mono">{language}</span>
        <CopyButton text={code} />
      </div>
      {html ? (
        // Safe: html is produced entirely by shiki from static source strings —
        // no user input reaches this path. Shiki outputs self-contained <pre> markup.
        <div
          className="overflow-auto text-sm [&>pre]:p-4 [&>pre]:m-0 [&>pre]:overflow-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="p-4 text-sm font-mono text-text-secondary overflow-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
