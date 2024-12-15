import pandas as pd
from sqlalchemy import create_engine

# Define your database connection
engine = create_engine("postgresql://neondb_owner:u2eRIxH1ynbJ@ep-cool-tooth-a5q0m1rt.us-east-2.aws.neon.tech/neondb?sslmode=require")

# Load Excel data
sentences_df = pd.read_excel(r"C:\Users\Anas Mohamed\Desktop\HandiLingo\Data\Questions\slqSentences.xlsx")
words_df = pd.read_excel(r"C:\Users\Anas Mohamed\Desktop\HandiLingo\Data\Questions\slqWords.xlsx")

# Insert the data into the Questions table
words_df.to_sql("Questions", engine, if_exists="append", index=False)
sentences_df.to_sql("Questions", engine, if_exists="append", index=False)

print("Data imported successfully!")