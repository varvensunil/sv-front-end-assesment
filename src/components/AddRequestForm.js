import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useRequests } from "../context/RequestContext";
import ToastMessage from "./ToastMessage";

const AddRequestForm = () => {
    const { addRequest } = useRequests();
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "info",
    });

    const [formData, setFormData] = useState({
        projectName: "",
        requiredRole: "",
        experienceLevel: "",
        justification: "",
        priority: "",
        status: "pending",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        await addRequest(formData);
        setSubmitting(false);
        showToast("success", "Data submitted successful!");
        setFormData({
            projectName: "",
            requiredRole: "",
            experienceLevel: "",
            justification: "",
            priority: "",
            status: "pending",
        });
    }

    const showToast = (variant, message) => { 
        setToast((prev) => ({ ...prev, show: false }));
        setTimeout(() => {
            setToast({ show: true, variant, message });
        }, 100);
    };


    return (
        <>
            <div className="container mt-4">
                <h3 className="mb-3">Add Resource Request Form</h3>
                <Card className="shadow-sm p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="projectName"
                                className="shadow-none"
                                placeholder="Enter project name"
                                value={formData.projectName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Required Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="requiredRole"
                                className="shadow-none"
                                placeholder="Enter required role"
                                value={formData.requiredRole}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Experience Level (Years)</Form.Label>
                            <Form.Control
                                type="number"
                                name="experienceLevel"
                                className="shadow-none"
                                placeholder="Enter experience level"
                                value={formData.experienceLevel}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Justification</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="justification"
                                className="shadow-none"
                                placeholder="Enter justification..."
                                value={formData.justification}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                name="priority"
                                className="shadow-none"
                                value={formData.priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </Form.Select>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Submit Request"}
                        </Button>
                    </Form>
                </Card>
            </div>

            {toast.show && (
                <ToastMessage
                    show={toast.show}
                    message={toast.message}
                    variant={toast.variant}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </>
    );
};

export default AddRequestForm;
