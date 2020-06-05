import { Command, CommandParams } from "../utils/structs";

export default class MemberCommand extends Command {
    name = 'member';
    desc = 'Displays informations about a member of Twice.';
    usage = '';
    categorie: string;

    async execute(args: CommandParams): Promise<void> {

    }
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
        },
        nicknames: string[]
    },
    emoji: string,
    height: number,
    color: {
        name: string,
        code: string
    }
    position: string[]
}