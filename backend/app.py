from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
CORS(app)  # Enable CORS for cross-origin requests

# API Route
@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Flask!")

# Serve React Frontend
@app.route('/')
def serve_react():
    print(f"Serving index.html from {app.static_folder}")
    return send_from_directory(app.static_folder, 'index.html')

# Catch-all route to handle React routing
@app.route('/<path:path>')
def serve_react_files(path):
    try:
        print(f"Serving {path} from {app.static_folder}")
        return send_from_directory(app.static_folder, path)
    except FileNotFoundError:
        print(f"File {path} not found, serving index.html")
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True, port=3000)