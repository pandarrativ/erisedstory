from ..scripts.SageAgentConfig import SageAgentConfig
from ai_models.openai_api import OpenAIAPI
from ..dao import StoryPlayDAO

class SageAgentService:
    @staticmethod
    def sage_chat_and_toast(req):

        storyplay_id, task, script_name, messages, username, story  = req["storyplay_id"], req["task"], req["script_name"], req["messages"], req["username"], req["story"]

        if task == "CHAT":          
            messages = SageAgentConfig.prepare_chat_messages(messages=messages, script_name=script_name, username=username, story=story)
            resp = OpenAIAPI.send_messages(messages=messages)


            messages.append({"role":"assistant", "content":resp})
            StoryPlayDAO.set_sage_chat_messages(object_id=storyplay_id, messages=messages)
            return resp
        
        elif task == "TOAST":
            action = req["action"]
            
            messages = SageAgentConfig.prepare_toast_messages(script_name=script_name, username=username, story=story, action=action)
            resp = OpenAIAPI.send_messages(messages=messages)

            messages.append({"role":"assistant", "content":resp})
            StoryPlayDAO.set_sage_chat_messages(object_id=storyplay_id, messages=messages)
            return resp
