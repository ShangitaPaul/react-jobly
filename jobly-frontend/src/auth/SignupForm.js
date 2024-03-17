import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */
function SignupForm({ signup }) {
    // Get history object from useHistory hook
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    // Set the state of formErrors to manage the form errors
    const [formErrors, setFormErrors] = useState([]);
    // Debugging information to see the state of the form
    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /companies.
     */
    async function handleSubmit(evt) {
        // Prevent the form from reloading the page
        evt.preventDefault();
        // Call the signup function prop and pass the form data
        // a prop is a function that is passed to a component as an argument
        let result = await signup(formData);
        if (result.success) {
            // Redirect to the companies page (/companies route) if the signup is successful
            history.push("/companies");
            // If the signup is not successful, set the form errors to the errors returned from the signup function in the backend
        } else {
            setFormErrors(result.errors);
        } // Update the formErrors state to the errors returned from the backend
    }

    /** Update form data field */
    function handleChange(evt) {
        // Extract the name and value from the input event target
        const { name, value } = evt.target;
        // Update the form data state with the new value
        setFormData((data) => ({ ...data, [name]: value }));
    }
    // Return the signup form
    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Sign Up</h2>
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
                                />
                            </div>

                            <div className="form-group">
                                <label>First name</label>
                                <input
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
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
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {formErrors.length ? (
                                <Alert type="danger" messages={formErrors} />
                            ) : null}

                            <button
                                type="submit"
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

// Export the SignupForm component
export default SignupForm;