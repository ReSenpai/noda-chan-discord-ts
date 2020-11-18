import { getServerName, getUserName, getSomeName } from './../utils/bot_selectors';
import { BotObjType } from './../types/types';
import { getUserIdObj, getBoostGameResourcesObj } from './mongoose_selectors';
import { logg } from '..';
import { getUserId } from '../utils/bot_selectors';
import { UsersModel } from './userSchema';

// alias
const getUserObjFromBD = async (obj: BotObjType) => UsersModel.findOne(getUserIdObj(obj));

/**
 * Creates a user object for a database
 * @param obj Bot object
 * @returns User object
 */
const createUserObj = (obj: BotObjType) => ({
    USER_ID: getUserId(obj),
    RANK: 'guest',
    COINS: 25,
    EXPERIENCE: 0,
    LEVEL: 0,
    MESSAGE_ID: { Object },
    USERNAME_ON_DISCORD_SERVER: getServerName(obj),
    USERNAME: getUserName(obj),
    REGISTRATION_TIME: new Date()
})
/**
 * Add user to the mongodb
 * @param obj Bot object
 * @returns Promise boolean, true If the user has been added and false in any other case
 */
export const addUserObjToBD = async (obj: BotObjType) => {
    try {
        const userObjFromBD = await getUserObjFromBD(obj);

        if(!userObjFromBD) {
            await new UsersModel(createUserObj(obj)).save()
            .then(() => logg.debug(2, 'MongoDB add user', getSomeName(obj)));
            return true;
        }
        return false;
    } catch (error) {
        logg.error(2, 'MongoDB add user', error);
        return false;
    }  
}
/**
 * Boost game resources for each message
 * @param obj Bot object
 */
export const boostGameResources = async (obj: BotObjType) => {
    const userObjFromBD = await getUserObjFromBD(obj);
    if (userObjFromBD) {
        userObjFromBD.updateOne(getBoostGameResourcesObj(userObjFromBD))
        .then(() => logg.debug(2, 'Mongodb', 'update game resources'));
    }
}
