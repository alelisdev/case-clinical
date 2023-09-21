"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_case-progress-status_shared_case-progress-status_store_ts"],{

/***/ 528005:
/*!***************************************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/actions/case-progress-status.business-action-base.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseProgressStatusBusinessActionBase": () => (/* binding */ CaseProgressStatusBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class CaseProgressStatusBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 101854:
/*!********************************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/actions/create-case-progress-status.action.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseProgressStatusAction": () => (/* binding */ CreateCaseProgressStatusAction)
/* harmony export */ });
/* harmony import */ var _case_progress_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-progress-status.business-action-base */ 528005);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_case_progress_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-case-progress-status-input-is-valid.rule */ 795835);




class CreateCaseProgressStatusAction extends _case_progress_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseProgressStatusBusinessActionBase {
  constructor(input) {
    super('CreateCaseProgressStatusAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_case_progress_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateCaseProgressStatusInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateCaseProgressStatus({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 134215:
/*!**********************************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/actions/update-case-progress-statuses.action.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCaseProgressStatusAction": () => (/* binding */ UpdateCaseProgressStatusAction),
/* harmony export */   "UpdateCaseProgressStatusesAction": () => (/* binding */ UpdateCaseProgressStatusesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_progress_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-progress-status.business-action-base */ 528005);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateCaseProgressStatusesAction extends _case_progress_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseProgressStatusBusinessActionBase {
  constructor(caseProgressStatuses) {
    super('UpdateCaseProgressStatusesAction');
    this.caseProgressStatuses = caseProgressStatuses;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseProgressStatuses, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseProgressStatuses({
      input: {
        caseProgressStatuses: this.caseProgressStatuses
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateCaseProgressStatusAction extends _case_progress_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseProgressStatusBusinessActionBase {
  constructor(caseProgressStatus, caseProgressStatusId) {
    super('UpdateCaseProgressStatusAction');
    this.caseProgressStatus = caseProgressStatus;
    this.caseProgressStatusId = caseProgressStatusId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseProgressStatus, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.caseProgressStatusId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseProgressStatus({
      caseProgressStatusId: this.caseProgressStatusId,
      input: this.caseProgressStatus
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 578760:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/actions/validate-case-progress-status-excel-data.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateCaseProgressStatusExcelDataAction": () => (/* binding */ ValidateCaseProgressStatusExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_progress_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-progress-status.business-action-base */ 528005);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateCaseProgressStatusExcelDataAction extends _case_progress_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseProgressStatusBusinessActionBase {
  constructor(excelData) {
    super('ValidateCaseProgressStatusExcelDataAction');
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

/***/ 107238:
/*!************************************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/case-progress-status.business-provider.service.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseProgressStatusBusinessProviderService": () => (/* binding */ CaseProgressStatusBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_case_progress_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-case-progress-status-excel-data.action */ 578760);
/* harmony import */ var _actions_create_case_progress_status_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-case-progress-status.action */ 101854);
/* harmony import */ var _actions_update_case_progress_statuses_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-case-progress-statuses.action */ 134215);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class CaseProgressStatusBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.CaseProgressStatusBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createCaseProgressStatus(input) {
    const action = new _actions_create_case_progress_status_action__WEBPACK_IMPORTED_MODULE_2__.CreateCaseProgressStatusAction(input);
    action.Do(this);
    return action.response;
  }
  updateCaseProgressStatus(input, caseProgressStatusId) {
    const action = new _actions_update_case_progress_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseProgressStatusAction(input, caseProgressStatusId);
    action.Do(this);
    return action.response;
  }
  importCaseProgressStatuses(caseProgressStatuses) {
    const updateCaseProgressStatusesAction = new _actions_update_case_progress_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseProgressStatusesAction(caseProgressStatuses);
    updateCaseProgressStatusesAction.Do(this);
    return updateCaseProgressStatusesAction.response;
  }
  validateCaseProgressStatusExcelData(excelData) {
    const validateCaseProgressStatusExcelDataAction = new _actions_validate_case_progress_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateCaseProgressStatusExcelDataAction(excelData);
    validateCaseProgressStatusExcelDataAction.Do(this);
    return validateCaseProgressStatusExcelDataAction.response;
  }
}
CaseProgressStatusBusinessProviderService.ɵfac = function CaseProgressStatusBusinessProviderService_Factory(t) {
  return new (t || CaseProgressStatusBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
CaseProgressStatusBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: CaseProgressStatusBusinessProviderService,
  factory: CaseProgressStatusBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 244775:
/*!******************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/case-progress-status.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseProgressStatusService": () => (/* binding */ CaseProgressStatusService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _case_progress_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./case-progress-status.business-provider.service */ 107238);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class CaseProgressStatusService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("CaseProgressStatusService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createCaseProgressStatus(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createCaseProgressStatus(filteredObj);
  }
  updateCaseProgressStatus(input, caseProgressStatusId) {
    return this.businessProvider.updateCaseProgressStatus(input, caseProgressStatusId);
  }
  importCaseProgressStatuses(caseProgressStatuses) {
    return this.businessProvider.importCaseProgressStatuses(caseProgressStatuses);
  }
  validateCaseProgressStatusExcelData(excelData) {
    return this.businessProvider.validateCaseProgressStatusExcelData(excelData);
  }
}
CaseProgressStatusService.ɵfac = function CaseProgressStatusService_Factory(t) {
  return new (t || CaseProgressStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_progress_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseProgressStatusBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_progress_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseProgressStatusBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
CaseProgressStatusService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CaseProgressStatusService,
  factory: CaseProgressStatusService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 314772:
/*!****************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/case-progress-status.store.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseProgressStatusFeatureStore": () => (/* binding */ WebCaseProgressStatusFeatureStore)
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
/* harmony import */ var _case_progress_status_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./case-progress-status.service */ 244775);














class WebCaseProgressStatusFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, caseProgressStatusService) {
    super({
      loading: false,
      caseProgressStatuses: [],
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
    this.caseProgressStatusService = caseProgressStatusService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.caseProgressStatuses$ = this.select(s => s.caseProgressStatuses);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseProgressStatuses$, (errors, loading, item, formName, caseProgressStatuses) => ({
      errors,
      loading,
      item,
      formName,
      caseProgressStatuses
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
    this.addNewCaseProgressStatus = this.updater((state, caseProgressStatus) => Object.assign(Object.assign({}, state), {
      caseProgressStatuses: [...state.caseProgressStatuses, caseProgressStatus]
    }));
    this.updateCaseProgressStatus = this.updater((state, caseProgressStatus) => {
      return Object.assign(Object.assign({}, state), {
        caseProgressStatuses: state.caseProgressStatuses.map(el => {
          if (el.id === caseProgressStatus.id) {
            return caseProgressStatus;
          } else {
            return el;
          }
        })
      });
    });
    this.addCaseProgressStatuses = this.updater((state, newCaseProgressStatuses) => Object.assign(Object.assign({}, state), {
      caseProgressStatuses: state.caseProgressStatuses.concat(newCaseProgressStatuses)
    }));
    this.updateCaseProgressStatuses = this.updater((state, updatedCaseProgressStatuses) => {
      return Object.assign(Object.assign({}, state), {
        caseProgressStatuses: state.caseProgressStatuses.map(caseProgressStatus => {
          const updated = updatedCaseProgressStatuses.find(el => el.id === caseProgressStatus.id);
          return updated ? updated : caseProgressStatus;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadCaseProgressStatusEffect = this.effect(caseProgressStatusId$ => caseProgressStatusId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(caseProgressStatusId => this.data.userCaseProgressStatus({
      caseProgressStatusId
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
    this.loadCaseProgressStatusesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userCaseProgressStatuses({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      caseProgressStatuses: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createCaseProgressStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.caseProgressStatusService.createCaseProgressStatus(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseProgressStatus => {
      this.addNewCaseProgressStatus(caseProgressStatus);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: caseProgressStatus,
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
    this.updateCaseProgressStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.caseProgressStatusService.updateCaseProgressStatus(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseProgressStatus => {
      this.updateCaseProgressStatus(caseProgressStatus);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: caseProgressStatus,
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
    this.deleteCaseProgressStatusEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, caseProgressStatus]) => {
      return this.data.userDeleteCaseProgressStatus({
        caseProgressStatusId: caseProgressStatus.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.caseProgressStatusService.importCaseProgressStatuses(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addCaseProgressStatuses(created);
      this.updateCaseProgressStatuses(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('caseProgressStatusId')) {
      var caseProgressStatusId = this.route.snapshot.paramMap.get('caseProgressStatusId');
      this.setFormName('caseProgressStatus_edit');
    } else {
      this.setFormName('caseProgressStatus_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.caseProgressStatusService.validateCaseProgressStatusExcelData(excelData);
    }));
  }
}
WebCaseProgressStatusFeatureStore.ɵfac = function WebCaseProgressStatusFeatureStore_Factory(t) {
  return new (t || WebCaseProgressStatusFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_progress_status_service__WEBPACK_IMPORTED_MODULE_11__.CaseProgressStatusService));
};
WebCaseProgressStatusFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebCaseProgressStatusFeatureStore,
  factory: WebCaseProgressStatusFeatureStore.ɵfac
});

/***/ }),

/***/ 823146:
/*!***********************************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/rules/case-progress-status-name-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseProgressStatusNameIsValidRule": () => (/* binding */ CaseProgressStatusNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CaseProgressStatusNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 795835:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/case-progress-status/shared/rules/create-case-progress-status-input-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseProgressStatusInputIsValidRule": () => (/* binding */ CreateCaseProgressStatusInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _case_progress_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-progress-status-name-is-valid.rule */ 823146);


class CreateCaseProgressStatusInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _case_progress_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.CaseProgressStatusNameIsValidRule('name', 'The caseprogressstatus name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);