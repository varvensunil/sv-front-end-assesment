## RMS Resource Request & Approval Portal

### Scenario:

    You are developing a Resource Request & Approval Portal for a Resource Management System (RMS).
    Department heads should be able to raise resource requests and view their approval status.

### Getting Started

1.  Installation

    # Clone the repository

        git clone https://github.com/varvensunil/sv-front-end-assesment.git

    # Navigate into the project directory

        cd resource-request-portal

    # Install dependencies

        npm install

2.  Run React App

        npm start

## Component Overview

1. App.js
2. RequestContext.js
3. AddRequestForm.js
4. RequestsTable.js
5. ApprovalDashboard.js

### 1. App.js

1. Wraps all components inside the `RequestContext` provider.
2. Displays the overall UI layout:
    - AddRequestForm
    - RequestsTable
    - ApprovalDashboard

### 2. RequestContext.js

    path : /context/RequestContext.js

1. Provides global state management using React Context API.
2. Centralizes all requests and their some operations like :
    - Fetching requests from API.
    - Adding new requests via form
    - modifing the existing request via PUT

### 3. AddRequestForm.js

    path : /components/AddRequestForm.js

1. Displays a form to create a new resource request.
2. Inputs include: Project Name, Required Role, Experience Level, Justification, Priority (Low / Medium / High)
3. Submits data to API (Mock API) through RequestContext.
4. After successful submission, the form resets and a toast message appears.

### 4. RequestsTable.jsx

    path : /components/RequestsTable.js

1. Displays all submitted requests in table records.
2. One button for exporting the table records in `.xlsx` file format

### 5. ApprovalDashboard.jsx

    path : /components/ApprovalDashboard.js

1. Displays all submitted requests in card views.
2. Supports:
    - Filtering by status (e.g., All, Pending, Approved, Rejected)
    - Filtering by priority
    - Sorting alphabetically (A–Z / Z–A)
3. Two buttons for approve and requests for updating status to API (Mock API) through RequestContext.

## Tech Stack

- Frontend: React (Hooks, Context API)
- UI: Bootstrap, FontAwesome Icons
- Backend: MockAPI


## Author
##### Developer : Venkatasunil Varada