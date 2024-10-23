import React, { useState } from 'react';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.message) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form Data:', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' }); // Reset form
            setErrors({}); // Clear errors
        }
    };

    return (
        <div className="App">
            <h1>Contact Us</h1>
            {submitted && <p>Thank you for your message!</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;

// App.css
// .App {
//     text-align: center;
//     max-width: 600px;
//     margin: 0 auto;
//     padding: 20px;
// }

// .form-group {
//     margin-bottom: 15px;
//     text-align: left;
// }

// input,
// textarea {
//     width: 100%;
//     padding: 10px;
//     margin-top: 5px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// }

// button {
//     padding: 10px 15px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
// }

// button:hover {
//     background-color: #0056b3;
// }

// .error {
//     color: red;
//     font-size: 0.9em;
// }
