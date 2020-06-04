import { google, youtube_v3 } from 'googleapis';

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

    public async getVideosId(videoName: string, maxResults: number = 1): Promise<youtube_v3.Schema$SearchResult[]> {
        return new Promise((resolve, reject) => {
            this._data.youtube.search.list({
                part: ['snippet'],
                q: videoName,
                maxResults: maxResults
            })
                .then(res => resolve(res.data.items))
                .catch((err) => reject(err));
        });
    }

    public async searchSong(song: string): Promise<youtube_v3.Schema$Video> {
        return new Promise(async (resolve, reject) => {
            this._data.youtube.videos.list({
                part: ['snippet,statistics,contentDetails'],
                id: [...(await this.getVideosId(song)).shift().id.videoId]
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