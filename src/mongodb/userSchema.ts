import mongoose from 'mongoose';
import { UserObjMongodbType } from '../types/types';
const Schema = mongoose.Schema ;

const UsersSchema = new Schema({
    USER_ID: {
        type: Number,
        required: true
    },
    RANK: {
        type: String,
        required: true
    },
    COINS: {
        type: Number,
        default: 25
    },
    EXPERIENCE: {
        type: Number,
        default: 0
    },
    LEVEL: {
        type: Number,
        default: 0
    },
    MESSAGE_ID: {
        type: Object,
    },
    USERNAME_ON_DISCORD_SERVER: {
        type: String
    },
    USERNAME: {
        type: String,
        required: true
    },
    REGISTRATION_TIME: {
        type: Date,
        required: true
    }
});

export const UsersModel = mongoose.model<UserObjMongodbType>('users', UsersSchema);