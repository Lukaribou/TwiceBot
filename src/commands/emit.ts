import { Command, CommandParams, EMOJIS } from '../utils/structs'

export default class EmitCommand extends Command {
    name = "emit";
    categorie = "Système";
    desc = "Simule l'évènement donné en paramètre si il est configuré dans le bot";
    usage = "emit <évènement>";
    botAdminsOnly = true;

    async execute(args: CommandParams) {
        if (!args.args[0]) { args.message.channel.send(`${EMOJIS.XEMOJI} **L'évènement à émettre est requis en paramètre.**`); return; }; // Si il n'y a pas d'argument 0

        switch (args.args[0]) {
            case 'join':
                args.bot.emit("guildMemberAdd", args.message.guild.member(args.message.author));
                break;
            case 'leave':
                args.bot.emit("guildMemberRemove", args.message.guild.member(args.message.author));
                break;
            default:
                args.message.channel.send(`${EMOJIS.XEMOJI} **Cet évènement n'existe pas ou n'est pas implémenté dans le bot.**`);
        };
    };
};