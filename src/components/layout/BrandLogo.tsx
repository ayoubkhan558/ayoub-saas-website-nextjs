export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={className} role="img" aria-label="Ayoub.dev logo">
      <svg width="50" height="36" viewBox="0 0 50 36" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 16.2L14.5 8.2V13.7L7.5 18L14.5 22.5V28L2 19.9V16.2Z" fill="currentColor" opacity="0.58" />
        <path d="M29.2 4.4H34.4L20.8 34H15.6L29.2 4.4Z" fill="currentColor" opacity="0.58" />
        <path d="M37 28V22.5L44 18L37 13.7V8.2L49.5 16.2V19.9L37 28Z" fill="currentColor" opacity="0.58" />
      </svg>
      <strong>
        Ayoub<span>.dev</span>
      </strong>
    </span>
  );
}
