import datetime
import json
import ast

def get_current_time():
    return datetime.datetime.now()

# parser for story event
# def parse_to_json(resp):
#     return json.loads(resp)

def cut_and_parse(resp):
    l = resp.find("{")
    r = resp.rfind("}")
    sub_resp = resp[l:r+1]
    return parse_to_json(sub_resp)
                
def parse_to_json(resp):
    try:
        return json.loads(resp)
    except Exception as e:  # incase it the dict keys is wrapped by ' instead of "
        return ast.literal_eval(resp)
