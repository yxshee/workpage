import { personalInfo } from "@/lib/data";

const PRELOAD_VERSION = "2026-02-11-v1";
const IMAGE_EXTENSION_REGEX = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

function normalizeAssetPath(assetPath: string): string | null {
  const normalized = assetPath.trim();
  if (!normalized) return null;
  if (!IMAGE_EXTENSION_REGEX.test(normalized)) return null;
  if (normalized.startsWith("/") || normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }
  return `/${normalized.replace(/^\/+/, "")}`;
}

function dedupeAssets(paths: string[]): string[] {
  const unique = new Set<string>();
  for (const path of paths) {
    const normalized = normalizeAssetPath(path);
    if (!normalized) continue;
    unique.add(normalized);
  }
  return Array.from(unique);
}

function hashAssets(paths: string[]): string {
  let hash = 5381;
  for (const path of paths) {
    for (let i = 0; i < path.length; i += 1) {
      hash = (hash * 33) ^ path.charCodeAt(i);
    }
  }
  return (hash >>> 0).toString(36);
}

const ROUTE_MEDIA_ASSETS = dedupeAssets([
  ...personalInfo.projects.map((project) => project.image),
  ...personalInfo.archive.map((entry) => entry.image),
]);

export function getPreloadAssets(): string[] {
  return ROUTE_MEDIA_ASSETS;
}

export function getPreloadSessionKey(assets: string[]): string {
  return `workpage:preload:${PRELOAD_VERSION}:${assets.length}:${hashAssets(assets)}`;
}
