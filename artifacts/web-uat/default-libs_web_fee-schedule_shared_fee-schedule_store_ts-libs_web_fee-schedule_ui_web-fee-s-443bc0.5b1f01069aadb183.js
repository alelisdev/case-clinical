"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_fee-schedule_shared_fee-schedule_store_ts-libs_web_fee-schedule_ui_web-fee-s-443bc0"],{

/***/ 332239:
/*!****************************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/actions/create-fee-schedule.action.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateFeeScheduleAction": () => (/* binding */ CreateFeeScheduleAction)
/* harmony export */ });
/* harmony import */ var _fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fee-schedule.business-action-base */ 581783);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_fee_schedule_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-fee-schedule-input-is-valid.rule */ 348199);




class CreateFeeScheduleAction extends _fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FeeScheduleBusinessActionBase {
  constructor(input) {
    super('CreateFeeScheduleAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_fee_schedule_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateFeeScheduleInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateFeeSchedule({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 581783:
/*!***********************************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/actions/fee-schedule.business-action-base.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeeScheduleBusinessActionBase": () => (/* binding */ FeeScheduleBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class FeeScheduleBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 611839:
/*!*****************************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/actions/update-fee-schedules.action.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateFeeScheduleAction": () => (/* binding */ UpdateFeeScheduleAction),
/* harmony export */   "UpdateFeeSchedulesAction": () => (/* binding */ UpdateFeeSchedulesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fee-schedule.business-action-base */ 581783);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateFeeSchedulesAction extends _fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FeeScheduleBusinessActionBase {
  constructor(feeSchedules) {
    super('UpdateFeeSchedulesAction');
    this.feeSchedules = feeSchedules;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.feeSchedules, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateFeeSchedules({
      input: {
        feeSchedules: this.feeSchedules
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateFeeScheduleAction extends _fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FeeScheduleBusinessActionBase {
  constructor(feeSchedule, feeScheduleId) {
    super('UpdateFeeScheduleAction');
    this.feeSchedule = feeSchedule;
    this.feeScheduleId = feeScheduleId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.feeSchedule, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.feeScheduleId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateFeeSchedule({
      feeScheduleId: this.feeScheduleId,
      input: this.feeSchedule
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 217581:
/*!*****************************************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/actions/validate-fee-schedule-excel-data.action.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateFeeScheduleExcelDataAction": () => (/* binding */ ValidateFeeScheduleExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fee-schedule.business-action-base */ 581783);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateFeeScheduleExcelDataAction extends _fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FeeScheduleBusinessActionBase {
  constructor(excelData, organizations, specialties) {
    super('ValidateFeeScheduleExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.organizations = organizations;
    this.specialties = specialties;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`organizationName_${index}_is_valid}`, "Organization Is Not Valid", 'organization.name', datum['organization'], this.organizations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`specialtyName_${index}_is_valid}`, "Specialty Is Not Valid", 'specialty.name', datum['specialty'], this.specialties, true));
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

/***/ 162160:
/*!********************************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/fee-schedule.business-provider.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeeScheduleBusinessProviderService": () => (/* binding */ FeeScheduleBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_fee_schedule_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-fee-schedule-excel-data.action */ 217581);
/* harmony import */ var _actions_create_fee_schedule_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-fee-schedule.action */ 332239);
/* harmony import */ var _actions_update_fee_schedules_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-fee-schedules.action */ 611839);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class FeeScheduleBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.FeeScheduleBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createFeeSchedule(input) {
    const action = new _actions_create_fee_schedule_action__WEBPACK_IMPORTED_MODULE_2__.CreateFeeScheduleAction(input);
    action.Do(this);
    return action.response;
  }
  updateFeeSchedule(input, feeScheduleId) {
    const action = new _actions_update_fee_schedules_action__WEBPACK_IMPORTED_MODULE_3__.UpdateFeeScheduleAction(input, feeScheduleId);
    action.Do(this);
    return action.response;
  }
  importFeeSchedules(feeSchedules) {
    const updateFeeSchedulesAction = new _actions_update_fee_schedules_action__WEBPACK_IMPORTED_MODULE_3__.UpdateFeeSchedulesAction(feeSchedules);
    updateFeeSchedulesAction.Do(this);
    return updateFeeSchedulesAction.response;
  }
  validateFeeScheduleExcelData(excelData, organizations, specialties) {
    const validateFeeScheduleExcelDataAction = new _actions_validate_fee_schedule_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateFeeScheduleExcelDataAction(excelData, organizations, specialties);
    validateFeeScheduleExcelDataAction.Do(this);
    return validateFeeScheduleExcelDataAction.response;
  }
}
FeeScheduleBusinessProviderService.ɵfac = function FeeScheduleBusinessProviderService_Factory(t) {
  return new (t || FeeScheduleBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
FeeScheduleBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: FeeScheduleBusinessProviderService,
  factory: FeeScheduleBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 497389:
/*!**************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/fee-schedule.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeeScheduleService": () => (/* binding */ FeeScheduleService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _fee_schedule_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fee-schedule.business-provider.service */ 162160);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class FeeScheduleService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("FeeScheduleService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createFeeSchedule(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createFeeSchedule(filteredObj);
  }
  updateFeeSchedule(input, feeScheduleId) {
    return this.businessProvider.updateFeeSchedule(input, feeScheduleId);
  }
  importFeeSchedules(feeSchedules) {
    return this.businessProvider.importFeeSchedules(feeSchedules);
  }
  validateFeeScheduleExcelData(excelData, organizations, specialties) {
    return this.businessProvider.validateFeeScheduleExcelData(excelData, organizations, specialties);
  }
}
FeeScheduleService.ɵfac = function FeeScheduleService_Factory(t) {
  return new (t || FeeScheduleService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_fee_schedule_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.FeeScheduleBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_fee_schedule_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.FeeScheduleBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
FeeScheduleService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: FeeScheduleService,
  factory: FeeScheduleService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 413837:
/*!************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/fee-schedule.store.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFeeScheduleFeatureStore": () => (/* binding */ WebFeeScheduleFeatureStore)
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
/* harmony import */ var _fee_schedule_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./fee-schedule.service */ 497389);














class WebFeeScheduleFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, feeScheduleService) {
    super({
      loading: false,
      feeSchedules: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      organizationId: undefined,
      specialtyId: undefined,
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
    this.feeScheduleService = feeScheduleService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.feeSchedules$ = this.select(s => s.feeSchedules);
    this.organizations$ = this.select(s => s.organizations || []);
    this.specialties$ = this.select(s => s.specialties || []);
    this.organizationId$ = this.select(s => s.organizationId);
    this.specialtyId$ = this.select(s => s.specialtyId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.feeSchedules$, this.organizations$, this.specialties$, (errors, loading, item, formName, feeSchedules, organizations, specialties) => ({
      errors,
      loading,
      item,
      formName,
      feeSchedules,
      organizations,
      specialties
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.organizationId$, this.specialtyId$, this.searchQuery$, (paging, organizationId, specialtyId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      organizationId: organizationId,
      specialtyId: specialtyId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setOrganizationId = this.updater((state, organizationId) => Object.assign(Object.assign({}, state), {
      organizationId
    }));
    this.setSpecialtyId = this.updater((state, specialtyId) => Object.assign(Object.assign({}, state), {
      specialtyId
    }));
    this.filterOrganizations = term => this.data.userSelectOrganizations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let organizations = res.data.items;
      this.patchState({
        organizations
      });
      return organizations;
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
    this.addOrganization = this.updater((state, organization) => Object.assign(Object.assign({}, state), {
      organizations: state.organizations.concat(organization)
    }));
    this.addSpecialty = this.updater((state, specialty) => Object.assign(Object.assign({}, state), {
      specialties: state.specialties.concat(specialty)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewFeeSchedule = this.updater((state, feeSchedule) => Object.assign(Object.assign({}, state), {
      feeSchedules: [...state.feeSchedules, feeSchedule]
    }));
    this.updateFeeSchedule = this.updater((state, feeSchedule) => {
      return Object.assign(Object.assign({}, state), {
        feeSchedules: state.feeSchedules.map(el => {
          if (el.id === feeSchedule.id) {
            return feeSchedule;
          } else {
            return el;
          }
        })
      });
    });
    this.addFeeSchedules = this.updater((state, newFeeSchedules) => Object.assign(Object.assign({}, state), {
      feeSchedules: state.feeSchedules.concat(newFeeSchedules)
    }));
    this.updateFeeSchedules = this.updater((state, updatedFeeSchedules) => {
      return Object.assign(Object.assign({}, state), {
        feeSchedules: state.feeSchedules.map(feeSchedule => {
          const updated = updatedFeeSchedules.find(el => el.id === feeSchedule.id);
          return updated ? updated : feeSchedule;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadFeeScheduleEffect = this.effect(feeScheduleId$ => feeScheduleId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(feeScheduleId => this.data.userFeeSchedule({
      feeScheduleId
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
    this.loadFeeSchedulesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userFeeSchedules({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      feeSchedules: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createFeeScheduleEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.feeScheduleService.createFeeSchedule(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(feeSchedule => {
      this.addNewFeeSchedule(feeSchedule);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: feeSchedule,
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
    this.updateFeeScheduleEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.feeScheduleService.updateFeeSchedule(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(feeSchedule => {
      this.updateFeeSchedule(feeSchedule);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: feeSchedule,
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
    this.deleteFeeScheduleEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, feeSchedule]) => {
      return this.data.userDeleteFeeSchedule({
        feeScheduleId: feeSchedule.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.feeScheduleService.importFeeSchedules(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addFeeSchedules(created);
      this.updateFeeSchedules(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('feeScheduleId')) {
      var feeScheduleId = this.route.snapshot.paramMap.get('feeScheduleId');
      this.setFormName('feeSchedule_edit');
    } else {
      this.setFormName('feeSchedule_create');
    }
    if (this.route.snapshot.paramMap.has("organizationId")) {
      var organizationId = this.route.snapshot.paramMap.get("organizationId");
      this.setOrganizationId(organizationId);
    }
    if (this.route.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.route.snapshot.paramMap.get("specialtyId");
      this.setSpecialtyId(specialtyId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.feeScheduleService.validateFeeScheduleExcelData(excelData, vm.organizations, vm.specialties);
    }));
  }
}
WebFeeScheduleFeatureStore.ɵfac = function WebFeeScheduleFeatureStore_Factory(t) {
  return new (t || WebFeeScheduleFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_fee_schedule_service__WEBPACK_IMPORTED_MODULE_12__.FeeScheduleService));
};
WebFeeScheduleFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebFeeScheduleFeatureStore,
  factory: WebFeeScheduleFeatureStore.ɵfac
});

/***/ }),

/***/ 348199:
/*!***************************************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/rules/create-fee-schedule-input-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateFeeScheduleInputIsValidRule": () => (/* binding */ CreateFeeScheduleInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _fee_schedule_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fee-schedule-name-is-valid.rule */ 535990);


class CreateFeeScheduleInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _fee_schedule_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.FeeScheduleNameIsValidRule('name', 'The feeschedule name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 535990:
/*!*******************************************************************************!*\
  !*** ./libs/web/fee-schedule/shared/rules/fee-schedule-name-is-valid.rule.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeeScheduleNameIsValidRule": () => (/* binding */ FeeScheduleNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class FeeScheduleNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 907925:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/fee-schedule/ui/web-fee-schedule-select-form/web-fee-schedule-select-table-view.component.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFeeScheduleSelectTableViewComponent": () => (/* binding */ WebFeeScheduleSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebFeeScheduleSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.feeSchedules = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'organization.name',
      headerName: 'Organization',
      filter: 'agTextColumnFilter'
    }, {
      field: 'specialty.name',
      headerName: 'Specialty',
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
      field: 'organizationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'specialtyId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'code',
      filter: 'agTextColumnFilter'
    }, {
      field: 'modifier',
      filter: 'agTextColumnFilter'
    }, {
      field: 'description',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Medicare Physician Non Facility Rate',
      field: 'medicarePhysicianNonFacilityRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.medicarePhysicianNonFacilityRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Physician Non Facility Fee',
      field: 'physicianNonFacilityFee',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.physicianNonFacilityFee, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Medicare Physician Facility Rate',
      field: 'medicarePhysicianFacilityRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.medicarePhysicianFacilityRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Physician Facility Fee',
      field: 'physicianFacilityFee',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.physicianFacilityFee, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'baseUnit',
      filter: 'agTextColumnFilter'
    }, {
      field: 'profCf',
      filter: 'agTextColumnFilter'
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
WebFeeScheduleSelectTableViewComponent.ɵfac = function WebFeeScheduleSelectTableViewComponent_Factory(t) {
  return new (t || WebFeeScheduleSelectTableViewComponent)();
};
WebFeeScheduleSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebFeeScheduleSelectTableViewComponent,
  selectors: [["ui-fee-schedule-select-table-view"]],
  viewQuery: function WebFeeScheduleSelectTableViewComponent_Query(rf, ctx) {
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
    feeSchedules: "feeSchedules"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebFeeScheduleSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebFeeScheduleSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebFeeScheduleSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.feeSchedules)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);