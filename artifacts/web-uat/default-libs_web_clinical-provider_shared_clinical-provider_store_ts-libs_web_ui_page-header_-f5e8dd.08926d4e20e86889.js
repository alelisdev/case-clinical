"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_clinical-provider_shared_clinical-provider_store_ts-libs_web_ui_page-header_-f5e8dd"],{

/***/ 419992:
/*!*********************************************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/actions/clinical-provider.business-action-base.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderBusinessActionBase": () => (/* binding */ ClinicalProviderBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ClinicalProviderBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 479425:
/*!**************************************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/actions/create-clinical-provider.action.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderAction": () => (/* binding */ CreateClinicalProviderAction)
/* harmony export */ });
/* harmony import */ var _clinical_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider.business-action-base */ 419992);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_clinical_provider_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-clinical-provider-input-is-valid.rule */ 578986);




class CreateClinicalProviderAction extends _clinical_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderBusinessActionBase {
  constructor(input) {
    super('CreateClinicalProviderAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_clinical_provider_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProvider({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 872195:
/*!***************************************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/actions/update-clinical-providers.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateClinicalProviderAction": () => (/* binding */ UpdateClinicalProviderAction),
/* harmony export */   "UpdateClinicalProvidersAction": () => (/* binding */ UpdateClinicalProvidersAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider.business-action-base */ 419992);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateClinicalProvidersAction extends _clinical_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderBusinessActionBase {
  constructor(clinicalProviders) {
    super('UpdateClinicalProvidersAction');
    this.clinicalProviders = clinicalProviders;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviders, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviders({
      input: {
        clinicalProviders: this.clinicalProviders
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateClinicalProviderAction extends _clinical_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderBusinessActionBase {
  constructor(clinicalProvider, clinicalProviderId) {
    super('UpdateClinicalProviderAction');
    this.clinicalProvider = clinicalProvider;
    this.clinicalProviderId = clinicalProviderId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProvider, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.clinicalProviderId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProvider({
      clinicalProviderId: this.clinicalProviderId,
      input: this.clinicalProvider
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 688266:
/*!***************************************************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/actions/validate-clinical-provider-excel-data.action.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateClinicalProviderExcelDataAction": () => (/* binding */ ValidateClinicalProviderExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider.business-action-base */ 419992);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateClinicalProviderExcelDataAction extends _clinical_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderBusinessActionBase {
  constructor(excelData, vendors) {
    super('ValidateClinicalProviderExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.vendors = vendors;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
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

/***/ 136909:
/*!******************************************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/clinical-provider.business-provider.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderBusinessProviderService": () => (/* binding */ ClinicalProviderBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_clinical_provider_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-clinical-provider-excel-data.action */ 688266);
/* harmony import */ var _actions_create_clinical_provider_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-clinical-provider.action */ 479425);
/* harmony import */ var _actions_update_clinical_providers_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-clinical-providers.action */ 872195);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ClinicalProviderBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ClinicalProviderBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createClinicalProvider(input) {
    const action = new _actions_create_clinical_provider_action__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderAction(input);
    action.Do(this);
    return action.response;
  }
  updateClinicalProvider(input, clinicalProviderId) {
    const action = new _actions_update_clinical_providers_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderAction(input, clinicalProviderId);
    action.Do(this);
    return action.response;
  }
  importClinicalProviders(clinicalProviders) {
    const updateClinicalProvidersAction = new _actions_update_clinical_providers_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProvidersAction(clinicalProviders);
    updateClinicalProvidersAction.Do(this);
    return updateClinicalProvidersAction.response;
  }
  validateClinicalProviderExcelData(excelData, vendors) {
    const validateClinicalProviderExcelDataAction = new _actions_validate_clinical_provider_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateClinicalProviderExcelDataAction(excelData, vendors);
    validateClinicalProviderExcelDataAction.Do(this);
    return validateClinicalProviderExcelDataAction.response;
  }
}
ClinicalProviderBusinessProviderService.ɵfac = function ClinicalProviderBusinessProviderService_Factory(t) {
  return new (t || ClinicalProviderBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ClinicalProviderBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ClinicalProviderBusinessProviderService,
  factory: ClinicalProviderBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 866163:
/*!************************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/clinical-provider.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderService": () => (/* binding */ ClinicalProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _clinical_provider_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clinical-provider.business-provider.service */ 136909);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ClinicalProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ClinicalProviderService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createClinicalProvider(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createClinicalProvider(filteredObj);
  }
  updateClinicalProvider(input, clinicalProviderId) {
    return this.businessProvider.updateClinicalProvider(input, clinicalProviderId);
  }
  importClinicalProviders(clinicalProviders) {
    return this.businessProvider.importClinicalProviders(clinicalProviders);
  }
  validateClinicalProviderExcelData(excelData, vendors) {
    return this.businessProvider.validateClinicalProviderExcelData(excelData, vendors);
  }
}
ClinicalProviderService.ɵfac = function ClinicalProviderService_Factory(t) {
  return new (t || ClinicalProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ClinicalProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ClinicalProviderService,
  factory: ClinicalProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 19494:
/*!**********************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/clinical-provider.store.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderFeatureStore": () => (/* binding */ WebClinicalProviderFeatureStore)
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
/* harmony import */ var _clinical_provider_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./clinical-provider.service */ 866163);














class WebClinicalProviderFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, clinicalProviderService) {
    super({
      loading: false,
      clinicalProviders: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      vendorId: undefined,
      specialtyFilterParam: [],
      serviceFilterParam: [],
      clinicalProvidersSpecial: [],
      clinicalProviderLocations: [],
      clinicalProviderId: undefined,
      clinicalProviderLocationId: undefined,
      paging: {
        limit: 10000,
        skip: 0
      },
      locationFilterParam: [],
      distance: undefined,
      isDoctorsPage: false
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.formService = formService;
    this.clinicalProviderService = clinicalProviderService;
    this.errors$ = this.select(s => s.errors);
    this.favorites$ = this.select(s => s.favorites);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders);
    this.specialtyFilterParam$ = this.select(s => s.specialtyFilterParam);
    this.serviceFilterParam$ = this.select(s => s.serviceFilterParam);
    this.vendors$ = this.select(s => s.vendors || []);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.clinicalProviderLocationId$ = this.select(s => s.clinicalProviderLocationId);
    this.locationId$ = this.select(s => s.locationId);
    this.clinicalProvidersSpecial$ = this.select(s => s.clinicalProvidersSpecial);
    this.clinicalProviderLocations$ = this.select(s => s.clinicalProviderLocations);
    this.vendorId$ = this.select(s => s.vendorId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.locationFilterParam$ = this.select(s => s.locationFilterParam);
    this.distance$ = this.select(s => s.distance);
    this.isDoctorsPage$ = this.select(s => s.isDoctorsPage);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviders$, this.vendors$, (errors, loading, item, formName, clinicalProviders, vendors) => ({
      errors,
      loading,
      item,
      formName,
      clinicalProviders,
      vendors
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.vendorId$, this.searchQuery$, this.specialtyFilterParam$, this.serviceFilterParam$, this.clinicalProviderId$, this.clinicalProviderLocationId$, this.locationFilterParam$, this.distance$, this.isDoctorsPage$, this.favorites$, (paging, vendorId, searchQuery, specialtyFilterParam, serviceFilterParam, clinicalProviderId, clinicalProviderLocationId, locationFilterParam, distance, isDoctorsPage, favorites) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      vendorId: vendorId,
      specialites: specialtyFilterParam,
      services: serviceFilterParam,
      total: paging.total,
      clinicalProviderId: clinicalProviderId,
      clinicalProviderLocationId: clinicalProviderLocationId,
      centerLocation: locationFilterParam,
      distance: distance,
      isDoctorsPage: isDoctorsPage,
      favorites
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.setClinicalProviderLocationId = this.updater((state, clinicalProviderLocationId) => Object.assign(Object.assign({}, state), {
      clinicalProviderLocationId
    }));
    this.setLocationId = this.updater((state, locationId) => Object.assign(Object.assign({}, state), {
      locationId
    }));
    this.setFavorites = this.updater((state, favorites) => Object.assign(Object.assign({}, state), {
      favorites
    }));
    this.setSpecialtyFilterParam = this.updater((state, specialtyFilterParam) => Object.assign(Object.assign({}, state), {
      specialtyFilterParam
    }));
    this.setServiceFilterParam = this.updater((state, serviceFilterParam) => Object.assign(Object.assign({}, state), {
      serviceFilterParam
    }));
    this.setLocationFilterParam = this.updater((state, locationFilterParam) => Object.assign(Object.assign({}, state), {
      locationFilterParam
    }));
    this.setDistance = this.updater((state, distance) => Object.assign(Object.assign({}, state), {
      distance
    }));
    this.setVendorId = this.updater((state, vendorId) => Object.assign(Object.assign({}, state), {
      vendorId
    }));
    this.setIsDoctorsPage = this.updater((state, isDoctorsPage) => Object.assign(Object.assign({}, state), {
      isDoctorsPage
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
    this.filterVendors = term => this.data.userSelectVendors({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const vendors = res.data.items;
      this.patchState({
        vendors
      });
      return vendors;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addVendor = this.updater((state, vendor) => Object.assign(Object.assign({}, state), {
      vendors: state.vendors.concat(vendor)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: [...state.clinicalProviders, clinicalProvider]
    }));
    this.removeClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.filter(el => el.id !== clinicalProvider.id)
    }));
    this.updateClinicalProvider = this.updater((state, clinicalProvider) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviders: state.clinicalProviders.map(el => {
          if (el.id === clinicalProvider.id) {
            return clinicalProvider;
          } else {
            return el;
          }
        })
      });
    });
    this.addClinicalProviders = this.updater((state, newClinicalProviders) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(newClinicalProviders)
    }));
    this.updateClinicalProviders = this.updater((state, updatedClinicalProviders) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviders: state.clinicalProviders.map(clinicalProvider => {
          const updated = updatedClinicalProviders.find(el => el.id === clinicalProvider.id);
          return updated ? updated : clinicalProvider;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadClinicalProviderEffect = this.effect(clinicalProviderId$ => clinicalProviderId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(clinicalProviderId => this.data.userClinicalProvider({
      clinicalProviderId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      return this.patchState({
        item: res.data.item,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadClinicalProvidersEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => {
      console.log("input", input);
      return this.data.userClinicalProviders({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        var _a;
        const customclinicalProviderLocations = [];
        (_a = res.data.items) === null || _a === void 0 ? void 0 : _a.map(item => {
          var _a;
          (_a = item.clinicalProviderLocations) === null || _a === void 0 ? void 0 : _a.forEach(row => {
            var _a, _b, _c;
            customclinicalProviderLocations.push({
              latitude: (_a = row.location) === null || _a === void 0 ? void 0 : _a.latitude,
              longitude: (_b = row.location) === null || _b === void 0 ? void 0 : _b.longitude,
              id: row.id,
              name: (_c = row.location) === null || _c === void 0 ? void 0 : _c.name,
              clinicalProvider: item,
              location: row.location
            });
          });
        });
        return this.patchState({
          paging: {
            limit: input.limit,
            skip: input.skip,
            total: res.data.count.total
          },
          clinicalProviders: res.data.items,
          clinicalProviderLocations: customclinicalProviderLocations,
          errors: res.errors,
          loading: false
        });
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.loadClinicalProvidersSpecialEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => {
      return this.data.userClinicalProviders({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
        paging: {
          limit: input.limit,
          skip: input.skip,
          total: res.data.count.total
        },
        clinicalProvidersSpecial: res.data.items,
        errors: res.errors,
        loading: false
      }), errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.createClinicalProviderEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.clinicalProviderService.createClinicalProvider(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProvider => {
      this.addNewClinicalProvider(clinicalProvider);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProvider,
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
    this.updateClinicalProviderEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.clinicalProviderService.updateClinicalProvider(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProvider => {
      this.updateClinicalProvider(clinicalProvider);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProvider,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false
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
    this.deleteClinicalProviderEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, clinicalProvider]) => {
      return this.data.userDeleteClinicalProvider({
        clinicalProviderId: clinicalProvider.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.clinicalProviderService.importClinicalProviders(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addClinicalProviders(created);
      this.updateClinicalProviders(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('clinicalProviderId')) {
      this.setFormName('clinicalProvider_edit');
    } else {
      this.setFormName('clinicalProvider_create');
    }
    if (this.route.snapshot.paramMap.has("vendorId")) {
      const vendorId = this.route.snapshot.paramMap.get("vendorId");
      this.setVendorId(vendorId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.clinicalProviderService.validateClinicalProviderExcelData(excelData, vm.vendors);
    }));
  }
}
WebClinicalProviderFeatureStore.ɵfac = function WebClinicalProviderFeatureStore_Factory(t) {
  return new (t || WebClinicalProviderFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_clinical_provider_service__WEBPACK_IMPORTED_MODULE_12__.ClinicalProviderService));
};
WebClinicalProviderFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebClinicalProviderFeatureStore,
  factory: WebClinicalProviderFeatureStore.ɵfac
});

/***/ }),

/***/ 752938:
/*!*****************************************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/rules/clinical-provider-name-is-valid.rule.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderNameIsValidRule": () => (/* binding */ ClinicalProviderNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ClinicalProviderNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 578986:
/*!*************************************************************************************************!*\
  !*** ./libs/web/clinical-provider/shared/rules/create-clinical-provider-input-is-valid.rule.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderInputIsValidRule": () => (/* binding */ CreateClinicalProviderInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _clinical_provider_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-name-is-valid.rule */ 752938);


class CreateClinicalProviderInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _clinical_provider_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderNameIsValidRule('name', 'The clinicalprovider name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 586477:
/*!*************************************************************************!*\
  !*** ./libs/web/ui/page-header/src/lib/web-ui-page-header.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPageHeaderComponent": () => (/* binding */ WebUiPageHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../button/src/lib/web-ui-button.component */ 797800);




function WebUiPageHeaderComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showLeftArrowIcon", true);
  }
}
function WebUiPageHeaderComponent_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
function WebUiPageHeaderComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiPageHeaderComponent_ng_container_4_ng_container_1_Template, 1, 0, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.controls);
  }
}
function WebUiPageHeaderComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", ctx_r2.linkTitle)("link", ctx_r2.linkPath);
  }
}
class WebUiPageHeaderComponent {}
WebUiPageHeaderComponent.ɵfac = function WebUiPageHeaderComponent_Factory(t) {
  return new (t || WebUiPageHeaderComponent)();
};
WebUiPageHeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiPageHeaderComponent,
  selectors: [["ui-page-header"]],
  inputs: {
    title: "title",
    linkPath: "linkPath",
    linkTitle: "linkTitle",
    showBackButton: "showBackButton",
    controls: "controls"
  },
  decls: 6,
  vars: 4,
  consts: [[1, "flex", "items-center", "px-6", "py-3", "border-b", "dark:border-gray-700", "border-gray-200", "dark:text-gray-100"], [4, "ngIf"], [1, "text-lg", "font-medium", "text-gray-900", "dark:text-gray-100"], ["link", "..", "label", "Back", "variant", "white", 1, "mr-4", 3, "showLeftArrowIcon"], [4, "ngTemplateOutlet"], [1, "ml-auto", 3, "label", "link"]],
  template: function WebUiPageHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiPageHeaderComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WebUiPageHeaderComponent_ng_container_4_Template, 2, 1, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUiPageHeaderComponent_ng_container_5_Template, 2, 2, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showBackButton);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.title, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.controls);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.linkTitle && ctx.linkPath);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet, _button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonComponent],
  encapsulation: 2
});

/***/ }),

/***/ 752707:
/*!**********************************************************************!*\
  !*** ./libs/web/ui/page-header/src/lib/web-ui-page-header.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPageHeaderModule": () => (/* binding */ WebUiPageHeaderModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _web_ui_page_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-ui-page-header.component */ 586477);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class WebUiPageHeaderModule {}
WebUiPageHeaderModule.ɵfac = function WebUiPageHeaderModule_Factory(t) {
  return new (t || WebUiPageHeaderModule)();
};
WebUiPageHeaderModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiPageHeaderModule
});
WebUiPageHeaderModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiPageHeaderModule, {
    declarations: [_web_ui_page_header_component__WEBPACK_IMPORTED_MODULE_4__.WebUiPageHeaderComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule],
    exports: [_web_ui_page_header_component__WEBPACK_IMPORTED_MODULE_4__.WebUiPageHeaderComponent]
  });
})();

/***/ })

}]);