from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__, static_folder="build", static_url_path="/")
CORS(app)  # Enable CORS for cross-origin requests

# API Route
@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from Flask!")

# Serve React Frontend
@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

# Catch-all route to handle React routing
@app.route('/<path:path>')
def serve_react_files(path):
    try:
        return send_from_directory(app.static_folder, path)
    except FileNotFoundError:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
