# contact_sync
A Flask-based web application that allows users to create, update, and manage contacts, including uploading profile pictures. The frontend is built with React, providing an interactive user interface for easy contact management.

## Features

- **Create Contacts**: Users can add new contacts with their first name, last name, email, and profile picture.
- **Update Contacts**: Users can update contact details, including profile pictures (currently working on full integration for updating images).
- **Delete Contacts**: Users can remove contacts from the database.
- **View Contacts**: A list of all contacts is available, with their names, emails, and profile images.

## Tech Stack

- **Backend**: Flask (Python), SQLAlchemy, SQLite
- **Frontend**: React
- **File Uploads**: Handles image uploads and stores them in an `uploads` folder

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/contact-management-app.git
   cd contact-management-app/backend
   ```
   
2. Create a virtual environment:

  ```bash
  python3 -m venv venv
  source venv/bin/activate  # For macOS/Linux
  venv\Scripts\activate     # For Windows
  ```
3. Install dependencies:

  ```bash
  pip install -r requirements.txt
  ```
4. Run the Flask app:
   ```bash
   flask run
   ```

### Frontend
1. Navigate to the frontend folder:
  ```bash
  cd ../frontend
  ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run the React app:
   ```bash
   npm run dev
   ```
## Known Issues

- **File Upload Update**: Currently, file uploads can be added when creating a contact, but updating an existing contact's profile picture is still being integrated. The functionality for updating images will be added soon.

## Future Improvements

- Implement a fully integrated feature for updating contact profile pictures when modifying a contact's details.
- Improve error handling for file uploads and database operations.

