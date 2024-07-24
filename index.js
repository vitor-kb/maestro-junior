const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const { default: OBSWebSocket } = require('obs-websocket-js');
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
const WS = process.env.WS;
const PS = process.env.PS;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    obs.connect({ url: WS, password: PS }).then(() => {
        console.log('Connected to OBS WebSocket');
    }).catch(err => {
        console.error('Failed to connect to OBS WebSocket:', err);
    });
});

client.on('messageCreate', async message => {
    if (message.content === '!startstream') {
        await obs.send('StartStreaming');
        message.channel.send('Started streaming!');
    } else if (message.content === '!stopstream') {
        await obs.send('StopStreaming');
        message.channel.send('Stopped streaming!');
    }
});

client.login(TOKEN);