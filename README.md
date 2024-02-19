# react-jobly
https://curric.rithmschool.com/springboard/exercises/react-jobly/
# Component Hierarchy
- App
  - Navbar
  - Routes
    - Home
    - Auth
      - LoginForm
      - SignupForm
    - UserProfile
      - UserDetail
      - UserUpdateForm
    - Jobs
      - JobList
        - JobCard
      - JobFilter
      - JobDetail
      - ApplyModal
    - Applications
      - ApplicationList
        - ApplicationCard
      - ApplicationDetail
    - NotFound
  - Footer


  ### Explanations

- App: The root component containing the overall structure of the app.
- Navbar: Navigation bar for the app.
- Routes: Handles routing for different pages.
- Home: Landing page or dashboard.
- Auth: Authentication-related components.
- LoginForm: Form for user login.
- SignupForm: Form for user registration.
- UserProfile: User profile page.
- UserDetail: Displays user information.
- UserUpdateForm: Form for updating user profile.
- Jobs: Jobs page.
- JobList: List of available jobs.
- JobCard: Displays individual job details.
- JobFilter: Allows users to filter jobs.
- JobDetail: Detailed view of a specific job.
- ApplyModal: Modal for applying to a job.
- Applications: Page displaying user's in-progress job applications.
- ApplicationList: List of job applications.
- ApplicationCard: Displays individual application details.
- ApplicationDetail: Detailed view of a specific job application.
- NotFound: Page for handling 404 errors.
- Footer: Footer section of the app.
  
# Modifications

Below is a document of all my changes and additions to the files in this project:

- Step 0: Setup. Generated a folder call "jobly-frontend" containing files
    - setupTest.js
    - serviceWorkers.js
    - reportWebVitals.js
    - logp.svg
    - Api.js
    - Api.css
- Step 1: Generated Component Hierarchy (above)
- Step Two: Make an API Helper in /jobly-frontend/src/api,js
- Step THree:
  - moved api.js to new folder created inside /jobly-frontend/src called "api"
  - Created Homepage folder in /jobly-frontend/src/Homepage path 
  - Created Routes folder in /jobly-frontend/src/Routes path
  - Created jobs folder " "
  - Created routes-nav folder in " " 
