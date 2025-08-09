

import { useEffect, useRef } from 'react';

interface ClickOutsideRef {
    current: HTMLElement | null;
}

type ClickOutsideCallback = () => void;

export function useClickOutside(
    ref: ClickOutsideRef,
    callback: ClickOutsideCallback
): void {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}