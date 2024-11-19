import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { database } from "../FireBase/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getEditData();
        }
    }, [id]);

    const getEditData = async () => {
        try {
            const docRef = doc(database, "users", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setFormData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateData();
        } else {
            addData();
        }
    };

    const addData = async () => {
        try {
            const docRef = await addDoc(collection(database, "users"), { ...formData });
            console.log("Document added with ID:", docRef.id);
        } catch (error) {
            console.error("Error adding document:", error.message);
        }
    };

    const updateData = async () => {
        try {
            const docRef = doc(database, "users", id);
            await updateDoc(docRef, { ...formData });
            console.log("Document updated successfully!");
        } catch (error) {
            console.log("Error updating document:", error.message);
        }
    };

    return (
        <div className="container mt-5 bg-dark text-light p-5 rounded">
            <h2 className="mb-4 text-center">{id ? "Edit" : "User"} Registration Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control bg-secondary text-light"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type={id ? "text" : "password"}
                        className="form-control bg-secondary text-light"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-evenly">
                    <button type="submit" className="btn btn-primary">
                        {id ? "Edit" : "Submit"}
                    </button>
                    <Link to="/show">
                        <button type="button" className="btn btn-primary">
                            Show
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Form;
