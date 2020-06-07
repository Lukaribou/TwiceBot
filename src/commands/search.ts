import { Command, CommandParams, EMOJIS } from "../utils/structs";
import { youtube_v3 } from "googleapis";
import { MessageEmbed } from "discord.js";
import { getVideoURL, ISO8601ToTime, commaAllThe3, getChannelURL, msToTime } from "../utils/functions";
import { ChannelIDNotMatchError } from "../utils/spotifyAPI";

export default class SearchCommand extends Command {
    name = 'search';
    desc = 'Search a Twice song on YouTube and display information about it.';
    usage = 'search <title (don\'t put "Twice" before)>';
    categorie = 'Twice';

    async execute(args: CommandParams): Promise<void> {
        if (!args.args[0]) { args.message.channel.send(`${EMOJIS.X} **You need to provide at least one word of the song that you search !**`); return; }
        /*var song: youtube_v3.Schema$Video = await args.bot.ytbAPI.searchSong(['twice', ...args.args].join(' '));
        args.message.channel.send(new MessageEmbed()
            .setAuthor(`${song.snippet.title.replace(/&quot;/g, '"')} ⬅️ Click to go !`, song.snippet.thumbnails.default.url, getVideoURL(song.id))
            .setThumbnail(song.snippet.thumbnails.high ? song.snippet.thumbnails.high.url : song.snippet.thumbnails.default.url)
            .addField('🕐 Duration:', ISO8601ToTime(song.contentDetails.duration), true)
            .addField('📅 Published at:', new Date(song.snippet.publishedAt).toUTCString(), true)
            .addField('💿 Published by:', `[${song.snippet.channelTitle}](${getChannelURL(song.snippet.channelId)})`, true)
            .addField('📊 Statistics:', `👁️ Views: \`${commaAllThe3(song.statistics.viewCount)}\`\n👍 Likes: \`${commaAllThe3(song.statistics.likeCount)}\`\n👎 Dislikes: \`${commaAllThe3(song.statistics.dislikeCount)}\`\n📝 Comments: \`${commaAllThe3(song.statistics.commentCount)}\``, true)
            .setFooter(`Search for: "twice ${args.args.join(' ')}"`, args.bot.user.avatarURL()));
        */

        const e = (s: string) => `\`${s}\``; // Mettre entre ``

        console.log(await args.bot.spotifyApi.getTwiceChannel())

        args.bot.spotifyApi.getTwiceSong(args.args.join(' '))
            .then((song) =>
                args.message.channel.send(new MessageEmbed()
                    .setAuthor(`Twice "${song.name}" ⬅️ Click to open in Spotify !`, "https://lh3.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM", song.external_urls.spotify)
                    .setThumbnail(song.album.images.shift().url)
                    .addField('💿 Album:', e(song.album.name), true)
                    .addField('🕐 Duration:', e(msToTime(song.duration_ms)), true)
                    .addField('📅 Published on:', e(song.album.release_date), true)
                    .addField('⭐ Popularity:', `${e(song.popularity.toString())} ([Scroll to "popularity"](https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full))`, true)
                    .setFooter(`Search for: "twice ${args.args.join(' ')}"`, args.bot.user.avatarURL())))
            .catch((err) => args.message.channel.send(`${EMOJIS.X} **Error:** \`${err}\` *(Your search: twice ${args.args.join(' ')})*`));
    }
}