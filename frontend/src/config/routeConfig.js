const host = process.env.REACT_APP_BACKEND_HOST;

export const signUpRouter = `${host}/user/signup`;
export const signInRouter = `${host}/user/signin`;
export const storyRouter = `${host}/api/story`;
export const conversationRouter = `${host}/api/conversation`;
export const imgRouter = `${host}/api/img`;
export const scriptInfoRouter = `${host}/api/script-info`;
export const newScriptPlayRouter = `${host}/api/new-scriptplay`;
export const userAllscriptPlayRouter = `${host}/api/user-scriptplay`;
export const scriptPlayDetailsRouter = `${host}/api/detail-scriptplay`;
export const widgetChatRouter = `${host}/api/widget-chat`;
export const widgetToastChatRouter = `${host}/api/widget-toast-chat`;
export const summarizePromptRouter = `${host}/api/summarize-prompt`;
export const groupChatRouter = `${host}/api/groupchat`;

export const widgetHelperRouter = `${host}/api/widget-helper`;

export default function getImgURL(url){
    return `${host}/static/imgs` + url;
}