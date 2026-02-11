"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { getPreloadAssets, getPreloadSessionKey } from "@/lib/preloadAssets";

const PRELOAD_CONCURRENCY = 6;
const PRELOADER_FADE_MS = 800;
const PRELOADER_MIN_VISIBLE_MS = 2500;

const wait = (ms: number) =>
    new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
    });

const preloadImageAsset = (src: string): Promise<void> =>
    new Promise((resolve) => {
        const image = new window.Image();
        let settled = false;

        const finish = () => {
            if (settled) return;
            settled = true;
            image.onload = null;
            image.onerror = null;
            resolve();
        };

        image.decoding = "async";
        image.onload = () => {
            if (typeof image.decode === "function") {
                image.decode().catch(() => undefined).finally(finish);
                return;
            }
            finish();
        };
        image.onerror = finish;
        image.src = src;

        if (image.complete) {
            if (typeof image.decode === "function") {
                image.decode().catch(() => undefined).finally(finish);
                return;
            }
            finish();
        }
    });

async function preloadAssets(
    assets: string[],
): Promise<void> {
    if (assets.length === 0) return;

    let nextIndex = 0;

    const worker = async () => {
        while (nextIndex < assets.length) {
            const assetIndex = nextIndex;
            nextIndex += 1;
            await preloadImageAsset(assets[assetIndex]);
        }
    };

    const workerCount = Math.min(PRELOAD_CONCURRENCY, assets.length);
    await Promise.all(
        Array.from({ length: workerCount }, () => worker()),
    );
}

export default function Preloader() {
    const [hidden, setHidden] = useState(false);
    const [removed, setRemoved] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p5InstanceRef = useRef<any>(null);
    const hasDismissedRef = useRef(false);
    const preloadAssetsList = useMemo(() => getPreloadAssets(), []);
    const preloadSessionKey = useMemo(
        () => getPreloadSessionKey(preloadAssetsList),
        [preloadAssetsList],
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sketch = useCallback((p: any) => {
        let t = 0;
        const a = 9;
        const b = 28;
        const c = 2;
        const w = 400;

        p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.style("display", "block");
        };

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        p.draw = () => {
            t += 2;
            p.background(9);

            p.push();
            p.translate(p.width / 2, p.height / 2);

            const scale = (Math.min(p.width, p.height) / w) * 0.8;
            p.scale(scale);
            p.translate(0, 125);

            let x = 0.1,
                y = 0.1,
                z = 0.1;

            for (let i = 15000; i > 0; i--) {
                const dx = (y - x) * a;
                const dy = (b - z) * x - y;
                const dz = x * y - c * z;

                x += dx * 0.001;
                y += dy * 0.001;
                z += dz * 0.001;

                const s = (i + t) % 540 !== 0 ? 1 : 5;

                p.strokeWeight(s / scale);
                p.stroke(255, s * 96);

                const px =
                    (x + y) *
                    (p.sin((t * p.PI) / 90 + z / 49 + (x * x) / w) * 2 + 2);
                const py = -z * 5;

                p.point(px, py);
            }
            p.pop();
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current || p5InstanceRef.current) return;

        import("p5").then((p5Module) => {
            const p5 = p5Module.default;
            if (!containerRef.current) return;
            p5InstanceRef.current = new p5(sketch, containerRef.current);
        });

        return () => {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
                p5InstanceRef.current = null;
            }
        };
    }, [sketch]);

    const dismissPreloader = useCallback(() => {
        if (hasDismissedRef.current) return;
        hasDismissedRef.current = true;

        if (p5InstanceRef.current) {
            p5InstanceRef.current.remove();
            p5InstanceRef.current = null;
        }

        setHidden(true);
        window.setTimeout(() => {
            setRemoved(true);
            document.body.style.overflow = "";
        }, PRELOADER_FADE_MS);
    }, []);

    useEffect(() => {
        let cancelled = false;
        document.body.style.overflow = "hidden";

        const runPreload = async () => {
            const startedAt = performance.now();
            let alreadyPreloaded = false;
            try {
                alreadyPreloaded = sessionStorage.getItem(preloadSessionKey) === "1";
            } catch {
                alreadyPreloaded = false;
            }

            if (!alreadyPreloaded) {
                await preloadAssets(preloadAssetsList);

                if (!cancelled) {
                    try {
                        sessionStorage.setItem(preloadSessionKey, "1");
                    } catch {
                        // Ignore storage write failures; preload still completed.
                    }
                }
            }

            const elapsed = performance.now() - startedAt;
            if (elapsed < PRELOADER_MIN_VISIBLE_MS) {
                await wait(PRELOADER_MIN_VISIBLE_MS - elapsed);
            }

            if (!cancelled) {
                dismissPreloader();
            }
        };

        runPreload().catch(() => {
            if (!cancelled) {
                dismissPreloader();
            }
        });

        return () => {
            cancelled = true;
            document.body.style.overflow = "";
        };
    }, [dismissPreloader, preloadAssetsList, preloadSessionKey]);

    if (removed) return null;

    return (
        <div className={`preloader ${hidden ? "preloader--hidden" : ""}`}>
            <div ref={containerRef} className="preloader__canvas" />
        </div>
    );
}
