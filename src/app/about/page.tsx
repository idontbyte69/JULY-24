import React from 'react';

export default function AboutPage() {
  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">About JULY-24</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-200">
            JULY-24 marks a tragic day in our history. We are committed to supporting the victims
            and their families, ensuring they receive the care and assistance they need during this difficult time.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* The Incident */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-red-500">The Student Movement</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                During July/August 2024, Bangladesh witnessed a powerful student movement that tragically
                resulted in the loss of precious lives. What began as peaceful protests for justice and
                reform evolved into a defining moment in our nation's history.
              </p>
              <p className="text-gray-300 mb-4">
                The movement, driven by the youth's aspirations for a better future, faced unprecedented
                challenges that led to devastating consequences. The events of JULY-24 serve as a stark
                reminder of the price paid for seeking change and justice.
              </p>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg text-center border border-red-900/20">
              <div className="text-5xl font-bold text-red-500 mb-2">45</div>
              <div className="text-xl text-gray-300">Lives Lost</div>
              <p className="mt-4 text-gray-400">Young souls who made the ultimate sacrifice</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg text-center border border-red-900/20">
              <div className="text-5xl font-bold text-red-500 mb-2">120</div>
              <div className="text-xl text-gray-300">Injured</div>
              <p className="mt-4 text-gray-400">Individuals bearing physical and emotional scars</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg text-center border border-red-900/20">
              <div className="text-5xl font-bold text-red-500 mb-2">15</div>
              <div className="text-xl text-gray-300">Missing</div>
              <p className="mt-4 text-gray-400">Families still searching for their loved ones</p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-red-500">Our Mission</h2>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-red-900/20">
              <p className="text-gray-300 mb-4">
                The JULY-24 Project is dedicated to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Supporting victims and their families with immediate and long-term assistance</li>
                <li>Preserving the memory of those we lost</li>
                <li>Providing medical and psychological support to the injured</li>
                <li>Assisting in the search for missing individuals</li>
                <li>Building a community of support and healing</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-red-500">Join Our Cause</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Your support can help provide comfort, healing, and hope to those affected by the JULY-24 tragedy.
              Together, we can make a difference in the lives of those impacted.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/donate"
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
              >
                Donate Now
              </a>
              <a
                href="/volunteer"
                className="border-2 border-red-600 text-red-500 px-8 py-3 rounded-lg hover:bg-red-600/10 transition"
              >
                Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 