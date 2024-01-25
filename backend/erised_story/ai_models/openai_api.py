import openai
from dotenv import load_dotenv
import os
import requests
from PIL import Image
from io import BytesIO
import base64

#This class contains the functions to send request to openai for text generation,image generation

class OpenAIAPI:
    # load local parameters
    load_dotenv()
    openai.api_type = os.getenv("OPENAI_API_TYPE")
    openai.api_base = os.getenv("OPENAI_API_BASE")
    openai.api_version = os.getenv("OPENAI_API_VERSION")
    # openai.api_key = os.getenv("OPENAI_API_KEY")
    
    
 ##############################################################################################################################################
 ## Below are the functions to receive user request and send it to openai
 ##############################################################################################################################################
    @staticmethod
    def summarize_prompt(req):
        # send a single message
        resp = OpenAIAPI.send_prompt(req["prompt"])
        return resp

    @staticmethod
    def chatGPT_groupchat(req):
        # send a list of messages
        resp = OpenAIAPI.send_prompt(req["messages"])
        return resp

    @staticmethod
    def parse_req_generateImg(req):
        prompt = req["prompt"]
        n=int(req["n"])
        size=req["size"]
        return OpenAIAPI.generateImg(prompt, n, size)

 ##############################################################################################################################################
 ## Below are the functions to set openai model parameters and send to openai
 ##############################################################################################################################################


    @staticmethod
    def send_prompt(prompt, engine = "gpt-35-turbo", temperature=0.7, max_tokens=3000,top_p=0.95,frequency_penalty=0,presence_penalty=0,stop=None):
        completion = openai.ChatCompletion.create(
            engine=engine,
            messages = [{"role":"user","content":prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
            stop=stop
        )
        
        # print(prompt)
        resp =completion.choices[0].message.content
        # print("-------------------resp---------------")
        # print(resp)
        # print("-------------------resp---------------")
        return resp

    @staticmethod
    def send_messages(messages, engine = "gpt-35-turbo", temperature=0.7, max_tokens=3000,top_p=0.95,frequency_penalty=0,presence_penalty=0,stop=None):
        completion = openai.ChatCompletion.create(
            engine=engine,
            messages = messages,
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
            stop=stop
        )
        
        resp = completion.choices[0].message.content
        return resp


    # @staticmethod
    # def send_prompt(prompt):
    #     completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", 
    #                                                                             "content": prompt
    #                                                                         }])
    #     resp =completion.choices[0].message.content

    #     return resp
 
 
    # @staticmethod
    # def send_messages(messages):
    #     completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    #     resp =completion.choices[0].message.content
    #     return resp


    @staticmethod
    def generateImg(prompt, n=1, size="256x256"):
        try:
            response = openai.Image.create(
                prompt= prompt,
                n=n,
                size=size,
                )
            res = []
            for i in range(n):
                image_url = response['data'][i]['url']
                image = OpenAIAPI.download_from_url_base64(image_url)
                res.append(image)
        except Exception as e:
            res = []
            for i in range(n):
                res.append("")
        return res

    @staticmethod
    def download_from_url_base64(url):        
        try:
            response = requests.get(url)
            response.raise_for_status()  # Check for any HTTP errors

            # Open the image directly from the response content using PIL (Pillow)
            image = Image.open(BytesIO(response.content))
            buffer = BytesIO()
            image.save(buffer, format="PNG")
            img_base64 = base64.b64encode(buffer.getvalue()).decode()

            return img_base64
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return None
    

