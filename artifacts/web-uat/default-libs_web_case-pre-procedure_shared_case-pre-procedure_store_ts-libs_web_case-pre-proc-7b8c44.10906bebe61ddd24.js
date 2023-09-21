"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_case-pre-procedure_shared_case-pre-procedure_store_ts-libs_web_case-pre-proc-7b8c44"],{

/***/ 865892:
/*!***********************************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/actions/case-pre-procedure.business-action-base.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CasePreProcedureBusinessActionBase": () => (/* binding */ CasePreProcedureBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class CasePreProcedureBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 950815:
/*!****************************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/actions/create-case-pre-procedure.action.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCasePreProcedureAction": () => (/* binding */ CreateCasePreProcedureAction)
/* harmony export */ });
/* harmony import */ var _case_pre_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-pre-procedure.business-action-base */ 865892);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_case_pre_procedure_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-case-pre-procedure-input-is-valid.rule */ 537080);




class CreateCasePreProcedureAction extends _case_pre_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CasePreProcedureBusinessActionBase {
  constructor(input) {
    super('CreateCasePreProcedureAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_case_pre_procedure_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateCasePreProcedureInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateCasePreProcedure({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 780477:
/*!*****************************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/actions/update-case-pre-procedures.action.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCasePreProcedureAction": () => (/* binding */ UpdateCasePreProcedureAction),
/* harmony export */   "UpdateCasePreProceduresAction": () => (/* binding */ UpdateCasePreProceduresAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_pre_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-pre-procedure.business-action-base */ 865892);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateCasePreProceduresAction extends _case_pre_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CasePreProcedureBusinessActionBase {
  constructor(casePreProcedures) {
    super('UpdateCasePreProceduresAction');
    this.casePreProcedures = casePreProcedures;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.casePreProcedures, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCasePreProcedures({
      input: {
        casePreProcedures: this.casePreProcedures
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateCasePreProcedureAction extends _case_pre_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CasePreProcedureBusinessActionBase {
  constructor(casePreProcedure, casePreProcedureId) {
    super('UpdateCasePreProcedureAction');
    this.casePreProcedure = casePreProcedure;
    this.casePreProcedureId = casePreProcedureId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.casePreProcedure, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.casePreProcedureId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCasePreProcedure({
      casePreProcedureId: this.casePreProcedureId,
      input: this.casePreProcedure
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 667935:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/actions/validate-case-pre-procedure-excel-data.action.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateCasePreProcedureExcelDataAction": () => (/* binding */ ValidateCasePreProcedureExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_pre_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-pre-procedure.business-action-base */ 865892);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateCasePreProcedureExcelDataAction extends _case_pre_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CasePreProcedureBusinessActionBase {
  constructor(excelData, legalCases) {
    super('ValidateCasePreProcedureExcelDataAction');
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

/***/ 393632:
/*!********************************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/case-pre-procedure.business-provider.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CasePreProcedureBusinessProviderService": () => (/* binding */ CasePreProcedureBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_case_pre_procedure_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-case-pre-procedure-excel-data.action */ 667935);
/* harmony import */ var _actions_create_case_pre_procedure_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-case-pre-procedure.action */ 950815);
/* harmony import */ var _actions_update_case_pre_procedures_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-case-pre-procedures.action */ 780477);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class CasePreProcedureBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.CasePreProcedureBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createCasePreProcedure(input) {
    const action = new _actions_create_case_pre_procedure_action__WEBPACK_IMPORTED_MODULE_2__.CreateCasePreProcedureAction(input);
    action.Do(this);
    return action.response;
  }
  updateCasePreProcedure(input, casePreProcedureId) {
    const action = new _actions_update_case_pre_procedures_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCasePreProcedureAction(input, casePreProcedureId);
    action.Do(this);
    return action.response;
  }
  importCasePreProcedures(casePreProcedures) {
    const updateCasePreProceduresAction = new _actions_update_case_pre_procedures_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCasePreProceduresAction(casePreProcedures);
    updateCasePreProceduresAction.Do(this);
    return updateCasePreProceduresAction.response;
  }
  validateCasePreProcedureExcelData(excelData, legalCases) {
    const validateCasePreProcedureExcelDataAction = new _actions_validate_case_pre_procedure_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateCasePreProcedureExcelDataAction(excelData, legalCases);
    validateCasePreProcedureExcelDataAction.Do(this);
    return validateCasePreProcedureExcelDataAction.response;
  }
}
CasePreProcedureBusinessProviderService.ɵfac = function CasePreProcedureBusinessProviderService_Factory(t) {
  return new (t || CasePreProcedureBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
CasePreProcedureBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: CasePreProcedureBusinessProviderService,
  factory: CasePreProcedureBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 210812:
/*!**************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/case-pre-procedure.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CasePreProcedureService": () => (/* binding */ CasePreProcedureService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _case_pre_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./case-pre-procedure.business-provider.service */ 393632);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class CasePreProcedureService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("CasePreProcedureService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createCasePreProcedure(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createCasePreProcedure(filteredObj);
  }
  updateCasePreProcedure(input, casePreProcedureId) {
    return this.businessProvider.updateCasePreProcedure(input, casePreProcedureId);
  }
  importCasePreProcedures(casePreProcedures) {
    return this.businessProvider.importCasePreProcedures(casePreProcedures);
  }
  validateCasePreProcedureExcelData(excelData, legalCases) {
    return this.businessProvider.validateCasePreProcedureExcelData(excelData, legalCases);
  }
}
CasePreProcedureService.ɵfac = function CasePreProcedureService_Factory(t) {
  return new (t || CasePreProcedureService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_pre_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CasePreProcedureBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_pre_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CasePreProcedureBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
CasePreProcedureService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CasePreProcedureService,
  factory: CasePreProcedureService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 933979:
/*!************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/case-pre-procedure.store.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCasePreProcedureFeatureStore": () => (/* binding */ WebCasePreProcedureFeatureStore)
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
/* harmony import */ var _case_pre_procedure_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./case-pre-procedure.service */ 210812);














class WebCasePreProcedureFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, casePreProcedureService) {
    super({
      loading: false,
      casePreProcedures: [],
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
    this.casePreProcedureService = casePreProcedureService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.casePreProcedures$ = this.select(s => s.casePreProcedures);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.casePreProcedures$, this.legalCases$, (errors, loading, item, formName, casePreProcedures, legalCases) => ({
      errors,
      loading,
      item,
      formName,
      casePreProcedures,
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
    this.addNewCasePreProcedure = this.updater((state, casePreProcedure) => Object.assign(Object.assign({}, state), {
      casePreProcedures: [...state.casePreProcedures, casePreProcedure]
    }));
    this.updateCasePreProcedure = this.updater((state, casePreProcedure) => {
      return Object.assign(Object.assign({}, state), {
        casePreProcedures: state.casePreProcedures.map(el => {
          if (el.id === casePreProcedure.id) {
            return casePreProcedure;
          } else {
            return el;
          }
        })
      });
    });
    this.addCasePreProcedures = this.updater((state, newCasePreProcedures) => Object.assign(Object.assign({}, state), {
      casePreProcedures: state.casePreProcedures.concat(newCasePreProcedures)
    }));
    this.updateCasePreProcedures = this.updater((state, updatedCasePreProcedures) => {
      return Object.assign(Object.assign({}, state), {
        casePreProcedures: state.casePreProcedures.map(casePreProcedure => {
          const updated = updatedCasePreProcedures.find(el => el.id === casePreProcedure.id);
          return updated ? updated : casePreProcedure;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadCasePreProcedureEffect = this.effect(casePreProcedureId$ => casePreProcedureId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(casePreProcedureId => this.data.userCasePreProcedure({
      casePreProcedureId
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
    this.loadCasePreProceduresEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userCasePreProcedures({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      casePreProcedures: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createCasePreProcedureEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.casePreProcedureService.createCasePreProcedure(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(casePreProcedure => {
      this.addNewCasePreProcedure(casePreProcedure);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: casePreProcedure,
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
    this.updateCasePreProcedureEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.casePreProcedureService.updateCasePreProcedure(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(casePreProcedure => {
      this.updateCasePreProcedure(casePreProcedure);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: casePreProcedure,
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
    this.deleteCasePreProcedureEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, casePreProcedure]) => {
      return this.data.userDeleteCasePreProcedure({
        casePreProcedureId: casePreProcedure.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.casePreProcedureService.importCasePreProcedures(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addCasePreProcedures(created);
      this.updateCasePreProcedures(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('casePreProcedureId')) {
      var casePreProcedureId = this.route.snapshot.paramMap.get('casePreProcedureId');
      this.setFormName('casePreProcedure_edit');
    } else {
      this.setFormName('casePreProcedure_create');
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.casePreProcedureService.validateCasePreProcedureExcelData(excelData, vm.legalCases);
    }));
  }
}
WebCasePreProcedureFeatureStore.ɵfac = function WebCasePreProcedureFeatureStore_Factory(t) {
  return new (t || WebCasePreProcedureFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_pre_procedure_service__WEBPACK_IMPORTED_MODULE_12__.CasePreProcedureService));
};
WebCasePreProcedureFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebCasePreProcedureFeatureStore,
  factory: WebCasePreProcedureFeatureStore.ɵfac
});

/***/ }),

/***/ 690399:
/*!*******************************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/rules/case-pre-procedure-name-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CasePreProcedureNameIsValidRule": () => (/* binding */ CasePreProcedureNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CasePreProcedureNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 537080:
/*!***************************************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/shared/rules/create-case-pre-procedure-input-is-valid.rule.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCasePreProcedureInputIsValidRule": () => (/* binding */ CreateCasePreProcedureInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _case_pre_procedure_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-pre-procedure-name-is-valid.rule */ 690399);


class CreateCasePreProcedureInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _case_pre_procedure_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.CasePreProcedureNameIsValidRule('name', 'The casepreprocedure name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 242697:
/*!*********************************************************************************************************************************!*\
  !*** ./libs/web/case-pre-procedure/ui/web-case-pre-procedure-select-form/web-case-pre-procedure-select-table-view.component.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCasePreProcedureSelectTableViewComponent": () => (/* binding */ WebCasePreProcedureSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebCasePreProcedureSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.casePreProcedures = [];
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
      field: 'procedureType',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'dateCreated',
      filter: 'agDateColumnFilter'
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
WebCasePreProcedureSelectTableViewComponent.ɵfac = function WebCasePreProcedureSelectTableViewComponent_Factory(t) {
  return new (t || WebCasePreProcedureSelectTableViewComponent)();
};
WebCasePreProcedureSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebCasePreProcedureSelectTableViewComponent,
  selectors: [["ui-case-pre-procedure-select-table-view"]],
  viewQuery: function WebCasePreProcedureSelectTableViewComponent_Query(rf, ctx) {
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
    casePreProcedures: "casePreProcedures"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebCasePreProcedureSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebCasePreProcedureSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebCasePreProcedureSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.casePreProcedures)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);