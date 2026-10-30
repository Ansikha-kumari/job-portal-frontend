import React, { useState } from "react";
import "./Jobs.css";

const jobs = [
    {
        title: "Frontend Developer",
        company: "TCS",
        location: "Bangalore",
        salary: "₹6 - 10 LPA",
        type: "Full Time",
        experience: "Fresher",
        category: "IT & Software",
    },
    {
        title: "Python Developer",
        company: "Infosys",
        location: "Hyderabad",
        salary: "₹5 - 9 LPA",
        type: "Full Time",
        experience: "1-2 Years",
        category: "IT & Software",
    },
    {
        title: "UI/UX Designer",
        company: "Wipro",
        location: "Pune",
        salary: "₹4 - 8 LPA",
        type: "Remote",
        experience: "Fresher",
        category: "Design",
    },
    {
        title: "Data Analyst",
        company: "Accenture",
        location: "Mumbai",
        salary: "₹5 - 10 LPA",
        type: "Hybrid",
        experience: "1-3 Years",
        category: "Data",
    },
    {
        title: "Java Developer",
        company: "Tech Mahindra",
        location: "Delhi",
        salary: "₹6 - 11 LPA",
        type: "Full Time",
        experience: "2-4 Years",
        category: "IT & Software",
    },
    {
        title: "Digital Marketing Executive",
        company: "HCL",
        location: "Noida",
        salary: "₹3 - 6 LPA",
        type: "Full Time",
        experience: "Fresher",
        category: "Marketing",
    },
];

function Jobs() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("All");

    const filteredJobs = jobs.filter((job) => {
        const searchMatch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase());

        const locationMatch = location
            ? job.location.toLowerCase().includes(location.toLowerCase())
            : true;

        const categoryMatch =
            category === "All" || job.category === category;

        return searchMatch && locationMatch && categoryMatch;
    });

    return (
        <div className="jobs-page">

            {/* NAVBAR */}
            <nav className="jobs-navbar">
                <a href="/" className="jobs-logo">
                    💼 Job<span>Portal</span>
                </a>

                <div className="jobs-nav-links">
                    <a href="/">Home</a>
                    <a href="/jobs" className="active">Jobs</a>
                    <a href="#categories">Categories</a>
                    <a href="#about">About</a>
                </div>

                <div>
                    <a href="/login" className="jobs-login">Login</a>
                    <a href="/signup" className="jobs-signup">Sign Up</a>
                </div>
            </nav>

            {/* HEADER */}
            <section className="jobs-header">
                <p>EXPLORE OPPORTUNITIES</p>
                <h1>Find Your Perfect Job</h1>
                <span>
                    Search thousands of jobs and find the opportunity that matches your skills.
                </span>

                <div className="jobs-search">

                    <div>
                        🔍
                        <input
                            type="text"
                            placeholder="Job title or company"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div>
                        📍
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <button>Search Jobs</button>

                </div>
            </section>

            {/* MAIN */}
            <main className="jobs-main">

                {/* FILTER */}
                <aside className="filters">

                    <h3>Filter Jobs</h3>

                    <label>Category</label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>All</option>
                        <option>IT & Software</option>
                        <option>Design</option>
                        <option>Data</option>
                        <option>Marketing</option>
                    </select>

                    <label>Job Type</label>

                    <div className="check">
                        <input type="checkbox" />
                        Full Time
                    </div>

                    <div className="check">
                        <input type="checkbox" />
                        Part Time
                    </div>

                    <div className="check">
                        <input type="checkbox" />
                        Remote
                    </div>
                    <label>Experience</label>

                    <div className="check">
                        <input type="checkbox" />
                        <span>Fresher</span>
                    </div>

                    <div className="check">
                        <input type="checkbox" />
                        <span>1-2 Years</span>
                    </div>

                    <div className="check">
                        <input type="checkbox" />
                        <span>3+ Years</span>
                    </div>
                </aside>

                <section className="job-results">

                    <div className="results-top">
                        <div>
                            <h2>Latest Jobs</h2>
                            <p>{filteredJobs.length} jobs found</p>
                        </div>

                        <select>
                            <option>Most Recent</option>
                            <option>Highest Salary</option>
                            <option>Most Relevant</option>
                        </select>
                    </div>

                    {filteredJobs.map((job, index) => (
                        <article className="job-list-card" key={index}>

                            <div className="company-icon">
                                {job.company.charAt(0)}
                            </div>

                            <div className="job-content">

                                <div className="job-title-row">
                                    <div>
                                        <h3>{job.title}</h3>
                                        <p>{job.company}</p>
                                    </div>

                                    <button className="save-job">
                                        ♡
                                    </button>
                                </div>

                                <div className="job-meta">
                                    <span>📍 {job.location}</span>
                                    <span>💰 {job.salary}</span>
                                    <span>💼 {job.type}</span>
                                    <span>👤 {job.experience}</span>
                                </div>

                                <div className="job-tags">
                                    <span>{job.category}</span>
                                    <span>{job.experience}</span>
                                </div>

                            </div>

                            <button className="apply-button">
                                View & Apply →
                            </button>

                        </article>
                    ))}

                    {filteredJobs.length === 0 && (
                        <div className="no-jobs">

                            <div className="no-jobs-icon">
                                🔎
                            </div>

                            <h3>No jobs found</h3>

                            <p>
                                Try another job title or location.
                            </p>

                        </div>
                    )}

                </section>

            </main>

            <footer className="jobs-footer">

                <div>
                    <h2>
                        💼 Job<span>Portal</span>
                    </h2>

                    <p>
                        Connecting talented people with great opportunities.
                    </p>
                </div>

                <p>
                    © 2026 JobPortal. All Rights Reserved.
                </p>

            </footer>

        </div>
    );
}

export default Jobs;

                