from common_utils.utils import parse_to_json, extract_and_parse_json



def create_persona(selected_trait, send_prompt):
    if selected_trait == "Openness":
        return ("As an individual high in openness and moderate in extraversion and neuroticism, I am imaginative, curious, and artistic. I love exploring new ideas and initiating conversations about them. I am drawn to beauty and the joy of creating, though at times, I stress about achieving perfection in my work. My sociable nature means I thrive in active community participation.",
                "Born and raised in a small town, my curiosity led me to travel the world, exploring different cultures and ideas. I'm an active participant in community life, often stepping up to engage in conversations and events. Now, as an artist and writer, I channel my experiences and anxieties into every piece I create, striving for brilliance and battling with the stress of perfection.")
    
    elif selected_trait == "Neuroticism":
        return ("I am known for my curiosity and creative mind, always finding something to pique my interest. Despite being a worrier, I am learning to manage my anxious tendencies. I can be touchy, experiencing life in intense hues, but I'm getting better at coping with stress. I am appreciated for my sensitivity and kindness, often engaging in social activities. Perfectionism no longer controls me; I strive for efficiency but avoid obsession.",
                "Life's been a maze of stress, from academic pressure to work deadlines. Yet, I've built a vibrant social network, my energetic outlet. My insecurities had marred potential ties, but now my kindness forms stronger bonds. I find solace exploring diverse interests. Job pressures loom, but I handle them with increased calmness, not letting fear of failure dominate. Despite adversities, every day I am learning to reduce the intensity of my reactions, turning my worries into a source of strength.")
    
    elif selected_trait == "Extraversion":
        return ("I may not always crave the limelight, but I enjoy inviting meaningful conversations. Interaction is essential and I confidently express my opinions. I have a balance of energy and calmness. I enjoy others’ company and thrive in social situations. Occasional concerns keep me alert and the occasional intellectual debates make life interesting.",
                "Born and raised in a small town, my dreams pushed me to see the world. I became a travel writer, using my creativity to share insightful stories on my adventures. My journeys, filled with careful planning, have led me to unique experiences and lifelong connections. However, there are times I worry about potential dangers or missing something important. Yet, the resulting friendships worldwide are my cherished rewards.")
    
    elif selected_trait == "Conscientiousness":
        return ("I am an organized and thoughtful mentor, often keen on structure and planning. Yet, I find joy in spontaneous moments and am open to new, exciting experiences in my field. I resonate well with diverse architectural styles and thrive in multifaceted projects. I am driven, good-natured and a calculated risk-taker, punctuating my meticulous persona with occasional worries and apprehensions. I am naturally curious and constantly seeking fresh inspirations.",
                "Growing up on a farm, I embraced discipline and punctuality early. I pursued architecture, where my affinity for detail led to designing varied and innovative spaces. With some worries and occasional detours from my plan, I nevertheless persevered. As part of diverse project teams, I navigated through both social interactions and solo efforts, earning respect for my reliability. My journey was not just about diligence and structure but also embracing change and the wealth of possibilities outside the box.")
    else:
        return ("I'm a sociable individual, thriving on engaging conversations and exploring new philosophies and cultures. Seeing the best in everyone, I manifest kindness and fairness consistently, though understanding the imperfect nature of humans often triggers my stress and anxiety. Despite the empathetic strain, helping others is a natural extension of my character.",
                "Raised in a small town with diverse lifestyles, I cultivated curiosity. Bearing witness to others' struggles compelled me into social work post-college. Balancing kindness and reality, I've come to understand the frailty of human nature, at times leaving me anxious, but always committed to shining a ray of kindness into the world.")


# def create_persona(selected_trait, send_prompt):
#     generation_agent = GenerationAgent(trait_description, send_prompt)
#     evaluation_agent = EvaluationAgent(trait_description, send_prompt)
#     finishing_agent = FinishingAgent(trait_description, send_prompt)

#     # create personality and life story
#     resp1 = generation_agent.generate_life_story(selected_trait)
#     personality_description, life_story = resp1["personality_description"], resp1["life_story"]

#     # evaluate
#     evaluate_level = evaluation_agent.evaluate_personality(personality_description, life_story)
#     trait_score_difference = get_trait_score("Openness", evaluate_level)
#     # feedback
#     feedback = evaluation_agent.refine_feedback(trait_score_difference)

#     # revision
#     resp3 = finishing_agent.get_feedback(personality_description, life_story, feedback)
#     print(resp3)
#     print(type(resp3))
#     re_personality_description, re_life_story = resp3["personality_description"], resp3["life_story"]

#     # logging
#     # print("----------------------------------------------")
#     # print(generation_agent.messages)

#     # print("----------------------------------------------")
#     # print(evaluation_agent.messages)

#     # print("----------------------------------------------")
#     # print(trait_score_difference)

#     # print("----------------------------------------------")
#     # print(finishing_agent.messages)

#     return re_personality_description, re_life_story



class Agent:
    def __init__(self, trait_description, send_prompt):
        self.trait_description = trait_description
        self.send_prompt = send_prompt
        self.messages = []
        

    def add_user_resp(self, msg):
        self.messages.append({"role":"user", "content":msg})

    def get_assistant_resp(self):
        resp = self.send_prompt(self.messages)
        self.messages.append({"role":"assistant", "content":resp})
        return resp

    def chat(self, msg):
        self.messages.append({"role":"user", "content":msg})
        resp = self.send_prompt(self.messages)
        self.messages.append({"role":"assistant", "content":resp})
        return resp






class GenerationAgent(Agent):
    
    def __init__(self, trait_description, send_prompt):
        super().__init__(trait_description, send_prompt)

    def generate_life_story(self, selected_trait):
        self.messages = [
            {"role": "user", "content": """Your task is to create a detailed personality profile and a life story that aligns with a main personality trait: {selected_trait}. Here are the descriptions of this trait in the Big Five Personality model: {trait_description}. The persona you are going to create will primarily reflect the {selected_trait} trait. Generate a plain text description in first person's view about the personality and a life story of the person. Both personality description and life story should be within 100 words. Return your response in JSON format, wrapped by curly brackets, and doubled quote each trait and value like this: {{"personality_description":<STRING>, "life_story":<STRING>}}""".format(selected_trait=selected_trait, trait_description=self.trait_description)},
        ]
        resp = self.send_prompt(self.messages)
        self.messages.append({"role":"assistant", "content":resp})
        
        dict_resp = extract_and_parse_json(resp)
        return dict_resp
        



class EvaluationAgent(Agent):
    
    def __init__(self, trait_description, send_prompt):
        super().__init__(trait_description, send_prompt)


    # to prevent long messages, here we make a copy of it
    def evaluate_personality(self, personality_description, life_story):
        self.messages = [
            {"role":"user", "content": """You are a persona evaluation and feedback assistant. Your task is to evaluate and improve my LLM-generated persona and correspondong life story. Here are descriptions of each trait in the Big Five Personality model: {trait_description}. This is the persona description: {personality_description}. This is the life story: {life_story}. Using the Big Five personality theory, evaluate how well the description reflects each trait with the following measures: "very low", "low", "average", "high", and "very high".  Return your response in JSON format, wrapped by curly brackets, and doubled quote each trait and value like this: {{"Extraversion":<STRING>, "Agreeableness":<STRING>, "Conscientiousness":<STRING>, "Neuroticism":<STRING>, "Openness":<STRING>}}""".format(personality_description=personality_description, life_story=life_story, trait_description=self.trait_description)},
        ]
        
        resp = self.send_prompt(self.messages)
        evaluate_level = extract_and_parse_json(resp)
        return evaluate_level

    def refine_feedback(self, trait_score_difference):
        new_prompt = """Your task is to help improve the personality description and the simulated person’s life story. Here is how much each trait should be adjusted: {trait_score_difference}. Provide suggestions in 100 words on how to adjust the description and story to better align with the desired trait levels.""".format(trait_score_difference=trait_score_difference)
        resp = self.chat(new_prompt)
        return resp
        
    



class FinishingAgent(Agent):
    
    def __init__(self,trait_description, send_prompt):
        super().__init__(trait_description, send_prompt)


    def get_feedback(self, personality_description, life_story, feedback):
        
        self.messages = [
            {"role":"user", "content": """You are a simulated-persona adjustment assistant. Here are descriptions of each trait in the Big Five Personality model: {trait_description}. Based on the following feedback provided, your task is to refine and finalize the personality profile and life story of an AI mentor. This is the personality description of AI mentor: {personality_description}. This is the life story: {life_story}. Here is the feedback received: {feedback}. Adjust and return the personality description and life story to ensure they align with the feedback. Both personality description and life story should be within 100 words. Return your response in JSON format, wrapped by curly brackets, and doubled quote each trait and value like this: {{"personality_description":<STRING>, "life_story":<STRING>}}""".format(trait_description=self.trait_description, personality_description=personality_description, life_story=life_story, feedback=feedback)},
        ]
        
        resp = self.send_prompt(self.messages)
        self.messages.append({"role":"assistant", "content":resp})
        dict_resp = extract_and_parse_json(resp)
        return dict_resp
    



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

def get_trait_score(selected_trait, evaluate_level):
    traits = ["Extraversion", "Agreeableness", "Conscientiousness", "Neuroticism", "Openness"]
    
    prompt = ""
    for t in traits:
        if t == selected_trait:
            if evaluate_level[t] == "very high":
                prompt += " Keep the current level of " + t
            else:
                prompt += " Improve the current level of " + t + ". It should be the dominant personality trait."
        else:
            if evaluate_level[t] == "very high":
                prompt += " For " + t + ", make it lower to average level."
            elif evaluate_level[t] == "high":
                prompt += " For " + t + ", make it slightly lower to average level."
            elif evaluate_level[t] == "low":
                prompt += " For " + t + ", make it slightly higher to average level."
            elif evaluate_level[t] == "very low":
                prompt += " For " + t + ", make it higher to average level."
            else:
                prompt += " For " + t + ", keep current average level."
    return prompt