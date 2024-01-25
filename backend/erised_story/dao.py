from .utils.db_util import MongoDBUtil
import uuid
from .utils.utils import get_current_time



class WidgetDAO:
    collection = MongoDBUtil.get_collection(collection="erised_story_agent")

    @staticmethod
    def create_new_script_play_agent(user_id, play_id, agent):
        data = {
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            "script_tool_script_id": play_id,
            "agent":agent,
            "messages":[]
        }
        inserted_id = WidgetDAO.collection.insert_one(data).inserted_id
        return inserted_id

    @staticmethod
    def add_script_play_agent_messages(script_id, msg, type="conversation", order=None):
        query = {"_id": script_id}  
        msg["type"] = type
        if order: msg["order"] = order
        update = {
            "$push": {"messages": {"$each": [msg],}},
        }
            
        return WidgetDAO.collection.update_one(query, update)


# below is a sample class for data persistance
# class ScriptPlayDAO:
#     collection = MongoDBUtil.get_collection()
    
#     # insert
#     @staticmethod
#     def create_new_script_play(user_id, mode="hybrid-agent", script="Shantaram"):
        
#         # set your data here  
#         # script = "xxx"  script_name = "xxx"  ...
        
        
#         data = {
#             "_id": str(uuid.uuid4()),
#             "user_id": user_id,
#             "script": script,
#             "script_name":script_name,
#             "mode":mode,
#             "start_time": get_current_time(),
#             "end_time": get_current_time(),
#             "pages": 1,
#             "playdata":[        
#                 {
#                     "keywords":first_story_keywords,
#                     "story":story,
#                     "img":image,
#                     "event_type":"story-description",
#                     "order":1,
#                     "timestamp":get_current_time(),
#                 },
#             ],
#             "thoughts":"N/A",
#             "thoughts_imgs":[],
#         }
#         inserted_id = ScriptPlayDAO.collection.insert_one(data).inserted_id
        
        
#         # return data to user
#         res = {
#             "script":script,
#             "script_name":Script_class.script_name,
#             "user_name":Script_class.username,
#             "scriptplay_id":inserted_id, 
#             "characters":Script_class.character_list,
#             "story_description":Script_class.story_description,
#             "first_story":Script_class.first_story,
#             "first_image":Script_class.first_story_image,
#             "mode":mode,
#             "mode_settings":mode_settings,
#             }
#         return res
    
#     # update 
#     @staticmethod
#     def add_gameplay_data(object_id, order, event_type, data):
#         data["event_type"] = event_type
#         data["order"] = order
#         data["timestamp"] = get_current_time()
#         query = {"_id": object_id}  
#         update = {
#             "$push": {"playdata": {"$each": [data],}},
#             "$set":{"end_time":get_current_time()},
#             "$inc": {"pages": 1},
#         }
#         return ScriptPlayDAO.collection.update_one(query, update)



#     # find many
#     @staticmethod
#     def find_all_scriptplay(user_id):
#         query = {"user_id":user_id}
#         fields = {
#             "_id":1,
#             "script":1,
#             "start_time":1,
#             "end_time":1,
#             "pages": 1,
#             "script_name":1,
#         }
#         res = []
#         for r in ScriptPlayDAO.collection.find(query, fields):
#             res.append(r)
#         return res
    
#     # find one
#     @staticmethod
#     def find_scriptplay_by_id(_id):
#         return ScriptPlayDAO.collection.find_one({"_id":_id})
 