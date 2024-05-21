from common_utils.utils import parse_to_json, cut_and_parse
from ai_models.ollama_api import OllamaAPI
from ai_models.openai_api import OpenAIAPI



# def new_story_writting():
#     messages = [
#         {"role":"system", "content":"You are a story writting assistant. Your task is to help users writing his story."},
#         {"role":"system", "content":f""},
#     ]
#     return messages

def get_paths(req):
    story = req["story"]

    messages = [
        {"role":"system", "content":"You are a story writting assistant. Your task is to help users writing his story."},
        {"role":"system", "content": """This is the story that the users have written: {{{story}}}. Based on the current story, create three possible paths for the plot to continue, with each path option being within 15 words. Return your response in the following JSON format, with each key double-quoted: {{"path1":STRING, "path2":STRING, "path3":STRING}}.""".format(story=story)},
    ]  

    # resp = OllamaAPI.send_messages(messages=messages)
    # resp = OpenAIAPI.send_messages(messages=messages)
    resp = """{
    "path1":"Alex climbs up the tree to rescue the cat, forming an unbreakable bond.",
    "path2":"The cat reveals a hidden message only Alex can decipher, leading to a mysterious adventure.",
    "path3":"Alex learns the cat's backstory of being abandoned, inspiring him to help reunite it."
}"""
    res = cut_and_parse(resp)

    return res
    

def ai_reframe_story():
    pass

