"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_request-additional-visit_shared_request-additional-visit_store_ts"],{

/***/ 525430:
/*!****************************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/actions/create-request-additional-visit.action.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRequestAdditionalVisitAction": () => (/* binding */ CreateRequestAdditionalVisitAction)
/* harmony export */ });
/* harmony import */ var _request_additional_visit_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request-additional-visit.business-action-base */ 169998);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_request_additional_visit_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-request-additional-visit-input-is-valid.rule */ 659654);




class CreateRequestAdditionalVisitAction extends _request_additional_visit_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RequestAdditionalVisitBusinessActionBase {
  constructor(input) {
    super('CreateRequestAdditionalVisitAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_request_additional_visit_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateRequestAdditionalVisitInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateRequestAdditionalVisit({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 169998:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/actions/request-additional-visit.business-action-base.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestAdditionalVisitBusinessActionBase": () => (/* binding */ RequestAdditionalVisitBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class RequestAdditionalVisitBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 7879:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/actions/update-request-additional-visits.action.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateRequestAdditionalVisitAction": () => (/* binding */ UpdateRequestAdditionalVisitAction),
/* harmony export */   "UpdateRequestAdditionalVisitsAction": () => (/* binding */ UpdateRequestAdditionalVisitsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _request_additional_visit_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request-additional-visit.business-action-base */ 169998);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateRequestAdditionalVisitsAction extends _request_additional_visit_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RequestAdditionalVisitBusinessActionBase {
  constructor(requestAdditionalVisits) {
    super('UpdateRequestAdditionalVisitsAction');
    this.requestAdditionalVisits = requestAdditionalVisits;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.requestAdditionalVisits, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRequestAdditionalVisits({
      input: {
        requestAdditionalVisits: this.requestAdditionalVisits
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateRequestAdditionalVisitAction extends _request_additional_visit_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RequestAdditionalVisitBusinessActionBase {
  constructor(requestAdditionalVisit, requestAdditionalVisitId) {
    super('UpdateRequestAdditionalVisitAction');
    this.requestAdditionalVisit = requestAdditionalVisit;
    this.requestAdditionalVisitId = requestAdditionalVisitId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.requestAdditionalVisit, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.requestAdditionalVisitId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRequestAdditionalVisit({
      requestAdditionalVisitId: this.requestAdditionalVisitId,
      input: this.requestAdditionalVisit
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 761354:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/actions/validate-request-additional-visit-excel-data.action.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateRequestAdditionalVisitExcelDataAction": () => (/* binding */ ValidateRequestAdditionalVisitExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _request_additional_visit_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request-additional-visit.business-action-base */ 169998);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateRequestAdditionalVisitExcelDataAction extends _request_additional_visit_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RequestAdditionalVisitBusinessActionBase {
  constructor(excelData, patients, legalCases) {
    super('ValidateRequestAdditionalVisitExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.patients = patients;
    this.legalCases = legalCases;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true));
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

/***/ 5236:
/*!********************************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/request-additional-visit.business-provider.service.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestAdditionalVisitBusinessProviderService": () => (/* binding */ RequestAdditionalVisitBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_request_additional_visit_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-request-additional-visit-excel-data.action */ 761354);
/* harmony import */ var _actions_create_request_additional_visit_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-request-additional-visit.action */ 525430);
/* harmony import */ var _actions_update_request_additional_visits_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-request-additional-visits.action */ 7879);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class RequestAdditionalVisitBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.RequestAdditionalVisitBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createRequestAdditionalVisit(input) {
    const action = new _actions_create_request_additional_visit_action__WEBPACK_IMPORTED_MODULE_2__.CreateRequestAdditionalVisitAction(input);
    action.Do(this);
    return action.response;
  }
  updateRequestAdditionalVisit(input, requestAdditionalVisitId) {
    const action = new _actions_update_request_additional_visits_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRequestAdditionalVisitAction(input, requestAdditionalVisitId);
    action.Do(this);
    return action.response;
  }
  importRequestAdditionalVisits(requestAdditionalVisits) {
    const updateRequestAdditionalVisitsAction = new _actions_update_request_additional_visits_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRequestAdditionalVisitsAction(requestAdditionalVisits);
    updateRequestAdditionalVisitsAction.Do(this);
    return updateRequestAdditionalVisitsAction.response;
  }
  validateRequestAdditionalVisitExcelData(excelData, patients, legalCases) {
    const validateRequestAdditionalVisitExcelDataAction = new _actions_validate_request_additional_visit_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateRequestAdditionalVisitExcelDataAction(excelData, patients, legalCases);
    validateRequestAdditionalVisitExcelDataAction.Do(this);
    return validateRequestAdditionalVisitExcelDataAction.response;
  }
}
RequestAdditionalVisitBusinessProviderService.ɵfac = function RequestAdditionalVisitBusinessProviderService_Factory(t) {
  return new (t || RequestAdditionalVisitBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
RequestAdditionalVisitBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: RequestAdditionalVisitBusinessProviderService,
  factory: RequestAdditionalVisitBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 354125:
/*!**************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/request-additional-visit.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestAdditionalVisitService": () => (/* binding */ RequestAdditionalVisitService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _request_additional_visit_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request-additional-visit.business-provider.service */ 5236);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class RequestAdditionalVisitService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("RequestAdditionalVisitService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createRequestAdditionalVisit(input) {
    return this.businessProvider.createRequestAdditionalVisit(input);
  }
  updateRequestAdditionalVisit(input, requestAdditionalVisitId) {
    return this.businessProvider.updateRequestAdditionalVisit(input, requestAdditionalVisitId);
  }
  importRequestAdditionalVisits(requestAdditionalVisits) {
    return this.businessProvider.importRequestAdditionalVisits(requestAdditionalVisits);
  }
  validateRequestAdditionalVisitExcelData(excelData, patients, legalCases) {
    return this.businessProvider.validateRequestAdditionalVisitExcelData(excelData, patients, legalCases);
  }
}
RequestAdditionalVisitService.ɵfac = function RequestAdditionalVisitService_Factory(t) {
  return new (t || RequestAdditionalVisitService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_request_additional_visit_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RequestAdditionalVisitBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_request_additional_visit_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RequestAdditionalVisitBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
RequestAdditionalVisitService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: RequestAdditionalVisitService,
  factory: RequestAdditionalVisitService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 51396:
/*!************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/request-additional-visit.store.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRequestAdditionalVisitFeatureStore": () => (/* binding */ WebRequestAdditionalVisitFeatureStore)
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
/* harmony import */ var _request_additional_visit_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./request-additional-visit.service */ 354125);














class WebRequestAdditionalVisitFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, requestAdditionalVisitService) {
    super({
      loading: false,
      requestAdditionalVisits: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      patientId: undefined,
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
    this.requestAdditionalVisitService = requestAdditionalVisitService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.requestAdditionalVisits$ = this.select(s => s.requestAdditionalVisits);
    this.patients$ = this.select(s => s.patients || []);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.patientId$ = this.select(s => s.patientId);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.requestAdditionalVisits$, this.patients$, this.legalCases$, (errors, loading, item, formName, requestAdditionalVisits, patients, legalCases) => ({
      errors,
      loading,
      item,
      formName,
      requestAdditionalVisits,
      patients,
      legalCases
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.patientId$, this.legalCaseId$, this.searchQuery$, (paging, patientId, legalCaseId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      patientId: patientId,
      legalCaseId: legalCaseId,
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
    this.addPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(patient)
    }));
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewRequestAdditionalVisit = this.updater((state, requestAdditionalVisit) => Object.assign(Object.assign({}, state), {
      requestAdditionalVisits: [...state.requestAdditionalVisits, requestAdditionalVisit]
    }));
    this.updateRequestAdditionalVisit = this.updater((state, requestAdditionalVisit) => {
      return Object.assign(Object.assign({}, state), {
        requestAdditionalVisits: state.requestAdditionalVisits.map(el => {
          if (el.id === requestAdditionalVisit.id) {
            return requestAdditionalVisit;
          } else {
            return el;
          }
        })
      });
    });
    this.addRequestAdditionalVisits = this.updater((state, newRequestAdditionalVisits) => Object.assign(Object.assign({}, state), {
      requestAdditionalVisits: state.requestAdditionalVisits.concat(newRequestAdditionalVisits)
    }));
    this.updateRequestAdditionalVisits = this.updater((state, updatedRequestAdditionalVisits) => {
      return Object.assign(Object.assign({}, state), {
        requestAdditionalVisits: state.requestAdditionalVisits.map(requestAdditionalVisit => {
          const updated = updatedRequestAdditionalVisits.find(el => el.id === requestAdditionalVisit.id);
          return updated ? updated : requestAdditionalVisit;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadRequestAdditionalVisitEffect = this.effect(requestAdditionalVisitId$ => requestAdditionalVisitId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(requestAdditionalVisitId => this.data.userRequestAdditionalVisit({
      requestAdditionalVisitId
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
    this.loadRequestAdditionalVisitsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userRequestAdditionalVisits({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      requestAdditionalVisits: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createRequestAdditionalVisitEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.requestAdditionalVisitService.createRequestAdditionalVisit(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(requestAdditionalVisit => {
      this.addNewRequestAdditionalVisit(requestAdditionalVisit);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: requestAdditionalVisit,
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
    this.updateRequestAdditionalVisitEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.requestAdditionalVisitService.updateRequestAdditionalVisit(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(requestAdditionalVisit => {
      this.updateRequestAdditionalVisit(requestAdditionalVisit);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: requestAdditionalVisit,
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
    this.deleteRequestAdditionalVisitEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, requestAdditionalVisit]) => {
      return this.data.userDeleteRequestAdditionalVisit({
        requestAdditionalVisitId: requestAdditionalVisit.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.requestAdditionalVisitService.importRequestAdditionalVisits(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addRequestAdditionalVisits(created);
      this.updateRequestAdditionalVisits(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('requestAdditionalVisitId')) {
      var requestAdditionalVisitId = this.route.snapshot.paramMap.get('requestAdditionalVisitId');
      this.setFormName('requestAdditionalVisit_edit');
    } else {
      this.setFormName('requestAdditionalVisit_create');
    }
    if (this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId");
      this.setPatientId(patientId);
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.requestAdditionalVisitService.validateRequestAdditionalVisitExcelData(excelData, vm.patients, vm.legalCases);
    }));
  }
}
WebRequestAdditionalVisitFeatureStore.ɵfac = function WebRequestAdditionalVisitFeatureStore_Factory(t) {
  return new (t || WebRequestAdditionalVisitFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_request_additional_visit_service__WEBPACK_IMPORTED_MODULE_12__.RequestAdditionalVisitService));
};
WebRequestAdditionalVisitFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebRequestAdditionalVisitFeatureStore,
  factory: WebRequestAdditionalVisitFeatureStore.ɵfac
});

/***/ }),

/***/ 659654:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/rules/create-request-additional-visit-input-is-valid.rule.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRequestAdditionalVisitInputIsValidRule": () => (/* binding */ CreateRequestAdditionalVisitInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _request_additional_visit_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request-additional-visit-name-is-valid.rule */ 226608);


class CreateRequestAdditionalVisitInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _request_additional_visit_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.RequestAdditionalVisitNameIsValidRule('name', 'The requestadditionalvisit name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 226608:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/request-additional-visit/shared/rules/request-additional-visit-name-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestAdditionalVisitNameIsValidRule": () => (/* binding */ RequestAdditionalVisitNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class RequestAdditionalVisitNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);