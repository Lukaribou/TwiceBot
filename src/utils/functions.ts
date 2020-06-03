import { writeFile } from "fs"

/**
 * Sauvegarde la base de données donnée
 * @param {string} dbname Le nom de la base de données (sans le json)
 */
export function saveDB(dbname: string): void {
    writeFile(`database/${dbname}.json`, JSON.stringify(require(`../../database/${dbname}.json`), null, 4), (err) => {
        if (err) console.log(err);
    });
};

/**
 * Renvoie un nombre aléatoire entre min et max
 * @param min La valeur minimale
 * @param max La valeur maximale
 */
export function random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};