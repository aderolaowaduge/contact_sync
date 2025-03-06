import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'reactstrap';
import "./Contact.css";


const ContactList = ({ contacts, updateContact }) => {

    return <div>
        <h2>Contacts</h2>
        <Table bordered="true" hover="true">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id} onClick={() => updateContact(contact)}>
                   
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
}

export default ContactList