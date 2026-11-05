import { siShopify, siMeta, siGoogleads, siGoogleanalytics, siTiktok, siWhatsapp, siGmail, siGoogleslides, siClaude } from "simple-icons";

const ICONS: Record<string, { path: string; hex: string } | undefined> = {
  Shopify: siShopify,
  "Meta Ads": siMeta,
  Meta: siMeta,
  "Google Ads": siGoogleads,
  Google: siGoogleads,
  "Google Analytics": siGoogleanalytics,
  "TikTok Ads": siTiktok,
  TikTok: siTiktok,
  WhatsApp: siWhatsapp,
  Gmail: siGmail,
  "Google Slides": siGoogleslides,
  Claude: siClaude,
};

/** Monochrome platform mark (simple-icons, CC0). Falls back to a letter tile when a mark isn't available. */
export function PlatformIcon({ name, className = "size-4" }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) {
    return (
      <span
        aria-hidden="true"
        className={`grid place-items-center rounded-[4px] bg-current/10 text-[9px] font-bold leading-none ${className}`}
      >
        {name[0]}
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
