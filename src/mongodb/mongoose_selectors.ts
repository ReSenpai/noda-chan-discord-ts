import { UserObjMongodbType } from './../types/types';
import discord from 'discord.js';
import { getUserId } from '../utils/bot_selectors';


export const getUserIdObj = (obj: discord.Message) => ({USER_ID: getUserId(obj)});
export const getBoostGameResourcesObj = (userObjFromBD: UserObjMongodbType) => {
    const experienceToLevelUp: boolean = userObjFromBD.EXPERIENCE >= userObjFromBD.LEVEL * 5;
    return {
        COINS: userObjFromBD.COINS + 1 as number,
        EXPERIENCE: experienceToLevelUp ? 0 : userObjFromBD.EXPERIENCE + 1 as number,
        LEVEL: experienceToLevelUp ? userObjFromBD.LEVEL + 1 : userObjFromBD.LEVEL as number
    }  
}