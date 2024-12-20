import random
from flask import Blueprint, request, jsonify, session
from flask_bcrypt import Bcrypt
from models import db, Users, Sign, Question_signs, Question_braille, Lessons

bp = Blueprint('auth', __name__, url_prefix='')
bcrypt = Bcrypt()


def get_next_question(model, lesson_score):
    if lesson_score <= 200:
        difficulty = 1
    elif lesson_score <= 600:
        difficulty = 2
    elif lesson_score <= 900:
        difficulty = 3
    else:
        difficulty = 3

    question = model.query.filter_by(Q_difficulty=difficulty).first()

    if question:
        return {
            "Q_ID": question.Q_ID,
            "Q_Braille_Symbol": question.Q_Braille_Symbol,
            "Q_answer": question.Q_answer,
            "Q_A1": question.Q_A1,
            "Q_A2": question.Q_A2,
            "Q_A3": question.Q_A3,
            "Q_A4": question.Q_A4,
            "Q_text": question.Q_text,
            "Q_stage": question.Q_stage,
            "Q_difficulty": question.Q_difficulty,
            "Q_level": question.Q_level
        }
    else:
        return {"error": "No more questions available"}


@bp.route('/next_question_braille', methods=['GET'])
def get_next_question_braille():
    try:
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        user = Users.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        lesson_score = user.lesson_score
        question = get_next_question(Question_braille, lesson_score)

        return jsonify(question)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/next_question_sign', methods=['GET'])
def get_next_question_sign():
    try:
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        user = Users.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        lesson_score = user.lesson_score
        question = get_next_question(Question_signs, lesson_score)
        return jsonify(question)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/signs', methods=['GET'])
def get_signs():
    signs = Sign.query.all()
    signs_list = [
        {
            "S_ID": s.S_ID,
            "S_translate": s.S_translate,
            "S_path": s.S_path
        } for s in signs
    ]
    return jsonify(signs_list)


@bp.route('/lessons', methods=['GET'])
def get_lessons():
    lessons = Lessons.query.all()
    lessons_list = [
        {
            "L_no": l.L_no,
            "L_topic": l.L_topic,
            "L_isFinished": l.L_isFinished,
            "L_level": l.L_level,
            "L_image": l.L_image,
            "L_text": l.L_text
        } for l in lessons
    ]
    return jsonify(lessons_list)


@bp.route("/register", methods=["POST"])
def register_user():
    data = request.json
    name = data.get('name')
    age = data.get('age')
    password = data.get('password')
    email = data.get('email')

    if not all([name, age, password, email]):
        return jsonify({"error": "All fields (name, age, time, password, email) are required"}), 400

    user_exists = Users.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = Users(name=name, age=age, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "name": new_user.name,
        "age": new_user.age,
        "time": new_user.time,
        "email": new_user.email
    }), 201


@bp.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = Users.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id
    print(f"Logged in user_id: {session['user_id']}")  # Debug log

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@bp.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = Users.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "name": user.name,
        "age": user.age,
        "time": user.time,
        "password": user.password,
        "email": user.email,
        "total_score": user.total_score,
        "stage": user.stage,
        "level": user.level,
        "lesson_score": user.lesson_score,
        "avatar": user.avatar
    })


@bp.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

