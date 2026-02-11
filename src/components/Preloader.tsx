"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function Preloader() {
    const [hidden, setHidden] = useState(false);
    const [removed, setRemoved] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p5InstanceRef = useRef<any>(null);
    const startTimeRef = useRef<number>(0);

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

    useEffect(() => {
        const duration = 1800;
        startTimeRef.current = performance.now();

        const hidePreloader = () => {
            const elapsed = performance.now() - startTimeRef.current;
            const delay = Math.max(0, duration - elapsed + 500);

            setTimeout(() => {
                if (p5InstanceRef.current) {
                    p5InstanceRef.current.remove();
                    p5InstanceRef.current = null;
                }
                setHidden(true);
                setTimeout(() => {
                    setRemoved(true);
                    document.body.style.overflow = "";
                }, 800);
            }, delay);
        };

        document.body.style.overflow = "hidden";

        if (document.readyState === "complete") {
            hidePreloader();
        } else {
            window.addEventListener("load", hidePreloader);
            return () => window.removeEventListener("load", hidePreloader);
        }
    }, []);

    if (removed) return null;

    return (
        <div className={`preloader ${hidden ? "preloader--hidden" : ""}`}>
            <div ref={containerRef} className="preloader__canvas" />
        </div>
    );
}
