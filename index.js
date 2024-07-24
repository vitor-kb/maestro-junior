const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const obs = new OBSWebSocket();
dotenv.config();
const TOKEN = process.env.TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content === '!lista') {
        message.channel.send('');
    }
});

client.login(TOKEN);