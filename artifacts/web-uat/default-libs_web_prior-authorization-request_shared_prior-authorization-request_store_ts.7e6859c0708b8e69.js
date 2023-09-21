"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-authorization-request_shared_prior-authorization-request_store_ts"],{

/***/ 406813:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/actions/create-prior-authorization-request.action.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationRequestAction": () => (/* binding */ CreatePriorAuthorizationRequestAction)
/* harmony export */ });
/* harmony import */ var _prior_authorization_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-request.business-action-base */ 255007);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_authorization_request_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-authorization-request-input-is-valid.rule */ 362020);




class CreatePriorAuthorizationRequestAction extends _prior_authorization_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationRequestBusinessActionBase {
  constructor(input) {
    super('CreatePriorAuthorizationRequestAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_authorization_request_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationRequestInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationRequest({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 255007:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/actions/prior-authorization-request.business-action-base.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationRequestBusinessActionBase": () => (/* binding */ PriorAuthorizationRequestBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorAuthorizationRequestBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 937299:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/actions/update-prior-authorization-requests.action.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorAuthorizationRequestAction": () => (/* binding */ UpdatePriorAuthorizationRequestAction),
/* harmony export */   "UpdatePriorAuthorizationRequestsAction": () => (/* binding */ UpdatePriorAuthorizationRequestsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-request.business-action-base */ 255007);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorAuthorizationRequestsAction extends _prior_authorization_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationRequestBusinessActionBase {
  constructor(priorAuthorizationRequests) {
    super('UpdatePriorAuthorizationRequestsAction');
    this.priorAuthorizationRequests = priorAuthorizationRequests;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationRequests, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationRequests({
      input: {
        priorAuthorizationRequests: this.priorAuthorizationRequests
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorAuthorizationRequestAction extends _prior_authorization_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationRequestBusinessActionBase {
  constructor(priorAuthorizationRequest, priorAuthorizationRequestId) {
    super('UpdatePriorAuthorizationRequestAction');
    this.priorAuthorizationRequest = priorAuthorizationRequest;
    this.priorAuthorizationRequestId = priorAuthorizationRequestId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationRequest, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorAuthorizationRequestId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationRequest({
      priorAuthorizationRequestId: this.priorAuthorizationRequestId,
      input: this.priorAuthorizationRequest
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 812641:
/*!***********************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/actions/validate-prior-authorization-request-excel-data.action.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorAuthorizationRequestExcelDataAction": () => (/* binding */ ValidatePriorAuthorizationRequestExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-request.business-action-base */ 255007);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorAuthorizationRequestExcelDataAction extends _prior_authorization_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationRequestBusinessActionBase {
  constructor(excelData, procedureSites, surgicalPositions, treatingProviders, referredTos, prescriptions, visitKinds, guidelineUseds, authorizationKinds, authorizationStatuses, patients, caseProcedures) {
    super('ValidatePriorAuthorizationRequestExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.procedureSites = procedureSites;
    this.surgicalPositions = surgicalPositions;
    this.treatingProviders = treatingProviders;
    this.referredTos = referredTos;
    this.prescriptions = prescriptions;
    this.visitKinds = visitKinds;
    this.guidelineUseds = guidelineUseds;
    this.authorizationKinds = authorizationKinds;
    this.authorizationStatuses = authorizationStatuses;
    this.patients = patients;
    this.caseProcedures = caseProcedures;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`procedureSiteName_${index}_is_valid}`, "Procedure Site Is Not Valid", 'procedureSite.name', datum['procedureSite'], this.procedureSites, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`surgicalPositionName_${index}_is_valid}`, "Surgical Position Is Not Valid", 'surgicalPosition.name', datum['surgicalPosition'], this.surgicalPositions, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`treatingProviderName_${index}_is_valid}`, "Treating Provider Is Not Valid", 'treatingProvider.name', datum['treatingProvider'], this.treatingProviders, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`referredToName_${index}_is_valid}`, "Referred to Is Not Valid", 'referredTo.name', datum['referredTo'], this.referredTos, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`prescriptionName_${index}_is_valid}`, "Prescription Is Not Valid", 'prescription.name', datum['prescription'], this.prescriptions, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`visitKindName_${index}_is_valid}`, "Visit Kind Is Not Valid", 'visitKind.name', datum['visitKind'], this.visitKinds, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`guidelineUsedName_${index}_is_valid}`, "Guideline Used Is Not Valid", 'guidelineUsed.name', datum['guidelineUsed'], this.guidelineUseds, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`authorizationKindName_${index}_is_valid}`, "Authorization Kind Is Not Valid", 'authorizationKind.name', datum['authorizationKind'], this.authorizationKinds, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`authorizationStatusName_${index}_is_valid}`, "Authorization Status Is Not Valid", 'authorizationStatus.name', datum['authorizationStatus'], this.authorizationStatuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`caseProcedureName_${index}_is_valid}`, "Case Procedure Is Not Valid", 'caseProcedure.name', datum['caseProcedure'], this.caseProcedures, true));
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

/***/ 372754:
/*!**************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/prior-authorization-request.business-provider.service.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationRequestBusinessProviderService": () => (/* binding */ PriorAuthorizationRequestBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_authorization_request_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-authorization-request-excel-data.action */ 812641);
/* harmony import */ var _actions_create_prior_authorization_request_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-authorization-request.action */ 406813);
/* harmony import */ var _actions_update_prior_authorization_requests_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-authorization-requests.action */ 937299);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorAuthorizationRequestBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorAuthorizationRequestBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorAuthorizationRequest(input) {
    const action = new _actions_create_prior_authorization_request_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationRequestAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorAuthorizationRequest(input, priorAuthorizationRequestId) {
    const action = new _actions_update_prior_authorization_requests_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationRequestAction(input, priorAuthorizationRequestId);
    action.Do(this);
    return action.response;
  }
  importPriorAuthorizationRequests(priorAuthorizationRequests) {
    const updatePriorAuthorizationRequestsAction = new _actions_update_prior_authorization_requests_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationRequestsAction(priorAuthorizationRequests);
    updatePriorAuthorizationRequestsAction.Do(this);
    return updatePriorAuthorizationRequestsAction.response;
  }
  validatePriorAuthorizationRequestExcelData(excelData, procedureSites, surgicalPositions, treatingProviders, referredTos, prescriptions, visitKinds, guidelineUseds, authorizationKinds, authorizationStatuses, patients, caseProcedures) {
    const validatePriorAuthorizationRequestExcelDataAction = new _actions_validate_prior_authorization_request_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorAuthorizationRequestExcelDataAction(excelData, procedureSites, surgicalPositions, treatingProviders, referredTos, prescriptions, visitKinds, guidelineUseds, authorizationKinds, authorizationStatuses, patients, caseProcedures);
    validatePriorAuthorizationRequestExcelDataAction.Do(this);
    return validatePriorAuthorizationRequestExcelDataAction.response;
  }
}
PriorAuthorizationRequestBusinessProviderService.ɵfac = function PriorAuthorizationRequestBusinessProviderService_Factory(t) {
  return new (t || PriorAuthorizationRequestBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorAuthorizationRequestBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationRequestBusinessProviderService,
  factory: PriorAuthorizationRequestBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 685070:
/*!********************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/prior-authorization-request.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationRequestService": () => (/* binding */ PriorAuthorizationRequestService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_authorization_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-authorization-request.business-provider.service */ 372754);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorAuthorizationRequestService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorAuthorizationRequestService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorAuthorizationRequest(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorAuthorizationRequest(filteredObj);
  }
  updatePriorAuthorizationRequest(input, priorAuthorizationRequestId) {
    return this.businessProvider.updatePriorAuthorizationRequest(input, priorAuthorizationRequestId);
  }
  importPriorAuthorizationRequests(priorAuthorizationRequests) {
    return this.businessProvider.importPriorAuthorizationRequests(priorAuthorizationRequests);
  }
  validatePriorAuthorizationRequestExcelData(excelData, procedureSites, surgicalPositions, treatingProviders, referredTos, prescriptions, visitKinds, guidelineUseds, authorizationKinds, authorizationStatuses, patients, caseProcedures) {
    return this.businessProvider.validatePriorAuthorizationRequestExcelData(excelData, procedureSites, surgicalPositions, treatingProviders, referredTos, prescriptions, visitKinds, guidelineUseds, authorizationKinds, authorizationStatuses, patients, caseProcedures);
  }
}
PriorAuthorizationRequestService.ɵfac = function PriorAuthorizationRequestService_Factory(t) {
  return new (t || PriorAuthorizationRequestService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationRequestBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationRequestBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorAuthorizationRequestService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationRequestService,
  factory: PriorAuthorizationRequestService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 212129:
/*!******************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/prior-authorization-request.store.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationRequestFeatureStore": () => (/* binding */ WebPriorAuthorizationRequestFeatureStore)
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
/* harmony import */ var _prior_authorization_request_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prior-authorization-request.service */ 685070);














class WebPriorAuthorizationRequestFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorAuthorizationRequestService) {
    super({
      loading: false,
      priorAuthorizationRequests: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      procedureSiteId: undefined,
      surgicalPositionId: undefined,
      treatingProviderId: undefined,
      referredToId: undefined,
      prescriptionId: undefined,
      visitKindId: undefined,
      guidelineUsedId: undefined,
      authorizationKindId: undefined,
      authorizationStatusId: undefined,
      billId: undefined,
      medicalReportId: undefined,
      patientId: undefined,
      caseProcedureId: undefined,
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
    this.priorAuthorizationRequestService = priorAuthorizationRequestService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorAuthorizationRequests$ = this.select(s => s.priorAuthorizationRequests);
    this.procedureSites$ = this.select(s => s.procedureSites || []);
    this.surgicalPositions$ = this.select(s => s.surgicalPositions || []);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.documents$ = this.select(s => s.documents || []);
    this.visitKinds$ = this.select(s => s.visitKinds || []);
    this.guidelineUseds$ = this.select(s => s.guidelineUseds || []);
    this.authorizationKinds$ = this.select(s => s.authorizationKinds || []);
    this.authorizationStatuses$ = this.select(s => s.authorizationStatuses || []);
    this.patients$ = this.select(s => s.patients || []);
    this.caseProcedures$ = this.select(s => s.caseProcedures || []);
    this.procedureSiteId$ = this.select(s => s.procedureSiteId);
    this.surgicalPositionId$ = this.select(s => s.surgicalPositionId);
    this.treatingProviderId$ = this.select(s => s.treatingProviderId);
    this.referredToId$ = this.select(s => s.referredToId);
    this.prescriptionId$ = this.select(s => s.prescriptionId);
    this.visitKindId$ = this.select(s => s.visitKindId);
    this.guidelineUsedId$ = this.select(s => s.guidelineUsedId);
    this.authorizationKindId$ = this.select(s => s.authorizationKindId);
    this.authorizationStatusId$ = this.select(s => s.authorizationStatusId);
    this.billId$ = this.select(s => s.billId);
    this.medicalReportId$ = this.select(s => s.medicalReportId);
    this.patientId$ = this.select(s => s.patientId);
    this.caseProcedureId$ = this.select(s => s.caseProcedureId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationRequests$, this.procedureSites$, this.surgicalPositions$, this.clinicalProviders$, this.documents$, this.visitKinds$, this.guidelineUseds$, this.authorizationKinds$, this.authorizationStatuses$, this.patients$, this.caseProcedures$, (errors, loading, item, formName, priorAuthorizationRequests, procedureSites, surgicalPositions, clinicalProviders, documents, visitKinds, guidelineUseds, authorizationKinds, authorizationStatuses, patients, caseProcedures) => ({
      errors,
      loading,
      item,
      formName,
      priorAuthorizationRequests,
      procedureSites,
      surgicalPositions,
      clinicalProviders,
      documents,
      visitKinds,
      guidelineUseds,
      authorizationKinds,
      authorizationStatuses,
      patients,
      caseProcedures
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.procedureSiteId$, this.surgicalPositionId$, this.treatingProviderId$, this.referredToId$, this.prescriptionId$, this.visitKindId$, this.guidelineUsedId$, this.authorizationKindId$, this.authorizationStatusId$, this.billId$, this.medicalReportId$, this.patientId$, this.caseProcedureId$, this.searchQuery$, (paging, procedureSiteId, surgicalPositionId, treatingProviderId, referredToId, prescriptionId, visitKindId, guidelineUsedId, authorizationKindId, authorizationStatusId, billId, medicalReportId, patientId, caseProcedureId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      procedureSiteId: procedureSiteId,
      surgicalPositionId: surgicalPositionId,
      treatingProviderId: treatingProviderId,
      referredToId: referredToId,
      prescriptionId: prescriptionId,
      visitKindId: visitKindId,
      guidelineUsedId: guidelineUsedId,
      authorizationKindId: authorizationKindId,
      authorizationStatusId: authorizationStatusId,
      billId: billId,
      medicalReportId: medicalReportId,
      patientId: patientId,
      caseProcedureId: caseProcedureId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setProcedureSiteId = this.updater((state, procedureSiteId) => Object.assign(Object.assign({}, state), {
      procedureSiteId
    }));
    this.setSurgicalPositionId = this.updater((state, surgicalPositionId) => Object.assign(Object.assign({}, state), {
      surgicalPositionId
    }));
    this.setTreatingProviderId = this.updater((state, treatingProviderId) => Object.assign(Object.assign({}, state), {
      treatingProviderId
    }));
    this.setReferredToId = this.updater((state, referredToId) => Object.assign(Object.assign({}, state), {
      referredToId
    }));
    this.setPrescriptionId = this.updater((state, prescriptionId) => Object.assign(Object.assign({}, state), {
      prescriptionId
    }));
    this.setVisitKindId = this.updater((state, visitKindId) => Object.assign(Object.assign({}, state), {
      visitKindId
    }));
    this.setGuidelineUsedId = this.updater((state, guidelineUsedId) => Object.assign(Object.assign({}, state), {
      guidelineUsedId
    }));
    this.setAuthorizationKindId = this.updater((state, authorizationKindId) => Object.assign(Object.assign({}, state), {
      authorizationKindId
    }));
    this.setAuthorizationStatusId = this.updater((state, authorizationStatusId) => Object.assign(Object.assign({}, state), {
      authorizationStatusId
    }));
    this.setBillId = this.updater((state, billId) => Object.assign(Object.assign({}, state), {
      billId
    }));
    this.setMedicalReportId = this.updater((state, medicalReportId) => Object.assign(Object.assign({}, state), {
      medicalReportId
    }));
    this.setPatientId = this.updater((state, patientId) => Object.assign(Object.assign({}, state), {
      patientId
    }));
    this.setCaseProcedureId = this.updater((state, caseProcedureId) => Object.assign(Object.assign({}, state), {
      caseProcedureId
    }));
    this.filterProcedureSites = term => this.data.userSelectProcedureSites({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedureSites = res.data.items;
      this.patchState({
        procedureSites
      });
      return procedureSites;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterSurgicalPositions = term => this.data.userSelectSurgicalPositions({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let surgicalPositions = res.data.items;
      this.patchState({
        surgicalPositions
      });
      return surgicalPositions;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterClinicalProviders = term => this.data.userSelectClinicalProviders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let clinicalProviders = res.data.items;
      this.patchState({
        clinicalProviders
      });
      return clinicalProviders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterDocuments = term => this.data.userSelectDocuments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let documents = res.data.items;
      this.patchState({
        documents
      });
      return documents;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterVisitKinds = term => this.data.userSelectVisitKinds({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let visitKinds = res.data.items;
      this.patchState({
        visitKinds
      });
      return visitKinds;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterGuidelineUseds = term => this.data.userSelectGuidelineUseds({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let guidelineUseds = res.data.items;
      this.patchState({
        guidelineUseds
      });
      return guidelineUseds;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAuthorizationKinds = term => this.data.userSelectAuthorizationKinds({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let authorizationKinds = res.data.items;
      this.patchState({
        authorizationKinds
      });
      return authorizationKinds;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAuthorizationStatuses = term => this.data.userSelectAuthorizationStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let authorizationStatuses = res.data.items;
      this.patchState({
        authorizationStatuses
      });
      return authorizationStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPatients = term => this.data.userSelectPatients({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let patients = res.data.items;
      this.patchState({
        patients
      });
      return patients;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterCaseProcedures = term => this.data.userSelectCaseProcedures({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let caseProcedures = res.data.items;
      this.patchState({
        caseProcedures
      });
      return caseProcedures;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addProcedureSite = this.updater((state, procedureSite) => Object.assign(Object.assign({}, state), {
      procedureSites: state.procedureSites.concat(procedureSite)
    }));
    this.addSurgicalPosition = this.updater((state, surgicalPosition) => Object.assign(Object.assign({}, state), {
      surgicalPositions: state.surgicalPositions.concat(surgicalPosition)
    }));
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.addDocument = this.updater((state, document) => Object.assign(Object.assign({}, state), {
      documents: state.documents.concat(document)
    }));
    this.addVisitKind = this.updater((state, visitKind) => Object.assign(Object.assign({}, state), {
      visitKinds: state.visitKinds.concat(visitKind)
    }));
    this.addGuidelineUsed = this.updater((state, guidelineUsed) => Object.assign(Object.assign({}, state), {
      guidelineUseds: state.guidelineUseds.concat(guidelineUsed)
    }));
    this.addAuthorizationKind = this.updater((state, authorizationKind) => Object.assign(Object.assign({}, state), {
      authorizationKinds: state.authorizationKinds.concat(authorizationKind)
    }));
    this.addAuthorizationStatus = this.updater((state, authorizationStatus) => Object.assign(Object.assign({}, state), {
      authorizationStatuses: state.authorizationStatuses.concat(authorizationStatus)
    }));
    this.addPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(patient)
    }));
    this.addCaseProcedure = this.updater((state, caseProcedure) => Object.assign(Object.assign({}, state), {
      caseProcedures: state.caseProcedures.concat(caseProcedure)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: [...state.priorAuthorizationRequests, priorAuthorizationRequest]
    }));
    this.updatePriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationRequests: state.priorAuthorizationRequests.map(el => {
          if (el.id === priorAuthorizationRequest.id) {
            return priorAuthorizationRequest;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorAuthorizationRequests = this.updater((state, newPriorAuthorizationRequests) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: state.priorAuthorizationRequests.concat(newPriorAuthorizationRequests)
    }));
    this.updatePriorAuthorizationRequests = this.updater((state, updatedPriorAuthorizationRequests) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationRequests: state.priorAuthorizationRequests.map(priorAuthorizationRequest => {
          const updated = updatedPriorAuthorizationRequests.find(el => el.id === priorAuthorizationRequest.id);
          return updated ? updated : priorAuthorizationRequest;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorAuthorizationRequestEffect = this.effect(priorAuthorizationRequestId$ => priorAuthorizationRequestId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(priorAuthorizationRequestId => this.data.userPriorAuthorizationRequest({
      priorAuthorizationRequestId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      console.log('-----------------------------------');
      console.log(res.data.item);
      return this.patchState({
        item: res.data.item,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadPriorAuthorizationRequestsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPriorAuthorizationRequests({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      priorAuthorizationRequests: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorAuthorizationRequestEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.priorAuthorizationRequestService.createPriorAuthorizationRequest(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationRequest => {
      this.addNewPriorAuthorizationRequest(priorAuthorizationRequest);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationRequest,
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
    this.updatePriorAuthorizationRequestEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.priorAuthorizationRequestService.updatePriorAuthorizationRequest(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationRequest => {
      this.updatePriorAuthorizationRequest(priorAuthorizationRequest);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationRequest,
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
    this.deletePriorAuthorizationRequestEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, priorAuthorizationRequest]) => {
      return this.data.userDeletePriorAuthorizationRequest({
        priorAuthorizationRequestId: priorAuthorizationRequest.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.priorAuthorizationRequestService.importPriorAuthorizationRequests(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPriorAuthorizationRequests(created);
      this.updatePriorAuthorizationRequests(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorAuthorizationRequestId')) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get('priorAuthorizationRequestId');
      this.setFormName('priorAuthorizationRequest_edit');
    } else {
      this.setFormName('priorAuthorizationRequest_create');
    }
    if (this.route.snapshot.paramMap.has("procedureSiteId")) {
      var procedureSiteId = this.route.snapshot.paramMap.get("procedureSiteId");
      this.setProcedureSiteId(procedureSiteId);
    }
    if (this.route.snapshot.paramMap.has("surgicalPositionId")) {
      var surgicalPositionId = this.route.snapshot.paramMap.get("surgicalPositionId");
      this.setSurgicalPositionId(surgicalPositionId);
    }
    if (this.route.snapshot.paramMap.has("treatingProviderId")) {
      var treatingProviderId = this.route.snapshot.paramMap.get("treatingProviderId");
      this.setTreatingProviderId(treatingProviderId);
    }
    if (this.route.snapshot.paramMap.has("referredToId")) {
      var referredToId = this.route.snapshot.paramMap.get("referredToId");
      this.setReferredToId(referredToId);
    }
    if (this.route.snapshot.paramMap.has("prescriptionId")) {
      var prescriptionId = this.route.snapshot.paramMap.get("prescriptionId");
      this.setPrescriptionId(prescriptionId);
    }
    if (this.route.snapshot.paramMap.has("visitKindId")) {
      var visitKindId = this.route.snapshot.paramMap.get("visitKindId");
      this.setVisitKindId(visitKindId);
    }
    if (this.route.snapshot.paramMap.has("guidelineUsedId")) {
      var guidelineUsedId = this.route.snapshot.paramMap.get("guidelineUsedId");
      this.setGuidelineUsedId(guidelineUsedId);
    }
    if (this.route.snapshot.paramMap.has("authorizationKindId")) {
      var authorizationKindId = this.route.snapshot.paramMap.get("authorizationKindId");
      this.setAuthorizationKindId(authorizationKindId);
    }
    if (this.route.snapshot.paramMap.has("authorizationStatusId")) {
      var authorizationStatusId = this.route.snapshot.paramMap.get("authorizationStatusId");
      this.setAuthorizationStatusId(authorizationStatusId);
    }
    if (this.route.snapshot.paramMap.has("billId")) {
      var billId = this.route.snapshot.paramMap.get("billId");
      this.setBillId(billId);
    }
    if (this.route.snapshot.paramMap.has("medicalReportId")) {
      var medicalReportId = this.route.snapshot.paramMap.get("medicalReportId");
      this.setMedicalReportId(medicalReportId);
    }
    if (this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId");
      this.setPatientId(patientId);
    }
    if (this.route.snapshot.paramMap.has("caseProcedureId")) {
      var caseProcedureId = this.route.snapshot.paramMap.get("caseProcedureId");
      this.setCaseProcedureId(caseProcedureId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.priorAuthorizationRequestService.validatePriorAuthorizationRequestExcelData(excelData, vm.procedureSites, vm.surgicalPositions, vm.clinicalProviders, vm.clinicalProviders, vm.documents, vm.visitKinds, vm.guidelineUseds, vm.authorizationKinds, vm.authorizationStatuses, vm.patients, vm.caseProcedures);
    }));
  }
}
WebPriorAuthorizationRequestFeatureStore.ɵfac = function WebPriorAuthorizationRequestFeatureStore_Factory(t) {
  return new (t || WebPriorAuthorizationRequestFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_prior_authorization_request_service__WEBPACK_IMPORTED_MODULE_12__.PriorAuthorizationRequestService));
};
WebPriorAuthorizationRequestFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPriorAuthorizationRequestFeatureStore,
  factory: WebPriorAuthorizationRequestFeatureStore.ɵfac
});

/***/ }),

/***/ 362020:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/rules/create-prior-authorization-request-input-is-valid.rule.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationRequestInputIsValidRule": () => (/* binding */ CreatePriorAuthorizationRequestInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_authorization_request_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-request-name-is-valid.rule */ 210722);


class CreatePriorAuthorizationRequestInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_authorization_request_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationRequestNameIsValidRule('name', 'The priorauthorizationrequest name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 210722:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-request/shared/rules/prior-authorization-request-name-is-valid.rule.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationRequestNameIsValidRule": () => (/* binding */ PriorAuthorizationRequestNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorAuthorizationRequestNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);