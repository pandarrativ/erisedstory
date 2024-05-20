
from ..scripts.script_util import PromptTemplate
from ..dao import *
from common_utils.utils import parse_to_json


# scripts
from ..scripts.HarryPotterConfig import HarryPotter
from ..scripts.WitcherConfig import Witcher
from ..scripts.ThreeBodyConfig import ThreeBody

from ai_models.openai_api import OpenAIAPI

from ..scripts.script_util import get_script_class




class StoryPlayService:
    """
    prompt state: 
        TASK_STORY: ask for a story description
        TASK_DECISION: ask for three options
        CONTINUE_DECISION: ask for story description after options
        TASK_SINGLE_CONVERSATION: ask for character
        CONTINUE_SINGLE_CONVERSATION: ask for story description after conversation

    event type:
        story
        decision_making
        single_conversation
    """
    @staticmethod
    def get_all_stories():
        # need to get data from database in the future
        return [
            HarryPotter.get_script_info(),
            Witcher.get_script_info(),
            ThreeBody.get_script_info(),
        ]


    @staticmethod
    def solve_story_task(req):
        # need to replace story_name with story_id in the future
        storyplay_id, story_name, task, order, current_story = req["storyplay_id"], req["story_name"], req["task"], req["order"], req["current_story"]
        print("task",task)

        # set prompt script
        # Script_class = HarryPotter
        # if story_name == "The Witcher":
        #     Script_class = Witcher
        # elif story_name == "The Three-Body Problem":
        #     Script_class = ThreeBody
        Script_class = get_script_class(story_name=story_name)


        protagonist_name = Script_class.protagonist_name

        # for summarized prompt header
        # if req["summary"] == "N/A":  
        #     prompt = Script_class.prompt_head + " " + prompt
        # else:
        #     prompt = PromptTemplate.wrap_prompt_head(prompt=req["summary"]) + prompt

        # ask for story
        if task == "TASK_STORY":
            try:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.ask_story(protagonist_name)))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.ask_story(protagonist_name)))
                res = parse_to_json(resp)

            #store data
            data = StoryPlayDAO.add_playdata_section(object_id = storyplay_id, order = order, event_type = "story", story=res["story"])  
            return data
        
        # ask for options
        elif task == "TASK_DECISION":
            try:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.ask_options(protagonist_name)))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.ask_options(protagonist_name)))
                res = parse_to_json(resp)


            #store data
            data = StoryPlayDAO.add_playdata_section(object_id = storyplay_id, order = order, event_type = "decision_making", decision_making_data=res)  
            return data
        
        # continue decision making
        elif task == "CONTINUE_DECISION":
            question, option_1, option_2, option_3, choice = req["question"], req["option_1"], req["option_2"], req["option_3"], req["choice"]
            try:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.continue_options(protagonist_name, choice, question, option_1, option_2, option_3)))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.continue_options(protagonist_name, choice, question, option_1, option_2, option_3)))
                res = parse_to_json(resp)


            decision_making_data = {"question":question, "option_1":option_1, "option_2":option_2, "option_3":option_3, "choice": choice}
            #store data
            data = StoryPlayDAO.add_playdata_section(object_id = storyplay_id, order = order, event_type = "story", story=res["story"])  
            StoryPlayDAO.add_option_choice(object_id=storyplay_id, order=order-1,decision_making_data=decision_making_data)
            return data
        
        #continue options
        elif task == "TASK_SINGLE_CONVERSATION":
            try:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.ask_single_conversation(protagonist_name)))
                res = parse_to_json(resp)
                res["messages"] = [
                    {"role":"system", "content":PromptTemplate.get_chat_background(username=protagonist_name, character_name=res["character_name"], current_story=current_story)},
                    {"role": "assistant", "content": res["opening_sentence"]},    
                ]
            except:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.ask_single_conversation(protagonist_name)))
                res = parse_to_json(resp)
                res["messages"] = [
                    {"role":"system", "content":PromptTemplate.get_chat_background(username=protagonist_name, character_name=res["character_name"], current_story=current_story)},
                    {"role": "assistant", "content": res["opening_sentence"]},    
                ]
 
            res["chat_prompt_settings"] =  PromptTemplate.get_chat_background(username=protagonist_name, character_name=res["character_name"], current_story=current_story)
            data = StoryPlayDAO.add_playdata_section(object_id = storyplay_id, order = order, event_type="single_conversation", single_conversation_data = res)
            return data
        

        # continue story after conversation
        elif task == "CONTINUE_SINGLE_CONVERSATION":
            # make a summary of conversation
            conversation_background, messages, character_name = req["conversation_background"], req["messages"], req["character_name"]
            try:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.continue_single_conversation(messages=messages, character_name=character_name,username=protagonist_name)))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_messages(messages=PromptTemplate.wrap_settings(current_story=current_story, prompt=PromptTemplate.continue_single_conversation(messages=messages, character_name=character_name,username=protagonist_name)))
                res = parse_to_json(resp)
            

            
            single_conversation_data = {"conversation_background":conversation_background, "messages":messages, "character_name":character_name}
            data = StoryPlayDAO.add_playdata_section(object_id = storyplay_id, order = order, event_type="story", story=res["story"])  
            StoryPlayDAO.add_character_conversation_messages(object_id = storyplay_id, order = order-1, single_conversation_data = single_conversation_data)
            return data
        
   
    
    @staticmethod
    def solve_single_conversation(req):
        resp = OpenAIAPI.send_messages(messages=req["messages"])
        return {"role":"assistant" ,"content":resp}
    