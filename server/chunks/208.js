"use strict";
exports.id = 208;
exports.ids = [208];
exports.modules = {

/***/ 8208:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ EmojiPicker)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const emojiCategories = [
    {
        name: "Trabalho",
        emojis: [
            "\uD83D\uDCBC",
            "\uD83D\uDCBB",
            "\uD83D\uDCCA",
            "\uD83D\uDCC8",
            "\uD83D\uDCDD",
            "✏️",
            "\uD83D\uDCCC",
            "\uD83D\uDCCD",
            "\uD83D\uDDC2️",
            "\uD83D\uDCC1",
            "\uD83D\uDCC2",
            "\uD83D\uDDC4️",
            "\uD83D\uDCC5",
            "⏰",
            "⌚"
        ]
    },
    {
        name: "Estudo",
        emojis: [
            "\uD83D\uDCDA",
            "\uD83D\uDCD6",
            "✏️",
            "\uD83D\uDCDD",
            "\uD83C\uDF93",
            "\uD83C\uDF92",
            "\uD83D\uDCD3",
            "\uD83D\uDCD4",
            "\uD83D\uDCD2",
            "\uD83D\uDCD5",
            "\uD83D\uDCD7",
            "\uD83D\uDCD8",
            "\uD83D\uDCD9",
            "\uD83D\uDD0D",
            "\uD83D\uDCD0"
        ]
    },
    {
        name: "Sa\xfade",
        emojis: [
            "\uD83C\uDFC3",
            "\uD83C\uDFCB️",
            "\uD83E\uDDD8",
            "\uD83D\uDEB4",
            "\uD83C\uDFBE",
            "⚽",
            "\uD83C\uDFCA",
            "\uD83D\uDCAA",
            "\uD83E\uDD57",
            "\uD83E\uDD51",
            "\uD83C\uDF4E",
            "\uD83D\uDC8A",
            "\uD83C\uDFE5",
            "\uD83E\uDDE0",
            "❤️"
        ]
    },
    {
        name: "Social",
        emojis: [
            "\uD83D\uDC65",
            "\uD83E\uDD1D",
            "\uD83D\uDDE3️",
            "\uD83D\uDCAC",
            "\uD83C\uDF89",
            "\uD83C\uDF8A",
            "\uD83C\uDFAD",
            "\uD83C\uDFAA",
            "\uD83C\uDFAB",
            "\uD83C\uDF9F️",
            "\uD83C\uDF7D️",
            "\uD83C\uDF7B",
            "\uD83E\uDD42",
            "\uD83C\uDFAE",
            "\uD83C\uDFB2"
        ]
    },
    {
        name: "Lazer",
        emojis: [
            "\uD83C\uDFAE",
            "\uD83C\uDFAC",
            "\uD83C\uDFB5",
            "\uD83C\uDFA8",
            "\uD83D\uDCFA",
            "\uD83C\uDFAD",
            "\uD83C\uDFAA",
            "\uD83C\uDFA2",
            "\uD83C\uDFA1",
            "\uD83C\uDFAF",
            "\uD83C\uDFB1",
            "\uD83C\uDFB2",
            "\uD83C\uDFB3",
            "\uD83C\uDFB0",
            "\uD83C\uDFAA"
        ]
    },
    {
        name: "Rotina",
        emojis: [
            "\uD83D\uDEC1",
            "\uD83D\uDEBF",
            "\uD83E\uDDF9",
            "\uD83E\uDDFA",
            "\uD83D\uDED2",
            "\uD83C\uDF73",
            "\uD83D\uDECB️",
            "\uD83D\uDE97",
            "\uD83D\uDE8C",
            "\uD83C\uDFE0",
            "\uD83D\uDCF1",
            "\uD83D\uDCA1",
            "\uD83D\uDD27",
            "\uD83D\uDD28",
            "\uD83E\uDDF0",
            "☕"
        ]
    }
];
const EmojiPicker = ({ onSelect , onClose  })=>{
    const [currentCategory, setCurrentCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "fixed inset-0 z-50",
        onClick: onClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "fixed bg-gray-800 border border-gray-700 rounded-lg shadow-xl",
            onClick: (e)=>e.stopPropagation(),
            style: {
                width: "280px",
                maxHeight: "380px",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "#4B5563 #1F2937"
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "sticky top-0 bg-gray-800 p-3 border-b border-gray-700 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: ()=>setCurrentCategory((prev)=>prev > 0 ? prev - 1 : emojiCategories.length - 1),
                            className: "w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-lg text-lg",
                            children: "◀"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "text-base font-medium px-2",
                            children: emojiCategories[currentCategory].name
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: ()=>setCurrentCategory((prev)=>prev < emojiCategories.length - 1 ? prev + 1 : 0),
                            className: "w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-lg text-lg",
                            children: "▶"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "p-4",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "grid grid-cols-7 gap-3",
                        children: emojiCategories[currentCategory].emojis.map((emoji, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: ()=>onSelect(emoji),
                                className: "w-8 h-8 flex items-center justify-center text-2xl hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110",
                                children: emoji
                            }, index))
                    })
                })
            ]
        })
    });
};


/***/ })

};
;