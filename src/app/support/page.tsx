export default function SupportPage() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">How You Can Help</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            There are many ways to support the July 24 Project and the affected community. Every contribution makes a difference.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Financial Donations */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-red-900/20 shadow-lg">
            <div className="text-red-500 mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-4">Financial Donations</h3>
            <p className="text-gray-400 mb-6">
              Your financial contribution helps provide immediate and long-term support to victims and their families.
            </p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg">
              Donate
            </button>
          </div>

          {/* Volunteer */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-red-900/20 shadow-lg">
            <div className="text-red-500 mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-4">Volunteer Your Time</h3>
            <p className="text-gray-400 mb-6">
              Join our volunteer network to help with events, outreach, and support services for affected families.
            </p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg">
              Volunteer
            </button>
          </div>

          {/* Corporate Partnerships */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-red-900/20 shadow-lg">
            <div className="text-red-500 mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-4">Corporate Partnerships</h3>
            <p className="text-gray-400 mb-6">
              Businesses can partner with us to provide resources, services, or financial support to the July 24 Project.
            </p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg">
              Partner With Us
            </button>
          </div>

          {/* In-Kind Donations */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-red-900/20 shadow-lg">
            <div className="text-red-500 mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-4">In-Kind Donations</h3>
            <p className="text-gray-400 mb-6">
              Donate goods, services, or professional expertise to help victims and families rebuild their lives.
            </p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg">
              Learn More
            </button>
          </div>

          {/* Fundraising Events */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-red-900/20 shadow-lg">
            <div className="text-red-500 mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-4">Fundraising Events</h3>
            <p className="text-gray-400 mb-6">
              Organize or participate in fundraising events to support the July 24 Project's mission and initiatives.
            </p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg">
              View Events
            </button>
          </div>

          {/* Spread Awareness */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-red-900/20 shadow-lg">
            <div className="text-red-500 mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-4">Spread Awareness</h3>
            <p className="text-gray-400 mb-6">
              Help spread awareness about the July 24 Project by sharing our mission and stories on social media.
            </p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg">
              Share Now
            </button>
          </div>
        </div>

        {/* Verification Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 mb-16 border border-red-900/20 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-100 mb-8">Verified & Trustworthy Information</h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Every piece of information on this platform undergoes rigorous verification through multiple authorities and checkpoints. Our commitment to authenticity ensures that all victim records, claims, and transactions are thoroughly validated.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-500 mb-4">Multi-Level Verification</h3>
              <p className="text-gray-400">
                Each record is verified by multiple government authorities
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-500 mb-4">Transparent Process</h3>
              <p className="text-gray-400">
                Complete transparency in verification and transaction tracking
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-500 mb-4">Secure Records</h3>
              <p className="text-gray-400">
                All information is securely maintained and regularly audited
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-red-600 rounded-lg p-8 text-center shadow-lg">
          <blockquote className="text-white text-lg italic mb-4">
            "The support from the July 24 Project has been a lifeline for our family during this difficult time. The financial assistance helped with medical bills, and the community support has given us strength to keep going."
          </blockquote>
          <cite className="text-white font-semibold">— Sarah K., family member of a victim</cite>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join us in supporting the victims and families affected by the July 24 tragedy. Every contribution, no matter the size, helps provide comfort, healing, and hope.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition shadow-lg">
              Donate Now
            </button>
            <button className="border-2 border-red-600 text-red-500 px-8 py-3 rounded-lg hover:bg-red-600/10 transition shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 