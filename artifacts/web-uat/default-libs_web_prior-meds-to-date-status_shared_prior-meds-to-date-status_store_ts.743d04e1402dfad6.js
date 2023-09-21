"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-meds-to-date-status_shared_prior-meds-to-date-status_store_ts"],{

/***/ 209002:
/*!******************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/actions/create-prior-meds-to-date-status.action.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorMedsToDateStatusAction": () => (/* binding */ CreatePriorMedsToDateStatusAction)
/* harmony export */ });
/* harmony import */ var _prior_meds_to_date_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-meds-to-date-status.business-action-base */ 563223);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_meds_to_date_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-meds-to-date-status-input-is-valid.rule */ 139847);




class CreatePriorMedsToDateStatusAction extends _prior_meds_to_date_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateStatusBusinessActionBase {
  constructor(input) {
    super('CreatePriorMedsToDateStatusAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_meds_to_date_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorMedsToDateStatusInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorMedsToDateStatus({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 563223:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/actions/prior-meds-to-date-status.business-action-base.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorMedsToDateStatusBusinessActionBase": () => (/* binding */ PriorMedsToDateStatusBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorMedsToDateStatusBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 778344:
/*!********************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/actions/update-prior-meds-to-date-statuses.action.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorMedsToDateStatusAction": () => (/* binding */ UpdatePriorMedsToDateStatusAction),
/* harmony export */   "UpdatePriorMedsToDateStatusesAction": () => (/* binding */ UpdatePriorMedsToDateStatusesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_meds_to_date_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-meds-to-date-status.business-action-base */ 563223);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorMedsToDateStatusesAction extends _prior_meds_to_date_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateStatusBusinessActionBase {
  constructor(priorMedsToDateStatuses) {
    super('UpdatePriorMedsToDateStatusesAction');
    this.priorMedsToDateStatuses = priorMedsToDateStatuses;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorMedsToDateStatuses, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorMedsToDateStatuses({
      input: {
        priorMedsToDateStatuses: this.priorMedsToDateStatuses
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorMedsToDateStatusAction extends _prior_meds_to_date_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateStatusBusinessActionBase {
  constructor(priorMedsToDateStatus, priorMedsToDateStatusId) {
    super('UpdatePriorMedsToDateStatusAction');
    this.priorMedsToDateStatus = priorMedsToDateStatus;
    this.priorMedsToDateStatusId = priorMedsToDateStatusId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorMedsToDateStatus, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorMedsToDateStatusId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorMedsToDateStatus({
      priorMedsToDateStatusId: this.priorMedsToDateStatusId,
      input: this.priorMedsToDateStatus
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 692342:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/actions/validate-prior-meds-to-date-status-excel-data.action.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorMedsToDateStatusExcelDataAction": () => (/* binding */ ValidatePriorMedsToDateStatusExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_meds_to_date_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-meds-to-date-status.business-action-base */ 563223);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorMedsToDateStatusExcelDataAction extends _prior_meds_to_date_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateStatusBusinessActionBase {
  constructor(excelData) {
    super('ValidatePriorMedsToDateStatusExcelDataAction');
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

/***/ 79630:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/prior-meds-to-date-status.business-provider.service.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorMedsToDateStatusBusinessProviderService": () => (/* binding */ PriorMedsToDateStatusBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_meds_to_date_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-meds-to-date-status-excel-data.action */ 692342);
/* harmony import */ var _actions_create_prior_meds_to_date_status_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-meds-to-date-status.action */ 209002);
/* harmony import */ var _actions_update_prior_meds_to_date_statuses_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-meds-to-date-statuses.action */ 778344);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorMedsToDateStatusBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorMedsToDateStatusBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorMedsToDateStatus(input) {
    const action = new _actions_create_prior_meds_to_date_status_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorMedsToDateStatusAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorMedsToDateStatus(input, priorMedsToDateStatusId) {
    const action = new _actions_update_prior_meds_to_date_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorMedsToDateStatusAction(input, priorMedsToDateStatusId);
    action.Do(this);
    return action.response;
  }
  importPriorMedsToDateStatuses(priorMedsToDateStatuses) {
    const updatePriorMedsToDateStatusesAction = new _actions_update_prior_meds_to_date_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorMedsToDateStatusesAction(priorMedsToDateStatuses);
    updatePriorMedsToDateStatusesAction.Do(this);
    return updatePriorMedsToDateStatusesAction.response;
  }
  validatePriorMedsToDateStatusExcelData(excelData) {
    const validatePriorMedsToDateStatusExcelDataAction = new _actions_validate_prior_meds_to_date_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorMedsToDateStatusExcelDataAction(excelData);
    validatePriorMedsToDateStatusExcelDataAction.Do(this);
    return validatePriorMedsToDateStatusExcelDataAction.response;
  }
}
PriorMedsToDateStatusBusinessProviderService.ɵfac = function PriorMedsToDateStatusBusinessProviderService_Factory(t) {
  return new (t || PriorMedsToDateStatusBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorMedsToDateStatusBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorMedsToDateStatusBusinessProviderService,
  factory: PriorMedsToDateStatusBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 942655:
/*!****************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/prior-meds-to-date-status.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorMedsToDateStatusService": () => (/* binding */ PriorMedsToDateStatusService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_meds_to_date_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-meds-to-date-status.business-provider.service */ 79630);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorMedsToDateStatusService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorMedsToDateStatusService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorMedsToDateStatus(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorMedsToDateStatus(filteredObj);
  }
  updatePriorMedsToDateStatus(input, priorMedsToDateStatusId) {
    return this.businessProvider.updatePriorMedsToDateStatus(input, priorMedsToDateStatusId);
  }
  importPriorMedsToDateStatuses(priorMedsToDateStatuses) {
    return this.businessProvider.importPriorMedsToDateStatuses(priorMedsToDateStatuses);
  }
  validatePriorMedsToDateStatusExcelData(excelData) {
    return this.businessProvider.validatePriorMedsToDateStatusExcelData(excelData);
  }
}
PriorMedsToDateStatusService.ɵfac = function PriorMedsToDateStatusService_Factory(t) {
  return new (t || PriorMedsToDateStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_meds_to_date_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorMedsToDateStatusBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_meds_to_date_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorMedsToDateStatusBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorMedsToDateStatusService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorMedsToDateStatusService,
  factory: PriorMedsToDateStatusService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 626835:
/*!**************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/prior-meds-to-date-status.store.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorMedsToDateStatusFeatureStore": () => (/* binding */ WebPriorMedsToDateStatusFeatureStore)
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
/* harmony import */ var _prior_meds_to_date_status_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./prior-meds-to-date-status.service */ 942655);














class WebPriorMedsToDateStatusFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorMedsToDateStatusService) {
    super({
      loading: false,
      priorMedsToDateStatuses: [],
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
    this.priorMedsToDateStatusService = priorMedsToDateStatusService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorMedsToDateStatuses$ = this.select(s => s.priorMedsToDateStatuses);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorMedsToDateStatuses$, (errors, loading, item, formName, priorMedsToDateStatuses) => ({
      errors,
      loading,
      item,
      formName,
      priorMedsToDateStatuses
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
    this.addNewPriorMedsToDateStatus = this.updater((state, priorMedsToDateStatus) => Object.assign(Object.assign({}, state), {
      priorMedsToDateStatuses: [...state.priorMedsToDateStatuses, priorMedsToDateStatus]
    }));
    this.updatePriorMedsToDateStatus = this.updater((state, priorMedsToDateStatus) => {
      return Object.assign(Object.assign({}, state), {
        priorMedsToDateStatuses: state.priorMedsToDateStatuses.map(el => {
          if (el.id === priorMedsToDateStatus.id) {
            return priorMedsToDateStatus;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorMedsToDateStatuses = this.updater((state, newPriorMedsToDateStatuses) => Object.assign(Object.assign({}, state), {
      priorMedsToDateStatuses: state.priorMedsToDateStatuses.concat(newPriorMedsToDateStatuses)
    }));
    this.updatePriorMedsToDateStatuses = this.updater((state, updatedPriorMedsToDateStatuses) => {
      return Object.assign(Object.assign({}, state), {
        priorMedsToDateStatuses: state.priorMedsToDateStatuses.map(priorMedsToDateStatus => {
          const updated = updatedPriorMedsToDateStatuses.find(el => el.id === priorMedsToDateStatus.id);
          return updated ? updated : priorMedsToDateStatus;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorMedsToDateStatusEffect = this.effect(priorMedsToDateStatusId$ => priorMedsToDateStatusId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(priorMedsToDateStatusId => this.data.userPriorMedsToDateStatus({
      priorMedsToDateStatusId
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
    this.loadPriorMedsToDateStatusesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userPriorMedsToDateStatuses({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      priorMedsToDateStatuses: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorMedsToDateStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.priorMedsToDateStatusService.createPriorMedsToDateStatus(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorMedsToDateStatus => {
      this.addNewPriorMedsToDateStatus(priorMedsToDateStatus);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: priorMedsToDateStatus,
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
    this.updatePriorMedsToDateStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.priorMedsToDateStatusService.updatePriorMedsToDateStatus(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorMedsToDateStatus => {
      this.updatePriorMedsToDateStatus(priorMedsToDateStatus);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorMedsToDateStatus,
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
    this.deletePriorMedsToDateStatusEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, priorMedsToDateStatus]) => {
      return this.data.userDeletePriorMedsToDateStatus({
        priorMedsToDateStatusId: priorMedsToDateStatus.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.priorMedsToDateStatusService.importPriorMedsToDateStatuses(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addPriorMedsToDateStatuses(created);
      this.updatePriorMedsToDateStatuses(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorMedsToDateStatusId')) {
      var priorMedsToDateStatusId = this.route.snapshot.paramMap.get('priorMedsToDateStatusId');
      this.setFormName('priorMedsToDateStatus_edit');
    } else {
      this.setFormName('priorMedsToDateStatus_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.priorMedsToDateStatusService.validatePriorMedsToDateStatusExcelData(excelData);
    }));
  }
}
WebPriorMedsToDateStatusFeatureStore.ɵfac = function WebPriorMedsToDateStatusFeatureStore_Factory(t) {
  return new (t || WebPriorMedsToDateStatusFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_prior_meds_to_date_status_service__WEBPACK_IMPORTED_MODULE_11__.PriorMedsToDateStatusService));
};
WebPriorMedsToDateStatusFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebPriorMedsToDateStatusFeatureStore,
  factory: WebPriorMedsToDateStatusFeatureStore.ɵfac
});

/***/ }),

/***/ 139847:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/rules/create-prior-meds-to-date-status-input-is-valid.rule.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorMedsToDateStatusInputIsValidRule": () => (/* binding */ CreatePriorMedsToDateStatusInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_meds_to_date_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-meds-to-date-status-name-is-valid.rule */ 873535);


class CreatePriorMedsToDateStatusInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_meds_to_date_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateStatusNameIsValidRule('name', 'The priormedstodatestatus name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 873535:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date-status/shared/rules/prior-meds-to-date-status-name-is-valid.rule.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorMedsToDateStatusNameIsValidRule": () => (/* binding */ PriorMedsToDateStatusNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorMedsToDateStatusNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);