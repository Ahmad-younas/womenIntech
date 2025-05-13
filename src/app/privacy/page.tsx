import React from "react";
import Header from "@/components/Header";

export default function PrivacyPolicy() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col bg-gray-50 py-16 px-4 flex-grow">
        <div className="container max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-[#4e2a5a] mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: May 15, 2025</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">1. Introduction</h2>
              <p className="mb-3">
                Women in Tech Network ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                participate in our events, or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our platform, you acknowledge that you 
                have read, understood, and agree to be bound by the terms described in this policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect several types of information from and about users of our platform, including:</p>
              
              <h3 className="text-lg font-medium text-[#4eb1ba] mt-4 mb-2">2.1 Personal Information</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name, email address, and contact details</li>
                <li>Profile information, including your photograph, biography, and professional details</li>
                <li>Account credentials, including passwords and security questions</li>
                <li>Payment information when purchasing tickets or memberships</li>
                <li>Demographic information, such as your location, preferences, and interests</li>
              </ul>
              
              <h3 className="text-lg font-medium text-[#4eb1ba] mt-4 mb-2">2.2 Usage Data</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address, browser type, operating system</li>
                <li>Pages visited and features used</li>
                <li>Time and date of your visit</li>
                <li>Referring website addresses</li>
                <li>Other analytics data about your interaction with our platform</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We may use the information we collect about you for various purposes, including to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide, maintain, and improve our platform</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative information, such as updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send promotional communications, such as special offers, newsletters, and event information</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our platform</li>
                <li>Personalize your experience on our platform</li>
                <li>Protect, investigate, and deter against fraudulent, unauthorized, or illegal activity</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">4. Sharing of Your Information</h2>
              <p className="mb-3">We may share personal information in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-[#4eb1ba]">Service Providers:</strong> We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                <li><strong className="text-[#4eb1ba]">Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                <li><strong className="text-[#4eb1ba]">Legal Requirements:</strong> We may disclose information where required to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                <li><strong className="text-[#4eb1ba]">Protection of Rights:</strong> We may disclose information to protect the safety, rights, property, or security of Women in Tech Network, our platform, any third party, or the general public.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">5. Cookies and Tracking Technologies</h2>
              <p className="mb-3">
                We use cookies and similar tracking technologies to track activity on our platform and store certain information. 
                Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you 
                do not accept cookies, you may not be able to use some portions of our platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information. 
                However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% 
                secure. While we strive to use commercially acceptable means to protect your personal information, we cannot 
                guarantee its absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">7. Your Data Protection Rights</h2>
              <p className="mb-3">Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to processing of your information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, please contact us using the details provided in the "Contact Us" section below.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">8. Children's Privacy</h2>
              <p>
                Our platform is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If you are a parent or guardian and believe that your child has provided 
                us with personal information, please contact us so that we can take necessary action.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">9. Changes to this Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last Updated" date at the top of this policy. You are advised 
                to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#4e2a5a] mb-3">10. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <address className="mt-2 not-italic">
                <p>Women in Tech Network</p>
                <p>Email: privacy@womenintech.network</p>
                <p>Address: 123 Tech Avenue, Innovation District, CA 94103</p>
              </address>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 