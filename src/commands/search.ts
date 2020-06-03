import { Command, CommandParams } from "../utils/structs";

export default class SearchCommand extends Command {
    name = 'search';
    desc = 'Search a Twice song on YouTube and display informations about it';
    usage = 'search <title (don\' put "Twice" before)>';
    categorie: string;

    async execute(args: CommandParams): Promise<void> {
        
    };
};