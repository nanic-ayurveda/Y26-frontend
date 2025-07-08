import { useEffect, useState } from 'react';
import { Calendar, Eye, Download } from 'lucide-react';
import { workshopsAPI, Workshop } from '@/api';
import { useApi } from '@/hooks/useApi';

const AdminWorkshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  
  const { execute: fetchWorkshops, loading } = useApi(workshopsAPI.getAll, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to fetch workshops'
  });

  useEffect(() => {
    const loadWorkshops = async () => {
      const data = await fetchWorkshops();
      if (data) {
        setWorkshops(data);
      }
    };

    loadWorkshops();
  }, []);

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

  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Type,Description,CoordinatorEmail,DateTime\n" +
      "Sample Workshop,WORKSHOP,Sample Description,coordinator@yugam.in,2024-12-25T10:00:00\n" +
      "AI Workshop,WORKSHOP,Artificial Intelligence workshop,ai@yugam.in,2024-12-26T09:00:00";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "workshops_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workshops Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage all workshops and their financial planning
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Workshops List</h3>
            <span className="text-sm text-gray-500">{workshops.length} total workshops</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workshop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workshops.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No workshops</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Workshops will appear here when created by team leads.
                    </p>
                  </td>
                </tr>
              ) : (
                workshops.map((workshop) => (
                  <tr key={workshop.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{workshop.title}</div>
                        <div className="text-sm text-gray-500">{workshop.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{workshop.creator.name}</div>
                      <div className="text-sm text-gray-500">{workshop.creator.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {workshop.coordinator ? (
                        <div>
                          <div className="text-sm text-gray-900">{workshop.coordinator.name}</div>
                          <div className="text-sm text-gray-500">{workshop.coordinator.email}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(workshop.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workshop.dateTime ? new Date(workshop.dateTime).toLocaleDateString() : 'TBD'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkshops;