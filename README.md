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
    const response = await api.sendMessage({ prompt: "Hello! How is the weather today?" });

    console.info(response);
}

```


