import { APIResponse } from "@/types/api";
import { Episode } from "@/types/episode";
import { env } from "process";

const EPISODE_URL = `${env.BASE_URL}/episode`;

export function getEpisodes(link?: string): Promise<APIResponse<Episode>> {
    let url = EPISODE_URL;
    if (link !== undefined) {
        url = link;
    }
    return fetch(url).then(data => {
        if (!data.ok) {
            throw new Error('API [getEpisode] has error');
        }
        return data.json();
    });
}