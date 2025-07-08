import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Unauthorized from '@/pages/Unauthorized';
import Profile from '@/pages/Profile';
import Notifications from '@/pages/Notifications';

// Admin Pages
const AdminUsers = React.lazy(() => import('@/pages/admin/AdminUsers'));
const AdminLogs = React.lazy(() => import('@/pages/admin/AdminLogs'));
const AdminEvents = React.lazy(() => import('@/pages/admin/AdminEvents'));
const AdminWorkshops = React.lazy(() => import('@/pages/admin/AdminWorkshops'));
const AdminNotifications = React.lazy(() => import('@/pages/admin/AdminNotifications'));
const AdminVenues = React.lazy(() => import('@/pages/admin/AdminVenues'));
const AdminBudgets = React.lazy(() => import('@/pages/admin/AdminBudgets'));
const AdminExpenses = React.lazy(() => import('@/pages/admin/AdminExpenses'));
const AdminCategories = React.lazy(() => import('@/pages/admin/AdminCategories'));
const AdminProducts = React.lazy(() => import('@/pages/admin/AdminProducts'));
const AdminReports = React.lazy(() => import('@/pages/admin/AdminReports'));
const AdminCreateEvent = React.lazy(() => import('@/pages/admin/AdminCreateEvent'));
const AdminCreateWorkshop = React.lazy(() => import('@/pages/admin/AdminCreateWorkshop'));

// Finance Pages
const FinanceEvents = React.lazy(() => import('@/pages/finance/Events'));
const FinanceBudgets = React.lazy(() => import('@/pages/finance/Budgets'));
const FinanceExpenses = React.lazy(() => import('@/pages/finance/Expenses'));
const FinanceProducts = React.lazy(() => import('@/pages/finance/Products'));
const FinanceCategories = React.lazy(() => import('@/pages/finance/Categories'));
const FinanceReports = React.lazy(() => import('@/pages/finance/Reports'));

// Event Lead Pages
const EventLeadEvents = React.lazy(() => import('@/pages/event-leads/Events'));
const EventLeadBudgets = React.lazy(() => import('@/pages/event-leads/Budgets'));
const EventLeadExpenses = React.lazy(() => import('@/pages/event-leads/Expenses'));
const CreateEvent = React.lazy(() => import('@/pages/event-leads/CreateEvent'));

// Workshop Lead Pages
const WorkshopLeadWorkshops = React.lazy(() => import('@/pages/workshop-leads/Workshops'));
const WorkshopLeadBudgets = React.lazy(() => import('@/pages/workshop-leads/Budgets'));
const WorkshopLeadExpenses = React.lazy(() => import('@/pages/workshop-leads/Expenses'));
const CreateWorkshop = React.lazy(() => import('@/pages/workshop-leads/CreateWorkshop'));

// Workshop Detail Page
const WorkshopDetail = React.lazy(() => import('@/pages/workshops/WorkshopDetail'));

// Facilities Pages
const FacilitiesEvents = React.lazy(() => import('@/pages/facilities/Events'));
const FacilitiesExpenses = React.lazy(() => import('@/pages/facilities/Expenses'));
const FacilitiesProducts = React.lazy(() => import('@/pages/facilities/Products'));
const FacilitiesVenues = React.lazy(() => import('@/pages/facilities/Venues'));

// Coordinator Pages
const CoordinatorEvents = React.lazy(() => import('@/pages/coordinator/Events'));
const CoordinatorReports = React.lazy(() => import('@/pages/coordinator/Reports'));

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Yugam Finance Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          
          {/* Admin Routes */}
          <Route
            path="admin/users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminUsers />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/events"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="admin/events/create"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminCreateEvent />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/workshops"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminWorkshops />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="admin/workshops/create"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminCreateWorkshop />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/budgets"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminBudgets />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/expenses"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminExpenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/products"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminProducts />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/categories"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminCategories />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/venues"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminVenues />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/reports"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminReports />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/notifications"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminNotifications />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/logs"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminLogs />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Finance Team Routes */}
          <Route
            path="finance/events"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FinanceEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/budgets"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FinanceBudgets />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/expenses"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FinanceExpenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/products"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FinanceProducts />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/categories"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FinanceCategories />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/reports"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FinanceReports />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Event Team Lead Routes */}
          <Route
            path="event-leads/events"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <EventLeadEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="event-leads/events/create"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <CreateEvent />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="event-leads/budgets"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <EventLeadBudgets />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="event-leads/expenses"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <EventLeadExpenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Workshop Team Lead Routes */}
          <Route
            path="workshop-leads/workshops"
            element={
              <ProtectedRoute allowedRoles={['WORKSHOP_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <WorkshopLeadWorkshops />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="workshop-leads/workshops/create"
            element={
              <ProtectedRoute allowedRoles={['WORKSHOP_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <CreateWorkshop />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="workshop-leads/budgets"
            element={
              <ProtectedRoute allowedRoles={['WORKSHOP_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <WorkshopLeadBudgets />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="workshop-leads/expenses"
            element={
              <ProtectedRoute allowedRoles={['WORKSHOP_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <WorkshopLeadExpenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Facilities Team Routes */}
          <Route
            path="facilities/events"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FacilitiesEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="facilities/expenses"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FacilitiesExpenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="facilities/products"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FacilitiesProducts />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="facilities/venues"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FacilitiesVenues />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Coordinator Routes */}
          <Route
            path="coordinator/events"
            element={
              <ProtectedRoute allowedRoles={['EVENT_COORDINATOR', 'WORKSHOP_COORDINATOR', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <CoordinatorEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="coordinator/reports"
            element={
              <ProtectedRoute allowedRoles={['EVENT_COORDINATOR', 'WORKSHOP_COORDINATOR', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <CoordinatorReports />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          {/* Workshop Detail Route */}
          <Route
            path="workshops/:id"
            element={
              <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                <WorkshopDetail />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;