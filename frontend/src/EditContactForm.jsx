import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { useState } from "react";

const EditContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const [contactPic, setContactPic] = useState(existingContact.file || "blank.png");
    const [id, setID] = useState(existingContact.id || 0);

    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        // Create a FormData object to handle the multipart form data
        const formData = new FormData()
        
        // Append the text fields (firstName, lastName, email)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        
        // Append the file field (note: `file` is the file object)
        formData.append('file', file)  // `file` should be a File object

        const url = `http://127.0.0.1:5000/update_contact/${existingContact.id}`
        const options = {
            method: "PATCH",
            body: formData
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Edit Contact</h2>
            <img 
                src={`http://127.0.0.1:5000/uploads/${contactPic}`} 
                style={{ width: "50px", height: "50px", borderRadius:"50%" }} 
                alt="Contact" 
            />
            <div>
                <label htmlFor="file">Contact Picture:</label>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <Button type="submit">Update</Button>
            <Button onClick={() => onDelete(id)}>Delete</Button>
        </form>
    );
};

export default EditContactForm