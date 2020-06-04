import { google, youtube_v3 } from 'googleapis';
import * as superagent from 'superagent'

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

export interface IConfigYTBAPI {
    accessToken: string,
    youtube: youtube_v3.Youtube
}

export default class YTBAPI {
    private _data: IConfigYTBAPI = null;

    constructor(ytbKey: string) {
        this._data = {
            accessToken: ytbKey,
            youtube: google.youtube({
                version: 'v3',
                auth: ytbKey
            })
        };
    }

    public async getVideosId(videoName: string, maxResults: number = 1): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this._data.youtube.search.list({
                part: ['snippet'],
                q: videoName,
                maxResults: maxResults
            })
                .then(res => resolve(res.data.items.map(v => v.id.videoId)))
                .catch((err) => reject(err));
        });
    }

    public async searchSong(song: string): Promise<youtube_v3.Schema$Video> {
        return new Promise(async (resolve, reject) => {
            this._data.youtube.videos.list({
                part: ['snippet,statistics,contentDetails'],
                id: (await this.getVideosId(song))
            }, (err, res) => {
                if (err) reject(err);
                resolve(res.data.items.shift());
            })
        })
    }

    public getYtbAPIData(): IConfigYTBAPI {
        return this._data;
    }
}