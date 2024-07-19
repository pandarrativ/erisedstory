from openai import OpenAI
import os


#This class contains the functions to send request to openai for text generation,image generation

class OpenAIAPI:
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
    )
    
 ##############################################################################################################################################
 ## Below are the functions to set openai model parameters and send to openai
 ##############################################################################################################################################
    @staticmethod
    # def send_prompt(prompt, model = "gpt-3.5-turbo", is_json=False):
    def send_prompt(prompt, model = "gpt-4", is_json=False):
        if is_json:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, 
                response_format={ "type": "json_object" },
                messages=[{"role": "user", "content": prompt}]
            )
        else:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, 
                messages=[{"role": "user", "content": prompt}]
            )
        
        resp =response.choices[0].message.content
        return resp

    @staticmethod
    # def send_messages(messages, model = "gpt-3.5-turbo", is_json=False):
    def send_messages(messages, model = "gpt-4", is_json=False):
        if is_json:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, 
                response_format={ "type": "json_object" },
                messages=messages
            )
        else:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, 
                messages=messages
            )
        
        resp =response.choices[0].message.content
        return resp


    # # for generting images
    # @DeprecationWarning
    # @staticmethod
    # def generateImg(prompt, n=1, size="256x256"):
    #     try:
    #         response = openai.Image.create(
    #             prompt= prompt,
    #             n=n,
    #             size=size,
    #             )
    #         res = []
    #         for i in range(n):
    #             image_url = response['data'][i]['url']
    #             image = OpenAIAPI.download_from_url_base64(image_url)
    #             res.append(image)
    #     except Exception as e:
    #         res = []
    #         for i in range(n):
    #             res.append("")
    #     return res


    # @DeprecationWarning
    # @staticmethod
    # def download_from_url_base64(url):        
    #     try:
    #         response = requests.get(url)
    #         response.raise_for_status()  # Check for any HTTP errors

    #         # Open the image directly from the response content using PIL (Pillow)
    #         image = Image.open(BytesIO(response.content))
    #         buffer = BytesIO()
    #         image.save(buffer, format="PNG")
    #         img_base64 = base64.b64encode(buffer.getvalue()).decode()

    #         return img_base64
    #     except requests.exceptions.RequestException as e:
    #         print(f"Error: {e}")
    #         return None
    