import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AddRequestForm from "./components/AddRequestForm";
import RequestsTable from "./components/RequestsTable";
import ApprovalDashboard from "./components/ApprovalDashboard";
import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RequestProvider } from "./context/RequestContext"; 

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <RequestProvider>
      <Router>
        <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">
          {/* Sidebar (Desktop) */}
          <aside
            className="bg-blue text-white p-3 d-none d-md-flex flex-column"
            style={{ width: "300px" }}
          >
            <h4 className="mb-4 fw-bold text-center">RMS</h4>
            <nav className="nav flex-column">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Add Request</NavLink>
              <NavLink to="/requests" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Requests Table</NavLink>
              <NavLink to="/approvals" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Approvals</NavLink>
            </nav>
          </aside>

          {/* Mobile Navbar */}
          <Navbar variant="dark" expand={false} className="d-md-none bg-blue shadow-sm">
            <Container fluid>
              <Navbar.Brand className="fw-bold">RMS</Navbar.Brand>
              <Navbar.Toggle onClick={() => setShow(true)} />
            </Container>
          </Navbar>

          <Offcanvas show={show} onHide={() => setShow(false)} placement="start" className="bg-blue text-white">
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title className="fw-bold">RMS</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <NavLink to="/" end onClick={() => setShow(false)} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Add Request</NavLink>
                <NavLink to="/requests" onClick={() => setShow(false)} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Requests Table</NavLink>
                <NavLink to="/approvals" onClick={() => setShow(false)} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Approvals</NavLink>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
 
          <main className="container-fluid py-4">
            <Routes>
              <Route path="/" element={<AddRequestForm />} />
              <Route path="/requests" element={<RequestsTable />} />
              <Route path="/approvals" element={<ApprovalDashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RequestProvider>
  );
};

export default App;
