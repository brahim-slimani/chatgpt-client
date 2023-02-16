## JS Client for official OpenAI completions API with AI models that ChatGPT uses.
This package is available for both uses borwser oriented Single Page Applications as well as for Common.JS use.

## Install
`npm install chatgpt-api-client` <br/>
or <br/>
`yarn add chatgpt-api-client`<br>

Ensure you're using node >= 14 to prevent compatibility issues with obsolete node versions

## Usage
You have to pass your API key for authentification. Visit the page https://platform.openai.com/account/api-keys to retrieve the API Key you'll use in your requests.<br>
Supposed in the below demo that the key is stored in the environment file. 
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
**text-davinci-003** is the default model that is specified in case of non-mentioned model property.<br>


There are a bit of parameters to pass in the sendMessage function namely the max of tokens, temperature and number of completions.
```javascript
const response = await api.sendMessage({ 
        prompt: "Hi! How is the weather today?", //The prompt(s) to generate completions for
        model: "model-id-0", //ID of the model to use
        max_tokens: 500, //The maximum number of tokens to generate in the completion
        temperature: 0, //What sampling temperature to use, between 0 and 2, Default is 1
        nCompeletions: 3 //How many completions to generate for each prompt. Default is 1
    });
```
<br>
You can use the List of models API (api.getModels) to see all of your available models.

```javascript
const api = new ChatGPTApi({ apiKey: process.env.OPENAI_API_KEY });
//Retrieve the list of available OpenAI models
let models = await api.getModels();
```
<br>

## Usage with Promise return
The previous examples were made with Async/Await calls through asynchronos promise. We could explicitly handle the return of Promise Object.

```javascript
api.sendMessage({ prompt: "Hello! this is a test" }).then((response) => {
    //Proceed with success
    console.info("Response data", response);
}, error => {
    //An error has occured
    console.error("Error", error);
});
```

## For Common.JS usage
```javascript
const { ChatGPTApi } = require("chatgpt-api-client");
```

## Github repository
If you have any contribution request, feature or if you found a bug or any issue please report them to this [github repository](https://github.com/brahim-slimani/chatgpt-client)

## License
ISC © https://opensource.org/

## Author
[Brahim Slimani](https://brahim-slimani.github.io/profile)