import openai
from dotenv import load_dotenv
import os
import requests
from PIL import Image
from io import BytesIO
import base64


class DalleAPI:
    load_dotenv()
    openai.api_key = os.getenv("OPENAI_API_KEY")

    @staticmethod
    def parse_req_generateImg(req):
        prompt = req["prompt"]
        n=int(req["n"])
        size=req["size"]
        return DalleAPI.generateImg(prompt, n, size)

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
                image = DalleAPI.download_from_url_base64(image_url)
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
    