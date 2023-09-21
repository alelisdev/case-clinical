"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_task-item_shared_task-item_store_ts"],{

/***/ 648027:
/*!**********************************************************************!*\
  !*** ./libs/web/task-item/shared/actions/create-task-item.action.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTaskItemAction": () => (/* binding */ CreateTaskItemAction)
/* harmony export */ });
/* harmony import */ var _task_item_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-item.business-action-base */ 307146);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_task_item_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-task-item-input-is-valid.rule */ 595029);




class CreateTaskItemAction extends _task_item_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TaskItemBusinessActionBase {
  constructor(input) {
    super('CreateTaskItemAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_task_item_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateTaskItemInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateTaskItem({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 307146:
/*!*****************************************************************************!*\
  !*** ./libs/web/task-item/shared/actions/task-item.business-action-base.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskItemBusinessActionBase": () => (/* binding */ TaskItemBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class TaskItemBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
  // override loggingService!: ILoggingService;
  // override actionName: string;
  constructor(actionName) {
    super();
    this.showRuleMessages = true;
    this.hideRuleMessages = false;
    this.actionName = actionName;
  }
  /**
   * Use the [Do] method to perform the action. Also uses [inversion of control]
   * and provides the action the same instance of the [service context] and
   * [logging service].
   */
  Do(businessProvider) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;
    this.execute();
    return this.response;
  }
}

/***/ }),

/***/ 821522:
/*!***********************************************************************!*\
  !*** ./libs/web/task-item/shared/actions/update-task-items.action.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateTaskItemAction": () => (/* binding */ UpdateTaskItemAction),
/* harmony export */   "UpdateTaskItemsAction": () => (/* binding */ UpdateTaskItemsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _task_item_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-item.business-action-base */ 307146);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateTaskItemsAction extends _task_item_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TaskItemBusinessActionBase {
  constructor(taskItems) {
    super('UpdateTaskItemsAction');
    this.taskItems = taskItems;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.taskItems, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateTaskItems({
      input: {
        taskItems: this.taskItems
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateTaskItemAction extends _task_item_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TaskItemBusinessActionBase {
  constructor(taskItem, taskItemId) {
    super('UpdateTaskItemAction');
    this.taskItem = taskItem;
    this.taskItemId = taskItemId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.taskItem, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.taskItemId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateTaskItem({
      taskItemId: this.taskItemId,
      input: this.taskItem
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 529167:
/*!***********************************************************************************!*\
  !*** ./libs/web/task-item/shared/actions/validate-task-item-excel-data.action.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateTaskItemExcelDataAction": () => (/* binding */ ValidateTaskItemExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _task_item_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-item.business-action-base */ 307146);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateTaskItemExcelDataAction extends _task_item_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TaskItemBusinessActionBase {
  constructor(excelData, legalCases, assignedTos) {
    super('ValidateTaskItemExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.legalCases = legalCases;
    this.assignedTos = assignedTos;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`assignedToName_${index}_is_valid}`, "Assigned to Is Not Valid", 'assignedTo.name', datum['assignedTo'], this.assignedTos, true));
    });
    // Check Duplicate Error
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportDuplicateRule('nameIsUnique', 'Name should be unique', names, true));
  }
  performAction() {}
  finish() {
    super.finish();
    const unknownNamesByColumn = {};
    let conflictNames = [];
    if (this.validationContext.hasRuleViolations()) {
      this.valid = false;
      this.validationContext.rules.map(rule => {
        if (rule instanceof _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule) {
          if (!rule.isValid) {
            if (!unknownNamesByColumn[rule.columnName]) {
              unknownNamesByColumn[rule.columnName] = {
                options: rule.possibleValueList.map(el => el.name),
                newNames: [rule.newName]
              };
            } else {
              if (!unknownNamesByColumn[rule.columnName]['newNames'].includes(rule.newName)) {
                unknownNamesByColumn[rule.columnName]['newNames'].push(rule.newName);
              }
            }
          }
        } else if (rule instanceof _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportDuplicateRule) {
          if (!rule.isValid) conflictNames = rule.conflicts;
        }
      });
    } else this.valid = true;
    this.response = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)({
      valid: this.valid,
      excelData: this.excelData,
      conflictNames,
      unknownNames: unknownNamesByColumn
    });
  }
}

/***/ }),

/***/ 595029:
/*!*********************************************************************************!*\
  !*** ./libs/web/task-item/shared/rules/create-task-item-input-is-valid.rule.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTaskItemInputIsValidRule": () => (/* binding */ CreateTaskItemInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _task_item_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-item-name-is-valid.rule */ 469316);


class CreateTaskItemInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _task_item_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.TaskItemNameIsValidRule('name', 'The taskitem name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 469316:
/*!*************************************************************************!*\
  !*** ./libs/web/task-item/shared/rules/task-item-name-is-valid.rule.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskItemNameIsValidRule": () => (/* binding */ TaskItemNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class TaskItemNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 448822:
/*!**************************************************************************!*\
  !*** ./libs/web/task-item/shared/task-item.business-provider.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskItemBusinessProviderService": () => (/* binding */ TaskItemBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_task_item_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-task-item-excel-data.action */ 529167);
/* harmony import */ var _actions_create_task_item_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-task-item.action */ 648027);
/* harmony import */ var _actions_update_task_items_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-task-items.action */ 821522);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class TaskItemBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.TaskItemBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createTaskItem(input) {
    const action = new _actions_create_task_item_action__WEBPACK_IMPORTED_MODULE_2__.CreateTaskItemAction(input);
    action.Do(this);
    return action.response;
  }
  updateTaskItem(input, taskItemId) {
    const action = new _actions_update_task_items_action__WEBPACK_IMPORTED_MODULE_3__.UpdateTaskItemAction(input, taskItemId);
    action.Do(this);
    return action.response;
  }
  importTaskItems(taskItems) {
    const updateTaskItemsAction = new _actions_update_task_items_action__WEBPACK_IMPORTED_MODULE_3__.UpdateTaskItemsAction(taskItems);
    updateTaskItemsAction.Do(this);
    return updateTaskItemsAction.response;
  }
  validateTaskItemExcelData(excelData, legalCases, assignedTos) {
    const validateTaskItemExcelDataAction = new _actions_validate_task_item_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateTaskItemExcelDataAction(excelData, legalCases, assignedTos);
    validateTaskItemExcelDataAction.Do(this);
    return validateTaskItemExcelDataAction.response;
  }
}
TaskItemBusinessProviderService.ɵfac = function TaskItemBusinessProviderService_Factory(t) {
  return new (t || TaskItemBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
TaskItemBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: TaskItemBusinessProviderService,
  factory: TaskItemBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 765429:
/*!********************************************************!*\
  !*** ./libs/web/task-item/shared/task-item.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskItemService": () => (/* binding */ TaskItemService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _task_item_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task-item.business-provider.service */ 448822);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class TaskItemService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("TaskItemService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createTaskItem(input) {
    return this.businessProvider.createTaskItem(input);
  }
  updateTaskItem(input, taskItemId) {
    return this.businessProvider.updateTaskItem(input, taskItemId);
  }
  importTaskItems(taskItems) {
    return this.businessProvider.importTaskItems(taskItems);
  }
  validateTaskItemExcelData(excelData, legalCases, assignedTos) {
    return this.businessProvider.validateTaskItemExcelData(excelData, legalCases, assignedTos);
  }
}
TaskItemService.ɵfac = function TaskItemService_Factory(t) {
  return new (t || TaskItemService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_task_item_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.TaskItemBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_task_item_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.TaskItemBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
TaskItemService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: TaskItemService,
  factory: TaskItemService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 500563:
/*!******************************************************!*\
  !*** ./libs/web/task-item/shared/task-item.store.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTaskItemFeatureStore": () => (/* binding */ WebTaskItemFeatureStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 670262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _task_item_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./task-item.service */ 765429);














class WebTaskItemFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, taskItemService) {
    super({
      loading: false,
      taskItems: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      legalCaseId: undefined,
      assignedToId: undefined,
      paging: {
        limit: 10000,
        skip: 0
      }
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.formService = formService;
    this.taskItemService = taskItemService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.taskItems$ = this.select(s => s.taskItems);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.users$ = this.select(s => s.users || []);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.assignedToId$ = this.select(s => s.assignedToId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.taskItems$, this.legalCases$, this.users$, (errors, loading, item, formName, taskItems, legalCases, users) => ({
      errors,
      loading,
      item,
      formName,
      taskItems,
      legalCases,
      users
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.legalCaseId$, this.assignedToId$, this.searchQuery$, (paging, legalCaseId, assignedToId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      legalCaseId: legalCaseId,
      assignedToId: assignedToId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
    }));
    this.setAssignedToId = this.updater((state, assignedToId) => Object.assign(Object.assign({}, state), {
      assignedToId
    }));
    this.filterLegalCases = term => this.data.userSelectLegalCases({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let legalCases = res.data.items;
      this.patchState({
        legalCases
      });
      return legalCases;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterUsers = term => this.data.userSelectUsers({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let users = res.data.items;
      this.patchState({
        users
      });
      return users;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.addUser = this.updater((state, user) => Object.assign(Object.assign({}, state), {
      users: state.users.concat(user)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewTaskItem = this.updater((state, taskItem) => Object.assign(Object.assign({}, state), {
      taskItems: [...state.taskItems, taskItem]
    }));
    this.updateTaskItem = this.updater((state, taskItem) => {
      return Object.assign(Object.assign({}, state), {
        taskItems: state.taskItems.map(el => {
          if (el.id === taskItem.id) {
            return taskItem;
          } else {
            return el;
          }
        })
      });
    });
    this.addTaskItems = this.updater((state, newTaskItems) => Object.assign(Object.assign({}, state), {
      taskItems: state.taskItems.concat(newTaskItems)
    }));
    this.updateTaskItems = this.updater((state, updatedTaskItems) => {
      return Object.assign(Object.assign({}, state), {
        taskItems: state.taskItems.map(taskItem => {
          const updated = updatedTaskItems.find(el => el.id === taskItem.id);
          return updated ? updated : taskItem;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadTaskItemEffect = this.effect(taskItemId$ => taskItemId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(taskItemId => this.data.userTaskItem({
      taskItemId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.patchState({
        item: res.data.item,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadTaskItemsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userTaskItems({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      taskItems: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createTaskItemEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.taskItemService.createTaskItem(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(taskItem => {
      this.addNewTaskItem(taskItem);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: taskItem,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, errors => {
      if (errors.graphQLErrors) {
        this.toast.error(errors.graphQLErrors[0].message, {
          duration: 3000
        });
        this.patchState({
          loading: false,
          errors: errors.graphQLErrors ? errors.graphQLErrors : errors
        });
      } else {
        this.toast.error(errors.Message);
        this.formService.setErrors(errors.Data);
      }
    })))));
    this.updateTaskItemEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.taskItemService.updateTaskItem(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(taskItem => {
      this.updateTaskItem(taskItem);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: taskItem,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, errors => {
      if (errors.graphQLErrors) {
        this.toast.error(errors.graphQLErrors[0].message, {
          duration: 3000
        });
        this.patchState({
          loading: false,
          errors: errors.graphQLErrors ? errors.graphQLErrors : errors
        });
      } else {
        this.toast.error(errors.Message);
        this.formService.setErrors(errors.Data);
      }
    })))));
    this.deleteTaskItemEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, taskItem]) => {
      return this.data.userDeleteTaskItem({
        taskItemId: taskItem.id
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.toast.success("Deleted successfully!", {
          duration: 3000
        });
        setTimeout(() => this.patchState({
          item: res.data.deleted,
          loading: false,
          done: true
        }), 300);
        setTimeout(() => this.patchState({
          done: false,
          item: null
        }), 600);
      }, errors => {
        if (errors.graphQLErrors) {
          this.toast.error(errors.graphQLErrors[0].message, {
            duration: 3000
          });
          this.patchState({
            loading: false,
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors
          });
        } else {
          this.toast.error(errors.Message);
          this.formService.setErrors(errors.Data);
        }
      }));
    })));
    this.importExcelEffect = this.effect($data => $data.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.taskItemService.importTaskItems(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      var _a;
      this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
        duration: 3000
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_6__.EMPTY;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(updateResult => {
      const created = JSON.parse(updateResult.created);
      const updated = JSON.parse(updateResult.updated);
      const failed = JSON.parse(updateResult.failed);
      const total = created.length + updated.length + failed.length;
      this.addTaskItems(created);
      this.updateTaskItems(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('taskItemId')) {
      var taskItemId = this.route.snapshot.paramMap.get('taskItemId');
      this.setFormName('taskItem_edit');
    } else {
      this.setFormName('taskItem_create');
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
    if (this.route.snapshot.paramMap.has("assignedToId")) {
      var assignedToId = this.route.snapshot.paramMap.get("assignedToId");
      this.setAssignedToId(assignedToId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.taskItemService.validateTaskItemExcelData(excelData, vm.legalCases, vm.users);
    }));
  }
}
WebTaskItemFeatureStore.ɵfac = function WebTaskItemFeatureStore_Factory(t) {
  return new (t || WebTaskItemFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_task_item_service__WEBPACK_IMPORTED_MODULE_12__.TaskItemService));
};
WebTaskItemFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebTaskItemFeatureStore,
  factory: WebTaskItemFeatureStore.ɵfac
});

/***/ })

}]);