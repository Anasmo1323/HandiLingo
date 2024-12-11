# backend/routes.py
from flask import Blueprint, request, jsonify, render_template
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, Question
from config import LoginForm

routes = Blueprint('routes', __name__)

@routes.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token)
        return jsonify({"msg": "Bad username or password"}), 401
    return render_template('login.html', form=form)

@routes.route('/signup', methods=['POST'])
def signup():
    username = request.json.get('username')
    password = request.json.get('password')
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@routes.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@routes.route('/get_questions_by_stage', methods=['GET'])
# check if the user is logged in
@jwt_required()
def get_questions_by_stage():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    stage = user.stage
    questions = Question.query.filter_by(Q_stage=stage).all()
    return jsonify(questions=[q.serialize() for q in questions]), 200