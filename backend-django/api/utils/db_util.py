from .db_connection import MongoConnection


class MongoDBUtil:

    @staticmethod
    def get_client():
        return MongoConnection()

    @staticmethod
    def get_db(db_name="simu_db"):
        return MongoConnection().client[db_name]
    
    @staticmethod
    def get_collection(db_name="simu_db", collection="script_play"):
        return MongoConnection().client[db_name][collection]