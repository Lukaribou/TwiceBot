import { Client, Collection } from "discord.js";
import { Command, Config } from "./utils/structs";
import { readdir } from "fs";
import { onReady, onMessage } from "./events";
import YTBAPI from "./utils/ytbapi";
import SpotifyAPI from "./utils/spotifyAPI";

export class Bot extends Client { // extends Client = hérite des propriétés et méthodes de Discord.Client
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public config: Config = undefined;
    public ytbAPI: YTBAPI = undefined;
    public spotifyApi: SpotifyAPI = undefined;

    constructor(config: Config) {
        super({ disableMentions: 'everyone' }); // On empêche le bot de pouvoir faire des @everyone
        this.config = config;
        this.ytbAPI = new YTBAPI(this.config.youtubeKey);

        this.run();
    }

    async run(): Promise<void> {
        this.loadCommands();
        this.on("ready", onReady); // Déclenché quand le bot est connecté
        this.on("message", onMessage); // Quand un message est envoyé (soit au bot soit dans un salon)
        this.on("error", () => this.run()); // Si il y a une erreur on le redémarre

        await this.login(this.config.token);
        this.spotifyApi = new SpotifyAPI(this.config.spotifyClientId, this.config.spotifyClientSecret);
    }

    private loadCommands(): void {
        readdir(__dirname + "/commands", (err: NodeJS.ErrnoException, filenames: Array<string>) => {
            if (err) { console.error(err.message); return; }
            let jsfile = filenames.filter(f => f.split(".").pop() === "js");
            if (jsfile.length <= 0) return console.log("[LOGS] - 0 fichiers trouvés");

            jsfile.forEach((file: string, _) => {
                try {
                    if (file.endsWith(".map")) return;
                    delete require.cache[require.resolve(`./commands/${file}`)];
                    let pull = new (require(`./commands/${file}`).default)();
                    this.commands.set(pull.name, pull);
                    pull.aliases.forEach((alias: string) => this.aliases.set(alias, pull));
                } catch (e) { console.log(e); }
            });
        });
    }
}

export const bot: Bot = new Bot(new Config());