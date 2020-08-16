const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT || 3000);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const client = new Discord.Client();
const { config } = require('dotenv')

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log("Bot is Ready!")
})

client.on("message", message => {
    const prefix = ">roll"

    if (message.content.startsWith(prefix)) {
        const list = message.content.replace(prefix, "").split(/\n/)
        let currentIndex = list.length

        while (currentIndex !== 0) {
            let index = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            let aux = list[currentIndex]
            list[currentIndex] = list[index]
            list[index] = aux

        }
        const team1 = list.splice(0, list.length / 2)
        const team2 = list.splice((list.length / 2) - 2, list.length)
        message.reply(`\nTeam1 => ${team1} \nTeam2 => ${team2}`)
    }
})

client.login(process.env.TOKEN);