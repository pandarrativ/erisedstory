from pymongo import MongoClient

'''
Use this method to connect to mongodb.

For each app/team project, the collection should follow the pattern:  <App_Short_name>_<Collection_Name>.
    Example: pdtalk_story_play
        where 'pdtalk' is the short name for PandarraTalk project,  'story_play' is the collection name

'''
class MongoConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MongoConnection, cls).__new__(cls)
            cls._instance.client = MongoClient('localhost', 27017)
        return cls._instance


class MongoDBUtil:

    @staticmethod
    def get_client():
        return MongoConnection()

    @staticmethod
    def get_db(db_name="pandara_db"):
        return MongoConnection().client[db_name]
    
    @staticmethod
    def get_collection(collection, db_name="pandara_db"):
        return MongoConnection().client[db_name][collection]