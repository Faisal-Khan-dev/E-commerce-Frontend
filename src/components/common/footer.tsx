import Link from "next/link";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

const supportLinks = [
  { label: "Terms & Conditions", href: "/terms-and-policies?tab=terms" },
  { label: "Privacy Policy", href: "/terms-and-policies?tab=privacy" },
  { label: "Shipping & Delivery", href: "/terms-and-policies?tab=shipping" },
  { label: "Return & Refund Policy", href: "/terms-and-policies?tab=returns" },
];

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.04.82.12V9.4a6.34 6.34 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.82 4.48v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-3-1.07z" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.019 4.014-1.052zm12.012-7.531c-.273-.137-1.616-.797-1.866-.888-.252-.091-.435-.137-.619.137-.183.273-.71.888-.87 1.071-.16.183-.32.206-.593.069-.273-.137-1.154-.426-2.198-1.357-.811-.724-1.358-1.618-1.518-1.892-.16-.274-.017-.422.12-.558.123-.122.273-.32.41-.48.137-.16.183-.273.273-.457.091-.183.046-.343-.023-.48-.069-.137-.619-1.486-.848-2.037-.224-.537-.453-.464-.619-.473l-.527-.01c-.183 0-.48.069-.731.343-.251.273-.96.938-.96 2.29 0 1.351.983 2.656 1.12 2.84.137.183 1.934 2.953 4.686 4.141.654.283 1.165.452 1.563.578.657.208 1.256.179 1.729.108.528-.079 1.616-.661 1.844-1.299.229-.639.229-1.187.16-1.299-.069-.112-.252-.181-.525-.318z" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5 12 13l7.5-5.5" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#241710] via-[#1a100a] to-[#120905] text-stone-300 border-t border-[#3d271b]">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4a373]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle Background Watermark Logo */}
      <div className="absolute left-1/2 bottom-[-1.5rem] sm:bottom-[-2.5rem] lg:bottom-[-3.5rem] -translate-x-1/2 select-none text-center whitespace-nowrap font-serif [word-spacing:16px] text-[clamp(2.5rem,12vw,8rem)] font-black uppercase tracking-[-0.08em] text-white/[0.03] pointer-events-none">
        Healthy Basket
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-20 lg:pb-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:items-start pb-12 border-b border-stone-800/80">
          
          {/* Brand & Overview Column */}
          <div className="space-y-4 text-left">
            <Link
              href="/"
              className="inline-block font-serif text-3xl sm:text-4xl font-black uppercase tracking-tight [word-spacing:6px] text-amber-50 hover:text-amber-200 transition-colors"
            >
              Healthy <span className="text-[#d4a373]">Basket</span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-400 font-light max-w-xs text-left">
              Curating nature&apos;s finest organic dry fruits, cold-pressed essential oils, pure bee honey & Himalayan Shilajeet with uncompromised quality.
            </p>
          </div>

          {/* Explore Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-amber-100/90 text-left">
              Explore
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-light">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    data-no-ripple="true"
                    className="text-stone-300 hover:text-amber-200 transition-colors duration-200 inline-flex items-center gap-2.5 group relative py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-600 group-hover:bg-[#d4a373] transition-colors shrink-0" />
                    <span className="relative">
                      {item.label}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#d4a373] transition-all duration-300 ease-out group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-amber-100/90 text-left">
              Support
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-light">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    data-no-ripple="true"
                    className="text-stone-300 hover:text-amber-200 transition-colors duration-200 inline-flex items-center gap-2.5 group relative py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-600 group-hover:bg-[#d4a373] transition-colors shrink-0" />
                    <span className="relative">
                      {item.label}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#d4a373] transition-all duration-300 ease-out group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact Email Column */}
          <div className="space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-amber-100/90 text-left">
                Social Connect
              </h3>
              
              {/* Social Icons with Hover Glow */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/share/1Er32zkxUz/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-stone-900/90 border border-stone-700/60 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] transition-all duration-300"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://www.instagram.com/healthy_basket24?stkn=MXRrbDVzMnR4M2VkYw=="
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-stone-900/90 border border-stone-700/60 flex items-center justify-center text-stone-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:border-transparent hover:shadow-[0_0_15px_rgba(225,48,108,0.4)] transition-all duration-300"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://www.tiktok.com/@khan135652?_r=1&_t=ZS-99wpJbitgqP"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-xl bg-stone-900/90 border border-stone-700/60 flex items-center justify-center text-stone-300 hover:text-white hover:bg-black hover:border-stone-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                >
                  <TikTokIcon />
                </a>

                <a
                  href="https://wa.me/923272735705"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-stone-900/90 border border-stone-700/60 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all duration-300"
                >
                  <WhatsAppIcon />
                </a>
              </div>
            </div>

            {/* Transparent Email Container */}
            <div className="pt-2 text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2 text-left">
                Official Support Email
              </span>
              <a
                href="mailto:info@healthybasket.pk"
                className="inline-flex items-center gap-2 text-xs text-amber-200 hover:text-white bg-transparent transition-colors duration-200 group"
              >
                <MailIcon className="w-4 h-4 text-[#d4a373] group-hover:scale-110 transition-transform" />
                <span className="font-medium tracking-wide">
                  info@healthybasket.pk
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-light text-stone-400">
          <p className="tracking-wide text-left">
            © {currentYear} <span className="text-amber-100 font-medium">Healthy Basket</span>. All Rights Reserved. Pure & Sustainably Sourced.
          </p>
        </div>

      </div>
    </footer>
  );
}
