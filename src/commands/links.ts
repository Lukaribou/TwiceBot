import { Command, CommandParams } from "../utils/structs";
import { MessageEmbed } from "discord.js";

export default class LinksCommand extends Command {
    name = 'links';
    desc = 'Sends you some of important links for "Twice" stan.';
    usage: string;
    categorie: string;

    async execute(args: CommandParams): Promise<void> {
        args.message.channel.send(new MessageEmbed()
        .setAuthor("Here's some links for you:", args.bot.user.avatarURL())
        .addField("Twice official website:", "[Official website](https://twice.jype.com/)", true)
        .addField("Twice's YouTube channel:", "[YouTube channel](https://www.youtube.com/channel/UCzgxx_DM2Dcb9Y1spb9mUJA)", true)
        .addField("Twice's VLive:", "[VLive](https://channels.vlive.tv/EDBF/home)")
        .addField("Twice Fan's page", "[Fan's page](https://fans.jype.com/Portal)", true)
        .addField("Twice's Twitter:", "[Twitter page](https://twitter.com/JYPETWICE)", true)
        .addField("Twice's Instagram:", "[Twicetagram](https://www.instagram.com/twicetagram/)", true)
        .addField("Twice's Facebook", "[Facebook](https://www.facebook.com/JYPETWICE)", true)
        .setFooter(`To add a link to the list, please contact me: ${args.bot.users.cache.get(args.bot.config.ownerId).tag}.`, args.bot.users.cache.get(args.bot.config.ownerId).avatarURL()));
    }
}