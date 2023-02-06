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

class ChatGPTApi {

    apiKey;
    organization;
    constructor({ apiKey, organization }) {
        this.organization = organization;
        if(apiKey) {
            this.apiKey = apiKey;
        } else {
            throw new InvalidApiKeyException(`Missing OpenAI Api key`)
        }

        customInterceptor.interceptors.request.use(
            async (config) => {
                config.baseURL = "https://api.openai.com/v1";
                config.timeout = 30 * 1000; //in seconds,
                config.headers = { 'Authorization': `Bearer ${this.apiKey}`, ...(this.organization) && {'OpenAI-Organization': `${this.organization}`} }
                return config;
            },
            error => Promise.reject(error)
        );
    }

    sendMessage = ({ model, prompt, max_tokens, temperature, nCompeletions }) => {
        return customInterceptor.request({
            url: "/completions",
            method: "POST",
            headers: { 'Authorization': `Bearer ${this.apiKey}` },
            data: {
                model: model ? model : "text-davinci-003",
                prompt: prompt, 
                ...(max_tokens) && {'max_tokens': max_tokens},
                ...(temperature) && {'temperature': temperature},
                ...(nCompeletions) && {'n': nCompeletions}
            }
        });
    }

    getModels = () => {
        return customInterceptor.request({
            url: "/models",
            method: "GET",
        });
    }
}

module.exports = {
    ChatGPTApi
}