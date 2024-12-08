from sqlalchemy import create_engine
from config import ApplicationConfig
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

db_url = ApplicationConfig.SQLALCHEMY_DATABASE_URI

engine = create_engine(db_url)

query_questions = 'SELECT * FROM "Questions"'
query_signs = 'SELECT * FROM "Signs"'

Questions = pd.read_sql(query_questions, engine)
Signs = pd.read_sql(query_signs, engine)

imgs = []
first_question_imgs = Questions['Q_image'][0].split(',')
for img in first_question_imgs:
    if img[0] == ' ':
        img = img[1:]
    imgs.append(img)

imgs_info = Signs[Signs['S_translate'].isin(imgs)] 

def display_images(img_paths):
    num_images = len(img_paths)
    cols = 3  
    rows = (num_images // cols) + (num_images % cols > 0)  

    fig, axes = plt.subplots(rows, cols, figsize=(15, 5 * rows))
    axes = axes.flatten()  # Flatten the axes array for easy iteration

    for ax, img_path in zip(axes, img_paths):
        img = mpimg.imread(img_path)
        ax.imshow(img)
        ax.axis('off')  

    # Hide any remaining empty subplots
    for ax in axes[num_images:]:
        ax.axis('off')

    plt.tight_layout()
    plt.show()


if __name__ == '__main__':
    display_images(imgs_info['S_path'])