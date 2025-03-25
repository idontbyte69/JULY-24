import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-900/90 to-gray-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Supporting Victims of JULY-24</h1>
        <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Together we can provide comfort, support, and resources to those affected by this devastating event.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/donate"
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Donate Now
          </Link>
          <Link
            href="/victims"
            className="border-2 border-red-600 text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-red-600/10 transition"
          >
            View Victims List
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-500">About JULY-24</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                During July/August 2024, Bangladesh witnessed a powerful student movement that tragically
                resulted in the loss of precious lives. What began as peaceful protests for justice and
                reform evolved into a defining moment in our nation's history.
              </p>
              <p className="text-gray-300 mb-6">
                The movement, driven by the youth's aspirations for a better future, faced unprecedented
                challenges that led to devastating consequences. The events of JULY-24 serve as a stark
                reminder of the price paid for seeking change and justice.
              </p>
              <div className="flex flex-col space-y-4">
                <h3 className="text-xl font-semibold text-red-500">Our Mission</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Supporting victims and their families with immediate and long-term assistance</li>
                  <li>Preserving the memory of those we lost</li>
                  <li>Providing medical and psychological support to the injured</li>
                  <li>Assisting in the search for missing individuals</li>
                  <li>Building a community of support and healing</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-red-900/20">
              <h3 className="text-2xl font-bold text-red-500 mb-6">Verified & Trustworthy Information</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">Multi-Level Verification</h4>
                  <p className="text-gray-400">
                    Each record is verified by multiple government authorities and independent sources to ensure accuracy.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">Transparent Process</h4>
                  <p className="text-gray-400">
                    Complete transparency in verification and transaction tracking for all support activities.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">Secure Records</h4>
                  <p className="text-gray-400">
                    All information is securely maintained and regularly audited to protect sensitive data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-500">Impact Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg border border-red-900/20">
              <div className="text-5xl font-bold text-red-500 mb-2">45</div>
              <div className="text-gray-300 text-lg">Lives Lost</div>
              <div className="mt-2 text-gray-400 text-sm">Young souls who made the ultimate sacrifice</div>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg border border-red-900/20">
              <div className="text-5xl font-bold text-red-500 mb-2">120</div>
              <div className="text-gray-300 text-lg">Injured</div>
              <div className="mt-2 text-gray-400 text-sm">Bearing physical and emotional scars</div>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg border border-red-900/20">
              <div className="text-5xl font-bold text-red-500 mb-2">15</div>
              <div className="text-gray-300 text-lg">Missing</div>
              <div className="mt-2 text-gray-400 text-sm">Families searching for their loved ones</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-500">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-red-900/20">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Community Healing Circle</h3>
              <p className="text-gray-400 mb-4">Join us for a community gathering focused on healing and remembrance.</p>
              <Link href="/events" className="text-red-500 hover:text-red-400">Learn more →</Link>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-red-900/20">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Fundraising Dinner</h3>
              <p className="text-gray-400 mb-4">A special evening to raise funds for the long-term support of affected families.</p>
              <Link href="/events" className="text-red-500 hover:text-red-400">Learn more →</Link>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-red-900/20">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Memorial Service</h3>
              <p className="text-gray-400 mb-4">A memorial service to honor those lost and affected by the JULY-24 tragedy.</p>
              <Link href="/events" className="text-red-500 hover:text-red-400">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-t from-red-900/90 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Making a Difference</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Your support can help provide comfort, healing, and hope to those affected by the JULY-24 tragedy.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/donate"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Donate Now
            </Link>
            <Link
              href="/volunteer"
              className="border-2 border-red-600 text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-red-600/10 transition"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 