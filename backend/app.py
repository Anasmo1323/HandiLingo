from flask import Flask
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from flask_login import LoginManager
from config import ApplicationConfig
from models import db, Users
from routes import bp

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=[r"http://localhost:3001"])
bcrypt = Bcrypt(app)
app.config.from_object(ApplicationConfig)
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="None",  # Required for cross-origin requests
    SESSION_COOKIE_SECURE=True,  # Required for HTTPS; set to False for local development
)
if not app.config.get('SESSION_TYPE'):
    app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

app.register_blueprint(bp)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(port=5555, debug=True)