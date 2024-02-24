import random
def get_image(Script_class):
    return Script_class.image_path + str(random.randint(1, Script_class.image_counts)) + ".png"