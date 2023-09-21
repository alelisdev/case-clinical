"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_procedure-or-treatment-request-diagnosis-code_shared_procedure-or-treatment--d2a3c7"],{

/***/ 731564:
/*!**********************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/actions/create-procedure-or-treatment-request-diagnosis-code.action.ts ***!
  \**********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureOrTreatmentRequestDiagnosisCodeAction": () => (/* binding */ CreateProcedureOrTreatmentRequestDiagnosisCodeAction)
/* harmony export */ });
/* harmony import */ var _procedure_or_treatment_request_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-diagnosis-code.business-action-base */ 99266);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_procedure_or_treatment_request_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-procedure-or-treatment-request-diagnosis-code-input-is-valid.rule */ 1730);




class CreateProcedureOrTreatmentRequestDiagnosisCodeAction extends _procedure_or_treatment_request_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase {
  constructor(input) {
    super('CreateProcedureOrTreatmentRequestDiagnosisCodeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_procedure_or_treatment_request_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureOrTreatmentRequestDiagnosisCodeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureOrTreatmentRequestDiagnosisCode({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 99266:
/*!*****************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/actions/procedure-or-treatment-request-diagnosis-code.business-action-base.ts ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase": () => (/* binding */ ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 587792:
/*!***********************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/actions/update-procedure-or-treatment-request-diagnosis-codes.action.ts ***!
  \***********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateProcedureOrTreatmentRequestDiagnosisCodeAction": () => (/* binding */ UpdateProcedureOrTreatmentRequestDiagnosisCodeAction),
/* harmony export */   "UpdateProcedureOrTreatmentRequestDiagnosisCodesAction": () => (/* binding */ UpdateProcedureOrTreatmentRequestDiagnosisCodesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_or_treatment_request_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-diagnosis-code.business-action-base */ 99266);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateProcedureOrTreatmentRequestDiagnosisCodesAction extends _procedure_or_treatment_request_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase {
  constructor(procedureOrTreatmentRequestDiagnosisCodes) {
    super('UpdateProcedureOrTreatmentRequestDiagnosisCodesAction');
    this.procedureOrTreatmentRequestDiagnosisCodes = procedureOrTreatmentRequestDiagnosisCodes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureOrTreatmentRequestDiagnosisCodes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequestDiagnosisCodes({
      input: {
        procedureOrTreatmentRequestDiagnosisCodes: this.procedureOrTreatmentRequestDiagnosisCodes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateProcedureOrTreatmentRequestDiagnosisCodeAction extends _procedure_or_treatment_request_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase {
  constructor(procedureOrTreatmentRequestDiagnosisCode, procedureOrTreatmentRequestDiagnosisCodeId) {
    super('UpdateProcedureOrTreatmentRequestDiagnosisCodeAction');
    this.procedureOrTreatmentRequestDiagnosisCode = procedureOrTreatmentRequestDiagnosisCode;
    this.procedureOrTreatmentRequestDiagnosisCodeId = procedureOrTreatmentRequestDiagnosisCodeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureOrTreatmentRequestDiagnosisCode, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.procedureOrTreatmentRequestDiagnosisCodeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequestDiagnosisCode({
      procedureOrTreatmentRequestDiagnosisCodeId: this.procedureOrTreatmentRequestDiagnosisCodeId,
      input: this.procedureOrTreatmentRequestDiagnosisCode
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 77872:
/*!***********************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/actions/validate-procedure-or-treatment-request-diagnosis-code-excel-data.action.ts ***!
  \***********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction": () => (/* binding */ ValidateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_or_treatment_request_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-diagnosis-code.business-action-base */ 99266);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction extends _procedure_or_treatment_request_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase {
  constructor(excelData, diagnoses, procedureOrTreatmentRequests) {
    super('ValidateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.diagnoses = diagnoses;
    this.procedureOrTreatmentRequests = procedureOrTreatmentRequests;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`diagnosisName_${index}_is_valid}`, "Diagnosis Is Not Valid", 'diagnosis.name', datum['diagnosis'], this.diagnoses, true));
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

/***/ 6972:
/*!**************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/procedure-or-treatment-request-diagnosis-code.business-provider.service.ts ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService": () => (/* binding */ ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_procedure_or_treatment_request_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-procedure-or-treatment-request-diagnosis-code-excel-data.action */ 77872);
/* harmony import */ var _actions_create_procedure_or_treatment_request_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-procedure-or-treatment-request-diagnosis-code.action */ 731564);
/* harmony import */ var _actions_update_procedure_or_treatment_request_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-procedure-or-treatment-request-diagnosis-codes.action */ 587792);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createProcedureOrTreatmentRequestDiagnosisCode(input) {
    const action = new _actions_create_procedure_or_treatment_request_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureOrTreatmentRequestDiagnosisCodeAction(input);
    action.Do(this);
    return action.response;
  }
  updateProcedureOrTreatmentRequestDiagnosisCode(input, procedureOrTreatmentRequestDiagnosisCodeId) {
    const action = new _actions_update_procedure_or_treatment_request_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureOrTreatmentRequestDiagnosisCodeAction(input, procedureOrTreatmentRequestDiagnosisCodeId);
    action.Do(this);
    return action.response;
  }
  importProcedureOrTreatmentRequestDiagnosisCodes(procedureOrTreatmentRequestDiagnosisCodes) {
    const updateProcedureOrTreatmentRequestDiagnosisCodesAction = new _actions_update_procedure_or_treatment_request_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureOrTreatmentRequestDiagnosisCodesAction(procedureOrTreatmentRequestDiagnosisCodes);
    updateProcedureOrTreatmentRequestDiagnosisCodesAction.Do(this);
    return updateProcedureOrTreatmentRequestDiagnosisCodesAction.response;
  }
  validateProcedureOrTreatmentRequestDiagnosisCodeExcelData(excelData, diagnoses, procedureOrTreatmentRequests) {
    const validateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction = new _actions_validate_procedure_or_treatment_request_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction(excelData, diagnoses, procedureOrTreatmentRequests);
    validateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction.Do(this);
    return validateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction.response;
  }
}
ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService.ɵfac = function ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService_Factory(t) {
  return new (t || ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService,
  factory: ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 469598:
/*!********************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/procedure-or-treatment-request-diagnosis-code.service.ts ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestDiagnosisCodeService": () => (/* binding */ ProcedureOrTreatmentRequestDiagnosisCodeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _procedure_or_treatment_request_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./procedure-or-treatment-request-diagnosis-code.business-provider.service */ 6972);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ProcedureOrTreatmentRequestDiagnosisCodeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ProcedureOrTreatmentRequestDiagnosisCodeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createProcedureOrTreatmentRequestDiagnosisCode(input) {
    return this.businessProvider.createProcedureOrTreatmentRequestDiagnosisCode(input);
  }
  updateProcedureOrTreatmentRequestDiagnosisCode(input, procedureOrTreatmentRequestDiagnosisCodeId) {
    return this.businessProvider.updateProcedureOrTreatmentRequestDiagnosisCode(input, procedureOrTreatmentRequestDiagnosisCodeId);
  }
  importProcedureOrTreatmentRequestDiagnosisCodes(procedureOrTreatmentRequestDiagnosisCodes) {
    return this.businessProvider.importProcedureOrTreatmentRequestDiagnosisCodes(procedureOrTreatmentRequestDiagnosisCodes);
  }
  validateProcedureOrTreatmentRequestDiagnosisCodeExcelData(excelData, diagnoses, procedureOrTreatmentRequests) {
    return this.businessProvider.validateProcedureOrTreatmentRequestDiagnosisCodeExcelData(excelData, diagnoses, procedureOrTreatmentRequests);
  }
}
ProcedureOrTreatmentRequestDiagnosisCodeService.ɵfac = function ProcedureOrTreatmentRequestDiagnosisCodeService_Factory(t) {
  return new (t || ProcedureOrTreatmentRequestDiagnosisCodeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_or_treatment_request_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_or_treatment_request_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ProcedureOrTreatmentRequestDiagnosisCodeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ProcedureOrTreatmentRequestDiagnosisCodeService,
  factory: ProcedureOrTreatmentRequestDiagnosisCodeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 143865:
/*!******************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/procedure-or-treatment-request-diagnosis-code.store.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore": () => (/* binding */ WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore)
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
/* harmony import */ var _procedure_or_treatment_request_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./procedure-or-treatment-request-diagnosis-code.service */ 469598);














class WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, procedureOrTreatmentRequestDiagnosisCodeService) {
    super({
      loading: false,
      procedureOrTreatmentRequestDiagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      diagnosisCodeId: undefined,
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
    this.procedureOrTreatmentRequestDiagnosisCodeService = procedureOrTreatmentRequestDiagnosisCodeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.procedureOrTreatmentRequestDiagnosisCodes$ = this.select(s => s.procedureOrTreatmentRequestDiagnosisCodes);
    this.diagnosisCodes$ = this.select(s => s.diagnosisCodes || []);
    this.procedureOrTreatmentRequests$ = this.select(s => s.procedureOrTreatmentRequests || []);
    this.diagnosisCodeId$ = this.select(s => s.diagnosisCodeId);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureOrTreatmentRequestDiagnosisCodes$, this.diagnosisCodes$, this.procedureOrTreatmentRequests$, (errors, loading, item, formName, procedureOrTreatmentRequestDiagnosisCodes, diagnosisCodes, procedureOrTreatmentRequests) => ({
      errors,
      loading,
      item,
      formName,
      procedureOrTreatmentRequestDiagnosisCodes,
      diagnosisCodes,
      procedureOrTreatmentRequests
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.diagnosisCodeId$, this.procedureOrTreatmentRequestId$, this.searchQuery$, (paging, diagnosisCodeId, procedureOrTreatmentRequestId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      diagnosisCodeId: diagnosisCodeId,
      procedureOrTreatmentRequestId: procedureOrTreatmentRequestId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setDiagnosisCodeId = this.updater((state, diagnosisCodeId) => Object.assign(Object.assign({}, state), {
      diagnosisCodeId
    }));
    this.setProcedureOrTreatmentRequestId = this.updater((state, procedureOrTreatmentRequestId) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequestId
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
    this.addDiagnosisCode = this.updater((state, diagnosisCode) => Object.assign(Object.assign({}, state), {
      diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
    }));
    this.addProcedureOrTreatmentRequest = this.updater((state, procedureOrTreatmentRequest) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.concat(procedureOrTreatmentRequest)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewProcedureOrTreatmentRequestDiagnosisCode = this.updater((state, procedureOrTreatmentRequestDiagnosisCode) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequestDiagnosisCodes: [...state.procedureOrTreatmentRequestDiagnosisCodes, procedureOrTreatmentRequestDiagnosisCode]
    }));
    this.updateProcedureOrTreatmentRequestDiagnosisCode = this.updater((state, procedureOrTreatmentRequestDiagnosisCode) => {
      return Object.assign(Object.assign({}, state), {
        procedureOrTreatmentRequestDiagnosisCodes: state.procedureOrTreatmentRequestDiagnosisCodes.map(el => {
          if (el.id === procedureOrTreatmentRequestDiagnosisCode.id) {
            return procedureOrTreatmentRequestDiagnosisCode;
          } else {
            return el;
          }
        })
      });
    });
    this.addProcedureOrTreatmentRequestDiagnosisCodes = this.updater((state, newProcedureOrTreatmentRequestDiagnosisCodes) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequestDiagnosisCodes: state.procedureOrTreatmentRequestDiagnosisCodes.concat(newProcedureOrTreatmentRequestDiagnosisCodes)
    }));
    this.updateProcedureOrTreatmentRequestDiagnosisCodes = this.updater((state, updatedProcedureOrTreatmentRequestDiagnosisCodes) => {
      return Object.assign(Object.assign({}, state), {
        procedureOrTreatmentRequestDiagnosisCodes: state.procedureOrTreatmentRequestDiagnosisCodes.map(procedureOrTreatmentRequestDiagnosisCode => {
          const updated = updatedProcedureOrTreatmentRequestDiagnosisCodes.find(el => el.id === procedureOrTreatmentRequestDiagnosisCode.id);
          return updated ? updated : procedureOrTreatmentRequestDiagnosisCode;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadProcedureOrTreatmentRequestDiagnosisCodeEffect = this.effect(procedureOrTreatmentRequestDiagnosisCodeId$ => procedureOrTreatmentRequestDiagnosisCodeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(procedureOrTreatmentRequestDiagnosisCodeId => this.data.userProcedureOrTreatmentRequestDiagnosisCode({
      procedureOrTreatmentRequestDiagnosisCodeId
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
    this.loadProcedureOrTreatmentRequestDiagnosisCodesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userProcedureOrTreatmentRequestDiagnosisCodes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      procedureOrTreatmentRequestDiagnosisCodes: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createProcedureOrTreatmentRequestDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.procedureOrTreatmentRequestDiagnosisCodeService.createProcedureOrTreatmentRequestDiagnosisCode(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureOrTreatmentRequestDiagnosisCode => {
      this.addNewProcedureOrTreatmentRequestDiagnosisCode(procedureOrTreatmentRequestDiagnosisCode);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: procedureOrTreatmentRequestDiagnosisCode,
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
    this.updateProcedureOrTreatmentRequestDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.procedureOrTreatmentRequestDiagnosisCodeService.updateProcedureOrTreatmentRequestDiagnosisCode(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureOrTreatmentRequestDiagnosisCode => {
      this.updateProcedureOrTreatmentRequestDiagnosisCode(procedureOrTreatmentRequestDiagnosisCode);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: procedureOrTreatmentRequestDiagnosisCode,
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
    this.deleteProcedureOrTreatmentRequestDiagnosisCodeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, procedureOrTreatmentRequestDiagnosisCode]) => {
      return this.data.userDeleteProcedureOrTreatmentRequestDiagnosisCode({
        procedureOrTreatmentRequestDiagnosisCodeId: procedureOrTreatmentRequestDiagnosisCode.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.procedureOrTreatmentRequestDiagnosisCodeService.importProcedureOrTreatmentRequestDiagnosisCodes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addProcedureOrTreatmentRequestDiagnosisCodes(created);
      this.updateProcedureOrTreatmentRequestDiagnosisCodes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('procedureOrTreatmentRequestDiagnosisCodeId')) {
      var procedureOrTreatmentRequestDiagnosisCodeId = this.route.snapshot.paramMap.get('procedureOrTreatmentRequestDiagnosisCodeId');
      this.setFormName('procedureOrTreatmentRequestDiagnosisCode_edit');
    } else {
      this.setFormName('procedureOrTreatmentRequestDiagnosisCode_create');
    }
    if (this.route.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get("diagnosisCodeId");
      this.setDiagnosisCodeId(diagnosisCodeId);
    }
    if (this.route.snapshot.paramMap.has("procedureOrTreatmentRequestId")) {
      var procedureOrTreatmentRequestId = this.route.snapshot.paramMap.get("procedureOrTreatmentRequestId");
      this.setProcedureOrTreatmentRequestId(procedureOrTreatmentRequestId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.procedureOrTreatmentRequestDiagnosisCodeService.validateProcedureOrTreatmentRequestDiagnosisCodeExcelData(excelData, vm.diagnosisCodes, vm.procedureOrTreatmentRequests);
    }));
  }
}
WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore.ɵfac = function WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore_Factory(t) {
  return new (t || WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_procedure_or_treatment_request_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_12__.ProcedureOrTreatmentRequestDiagnosisCodeService));
};
WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore,
  factory: WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore.ɵfac
});

/***/ }),

/***/ 1730:
/*!*********************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/rules/create-procedure-or-treatment-request-diagnosis-code-input-is-valid.rule.ts ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureOrTreatmentRequestDiagnosisCodeInputIsValidRule": () => (/* binding */ CreateProcedureOrTreatmentRequestDiagnosisCodeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _procedure_or_treatment_request_diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-diagnosis-code-name-is-valid.rule */ 823802);


class CreateProcedureOrTreatmentRequestDiagnosisCodeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _procedure_or_treatment_request_diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestDiagnosisCodeNameIsValidRule('name', 'The procedureortreatmentrequestdiagnosiscode name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 823802:
/*!*************************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request-diagnosis-code/shared/rules/procedure-or-treatment-request-diagnosis-code-name-is-valid.rule.ts ***!
  \*************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestDiagnosisCodeNameIsValidRule": () => (/* binding */ ProcedureOrTreatmentRequestDiagnosisCodeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ProcedureOrTreatmentRequestDiagnosisCodeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);