from ..scripts.script_util import PromptTemplate
from ..ai_models.openai_api import OpenAIAPI
import datetime
from ..dao import ScriptPlayDAO 
from ..utils.utils import *


# scripts
from ..scripts.HarryPotterConfig import HarryPotter
from ..scripts.ThreeBodyConfig import ThreeBody




 ##############################################################################################################################################
 ## Below are the functions to for the main function
 ##############################################################################################################################################
"""
TASK: 
    ASK_STORY: ask for a story description
    ASK_DECISION_MAKING: ask for decision making and three options
    ASK_CONVERSATION: ask for character
    CONTINUE_DECISION_MAKING: ask for story description after options
    END_CONVERSATION: ask for story description after conversation
"""

def storyGPT_generation(req):
    # script name is not being used so far
    script_name, task, prompt, scriptplay_id, order = req["script_name"], req["task"], req["prompt"], req["scriptplay_id"], req["order"]
    print("task",task)

    # set prompt script
    Script_class = HarryPotter
    if script_name == "ThreeBody":
        Script_class = ThreeBody
        
    username = Script_class.username

    # for summarized prompt header
    if req["summary"] == "N/A":  
        prompt = Script_class.prompt_head + " " + prompt
    else:
        prompt = PromptTemplate.wrap_prompt_head(prompt=req["summary"]) + prompt
        
    
    ##############################################3##################33
    # First image, disable in children system
    # first_story_image = Script_class.first_story_image
    ###################################################################
    

    # ask for story
    if task == "ASK_STORY":
        try:
            resp = OpenAIAPI.send_prompt(prompt = prompt+ " "+  PromptTemplate.ask_story(username))
            res = parse_to_json(resp)
        except:
            resp = OpenAIAPI.send_prompt(prompt = prompt+ " "+  PromptTemplate.ask_story(username))
            res = parse_to_json(resp)

        res["type"] = "story-description"
        # generate img
        ###############################################################################
        # res["img"] = get_image(Script_class=Script_class)
        ###############################################################################

        #store data
        # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
        ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, data = res)
        return res
    
    # ask for options
    elif task == "ASK_DECISION_MAKING":
        try:
            resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_options(username))
            res = parse_to_json(resp)
        except:
            resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_options(username))
            res = parse_to_json(resp)

        res["type"] = "decision-making"
        # generate img  
        ###############################################################################
        # res["img"] = get_image(Script_class=Script_class)
        ###############################################################################


        #store data
        ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order,data = res)
        return res
    
    # ask for character
    elif task == "ASK_CONVERSATION":
        try:
            resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_character(username))
            res = parse_ask_character_to_json(resp)
        except:
            resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_character(username))
            res = parse_ask_character_to_json(resp)
        
        res["type"] = "conversation"
        
        res["chat_background"] = PromptTemplate.get_chat_background(username, res["character_name"], res["character_description"], prompt)
        # res["avatar"] = get_random_avatar()
        # # generate img
        # ###############################################################################
        # # generate img
        # # img = DalleAPI.generateImg(res["story"])
        # res["sm_bg_img"] = "/sample/sample_sm_bg.png"

        # for image, i in zip(get_random_post_imgs(), [1,2,3]):
        #     res["post_image_" + str(i)] = image
        # ###############################################################################
        # res["img"] = get_image(Script_class=Script_class)
        
        #store data
        ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order,data = res)
        return res
    
    #continue options
    elif task == "CONTINUE_DECISION_MAKING":
        try:
            resp = OpenAIAPI.send_prompt(prompt + " " +PromptTemplate.continue_options(username, req["choice"]))
            res = parse_to_json(resp)
        except:
            resp = OpenAIAPI.send_prompt(prompt + " " +PromptTemplate.continue_options(username, req["choice"]))
            res = parse_to_json(resp)
        
        res["type"] = "story-description"

        # generate img
        ###############################################################################
        # res["img"] = get_image(Script_class=Script_class)
        ###############################################################################

        
        #store data
        ScriptPlayDAO.add_option_choice(object_id=scriptplay_id, order=order-1,choice=req["choice"])
        ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, data = res)
        return res
    

    # continue story after conversation
    elif task == "END_CONVERSATION":
        # make a summary of conversation
        messages, character_name = req["messages"], req["character_name"]
        try:
            resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.end_conversation(messages,character_name, username))
            res = parse_to_json(resp)
        except:
            resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.end_conversation(messages,character_name, username))
            res = parse_to_json(resp)
        
        res["type"] = "story-description"
        # generate img
        ###############################################################################
        # res["img"] = get_image(Script_class=Script_class)
        ###############################################################################



        #store data
        # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
        # ScriptPlayDAO.end_convseration(scriptplay_id, order)
        ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, data = res)
        ScriptPlayDAO.add_character_conversation(object_id = scriptplay_id, order = order-1,messages = messages)
        return res
    

def chatGPT_conversation(req):
    resp = OpenAIAPI.send_messages(messages=req["prompt"])

    # Get the current time
    current_time = datetime.datetime.now()
    # formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
    formatted_time = current_time.strftime("%H:%M")
    res = {"resp":resp, "time":formatted_time}
    return res

def summarize_prompt(req):
    resp = OpenAIAPI.send_prompt(PromptTemplate.summarize_prompt(req["prompt"]))
    return resp




