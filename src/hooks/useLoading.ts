import { useRef, useState } from "react";

export default function useLoading(delay: number = 200) {
    const ref = useRef<NodeJS.Timeout | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function startLoading() {
        if (ref.current) {
            return;
        }
        ref.current = setTimeout(() => {
            setLoading(true);
        }, delay);
    }

    function stopLoading() {
        if (ref.current) {
            clearTimeout(ref.current);
            ref.current = null;
            setLoading(false);
        }
    }

    return {
        loading,
        startLoading,
        stopLoading
    }
}
