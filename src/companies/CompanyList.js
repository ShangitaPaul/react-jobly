import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Display page with list of companies.
 * @component
 * Renders the CompanyList component

 */

function CompanyList() {
  // State to hold the list of companies
  const [companies, setCompanies] = useState(null);

/**
 * Fetch the companies list
 * @function 
 * @inner
 * @memberOf CompanyList
 */
  
  // useEffect is used to update the list of companies
  //useEffect = useEffect || function (state) {
  
  // useEffect is used to update the list of companies
  useEffect(function getCompaniesOnMount() {
      console.debug("CompanyList useEffect getCompaniesOnMount");
      search();
    }, []);
    

  /** Search form submit; reloads companies. 
   * @function
   * @async
   * @param {string} name - names of filtered companies
   * @inner
   * @memberof CompanyList
  */
  
  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }
  // Display spinner while data loads
  if (!companies) return <LoadingSpinner />;

  return (
      <div className="CompanyList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {companies.length
            ? (
                <div className="CompanyList-list">
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}



// export CompanyList
export default CompanyList;
