import discord from 'discord.js';

export const getUserId = (msg: discord.Message) => parseInt(msg.author.id);
export const getServerName = (msg: discord.Message) => msg.member?.nickname || null;
export const getUserName = (msg: discord.Message) => msg.author.username;
export const getAvatar = (msg: discord.Message) => msg.author.avatar;
/**
 * @param msg Bot obj
 * @returns USERNAME_ON_DISCORD_SERVER or USERNAME
 */
export const getSomeName = (msg: discord.Message) => getServerName(msg) || getUserName(msg);