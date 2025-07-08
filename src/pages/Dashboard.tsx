import React from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EventLeadDashboard from '@/pages/eventlead/EventLeadDashboard';
import WorkshopLeadDashboard from '@/pages/workshoplead/WorkshopLeadDashboard';
import FinanceDashboard from '@/pages/finance/FinanceDashboard';
import FacilitiesDashboard from '@/pages/facilities/FacilitiesDashboard';
import CoordinatorDashboard from '@/pages/coordinator/CoordinatorDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'EVENT_TEAM_LEAD':
        return <EventLeadDashboard />;
      case 'WORKSHOP_TEAM_LEAD':
        return <WorkshopLeadDashboard />;
      case 'FINANCE_TEAM':
        return <FinanceDashboard />;
      case 'FACILITIES_TEAM':
        return <FacilitiesDashboard />;
      case 'EVENT_COORDINATOR':
      case 'WORKSHOP_COORDINATOR':
        return <CoordinatorDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Welcome to Yugam Finance Portal</h3>
            <p className="text-gray-500 mt-2">Your dashboard will appear here based on your role.</p>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Dashboard;