## JS Client for official OpenAI completions API with AI models that ChatGPT uses.
This package is available for both uses borwser oriented Single Page Applications as well as for Common.JS use.

## Install
`npm install chatgpt-api-client` <br/>
or <br/>
`yarn add chatgpt-api-client`<br>

Ensure you're using node >= 14 to prevent compatibility issues with obsolete node versions

## Usage
You have to pass your API key for authentification. Visit the page https://platform.openai.com/account/api-keys to retrieve the API Key you'll use in your requests. 
```javascript
import { ChatGPTApi } from "chatgpt-api-client";

async function try() {

    const api = new ChatGPTApi({ apiKey: process.env.OPENAI_API_KEY });
    const response = await api.sendMessage({ prompt: "Hi! How is the weather today?" });

    console.info(response);
}
```
For users who belong to multiple organizations, you can pass a this property to specify which organization is used for an API request.

```javascript
const api = new ChatGPTApi({ apiKey: process.env.OPENAI_API_KEY, organization: "custom-org" });
```

You can specify which AI model will be used in the processing of your requests.

```javascript
const response = await api.sendMessage({ prompt: "Hi! How is the weather today?", model: "model-id-0" });
```
**text-davinci-003** is the default model that is specified in case of non-mentioned model property.