/* This code handles API requests in a React app, and includes a class consisting of the initial step for handling authentication tokens. */

import axios from "axios";
// Base URL for API requests configured through environment variables
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  //This is a token for authentication that is initally empty
  static token = "";

  /**
  * @param {string} token - the token for authentication
  */
  static setToken(token) {
    JoblyApi.token = token;
  }

  /**
  * To make a generic API request.
  * @param {string} endpoint - The API endpoint
  * @param {object} data - Data to be sent via POST requests, etc.
  * @param {string} method - HTTP get request
  * @returns {Promise} - For API response data.
  */

  static async request(endpoint, data = {}, method = "get") {
    // Debugging
    console.debug("API Call:", endpoint, data, method);

    // There are multiple ways to pass an authorization token, this is how you pass it in the header.
    // This has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    // Authenication header containing token
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    // Parameters related to the HTTP method
    const params = (method === "get") ? data : {};

    try {
      // Call the API via axios
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // Log errors in API
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /**
   * User login
   * @param {string} username - Username of the user
   * @param {string} password - Password set by the user
   */
  // 'login' is a method that sends POST requests to the backend API to obtain aithentication token; to handle when a user logs out.
  static async login(username, password) {
    // Data in the body of the request being sent
    const data = { username, password };

    // Make the POST request to the endpoint
    const res = await this.request('auth/token', data, "POST");

    // Set the authentication token
    JoblyApi.token = "";

  }

  /*User logout/reset token */

  static async userLogout() {
    // Reset the authentication token upon user logging out
    JoblyApi.token = "";
  }

  // Added features for future scalability and expansion

  /**
   * Obtain current user
   * @param {string} username
   * @returns {Promise} - Promise resolved to the current user's information
   */


  // Individual API routes
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies filtered by name (or if not undefined
   * @param {string} name - name of the company to be filered
   * @returns {Promise} - Promise resolves to company data array
   */

  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
  /**
   * Obtain list of jobs filtered by title (or if not undefined)
   * @param {string} title - title of the job
   * @returns {Promise} - Promise resolves to job stat arrray
   */
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /**
   * Apply to a job
   * @param {string} username
   * @param {string} id - ID of job
   */

  // 'applyToJob' method handles the user applying to a job by sending a POST request to the backend API related to job applications
  static async applyToJob(username, id) {
    // this.request makes async API request to build the API endpoiint dynamically by incorporating the parameters 'username' and 'id' into the URL string
    // The empty curly braces corrosponds to the second argument passed as an empty object to 'this.request'
    await this.request(`users/${username}/jobs/${id}`, {}, "POST");

  }
  }

  /** Get token for login from username and password */

  // static async login(data) {
  //   let res = await this.request(`auth/token`, data, "POST");
  // }

  /** Signup
   * @param {object} data -User signup data
   * @returns {Promise} - Promise resolving authentication token
  */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "POST");
    return res.token;


  /**
   * Save user profile
   * @param {string} username
   * @param {object} data - User profile data
   * @returns {Promise} - Promise resolved to the updated profile of the user
   */
  static async saveProfile(username, data) {
    // Makes a PATCH request to uppdate user profile
    let res = await this.request(`users/${username}`, data, "PATCH");
    // returns updated user profile based off the API response
    return res.user;
  }
}






// for now, put token ("testuser" / "password" on class); this will set the initial token for 'testuser'
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;