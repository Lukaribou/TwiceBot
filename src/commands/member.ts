import { Command, CommandParams, EMOJIS, twiceInfosdb } from "../utils/structs";
import { MessageEmbed, MessageAttachment } from "discord.js";

export default class MemberCommand extends Command {
    name = 'member';
    desc = 'Displays information about a member of Twice.';
    usage = 'member <latin stage name>';
    categorie = 'Twice';
    cooldown = 5e3

    async execute(args: CommandParams): Promise<void> {
        if (!args.args[0]) { args.message.channel.send(`${EMOJIS.X} **You need to provide the name of a member !**`); return; }
        if (!twiceInfosdb.group.members.map((x: string) => x.toLowerCase()).includes(args.args[0].toLowerCase())) { args.message.channel.send(`${EMOJIS.X} **The name you provided does not appear in my database ${EMOJIS.THINKING} ! Try with the latin stage name...**`); return; }

        var member: Member = twiceInfosdb.members[args.args[0]];
        const img = new MessageAttachment(`res/membersImg/${member.name.stage.latin.toLowerCase()}.jpg`, 'img.jpg');
        const thum = new MessageAttachment(`res/countryFlags/${member.name.stage.latin == 'Mina' ? 'american-japan' : member.birth.country.toLowerCase().replace(' ', '-')}-flag.jpg`, 'flag.jpg');
        const logo = new MessageAttachment('res/logo.png', 'logo.png');

        args.message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(`Information about Twice ${member.name.stage.latin}`, "attachment://logo.png", 'https://kprofiles.com/twice-members-profile/')
                .setThumbnail("attachment://flag.jpg")
                .setColor(member.color.code)
                .setImage(`attachment://img.jpg`)
                .addField("Stage name:", `Latin: \`${member.name.stage.latin}\`\nKorean: \`${member.name.stage.korean}\``, true)
                .addField("Full name:", `Latin: \`${member.name.full.latin}\`\nKorean: \`${member.name.full.korean}\`${member.name.full.native ? `\nNative: \`${member.name.full.native}\`` : ''}`, true)
                .addField("Birth:", `The \`${member.birth.date}\` (\`${calculateAge(member.birth.date)}\` years old) in \`${member.birth.town}\`.\nCountry: \`${member.birth.country}\`\nZodiac sign: \`${member.birth.zodiacSign}\`\nChinese sign: \`${member.birth.chineseSign}\``)
                .addField("Position(s):", `\`${member.position.join(", ")}\``)
                .addField("Height:", `\`${member.height}cm (${cmToFeets(member.height)})\``, true)
                .addField("Representative color:", `\`${member.color.name}\``, true)
                .addField("Representative emoji:", member.emoji, true)
                .setFooter(`Information are from https://kprofiles.com/twice-members-profile/. If any of this information is false, please contact me: ${args.bot.users.cache.get(args.bot.config.ownerId).tag}.`, args.bot.users.cache.get(args.bot.config.ownerId).avatarURL()),
            files: [img, thum, logo]
        });
    }
    // Ajouter la source: https://kprofiles.com/twice-members-profile/
}

export function calculateAge(date: string) {
    return Math.abs(new Date(Date.now() - new Date(date).getTime()).getUTCFullYear() - 1970); // 1970 car timestamp = commence 01/01/1970 ?
}

export function cmToFeets(height: number): string {
    return (height / 30.48).toFixed(2).replace('.', "'").concat('"');
}

export interface Member {
    birth: {
        date: string, // ex: December 29, 1996
        town: string, // ex: Osaka
        country: string, // ex: Japan (télécharger un drapeau du Japon et le mettre en Thumbnail)
        chineseSign: string,
        zodiacSign: string
    },
    name: {
        stage: {
            latin: string, // ex: Sana
            korean: string // ex: 사나
        },
        full: {
            latin: string,
            korean: string,
            native?: string // ex: 湊崎 紗夏
        }
    },
    emoji: string,
    height: number,
    color: {
        name: string,
        code: string
    }
    position: string[]
}