import { Command, CommandParams, EMOJIS } from "../utils/structs";
import { MessageEmbed, Collection, EmojiResolvable } from "discord.js";

export default class HelpCommand extends Command {
    name = "help";
    categorie = "Informations";
    desc = "Affiche les commandes du bot ou l'aide d'une commande";
    usage = "help <commande/rien>";

    async execute(args: CommandParams) {
        var assoc: Map<string, EmojiResolvable> = new Map()
            .set('Informations', 'ℹ️')
            .set('Autre', '🤷‍♀️')
            .set('Modération', EMOJIS.ADMINSEMOJI)
            .set('Système', '🔧');

        if (args.args.length === 0) {
            var categories: Collection<string, Command[]> = new Collection<string, Command[]>();

            // Fetch les catégories
            args.bot.commands.forEach(c => categories.has(c.categorie) ? categories.set(c.categorie, categories.get(c.categorie).concat([c])) : categories.set(c.categorie, [c]));

            categories = new Collection([...categories.entries()].sort()); // Sort la collection en fonction de l'alphabet sur la clé

            var em: MessageEmbed = new MessageEmbed()
                .setAuthor(`Page d'aide de ${args.bot.user.username}`, args.bot.user.avatarURL(), 'https://github.com/Lukaribou')
                .setFooter(`${args.bot.commands.size} commandes disponibles.`);

            categories.forEach((categ: Command[], name: string) => em.addField(`${assoc.get(name)} - ${name}`, "`" + categ.map(c => c.name).join("`, `") + "`"), true);
            
            args.message.channel.send(em);
        } else if (args.bot.commands.has(args.args[0]) || args.bot.aliases.has(args.args[0])) {
            const command: Command = args.bot.commands.get(args.args[0]) || args.bot.aliases.get(args.args[0]);
            var embed: MessageEmbed = new MessageEmbed()
                .setAuthor(`Aide sur la commande : ${assoc.get(command.categorie)} ${command.name}`, args.bot.user.avatarURL())
                .setDescription("`Description :` " + command.desc)
                .setColor("#00FF00")
                .addField("Utilisation : ", `\`${args.bot.prefix}${command.usage}\``, true)
                .addField("Alias ?", command.aliases.length === 0 ? EMOJIS.XEMOJI : ("`" + command.aliases.join("`, `") + "`"), true)
                .addField("Propriétaire du bot seulement : ", command.ownerOnly ? EMOJIS.OKEMOJI : EMOJIS.XEMOJI, true)
            args.message.channel.send(embed);
        };
    };
};