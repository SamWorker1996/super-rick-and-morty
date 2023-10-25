import { APIResponse } from "@/types/api";
import { Character } from "@/types/character";
import { env } from "process";

const CHARACTER_URL = `${env.BASE_URL}/character`;

export function getCharacters(page?: number): Promise<APIResponse<Character>> {
    let url = CHARACTER_URL;
    if (page !== undefined) {
        url += `?page=${page}`;
    }
    return fetch(url).then(data => {
        if (!data.ok) {
            throw new Error('API [getCharacter] has error');
        }
        return data.json();
    });
}

export function getCharactersByLink(url: string): Promise<Character> {
    return fetch(url).then(data => {
        if (!data.ok) {
            throw new Error('API [getCharacterByLink] has error');
        }
        return data.json();
    })
}