import { Command, CommandParams, EMOJIS } from "../utils/structs";
import { MessageEmbed, Collection, EmojiResolvable } from "discord.js";
import { generateBotInvitation } from "../utils/functions";

export default class HelpCommand extends Command {
    name = "help";
    categorie = "Informations";
    desc = "Displays bot commands";
    usage = "help <command/nothing>";

    async execute(args: CommandParams) {
        var assoc: Map<string, EmojiResolvable> = new Map()
            .set('Twice', '😍')
            .set('Informations', 'ℹ️')
            .set('Other', '🤷‍♀️')
            .set('Moderation', EMOJIS.ADMINSEMOJI)
            .set('System', '🔧');

        if (args.args.length === 0) {
            var categories: Collection<string, Command[]> = new Collection<string, Command[]>();

            // Fetch les catégories
            args.bot.commands.forEach(c => categories.has(c.categorie) ? categories.set(c.categorie, categories.get(c.categorie).concat([c])) : categories.set(c.categorie, [c]));

            categories = new Collection([...categories.entries()].sort()); // Sort la collection en fonction de l'alphabet sur la clé

            var em: MessageEmbed = new MessageEmbed()
                .setAuthor(`Help page of ${args.bot.user.username}`, args.bot.user.avatarURL(), generateBotInvitation())
                .setThumbnail(args.bot.user.avatarURL())
                .setFooter(`${args.bot.commands.size} commands available.`);

            categories.forEach((categ: Command[], name: string) => em.addField(`${assoc.get(name)} - ${name}`, "`" + categ.map(c => c.name).join("`, `") + "`"), true);
            
            args.message.channel.send(em);
        } else if (args.bot.commands.has(args.args[0]) || args.bot.aliases.has(args.args[0])) {
            const command: Command = args.bot.commands.get(args.args[0]) || args.bot.aliases.get(args.args[0]);
            var embed: MessageEmbed = new MessageEmbed()
                .setAuthor(`Help for the command : ${assoc.get(command.categorie)} ${command.name}`, args.bot.user.avatarURL())
                .setDescription("`Description :` " + command.desc)
                .setThumbnail(args.bot.user.avatarURL())
                .setColor("#00FF00")
                .addField("Usage : ", `\`${args.bot.config.prefix}${command.usage}\``, true)
                .addField("A.k.a ?", command.aliases.length === 0 ? EMOJIS.XEMOJI : ("`" + command.aliases.join("`, `") + "`"), true)
                .addField("Bot owner only : ", command.ownerOnly ? EMOJIS.OKEMOJI : EMOJIS.XEMOJI, true)
            args.message.channel.send(embed);
        }
    }
}