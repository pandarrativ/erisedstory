from common_utils.utils import parse_to_json
from ai_models.ollama_api import OllamaAPI
from ai_models.openai_api import OpenAIAPI


def sage_chatting(messages):
    print(messages)
    resp = OpenAIAPI.send_messages(messages=messages)
    return resp