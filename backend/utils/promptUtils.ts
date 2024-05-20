export const beginningPrompt = (topic: string) => 
`Please treat me like a child. Start a storytelling with one sentence on the topic ${topic}`;

export const continuingPrompt = (action: string) => {
  switch (action) {
    case 'generateWords':
      return 'Generate 3 words with explanations in [{ word, explanation}] format, which are easy for me to understand and pronounce?';
    case 'continueStory':
      return 'Continue the story with one sentence';
    case 'giveGuidance':
      return 'I am expected to continue the story with one sentence. However, I am getting stuck. Could you give guidance for me?';
    case 'endStory':
      return 'End the story with one sentence';
    default:
      return '';
  }
}
