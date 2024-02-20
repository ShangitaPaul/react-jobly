import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Companies from './companies/CompanyList';
import Company from './Company';
import Jobs from './Jobs';
import Logout from './Logout';
import Home from './Homepage';
import NotFound from './Homepage';

/** Routes for the app 
 * Render the Home, Companies, Company, Jobs, and Logout components
 * If not found 
 * if the path is not found, it will render the Home component
*/

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/companies" render={() => <Companies />} />
        <Route exact path="/companies/:handle" render={rtProps => <Company {...rtProps} />} />
        <Route exact path="/jobs" render={() => <Jobs />} />
        <Route exact path="/logout" render={() => <Logout />} />
      </Switch>
    );
  }
}
// Export the Routes component
export default Routes;