"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_case-pre-problem_shared_case-pre-problem_store_ts-libs_web_case-pre-problem_-2ff1d0"],{

/***/ 705038:
/*!*******************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/actions/case-pre-problem.business-action-base.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CasePreProblemBusinessActionBase": () => (/* binding */ CasePreProblemBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class CasePreProblemBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 334832:
/*!************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/actions/create-case-pre-problem.action.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCasePreProblemAction": () => (/* binding */ CreateCasePreProblemAction)
/* harmony export */ });
/* harmony import */ var _case_pre_problem_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-pre-problem.business-action-base */ 705038);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_case_pre_problem_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-case-pre-problem-input-is-valid.rule */ 757879);




class CreateCasePreProblemAction extends _case_pre_problem_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CasePreProblemBusinessActionBase {
  constructor(input) {
    super('CreateCasePreProblemAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_case_pre_problem_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateCasePreProblemInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateCasePreProblem({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 218744:
/*!*************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/actions/update-case-pre-problems.action.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCasePreProblemAction": () => (/* binding */ UpdateCasePreProblemAction),
/* harmony export */   "UpdateCasePreProblemsAction": () => (/* binding */ UpdateCasePreProblemsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_pre_problem_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-pre-problem.business-action-base */ 705038);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateCasePreProblemsAction extends _case_pre_problem_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CasePreProblemBusinessActionBase {
  constructor(casePreProblems) {
    super('UpdateCasePreProblemsAction');
    this.casePreProblems = casePreProblems;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.casePreProblems, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCasePreProblems({
      input: {
        casePreProblems: this.casePreProblems
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateCasePreProblemAction extends _case_pre_problem_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CasePreProblemBusinessActionBase {
  constructor(casePreProblem, casePreProblemId) {
    super('UpdateCasePreProblemAction');
    this.casePreProblem = casePreProblem;
    this.casePreProblemId = casePreProblemId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.casePreProblem, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.casePreProblemId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCasePreProblem({
      casePreProblemId: this.casePreProblemId,
      input: this.casePreProblem
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 370616:
/*!*************************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/actions/validate-case-pre-problem-excel-data.action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateCasePreProblemExcelDataAction": () => (/* binding */ ValidateCasePreProblemExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_pre_problem_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-pre-problem.business-action-base */ 705038);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateCasePreProblemExcelDataAction extends _case_pre_problem_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CasePreProblemBusinessActionBase {
  constructor(excelData, legalCases) {
    super('ValidateCasePreProblemExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.legalCases = legalCases;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
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

/***/ 499699:
/*!****************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/case-pre-problem.business-provider.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CasePreProblemBusinessProviderService": () => (/* binding */ CasePreProblemBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_case_pre_problem_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-case-pre-problem-excel-data.action */ 370616);
/* harmony import */ var _actions_create_case_pre_problem_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-case-pre-problem.action */ 334832);
/* harmony import */ var _actions_update_case_pre_problems_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-case-pre-problems.action */ 218744);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class CasePreProblemBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.CasePreProblemBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createCasePreProblem(input) {
    const action = new _actions_create_case_pre_problem_action__WEBPACK_IMPORTED_MODULE_2__.CreateCasePreProblemAction(input);
    action.Do(this);
    return action.response;
  }
  updateCasePreProblem(input, casePreProblemId) {
    const action = new _actions_update_case_pre_problems_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCasePreProblemAction(input, casePreProblemId);
    action.Do(this);
    return action.response;
  }
  importCasePreProblems(casePreProblems) {
    const updateCasePreProblemsAction = new _actions_update_case_pre_problems_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCasePreProblemsAction(casePreProblems);
    updateCasePreProblemsAction.Do(this);
    return updateCasePreProblemsAction.response;
  }
  validateCasePreProblemExcelData(excelData, legalCases) {
    const validateCasePreProblemExcelDataAction = new _actions_validate_case_pre_problem_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateCasePreProblemExcelDataAction(excelData, legalCases);
    validateCasePreProblemExcelDataAction.Do(this);
    return validateCasePreProblemExcelDataAction.response;
  }
}
CasePreProblemBusinessProviderService.ɵfac = function CasePreProblemBusinessProviderService_Factory(t) {
  return new (t || CasePreProblemBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
CasePreProblemBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: CasePreProblemBusinessProviderService,
  factory: CasePreProblemBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 65093:
/*!**********************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/case-pre-problem.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CasePreProblemService": () => (/* binding */ CasePreProblemService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _case_pre_problem_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./case-pre-problem.business-provider.service */ 499699);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class CasePreProblemService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("CasePreProblemService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createCasePreProblem(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createCasePreProblem(filteredObj);
  }
  updateCasePreProblem(input, casePreProblemId) {
    return this.businessProvider.updateCasePreProblem(input, casePreProblemId);
  }
  importCasePreProblems(casePreProblems) {
    return this.businessProvider.importCasePreProblems(casePreProblems);
  }
  validateCasePreProblemExcelData(excelData, legalCases) {
    return this.businessProvider.validateCasePreProblemExcelData(excelData, legalCases);
  }
}
CasePreProblemService.ɵfac = function CasePreProblemService_Factory(t) {
  return new (t || CasePreProblemService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_pre_problem_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CasePreProblemBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_pre_problem_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CasePreProblemBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
CasePreProblemService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CasePreProblemService,
  factory: CasePreProblemService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 909210:
/*!********************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/case-pre-problem.store.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCasePreProblemFeatureStore": () => (/* binding */ WebCasePreProblemFeatureStore)
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
/* harmony import */ var _case_pre_problem_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./case-pre-problem.service */ 65093);














class WebCasePreProblemFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, casePreProblemService) {
    super({
      loading: false,
      casePreProblems: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      legalCaseId: undefined,
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
    this.casePreProblemService = casePreProblemService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.casePreProblems$ = this.select(s => s.casePreProblems);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.casePreProblems$, this.legalCases$, (errors, loading, item, formName, casePreProblems, legalCases) => ({
      errors,
      loading,
      item,
      formName,
      casePreProblems,
      legalCases
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.legalCaseId$, this.searchQuery$, (paging, legalCaseId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      legalCaseId: legalCaseId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
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
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewCasePreProblem = this.updater((state, casePreProblem) => Object.assign(Object.assign({}, state), {
      casePreProblems: [...state.casePreProblems, casePreProblem]
    }));
    this.updateCasePreProblem = this.updater((state, casePreProblem) => {
      return Object.assign(Object.assign({}, state), {
        casePreProblems: state.casePreProblems.map(el => {
          if (el.id === casePreProblem.id) {
            return casePreProblem;
          } else {
            return el;
          }
        })
      });
    });
    this.addCasePreProblems = this.updater((state, newCasePreProblems) => Object.assign(Object.assign({}, state), {
      casePreProblems: state.casePreProblems.concat(newCasePreProblems)
    }));
    this.updateCasePreProblems = this.updater((state, updatedCasePreProblems) => {
      return Object.assign(Object.assign({}, state), {
        casePreProblems: state.casePreProblems.map(casePreProblem => {
          const updated = updatedCasePreProblems.find(el => el.id === casePreProblem.id);
          return updated ? updated : casePreProblem;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadCasePreProblemEffect = this.effect(casePreProblemId$ => casePreProblemId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(casePreProblemId => this.data.userCasePreProblem({
      casePreProblemId
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
    this.loadCasePreProblemsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userCasePreProblems({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      casePreProblems: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createCasePreProblemEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.casePreProblemService.createCasePreProblem(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(casePreProblem => {
      this.addNewCasePreProblem(casePreProblem);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: casePreProblem,
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
    this.updateCasePreProblemEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.casePreProblemService.updateCasePreProblem(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(casePreProblem => {
      this.updateCasePreProblem(casePreProblem);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: casePreProblem,
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
    this.deleteCasePreProblemEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, casePreProblem]) => {
      return this.data.userDeleteCasePreProblem({
        casePreProblemId: casePreProblem.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.casePreProblemService.importCasePreProblems(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addCasePreProblems(created);
      this.updateCasePreProblems(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('casePreProblemId')) {
      var casePreProblemId = this.route.snapshot.paramMap.get('casePreProblemId');
      this.setFormName('casePreProblem_edit');
    } else {
      this.setFormName('casePreProblem_create');
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.casePreProblemService.validateCasePreProblemExcelData(excelData, vm.legalCases);
    }));
  }
}
WebCasePreProblemFeatureStore.ɵfac = function WebCasePreProblemFeatureStore_Factory(t) {
  return new (t || WebCasePreProblemFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_pre_problem_service__WEBPACK_IMPORTED_MODULE_12__.CasePreProblemService));
};
WebCasePreProblemFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebCasePreProblemFeatureStore,
  factory: WebCasePreProblemFeatureStore.ɵfac
});

/***/ }),

/***/ 200903:
/*!***************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/rules/case-pre-problem-name-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CasePreProblemNameIsValidRule": () => (/* binding */ CasePreProblemNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CasePreProblemNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 757879:
/*!***********************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/shared/rules/create-case-pre-problem-input-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCasePreProblemInputIsValidRule": () => (/* binding */ CreateCasePreProblemInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _case_pre_problem_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-pre-problem-name-is-valid.rule */ 200903);


class CreateCasePreProblemInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _case_pre_problem_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.CasePreProblemNameIsValidRule('name', 'The casepreproblem name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 170966:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/ui/web-case-pre-problem-select-form/web-case-pre-problem-select-table-view.component.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCasePreProblemSelectTableViewComponent": () => (/* binding */ WebCasePreProblemSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebCasePreProblemSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.casePreProblems = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'id',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'createdAt',
      filter: 'agDateColumnFilter',
      cellClass: 'dateTime',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.dateFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.createdAt);
      },
      hide: true
    }, {
      field: 'updatedAt',
      filter: 'agDateColumnFilter',
      cellClass: 'dateTime',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.dateFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.updatedAt);
      },
      hide: true
    }, {
      field: 'name',
      filter: 'agTextColumnFilter'
    }, {
      field: 'legalCaseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Same Region',
      field: 'sameRegion',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'problemDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'duration',
      filter: 'agTextColumnFilter'
    }, {
      field: 'symptoms',
      filter: 'agTextColumnFilter'
    }, {
      field: 'regions',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Removed',
      field: 'removed',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }];
  }
  selectionDidChange(selectedRows) {
    this.rowItemsSelected.emit(selectedRows);
  }
  setSelected(ids) {
    this.tableView.gridApi.forEachNode(node => {
      var _a;
      if (ids.includes((_a = node.data) === null || _a === void 0 ? void 0 : _a.id)) {
        node.setSelected(true);
      } else {
        node.setSelected(false);
      }
    });
  }
  onSelected(selected) {
    this.itemDidSelect.emit(selected);
  }
}
WebCasePreProblemSelectTableViewComponent.ɵfac = function WebCasePreProblemSelectTableViewComponent_Factory(t) {
  return new (t || WebCasePreProblemSelectTableViewComponent)();
};
WebCasePreProblemSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebCasePreProblemSelectTableViewComponent,
  selectors: [["ui-case-pre-problem-select-table-view"]],
  viewQuery: function WebCasePreProblemSelectTableViewComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  inputs: {
    autoHeight: "autoHeight",
    casePreProblems: "casePreProblems"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebCasePreProblemSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebCasePreProblemSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebCasePreProblemSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.casePreProblems)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);