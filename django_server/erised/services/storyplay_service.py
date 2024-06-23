from common_utils.utils import parse_to_json, cut_and_parse
from ai_models.ollama_api import OllamaAPI
from ai_models.openai_api import OpenAIAPI



def get_paths(req):
    story, personality_trait, learning_goal = req["story"], req["personality_trait"], req["learning_goal"]

    messages = [
        {"role":"system", "content":"You are a story writting assistant. Your task is to help users writing his story."},
        {"role":"system", "content": """This is the story that the users have written: {{{story}}}. Based on the current story, create three possible paths for the plot to continue, with each path option being within 5 words. The paths should focus on the personality trait: {{{personality_trait}}} and learning goals of: {{{learning_goal}}}. Return your response in the following JSON format, with each key double-quoted: {{"path1":STRING, "path2":STRING, "path3":STRING}}.""".format(story=story, personality_trait=personality_trait, learning_goal=learning_goal)},
    ]  

    # resp = OllamaAPI.send_messages(messages=messages)
    print("path")
    print(messages[1])
    resp = OpenAIAPI.send_messages(messages=messages)
    print(resp)
    res = cut_and_parse(resp)
    return res
    

def get_suggestion(req):
    story, user_writting, personality_trait, learning_goal = req["story"], req["user_writting"], req["personality_trait"], req["learning_goal"]

    messages = [
        {"role":"system", "content":"You are a story writting assistant. The user is continuing a story, and your task is to provide suggestions for their continuation."},
        {"role":"system", "content": """This is the original story content: {{{story}}}. This is the user's continuation of the story: {{{user_writting}}}. Please provide suggestions for the user's story and the revised version of the story. Your suggestions should inspire the user of the personality trait: {{{personality_trait}}} and learning goals of: {{{learning_goal}}}. Return your response in the following JSON format, with each key double-quoted: {{"suggestion":STRING, "revised_story":STRING}}.""".format(story=story, user_writting=user_writting, personality_trait=personality_trait, learning_goal=learning_goal )},
    ]  

    # resp = OllamaAPI.send_messages(messages=messages)
    print("suggestion")
    print(messages[1])
    resp = OpenAIAPI.send_messages(messages=messages)
    print(resp)
    res = cut_and_parse(resp)
    return res

def ai_reframe_story():
    pass

