"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_procedure-or-treatment-request_shared_procedure-or-treatment-request_store_ts"],{

/***/ 762311:
/*!****************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/actions/create-procedure-or-treatment-request.action.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureOrTreatmentRequestAction": () => (/* binding */ CreateProcedureOrTreatmentRequestAction)
/* harmony export */ });
/* harmony import */ var _procedure_or_treatment_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request.business-action-base */ 901277);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_procedure_or_treatment_request_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-procedure-or-treatment-request-input-is-valid.rule */ 542584);




class CreateProcedureOrTreatmentRequestAction extends _procedure_or_treatment_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestBusinessActionBase {
  constructor(input) {
    super('CreateProcedureOrTreatmentRequestAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_procedure_or_treatment_request_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureOrTreatmentRequestInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureOrTreatmentRequest({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 901277:
/*!***********************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/actions/procedure-or-treatment-request.business-action-base.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestBusinessActionBase": () => (/* binding */ ProcedureOrTreatmentRequestBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ProcedureOrTreatmentRequestBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 312008:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/actions/update-procedure-or-treatment-requests.action.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateProcedureOrTreatmentRequestAction": () => (/* binding */ UpdateProcedureOrTreatmentRequestAction),
/* harmony export */   "UpdateProcedureOrTreatmentRequestsAction": () => (/* binding */ UpdateProcedureOrTreatmentRequestsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_or_treatment_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request.business-action-base */ 901277);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateProcedureOrTreatmentRequestsAction extends _procedure_or_treatment_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestBusinessActionBase {
  constructor(procedureOrTreatmentRequests) {
    super('UpdateProcedureOrTreatmentRequestsAction');
    this.procedureOrTreatmentRequests = procedureOrTreatmentRequests;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureOrTreatmentRequests, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequests({
      input: {
        procedureOrTreatmentRequests: this.procedureOrTreatmentRequests
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateProcedureOrTreatmentRequestAction extends _procedure_or_treatment_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestBusinessActionBase {
  constructor(procedureOrTreatmentRequest, procedureOrTreatmentRequestId) {
    super('UpdateProcedureOrTreatmentRequestAction');
    this.procedureOrTreatmentRequest = procedureOrTreatmentRequest;
    this.procedureOrTreatmentRequestId = procedureOrTreatmentRequestId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureOrTreatmentRequest, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.procedureOrTreatmentRequestId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequest({
      procedureOrTreatmentRequestId: this.procedureOrTreatmentRequestId,
      input: this.procedureOrTreatmentRequest
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 943150:
/*!*****************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/actions/validate-procedure-or-treatment-request-excel-data.action.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateProcedureOrTreatmentRequestExcelDataAction": () => (/* binding */ ValidateProcedureOrTreatmentRequestExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_or_treatment_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request.business-action-base */ 901277);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateProcedureOrTreatmentRequestExcelDataAction extends _procedure_or_treatment_request_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestBusinessActionBase {
  constructor(excelData) {
    super('ValidateProcedureOrTreatmentRequestExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
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

/***/ 85543:
/*!********************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/procedure-or-treatment-request.business-provider.service.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestBusinessProviderService": () => (/* binding */ ProcedureOrTreatmentRequestBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_procedure_or_treatment_request_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-procedure-or-treatment-request-excel-data.action */ 943150);
/* harmony import */ var _actions_create_procedure_or_treatment_request_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-procedure-or-treatment-request.action */ 762311);
/* harmony import */ var _actions_update_procedure_or_treatment_requests_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-procedure-or-treatment-requests.action */ 312008);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ProcedureOrTreatmentRequestBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ProcedureOrTreatmentRequestBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createProcedureOrTreatmentRequest(input) {
    const action = new _actions_create_procedure_or_treatment_request_action__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureOrTreatmentRequestAction(input);
    action.Do(this);
    return action.response;
  }
  updateProcedureOrTreatmentRequest(input, procedureOrTreatmentRequestId) {
    const action = new _actions_update_procedure_or_treatment_requests_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureOrTreatmentRequestAction(input, procedureOrTreatmentRequestId);
    action.Do(this);
    return action.response;
  }
  importProcedureOrTreatmentRequests(procedureOrTreatmentRequests) {
    const updateProcedureOrTreatmentRequestsAction = new _actions_update_procedure_or_treatment_requests_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureOrTreatmentRequestsAction(procedureOrTreatmentRequests);
    updateProcedureOrTreatmentRequestsAction.Do(this);
    return updateProcedureOrTreatmentRequestsAction.response;
  }
  validateProcedureOrTreatmentRequestExcelData(excelData) {
    const validateProcedureOrTreatmentRequestExcelDataAction = new _actions_validate_procedure_or_treatment_request_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateProcedureOrTreatmentRequestExcelDataAction(excelData);
    validateProcedureOrTreatmentRequestExcelDataAction.Do(this);
    return validateProcedureOrTreatmentRequestExcelDataAction.response;
  }
}
ProcedureOrTreatmentRequestBusinessProviderService.ɵfac = function ProcedureOrTreatmentRequestBusinessProviderService_Factory(t) {
  return new (t || ProcedureOrTreatmentRequestBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ProcedureOrTreatmentRequestBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ProcedureOrTreatmentRequestBusinessProviderService,
  factory: ProcedureOrTreatmentRequestBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 855094:
/*!**************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/procedure-or-treatment-request.service.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestService": () => (/* binding */ ProcedureOrTreatmentRequestService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _procedure_or_treatment_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./procedure-or-treatment-request.business-provider.service */ 85543);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ProcedureOrTreatmentRequestService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ProcedureOrTreatmentRequestService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createProcedureOrTreatmentRequest(input) {
    return this.businessProvider.createProcedureOrTreatmentRequest(input);
  }
  updateProcedureOrTreatmentRequest(input, procedureOrTreatmentRequestId) {
    return this.businessProvider.updateProcedureOrTreatmentRequest(input, procedureOrTreatmentRequestId);
  }
  importProcedureOrTreatmentRequests(procedureOrTreatmentRequests) {
    return this.businessProvider.importProcedureOrTreatmentRequests(procedureOrTreatmentRequests);
  }
  validateProcedureOrTreatmentRequestExcelData(excelData) {
    return this.businessProvider.validateProcedureOrTreatmentRequestExcelData(excelData);
  }
}
ProcedureOrTreatmentRequestService.ɵfac = function ProcedureOrTreatmentRequestService_Factory(t) {
  return new (t || ProcedureOrTreatmentRequestService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_or_treatment_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureOrTreatmentRequestBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_or_treatment_request_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureOrTreatmentRequestBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ProcedureOrTreatmentRequestService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ProcedureOrTreatmentRequestService,
  factory: ProcedureOrTreatmentRequestService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 627462:
/*!************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/procedure-or-treatment-request.store.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureOrTreatmentRequestFeatureStore": () => (/* binding */ WebProcedureOrTreatmentRequestFeatureStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 670262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _procedure_or_treatment_request_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./procedure-or-treatment-request.service */ 855094);














class WebProcedureOrTreatmentRequestFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, procedureOrTreatmentRequestService) {
    super({
      loading: false,
      procedureOrTreatmentRequests: [],
      done: false,
      searchQuery: '',
      formName: undefined,
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
    this.procedureOrTreatmentRequestService = procedureOrTreatmentRequestService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.procedureOrTreatmentRequests$ = this.select(s => s.procedureOrTreatmentRequests);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureOrTreatmentRequests$, (errors, loading, item, formName, procedureOrTreatmentRequests) => ({
      errors,
      loading,
      item,
      formName,
      procedureOrTreatmentRequests
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewProcedureOrTreatmentRequest = this.updater((state, procedureOrTreatmentRequest) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequests: [...state.procedureOrTreatmentRequests, procedureOrTreatmentRequest]
    }));
    this.updateProcedureOrTreatmentRequest = this.updater((state, procedureOrTreatmentRequest) => {
      return Object.assign(Object.assign({}, state), {
        procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.map(el => {
          if (el.id === procedureOrTreatmentRequest.id) {
            return procedureOrTreatmentRequest;
          } else {
            return el;
          }
        })
      });
    });
    this.addProcedureOrTreatmentRequests = this.updater((state, newProcedureOrTreatmentRequests) => Object.assign(Object.assign({}, state), {
      procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.concat(newProcedureOrTreatmentRequests)
    }));
    this.updateProcedureOrTreatmentRequests = this.updater((state, updatedProcedureOrTreatmentRequests) => {
      return Object.assign(Object.assign({}, state), {
        procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.map(procedureOrTreatmentRequest => {
          const updated = updatedProcedureOrTreatmentRequests.find(el => el.id === procedureOrTreatmentRequest.id);
          return updated ? updated : procedureOrTreatmentRequest;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadProcedureOrTreatmentRequestEffect = this.effect(procedureOrTreatmentRequestId$ => procedureOrTreatmentRequestId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(procedureOrTreatmentRequestId => this.data.userProcedureOrTreatmentRequest({
      procedureOrTreatmentRequestId
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
    this.loadProcedureOrTreatmentRequestsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userProcedureOrTreatmentRequests({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      procedureOrTreatmentRequests: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createProcedureOrTreatmentRequestEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.procedureOrTreatmentRequestService.createProcedureOrTreatmentRequest(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureOrTreatmentRequest => {
      this.addNewProcedureOrTreatmentRequest(procedureOrTreatmentRequest);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: procedureOrTreatmentRequest,
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
    this.updateProcedureOrTreatmentRequestEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.procedureOrTreatmentRequestService.updateProcedureOrTreatmentRequest(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureOrTreatmentRequest => {
      this.updateProcedureOrTreatmentRequest(procedureOrTreatmentRequest);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: procedureOrTreatmentRequest,
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
    this.deleteProcedureOrTreatmentRequestEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, procedureOrTreatmentRequest]) => {
      return this.data.userDeleteProcedureOrTreatmentRequest({
        procedureOrTreatmentRequestId: procedureOrTreatmentRequest.id
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
    this.importExcelEffect = this.effect($data => $data.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.procedureOrTreatmentRequestService.importProcedureOrTreatmentRequests(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      var _a;
      this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
        duration: 3000
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_5__.EMPTY;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(updateResult => {
      const created = JSON.parse(updateResult.created);
      const updated = JSON.parse(updateResult.updated);
      const failed = JSON.parse(updateResult.failed);
      const total = created.length + updated.length + failed.length;
      this.addProcedureOrTreatmentRequests(created);
      this.updateProcedureOrTreatmentRequests(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('procedureOrTreatmentRequestId')) {
      var procedureOrTreatmentRequestId = this.route.snapshot.paramMap.get('procedureOrTreatmentRequestId');
      this.setFormName('procedureOrTreatmentRequest_edit');
    } else {
      this.setFormName('procedureOrTreatmentRequest_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.procedureOrTreatmentRequestService.validateProcedureOrTreatmentRequestExcelData(excelData);
    }));
  }
}
WebProcedureOrTreatmentRequestFeatureStore.ɵfac = function WebProcedureOrTreatmentRequestFeatureStore_Factory(t) {
  return new (t || WebProcedureOrTreatmentRequestFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_procedure_or_treatment_request_service__WEBPACK_IMPORTED_MODULE_11__.ProcedureOrTreatmentRequestService));
};
WebProcedureOrTreatmentRequestFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebProcedureOrTreatmentRequestFeatureStore,
  factory: WebProcedureOrTreatmentRequestFeatureStore.ɵfac
});

/***/ }),

/***/ 542584:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/rules/create-procedure-or-treatment-request-input-is-valid.rule.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureOrTreatmentRequestInputIsValidRule": () => (/* binding */ CreateProcedureOrTreatmentRequestInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _procedure_or_treatment_request_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-or-treatment-request-name-is-valid.rule */ 505377);


class CreateProcedureOrTreatmentRequestInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _procedure_or_treatment_request_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ProcedureOrTreatmentRequestNameIsValidRule('name', 'The procedureortreatmentrequest name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 505377:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/procedure-or-treatment-request/shared/rules/procedure-or-treatment-request-name-is-valid.rule.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureOrTreatmentRequestNameIsValidRule": () => (/* binding */ ProcedureOrTreatmentRequestNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ProcedureOrTreatmentRequestNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);