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
    level = db.Column(db.Integer, nullable=False, default=1)


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
    Q_level = db.Column(db.Integer)

class Sign(db.Model):
    __tablename__ = "Signs"
    S_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    S_translate = db.Column(db.String)
    S_path = db.Column(db.String)

class LessonData(db.Model):
    __tablename__ = "Lesson_data"
    L_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    L_text = db.Column(db.String)
    L_image = db.Column(db.String)
    L_no = db.Column(db.Integer)
    L_isfinished = db.Column(db.Boolean, default=False)

class Lesson(db.Model):
    __tablename__ = "Lessons"
    L_no = db.Column(db.Integer, primary_key=True, autoincrement=True)
    L_topic = db.Column(db.String)
    L_topic_isfinished = db.Column(db.Boolean, default=False)
    L_stage = db.Column(db.Integer)
    L_level = db.Column(db.Integer)
