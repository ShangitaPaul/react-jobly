import React, { useContext, useState } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

/** Displays information about the job.
 * Reder the jobCard component 
 * @component 
 * @example - How to render the jobCard with specific props
 */

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug(
    "JobCard",
    "id=", id,
    "title=", title,
    "salary=", salary,
    "equity=", equity,
    "companyName=", companyName,
  );
  // Access to the user context for hasAppliedToJob and applyToJob
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);

  // Check if the user has applied to the job
  const [applied, setApplied] = useState();
  // Update the applied status
  React.useEffect(function updateAppliedStatus() {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);
    // Set the applied status
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    // If the user has already applied to the job, return
    if (hasAppliedToJob(id))
      return;
    // Apply to the job
    applyToJob(id);
    // Set the applied status
    setApplied(true);
  }
  // Return the job card
  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
        {equity !== undefined && <div><small>Equity: {equity}</small></div>}
        <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );

  /** Render integer salary like '$1,250,343' */

  function formatSalary(salary) {
    // Reverse the digits
    const digitsRev = [];
    // Convert the salary to a string
    const salaryStr = salary.toString();
    for (let i = salaryStr.length - 1; i >= 0; i--) {
      // Push the digits to the array
      digitsRev.push(salaryStr[i]);
      if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }
    // Return the formatted salary
    return digitsRev.reverse().join("");
  }


}
// Export the job card
export default JobCard;