"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_case-status_shared_case-status_store_ts"],{

/***/ 661495:
/*!*********************************************************************************!*\
  !*** ./libs/web/case-status/shared/actions/case-status.business-action-base.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseStatusBusinessActionBase": () => (/* binding */ CaseStatusBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class CaseStatusBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 843186:
/*!**************************************************************************!*\
  !*** ./libs/web/case-status/shared/actions/create-case-status.action.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseStatusAction": () => (/* binding */ CreateCaseStatusAction)
/* harmony export */ });
/* harmony import */ var _case_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-status.business-action-base */ 661495);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_case_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-case-status-input-is-valid.rule */ 455832);




class CreateCaseStatusAction extends _case_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseStatusBusinessActionBase {
  constructor(input) {
    super('CreateCaseStatusAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_case_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateCaseStatusInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateCaseStatus({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 883160:
/*!****************************************************************************!*\
  !*** ./libs/web/case-status/shared/actions/update-case-statuses.action.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCaseStatusAction": () => (/* binding */ UpdateCaseStatusAction),
/* harmony export */   "UpdateCaseStatusesAction": () => (/* binding */ UpdateCaseStatusesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-status.business-action-base */ 661495);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateCaseStatusesAction extends _case_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseStatusBusinessActionBase {
  constructor(caseStatuses) {
    super('UpdateCaseStatusesAction');
    this.caseStatuses = caseStatuses;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseStatuses, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseStatuses({
      input: {
        caseStatuses: this.caseStatuses
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateCaseStatusAction extends _case_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseStatusBusinessActionBase {
  constructor(caseStatus, caseStatusId) {
    super('UpdateCaseStatusAction');
    this.caseStatus = caseStatus;
    this.caseStatusId = caseStatusId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseStatus, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.caseStatusId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseStatus({
      caseStatusId: this.caseStatusId,
      input: this.caseStatus
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 588158:
/*!***************************************************************************************!*\
  !*** ./libs/web/case-status/shared/actions/validate-case-status-excel-data.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateCaseStatusExcelDataAction": () => (/* binding */ ValidateCaseStatusExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-status.business-action-base */ 661495);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateCaseStatusExcelDataAction extends _case_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseStatusBusinessActionBase {
  constructor(excelData) {
    super('ValidateCaseStatusExcelDataAction');
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

/***/ 85525:
/*!******************************************************************************!*\
  !*** ./libs/web/case-status/shared/case-status.business-provider.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseStatusBusinessProviderService": () => (/* binding */ CaseStatusBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_case_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-case-status-excel-data.action */ 588158);
/* harmony import */ var _actions_create_case_status_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-case-status.action */ 843186);
/* harmony import */ var _actions_update_case_statuses_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-case-statuses.action */ 883160);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class CaseStatusBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.CaseStatusBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createCaseStatus(input) {
    const action = new _actions_create_case_status_action__WEBPACK_IMPORTED_MODULE_2__.CreateCaseStatusAction(input);
    action.Do(this);
    return action.response;
  }
  updateCaseStatus(input, caseStatusId) {
    const action = new _actions_update_case_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseStatusAction(input, caseStatusId);
    action.Do(this);
    return action.response;
  }
  importCaseStatuses(caseStatuses) {
    const updateCaseStatusesAction = new _actions_update_case_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseStatusesAction(caseStatuses);
    updateCaseStatusesAction.Do(this);
    return updateCaseStatusesAction.response;
  }
  validateCaseStatusExcelData(excelData) {
    const validateCaseStatusExcelDataAction = new _actions_validate_case_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateCaseStatusExcelDataAction(excelData);
    validateCaseStatusExcelDataAction.Do(this);
    return validateCaseStatusExcelDataAction.response;
  }
}
CaseStatusBusinessProviderService.ɵfac = function CaseStatusBusinessProviderService_Factory(t) {
  return new (t || CaseStatusBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
CaseStatusBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: CaseStatusBusinessProviderService,
  factory: CaseStatusBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 468971:
/*!************************************************************!*\
  !*** ./libs/web/case-status/shared/case-status.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseStatusService": () => (/* binding */ CaseStatusService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _case_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./case-status.business-provider.service */ 85525);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class CaseStatusService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("CaseStatusService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createCaseStatus(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createCaseStatus(filteredObj);
  }
  updateCaseStatus(input, caseStatusId) {
    return this.businessProvider.updateCaseStatus(input, caseStatusId);
  }
  importCaseStatuses(caseStatuses) {
    return this.businessProvider.importCaseStatuses(caseStatuses);
  }
  validateCaseStatusExcelData(excelData) {
    return this.businessProvider.validateCaseStatusExcelData(excelData);
  }
}
CaseStatusService.ɵfac = function CaseStatusService_Factory(t) {
  return new (t || CaseStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseStatusBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseStatusBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
CaseStatusService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CaseStatusService,
  factory: CaseStatusService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 188497:
/*!**********************************************************!*\
  !*** ./libs/web/case-status/shared/case-status.store.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseStatusFeatureStore": () => (/* binding */ WebCaseStatusFeatureStore)
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
/* harmony import */ var _case_status_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./case-status.service */ 468971);














class WebCaseStatusFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, caseStatusService) {
    super({
      loading: false,
      caseStatuses: [],
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
    this.caseStatusService = caseStatusService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.caseStatuses$ = this.select(s => s.caseStatuses);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseStatuses$, (errors, loading, item, formName, caseStatuses) => ({
      errors,
      loading,
      item,
      formName,
      caseStatuses
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
    this.addNewCaseStatus = this.updater((state, caseStatus) => Object.assign(Object.assign({}, state), {
      caseStatuses: [...state.caseStatuses, caseStatus]
    }));
    this.updateCaseStatus = this.updater((state, caseStatus) => {
      return Object.assign(Object.assign({}, state), {
        caseStatuses: state.caseStatuses.map(el => {
          if (el.id === caseStatus.id) {
            return caseStatus;
          } else {
            return el;
          }
        })
      });
    });
    this.addCaseStatuses = this.updater((state, newCaseStatuses) => Object.assign(Object.assign({}, state), {
      caseStatuses: state.caseStatuses.concat(newCaseStatuses)
    }));
    this.updateCaseStatuses = this.updater((state, updatedCaseStatuses) => {
      return Object.assign(Object.assign({}, state), {
        caseStatuses: state.caseStatuses.map(caseStatus => {
          const updated = updatedCaseStatuses.find(el => el.id === caseStatus.id);
          return updated ? updated : caseStatus;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadCaseStatusEffect = this.effect(caseStatusId$ => caseStatusId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(caseStatusId => this.data.userCaseStatus({
      caseStatusId
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
    this.loadCaseStatusesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userCaseStatuses({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      caseStatuses: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createCaseStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.caseStatusService.createCaseStatus(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseStatus => {
      this.addNewCaseStatus(caseStatus);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: caseStatus,
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
    this.updateCaseStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.caseStatusService.updateCaseStatus(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseStatus => {
      this.updateCaseStatus(caseStatus);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: caseStatus,
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
    this.deleteCaseStatusEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, caseStatus]) => {
      return this.data.userDeleteCaseStatus({
        caseStatusId: caseStatus.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.caseStatusService.importCaseStatuses(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addCaseStatuses(created);
      this.updateCaseStatuses(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('caseStatusId')) {
      var caseStatusId = this.route.snapshot.paramMap.get('caseStatusId');
      this.setFormName('caseStatus_edit');
    } else {
      this.setFormName('caseStatus_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.caseStatusService.validateCaseStatusExcelData(excelData);
    }));
  }
}
WebCaseStatusFeatureStore.ɵfac = function WebCaseStatusFeatureStore_Factory(t) {
  return new (t || WebCaseStatusFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_status_service__WEBPACK_IMPORTED_MODULE_11__.CaseStatusService));
};
WebCaseStatusFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebCaseStatusFeatureStore,
  factory: WebCaseStatusFeatureStore.ɵfac
});

/***/ }),

/***/ 32077:
/*!*****************************************************************************!*\
  !*** ./libs/web/case-status/shared/rules/case-status-name-is-valid.rule.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseStatusNameIsValidRule": () => (/* binding */ CaseStatusNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CaseStatusNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 455832:
/*!*************************************************************************************!*\
  !*** ./libs/web/case-status/shared/rules/create-case-status-input-is-valid.rule.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseStatusInputIsValidRule": () => (/* binding */ CreateCaseStatusInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _case_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-status-name-is-valid.rule */ 32077);


class CreateCaseStatusInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _case_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.CaseStatusNameIsValidRule('name', 'The casestatus name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);