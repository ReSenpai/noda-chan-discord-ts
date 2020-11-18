import discord from 'discord.js';
import { Document } from 'mongoose';

export interface UserObjMongodbType extends Document {
    USER_ID: number
    RANK: string
    COINS: number
    EXPERIENCE: number
    LEVEL: number
    USERNAME_ON_DISCORD_SERVER: string | null
    USERNAME: string
    REGISTRATION_TIME: Date
}

export type BotObjType = discord.Message;