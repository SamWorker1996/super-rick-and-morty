import { FC, HTMLProps, PropsWithChildren, useState } from "react";
import { Character } from "@/types/character";
import CharacterItem from "./CharacterItem";
import classNames from "classnames";

interface ICharacterPanelProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
    characters: Character[]
}

const CharacterGrid: FC<ICharacterPanelProps> = ({ characters, className, ...props }) => {
    return <section className={classNames("grid grid-cols-5 gap-10 mx-10", className)} {...props}>
        {
            characters.map(char =>
                <CharacterItem
                    className="w-full over:border hover:transition-transform transform transition-transform duration-500 hover:scale-110"
                    character={char}
                    key={char.id}
                />
            )
        }
    </section>
}

export default CharacterGrid;