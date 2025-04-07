(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 5690:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/styles/globals.css
var globals = __webpack_require__(108);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/context/ThemeContext.tsx


const ThemeContext = /*#__PURE__*/ (0,external_react_.createContext)(undefined);
function ThemeProvider({ children  }) {
    const [theme, setTheme] = (0,external_react_.useState)("light");
    const [mounted, setMounted] = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);
    const toggleTheme = ()=>{
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark");
    };
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    });
}
function useTheme() {
    const context = (0,external_react_.useContext)(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

// EXTERNAL MODULE: ./src/context/TaskContext.tsx
var TaskContext = __webpack_require__(6999);
;// CONCATENATED MODULE: ./src/context/DefaultEventsContext.tsx


const DefaultEventsContext = /*#__PURE__*/ (0,external_react_.createContext)(undefined);
const useDefaultEvents = ()=>{
    const context = useContext(DefaultEventsContext);
    if (!context) {
        throw new Error("useDefaultEvents must be used within a DefaultEventsProvider");
    }
    return context;
};
const DefaultEventsProvider = ({ children  })=>{
    const [defaultEvents, setDefaultEvents] = (0,external_react_.useState)([]);
    const addDefaultEvent = (event)=>{
        setDefaultEvents((prev)=>[
                ...prev,
                event
            ]);
    };
    const removeDefaultEvent = (event)=>{
        setDefaultEvents((prev)=>prev.filter((e)=>e.id !== event.id));
    };
    const updateDefaultEvent = (event)=>{
        setDefaultEvents((prev)=>prev.map((e)=>e.id === event.id ? event : e));
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(DefaultEventsContext.Provider, {
        value: {
            defaultEvents,
            addDefaultEvent,
            removeDefaultEvent,
            updateDefaultEvent
        },
        children: children
    });
};

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
;// CONCATENATED MODULE: ./src/components/Sidebar.tsx





const Sidebar = ()=>{
    const router = (0,router_namespaceObject.useRouter)();
    const { theme  } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0,external_react_.useState)(false);
    const menuItems = [
        {
            href: "/dashboard",
            icon: "\uD83D\uDCCA",
            label: "Dashboard"
        },
        {
            href: "/agenda",
            icon: "\uD83D\uDCC5",
            label: "Agenda"
        },
        {
            href: "/tasks",
            icon: "✅",
            label: "Tarefas"
        },
        {
            href: "/settings",
            icon: "⚙️",
            label: "Configura\xe7\xf5es"
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                onClick: ()=>setIsMobileMenuOpen(!isMobileMenuOpen),
                className: "fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg md:hidden",
                children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M4 6h16M4 12h16M4 18h16"
                    })
                })
            }),
            isMobileMenuOpen && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "fixed inset-0 bg-black/50 z-40 md:hidden",
                onClick: ()=>setIsMobileMenuOpen(false)
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("aside", {
                className: `fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "p-4 border-b border-gray-200 dark:border-gray-700",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                href: "/",
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: "/favicon.ico",
                                        alt: "MySchedule",
                                        className: "w-8 h-8"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                        className: "text-xl font-semibold text-gray-800 dark:text-white",
                                        children: "MySchedule"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                            className: "flex-1 p-4 space-y-2",
                            children: menuItems.map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                    href: item.href,
                                    className: `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${router.pathname === item.href ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"}`,
                                    onClick: ()=>setIsMobileMenuOpen(false),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "text-xl",
                                            children: item.icon
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "font-medium",
                                            children: item.label
                                        })
                                    ]
                                }, item.href))
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "p-4 border-t border-gray-200 dark:border-gray-700",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                onClick: ()=>{
                                    const newTheme = theme === "dark" ? "light" : "dark";
                                    document.documentElement.classList.toggle("dark");
                                    localStorage.setItem("theme", newTheme);
                                },
                                className: "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "text-xl",
                                        children: theme === "dark" ? "\uD83C\uDF1E" : "\uD83C\uDF19"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "font-medium",
                                        children: theme === "dark" ? "Modo Claro" : "Modo Escuro"
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const components_Sidebar = (Sidebar);

;// CONCATENATED MODULE: ./src/components/FloatingTasksButton.tsx



const FloatingTasksButton = ({ tasks  })=>{
    const router = (0,router_namespaceObject.useRouter)();
    const [isHovered, setIsHovered] = (0,external_react_.useState)(false);
    const handleClick = ()=>{
        router.push("/tasks");
    };
    const pendingTasks = tasks.filter((task)=>task.source === "independent" && !task.completed).length;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
        onClick: handleClick,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        className: "fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                })
            }),
            pendingTasks > 0 && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: "bg-red-500 text-white rounded-full px-2 py-1 text-xs",
                children: pendingTasks
            }),
            isHovered && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: "absolute right-0 bottom-16 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap",
                children: "Ver Tarefas"
            })
        ]
    });
};
/* harmony default export */ const components_FloatingTasksButton = (FloatingTasksButton);

;// CONCATENATED MODULE: ./src/components/Layout.tsx






const Layout = ({ children  })=>{
    const { theme , toggleTheme  } = useTheme();
    const { tasks  } = (0,TaskContext/* useTasks */.X)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "min-h-screen bg-gray-50 dark:bg-gray-900",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col md:flex-row",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(components_Sidebar, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("main", {
                        className: "flex-1 p-4 md:p-6",
                        children: children
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_FloatingTasksButton, {
                tasks: tasks
            })
        ]
    });
};
/* harmony default export */ const components_Layout = (Layout);

;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/_app.tsx








function App({ Component , pageProps  }) {
    (0,external_react_.useEffect)(()=>{
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", ()=>{
                navigator.serviceWorker.register("/sw.js").then((registration)=>{
                    console.log("ServiceWorker registration successful");
                }).catch((err)=>{
                    console.log("ServiceWorker registration failed: ", err);
                });
            });
        }
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "MySchedule"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Agenda e gerenciador de tarefas"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "theme-color",
                        content: "#7c3aed"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "manifest",
                        href: "/manifest.json"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "apple-touch-icon",
                        href: "/icons/icon-192x192.png"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "apple-mobile-web-app-capable",
                        content: "yes"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "default"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "apple-mobile-web-app-title",
                        content: "MySchedule"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(ThemeProvider, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(TaskContext/* TaskProvider */.o, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(DefaultEventsProvider, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(components_Layout, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                                ...pageProps
                            })
                        })
                    })
                })
            })
        ]
    });
}
/* harmony default export */ const _app = (App);


/***/ }),

/***/ 108:
/***/ (() => {



/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [210,676,664,999], () => (__webpack_exec__(5690)));
module.exports = __webpack_exports__;

})();