"use client";

import { useRef, useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

const COMPACT_QUERY = "(max-width: 768px)";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

// Lerp utility for smooth animations
const lerp = (start: number, end: number, factor: number): number => start + (end - start) * factor;

export default function OrbitCarousel() {
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const trackRotationRef = useRef(0);
  const rotationVelocityRef = useRef(0);
  const rotationRafRef = useRef<number | null>(null);
  const parallaxLoopRafRef = useRef<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(COMPACT_QUERY).matches;
  });
  const [hasFinePointer, setHasFinePointer] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(FINE_POINTER_QUERY).matches;
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Parallax state with refs for smooth animation
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const parallaxCardRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const projects = personalInfo.projects;
  const projectCount = projects.length;
  const degreesPerProject = 360 / projectCount;
  const maxRotationVelocity = 3.2;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compactQuery = window.matchMedia(COMPACT_QUERY);
    const pointerQuery = window.matchMedia(FINE_POINTER_QUERY);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncFlags = () => {
      setIsCompactLayout(compactQuery.matches);
      setHasFinePointer(pointerQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    syncFlags();

    compactQuery.addEventListener("change", syncFlags);
    pointerQuery.addEventListener("change", syncFlags);
    motionQuery.addEventListener("change", syncFlags);

    return () => {
      compactQuery.removeEventListener("change", syncFlags);
      pointerQuery.removeEventListener("change", syncFlags);
      motionQuery.removeEventListener("change", syncFlags);
    };
  }, []);

  useEffect(() => {
    if (isCompactLayout || !hasFinePointer) {
      setShowDetails(false);
    }
  }, [isCompactLayout, hasFinePointer]);

  useEffect(() => {
    const animateRotation = () => {
      // Apply friction
      rotationVelocityRef.current *= 0.95;

      // Update rotation
      trackRotationRef.current = (trackRotationRef.current + rotationVelocityRef.current) % 360;
      if (trackRotationRef.current < 0) trackRotationRef.current += 360;

      // Apply to carousel track element (GPU-accelerated)
      if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transform = `translateZ(0) rotateY(${trackRotationRef.current}deg)`;
      }

      // Calculate active index based on rotation
      const normalizedRotation = ((trackRotationRef.current % 360) + 360) % 360;
      const index = Math.round(normalizedRotation / degreesPerProject) % projectCount;
      setActiveProjectIndex((projectCount - index) % projectCount);

      rotationRafRef.current = requestAnimationFrame(animateRotation);
    };

    rotationRafRef.current = requestAnimationFrame(animateRotation);

    const onWheel = (event: WheelEvent) => {
      if (!hasFinePointer) return;
      if (!carouselContainerRef.current?.closest(".orbit-page")) return;

      const delta = event.deltaY || event.deltaX;
      rotationVelocityRef.current += (delta > 0 ? 1 : -1) * 0.15;
      rotationVelocityRef.current = Math.max(-maxRotationVelocity, Math.min(maxRotationVelocity, rotationVelocityRef.current));
      event.preventDefault();
    };

    // Touch handlers for mobile / coarse pointer
    let touchStartY: number | null = null;

    const onTouchStart = (event: TouchEvent) => {
      if (hasFinePointer) return;
      if (!carouselContainerRef.current?.closest(".orbit-page")) return;
      touchStartY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (hasFinePointer) return;
      if (!carouselContainerRef.current?.closest(".orbit-page") || touchStartY === null) return;

      const dy = event.touches[0].clientY - touchStartY;
      rotationVelocityRef.current += -dy * 0.012;
      rotationVelocityRef.current = Math.max(-maxRotationVelocity, Math.min(maxRotationVelocity, rotationVelocityRef.current));
      touchStartY = event.touches[0].clientY;
      event.preventDefault();
    };

    const onTouchEnd = () => {
      touchStartY = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (rotationRafRef.current) cancelAnimationFrame(rotationRafRef.current);
      } else {
        rotationRafRef.current = requestAnimationFrame(animateRotation);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (rotationRafRef.current) cancelAnimationFrame(rotationRafRef.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [degreesPerProject, projectCount, maxRotationVelocity, hasFinePointer]);

  // Mouse tracking for custom cursor + parallax
  const onMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!hasFinePointer || prefersReducedMotion || !carouselContainerRef.current) return;

    const rect = carouselContainerRef.current.getBoundingClientRect();
    const cx = (event.clientX - rect.left) / rect.width;
    const cy = (event.clientY - rect.top) / rect.height;
    mouseTargetRef.current.x = (cx - 0.5) * 2;
    mouseTargetRef.current.y = (cy - 0.5) * 2;
  };

  // Parallax animation loop (separate from rotation for independence)
  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer) return;

    const animateParallaxLoop = () => {
      mouseCurrentRef.current.x = lerp(mouseCurrentRef.current.x, mouseTargetRef.current.x, 0.08);
      mouseCurrentRef.current.y = lerp(mouseCurrentRef.current.y, mouseTargetRef.current.y, 0.08);

      parallaxCardRefs.current.forEach((parallaxCardElement, cardIndex) => {
        if (!parallaxCardElement) return;
        const depth = (cardIndex + 1) / projectCount;
        const tx = mouseCurrentRef.current.x * 12 * depth;
        const ty = mouseCurrentRef.current.y * 8 * depth;
        const rx = mouseCurrentRef.current.y * 4 * depth;
        const ry = mouseCurrentRef.current.x * -4 * depth;

        parallaxCardElement.style.setProperty("--parallax-x", `${tx}px`);
        parallaxCardElement.style.setProperty("--parallax-y", `${ty}px`);
        parallaxCardElement.style.setProperty("--parallax-rx", `${rx}deg`);
        parallaxCardElement.style.setProperty("--parallax-ry", `${ry}deg`);
      });

      parallaxLoopRafRef.current = requestAnimationFrame(animateParallaxLoop);
    };

    parallaxLoopRafRef.current = requestAnimationFrame(animateParallaxLoop);

    return () => {
      if (parallaxLoopRafRef.current) cancelAnimationFrame(parallaxLoopRafRef.current);
    };
  }, [prefersReducedMotion, hasFinePointer, projectCount]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;
    let settleTimeoutId: number | null = null;

    const fitTitleToPanel = () => {
      const titleElement = titleRef.current;
      if (!titleElement) return;

      const minScale = 0.68;
      const step = 0.04;
      let scale = 1;

      titleElement.style.setProperty("--orbit-title-scale", scale.toFixed(2));

      while (
        (titleElement.scrollHeight > titleElement.clientHeight + 1 ||
          titleElement.scrollWidth > titleElement.clientWidth + 1) &&
        scale > minScale
      ) {
        scale = Math.max(minScale, scale - step);
        titleElement.style.setProperty("--orbit-title-scale", scale.toFixed(2));
      }
    };

    const scheduleTitleFit = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        fitTitleToPanel();
        rafId = requestAnimationFrame(fitTitleToPanel);
      });
    };

    scheduleTitleFit();
    window.addEventListener("resize", scheduleTitleFit);
    settleTimeoutId = window.setTimeout(fitTitleToPanel, 220);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (settleTimeoutId !== null) window.clearTimeout(settleTimeoutId);
      window.removeEventListener("resize", scheduleTitleFit);
    };
  }, [activeProjectIndex]);

  const onMouseLeave = () => {
    mouseTargetRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={carouselContainerRef}
      className="orbit-carousel__viewport"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={`orbit-carousel ${isCompactLayout ? "orbit-carousel--compact" : ""}`} style={{ perspective: "1400px" }}>
        <div
          ref={carouselTrackRef}
          className="orbit-carousel__track u-preserve-3d"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {projects.map((project, projectIndex) => {
            const angle = projectIndex * degreesPerProject;
            const isActive = projectIndex === activeProjectIndex;

            return (
              <div
                key={project.id}
                ref={(parallaxCardElement) => {
                  if (parallaxCardElement) parallaxCardRefs.current[projectIndex] = parallaxCardElement;
                }}
                className={`orbit-carousel__card orbit-carousel__card--parallax ${isActive ? "is-active" : ""} ${isCompactLayout ? "is-compact-mode" : ""}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(var(--orbit-radius)) translate3d(var(--parallax-x, 0), var(--parallax-y, 0), 0) rotateX(var(--parallax-rx, 0)) rotateY(var(--parallax-ry, 0))`,
                  ["--angle" as string]: `${angle}deg`,
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  ["--parallax-x" as string]: "0px",
                  ["--parallax-y" as string]: "0px",
                  ["--parallax-rx" as string]: "0deg",
                  ["--parallax-ry" as string]: "0deg",
                }}
              >
                <div className={`orbit-carousel__card-shell ${isActive ? "is-active" : ""}`} style={{ backgroundColor: "var(--surface-700)" }}>
                  <div className="orbit-carousel__image-wrap" style={{ backgroundColor: "var(--surface-600)" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1280px) 36vw, 420px"
                      className="orbit-carousel__image object-cover"
                      priority={isActive}
                      quality={90}
                    />
                    <div className="orbit-carousel__image-overlay" />
                  </div>

                  <div className="orbit-carousel__card-meta" style={{ backgroundColor: "var(--surface-700)", borderTop: "1px solid var(--border)" }}>
                    <div>
                      <span className="orbit-carousel__project-id" style={{ color: "var(--text-high)" }}>PROJ—0{projectIndex + 1}</span>
                      <span className="orbit-carousel__project-category" style={{ color: "var(--muted-500)" }}>{project.category}</span>
                    </div>
                    <span className="orbit-carousel__project-year" style={{ color: "var(--text-high)" }}>{project.year}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="orbit-carousel__overlay">
        <div
          className="orbit-carousel__info-panel"
          style={{
            backgroundColor: "var(--surface-700)",
            borderColor: "var(--border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
          onMouseEnter={() => {
            if (!isCompactLayout && hasFinePointer) setShowDetails(true);
          }}
          onMouseLeave={() => setShowDetails(false)}
        >
          <div className="orbit-carousel__progress-row">
            <span className="orbit-carousel__counter" style={{ color: "var(--muted-500)" }}>
              {activeProjectIndex + 1} / {projectCount}
            </span>
            <div className="orbit-carousel__progress-track" style={{ backgroundColor: "var(--border)" }}>
              <motion.div
                className="orbit-carousel__progress-value"
                style={{
                  width: `${((activeProjectIndex + 1) / projectCount) * 100}%`,
                  backgroundColor: "var(--accent)",
                }}
              />
            </div>
          </div>

          <motion.h2
            ref={titleRef}
            key={activeProjectIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="orbit-carousel__title"
            style={{ color: "var(--text-high)", ["--orbit-title-scale" as string]: "1" }}
          >
            {projects[activeProjectIndex]?.title}
          </motion.h2>
        </div>

        <AnimatePresence>
          {!isCompactLayout && hasFinePointer && showDetails && (
            <motion.div
              initial={{ opacity: 0, width: 0, x: -20 }}
              animate={{ opacity: 1, width: 340, x: 0 }}
              exit={{ opacity: 0, width: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="orbit-carousel__detail-panel"
              style={{
                backgroundColor: "var(--surface-700)",
                borderColor: "var(--border)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
            >
              <motion.div
                className="orbit-carousel__detail-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="orbit-carousel__detail-label" style={{ color: "var(--accent)" }}>
                  About Project
                </span>
                <p className="orbit-carousel__detail-text" style={{ color: "var(--text-medium)" }}>
                  {projects[activeProjectIndex]?.description}
                </p>

                <div className="orbit-carousel__tags">
                  {projects[activeProjectIndex]?.technologies?.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="orbit-carousel__tag"
                      style={{ borderColor: "var(--border)", color: "var(--muted-500)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
