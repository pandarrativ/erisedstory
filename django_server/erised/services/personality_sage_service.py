from common_utils.utils import parse_to_json
from ai_models.ollama_api import OllamaAPI
from ai_models.openai_api import OpenAIAPI


# def get_sage_settings(learning_goal, life_story, personality_description):
#     return """You are an AI mentor who accompanies the user’s story-creation process. Below is your personality in the Big Five Personality Traits: {personality_description}. Your task is to inspire users in their narration process under {learning_goal}. This is your life story: {life_story}.""".format(learning_goal=learning_goal, life_story=life_story, personality_description=personality_description)

# def sage_chatting(messages):
#     resp = OpenAIAPI.send_messages(messages=messages)
#     return resp

# def sage_narrative_development_suggestion(life_story, personality_description, personality_trait, learning_goal, story, option1, option2, option3, selected_option):
def sage_narrative_development_suggestion(life_story, personality_description, personality_trait, learning_goal, story, option1, option2, option3):
    messages = [
        {"role":"system", "content":  """You are an AI mentor who accompanies the user’s story-creation process. Below is your personality in the Big Five Personality Traits: {personality_description}. Your task is to inspire users in their narration process under {learning_goal}. This is your life story: {life_story}.""".format(learning_goal=learning_goal, life_story=life_story, personality_description=personality_description)},
        {"role":"user", "content": """The user is about to write a continuation story. This is the original content: {story}. This is the three story plot directions. Option1: {option1}; Option2: {option2}; Option3: {option3}. Your task is to guide narrative development, aligning the personality trait: {personality_trait} and the learning goal of {learning_goal}. Offer suggestions on incorporating social and emotional behavior (SEB) skills, ensuring the character’s actions and decisions demonstrate these traits effectively. Emphasize varying conversations and decisions at key moments to reflect strong SEB skills. Return your response in 50 words in second person's view.""".format(story=story, personality_trait=personality_trait, learning_goal=learning_goal, option1=option1, option2=option2, option3=option3)},
    ]
    resp = OpenAIAPI.send_messages(messages=messages)
    return resp

# def sage_reframe_reflection_feedback(life_story, personality_description, personality_trait, learning_goal, story, user_writing, AI_reframed):
def sage_reframe_reflection_feedback(life_story, personality_description, personality_trait, learning_goal, story, user_writing):
    messages = [
        {"role":"system", "content":  """You are an AI mentor who accompanies the user’s story-creation process. Below is your personality in the Big Five Personality Traits: {personality_description}. Your task is to inspire users in their narration process under {learning_goal}. This is your life story: {life_story}.""".format(learning_goal=learning_goal, life_story=life_story, personality_description=personality_description)},
        {"role":"user", "content": """The user has completed their part of the story, and the AI has generated a follow-up segment. Here is the original story content: {story}. This is the user’s continuation: {user_writing}. Provide comments on how the story might develop with higher SEB skills, emphasizing the causal relationships between the character’s actions and the story’s progression. Your response should align with: {personality_trait} . Highlight alternative choices and potential outcomes, helping the user understand the impact of SEB skills. Reflect on the story to encourage consideration of how different actions might lead to different results, while acknowledging that past events cannot be changed. Return your response in 50 words in second person's view.""".format(story=story, user_writing=user_writing, personality_trait=personality_trait)},
    ]
    resp = OpenAIAPI.send_messages(messages=messages)
    return resp