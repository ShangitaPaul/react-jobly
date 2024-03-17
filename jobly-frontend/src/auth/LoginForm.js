
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
//import JoblyApi from "../common/JoblyApi";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  // Get the history object from the useHistory hook to habdle navigation
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();
  // Set the initial state of the form data to an object with username and password properties
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  // debug logging for the component state of the form data and form errors
  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */
  // Define the handleSubmit function that will be called when the form is submitted
  async function handleSubmit(evt) {
    // Prevent the default form submission behavior
    evt.preventDefault();
    // Call the login function passed as a prop to the component and pass the form data as an argument
    let result = await login(formData);
    //  If the login function returns a success property that is true, redirect to the /companies route
    if (result.success) {
      // Redirect to the /companies route
      history.push("/companies");
    } else {
      // If the login function returns a success property that is false, set the form errors state to the errors returned by the login function
      // Update the formErrors state with the errors returned by the login function
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    // Get the name and value of the input field that triggered the event
    const { name, value } = evt.target;
    // Update the formData state with the new value of the input field
    setFormData(l => ({ ...l, [name]: value }));
  }
  // Return the login form
  return (
      <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Log In</h3>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>
                {/* If there are form errors, display an Alert component with the form errors */}
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
                {/* Display a submit button */}
                <button
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
// Export the LoginForm component
export default LoginForm;
