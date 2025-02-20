from sqlalchemy import create_engine
from config import ApplicationConfig
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from queries import query_questions

db_url = ApplicationConfig.SQLALCHEMY_DATABASE_URI

engine = create_engine(db_url)

Questions = pd.read_sql(query_questions, engine)

imgs = Questions['Q_image'][0].split(',')


def display_images(imgs):
    num_images = len(imgs)
    cols = 3
    rows = (num_images // cols) + (num_images % cols > 0)

    fig, axes = plt.subplots(rows, cols, figsize=(15, 5 * rows))
    axes = axes.flatten()  # Flatten the axes array for easy iteration

    for ax, img in zip(axes, imgs):
        if img[0] == ' ':
            img = img[1:]
        img_path = f'../Data/Signs/{img[5:]}.png'
        img = mpimg.imread(img_path)
        ax.imshow(img)
        ax.axis('off')

        # Hide any remaining empty subplots
    for ax in axes[num_images:]:
        ax.axis('off')

    plt.tight_layout()
    plt.show()


if __name__ == '__main__':
    display_images(imgs)
