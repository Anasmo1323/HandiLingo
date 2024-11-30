from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from config import ApplicationConfig
from models import db, User

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=[r"http://localhost:3000"])
bcrypt = Bcrypt(app)
app.config.from_object(ApplicationConfig)
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="None",  # Required for cross-origin requests
    SESSION_COOKIE_SECURE=True,     # Required for HTTPS; set to False for local development
)
if not app.config.get('SESSION_TYPE'):
    app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

db.init_app(app)
with app.app_context():
    db.create_all()


@app.route("/register", methods=["POST"])
def register_user():
    data = request.json
    name = data.get('name')
    age = data.get('age')
    password = data.get('password')
    email = data.get('email')

    if not all([name, age, password, email]):
        return jsonify({"error": "All fields (name, age, time, password, email) are required"}), 400

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(name=name, age=age, email=email, password=hashed_password)

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


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

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

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    print(f"Current session user_id: {user_id}")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


if __name__ == '__main__':
    app.run(port=5555, debug=True)