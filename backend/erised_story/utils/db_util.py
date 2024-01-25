from .db_connection import MongoConnection

# Set the backend database
class MongoDBUtil:
    DB_NAME = "erised_story_db"
    COLLECTION_NAME = "erised_story_play_data"

    @staticmethod
    def get_client():
        return MongoConnection()

    @staticmethod
    def get_db(db_name=DB_NAME):
        return MongoConnection().client[db_name]
    
    @staticmethod
    def get_collection(db_name=DB_NAME, collection=COLLECTION_NAME):
        return MongoConnection().client[db_name][collection]