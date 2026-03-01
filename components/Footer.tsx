"use client";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnData {
  heading: string;
  links: FooterLink[];
}

const columns: FooterColumnData[] = [
  {
    heading: "Al Hussein Perfumes\nCorporate",
    links: [
      { label: "About Us", href: "#" },
      { label: "Products", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "My Account", href: "#" },
      { label: "My Fragrances", href: "#" },
      { label: "My Compare List", href: "#" },
    ],
  },
  {
    heading: "For Business",
    links: [
      { label: "Subscription Agreement", href: "#" },
      { label: "Request Fragrance", href: "#" },
      { label: "Personal Request", href: "#" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Ways To Shop", href: "#" },
      { label: "Terms and Conditions", href: "#" },
      { label: "Privacy and Cookies Policy", href: "#" },
      { label: "Return and Refund Policy", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

interface SocialLinkData {
  name: string;
  href: string;
  imgSrc: string;
}

const socialLinks: SocialLinkData[] = [
  { name: "Facebook", href: "#", imgSrc: "images/social-icons/facebook.png" },
  { name: "Instagram", href: "#", imgSrc: "images/social-icons/instagram.png" },
  { name: "Tiktok", href: "#", imgSrc: "images/social-icons/tik-tok.png" },
  { name: "Youtube", href: "#", imgSrc: "images/social-icons/youtube.png" },
  { name: "Linkedin", href: "#", imgSrc: "images/social-icons/linkedin.png" },
  { name: "Pinterest", href: "#", imgSrc: "images/social-icons/pinterest.png" },
];

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2b2b2b",
        color: "#ffffff",
        padding: "70px 40px 0",
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      {/* ── Main grid ── */}
      <div
        className="footer-container"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "40px",
        }}
      >
        {/* Nav columns */}
        {columns.map((col) => (
          <div key={col.heading}>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "20px",
                textTransform: "uppercase",
                whiteSpace: "pre-line",
                lineHeight: "1.4",
              }}
            >
              {col.heading}
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {col.links.map((link) => (
                <li key={link.label} style={{ marginBottom: "12px" }}>
                  <a
                    href={link.href}
                    style={{
                      color: "#9a9a9a",
                      textDecoration: "none",
                      fontSize: "15px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#ffffff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#9a9a9a")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social column */}
        <div className="footer-social">
          <h4
            style={{
              fontSize: "16px",
              fontWeight: 700,
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            LET'S CONNECT
          </h4>
          <div
            className="social-icons"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginTop: "10px",
            }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="footer-logo-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const span =
                    e.currentTarget.querySelector<HTMLSpanElement>(
                      ".image-name",
                    );
                  if (span) span.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  const span =
                    e.currentTarget.querySelector<HTMLSpanElement>(
                      ".image-name",
                    );
                  if (span) span.style.color = "#9a9a9a";
                }}
              >
                <img
                  src={social.imgSrc}
                  alt={social.name}
                  style={{
                    width: "18px",
                    height: "18px",
                    objectFit: "contain",
                  }}
                />
                <span
                  className="image-name"
                  style={{
                    fontSize: "14px",
                    color: "#9a9a9a",
                    transition: "color 0.3s ease",
                  }}
                >
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          marginTop: "60px",
          padding: "25px 0",
          textAlign: "center",
          fontSize: "14px",
          color: "#9a9a9a",
          borderTop: "1px solid #444",
        }}
      >
        © 2026 Al Hussein Perfumes Corporate.
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,700&display=swap');

        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .footer-social {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) {
          .footer-container {
            grid-template-columns: 1fr !important;
          }
          .footer-social {
            grid-column: span 1 !important;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
