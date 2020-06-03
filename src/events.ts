import { bot } from './index'
import { Message } from 'discord.js'
import { Command, EMOJIS } from './utils/structs'

export function onReady(): void {
    console.log(`Connecté sur ${bot.guilds.cache.size} serveur(s).`);
};

export async function onMessage(message: Message): Promise<void> {
    if (message.author.bot) return; // Si l'auteur du message est un bot
    if (!["text", "news", "shop"].includes(message.channel.type)) return; // Si le message est ailleurs que dans un salon texte sur un serveur en gros
    if (message.content.trim() === `<@!${bot.user.id}>`) { message.channel.send(`${EMOJIS.RIGHTARROW} \`${bot.config.prefix}help\``); return; };
    if (!message.content.startsWith(bot.config.prefix)) return;

    const command: string = message.content.split(" ")[0].substring(bot.config.prefix.length);
    const args: string[] = message.content.split(" ").slice(1);

    if (bot.commands.has(command) || bot.aliases.has(command)) {
        const comm: Command = bot.commands.get(command) || bot.aliases.get(command);
        comm.execute({ args: args, message: message, bot: this }).catch().then(() => { if (!message.deleted) message.delete().catch() });
    };
};
