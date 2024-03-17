import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** Display some information about the company
 * // Renders CompanyCard comonent 
 * @component 
 * @param {string} name - name of the company
 * @param {string} description - Brief description of the company
 * @param {string} logoUrl - url of the company's logo
 * @param {string} handle - unique handle of the company
 
 */

function CompanyCard({ name, description, logoUrl, handle }) {

  console.debug("CompanyCard", logoUrl);
  // Return a link to the company's page
  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        <h6 className="card-title">
          {name}
          {logoUrl && <img src={logoUrl} alt={name} className="float-right ml-5" />}
        </h6>
        <p><small>{description}</small></p>
      </div>
    </Link>
  );
}
// Export the CompanyCard component
export default CompanyCard;
