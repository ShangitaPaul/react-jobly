import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import { button, form, input, label, p } from "react-bootstrap";


// Import hook for a timed message
// eslint-disable-next-line no-unused-vars
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form component.
 *
 * Displays profile form for user to edit and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading throughout the site.
 * @component
 * @example
 */

function ProfileForm() {
  // Get the current user and the function to set the current user
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // Set the state for the form data, errors, and confirmation of a successful save
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });

  // Get the userContext and setCurrentUser function from the UserContext
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  /** On form submission:
   * - prevent the default form submission
   *  Successful submission will clear previous error messages and password
   * @param {Event} evt - form submission event
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    // Set the profile data to the form data
    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      // Save the profile data to the backend
      updatedUser = await JoblyApi.saveProfile(username, profileData);
      // Clear the form errors and password
    } catch (errors) {
      // Error handling for the form submission
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }

  /** Handle form data changing
   * @param {Event} evt - form change event
   */
  function handleChange(evt) {
    // Set the form data to the target value
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }
  // Return the JSX for the profile form component with the form fields and buttons 
  return (
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3>Profile</h3>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">{formData.username}</p>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm password to make changes:</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}

              <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
// Export the ProfileForm component
export default ProfileForm;
