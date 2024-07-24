const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const { fetchData } = require('./fetchAPI.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

dotenv.config();
const TOKEN = process.env.TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content === '!lista') {
        try {
            const data = await fetchData();

            // console.log(data.name1)
            // console.log(data.name2)

            if (data) {
                message.channel.send(
                    `Dia: ${data.olympicDay}\n` +
                    `Esporte: ${data.disciplineName}\n` +
                    `Modalidade: ${data.eventUnitName}\n` +
                    `Horário previsto: ${data.formatTimeStartDate}\n` +
                    `Horário de Encerramento: ${data.formatTimeEndDate}\n` +
                    `Times: ${data.name1} x ${data.name2}`
                );
            } else {
                message.channel.send('Erro ao buscar os dados.');
            }
        } catch (error) {
            console.error('Erro ao processar a mensagem:', error);
            message.channel.send('Erro ao buscar os dados.');
        }
    }
});

client.login(TOKEN);