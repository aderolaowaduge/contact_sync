from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os 


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")  # Absolute path
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)