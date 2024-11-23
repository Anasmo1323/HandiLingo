from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask app
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
CORS(app)

# Simulate a database
users = {}

# Authentication routes
def init_auth_routes():
    @app.route('/api/signup', methods=['POST'])
    def signup():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'alert': 'Please enter both username and password'}), 400
        
        # Validate email format
        if '@' not in username:
            return jsonify({'alert': 'Please enter a valid email address'}), 400
        
        # Check password strength
        if len(password) < 8:
            return jsonify({'alert': 'Password must be at least 8 characters long'}), 400
            
        # Check if password contains at least one number and one uppercase letter
        if not any(c.isdigit() for c in password) or not any(c.isupper() for c in password):
            return jsonify({'alert': 'Password must contain at least one number and one uppercase letter'}), 400
        
        if username in users:
            return jsonify({'alert': 'This email is already registered'}), 400
        
        users[username] = generate_password_hash(password)
        return jsonify({'alert': 'Account created successfully!', 'success': True}), 201

    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'alert': 'Please enter both username and password'}), 400
        
        if username not in users:
            return jsonify({'alert': 'Invalid email or password'}), 404
        
        if check_password_hash(users[username], password):
            return jsonify({'alert': 'Login successful', 'success': True}), 200
        return jsonify({'alert': 'Invalid email or password'}), 401

def init_app():
    init_auth_routes()
    return app

if __name__ == "__main__":
    app = init_app()
    app.run(debug=True, port=3000)