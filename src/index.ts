import { createMessageEmbed } from './utils/rich_message';
import { addUserObjToBD, boostGameResources } from './mongodb/queryes';
import { configBD } from './mongodb';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import discord from 'discord.js';
import Logger from './utils/logger';

dotenv.config(); // initiation env

const { TOKEN, DB_URL }: any = process.env;
const bot = new discord.Client();

export const logg = new Logger(3, 'colored');

mongoose.connect(DB_URL, configBD)
    .then(() => logg.green(1, 'MongoDB', 'Connected'))
    .catch(error => logg.error(2, 'MongoDB Connected', error));

// get invite link
bot.on('ready', async () => {
    try {
        const link = await  bot.generateInvite(["ADMINISTRATOR"]);
        logg.log(1, 'Invite link', link);
    } catch (error) {
        logg.error(2, 'Invite link', error);
    }  
});

bot.on('message', async msg => {
    if (msg.author.bot) {
        logg.prime(2, 'Author is a bot', msg.content);
        return;
    }

    logg.log(3, 'message', msg.content);

    if (msg.content === 'add_user') {
        await addUserObjToBD(msg);
        await boostGameResources(msg);
        await msg.reply(createMessageEmbed());
    }
})

bot.login(TOKEN)
    .then(() => logg.green(1, 'Bot', 'Connecting successfully'))
    .catch(error => logg.error(2, 'Bot', error));