from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_login import login_user, logout_user, current_user, login_required
from models import db, Users, Sign, Questions_signs, Questions_braille, Lessons

bp = Blueprint('auth', __name__, url_prefix='')
bcrypt = Bcrypt()


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

    login_user(new_user)

    return jsonify({
        "id": new_user.id,
        "name": new_user.name,
        "age": new_user.age,
        "email": new_user.email
    }), 201


@bp.route("/login", methods=["POST"])
def login_user_route():
    email = request.json["email"]
    password = request.json["password"]

    user = Users.query.filter_by(email=email).first()

    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    login_user(user)
    return jsonify({"id": user.id, "email": user.email})


@bp.route("/@me", methods=["GET", "POST"])
@login_required
def get_current_user():
    # current_user.stage = 1
    # current_user.lesson_score = 0
    # db.session.commit()
    return jsonify({
        "id": current_user.id,
        "name": current_user.name,
        "age": current_user.age,
        "email": current_user.email,
        "lesson_score": current_user.lesson_score,
        "stage": current_user.stage,
        "level": current_user.level,
        "total_score": current_user.total_score,
        "avatar": current_user.avatar
    })


@bp.route("/logout", methods=["POST"])
@login_required
def logout_user_route():
    logout_user()
    return "200"


def get_next_question(model, lesson_score, stage):
    difficulty = 0
    # Get user's current level
    level = current_user.level  # Add this line
    
    if stage < 10:
        if lesson_score <= 200:
            difficulty = 1
        elif lesson_score <= 600:
            difficulty = 2
        elif lesson_score <= 900:
            difficulty = 3
        else:
            difficulty = 3
    elif stage < 20:
        difficulty = 4
    elif stage < 30:
        difficulty = 5
    # Add Q_level to the filter conditions
    question = model.query.filter_by(
        Q_difficulty=difficulty, 
        Q_stage=stage,
        Q_level=level  # Add this line
    ).order_by(db.func.random()).first()
    # question = model.query.filter_by(Q_difficulty=difficulty, Q_stage=stage).order_by(db.func.random()).first()

    if question:
        if model == Questions_signs:
            return {
                "Q_ID": question.Q_ID,
                "Q_image": question.Q_image,
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
@login_required
def get_next_question_braille():
    try:
        lesson_score = current_user.lesson_score
        stage = current_user.stage
        question = get_next_question(Questions_braille, lesson_score, stage)

        return jsonify(question)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/update_avatar", methods=["POST"])
@login_required
def update_avatar():
    data = request.json
    avatar = data.get("avatar")

    if not avatar:
        return jsonify({"error": "Avatar is required"}), 400

    # List of valid avatars
    valid_avatars = [f"avatar_{i}.png" for i in range(10)]  # Example: avatar_0.png to avatar_9.png
    if avatar not in valid_avatars:
        return jsonify({"error": "Invalid avatar"}), 400

    # Update the avatar for the current user
    current_user.avatar = avatar
    db.session.commit()

    return jsonify({"message": "Avatar updated successfully", "avatar": current_user.avatar}), 200


@bp.route('/next_question_sign', methods=['GET'])
@login_required
def get_next_question_sign():
    try:
        selected_stage = int(request.args.get('stage', 1))
        level = int(request.args.get('level', 1))
        
        # Check if stage is locked
        if selected_stage > current_user.stage:
            return jsonify({"error": "This stage is locked", "maxStage": current_user.stage}), 403
        
        question = Questions_signs.query.filter_by(
            Q_stage=selected_stage,
            Q_level=level
        ).order_by(db.func.random()).first()
        
        if question:
            return jsonify({
                "Q_ID": question.Q_ID,
                "Q_image": question.Q_image,
                "Q_answer": question.Q_answer,
                "Q_A1": question.Q_A1,
                "Q_A2": question.Q_A2,
                "Q_A3": question.Q_A3,
                "Q_A4": question.Q_A4,
                "Q_text": question.Q_text,
                "Q_stage": selected_stage,
                "Q_level": level
            })
        return jsonify({"error": "No questions found"}), 404

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


@bp.route("/update_lesson_score", methods=["POST"])
@login_required
def update_lesson_score():
    try:
        data = request.json
        new_lesson_score = data.get("lesson_score")

        if new_lesson_score is None:
            return jsonify({"error": "Lesson score is required"}), 400

        current_user.lesson_score = new_lesson_score
        db.session.commit()

        return jsonify({"message": "Lesson score updated successfully"}), 207

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/update_stage", methods=["POST"])
@login_required
def update_stage():
    try:
        data = request.json
        completed_stage = data.get("stage")
        
        if completed_stage is None:
            return jsonify({"error": "Stage is required"}), 400
            
        # Only update if completed stage is current or previous stage
        if completed_stage <= current_user.stage:
            new_stage = max(current_user.stage, completed_stage + 1)
            current_user.stage = new_stage
            db.session.commit()
            
            return jsonify({
                "message": "Stage updated successfully",
                "newStage": new_stage
            }), 200
            
        return jsonify({"error": "Invalid stage progression"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route("/update_total_score", methods=["POST"])
@login_required
def update_total_score():
    try:
        current_user.stage = 1
        data = request.json
        new_total_score = data.get("total_score")

        if new_total_score is None:
            return jsonify({"error": "Total score is required"}), 400

        current_user.total_score = new_total_score
        db.session.commit()

        return jsonify({"message": "Lesson score updated successfully"}), 207

    except Exception as e:
        return jsonify({"error": str(e)}), 500
