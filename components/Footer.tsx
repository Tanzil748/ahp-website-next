import Link from "next/link";

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
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Blogs", href: "/blogs" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "My Fragrances", href: "/fragrances" },
      { label: "My Compare List", href: "/compare-list" },
    ],
  },
  {
    heading: "For Business",
    links: [
      { label: "Request Fragrance", href: "/request-fragrance" },
      { label: "Influencer Collaboration", href: "/influencer-collaboration" },
      {
        label: "Wholesaler/Retail Inquiry",
        href: "/wholesaler-retail-inquiry",
      },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Terms and Conditions", href: "/terms-condition" },
      { label: "Return and Refund Policy", href: "/returns" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Counterfeit Awareness", href: "/counterfeit-awareness" },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/alhusseinperfume/",
    imgSrc: "images/social-icons/facebook.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/alhusseinperfumes/",
    imgSrc: "images/social-icons/instagram.png",
  },
  {
    name: "Tiktok",
    href: "https://www.tiktok.com/@alhusseinperfumes",
    imgSrc: "images/social-icons/tik-tok.png",
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@AlHusseinPerfumes",
    imgSrc: "images/social-icons/youtube.png",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/al-hussein-471a63393/",
    imgSrc: "images/social-icons/linkedin.png",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/ahusseinperfumes",
    imgSrc: "images/social-icons/pinterest.png",
  },
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
        className="footer-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        style={{ maxWidth: "1400px", margin: "0 auto", gap: "40px" }}
      >
        {/* Nav columns — internal Links */}
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
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-300"
                    style={{
                      color: "#9a9a9a",
                      textDecoration: "none",
                      fontSize: "15px",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social column — external anchor tags */}
        <div className="footer-social sm:col-span-2 lg:col-span-1">
          <h4
            style={{
              fontSize: "16px",
              fontWeight: 700,
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            LET&apos;S CONNECT
          </h4>
          <div
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
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center"
                style={{ gap: "10px", textDecoration: "none" }}
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
                  className="transition-colors duration-300 group-hover:text-white"
                  style={{ fontSize: "14px", color: "#9a9a9a" }}
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
    </footer>
  );
};

export default Footer;
