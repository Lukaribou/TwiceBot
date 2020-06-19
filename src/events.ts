import { bot } from './index'
import { Message, Collection, Guild } from 'discord.js'
import { Command, EMOJIS } from './utils/structs'

export function onReady(): void {
    console.log(`Connecté sur ${bot.guilds.cache.size} serveur(s).`);
}

export async function onMessage(message: Message): Promise<void> {
    if (!message.content.startsWith(bot.config.prefix)) return;
    if (message.author.bot) { message.channel.send(`${EMOJIS.X} **I don't execute commands from other bots.**`); return; }// Si l'auteur du message est un bot
    if (!["text", "news", "shop"].includes(message.channel.type)) { message.channel.send(`${EMOJIS.X} **I execute commands only in channels: \`text\`, \`news\` and \`shop\`.**`); return; } // Si le message est ailleurs que dans un salon texte sur un serveur en gros
    if (message.content.trim() === `<@!${bot.user.id}>`) { message.channel.send(`${EMOJIS.RIGHTARROW} \`${bot.config.prefix}help\``); return; }

    const command: string = message.content.split(" ")[0].substring(bot.config.prefix.length);
    const commandArgs: string[] = message.content.split(" ").slice(1);

    if (!bot.cooldowns.has(message.author.id)) bot.cooldowns.set(message.author.id, new Collection());

    if (bot.commands.has(command) || bot.aliases.has(command)) {
        const comm: Command = bot.commands.get(command) || bot.aliases.get(command);
        if (!bot.cooldowns.get(message.author.id).has(command)) {
            comm.execute({ args: commandArgs, message: message, bot: this }).catch().then(() => {
                if (!message.deleted) message.delete().catch();
                bot.cooldowns.get(message.author.id).set(command, Date.now());
                setTimeout(() => bot.cooldowns.get(message.author.id).delete(command), comm.cooldown);
            });
        } else message.channel.send(`${EMOJIS.X} **This command has a cooldown of \`${comm.cooldown / 1000}\` seconds. You need to wait \`${((bot.cooldowns.get(message.author.id).get(command) + comm.cooldown - Date.now()) / 1000).toFixed(1)}\` more seconds !**`)
    } else message.channel.send(`${EMOJIS.X} **The command \`${command}\` doesn't exist...**`);
}

export function onNewGuild(guild: Guild): void {
    console.log(`${EMOJIS.OK} The bot as been added on a new server ! ${guild.name}, ${guild.memberCount} members, owner: ${guild.owner.user.tag} (ID: ${guild.ownerID})`);
    guild.owner.send(`${EMOJIS.TADA} Thanks to add me on your server ! You can go on https://github.com/Lukaribou/TwiceBot to see features or to propose new ones.`).catch();
}

export function onExitGuild(guild: Guild): void {
    console.log(`${EMOJIS.X} The bot as been kicked from a server ! ${guild.name}, ${guild.memberCount} members, owner: ${guild.owner.user.tag} (ID: ${guild.ownerID})`);
}