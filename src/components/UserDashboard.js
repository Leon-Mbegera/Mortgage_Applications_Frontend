import { useState, useEffect } from 'react';
import { submitApplication, getUserApplications } from '../services/api.js';

const UserDashboard = () => {

  const [showLoader, setShowLoader] = useState(false)
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    loanAmount: '',
    documentPath: ''
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchUserApplications();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();

    try {
      setShowLoader(true);

      submitApplication({
        ...formData,
        loanAmount: parseFloat(formData.loanAmount)
      });

      setFormData({
        fullName: '',
        address: '',
        loanAmount: '',
        documentPath: ''
      })
      fetchUserApplications();
    } catch (e) {
      console.log('submit application error', e)
    } finally {
      setShowLoader(false);
    }
  }

  const fetchUserApplications = () => {
    try {
      setShowLoader(true);

      const response = getUserApplications();
      setApplications(response.data);
    } catch (e) {
      console.log('fetch user applications error', e)
    } finally {
      setShowLoader(false);
    }
  }

return (
    <div className="mt-10">
      <h2 className="text-2xl mb-4">User Dashboard</h2>
      {errors && <p className="text-red-500">{errors.join(', ')}</p>}
      <div className="mb-8">
        <h3 className="text-xl mb-2">Submit Application</h3>
        <div className="space-y-4 max-w-md">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="loanAmount"
            type="number"
            placeholder="Loan Amount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="documentPath"
            placeholder="Document Path (optional)"
            value={formData.documentPath}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSubmitApplication}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
      <h3 className="text-xl mb-2">My Applications</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Full Name</th>
            <th className="p-2">Address</th>
            <th className="p-2">Loan Amount</th>
            <th className="p-2">Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;