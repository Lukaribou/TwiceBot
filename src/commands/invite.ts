import { Command, CommandParams, EMOJIS } from "../utils/structs";
import { generateBotInvitation } from "../utils/functions";

export default class InviteCommand extends Command {
    name = "invite";
    desc = "Sends you a link to invite the bot in your server";
    usage = "invite";
    categorie = "Other";
    
    async execute(args: CommandParams): Promise<void> {
        args.message.channel.send(`${EMOJIS.OKEMOJI} **Here's a link to invite me on your server:** \`${generateBotInvitation()}\``);
    }
}