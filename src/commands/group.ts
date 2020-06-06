import { Command, CommandParams } from "../utils/structs";

export default class GroupCommand extends Command {
    name = 'group';
    desc = 'Prints information about the Twice group.';
    usage = 'group';
    categorie = 'Twice';

    async execute(args: CommandParams): Promise<void> {
    
    }
}