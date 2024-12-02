import pandas as pd

def preprocess_questions():
    try:
        data = pd.read_excel('Data\\Questions\\slqWords.xlsx')
        #data = data.dropna()
        data_size = data.shape[0]
        file = pd.DataFrame()
        address = []
        for i in range(data_size): 
            row = data['Q_image'][i].split(',')
            images = []   
            for x in row:
                if x[0] == ' ':
                    x = x[1:]
                x = x[5:] # A
                images.append(f"Data\\Signs\\{x}.png")
            address.append(images)
        file['Address'] = address
    except:
        print("Error in reading the file")
    print(file.head())
    file.to_csv('Data\\Questions\\questions_words.csv')

            


if __name__ == '__main__':
    preprocess_questions()