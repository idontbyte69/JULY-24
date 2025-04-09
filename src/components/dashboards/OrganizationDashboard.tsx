'use client'

import React from 'react';

// Placeholder components for sections
const SubmitCase = () => <div className="bg-gray-800/50 p-4 rounded-lg shadow border border-red-900/10">Submit New Case (Form placeholder - details, location, etc.)</div>;
const ViewSubmittedCases = () => <div className="bg-gray-800/50 p-4 rounded-lg shadow border border-red-900/10">My Submitted Cases (List/Status placeholder)</div>;

export default function OrganizationDashboard() {
    console.log("[Rendering Component] OrganizationDashboard");
    return (
        <div className="space-y-6 p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-200">Organization Dashboard</h1>
            <p className="text-gray-400">Submit and manage cases related to your institution.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-6">
                     <SubmitCase />
                </div>
                
                {/* Column 2 */}
                 <div className="space-y-6">
                    <ViewSubmittedCases />
                </div>
            </div>
        </div>
    );
} 