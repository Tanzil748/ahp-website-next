import BackToTop from "@/components/BackToTop";
import Image from "next/image";

const sections = [
  {
    number: "1",
    title: "Definitions",
    content: [
      {
        label: "a) Owner, Us, We",
        text: "The Owner, as the creator, operator, and publisher of the Website, makes the Website, and certain Services on it, available to users. Al-Hussein Perfumes Inc, Owner, Us, We, Our, Ours and other first-person pronouns will refer to the Owner, as well as all employees and affiliates of the Owner.",
      },
      {
        label: "b) You, the User, the Client",
        text: 'You, as the user of the Website, will be referred to throughout these Terms of Service with second-person pronouns such as You, Your, Yours, or as User or Client. For the purpose of these Terms of Service, the term "User" or "you" shall mean any natural or legal person who is accessing the Website.',
      },
      {
        label: "c) Parties",
        text: "Collectively, the parties to these Terms of Service (the Owner and You) will be referred to as Parties.",
      },
    ],
  },
  {
    number: "2",
    title: "Assent & Acceptance",
    content:
      "By using the Website, You warrant that You have read and reviewed these Terms of Service and that You agree to be bound by it. If You do not agree to be bound by these Terms of Service, please leave the Website immediately. The Owner only agrees to provide use of this Website and Services to You if You assent to these Terms of Service.",
  },
  {
    number: "3",
    title: "Age Restriction",
    content:
      "You must be at least 18 (eighteen) years of age to use this Website or any Services contained herein. By using this Website, You represent and warrant that You are at least 18 years of age and may legally agree to these Terms of Service. The Owner assumes no responsibility or liability for any misrepresentation of Your age.",
  },
  {
    number: "4",
    title: "About the Site",
    content:
      "The Website is an online store which carries out sale of the following: perfume, deo, cream, hair oil. We reserve the right to refuse service or refuse to sell the products on the Website at our sole discretion to anyone for any reason at any time. The Website does not screen or censor the users who register on and access the Website. You assume all risks associated with dealing with other users with whom you come in contact through the Website.",
  },
  {
    number: "5",
    title: "License to Use Website",
    content:
      "The Owner may provide You with certain information as a result of Your use of the Website or Services. Subject to these Terms of Service, the Owner grants You a non-exclusive, limited, non-transferable and revocable license to use the Owner Materials solely in connection with Your use of the Website and Services. The Owner Materials may not be used for any other purpose and this license terminates upon Your cessation of use of the Website or Services.",
  },
  {
    number: "6",
    title: "Intellectual Property",
    content: [
      {
        label: "General",
        text: "You agree that the Website and all Services provided by the Owner are the property of the Owner, including all copyrights, trademarks, trade secrets, patents and other intellectual property. You agree not to reproduce or distribute the Owner IP in any way without express written permission from the Owner.",
      },
      {
        label: "a) Your Content",
        text: "In order to make the Website and Services available to You, You hereby grant the Owner a royalty-free, non-exclusive, worldwide license to copy, display, use, broadcast, transmit and make derivative works of any content You publish, upload or otherwise make available to the Website. The Owner claims no further proprietary rights in Your Content.",
      },
      {
        label: "b) Infringement",
        text: "If You feel that any of Your intellectual property rights have been infringed or otherwise violated by the posting of information or media by another of Our users, please contact Us and let Us know.",
      },
    ],
  },
  {
    number: "7",
    title: "User Obligations",
    content:
      "As a user of the Website or Services, You may be asked to register with Us. You are responsible for ensuring the accuracy of your identifying information. You must not share such identifying information with any third party. The billing information You provide us is subject to the same confidentiality and accuracy requirements. Providing false or inaccurate information, or using the Website or Services to further fraud or unlawful activity is grounds for immediate termination.",
  },
  {
    number: "8",
    title: "Payment & Fees",
    content:
      "Should You register for any of the paid Services on this website or purchase any product or service on this website, You agree to pay Us the specific monetary amounts required. The final amount required for payment will be shown to You immediately prior to purchase. We reserve the right to refuse service or refuse to sell the products on the Website at our sole discretion to anyone for any reason at any time.",
  },
  {
    number: "9",
    title: "Acceptable Use",
    content: [
      {
        label: "Prohibited Activities",
        text: "You agree not to use the Website or Services for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Website or Services in any way that could damage the Website, Services or general business of the Owner.",
      },
      {
        label: "You further agree not to:",
        text: "Harass, abuse, or threaten others; violate any intellectual property rights; upload computer viruses or other harmful software; perpetrate any fraud; engage in unlawful gambling or pyramid schemes; publish obscene or defamatory material; publish material that incites violence, hate or discrimination; or unlawfully gather information about others.",
      },
    ],
  },
  {
    number: "10",
    title: "Communication",
    content:
      "By agreeing to these Terms, you acknowledge that you consent to receive communications via phone or electronic records from the Website including e-mail messages telling you about products and services. You agree that the communications sent to You by the Website shall not be construed as spam or bulk under any law prevailing in any country where such communication is received.",
  },
  {
    number: "11",
    title: "Affiliate Marketing & Advertising",
    content:
      "The Owner, through the Website and Services, may engage in affiliate marketing whereby the Owner receives a commission on or percentage of the sale of goods or services on or through the Website. The Owner may also accept advertising and sponsorships from commercial businesses or receive other forms of advertising compensation.",
  },
  {
    number: "12",
    title: "Privacy Information",
    content: [
      {
        label: "a) Information We May Collect",
        text: "When You register for an account, You provide Us with a valid email address and may provide Us with additional information. We may also receive information through various web technologies, such as cookies, log files, clear gifs, web beacons or others.",
      },
      {
        label: "b) How We Use Information",
        text: "We use the information gathered from You to ensure Your continued good experience on Our website, including through email communication. We may also track certain passive information to improve Our marketing and analytics.",
      },
      {
        label: "c) How You Can Protect Your Information",
        text: "If You would like to disable Our access to any passive information We receive from the use of various technologies, You may choose to disable cookies in Your web browser.",
      },
    ],
  },
  {
    number: "13",
    title: "Sale of Goods / Services",
    content:
      "The Owner may sell goods or services or allow third parties to sell goods or services on the Website. The Owner undertakes to be as accurate as possible with all information regarding the goods and services, including product descriptions and images. However, the Owner does not guarantee the accuracy or reliability of any product information.",
  },
  {
    number: "14",
    title: "Shipping / Delivery / Return Policy",
    content:
      "You agree to ensure payment for any items You may purchase from Us. We reserve the right to reject or cancel an order for any reason. We will make reimbursements for returns without undue delay, and not later than 30 days after we received the goods back, or 30 days after you provide evidence of return. Reimbursements will use the same payment method as the initial transaction. Contact us at sales@alhusseinperfumes.com for any disputes.",
  },
  {
    number: "15",
    title: "Reverse Engineering & Security",
    content: [
      {
        label: "a)",
        text: "Reverse engineer, or attempt to reverse engineer or disassemble any code or software from or on the Website or Services.",
      },
      {
        label: "b)",
        text: "Violate the security of the Website or Services through any unauthorized access, circumvention of encryption or other security tools, data mining or interference to any host, user or network.",
      },
    ],
  },
  {
    number: "16",
    title: "Data Loss",
    content:
      "The Owner does not accept responsibility for the security of Your account or content. You agree that Your use of the Website or Services is at Your own risk.",
  },
  {
    number: "17",
    title: "Indemnification",
    content:
      "You agree to defend and indemnify the Owner and any of its affiliates and hold Us harmless against any and all legal claims and demands, including reasonable attorney's fees, which may arise from or relate to Your use or misuse of the Website or Services, Your breach of these Terms of Service, or Your conduct or actions.",
  },
  {
    number: "18",
    title: "Spam Policy",
    content:
      "You are strictly prohibited from using the Website or any of the Owner's Services for illegal spam activities, including gathering email addresses and personal information from others or sending any mass commercial emails.",
  },
  {
    number: "19",
    title: "Third-Party Links & Content",
    content:
      "The Owner may occasionally post links to third-party websites or other services. You agree that the Owner is not responsible or liable for any loss or damage caused as a result of Your use of any third party services linked to from Our Website.",
  },
  {
    number: "20",
    title: "Modification & Variation",
    content:
      "The Owner may, from time to time and at any time without notice to You, modify these Terms of Service. You agree that the Owner has the right to modify these Terms of Service or revise anything contained herein. All modifications are in full force and effect immediately upon posting. You agree to routinely monitor these Terms of Service for changes.",
  },
  {
    number: "21",
    title: "Entire Agreement",
    content:
      "This Agreement constitutes the entire understanding between the Parties with respect to any and all use of this Website. This Agreement supersedes and replaces all prior or contemporaneous agreements or understandings, written or oral, regarding the use of this Website.",
  },
  {
    number: "22",
    title: "Service Interruptions",
    content:
      "The Owner may need to interrupt Your access to the Website to perform maintenance or emergency services on a scheduled or unscheduled basis. You agree that Your access to the Website may be affected by unanticipated or unscheduled downtime, but that the Owner shall have no liability for any damage or loss caused as a result of such downtime.",
  },
  {
    number: "23",
    title: "Term, Termination & Suspension",
    content:
      "The Owner may terminate these Terms of Service with You at any time for any reason, with or without cause. The Owner specifically reserves the right to terminate these Terms of Service if You violate any of the terms outlined herein. At the termination of these Terms of Service, any provisions that would be expected to survive termination by their nature shall remain in full force and effect.",
  },
  {
    number: "24",
    title: "No Warranties",
    content:
      'You agree that Your use of the Website and Services is at Your sole and exclusive risk and that any Services provided by Us are on an "As Is" basis. The Owner hereby expressly disclaims any and all express or implied warranties of any kind. The Owner makes no warranties that the Website or Services will meet Your needs or that the Website or Services will be uninterrupted, error-free, or secure.',
  },
  {
    number: "25",
    title: "Limitation on Liability",
    content:
      "The Owner is not liable for any damages that may occur to You as a result of Your use of the Website or Services, to the fullest extent permitted by law.",
  },
  {
    number: "26",
    title: "General Provisions",
    content: [
      {
        label: "a) Language",
        text: "All communications made or notices given pursuant to these Terms of Service shall be in the English language.",
      },
      {
        label: "b) Jurisdiction & Governing Law",
        text: "Through Your use of the Website or Services, You agree that the laws of the United States shall govern any matter or dispute. In case any litigation is initiated, the Parties agree to submit to the exclusive jurisdiction of the courts at US, United States.",
      },
      {
        label: "c) Severability",
        text: "If any part or sub-part of these Terms of Service is held invalid or unenforceable by a court of law, the remaining parts and sub-parts will be enforced to the maximum extent possible.",
      },
      {
        label: "d) No Waiver",
        text: "In the event that We fail to enforce any provision of these Terms of Service, this shall not constitute a waiver of any future enforcement of that provision or of any other provision.",
      },
      {
        label: "e) Headings",
        text: "Headings of parts and sub-parts under these Terms of Service are for convenience and organization only and shall not affect the meaning of any provisions.",
      },
      {
        label: "f) No Agency or Partnership",
        text: "No agency, partnership, or joint venture has been created between the Parties as a result of these Terms of Service. No Party has any authority to bind the other to third parties.",
      },
    ],
  },
];

type ContentItem = { label: string; text: string };
type SectionContent = string | ContentItem[];

export default function TermsPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      {/* ── Hero ── */}
      <section
        className="relative text-center overflow-hidden"
        style={{
          paddingBlock: "120px 80px",
          background:
            "linear-gradient(180deg, hsla(210,4%,13%,1) 0%, hsla(210,4%,9%,1) 100%)",
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" x="30" y="30" fill="%23c9ab81" opacity="0.4"/></svg>')`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gold top glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,hsla(38,61%,50%,0.1)_0%,transparent_70%)]" />

        <div className="relative z-[1] max-w-[900px] mx-auto px-5">
          <p className="fade-up delay-1 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.4em] mb-3 text-[1.2rem]">
            Al Hussein Perfumes Inc.
          </p>
          {/* ── Wavy separator ── */}
          <div className="flex justify-center mb-3 fade-up delay-2">
            <Image
              src="/images/patterns/separator.svg"
              width={100}
              height={10}
              alt=""
              aria-hidden="true"
            />
          </div>
          <h1
            className="fade-up delay-3 text-white font-normal mb-6"
            style={{
              fontFamily: "var(--font-forum)",
              fontSize: "clamp(4rem, 6vw, 7rem)",
              lineHeight: 1.1,
            }}
          >
            Privacy Policy &<br />
            Terms of Service
          </h1>
          <p
            className="fade-up delay-4 text-[hsla(0,0%,65%,1)] mx-auto text-[1.6rem] leading-[1.7]"
            style={{ maxWidth: 580 }}
          >
            Please read these terms carefully before using our website or
            services. Your continued use constitutes acceptance of these terms.
          </p>

          {/* Effective date chip */}
          <div className="fade-up delay-5 inline-flex items-center gap-3 mt-8 px-6 py-3 border border-[hsl(38,61%,73%)] border-opacity-30">
            <span className="w-2 h-2 rounded-full bg-[hsl(38,61%,73%)]" />
            <span className="text-[hsl(38,61%,73%)] text-[1.3rem] uppercase tracking-[0.2em] font-bold">
              Effective Date: 2026
            </span>
          </div>
        </div>
      </section>

      {/* ── Intro block ── */}
      <section className="max-w-[900px] mx-auto px-5 py-16">
        <div className="border-l-2 border-[hsl(38,61%,73%)] pl-8 py-2">
          <p className="text-[hsla(0,0%,65%,1)] text-[1.6rem] leading-[1.85]">
            The use of this website and services provided by{" "}
            <span className="text-white font-bold">
              Al-Hussein Perfumes Inc
            </span>{" "}
            are subject to the following Terms & Conditions, all parts and
            sub-parts of which are specifically incorporated by reference here
            together with the Privacy Policy. These Terms of Service apply to
            all users of the site, including without limitation vendors, buyers,
            customers, merchants, browsers and/or contributors of content.
          </p>
        </div>
      </section>

      {/* ── Sections ── */}
      <section className="max-w-[900px] mx-auto px-5 pb-24">
        <div className="flex flex-col gap-6">
          {sections.map((sec) => (
            <div
              key={sec.number}
              className="group border border-white/10 transition-all duration-300 hover:border-[hsl(38,61%,73%)] hover:border-opacity-40"
              style={{ background: "hsla(210,4%,11%,1)" }}
            >
              {/* Section header */}
              <div
                className="flex items-center gap-5 px-8 py-6"
                style={{ borderBottom: "1px solid hsla(0,0%,100%,0.08)" }}
              >
                {/* Number badge */}
                <span
                  className="shrink-0 w-[44px] h-[44px] flex items-center justify-center border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold text-[1.4rem] transition-all duration-300 group-hover:bg-[hsl(38,61%,73%)] group-hover:text-[hsla(40,12%,5%,1)]"
                  style={{ fontFamily: "var(--font-forum)" }}
                >
                  {sec.number}
                </span>
                <h2
                  className="text-white font-normal text-[2rem] leading-tight"
                  style={{ fontFamily: "var(--font-forum)" }}
                >
                  {sec.title}
                </h2>
              </div>

              {/* Section body */}
              <div className="px-8 py-6">
                {typeof sec.content === "string" ? (
                  <p className="text-[hsla(0,0%,65%,1)] text-[1.55rem] leading-[1.85]">
                    {sec.content}
                  </p>
                ) : (
                  <div className="flex flex-col gap-5">
                    {(sec.content as ContentItem[]).map((item) => (
                      <div key={item.label} className="flex flex-col gap-1">
                        <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.15em] text-[1.2rem]">
                          {item.label}
                        </span>
                        <p className="text-[hsla(0,0%,65%,1)] text-[1.55rem] leading-[1.85]">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Contact strip ── */}
        <div
          className="mt-12 px-8 py-8 border border-[hsl(38,61%,73%)] border-opacity-40 text-center"
          style={{ background: "hsla(210,4%,11%,1)" }}
        >
          <p
            className="text-[hsl(38,61%,73%)] font-normal mb-3 text-[2rem]"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            Questions or Concerns?
          </p>
          <p className="text-[hsla(0,0%,65%,1)] text-[1.5rem] leading-[1.7]">
            For any questions, concerns, or disputes regarding these terms,
            please contact us at{" "}
            <a
              href="mailto:sales@alhusseinperfumes.com"
              className="text-[hsl(38,61%,73%)] hover:text-white transition-colors duration-300 underline underline-offset-4"
            >
              sales@alhusseinperfumes.com
            </a>
          </p>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
