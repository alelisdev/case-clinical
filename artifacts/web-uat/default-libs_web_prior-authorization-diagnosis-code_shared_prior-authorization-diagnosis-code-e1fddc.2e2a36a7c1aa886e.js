"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-authorization-diagnosis-code_shared_prior-authorization-diagnosis-code-e1fddc"],{

/***/ 558988:
/*!************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/actions/create-prior-authorization-diagnosis-code.action.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationDiagnosisCodeAction": () => (/* binding */ CreatePriorAuthorizationDiagnosisCodeAction)
/* harmony export */ });
/* harmony import */ var _prior_authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-diagnosis-code.business-action-base */ 644891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_authorization_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-authorization-diagnosis-code-input-is-valid.rule */ 577921);




class CreatePriorAuthorizationDiagnosisCodeAction extends _prior_authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationDiagnosisCodeBusinessActionBase {
  constructor(input) {
    super('CreatePriorAuthorizationDiagnosisCodeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_authorization_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationDiagnosisCodeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationDiagnosisCode({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 644891:
/*!*******************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/actions/prior-authorization-diagnosis-code.business-action-base.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationDiagnosisCodeBusinessActionBase": () => (/* binding */ PriorAuthorizationDiagnosisCodeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorAuthorizationDiagnosisCodeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 456981:
/*!*************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/actions/update-prior-authorization-diagnosis-codes.action.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorAuthorizationDiagnosisCodeAction": () => (/* binding */ UpdatePriorAuthorizationDiagnosisCodeAction),
/* harmony export */   "UpdatePriorAuthorizationDiagnosisCodesAction": () => (/* binding */ UpdatePriorAuthorizationDiagnosisCodesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-diagnosis-code.business-action-base */ 644891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorAuthorizationDiagnosisCodesAction extends _prior_authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationDiagnosisCodeBusinessActionBase {
  constructor(priorAuthorizationDiagnosisCodes) {
    super('UpdatePriorAuthorizationDiagnosisCodesAction');
    this.priorAuthorizationDiagnosisCodes = priorAuthorizationDiagnosisCodes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationDiagnosisCodes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationDiagnosisCodes({
      input: {
        priorAuthorizationDiagnosisCodes: this.priorAuthorizationDiagnosisCodes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorAuthorizationDiagnosisCodeAction extends _prior_authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationDiagnosisCodeBusinessActionBase {
  constructor(priorAuthorizationDiagnosisCode, priorAuthorizationDiagnosisCodeId) {
    super('UpdatePriorAuthorizationDiagnosisCodeAction');
    this.priorAuthorizationDiagnosisCode = priorAuthorizationDiagnosisCode;
    this.priorAuthorizationDiagnosisCodeId = priorAuthorizationDiagnosisCodeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationDiagnosisCode, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorAuthorizationDiagnosisCodeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationDiagnosisCode({
      priorAuthorizationDiagnosisCodeId: this.priorAuthorizationDiagnosisCodeId,
      input: this.priorAuthorizationDiagnosisCode
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 126438:
/*!*************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/actions/validate-prior-authorization-diagnosis-code-excel-data.action.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorAuthorizationDiagnosisCodeExcelDataAction": () => (/* binding */ ValidatePriorAuthorizationDiagnosisCodeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-diagnosis-code.business-action-base */ 644891);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorAuthorizationDiagnosisCodeExcelDataAction extends _prior_authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationDiagnosisCodeBusinessActionBase {
  constructor(excelData, diagnoses, priorAuthorizationRequests) {
    super('ValidatePriorAuthorizationDiagnosisCodeExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.diagnoses = diagnoses;
    this.priorAuthorizationRequests = priorAuthorizationRequests;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`diagnosisName_${index}_is_valid}`, "Diagnosis Is Not Valid", 'diagnosis.name', datum['diagnosis'], this.diagnoses, true));
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

/***/ 680170:
/*!****************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/prior-authorization-diagnosis-code.business-provider.service.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationDiagnosisCodeBusinessProviderService": () => (/* binding */ PriorAuthorizationDiagnosisCodeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_authorization_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-authorization-diagnosis-code-excel-data.action */ 126438);
/* harmony import */ var _actions_create_prior_authorization_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-authorization-diagnosis-code.action */ 558988);
/* harmony import */ var _actions_update_prior_authorization_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-authorization-diagnosis-codes.action */ 456981);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorAuthorizationDiagnosisCodeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorAuthorizationDiagnosisCodeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorAuthorizationDiagnosisCode(input) {
    const action = new _actions_create_prior_authorization_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationDiagnosisCodeAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorAuthorizationDiagnosisCode(input, priorAuthorizationDiagnosisCodeId) {
    const action = new _actions_update_prior_authorization_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationDiagnosisCodeAction(input, priorAuthorizationDiagnosisCodeId);
    action.Do(this);
    return action.response;
  }
  importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes) {
    const updatePriorAuthorizationDiagnosisCodesAction = new _actions_update_prior_authorization_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationDiagnosisCodesAction(priorAuthorizationDiagnosisCodes);
    updatePriorAuthorizationDiagnosisCodesAction.Do(this);
    return updatePriorAuthorizationDiagnosisCodesAction.response;
  }
  validatePriorAuthorizationDiagnosisCodeExcelData(excelData, diagnoses, priorAuthorizationRequests) {
    const validatePriorAuthorizationDiagnosisCodeExcelDataAction = new _actions_validate_prior_authorization_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorAuthorizationDiagnosisCodeExcelDataAction(excelData, diagnoses, priorAuthorizationRequests);
    validatePriorAuthorizationDiagnosisCodeExcelDataAction.Do(this);
    return validatePriorAuthorizationDiagnosisCodeExcelDataAction.response;
  }
}
PriorAuthorizationDiagnosisCodeBusinessProviderService.ɵfac = function PriorAuthorizationDiagnosisCodeBusinessProviderService_Factory(t) {
  return new (t || PriorAuthorizationDiagnosisCodeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorAuthorizationDiagnosisCodeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationDiagnosisCodeBusinessProviderService,
  factory: PriorAuthorizationDiagnosisCodeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 273987:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/prior-authorization-diagnosis-code.service.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationDiagnosisCodeService": () => (/* binding */ PriorAuthorizationDiagnosisCodeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_authorization_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-authorization-diagnosis-code.business-provider.service */ 680170);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorAuthorizationDiagnosisCodeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorAuthorizationDiagnosisCodeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorAuthorizationDiagnosisCode(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorAuthorizationDiagnosisCode(filteredObj);
  }
  updatePriorAuthorizationDiagnosisCode(input, priorAuthorizationDiagnosisCodeId) {
    return this.businessProvider.updatePriorAuthorizationDiagnosisCode(input, priorAuthorizationDiagnosisCodeId);
  }
  importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes) {
    return this.businessProvider.importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes);
  }
  validatePriorAuthorizationDiagnosisCodeExcelData(excelData, diagnoses, priorAuthorizationRequests) {
    return this.businessProvider.validatePriorAuthorizationDiagnosisCodeExcelData(excelData, diagnoses, priorAuthorizationRequests);
  }
}
PriorAuthorizationDiagnosisCodeService.ɵfac = function PriorAuthorizationDiagnosisCodeService_Factory(t) {
  return new (t || PriorAuthorizationDiagnosisCodeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationDiagnosisCodeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationDiagnosisCodeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorAuthorizationDiagnosisCodeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationDiagnosisCodeService,
  factory: PriorAuthorizationDiagnosisCodeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 971031:
/*!********************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/prior-authorization-diagnosis-code.store.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationDiagnosisCodeFeatureStore": () => (/* binding */ WebPriorAuthorizationDiagnosisCodeFeatureStore)
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
/* harmony import */ var _prior_authorization_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prior-authorization-diagnosis-code.service */ 273987);














class WebPriorAuthorizationDiagnosisCodeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorAuthorizationDiagnosisCodeService) {
    super({
      loading: false,
      priorAuthorizationDiagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      diagnosisCodeId: undefined,
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
    this.priorAuthorizationDiagnosisCodeService = priorAuthorizationDiagnosisCodeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorAuthorizationDiagnosisCodes$ = this.select(s => s.priorAuthorizationDiagnosisCodes);
    this.diagnosisCodes$ = this.select(s => s.diagnosisCodes || []);
    this.priorAuthorizationRequests$ = this.select(s => s.priorAuthorizationRequests || []);
    this.diagnosisCodeId$ = this.select(s => s.diagnosisCodeId);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationDiagnosisCodes$, this.diagnosisCodes$, this.priorAuthorizationRequests$, (errors, loading, item, formName, priorAuthorizationDiagnosisCodes, diagnosisCodes, priorAuthorizationRequests) => ({
      errors,
      loading,
      item,
      formName,
      priorAuthorizationDiagnosisCodes,
      diagnosisCodes,
      priorAuthorizationRequests
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.diagnosisCodeId$, this.priorAuthorizationRequestId$, this.searchQuery$, (paging, diagnosisCodeId, priorAuthorizationRequestId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      diagnosisCodeId: diagnosisCodeId,
      priorAuthorizationRequestId: priorAuthorizationRequestId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setDiagnosisCodeId = this.updater((state, diagnosisCodeId) => Object.assign(Object.assign({}, state), {
      diagnosisCodeId
    }));
    this.setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequestId
    }));
    this.filterDiagnosisCodes = term => this.data.userSelectDiagnosisCodes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let diagnosisCodes = res.data.items;
      this.patchState({
        diagnosisCodes
      });
      return diagnosisCodes;
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
    this.addDiagnosisCode = this.updater((state, diagnosisCode) => Object.assign(Object.assign({}, state), {
      diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
    }));
    this.addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPriorAuthorizationDiagnosisCode = this.updater((state, priorAuthorizationDiagnosisCode) => Object.assign(Object.assign({}, state), {
      priorAuthorizationDiagnosisCodes: [...state.priorAuthorizationDiagnosisCodes, priorAuthorizationDiagnosisCode]
    }));
    this.updatePriorAuthorizationDiagnosisCode = this.updater((state, priorAuthorizationDiagnosisCode) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationDiagnosisCodes: state.priorAuthorizationDiagnosisCodes.map(el => {
          if (el.id === priorAuthorizationDiagnosisCode.id) {
            return priorAuthorizationDiagnosisCode;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorAuthorizationDiagnosisCodes = this.updater((state, newPriorAuthorizationDiagnosisCodes) => Object.assign(Object.assign({}, state), {
      priorAuthorizationDiagnosisCodes: state.priorAuthorizationDiagnosisCodes.concat(newPriorAuthorizationDiagnosisCodes)
    }));
    this.updatePriorAuthorizationDiagnosisCodes = this.updater((state, updatedPriorAuthorizationDiagnosisCodes) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationDiagnosisCodes: state.priorAuthorizationDiagnosisCodes.map(priorAuthorizationDiagnosisCode => {
          const updated = updatedPriorAuthorizationDiagnosisCodes.find(el => el.id === priorAuthorizationDiagnosisCode.id);
          return updated ? updated : priorAuthorizationDiagnosisCode;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorAuthorizationDiagnosisCodeEffect = this.effect(priorAuthorizationDiagnosisCodeId$ => priorAuthorizationDiagnosisCodeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(priorAuthorizationDiagnosisCodeId => this.data.userPriorAuthorizationDiagnosisCode({
      priorAuthorizationDiagnosisCodeId
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
    this.loadPriorAuthorizationDiagnosisCodesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPriorAuthorizationDiagnosisCodes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      priorAuthorizationDiagnosisCodes: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorAuthorizationDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.priorAuthorizationDiagnosisCodeService.createPriorAuthorizationDiagnosisCode(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationDiagnosisCode => {
      this.addNewPriorAuthorizationDiagnosisCode(priorAuthorizationDiagnosisCode);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationDiagnosisCode,
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
    this.updatePriorAuthorizationDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.priorAuthorizationDiagnosisCodeService.updatePriorAuthorizationDiagnosisCode(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationDiagnosisCode => {
      this.updatePriorAuthorizationDiagnosisCode(priorAuthorizationDiagnosisCode);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationDiagnosisCode,
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
    this.deletePriorAuthorizationDiagnosisCodeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, priorAuthorizationDiagnosisCode]) => {
      return this.data.userDeletePriorAuthorizationDiagnosisCode({
        priorAuthorizationDiagnosisCodeId: priorAuthorizationDiagnosisCode.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.priorAuthorizationDiagnosisCodeService.importPriorAuthorizationDiagnosisCodes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPriorAuthorizationDiagnosisCodes(created);
      this.updatePriorAuthorizationDiagnosisCodes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorAuthorizationDiagnosisCodeId')) {
      var priorAuthorizationDiagnosisCodeId = this.route.snapshot.paramMap.get('priorAuthorizationDiagnosisCodeId');
      this.setFormName('priorAuthorizationDiagnosisCode_edit');
    } else {
      this.setFormName('priorAuthorizationDiagnosisCode_create');
    }
    if (this.route.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get("diagnosisCodeId");
      this.setDiagnosisCodeId(diagnosisCodeId);
    }
    if (this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId");
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.priorAuthorizationDiagnosisCodeService.validatePriorAuthorizationDiagnosisCodeExcelData(excelData, vm.diagnosisCodes, vm.priorAuthorizationRequests);
    }));
  }
}
WebPriorAuthorizationDiagnosisCodeFeatureStore.ɵfac = function WebPriorAuthorizationDiagnosisCodeFeatureStore_Factory(t) {
  return new (t || WebPriorAuthorizationDiagnosisCodeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_prior_authorization_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_12__.PriorAuthorizationDiagnosisCodeService));
};
WebPriorAuthorizationDiagnosisCodeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPriorAuthorizationDiagnosisCodeFeatureStore,
  factory: WebPriorAuthorizationDiagnosisCodeFeatureStore.ɵfac
});

/***/ }),

/***/ 577921:
/*!***********************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/rules/create-prior-authorization-diagnosis-code-input-is-valid.rule.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationDiagnosisCodeInputIsValidRule": () => (/* binding */ CreatePriorAuthorizationDiagnosisCodeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_authorization_diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-diagnosis-code-name-is-valid.rule */ 988081);


class CreatePriorAuthorizationDiagnosisCodeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_authorization_diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationDiagnosisCodeNameIsValidRule('name', 'The priorauthorizationdiagnosiscode name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 988081:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/shared/rules/prior-authorization-diagnosis-code-name-is-valid.rule.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationDiagnosisCodeNameIsValidRule": () => (/* binding */ PriorAuthorizationDiagnosisCodeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorAuthorizationDiagnosisCodeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 497098:
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-diagnosis-code/ui/web-prior-authorization-diagnosis-code-select-form/web-prior-authorization-diagnosis-code-select-table-view.component.ts ***!
  \*********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent": () => (/* binding */ WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.priorAuthorizationDiagnosisCodes = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'diagnosis.name',
      headerName: 'Diagnosis',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorAuthorizationRequest.name',
      headerName: 'Prior Authorization Request',
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
      field: 'diagnosisCodeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'priorAuthorizationRequestId',
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
WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent.ɵfac = function WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent_Factory(t) {
  return new (t || WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent)();
};
WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent,
  selectors: [["ui-prior-authorization-diagnosis-code-select-table-view"]],
  viewQuery: function WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent_Query(rf, ctx) {
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
    priorAuthorizationDiagnosisCodes: "priorAuthorizationDiagnosisCodes"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.priorAuthorizationDiagnosisCodes)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);