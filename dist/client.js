const axios = require("axios");
const { ReqService } = require("./service");

function InvalidApiKeyException(message) {
    this.message = message;
}

InvalidApiKeyException.prototype = new Error();
InvalidApiKeyException.prototype.name = "InvalidApiKeyException";

class ChatGPTApi {

    apiKey; organization;

    /**
     * ChatGPTApi constructor
     * @param {Object}, 
     * apikey: OpenAI API key for authentification. Visit the page https://platform.openai.com/account/api-keys to retrieve the API Key you'll use in your requests,
     * organization: optional field. For users who belong to multiple organizations, you can pass a this property to specify which organization is used for an API request.
     */
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

    /**
     * Given a prompt, the model will return one or more predicted respones, 
     * and can also return the probabilities of alternative tokens at each position.
     * @param {Object}  
     * model: ID of the model to use. You can use the List models API (api.getModels) to see all of your available models, Default is `text-davinci-003`
     * prompt: The prompt(s) to generate completions for,
     * max_tokens: The maximum number of tokens to generate in the completion,
     * temperature: What sampling temperature to use, between 0 and 2, Default is 1,
     * nCompeletions: How many completions to generate for each prompt. Default is 1
     * @returns Promise object
     */
    sendMessage = ({ model = 'text-davinci-003', prompt, max_tokens, temperature, nCompeletions }) => {
        return this.service.call({
            url: "/completions",
            method: "POST",
            data: {
                model: model,
                prompt: prompt,
                ...(max_tokens) && { 'max_tokens': max_tokens },
                ...(temperature) && { 'temperature': temperature },
                ...(nCompeletions) && { 'n': nCompeletions }
            }
        });
    };

    /**
     * This allows to retrieve a lists the currently available OpenAI models, and provides basic information about each one such as the owner and availability.
     * @returns Promise object
     */
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