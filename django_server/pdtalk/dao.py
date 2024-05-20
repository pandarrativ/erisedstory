from common_utils.db_util import MongoDBUtil
from common_utils.utils import get_current_time
import uuid
from .scripts.script_util import get_script_class


class StoryPlayDAO:
    collection = MongoDBUtil.get_collection(collection="pdtalk_story_play")

    @staticmethod
    def create_new_script_play(user_id, story_name="Harry Potter"):
        Script_class = get_script_class(story_name=story_name)

        data = {
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            "story_id": Script_class.story_id,
            "story_name":Script_class.story_name,
            "protagonist_name": Script_class.protagonist_name,


            "start_time": get_current_time(),
            "end_time": get_current_time(),
            "pages": 1,
            "sage_chat_messages": [],
            "playdata":[        
                {
                    "order":1,
                    "story":Script_class.first_story,
                    "event_type":"story",
                    "timestamp":get_current_time(),
                    "decision_making_data":{},
                    "single_conversation_data":{},
                },
            ],
        }

        StoryPlayDAO.collection.insert_one(data).inserted_id
        # data["id"] = inserted_id
        return data
    
    @staticmethod
    def set_sage_chat_messages(object_id, messages):
        query = {"_id": object_id}  
        update = {
            "$set":{"sage_chat_messages":messages},
        }
        StoryPlayDAO.collection.update_one(query, update)


    @staticmethod
    def add_playdata_section(object_id, order, event_type, story="", decision_making_data={}, single_conversation_data={}):
        data = {
            "order": order,
            "story":story,
            "event_type": event_type,
            "timestamp": get_current_time(),
            "decision_making_data":decision_making_data,
            "single_conversation_data":single_conversation_data,
        }

        query = {"_id": object_id}  
        update = {
            "$push": {"playdata": {"$each": [data],}},
            "$set":{"end_time":get_current_time()},
            "$inc": {"pages": 1},
        }
        StoryPlayDAO.collection.update_one(query, update)
        return data
    
    
    @staticmethod
    def add_option_choice(object_id, order, decision_making_data):
        query = {"_id": object_id, "playdata.order": order}  
        update = {
            "$set": {
                "playdata.$.decision_making_data": decision_making_data,  # Update the "choice
                "end_time":get_current_time(),
            },
        }
        return StoryPlayDAO.collection.update_one(query, update)
    
    @staticmethod
    def add_character_conversation_messages(object_id, order, single_conversation_data):
        query = {"_id": object_id, "playdata.order": order}  
        update = {
            "$set": {
                "playdata.$.single_conversation_data": single_conversation_data,  # Update the "choice
                "end_time":get_current_time(),
            },
        }
        return StoryPlayDAO.collection.update_one(query, update)
    
    # @staticmethod
    # def add_groupchat_conversation(object_id, order,messages):
    #     query = {"_id": object_id, "playdata.order": order}  
    #     # add time stamp
    #     for msg in messages:
    #         msg["timestamp"] = get_current_time()
    #     update = {
    #         "$set": {
    #             "playdata.$.messages": messages,  # Update the "choice
    #             "end_time":get_current_time(),
    #         },
    #     }
    #     return ScriptPlayDAO.collection.update_one(query, update)
    
# "_id": str(uuid.uuid4()),
#             "user_id": user_id,
#             "story_id": Script_class.story_id,
#             "story_name":Script_class.story_name,
#             "protagonist_name": Script_class.protagonist_name,


#             "start_time": get_current_time(),
#             "end_time": get_current_time(),
#             "pages": 1,
#             "playdata":[        


    @staticmethod
    def find_all_storyplay_by_uid(user_id):
        query = {"user_id":user_id}
        fields = {
            "_id":1,
            "user_id":1,
            "story_id":1,
            "story_name":1,
            "protagonist_name":1,
            "start_time":1,
            "end_time":1,
            "pages": 1,
            "playdata":1,
        }
        res = []
        for r in StoryPlayDAO.collection.find(query, fields):
            # needs to be changed later
            Script_class = get_script_class(story_name=r["story_name"])


            r["story_info"] = {
                "protagonist_name": Script_class.protagonist_name,
                "story_name": Script_class.story_name,
                "story_id": Script_class.story_id,
                "story_bg": Script_class.story_bg,
                "protagonist_profile": Script_class.protagonist_profile,
                "story_description": Script_class.story_description,
            }
            res.append(r)
        return res
    
    @staticmethod
    def find_storyplay_by_id(_id):
        return StoryPlayDAO.collection.find_one({"_id":_id})
 