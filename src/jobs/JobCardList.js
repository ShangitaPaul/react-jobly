import React from "react";
import JobCard from "./JobCard";

/** Displays a list of job cards.
 * @component
 * @param {Object} jobs - An array of job objects.
 * @param {Function} apply - A function to apply to a job.
 * @returns {JSX.Element}
 */

function JobCardList({ jobs, apply }) {
  console.debug("JobCardList", "jobs=", jobs);
  // Return a div with a class of JobCardList and a map of the jobs array.
  return (
      <div className="JobCardList">
        {jobs.map(job => (
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
            />
        ))}
      </div>
  );
}
// Export the JobCardList component.
export default JobCardList;
