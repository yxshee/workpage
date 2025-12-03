#!/usr/bin/env node

import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

const DEFAULT_BASE_URL = "http://localhost:3000";
const DEFAULT_DURATION_MS = 3500;
const ROUTES_TO_CHECK = ["/", "/work", "/archive", "/info"];

function parseArgs(argv) {
  const args = {
    baseUrl: DEFAULT_BASE_URL,
    durationMs: DEFAULT_DURATION_MS,
  };

  for (let index = 2; index < argv.length; index += 1) {
    const current = argv[index];

    if (current === "--base-url" && argv[index + 1]) {
      args.baseUrl = argv[index + 1];
      index += 1;
      continue;
    }

    if (current.startsWith("--base-url=")) {
      args.baseUrl = current.slice("--base-url=".length);
      continue;
    }

    if (current === "--duration-ms" && argv[index + 1]) {
      args.durationMs = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (current.startsWith("--duration-ms=")) {
      args.durationMs = Number.parseInt(current.slice("--duration-ms=".length), 10);
      continue;
    }
  }

  if (!Number.isFinite(args.durationMs) || args.durationMs < 1000) {
    throw new Error("Invalid --duration-ms value. Use an integer >= 1000.");
  }

  return args;
}

function normalizePathname(pathname) {
  if (!pathname) return "/";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function matchesRouteUrl(urlText, routePath) {
  const parsed = new URL(urlText);
  return normalizePathname(parsed.pathname) === normalizePathname(routePath);
}

async function checkRoute(browser, baseUrl, routePath, durationMs) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const fullUrl = new URL(routePath, baseUrl).toString();

  let documentResponsesForRoute = 0;
  let routeMainFrameNavigations = 0;
  const hmrReloadEvents = [];
  const pageErrors = [];

  page.on("response", (response) => {
    if (response.request().resourceType() !== "document") return;
    if (!matchesRouteUrl(response.url(), routePath)) return;
    documentResponsesForRoute += 1;
  });

  page.on("framenavigated", (frame) => {
    if (frame !== page.mainFrame()) return;
    if (!matchesRouteUrl(frame.url(), routePath)) return;
    routeMainFrameNavigations += 1;
  });

  page.on("websocket", (socket) => {
    socket.on("framereceived", (event) => {
      if (typeof event.payload !== "string") return;
      if (!event.payload.startsWith("{")) return;

      try {
        const parsed = JSON.parse(event.payload);
        // Turbopack/webpack dev clients send `reloadPage` when they force full document reloads.
        if (parsed?.type === "reloadPage") {
          hmrReloadEvents.push(String(parsed.data ?? "reloadPage"));
        }
      } catch {
        // Ignore non-JSON websocket frames.
      }
    });
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  try {
    await page.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
    await delay(durationMs);

    const failures = [];

    if (documentResponsesForRoute !== 1) {
      failures.push(`expected 1 document response, saw ${documentResponsesForRoute}`);
    }

    // Initial settle can include one extra same-URL navigation in dev, but reload loops explode beyond that.
    if (routeMainFrameNavigations > 2) {
      failures.push(`expected <= 2 main-frame navigations, saw ${routeMainFrameNavigations}`);
    }

    if (hmrReloadEvents.length > 0) {
      failures.push(`received ${hmrReloadEvents.length} reloadPage websocket event(s)`);
    }

    if (pageErrors.length > 0) {
      failures.push(`captured ${pageErrors.length} page error(s)`);
    }

    const finalPath = normalizePathname(new URL(page.url()).pathname);
    if (finalPath !== normalizePathname(routePath)) {
      failures.push(`final path mismatch: expected ${routePath}, got ${finalPath}`);
    }

    return {
      routePath,
      ok: failures.length === 0,
      failures,
      metrics: {
        documentResponsesForRoute,
        routeMainFrameNavigations,
        hmrReloadEvents: hmrReloadEvents.length,
        pageErrors: pageErrors.length,
      },
    };
  } finally {
    await context.close();
  }
}

async function main() {
  const { baseUrl, durationMs } = parseArgs(process.argv);
  const browser = await chromium.launch({ headless: true });

  try {
    console.log(`Route stability check: baseUrl=${baseUrl} durationMs=${durationMs}`);

    const results = [];
    for (const routePath of ROUTES_TO_CHECK) {
      const result = await checkRoute(browser, baseUrl, routePath, durationMs);
      results.push(result);

      const metricSummary = `docs=${result.metrics.documentResponsesForRoute} nav=${result.metrics.routeMainFrameNavigations} reloadEvents=${result.metrics.hmrReloadEvents} pageErrors=${result.metrics.pageErrors}`;
      if (result.ok) {
        console.log(`PASS ${routePath} (${metricSummary})`);
      } else {
        console.error(`FAIL ${routePath} (${metricSummary})`);
        for (const failure of result.failures) {
          console.error(`  - ${failure}`);
        }
      }
    }

    const failed = results.filter((result) => !result.ok);
    if (failed.length > 0) {
      process.exitCode = 1;
      return;
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Route stability check failed to run.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
