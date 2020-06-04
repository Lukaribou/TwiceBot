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

    /**
     * Renvoie les identifiants des premières vidéos trouvées avec le nom
     * @param videoName Le nom de ce qui doit être cherché
     * @param maxResults Nombre de résultats à renvoyer (default à 1)
     */
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

    /**
     * Renvoie les informations suivantes sur la vidéo: snippet, statistics, fileDetails
     * @param song Titre de la musique
     */
    public async searchSong(song: string, alreadyVideoId: boolean = false): Promise<youtube_v3.Schema$Video> {
        return new Promise(async (resolve, reject) => {
            this._data.youtube.videos.list({
                part: ['snippet,statistics,contentDetails'],
                id: alreadyVideoId ? [song] : [(await this.getVideosId(song)).shift().id.videoId]
            }, (err, res) => {
                if (err) reject(err);
                resolve(res.data.items.shift());
            });
        });
    }

    /**
     * Renvoie la propriété _data de l'instance en cours
     */
    public getYtbAPIData(): IConfigYTBAPI {
        return this._data;
    }
}