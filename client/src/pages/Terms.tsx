import { LegalLayout, LegalSection, LegalList } from '@/components/LegalLayout';

export function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Rules for using TarunCode 2.0 responsibly."
      lastUpdated="Last updated: August 2026"
    >
      <LegalSection heading="Acceptance of Terms">
        <p>
          By accessing or using TarunCode 2.0, you agree to these Terms of Service. If you do not
          agree with these terms, please do not use the service.
        </p>
      </LegalSection>

      <LegalSection heading="About the Service">
        <p>
          TarunCode 2.0 provides educational laboratory programming resources, including PC Lab and
          IoT Lab programs, source code, compilation commands, sample outputs, and related learning
          materials.
        </p>
      </LegalSection>

      <LegalSection heading="Educational Purpose">
        <p>
          The content on TarunCode 2.0 is provided for educational and laboratory-learning purposes.
          Users are responsible for understanding, testing, and adapting code appropriately before
          using it in their own environment.
        </p>
      </LegalSection>

      <LegalSection heading="User Accounts">
        <LegalList
          items={[
            'Users are responsible for maintaining access to their account.',
            'Users must provide accurate information where required.',
            'Users must not misuse another person’s account.',
            'Users are responsible for activity performed through their account.',
          ]}
        />
      </LegalSection>

      <LegalSection heading="Acceptable Use">
        <p>Users must not:</p>
        <LegalList
          items={[
            'Attempt unauthorized access to the platform.',
            'Circumvent authentication or security controls.',
            'Upload malicious code or content where uploads are supported.',
            'Interfere with the operation of the service.',
            'Use the platform for unlawful activity.',
            'Abuse or attack the infrastructure.',
          ]}
        />
      </LegalSection>

      <LegalSection heading="Code and Educational Materials">
        <LegalList
          items={[
            'Programs are provided for educational use.',
            'Users may copy code for learning and laboratory purposes.',
            'Users should verify code before executing it.',
            'TarunCode 2.0 does not guarantee that every program will work in every compiler, operating system, hardware configuration, or environment.',
          ]}
        />
      </LegalSection>

      <LegalSection heading="Intellectual Property">
        <p>
          TarunCode 2.0’s original branding, interface, design, and original content remain the
          property of their respective owner(s), except where third-party or open-source materials
          apply. This does not claim ownership of third-party libraries or third-party content.
        </p>
      </LegalSection>

      <LegalSection heading="Third-Party Services">
        <p>
          The platform may rely on third-party services such as Firebase and Vercel for application
          infrastructure. These third-party services are subject to their own terms and policies.
        </p>
      </LegalSection>

      <LegalSection heading="Availability">
        <p>
          TarunCode 2.0 is provided on an availability basis. We may modify, suspend, or discontinue
          parts of the service when necessary.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimer">
        <p>
          The educational materials are provided for informational and learning purposes. We do not
          guarantee that the programs, commands, outputs, or examples will be error-free or suitable
          for every environment.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, TarunCode 2.0 and its operator are not
          liable for indirect, incidental, or consequential damages arising from the use of, or
          inability to use, the service or its educational materials. The service is provided “as is”
          without warranties of any kind, and you use it at your own risk.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to These Terms">
        <p>
          We may update these Terms when the service or applicable requirements change. The updated
          version will be posted on this page.
        </p>
      </LegalSection>

      <LegalSection heading="Governing Law">
        <p>
          These Terms are intended to be governed by the applicable laws of India, subject to
          applicable law and jurisdiction. [SITE OWNER: review and insert the specific state or court
          jurisdiction before publishing.]
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these Terms can be sent to:{' '}
          <span className="font-medium text-surface-200 dark:text-surface-200 light:text-slate-700">
            tarunsutrave35@gmail.com
          </span>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default Terms;
