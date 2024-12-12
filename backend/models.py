from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    time = db.Column(db.String, default=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))
    password = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    total_score = db.Column(db.Integer, nullable=False, default=0)
    stage = db.Column(db.Integer, nullable=False, default=1)

class Question(db.Model):
    __tablename__ = "Questions"
    Q_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Q_image = db.Column(db.String)
    Q_answer = db.Column(db.String)
    Q_A4 = db.Column(db.String)
    Q_A3 = db.Column(db.String)
    Q_A2 = db.Column(db.String)
    Q_A1 = db.Column(db.String)
    Q_text = db.Column(db.String)
    Q_stage = db.Column(db.Integer)
    Q_difficulty = db.Column(db.Integer)
