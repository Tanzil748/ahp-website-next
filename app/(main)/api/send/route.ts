import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { type } = body;

  // ── Subscribe ────────────────────────────────────────────────────────────────
  if (type === "subscribe") {
    const { email } = body;

    const { data, error } = await resend.emails.send({
      from: "Al Hussein Perfumes <onboarding@resend.dev>",
      to: "tanzilhassan333@gmail.com",
      replyTo: email,
      subject: `New Mailing List Request — ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:0;background:#0e0e0e;color:#fff;">

          <!-- Header bar -->
          <div style="background:#1a1a1a;padding:32px 40px;border-bottom:2px solid hsl(38,61%,73%);">
            <div style="width:40px;height:2px;background:hsl(38,61%,73%);margin-bottom:16px;"></div>
            <h2 style="margin:0;font-size:22px;font-weight:400;color:#fff;letter-spacing:1px;font-family:Georgia,serif;">
              New Mailing List Request
            </h2>
            <p style="margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#888;">
              Al Hussein Perfumes
            </p>
          </div>

          <!-- Body -->
          <div style="background:#1a1a1a;padding:32px 40px;border:1px solid #2a2a2a;border-top:none;">
            <p style="margin:0 0 24px;font-size:15px;color:#aaa;line-height:1.7;">
              The following email address has requested to be added to the mailing list:
            </p>

            <div style="background:#111;border:1px solid #2a2a2a;padding:20px 24px;margin-bottom:24px;">
              <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#666;font-weight:700;">
                Email Address
              </p>
              <a href="mailto:${email}" style="font-size:17px;color:hsl(38,61%,73%);text-decoration:none;font-weight:600;">
                ${email}
              </a>
            </div>

            <p style="margin:0;font-size:13px;color:#555;line-height:1.6;">
              Please add this address to your mailing list at your earliest convenience.
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#111;padding:20px 40px;border:1px solid #2a2a2a;border-top:none;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#444;">
              Sent from the subscribe form at alhusseinperfumes.com
            </p>
          </div>

        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  }

  // ── Wholesale inquiry ────────────────────────────────────────────────────────
  if (type === "wholesale") {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      website,
      businessType,
      businessAddress,
      salesChannels,
      sellsFragrances,
      monthlyVolume,
      interestedBrands,
      internationalShipping,
      freightForwarder,
      message,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "Al Hussein Perfumes <onboarding@resend.dev>",
      to: "tanzilhassan333@gmail.com",
      replyTo: email,
      subject: `Wholesale Inquiry — ${company} · ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:0;background:#0e0e0e;color:#fff;">
          <div style="background:#1a1a1a;padding:32px 40px;border-bottom:2px solid hsl(38,61%,73%);">
            <div style="width:40px;height:2px;background:hsl(38,61%,73%);margin-bottom:16px;"></div>
            <h2 style="margin:0;font-size:22px;font-weight:400;color:#fff;letter-spacing:1px;font-family:Georgia,serif;">
              Wholesale &amp; Retail Inquiry
            </h2>
            <p style="margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#888;">
              Al Hussein Perfumes
            </p>
          </div>
          <div style="background:#1a1a1a;padding:32px 40px;border:1px solid #2a2a2a;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;width:180px;vertical-align:top;">Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;font-size:15px;">
                  <a href="mailto:${email}" style="color:hsl(38,61%,73%);text-decoration:none;">${email}</a>
                </td>
              </tr>
              ${phone ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Phone</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${phone}</td></tr>` : ""}
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Company</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:hsl(38,61%,73%);font-size:15px;font-weight:700;">${company}</td>
              </tr>
              ${website ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Website</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;font-size:15px;"><a href="${website}" style="color:hsl(38,61%,73%);text-decoration:none;">${website}</a></td></tr>` : ""}
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Business Type</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${businessType}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Business Address</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${businessAddress}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Sales Channels</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${Array.isArray(salesChannels) ? salesChannels.join(", ") : salesChannels}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Sells Fragrances</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${sellsFragrances === "yes" ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Monthly Volume</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:hsl(38,61%,73%);font-size:15px;font-weight:700;">${monthlyVolume}</td>
              </tr>
              ${interestedBrands && interestedBrands.length > 0 ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Interested Brands</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${Array.isArray(interestedBrands) ? interestedBrands.join(", ") : interestedBrands}</td></tr>` : ""}
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Intl. Shipping</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${internationalShipping === "yes" ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;${message ? "border-bottom:1px solid #2a2a2a;" : ""}color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Freight Forwarder</td>
                <td style="padding:12px 0;${message ? "border-bottom:1px solid #2a2a2a;" : ""}color:#fff;font-size:15px;">${freightForwarder === "yes" ? "Yes" : "No"}</td>
              </tr>
              ${message ? `<tr><td style="padding:12px 0;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Message</td><td style="padding:12px 0;color:#fff;font-size:15px;white-space:pre-wrap;line-height:1.6;">${message}</td></tr>` : ""}
            </table>
          </div>
          <div style="background:#111;padding:20px 40px;border:1px solid #2a2a2a;border-top:none;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#444;">
              Sent from the wholesale inquiry form at alhusseinperfumes.com
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  }

  // ── Blogger inquiry ──────────────────────────────────────────────────────────
  if (type === "blogger") {
    const {
      fullName,
      email,
      country,
      phone,
      hasBlog,
      monthlySubscribers,
      socialLinks,
      message,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "Al Hussein Perfumes <onboarding@resend.dev>",
      to: "tanzilhassan333@gmail.com",
      replyTo: email,
      subject: `Blogger Inquiry — ${fullName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:0;background:#0e0e0e;color:#fff;">

          <!-- Header bar -->
          <div style="background:#1a1a1a;padding:32px 40px;border-bottom:2px solid hsl(38,61%,73%);">
            <div style="width:40px;height:2px;background:hsl(38,61%,73%);margin-bottom:16px;"></div>
            <h2 style="margin:0;font-size:22px;font-weight:400;color:#fff;letter-spacing:1px;font-family:Georgia,serif;">
              Blogger / Creator Inquiry
            </h2>
            <p style="margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#888;">
              Al Hussein Perfumes
            </p>
          </div>

          <!-- Body -->
          <div style="background:#1a1a1a;padding:32px 40px;border:1px solid #2a2a2a;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;width:160px;vertical-align:top;">Full Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;font-size:15px;">
                  <a href="mailto:${email}" style="color:hsl(38,61%,73%);text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Country</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${country}</td>
              </tr>
              ${
                phone
                  ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Phone</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${phone}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Has a Blog</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${hasBlog === "yes" ? "Yes" : "No"}</td>
              </tr>
              ${
                hasBlog === "yes" && monthlySubscribers
                  ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Monthly Subscribers</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${monthlySubscribers}</td>
              </tr>`
                  : ""
              }
              ${
                socialLinks
                  ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Social Links</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;white-space:pre-wrap;line-height:1.6;">${socialLinks}</td>
              </tr>`
                  : ""
              }
              ${
                message
                  ? `
              <tr>
                <td style="padding:12px 0;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Additional Info</td>
                <td style="padding:12px 0;color:#fff;font-size:15px;white-space:pre-wrap;line-height:1.6;">${message}</td>
              </tr>`
                  : ""
              }
            </table>
          </div>

          <!-- Footer -->
          <div style="background:#111;padding:20px 40px;border:1px solid #2a2a2a;border-top:none;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#444;">
              Sent from the blogger inquiry form at alhusseinperfumes.com
            </p>
          </div>

        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  }

  // ── Influencer collaboration ──────────────────────────────────────────────────
  if (type === "influencer") {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      company,
      socialLinks,
      message,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "Al Hussein Perfumes <onboarding@resend.dev>",
      to: "tanzilhassan333@gmail.com",
      replyTo: email,
      subject: `Influencer Application — ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:0;background:#0e0e0e;color:#fff;">
          <div style="background:#1a1a1a;padding:32px 40px;border-bottom:2px solid hsl(38,61%,73%);">
            <div style="width:40px;height:2px;background:hsl(38,61%,73%);margin-bottom:16px;"></div>
            <h2 style="margin:0;font-size:22px;font-weight:400;color:#fff;letter-spacing:1px;font-family:Georgia,serif;">
              Influencer Collaboration Application
            </h2>
            <p style="margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#888;">
              Al Hussein Perfumes
            </p>
          </div>
          <div style="background:#1a1a1a;padding:32px 40px;border:1px solid #2a2a2a;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;width:160px;vertical-align:top;">Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;font-size:15px;">
                  <a href="mailto:${email}" style="color:hsl(38,61%,73%);text-decoration:none;">${email}</a>
                </td>
              </tr>
              ${phone ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Phone</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${phone}</td></tr>` : ""}
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Country</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${country}</td>
              </tr>
              ${company ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Channel / Brand</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:hsl(38,61%,73%);font-size:15px;font-weight:700;">${company}</td></tr>` : ""}
              ${socialLinks ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Social Links</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;white-space:pre-wrap;line-height:1.6;">${socialLinks}</td></tr>` : ""}
              <tr>
                <td style="padding:12px 0;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Pitch</td>
                <td style="padding:12px 0;color:#fff;font-size:15px;white-space:pre-wrap;line-height:1.6;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background:#111;padding:20px 40px;border:1px solid #2a2a2a;border-top:none;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#444;">
              Sent from the influencer collaboration form at alhusseinperfumes.com
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  }

  // ── Fragrance request ────────────────────────────────────────────────────────
  if (type === "fragrance") {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      gender,
      ageRange,
      fragranceName,
      fragranceBrand,
      fragranceLink,
      message,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "Al Hussein Perfumes <onboarding@resend.dev>",
      to: "tanzilhassan333@gmail.com",
      replyTo: email,
      subject: `Fragrance Request — ${fragranceName} · ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:0;background:#0e0e0e;color:#fff;">
          <div style="background:#1a1a1a;padding:32px 40px;border-bottom:2px solid hsl(38,61%,73%);">
            <div style="width:40px;height:2px;background:hsl(38,61%,73%);margin-bottom:16px;"></div>
            <h2 style="margin:0;font-size:22px;font-weight:400;color:#fff;letter-spacing:1px;font-family:Georgia,serif;">
              Fragrance Request
            </h2>
            <p style="margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#888;">
              Al Hussein Perfumes
            </p>
          </div>
          <div style="background:#1a1a1a;padding:32px 40px;border:1px solid #2a2a2a;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;width:160px;vertical-align:top;">Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;font-size:15px;">
                  <a href="mailto:${email}" style="color:hsl(38,61%,73%);text-decoration:none;">${email}</a>
                </td>
              </tr>
              ${phone ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Phone</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${phone}</td></tr>` : ""}
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Country</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${country}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Gender</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${gender}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Age Range</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${ageRange}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Fragrance Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:hsl(38,61%,73%);font-size:15px;font-weight:700;">${fragranceName}</td>
              </tr>
              ${fragranceBrand ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Fragrance Brand</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${fragranceBrand}</td></tr>` : ""}
              ${fragranceLink ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">External Link</td><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;font-size:15px;"><a href="${fragranceLink}" style="color:hsl(38,61%,73%);text-decoration:none;">${fragranceLink}</a></td></tr>` : ""}
              ${message ? `<tr><td style="padding:12px 0;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Additional Info</td><td style="padding:12px 0;color:#fff;font-size:15px;white-space:pre-wrap;line-height:1.6;">${message}</td></tr>` : ""}
            </table>
          </div>
          <div style="background:#111;padding:20px 40px;border:1px solid #2a2a2a;border-top:none;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#444;">
              Sent from the fragrance request form at alhusseinperfumes.com
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  }

  // ── Contact form ─────────────────────────────────────────────────────────────
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    inquiryType,
    orderId,
    message,
    to,
  } = body;

  const { data, error } = await resend.emails.send({
    from: "Al Hussein Perfumes <onboarding@resend.dev>",
    to: to ?? "tanzilhassan333@gmail.com",
    replyTo: email,
    subject: `New Contact Form Submission — ${firstName} ${lastName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:0;background:#0e0e0e;color:#fff;">

        <!-- Header bar -->
        <div style="background:#1a1a1a;padding:32px 40px;border-bottom:2px solid hsl(38,61%,73%);">
          <div style="width:40px;height:2px;background:hsl(38,61%,73%);margin-bottom:16px;"></div>
          <h2 style="margin:0;font-size:22px;font-weight:400;color:#fff;letter-spacing:1px;font-family:Georgia,serif;">
            New Contact Form Submission
          </h2>
          <p style="margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#888;">
            Al Hussein Perfumes
          </p>
        </div>

        <!-- Body -->
        <div style="background:#1a1a1a;padding:32px 40px;border:1px solid #2a2a2a;border-top:none;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;width:130px;vertical-align:top;">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;font-size:15px;">
                <a href="mailto:${email}" style="color:hsl(38,61%,73%);text-decoration:none;">${email}</a>
              </td>
            </tr>
            ${
              phone
                ? `
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${phone}</td>
            </tr>`
                : ""
            }
            ${
              company
                ? `
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Company</td>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${company}</td>
            </tr>`
                : ""
            }
            ${
              inquiryType
                ? `
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Inquiry Type</td>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:hsl(38,61%,73%);font-size:15px;font-weight:700;">${inquiryType}</td>
            </tr>`
                : ""
            }
            ${
              orderId
                ? `
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Order ID</td>
              <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:15px;">${orderId}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:12px 0;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;vertical-align:top;">Message</td>
              <td style="padding:12px 0;color:#fff;font-size:15px;white-space:pre-wrap;line-height:1.6;">${message}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background:#111;padding:20px 40px;border:1px solid #2a2a2a;border-top:none;">
          <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#444;">
            Sent from the contact form at alhusseinperfumes.com
          </p>
        </div>

      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data?.id });
}
