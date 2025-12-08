"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p5Ref = useRef<any>(null);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        let cancelled = false;

        // Lock body scroll while preloader is visible
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        let hideTimeout: ReturnType<typeof setTimeout> | undefined;
        let fadeTimeout: ReturnType<typeof setTimeout> | undefined;

        const cleanup = () => {
            if (p5Ref.current) {
                p5Ref.current.remove();
                p5Ref.current = null;
            }
            document.body.style.overflow = prevOverflow;
        };

        const hide = () => {
            if (cancelled) return;
            const el = containerRef.current;
            if (!el) return;
            el.classList.add("preloader--hidden");
            // After CSS fade-out transition, remove from DOM
            fadeTimeout = setTimeout(() => {
                cleanup();
                setRemoved(true);
            }, 550);
        };

        // Start p5 sketch
        import("p5").then((mod) => {
            if (cancelled || !containerRef.current) return;
            const p5Constructor = mod.default;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const sketch = (p: any) => {
                const points: { x: number; y: number; z: number }[] = [];
                let angle = 0;
                const dt = 0.01;
                const a = 10;
                const b = 28;
                const c = 8 / 3;

                const stepAttractor = () => {
                    const last = points[points.length - 1];
                    const dx = a * (last.y - last.x) * dt;
                    const dy = (last.x * (b - last.z) - last.y) * dt;
                    const dz = (last.x * last.y - c * last.z) * dt;
                    points.push({ x: last.x + dx, y: last.y + dy, z: last.z + dz });
                };

                p.setup = () => {
                    const canvas = p.createCanvas(
                        p.windowWidth,
                        p.windowHeight,
                        p.WEBGL
                    );
                    canvas.parent(containerRef.current!);
                    p.pixelDensity(Math.min(2, window.devicePixelRatio));
                    p.colorMode(p.HSB);
                    p.noFill();

                    // Pre-seed 2000 points so trail is visible from frame 1
                    points.push({ x: 0.01, y: 0, z: 0 });
                    for (let i = 0; i < 2000; i++) {
                        stepAttractor();
                    }
                };

                p.draw = () => {
                    p.background(0);
                    p.rotateY(angle);
                    angle += 0.002;

                    // Add 5 new points per frame for smooth growth
                    for (let i = 0; i < 5; i++) {
                        stepAttractor();
                    }

                    if (points.length > 6000) {
                        points.splice(0, 5);
                    }

                    const s = 5;
                    p.strokeWeight(1);
                    p.beginShape();
                    for (let i = 0; i < points.length; i++) {
                        const pt = points[i];
                        const hu = p.map(i, 0, points.length, 0, 255);
                        p.stroke(hu, 255, 255, 180);
                        p.vertex(pt.x * s, pt.y * s, pt.z * s);
                    }
                    p.endShape();
                };

                p.windowResized = () => {
                    p.resizeCanvas(p.windowWidth, p.windowHeight);
                };
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const instance = new (p5Constructor as any)(sketch);
            p5Ref.current = instance;

            // Always show for 2 seconds, then fade out
            hideTimeout = setTimeout(hide, 2000);
        });

        return () => {
            cancelled = true;
            clearTimeout(hideTimeout);
            clearTimeout(fadeTimeout);
            cleanup();
        };
    }, []);

    if (removed) return null;

    return <div ref={containerRef} className="preloader preloader__canvas" />;
}
