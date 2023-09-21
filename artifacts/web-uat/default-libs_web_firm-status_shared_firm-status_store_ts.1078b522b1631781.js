"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_firm-status_shared_firm-status_store_ts"],{

/***/ 363597:
/*!**************************************************************************!*\
  !*** ./libs/web/firm-status/shared/actions/create-firm-status.action.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateFirmStatusAction": () => (/* binding */ CreateFirmStatusAction)
/* harmony export */ });
/* harmony import */ var _firm_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firm-status.business-action-base */ 156896);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_firm_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-firm-status-input-is-valid.rule */ 558751);




class CreateFirmStatusAction extends _firm_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FirmStatusBusinessActionBase {
  constructor(input) {
    super('CreateFirmStatusAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_firm_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateFirmStatusInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateFirmStatus({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 156896:
/*!*********************************************************************************!*\
  !*** ./libs/web/firm-status/shared/actions/firm-status.business-action-base.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmStatusBusinessActionBase": () => (/* binding */ FirmStatusBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class FirmStatusBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 941531:
/*!****************************************************************************!*\
  !*** ./libs/web/firm-status/shared/actions/update-firm-statuses.action.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateFirmStatusAction": () => (/* binding */ UpdateFirmStatusAction),
/* harmony export */   "UpdateFirmStatusesAction": () => (/* binding */ UpdateFirmStatusesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _firm_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firm-status.business-action-base */ 156896);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateFirmStatusesAction extends _firm_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FirmStatusBusinessActionBase {
  constructor(firmStatuses) {
    super('UpdateFirmStatusesAction');
    this.firmStatuses = firmStatuses;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.firmStatuses, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateFirmStatuses({
      input: {
        firmStatuses: this.firmStatuses
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateFirmStatusAction extends _firm_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FirmStatusBusinessActionBase {
  constructor(firmStatus, firmStatusId) {
    super('UpdateFirmStatusAction');
    this.firmStatus = firmStatus;
    this.firmStatusId = firmStatusId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.firmStatus, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.firmStatusId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateFirmStatus({
      firmStatusId: this.firmStatusId,
      input: this.firmStatus
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 150501:
/*!***************************************************************************************!*\
  !*** ./libs/web/firm-status/shared/actions/validate-firm-status-excel-data.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateFirmStatusExcelDataAction": () => (/* binding */ ValidateFirmStatusExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _firm_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firm-status.business-action-base */ 156896);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateFirmStatusExcelDataAction extends _firm_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FirmStatusBusinessActionBase {
  constructor(excelData) {
    super('ValidateFirmStatusExcelDataAction');
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

/***/ 512227:
/*!******************************************************************************!*\
  !*** ./libs/web/firm-status/shared/firm-status.business-provider.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmStatusBusinessProviderService": () => (/* binding */ FirmStatusBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_firm_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-firm-status-excel-data.action */ 150501);
/* harmony import */ var _actions_create_firm_status_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-firm-status.action */ 363597);
/* harmony import */ var _actions_update_firm_statuses_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-firm-statuses.action */ 941531);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class FirmStatusBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.FirmStatusBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createFirmStatus(input) {
    const action = new _actions_create_firm_status_action__WEBPACK_IMPORTED_MODULE_2__.CreateFirmStatusAction(input);
    action.Do(this);
    return action.response;
  }
  updateFirmStatus(input, firmStatusId) {
    const action = new _actions_update_firm_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateFirmStatusAction(input, firmStatusId);
    action.Do(this);
    return action.response;
  }
  importFirmStatuses(firmStatuses) {
    const updateFirmStatusesAction = new _actions_update_firm_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateFirmStatusesAction(firmStatuses);
    updateFirmStatusesAction.Do(this);
    return updateFirmStatusesAction.response;
  }
  validateFirmStatusExcelData(excelData) {
    const validateFirmStatusExcelDataAction = new _actions_validate_firm_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateFirmStatusExcelDataAction(excelData);
    validateFirmStatusExcelDataAction.Do(this);
    return validateFirmStatusExcelDataAction.response;
  }
}
FirmStatusBusinessProviderService.ɵfac = function FirmStatusBusinessProviderService_Factory(t) {
  return new (t || FirmStatusBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
FirmStatusBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: FirmStatusBusinessProviderService,
  factory: FirmStatusBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 332441:
/*!************************************************************!*\
  !*** ./libs/web/firm-status/shared/firm-status.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmStatusService": () => (/* binding */ FirmStatusService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _firm_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./firm-status.business-provider.service */ 512227);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class FirmStatusService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("FirmStatusService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createFirmStatus(input) {
    var _a, _b;
    input.name = ((_a = input.name) === null || _a === void 0 ? void 0 : _a.length) > 256 ? (_b = input.name) === null || _b === void 0 ? void 0 : _b.substring(0, 255) : input.name;
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createFirmStatus(filteredObj);
  }
  updateFirmStatus(input, firmStatusId) {
    var _a, _b;
    input.name = ((_a = input.name) === null || _a === void 0 ? void 0 : _a.length) > 256 ? (_b = input.name) === null || _b === void 0 ? void 0 : _b.substring(0, 255) : input.name;
    return this.businessProvider.updateFirmStatus(input, firmStatusId);
  }
  importFirmStatuses(firmStatuses) {
    return this.businessProvider.importFirmStatuses(firmStatuses);
  }
  validateFirmStatusExcelData(excelData) {
    return this.businessProvider.validateFirmStatusExcelData(excelData);
  }
}
FirmStatusService.ɵfac = function FirmStatusService_Factory(t) {
  return new (t || FirmStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_firm_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.FirmStatusBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_firm_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.FirmStatusBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
FirmStatusService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: FirmStatusService,
  factory: FirmStatusService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 765892:
/*!**********************************************************!*\
  !*** ./libs/web/firm-status/shared/firm-status.store.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFirmStatusFeatureStore": () => (/* binding */ WebFirmStatusFeatureStore)
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
/* harmony import */ var _firm_status_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./firm-status.service */ 332441);














class WebFirmStatusFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, firmStatusService) {
    super({
      loading: false,
      firmStatuses: [],
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
    this.firmStatusService = firmStatusService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.firmStatuses$ = this.select(s => s.firmStatuses);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.firmStatuses$, (errors, loading, item, formName, firmStatuses) => ({
      errors,
      loading,
      item,
      formName,
      firmStatuses
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
    this.addNewFirmStatus = this.updater((state, firmStatus) => Object.assign(Object.assign({}, state), {
      firmStatuses: [...state.firmStatuses, firmStatus]
    }));
    this.updateFirmStatus = this.updater((state, firmStatus) => {
      return Object.assign(Object.assign({}, state), {
        firmStatuses: state.firmStatuses.map(el => {
          if (el.id === firmStatus.id) {
            return firmStatus;
          } else {
            return el;
          }
        })
      });
    });
    this.addFirmStatuses = this.updater((state, newFirmStatuses) => Object.assign(Object.assign({}, state), {
      firmStatuses: state.firmStatuses.concat(newFirmStatuses)
    }));
    this.updateFirmStatuses = this.updater((state, updatedFirmStatuses) => {
      return Object.assign(Object.assign({}, state), {
        firmStatuses: state.firmStatuses.map(firmStatus => {
          const updated = updatedFirmStatuses.find(el => el.id === firmStatus.id);
          return updated ? updated : firmStatus;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadFirmStatusEffect = this.effect(firmStatusId$ => firmStatusId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(firmStatusId => this.data.userFirmStatus({
      firmStatusId
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
    this.loadFirmStatusesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userFirmStatuses({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      firmStatuses: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createFirmStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.firmStatusService.createFirmStatus(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(firmStatus => {
      this.addNewFirmStatus(firmStatus);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: firmStatus,
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
    this.updateFirmStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.firmStatusService.updateFirmStatus(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(firmStatus => {
      this.updateFirmStatus(firmStatus);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: firmStatus,
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
    this.deleteFirmStatusEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, firmStatus]) => {
      return this.data.userDeleteFirmStatus({
        firmStatusId: firmStatus.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.firmStatusService.importFirmStatuses(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addFirmStatuses(created);
      this.updateFirmStatuses(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('firmStatusId')) {
      var firmStatusId = this.route.snapshot.paramMap.get('firmStatusId');
      this.setFormName('firmStatus_edit');
    } else {
      this.setFormName('firmStatus_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.firmStatusService.validateFirmStatusExcelData(excelData);
    }));
  }
}
WebFirmStatusFeatureStore.ɵfac = function WebFirmStatusFeatureStore_Factory(t) {
  return new (t || WebFirmStatusFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_firm_status_service__WEBPACK_IMPORTED_MODULE_11__.FirmStatusService));
};
WebFirmStatusFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebFirmStatusFeatureStore,
  factory: WebFirmStatusFeatureStore.ɵfac
});

/***/ }),

/***/ 558751:
/*!*************************************************************************************!*\
  !*** ./libs/web/firm-status/shared/rules/create-firm-status-input-is-valid.rule.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateFirmStatusInputIsValidRule": () => (/* binding */ CreateFirmStatusInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _firm_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firm-status-name-is-valid.rule */ 172289);


class CreateFirmStatusInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _firm_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.FirmStatusNameIsValidRule('name', 'The firmstatus name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 172289:
/*!*****************************************************************************!*\
  !*** ./libs/web/firm-status/shared/rules/firm-status-name-is-valid.rule.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmStatusNameIsValidRule": () => (/* binding */ FirmStatusNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class FirmStatusNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);