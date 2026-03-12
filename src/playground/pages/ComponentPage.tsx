import { Navigate, useParams } from 'react-router-dom';
import { bySlug } from '../registry/registry';
import { TabPanel } from '../components/TabPanel';

export function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? bySlug[slug] : undefined;

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-text-primary mb-2 outline-none"
          tabIndex={-1}
        >
          {entry.name}
        </h1>
        <p className="text-text-secondary">{entry.description}</p>
        {entry.tags && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-accent-subtle text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <TabPanel entry={entry} />
    </div>
  );
}
