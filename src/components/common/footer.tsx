import Link from "next/link";

const exploreLinks = [
  { label: "Sourcing", href: "/sourcing" },
  { label: "Our Story", href: "/about" },
  { label: "Wholesale", href: "/wholesale" },
];

const supportLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping", href: "/shipping" },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 10-2.4-17.7c-1.5.5-2.7 1.9-2.7 3.8 0 1.4.8 2.6 1.9 3.1.1.1.2.1.3 0 .1 0 .2-.1.2-.2.1-.3.5-1.8.6-2.1.1-.3.1-.4-.2-.7-.4-.4-.7-1-.7-1.7 0-1.4 1-2.6 2.7-2.6 1.5 0 2.5 1 2.5 2.4 0 1.8-1 3-2.3 3-.7 0-1.2-.6-1-.1-.2.7-.4 1.4-.6 2.1-.2.6-.1 1.4-.1 2.2"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 7.5 12 13l7.5-5.5"
      />
    </svg>
  );
}

export function Footer() {
  // Dynamically fetches the current year using new Date()
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#eee7e4] text-black">
      <div className="absolute left-1/2 bottom-[-2rem] sm:bottom-[-3.5rem] lg:bottom-[-5rem] -translate-x-1/2 select-none text-center whitespace-nowrap font-serif [word-spacing:20px] text-[clamp(3rem,14vw,9rem)] font-black uppercase tracking-[-0.08em] text-black/8">
        Healthy Basket
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 mb-25 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-8  border-black/10 pb-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] lg:gap-12 lg:items-start lg:pb-10">
          <div className="max-w-md">
            <Link
              href="/"
              className="font-serif text-3xl font-black uppercase leading-none tracking-tight sm:text-[2.65rem]"
            >
              Healthy
              <br />
              Basket
            </Link>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-6 text-black/70 sm:text-[1rem]">
              Curating the world&apos;s most pristine organic provisions with a
              focus on heritage and health.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-black/90 sm:text-sm">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-black/70 sm:text-base">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="underline decoration-black/25 underline-offset-4 transition-colors hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-black/90 sm:text-sm">
              Support
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-black/70 sm:text-base">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="underline decoration-black/25 underline-offset-4 transition-colors hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-black/90 sm:text-sm">
              Social
            </h2>
            <div className="mt-4 flex items-center gap-4 text-black">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-70"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="transition-opacity hover:opacity-70"
              >
                <PinterestIcon />
              </a>
              <a
                href="mailto:hello@pureprovenance.com"
                aria-label="Email"
                className="transition-opacity hover:opacity-70"
              >
                <MailIcon />
              </a>
            </div>
            {/* Displaying dynamic year here */}
            <p className="mt-5 max-w-[14rem] text-xs uppercase tracking-[0.14em] text-black/80 sm:text-sm">
              © {currentYear} Healthy Basket. Sustainably sourced.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
