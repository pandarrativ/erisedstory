const getNarrativeDevelopmentSuggestion = (story, personality_trait, learning_goal, option1, option2, option3, selected_option) => {
    return `The user is about to write a continuation story. This is the original content: ${story}. This is the three story plot directions. Option1: ${option1}; Option2: ${option2}; Option3: ${option3}. The user choose to continue writing on: ${selected_option}.Your task is to guide narrative development, aligning the personality trait: ${personality_trait} and the learning goal of ${learning_goal}. Offer suggestions on incorporating social and emotional behavior (SEB) skills, ensuring the character’s actions and decisions demonstrate these traits effectively. Emphasize varying conversations and decisions at key moments to reflect strong SEB skills. Return your response in 50 words.`
}

const getReframingAndReflectionFeedback = (story, user_writing, AI_reframed) => {
    return `The user has completed their part of the story, and the AI has generated a follow-up
    segment. Here is the original story content: ${story}. This is the user’s continuation: ${user_writing}. This is the AI-
    generated reframed story: ${AI_reframed}. Provide comments on how the story might develop with higher SEB skills,
    emphasizing the causal relationships between the character’s actions and the story’s progression. Highlight alternative
    choices and potential outcomes, helping the user understand the impact of SEB skills. Reflect on the story to encourage
    consideration of how different actions might lead to different results, while acknowledging that past events cannot be
    changed. Return your response in 50 words.`;
}