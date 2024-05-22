import ollama

#This class contains the functions to send request to ollma for text generation

class OllamaAPI:

    @staticmethod
    def send_prompt(prompt, model = "llama3"):
        response = ollama.chat(model=model, messages=[
            {"role":"user", "content":prompt}
        ])
        return response['message']['content']

    @staticmethod
    def send_messages(messages, model="llama3"):
        # mistral, llama3
        response = ollama.chat(model=model, messages=messages)
        return response['message']['content']
