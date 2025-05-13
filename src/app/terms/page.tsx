import React from "react";
import Header from "@/components/Header";

export default function TermsOfService() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col bg-gray-50 py-16 px-4 flex-grow">
        <div className="container max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-[#4e2a5a] mb-6">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last Updated: May 15, 2025</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">1. Introduction</h2>
              <p className="mb-3">
                Welcome to Women in Tech Network. These Terms of Service govern your use of our website, services, 
                and participation in our events and conferences.
              </p>
              <p>
                By accessing or using the Women in Tech Network platform, you agree to be bound by these Terms. 
                If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">2. Definitions</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-[#4eb1ba]">Service</strong> refers to the Women in Tech Network website, platform, and all related activities and events.</li>
                <li><strong className="text-[#4eb1ba]">User</strong> refers to the individual accessing or using our service.</li>
                <li><strong className="text-[#4eb1ba]">Content</strong> refers to text, images, videos, and any other materials made available through our service.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">3. User Accounts</h2>
              <p className="mb-3">
                When you create an account with us, you must provide accurate, complete, and current information. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p className="mb-3">
                You are responsible for safeguarding the password that you use to access the service and for any activities 
                or actions under your password. We encourage you to use strong passwords (e.g., passwords that use a combination 
                of upper and lower case letters, numbers, and symbols).
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming 
                aware of any breach of security or unauthorized use of your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">4. Intellectual Property</h2>
              <p className="mb-3">
                The service and its original content, features, and functionality are and will remain the exclusive property 
                of Women in Tech Network and its licensors. The service is protected by copyright, trademark, and other 
                intellectual property laws.
              </p>
              <p>
                Our trademarks and branding may not be used in connection with any product or service without the prior 
                written consent of Women in Tech Network.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">5. User Content</h2>
              <p className="mb-3">
                Our service allows you to post, link, share, and otherwise make available certain information, text, graphics, 
                videos, or other material. You are responsible for the content you post.
              </p>
              <p className="mb-3">
                By posting content to the service, you grant us the right to use, modify, publicly perform, publicly display, 
                reproduce, and distribute such content on and through the service. You retain any and all of your rights to 
                any content you submit, post, or display on or through the service.
              </p>
              <p>
                You represent and warrant that you own or control all rights to the content you provide, that the content is 
                accurate, and that use of the content does not violate these Terms and will not cause injury to any person or entity.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">6. Events and Conferences</h2>
              <p className="mb-3">
                Participation in Women in Tech Network events and conferences is subject to specific terms and conditions 
                for each event, which will be provided at the time of registration.
              </p>
              <p>
                Event tickets are non-refundable unless otherwise specified in the event-specific terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">7. Limitation of Liability</h2>
              <p>
                In no event shall Women in Tech Network, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
                inability to access or use the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide 
                notice of significant changes to the terms by posting on our website. It is your responsibility to review 
                these Terms periodically for changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <address className="mt-2 not-italic">
                <p>Women in Tech Network</p>
                <p>Email: legal@womenintech.network</p>
                <p>Address: 123 Tech Avenue, Innovation District, CA 94103</p>
              </address>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 