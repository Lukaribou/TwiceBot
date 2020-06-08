import { Command, CommandParams, twiceInfosdb } from "../utils/structs";
import { MessageEmbed, MessageAttachment } from "discord.js";
import { commaAllThe3 } from "../utils/functions";

export default class GroupCommand extends Command {
    name = 'group';
    desc = 'Prints information about the Twice group.';
    usage = 'group';
    categorie = 'Twice';
    aliases = ['band', 'twice']
    cooldown = 1.5e4

    async execute(args: CommandParams): Promise<void> {
        const groupImg = new MessageAttachment("res/group.jpg", 'group.jpg');
        const twiceLogo = new MessageAttachment("res/logo.png", 'logo.png')
        const jypeLogo = new MessageAttachment("res/jypeLogo.jpg", 'jypeLogo.jpg')

        const groupSpotifyInfos = await args.bot.spotifyApi.getTwiceChannel().catch();

        args.message.channel.send({
            embed: new MessageEmbed()
                .setAuthor('Information about Twice', 'attachment://logo.png', 'https://twice.jype.com/')
                .setImage('attachment://group.jpg')
                .setThumbnail(groupSpotifyInfos.images.shift().url)
                .setColor("#ff5fa2")
                .setDescription('`TWICE` (`트와이스`) is a korean girl group consisting of `9` members (from oldest to youngest): `' + twiceInfosdb.group.members.join('`, `') + '`')
                .addField('Start:', '`October 20, 2015` (through the survival show `Sixteen`)', true)
                .addField('Official colors:', '`Apricot` (`#FCC89B`) & `Neon Magenta` (`#FF5FA2`)', true)
                .addField('Fandom name:', '`Once`', true)
                .addField('Labels:', '`JYP Entertainment`, `Warner Music Japan`, `Republic Records`', true)
<<<<<<< Updated upstream
                .addField('\u200b', '**__Spotify informations:__**')
                .addField('Followers:', `\`${commaAllThe3(groupSpotifyInfos.followers.total)}\``, true)
                .addField('Popularity:', `\`${groupSpotifyInfos.popularity}\`/100 ([*Scroll to "popularity"*](https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-full))`, true)
                .addField('Most played on USA (South Korea isn\'t available)', `\`${(await args.bot.spotifyApi.getTwiceTopTracks().catch()).slice(0, 5).map((music, index) => `${++index} - ${music.name}`).join('`\n`')}\``, true)
=======
<<<<<<< Updated upstream
=======
                .addField('\u200b', '**__Spotify informations:__**')
                .addField('Followers:', `\`${commaAllThe3(groupSpotifyInfos.followers.total)}\``, true)
                .addField('Popularity:', `\`${groupSpotifyInfos.popularity}\`/100 ([*Scroll to "popularity"*](https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-full))`, true)
                .addField('Most played in USA (South Korea isn\'t available)', `\`${(await args.bot.spotifyApi.getTwiceTopTracks().catch()).slice(0, 5).map((music, index) => `${++index} - ${music.name}`).join('`\n`')}\``, true)
>>>>>>> Stashed changes
>>>>>>> Stashed changes
                .setFooter('NaJeongMoSaJiMiDaChaeTzu', 'attachment://jypeLogo.jpg'),
            files: [groupImg, twiceLogo, jypeLogo]
        });
    }
}