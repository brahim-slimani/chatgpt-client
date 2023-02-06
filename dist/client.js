const axios = require("axios");

function InvalidApiKeyException (message) {
    this.message = message;
}

InvalidApiKeyException.prototype = new Error();
InvalidApiKeyException.prototype.name = "InvalidApiKeyException";

/**
 * Open AI call interceptor
 */
const customInterceptor = axios.create();
customInterceptor.interceptors.request.use(
    async (config) => {
        config.baseURL = "https://api.openai.com/v1/completions";
        config.timeout = 30 * 1000; //in seconds
        return config;
    },
    error => Promise.reject(error)
);

class ChatGPTApi {

    apiKey;
    constructor({ apiKey }) {
        if(apiKey) {
            this.apiKey = apiKey;
        } else {
            throw new InvalidApiKeyException(`Missing OpenAI Api key`)
        }
    }

    chatGPTrequest = ({ model, prompt }) => {
        return customInterceptor.request({
            method: "POST",
            headers: { 'Authorization': `Bearer ${this.apiKey}` },
            data: {
                model: model,
                prompt: prompt
            }
        });
    }
}

module.exports = {
    ChatGPTApi
}