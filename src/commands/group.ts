import { Command, CommandParams, twiceInfosdb } from "../utils/structs";
import { MessageEmbed, MessageAttachment } from "discord.js";

export default class GroupCommand extends Command {
    name = 'group';
    desc = 'Prints information about the Twice group.';
    usage = 'group';
    categorie = 'Twice';
    aliases = ['band', 'twice']

    async execute(args: CommandParams): Promise<void> {
        const groupImg = new MessageAttachment("res/group.jpg", 'group.jpg');
        const twiceLogo = new MessageAttachment("res/logo.png", 'logo.png')
        const jypeLogo = new MessageAttachment("res/jypeLogo.jpg", 'jypeLogo.jpg')

        args.message.channel.send({
            embed: new MessageEmbed()
                .setAuthor('Information about Twice', 'attachment://logo.png', 'https://twice.jype.com/')
                .setImage('attachment://group.jpg')
                .setThumbnail('attachment://logo.png')
                .setColor("#ff5fa2")
                .setDescription('`TWICE` (`트와이스`) is a korean girl group consisting of `9` members (from oldest to youngest): `' + twiceInfosdb.group.members.join('`, `') + '`')
                .addField('Start:', '`October 20, 2015` (through the survival show `Sixteen`)', true)
                .addField('Official colors:', '`Apricot` (`#FCC89B`) & `Neon Magenta` (`#FF5FA2`)', true)
                .addField('Fandom name:', '`Once`', true)
                .addField('Labels:', '`JYP Entertainment`, `Warner Music Japan`, `Republic Records`', true)
                .setFooter('NaJeongMoSaJiMiDaChaeTzu', 'attachment://jypeLogo.jpg'),
            files: [groupImg, twiceLogo, jypeLogo]
        });
    }
}