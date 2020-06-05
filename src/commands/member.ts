import { Command, CommandParams, EMOJIS, twiceInfosdb } from "../utils/structs";
import { MessageEmbed, MessageAttachment } from "discord.js";

export default class MemberCommand extends Command {
    name = 'member';
    desc = 'Displays informations about a member of Twice.';
    usage = '';
    categorie: string;

    async execute(args: CommandParams): Promise<void> {
        if (!args.args[0]) { args.message.channel.send(`${EMOJIS.X} **You need to provide the name of a member !**`); return; }
        if (!twiceInfosdb.group.members.map((x: string) => x.toLowerCase()).includes(args.args[0].toLowerCase())) { args.message.channel.send(`${EMOJIS.X} **The name you provided does not appear in my database ${EMOJIS.THINKING} !**`); return; }
        
        var member: Member = twiceInfosdb.members[args.args[0]];
        const img = new MessageAttachment(`res/membersImg/${member.name.stage.latin.toLowerCase()}.jpg`);

        args.message.channel.send({
            embed: new MessageEmbed().setImage(`attachment://${member.name.stage.latin.toLowerCase()}.jpg`),
            files: [img]
        });
    }
    // Ajouter la source: https://kprofiles.com/twice-members-profile/
}

export function cmToFeets(height: number): string {
    return (height / 30.48).toFixed(2);
}

export interface Member {
    birth: {
        date: string, // ex: December 29, 1996
        town: string, // ex: Osaka
        country: string, // ex: Japan (télécharger un drapeau du Japon et le mettre en Thumbnail)
        chineseSigne: string,
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