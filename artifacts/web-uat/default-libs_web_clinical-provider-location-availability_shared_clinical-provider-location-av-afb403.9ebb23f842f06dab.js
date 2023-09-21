"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_clinical-provider-location-availability_shared_clinical-provider-location-av-afb403"],{

/***/ 772940:
/*!*****************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/actions/clinical-provider-location-availability.business-action-base.ts ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderLocationAvailabilityBusinessActionBase": () => (/* binding */ ClinicalProviderLocationAvailabilityBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ClinicalProviderLocationAvailabilityBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 95561:
/*!**********************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/actions/create-clinical-provider-location-availability.action.ts ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderLocationAvailabilityAction": () => (/* binding */ CreateClinicalProviderLocationAvailabilityAction)
/* harmony export */ });
/* harmony import */ var _clinical_provider_location_availability_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-location-availability.business-action-base */ 772940);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_clinical_provider_location_availability_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-clinical-provider-location-availability-input-is-valid.rule */ 407097);




class CreateClinicalProviderLocationAvailabilityAction extends _clinical_provider_location_availability_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationAvailabilityBusinessActionBase {
  constructor(input) {
    super('CreateClinicalProviderLocationAvailabilityAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_clinical_provider_location_availability_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderLocationAvailabilityInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderLocationAvailability({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 825668:
/*!************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/actions/update-clinical-provider-location-availabilities.action.ts ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateClinicalProviderLocationAvailabilitiesAction": () => (/* binding */ UpdateClinicalProviderLocationAvailabilitiesAction),
/* harmony export */   "UpdateClinicalProviderLocationAvailabilityAction": () => (/* binding */ UpdateClinicalProviderLocationAvailabilityAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_location_availability_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-location-availability.business-action-base */ 772940);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateClinicalProviderLocationAvailabilitiesAction extends _clinical_provider_location_availability_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationAvailabilityBusinessActionBase {
  constructor(clinicalProviderLocationAvailabilities) {
    super('UpdateClinicalProviderLocationAvailabilitiesAction');
    this.clinicalProviderLocationAvailabilities = clinicalProviderLocationAvailabilities;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderLocationAvailabilities, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderLocationAvailabilities({
      input: {
        clinicalProviderLocationAvailabilities: this.clinicalProviderLocationAvailabilities
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateClinicalProviderLocationAvailabilityAction extends _clinical_provider_location_availability_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationAvailabilityBusinessActionBase {
  constructor(clinicalProviderLocationAvailability, clinicalProviderLocationAvailabilityId) {
    super('UpdateClinicalProviderLocationAvailabilityAction');
    this.clinicalProviderLocationAvailability = clinicalProviderLocationAvailability;
    this.clinicalProviderLocationAvailabilityId = clinicalProviderLocationAvailabilityId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderLocationAvailability, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.clinicalProviderLocationAvailabilityId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderLocationAvailability({
      clinicalProviderLocationAvailabilityId: this.clinicalProviderLocationAvailabilityId,
      input: this.clinicalProviderLocationAvailability
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 685946:
/*!***********************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/actions/validate-clinical-provider-location-availability-excel-data.action.ts ***!
  \***********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateClinicalProviderLocationAvailabilityExcelDataAction": () => (/* binding */ ValidateClinicalProviderLocationAvailabilityExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_location_availability_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-location-availability.business-action-base */ 772940);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateClinicalProviderLocationAvailabilityExcelDataAction extends _clinical_provider_location_availability_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationAvailabilityBusinessActionBase {
  constructor(excelData, clinicalProviderLocations) {
    super('ValidateClinicalProviderLocationAvailabilityExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.clinicalProviderLocations = clinicalProviderLocations;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`clinicalProviderLocationName_${index}_is_valid}`, "Clinical Provider Location Is Not Valid", 'clinicalProviderLocation.name', datum['clinicalProviderLocation'], this.clinicalProviderLocations, true));
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

/***/ 137798:
/*!**************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/clinical-provider-location-availability.business-provider.service.ts ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderLocationAvailabilityBusinessProviderService": () => (/* binding */ ClinicalProviderLocationAvailabilityBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_clinical_provider_location_availability_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-clinical-provider-location-availability-excel-data.action */ 685946);
/* harmony import */ var _actions_create_clinical_provider_location_availability_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-clinical-provider-location-availability.action */ 95561);
/* harmony import */ var _actions_update_clinical_provider_location_availabilities_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-clinical-provider-location-availabilities.action */ 825668);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ClinicalProviderLocationAvailabilityBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ClinicalProviderLocationAvailabilityBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createClinicalProviderLocationAvailability(input) {
    const action = new _actions_create_clinical_provider_location_availability_action__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderLocationAvailabilityAction(input);
    action.Do(this);
    return action.response;
  }
  updateClinicalProviderLocationAvailability(input, clinicalProviderLocationAvailabilityId) {
    const action = new _actions_update_clinical_provider_location_availabilities_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderLocationAvailabilityAction(input, clinicalProviderLocationAvailabilityId);
    action.Do(this);
    return action.response;
  }
  importClinicalProviderLocationAvailabilities(clinicalProviderLocationAvailabilities) {
    const updateClinicalProviderLocationAvailabilitiesAction = new _actions_update_clinical_provider_location_availabilities_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderLocationAvailabilitiesAction(clinicalProviderLocationAvailabilities);
    updateClinicalProviderLocationAvailabilitiesAction.Do(this);
    return updateClinicalProviderLocationAvailabilitiesAction.response;
  }
  validateClinicalProviderLocationAvailabilityExcelData(excelData, clinicalProviderLocations) {
    const validateClinicalProviderLocationAvailabilityExcelDataAction = new _actions_validate_clinical_provider_location_availability_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateClinicalProviderLocationAvailabilityExcelDataAction(excelData, clinicalProviderLocations);
    validateClinicalProviderLocationAvailabilityExcelDataAction.Do(this);
    return validateClinicalProviderLocationAvailabilityExcelDataAction.response;
  }
}
ClinicalProviderLocationAvailabilityBusinessProviderService.ɵfac = function ClinicalProviderLocationAvailabilityBusinessProviderService_Factory(t) {
  return new (t || ClinicalProviderLocationAvailabilityBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ClinicalProviderLocationAvailabilityBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ClinicalProviderLocationAvailabilityBusinessProviderService,
  factory: ClinicalProviderLocationAvailabilityBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 338074:
/*!********************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/clinical-provider-location-availability.service.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderLocationAvailabilityService": () => (/* binding */ ClinicalProviderLocationAvailabilityService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _clinical_provider_location_availability_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clinical-provider-location-availability.business-provider.service */ 137798);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ClinicalProviderLocationAvailabilityService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ClinicalProviderLocationAvailabilityService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createClinicalProviderLocationAvailability(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createClinicalProviderLocationAvailability(filteredObj);
  }
  updateClinicalProviderLocationAvailability(input, clinicalProviderLocationAvailabilityId) {
    return this.businessProvider.updateClinicalProviderLocationAvailability(input, clinicalProviderLocationAvailabilityId);
  }
  importClinicalProviderLocationAvailabilities(clinicalProviderLocationAvailabilities) {
    return this.businessProvider.importClinicalProviderLocationAvailabilities(clinicalProviderLocationAvailabilities);
  }
  validateClinicalProviderLocationAvailabilityExcelData(excelData, clinicalProviderLocations) {
    return this.businessProvider.validateClinicalProviderLocationAvailabilityExcelData(excelData, clinicalProviderLocations);
  }
}
ClinicalProviderLocationAvailabilityService.ɵfac = function ClinicalProviderLocationAvailabilityService_Factory(t) {
  return new (t || ClinicalProviderLocationAvailabilityService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_location_availability_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderLocationAvailabilityBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_location_availability_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderLocationAvailabilityBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ClinicalProviderLocationAvailabilityService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ClinicalProviderLocationAvailabilityService,
  factory: ClinicalProviderLocationAvailabilityService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 192716:
/*!******************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/clinical-provider-location-availability.store.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderLocationAvailabilityFeatureStore": () => (/* binding */ WebClinicalProviderLocationAvailabilityFeatureStore)
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
/* harmony import */ var _clinical_provider_location_availability_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./clinical-provider-location-availability.service */ 338074);














class WebClinicalProviderLocationAvailabilityFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, clinicalProviderLocationAvailabilityService) {
    super({
      loading: false,
      clinicalProviderLocationAvailabilities: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      clinicalProviderLocationId: '-----',
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
    this.clinicalProviderLocationAvailabilityService = clinicalProviderLocationAvailabilityService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.clinicalProviderLocationAvailabilities$ = this.select(s => s.clinicalProviderLocationAvailabilities);
    this.clinicalProviderLocations$ = this.select(s => s.clinicalProviderLocations || []);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.startTime$ = this.select(s => s.startTime);
    this.endTime$ = this.select(s => s.endTime);
    this.day$ = this.select(s => s.day);
    this.clinicalProviderLocationId$ = this.select(s => s.clinicalProviderLocationId);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderLocationAvailabilities$, this.clinicalProviderLocations$, (errors, loading, item, formName, clinicalProviderLocationAvailabilities, clinicalProviderLocations) => ({
      errors,
      loading,
      item,
      formName,
      clinicalProviderLocationAvailabilities,
      clinicalProviderLocations
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.searchQuery$, this.clinicalProviderLocationId$, this.startTime$, this.endTime$, this.day$, (paging, searchQuery, clinicalProviderLocationId, startTime, endTime, day) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      total: paging.total,
      clinicalProviderLocationId,
      startTime,
      endTime,
      day
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setStartTime = this.updater((state, startTime) => Object.assign(Object.assign({}, state), {
      startTime
    }));
    this.setDay = this.updater((state, day) => {
      console.log('day', day);
      return Object.assign(Object.assign({}, state), {
        day
      });
    });
    this.setEndTime = this.updater((state, endTime) => Object.assign(Object.assign({}, state), {
      endTime
    }));
    this.setClinicalProviderLocationId = this.updater((state, clinicalProviderLocationId) => {
      console.log("clinicalProviderLocationId", clinicalProviderLocationId);
      return Object.assign(Object.assign({}, state), {
        clinicalProviderLocationId
      });
    });
    this.filterClinicalProviderLocations = term => this.data.userSelectClinicalProviderLocations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const clinicalProviderLocations = res.data.items;
      this.patchState({
        clinicalProviderLocations
      });
      return clinicalProviderLocations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addClinicalProviderLocation = this.updater((state, clinicalProviderLocation) => Object.assign(Object.assign({}, state), {
      clinicalProviderLocations: state.clinicalProviderLocations.concat(clinicalProviderLocation)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewClinicalProviderLocationAvailability = this.updater((state, clinicalProviderLocationAvailability) => Object.assign(Object.assign({}, state), {
      clinicalProviderLocationAvailabilities: [...state.clinicalProviderLocationAvailabilities, clinicalProviderLocationAvailability]
    }));
    this.updateClinicalProviderLocationAvailability = this.updater((state, clinicalProviderLocationAvailability) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderLocationAvailabilities: state.clinicalProviderLocationAvailabilities.map(el => {
          if (el.id === clinicalProviderLocationAvailability.id) {
            return clinicalProviderLocationAvailability;
          } else {
            return el;
          }
        })
      });
    });
    this.deleteClinicalProviderLocationAvailability = this.updater((state, clinicalProviderLocationAvailability) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderLocationAvailabilities: state.clinicalProviderLocationAvailabilities.filter(i => i.id !== clinicalProviderLocationAvailability.id)
      });
    });
    this.addClinicalProviderLocationAvailabilities = this.updater((state, newClinicalProviderLocationAvailabilities) => Object.assign(Object.assign({}, state), {
      clinicalProviderLocationAvailabilities: state.clinicalProviderLocationAvailabilities.concat(newClinicalProviderLocationAvailabilities)
    }));
    this.updateClinicalProviderLocationAvailabilities = this.updater((state, updatedClinicalProviderLocationAvailabilities) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderLocationAvailabilities: state.clinicalProviderLocationAvailabilities.map(clinicalProviderLocationAvailability => {
          const updated = updatedClinicalProviderLocationAvailabilities.find(el => el.id === clinicalProviderLocationAvailability.id);
          return updated ? updated : clinicalProviderLocationAvailability;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadClinicalProviderLocationAvailabilityEffect = this.effect(clinicalProviderLocationAvailabilityId$ => clinicalProviderLocationAvailabilityId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(clinicalProviderLocationAvailabilityId => this.data.userClinicalProviderLocationAvailability({
      clinicalProviderLocationAvailabilityId
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
    this.loadClinicalProviderLocationAvailabilitiesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => {
      console.log("input", input);
      return this.data.userClinicalProviderLocationAvailabilities({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        console.log("res", res.data.items);
        this.patchState({
          paging: {
            limit: input.limit,
            skip: input.skip,
            total: res.data.count.total
          },
          clinicalProviderLocationAvailabilities: res.data.items,
          errors: res.errors,
          loading: false
        });
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.createClinicalProviderLocationAvailabilityEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.clinicalProviderLocationAvailabilityService.createClinicalProviderLocationAvailability(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProviderLocationAvailability => {
      this.addNewClinicalProviderLocationAvailability(clinicalProviderLocationAvailability);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderLocationAvailability,
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
    this.updateClinicalProviderLocationAvailabilityEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.clinicalProviderLocationAvailabilityService.updateClinicalProviderLocationAvailability(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProviderLocationAvailability => {
      this.updateClinicalProviderLocationAvailability(clinicalProviderLocationAvailability);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderLocationAvailability,
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
    this.deleteClinicalProviderLocationAvailabilityEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, clinicalProviderLocationAvailability]) => {
      console.log(clinicalProviderLocationAvailability);
      return this.data.userDeleteClinicalProviderLocationAvailability({
        clinicalProviderLocationAvailabilityId: clinicalProviderLocationAvailability.id
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
    this.deleteClinicalProviderLocationAvailabilityInScheduleTimeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, clinicalProviderLocationAvailability]) => {
      console.log(clinicalProviderLocationAvailability);
      return this.data.userDeleteClinicalProviderLocationAvailability({
        clinicalProviderLocationAvailabilityId: clinicalProviderLocationAvailability.id
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.deleteClinicalProviderLocationAvailability(res.data.deleted);
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.clinicalProviderLocationAvailabilityService.importClinicalProviderLocationAvailabilities(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addClinicalProviderLocationAvailabilities(created);
      this.updateClinicalProviderLocationAvailabilities(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('clinicalProviderLocationAvailabilityId')) {
      this.setFormName('clinicalProviderLocationAvailability_edit');
    } else {
      this.setFormName('clinicalProviderLocationAvailability_create');
    }
    if (this.route.snapshot.paramMap.has("clinicalProviderLocationId")) {
      const clinicalProviderLocationId = this.route.snapshot.paramMap.get("clinicalProviderLocationId");
      this.setClinicalProviderLocationId(clinicalProviderLocationId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.clinicalProviderLocationAvailabilityService.validateClinicalProviderLocationAvailabilityExcelData(excelData, vm.clinicalProviderLocations);
    }));
  }
}
WebClinicalProviderLocationAvailabilityFeatureStore.ɵfac = function WebClinicalProviderLocationAvailabilityFeatureStore_Factory(t) {
  return new (t || WebClinicalProviderLocationAvailabilityFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_clinical_provider_location_availability_service__WEBPACK_IMPORTED_MODULE_12__.ClinicalProviderLocationAvailabilityService));
};
WebClinicalProviderLocationAvailabilityFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebClinicalProviderLocationAvailabilityFeatureStore,
  factory: WebClinicalProviderLocationAvailabilityFeatureStore.ɵfac
});

/***/ }),

/***/ 501800:
/*!*************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/rules/clinical-provider-location-availability-name-is-valid.rule.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderLocationAvailabilityNameIsValidRule": () => (/* binding */ ClinicalProviderLocationAvailabilityNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ClinicalProviderLocationAvailabilityNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 407097:
/*!*********************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/shared/rules/create-clinical-provider-location-availability-input-is-valid.rule.ts ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderLocationAvailabilityInputIsValidRule": () => (/* binding */ CreateClinicalProviderLocationAvailabilityInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _clinical_provider_location_availability_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-location-availability-name-is-valid.rule */ 501800);


class CreateClinicalProviderLocationAvailabilityInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _clinical_provider_location_availability_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationAvailabilityNameIsValidRule('name', 'The clinicalproviderlocationavailability name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 83052:
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location-availability/ui/web-clinical-provider-location-availability-select-form/web-clinical-provider-location-availability-select-table-view.component.ts ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderLocationAvailabilitySelectTableViewComponent": () => (/* binding */ WebClinicalProviderLocationAvailabilitySelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebClinicalProviderLocationAvailabilitySelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.clinicalProviderLocationAvailabilities = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'clinicalProviderLocation.name',
      headerName: 'Clinical Provider Location',
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
      field: 'day',
      filter: 'agTextColumnFilter'
    }, {
      field: 'startTime',
      filter: 'agTextColumnFilter'
    }, {
      field: 'endTime',
      filter: 'agTextColumnFilter'
    }, {
      field: 'clinicalProviderLocationId',
      filter: 'agTextColumnFilter',
      hide: true
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
WebClinicalProviderLocationAvailabilitySelectTableViewComponent.ɵfac = function WebClinicalProviderLocationAvailabilitySelectTableViewComponent_Factory(t) {
  return new (t || WebClinicalProviderLocationAvailabilitySelectTableViewComponent)();
};
WebClinicalProviderLocationAvailabilitySelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebClinicalProviderLocationAvailabilitySelectTableViewComponent,
  selectors: [["ui-clinical-provider-location-availability-select-table-view"]],
  viewQuery: function WebClinicalProviderLocationAvailabilitySelectTableViewComponent_Query(rf, ctx) {
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
    clinicalProviderLocationAvailabilities: "clinicalProviderLocationAvailabilities"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebClinicalProviderLocationAvailabilitySelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebClinicalProviderLocationAvailabilitySelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebClinicalProviderLocationAvailabilitySelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.clinicalProviderLocationAvailabilities)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);