from .utils.db_util import MongoDBUtil
import uuid
from .utils.utils import get_current_time
from .modes.mode import get_mode_settings


# scripts
from .scripts.ShantaramConfig import Shantaram
from .scripts.HarryPotterConfig import HarryPotter
from .scripts.WitcherConfig import Witcher
from .scripts.ThreeBodyConfig import ThreeBody


class SurveyDAO:
    collection = MongoDBUtil.get_collection(collection="simulife_plus_survey")

    @staticmethod
    def save_survey_data(data):
        SurveyDAO.collection.insert_one(data)
        return True


class WidgetDAO:
    collection = MongoDBUtil.get_collection(collection="script_play_agent")

    @staticmethod
    def create_new_script_play_agent(user_id, scriptplay_id, agent):
        data = {
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            "scriptplay_id": scriptplay_id,
            "agent":agent,
            "messages":[]
        }
        inserted_id = WidgetDAO.collection.insert_one(data).inserted_id
        return inserted_id

    @staticmethod
    def add_script_play_agent_messages(scriptplay_agent_id, msg, type="conversation", order=None):
        query = {"_id": scriptplay_agent_id}  
        msg["type"] = type
        if order: msg["order"] = order
        update = {
            "$push": {"messages": {"$each": [msg],}},
        }
            
        return WidgetDAO.collection.update_one(query, update)



class ScriptPlayDAO:
    collection = MongoDBUtil.get_collection()

    @staticmethod
    def get_script_info(script="Shantaram"):
        Script_class = HarryPotter

        if script == "Shantaram":
            Script_class = Shantaram
        elif script == "Witcher":
            Script_class = Witcher
        elif script == "ThreeBody":
            Script_class = ThreeBody

        res = {
            "script":script,
            "script_name":Script_class.script_name,
            "user_name":Script_class.username,
            "characters":Script_class.character_list,
            "subtitle":Script_class.subtitle,
            "author_profile":Script_class.author_profile,
            "story_description":Script_class.story_description,
            "first_story":Script_class.first_story,
            "first_image":Script_class.first_story_image,
            }
        return res


    @staticmethod
    def create_new_script_play(user_id, mode="hybrid-agent", script="Shantaram"):
        Script_class = HarryPotter

        if script == "Shantaram":
            Script_class = Shantaram
        elif script == "Witcher":
            Script_class = Witcher
        elif script == "ThreeBody":
            Script_class = ThreeBody

        story = Script_class.first_story # the first story
        image = Script_class.first_story_image

        mode_settings =  get_mode_settings(mode)
        
        data = {
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            "script": script,
            "script_name":Script_class.script_name,
            "mode":mode,
            "start_time": get_current_time(),
            "end_time": get_current_time(),
            "pages": 1,
            "playdata":[        
                {
                    "keywords":Script_class.first_story_keywords,
                    "story":story,
                    "img":image,
                    "event_type":"story-description",
                    "order":1,
                    "timestamp":get_current_time(),
                },
            ],
            "thoughts":"N/A",
            "thoughts_imgs":[],
        }
        inserted_id = ScriptPlayDAO.collection.insert_one(data).inserted_id
        res = {
            "script":script,
            "script_name":Script_class.script_name,
            "user_name":Script_class.username,
            "scriptplay_id":inserted_id, 
            "characters":Script_class.character_list,
            "story_description":Script_class.story_description,
            "first_story":Script_class.first_story,
            "first_image":Script_class.first_story_image,
            "mode":mode,
            "mode_settings":mode_settings,
            }
        return res
    

    @staticmethod
    def add_gameplay_data(object_id, order, event_type, data):
        data["event_type"] = event_type
        data["order"] = order
        data["timestamp"] = get_current_time()
        query = {"_id": object_id}  
        update = {
            "$push": {"playdata": {"$each": [data],}},
            "$set":{"end_time":get_current_time()},
            "$inc": {"pages": 1},
        }
        return ScriptPlayDAO.collection.update_one(query, update)
    
    @staticmethod
    def add_option_choice(object_id, order,choice):
        query = {"_id": object_id, "playdata.order": order}  
        update = {
            "$set": {
                "playdata.$.choice": choice,  # Update the "choice
                "end_time":get_current_time(),
            },
        }
        return ScriptPlayDAO.collection.update_one(query, update)
    
    @staticmethod
    def add_character_conversation(object_id, order,messages):
        query = {"_id": object_id, "playdata.order": order}  
        # add time stamp
        for msg in messages:
            msg["timestamp"] = get_current_time()
        update = {
            "$set": {
                "playdata.$.messages": messages,  # Update the "choice
                "end_time":get_current_time(),
            },
        }
        return ScriptPlayDAO.collection.update_one(query, update)
    
    @staticmethod
    def add_groupchat_conversation(object_id, order,messages):
        query = {"_id": object_id, "playdata.order": order}  
        # add time stamp
        for msg in messages:
            msg["timestamp"] = get_current_time()
        update = {
            "$set": {
                "playdata.$.messages": messages,  # Update the "choice
                "end_time":get_current_time(),
            },
        }
        return ScriptPlayDAO.collection.update_one(query, update)
    

    @DeprecationWarning
    @staticmethod
    def add_thoughts(object_id, thoughts, thoughts_imgs):
        query = {"_id": object_id}  
        # print(thoughts_imgs)
        # imgs = [thoughts_imgs[i]["image"] for i in range(len(thoughts_imgs))]
        # print(imgs)
        update = {
            "$set": {
                "thoughts": thoughts,
                "thoughts_imgs": thoughts_imgs,
                "end_time":get_current_time(),
            },
            # "$set":{"thoughts_imgs": thoughts_imgs},
            # "$set":{"end_time":get_current_time()},
        }

        return ScriptPlayDAO.collection.update_one(query, update)

    @staticmethod
    def add_thoughts_no_imgs(object_id, thoughts):
        query = {"_id": object_id}  
        update = {
            "$set": {
                "thoughts": thoughts,
                "end_time":get_current_time(),
            },
        }

        return ScriptPlayDAO.collection.update_one(query, update)



    # find srcipt play
    @staticmethod
    def find_all_scriptplay(user_id):
        query = {"user_id":user_id}
        fields = {
            "_id":1,
            "script":1,
            "start_time":1,
            "end_time":1,
            "pages": 1,
            "script_name":1,
        }
        res = []
        for r in ScriptPlayDAO.collection.find(query, fields):
            res.append(r)
        return res
    
    @staticmethod
    def find_scriptplay_by_id(_id):
        return ScriptPlayDAO.collection.find_one({"_id":_id})
 