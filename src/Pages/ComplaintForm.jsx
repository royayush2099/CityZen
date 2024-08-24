import React, { useState } from 'react';
import './Page-css/ComplainForm.css'; // Ensure this file contains the CSS provided earlier

function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaintType: '',
    message: '',
    phone: '',
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.complaintType) newErrors.complaintType = 'Complaint Type is required';
    if (!formData.message) newErrors.message = 'Complaint Overview is required';
    // Add more validations as needed
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate form submission
    setSubmissionStatus('Submitting...');
    setTimeout(() => {
      setSubmissionStatus('Thank you for your complaint!');
      setFormData({
        name: '',
        email: '',
        complaintType: '',
        message: '',
        phone: '',
        file: null,
      });
      setErrors({});
    }, 2000); // Simulate network request delay
  };

  return (
    <div className="FeedbackForm-body">
      <div className="FeedbackForm">
        <h1>Complaint Form</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="complaintType">Complaint Type</label>
          <input
            id="complaintType"
            type="text"
            name="complaintType"
            value={formData.complaintType}
            onChange={handleChange}
          />
          {errors.complaintType && <p className="error">{errors.complaintType}</p>}

          <label htmlFor="message">Complaint Overview</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className="error">{errors.message}</p>}

          <label htmlFor="phone">Phone Number (Optional)</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="file">Upload Image or Video</label>
          <input
            id="file"
            type="file"
            name="file"
            accept="image/*,video/*"
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
        {submissionStatus && <p className="status">{submissionStatus}</p>}
      </div>
    </div>
  );
}

export default ComplaintForm;
