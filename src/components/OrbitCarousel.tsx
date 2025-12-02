"use client";

import { useRef, useEffect, useState, useCallback, type FocusEvent as ReactFocusEvent, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type MutableRefObject } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { personalInfo, type Project } from "@/lib/data";

const COMPACT_QUERY = "(max-width: 768px)";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const OPEN_DELAY_MS = 110;
const CLOSE_DELAY_MS = 130;

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
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);
  const isTriggerAreaHoveredRef = useRef(false);
  const isPanelHoveredRef = useRef(false);
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

  const projects: Project[] = personalInfo.projects;
  const projectCount = projects.length;
  const degreesPerProject = 360 / projectCount;
  const maxRotationVelocity = 3.2;
  const isDesktopHoverMode = hasFinePointer && !isCompactLayout;

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

  const clearTimer = useCallback((timerRef: MutableRefObject<number | null>) => {
    if (timerRef.current === null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearTimer(openTimerRef);
      clearTimer(closeTimerRef);
    };
  }, [clearTimer]);

  const isFocusInsideInteractiveRegion = useCallback(() => {
    if (typeof document === "undefined") return false;
    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement)) return false;
    return Boolean(
      activeElement.closest(".orbit-carousel__card") ||
      activeElement.closest(".orbit-carousel__detail-panel")
    );
  }, []);

  const shouldKeepPanelOpen = useCallback(() => {
    return isTriggerAreaHoveredRef.current || isPanelHoveredRef.current || isFocusInsideInteractiveRegion();
  }, [isFocusInsideInteractiveRegion]);

  const closePanel = useCallback(() => {
    clearTimer(openTimerRef);
    clearTimer(closeTimerRef);
    isTriggerAreaHoveredRef.current = false;
    isPanelHoveredRef.current = false;
    setSelectedProjectIndex(null);
  }, [clearTimer]);

  const scheduleClosePanel = useCallback((delay = CLOSE_DELAY_MS) => {
    clearTimer(closeTimerRef);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      if (!isMountedRef.current) return;
      if (shouldKeepPanelOpen()) return;
      setSelectedProjectIndex(null);
    }, delay);
  }, [clearTimer, shouldKeepPanelOpen]);

  const openPanelForProject = useCallback((projectIndex: number) => {
    clearTimer(closeTimerRef);
    if (selectedProjectIndex !== null) {
      clearTimer(openTimerRef);
      setSelectedProjectIndex(projectIndex);
      return;
    }

    clearTimer(openTimerRef);
    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      if (!isMountedRef.current) return;
      if (!shouldKeepPanelOpen()) return;
      setSelectedProjectIndex(projectIndex);
    }, OPEN_DELAY_MS);
  }, [clearTimer, selectedProjectIndex, shouldKeepPanelOpen]);

  const handleCardClick = useCallback((projectIndex: number) => {
    if (isDesktopHoverMode) return;
    setSelectedProjectIndex((previousIndex) => (previousIndex === projectIndex ? null : projectIndex));
  }, [isDesktopHoverMode]);

  const handleCardMouseEnter = useCallback((projectIndex: number) => {
    if (!isDesktopHoverMode) return;
    isTriggerAreaHoveredRef.current = true;
    openPanelForProject(projectIndex);
  }, [isDesktopHoverMode, openPanelForProject]);

  const handleTriggerAreaEnter = useCallback(() => {
    if (!isDesktopHoverMode) return;
    isTriggerAreaHoveredRef.current = true;
    clearTimer(closeTimerRef);
  }, [clearTimer, isDesktopHoverMode]);

  const handleTriggerAreaLeave = useCallback(() => {
    if (!isDesktopHoverMode) return;
    isTriggerAreaHoveredRef.current = false;
    scheduleClosePanel();
  }, [isDesktopHoverMode, scheduleClosePanel]);

  const handlePanelMouseEnter = useCallback(() => {
    if (!isDesktopHoverMode) return;
    isPanelHoveredRef.current = true;
    clearTimer(closeTimerRef);
  }, [clearTimer, isDesktopHoverMode]);

  const handlePanelMouseLeave = useCallback(() => {
    if (!isDesktopHoverMode) return;
    isPanelHoveredRef.current = false;
    scheduleClosePanel();
  }, [isDesktopHoverMode, scheduleClosePanel]);

  const handleCardFocus = useCallback((projectIndex: number) => {
    isTriggerAreaHoveredRef.current = true;
    clearTimer(closeTimerRef);
    if (isDesktopHoverMode) {
      openPanelForProject(projectIndex);
      return;
    }
    setSelectedProjectIndex(projectIndex);
  }, [clearTimer, isDesktopHoverMode, openPanelForProject]);

  const handleCardBlur = useCallback((event: ReactFocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as HTMLElement | null;
    if (nextTarget?.closest(".orbit-carousel__card") || nextTarget?.closest(".orbit-carousel__detail-panel")) {
      return;
    }
    isTriggerAreaHoveredRef.current = false;
    scheduleClosePanel();
  }, [scheduleClosePanel]);

  const handleCardKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>, projectIndex: number) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    clearTimer(openTimerRef);
    clearTimer(closeTimerRef);
    setSelectedProjectIndex(projectIndex);
  }, [clearTimer]);

  const handlePanelBlur = useCallback((event: ReactFocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as HTMLElement | null;
    if (nextTarget?.closest(".orbit-carousel__card") || nextTarget?.closest(".orbit-carousel__detail-panel")) {
      return;
    }
    scheduleClosePanel();
  }, [scheduleClosePanel]);

  const handleTitleMouseEnter = useCallback(() => {
    if (!isDesktopHoverMode) return;
    isTriggerAreaHoveredRef.current = true;
    openPanelForProject(activeProjectIndex);
  }, [activeProjectIndex, isDesktopHoverMode, openPanelForProject]);

  const handleTitleMouseLeave = useCallback(() => {
    if (!isDesktopHoverMode) return;
    isTriggerAreaHoveredRef.current = false;
    scheduleClosePanel();
  }, [isDesktopHoverMode, scheduleClosePanel]);

  // Get selected project data
  const selectedProject = selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;

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
      // Scroll down should advance to the next project.
      rotationVelocityRef.current += (delta > 0 ? -1 : 1) * 0.15;
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

    const onKeyDown = (event: KeyboardEvent) => {
      if (!carouselContainerRef.current?.closest(".orbit-page")) return;

      const activeElement = document.activeElement as HTMLElement | null;
      const isTypingTarget =
        activeElement?.isContentEditable ||
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT";
      if (isTypingTarget) return;

      let direction = 0;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") direction = 1;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") direction = -1;
      if (!direction) return;

      rotationVelocityRef.current += direction * 0.2;
      rotationVelocityRef.current = Math.max(-maxRotationVelocity, Math.min(maxRotationVelocity, rotationVelocityRef.current));
      event.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

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
      window.removeEventListener("keydown", onKeyDown);
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

  // Escape key handler
  useEffect(() => {
    if (selectedProjectIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePanel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProjectIndex, closePanel]);

  return (
    <div
      ref={carouselContainerRef}
      className="orbit-carousel__viewport"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`orbit-carousel ${isCompactLayout ? "orbit-carousel--compact" : ""}`}
        style={{ perspective: "1400px" }}
        onMouseEnter={handleTriggerAreaEnter}
        onMouseLeave={handleTriggerAreaLeave}
      >
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
                onMouseEnter={() => handleCardMouseEnter(projectIndex)}
                onClick={() => handleCardClick(projectIndex)}
                onFocus={() => handleCardFocus(projectIndex)}
                onBlur={handleCardBlur}
                onKeyDown={(event) => handleCardKeyDown(event, projectIndex)}
                className={`orbit-carousel__card orbit-carousel__card--parallax ${isActive ? "is-active" : ""} ${selectedProjectIndex === projectIndex ? "is-selected" : ""} ${isCompactLayout ? "is-compact-mode" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`Open details for ${project.title}`}
                aria-expanded={selectedProjectIndex === projectIndex}
                aria-controls="orbit-carousel-detail-panel"
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

      <div className={`orbit-carousel__overlay ${selectedProject ? "has-panel" : ""}`}>
        <div className="orbit-carousel__info-panel">
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
            onMouseEnter={handleTitleMouseEnter}
            onMouseLeave={handleTitleMouseLeave}
          >
            {projects[activeProjectIndex]?.title}
          </motion.h2>
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              ref={detailPanelRef}
              id="orbit-carousel-detail-panel"
              key="orbit-carousel-detail-panel"
              initial={{ opacity: 0, x: isCompactLayout ? 0 : -20, y: isCompactLayout ? 20 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: isCompactLayout ? 0 : -20, y: isCompactLayout ? 20 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`orbit-carousel__detail-panel ${isCompactLayout ? "orbit-carousel__detail-panel--mobile" : ""}`}
              onMouseEnter={handlePanelMouseEnter}
              onMouseLeave={handlePanelMouseLeave}
              onFocusCapture={handlePanelMouseEnter}
              onBlurCapture={handlePanelBlur}
            >
              <div className="orbit-carousel__detail-header">
                <span className="orbit-carousel__detail-label" style={{ color: "var(--accent)" }}>
                  Project Details
                </span>
                <h3 className="orbit-carousel__detail-title" style={{ color: "var(--text-high)" }}>
                  {selectedProject.title}
                </h3>
              </div>

              <div className="orbit-carousel__detail-body">
                <p className="orbit-carousel__detail-summary" style={{ color: "var(--muted-500)" }}>
                  {selectedProject.description}
                </p>

                {selectedProject.longDescription && selectedProject.longDescription !== selectedProject.description && (
                  <p className="orbit-carousel__detail-text" style={{ color: "var(--text-medium)" }}>
                    {selectedProject.longDescription}
                  </p>
                )}

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="orbit-carousel__features">
                    <span className="orbit-carousel__detail-sublabel" style={{ color: "var(--muted-500)" }}>Key Features</span>
                    <ul className="orbit-carousel__features-list">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} style={{ color: "var(--text-medium)" }}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div className="orbit-carousel__features">
                    <span className="orbit-carousel__detail-sublabel" style={{ color: "var(--muted-500)" }}>Highlights</span>
                    <ul className="orbit-carousel__features-list">
                      {selectedProject.highlights.map((highlight, i) => (
                        <li key={i} style={{ color: "var(--text-medium)" }}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.tech && selectedProject.tech.length > 0 && (
                  <div className="orbit-carousel__tags">
                    {selectedProject.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="orbit-carousel__tag"
                        style={{ borderColor: "var(--border)", color: "var(--muted-500)" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="orbit-carousel__detail-links">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="orbit-carousel__link-btn orbit-carousel__link-btn--github"
                >
                  <Github size={16} />
                  <span>View on GitHub</span>
                </a>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="orbit-carousel__link-btn orbit-carousel__link-btn--live"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
