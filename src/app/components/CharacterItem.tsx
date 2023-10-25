import { HTMLProps, PropsWithChildren } from "react";

import cn from 'classnames';
import { Character } from "@/types/character";

const CharacterItem: React.FC<PropsWithChildren<HTMLProps<HTMLElement> & {
    character: Pick<Character, 'name' | 'image'>
}>> = ({ character, className }) => {
    return (
        <div className={cn(className, "items-center")}>
            <img className="rounded-2xl w-full border border-solid border-white-800 shadow-lg" src={character.image} alt={character.name} />
            <h2 className="text-center py-1">{character.name}</h2>
        </div>
    );
}


export default CharacterItem;
