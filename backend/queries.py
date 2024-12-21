import pandas as pd
from sqlalchemy import create_engine

# Define your database connection
engine = create_engine("postgresql://neondb_owner:u2eRIxH1ynbJ@ep-cool-tooth-a5q0m1rt.us-east-2.aws.neon.tech/neondb?sslmode=require")

# Load the CSV file
words_df = pd.read_csv(r"C:\Users\Anas Mohamed\Desktop\HandiLingo\Data\Questions\Lesson_data.csv")

# Drop the L_no column to let PostgreSQL generate it starting from 1
if 'L_no' in words_df.columns:
    words_df = words_df.drop(columns=['L_no'])

# Insert the data into the Lessons table
words_df.to_sql("Lessons", engine, if_exists="append", index=False)

print("Data imported successfully!")
