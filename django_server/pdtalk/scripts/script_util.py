
# scripts
from .HarryPotterConfig import HarryPotter
from .WitcherConfig import Witcher
from .ThreeBodyConfig import ThreeBody

def get_script_class(story_name):
        Script_class = HarryPotter
        if story_name == "The Witcher":
            Script_class = Witcher
        elif story_name == "The Three-Body Problem":
            Script_class = ThreeBody

        return Script_class


class PromptTemplate:
    @staticmethod
    def get_settings(current_story):
        return """Create a series of follow-up story prompts designed for a children's role-play game where children aged 7-13 are the protagonists. These prompts should be based on a given narrative input and should evolve the story in a way that's engaging, educational, and suitable for improving the children's knowledge and cognitive skills. The content should be simple enough for the target age group to understand and interact with. Each follow-up should encourage creative thinking, problem-solving, and should incorporate educational elements in a seamless manner. Remember to keep the themes appropriate and positive, focusing on teaching valuable life lessons or academic concepts through the narrative. 
This is the current story chidlren has read: {{{current_story}}}""".format(current_story=current_story)

    @staticmethod
    def wrap_settings(current_story, prompt):
        return [{"role":"system", "content":PromptTemplate.get_settings(current_story)}, {"role":"user", "content":prompt}]


    @staticmethod
    def ask_story(username):
        return """Using the preceding story, generate the next storyline within 30 words in the second person's view. Present the outcome in JSON format with the following structure:
    
Desired format:
{{    
    "story": <STRING>,
}}""".format(username=username)

    @staticmethod
    def ask_options(username):                  
        return """Using the preceding story, create a decision-making question suitable for children in 30 words. The question should include a brief background settings under which the children is going to make a decision. Additionally, formulate three answer options, ensuring each does not exceed 10 words. Present the results in JSON format as follows:

Desired format:
{{    
    "question": <STRING>,
    "option_1": <STRING>,
    "option_2": <STRING>,
    "option_3": <STRING>,
}}""".format(username=username)

    @staticmethod
    def continue_options(username, choice, question, option_1, option_2, option_3):
        return  """The child is facing a decision-making question. This is the question: {{{question}}}. These are the options: Option1 = {{{option_1}}}. Option2 = {{{option_2}}}. Option3 = {{{option_3}}} .{username}(the child) made his choice as: {{{choice}}}. Generate the next storyline within 15 words based on {username}'s choice. The storyline should be in the second person's view.Present the outcome in JSON format with the following structure:

Desired format:
{{    
    "story": <STRING>,
}}""".format(username=username,choice=choice, question=question, option_1=option_1, option_2=option_2, option_3=option_3)

    @staticmethod
    def ask_single_conversation(username):
        return """Create a conversational setting based on the preceding story, tailored for a child audience. Introduce a character for {username} to interact with. Provide a concise background for this conversation, using no more than 15 words. Also, include the character's opening lines to initiate the dialogue. Present the results in JSON format as specified:

Desired format:
{{     
    "conversation_background": <STRING>,
    "character_name": <STRING>,
    "opening_sentence": <STRING>,
}}""".format(username=username)
    
    @staticmethod
    def continue_single_conversation(messages, character_name, username):
        return """The children just have a role-playing conversation with {character_name}. Generate the next storyline within 15 words in second person's view, based on story content and the conversation content:
Conversation messages: {{{messages}}}

Present the outcome in JSON format with the following structure:
{{ 
    "story": <STRING>, 
}}""".format(username=username, character_name=character_name, messages=[PromptTemplate.process_msg(message=message, character_name=character_name,username=username) for message in messages[1:]])


# .format(username=username, messages=str([PromptTemplate.map_messages(message, character_name, username) for message in messages[1:]]))



    # @staticmethod
    # def continue_conversation():
    #     return """"Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words. Present the outcome in JSON format with the following structure:

    # Desired format:
    # keywords: <comma_separated_list_of_key_words>
    # story: 
    # """

    @staticmethod
    def get_chat_background(username, character_name, current_story):
        return """You are a role playing assistant. Now you should play the character: {character_name}. The user will be: {username}. You job is to have a conversation with {username} as if you are the {character_name} in the following story. Your response should be less than 20 words. The following is the story background of how {username} meet {character_name} in {username}'s view:
        
Backgroud Story:
{current_story}""".format(username = username, character_name=character_name, current_story=current_story)


    @staticmethod
    def process_msg(message, character_name, username):
        res = {"role": username if message["role"] == "user" else character_name ,"content":message["content"]}
        return res
 

    # @staticmethod
    # def ask_groupchat(username): 
    #     return """Using the preceding story, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Include a group conversation involving 3 to 5 characters for {username} to converse with and specify each character's relationship to {username}. Exclude {username} from the list. For each character, provide a brief 30-word description and personality traits. Also, include an first sentence for the conversation, spoken by a character other than  {username}. Present the results in JSON format as follows:
        
    #     Example format:
    #     {{
    #         keywords: <comma_separated_list_of_key_words>
    #         story: 
    #         character_list: 
    #             [{{"character_name":"Ron", "relationship":"friend to Harry", description:"A young good man", "personality":"humerous"}},
    #             {{"character_name":"Hermone", "relationship":"friend to Harry", description:"A smart wizard", "personality":"warm, nice"}},
    #             ]
    #         first_sentence: {{"speaker":"Ron", "content":"Hi, Harry"}} 
    #     }}""".format(username = username)

    # @staticmethod    
    # def get_groupchat_bg(username, script, character_list, messages, chat_background):
    #     return """You are an AI conversation agent facilitating a role-play scenario. The user, referred to as '{username}', is part of a narrative outlined in '{script}'. They interact with various characters listed here: '{character_list}'. Based on the existing dialogue '{messages}' and the context provided by '{chat_background}', continue the conversation by generating responses for at least one character from the list. Note that you are not creating responses for '{username}'. Exclude previous dialogue. Format the AI-generated character responses in JSON, following this example structure:
        
    #     Example format:
    #     {{
    #         conversations: 
    #             [
    #                 {{"speaker":"Ron", "content":"Hi, harry. This is Hermione."}},
    #                 {{"speaker":"Hermione", "content":"Nice to meet you, Harry."}},
    #             ]
    #     }}""".format(username = username, script=script, character_list=str(character_list), messages=str(messages), chat_background=chat_background)

    # @staticmethod
    # def end_groupchat(messages, username):
    #     return """This is the group conversation {username} had with the characters in the story: {conversation}. Using the preceding story and conversation, generate next storyline with 3 to 5 story-relevant keywords in 70 words in second person's view. Present the outcome in JSON format with the following structure:

    # Desired format:
    # {{
    #     keywords: <comma_separated_list_of_key_words>
    #     story: 
    # }}""".format(username=username, conversation=str(messages))



    # summarize
    @staticmethod
    def summarize_prompt(prompt):
        return "Summarize the story in 150 words: " + prompt