import logging
from models import db, Questions_signs
from backend.app import app  # Import the app instance directly

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_sign_questions_with_difficulty_1():
    try:
        # Query the database using SQLAlchemy
        results = Questions_signs.query.filter_by(Q_difficulty=1).all()
        return results
    except Exception as e:
        logger.error(f"Error fetching sign questions with difficulty 1: {e}", exc_info=True)
        return []


if __name__ == "__main__":
    with app.app_context():  # Push the application context
        questions = get_sign_questions_with_difficulty_1()
        for question in questions:
            print(f"ID: {question.Q_ID}, Text: {question.Q_text}, Difficulty: {question.Q_difficulty}")
