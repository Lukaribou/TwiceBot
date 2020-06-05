import { Bot } from '../index';
import { Message } from 'discord.js';

export abstract class Command {
    abstract name: string;
    abstract desc: string;
    abstract usage: string;
    abstract categorie: string;
    ownerOnly: boolean = false; // De base on le met sur faux
    aliases: Array<string> = []; // De base les aliasses sont vides
    abstract async execute(args: CommandParams): Promise<void>;
}

export const confdb = require("../../database/config.json");
export const twiceInfosdb = require("../../database/TwiceInformations.json");

export interface CommandParams {
    args: string[]; // Les args c'est le message qu'on coupe à chaque espace
    message: Message;
    bot: Bot;
}

export class Config {
    token: string = confdb.token;
    ownerId: string = confdb.ownerId;
    prefix: string = confdb.prefix;
    youtubeKey: string = confdb.youtubeKey
}

export enum EMOJIS {
    OK = "✅",
    X = "❌",
    WARNING = "⚠",
    RIGHTARROW = "➡",
    TADA = "🎉",
    ADMINS = "🚔",
    OWNERONLY = "🔐",
    THINKING = "🤔"
}