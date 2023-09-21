"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_facility-fee-schedule_shared_facility-fee-schedule_store_ts-libs_web_facilit-202278"],{

/***/ 647718:
/*!**********************************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/actions/create-facility-fee-schedule.action.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateFacilityFeeScheduleAction": () => (/* binding */ CreateFacilityFeeScheduleAction)
/* harmony export */ });
/* harmony import */ var _facility_fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./facility-fee-schedule.business-action-base */ 794567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_facility_fee_schedule_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-facility-fee-schedule-input-is-valid.rule */ 70491);




class CreateFacilityFeeScheduleAction extends _facility_fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FacilityFeeScheduleBusinessActionBase {
  constructor(input) {
    super('CreateFacilityFeeScheduleAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_facility_fee_schedule_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateFacilityFeeScheduleInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateFacilityFeeSchedule({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 794567:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/actions/facility-fee-schedule.business-action-base.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FacilityFeeScheduleBusinessActionBase": () => (/* binding */ FacilityFeeScheduleBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class FacilityFeeScheduleBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 973810:
/*!***********************************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/actions/update-facility-fee-schedules.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateFacilityFeeScheduleAction": () => (/* binding */ UpdateFacilityFeeScheduleAction),
/* harmony export */   "UpdateFacilityFeeSchedulesAction": () => (/* binding */ UpdateFacilityFeeSchedulesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _facility_fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./facility-fee-schedule.business-action-base */ 794567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateFacilityFeeSchedulesAction extends _facility_fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FacilityFeeScheduleBusinessActionBase {
  constructor(facilityFeeSchedules) {
    super('UpdateFacilityFeeSchedulesAction');
    this.facilityFeeSchedules = facilityFeeSchedules;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.facilityFeeSchedules, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateFacilityFeeSchedules({
      input: {
        facilityFeeSchedules: this.facilityFeeSchedules
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateFacilityFeeScheduleAction extends _facility_fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FacilityFeeScheduleBusinessActionBase {
  constructor(facilityFeeSchedule, facilityFeeScheduleId) {
    super('UpdateFacilityFeeScheduleAction');
    this.facilityFeeSchedule = facilityFeeSchedule;
    this.facilityFeeScheduleId = facilityFeeScheduleId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.facilityFeeSchedule, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.facilityFeeScheduleId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateFacilityFeeSchedule({
      facilityFeeScheduleId: this.facilityFeeScheduleId,
      input: this.facilityFeeSchedule
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 778780:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/actions/validate-facility-fee-schedule-excel-data.action.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateFacilityFeeScheduleExcelDataAction": () => (/* binding */ ValidateFacilityFeeScheduleExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _facility_fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./facility-fee-schedule.business-action-base */ 794567);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateFacilityFeeScheduleExcelDataAction extends _facility_fee_schedule_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FacilityFeeScheduleBusinessActionBase {
  constructor(excelData, organizations, specialties) {
    super('ValidateFacilityFeeScheduleExcelDataAction');
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

/***/ 32559:
/*!**************************************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/facility-fee-schedule.business-provider.service.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FacilityFeeScheduleBusinessProviderService": () => (/* binding */ FacilityFeeScheduleBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_facility_fee_schedule_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-facility-fee-schedule-excel-data.action */ 778780);
/* harmony import */ var _actions_create_facility_fee_schedule_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-facility-fee-schedule.action */ 647718);
/* harmony import */ var _actions_update_facility_fee_schedules_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-facility-fee-schedules.action */ 973810);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class FacilityFeeScheduleBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.FacilityFeeScheduleBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createFacilityFeeSchedule(input) {
    const action = new _actions_create_facility_fee_schedule_action__WEBPACK_IMPORTED_MODULE_2__.CreateFacilityFeeScheduleAction(input);
    action.Do(this);
    return action.response;
  }
  updateFacilityFeeSchedule(input, facilityFeeScheduleId) {
    const action = new _actions_update_facility_fee_schedules_action__WEBPACK_IMPORTED_MODULE_3__.UpdateFacilityFeeScheduleAction(input, facilityFeeScheduleId);
    action.Do(this);
    return action.response;
  }
  importFacilityFeeSchedules(facilityFeeSchedules) {
    const updateFacilityFeeSchedulesAction = new _actions_update_facility_fee_schedules_action__WEBPACK_IMPORTED_MODULE_3__.UpdateFacilityFeeSchedulesAction(facilityFeeSchedules);
    updateFacilityFeeSchedulesAction.Do(this);
    return updateFacilityFeeSchedulesAction.response;
  }
  validateFacilityFeeScheduleExcelData(excelData, organizations, specialties) {
    const validateFacilityFeeScheduleExcelDataAction = new _actions_validate_facility_fee_schedule_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateFacilityFeeScheduleExcelDataAction(excelData, organizations, specialties);
    validateFacilityFeeScheduleExcelDataAction.Do(this);
    return validateFacilityFeeScheduleExcelDataAction.response;
  }
}
FacilityFeeScheduleBusinessProviderService.ɵfac = function FacilityFeeScheduleBusinessProviderService_Factory(t) {
  return new (t || FacilityFeeScheduleBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
FacilityFeeScheduleBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: FacilityFeeScheduleBusinessProviderService,
  factory: FacilityFeeScheduleBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 154100:
/*!********************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/facility-fee-schedule.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FacilityFeeScheduleService": () => (/* binding */ FacilityFeeScheduleService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _facility_fee_schedule_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./facility-fee-schedule.business-provider.service */ 32559);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class FacilityFeeScheduleService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("FacilityFeeScheduleService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createFacilityFeeSchedule(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createFacilityFeeSchedule(filteredObj);
  }
  updateFacilityFeeSchedule(input, facilityFeeScheduleId) {
    return this.businessProvider.updateFacilityFeeSchedule(input, facilityFeeScheduleId);
  }
  importFacilityFeeSchedules(facilityFeeSchedules) {
    return this.businessProvider.importFacilityFeeSchedules(facilityFeeSchedules);
  }
  validateFacilityFeeScheduleExcelData(excelData, organizations, specialties) {
    return this.businessProvider.validateFacilityFeeScheduleExcelData(excelData, organizations, specialties);
  }
}
FacilityFeeScheduleService.ɵfac = function FacilityFeeScheduleService_Factory(t) {
  return new (t || FacilityFeeScheduleService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_facility_fee_schedule_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.FacilityFeeScheduleBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_facility_fee_schedule_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.FacilityFeeScheduleBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
FacilityFeeScheduleService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: FacilityFeeScheduleService,
  factory: FacilityFeeScheduleService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 574398:
/*!******************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/facility-fee-schedule.store.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFacilityFeeScheduleFeatureStore": () => (/* binding */ WebFacilityFeeScheduleFeatureStore)
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
/* harmony import */ var _facility_fee_schedule_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./facility-fee-schedule.service */ 154100);














class WebFacilityFeeScheduleFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, facilityFeeScheduleService) {
    super({
      loading: false,
      facilityFeeSchedules: [],
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
    this.facilityFeeScheduleService = facilityFeeScheduleService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.facilityFeeSchedules$ = this.select(s => s.facilityFeeSchedules);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.facilityFeeSchedules$, this.organizations$, this.specialties$, (errors, loading, item, formName, facilityFeeSchedules, organizations, specialties) => ({
      errors,
      loading,
      item,
      formName,
      facilityFeeSchedules,
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
    this.addNewFacilityFeeSchedule = this.updater((state, facilityFeeSchedule) => Object.assign(Object.assign({}, state), {
      facilityFeeSchedules: [...state.facilityFeeSchedules, facilityFeeSchedule]
    }));
    this.updateFacilityFeeSchedule = this.updater((state, facilityFeeSchedule) => {
      return Object.assign(Object.assign({}, state), {
        facilityFeeSchedules: state.facilityFeeSchedules.map(el => {
          if (el.id === facilityFeeSchedule.id) {
            return facilityFeeSchedule;
          } else {
            return el;
          }
        })
      });
    });
    this.addFacilityFeeSchedules = this.updater((state, newFacilityFeeSchedules) => Object.assign(Object.assign({}, state), {
      facilityFeeSchedules: state.facilityFeeSchedules.concat(newFacilityFeeSchedules)
    }));
    this.updateFacilityFeeSchedules = this.updater((state, updatedFacilityFeeSchedules) => {
      return Object.assign(Object.assign({}, state), {
        facilityFeeSchedules: state.facilityFeeSchedules.map(facilityFeeSchedule => {
          const updated = updatedFacilityFeeSchedules.find(el => el.id === facilityFeeSchedule.id);
          return updated ? updated : facilityFeeSchedule;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadFacilityFeeScheduleEffect = this.effect(facilityFeeScheduleId$ => facilityFeeScheduleId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(facilityFeeScheduleId => this.data.userFacilityFeeSchedule({
      facilityFeeScheduleId
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
    this.loadFacilityFeeSchedulesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userFacilityFeeSchedules({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      facilityFeeSchedules: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createFacilityFeeScheduleEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.facilityFeeScheduleService.createFacilityFeeSchedule(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(facilityFeeSchedule => {
      this.addNewFacilityFeeSchedule(facilityFeeSchedule);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: facilityFeeSchedule,
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
    this.updateFacilityFeeScheduleEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.facilityFeeScheduleService.updateFacilityFeeSchedule(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(facilityFeeSchedule => {
      this.updateFacilityFeeSchedule(facilityFeeSchedule);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: facilityFeeSchedule,
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
    this.deleteFacilityFeeScheduleEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, facilityFeeSchedule]) => {
      return this.data.userDeleteFacilityFeeSchedule({
        facilityFeeScheduleId: facilityFeeSchedule.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.facilityFeeScheduleService.importFacilityFeeSchedules(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addFacilityFeeSchedules(created);
      this.updateFacilityFeeSchedules(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('facilityFeeScheduleId')) {
      var facilityFeeScheduleId = this.route.snapshot.paramMap.get('facilityFeeScheduleId');
      this.setFormName('facilityFeeSchedule_edit');
    } else {
      this.setFormName('facilityFeeSchedule_create');
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
      return this.facilityFeeScheduleService.validateFacilityFeeScheduleExcelData(excelData, vm.organizations, vm.specialties);
    }));
  }
}
WebFacilityFeeScheduleFeatureStore.ɵfac = function WebFacilityFeeScheduleFeatureStore_Factory(t) {
  return new (t || WebFacilityFeeScheduleFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_facility_fee_schedule_service__WEBPACK_IMPORTED_MODULE_12__.FacilityFeeScheduleService));
};
WebFacilityFeeScheduleFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebFacilityFeeScheduleFeatureStore,
  factory: WebFacilityFeeScheduleFeatureStore.ɵfac
});

/***/ }),

/***/ 70491:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/rules/create-facility-fee-schedule-input-is-valid.rule.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateFacilityFeeScheduleInputIsValidRule": () => (/* binding */ CreateFacilityFeeScheduleInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _facility_fee_schedule_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./facility-fee-schedule-name-is-valid.rule */ 881561);


class CreateFacilityFeeScheduleInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _facility_fee_schedule_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.FacilityFeeScheduleNameIsValidRule('name', 'The facilityfeeschedule name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 881561:
/*!*************************************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/shared/rules/facility-fee-schedule-name-is-valid.rule.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FacilityFeeScheduleNameIsValidRule": () => (/* binding */ FacilityFeeScheduleNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class FacilityFeeScheduleNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 804720:
/*!******************************************************************************************************************************************!*\
  !*** ./libs/web/facility-fee-schedule/ui/web-facility-fee-schedule-select-form/web-facility-fee-schedule-select-table-view.component.ts ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFacilityFeeScheduleSelectTableViewComponent": () => (/* binding */ WebFacilityFeeScheduleSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebFacilityFeeScheduleSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.facilityFeeSchedules = [];
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
      headerName: 'Medicare Facility Rate',
      field: 'medicareFacilityRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.medicareFacilityRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Facility Fee',
      field: 'facilityFee',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.facilityFee, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Base Unit',
      field: 'baseUnit',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.baseUnit, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Prof Cf',
      field: 'profCf',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.profCf, '$', 2);
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
WebFacilityFeeScheduleSelectTableViewComponent.ɵfac = function WebFacilityFeeScheduleSelectTableViewComponent_Factory(t) {
  return new (t || WebFacilityFeeScheduleSelectTableViewComponent)();
};
WebFacilityFeeScheduleSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebFacilityFeeScheduleSelectTableViewComponent,
  selectors: [["ui-facility-fee-schedule-select-table-view"]],
  viewQuery: function WebFacilityFeeScheduleSelectTableViewComponent_Query(rf, ctx) {
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
    facilityFeeSchedules: "facilityFeeSchedules"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebFacilityFeeScheduleSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebFacilityFeeScheduleSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebFacilityFeeScheduleSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.facilityFeeSchedules)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);