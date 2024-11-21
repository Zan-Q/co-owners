import React from 'react';

export default function TermsOfServiceRoute() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using the CommUnity Owners community platform, you agree to comply with and be bound by these Terms of Service.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p>Our service provides a platform for small business membership purchase trading, allowing users to buy and sell memberships.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
        <p>Users are responsible for maintaining the confidentiality of their accounts and passwords. Any activities that occur under their account are their responsibility.</p>
        <p>By using the CommUnity Owners Community website, you agree to:</p>
        <ul className="list-disc list-inside ml-6">
          <li>Provide accurate and complete information when registering for an account.</li>
          <li>Maintain the confidentiality of your account login information.</li>
          <li>Comply with all applicable laws and regulations.</li>
          <li>Not use the platform for any illegal or unauthorized purpose.</li>
          <li>Not use the platform to transmit any unsolicited or unauthorized advertising or promotional materials.</li>
          <li>Not use the platform to harass, intimidate, or harm any other user.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Prohibited Activities</h2>
        <p>Users must not engage in any illegal or unauthorized activities while using the CommUnity Owners community App. This includes but is not limited to fraud, market manipulation, and unauthorized access to accounts.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranty</h2>
        <p>The CommUnity Owners community App is provided "as is" without any warranty. We do not guarantee the accuracy, completeness, or timeliness of the information provided.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p>We are not liable for any damages or losses resulting from the use of our webapp. Users use the service at their own risk.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
        <p>These Terms of Service are governed by and construed in accordance with the laws of Canada.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will post the updated Privacy Policy on this page and update the "Effective Date" at the top of this page.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">10. Intellectual Property</h2>
        <p>The content of the CommUnity Owners Community website, including without limitation, the text, graphics, logos, and button icons, is the property of CommUnity Owners Community or its suppliers and is protected by copyright laws. Any trademarks or service marks displayed on the website are the property of their respective owners.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
        <p>CommUnity Owners Community reserves the right to terminate or suspend your access to the CommUnity Owners Community website and services at any time, with or without cause, and without notice.</p>
      </section>

      <footer className="mt-8">
        <p className="text-sm text-gray-600 mb-2">
          These Terms of Service were last updated on November 15, 2024.
        </p>
        <p className="text-sm text-gray-600">
          Contact us at <a href="mailto:ptang@co-owners.ca" className="text-blue-500 hover:underline">ptang@co-owners.ca</a> for any questions regarding these terms.
        </p>
      </footer>
    </div>
  );
}