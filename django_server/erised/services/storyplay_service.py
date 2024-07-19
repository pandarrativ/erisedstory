from common_utils.utils import parse_to_json, extract_and_parse_json
from ai_models.ollama_api import OllamaAPI
from ai_models.openai_api import OpenAIAPI



# def get_paths(req):
#     story, personality_trait, learning_goal = req["story"], req["personality_trait"], req["learning_goal"]

#     messages = [
#         {"role":"system", "content":"You are a story writting assistant. Your task is to help users writing his story."},
#         {"role":"system", "content": """This is the story that the users have written: {{{story}}}. Based on the current story, create three possible paths for the plot to continue, with each path option being within 5 words. The paths should focus on the personality trait: {{{personality_trait}}} and learning goals of: {{{learning_goal}}}. Return your response in the following JSON format, with each key double-quoted: {{"path1":STRING, "path2":STRING, "path3":STRING}}.""".format(story=story, personality_trait=personality_trait, learning_goal=learning_goal)},
#     ]  

#     # resp = OllamaAPI.send_messages(messages=messages)
#     print("path")
#     print(messages[1])
#     resp = OpenAIAPI.send_messages(messages=messages)
#     print(resp)
#     res = cut_and_parse(resp)
#     return res
    

# def get_suggestion(req):
#     story, user_writting, personality_trait, learning_goal = req["story"], req["user_writting"], req["personality_trait"], req["learning_goal"]

#     messages = [
#         {"role":"system", "content":"You are a story writting assistant. The user is continuing a story, and your task is to provide suggestions for their continuation."},
#         {"role":"system", "content": """This is the original story content: {{{story}}}. This is the user's continuation of the story: {{{user_writting}}}. Please provide suggestions for the user's story and the revised version of the story. Your suggestions should inspire the user of the personality trait: {{{personality_trait}}} and learning goals of: {{{learning_goal}}}. Return your response in the following JSON format, with each key double-quoted: {{"suggestion":STRING, "revised_story":STRING}}.""".format(story=story, user_writting=user_writting, personality_trait=personality_trait, learning_goal=learning_goal )},
#     ]  

#     # resp = OllamaAPI.send_messages(messages=messages)
#     print("suggestion")
#     print(messages[1])
#     resp = OpenAIAPI.send_messages(messages=messages)
#     print(resp)
#     res = cut_and_parse(resp)
#     return res

# def ai_reframe_story():
#     pass



def create_story(learning_goal, send_prompt):
    messages = [
        {"role": "user", "content": """You are a story narration agent. The user is going to writing continuation stories for given narrative. Your task is to create the narrative for me. The narrative should be based on animal characters and focus on the learning goal: {learning_goal}. Generate an engaging initial story background that incorporates the selected learning goal for me in 100 words. Return your response in JSON format, wrapped by curly brackets, and doubled quote each trait and value like this: {{"story":<STRING>}}""".format(learning_goal= learning_goal) },
    ]  
    resp = send_prompt(messages)
       
    dict_resp = extract_and_parse_json(resp)
    return dict_resp["story"]


def create_branch_options(learning_goal, story, send_prompt):
    messages = [
       {"role": "user", "content": """The user is now going to continue writing the story and requires a direction for the subsequent plot. Please generate three branching options that present SEB skills for the user to continue the story. The story should focus on the learning goal of: {learning_goal}. Each option should be concise and within 10 words. This is the current story: {story}. Return your response in the following JSON format, with each key double-quoted: {{"option1":STRING, "option2":STRING, "option3":STRING}}.""".format(story=story, learning_goal=learning_goal)},
    ]
    resp = send_prompt(messages)
    
    dict_resp = extract_and_parse_json(resp)
    return dict_resp


def continue_option(story, branch_option, user_story, learning_goal, send_prompt):
    messages = [
         {"role": "user", "content": """The user is now going to continue writing a story. This is the original story content: {{{story}}}. He pick a story direction as: {{{branch_option}}}. This is the user's writting for continuing the story: {{{user_story}}}. Please continue on user's writting and generate the next story plot in 100 words. The continuation story should focus on the learning goal of: {learning_goal}. Return your response in the following JSON format, with each key double-quoted: {{"story":<STRING>}}.""".format(story=story, branch_option=branch_option, user_story=user_story, learning_goal=learning_goal)},
    ]  
    resp = send_prompt(messages)
    
    dict_resp = extract_and_parse_json(resp)
    return dict_resp["story"]
