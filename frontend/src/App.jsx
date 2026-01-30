import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, RefreshCw } from 'lucide-react';
import {
  fetchAlerts,
  createAlert,
  updateAlertStatus,
  deleteAlert
} from './services/alertsApi';

const VISA_TYPES = ['Tourist', 'Business', 'Student'];
const STATUSES = ['Active', 'Booked', 'Expired'];

function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ country: '', status: '' });
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    visaType: 'Tourist'
  });

  const loadAlerts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAlerts(filters);
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleSubmit = async () => {
    if (!formData.country || !formData.city) {
      setError('Country and City are required');
      return;
    }

    try {
      await createAlert(formData);
      setFormData({ country: '', city: '', visaType: 'Tourist' });
      loadAlerts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAlertStatus(id, status);
      loadAlerts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this alert?')) return;

    try {
      await deleteAlert(id);
      loadAlerts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              🐼 The Flying Panda - Visa Alerts
            </h1>
            <button
              onClick={() => loadAlerts()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Country *"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="City *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={formData.visaType}
              onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {VISA_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={16} />
              Add Alert
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Filter by country"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg w-48"
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg w-48"
            >
              <option value="">All Statuses</option>
              {STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button
              onClick={loadAlerts}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visa Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {alerts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No alerts found. Create your first alert above.
                    </td>
                  </tr>
                ) : (
                  alerts.map(alert => (
                    <tr key={alert._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{alert.country}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{alert.city}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{alert.visaType}</td>
                      <td className="px-6 py-4">
                        <select
                          value={alert.status}
                          onChange={(e) => handleStatusUpdate(alert._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${alert.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                            alert.status === 'Booked' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-gray-50 text-gray-700 border-gray-200'
                            }`}
                        >
                          {STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(alert.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(alert._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;