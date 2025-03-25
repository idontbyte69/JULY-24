'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { deceasedVictims, injuredVictims, missingVictims } from './data'

export default function VictimsPage() {
  const [activeTab, setActiveTab] = useState('deceased');

  const renderVictims = () => {
    switch (activeTab) {
      case 'deceased':
        return deceasedVictims;
      case 'injured':
        return injuredVictims;
      case 'missing':
        return missingVictims;
      default:
        return deceasedVictims;
    }
  };

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
    <div>
      {/* Hero Section */}
      <section className="text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Victims of JULY-24</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-200">
            We honor and remember those affected by the tragic events of July 24.
            This page serves as a memorial and record of those who lost their lives,
            were injured, or remain missing.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center space-x-1 mb-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 max-w-md mx-auto shadow-lg">
            <button
              className={`flex-1 py-2 px-4 rounded-md transition ${
                activeTab === 'deceased' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-red-500'
              }`}
              onClick={() => setActiveTab('deceased')}
            >
              Deceased
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md transition ${
                activeTab === 'injured' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-red-500'
              }`}
              onClick={() => setActiveTab('injured')}
            >
              Injured
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md transition ${
                activeTab === 'missing' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-red-500'
              }`}
              onClick={() => setActiveTab('missing')}
            >
              Missing
            </button>
          </div>

          {/* Victims Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {renderVictims().map((victim) => (
              <Link 
                href={`/victims/${victim.id}`} 
                key={victim.id} 
                className="group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-red-900/20 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Victim Photo - Square Aspect Ratio */}
                  <div className="relative aspect-square">
                    <Image
                      src={victim.photo || '/placeholder-victim.jpg'}
                      alt={victim.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>

                  {/* Victim Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">{victim.name}</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>Age: {victim.age}</p>
                      <p>Location: {victim.location}</p>
                      <p className="text-gray-400 line-clamp-1">{victim.details}</p>
                    </div>
                    <div className="mt-3">
                      <span className={`inline-block ${getStatusColor(victim.status)} px-2 py-1 rounded-full text-xs`}>
                        {victim.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-6 text-red-500">Help Us Find Missing Victims</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              If you have any information about the missing victims or can help identify them,
              please contact us immediately. Your assistance could help bring closure to their families.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/contact"
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
              >
                Report Information
              </a>
              <a
                href="/support"
                className="border-2 border-red-600 text-red-500 px-8 py-3 rounded-lg hover:bg-red-600/10 transition"
              >
                Support Victims
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 