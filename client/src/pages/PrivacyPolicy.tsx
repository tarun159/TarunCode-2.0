import { LegalLayout, LegalSection, LegalList } from '@/components/LegalLayout';

// Easy-to-replace contact placeholder.
const CONTACT_EMAIL = 'tarunsutrave35@gmail.com';

export function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How TarunCode 2.0 handles information when you use the platform."
      lastUpdated="Last updated: August 2026"
    >
      <LegalSection heading="Introduction">
        <p>
          TarunCode 2.0 is a student-focused laboratory programming platform that provides organized
          PC Lab and IoT Lab programs, code examples, commands, and sample outputs.
        </p>
        <p>
          This Privacy Policy explains what information may be processed when you use TarunCode 2.0
          and how that information is used.
        </p>
      </LegalSection>

      <LegalSection heading="Information We May Collect">
        <p className="font-medium text-surface-200 dark:text-surface-200 light:text-slate-700">
          Account information
        </p>
        <LegalList
          items={[
            'Email address used for authentication.',
            'Authentication and account information provided through Firebase Authentication.',
            'A basic profile stored by the application, which includes the username you choose and your email address.',
          ]}
        />
        <p className="font-medium text-surface-200 dark:text-surface-200 light:text-slate-700 pt-2">
          Technical information
        </p>
        <p>
          Like most web applications, certain technical information may be processed by the hosting,
          authentication, and infrastructure services used to operate the website. This may include
          information necessary for security, reliability, and normal operation.
        </p>
      </LegalSection>

      <LegalSection heading="How We Use Information">
        <p>Information may be used to:</p>
        <LegalList
          items={[
            'Create and authenticate user accounts.',
            'Provide access to authenticated features.',
            'Maintain account security.',
            'Operate and improve the platform.',
            'Respond to support or contact requests if applicable.',
            'Maintain the reliability and security of the service.',
          ]}
        />
        <p>Information is not used for advertising or user profiling.</p>
      </LegalSection>

      <LegalSection heading="Firebase">
        <p>
          TarunCode 2.0 uses Firebase services for authentication and related application
          functionality. Information processed through Firebase is handled according to the
          configuration of the application and Google's applicable policies.
        </p>
        <p>
          You can review Google's privacy practices at the{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 dark:text-primary-400 light:text-primary-600 hover:underline"
          >
            Google Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Data Sharing">
        <p>We do not sell your personal information.</p>
        <p>
          Information may be processed by service providers that are necessary to operate TarunCode
          2.0, such as authentication, hosting, and infrastructure providers.
        </p>
      </LegalSection>

      <LegalSection heading="Data Security">
        <p>
          Reasonable technical and organizational measures are used to protect information processed
          by the platform. No method of transmission or storage is completely secure, and we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Data Retention">
        <p>
          Account-related information may be retained while your account is active or as reasonably
          necessary for legitimate operational and legal purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Your Choices and Rights">
        <p>
          You may contact the platform to ask about the personal information we hold, request
          correction where applicable, request deletion where applicable, or withdraw consent where
          applicable. We will respond in line with applicable law and the capabilities of the
          service.
        </p>
      </LegalSection>

      <LegalSection heading="Children's Privacy">
        <p>
          The service is intended for general educational use. Users should provide only the
          information necessary to use the service, and anyone who is not legally permitted to use
          the service should not create an account.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy when the service, technology, or applicable requirements
          change. The updated version will be posted on this page with a revised “Last updated” date.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Privacy questions can be sent to:{' '}
          <span className="font-medium text-surface-200 dark:text-surface-200 light:text-slate-700">
            {CONTACT_EMAIL}
          </span>
        </p>
        <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 pt-2">
          This Privacy Policy is provided as general website information and should be reviewed and
          adapted to the actual data practices and legal obligations applicable to the operator of
          TarunCode 2.0.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default PrivacyPolicy;
