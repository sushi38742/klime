import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED= { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.88)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.18)'
const wrap = { maxWidth: '800px', margin: '0 auto', padding: '0 40px' }

function Section({ title, children }) {
  return (
    <FadeUp>
      <div style={{ marginBottom: '56px' }}>
        <h2 style={{ ...HL, fontSize: 'clamp(18px,2vw,24px)', margin: '0 0 16px', letterSpacing: '-0.3px' }}>
          {title}
        </h2>
        <div style={{ borderTop: HAIR, paddingTop: '20px' }}>
          {children}
        </div>
      </div>
    </FadeUp>
  )
}

function P({ children }) {
  return <p style={{ ...BODY, margin: '0 0 16px' }}>{children}</p>
}

function UL({ items }) {
  return (
    <ul style={{ ...BODY, margin: '0 0 16px', paddingLeft: '20px' }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>{item}</li>)}
    </ul>
  )
}

export default function Legal() {
  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 40px 80px', textAlign: 'center' }}>
        <div style={wrap}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 20px' }}
          >
            Legal & Policy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            style={{ ...HL, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 16px', textShadow: '0 2px 24px rgba(0,0,0,0.28)' }}
          >
            Klime Legal &amp; Policy Documents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{ ...BODY, color: 'rgba(255,255,255,0.72)', margin: 0, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Effective Date: June 1, 2026 &nbsp;&middot;&nbsp; Last Updated: June 1, 2026
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div style={wrap}>

          {/* ── TERMS OF SERVICE ── */}
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(22px,3vw,36px)', margin: '0 0 32px', letterSpacing: '-0.5px', borderBottom: HAIR, paddingBottom: '20px' }}>
              Terms of Service
            </h2>
          </FadeUp>

          <Section title="Overview">
            <P>
              These Terms of Service constitute a legally binding agreement between you and Klime ("Klime," "we," "us," or "our") governing your access to and use of the Klime platform, website, and all associated services. By creating an account, registering for a session, or otherwise accessing the platform, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, do not use Klime.
            </P>
            <P>
              If you are under the age of 18, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf. If you are a parent or guardian permitting a minor to use the Service, you agree to be responsible for that minor's use of the platform and full compliance with these Terms.
            </P>
          </Section>

          <Section title="Eligibility">
            <P>
              Klime is open to anyone who wants real access to real professionals. There is no upper age limit. Whether you are 14 or 40, if you are serious about your career and want a direct conversation with someone who has already done what you want to do, Klime is for you.
            </P>
            <P>
              To use Klime as a student you must be at least 13 years of age. Students under 18 must have parental or guardian consent before participating in any paid Ascending session. Klime may request proof of that consent at any time and may suspend access until it is provided.
            </P>
            <P>
              To use Klime as a Guide you must be at least 18 years of age, complete our verification process, and receive explicit approval from Klime before leading any session. Approval is at Klime's sole discretion and may be revoked at any time without prior notice.
            </P>
            <P>
              By using the Service you confirm that you have the legal capacity to agree to these Terms, that you are not prohibited from using the Service under any applicable law, that all information you provide is accurate and current, and that you will not use Klime for any unlawful purpose.
            </P>
          </Section>

          <Section title="Accounts and Registration">
            <P>
              To access certain features of the platform you must register for an account. You agree to provide accurate and complete information during registration and to keep this information current at all times. You are solely responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.
            </P>
            <P>
              You must notify Klime immediately at rycal03@gmail.com if you suspect any unauthorized use of your account or any breach of security. Klime will not be liable for any loss or damage arising from your failure to comply with this requirement. You may not transfer your account to any other person or entity without Klime's prior written consent.
            </P>
          </Section>

          <Section title="Sessions and Code of Conduct">
            <P>
              Klime offers two types of sessions. Summits are free live group sessions with up to ten students and one verified Guide. Ascending sessions are private paid one-on-one sessions between one student and one Guide with a curriculum built specifically for that student before the session begins.
            </P>
            <P>
              All participants — both students and Guides — agree to conduct themselves professionally and respectfully at all times. The following conduct is strictly prohibited and may result in immediate suspension or permanent termination of your account without refund:
            </P>
            <UL items={[
              'Harassment, discrimination, or abusive language directed at any participant based on race, gender, religion, national origin, disability, sexual orientation, or any other characteristic.',
              'Sharing, soliciting, or distributing any content that is sexually explicit, violent, threatening, or otherwise harmful.',
              'Attempting to circumvent the Klime platform by arranging private sessions, payments, or ongoing relationships with Guides or students outside of Klime without Klime\'s prior written consent.',
              'Recording any session in any form including audio, video, or screen capture without explicit written consent from all participants and from Klime.',
              'Impersonating any person or entity or misrepresenting your professional credentials or experience.',
              'Using the platform to solicit, advertise, or promote any external product, service, or opportunity.',
            ]} />
            <P>
              Klime reserves the right to monitor sessions for safety, quality assurance, and compliance purposes to the extent permitted by applicable law. Any session found to be in violation of this Code of Conduct may be terminated immediately without refund.
            </P>
          </Section>

          <Section title="Payments and Billing">
            <P>
              Ascending sessions are priced at $40 per session at the time of these Terms. Klime reserves the right to adjust pricing at any time with reasonable notice. All payments are processed through our third-party payment processor. By providing payment information you authorize Klime and its payment processor to charge the applicable fees.
            </P>
            <P>
              All fees are stated in US dollars and are exclusive of any applicable taxes. You are responsible for paying all taxes associated with your use of the Service as required by applicable law. Klime does not store full payment card details. All payment information is handled and stored by our payment processor in accordance with applicable PCI-DSS standards.
            </P>
          </Section>

          <Section title="Refund Policy">
            <P>
              Ascending sessions are eligible for a full refund if cancelled at least 24 hours before the scheduled session start time. Cancellations made within 24 hours of the session start time are not eligible for a refund. If a Guide cancels a session for any reason you will receive a full refund within 5 to 7 business days.
            </P>
            <P>
              If you experience a technical failure that prevents you from attending a session through no fault of your own, contact rycal03@gmail.com within 24 hours of the scheduled session and Klime will investigate and issue a refund or credit at its discretion. Refunds are not available for sessions you attended but were dissatisfied with except in cases of material misrepresentation by the Guide. Klime reserves the right to issue refunds or credits at its sole discretion in circumstances not covered by this policy. Summit sessions are free and therefore not subject to this refund policy.
            </P>
          </Section>

          <Section title="Guide Standards and Verification">
            <P>
              Every Guide on Klime undergoes a verification process before leading any session. This process includes AI-assisted credential review, public records cross-referencing, and personal review by Klime's founders. Approval is not automatic and is not guaranteed.
            </P>
            <UL items={[
              'Guides agree to represent their credentials, experience, and field of expertise accurately and completely at all times.',
              'Guides agree to build session curriculum in good faith and with genuine effort toward the student\'s stated goals.',
              'Guides agree to treat all students with professionalism and respect regardless of age, background, or experience level.',
              'Guides agree to provide a direct professional introduction at the conclusion of every Ascending session as represented in the session description.',
              'Guides agree to maintain the confidentiality of student information and session content at all times.',
            ]} />
            <P>
              Guides who fail to meet these standards, receive consistent negative feedback, or violate any provision of these Terms may be suspended or permanently removed from the platform. Klime makes these determinations at its sole discretion.
            </P>
            <P>
              Guides are independent contractors and not employees, agents, or representatives of Klime. Klime does not control the specific content of any session beyond the framework and standards described in these Terms. Klime is not responsible for the accuracy, quality, or outcome of any guidance, advice, or introductions provided by Guides.
            </P>
          </Section>

          <Section title="Intellectual Property">
            <P>
              All content on the Klime platform including the website design, logos, trademarks, written copy, software, and platform functionality is owned by or licensed to Klime and is protected by applicable intellectual property laws. You may not copy, reproduce, distribute, modify, or create derivative works of any Klime content without prior written permission.
            </P>
            <P>
              Session content including any curriculum built by a Guide for an Ascending session is considered proprietary to Klime and the respective Guide. Students may not record, distribute, or reproduce session content in any form without express written permission from both Klime and the Guide.
            </P>
            <P>
              By submitting any content to the platform including profile information, feedback, or written communications, you grant Klime a non-exclusive, royalty-free, worldwide license to use, display, and distribute that content in connection with operating and promoting the Service.
            </P>
          </Section>

          <Section title="Disclaimers and Limitation of Liability">
            <P>
              The Klime platform and all associated services are provided on an as-is and as-available basis without warranty of any kind, either express or implied. Klime does not warrant that the Service will be uninterrupted, error-free, or free of harmful components.
            </P>
            <P>
              Klime is a platform that connects students with professionals. We do not guarantee any specific outcome from participation in any session including employment offers, professional introductions that lead to specific results, academic outcomes, or career advancement. Any guidance provided by a Guide is that Guide's personal opinion and experience and does not constitute professional legal, financial, medical, or other licensed professional advice.
            </P>
            <P>
              To the maximum extent permitted by applicable law, Klime's total liability to you for any claim arising out of or related to these Terms or your use of the Service shall not exceed the total amount you paid to Klime in the twelve months preceding the claim. In no event shall Klime be liable for any indirect, incidental, special, consequential, or punitive damages including loss of profits, data, or goodwill, even if Klime has been advised of the possibility of such damages. Some jurisdictions do not allow the exclusion or limitation of certain warranties or liability so some of the above limitations may not apply to you.
            </P>
          </Section>

          <Section title="Indemnification">
            <P>
              You agree to indemnify, defend, and hold harmless Klime, its founders, officers, employees, contractors, and affiliates from and against any claims, liabilities, damages, losses, and expenses including reasonable legal fees arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, your violation of any applicable law or regulation, or your infringement of any third-party rights.
            </P>
          </Section>

          <Section title="Termination">
            <P>
              Klime reserves the right to suspend or terminate your account at any time for any reason including violation of these Terms, fraudulent activity, conduct harmful to other users, or extended inactivity. Upon termination your right to use the Service immediately ceases.
            </P>
            <P>
              You may terminate your account at any time by contacting rycal03@gmail.com. Termination does not entitle you to a refund of any fees paid prior to the termination date except as described in the Refund Policy above. Sections of these Terms that by their nature should survive termination will survive, including Intellectual Property, Disclaimers and Limitation of Liability, Indemnification, and Dispute Resolution.
            </P>
          </Section>

          <Section title="Dispute Resolution and Governing Law">
            <P>
              Any dispute arising out of or relating to these Terms or your use of the Service shall first be submitted to informal negotiation by contacting Klime at rycal03@gmail.com. If the dispute cannot be resolved informally within 30 days it shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in Florida, United States.
            </P>
            <P>
              You agree to waive any right to a jury trial and to participate in a class action lawsuit or class-wide arbitration. If this class action waiver is found unenforceable for any reason the remaining terms of this dispute resolution section shall remain in full force. These Terms are governed by the laws of the State of Florida without regard to its conflict of law provisions.
            </P>
          </Section>

          {/* ── PRIVACY POLICY ── */}
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(22px,3vw,36px)', margin: '56px 0 32px', letterSpacing: '-0.5px', borderBottom: HAIR, paddingBottom: '20px' }}>
              Privacy Policy
            </h2>
          </FadeUp>

          <Section title="Overview">
            <P>
              This Privacy Policy describes how Klime collects, uses, stores, and shares information about you when you use the Klime platform. By using the Service you agree to the collection and use of information as described in this Privacy Policy.
            </P>
          </Section>

          <Section title="Information We Collect">
            <P>
              <strong style={{ color: '#fff' }}>Information you provide directly.</strong> When you register for an account we collect your name, email address, age, field of interest, and any other information you choose to provide. If you register as a Guide we also collect your professional background, credentials, and LinkedIn profile or equivalent. If you make a payment our payment processor collects your payment information and we do not store full card numbers.
            </P>
            <P>
              <strong style={{ color: '#fff' }}>Information collected automatically.</strong> When you use the Service we automatically collect certain information including your IP address, browser type, device type, operating system, referring URLs, pages visited, and session duration. We collect this information using cookies and similar tracking technologies as described in the Cookies section below.
            </P>
            <P>
              <strong style={{ color: '#fff' }}>Session-related information.</strong> We may collect information related to your participation in sessions including scheduling information, session feedback, and written communications through the platform. We do not record audio or video of sessions without explicit consent from all participants.
            </P>
            <P>
              <strong style={{ color: '#fff' }}>Information from third parties.</strong> If you register or log in using a third-party service such as Google we receive basic profile information from that service in accordance with their privacy policies. For Guides we may receive information from public professional databases during the verification process.
            </P>
          </Section>

          <Section title="How We Use Your Information">
            <P>We use the information we collect to:</P>
            <UL items={[
              'Operate and improve the platform.',
              'Match students with appropriate Guides and sessions.',
              'Process payments and send billing communications.',
              'Send you service-related communications including session confirmations and reminders.',
              'Respond to your questions and support requests.',
              'Enforce our Terms of Service and other policies.',
              'Conduct research and analytics to improve our services.',
              'Comply with applicable legal obligations.',
            ]} />
            <P>We do not sell your personal information to third parties. We do not use your personal information to serve you third-party advertisements.</P>
          </Section>

          <Section title="How We Share Your Information">
            <P>
              <strong style={{ color: '#fff' }}>With Guides.</strong> When you book an Ascending session we share your name, stated goals, and relevant background information with your Guide so they can prepare your curriculum. Guides are bound by confidentiality obligations under their agreement with Klime.
            </P>
            <P>
              <strong style={{ color: '#fff' }}>With service providers.</strong> We share information with trusted third-party service providers who assist us in operating the platform including payment processors, email service providers, analytics providers, and cloud hosting services. These providers are contractually required to protect your information and may only use it as directed by Klime.
            </P>
            <P>
              <strong style={{ color: '#fff' }}>For legal compliance.</strong> We may disclose your information if required to do so by law or in response to a valid legal process such as a subpoena, court order, or government request. We will make reasonable efforts to notify you before disclosing your information unless prohibited by law.
            </P>
            <P>
              <strong style={{ color: '#fff' }}>In connection with a business transfer.</strong> If Klime is involved in a merger, acquisition, or sale of assets your information may be transferred as part of that transaction. We will notify you before your information is transferred and becomes subject to a different privacy policy. We do not share your personal information with any other third parties except as described above.
            </P>
          </Section>

          <Section title="Minors and COPPA Compliance">
            <P>
              Klime takes the privacy of minors seriously. We do not knowingly collect personal information from children under the age of 13 without verifiable parental consent. If we become aware that we have collected personal information from a child under 13 without appropriate consent we will take steps to delete that information promptly.
            </P>
            <P>
              For users between the ages of 13 and 17 we require parental or guardian consent before participation in paid sessions. Parents and guardians may contact us at rycal03@gmail.com to review, request deletion of, or withdraw consent for their child's information at any time. If you are a parent or guardian and believe your child has provided information to Klime without your consent please contact us immediately at rycal03@gmail.com.
            </P>
          </Section>

          <Section title="Cookies and Tracking Technologies">
            <P>
              Klime uses cookies and similar tracking technologies to operate and improve the Service. Cookies are small text files stored on your device that help us remember your preferences, analyze platform usage, and provide a consistent experience.
            </P>
            <P>We use:</P>
            <UL items={[
              'Essential cookies that are necessary for the platform to function and cannot be disabled.',
              'Analytics cookies that help us understand how users interact with the platform.',
              'Preference cookies that remember your settings and choices.',
            ]} />
            <P>
              You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of the platform. We do not use cookies to serve you third-party advertising.
            </P>
          </Section>

          <Section title="Your Rights and Choices">
            <P>Depending on your location you may have the right to:</P>
            <UL items={[
              'Access the personal information we hold about you.',
              'Request correction of inaccurate information.',
              'Request deletion of your information subject to certain exceptions.',
              'Object to or restrict certain types of processing.',
              'Request data portability.',
            ]} />
            <P>
              To exercise any of these rights contact us at rycal03@gmail.com. We will respond within 30 days. We may need to verify your identity before processing your request.
            </P>
            <P>
              If you are a resident of the European Economic Area or the United Kingdom you have additional rights under the General Data Protection Regulation or the UK GDPR respectively. If you are a resident of California you have additional rights under the California Consumer Privacy Act.
            </P>
          </Section>

          <Section title="Data Retention">
            <P>
              We retain your personal information for as long as your account is active or as necessary to provide the Service, comply with our legal obligations, resolve disputes, and enforce our agreements. If you delete your account we will delete or anonymize your personal information within 90 days except where we are required to retain it for legal or compliance purposes. Session-related records may be retained in anonymized form for product improvement purposes after account deletion.
            </P>
          </Section>

          <Section title="Data Security">
            <P>
              We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, access controls limiting who within Klime can access personal information, and regular security reviews.
            </P>
            <P>
              No method of transmission over the internet is completely secure. While we strive to protect your information we cannot guarantee absolute security. In the event of a data breach that affects your rights and freedoms we will notify you and the appropriate regulatory authorities as required by applicable law.
            </P>
          </Section>

          {/* ── ACCEPTABLE USE POLICY ── */}
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(22px,3vw,36px)', margin: '56px 0 32px', letterSpacing: '-0.5px', borderBottom: HAIR, paddingBottom: '20px' }}>
              Acceptable Use Policy
            </h2>
          </FadeUp>

          <Section title="Prohibited Conduct">
            <P>You may not use the Klime platform to:</P>
            <UL items={[
              'Harass, threaten, intimidate, or abuse any other user or third party.',
              'Impersonate any person or entity or misrepresent your identity, affiliation, or credentials.',
              'Attempt to gain unauthorized access to any account, system, or network.',
              'Introduce any virus, malware, or other harmful code into the platform.',
              'Scrape, crawl, or extract data from the platform using automated tools without written permission from Klime.',
              'Solicit students or Guides to transact directly outside of Klime.',
              'Reproduce, distribute, or exploit any session content for commercial purposes.',
              'Use the platform for any purpose that violates applicable law including privacy laws, intellectual property laws, and laws governing the solicitation of minors.',
            ]} />
            <P>Violation of this policy may result in immediate suspension or permanent termination of your account.</P>
          </Section>

          {/* ── CONTACT ── */}
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(22px,3vw,36px)', margin: '56px 0 32px', letterSpacing: '-0.5px', borderBottom: HAIR, paddingBottom: '20px' }}>
              Contact Information
            </h2>
          </FadeUp>

          <Section title="Get in Touch">
            <P>
              For all questions, requests, legal matters, privacy concerns, and support inquiries, contact Klime at:
            </P>
            <P>
              <a href="mailto:rycal03@gmail.com" style={{ color: '#6B8FFF', textDecoration: 'none' }}>rycal03@gmail.com</a>
            </P>
            <P>
              We aim to respond to all general inquiries within 2 business days and to all formal legal or privacy requests within 30 days.
            </P>
            <P style={{ ...BODY, margin: '0 0 16px' }}>
              <strong style={{ color: '#fff' }}>Mailing address:</strong><br />
              Klime<br />
              University of Florida<br />
              Gainesville, Florida, United States
            </P>
          </Section>

          <FadeUp>
            <p style={{ ...MUTED, marginTop: '40px', padding: '20px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', border: HAIR }}>
              Klime reserves the right to modify any of these policies at any time. Material changes will be communicated to users via email or prominent notice on the platform at least 14 days before taking effect. Your continued use of the platform after any change constitutes acceptance of the revised policies. These policies should be reviewed by a qualified attorney before publication. Nothing in these policies constitutes legal advice.
            </p>
          </FadeUp>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-row" style={{ borderTop: HAIR, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.75)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>&copy; 2026 Klime</span>
      </footer>

    </main>
  )
}
