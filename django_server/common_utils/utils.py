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


def extract_and_parse_json(long_string):
    start_index = long_string.find('{')
    end_index = long_string.rfind('}')
    
    if start_index != -1 and end_index != -1 and start_index < end_index:
        json_string = long_string[start_index:end_index+1]
        try:
            data = parse_to_json(json_string)
            return data
        except Exception as e:
            print("Error: JSON string could not be decoded: ", json_string)
            return None
    else:
        print("Error: JSON-like substring not found:", long_string)
        return None
