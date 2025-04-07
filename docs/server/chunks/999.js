"use strict";
exports.id = 999;
exports.ids = [999];
exports.modules = {

/***/ 6999:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ useTasks),
/* harmony export */   "o": () => (/* binding */ TaskProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const STORAGE_KEY = "myschedule_tasks";
const TaskContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const TaskProvider = ({ children  })=>{
    const [tasks, setTasks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [isInitialized, setIsInitialized] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Carregar tarefas do localStorage quando o componente montar
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            const savedTasks = localStorage.getItem(STORAGE_KEY);
            if (savedTasks) {
                const parsedTasks = JSON.parse(savedTasks);
                console.log("Carregando tarefas:", parsedTasks); // Debug
                setTasks(parsedTasks);
            }
            setIsInitialized(true);
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
        }
    }, []);
    // Salvar tarefas no localStorage sempre que mudarem
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isInitialized) {
            try {
                console.log("Salvando tarefas:", tasks); // Debug
                localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            } catch (error) {
                console.error("Erro ao salvar tarefas:", error);
            }
        }
    }, [
        tasks,
        isInitialized
    ]);
    const addTask = (task)=>{
        setTasks((prev)=>[
                ...prev,
                {
                    ...task,
                    id: crypto.randomUUID()
                }
            ]);
    };
    const addTasks = (newTasks)=>{
        setTasks((prev)=>[
                ...prev,
                ...newTasks
            ]);
    };
    const deleteTask = (id)=>{
        console.log("Deletando tarefa:", id); // Debug
        setTasks((prev)=>{
            const updated = prev.filter((task)=>task.id !== id);
            console.log("Novo estado de tarefas:", updated); // Debug
            return updated;
        });
    };
    const updateTask = (updatedTask)=>{
        setTasks((prev)=>prev.map((task)=>task.id === updatedTask.id ? updatedTask : task));
    };
    if (!isInitialized) {
        return null; // ou um loading spinner
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TaskContext.Provider, {
        value: {
            tasks,
            addTask,
            addTasks,
            deleteTask,
            updateTask
        },
        children: children
    });
};
const useTasks = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(TaskContext);
    if (context === undefined) {
        throw new Error("useTasks deve ser usado dentro de um TaskProvider");
    }
    return context;
};


/***/ })

};
;