import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-bold text-accent mb-4">404</p>
      <h1 className="text-xl font-semibold text-text-primary mb-2">Page not found</h1>
      <p className="text-text-muted mb-8">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
