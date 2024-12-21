import os

# Path to the folder containing the images
folder_path = r"C:\Users\Anas Mohamed\Desktop\HandiLingo\Data\Signs"

# Iterate through all files in the folder
for filename in os.listdir(folder_path):
    # Create the full path for the file
    old_file_path = os.path.join(folder_path, filename)

    # Skip directories, process files only
    if os.path.isfile(old_file_path):
        # New filename with "Sign_" prefix
        new_filename = "Sign_" + filename
        new_file_path = os.path.join(folder_path, new_filename)

        # Rename the file
        os.rename(old_file_path, new_file_path)

print("All files have been renamed successfully!")
