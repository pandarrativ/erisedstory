// const host = process.env.REACT_APP_BACKEND_HOST;

// export const newStoryPlayRouter = `${host}/api/new-storyplay`;
// export const storyRouter = `${host}/api/storyplay`;
// export const conversationRouter = `${host}/api/conversation`;
// export const storyPlayDataRouter = `${host}/api/storyplay-info`;
// export const summarizePromptRouter = `${host}/api/summarize-prompt`;

const host = process.env.REACT_APP_BACKEND_HOST;
const userHost = process.env.REACT_APP_USER_HOST;

export const storyRouter = `${host}/erised/story`;
// export const newStoryPlayRouter = `${host}/erised/story-playdata`;
// export const allStoryPlayRouter = `${host}/erised/all-playdata`;
export const sageConversationRouter = `${host}/erised/sage-conversation`;


export function getImgURL(uri){
    return `${host}/static/imgs` + uri;
}
export const oauthSessionInfoRouter = `${userHost}/auth/user-data`;


export const logOutRouter = `${userHost}/auth/logout`;