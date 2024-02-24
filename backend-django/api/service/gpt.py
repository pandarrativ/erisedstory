import openai
from ..scripts.script_util import PromptTemplate
from dotenv import load_dotenv
import os
from .dalle import DalleAPI
import datetime
from ..dao import ScriptPlayDAO,WidgetDAO
from ..utils.utils import *
from ..utils.image_util import *
from ..scripts.WidgetSettings import WidgetSetting

# scripts
from ..scripts.ShantaramConfig import Shantaram
from ..scripts.HarryPotterConfig import HarryPotter
from ..scripts.WitcherConfig import Witcher
from ..scripts.ThreeBodyConfig import ThreeBody



class GptAPI:
    # load local parameters
    load_dotenv()
    client = openai.AzureOpenAI(
        api_key = os.getenv("OPENAI_API_KEY"),
        api_version = os.getenv("OPENAI_API_VERSION"),
        azure_endpoint = os.getenv("OPENAI_API_ENDPOINT"),
    )
    
 ##############################################################################################################################################
 ## Below are the functions to set openai model parameters and send to openai
 ##############################################################################################################################################
    @staticmethod
    def send_prompt(prompt, model = "gpt-35-turbo", is_json=False):
        if is_json:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, # model = "deployment_name".
                response_format={ "type": "json_object" },
                messages=[{"role": "user", "content": prompt}]
            )
        else:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, # model = "deployment_name".
                messages=[{"role": "user", "content": prompt}]
            )
        
        resp =response.choices[0].message.content
        return resp

    @staticmethod
    def send_messages(messages, model = "gpt-35-turbo", is_json=False):
        if is_json:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, 
                response_format={ "type": "json_object" },
                messages=messages
            )
        else:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, 
                messages=messages
            )
        
        resp =response.choices[0].message.content
        return resp

 ##############################################################################################################################################
 ## Below are the functions to for the main function
 ##############################################################################################################################################
 


    """
    prompt state: 
        0: ask for a story description
        1: ask for three options
        2: ask for character
        3: ask for story description after options
        4: ask for story description after conversation
    """
    @staticmethod
    def storyGPT(req):
        # script name is not being used so far
        script_name, prompt_state, prompt, scriptplay_id, order = req["script_name"], req["prompt_state"], req["prompt"], req["scriptplay_id"], req["order"]
        print("state",prompt_state)

        # set prompt script
        Script_class = HarryPotter
        # if script_name == "Shantaram":
        #     Script_class = Shantaram
        # elif script_name == "Witcher":
        #     Script_class = Witcher
        # elif script_name == "ThreeBody":
        #     Script_class = ThreeBody
            
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
        if prompt_state == "0":
            try:
                resp = GptAPI.send_prompt(prompt = prompt+ " "+  PromptTemplate.ask_story(username))
                res = parse_to_json(resp)
            except:
                resp = GptAPI.send_prompt(prompt = prompt+ " "+  PromptTemplate.ask_story(username))
                res = parse_to_json(resp)

            # generate img
            ###############################################################################
            # res["img"] = get_image(Script_class=Script_class)
            ###############################################################################

            #store data
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            # ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="story-description",data = res)
            return res
        
        # ask for options
        elif prompt_state == "1":
            try:
                resp = GptAPI.send_prompt(prompt + " " + PromptTemplate.ask_options(username))
                res = parse_to_json(resp)
            except:
                resp = GptAPI.send_prompt(prompt + " " + PromptTemplate.ask_options(username))
                res = parse_to_json(resp)

            # generate img
            ###############################################################################
            # res["img"] = get_image(Script_class=Script_class)
            ###############################################################################


            #store data
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            # ScriptPlayDAO.create_options(scriptplay_id, order+1, res["question"], res["option_1"], res["option_2"], res["option_3"])
            # ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="generate-options",data = res)
            return res
        
        # ask for character
        elif prompt_state == "2":
            try:
                resp = GptAPI.send_prompt(prompt + " " + PromptTemplate.ask_character(username))
                res = parse_ask_character_to_json(resp)
            except:
                resp = GptAPI.send_prompt(prompt + " " + PromptTemplate.ask_character(username))
                res = parse_ask_character_to_json(resp)
            
            res["chat_background"] = PromptTemplate.get_chat_background(username, res["character_name"], res["character_personality"], prompt)
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
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            # ScriptPlayDAO.start_conversation(scriptplay_id, order+1, res["character_name"], res["character_personality"], res["chat_background"], res["first_sentence"])
            # ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="generate-character",data = res)
            return res
        
        #continue options
        elif prompt_state == "3":
            try:
                resp = GptAPI.send_prompt(prompt + " " +PromptTemplate.continue_options(username, req["choice"]))
                res = parse_to_json(resp)
            except:
                resp = GptAPI.send_prompt(prompt + " " +PromptTemplate.continue_options(username, req["choice"]))
                res = parse_to_json(resp)

            # generate img
            ###############################################################################
            # res["img"] = get_image(Script_class=Script_class)
            ###############################################################################

            
            #store data
            # ScriptPlayDAO.choose_option(scriptplay_id, order, req["choice"])
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            # ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="continue-options",data = res)
            # ScriptPlayDAO.add_option_choice(object_id=scriptplay_id, order=order-1,choice=req["choice"])
            return res
        

        # continue story after conversation
        elif prompt_state == "4":
            # make a summary of conversation
            messages, character_name = req["messages"], req["character_name"]
            try:
                resp = GptAPI.send_prompt(prompt + " " + PromptTemplate.end_conversation(messages,character_name, username))
                res = parse_to_json(resp)
            except:
                resp = GptAPI.send_prompt(prompt + " " + PromptTemplate.end_conversation(messages,character_name, username))
                res = parse_to_json(resp)
            
            # generate img
            ###############################################################################
            # res["img"] = get_image(Script_class=Script_class)
            ###############################################################################



            #store data
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            # ScriptPlayDAO.end_convseration(scriptplay_id, order)
            # ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="continue-character",data = res)
            # ScriptPlayDAO.add_character_conversation(object_id = scriptplay_id, order = order-1,messages = messages)
            return res
        
    
    @staticmethod
    def chatGPT_conversation(req):
        resp = GptAPI.send_messages(messages=req["prompt"])

        # Get the current time
        current_time = datetime.datetime.now()
        # formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
        formatted_time = current_time.strftime("%H:%M")
        res = {"resp":resp, "time":formatted_time}
        return res
    
    @staticmethod
    def widgetGPT(req):
        script_name, messages, scriptplay_agent_id,widget_name = req["script_name"], req["messages"],  req["scriptplay_agent_id"], req["widget_name"]
        
        messages = WidgetSetting.prepare_messages(messages=messages, script_name=script_name,widget_name=widget_name)
        resp = GptAPI.send_messages(messages=messages)

        WidgetDAO.add_script_play_agent_messages(scriptplay_agent_id, {"role":"user", "content":req["new_message"]})
        WidgetDAO.add_script_play_agent_messages(scriptplay_agent_id, {"role":"assistant", "content":resp})
        return resp
    

    @staticmethod
    def widgetToastGPT(req):
        script_name, messages, scriptplay_agent_id,widget_name, prompt = req["script_name"], req["messages"],  req["scriptplay_agent_id"], req["widget_name"], req['prompt']
        
        messages = WidgetSetting.prepare_toast_messages(messages=messages, script_name=script_name,widget_name=widget_name, prompt=prompt)
        resp = GptAPI.send_messages(messages=messages)
        WidgetDAO.add_script_play_agent_messages(scriptplay_agent_id, {"role":"assistant", "content":resp}, type="toast",order = req["order"])
        return resp
    
    @staticmethod
    def widget_helper(req):
        resp = GptAPI.send_messages(messages=req["messages"])
        return resp
    

    @staticmethod
    def summarize_prompt(req):
        resp = GptAPI.send_prompt(PromptTemplate.summarize_prompt(req["prompt"]))
        return resp

    @staticmethod
    def chatGPT_groupchat(req):
        resp = GptAPI.send_prompt(PromptTemplate.get_groupchat_bg(
            username=req["username"],
            script = req['script'],
            character_list=req["character_list"],
            messages=req["messages"],
            chat_background=req["chat_background"]
        ))
        res = parse_ask_character_to_json(resp)
        return res




