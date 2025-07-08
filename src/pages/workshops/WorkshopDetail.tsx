import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, MapPin, Clock, DollarSign, Receipt } from 'lucide-react';
import { workshopsAPI, budgetsAPI, expensesAPI, Workshop, Budget, Expense } from '@/api';
import { useAuth } from '@/context/AuthContext';
import { useApi } from '@/hooks/useApi';

const WorkshopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const { execute: fetchWorkshop, loading: workshopLoading } = useApi(workshopsAPI.getById, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to fetch workshop details'
  });

  const { execute: fetchBudgets } = useApi(budgetsAPI.getByEventId, {
    showSuccessToast: false,
    showErrorToast: false
  });

  const { execute: fetchExpenses } = useApi(expensesAPI.getByEventId, {
    showSuccessToast: false,
    showErrorToast: false
  });

  useEffect(() => {
    const fetchWorkshopData = async () => {
      if (!id) return;

      const workshopData = await fetchWorkshop(id);
      if (workshopData) {
        setWorkshop(workshopData);
      }

      const [budgetData, expenseData] = await Promise.all([
        fetchBudgets(id),
        fetchExpenses(id)
      ]);

      if (budgetData) setBudgets(budgetData);
      if (expenseData) setExpenses(expenseData);
    };

    fetchWorkshopData();
  }, [id]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
      COMPLETED: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getTotalBudget = () => {
    return budgets.reduce((sum, budget) => sum + budget.amount, 0);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getTotalApprovedBudget = () => {
    return budgets.reduce((sum, budget) => sum + (budget.approvedAmount || budget.amount), 0);
  };

  if (workshopLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">Workshop not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The workshop you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Link
          to="/workshops"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Workshops
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/workshops"
          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Workshops
        </Link>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{workshop.title}</h1>
          <p className="mt-1 text-sm text-gray-600">Workshop Details and Financial Overview</p>
        </div>
      </div>

      {/* Workshop Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Workshop Information</h2>
          {getStatusBadge(workshop.status)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-sm text-gray-900">{workshop.description || 'No description provided'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Type</h3>
            <p className="mt-1 text-sm text-gray-900">WORKSHOP</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Created by</h3>
            <p className="mt-1 text-sm text-gray-900">{workshop.creator.name}</p>
          </div>
          
          {workshop.coordinator && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Coordinator</h3>
              <p className="mt-1 text-sm text-gray-900">{workshop.coordinator.name}</p>
            </div>
          )}
          
          {workshop.venue && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Venue</h3>
              <p className="mt-1 text-sm text-gray-900">{workshop.venue}</p>
            </div>
          )}
          
          {workshop.dateTime && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(workshop.dateTime).toLocaleDateString()} at {new Date(workshop.dateTime).toLocaleTimeString()}
              </p>
            </div>
          )}

          {workshop.expectedParticipants && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Expected Participants</h3>
              <p className="mt-1 text-sm text-gray-900">{workshop.expectedParticipants}</p>
            </div>
          )}
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-semibold text-gray-900">₹{getTotalBudget().toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved Budget</p>
              <p className="text-2xl font-semibold text-gray-900">₹{getTotalApprovedBudget().toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Receipt className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">₹{getTotalExpenses().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Breakdown</h2>
        
        {budgets.length === 0 ? (
          <p className="text-gray-500">No budget information available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sponsor Contribution
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {budgets.map((budget) => (
                  <tr key={budget.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {budget.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{budget.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{(budget.approvedAmount || budget.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{budget.sponsorContribution.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Expenses */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h2>
        
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses recorded yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.slice(0, 10).map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{expense.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.addedBy.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Budget Utilization */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Utilization</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Allocated</h3>
            <p className="text-2xl font-bold text-blue-600">₹{getTotalApprovedBudget().toLocaleString()}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Receipt className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Spent</h3>
            <p className="text-2xl font-bold text-red-600">₹{getTotalExpenses().toLocaleString()}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Remaining</h3>
            <p className="text-2xl font-bold text-green-600">₹{(getTotalApprovedBudget() - getTotalExpenses()).toLocaleString()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {getTotalApprovedBudget() > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Budget Utilization</span>
              <span>{Math.round((getTotalExpenses() / getTotalApprovedBudget()) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  (getTotalExpenses() / getTotalApprovedBudget()) > 0.9 ? 'bg-red-500' :
                  (getTotalExpenses() / getTotalApprovedBudget()) > 0.75 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min((getTotalExpenses() / getTotalApprovedBudget()) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopDetail;