"use client"

import { APIResponse, PageInfo } from "@/types/api"
import { Character } from "@/types/character"
import { Episode } from "@/types/episode"
import CharacterGrid from "./components/CharacterGrid"
import { SideNav } from "./components/SideNav"
import { useState } from "react"
import { getCharactersByLink } from "@/api/getCharacters"
import { getEpisodes } from "@/api/getEpisodes"
import useLoading from "@/hooks/useLoading"

interface ModelProps {
    initEpisodesData: APIResponse<Episode>,
    initCharactersData: APIResponse<Character>
}

export default function SeriesViewer({ initCharactersData, initEpisodesData }: ModelProps) {

    const { loading, startLoading, stopLoading } = useLoading();

    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>(initEpisodesData.results);
    const [characters, setCharacters] = useState<Character[]>(initCharactersData.results);

    const onSelectEpisode = async (episode: Episode) => {
        startLoading();
        let nextEpisode = null;
        let nextCharacters = initCharactersData.results;
        if (episode !== selectedEpisode) {
            nextEpisode = episode;
            nextCharacters = await Promise.all(episode.characters.map(link => getCharactersByLink(link)));
        }
        setSelectedEpisode(nextEpisode);
        setCharacters(nextCharacters);
        stopLoading();
    }

    const [nextEpisodeLink, setNextEpisodeLink] = useState<PageInfo['next']>(initEpisodesData.info.next);
    const onReachBottom = async () => {
        if (nextEpisodeLink) {
            startLoading();
            const { info, results } = await getEpisodes(nextEpisodeLink);
            setEpisodes(pre => [...pre, ...results]);
            setNextEpisodeLink(info.next);
            console.log(info.next);
            stopLoading();
        }
    }

    return (
        <div className="flex" style={{ height: 'calc(100vh - 10rem)' }}>
            {
                loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 backdrop-blur-md ">
                        <div className="p-10 rounded-lg">
                            <h1 className="text-white">Loading...</h1>
                        </div>
                    </div>
                )
            }
            <div className="sm:w-2/12">
                <SideNav
                    episodes={episodes}
                    onSelectEpisode={onSelectEpisode}
                    selectedId={selectedEpisode?.id || -1}
                    onReachBottom={onReachBottom}
                />
            </div>
            <div className="sm:w-10/12 overflow-y-auto overflow-x-hidden">
                <CharacterGrid characters={characters} />
            </div>
        </div>
    )
}