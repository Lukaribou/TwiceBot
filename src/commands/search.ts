import { Command, CommandParams } from "../utils/structs";
import { youtube_v3 } from "googleapis";
import { MessageEmbed } from "discord.js";
import { getVideoURL, ISO8601ToTime, commaAllThe3, getChannelURL } from "../utils/functions";

export default class SearchCommand extends Command {
    name = 'search';
    desc = 'Search a Twice song on YouTube and display informations about it';
    usage = 'search <title (don\'t put "Twice" before)>';
    categorie = 'Twice';

    async execute(args: CommandParams): Promise<void> {
        var song: youtube_v3.Schema$Video = await args.bot.ytbAPI.searchSong(['twice', ...args.args].join(' '));
        args.message.channel.send(new MessageEmbed()
            .setAuthor(`${song.snippet.title.replace(/&quot;/g, '"')} ⬅️ Click to go !`, song.snippet.thumbnails.default.url, getVideoURL(song.id))
            .setThumbnail(song.snippet.thumbnails.high ? song.snippet.thumbnails.high.url : song.snippet.thumbnails.default.url)
            .addField('🕐 Duration:', ISO8601ToTime(song.contentDetails.duration), true)
            .addField('📅 Published at:', new Date(song.snippet.publishedAt).toUTCString(), true)
            .addField('💿 Published by:', `[${song.snippet.channelTitle}](${getChannelURL(song.snippet.channelId)})`, true)
            .addField('📊 Statistics:', `👁️ Views: \`${commaAllThe3(song.statistics.viewCount)}\`\n👍 Likes: \`${commaAllThe3(song.statistics.likeCount)}\`\n👎 Dislikes: \`${commaAllThe3(song.statistics.dislikeCount)}\`\n📝 Comments: \`${commaAllThe3(song.statistics.commentCount)}\``, true));
    }
}