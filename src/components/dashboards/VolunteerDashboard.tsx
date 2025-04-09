'use client'

import React from 'react';

// Placeholder components for sections
const AssignedTasks = () => <div className="bg-gray-800/50 p-4 rounded-lg shadow border border-red-900/10">My Assigned Tasks (List placeholder)</div>;
const UploadContent = () => <div className="bg-gray-800/50 p-4 rounded-lg shadow border border-red-900/10">Upload Content (Form placeholder - articles, gallery)</div>;
const ManagementOverview = () => <div className="bg-gray-800/50 p-4 rounded-lg shadow border border-red-900/10">Overall Management View (Read-only stats/info placeholder)</div>;

export default function VolunteerDashboard() {
    console.log("[Rendering Component] VolunteerDashboard");
    return (
        <div className="space-y-6 p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-200">Volunteer Dashboard</h1>
            <p className="text-gray-400">View your tasks and contribute content.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Column 1 */}
                <div className="space-y-6">
                    <AssignedTasks />
                    <UploadContent />
                </div>

                 {/* Column 2 */}
                 <div className="space-y-6">
                    <ManagementOverview />
                 </div>
            </div>
        </div>
    );
} 