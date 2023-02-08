/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!(0,_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(titleValidatable) ||
            !(0,_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(descriptionValidatable) ||
            !(0,_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(peopleValidatable)) {
            alert("Invalid input, please try again!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-items.ts":
/*!*****************************************!*\
  !*** ./src/components/project-items.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("DragEnd");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_items__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-items */ "./src/components/project-items.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_2__.Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProject(prjId, this.type === "active" ? _models_project_model__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Active : _models_project_model__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter((prj) => {
                if (this.type === "active") {
                    return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Active;
                }
                return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new _project_items__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project-model.ts":
/*!*************************************!*\
  !*** ./src/models/project-model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "State": () => (/* binding */ State),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project_model__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("active");
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("finished");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMERBQU8sNERBQTRELHVFQUFvQjtBQUN0SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN4QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMEQ7QUFDRjtBQUN4RCxJQUFJLG1FQUFZO0FBQ2hCLElBQUksaUVBQVc7QUFDZixJQUFJLGlFQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdG1hbmFnZXItdHlwZXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL3Byb2plY3RtYW5hZ2VyLXR5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovL3Byb2plY3RtYW5hZ2VyLXR5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW1zLnRzIiwid2VicGFjazovL3Byb2plY3RtYW5hZ2VyLXR5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vcHJvamVjdG1hbmFnZXItdHlwZXNjcmlwdC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3Byb2plY3RtYW5hZ2VyLXR5cGVzY3JpcHQvLi9zcmMvbW9kZWxzL3Byb2plY3QtbW9kZWwudHMiLCJ3ZWJwYWNrOi8vcHJvamVjdG1hbmFnZXItdHlwZXNjcmlwdC8uL3NyYy9zdGF0ZS9wcm9qZWN0LXN0YXRlLnRzIiwid2VicGFjazovL3Byb2plY3RtYW5hZ2VyLXR5cGVzY3JpcHQvLi9zcmMvdXRpbC92YWxpZGF0aW9uLnRzIiwid2VicGFjazovL3Byb2plY3RtYW5hZ2VyLXR5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdG1hbmFnZXItdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdG1hbmFnZXItdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3RtYW5hZ2VyLXR5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0bWFuYWdlci10eXBlc2NyaXB0Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZUlkLCBob3N0RWxlbWVudElkLCBpbnNlcnRBdFN0YXJ0LCBuZXdFbGVtZW50SWQpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKTtcbiAgICAgICAgdGhpcy5ob3N0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RFbGVtZW50SWQpO1xuICAgICAgICBjb25zdCBpbXBvcnRlZE5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsIHRydWUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGlmIChuZXdFbGVtZW50SWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmF0dGFjaChpbnNlcnRBdFN0YXJ0KTtcbiAgICB9XG4gICAgYXR0YWNoKGluc2VydEF0QmVnaW5uaW5nKSB7XG4gICAgICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KGluc2VydEF0QmVnaW5uaW5nID8gXCJhZnRlcmJlZ2luXCIgOiBcImJlZm9yZWVuZFwiLCB0aGlzLmVsZW1lbnQpO1xuICAgIH1cbn1cbiIsInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XG5pbXBvcnQgeyB2YWxpZGF0ZSB9IGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlXCI7XG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJwcm9qZWN0LWlucHV0XCIsIFwiYXBwXCIsIHRydWUsIFwidXNlci1pbnB1dFwiKTtcbiAgICAgICAgdGhpcy50aXRsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIik7XG4gICAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGVvcGxlXCIpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIH1cbiAgICBjb25maWd1cmUoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGFuZGxlcik7XG4gICAgfVxuICAgIHJlbmRlckNvbnRlbnQoKSB7IH1cbiAgICBnYXRoZXJVc2VySW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IGVudGVyZWRUaXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICAgIGNvbnN0IGVudGVyZWREZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICAgIGNvbnN0IGVudGVyZWRQZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgICAgY29uc3QgdGl0bGVWYWxpZGF0YWJsZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBlbnRlcmVkVGl0bGUsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25WYWxpZGF0YWJsZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBlbnRlcmVkRGVzY3JpcHRpb24sXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIG1pbkxlbmd0aDogNSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcGVvcGxlVmFsaWRhdGFibGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogK2VudGVyZWRQZW9wbGUsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIG1pbjogMSxcbiAgICAgICAgICAgIG1heDogNSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZSh0aXRsZVZhbGlkYXRhYmxlKSB8fFxuICAgICAgICAgICAgIXZhbGlkYXRlKGRlc2NyaXB0aW9uVmFsaWRhdGFibGUpIHx8XG4gICAgICAgICAgICAhdmFsaWRhdGUocGVvcGxlVmFsaWRhdGFibGUpKSB7XG4gICAgICAgICAgICBhbGVydChcIkludmFsaWQgaW5wdXQsIHBsZWFzZSB0cnkgYWdhaW4hXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRQZW9wbGVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFySW5wdXRzKCkge1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICB9XG4gICAgc3VibWl0SGFuZGxlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XG4gICAgICAgICAgICBjb25zdCBbdGl0bGUsIGRlc2MsIHBlb3BsZV0gPSB1c2VySW5wdXQ7XG4gICAgICAgICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgcGVvcGxlKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJJbnB1dHMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbl9fZGVjb3JhdGUoW1xuICAgIGF1dG9iaW5kXG5dLCBQcm9qZWN0SW5wdXQucHJvdG90eXBlLCBcInN1Ym1pdEhhbmRsZXJcIiwgbnVsbCk7XG4iLCJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBnZXQgcGVyc29ucygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvamVjdC5wZW9wbGUgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjEgcGVyc29uXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm9qZWN0LnBlb3BsZX0gcGVyc29uc2A7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3RydWN0b3IoaG9zdElkLCBwcm9qZWN0KSB7XG4gICAgICAgIHN1cGVyKFwic2luZ2xlLXByb2plY3RcIiwgaG9zdElkLCBmYWxzZSwgcHJvamVjdC5pZCk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICAgIH1cbiAgICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCB0aGlzLnByb2plY3QuaWQpO1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9IFwibW92ZVwiO1xuICAgIH1cbiAgICBkcmFnRW5kSGFuZGxlcihfKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRHJhZ0VuZFwiKTtcbiAgICB9XG4gICAgY29uZmlndXJlKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgdGhpcy5kcmFnRW5kSGFuZGxlcik7XG4gICAgfVxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XG4gICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDNcIikudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbnMgKyBcIiBhc3NpZ25lZFwiO1xuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInBcIikudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247XG4gICAgfVxufVxuX19kZWNvcmF0ZShbXG4gICAgYXV0b2JpbmRcbl0sIFByb2plY3RJdGVtLnByb3RvdHlwZSwgXCJkcmFnU3RhcnRIYW5kbGVyXCIsIG51bGwpO1xuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xuaW1wb3J0IHsgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdC1tb2RlbFwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlXCI7XG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gXCIuL3Byb2plY3QtaXRlbXNcIjtcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TGlzdCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSkge1xuICAgICAgICBzdXBlcihcInByb2plY3QtbGlzdFwiLCBcImFwcFwiLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gW107XG4gICAgICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICAgIH1cbiAgICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09IFwidGV4dC9wbGFpblwiKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcbiAgICAgICAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKFwiZHJvcHBhYmxlXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRyb3BIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByaklkID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xuICAgICAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QocHJqSWQsIHRoaXMudHlwZSA9PT0gXCJhY3RpdmVcIiA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZCk7XG4gICAgfVxuICAgIGRyYWdMZWF2ZUhhbmRsZXIoXykge1xuICAgICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuICAgICAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZShcImRyb3BwYWJsZVwiKTtcbiAgICB9XG4gICAgY29uZmlndXJlKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIpO1xuICAgICAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHJlbGV2YW50UHJvamVjdHM7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpLmlkID0gbGlzdElkO1xuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgXCIgUFJPSkVDVFNcIjtcbiAgICB9XG4gICAgcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGApO1xuICAgICAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZm9yIChjb25zdCBwcmpJdGVtIG9mIHRoaXMuYXNzaWduZWRQcm9qZWN0cykge1xuICAgICAgICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikuaWQsIHByakl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxufVxuX19kZWNvcmF0ZShbXG4gICAgYXV0b2JpbmRcbl0sIFByb2plY3RMaXN0LnByb3RvdHlwZSwgXCJkcmFnT3ZlckhhbmRsZXJcIiwgbnVsbCk7XG5fX2RlY29yYXRlKFtcbiAgICBhdXRvYmluZFxuXSwgUHJvamVjdExpc3QucHJvdG90eXBlLCBcImRyb3BIYW5kbGVyXCIsIG51bGwpO1xuX19kZWNvcmF0ZShbXG4gICAgYXV0b2JpbmRcbl0sIFByb2plY3RMaXN0LnByb3RvdHlwZSwgXCJkcmFnTGVhdmVIYW5kbGVyXCIsIG51bGwpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKF8sIF8yLCBkZXNjcmlwdG9yKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIGNvbnN0IGFkakRlc2NyaXB0b3IgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gYm91bmRGbjtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBhZGpEZXNjcmlwdG9yO1xufVxuIiwiZXhwb3J0IHZhciBQcm9qZWN0U3RhdHVzO1xuKGZ1bmN0aW9uIChQcm9qZWN0U3RhdHVzKSB7XG4gICAgUHJvamVjdFN0YXR1c1tQcm9qZWN0U3RhdHVzW1wiQWN0aXZlXCJdID0gMF0gPSBcIkFjdGl2ZVwiO1xuICAgIFByb2plY3RTdGF0dXNbUHJvamVjdFN0YXR1c1tcIkZpbmlzaGVkXCJdID0gMV0gPSBcIkZpbmlzaGVkXCI7XG59KShQcm9qZWN0U3RhdHVzIHx8IChQcm9qZWN0U3RhdHVzID0ge30pKTtcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGUsIHN0YXR1cykge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnBlb3BsZSA9IHBlb3BsZTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdC1tb2RlbFwiO1xuZXhwb3J0IGNsYXNzIFN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgICB9XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuICAgIGFkZFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uLCBudW1PZlBlb3BsZSkge1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoTWF0aC5yYW5kb20oKS50b1N0cmluZygpLCB0aXRsZSwgZGVzY3JpcHRpb24sIG51bU9mUGVvcGxlLCBQcm9qZWN0U3RhdHVzLkFjdGl2ZSk7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgbW92ZVByb2plY3QocHJvamVjdElkLCBuZXdTdGF0dXMpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgocHJqKSA9PiBwcmouaWQgPT09IHByb2plY3RJZCk7XG4gICAgICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcbiAgICAgICAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQpIHtcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDA7XG4gICAgfVxuICAgIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aCAhPSBudWxsICYmXG4gICAgICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlzVmFsaWQgPVxuICAgICAgICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aDtcbiAgICB9XG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoICE9IG51bGwgJiZcbiAgICAgICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaXNWYWxpZCA9XG4gICAgICAgICAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoO1xuICAgIH1cbiAgICBpZiAodmFsaWRhdGFibGVJbnB1dC5taW4gIT0gbnVsbCAmJlxuICAgICAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID49IHZhbGlkYXRhYmxlSW5wdXQubWluO1xuICAgIH1cbiAgICBpZiAodmFsaWRhdGFibGVJbnB1dC5tYXggIT0gbnVsbCAmJlxuICAgICAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4O1xuICAgIH1cbiAgICByZXR1cm4gaXNWYWxpZDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0XCI7XG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0XCI7XG5uZXcgUHJvamVjdElucHV0KCk7XG5uZXcgUHJvamVjdExpc3QoXCJhY3RpdmVcIik7XG5uZXcgUHJvamVjdExpc3QoXCJmaW5pc2hlZFwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==