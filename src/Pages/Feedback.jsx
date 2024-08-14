import React, { useState } from 'react';
import './Page-css/Feedback.css';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    'Traffic Management',
    'Public Safety',
    'Waste Management',
    'Street Lighting',
    'Other'
  ];

  const ratings = [
    'Very Satisfied',
    'Satisfied',
    'Neutral',
    'Dissatisfied',
    'Very Dissatisfied'
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !category || !message || rating === 0) {
      setError('Please fill in all required fields');
    } else {
      const feedback = {
        name,
        email,
        phone,
        category,
        message,
        rating
      };
      console.log('Feedback submitted:', feedback);
      // Send feedback to server or API
      setSubmitted(true);
      setError(null);
    }
  };

  return (
    <div className="FeedbackForm-body">

      <div className="FeedbackForm">
        <h1>Feedback Form</h1>
        {submitted ? (
          <p>Thank you for submitting your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
            <label>
              Category:
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Message:
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </label>
            <label>
              Rating:
              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                required
              >
                {ratings.map((rating, index) => (
                  <option key={index} value={index + 1}>
                    {rating}
                  </option>
                ))}
              </select>
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit Feedback</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default FeedbackForm;