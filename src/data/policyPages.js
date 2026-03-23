export const POLICY_CARDS = [
  {
    slug: 'cancellations',
    label: 'Cancellations',
    summary: 'What happens when a session is cancelled — by Klime, your Guide, or you.',
  },
  {
    slug: 'refunds',
    label: 'Refunds',
    summary: 'When you can get your money back and exactly how to ask for it.',
  },
  {
    slug: 'conduct',
    label: 'Conduct',
    summary: 'What is expected of everyone in a session and what happens if it is violated.',
  },
  {
    slug: 'accessibility',
    label: 'Accessibility',
    summary: 'How to request accommodations before your session — captioning, format changes, anything.',
  },
  {
    slug: 'financial-access',
    label: 'Financial Access',
    summary: 'How to apply for a complimentary Ascending spot if cost is a barrier.',
  },
  {
    slug: 'your-data',
    label: 'Your Data',
    summary: 'What we collect, what we never do with it, and how to delete it.',
  },
]

export const POLICIES = {
  'cancellations': {
    label: 'Cancellations',
    title: 'Cancellation Policy',
    intro: 'Everything that can happen around a session being cancelled — on our end or yours.',
    sections: [
      {
        heading: 'If Klime or your Guide cancels',
        paragraphs: [
          'You will be notified immediately by email the moment a cancellation is confirmed. We will not make you find out on your own.',
          'You will receive priority access to the next available session on the same topic. No re-registration required — we handle it.',
          'You do not need to do anything. We will reach out directly with your options.',
        ],
      },
      {
        heading: 'If you need to cancel your spot',
        paragraphs: [
          'Summits are capped at ten people. If you cannot make it, please let us know as early as possible so your spot can go to someone on the waitlist.',
          'Contact us via the contact page with your name, email, and session date. We will remove you from the roster. There is no penalty — Summits are free.',
        ],
      },
      {
        heading: 'Last-minute cancellations',
        paragraphs: [
          'If a session is cancelled within two hours of the scheduled start, you will be notified immediately by email with an explanation and a priority rebooking link.',
          'We try hard to avoid this. When it happens it is almost always due to an emergency on the Guide\'s end. It is rare.',
        ],
      },
      {
        heading: 'Rescheduled sessions',
        paragraphs: [
          'When a session is rescheduled rather than cancelled outright, you will be offered the new date first. If the new time does not work for you, you can release your spot without any issue.',
        ],
      },
    ],
  },

  'refunds': {
    label: 'Refunds',
    title: 'Refund Policy',
    intro: 'Ascending sessions cost $40. Here is exactly when and how you can get that back.',
    sections: [
      {
        heading: 'Standard refund window',
        paragraphs: [
          'Ascending sessions are eligible for a full refund if cancelled at least 24 hours before the scheduled session start time.',
          'To cancel, contact us via the contact page. Include your booking email and the session date. We will confirm the cancellation and initiate the refund.',
          'Refunds typically appear within 5 to 7 business days depending on your bank.',
        ],
      },
      {
        heading: 'Cancellations within 24 hours',
        paragraphs: [
          'Cancellations made within 24 hours of the scheduled start are not eligible for a standard refund. This is because your Guide has already spent time preparing curriculum specifically for you.',
          'If something unexpected came up, contact us anyway. We consider individual circumstances and may issue a credit at our discretion.',
        ],
      },
      {
        heading: 'If your Guide cancels',
        paragraphs: [
          'If your Guide cancels for any reason, you receive a full refund automatically within 5 to 7 business days. You do not need to request it — it is issued as soon as the cancellation is confirmed.',
        ],
      },
      {
        heading: 'Technical failures',
        paragraphs: [
          'If a verified technical failure prevented you from attending a session through no fault of your own — a platform outage, a confirmed connection failure on our end — contact us within 24 hours of the scheduled session.',
          'Describe what happened and when. We will investigate and issue a full refund or credit at our discretion.',
        ],
      },
      {
        heading: 'Dissatisfaction',
        paragraphs: [
          'Refunds are not issued for sessions you attended but felt were not worth it. Every Guide builds original curriculum for your specific session, and quality is subjective.',
          'The exception is material misrepresentation. If you believe a Guide significantly misrepresented their credentials, professional background, or what the session would cover, contact us. We will review the case and make a determination.',
        ],
      },
    ],
  },

  'conduct': {
    label: 'Conduct',
    title: 'Code of Conduct',
    intro: 'What we expect from everyone in a Klime session, and what happens if those standards are not met.',
    sections: [
      {
        heading: 'The standard',
        paragraphs: [
          'Every person in a Klime session — student or Guide — is expected to show up prepared, engaged, and respectful. That is the baseline. Everything below is what happens when it is not met.',
        ],
      },
      {
        heading: 'What is prohibited',
        list: [
          'Harassment, discrimination, or abusive language of any kind directed at any participant based on race, gender, religion, national origin, disability, sexual orientation, or any other characteristic.',
          'Sharing, distributing, or soliciting content that is sexually explicit, violent, threatening, or otherwise harmful.',
          'Recording any part of a session — audio, video, or screen capture — without explicit written consent from all participants and from Klime.',
          'Attempting to arrange private sessions, payments, or ongoing relationships with Guides or students outside of Klime without prior written consent from Klime.',
          'Impersonating any person or misrepresenting your credentials, role, or professional background.',
          'Using the platform to solicit, advertise, or promote any external product, service, or opportunity.',
        ],
      },
      {
        heading: 'Consequences',
        paragraphs: [
          'Violations may result in immediate removal from the active session, temporary suspension of your account, or permanent termination without prior notice. Klime makes these decisions at its sole discretion.',
          'Refunds are not issued for sessions terminated due to conduct violations by the student.',
        ],
      },
      {
        heading: 'Reporting',
        paragraphs: [
          'If someone in your session is violating this policy, contact us via the contact page as soon as possible. Include the date and time of the session and a description of what happened.',
          'We take every report seriously and respond to every one. You will hear back from us.',
        ],
      },
    ],
  },

  'accessibility': {
    label: 'Accessibility',
    title: 'Accessibility',
    intro: 'Klime is open to everyone. If the standard session format creates a barrier for you, we want to fix that.',
    sections: [
      {
        heading: 'Our commitment',
        paragraphs: [
          'We do not ask you to justify or document your access needs. If you say you need something, we work to provide it. No further explanation required.',
        ],
      },
      {
        heading: 'What you can request',
        list: [
          'Live captioning (where technically supported by the platform)',
          'Alternative session formats or pacing',
          'Extended time or scheduled breaks within a session',
          'Written session notes or a pre-session outline',
          'Any other accommodation that would help you participate fully',
        ],
      },
      {
        heading: 'How to request',
        paragraphs: [
          'Contact us via the contact page before your session. Tell us what you need and when your session is scheduled. The earlier you let us know, the more we can arrange.',
          'We will confirm what we can provide before your session date. If we cannot fully accommodate a specific request, we will tell you why and offer alternatives.',
        ],
      },
      {
        heading: 'After the session',
        paragraphs: [
          'If something about the accessibility of your session fell short, we want to know. Contact us with feedback and we will use it to improve for the next person.',
        ],
      },
    ],
  },

  'financial-access': {
    label: 'Financial Access',
    title: 'Financial Access',
    intro: 'Ascending sessions cost $40. If that is a real barrier for you, there is a path.',
    sections: [
      {
        heading: 'Complimentary spots',
        paragraphs: [
          'We hold a small number of complimentary Ascending session spots each month. These are for students for whom the $40 fee represents a genuine financial barrier — not an inconvenience, but a real obstacle.',
          'These spots are limited. We allocate them on a case-by-case basis after reviewing each request personally.',
        ],
      },
      {
        heading: 'How to apply',
        paragraphs: [
          'Contact us via the contact page. Tell us a bit about where you are right now, what you are trying to do, and why cost is a barrier.',
          'There is no formal application, no income documentation, and no threshold you have to meet. We read every message ourselves.',
        ],
      },
      {
        heading: 'What we consider',
        paragraphs: [
          'We are looking for students who are genuinely serious about using the session well and for whom the cost would represent a real obstacle. That is the only criteria.',
          'We do not ask for proof of income or financial documentation of any kind.',
        ],
      },
      {
        heading: 'Timing and availability',
        paragraphs: [
          'Complimentary spots are limited each month. If the current month is at capacity, we will let you know and add you to priority access for the following month.',
          'We will always respond to your message, even if we cannot accommodate you immediately.',
        ],
      },
    ],
  },

  'your-data': {
    label: 'Your Data',
    title: 'Your Data',
    intro: 'What we collect, what we never do with it, and how to get rid of it.',
    sections: [
      {
        heading: 'What we collect',
        list: [
          'Your name, email address, age, and field of interest when you register for an account.',
          'Session scheduling information when you book — date, time, and which Guide you selected.',
          'Basic device and usage data automatically: IP address, browser type, and pages you visit on the platform.',
          'We do not store full payment card details. All payment processing is handled by our third-party processor under PCI-DSS standards.',
        ],
      },
      {
        heading: 'What we never do',
        list: [
          'We do not sell your data to anyone.',
          'We do not share your information with Guides beyond what is needed to prepare for your specific session — your name, stated goals, and relevant background.',
          'We do not serve you third-party advertisements.',
          'We do not record sessions without explicit consent from all participants.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'We retain your information for as long as your account is active or as needed to meet our legal obligations. If you delete your account, your personal information is deleted or anonymized within 90 days.',
          'Session records may be retained in anonymized form for internal product improvement purposes after your account is deleted.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can request access to the information we hold about you, request that we correct anything inaccurate, or request full deletion of your account and data at any time.',
          'Contact us via the contact page. We will respond within 30 days. We may ask you to verify your identity before processing the request.',
        ],
      },
    ],
  },
}
