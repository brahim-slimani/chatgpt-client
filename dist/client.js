const axios = require("axios");
const { ReqService } = require("./service");

function InvalidApiKeyException(message) {
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
        if (apiKey) {
            this.apiKey = apiKey;
        } else {
            throw new InvalidApiKeyException(`Missing OpenAI Api key`)
        }

        customInterceptor.interceptors.request.use(
            async (config) => {
                config.baseURL = "https://api.openai.com/v1";
                config.timeout = 30 * 1000; //in seconds,
                config.headers = { 'Authorization': `Bearer ${this.apiKey}`, ...(this.organization) && { 'OpenAI-Organization': `${this.organization}` } }
                return config;
            },
            error => Promise.reject(error)
        );
    }

    service = new ReqService(customInterceptor);

    sendMessage = ({ model, prompt, max_tokens, temperature, nCompeletions }) => new Promise((resolve, reject) => {
        return this.service.call({
            url: "/completions",
            method: "POST",
            data: {
                model: model ? model : "text-davinci-003",
                prompt: prompt,
                ...(max_tokens) && { 'max_tokens': max_tokens },
                ...(temperature) && { 'temperature': temperature },
                ...(nCompeletions) && { 'n': nCompeletions }
            }
        });
    });

    getModels = () => {
        return this.service.call({
            url: "/models",
            method: "GET",
        });
    }
}

module.exports = {
    ChatGPTApi
}