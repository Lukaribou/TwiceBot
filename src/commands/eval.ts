import { Command, CommandParams } from "../utils/structs";

export default class EvalCommand extends Command {
    name = 'eval';
    desc = 'Evalue le code donné en paramètre';
    categorie = 'Système';
    usage = 'eval <code>';
    ownerOnly = true;

    async execute(args: CommandParams) {
        if (args.message.author.id != args.bot.config.ownerId) { console.log(args.message.author.username + " a essayé de faire: " + args.message.content); return };

        var test: boolean | string = args.args[0] == '-t' ? args.args.shift() : false // Si args.args[0] est égal à '-t' je l'enlève car sinon ça va faire buguer en dessous
        var toEval: string = args.args.join(" "); // On joint les éléments avec un espace

        try {
            var evaluated: any = eval(toEval); // On évalue le code, càd on fait comme si c'était du code écrit comme ici
        } catch { args.message.delete().catch() } // Si ça passe pas je supprime le message (si ça réussit il est supprimé dans events.ts)

        if (test) { // Dans une condition, une chaine de caractères vide vaut true
            try { // Dans un try/catch, il exécute le code dans la partie catch si celui dans le try a planté quelque part
                args.message.channel.send({
                    embed: {
                        color: 3066993,
                        description: "**📥 Code :\n" + toEval + "\n:outbox_tray: Résultat : `\n" + evaluated + "`**",
                        timestamp: Date.now(),
                    }
                });
            } catch (error) {
                args.message.channel.send({
                    embed: {
                        color: 15158332,
                        title: 'Evaluation Cancelled',
                        description: `${error}`,
                        timestamp: Date.now()
                    }
                });
            };
        };
    };
};