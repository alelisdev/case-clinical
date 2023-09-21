"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_clinical-provider-location_shared_clinical-provider-location_store_ts"],{

/***/ 178269:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/actions/clinical-provider-location.business-action-base.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderLocationBusinessActionBase": () => (/* binding */ ClinicalProviderLocationBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ClinicalProviderLocationBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 398710:
/*!********************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/actions/create-clinical-provider-location.action.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderLocationAction": () => (/* binding */ CreateClinicalProviderLocationAction)
/* harmony export */ });
/* harmony import */ var _clinical_provider_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-location.business-action-base */ 178269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_clinical_provider_location_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-clinical-provider-location-input-is-valid.rule */ 58399);




class CreateClinicalProviderLocationAction extends _clinical_provider_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationBusinessActionBase {
  constructor(input) {
    super('CreateClinicalProviderLocationAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_clinical_provider_location_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderLocationInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderLocation({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 491785:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/actions/update-clinical-provider-locations.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateClinicalProviderLocationAction": () => (/* binding */ UpdateClinicalProviderLocationAction),
/* harmony export */   "UpdateClinicalProviderLocationsAction": () => (/* binding */ UpdateClinicalProviderLocationsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-location.business-action-base */ 178269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateClinicalProviderLocationsAction extends _clinical_provider_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationBusinessActionBase {
  constructor(clinicalProviderLocations) {
    super('UpdateClinicalProviderLocationsAction');
    this.clinicalProviderLocations = clinicalProviderLocations;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderLocations, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderLocations({
      input: {
        clinicalProviderLocations: this.clinicalProviderLocations
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateClinicalProviderLocationAction extends _clinical_provider_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationBusinessActionBase {
  constructor(clinicalProviderLocation, clinicalProviderLocationId) {
    super('UpdateClinicalProviderLocationAction');
    this.clinicalProviderLocation = clinicalProviderLocation;
    this.clinicalProviderLocationId = clinicalProviderLocationId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderLocation, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.clinicalProviderLocationId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderLocation({
      clinicalProviderLocationId: this.clinicalProviderLocationId,
      input: this.clinicalProviderLocation
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 369865:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/actions/validate-clinical-provider-location-excel-data.action.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateClinicalProviderLocationExcelDataAction": () => (/* binding */ ValidateClinicalProviderLocationExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-location.business-action-base */ 178269);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateClinicalProviderLocationExcelDataAction extends _clinical_provider_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationBusinessActionBase {
  constructor(excelData, clinicalProviders, locations) {
    super('ValidateClinicalProviderLocationExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.clinicalProviders = clinicalProviders;
    this.locations = locations;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`locationName_${index}_is_valid}`, "Location Is Not Valid", 'location.name', datum['location'], this.locations, true));
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

/***/ 734701:
/*!************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/clinical-provider-location.business-provider.service.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderLocationBusinessProviderService": () => (/* binding */ ClinicalProviderLocationBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_clinical_provider_location_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-clinical-provider-location-excel-data.action */ 369865);
/* harmony import */ var _actions_create_clinical_provider_location_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-clinical-provider-location.action */ 398710);
/* harmony import */ var _actions_update_clinical_provider_locations_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-clinical-provider-locations.action */ 491785);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ClinicalProviderLocationBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ClinicalProviderLocationBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createClinicalProviderLocation(input) {
    const action = new _actions_create_clinical_provider_location_action__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderLocationAction(input);
    action.Do(this);
    return action.response;
  }
  updateClinicalProviderLocation(input, clinicalProviderLocationId) {
    const action = new _actions_update_clinical_provider_locations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderLocationAction(input, clinicalProviderLocationId);
    action.Do(this);
    return action.response;
  }
  importClinicalProviderLocations(clinicalProviderLocations) {
    const updateClinicalProviderLocationsAction = new _actions_update_clinical_provider_locations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderLocationsAction(clinicalProviderLocations);
    updateClinicalProviderLocationsAction.Do(this);
    return updateClinicalProviderLocationsAction.response;
  }
  validateClinicalProviderLocationExcelData(excelData, clinicalProviders, locations) {
    const validateClinicalProviderLocationExcelDataAction = new _actions_validate_clinical_provider_location_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateClinicalProviderLocationExcelDataAction(excelData, clinicalProviders, locations);
    validateClinicalProviderLocationExcelDataAction.Do(this);
    return validateClinicalProviderLocationExcelDataAction.response;
  }
}
ClinicalProviderLocationBusinessProviderService.ɵfac = function ClinicalProviderLocationBusinessProviderService_Factory(t) {
  return new (t || ClinicalProviderLocationBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ClinicalProviderLocationBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ClinicalProviderLocationBusinessProviderService,
  factory: ClinicalProviderLocationBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 837897:
/*!******************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/clinical-provider-location.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderLocationService": () => (/* binding */ ClinicalProviderLocationService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _clinical_provider_location_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clinical-provider-location.business-provider.service */ 734701);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ClinicalProviderLocationService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ClinicalProviderLocationService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createClinicalProviderLocation(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createClinicalProviderLocation(filteredObj);
  }
  updateClinicalProviderLocation(input, clinicalProviderLocationId) {
    return this.businessProvider.updateClinicalProviderLocation(input, clinicalProviderLocationId);
  }
  importClinicalProviderLocations(clinicalProviderLocations) {
    return this.businessProvider.importClinicalProviderLocations(clinicalProviderLocations);
  }
  validateClinicalProviderLocationExcelData(excelData, clinicalProviders, locations) {
    return this.businessProvider.validateClinicalProviderLocationExcelData(excelData, clinicalProviders, locations);
  }
}
ClinicalProviderLocationService.ɵfac = function ClinicalProviderLocationService_Factory(t) {
  return new (t || ClinicalProviderLocationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_location_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderLocationBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_location_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderLocationBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ClinicalProviderLocationService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ClinicalProviderLocationService,
  factory: ClinicalProviderLocationService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 988473:
/*!****************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/clinical-provider-location.store.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderLocationFeatureStore": () => (/* binding */ WebClinicalProviderLocationFeatureStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 670262);
/* harmony import */ var _case_clinical_shared_util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/shared/util/helpers */ 322412);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _clinical_provider_location_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./clinical-provider-location.service */ 837897);
















class WebClinicalProviderLocationFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.ComponentStore {
  constructor(data, router, route, toast, formService, clinicalProviderLocationService) {
    super({
      loading: false,
      clinicalProviderLocations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      clinicalProviderId: undefined,
      locationId: undefined,
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
    this.clinicalProviderLocationService = clinicalProviderLocationService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.formattedItem$ = this.select(this.item$, providerLocation => {
      var _a, _b, _c, _d, _e, _f, _g;
      const totalBusinessHours = [];
      (_b = (_a = providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.clinicalProvider) === null || _a === void 0 ? void 0 : _a.clinicalProviderLocations) === null || _b === void 0 ? void 0 : _b.map(({
        clinicalProviderLocationAvailabilities
      }) => {
        totalBusinessHours.push(...clinicalProviderLocationAvailabilities);
      });
      const businessHours = totalBusinessHours;
      const grouped = (0,_case_clinical_shared_util_helpers__WEBPACK_IMPORTED_MODULE_2__.groupBy)(businessHours, availability => availability.day);
      const result = [];
      let sundayFlag = false;
      const currentDate = moment__WEBPACK_IMPORTED_MODULE_0___default()().format('ll') + '';
      const currentDay = moment__WEBPACK_IMPORTED_MODULE_0___default()().format('dddd') + '';
      let currentHours;
      for (const key in grouped) {
        let tempHours = grouped[key];
        tempHours.sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime));
        tempHours = tempHours.map(item => {
          item.startTime = moment__WEBPACK_IMPORTED_MODULE_0___default()(item.startTime, 'hh:mm A').isValid() ? moment__WEBPACK_IMPORTED_MODULE_0___default()(item.startTime, 'hh:mm A').format('HH:mm') : item.startTime;
          item.endTime = moment__WEBPACK_IMPORTED_MODULE_0___default()(item.endTime, 'hh:mm A').isValid() ? moment__WEBPACK_IMPORTED_MODULE_0___default()(item.endTime, 'hh:mm A').format('HH:mm') : item.endTime;
          return item;
        });
        if (key === currentDay) currentHours = tempHours;
        result.push({
          day: key,
          hours: tempHours
        });
        if (key === 'Sunday') sundayFlag = true;
      }
      const todayHours = {
        day: currentDate,
        hours: currentHours
      };
      const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      result.sort((a, b) => WeekDays.indexOf(a.day) - WeekDays.indexOf(b.day));
      const formattedBusinessHours = {
        todayHours,
        others: result,
        sundayFlag
      };
      const formattedData = Object.assign(Object.assign({}, providerLocation), {
        clinicalProvider: Object.assign(Object.assign({}, providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.clinicalProvider), {
          rating: 0,
          locations: (_d = (_c = providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.clinicalProvider) === null || _c === void 0 ? void 0 : _c.clinicalProviderLocations) === null || _d === void 0 ? void 0 : _d.map(({
            location,
            clinicalProviderLocationAvailabilities
          }) => {
            var _a, _b, _c;
            return {
              id: location === null || location === void 0 ? void 0 : location.id,
              name: location === null || location === void 0 ? void 0 : location.name,
              locationImages: location.locationImages,
              endLatitudeProp: location === null || location === void 0 ? void 0 : location.latitude,
              endLongitudeProp: location === null || location === void 0 ? void 0 : location.longitude,
              vendor: (_b = (_a = providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.clinicalProvider) === null || _a === void 0 ? void 0 : _a.vendor) === null || _b === void 0 ? void 0 : _b.name,
              rating: (_c = providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.clinicalProvider.rating) !== null && _c !== void 0 ? _c : 0,
              businessHours: (0,_case_clinical_shared_util_helpers__WEBPACK_IMPORTED_MODULE_2__.groupByList)(clinicalProviderLocationAvailabilities !== null && clinicalProviderLocationAvailabilities !== void 0 ? clinicalProviderLocationAvailabilities : [], availability => availability.day)
            };
          }),
          specialties: (_f = (_e = providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.clinicalProvider) === null || _e === void 0 ? void 0 : _e.clinicalProviderSpecialties) === null || _f === void 0 ? void 0 : _f.map(({
            specialty
          }) => ({
            name: specialty === null || specialty === void 0 ? void 0 : specialty.name
          })),
          businessHours: formattedBusinessHours
        }),
        detailView: true,
        formattedDistance: ((_g = providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.distance) !== null && _g !== void 0 ? _g : 0).toFixed(2),
        clinicalProviderLocations: []
      });
      delete formattedData['clinicalProviderLocations'];
      delete formattedData['clinicalProviderSpecialties'];
      return formattedData;
    });
    this.clinicalProviderLocations$ = this.select(s => s.clinicalProviderLocations);
    this.formattedClinicalProviderLocations$ = this.select(this.clinicalProviderLocations$, providerLocations => {
      return providerLocations.map(providerLocation => {
        var _a, _b, _c, _d;
        return Object.assign(Object.assign({}, providerLocation), {
          formattedDistance: ((_a = providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.distance) !== null && _a !== void 0 ? _a : 0).toFixed(2),
          clinicalProvider: Object.assign(Object.assign({}, providerLocation.clinicalProvider), {
            rating: 0,
            specialtiesCount: ((_b = providerLocation.clinicalProvider.clinicalProviderSpecialties) === null || _b === void 0 ? void 0 : _b.length) - 3,
            clinicalProviderSpecialties: (_d = (_c = providerLocation === null || providerLocation === void 0 ? void 0 : providerLocation.clinicalProvider) === null || _c === void 0 ? void 0 : _c.clinicalProviderSpecialties) === null || _d === void 0 ? void 0 : _d.slice(0, 3)
          })
        });
      });
    });
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.locations$ = this.select(s => s.locations || []);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.locationId$ = this.select(s => s.locationId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.providerName$ = this.select(s => s.providerName);
    this.specialties$ = this.select(s => s.specialties);
    this.favorite$ = this.select(s => s.favorite);
    this.locationData$ = this.select(s => s.locationData);
    this.distance$ = this.select(s => s.distance);
    this.centerLocation$ = this.select(s => s.centerLocation);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderLocations$, this.clinicalProviders$, this.locations$, (errors, loading, item, formName, clinicalProviderLocations, clinicalProviders, locations) => ({
      errors,
      loading,
      item,
      formName,
      clinicalProviderLocations,
      clinicalProviders,
      locations
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.clinicalProviderId$, this.locationId$, this.searchQuery$, this.providerName$, this.specialties$, this.favorite$, this.distance$, this.centerLocation$, this.locationData$, (paging, clinicalProviderId, locationId, searchQuery, providerName, specialties, favorite, distance, centerLocation, locationData) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      clinicalProviderId: clinicalProviderId,
      locationId: locationId,
      total: paging.total,
      providerName,
      specialties,
      favorite,
      distance,
      centerLocation,
      locationData
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.setLocationId = this.updater((state, locationId) => Object.assign(Object.assign({}, state), {
      locationId
    }));
    this.setProviderName = this.updater((state, providerName) => Object.assign(Object.assign({}, state), {
      providerName
    }));
    this.setSpecialties = this.updater((state, specialties) => Object.assign(Object.assign({}, state), {
      specialties
    }));
    this.setFavorite = this.updater((state, favorite) => Object.assign(Object.assign({}, state), {
      favorite
    }));
    this.setLocationData = this.updater((state, locationData) => Object.assign(Object.assign({}, state), {
      locationData
    }));
    this.setDistance = this.updater((state, distance) => Object.assign(Object.assign({}, state), {
      distance
    }));
    this.setCenterLocation = this.updater((state, centerLocation) => Object.assign(Object.assign({}, state), {
      centerLocation
    }));
    this.setSkip = this.updater((state, skip) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        skip: skip
      })
    }));
    this.setLimit = this.updater((state, limit) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        limit: limit
      })
    }));
    this.filterClinicalProviders = term => this.data.userSelectClinicalProviders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
      let clinicalProviders = res.data.items;
      this.patchState({
        clinicalProviders
      });
      return clinicalProviders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(result => {
      return result.data.items;
    }));
    this.filterLocations = term => this.data.userSelectLocations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
      let locations = res.data.items;
      this.patchState({
        locations
      });
      return locations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(result => {
      return result.data.items;
    }));
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.addLocation = this.updater((state, location) => Object.assign(Object.assign({}, state), {
      locations: state.locations.concat(location)
    }));
    this.updateClinicalProvider = this.updater((state, clinicalProvider) => {
      var _a;
      return Object.assign(Object.assign({}, state), {
        clinicalProviderLocations: (_a = state.clinicalProviderLocations) === null || _a === void 0 ? void 0 : _a.map(providerLocation => {
          if (clinicalProvider.id === providerLocation.clinicalProviderId) {
            return Object.assign(Object.assign({}, providerLocation), {
              clinicalProvider
            });
          } else {
            return providerLocation;
          }
        })
      });
    });
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewClinicalProviderLocation = this.updater((state, clinicalProviderLocation) => Object.assign(Object.assign({}, state), {
      clinicalProviderLocations: [...state.clinicalProviderLocations, clinicalProviderLocation]
    }));
    this.updateClinicalProviderLocation = this.updater((state, clinicalProviderLocation) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderLocations: state.clinicalProviderLocations.map(el => {
          if (el.id === clinicalProviderLocation.id) {
            return clinicalProviderLocation;
          } else {
            return el;
          }
        })
      });
    });
    this.clear = this.updater(state => Object.assign(Object.assign({}, state), {
      clinicalProviderLocations: []
    }));
    this.addClinicalProviderLocations = this.updater((state, newClinicalProviderLocations) => Object.assign(Object.assign({}, state), {
      clinicalProviderLocations: state.clinicalProviderLocations.concat(newClinicalProviderLocations)
    }));
    this.updateClinicalProviderLocations = this.updater((state, updatedClinicalProviderLocations) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderLocations: state.clinicalProviderLocations.map(clinicalProviderLocation => {
          const updated = updatedClinicalProviderLocations.find(el => el.id === clinicalProviderLocation.id);
          return updated ? updated : clinicalProviderLocation;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadClinicalProviderLocationEffect = this.effect(clinicalProviderLocationId$ => clinicalProviderLocationId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(clinicalProviderLocationId => this.data.userClinicalProviderLocation({
      clinicalProviderLocationId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
      console.log("res.data.item", res.data.item);
      return this.patchState({
        item: res.data.item,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadClinicalProviderLocationsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(([_, input]) => {
      return this.data.userClinicalProviderLocations({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
        return this.patchState({
          paging: {
            limit: input.limit,
            skip: input.skip,
            total: res.data.count.total
          },
          clinicalProviderLocations: input.clinicalProviderId !== 'all' ? res.data.items : [],
          errors: res.errors,
          loading: false
        });
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.createClinicalProviderLocationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(input => this.clinicalProviderLocationService.createClinicalProviderLocation(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(clinicalProviderLocation => {
      this.addNewClinicalProviderLocation(clinicalProviderLocation);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderLocation,
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
    this.updateClinicalProviderLocationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(([input, item]) => this.clinicalProviderLocationService.updateClinicalProviderLocation(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(clinicalProviderLocation => {
      this.updateClinicalProviderLocation(clinicalProviderLocation);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderLocation,
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
    this.deleteClinicalProviderLocationEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(([_, clinicalProviderLocation]) => {
      return this.data.userDeleteClinicalProviderLocation({
        clinicalProviderLocationId: clinicalProviderLocation.id
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
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
    this.importExcelEffect = this.effect($data => $data.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(data => this.clinicalProviderLocationService.importClinicalProviderLocations(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => {
      var _a;
      this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
        duration: 3000
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_8__.EMPTY;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(updateResult => {
      const created = JSON.parse(updateResult.created);
      const updated = JSON.parse(updateResult.updated);
      const failed = JSON.parse(updateResult.failed);
      const total = created.length + updated.length + failed.length;
      this.addClinicalProviderLocations(created);
      this.updateClinicalProviderLocations(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('clinicalProviderLocationId')) {
      this.setFormName('clinicalProviderLocation_edit');
    } else {
      this.setFormName('clinicalProviderLocation_create');
    }
    if (this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId");
      this.setClinicalProviderId(clinicalProviderId);
    }
    if (this.route.snapshot.paramMap.has("locationId")) {
      var locationId = this.route.snapshot.paramMap.get("locationId");
      this.setLocationId(locationId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(vm => {
      return this.clinicalProviderLocationService.validateClinicalProviderLocationExcelData(excelData, vm.clinicalProviders, vm.locations);
    }));
  }
}
WebClinicalProviderLocationFeatureStore.ɵfac = function WebClinicalProviderLocationFeatureStore_Factory(t) {
  return new (t || WebClinicalProviderLocationFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_10__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_12__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_13__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_clinical_provider_location_service__WEBPACK_IMPORTED_MODULE_14__.ClinicalProviderLocationService));
};
WebClinicalProviderLocationFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
  token: WebClinicalProviderLocationFeatureStore,
  factory: WebClinicalProviderLocationFeatureStore.ɵfac
});

/***/ }),

/***/ 12189:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/rules/clinical-provider-location-name-is-valid.rule.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderLocationNameIsValidRule": () => (/* binding */ ClinicalProviderLocationNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ClinicalProviderLocationNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 58399:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-location/shared/rules/create-clinical-provider-location-input-is-valid.rule.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderLocationInputIsValidRule": () => (/* binding */ CreateClinicalProviderLocationInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _clinical_provider_location_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-location-name-is-valid.rule */ 12189);


class CreateClinicalProviderLocationInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _clinical_provider_location_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderLocationNameIsValidRule('name', 'The clinicalproviderlocation name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);