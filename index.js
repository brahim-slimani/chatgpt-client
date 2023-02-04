
const client = require("./dist/client")
console.log("Hi from common entry!");


client.chatGPTrequest({
    token: "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",
    model: "text-davinci-003",
    prompt: "What time is it ?"
}).then((response => {
    console.log("Response =>", response)
}, error => {
    console.error("Error =>", error);
}));