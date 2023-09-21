"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_vendor-location_shared_vendor-location_store_ts-libs_web_vendor-location_ui_-9b97fd"],{

/***/ 524274:
/*!**********************************************************************************!*\
  !*** ./libs/web/vendor-location/shared/actions/create-vendor-location.action.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateVendorLocationAction": () => (/* binding */ CreateVendorLocationAction)
/* harmony export */ });
/* harmony import */ var _vendor_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor-location.business-action-base */ 745273);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_vendor_location_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-vendor-location-input-is-valid.rule */ 603238);




class CreateVendorLocationAction extends _vendor_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__.VendorLocationBusinessActionBase {
  constructor(input) {
    super('CreateVendorLocationAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_vendor_location_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateVendorLocationInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateVendorLocation({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 428096:
/*!***********************************************************************************!*\
  !*** ./libs/web/vendor-location/shared/actions/update-vendor-locations.action.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateVendorLocationAction": () => (/* binding */ UpdateVendorLocationAction),
/* harmony export */   "UpdateVendorLocationsAction": () => (/* binding */ UpdateVendorLocationsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _vendor_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor-location.business-action-base */ 745273);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateVendorLocationsAction extends _vendor_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__.VendorLocationBusinessActionBase {
  constructor(vendorLocations) {
    super('UpdateVendorLocationsAction');
    this.vendorLocations = vendorLocations;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.vendorLocations, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateVendorLocations({
      input: {
        vendorLocations: this.vendorLocations
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateVendorLocationAction extends _vendor_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__.VendorLocationBusinessActionBase {
  constructor(vendorLocation, vendorLocationId) {
    super('UpdateVendorLocationAction');
    this.vendorLocation = vendorLocation;
    this.vendorLocationId = vendorLocationId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.vendorLocation, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.vendorLocationId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateVendorLocation({
      vendorLocationId: this.vendorLocationId,
      input: this.vendorLocation
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 937376:
/*!***********************************************************************************************!*\
  !*** ./libs/web/vendor-location/shared/actions/validate-vendor-location-excel-data.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateVendorLocationExcelDataAction": () => (/* binding */ ValidateVendorLocationExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _vendor_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor-location.business-action-base */ 745273);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateVendorLocationExcelDataAction extends _vendor_location_business_action_base__WEBPACK_IMPORTED_MODULE_1__.VendorLocationBusinessActionBase {
  constructor(excelData, locations, vendors) {
    super('ValidateVendorLocationExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.locations = locations;
    this.vendors = vendors;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`locationName_${index}_is_valid}`, "Location Is Not Valid", 'location.name', datum['location'], this.locations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true));
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

/***/ 745273:
/*!*****************************************************************************************!*\
  !*** ./libs/web/vendor-location/shared/actions/vendor-location.business-action-base.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VendorLocationBusinessActionBase": () => (/* binding */ VendorLocationBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class VendorLocationBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 603238:
/*!*********************************************************************************************!*\
  !*** ./libs/web/vendor-location/shared/rules/create-vendor-location-input-is-valid.rule.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateVendorLocationInputIsValidRule": () => (/* binding */ CreateVendorLocationInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _vendor_location_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor-location-name-is-valid.rule */ 591446);


class CreateVendorLocationInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _vendor_location_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.VendorLocationNameIsValidRule('name', 'The vendorlocation name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 591446:
/*!*************************************************************************************!*\
  !*** ./libs/web/vendor-location/shared/rules/vendor-location-name-is-valid.rule.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VendorLocationNameIsValidRule": () => (/* binding */ VendorLocationNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class VendorLocationNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 35271:
/*!**************************************************************************************!*\
  !*** ./libs/web/vendor-location/shared/vendor-location.business-provider.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VendorLocationBusinessProviderService": () => (/* binding */ VendorLocationBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_vendor_location_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-vendor-location-excel-data.action */ 937376);
/* harmony import */ var _actions_create_vendor_location_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-vendor-location.action */ 524274);
/* harmony import */ var _actions_update_vendor_locations_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-vendor-locations.action */ 428096);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class VendorLocationBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.VendorLocationBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createVendorLocation(input) {
    const action = new _actions_create_vendor_location_action__WEBPACK_IMPORTED_MODULE_2__.CreateVendorLocationAction(input);
    action.Do(this);
    return action.response;
  }
  updateVendorLocation(input, vendorLocationId) {
    const action = new _actions_update_vendor_locations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateVendorLocationAction(input, vendorLocationId);
    action.Do(this);
    return action.response;
  }
  importVendorLocations(vendorLocations) {
    const updateVendorLocationsAction = new _actions_update_vendor_locations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateVendorLocationsAction(vendorLocations);
    updateVendorLocationsAction.Do(this);
    return updateVendorLocationsAction.response;
  }
  validateVendorLocationExcelData(excelData, locations, vendors) {
    const validateVendorLocationExcelDataAction = new _actions_validate_vendor_location_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateVendorLocationExcelDataAction(excelData, locations, vendors);
    validateVendorLocationExcelDataAction.Do(this);
    return validateVendorLocationExcelDataAction.response;
  }
}
VendorLocationBusinessProviderService.ɵfac = function VendorLocationBusinessProviderService_Factory(t) {
  return new (t || VendorLocationBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
VendorLocationBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: VendorLocationBusinessProviderService,
  factory: VendorLocationBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 717148:
/*!********************************************************************!*\
  !*** ./libs/web/vendor-location/shared/vendor-location.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VendorLocationService": () => (/* binding */ VendorLocationService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _vendor_location_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vendor-location.business-provider.service */ 35271);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class VendorLocationService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("VendorLocationService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createVendorLocation(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createVendorLocation(filteredObj);
  }
  updateVendorLocation(input, vendorLocationId) {
    return this.businessProvider.updateVendorLocation(input, vendorLocationId);
  }
  importVendorLocations(vendorLocations) {
    return this.businessProvider.importVendorLocations(vendorLocations);
  }
  validateVendorLocationExcelData(excelData, locations, vendors) {
    return this.businessProvider.validateVendorLocationExcelData(excelData, locations, vendors);
  }
}
VendorLocationService.ɵfac = function VendorLocationService_Factory(t) {
  return new (t || VendorLocationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_vendor_location_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.VendorLocationBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_vendor_location_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.VendorLocationBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
VendorLocationService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: VendorLocationService,
  factory: VendorLocationService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 842848:
/*!******************************************************************!*\
  !*** ./libs/web/vendor-location/shared/vendor-location.store.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebVendorLocationFeatureStore": () => (/* binding */ WebVendorLocationFeatureStore)
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
/* harmony import */ var _vendor_location_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./vendor-location.service */ 717148);














class WebVendorLocationFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, vendorLocationService) {
    super({
      loading: false,
      vendorLocations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      locationId: undefined,
      vendorId: undefined,
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
    this.vendorLocationService = vendorLocationService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.vendorLocations$ = this.select(s => s.vendorLocations);
    this.locations$ = this.select(s => s.locations || []);
    this.vendors$ = this.select(s => s.vendors || []);
    this.locationId$ = this.select(s => s.locationId);
    this.vendorId$ = this.select(s => s.vendorId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.vendorLocations$, this.locations$, this.vendors$, (errors, loading, item, formName, vendorLocations, locations, vendors) => ({
      errors,
      loading,
      item,
      formName,
      vendorLocations,
      locations,
      vendors
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.locationId$, this.vendorId$, this.searchQuery$, (paging, locationId, vendorId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      locationId: locationId,
      vendorId: vendorId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLocationId = this.updater((state, locationId) => Object.assign(Object.assign({}, state), {
      locationId
    }));
    this.setVendorId = this.updater((state, vendorId) => Object.assign(Object.assign({}, state), {
      vendorId
    }));
    this.filterLocations = term => this.data.userSelectLocations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let locations = res.data.items;
      this.patchState({
        locations
      });
      return locations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterVendors = term => this.data.userSelectVendors({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let vendors = res.data.items;
      this.patchState({
        vendors
      });
      return vendors;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addLocation = this.updater((state, location) => Object.assign(Object.assign({}, state), {
      locations: state.locations.concat(location)
    }));
    this.addVendor = this.updater((state, vendor) => Object.assign(Object.assign({}, state), {
      vendors: state.vendors.concat(vendor)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewVendorLocation = this.updater((state, vendorLocation) => Object.assign(Object.assign({}, state), {
      vendorLocations: [...state.vendorLocations, vendorLocation]
    }));
    this.updateVendorLocation = this.updater((state, vendorLocation) => {
      return Object.assign(Object.assign({}, state), {
        vendorLocations: state.vendorLocations.map(el => {
          if (el.id === vendorLocation.id) {
            return vendorLocation;
          } else {
            return el;
          }
        })
      });
    });
    this.addVendorLocations = this.updater((state, newVendorLocations) => Object.assign(Object.assign({}, state), {
      vendorLocations: state.vendorLocations.concat(newVendorLocations)
    }));
    this.updateVendorLocations = this.updater((state, updatedVendorLocations) => {
      return Object.assign(Object.assign({}, state), {
        vendorLocations: state.vendorLocations.map(vendorLocation => {
          const updated = updatedVendorLocations.find(el => el.id === vendorLocation.id);
          return updated ? updated : vendorLocation;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadVendorLocationEffect = this.effect(vendorLocationId$ => vendorLocationId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vendorLocationId => this.data.userVendorLocation({
      vendorLocationId
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
    this.loadVendorLocationsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userVendorLocations({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      vendorLocations: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createVendorLocationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.vendorLocationService.createVendorLocation(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(vendorLocation => {
      this.addNewVendorLocation(vendorLocation);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: vendorLocation,
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
    this.updateVendorLocationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.vendorLocationService.updateVendorLocation(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(vendorLocation => {
      this.updateVendorLocation(vendorLocation);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: vendorLocation,
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
    this.deleteVendorLocationEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, vendorLocation]) => {
      return this.data.userDeleteVendorLocation({
        vendorLocationId: vendorLocation.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.vendorLocationService.importVendorLocations(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addVendorLocations(created);
      this.updateVendorLocations(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('vendorLocationId')) {
      var vendorLocationId = this.route.snapshot.paramMap.get('vendorLocationId');
      this.setFormName('vendorLocation_edit');
    } else {
      this.setFormName('vendorLocation_create');
    }
    if (this.route.snapshot.paramMap.has("locationId")) {
      var locationId = this.route.snapshot.paramMap.get("locationId");
      this.setLocationId(locationId);
    }
    if (this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId");
      this.setVendorId(vendorId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.vendorLocationService.validateVendorLocationExcelData(excelData, vm.locations, vm.vendors);
    }));
  }
}
WebVendorLocationFeatureStore.ɵfac = function WebVendorLocationFeatureStore_Factory(t) {
  return new (t || WebVendorLocationFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_vendor_location_service__WEBPACK_IMPORTED_MODULE_12__.VendorLocationService));
};
WebVendorLocationFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebVendorLocationFeatureStore,
  factory: WebVendorLocationFeatureStore.ɵfac
});

/***/ }),

/***/ 682079:
/*!************************************************************************************************************************!*\
  !*** ./libs/web/vendor-location/ui/web-vendor-location-select-form/web-vendor-location-select-table-view.component.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebVendorLocationSelectTableViewComponent": () => (/* binding */ WebVendorLocationSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebVendorLocationSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.vendorLocations = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'vendor.name',
      headerName: 'Vendor',
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
      field: 'locationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'vendorId',
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
WebVendorLocationSelectTableViewComponent.ɵfac = function WebVendorLocationSelectTableViewComponent_Factory(t) {
  return new (t || WebVendorLocationSelectTableViewComponent)();
};
WebVendorLocationSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebVendorLocationSelectTableViewComponent,
  selectors: [["ui-vendor-location-select-table-view"]],
  viewQuery: function WebVendorLocationSelectTableViewComponent_Query(rf, ctx) {
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
    vendorLocations: "vendorLocations"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebVendorLocationSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebVendorLocationSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebVendorLocationSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.vendorLocations)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);