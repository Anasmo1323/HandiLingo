import pandas as pd

def preprocess_questions():
    words_csv = pd.read_csv('Data/Questions/words.csv')
    print(words_csv.head())
    

            


if __name__ == '__main__':
    preprocess_questions()