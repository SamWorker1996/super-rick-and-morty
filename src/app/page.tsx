import { getCharacters } from "@/api/getCharacters";
import { getEpisodes } from "@/api/getEpisodes";
import SeriesViewer from "./SeriesViewer";

/**
 * This
 * @returns 
 */
export default async function Home() {

  const firstPageCharacters = await getCharacters();
  const firstPageEpisode = await getEpisodes();

  return (
    <main className="sm:mx-0 md:mx-8">
      <h1 className="text-center text-4xl my-10 font-bold font-mono">
        Rick And Morty Characters
      </h1>
      <SeriesViewer initCharactersData={firstPageCharacters} initEpisodesData={firstPageEpisode} />
    </main>
  )
}
