import datetime
import json
import ast
import random

def get_current_time():
    return datetime.datetime.now()

# parser for story event
def parse_to_json(resp):
    return json.loads(resp)
                
def parse_ask_character_to_json(resp):
    try:
        return json.loads(resp)
    except Exception as e:  # incase it the dict keys is wrapped by ' instead of "
        return ast.literal_eval(resp)

def get_random_avatars(character_list):
    imgs = ["/sample/sample_avatar_1.png",
            "/sample/sample_avatar_2.png",
            "/sample/sample_avatar_3.png",
            "/sample/sample_avatar_4.png",
            "/sample/sample_avatar_5.png",
            "/sample/sample_avatar_6.png"]
    random.shuffle(imgs)

    for item, index in zip(character_list, [0,1,2,3,4,5]):
        item["avatar"] = imgs[index]
    return character_list

def get_random_avatar():
    return random.choice(["/sample/sample_avatar_1.png",
            "/sample/sample_avatar_2.png",
            "/sample/sample_avatar_3.png",
            "/sample/sample_avatar_4.png",
            "/sample/sample_avatar_5.png",
            "/sample/sample_avatar_6.png"])

def get_random_post_imgs():
    imgs = [
        "/sample/sample_post1.png",
        "/sample/sample_post2.png",
        "/sample/sample_post3.png",
    ]
    random.shuffle(imgs)
    return imgs