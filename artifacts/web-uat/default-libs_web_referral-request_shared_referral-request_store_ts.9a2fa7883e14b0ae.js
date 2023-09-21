"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_referral-request_shared_referral-request_store_ts"],{

/***/ 309218:
/*!************************************************************************************!*\
  !*** ./libs/web/referral-request/shared/actions/create-referral-request.action.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateReferralRequestAction": () => (/* binding */ CreateReferralRequestAction)
/* harmony export */ });
/* harmony import */ var _referral_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./referral-request.business-action-base */ 974132);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_referral_request_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-referral-request-input-is-valid.rule */ 181761);




class CreateReferralRequestAction extends _referral_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ReferralRequestBusinessActionBase {
  constructor(input) {
    super('CreateReferralRequestAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_referral_request_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateReferralRequestInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateReferralRequest({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 974132:
/*!*******************************************************************************************!*\
  !*** ./libs/web/referral-request/shared/actions/referral-request.business-action-base.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferralRequestBusinessActionBase": () => (/* binding */ ReferralRequestBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ReferralRequestBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 676488:
/*!*************************************************************************************!*\
  !*** ./libs/web/referral-request/shared/actions/update-referral-requests.action.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateReferralRequestAction": () => (/* binding */ UpdateReferralRequestAction),
/* harmony export */   "UpdateReferralRequestsAction": () => (/* binding */ UpdateReferralRequestsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _referral_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./referral-request.business-action-base */ 974132);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateReferralRequestsAction extends _referral_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ReferralRequestBusinessActionBase {
  constructor(referralRequests) {
    super('UpdateReferralRequestsAction');
    this.referralRequests = referralRequests;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.referralRequests, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateReferralRequests({
      input: {
        referralRequests: this.referralRequests
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateReferralRequestAction extends _referral_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ReferralRequestBusinessActionBase {
  constructor(referralRequest, referralRequestId) {
    super('UpdateReferralRequestAction');
    this.referralRequest = referralRequest;
    this.referralRequestId = referralRequestId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.referralRequest, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.referralRequestId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateReferralRequest({
      referralRequestId: this.referralRequestId,
      input: this.referralRequest
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 830421:
/*!*************************************************************************************************!*\
  !*** ./libs/web/referral-request/shared/actions/validate-referral-request-excel-data.action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateReferralRequestExcelDataAction": () => (/* binding */ ValidateReferralRequestExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _referral_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./referral-request.business-action-base */ 974132);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateReferralRequestExcelDataAction extends _referral_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ReferralRequestBusinessActionBase {
  constructor(excelData, patients, legalCases, requestingProviders, referredTos, referredToLocations) {
    super('ValidateReferralRequestExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.patients = patients;
    this.legalCases = legalCases;
    this.requestingProviders = requestingProviders;
    this.referredTos = referredTos;
    this.referredToLocations = referredToLocations;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`requestingProviderName_${index}_is_valid}`, "Requesting Provider Is Not Valid", 'requestingProvider.name', datum['requestingProvider'], this.requestingProviders, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`referredToName_${index}_is_valid}`, "Referred to Is Not Valid", 'referredTo.name', datum['referredTo'], this.referredTos, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`referredToLocationName_${index}_is_valid}`, "Referred to Location Is Not Valid", 'referredToLocation.name', datum['referredToLocation'], this.referredToLocations, true));
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

/***/ 913527:
/*!****************************************************************************************!*\
  !*** ./libs/web/referral-request/shared/referral-request.business-provider.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferralRequestBusinessProviderService": () => (/* binding */ ReferralRequestBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_referral_request_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-referral-request-excel-data.action */ 830421);
/* harmony import */ var _actions_create_referral_request_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-referral-request.action */ 309218);
/* harmony import */ var _actions_update_referral_requests_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-referral-requests.action */ 676488);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ReferralRequestBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ReferralRequestBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createReferralRequest(input) {
    const action = new _actions_create_referral_request_action__WEBPACK_IMPORTED_MODULE_2__.CreateReferralRequestAction(input);
    action.Do(this);
    return action.response;
  }
  updateReferralRequest(input, referralRequestId) {
    const action = new _actions_update_referral_requests_action__WEBPACK_IMPORTED_MODULE_3__.UpdateReferralRequestAction(input, referralRequestId);
    action.Do(this);
    return action.response;
  }
  importReferralRequests(referralRequests) {
    const updateReferralRequestsAction = new _actions_update_referral_requests_action__WEBPACK_IMPORTED_MODULE_3__.UpdateReferralRequestsAction(referralRequests);
    updateReferralRequestsAction.Do(this);
    return updateReferralRequestsAction.response;
  }
  validateReferralRequestExcelData(excelData, patients, legalCases, requestingProviders, referredTos, referredToLocations) {
    const validateReferralRequestExcelDataAction = new _actions_validate_referral_request_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateReferralRequestExcelDataAction(excelData, patients, legalCases, requestingProviders, referredTos, referredToLocations);
    validateReferralRequestExcelDataAction.Do(this);
    return validateReferralRequestExcelDataAction.response;
  }
}
ReferralRequestBusinessProviderService.ɵfac = function ReferralRequestBusinessProviderService_Factory(t) {
  return new (t || ReferralRequestBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ReferralRequestBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ReferralRequestBusinessProviderService,
  factory: ReferralRequestBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 303734:
/*!**********************************************************************!*\
  !*** ./libs/web/referral-request/shared/referral-request.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferralRequestService": () => (/* binding */ ReferralRequestService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _referral_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./referral-request.business-provider.service */ 913527);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ReferralRequestService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ReferralRequestService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createReferralRequest(input) {
    return this.businessProvider.createReferralRequest(input);
  }
  updateReferralRequest(input, referralRequestId) {
    return this.businessProvider.updateReferralRequest(input, referralRequestId);
  }
  importReferralRequests(referralRequests) {
    return this.businessProvider.importReferralRequests(referralRequests);
  }
  validateReferralRequestExcelData(excelData, patients, legalCases, requestingProviders, referredTos, referredToLocations) {
    return this.businessProvider.validateReferralRequestExcelData(excelData, patients, legalCases, requestingProviders, referredTos, referredToLocations);
  }
}
ReferralRequestService.ɵfac = function ReferralRequestService_Factory(t) {
  return new (t || ReferralRequestService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_referral_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ReferralRequestBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_referral_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ReferralRequestBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ReferralRequestService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ReferralRequestService,
  factory: ReferralRequestService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 45162:
/*!********************************************************************!*\
  !*** ./libs/web/referral-request/shared/referral-request.store.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebReferralRequestFeatureStore": () => (/* binding */ WebReferralRequestFeatureStore)
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
/* harmony import */ var _referral_request_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./referral-request.service */ 303734);














class WebReferralRequestFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, referralRequestService) {
    super({
      loading: false,
      referralRequests: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      patientId: undefined,
      legalCaseId: undefined,
      requestingProviderId: undefined,
      referredToId: undefined,
      clinicalProviderLocationId: undefined,
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
    this.referralRequestService = referralRequestService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.referralRequests$ = this.select(s => s.referralRequests);
    this.patients$ = this.select(s => s.patients || []);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.clinicalProviderLocations$ = this.select(s => s.clinicalProviderLocations || []);
    this.patientId$ = this.select(s => s.patientId);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.requestingProviderId$ = this.select(s => s.requestingProviderId);
    this.referredToId$ = this.select(s => s.referredToId);
    this.clinicalProviderLocationId$ = this.select(s => s.clinicalProviderLocationId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.referralRequests$, this.patients$, this.legalCases$, this.clinicalProviders$, this.clinicalProviderLocations$, (errors, loading, item, formName, referralRequests, patients, legalCases, clinicalProviders, clinicalProviderLocations) => ({
      errors,
      loading,
      item,
      formName,
      referralRequests,
      patients,
      legalCases,
      clinicalProviders,
      clinicalProviderLocations
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.patientId$, this.legalCaseId$, this.requestingProviderId$, this.referredToId$, this.clinicalProviderLocationId$, this.searchQuery$, (paging, patientId, legalCaseId, requestingProviderId, referredToId, clinicalProviderLocationId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      patientId: patientId,
      legalCaseId: legalCaseId,
      requestingProviderId: requestingProviderId,
      referredToId: referredToId,
      clinicalProviderLocationId: clinicalProviderLocationId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setPatientId = this.updater((state, patientId) => Object.assign(Object.assign({}, state), {
      patientId
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
    }));
    this.setRequestingProviderId = this.updater((state, requestingProviderId) => Object.assign(Object.assign({}, state), {
      requestingProviderId
    }));
    this.setReferredToId = this.updater((state, referredToId) => Object.assign(Object.assign({}, state), {
      referredToId
    }));
    this.setClinicalProviderLocationId = this.updater((state, clinicalProviderLocationId) => Object.assign(Object.assign({}, state), {
      clinicalProviderLocationId
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
    this.filterClinicalProviderLocations = term => this.data.userSelectClinicalProviderLocations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let clinicalProviderLocations = res.data.items;
      this.patchState({
        clinicalProviderLocations
      });
      return clinicalProviderLocations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(patient)
    }));
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.addClinicalProviderLocation = this.updater((state, clinicalProviderLocation) => Object.assign(Object.assign({}, state), {
      clinicalProviderLocations: state.clinicalProviderLocations.concat(clinicalProviderLocation)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewReferralRequest = this.updater((state, referralRequest) => Object.assign(Object.assign({}, state), {
      referralRequests: [...state.referralRequests, referralRequest]
    }));
    this.updateReferralRequest = this.updater((state, referralRequest) => {
      return Object.assign(Object.assign({}, state), {
        referralRequests: state.referralRequests.map(el => {
          if (el.id === referralRequest.id) {
            return referralRequest;
          } else {
            return el;
          }
        })
      });
    });
    this.addReferralRequests = this.updater((state, newReferralRequests) => Object.assign(Object.assign({}, state), {
      referralRequests: state.referralRequests.concat(newReferralRequests)
    }));
    this.updateReferralRequests = this.updater((state, updatedReferralRequests) => {
      return Object.assign(Object.assign({}, state), {
        referralRequests: state.referralRequests.map(referralRequest => {
          const updated = updatedReferralRequests.find(el => el.id === referralRequest.id);
          return updated ? updated : referralRequest;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadReferralRequestEffect = this.effect(referralRequestId$ => referralRequestId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(referralRequestId => this.data.userReferralRequest({
      referralRequestId
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
    this.loadReferralRequestsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userReferralRequests({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      referralRequests: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createReferralRequestEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.referralRequestService.createReferralRequest(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(referralRequest => {
      this.addNewReferralRequest(referralRequest);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: referralRequest,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, errors => {
      console.log(errors);
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
    this.updateReferralRequestEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.referralRequestService.updateReferralRequest(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(referralRequest => {
      this.updateReferralRequest(referralRequest);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: referralRequest,
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
    this.deleteReferralRequestEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, referralRequest]) => {
      return this.data.userDeleteReferralRequest({
        referralRequestId: referralRequest.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.referralRequestService.importReferralRequests(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addReferralRequests(created);
      this.updateReferralRequests(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('referralRequestId')) {
      var referralRequestId = this.route.snapshot.paramMap.get('referralRequestId');
      this.setFormName('referralRequest_edit');
    } else {
      this.setFormName('referralRequest_create');
    }
    if (this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId");
      this.setPatientId(patientId);
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
    if (this.route.snapshot.paramMap.has("requestingProviderId")) {
      var requestingProviderId = this.route.snapshot.paramMap.get("requestingProviderId");
      this.setRequestingProviderId(requestingProviderId);
    }
    if (this.route.snapshot.paramMap.has("referredToId")) {
      var referredToId = this.route.snapshot.paramMap.get("referredToId");
      this.setReferredToId(referredToId);
    }
    if (this.route.snapshot.paramMap.has("clinicalProviderLocationId")) {
      var clinicalProviderLocationId = this.route.snapshot.paramMap.get("clinicalProviderLocationId");
      this.setClinicalProviderLocationId(clinicalProviderLocationId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.referralRequestService.validateReferralRequestExcelData(excelData, vm.patients, vm.legalCases, vm.clinicalProviders, vm.clinicalProviders, vm.clinicalProviderLocations);
    }));
  }
}
WebReferralRequestFeatureStore.ɵfac = function WebReferralRequestFeatureStore_Factory(t) {
  return new (t || WebReferralRequestFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_referral_request_service__WEBPACK_IMPORTED_MODULE_12__.ReferralRequestService));
};
WebReferralRequestFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebReferralRequestFeatureStore,
  factory: WebReferralRequestFeatureStore.ɵfac
});

/***/ }),

/***/ 181761:
/*!***********************************************************************************************!*\
  !*** ./libs/web/referral-request/shared/rules/create-referral-request-input-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateReferralRequestInputIsValidRule": () => (/* binding */ CreateReferralRequestInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _referral_request_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./referral-request-name-is-valid.rule */ 616001);


class CreateReferralRequestInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _referral_request_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ReferralRequestNameIsValidRule('name', 'The referralrequest name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 616001:
/*!***************************************************************************************!*\
  !*** ./libs/web/referral-request/shared/rules/referral-request-name-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferralRequestNameIsValidRule": () => (/* binding */ ReferralRequestNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ReferralRequestNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);