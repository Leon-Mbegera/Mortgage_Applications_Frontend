import { useState, useEffect } from 'react';
import { getAllApplications, updateApplicationStatus } from '../services/api';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getAllApplications();
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      fetchApplications();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}
      <h3 className="text-xl mb-2">All Applications</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Full Name</th>
            <th className="p-2">Address</th>
            <th className="p-2">Loan Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="p-2">{app.id}</td>
              <td className="p-2">{app.fullName}</td>
              <td className="p-2">{app.address}</td>
              <td className="p-2">${app.loanAmount}</td>
              <td className="p-2">{app.status}</td>
              <td className="p-2">
                <select
                  onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                  defaultValue={app.status}
                  className="p-1 border rounded"
                >
                  <option value="APPROVED">APPROVE</option>
                  <option value="REJECTED">REJECT</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;