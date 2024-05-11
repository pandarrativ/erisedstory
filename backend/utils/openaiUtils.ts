import { AssistantsClient, AzureKeyCredential } from "@azure/openai-assistants";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT as string;

export const client = new AssistantsClient(AZURE_ENDPOINT, new AzureKeyCredential(OPENAI_API_KEY));