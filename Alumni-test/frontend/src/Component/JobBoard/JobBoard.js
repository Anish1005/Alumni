import React, { useState } from "react";
import ApplyForm from './ApplyForm';

import './JobBoard.css';


const jobs = [
    { id: 1, title: "Software Engineer", company: "Tech Corp", type: "Full-time", location: "Remote" },
    { id: 2, title: "Marketing Intern", company: "Startup Inc.", type: "Internship", location: "New York" },
    { id: 3, title: "Data Analyst", company: "DataWorks", type: "Full-time", location: "San Francisco" },
    { id: 4, title: "Product Manager", company: "InnovateX", type: "Full-time", location: "Seattle" },
    { id: 5, title: "Graphic Designer", company: "Creative Studio", type: "Part-time", location: "Los Angeles" },
    { id: 6, title: "Cybersecurity Analyst", company: "SecureTech", type: "Full-time", location: "Washington, D.C." },
    { id: 7, title: "DevOps Engineer", company: "CloudWorks", type: "Full-time", location: "Austin" },
    { id: 8, title: "HR Coordinator", company: "PeopleFirst", type: "Full-time", location: "Chicago" },
    { id: 9, title: "Content Writer", company: "MediaHub", type: "Freelance", location: "Remote" },
    { id: 10, title: "AI Researcher", company: "AI Labs", type: "Full-time", location: "Boston" },
    { id: 11, title: "Network Engineer", company: "NetSolutions", type: "Full-time", location: "Denver" },
    { id: 12, title: "Business Analyst", company: "FinancePros", type: "Full-time", location: "New York" },
    { id: 13, title: "QA Tester", company: "Game Studios", type: "Contract", location: "San Diego" },
    { id: 14, title: "Customer Support Representative", company: "HelpDesk", type: "Part-time", location: "Remote" },
    { id: 15, title: "Blockchain Developer", company: "CryptoTech", type: "Full-time", location: "Miami" }
  ];

const JobBoard = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Job Board</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="text-sm text-gray-500">{job.type}</p>
            <button
              onClick={() => setSelectedJob(job)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {selectedJob && <ApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default JobBoard;
