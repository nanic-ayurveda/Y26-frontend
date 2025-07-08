import { useEffect, useState } from 'react';
import { Calendar, Eye, Filter } from 'lucide-react';
import { eventsAPI, workshopsAPI, Event, Workshop } from '@/api';
import { useAuth } from '@/context/AuthContext';
import { useApi } from '@/hooks/useApi';

const CoordinatorEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    dateFrom: '',
    dateTo: ''
  });

  const { execute: fetchEvents, loading } = useApi(eventsAPI.getAll, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to fetch events'
  });

  const { execute: fetchWorkshops } = useApi(workshopsAPI.getAll, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to fetch workshops'
  });
  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filters]);

  const loadEvents = async () => {
    const [eventsData, workshopsData] = await Promise.all([
      fetchEvents(),
      fetchWorkshops()
    ]);
    
    if (eventsData) {
      // Filter events where user is coordinator
      const coordinatorEvents = eventsData.filter(event => 
        event.coordinator?.id === user?.id
      );
      setEvents(coordinatorEvents);
    }
    
    if (workshopsData) {
      // Filter workshops where user is coordinator
      const coordinatorWorkshops = workshopsData.filter(workshop => 
        workshop.coordinator?.id === user?.id
      );
      setWorkshops(coordinatorWorkshops);
    }
  };

  const applyFilters = () => {
    let filtered = [...events];
    let filteredWorkshopsData = [...workshops];

    if (filters.status) {
      filtered = filtered.filter(event => event.status === filters.status);
      filteredWorkshopsData = filteredWorkshopsData.filter(workshop => workshop.status === filters.status);
    }

    if (filters.type) {
      if (filters.type === 'EVENT') {
        filteredWorkshopsData = [];
      } else if (filters.type === 'WORKSHOP') {
        filteredEventsData = [];
      }
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(event => 
        event.dateTime && new Date(event.dateTime) >= new Date(filters.dateFrom)
      );
      filteredWorkshopsData = filteredWorkshopsData.filter(workshop => 
        workshop.dateTime && new Date(workshop.dateTime) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(event => 
        event.dateTime && new Date(event.dateTime) <= new Date(filters.dateTo)
      );
      filteredWorkshopsData = filteredWorkshopsData.filter(workshop => 
        workshop.dateTime && new Date(workshop.dateTime) <= new Date(filters.dateTo)
      );
    }

    setFilteredEvents(filtered);
    setFilteredWorkshops(filteredWorkshopsData);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">My Assigned Events</h1>
          <p className="mt-1 text-sm text-gray-600">
            Events and workshops you are coordinating
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="EVENT">Event</option>
              <option value="WORKSHOP">Workshop</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Assigned Events & Workshops</h3>
            <span className="text-sm text-gray-500">{filteredEvents.length} items</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event/Workshop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creator
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
              {filteredEvents.length === 0 && filteredWorkshops.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No events assigned</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You haven't been assigned to coordinate any events yet.
                    </p>
                  </td>
                </tr>
              ) : (
                [...filteredEvents, ...filteredWorkshops].map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        'type' in item && item.type === 'EVENT' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {'type' in item ? item.type : 'WORKSHOP'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{event.creator.name}</div>
                      <div className="text-sm text-gray-500">{event.creator.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.dateTime ? new Date(item.dateTime).toLocaleDateString() : 'TBD'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a
                        href={`/${'type' in item && item.type === 'EVENT' ? 'events' : 'workshops'}/${item.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
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

export default CoordinatorEvents;