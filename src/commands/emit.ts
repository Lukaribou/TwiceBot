import { Command, CommandParams, EMOJIS } from '../utils/structs'

export default class EmitCommand extends Command {
    name = "emit";
    categorie = "System";
    desc = "Simulates the event given in parameter if it is configured in the bot";
    usage = "emit <event>";
    botAdminsOnly = true;

    async execute(args: CommandParams) {
        if (!args.args[0]) { args.message.channel.send(`${EMOJIS.XEMOJI} **The event to simulate is required as a parameter**`); return; }; // Si il n'y a pas d'argument 0

        switch (args.args[0]) {
            case 'join':
                args.bot.emit("guildMemberAdd", args.message.guild.member(args.message.author));
                break;
            case 'leave':
                args.bot.emit("guildMemberRemove", args.message.guild.member(args.message.author));
                break;
            default:
                args.message.channel.send(`${EMOJIS.XEMOJI} **This event does not exist or is not implemented in the bot.**`);
        };
    };
};