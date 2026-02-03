"use client";

import { useEffect, useRef } from "react";

type SketchQuality = "low" | "medium" | "high";

export type RecursiveSketchConfig = {
  speed: number;
  initialRadius: number;
  shrinkFactor: number;
  recursionCutoff: number;
  sphereSizeFactor: number;
  strokeAlpha: number;
  enabled: boolean;
  quality: SketchQuality;
};

type RecursiveSketchControls = {
  getConfig: () => RecursiveSketchConfig;
  setConfig: (nextConfig: Partial<RecursiveSketchConfig>) => RecursiveSketchConfig;
  setSpeed: (speed: number) => RecursiveSketchConfig;
  setEnabled: (enabled: boolean) => RecursiveSketchConfig;
  pause: () => void;
  resume: () => void;
  setQuality: (quality: SketchQuality) => RecursiveSketchConfig;
};

type QualityPreset = {
  dprCap: number;
  maxRecursionDepth: number;
  sphereDetail: number;
};

type FallbackController = {
  cleanup: () => void;
  sync: () => void;
};

type P5Module = typeof import("p5");
type P5Instance = InstanceType<P5Module["default"]>;

const QUALITY_PRESETS: Record<SketchQuality, QualityPreset> = {
  low: { dprCap: 1, maxRecursionDepth: 8, sphereDetail: 8 },
  medium: { dprCap: 1.25, maxRecursionDepth: 12, sphereDetail: 12 },
  high: { dprCap: 1.5, maxRecursionDepth: 16, sphereDetail: 16 },
};

const DEFAULT_CONFIG: RecursiveSketchConfig = {
  speed: 0.015,
  initialRadius: 400,
  shrinkFactor: 0.75,
  recursionCutoff: 8,
  sphereSizeFactor: 30,
  strokeAlpha: 60,
  enabled: true,
  quality: "medium",
};

declare global {
  interface Window {
    bgSketch?: RecursiveSketchControls;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function supportsWebGL(): boolean {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
}

function isLowPowerMode(): boolean {
  if (typeof navigator === "undefined") return false;
  const saveData = "connection" in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  const lowMemory = "deviceMemory" in navigator && (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined
    ? ((navigator as Navigator & { deviceMemory?: number }).deviceMemory as number) <= 2
    : false;
  return saveData || lowMemory;
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  return coarsePointer || navigator.maxTouchPoints > 0;
}

function sanitizeConfig(nextConfig: Partial<RecursiveSketchConfig>, currentConfig: RecursiveSketchConfig): RecursiveSketchConfig {
  const mergedConfig = { ...currentConfig, ...nextConfig };

  if (!Number.isFinite(mergedConfig.speed)) mergedConfig.speed = currentConfig.speed;
  if (!Number.isFinite(mergedConfig.initialRadius)) mergedConfig.initialRadius = currentConfig.initialRadius;
  if (!Number.isFinite(mergedConfig.shrinkFactor)) mergedConfig.shrinkFactor = currentConfig.shrinkFactor;
  if (!Number.isFinite(mergedConfig.recursionCutoff)) mergedConfig.recursionCutoff = currentConfig.recursionCutoff;
  if (!Number.isFinite(mergedConfig.sphereSizeFactor)) mergedConfig.sphereSizeFactor = currentConfig.sphereSizeFactor;
  if (!Number.isFinite(mergedConfig.strokeAlpha)) mergedConfig.strokeAlpha = currentConfig.strokeAlpha;

  mergedConfig.speed = clamp(mergedConfig.speed, 0.001, 0.25);
  mergedConfig.initialRadius = clamp(mergedConfig.initialRadius, 40, 4000);
  mergedConfig.shrinkFactor = clamp(mergedConfig.shrinkFactor, 0.2, 0.95);
  mergedConfig.recursionCutoff = clamp(mergedConfig.recursionCutoff, 2, 400);
  mergedConfig.sphereSizeFactor = clamp(mergedConfig.sphereSizeFactor, 4, 240);
  mergedConfig.strokeAlpha = clamp(mergedConfig.strokeAlpha, 0, 255);
  mergedConfig.enabled = Boolean(mergedConfig.enabled);
  mergedConfig.quality = mergedConfig.quality in QUALITY_PRESETS ? mergedConfig.quality : currentConfig.quality;

  return mergedConfig;
}

function drawFallbackSketch(
  hostElement: HTMLDivElement,
  getConfig: () => RecursiveSketchConfig,
  shouldAnimate: () => boolean,
): FallbackController {
  const fallbackCanvas = document.createElement("canvas");
  fallbackCanvas.className = "recursive-sketch-fallback";
  fallbackCanvas.setAttribute("aria-hidden", "true");
  hostElement.appendChild(fallbackCanvas);

  const context = fallbackCanvas.getContext("2d");
  if (!context) {
    return {
      cleanup: () => {
        fallbackCanvas.remove();
      },
      sync: () => {
        // no-op if 2D context could not be created.
      },
    };
  }

  let animationFrameId: number | null = null;
  let phase = 0;

  const drawFrame = () => {
    const config = getConfig();
    const width = Math.max(1, hostElement.clientWidth);
    const height = Math.max(1, hostElement.clientHeight);

    fallbackCanvas.width = width;
    fallbackCanvas.height = height;
    fallbackCanvas.style.width = "100%";
    fallbackCanvas.style.height = "100%";

    // Clear to transparent
    context.clearRect(0, 0, width, height);

    // Theme-aware stroke color
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    context.lineWidth = 0.8;
    if (isDarkMode) {
      context.strokeStyle = `rgba(255,255,255,${config.strokeAlpha / 255})`;
    } else {
      context.strokeStyle = `rgba(0,0,0,${config.strokeAlpha / 255})`;
    }

    let radius = config.initialRadius;
    let depth = 0;
    const maxDepth = Math.min(QUALITY_PRESETS[config.quality].maxRecursionDepth, 16);
    const centerX = width / 2;
    const centerY = height / 2;

    while (radius > config.recursionCutoff && depth < maxDepth) {
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();

      const orbitPhase = phase + depth * 0.35;
      const sphereX = centerX + radius * Math.cos(orbitPhase);
      const sphereY = centerY + radius * Math.sin(orbitPhase);
      context.beginPath();
      context.arc(sphereX, sphereY, Math.max(1.5, radius / config.sphereSizeFactor), 0, Math.PI * 2);
      context.stroke();

      radius *= config.shrinkFactor;
      depth += 1;
    }

    if (shouldAnimate()) {
      phase += config.speed * 4;
    }
  };

  const stopAnimation = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const animationLoop = () => {
    animationFrameId = requestAnimationFrame(animationLoop);
    drawFrame();
  };

  const sync = () => {
    stopAnimation();
    drawFrame();
    if (shouldAnimate()) {
      animationFrameId = requestAnimationFrame(animationLoop);
    }
  };

  const resizeObserver = "ResizeObserver" in window
    ? new ResizeObserver(() => {
      drawFrame();
    })
    : null;

  if (resizeObserver) {
    resizeObserver.observe(hostElement);
  } else {
    window.addEventListener("resize", drawFrame);
  }

  sync();

  return {
    cleanup: () => {
      stopAnimation();
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", drawFrame);
      }
      fallbackCanvas.remove();
    },
    sync,
  };
}

export default function RecursiveSketchBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hostElement = hostRef.current;
    if (!hostElement) return;

    let isDestroyed = false;
    let currentConfig: RecursiveSketchConfig = { ...DEFAULT_CONFIG };
    let pausedByUser = false;
    let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const optimizeForBattery = isTouchDevice() || isLowPowerMode();
    if (optimizeForBattery) {
      currentConfig = sanitizeConfig({ quality: "low" }, currentConfig);
    }

    let p5Instance: P5Instance | null = null;
    let fallbackController: FallbackController | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const shouldAnimate = (): boolean => {
      return currentConfig.enabled && !pausedByUser && !prefersReducedMotion;
    };

    const getCanvasSize = () => ({
      width: Math.max(1, hostElement.clientWidth),
      height: Math.max(1, hostElement.clientHeight),
    });

    const getMaxRecursionDepth = (): number => {
      const depthCap = QUALITY_PRESETS[currentConfig.quality].maxRecursionDepth;
      if (currentConfig.shrinkFactor <= 0 || currentConfig.shrinkFactor >= 1) {
        return Math.min(1, depthCap);
      }
      const estimatedDepth = Math.ceil(Math.log(currentConfig.recursionCutoff / currentConfig.initialRadius) / Math.log(currentConfig.shrinkFactor));
      return clamp(Number.isFinite(estimatedDepth) ? estimatedDepth : depthCap, 1, depthCap);
    };

    const applyQualitySettings = () => {
      if (!p5Instance) return;
      const quality = QUALITY_PRESETS[currentConfig.quality];
      p5Instance.pixelDensity(Math.min(window.devicePixelRatio || 1, quality.dprCap));
      const p5WithSphereDetail = p5Instance as P5Instance & { sphereDetail?: (u: number, v: number) => void };
      p5WithSphereDetail.sphereDetail?.(quality.sphereDetail, quality.sphereDetail);
    };

    const syncAnimationState = () => {
      if (p5Instance) {
        if (shouldAnimate()) {
          p5Instance.loop();
        } else {
          p5Instance.redraw();
          p5Instance.noLoop();
        }
      }
      if (fallbackController) {
        fallbackController.sync();
      }
    };

    const controls: RecursiveSketchControls = {
      getConfig: () => ({ ...currentConfig }),
      setConfig: (nextConfig) => {
        currentConfig = sanitizeConfig(nextConfig, currentConfig);
        applyQualitySettings();
        syncAnimationState();
        return { ...currentConfig };
      },
      setSpeed: (speed) => controls.setConfig({ speed }),
      setEnabled: (enabled) => controls.setConfig({ enabled }),
      pause: () => {
        pausedByUser = true;
        syncAnimationState();
      },
      resume: () => {
        pausedByUser = false;
        syncAnimationState();
      },
      setQuality: (quality) => controls.setConfig({ quality }),
    };

    window.bgSketch = controls;

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      syncAnimationState();
    };

    mediaQuery.addEventListener("change", handleMotionPreferenceChange);

    const initializeSketch = async () => {
      if (!supportsWebGL()) {
        fallbackController = drawFallbackSketch(hostElement, () => currentConfig, shouldAnimate);
        return;
      }

      try {
        const p5Module: P5Module = await import("p5");
        if (isDestroyed) return;

        const P5Constructor = p5Module.default;

        p5Instance = new P5Constructor((p) => {
          // Theme detection
          const isDarkMode = () => document.documentElement.getAttribute('data-theme') === 'dark';
          
          const drawRecursive = (radius: number, depth: number, phase: number, maxDepth: number) => {
            // Use ellipse instead of circle for WEBGL compatibility
            p.ellipse(0, 0, radius * 2, radius * 2);

            p.push();
            p.translate(radius * p.cos(phase), radius * p.sin(phase), 0);
            // Small orbiting sphere
            p.noStroke();
            if (isDarkMode()) {
              p.fill(255, 255, 255, 120);
            } else {
              p.fill(0, 0, 0, 120);
            }
            p.sphere(radius / currentConfig.sphereSizeFactor);
            p.noFill();
            // Restore stroke
            if (isDarkMode()) {
              p.stroke(255, 255, 255, currentConfig.strokeAlpha);
            } else {
              p.stroke(0, 0, 0, currentConfig.strokeAlpha);
            }
            p.pop();

            if (radius > currentConfig.recursionCutoff && depth < maxDepth) {
              p.push();
              p.rotateY(phase / 6);
              p.rotateX(phase / 8);
              drawRecursive(radius * currentConfig.shrinkFactor, depth + 1, phase, maxDepth);
              p.pop();
            }
          };

          p.setup = () => {
            const { width, height } = getCanvasSize();
            p.createCanvas(width, height, p.WEBGL);
            p.noFill();
            p.strokeWeight(0.8);
            applyQualitySettings();
          };

          p.draw = () => {
            // Transparent background - use clear() instead of background()
            p.clear();
            
            // Theme-aware stroke color
            if (isDarkMode()) {
              p.stroke(255, 255, 255, currentConfig.strokeAlpha);
            } else {
              p.stroke(0, 0, 0, currentConfig.strokeAlpha);
            }

            const phase = shouldAnimate() ? p.frameCount * currentConfig.speed : 0;
            drawRecursive(currentConfig.initialRadius, 0, phase, getMaxRecursionDepth());
          };

          p.windowResized = () => {
            const { width, height } = getCanvasSize();
            p.resizeCanvas(width, height);
            applyQualitySettings();
          };
        }, hostElement);

        resizeObserver = new ResizeObserver(() => {
          if (!p5Instance) return;
          const { width, height } = getCanvasSize();
          p5Instance.resizeCanvas(width, height);
        });
        resizeObserver.observe(hostElement);

        syncAnimationState();
      } catch (error) {
        // Graceful fallback for environments where WebGL/p5 initialization fails.
        console.error("[RecursiveSketch] WebGL initialization failed, using 2D fallback:", error);
        fallbackController = drawFallbackSketch(hostElement, () => currentConfig, shouldAnimate);
      }
    };

    void initializeSketch();

    return () => {
      isDestroyed = true;
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      if (resizeObserver) resizeObserver.disconnect();
      if (p5Instance) p5Instance.remove();
      if (fallbackController) fallbackController.cleanup();
      if (window.bgSketch === controls) {
        delete window.bgSketch;
      }
    };
  }, []);

  return <div ref={hostRef} className="recursive-sketch-bg" aria-hidden="true" />;
}
