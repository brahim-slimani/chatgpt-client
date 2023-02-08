
require('dotenv').config();
const { ChatGPTApi } = require("./dist/client");

console.log("Hi from common entry!");

const api = new ChatGPTApi({ apiKey: process.env.API_KEY+"kl" });

// async function run () {
//     let response = await api.chatGPTrequest({ model: "text-davinci-003", prompt: "What time is it ?" });
//     api.getModels(resp => {
//         console.log("===>", resp)

//     }, error => {
//         console.log("...>", error)
//     });

//run();

api.getModels().then(resp => {
    console.log("===>", resp)
}, error => {
    console.log("...>", error)
});