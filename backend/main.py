from flask import request, jsonify
from config import app, db, UPLOAD_FOLDER
from models import Contact
import os
from werkzeug.utils import secure_filename
from flask import send_from_directory


app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

# Helper function to check if the file type is allowed
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Serve the images from the uploads folder
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})


@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.form.get("firstName")
    last_name = request.form.get("lastName")
    email = request.form.get("email")
    
    # Handle file upload if present
    file = request.files.get("file")
    
    if not first_name or not last_name or not email:
        return jsonify({"message": "You must include a first name, last name, and email"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)
  
    else:
        filename = None

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email, file=filename)
    
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!", "contact": new_contact.to_json()}), 201


@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    # Handle file upload during update
    file = request.files.get("file")
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)
        contact.file = filename  # Update the file field
    
    db.session.commit()

    return jsonify({"message": "User updated.", "contact": contact.to_json()}), 200


@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
