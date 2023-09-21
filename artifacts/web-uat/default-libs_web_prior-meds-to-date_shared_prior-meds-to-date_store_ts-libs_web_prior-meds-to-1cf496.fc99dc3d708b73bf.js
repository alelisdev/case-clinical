"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-meds-to-date_shared_prior-meds-to-date_store_ts-libs_web_prior-meds-to-1cf496"],{

/***/ 375165:
/*!****************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/actions/create-prior-meds-to-date.action.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorMedsToDateAction": () => (/* binding */ CreatePriorMedsToDateAction)
/* harmony export */ });
/* harmony import */ var _prior_meds_to_date_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-meds-to-date.business-action-base */ 478136);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_meds_to_date_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-meds-to-date-input-is-valid.rule */ 898879);




class CreatePriorMedsToDateAction extends _prior_meds_to_date_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateBusinessActionBase {
  constructor(input) {
    super('CreatePriorMedsToDateAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_meds_to_date_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorMedsToDateInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorMedsToDate({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 478136:
/*!***********************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/actions/prior-meds-to-date.business-action-base.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorMedsToDateBusinessActionBase": () => (/* binding */ PriorMedsToDateBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorMedsToDateBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 793440:
/*!*****************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/actions/update-prior-meds-to-dates.action.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorMedsToDateAction": () => (/* binding */ UpdatePriorMedsToDateAction),
/* harmony export */   "UpdatePriorMedsToDatesAction": () => (/* binding */ UpdatePriorMedsToDatesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_meds_to_date_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-meds-to-date.business-action-base */ 478136);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorMedsToDatesAction extends _prior_meds_to_date_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateBusinessActionBase {
  constructor(priorMedsToDates) {
    super('UpdatePriorMedsToDatesAction');
    this.priorMedsToDates = priorMedsToDates;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorMedsToDates, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorMedsToDates({
      input: {
        priorMedsToDates: this.priorMedsToDates
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorMedsToDateAction extends _prior_meds_to_date_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateBusinessActionBase {
  constructor(priorMedsToDate, priorMedsToDateId) {
    super('UpdatePriorMedsToDateAction');
    this.priorMedsToDate = priorMedsToDate;
    this.priorMedsToDateId = priorMedsToDateId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorMedsToDate, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorMedsToDateId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorMedsToDate({
      priorMedsToDateId: this.priorMedsToDateId,
      input: this.priorMedsToDate
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 631032:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/actions/validate-prior-meds-to-date-excel-data.action.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorMedsToDateExcelDataAction": () => (/* binding */ ValidatePriorMedsToDateExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_meds_to_date_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-meds-to-date.business-action-base */ 478136);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorMedsToDateExcelDataAction extends _prior_meds_to_date_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateBusinessActionBase {
  constructor(excelData, legalCases, priorMedsToDateStatuses) {
    super('ValidatePriorMedsToDateExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.legalCases = legalCases;
    this.priorMedsToDateStatuses = priorMedsToDateStatuses;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`priorMedsToDateStatusName_${index}_is_valid}`, "Prior Meds to Date Status Is Not Valid", 'priorMedsToDateStatus.name', datum['priorMedsToDateStatus'], this.priorMedsToDateStatuses, true));
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

/***/ 247557:
/*!********************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/prior-meds-to-date.business-provider.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorMedsToDateBusinessProviderService": () => (/* binding */ PriorMedsToDateBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_meds_to_date_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-meds-to-date-excel-data.action */ 631032);
/* harmony import */ var _actions_create_prior_meds_to_date_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-meds-to-date.action */ 375165);
/* harmony import */ var _actions_update_prior_meds_to_dates_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-meds-to-dates.action */ 793440);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorMedsToDateBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorMedsToDateBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorMedsToDate(input) {
    const action = new _actions_create_prior_meds_to_date_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorMedsToDateAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorMedsToDate(input, priorMedsToDateId) {
    const action = new _actions_update_prior_meds_to_dates_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorMedsToDateAction(input, priorMedsToDateId);
    action.Do(this);
    return action.response;
  }
  importPriorMedsToDates(priorMedsToDates) {
    const updatePriorMedsToDatesAction = new _actions_update_prior_meds_to_dates_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorMedsToDatesAction(priorMedsToDates);
    updatePriorMedsToDatesAction.Do(this);
    return updatePriorMedsToDatesAction.response;
  }
  validatePriorMedsToDateExcelData(excelData, legalCases, priorMedsToDateStatuses) {
    const validatePriorMedsToDateExcelDataAction = new _actions_validate_prior_meds_to_date_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorMedsToDateExcelDataAction(excelData, legalCases, priorMedsToDateStatuses);
    validatePriorMedsToDateExcelDataAction.Do(this);
    return validatePriorMedsToDateExcelDataAction.response;
  }
}
PriorMedsToDateBusinessProviderService.ɵfac = function PriorMedsToDateBusinessProviderService_Factory(t) {
  return new (t || PriorMedsToDateBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorMedsToDateBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorMedsToDateBusinessProviderService,
  factory: PriorMedsToDateBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 469482:
/*!**************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/prior-meds-to-date.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorMedsToDateService": () => (/* binding */ PriorMedsToDateService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_meds_to_date_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-meds-to-date.business-provider.service */ 247557);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorMedsToDateService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorMedsToDateService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorMedsToDate(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorMedsToDate(filteredObj);
  }
  updatePriorMedsToDate(input, priorMedsToDateId) {
    return this.businessProvider.updatePriorMedsToDate(input, priorMedsToDateId);
  }
  importPriorMedsToDates(priorMedsToDates) {
    return this.businessProvider.importPriorMedsToDates(priorMedsToDates);
  }
  validatePriorMedsToDateExcelData(excelData, legalCases, priorMedsToDateStatuses) {
    return this.businessProvider.validatePriorMedsToDateExcelData(excelData, legalCases, priorMedsToDateStatuses);
  }
}
PriorMedsToDateService.ɵfac = function PriorMedsToDateService_Factory(t) {
  return new (t || PriorMedsToDateService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_meds_to_date_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorMedsToDateBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_meds_to_date_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorMedsToDateBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorMedsToDateService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorMedsToDateService,
  factory: PriorMedsToDateService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 430070:
/*!************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/prior-meds-to-date.store.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorMedsToDateFeatureStore": () => (/* binding */ WebPriorMedsToDateFeatureStore)
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
/* harmony import */ var _prior_meds_to_date_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prior-meds-to-date.service */ 469482);














class WebPriorMedsToDateFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorMedsToDateService) {
    super({
      loading: false,
      priorMedsToDates: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      legalCaseId: undefined,
      priorMedsToDateStatusId: undefined,
      specialtyId: undefined,
      visitKindId: undefined,
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
    this.priorMedsToDateService = priorMedsToDateService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorMedsToDates$ = this.select(s => s.priorMedsToDates);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.priorMedsToDateStatuses$ = this.select(s => s.priorMedsToDateStatuses || []);
    this.specialties$ = this.select(s => s.specialties || []);
    this.visitKinds$ = this.select(s => s.visitKinds || []);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.priorMedsToDateStatusId$ = this.select(s => s.priorMedsToDateStatusId);
    this.specialtyId$ = this.select(s => s.specialtyId);
    this.visitKindId$ = this.select(s => s.visitKindId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorMedsToDates$, this.legalCases$, this.priorMedsToDateStatuses$, this.specialties$, this.visitKinds$, (errors, loading, item, formName, priorMedsToDates, legalCases, priorMedsToDateStatuses, specialties, visitKinds) => ({
      errors,
      loading,
      item,
      formName,
      priorMedsToDates,
      legalCases,
      priorMedsToDateStatuses,
      specialties,
      visitKinds
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.legalCaseId$, this.priorMedsToDateStatusId$, this.specialtyId$, this.visitKindId$, this.searchQuery$, (paging, legalCaseId, priorMedsToDateStatusId, specialtyId, visitKindId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      legalCaseId: legalCaseId,
      priorMedsToDateStatusId: priorMedsToDateStatusId,
      specialtyId: specialtyId,
      visitKindId: visitKindId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
    }));
    this.setPriorMedsToDateStatusId = this.updater((state, priorMedsToDateStatusId) => Object.assign(Object.assign({}, state), {
      priorMedsToDateStatusId
    }));
    this.setSpecialtyId = this.updater((state, specialtyId) => Object.assign(Object.assign({}, state), {
      specialtyId
    }));
    this.setVisitKindId = this.updater((state, visitKindId) => Object.assign(Object.assign({}, state), {
      visitKindId
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
    this.filterPriorMedsToDateStatuses = term => this.data.userSelectPriorMedsToDateStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let priorMedsToDateStatuses = res.data.items;
      this.patchState({
        priorMedsToDateStatuses
      });
      return priorMedsToDateStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterSpecialties = term => this.data.userSelectSpecialties({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let specialties = res.data.items;
      this.patchState({
        specialties
      });
      return specialties;
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
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.addPriorMedsToDateStatus = this.updater((state, priorMedsToDateStatus) => Object.assign(Object.assign({}, state), {
      priorMedsToDateStatuses: state.priorMedsToDateStatuses.concat(priorMedsToDateStatus)
    }));
    this.addSpecialty = this.updater((state, specialty) => Object.assign(Object.assign({}, state), {
      specialties: state.specialties.concat(specialty)
    }));
    this.addVisitKind = this.updater((state, visitKind) => Object.assign(Object.assign({}, state), {
      visitKinds: state.visitKinds.concat(visitKind)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPriorMedsToDate = this.updater((state, priorMedsToDate) => Object.assign(Object.assign({}, state), {
      priorMedsToDates: [...state.priorMedsToDates, priorMedsToDate]
    }));
    this.updatePriorMedsToDate = this.updater((state, priorMedsToDate) => {
      return Object.assign(Object.assign({}, state), {
        priorMedsToDates: state.priorMedsToDates.map(el => {
          if (el.id === priorMedsToDate.id) {
            return priorMedsToDate;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorMedsToDates = this.updater((state, newPriorMedsToDates) => Object.assign(Object.assign({}, state), {
      priorMedsToDates: state.priorMedsToDates.concat(newPriorMedsToDates)
    }));
    this.updatePriorMedsToDates = this.updater((state, updatedPriorMedsToDates) => {
      return Object.assign(Object.assign({}, state), {
        priorMedsToDates: state.priorMedsToDates.map(priorMedsToDate => {
          const updated = updatedPriorMedsToDates.find(el => el.id === priorMedsToDate.id);
          return updated ? updated : priorMedsToDate;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorMedsToDateEffect = this.effect(priorMedsToDateId$ => priorMedsToDateId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(priorMedsToDateId => this.data.userPriorMedsToDate({
      priorMedsToDateId
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
    this.loadPriorMedsToDatesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPriorMedsToDates({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      console.log('userPriorMedsToDates', res.data.items);
      return this.patchState({
        paging: {
          limit: input.limit,
          skip: input.skip,
          total: res.data.count.total
        },
        priorMedsToDates: res.data.items,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorMedsToDateEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.priorMedsToDateService.createPriorMedsToDate(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorMedsToDate => {
      this.addNewPriorMedsToDate(priorMedsToDate);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: priorMedsToDate,
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
    this.updatePriorMedsToDateEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.priorMedsToDateService.updatePriorMedsToDate(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorMedsToDate => {
      this.updatePriorMedsToDate(priorMedsToDate);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorMedsToDate,
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
    this.deletePriorMedsToDateEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, priorMedsToDate]) => {
      return this.data.userDeletePriorMedsToDate({
        priorMedsToDateId: priorMedsToDate.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.priorMedsToDateService.importPriorMedsToDates(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPriorMedsToDates(created);
      this.updatePriorMedsToDates(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorMedsToDateId')) {
      var priorMedsToDateId = this.route.snapshot.paramMap.get('priorMedsToDateId');
      this.setFormName('priorMedsToDate_edit');
    } else {
      this.setFormName('priorMedsToDate_create');
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
    if (this.route.snapshot.paramMap.has("priorMedsToDateStatusId")) {
      var priorMedsToDateStatusId = this.route.snapshot.paramMap.get("priorMedsToDateStatusId");
      this.setPriorMedsToDateStatusId(priorMedsToDateStatusId);
    }
    if (this.route.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.route.snapshot.paramMap.get("specialtyId");
      this.setSpecialtyId(specialtyId);
    }
    if (this.route.snapshot.paramMap.has("visitKindId")) {
      var visitKindId = this.route.snapshot.paramMap.get("visitKindId");
      this.setVisitKindId(visitKindId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.priorMedsToDateService.validatePriorMedsToDateExcelData(excelData, vm.legalCases, vm.priorMedsToDateStatuses);
    }));
  }
}
WebPriorMedsToDateFeatureStore.ɵfac = function WebPriorMedsToDateFeatureStore_Factory(t) {
  return new (t || WebPriorMedsToDateFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_prior_meds_to_date_service__WEBPACK_IMPORTED_MODULE_12__.PriorMedsToDateService));
};
WebPriorMedsToDateFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPriorMedsToDateFeatureStore,
  factory: WebPriorMedsToDateFeatureStore.ɵfac
});

/***/ }),

/***/ 898879:
/*!***************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/rules/create-prior-meds-to-date-input-is-valid.rule.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorMedsToDateInputIsValidRule": () => (/* binding */ CreatePriorMedsToDateInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_meds_to_date_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-meds-to-date-name-is-valid.rule */ 574581);


class CreatePriorMedsToDateInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_meds_to_date_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorMedsToDateNameIsValidRule('name', 'The priormedstodate name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 574581:
/*!*******************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/shared/rules/prior-meds-to-date-name-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorMedsToDateNameIsValidRule": () => (/* binding */ PriorMedsToDateNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorMedsToDateNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 940941:
/*!*********************************************************************************************************************************!*\
  !*** ./libs/web/prior-meds-to-date/ui/web-prior-meds-to-date-select-form/web-prior-meds-to-date-select-table-view.component.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorMedsToDateSelectTableViewComponent": () => (/* binding */ WebPriorMedsToDateSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPriorMedsToDateSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.priorMedsToDates = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorMedsToDateStatus.name',
      headerName: 'Prior Meds to Date Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'specialty.name',
      headerName: 'Specialty',
      filter: 'agTextColumnFilter'
    }, {
      field: 'visitKind.name',
      headerName: 'Visit Kind',
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
      field: 'priorMedsToDateStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'specialtyId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'visitKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.quantity, '', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.amount, '$', 2);
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
WebPriorMedsToDateSelectTableViewComponent.ɵfac = function WebPriorMedsToDateSelectTableViewComponent_Factory(t) {
  return new (t || WebPriorMedsToDateSelectTableViewComponent)();
};
WebPriorMedsToDateSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorMedsToDateSelectTableViewComponent,
  selectors: [["ui-prior-meds-to-date-select-table-view"]],
  viewQuery: function WebPriorMedsToDateSelectTableViewComponent_Query(rf, ctx) {
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
    priorMedsToDates: "priorMedsToDates"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPriorMedsToDateSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPriorMedsToDateSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPriorMedsToDateSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.priorMedsToDates)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);