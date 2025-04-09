'use client'

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Correct named import
import DashboardLayout from '@/components/DashboardLayout'; // Assuming this component exists and provides the layout

// --- Real Admin Dashboard Component ---
const AdminDashboard = () => {
    // Data previously in the main function
    const stats = [
        { name: 'Total Victims', value: '156' }, // Example Data
        { name: 'Pending Verifications', value: '23' },
        { name: 'Active Nominees', value: '89' },
        { name: 'Total Donations', value: '৳ 1.2M' },
    ];
    const cards = [
        { title: 'User Management', description: 'Manage user accounts.', href: '/dashboard/users' },
        { title: 'Content Approval', description: 'Review submissions.', href: '/dashboard/content' },
        { title: 'Victim Verification', description: 'Verify victim profiles.', href: '/dashboard/victims' },
        // Add other cards back as needed
    ];

    return (
        <DashboardLayout> { /* Wrap content in the Admin Layout */ }
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-200">Admin Dashboard</h1>
                    <p className="mt-2 text-gray-400">Overview and management tools</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.name} className="bg-gray-800/50 backdrop-blur-sm border border-red-900/20 rounded-lg p-6">
                            <dt className="text-sm font-medium text-gray-400">{stat.name}</dt>
                            <dd className="mt-2 text-3xl font-semibold text-gray-200">{stat.value}</dd>
                        </div>
                    ))}
                </div>

                {/* Quick Access Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <a key={card.title} href={card.href} className="block bg-gray-800/30 border border-red-900/10 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
                            <h3 className="text-lg font-semibold text-gray-200">{card.title}</h3>
                            <p className="mt-2 text-sm text-gray-400">{card.description}</p>
                        </a>
                    ))}
                </div>
                {/* Add Recent Activity section if needed */}
            </div>
        </DashboardLayout>
    );
};
// --- End of Admin Dashboard Component ---

// Placeholder components for other roles
// const AdminDashboard = () => <div className="p-6 bg-gray-800 rounded-lg shadow">Admin Dashboard Content</div>; // Remove placeholder
const VictimFamilyDashboard = () => <div className="p-6 bg-gray-800 rounded-lg shadow">Victim/Family Dashboard Content</div>;
const VolunteerDashboard = () => <div className="p-6 bg-gray-800 rounded-lg shadow">Volunteer Dashboard Content</div>;
const OrganizationDashboard = () => <div className="p-6 bg-gray-800 rounded-lg shadow">Organization Dashboard Content</div>;
const LoadingComponent = () => <div className="p-6 text-center text-gray-400">Loading Dashboard...</div>;
const ErrorComponent = ({ message }: { message: string }) => <div className="p-6 text-center text-red-500">Error: {message}</div>;

interface DecodedToken {
    userId: string | number;
    role: string;
    iat: number;
    exp: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("DashboardPage: useEffect running");
        const token = localStorage.getItem('authToken');
        console.log("DashboardPage: Token from localStorage:", token ? "Found" : "Not Found");

        if (!token) {
            console.log("DashboardPage: No token found, redirecting to sign-in.");
            router.replace('/sign-in');
            return;
        }

        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            console.log("DashboardPage: Decoded token:", decodedToken);
            
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                console.log("DashboardPage: Token expired.");
                localStorage.removeItem('authToken');
                setError('Your session has expired. Please sign in again.');
                router.replace('/sign-in');
                return;
            }

            setUserRole(decodedToken.role);
            console.log("DashboardPage: User role set:", decodedToken.role);

        } catch (err) {
            console.error("DashboardPage: Error decoding token:", err);
            localStorage.removeItem('authToken');
            setError('Invalid session. Please sign in again.');
            router.replace('/sign-in');
            return;
        }

        setIsLoading(false);
    }, [router]);

    // Component selector based on role
    const DashboardComponent = useMemo(() => {
        if (isLoading) return LoadingComponent;
        if (error) return () => <ErrorComponent message={error} />;

        let SelectedComponent: React.ComponentType<any> | null = null; // Define type

        console.log("[Dashboard Page] useMemo: Determining component for role:", userRole);
        switch (userRole) {
            case 'admin':       
                SelectedComponent = AdminDashboard;
                break; // Added break for clarity
            case 'victim':
            case 'family':      
                SelectedComponent = VictimFamilyDashboard;
                break;
            case 'volunteer':   
                SelectedComponent = VolunteerDashboard; 
                break;
            case 'organization':
                SelectedComponent = OrganizationDashboard;
                break;
            default:
                console.warn(`[Dashboard Page] useMemo: Unknown role found: ${userRole}`);
                SelectedComponent = () => <ErrorComponent message={`Unsupported role: ${userRole}`} />;
        }
        
        // Log which component was actually selected before returning
        if (SelectedComponent) {
             console.log("[Dashboard Page] useMemo: Selected component:", SelectedComponent.name || 'Error/Default Component');
        }
        
        return SelectedComponent || (() => <ErrorComponent message={"Failed to select dashboard component."} />); // Return selected or a final fallback

    }, [isLoading, userRole, error]);

    // Main page structure remains simple, just renders the chosen component
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200">
             {/* No outer H1 or wrapper here - let the specific dashboard component handle its layout */}
            <DashboardComponent />
            {/* Logout button could be moved into DashboardLayout or Navbar */}
            <div className="p-4 md:p-8">
                 <button 
                    onClick={() => {
                        localStorage.removeItem('authToken');
                        router.push('/sign-in');
                    }}
                    className="mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    );
} 