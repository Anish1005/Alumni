import React, { useState } from "react";
import './ApplyForm.css';


const ApplyForm = ({ job, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", resume: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted for", job.title, formData);
    alert(`Application submitted for ${job.title}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Apply for {job.title}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="resume"
            placeholder="Resume Link"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Submit
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
