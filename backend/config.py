from dotenv import load_dotenv
import os
import redis

load_dotenv()


class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"postgresql://neondb_owner:u2eRIxH1ynbJ@ep-cool-tooth-a5q0m1rt.us-east-2.aws.neon.tech/neondb?sslmode=require"


# Enable session config
SESSION_TYPE = 'filesystem'
SESSION_PERMANENT = False
SESSION_USE_SIGNER = True
SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
