'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { deceasedVictims, injuredVictims, missingVictims } from '../data'

interface Victim {
  id: number;
  name: string;
  age: number;
  location: string;
  date: string;
  details: string;
  status: string;
  photo: string;
  additionalInfo: string;
}

const getVictimData = (id: string): Victim | undefined => {
  const allVictims = [...deceasedVictims, ...injuredVictims, ...missingVictims];
  return allVictims.find(victim => victim.id === parseInt(id));
};

export default function VictimPage({ params }: { params: { id: string } }) {
  const victim = getVictimData(params.id);

  if (!victim) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Victim Not Found</h1>
          <p className="text-gray-300 mb-8">The victim you're looking for could not be found.</p>
          <Link 
            href="/victims" 
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Return to Victims List
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Deceased':
        return 'bg-red-900/50 text-red-300';
      case 'Injured':
        return 'bg-yellow-900/50 text-yellow-300';
      case 'Missing':
        return 'bg-blue-900/50 text-blue-300';
      default:
        return 'bg-gray-900/50 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Full Image */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={victim.photo || '/placeholder-victim.jpg'}
            alt={victim.name}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-4">{victim.name}</h1>
            <span className={`inline-block ${getStatusColor(victim.status)} px-4 py-2 rounded-full text-lg mb-6`}>
              {victim.status}
            </span>
            <p className="text-xl text-gray-300">{victim.details}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/victims" 
            className="inline-flex items-center text-gray-400 hover:text-red-500 mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Victims List
          </Link>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-red-900/20 overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-200 mb-4">Personal Information</h2>
                  <div className="space-y-3 text-gray-300">
                    <p><span className="font-medium">Age:</span> {victim.age}</p>
                    <p><span className="font-medium">Location:</span> {victim.location}</p>
                    <p><span className="font-medium">Date:</span> {victim.date}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-200 mb-4">Details</h2>
                  <p className="text-gray-300">{victim.details}</p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t border-red-900/20 pt-8">
                <h2 className="text-xl font-semibold text-gray-200 mb-4">Additional Information</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">
                    {victim.additionalInfo || 'No additional information available at this time.'}
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Report Information
                </Link>
                <Link
                  href="/support"
                  className="border-2 border-red-600 text-red-500 px-6 py-3 rounded-lg hover:bg-red-600/10 transition"
                >
                  Support Family
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 