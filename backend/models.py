from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, default=1000)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    time = db.Column(db.String, default=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))
    password = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    total_score = db.Column(db.Integer, nullable=False, default=0)
