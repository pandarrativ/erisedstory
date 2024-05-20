from ..dao import *

class StoryDataService:

    # def get_storyplay_data_by_id(storyplay_id):
    #     return StoryPlayDAO.find_storyplay_by_id(_id=storyplay_id)
    
    def get_all_storyplay_data_by_uid(uid):
        return StoryPlayDAO.find_all_storyplay_by_uid(user_id=uid)
    
    def new_storyplay(uid, story_name):
        return StoryPlayDAO.create_new_script_play(user_id=uid, story_name=story_name)