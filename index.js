const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const { fetchData } = require('./fetchAPI.js');
const fs = require('fs');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

dotenv.config();
const TOKEN = process.env.TOKEN;

// Split to max length, 2000
function splitMessage(message, maxLength = 2000) {
    const parts = [];
    while (message.length > maxLength) {
        let sliceIndex = message.lastIndexOf('\n', maxLength);
        if (sliceIndex === -1) sliceIndex = maxLength;
        parts.push(message.slice(0, sliceIndex));
        message = message.slice(sliceIndex).trim();
    }
    parts.push(message);
    return parts;
}

// Read URL's from file
function readUrlsFromFile() {
    const fileContent = fs.readFileSync('./dias_olimpiadas.txt', 'utf8');
    return fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');
}

// Get current date
function getUrlForTomorrow() {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Increment the date by one day to get tomorrow
    const tomorrow = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const urls = readUrlsFromFile();
    return urls.find(url => url.includes(tomorrow));
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content === '!lista') {
        try {
            const apiUrl = getUrlForTomorrow();

            if (!apiUrl) {
                message.channel.send('Não há eventos programados para hoje.');
                return;
            }

            const data = await fetchData(apiUrl);

            if (data && data.length > 0) {
                const formattedData = data.map((item, index) => {
                    const timeTexto = item.name1 && item.name2 ? `Times: ${item.name1} x ${item.name2}\n` : '';
                    return (
                        `**Position ${index + 1}**\n` +
                        `Dia: ${item.olympicDay}\n` +
                        `Esporte: ${item.disciplineName}\n` +
                        `Modalidade: ${item.eventUnitName}\n` +
                        `Horário previsto: ${item.formatTimeStartDate}\n` +
                        `Horário de Encerramento: ${item.formatTimeEndDate}\n` +
                        timeTexto
                    );
                }).join('\n');

                // Split message for discord limit
                const messageChunks = splitMessage(formattedData, 2000);

                for (const chunk of messageChunks) {
                    await message.channel.send(chunk);
                }
            } else {
                message.channel.send('Nenhuma posição encontrada.');
            }
        } catch (error) {
            console.error('Erro ao processar a mensagem:', error);
            message.channel.send('Erro ao buscar os dados.');
        }
    }
});

client.login(TOKEN);