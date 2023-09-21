"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_task-tag_shared_task-tag_store_ts"],{

/***/ 14960:
/*!********************************************************************!*\
  !*** ./libs/web/task-tag/shared/actions/create-task-tag.action.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTaskTagAction": () => (/* binding */ CreateTaskTagAction)
/* harmony export */ });
/* harmony import */ var _task_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-tag.business-action-base */ 492163);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_task_tag_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-task-tag-input-is-valid.rule */ 417127);




class CreateTaskTagAction extends _task_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TaskTagBusinessActionBase {
  constructor(input) {
    super('CreateTaskTagAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_task_tag_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateTaskTagInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateTaskTag({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 492163:
/*!***************************************************************************!*\
  !*** ./libs/web/task-tag/shared/actions/task-tag.business-action-base.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskTagBusinessActionBase": () => (/* binding */ TaskTagBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class TaskTagBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 467386:
/*!*********************************************************************!*\
  !*** ./libs/web/task-tag/shared/actions/update-task-tags.action.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateTaskTagAction": () => (/* binding */ UpdateTaskTagAction),
/* harmony export */   "UpdateTaskTagsAction": () => (/* binding */ UpdateTaskTagsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _task_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-tag.business-action-base */ 492163);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateTaskTagsAction extends _task_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TaskTagBusinessActionBase {
  constructor(taskTags) {
    super('UpdateTaskTagsAction');
    this.taskTags = taskTags;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.taskTags, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateTaskTags({
      input: {
        taskTags: this.taskTags
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateTaskTagAction extends _task_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TaskTagBusinessActionBase {
  constructor(taskTag, taskTagId) {
    super('UpdateTaskTagAction');
    this.taskTag = taskTag;
    this.taskTagId = taskTagId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.taskTag, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.taskTagId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateTaskTag({
      taskTagId: this.taskTagId,
      input: this.taskTag
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 484706:
/*!*********************************************************************************!*\
  !*** ./libs/web/task-tag/shared/actions/validate-task-tag-excel-data.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateTaskTagExcelDataAction": () => (/* binding */ ValidateTaskTagExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _task_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-tag.business-action-base */ 492163);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateTaskTagExcelDataAction extends _task_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TaskTagBusinessActionBase {
  constructor(excelData, tasks, tags) {
    super('ValidateTaskTagExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.tasks = tasks;
    this.tags = tags;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`taskName_${index}_is_valid}`, "Task Is Not Valid", 'task.name', datum['task'], this.tasks, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`tagName_${index}_is_valid}`, "Tag Is Not Valid", 'tag.name', datum['tag'], this.tags, true));
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

/***/ 417127:
/*!*******************************************************************************!*\
  !*** ./libs/web/task-tag/shared/rules/create-task-tag-input-is-valid.rule.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTaskTagInputIsValidRule": () => (/* binding */ CreateTaskTagInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _task_tag_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-tag-name-is-valid.rule */ 135660);


class CreateTaskTagInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _task_tag_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.TaskTagNameIsValidRule('name', 'The tasktag name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 135660:
/*!***********************************************************************!*\
  !*** ./libs/web/task-tag/shared/rules/task-tag-name-is-valid.rule.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskTagNameIsValidRule": () => (/* binding */ TaskTagNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class TaskTagNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 545891:
/*!************************************************************************!*\
  !*** ./libs/web/task-tag/shared/task-tag.business-provider.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskTagBusinessProviderService": () => (/* binding */ TaskTagBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_task_tag_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-task-tag-excel-data.action */ 484706);
/* harmony import */ var _actions_create_task_tag_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-task-tag.action */ 14960);
/* harmony import */ var _actions_update_task_tags_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-task-tags.action */ 467386);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class TaskTagBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.TaskTagBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createTaskTag(input) {
    const action = new _actions_create_task_tag_action__WEBPACK_IMPORTED_MODULE_2__.CreateTaskTagAction(input);
    action.Do(this);
    return action.response;
  }
  updateTaskTag(input, taskTagId) {
    const action = new _actions_update_task_tags_action__WEBPACK_IMPORTED_MODULE_3__.UpdateTaskTagAction(input, taskTagId);
    action.Do(this);
    return action.response;
  }
  importTaskTags(taskTags) {
    const updateTaskTagsAction = new _actions_update_task_tags_action__WEBPACK_IMPORTED_MODULE_3__.UpdateTaskTagsAction(taskTags);
    updateTaskTagsAction.Do(this);
    return updateTaskTagsAction.response;
  }
  validateTaskTagExcelData(excelData, tasks, tags) {
    const validateTaskTagExcelDataAction = new _actions_validate_task_tag_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateTaskTagExcelDataAction(excelData, tasks, tags);
    validateTaskTagExcelDataAction.Do(this);
    return validateTaskTagExcelDataAction.response;
  }
}
TaskTagBusinessProviderService.ɵfac = function TaskTagBusinessProviderService_Factory(t) {
  return new (t || TaskTagBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
TaskTagBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: TaskTagBusinessProviderService,
  factory: TaskTagBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 203321:
/*!******************************************************!*\
  !*** ./libs/web/task-tag/shared/task-tag.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskTagService": () => (/* binding */ TaskTagService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _task_tag_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task-tag.business-provider.service */ 545891);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class TaskTagService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("TaskTagService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createTaskTag(input) {
    return this.businessProvider.createTaskTag(input);
  }
  updateTaskTag(input, taskTagId) {
    return this.businessProvider.updateTaskTag(input, taskTagId);
  }
  importTaskTags(taskTags) {
    return this.businessProvider.importTaskTags(taskTags);
  }
  validateTaskTagExcelData(excelData, tasks, tags) {
    return this.businessProvider.validateTaskTagExcelData(excelData, tasks, tags);
  }
}
TaskTagService.ɵfac = function TaskTagService_Factory(t) {
  return new (t || TaskTagService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_task_tag_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.TaskTagBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_task_tag_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.TaskTagBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
TaskTagService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: TaskTagService,
  factory: TaskTagService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 617171:
/*!****************************************************!*\
  !*** ./libs/web/task-tag/shared/task-tag.store.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTaskTagFeatureStore": () => (/* binding */ WebTaskTagFeatureStore)
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
/* harmony import */ var _task_tag_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./task-tag.service */ 203321);














class WebTaskTagFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, taskTagService) {
    super({
      loading: false,
      taskTags: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      taskId: undefined,
      tagId: undefined,
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
    this.taskTagService = taskTagService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.taskTags$ = this.select(s => s.taskTags);
    this.taskItems$ = this.select(s => s.taskItems || []);
    this.tags$ = this.select(s => s.tags || []);
    this.taskId$ = this.select(s => s.taskId);
    this.tagId$ = this.select(s => s.tagId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.taskTags$, this.taskItems$, this.tags$, (errors, loading, item, formName, taskTags, taskItems, tags) => ({
      errors,
      loading,
      item,
      formName,
      taskTags,
      taskItems,
      tags
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.taskId$, this.tagId$, this.searchQuery$, (paging, taskId, tagId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      taskId: taskId,
      tagId: tagId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setTaskId = this.updater((state, taskId) => Object.assign(Object.assign({}, state), {
      taskId
    }));
    this.setTagId = this.updater((state, tagId) => Object.assign(Object.assign({}, state), {
      tagId
    }));
    this.filterTaskItems = term => this.data.userSelectTaskItems({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let taskItems = res.data.items;
      this.patchState({
        taskItems
      });
      return taskItems;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterTags = term => this.data.userSelectTags({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let tags = res.data.items;
      this.patchState({
        tags
      });
      return tags;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addTaskItem = this.updater((state, taskItem) => Object.assign(Object.assign({}, state), {
      taskItems: state.taskItems.concat(taskItem)
    }));
    this.addTag = this.updater((state, tag) => Object.assign(Object.assign({}, state), {
      tags: state.tags.concat(tag)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewTaskTag = this.updater((state, taskTag) => Object.assign(Object.assign({}, state), {
      taskTags: [...state.taskTags, taskTag]
    }));
    this.updateTaskTag = this.updater((state, taskTag) => {
      return Object.assign(Object.assign({}, state), {
        taskTags: state.taskTags.map(el => {
          if (el.id === taskTag.id) {
            return taskTag;
          } else {
            return el;
          }
        })
      });
    });
    this.addTaskTags = this.updater((state, newTaskTags) => Object.assign(Object.assign({}, state), {
      taskTags: state.taskTags.concat(newTaskTags)
    }));
    this.updateTaskTags = this.updater((state, updatedTaskTags) => {
      return Object.assign(Object.assign({}, state), {
        taskTags: state.taskTags.map(taskTag => {
          const updated = updatedTaskTags.find(el => el.id === taskTag.id);
          return updated ? updated : taskTag;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadTaskTagEffect = this.effect(taskTagId$ => taskTagId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(taskTagId => this.data.userTaskTag({
      taskTagId
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
    this.loadTaskTagsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userTaskTags({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      taskTags: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createTaskTagEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.taskTagService.createTaskTag(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(taskTag => {
      this.addNewTaskTag(taskTag);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: taskTag,
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
    this.updateTaskTagEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.taskTagService.updateTaskTag(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(taskTag => {
      this.updateTaskTag(taskTag);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: taskTag,
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
    this.deleteTaskTagEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, taskTag]) => {
      return this.data.userDeleteTaskTag({
        taskTagId: taskTag.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.taskTagService.importTaskTags(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addTaskTags(created);
      this.updateTaskTags(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('taskTagId')) {
      var taskTagId = this.route.snapshot.paramMap.get('taskTagId');
      this.setFormName('taskTag_edit');
    } else {
      this.setFormName('taskTag_create');
    }
    if (this.route.snapshot.paramMap.has("taskId")) {
      var taskId = this.route.snapshot.paramMap.get("taskId");
      this.setTaskId(taskId);
    }
    if (this.route.snapshot.paramMap.has("tagId")) {
      var tagId = this.route.snapshot.paramMap.get("tagId");
      this.setTagId(tagId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.taskTagService.validateTaskTagExcelData(excelData, vm.taskItems, vm.tags);
    }));
  }
}
WebTaskTagFeatureStore.ɵfac = function WebTaskTagFeatureStore_Factory(t) {
  return new (t || WebTaskTagFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_task_tag_service__WEBPACK_IMPORTED_MODULE_12__.TaskTagService));
};
WebTaskTagFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebTaskTagFeatureStore,
  factory: WebTaskTagFeatureStore.ɵfac
});

/***/ })

}]);