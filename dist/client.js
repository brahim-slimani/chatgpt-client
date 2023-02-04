const axios = require("axios");

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

const chatGPTrequest = ({token, model, prompt}) => {
    return customInterceptor.request({
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}` },
        data: {
            model: model, 
            prompt: prompt
        }
    });
}

module.exports = {
    chatGPTrequest
}