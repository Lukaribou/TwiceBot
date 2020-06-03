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

    public async searchSong(song: string): Promise<youtube_v3.Schema$SearchResult> {
        var toReturn: youtube_v3.Schema$SearchResult = null;
        google.youtube('v3').search.list({
            key: this._data.accessToken,
            q: song,
            maxResults: 1
        })
        .then(({data}) => toReturn = data.items[0])
        .catch((err) => console.log(err));
        return toReturn;
    };

    public getYtbAPIData(): IConfigYTBAPI {
        return this._data;
    };
};