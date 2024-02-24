const host = process.env.REACT_APP_BACKEND_HOST;

export const newStoryPlayRouter = `${host}/api/new-storyplay`;
export const storyRouter = `${host}/api/storyplay`;
export const conversationRouter = `${host}/api/conversation`;
export const storyPlayDataRouter = `${host}/api/storyplay-info`;
export const summarizePromptRouter = `${host}/api/summarize-prompt`;