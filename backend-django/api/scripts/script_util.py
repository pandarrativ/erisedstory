class PromptTemplate:
    @staticmethod
    def wrap_prompt_head(prompt):
        return "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, to help the user experience the entire narrative. This is the story of user: " + prompt
    
    @staticmethod
    def ask_story(username):
        return """Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Present the outcome in JSON format with the following structure:
    
        Desired format:
        {{    
            keywords: <comma_separated_list_of_key_words> 
            story: 
        }}""".format(username=username)

    @staticmethod
    def ask_options(username):
        return """Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Include decision-making choices for {username} with three options, each not exceeding 30 words. Present the results in JSON format as follows:
        
        Desired format:
        {{    
            keywords: <comma_separated_list_of_key_words>
            story: 
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
            keywords: <comma_separated_list_of_key_words>
            story:
        }}""".format(username=username,choice=choice)

    @staticmethod
    def ask_character(username):
        return """Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Include a character that {username} is going to converse with. Define the relationship between this character and {username} and provide the character's first sentence he/she said to {username}. Additionally, create three social media posts for the character to reveal their personality. Present the results in JSON format as specified:
        
        Desired format:
        {{    
            keywords: <comma_separated_list_of_key_words> 
            story: 
            character_name:
            character_description:
            character_personality:
            relationship:
            first_sentence: 
            post_1: %content%
            post_2: %content%
            post_3: %content% 
        }}""".format(username=username)

    # @staticmethod
    # def continue_conversation():
    #     return """"Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words. Present the outcome in JSON format with the following structure:

    # Desired format:
    # keywords: <comma_separated_list_of_key_words>
    # story: 
    # """

    @staticmethod
    def get_chat_background(username, character_name, personality, prompt):
        return """You are a role playing agent. Now you should play the character: {character_name}. The user will be: {username}. You job is to have a conversation with {username} as if you are the {character_name} in the following story. This is your personnality {personality}. Your response should be less than 30 words. The following is the story background of how {username} meet {character_name} in {username}'s view:
        
        Backgroud Story:
        {prompt}""".format(username = username, character_name=character_name, personality=personality, prompt=prompt)
    

    @staticmethod
    def map_messages(message, character_name, username):
        return (username if message["role"] == "user" else character_name) + ": \""+ message["content"] + "\""
 
    @staticmethod
    def end_conversation(messages, character_name, username):
        return """This is the conversation {username} had with the character: {conversation}. Using the preceding story and conversation, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Present the outcome in JSON format with the following structure:

        Desired format:
        {{ 
            keywords: <comma_separated_list_of_key_words>
            story: 
        }}""".format(username=username, conversation=str([PromptTemplate.map_messages(message, character_name, username) for message in messages[1:]]))

    @staticmethod
    def ask_groupchat(username): 
        return """Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Include a group conversation involving 3 to 5 characters for {username} to converse with and specify each character's relationship to {username}. Exclude {username} from the list. For each character, provide a brief 30-word description and personality traits. Also, include an first sentence for the conversation, spoken by a character other than  {username}. Present the results in JSON format as follows:
        
        Example format:
        {{
            keywords: <comma_separated_list_of_key_words>
            story: 
            character_list: 
                [{{"character_name":"Ron", "relationship":"friend to Harry", description:"A young good man", "personality":"humerous"}},
                {{"character_name":"Hermone", "relationship":"friend to Harry", description:"A smart wizard", "personality":"warm, nice"}},
                ]
            first_sentence: {{"speaker":"Ron", "content":"Hi, Harry"}} 
        }}""".format(username = username)

    @staticmethod    
    def get_groupchat_bg(username, script, character_list, messages, chat_background):
        return """You are an AI conversation agent facilitating a role-play scenario. The user, referred to as '{username}', is part of a narrative outlined in '{script}'. They interact with various characters listed here: '{character_list}'. Based on the existing dialogue '{messages}' and the context provided by '{chat_background}', continue the conversation by generating responses for at least one character from the list. Note that you are not creating responses for '{username}'. Exclude previous dialogue. Format the AI-generated character responses in JSON, following this example structure:
        
        Example format:
        {{
            conversations: 
                [
                    {{"speaker":"Ron", "content":"Hi, harry. This is Hermione."}},
                    {{"speaker":"Hermione", "content":"Nice to meet you, Harry."}},
                ]
        }}""".format(username = username, script=script, character_list=str(character_list), messages=str(messages), chat_background=chat_background)

    @staticmethod
    def end_groupchat(messages, username):
        return """This is the group conversation {username} had with the characters in the story: {conversation}. Using the preceding story and conversation, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Present the outcome in JSON format with the following structure:

    Desired format:
    {{
        keywords: <comma_separated_list_of_key_words>
        story: 
    }}""".format(username=username, conversation=str(messages))



    # summarize
    @staticmethod
    def summarize_prompt(prompt):
        return "Summarize the story in 150 words: " + prompt