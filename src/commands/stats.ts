import { Command, CommandParams } from "../utils/structs";
import { MessageEmbed } from "discord.js";

export default class StatsCommand extends Command {
    name = 'stats';
    desc = 'Displays stats about the bot.';
    usage = 'stats';
    categorie = 'Other';

    async execute(args: CommandParams): Promise<void> {
        args.message.channel.send(new MessageEmbed()
            .setAuthor(`Stats about ${args.bot.user.username}`, args.bot.user.avatarURL(), require('../../package.json').homepage)
            .setColor('#0079CC')
            .addField('Server(s):', args.bot.guilds.cache.size, true)
            .addField('Channels:', args.bot.channels.cache.size, true)
            .addField('Humans members:', args.bot.users.cache.filter(u => !u.bot).size, true)
            .addField('Prefix:', args.bot.config.prefix, true)
            .addField('Owner:', args.bot.users.cache.get(args.bot.config.ownerId).tag, true)
            .addField('Language:', 'TypeScript', true)
            .addField('Library:', 'Discord.JS (v12)', true));
    }
}