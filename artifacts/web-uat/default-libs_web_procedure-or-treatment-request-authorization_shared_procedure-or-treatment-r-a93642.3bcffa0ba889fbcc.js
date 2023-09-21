"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_procedure-or-treatment-request-authorization_shared_procedure-or-treatment-r-a93642"],{

/***/ 827886:
/*!********************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/actions/create-procedure-or-treatment-request-authorization.action.ts ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureOrTreatmentRequestAuthorizationAction": () => (/* binding */ CreateProcedureOrTreatmentRequestAuthorizationAction)
/* harmony export */ });
/* harmony import */ var _procedure_or_treatment_request_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-authorization.business-action-base */ 951929);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_procedure_or_treatment_request_authorization_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-procedure-or-treatment-request-authorization-input-is-valid.rule */ 491631);




class CreateProcedureOrTreatmentRequestAuthorizationAction extends _procedure_or_treatment_request_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestAuthorizationBusinessActionBase {
  constructor(input) {
    super('CreateProcedureOrTreatmentRequestAuthorizationAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_procedure_or_treatment_request_authorization_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureOrTreatmentRequestAuthorizationInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureOrTreatmentRequestAuthorization({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 951929:
/*!***************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/actions/procedure-or-treatment-request-authorization.business-action-base.ts ***!
  \***************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestAuthorizationBusinessActionBase": () => (/* binding */ ProcedureOrTreatmentRequestAuthorizationBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ProcedureOrTreatmentRequestAuthorizationBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 78273:
/*!*********************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/actions/update-procedure-or-treatment-request-authorizations.action.ts ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateProcedureOrTreatmentRequestAuthorizationAction": () => (/* binding */ UpdateProcedureOrTreatmentRequestAuthorizationAction),
/* harmony export */   "UpdateProcedureOrTreatmentRequestAuthorizationsAction": () => (/* binding */ UpdateProcedureOrTreatmentRequestAuthorizationsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_or_treatment_request_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-authorization.business-action-base */ 951929);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateProcedureOrTreatmentRequestAuthorizationsAction extends _procedure_or_treatment_request_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestAuthorizationBusinessActionBase {
  constructor(procedureOrTreatmentRequestAuthorizations) {
    super('UpdateProcedureOrTreatmentRequestAuthorizationsAction');
    this.procedureOrTreatmentRequestAuthorizations = procedureOrTreatmentRequestAuthorizations;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureOrTreatmentRequestAuthorizations, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequestAuthorizations({
      input: {
        procedureOrTreatmentRequestAuthorizations: this.procedureOrTreatmentRequestAuthorizations
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateProcedureOrTreatmentRequestAuthorizationAction extends _procedure_or_treatment_request_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestAuthorizationBusinessActionBase {
  constructor(procedureOrTreatmentRequestAuthorization, procedureOrTreatmentRequestAuthorizationId) {
    super('UpdateProcedureOrTreatmentRequestAuthorizationAction');
    this.procedureOrTreatmentRequestAuthorization = procedureOrTreatmentRequestAuthorization;
    this.procedureOrTreatmentRequestAuthorizationId = procedureOrTreatmentRequestAuthorizationId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureOrTreatmentRequestAuthorization, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.procedureOrTreatmentRequestAuthorizationId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequestAuthorization({
      procedureOrTreatmentRequestAuthorizationId: this.procedureOrTreatmentRequestAuthorizationId,
      input: this.procedureOrTreatmentRequestAuthorization
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 372861:
/*!*********************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/actions/validate-procedure-or-treatment-request-authorization-excel-data.action.ts ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateProcedureOrTreatmentRequestAuthorizationExcelDataAction": () => (/* binding */ ValidateProcedureOrTreatmentRequestAuthorizationExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_or_treatment_request_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-authorization.business-action-base */ 951929);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateProcedureOrTreatmentRequestAuthorizationExcelDataAction extends _procedure_or_treatment_request_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestAuthorizationBusinessActionBase {
  constructor(excelData, authorizations, procedureOrTreatmentRequests) {
    super('ValidateProcedureOrTreatmentRequestAuthorizationExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.authorizations = authorizations;
    this.procedureOrTreatmentRequests = procedureOrTreatmentRequests;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`authorizationName_${index}_is_valid}`, "Authorization Is Not Valid", 'authorization.name', datum['authorization'], this.authorizations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`procedureOrTreatmentRequestName_${index}_is_valid}`, "Procedure or Treatment Request Is Not Valid", 'procedureOrTreatmentRequest.name', datum['procedureOrTreatmentRequest'], this.procedureOrTreatmentRequests, true));
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

/***/ 7030:
/*!************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/procedure-or-treatment-request-authorization.business-provider.service.ts ***!
  \************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestAuthorizationBusinessProviderService": () => (/* binding */ ProcedureOrTreatmentRequestAuthorizationBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_procedure_or_treatment_request_authorization_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-procedure-or-treatment-request-authorization-excel-data.action */ 372861);
/* harmony import */ var _actions_create_procedure_or_treatment_request_authorization_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-procedure-or-treatment-request-authorization.action */ 827886);
/* harmony import */ var _actions_update_procedure_or_treatment_request_authorizations_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-procedure-or-treatment-request-authorizations.action */ 78273);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ProcedureOrTreatmentRequestAuthorizationBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ProcedureOrTreatmentRequestAuthorizationBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createProcedureOrTreatmentRequestAuthorization(input) {
    const action = new _actions_create_procedure_or_treatment_request_authorization_action__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureOrTreatmentRequestAuthorizationAction(input);
    action.Do(this);
    return action.response;
  }
  updateProcedureOrTreatmentRequestAuthorization(input, procedureOrTreatmentRequestAuthorizationId) {
    const action = new _actions_update_procedure_or_treatment_request_authorizations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureOrTreatmentRequestAuthorizationAction(input, procedureOrTreatmentRequestAuthorizationId);
    action.Do(this);
    return action.response;
  }
  importProcedureOrTreatmentRequestAuthorizations(procedureOrTreatmentRequestAuthorizations) {
    const updateProcedureOrTreatmentRequestAuthorizationsAction = new _actions_update_procedure_or_treatment_request_authorizations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureOrTreatmentRequestAuthorizationsAction(procedureOrTreatmentRequestAuthorizations);
    updateProcedureOrTreatmentRequestAuthorizationsAction.Do(this);
    return updateProcedureOrTreatmentRequestAuthorizationsAction.response;
  }
  validateProcedureOrTreatmentRequestAuthorizationExcelData(excelData, authorizations, procedureOrTreatmentRequests) {
    const validateProcedureOrTreatmentRequestAuthorizationExcelDataAction = new _actions_validate_procedure_or_treatment_request_authorization_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateProcedureOrTreatmentRequestAuthorizationExcelDataAction(excelData, authorizations, procedureOrTreatmentRequests);
    validateProcedureOrTreatmentRequestAuthorizationExcelDataAction.Do(this);
    return validateProcedureOrTreatmentRequestAuthorizationExcelDataAction.response;
  }
}
ProcedureOrTreatmentRequestAuthorizationBusinessProviderService.ɵfac = function ProcedureOrTreatmentRequestAuthorizationBusinessProviderService_Factory(t) {
  return new (t || ProcedureOrTreatmentRequestAuthorizationBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ProcedureOrTreatmentRequestAuthorizationBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ProcedureOrTreatmentRequestAuthorizationBusinessProviderService,
  factory: ProcedureOrTreatmentRequestAuthorizationBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 793353:
/*!******************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/procedure-or-treatment-request-authorization.service.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestAuthorizationService": () => (/* binding */ ProcedureOrTreatmentRequestAuthorizationService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _procedure_or_treatment_request_authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./procedure-or-treatment-request-authorization.business-provider.service */ 7030);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ProcedureOrTreatmentRequestAuthorizationService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ProcedureOrTreatmentRequestAuthorizationService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createProcedureOrTreatmentRequestAuthorization(input) {
    return this.businessProvider.createProcedureOrTreatmentRequestAuthorization(input);
  }
  updateProcedureOrTreatmentRequestAuthorization(input, procedureOrTreatmentRequestAuthorizationId) {
    return this.businessProvider.updateProcedureOrTreatmentRequestAuthorization(input, procedureOrTreatmentRequestAuthorizationId);
  }
  importProcedureOrTreatmentRequestAuthorizations(procedureOrTreatmentRequestAuthorizations) {
    return this.businessProvider.importProcedureOrTreatmentRequestAuthorizations(procedureOrTreatmentRequestAuthorizations);
  }
  validateProcedureOrTreatmentRequestAuthorizationExcelData(excelData, authorizations, procedureOrTreatmentRequests) {
    return this.businessProvider.validateProcedureOrTreatmentRequestAuthorizationExcelData(excelData, authorizations, procedureOrTreatmentRequests);
  }
}
ProcedureOrTreatmentRequestAuthorizationService.ɵfac = function ProcedureOrTreatmentRequestAuthorizationService_Factory(t) {
  return new (t || ProcedureOrTreatmentRequestAuthorizationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_or_treatment_request_authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureOrTreatmentRequestAuthorizationBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_or_treatment_request_authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureOrTreatmentRequestAuthorizationBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ProcedureOrTreatmentRequestAuthorizationService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ProcedureOrTreatmentRequestAuthorizationService,
  factory: ProcedureOrTreatmentRequestAuthorizationService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 356938:
/*!****************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/procedure-or-treatment-request-authorization.store.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureOrTreatmentRequestAuthorizationFeatureStore": () => (/* binding */ WebProcedureOrTreatmentRequestAuthorizationFeatureStore)
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
/* harmony import */ var _procedure_or_treatment_request_authorization_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./procedure-or-treatment-request-authorization.service */ 793353);














class WebProcedureOrTreatmentRequestAuthorizationFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, procedureOrTreatmentRequestAuthorizationService) {
    super({
      loading: false,
      procedureOrTreatmentRequestAuthorizations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      authorizationId: undefined,
      procedureOrTreatmentRequestId: undefined,
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
    this.procedureOrTreatmentRequestAuthorizationService = procedureOrTreatmentRequestAuthorizationService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.procedureOrTreatmentRequestAuthorizations$ = this.select(s => s.procedureOrTreatmentRequestAuthorizations);
    this.authorizations$ = this.select(s => s.authorizations || []);
    this.procedureOrTreatmentRequests$ = this.select(s => s.procedureOrTreatmentRequests || []);
    this.authorizationId$ = this.select(s => s.authorizationId);
    this.procedureOrTreatmentRequestId$ = this.select(s => s.procedureOrTreatmentRequestId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureOrTreatmentRequestAuthorizations$, this.authorizations$, this.procedureOrTreatmentRequests$, (errors, loading, item, formName, procedureOrTreatmentRequestAuthorizations, authorizations, procedureOrTreatmentRequests) => ({
      errors,
      loading,
      item,
      formName,
      procedureOrTreatmentRequestAuthorizations,
      authorizations,
      procedureOrTreatmentRequests
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.authorizationId$, this.procedureOrTreatmentRequestId$, this.searchQuery$, (paging, authorizationId, procedureOrTreatmentRequestId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      authorizationId: authorizationId,
      procedureOrTreatmentRequestId: procedureOrTreatmentRequestId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setAuthorizationId = this.updater((state, authorizationId) => Object.assign(Object.assign({}, state), {
      authorizationId
    }));
    this.setProcedureOrTreatmentRequestId = this.updater((state, procedureOrTreatmentRequestId) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequestId
    }));
    this.filterAuthorizations = term => this.data.userSelectAuthorizations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let authorizations = res.data.items;
      this.patchState({
        authorizations
      });
      return authorizations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterProcedureOrTreatmentRequests = term => this.data.userSelectProcedureOrTreatmentRequests({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedureOrTreatmentRequests = res.data.items;
      this.patchState({
        procedureOrTreatmentRequests
      });
      return procedureOrTreatmentRequests;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addAuthorization = this.updater((state, authorization) => Object.assign(Object.assign({}, state), {
      authorizations: state.authorizations.concat(authorization)
    }));
    this.addProcedureOrTreatmentRequest = this.updater((state, procedureOrTreatmentRequest) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.concat(procedureOrTreatmentRequest)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewProcedureOrTreatmentRequestAuthorization = this.updater((state, procedureOrTreatmentRequestAuthorization) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequestAuthorizations: [...state.procedureOrTreatmentRequestAuthorizations, procedureOrTreatmentRequestAuthorization]
    }));
    this.updateProcedureOrTreatmentRequestAuthorization = this.updater((state, procedureOrTreatmentRequestAuthorization) => {
      return Object.assign(Object.assign({}, state), {
        procedureOrTreatmentRequestAuthorizations: state.procedureOrTreatmentRequestAuthorizations.map(el => {
          if (el.id === procedureOrTreatmentRequestAuthorization.id) {
            return procedureOrTreatmentRequestAuthorization;
          } else {
            return el;
          }
        })
      });
    });
    this.addProcedureOrTreatmentRequestAuthorizations = this.updater((state, newProcedureOrTreatmentRequestAuthorizations) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequestAuthorizations: state.procedureOrTreatmentRequestAuthorizations.concat(newProcedureOrTreatmentRequestAuthorizations)
    }));
    this.updateProcedureOrTreatmentRequestAuthorizations = this.updater((state, updatedProcedureOrTreatmentRequestAuthorizations) => {
      return Object.assign(Object.assign({}, state), {
        procedureOrTreatmentRequestAuthorizations: state.procedureOrTreatmentRequestAuthorizations.map(procedureOrTreatmentRequestAuthorization => {
          const updated = updatedProcedureOrTreatmentRequestAuthorizations.find(el => el.id === procedureOrTreatmentRequestAuthorization.id);
          return updated ? updated : procedureOrTreatmentRequestAuthorization;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadProcedureOrTreatmentRequestAuthorizationEffect = this.effect(procedureOrTreatmentRequestAuthorizationId$ => procedureOrTreatmentRequestAuthorizationId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(procedureOrTreatmentRequestAuthorizationId => this.data.userProcedureOrTreatmentRequestAuthorization({
      procedureOrTreatmentRequestAuthorizationId
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
    this.loadProcedureOrTreatmentRequestAuthorizationsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userProcedureOrTreatmentRequestAuthorizations({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      procedureOrTreatmentRequestAuthorizations: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createProcedureOrTreatmentRequestAuthorizationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.procedureOrTreatmentRequestAuthorizationService.createProcedureOrTreatmentRequestAuthorization(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureOrTreatmentRequestAuthorization => {
      this.addNewProcedureOrTreatmentRequestAuthorization(procedureOrTreatmentRequestAuthorization);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: procedureOrTreatmentRequestAuthorization,
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
    this.updateProcedureOrTreatmentRequestAuthorizationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.procedureOrTreatmentRequestAuthorizationService.updateProcedureOrTreatmentRequestAuthorization(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureOrTreatmentRequestAuthorization => {
      this.updateProcedureOrTreatmentRequestAuthorization(procedureOrTreatmentRequestAuthorization);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: procedureOrTreatmentRequestAuthorization,
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
    this.deleteProcedureOrTreatmentRequestAuthorizationEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, procedureOrTreatmentRequestAuthorization]) => {
      return this.data.userDeleteProcedureOrTreatmentRequestAuthorization({
        procedureOrTreatmentRequestAuthorizationId: procedureOrTreatmentRequestAuthorization.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.procedureOrTreatmentRequestAuthorizationService.importProcedureOrTreatmentRequestAuthorizations(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addProcedureOrTreatmentRequestAuthorizations(created);
      this.updateProcedureOrTreatmentRequestAuthorizations(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('procedureOrTreatmentRequestAuthorizationId')) {
      var procedureOrTreatmentRequestAuthorizationId = this.route.snapshot.paramMap.get('procedureOrTreatmentRequestAuthorizationId');
      this.setFormName('procedureOrTreatmentRequestAuthorization_edit');
    } else {
      this.setFormName('procedureOrTreatmentRequestAuthorization_create');
    }
    if (this.route.snapshot.paramMap.has("authorizationId")) {
      var authorizationId = this.route.snapshot.paramMap.get("authorizationId");
      this.setAuthorizationId(authorizationId);
    }
    if (this.route.snapshot.paramMap.has("procedureOrTreatmentRequestId")) {
      var procedureOrTreatmentRequestId = this.route.snapshot.paramMap.get("procedureOrTreatmentRequestId");
      this.setProcedureOrTreatmentRequestId(procedureOrTreatmentRequestId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.procedureOrTreatmentRequestAuthorizationService.validateProcedureOrTreatmentRequestAuthorizationExcelData(excelData, vm.authorizations, vm.procedureOrTreatmentRequests);
    }));
  }
}
WebProcedureOrTreatmentRequestAuthorizationFeatureStore.ɵfac = function WebProcedureOrTreatmentRequestAuthorizationFeatureStore_Factory(t) {
  return new (t || WebProcedureOrTreatmentRequestAuthorizationFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_procedure_or_treatment_request_authorization_service__WEBPACK_IMPORTED_MODULE_12__.ProcedureOrTreatmentRequestAuthorizationService));
};
WebProcedureOrTreatmentRequestAuthorizationFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebProcedureOrTreatmentRequestAuthorizationFeatureStore,
  factory: WebProcedureOrTreatmentRequestAuthorizationFeatureStore.ɵfac
});

/***/ }),

/***/ 491631:
/*!*******************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/rules/create-procedure-or-treatment-request-authorization-input-is-valid.rule.ts ***!
  \*******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureOrTreatmentRequestAuthorizationInputIsValidRule": () => (/* binding */ CreateProcedureOrTreatmentRequestAuthorizationInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _procedure_or_treatment_request_authorization_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-authorization-name-is-valid.rule */ 478665);


class CreateProcedureOrTreatmentRequestAuthorizationInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _procedure_or_treatment_request_authorization_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestAuthorizationNameIsValidRule('name', 'The procedureortreatmentrequestauthorization name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 478665:
/*!***********************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/shared/rules/procedure-or-treatment-request-authorization-name-is-valid.rule.ts ***!
  \***********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestAuthorizationNameIsValidRule": () => (/* binding */ ProcedureOrTreatmentRequestAuthorizationNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ProcedureOrTreatmentRequestAuthorizationNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 725380:
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-authorization/ui/web-procedure-or-treatment-request-authorization-select-form/web-procedure-or-treatment-request-authorization-select-table-view.component.ts ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent": () => (/* binding */ WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.procedureOrTreatmentRequestAuthorizations = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'authorization.name',
      headerName: 'Authorization',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureOrTreatmentRequest.name',
      headerName: 'Procedure or Treatment Request',
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
      field: 'authorizationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'procedureOrTreatmentRequestId',
      filter: 'agTextColumnFilter',
      hide: true
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
WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent.ɵfac = function WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent_Factory(t) {
  return new (t || WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent)();
};
WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent,
  selectors: [["ui-procedure-or-treatment-request-authorization-select-table-view"]],
  viewQuery: function WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent_Query(rf, ctx) {
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
    procedureOrTreatmentRequestAuthorizations: "procedureOrTreatmentRequestAuthorizations"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 6,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.procedureOrTreatmentRequestAuthorizations)("showSidebar", false)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);