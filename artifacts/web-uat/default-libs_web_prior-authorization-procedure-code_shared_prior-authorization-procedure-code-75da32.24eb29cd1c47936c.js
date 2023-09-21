"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-authorization-procedure-code_shared_prior-authorization-procedure-code-75da32"],{

/***/ 951686:
/*!************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/actions/create-prior-authorization-procedure-code.action.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationProcedureCodeAction": () => (/* binding */ CreatePriorAuthorizationProcedureCodeAction)
/* harmony export */ });
/* harmony import */ var _prior_authorization_procedure_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-procedure-code.business-action-base */ 347455);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_authorization_procedure_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-authorization-procedure-code-input-is-valid.rule */ 865740);




class CreatePriorAuthorizationProcedureCodeAction extends _prior_authorization_procedure_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationProcedureCodeBusinessActionBase {
  constructor(input) {
    super('CreatePriorAuthorizationProcedureCodeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_authorization_procedure_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationProcedureCodeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationProcedureCode({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 347455:
/*!*******************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/actions/prior-authorization-procedure-code.business-action-base.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationProcedureCodeBusinessActionBase": () => (/* binding */ PriorAuthorizationProcedureCodeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorAuthorizationProcedureCodeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 763201:
/*!*************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/actions/update-prior-authorization-procedure-codes.action.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorAuthorizationProcedureCodeAction": () => (/* binding */ UpdatePriorAuthorizationProcedureCodeAction),
/* harmony export */   "UpdatePriorAuthorizationProcedureCodesAction": () => (/* binding */ UpdatePriorAuthorizationProcedureCodesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_procedure_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-procedure-code.business-action-base */ 347455);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorAuthorizationProcedureCodesAction extends _prior_authorization_procedure_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationProcedureCodeBusinessActionBase {
  constructor(priorAuthorizationProcedureCodes) {
    super('UpdatePriorAuthorizationProcedureCodesAction');
    this.priorAuthorizationProcedureCodes = priorAuthorizationProcedureCodes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationProcedureCodes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationProcedureCodes({
      input: {
        priorAuthorizationProcedureCodes: this.priorAuthorizationProcedureCodes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorAuthorizationProcedureCodeAction extends _prior_authorization_procedure_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationProcedureCodeBusinessActionBase {
  constructor(priorAuthorizationProcedureCode, priorAuthorizationProcedureCodeId) {
    super('UpdatePriorAuthorizationProcedureCodeAction');
    this.priorAuthorizationProcedureCode = priorAuthorizationProcedureCode;
    this.priorAuthorizationProcedureCodeId = priorAuthorizationProcedureCodeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationProcedureCode, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorAuthorizationProcedureCodeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationProcedureCode({
      priorAuthorizationProcedureCodeId: this.priorAuthorizationProcedureCodeId,
      input: this.priorAuthorizationProcedureCode
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 147655:
/*!*************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/actions/validate-prior-authorization-procedure-code-excel-data.action.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorAuthorizationProcedureCodeExcelDataAction": () => (/* binding */ ValidatePriorAuthorizationProcedureCodeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_procedure_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-procedure-code.business-action-base */ 347455);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorAuthorizationProcedureCodeExcelDataAction extends _prior_authorization_procedure_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationProcedureCodeBusinessActionBase {
  constructor(excelData, costCategories, procedures, priorAuthorizationRequests) {
    super('ValidatePriorAuthorizationProcedureCodeExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.costCategories = costCategories;
    this.procedures = procedures;
    this.priorAuthorizationRequests = priorAuthorizationRequests;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`costCategoryName_${index}_is_valid}`, "Cost Category Is Not Valid", 'costCategory.name', datum['costCategory'], this.costCategories, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`procedureName_${index}_is_valid}`, "Procedure Is Not Valid", 'procedure.name', datum['procedure'], this.procedures, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`priorAuthorizationRequestName_${index}_is_valid}`, "Prior Authorization Request Is Not Valid", 'priorAuthorizationRequest.name', datum['priorAuthorizationRequest'], this.priorAuthorizationRequests, true));
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

/***/ 647804:
/*!****************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/prior-authorization-procedure-code.business-provider.service.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationProcedureCodeBusinessProviderService": () => (/* binding */ PriorAuthorizationProcedureCodeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_authorization_procedure_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-authorization-procedure-code-excel-data.action */ 147655);
/* harmony import */ var _actions_create_prior_authorization_procedure_code_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-authorization-procedure-code.action */ 951686);
/* harmony import */ var _actions_update_prior_authorization_procedure_codes_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-authorization-procedure-codes.action */ 763201);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorAuthorizationProcedureCodeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorAuthorizationProcedureCodeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorAuthorizationProcedureCode(input) {
    const action = new _actions_create_prior_authorization_procedure_code_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationProcedureCodeAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorAuthorizationProcedureCode(input, priorAuthorizationProcedureCodeId) {
    const action = new _actions_update_prior_authorization_procedure_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationProcedureCodeAction(input, priorAuthorizationProcedureCodeId);
    action.Do(this);
    return action.response;
  }
  importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes) {
    const updatePriorAuthorizationProcedureCodesAction = new _actions_update_prior_authorization_procedure_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationProcedureCodesAction(priorAuthorizationProcedureCodes);
    updatePriorAuthorizationProcedureCodesAction.Do(this);
    return updatePriorAuthorizationProcedureCodesAction.response;
  }
  validatePriorAuthorizationProcedureCodeExcelData(excelData, costCategories, procedures, priorAuthorizationRequests) {
    const validatePriorAuthorizationProcedureCodeExcelDataAction = new _actions_validate_prior_authorization_procedure_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorAuthorizationProcedureCodeExcelDataAction(excelData, costCategories, procedures, priorAuthorizationRequests);
    validatePriorAuthorizationProcedureCodeExcelDataAction.Do(this);
    return validatePriorAuthorizationProcedureCodeExcelDataAction.response;
  }
}
PriorAuthorizationProcedureCodeBusinessProviderService.ɵfac = function PriorAuthorizationProcedureCodeBusinessProviderService_Factory(t) {
  return new (t || PriorAuthorizationProcedureCodeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorAuthorizationProcedureCodeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationProcedureCodeBusinessProviderService,
  factory: PriorAuthorizationProcedureCodeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 257898:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/prior-authorization-procedure-code.service.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationProcedureCodeService": () => (/* binding */ PriorAuthorizationProcedureCodeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_authorization_procedure_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-authorization-procedure-code.business-provider.service */ 647804);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorAuthorizationProcedureCodeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorAuthorizationProcedureCodeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorAuthorizationProcedureCode(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorAuthorizationProcedureCode(filteredObj);
  }
  updatePriorAuthorizationProcedureCode(input, priorAuthorizationProcedureCodeId) {
    return this.businessProvider.updatePriorAuthorizationProcedureCode(input, priorAuthorizationProcedureCodeId);
  }
  importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes) {
    return this.businessProvider.importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes);
  }
  validatePriorAuthorizationProcedureCodeExcelData(excelData, costCategories, procedures, priorAuthorizationRequests) {
    return this.businessProvider.validatePriorAuthorizationProcedureCodeExcelData(excelData, costCategories, procedures, priorAuthorizationRequests);
  }
}
PriorAuthorizationProcedureCodeService.ɵfac = function PriorAuthorizationProcedureCodeService_Factory(t) {
  return new (t || PriorAuthorizationProcedureCodeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_procedure_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationProcedureCodeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_procedure_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationProcedureCodeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorAuthorizationProcedureCodeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationProcedureCodeService,
  factory: PriorAuthorizationProcedureCodeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 990749:
/*!********************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/prior-authorization-procedure-code.store.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationProcedureCodeFeatureStore": () => (/* binding */ WebPriorAuthorizationProcedureCodeFeatureStore)
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
/* harmony import */ var _prior_authorization_procedure_code_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prior-authorization-procedure-code.service */ 257898);














class WebPriorAuthorizationProcedureCodeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorAuthorizationProcedureCodeService) {
    super({
      loading: false,
      priorAuthorizationProcedureCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      costCategoryId: undefined,
      procedureId: undefined,
      priorAuthorizationRequestId: undefined,
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
    this.priorAuthorizationProcedureCodeService = priorAuthorizationProcedureCodeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorAuthorizationProcedureCodes$ = this.select(s => s.priorAuthorizationProcedureCodes);
    this.costCategories$ = this.select(s => s.costCategories || []);
    this.procedures$ = this.select(s => s.procedures || []);
    this.priorAuthorizationRequests$ = this.select(s => s.priorAuthorizationRequests || []);
    this.costCategoryId$ = this.select(s => s.costCategoryId);
    this.procedureId$ = this.select(s => s.procedureId);
    this.priorAuthorizationRequestId$ = this.select(s => s.priorAuthorizationRequestId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationProcedureCodes$, this.costCategories$, this.procedures$, this.priorAuthorizationRequests$, (errors, loading, item, formName, priorAuthorizationProcedureCodes, costCategories, procedures, priorAuthorizationRequests) => ({
      errors,
      loading,
      item,
      formName,
      priorAuthorizationProcedureCodes,
      costCategories,
      procedures,
      priorAuthorizationRequests
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.costCategoryId$, this.procedureId$, this.priorAuthorizationRequestId$, this.searchQuery$, (paging, costCategoryId, procedureId, priorAuthorizationRequestId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      costCategoryId: costCategoryId,
      procedureId: procedureId,
      priorAuthorizationRequestId: priorAuthorizationRequestId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setCostCategoryId = this.updater((state, costCategoryId) => Object.assign(Object.assign({}, state), {
      costCategoryId
    }));
    this.setProcedureId = this.updater((state, procedureId) => Object.assign(Object.assign({}, state), {
      procedureId
    }));
    this.setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequestId
    }));
    this.filterCostCategories = term => this.data.userSelectCostCategories({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let costCategories = res.data.items;
      this.patchState({
        costCategories
      });
      return costCategories;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterProcedures = term => this.data.userSelectProcedures({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedures = res.data.items;
      this.patchState({
        procedures
      });
      return procedures;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPriorAuthorizationRequests = term => this.data.userSelectPriorAuthorizationRequests({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let priorAuthorizationRequests = res.data.items;
      this.patchState({
        priorAuthorizationRequests
      });
      return priorAuthorizationRequests;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addCostCategory = this.updater((state, costCategory) => Object.assign(Object.assign({}, state), {
      costCategories: state.costCategories.concat(costCategory)
    }));
    this.addProcedure = this.updater((state, procedure) => Object.assign(Object.assign({}, state), {
      procedures: state.procedures.concat(procedure)
    }));
    this.addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPriorAuthorizationProcedureCode = this.updater((state, priorAuthorizationProcedureCode) => Object.assign(Object.assign({}, state), {
      priorAuthorizationProcedureCodes: [...state.priorAuthorizationProcedureCodes, priorAuthorizationProcedureCode]
    }));
    this.updatePriorAuthorizationProcedureCode = this.updater((state, priorAuthorizationProcedureCode) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationProcedureCodes: state.priorAuthorizationProcedureCodes.map(el => {
          if (el.id === priorAuthorizationProcedureCode.id) {
            return priorAuthorizationProcedureCode;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorAuthorizationProcedureCodes = this.updater((state, newPriorAuthorizationProcedureCodes) => Object.assign(Object.assign({}, state), {
      priorAuthorizationProcedureCodes: state.priorAuthorizationProcedureCodes.concat(newPriorAuthorizationProcedureCodes)
    }));
    this.updatePriorAuthorizationProcedureCodes = this.updater((state, updatedPriorAuthorizationProcedureCodes) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationProcedureCodes: state.priorAuthorizationProcedureCodes.map(priorAuthorizationProcedureCode => {
          const updated = updatedPriorAuthorizationProcedureCodes.find(el => el.id === priorAuthorizationProcedureCode.id);
          return updated ? updated : priorAuthorizationProcedureCode;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorAuthorizationProcedureCodeEffect = this.effect(priorAuthorizationProcedureCodeId$ => priorAuthorizationProcedureCodeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(priorAuthorizationProcedureCodeId => this.data.userPriorAuthorizationProcedureCode({
      priorAuthorizationProcedureCodeId
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
    this.loadPriorAuthorizationProcedureCodesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPriorAuthorizationProcedureCodes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      priorAuthorizationProcedureCodes: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorAuthorizationProcedureCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.priorAuthorizationProcedureCodeService.createPriorAuthorizationProcedureCode(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationProcedureCode => {
      this.addNewPriorAuthorizationProcedureCode(priorAuthorizationProcedureCode);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationProcedureCode,
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
    this.updatePriorAuthorizationProcedureCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.priorAuthorizationProcedureCodeService.updatePriorAuthorizationProcedureCode(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationProcedureCode => {
      this.updatePriorAuthorizationProcedureCode(priorAuthorizationProcedureCode);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationProcedureCode,
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
    this.deletePriorAuthorizationProcedureCodeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, priorAuthorizationProcedureCode]) => {
      return this.data.userDeletePriorAuthorizationProcedureCode({
        priorAuthorizationProcedureCodeId: priorAuthorizationProcedureCode.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.priorAuthorizationProcedureCodeService.importPriorAuthorizationProcedureCodes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPriorAuthorizationProcedureCodes(created);
      this.updatePriorAuthorizationProcedureCodes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorAuthorizationProcedureCodeId')) {
      var priorAuthorizationProcedureCodeId = this.route.snapshot.paramMap.get('priorAuthorizationProcedureCodeId');
      this.setFormName('priorAuthorizationProcedureCode_edit');
    } else {
      this.setFormName('priorAuthorizationProcedureCode_create');
    }
    if (this.route.snapshot.paramMap.has("costCategoryId")) {
      var costCategoryId = this.route.snapshot.paramMap.get("costCategoryId");
      this.setCostCategoryId(costCategoryId);
    }
    if (this.route.snapshot.paramMap.has("procedureId")) {
      var procedureId = this.route.snapshot.paramMap.get("procedureId");
      this.setProcedureId(procedureId);
    }
    if (this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId");
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.priorAuthorizationProcedureCodeService.validatePriorAuthorizationProcedureCodeExcelData(excelData, vm.costCategories, vm.procedures, vm.priorAuthorizationRequests);
    }));
  }
}
WebPriorAuthorizationProcedureCodeFeatureStore.ɵfac = function WebPriorAuthorizationProcedureCodeFeatureStore_Factory(t) {
  return new (t || WebPriorAuthorizationProcedureCodeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_prior_authorization_procedure_code_service__WEBPACK_IMPORTED_MODULE_12__.PriorAuthorizationProcedureCodeService));
};
WebPriorAuthorizationProcedureCodeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPriorAuthorizationProcedureCodeFeatureStore,
  factory: WebPriorAuthorizationProcedureCodeFeatureStore.ɵfac
});

/***/ }),

/***/ 865740:
/*!***********************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/rules/create-prior-authorization-procedure-code-input-is-valid.rule.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationProcedureCodeInputIsValidRule": () => (/* binding */ CreatePriorAuthorizationProcedureCodeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_authorization_procedure_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-procedure-code-name-is-valid.rule */ 596257);


class CreatePriorAuthorizationProcedureCodeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_authorization_procedure_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationProcedureCodeNameIsValidRule('name', 'The priorauthorizationprocedurecode name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 596257:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/shared/rules/prior-authorization-procedure-code-name-is-valid.rule.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationProcedureCodeNameIsValidRule": () => (/* binding */ PriorAuthorizationProcedureCodeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorAuthorizationProcedureCodeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 39652:
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-procedure-code/ui/web-prior-authorization-procedure-code-select-form/web-prior-authorization-procedure-code-select-table-view.component.ts ***!
  \*********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationProcedureCodeSelectTableViewComponent": () => (/* binding */ WebPriorAuthorizationProcedureCodeSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPriorAuthorizationProcedureCodeSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.priorAuthorizationProcedureCodes = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'costCategory.name',
      headerName: 'Cost Category',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedure.name',
      headerName: 'Procedure',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorAuthorizationRequest.name',
      headerName: 'Prior Authorization Request',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'priorAuthorizationRequestId',
      filter: 'agTextColumnFilter',
      hide: true
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
      field: 'costCategoryId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Estimated Cost',
      field: 'estimatedCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.estimatedCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
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
WebPriorAuthorizationProcedureCodeSelectTableViewComponent.ɵfac = function WebPriorAuthorizationProcedureCodeSelectTableViewComponent_Factory(t) {
  return new (t || WebPriorAuthorizationProcedureCodeSelectTableViewComponent)();
};
WebPriorAuthorizationProcedureCodeSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthorizationProcedureCodeSelectTableViewComponent,
  selectors: [["ui-prior-authorization-procedure-code-select-table-view"]],
  viewQuery: function WebPriorAuthorizationProcedureCodeSelectTableViewComponent_Query(rf, ctx) {
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
    priorAuthorizationProcedureCodes: "priorAuthorizationProcedureCodes"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPriorAuthorizationProcedureCodeSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPriorAuthorizationProcedureCodeSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPriorAuthorizationProcedureCodeSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.priorAuthorizationProcedureCodes)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);