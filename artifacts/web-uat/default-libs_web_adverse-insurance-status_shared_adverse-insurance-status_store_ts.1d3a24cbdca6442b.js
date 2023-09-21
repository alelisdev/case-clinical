"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_adverse-insurance-status_shared_adverse-insurance-status_store_ts"],{

/***/ 790726:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/actions/adverse-insurance-status.business-action-base.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdverseInsuranceStatusBusinessActionBase": () => (/* binding */ AdverseInsuranceStatusBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AdverseInsuranceStatusBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 464333:
/*!****************************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/actions/create-adverse-insurance-status.action.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAdverseInsuranceStatusAction": () => (/* binding */ CreateAdverseInsuranceStatusAction)
/* harmony export */ });
/* harmony import */ var _adverse_insurance_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adverse-insurance-status.business-action-base */ 790726);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_adverse_insurance_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-adverse-insurance-status-input-is-valid.rule */ 958682);




class CreateAdverseInsuranceStatusAction extends _adverse_insurance_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AdverseInsuranceStatusBusinessActionBase {
  constructor(input) {
    super('CreateAdverseInsuranceStatusAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_adverse_insurance_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateAdverseInsuranceStatusInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAdverseInsuranceStatus({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 119167:
/*!******************************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/actions/update-adverse-insurance-statuses.action.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAdverseInsuranceStatusAction": () => (/* binding */ UpdateAdverseInsuranceStatusAction),
/* harmony export */   "UpdateAdverseInsuranceStatusesAction": () => (/* binding */ UpdateAdverseInsuranceStatusesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _adverse_insurance_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adverse-insurance-status.business-action-base */ 790726);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateAdverseInsuranceStatusesAction extends _adverse_insurance_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AdverseInsuranceStatusBusinessActionBase {
  constructor(adverseInsuranceStatuses) {
    super('UpdateAdverseInsuranceStatusesAction');
    this.adverseInsuranceStatuses = adverseInsuranceStatuses;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.adverseInsuranceStatuses, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAdverseInsuranceStatuses({
      input: {
        adverseInsuranceStatuses: this.adverseInsuranceStatuses
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateAdverseInsuranceStatusAction extends _adverse_insurance_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AdverseInsuranceStatusBusinessActionBase {
  constructor(adverseInsuranceStatus, adverseInsuranceStatusId) {
    super('UpdateAdverseInsuranceStatusAction');
    this.adverseInsuranceStatus = adverseInsuranceStatus;
    this.adverseInsuranceStatusId = adverseInsuranceStatusId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.adverseInsuranceStatus, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.adverseInsuranceStatusId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAdverseInsuranceStatus({
      adverseInsuranceStatusId: this.adverseInsuranceStatusId,
      input: this.adverseInsuranceStatus
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 120715:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/actions/validate-adverse-insurance-status-excel-data.action.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateAdverseInsuranceStatusExcelDataAction": () => (/* binding */ ValidateAdverseInsuranceStatusExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _adverse_insurance_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adverse-insurance-status.business-action-base */ 790726);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateAdverseInsuranceStatusExcelDataAction extends _adverse_insurance_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AdverseInsuranceStatusBusinessActionBase {
  constructor(excelData) {
    super('ValidateAdverseInsuranceStatusExcelDataAction');
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

/***/ 753756:
/*!********************************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/adverse-insurance-status.business-provider.service.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdverseInsuranceStatusBusinessProviderService": () => (/* binding */ AdverseInsuranceStatusBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_adverse_insurance_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-adverse-insurance-status-excel-data.action */ 120715);
/* harmony import */ var _actions_create_adverse_insurance_status_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-adverse-insurance-status.action */ 464333);
/* harmony import */ var _actions_update_adverse_insurance_statuses_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-adverse-insurance-statuses.action */ 119167);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class AdverseInsuranceStatusBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AdverseInsuranceStatusBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAdverseInsuranceStatus(input) {
    const action = new _actions_create_adverse_insurance_status_action__WEBPACK_IMPORTED_MODULE_2__.CreateAdverseInsuranceStatusAction(input);
    action.Do(this);
    return action.response;
  }
  updateAdverseInsuranceStatus(input, adverseInsuranceStatusId) {
    const action = new _actions_update_adverse_insurance_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAdverseInsuranceStatusAction(input, adverseInsuranceStatusId);
    action.Do(this);
    return action.response;
  }
  importAdverseInsuranceStatuses(adverseInsuranceStatuses) {
    const updateAdverseInsuranceStatusesAction = new _actions_update_adverse_insurance_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAdverseInsuranceStatusesAction(adverseInsuranceStatuses);
    updateAdverseInsuranceStatusesAction.Do(this);
    return updateAdverseInsuranceStatusesAction.response;
  }
  validateAdverseInsuranceStatusExcelData(excelData) {
    const validateAdverseInsuranceStatusExcelDataAction = new _actions_validate_adverse_insurance_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateAdverseInsuranceStatusExcelDataAction(excelData);
    validateAdverseInsuranceStatusExcelDataAction.Do(this);
    return validateAdverseInsuranceStatusExcelDataAction.response;
  }
}
AdverseInsuranceStatusBusinessProviderService.ɵfac = function AdverseInsuranceStatusBusinessProviderService_Factory(t) {
  return new (t || AdverseInsuranceStatusBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AdverseInsuranceStatusBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: AdverseInsuranceStatusBusinessProviderService,
  factory: AdverseInsuranceStatusBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 716685:
/*!**************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/adverse-insurance-status.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdverseInsuranceStatusService": () => (/* binding */ AdverseInsuranceStatusService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _adverse_insurance_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adverse-insurance-status.business-provider.service */ 753756);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class AdverseInsuranceStatusService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("AdverseInsuranceStatusService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createAdverseInsuranceStatus(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createAdverseInsuranceStatus(filteredObj);
  }
  updateAdverseInsuranceStatus(input, adverseInsuranceStatusId) {
    return this.businessProvider.updateAdverseInsuranceStatus(input, adverseInsuranceStatusId);
  }
  importAdverseInsuranceStatuses(adverseInsuranceStatuses) {
    return this.businessProvider.importAdverseInsuranceStatuses(adverseInsuranceStatuses);
  }
  validateAdverseInsuranceStatusExcelData(excelData) {
    return this.businessProvider.validateAdverseInsuranceStatusExcelData(excelData);
  }
}
AdverseInsuranceStatusService.ɵfac = function AdverseInsuranceStatusService_Factory(t) {
  return new (t || AdverseInsuranceStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_adverse_insurance_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AdverseInsuranceStatusBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_adverse_insurance_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AdverseInsuranceStatusBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
AdverseInsuranceStatusService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AdverseInsuranceStatusService,
  factory: AdverseInsuranceStatusService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 368430:
/*!************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/adverse-insurance-status.store.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAdverseInsuranceStatusFeatureStore": () => (/* binding */ WebAdverseInsuranceStatusFeatureStore)
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
/* harmony import */ var _adverse_insurance_status_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./adverse-insurance-status.service */ 716685);














class WebAdverseInsuranceStatusFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, adverseInsuranceStatusService) {
    super({
      loading: false,
      adverseInsuranceStatuses: [],
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
    this.adverseInsuranceStatusService = adverseInsuranceStatusService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.adverseInsuranceStatuses$ = this.select(s => s.adverseInsuranceStatuses);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.adverseInsuranceStatuses$, (errors, loading, item, formName, adverseInsuranceStatuses) => ({
      errors,
      loading,
      item,
      formName,
      adverseInsuranceStatuses
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
    this.addNewAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus) => Object.assign(Object.assign({}, state), {
      adverseInsuranceStatuses: [...state.adverseInsuranceStatuses, adverseInsuranceStatus]
    }));
    this.updateAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus) => {
      return Object.assign(Object.assign({}, state), {
        adverseInsuranceStatuses: state.adverseInsuranceStatuses.map(el => {
          if (el.id === adverseInsuranceStatus.id) {
            return adverseInsuranceStatus;
          } else {
            return el;
          }
        })
      });
    });
    this.addAdverseInsuranceStatuses = this.updater((state, newAdverseInsuranceStatuses) => Object.assign(Object.assign({}, state), {
      adverseInsuranceStatuses: state.adverseInsuranceStatuses.concat(newAdverseInsuranceStatuses)
    }));
    this.updateAdverseInsuranceStatuses = this.updater((state, updatedAdverseInsuranceStatuses) => {
      return Object.assign(Object.assign({}, state), {
        adverseInsuranceStatuses: state.adverseInsuranceStatuses.map(adverseInsuranceStatus => {
          const updated = updatedAdverseInsuranceStatuses.find(el => el.id === adverseInsuranceStatus.id);
          return updated ? updated : adverseInsuranceStatus;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadAdverseInsuranceStatusEffect = this.effect(adverseInsuranceStatusId$ => adverseInsuranceStatusId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(adverseInsuranceStatusId => this.data.userAdverseInsuranceStatus({
      adverseInsuranceStatusId
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
    this.loadAdverseInsuranceStatusesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userAdverseInsuranceStatuses({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      adverseInsuranceStatuses: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createAdverseInsuranceStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.adverseInsuranceStatusService.createAdverseInsuranceStatus(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(adverseInsuranceStatus => {
      this.addNewAdverseInsuranceStatus(adverseInsuranceStatus);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: adverseInsuranceStatus,
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
    this.updateAdverseInsuranceStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.adverseInsuranceStatusService.updateAdverseInsuranceStatus(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(adverseInsuranceStatus => {
      this.updateAdverseInsuranceStatus(adverseInsuranceStatus);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: adverseInsuranceStatus,
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
    this.deleteAdverseInsuranceStatusEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, adverseInsuranceStatus]) => {
      return this.data.userDeleteAdverseInsuranceStatus({
        adverseInsuranceStatusId: adverseInsuranceStatus.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.adverseInsuranceStatusService.importAdverseInsuranceStatuses(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addAdverseInsuranceStatuses(created);
      this.updateAdverseInsuranceStatuses(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('adverseInsuranceStatusId')) {
      var adverseInsuranceStatusId = this.route.snapshot.paramMap.get('adverseInsuranceStatusId');
      this.setFormName('adverseInsuranceStatus_edit');
    } else {
      this.setFormName('adverseInsuranceStatus_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.adverseInsuranceStatusService.validateAdverseInsuranceStatusExcelData(excelData);
    }));
  }
}
WebAdverseInsuranceStatusFeatureStore.ɵfac = function WebAdverseInsuranceStatusFeatureStore_Factory(t) {
  return new (t || WebAdverseInsuranceStatusFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_adverse_insurance_status_service__WEBPACK_IMPORTED_MODULE_11__.AdverseInsuranceStatusService));
};
WebAdverseInsuranceStatusFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebAdverseInsuranceStatusFeatureStore,
  factory: WebAdverseInsuranceStatusFeatureStore.ɵfac
});

/***/ }),

/***/ 938170:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/rules/adverse-insurance-status-name-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdverseInsuranceStatusNameIsValidRule": () => (/* binding */ AdverseInsuranceStatusNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class AdverseInsuranceStatusNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 958682:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/adverse-insurance-status/shared/rules/create-adverse-insurance-status-input-is-valid.rule.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAdverseInsuranceStatusInputIsValidRule": () => (/* binding */ CreateAdverseInsuranceStatusInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _adverse_insurance_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adverse-insurance-status-name-is-valid.rule */ 938170);


class CreateAdverseInsuranceStatusInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _adverse_insurance_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.AdverseInsuranceStatusNameIsValidRule('name', 'The adverseinsurancestatus name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);