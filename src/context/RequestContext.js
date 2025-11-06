import React, { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const API_URL = "https://690b692d6ad3beba00f4d292.mockapi.io/api/requests";

const RequestContext = createContext();
 
export const RequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
 
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };
 
    const addRequest = async (formData) => {
        const newRequest = { id: uuidv4(), ...formData };
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRequest),
            });
            const data = await res.json();
            setRequests((prev) => [...prev, data]);
            return data;
        } catch (error) {
            console.error("Error adding request:", error);
        }
    };
 
    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const updated = await res.json();
            setRequests((prev) =>
                prev.map((r) => (r.id === id ? { ...r, status } : r))
            );
            return updated;
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <RequestContext.Provider
            value={{ requests, loading, addRequest, updateStatus, fetchRequests }}
        >
            {children}
        </RequestContext.Provider>
    );
};
 
export const useRequests = () => useContext(RequestContext);
