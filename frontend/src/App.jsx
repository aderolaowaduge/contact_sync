import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import CreateContactForm from "./CreateContactForm";
import EditContactForm from "./EditContactForm";


function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewContact, setIsNewContact] = useState(true)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
    if (!isNewContact) setIsNewContact(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
    setIsNewContact(false)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} />
      <Button onClick={openCreateModal}>Create New Contact</Button>
      <Modal isOpen={isModalOpen}>
        <ModalBody>
          <span className="close" onClick={closeModal}>&times;</span>
          {isNewContact ? 
            <CreateContactForm updateCallback={onUpdate} />
          : 
            <EditContactForm existingContact={currentContact} updateCallback={onUpdate} />
          }
        </ModalBody>
      </Modal>
    </>
  );
}

export default App;