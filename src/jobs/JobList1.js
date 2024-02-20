import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
//import LoadingSpinner from "../common/LoadingSpinner";

/** Display a page with list of jobs.
 * @component
 * @example
 */
function JobList() {
  console.debug("JobList");
  // Create a place to store the list of jobs
  const [jobs, setJobs] = useState(null); 
}
// useEffect is a hook to fetch all jobs from component mount
useEffect(function getAllJobsOnMount() {
    console.debug("JobList useEffect getAllJobsOnMount");
    search();
}, []);
  
/** Search form submission is triggered to reload jobs
 * @param {string} title - Title of the filtered jobs list
 */

async function search(title) {
  let jobs = await JoblyApi.getJobs(title);
  setJobs(jobs);
}

// If jobs are not loaded, display an icon that spins
  // if (!jobs) return <LoadingSpinner />;

return (
  <div className="JobList col-md-8 offset-md-2">
    <Search searchFor={(search)} />
    {jobs.length
      ? <JobCardList jobs={jobs} />
      : <p className="lead">Sorry, no results were found!</p>
    }

  </div>
)




export default JobList;
