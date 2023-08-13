import React from "react";

function PrivacyPolicy() {
    return (
        <div className="bg-slate-800 min-h-screen flex justify-center items-center text-white">
            <div className="max-w-3xl w-full bg-slate-900 p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                <p className="mb-6">
                    Last Updated: <span className="font-bold">13 August 2023</span>
                </p>

                <p>
                    Welcome to Ecolife ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you interact with our website.
                </p>
                <p className="mt-4">
                    By accessing or using our website, you consent to the practices described in this Privacy Policy. Please take a moment to read this document to understand how your personal information will be treated.
                </p>

                {/* Information We Collect */}
                <h1 className="text-xl font-semibold mt-6 mb-2 underline decoration-solid">Information We Collect</h1>
                <p className="text-gray-300">
                    <span className="font-bold text-white">Personal Information</span><br />When you use our website, we may collect personal information such as your name, email address, postal address, phone number, and credit card information. This information is necessary for processing orders and providing you with the services you've requested.
                </p><br />

                <p className="text-gray-300">
                    <span className="font-bold text-white">Vehicle Preferences</span><br />To enhance your experience, we may ask for your vehicle preferences and requirements. This information helps us provide you with relevant recommendations and options.
                </p><br />

                <p className="text-gray-300">
                    <span className="font-bold text-white">User Accounts</span><br />If you choose to create a user account on our website, we collect your email address and password. This allows you to access certain features and make the most of our services.
                </p><br />

                <p className="text-gray-300">
                    <span className="font-bold text-white">Trial Vehicle Requests</span><br />When you request to trial a vehicle, we may collect additional information such as your driver's license and proof of insurance. This information is needed for insurance purposes and to ensure a safe trial experience.
                </p><br />

                {/* How we use your information */}
                <h1 className="text-xl font-semibold mt-6 mb-2 underline decoration-solid">How we use your information</h1>

                <p className="text-gray-300">
                    <span className="font-bold text-white">Order Processing</span><br />We use your personal information to process and fulfill orders, arrange vehicle trials, and manage payments.
                </p><br />

                <p className="text-gray-300">
                    <span className="font-bold text-white">Communication</span><br />We may use your email address to send you order confirmations, updates about your trials, and important service-related communications.
                </p><br />

                <p className="text-gray-300">
                    <span className="font-bold text-white">Customer Support</span><br />If you contact our customer support, we may use your information to assist you and address your inquiries.
                </p><br />

                <p className="text-gray-300">
                    <span className="font-bold text-white">Marketing</span><br />With your consent, we may use your email address to send you promotional offers, newsletters, and information about our products and services. You can opt-out of receiving such communications at any time.
                </p><br />

                {/* Information Sharing */}
                <h1 className="text-xl font-semibold mt-6 mb-2 underline decoration-solid">Information Sharing</h1>

                <p className="text-gray-300">
                    We do not sell, rent, or lease your personal information to third parties. However, we may share your information with:
                </p><br />

                <p className="text-gray-300">
                    <span className="font-bold text-white">Service Providers</span><br />We may share your information with third-party service providers who assist us in providing our services, such as payment processors, delivery services, and marketing platforms.
                </p><br />

                {/* Data Security */}
                <p className="text-gray-300">
                    <span className="font-bold text-white">Data Security</span><br />We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p><br />

                {/* Your Choices */}
                <h1 className="text-xl font-semibold mt-6 mb-2 underline decoration-solid">Your Choices</h1>

                <p className="text-gray-300">
                    <span className="font-bold text-white">Access and Updates</span><br />You can access and update your personal information by logging into your account on our website.
                </p><br />

                <p className="text-gray-300">
                    <span className="font-bold text-white">Marketing Communications</span><br />You can opt-out of receiving marketing communications by following the instructions provided in our emails or by contacting us directly.
                </p><br />

                {/* Children's Privacy */}
                <h1 className="text-xl font-semibold mt-6 mb-2 underline decoration-solid">Children's Privacy</h1>
                <p className="text-gray-300">
                    Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                </p><br />

                {/* Changes to this Privacy Policy */}
                <h1 className="text-xl font-semibold mt-6 mb-2 underline decoration-solid">Changes to this Privacy Policy</h1>
                <p className="text-gray-300">
                    We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the updated policy on our website.
                </p><br />

                {/* Contact Us */}
                <h1 className="text-xl font-semibold mt-6 mb-2 underline decoration-solid">Contact Us</h1>
                <p className="text-gray-300">
                    If you have any questions, concerns, or requests regarding your personal information or this Privacy Policy, please do not contact us.
                </p><br />

            </div>
        </div>
    );
}

export default PrivacyPolicy;