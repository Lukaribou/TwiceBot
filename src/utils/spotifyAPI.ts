import SpotifyWebApi = require('spotify-web-api-node');

export default class SpotifyAPI {
    private _data = {
        twiceChannelId: undefined,
    };
    private _spotifyWebApi: SpotifyWebApi;

    constructor(cId: string, cSecret: string) {
        this._spotifyWebApi = new SpotifyWebApi({
            clientId: cId,
            clientSecret: cSecret
        });

        this.config();
    };

    private async config(): Promise<void> {
        this._spotifyWebApi.setAccessToken(await this.getAccessToken());
        this._data.twiceChannelId = await this.getTwiceChannelId();
    }

    private getAccessToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            this._spotifyWebApi.clientCredentialsGrant()
                .then((data) => resolve(data.body.access_token))
                .catch((err) => reject(err));
        });
    }

    private getTwiceChannelId(): Promise<string> {
        return new Promise((resolve, reject) => {
            this._spotifyWebApi.searchArtists('Twice')
                .then((data) => resolve(data.body.artists.items.shift().id))
                .catch((err) => reject(err))
        });
    }

    public getTwiceChannel(): Promise<SpotifyApi.SingleArtistResponse> {
        return new Promise((resolve, reject) => {
            this._spotifyWebApi.getArtist(this._data.twiceChannelId)
                .then((data) => resolve(data.body))
                .catch((err) => reject(err));
        });
    }

    public getTwiceSong(song: string): Promise<SpotifyApi.TrackObjectFull> {
        return new Promise((resolve, reject) => {
            this._spotifyWebApi.searchTracks(`track:${song} artist:Twice`, { limit: 1, offset: 0 })
                .then((data) => data.body.tracks.items[0].artists[0].id == this._data.twiceChannelId ? resolve(data.body.tracks.items.shift()) : reject(new ChannelIDNotMatchError("The id of the artist in the search result doesn't match the id of Twice !")))
                .catch((err) => reject(err));
        });
    }
}

export class ChannelIDNotMatchError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ChannelIDNotMatchError';
    };
}