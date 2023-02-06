
require('dotenv').config();
const { ChatGPTApi } = require("./dist/client");

console.log("Hi from common entry!");

//const api = new ChatGPTApi({ apiKey: "" });

async function run () {
    //let response = await api.chatGPTrequest({ model: "text-davinci-003", prompt: "What time is it ?" });
    let response = await api.getModels();
    console.log(".....", response.data);
}

//run();

console.log("===>", process.env.API_KEY)