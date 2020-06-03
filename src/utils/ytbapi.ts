import { google, youtube_v3 } from 'googleapis';

export interface IConfigYTBAPI {
    accessToken: string
};

export default class YTBAPI {
    private _data: IConfigYTBAPI = null;

    constructor(ytbKey: string) {
        this._data = {
            accessToken: ytbKey
        };
    };

    public async searchSongs(song: string, maxResults: number = 10): Promise<youtube_v3.Schema$SearchResult[]> {
        return new Promise((resolve, reject) => {
            google.youtube('v3').search.list({
                key: this._data.accessToken,
                part: ['snippet'],
                q: song,
                maxResults: maxResults
            })
            .then(res => {resolve(res.data.items); console.log(res)})
            .catch((err) => reject(err));
        });
    };

    public async searchSong(song: string) {
        let temp = await this.searchSongs(song, 1)[0];
        return temp
    };

    public getYtbAPIData(): IConfigYTBAPI {
        return this._data;
    };
};