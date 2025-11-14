module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "personalInfo",
    ()=>personalInfo
]);
const personalInfo = {
    name: "Yash Dogra",
    role: "Creative Developer & ML Engineer",
    location: "Hamirpur, Himachal Pradesh",
    email: "yxshdogra@gmail.com",
    phone: "+91 7876205914",
    socials: {
        instagram: "https://instagram.com/yxshdogra",
        linkedin: "https://linkedin.com/in/yashdogra",
        github: "https://github.com/yashdogra"
    },
    summary: "MACHINE LEARNING ENGINEER & CREATIVE DEVELOPER SPECIALIZING IN NLP, COMPUTER VISION, AND INTELLIGENT SYSTEMS. TRANSFORMING COMPLEX CHALLENGES INTO ELEGANT, SCALABLE SOLUTIONS.",
    education: [
        {
            institution: "Thapar Institute of Engineering and Technology",
            degree: "Bachelor of Engineering in Computer Science",
            period: "2021 – 2025",
            score: "CGPA: 8.11"
        }
    ],
    projects: [
        {
            id: 1,
            title: "MapMitra",
            category: "React • Node.js • MongoDB",
            year: "2023",
            image: "/images/core/image1.webp",
            description: "REAL-TIME CAMPUS NAVIGATION AND E-RICKSHAW TRACKING SYSTEM."
        },
        {
            id: 2,
            title: "Text Summarization",
            category: "T5 Transformer • HuggingFace",
            year: "2024",
            image: "/images/core/image2.webp",
            description: "T5-BASED TOOL FOR PUNJABI TEXT SUMMARIZATION."
        },
        {
            id: 3,
            title: "Toxic Terminator",
            category: "NLP • Streamlit",
            year: "2023",
            image: "/images/core/image3.webp",
            description: "TOXICITY DETECTION MODEL WITH 95% ACCURACY."
        },
        {
            id: 4,
            title: "Logistics Leader",
            category: "Leadership • Operations",
            year: "2024",
            image: "/images/core/image4.webp",
            description: "LED 85+ MEMBERS AT GIRL UP PATIALA FOR GENDER SENSITIVITY EVENTS."
        }
    ],
    archive: [
        {
            id: 101,
            title: "IBM DATA SCIENCE CERTIFICATION",
            year: "2023",
            image: "/images/core/page3-image1.webp"
        },
        {
            id: 102,
            title: "GOOGLE UX DESIGN PROFESSIONAL",
            year: "2023",
            image: "/images/core/page3-image2.webp"
        },
        {
            id: 103,
            title: "CAMPUS NAVIGATION OPTIMIZATION PAPER",
            year: "2023",
            image: "/images/core/page3-image3.webp"
        }
    ],
    certificates: [
        {
            id: 1,
            title: "IBM DATA SCIENCE",
            issuer: "IBM",
            year: "2023",
            file: "/certificates/IBM Data Science.pdf"
        },
        {
            id: 2,
            title: "GOOGLE UX DESIGN",
            issuer: "Google",
            year: "2023",
            file: "/certificates/Google UX Design.pdf"
        },
        {
            id: 3,
            title: "AI FUNDAMENTALS",
            issuer: "IBM",
            year: "2025",
            file: "/certificates/ArtificialIntelligenceFundamentals_Badge20250123-29-v8q470.pdf"
        },
        {
            id: 4,
            title: "BUILDING AI SOLUTIONS",
            issuer: "IBM",
            year: "2025",
            file: "/certificates/BuildingAISolutionsUsingAdvancedAlgorithmsandOpenSourceFrameworks_Badge20250123-29-334g6z.pdf"
        },
        {
            id: 5,
            title: "TRUSTWORTHY AI ENTERPRISE",
            issuer: "IBM",
            year: "2025",
            file: "/certificates/BuildingTrustworthyAIEnterpriseSolutions_Badge20250123-28-24s269.pdf"
        },
        {
            id: 6,
            title: "COMPUTER VISION",
            issuer: "Professional",
            year: "2024",
            file: "/certificates/Computer Vision.pdf"
        },
        {
            id: 7,
            title: "CYBER SECURITY",
            issuer: "Professional",
            year: "2024",
            file: "/certificates/Cyber Security.pdf"
        },
        {
            id: 8,
            title: "GENERATIVE AI IN ACTION",
            issuer: "IBM",
            year: "2025",
            file: "/certificates/GenerativeAIinAction_Badge20250123-26-hhxwkh.pdf"
        },
        {
            id: 9,
            title: "NVIDIA CUDA PYTHON",
            issuer: "NVIDIA",
            year: "2024",
            file: "/certificates/NVIDIA Fundamentals of Accelerated Computing with CUDA Python.pdf"
        },
        {
            id: 10,
            title: "NVIDIA DIFFUSION MODELS",
            issuer: "NVIDIA",
            year: "2024",
            file: "/certificates/NVIDIA Generative AI with Diffusion Models.pdf"
        },
        {
            id: 11,
            title: "ICICC 2025 CONFERENCE",
            issuer: "ICICC",
            year: "2025",
            file: "/certificates/ICICC 2025 Certificate Yash Dogra.pdf"
        },
        {
            id: 12,
            title: "MOBILE APP DEVELOPMENT",
            issuer: "Professional",
            year: "2024",
            file: "/certificates/Mobile App.pdf"
        },
        {
            id: 13,
            title: "ROBOTIC ARM",
            issuer: "Professional",
            year: "2024",
            file: "/certificates/Robotic Arm.pdf"
        },
        {
            id: 14,
            title: "GIRL UP LEADERSHIP",
            issuer: "Girl Up",
            year: "2024",
            file: "/certificates/Girl Up.pdf"
        }
    ],
    heroImage: "/images/core/thegreats.webp"
};
}),
"[project]/src/components/ThemeProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        // Initialize theme from localStorage or system preference
        const stored = localStorage.getItem("theme");
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        function apply(theme) {
            const root = document.documentElement;
            if (theme === "dark") {
                root.setAttribute("data-theme", "dark");
            } else if (theme === "light") {
                root.removeAttribute("data-theme");
            } else {
                // System preference
                if (media.matches) {
                    root.setAttribute("data-theme", "dark");
                } else {
                    root.removeAttribute("data-theme");
                }
            }
        }
        apply(stored);
        // Listen to system preference changes
        const handleChange = ()=>{
            const current = localStorage.getItem("theme");
            if (!current || current === "system") {
                apply("system");
            }
        };
        media.addEventListener("change", handleChange);
        // Expose global controller for external use
        window.ThemeController = {
            set (t) {
                if (t === "system") {
                    localStorage.removeItem("theme");
                } else {
                    localStorage.setItem("theme", t);
                }
                apply(t);
            },
            get () {
                return localStorage.getItem("theme") || "system";
            }
        };
        return ()=>media.removeEventListener("change", handleChange);
    }, []);
    // Prevent flash of incorrect theme
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
function ThemeToggle() {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("system");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const stored = localStorage.getItem("theme");
        setTheme(stored || "system");
    }, []);
    const cycleTheme = ()=>{
        const root = document.documentElement;
        const isDark = root.getAttribute("data-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
            root.setAttribute("data-theme", "dark");
        } else {
            root.removeAttribute("data-theme");
        }
    };
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "theme-toggle",
            "aria-label": "Toggle theme",
            disabled: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-4 h-4 rounded-full bg-current opacity-30"
            }, void 0, false, {
                fileName: "[project]/src/components/ThemeProvider.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ThemeProvider.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, this);
    }
    const isDark = ("TURBOPACK compile-time value", "undefined") !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: cycleTheme,
        className: "theme-toggle",
        "aria-label": ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Switch to dark mode",
        title: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Switch to dark mode",
        children: ("TURBOPACK compile-time falsy", 0) ? // Sun icon for dark mode (click to go light)
        /*#__PURE__*/ "TURBOPACK unreachable" : // Moon icon for light mode (click to go dark)
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            }, void 0, false, {
                fileName: "[project]/src/components/ThemeProvider.tsx",
                lineNumber: 133,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ThemeProvider.tsx",
            lineNumber: 132,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ThemeProvider.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ThemeProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Header() {
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateTime = ()=>{
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", {
                hour12: true,
                second: "2-digit"
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return ()=>clearInterval(interval);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed top-0 left-0 w-full flex justify-between items-start p-5 z-[100] pointer-events-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "text-sm font-black tracking-tight uppercase leading-none",
                    style: {
                        color: 'var(--text-high)'
                    },
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["personalInfo"].name
                }, void 0, false, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "absolute left-1/2 -translate-x-1/2 flex gap-8 pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/work",
                        className: "nav-link",
                        children: "WORK"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/archive",
                        className: "nav-link",
                        children: "ARCHIVE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/info",
                        className: "nav-link",
                        children: "INFO"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium tabular-nums",
                        style: {
                            color: 'var(--text-medium)'
                        },
                        children: time
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__652145bb._.js.map