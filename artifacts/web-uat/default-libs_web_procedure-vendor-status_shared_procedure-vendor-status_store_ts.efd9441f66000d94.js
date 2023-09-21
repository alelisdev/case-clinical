"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_procedure-vendor-status_shared_procedure-vendor-status_store_ts"],{

/***/ 747091:
/*!**************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/actions/create-procedure-vendor-status.action.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureVendorStatusAction": () => (/* binding */ CreateProcedureVendorStatusAction)
/* harmony export */ });
/* harmony import */ var _procedure_vendor_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-vendor-status.business-action-base */ 409140);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_procedure_vendor_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-procedure-vendor-status-input-is-valid.rule */ 32838);




class CreateProcedureVendorStatusAction extends _procedure_vendor_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorStatusBusinessActionBase {
  constructor(input) {
    super('CreateProcedureVendorStatusAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_procedure_vendor_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureVendorStatusInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureVendorStatus({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 409140:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/actions/procedure-vendor-status.business-action-base.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureVendorStatusBusinessActionBase": () => (/* binding */ ProcedureVendorStatusBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ProcedureVendorStatusBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 436328:
/*!****************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/actions/update-procedure-vendor-statuses.action.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateProcedureVendorStatusAction": () => (/* binding */ UpdateProcedureVendorStatusAction),
/* harmony export */   "UpdateProcedureVendorStatusesAction": () => (/* binding */ UpdateProcedureVendorStatusesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_vendor_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-vendor-status.business-action-base */ 409140);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateProcedureVendorStatusesAction extends _procedure_vendor_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorStatusBusinessActionBase {
  constructor(procedureVendorStatuses) {
    super('UpdateProcedureVendorStatusesAction');
    this.procedureVendorStatuses = procedureVendorStatuses;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureVendorStatuses, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureVendorStatuses({
      input: {
        procedureVendorStatuses: this.procedureVendorStatuses
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateProcedureVendorStatusAction extends _procedure_vendor_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorStatusBusinessActionBase {
  constructor(procedureVendorStatus, procedureVendorStatusId) {
    super('UpdateProcedureVendorStatusAction');
    this.procedureVendorStatus = procedureVendorStatus;
    this.procedureVendorStatusId = procedureVendorStatusId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureVendorStatus, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.procedureVendorStatusId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureVendorStatus({
      procedureVendorStatusId: this.procedureVendorStatusId,
      input: this.procedureVendorStatus
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 832340:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/actions/validate-procedure-vendor-status-excel-data.action.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateProcedureVendorStatusExcelDataAction": () => (/* binding */ ValidateProcedureVendorStatusExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_vendor_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-vendor-status.business-action-base */ 409140);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateProcedureVendorStatusExcelDataAction extends _procedure_vendor_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorStatusBusinessActionBase {
  constructor(excelData) {
    super('ValidateProcedureVendorStatusExcelDataAction');
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

/***/ 470131:
/*!******************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/procedure-vendor-status.business-provider.service.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureVendorStatusBusinessProviderService": () => (/* binding */ ProcedureVendorStatusBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_procedure_vendor_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-procedure-vendor-status-excel-data.action */ 832340);
/* harmony import */ var _actions_create_procedure_vendor_status_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-procedure-vendor-status.action */ 747091);
/* harmony import */ var _actions_update_procedure_vendor_statuses_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-procedure-vendor-statuses.action */ 436328);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ProcedureVendorStatusBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ProcedureVendorStatusBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createProcedureVendorStatus(input) {
    const action = new _actions_create_procedure_vendor_status_action__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureVendorStatusAction(input);
    action.Do(this);
    return action.response;
  }
  updateProcedureVendorStatus(input, procedureVendorStatusId) {
    const action = new _actions_update_procedure_vendor_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureVendorStatusAction(input, procedureVendorStatusId);
    action.Do(this);
    return action.response;
  }
  importProcedureVendorStatuses(procedureVendorStatuses) {
    const updateProcedureVendorStatusesAction = new _actions_update_procedure_vendor_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureVendorStatusesAction(procedureVendorStatuses);
    updateProcedureVendorStatusesAction.Do(this);
    return updateProcedureVendorStatusesAction.response;
  }
  validateProcedureVendorStatusExcelData(excelData) {
    const validateProcedureVendorStatusExcelDataAction = new _actions_validate_procedure_vendor_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateProcedureVendorStatusExcelDataAction(excelData);
    validateProcedureVendorStatusExcelDataAction.Do(this);
    return validateProcedureVendorStatusExcelDataAction.response;
  }
}
ProcedureVendorStatusBusinessProviderService.ɵfac = function ProcedureVendorStatusBusinessProviderService_Factory(t) {
  return new (t || ProcedureVendorStatusBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ProcedureVendorStatusBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ProcedureVendorStatusBusinessProviderService,
  factory: ProcedureVendorStatusBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 534292:
/*!************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/procedure-vendor-status.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureVendorStatusService": () => (/* binding */ ProcedureVendorStatusService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _procedure_vendor_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./procedure-vendor-status.business-provider.service */ 470131);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ProcedureVendorStatusService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ProcedureVendorStatusService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createProcedureVendorStatus(input) {
    return this.businessProvider.createProcedureVendorStatus(input);
  }
  updateProcedureVendorStatus(input, procedureVendorStatusId) {
    return this.businessProvider.updateProcedureVendorStatus(input, procedureVendorStatusId);
  }
  importProcedureVendorStatuses(procedureVendorStatuses) {
    return this.businessProvider.importProcedureVendorStatuses(procedureVendorStatuses);
  }
  validateProcedureVendorStatusExcelData(excelData) {
    return this.businessProvider.validateProcedureVendorStatusExcelData(excelData);
  }
}
ProcedureVendorStatusService.ɵfac = function ProcedureVendorStatusService_Factory(t) {
  return new (t || ProcedureVendorStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_vendor_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureVendorStatusBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_vendor_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureVendorStatusBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ProcedureVendorStatusService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ProcedureVendorStatusService,
  factory: ProcedureVendorStatusService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 331126:
/*!**********************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/procedure-vendor-status.store.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureVendorStatusFeatureStore": () => (/* binding */ WebProcedureVendorStatusFeatureStore)
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
/* harmony import */ var _procedure_vendor_status_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./procedure-vendor-status.service */ 534292);














class WebProcedureVendorStatusFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, procedureVendorStatusService) {
    super({
      loading: false,
      procedureVendorStatuses: [],
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
    this.procedureVendorStatusService = procedureVendorStatusService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.procedureVendorStatuses$ = this.select(s => s.procedureVendorStatuses);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureVendorStatuses$, (errors, loading, item, formName, procedureVendorStatuses) => ({
      errors,
      loading,
      item,
      formName,
      procedureVendorStatuses
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
    this.addNewProcedureVendorStatus = this.updater((state, procedureVendorStatus) => Object.assign(Object.assign({}, state), {
      procedureVendorStatuses: [...state.procedureVendorStatuses, procedureVendorStatus]
    }));
    this.updateProcedureVendorStatus = this.updater((state, procedureVendorStatus) => {
      return Object.assign(Object.assign({}, state), {
        procedureVendorStatuses: state.procedureVendorStatuses.map(el => {
          if (el.id === procedureVendorStatus.id) {
            return procedureVendorStatus;
          } else {
            return el;
          }
        })
      });
    });
    this.addProcedureVendorStatuses = this.updater((state, newProcedureVendorStatuses) => Object.assign(Object.assign({}, state), {
      procedureVendorStatuses: state.procedureVendorStatuses.concat(newProcedureVendorStatuses)
    }));
    this.updateProcedureVendorStatuses = this.updater((state, updatedProcedureVendorStatuses) => {
      return Object.assign(Object.assign({}, state), {
        procedureVendorStatuses: state.procedureVendorStatuses.map(procedureVendorStatus => {
          const updated = updatedProcedureVendorStatuses.find(el => el.id === procedureVendorStatus.id);
          return updated ? updated : procedureVendorStatus;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadProcedureVendorStatusEffect = this.effect(procedureVendorStatusId$ => procedureVendorStatusId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(procedureVendorStatusId => this.data.userProcedureVendorStatus({
      procedureVendorStatusId
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
    this.loadProcedureVendorStatusesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userProcedureVendorStatuses({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      procedureVendorStatuses: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createProcedureVendorStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.procedureVendorStatusService.createProcedureVendorStatus(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureVendorStatus => {
      this.addNewProcedureVendorStatus(procedureVendorStatus);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: procedureVendorStatus,
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
    this.updateProcedureVendorStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.procedureVendorStatusService.updateProcedureVendorStatus(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureVendorStatus => {
      this.updateProcedureVendorStatus(procedureVendorStatus);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: procedureVendorStatus,
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
    this.deleteProcedureVendorStatusEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, procedureVendorStatus]) => {
      return this.data.userDeleteProcedureVendorStatus({
        procedureVendorStatusId: procedureVendorStatus.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.procedureVendorStatusService.importProcedureVendorStatuses(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addProcedureVendorStatuses(created);
      this.updateProcedureVendorStatuses(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('procedureVendorStatusId')) {
      var procedureVendorStatusId = this.route.snapshot.paramMap.get('procedureVendorStatusId');
      this.setFormName('procedureVendorStatus_edit');
    } else {
      this.setFormName('procedureVendorStatus_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.procedureVendorStatusService.validateProcedureVendorStatusExcelData(excelData);
    }));
  }
}
WebProcedureVendorStatusFeatureStore.ɵfac = function WebProcedureVendorStatusFeatureStore_Factory(t) {
  return new (t || WebProcedureVendorStatusFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_procedure_vendor_status_service__WEBPACK_IMPORTED_MODULE_11__.ProcedureVendorStatusService));
};
WebProcedureVendorStatusFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebProcedureVendorStatusFeatureStore,
  factory: WebProcedureVendorStatusFeatureStore.ɵfac
});

/***/ }),

/***/ 32838:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/rules/create-procedure-vendor-status-input-is-valid.rule.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureVendorStatusInputIsValidRule": () => (/* binding */ CreateProcedureVendorStatusInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _procedure_vendor_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-vendor-status-name-is-valid.rule */ 857144);


class CreateProcedureVendorStatusInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _procedure_vendor_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorStatusNameIsValidRule('name', 'The procedurevendorstatus name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 857144:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/shared/rules/procedure-vendor-status-name-is-valid.rule.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureVendorStatusNameIsValidRule": () => (/* binding */ ProcedureVendorStatusNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ProcedureVendorStatusNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);