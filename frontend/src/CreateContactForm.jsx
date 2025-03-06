import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { useState } from "react";

const CreateContactForm = ({ updateCallback }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [file, setFile] = useState(null)

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

        try {
            const response = await fetch('http://localhost:5000/create_contact', {
                method: 'POST',
                body: formData,
            })
    
            if (!response.ok) {
                // If the response is not OK, throw an error with the status text
                alert(response.statusText)
                throw new Error(`Error: ${response.statusText}`)
            }
    
            const result = await response.json() // Attempt to parse the response as JSON
            console.log(result)  // You should see the "message" and "contact" in the response
            updateCallback()
        } catch (error) {
            console.error('Error:', error)
        }

    }
    

    return (
        <form onSubmit={onSubmit} encType='multipart/form-data'>
            <h2>Create Contact</h2>
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
            {file && <img src={URL.createObjectURL(file)} alt="Preview" width="100" />}  {/* Show preview */}
            
            <Button type="submit">Create</Button>
        </form>
    );
};

export default CreateContactForm