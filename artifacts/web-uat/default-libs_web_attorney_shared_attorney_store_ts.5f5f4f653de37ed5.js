"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_attorney_shared_attorney_store_ts"],{

/***/ 555569:
/*!***************************************************************************!*\
  !*** ./libs/web/attorney/shared/actions/attorney.business-action-base.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttorneyBusinessActionBase": () => (/* binding */ AttorneyBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AttorneyBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 29227:
/*!********************************************************************!*\
  !*** ./libs/web/attorney/shared/actions/create-attorney.action.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAttorneyAction": () => (/* binding */ CreateAttorneyAction)
/* harmony export */ });
/* harmony import */ var _attorney_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attorney.business-action-base */ 555569);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_attorney_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-attorney-input-is-valid.rule */ 761181);




class CreateAttorneyAction extends _attorney_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AttorneyBusinessActionBase {
  constructor(input) {
    super('CreateAttorneyAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_attorney_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateAttorneyInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAttorney({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 452513:
/*!*********************************************************************!*\
  !*** ./libs/web/attorney/shared/actions/update-attorneys.action.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAttorneyAction": () => (/* binding */ UpdateAttorneyAction),
/* harmony export */   "UpdateAttorneysAction": () => (/* binding */ UpdateAttorneysAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _attorney_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attorney.business-action-base */ 555569);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateAttorneysAction extends _attorney_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AttorneyBusinessActionBase {
  constructor(attorneys) {
    super('UpdateAttorneysAction');
    this.attorneys = attorneys;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.attorneys, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAttorneys({
      input: {
        attorneys: this.attorneys
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateAttorneyAction extends _attorney_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AttorneyBusinessActionBase {
  constructor(attorney, attorneyId) {
    super('UpdateAttorneyAction');
    this.attorney = attorney;
    this.attorneyId = attorneyId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.attorney, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.attorneyId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAttorney({
      attorneyId: this.attorneyId,
      input: this.attorney
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 958716:
/*!*********************************************************************************!*\
  !*** ./libs/web/attorney/shared/actions/validate-attorney-excel-data.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateAttorneyExcelDataAction": () => (/* binding */ ValidateAttorneyExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _attorney_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attorney.business-action-base */ 555569);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateAttorneyExcelDataAction extends _attorney_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AttorneyBusinessActionBase {
  constructor(excelData, firms, attorneyStatuses, attorneyTypes) {
    super('ValidateAttorneyExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.firms = firms;
    this.attorneyStatuses = attorneyStatuses;
    this.attorneyTypes = attorneyTypes;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`firmName_${index}_is_valid}`, "Firm Is Not Valid", 'firm.name', datum['firm'], this.firms, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`attorneyStatusName_${index}_is_valid}`, "Attorney Status Is Not Valid", 'attorneyStatus.name', datum['attorneyStatus'], this.attorneyStatuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`attorneyTypeName_${index}_is_valid}`, "Attorney Type Is Not Valid", 'attorneyType.name', datum['attorneyType'], this.attorneyTypes, true));
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

/***/ 148875:
/*!************************************************************************!*\
  !*** ./libs/web/attorney/shared/attorney.business-provider.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttorneyBusinessProviderService": () => (/* binding */ AttorneyBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_attorney_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-attorney-excel-data.action */ 958716);
/* harmony import */ var _actions_create_attorney_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-attorney.action */ 29227);
/* harmony import */ var _actions_update_attorneys_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-attorneys.action */ 452513);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class AttorneyBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AttorneyBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAttorney(input) {
    const action = new _actions_create_attorney_action__WEBPACK_IMPORTED_MODULE_2__.CreateAttorneyAction(input);
    action.Do(this);
    return action.response;
  }
  updateAttorney(input, attorneyId) {
    const action = new _actions_update_attorneys_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAttorneyAction(input, attorneyId);
    action.Do(this);
    return action.response;
  }
  importAttorneys(attorneys) {
    const updateAttorneysAction = new _actions_update_attorneys_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAttorneysAction(attorneys);
    updateAttorneysAction.Do(this);
    return updateAttorneysAction.response;
  }
  validateAttorneyExcelData(excelData, firms, attorneyStatuses, attorneyTypes) {
    const validateAttorneyExcelDataAction = new _actions_validate_attorney_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateAttorneyExcelDataAction(excelData, firms, attorneyStatuses, attorneyTypes);
    validateAttorneyExcelDataAction.Do(this);
    return validateAttorneyExcelDataAction.response;
  }
}
AttorneyBusinessProviderService.ɵfac = function AttorneyBusinessProviderService_Factory(t) {
  return new (t || AttorneyBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AttorneyBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: AttorneyBusinessProviderService,
  factory: AttorneyBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 619594:
/*!******************************************************!*\
  !*** ./libs/web/attorney/shared/attorney.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttorneyService": () => (/* binding */ AttorneyService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _attorney_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attorney.business-provider.service */ 148875);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class AttorneyService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("AttorneyService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createAttorney(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createAttorney(filteredObj);
  }
  updateAttorney(input, attorneyId) {
    return this.businessProvider.updateAttorney(input, attorneyId);
  }
  importAttorneys(attorneys) {
    return this.businessProvider.importAttorneys(attorneys);
  }
  validateAttorneyExcelData(excelData, firms, attorneyStatuses, attorneyTypes) {
    return this.businessProvider.validateAttorneyExcelData(excelData, firms, attorneyStatuses, attorneyTypes);
  }
}
AttorneyService.ɵfac = function AttorneyService_Factory(t) {
  return new (t || AttorneyService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_attorney_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AttorneyBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_attorney_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AttorneyBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
AttorneyService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AttorneyService,
  factory: AttorneyService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 645161:
/*!****************************************************!*\
  !*** ./libs/web/attorney/shared/attorney.store.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAttorneyFeatureStore": () => (/* binding */ WebAttorneyFeatureStore)
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
/* harmony import */ var _attorney_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./attorney.service */ 619594);














class WebAttorneyFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, attorneyService) {
    super({
      loading: false,
      attorneys: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      firmId: undefined,
      attorneyStatusId: undefined,
      attorneyTypeId: undefined,
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
    this.attorneyService = attorneyService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.attorneys$ = this.select(s => s.attorneys);
    this.firms$ = this.select(s => s.firms || []);
    this.attorneyStatuses$ = this.select(s => s.attorneyStatuses || []);
    this.attorneyTypes$ = this.select(s => s.attorneyTypes || []);
    this.firmId$ = this.select(s => s.firmId);
    this.attorneyStatusId$ = this.select(s => s.attorneyStatusId);
    this.attorneyTypeId$ = this.select(s => s.attorneyTypeId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.attorneys$, this.firms$, this.attorneyStatuses$, this.attorneyTypes$, (errors, loading, item, formName, attorneys, firms, attorneyStatuses, attorneyTypes) => ({
      errors,
      loading,
      item,
      formName,
      attorneys,
      firms,
      attorneyStatuses,
      attorneyTypes
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.firmId$, this.attorneyStatusId$, this.attorneyTypeId$, this.searchQuery$, (paging, firmId, attorneyStatusId, attorneyTypeId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      firmId: firmId,
      attorneyStatusId: attorneyStatusId,
      attorneyTypeId: attorneyTypeId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setFirmId = this.updater((state, firmId) => Object.assign(Object.assign({}, state), {
      firmId
    }));
    this.setAttorneyStatusId = this.updater((state, attorneyStatusId) => Object.assign(Object.assign({}, state), {
      attorneyStatusId
    }));
    this.setAttorneyTypeId = this.updater((state, attorneyTypeId) => Object.assign(Object.assign({}, state), {
      attorneyTypeId
    }));
    this.filterFirms = term => this.data.userSelectFirms({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let firms = res.data.items;
      this.patchState({
        firms
      });
      return firms;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAttorneyStatuses = term => this.data.userSelectAttorneyStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let attorneyStatuses = res.data.items;
      this.patchState({
        attorneyStatuses
      });
      return attorneyStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAttorneyTypes = term => this.data.userSelectAttorneyTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let attorneyTypes = res.data.items;
      this.patchState({
        attorneyTypes
      });
      return attorneyTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addFirm = this.updater((state, firm) => Object.assign(Object.assign({}, state), {
      firms: state.firms.concat(firm)
    }));
    this.addAttorneyStatus = this.updater((state, attorneyStatus) => Object.assign(Object.assign({}, state), {
      attorneyStatuses: state.attorneyStatuses.concat(attorneyStatus)
    }));
    this.addAttorneyType = this.updater((state, attorneyType) => Object.assign(Object.assign({}, state), {
      attorneyTypes: state.attorneyTypes.concat(attorneyType)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewAttorney = this.updater((state, attorney) => Object.assign(Object.assign({}, state), {
      attorneys: [...state.attorneys, attorney]
    }));
    this.updateAttorney = this.updater((state, attorney) => {
      return Object.assign(Object.assign({}, state), {
        attorneys: state.attorneys.map(el => {
          if (el.id === attorney.id) {
            return attorney;
          } else {
            return el;
          }
        })
      });
    });
    this.addAttorneys = this.updater((state, newAttorneys) => Object.assign(Object.assign({}, state), {
      attorneys: state.attorneys.concat(newAttorneys)
    }));
    this.updateAttorneys = this.updater((state, updatedAttorneys) => {
      return Object.assign(Object.assign({}, state), {
        attorneys: state.attorneys.map(attorney => {
          const updated = updatedAttorneys.find(el => el.id === attorney.id);
          return updated ? updated : attorney;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadAttorneyEffect = this.effect(attorneyId$ => attorneyId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(attorneyId => this.data.userAttorney({
      attorneyId
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
    this.loadAttorneysEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userAttorneys({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      attorneys: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createAttorneyEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.attorneyService.createAttorney(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(attorney => {
      this.addNewAttorney(attorney);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: attorney,
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
    this.updateAttorneyEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.attorneyService.updateAttorney(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(attorney => {
      this.updateAttorney(attorney);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: attorney,
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
    this.deleteAttorneyEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, attorney]) => {
      return this.data.userDeleteAttorney({
        attorneyId: attorney.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.attorneyService.importAttorneys(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addAttorneys(created);
      this.updateAttorneys(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('attorneyId')) {
      var attorneyId = this.route.snapshot.paramMap.get('attorneyId');
      this.setFormName('attorney_edit');
    } else {
      this.setFormName('attorney_create');
    }
    if (this.route.snapshot.paramMap.has("firmId")) {
      var firmId = this.route.snapshot.paramMap.get("firmId");
      this.setFirmId(firmId);
    }
    if (this.route.snapshot.paramMap.has("attorneyStatusId")) {
      var attorneyStatusId = this.route.snapshot.paramMap.get("attorneyStatusId");
      this.setAttorneyStatusId(attorneyStatusId);
    }
    if (this.route.snapshot.paramMap.has("attorneyTypeId")) {
      var attorneyTypeId = this.route.snapshot.paramMap.get("attorneyTypeId");
      this.setAttorneyTypeId(attorneyTypeId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.attorneyService.validateAttorneyExcelData(excelData, vm.firms, vm.attorneyStatuses, vm.attorneyTypes);
    }));
  }
}
WebAttorneyFeatureStore.ɵfac = function WebAttorneyFeatureStore_Factory(t) {
  return new (t || WebAttorneyFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_attorney_service__WEBPACK_IMPORTED_MODULE_12__.AttorneyService));
};
WebAttorneyFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebAttorneyFeatureStore,
  factory: WebAttorneyFeatureStore.ɵfac
});

/***/ }),

/***/ 153709:
/*!***********************************************************************!*\
  !*** ./libs/web/attorney/shared/rules/attorney-name-is-valid.rule.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttorneyNameIsValidRule": () => (/* binding */ AttorneyNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class AttorneyNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 761181:
/*!*******************************************************************************!*\
  !*** ./libs/web/attorney/shared/rules/create-attorney-input-is-valid.rule.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAttorneyInputIsValidRule": () => (/* binding */ CreateAttorneyInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _attorney_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attorney-name-is-valid.rule */ 153709);


class CreateAttorneyInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _attorney_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.AttorneyNameIsValidRule('name', 'The attorney name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);