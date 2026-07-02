export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={className} role="img" aria-label="M Ayoub.dev logo">
      <img src="/mayoub-dev-logo.svg" alt="" aria-hidden="true" />
    </span>
  );
}
