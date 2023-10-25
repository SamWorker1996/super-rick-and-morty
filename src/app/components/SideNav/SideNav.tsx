"use client"

/**
 * Side Navigation should render episode list
 * - infinity scrolling and auto fetch
 */
import { Episode } from "@/types/episode";
import { FC, HTMLProps, MouseEvent, PropsWithChildren, useEffect, useRef } from "react";
import SideNavItem from "./SideNavItem";

interface SideNavProps extends PropsWithChildren<HTMLProps<HTMLElement>> {
    episodes: Episode[],
    selectedId: Episode['id'],
    onSelectEpisode: (episode: Episode) => void,
    onReachBottom: () => void
}

/**
 * 
 */
const SideNav: FC<SideNavProps> = ({ episodes, onSelectEpisode, selectedId, onReachBottom }) => {

    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {

        const handleScroll = () => {
            if (!navRef.current)
                return;
            const { scrollTop, scrollHeight, clientHeight } = navRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                onReachBottom();
            }
        };

        if (!navRef.current)
            return;
        navRef.current.addEventListener('scroll', handleScroll);
        return () => {
            if (!navRef.current)
                return;
            navRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [onReachBottom]);

    return (
        <nav ref={navRef} className="rounded-3xl border border-gray-50 px-10 h-full overflow-y-auto overflow-x-hidden">
            <div className="sticky top-0" style={{ background: 'lightslategray' }}>
                <h2 className="text-xl pl-7 pt-10">Episodes</h2>
                <hr />
            </div>
            <ul>
                {episodes.map(episode => (
                    <SideNavItem key={episode.id} active={selectedId === episode.id}>
                        <a onClick={() => onSelectEpisode(episode)}>{episode.name}</a>
                    </SideNavItem>
                ))}
            </ul>
        </nav>
    )
}

export default SideNav;