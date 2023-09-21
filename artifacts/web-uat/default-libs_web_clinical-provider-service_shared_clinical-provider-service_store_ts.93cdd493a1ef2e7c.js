"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_clinical-provider-service_shared_clinical-provider-service_store_ts"],{

/***/ 186882:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/actions/clinical-provider-service.business-action-base.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderServiceBusinessActionBase": () => (/* binding */ ClinicalProviderServiceBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ClinicalProviderServiceBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 379451:
/*!******************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/actions/create-clinical-provider-service.action.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderServiceAction": () => (/* binding */ CreateClinicalProviderServiceAction)
/* harmony export */ });
/* harmony import */ var _clinical_provider_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-service.business-action-base */ 186882);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_clinical_provider_service_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-clinical-provider-service-input-is-valid.rule */ 328602);




class CreateClinicalProviderServiceAction extends _clinical_provider_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderServiceBusinessActionBase {
  constructor(input) {
    super('CreateClinicalProviderServiceAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_clinical_provider_service_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderServiceInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderService({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 175514:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/actions/update-clinical-provider-services.action.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateClinicalProviderServiceAction": () => (/* binding */ UpdateClinicalProviderServiceAction),
/* harmony export */   "UpdateClinicalProviderServicesAction": () => (/* binding */ UpdateClinicalProviderServicesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-service.business-action-base */ 186882);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateClinicalProviderServicesAction extends _clinical_provider_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderServiceBusinessActionBase {
  constructor(clinicalProviderServices) {
    super('UpdateClinicalProviderServicesAction');
    this.clinicalProviderServices = clinicalProviderServices;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderServices, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderServices({
      input: {
        clinicalProviderServices: this.clinicalProviderServices
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateClinicalProviderServiceAction extends _clinical_provider_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderServiceBusinessActionBase {
  constructor(clinicalProviderService, clinicalProviderServiceId) {
    super('UpdateClinicalProviderServiceAction');
    this.clinicalProviderService = clinicalProviderService;
    this.clinicalProviderServiceId = clinicalProviderServiceId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderService, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.clinicalProviderServiceId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderService({
      clinicalProviderServiceId: this.clinicalProviderServiceId,
      input: this.clinicalProviderService
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 19417:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/actions/validate-clinical-provider-service-excel-data.action.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateClinicalProviderServiceExcelDataAction": () => (/* binding */ ValidateClinicalProviderServiceExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-service.business-action-base */ 186882);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateClinicalProviderServiceExcelDataAction extends _clinical_provider_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderServiceBusinessActionBase {
  constructor(excelData, services, clinicalProviders) {
    super('ValidateClinicalProviderServiceExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.services = services;
    this.clinicalProviders = clinicalProviders;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`serviceName_${index}_is_valid}`, "Service Is Not Valid", 'service.name', datum['service'], this.services, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true));
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

/***/ 799842:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/clinical-provider-service.business-provider.service.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderServiceBusinessProviderService": () => (/* binding */ ClinicalProviderServiceBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_clinical_provider_service_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-clinical-provider-service-excel-data.action */ 19417);
/* harmony import */ var _actions_create_clinical_provider_service_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-clinical-provider-service.action */ 379451);
/* harmony import */ var _actions_update_clinical_provider_services_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-clinical-provider-services.action */ 175514);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ClinicalProviderServiceBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ClinicalProviderServiceBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createClinicalProviderService(input) {
    const action = new _actions_create_clinical_provider_service_action__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderServiceAction(input);
    action.Do(this);
    return action.response;
  }
  updateClinicalProviderService(input, clinicalProviderServiceId) {
    const action = new _actions_update_clinical_provider_services_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderServiceAction(input, clinicalProviderServiceId);
    action.Do(this);
    return action.response;
  }
  importClinicalProviderServices(clinicalProviderServices) {
    const updateClinicalProviderServicesAction = new _actions_update_clinical_provider_services_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderServicesAction(clinicalProviderServices);
    updateClinicalProviderServicesAction.Do(this);
    return updateClinicalProviderServicesAction.response;
  }
  validateClinicalProviderServiceExcelData(excelData, services, clinicalProviders) {
    const validateClinicalProviderServiceExcelDataAction = new _actions_validate_clinical_provider_service_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateClinicalProviderServiceExcelDataAction(excelData, services, clinicalProviders);
    validateClinicalProviderServiceExcelDataAction.Do(this);
    return validateClinicalProviderServiceExcelDataAction.response;
  }
}
ClinicalProviderServiceBusinessProviderService.ɵfac = function ClinicalProviderServiceBusinessProviderService_Factory(t) {
  return new (t || ClinicalProviderServiceBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ClinicalProviderServiceBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ClinicalProviderServiceBusinessProviderService,
  factory: ClinicalProviderServiceBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 989980:
/*!****************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/clinical-provider-service.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderServiceService": () => (/* binding */ ClinicalProviderServiceService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _clinical_provider_service_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clinical-provider-service.business-provider.service */ 799842);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ClinicalProviderServiceService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ClinicalProviderServiceService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createClinicalProviderService(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createClinicalProviderService(filteredObj);
  }
  updateClinicalProviderService(input, clinicalProviderServiceId) {
    return this.businessProvider.updateClinicalProviderService(input, clinicalProviderServiceId);
  }
  importClinicalProviderServices(clinicalProviderServices) {
    return this.businessProvider.importClinicalProviderServices(clinicalProviderServices);
  }
  validateClinicalProviderServiceExcelData(excelData, services, clinicalProviders) {
    return this.businessProvider.validateClinicalProviderServiceExcelData(excelData, services, clinicalProviders);
  }
}
ClinicalProviderServiceService.ɵfac = function ClinicalProviderServiceService_Factory(t) {
  return new (t || ClinicalProviderServiceService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_service_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderServiceBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_service_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderServiceBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ClinicalProviderServiceService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ClinicalProviderServiceService,
  factory: ClinicalProviderServiceService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 903534:
/*!**************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/clinical-provider-service.store.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderServiceFeatureStore": () => (/* binding */ WebClinicalProviderServiceFeatureStore)
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
/* harmony import */ var _clinical_provider_service_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./clinical-provider-service.service */ 989980);














class WebClinicalProviderServiceFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, clinicalProviderServiceService) {
    super({
      loading: false,
      clinicalProviderServices: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      serviceId: undefined,
      clinicalProviderId: undefined,
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
    this.clinicalProviderServiceService = clinicalProviderServiceService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.clinicalProviderServices$ = this.select(s => s.clinicalProviderServices);
    this.services$ = this.select(s => s.services || []);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.serviceId$ = this.select(s => s.serviceId);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderServices$, this.services$, this.clinicalProviders$, (errors, loading, item, formName, clinicalProviderServices, services, clinicalProviders) => ({
      errors,
      loading,
      item,
      formName,
      clinicalProviderServices,
      services,
      clinicalProviders
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.serviceId$, this.clinicalProviderId$, this.searchQuery$, (paging, serviceId, clinicalProviderId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      serviceId: serviceId,
      clinicalProviderId: clinicalProviderId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setServiceId = this.updater((state, serviceId) => Object.assign(Object.assign({}, state), {
      serviceId
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.filterServices = term => this.data.userSelectServices({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let services = res.data.items;
      this.patchState({
        services
      });
      return services;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterClinicalProviders = term => this.data.userSelectClinicalProviders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let clinicalProviders = res.data.items;
      this.patchState({
        clinicalProviders
      });
      return clinicalProviders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addService = this.updater((state, service) => Object.assign(Object.assign({}, state), {
      services: state.services.concat(service)
    }));
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewClinicalProviderService = this.updater((state, clinicalProviderService) => Object.assign(Object.assign({}, state), {
      clinicalProviderServices: [...state.clinicalProviderServices, clinicalProviderService]
    }));
    this.updateClinicalProviderService = this.updater((state, clinicalProviderService) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderServices: state.clinicalProviderServices.map(el => {
          if (el.id === clinicalProviderService.id) {
            return clinicalProviderService;
          } else {
            return el;
          }
        })
      });
    });
    this.addClinicalProviderServices = this.updater((state, newClinicalProviderServices) => Object.assign(Object.assign({}, state), {
      clinicalProviderServices: state.clinicalProviderServices.concat(newClinicalProviderServices)
    }));
    this.updateClinicalProviderServices = this.updater((state, updatedClinicalProviderServices) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderServices: state.clinicalProviderServices.map(clinicalProviderService => {
          const updated = updatedClinicalProviderServices.find(el => el.id === clinicalProviderService.id);
          return updated ? updated : clinicalProviderService;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadClinicalProviderServiceEffect = this.effect(clinicalProviderServiceId$ => clinicalProviderServiceId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(clinicalProviderServiceId => this.data.userClinicalProviderService({
      clinicalProviderServiceId
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
    this.loadClinicalProviderServicesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userClinicalProviderServices({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      clinicalProviderServices: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createClinicalProviderServiceEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.clinicalProviderServiceService.createClinicalProviderService(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProviderService => {
      this.addNewClinicalProviderService(clinicalProviderService);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderService,
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
    this.updateClinicalProviderServiceEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.clinicalProviderServiceService.updateClinicalProviderService(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProviderService => {
      this.updateClinicalProviderService(clinicalProviderService);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderService,
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
    this.deleteClinicalProviderServiceEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, clinicalProviderService]) => {
      return this.data.userDeleteClinicalProviderService({
        clinicalProviderServiceId: clinicalProviderService.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.clinicalProviderServiceService.importClinicalProviderServices(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addClinicalProviderServices(created);
      this.updateClinicalProviderServices(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('clinicalProviderServiceId')) {
      var clinicalProviderServiceId = this.route.snapshot.paramMap.get('clinicalProviderServiceId');
      this.setFormName('clinicalProviderService_edit');
    } else {
      this.setFormName('clinicalProviderService_create');
    }
    if (this.route.snapshot.paramMap.has("serviceId")) {
      var serviceId = this.route.snapshot.paramMap.get("serviceId");
      this.setServiceId(serviceId);
    }
    if (this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId");
      this.setClinicalProviderId(clinicalProviderId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.clinicalProviderServiceService.validateClinicalProviderServiceExcelData(excelData, vm.services, vm.clinicalProviders);
    }));
  }
}
WebClinicalProviderServiceFeatureStore.ɵfac = function WebClinicalProviderServiceFeatureStore_Factory(t) {
  return new (t || WebClinicalProviderServiceFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_clinical_provider_service_service__WEBPACK_IMPORTED_MODULE_12__.ClinicalProviderServiceService));
};
WebClinicalProviderServiceFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebClinicalProviderServiceFeatureStore,
  factory: WebClinicalProviderServiceFeatureStore.ɵfac
});

/***/ }),

/***/ 960425:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/rules/clinical-provider-service-name-is-valid.rule.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderServiceNameIsValidRule": () => (/* binding */ ClinicalProviderServiceNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ClinicalProviderServiceNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 328602:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-service/shared/rules/create-clinical-provider-service-input-is-valid.rule.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderServiceInputIsValidRule": () => (/* binding */ CreateClinicalProviderServiceInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _clinical_provider_service_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-service-name-is-valid.rule */ 960425);


class CreateClinicalProviderServiceInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _clinical_provider_service_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderServiceNameIsValidRule('name', 'The clinicalproviderservice name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);