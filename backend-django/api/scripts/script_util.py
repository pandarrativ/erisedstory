class PromptTemplate:
    @staticmethod
    def wrap_prompt_head(prompt):
        return "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, to help the user experience the entire narrative. This is the story of user: " + prompt
    
    @staticmethod
    def ask_story(username):
        return """Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Present the outcome in JSON format with the following structure:
    
        Desired format:
        {{    
            story: 
        }}""".format(username=username)

    @staticmethod
    def ask_options(username):
        return """Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Include decision-making choices for {username} with three options, each not exceeding 30 words. Present the results in JSON format as follows:
        
        Desired format:
        {{    
            question:
            option_1:
            option_2:
            option_3: 
        }}""".format(username=username)

    @staticmethod
    def continue_options(username, choice):
        return  """{username} made his choice as: {choice}. Generate next storyline with 3 to 5 story-relevant keywords in 70 words based on {username}'s choice in second person's view. Present the outcome in JSON format with the following structure:

        Desired format:
        {{    
            story:
        }}""".format(username=username,choice=choice)

    @staticmethod
    def ask_character(username):
        return """Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Include a character that {username} is going to converse with. Define the relationship between this character and {username} and provide the character's first sentence he/she said to {username}. Additionally, create three social media posts for the character to reveal their personality. Present the results in JSON format as specified:
        
        Desired format:
        {{    
            character_name:
            character_description:
            first_sentence: 
        }}""".format(username=username)

    @staticmethod
    def get_chat_background(username, character_name, character_description, prompt):
        return """You are a role playing agent. Now you should play the character: {character_name}. The user will be: {username}. You job is to have a conversation with {username} as if you are the {character_name} in the following story. This is your personnality {character_description}. Your response should be less than 30 words. The following is the story background of how {username} meet {character_name} in {username}'s view:
        
        Backgroud Story:
        {prompt}""".format(username = username, character_name=character_name, character_description=character_description,  prompt=prompt)
    

    @staticmethod
    def map_messages(message, character_name, username):
        return (username if message["role"] == "user" else character_name) + ": \""+ message["content"] + "\""
 
    @staticmethod
    def end_conversation(messages, character_name, username):
        return """This is the conversation {username} had with the character: {conversation}. Using the preceding story and conversation, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Present the outcome in JSON format with the following structure:

        Desired format:
        {{ 
            story: 
        }}""".format(username=username, conversation=str([PromptTemplate.map_messages(message, character_name, username) for message in messages[1:]]))


    # summarize
    @staticmethod
    def summarize_prompt(prompt):
        return "Summarize the story in 150 words: " + prompt