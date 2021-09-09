import React, { useRef, useEffect, useState } from 'react';

export const useResizeObserver = (ref: any) => {
    const [dimensions, setDimensions] = useState<any>(null);
    useEffect(() => {
        const observerTarget = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach((entry: any) => {
                setDimensions(entry.contentRect)
            })
        })
        resizeObserver.observe(observerTarget)

        return () => {
            resizeObserver.unobserve(observerTarget)
        }

    }, [ref])
    return dimensions
}