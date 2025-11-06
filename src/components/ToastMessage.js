import React, { useEffect, useRef } from "react";
import { Toast } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const ToastMessage = ({ show, message, variant = "info", onClose }) => {
    const toastRef = useRef(null);
    const bsToastRef = useRef(null); // store Bootstrap Toast instance

    const getIcon = () => {
        switch (variant) {
            case "success":
                return <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-white" />;
            case "error":
                return <FontAwesomeIcon icon={faTimesCircle} className="me-2 text-white" />;
            case "warning":
                return <FontAwesomeIcon icon={faExclamationTriangle} className="me-2 text-white" />;
            case "info":
            default:
                return <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-dark" />;
        }
    };



    // ✅ Initialize Bootstrap toast once
    useEffect(() => {
        if (toastRef.current && !bsToastRef.current) {
            bsToastRef.current = new Toast(toastRef.current, { delay: 3000 });
        }

        const toastEl = toastRef.current;
        const handleHidden = () => onClose && onClose();

        if (toastEl) {
            toastEl.addEventListener("hidden.bs.toast", handleHidden);
        }

        return () => {
            if (toastEl) toastEl.removeEventListener("hidden.bs.toast", handleHidden);
        };
    }, [onClose]);

    // ✅ When `show` changes → show the toast
    useEffect(() => {
        if (show && bsToastRef.current) {
            bsToastRef.current.show();
        }
    }, [show]);

    // Map variants to Bootstrap background/text classes
    const getToastClass = (variant) => {
        switch (variant) {
            case "success":
                return "bg-success text-white";
            case "approved":
                return "bg-success text-white";
            case "error":
                return "bg-danger text-white";
            case "rejected":
                return "bg-danger text-white";
            case "warning":
                return "bg-warning text-white";
            case "pending":
                return "bg-warning text-white";
            case "info":
            default:
                return "bg-info text-dark";
        }
    };


    return (
        <div
            className="position-fixed top-0 end-0 p-3"
            style={{ zIndex: 2000, top: "1rem", right: "1rem" }}
        >
            <div
                ref={toastRef}
                key={variant}
                className={`toast align-items-center ${getToastClass(variant)} border-0 shadow-lg fade`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex align-items-center px-3 py-2">
                    {getIcon()}
                    <div className="toast-body fw-semibold flex-grow-1">{message}</div>
                    <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default ToastMessage;
