"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_contracted-rate_shared_contracted-rate_store_ts-libs_web_contracted-rate_ui_-5ceded"],{

/***/ 187800:
/*!*****************************************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/actions/contracted-rate.business-action-base.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractedRateBusinessActionBase": () => (/* binding */ ContractedRateBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ContractedRateBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 388447:
/*!**********************************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/actions/create-contracted-rate.action.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContractedRateAction": () => (/* binding */ CreateContractedRateAction)
/* harmony export */ });
/* harmony import */ var _contracted_rate_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracted-rate.business-action-base */ 187800);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_contracted_rate_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-contracted-rate-input-is-valid.rule */ 88869);




class CreateContractedRateAction extends _contracted_rate_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractedRateBusinessActionBase {
  constructor(input) {
    super('CreateContractedRateAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_contracted_rate_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateContractedRateInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateContractedRate({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 817201:
/*!***********************************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/actions/update-contracted-rates.action.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateContractedRateAction": () => (/* binding */ UpdateContractedRateAction),
/* harmony export */   "UpdateContractedRatesAction": () => (/* binding */ UpdateContractedRatesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contracted_rate_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracted-rate.business-action-base */ 187800);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateContractedRatesAction extends _contracted_rate_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractedRateBusinessActionBase {
  constructor(contractedRates) {
    super('UpdateContractedRatesAction');
    this.contractedRates = contractedRates;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contractedRates, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContractedRates({
      input: {
        contractedRates: this.contractedRates
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateContractedRateAction extends _contracted_rate_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractedRateBusinessActionBase {
  constructor(contractedRate, contractedRateId) {
    super('UpdateContractedRateAction');
    this.contractedRate = contractedRate;
    this.contractedRateId = contractedRateId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contractedRate, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.contractedRateId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContractedRate({
      contractedRateId: this.contractedRateId,
      input: this.contractedRate
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 416869:
/*!***********************************************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/actions/validate-contracted-rate-excel-data.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateContractedRateExcelDataAction": () => (/* binding */ ValidateContractedRateExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contracted_rate_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracted-rate.business-action-base */ 187800);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateContractedRateExcelDataAction extends _contracted_rate_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractedRateBusinessActionBase {
  constructor(excelData, contracts, contractedRateKinds, contractKinds, visitKinds, clinicalProviders, specialties) {
    super('ValidateContractedRateExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.contracts = contracts;
    this.contractedRateKinds = contractedRateKinds;
    this.contractKinds = contractKinds;
    this.visitKinds = visitKinds;
    this.clinicalProviders = clinicalProviders;
    this.specialties = specialties;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`contractName_${index}_is_valid}`, "Contract Is Not Valid", 'contract.name', datum['contract'], this.contracts, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`contractedRateKindName_${index}_is_valid}`, "Contracted Rate Kind Is Not Valid", 'contractedRateKind.name', datum['contractedRateKind'], this.contractedRateKinds, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`contractKindName_${index}_is_valid}`, "Contract Kind Is Not Valid", 'contractKind.name', datum['contractKind'], this.contractKinds, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`visitKindName_${index}_is_valid}`, "Visit Kind Is Not Valid", 'visitKind.name', datum['visitKind'], this.visitKinds, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true));
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

/***/ 134284:
/*!**************************************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/contracted-rate.business-provider.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractedRateBusinessProviderService": () => (/* binding */ ContractedRateBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_contracted_rate_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-contracted-rate-excel-data.action */ 416869);
/* harmony import */ var _actions_create_contracted_rate_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-contracted-rate.action */ 388447);
/* harmony import */ var _actions_update_contracted_rates_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-contracted-rates.action */ 817201);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ContractedRateBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ContractedRateBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createContractedRate(input) {
    const action = new _actions_create_contracted_rate_action__WEBPACK_IMPORTED_MODULE_2__.CreateContractedRateAction(input);
    action.Do(this);
    return action.response;
  }
  updateContractedRate(input, contractedRateId) {
    const action = new _actions_update_contracted_rates_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContractedRateAction(input, contractedRateId);
    action.Do(this);
    return action.response;
  }
  importContractedRates(contractedRates) {
    const updateContractedRatesAction = new _actions_update_contracted_rates_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContractedRatesAction(contractedRates);
    updateContractedRatesAction.Do(this);
    return updateContractedRatesAction.response;
  }
  validateContractedRateExcelData(excelData, contracts, contractedRateKinds, contractKinds, visitKinds, clinicalProviders, specialties) {
    const validateContractedRateExcelDataAction = new _actions_validate_contracted_rate_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateContractedRateExcelDataAction(excelData, contracts, contractedRateKinds, contractKinds, visitKinds, clinicalProviders, specialties);
    validateContractedRateExcelDataAction.Do(this);
    return validateContractedRateExcelDataAction.response;
  }
}
ContractedRateBusinessProviderService.ɵfac = function ContractedRateBusinessProviderService_Factory(t) {
  return new (t || ContractedRateBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ContractedRateBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ContractedRateBusinessProviderService,
  factory: ContractedRateBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 112713:
/*!********************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/contracted-rate.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractedRateService": () => (/* binding */ ContractedRateService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _contracted_rate_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contracted-rate.business-provider.service */ 134284);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ContractedRateService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ContractedRateService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createContractedRate(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createContractedRate(filteredObj);
  }
  updateContractedRate(input, contractedRateId) {
    return this.businessProvider.updateContractedRate(input, contractedRateId);
  }
  importContractedRates(contractedRates) {
    return this.businessProvider.importContractedRates(contractedRates);
  }
  validateContractedRateExcelData(excelData, contracts, contractedRateKinds, contractKinds, visitKinds, clinicalProviders, specialties) {
    return this.businessProvider.validateContractedRateExcelData(excelData, contracts, contractedRateKinds, contractKinds, visitKinds, clinicalProviders, specialties);
  }
}
ContractedRateService.ɵfac = function ContractedRateService_Factory(t) {
  return new (t || ContractedRateService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contracted_rate_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContractedRateBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contracted_rate_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContractedRateBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ContractedRateService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ContractedRateService,
  factory: ContractedRateService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 980449:
/*!******************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/contracted-rate.store.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractedRateFeatureStore": () => (/* binding */ WebContractedRateFeatureStore)
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
/* harmony import */ var _contracted_rate_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./contracted-rate.service */ 112713);














class WebContractedRateFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, contractedRateService) {
    super({
      loading: false,
      contractedRates: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      contractId: undefined,
      contractedRateKindId: undefined,
      contractKindId: undefined,
      visitKindId: undefined,
      clinicalProviderId: undefined,
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
    this.contractedRateService = contractedRateService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.contractedRates$ = this.select(s => s.contractedRates);
    this.contracts$ = this.select(s => s.contracts || []);
    this.contractedRateKinds$ = this.select(s => s.contractedRateKinds || []);
    this.contractKinds$ = this.select(s => s.contractKinds || []);
    this.visitKinds$ = this.select(s => s.visitKinds || []);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.specialties$ = this.select(s => s.specialties || []);
    this.contractId$ = this.select(s => s.contractId);
    this.contractedRateKindId$ = this.select(s => s.contractedRateKindId);
    this.contractKindId$ = this.select(s => s.contractKindId);
    this.visitKindId$ = this.select(s => s.visitKindId);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contractedRates$, this.contracts$, this.contractedRateKinds$, this.contractKinds$, this.visitKinds$, this.clinicalProviders$, this.specialties$, (errors, loading, item, formName, contractedRates, contracts, contractedRateKinds, contractKinds, visitKinds, clinicalProviders, specialties) => ({
      errors,
      loading,
      item,
      formName,
      contractedRates,
      contracts,
      contractedRateKinds,
      contractKinds,
      visitKinds,
      clinicalProviders,
      specialties
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.contractId$, this.contractedRateKindId$, this.contractKindId$, this.visitKindId$, this.clinicalProviderId$, this.specialtyId$, this.searchQuery$, (paging, contractId, contractedRateKindId, contractKindId, visitKindId, clinicalProviderId, specialtyId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      contractId: contractId,
      contractedRateKindId: contractedRateKindId,
      contractKindId: contractKindId,
      visitKindId: visitKindId,
      clinicalProviderId: clinicalProviderId,
      specialtyId: specialtyId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setContractId = this.updater((state, contractId) => Object.assign(Object.assign({}, state), {
      contractId
    }));
    this.setContractedRateKindId = this.updater((state, contractedRateKindId) => Object.assign(Object.assign({}, state), {
      contractedRateKindId
    }));
    this.setContractKindId = this.updater((state, contractKindId) => Object.assign(Object.assign({}, state), {
      contractKindId
    }));
    this.setVisitKindId = this.updater((state, visitKindId) => Object.assign(Object.assign({}, state), {
      visitKindId
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.setSpecialtyId = this.updater((state, specialtyId) => Object.assign(Object.assign({}, state), {
      specialtyId
    }));
    this.filterContracts = term => this.data.userSelectContracts({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let contracts = res.data.items;
      this.patchState({
        contracts
      });
      return contracts;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterContractedRateKinds = term => this.data.userSelectContractedRateKinds({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let contractedRateKinds = res.data.items;
      this.patchState({
        contractedRateKinds
      });
      return contractedRateKinds;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterContractKinds = term => this.data.userSelectContractKinds({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let contractKinds = res.data.items;
      this.patchState({
        contractKinds
      });
      return contractKinds;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterVisitKinds = term => this.data.userSelectVisitKinds({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let visitKinds = res.data.items;
      this.patchState({
        visitKinds
      });
      return visitKinds;
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
    this.addContract = this.updater((state, contract) => Object.assign(Object.assign({}, state), {
      contracts: state.contracts.concat(contract)
    }));
    this.addContractedRateKind = this.updater((state, contractedRateKind) => Object.assign(Object.assign({}, state), {
      contractedRateKinds: state.contractedRateKinds.concat(contractedRateKind)
    }));
    this.addContractKind = this.updater((state, contractKind) => Object.assign(Object.assign({}, state), {
      contractKinds: state.contractKinds.concat(contractKind)
    }));
    this.addVisitKind = this.updater((state, visitKind) => Object.assign(Object.assign({}, state), {
      visitKinds: state.visitKinds.concat(visitKind)
    }));
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.addSpecialty = this.updater((state, specialty) => Object.assign(Object.assign({}, state), {
      specialties: state.specialties.concat(specialty)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewContractedRate = this.updater((state, contractedRate) => Object.assign(Object.assign({}, state), {
      contractedRates: [...state.contractedRates, contractedRate]
    }));
    this.updateContractedRate = this.updater((state, contractedRate) => {
      return Object.assign(Object.assign({}, state), {
        contractedRates: state.contractedRates.map(el => {
          if (el.id === contractedRate.id) {
            return contractedRate;
          } else {
            return el;
          }
        })
      });
    });
    this.addContractedRates = this.updater((state, newContractedRates) => Object.assign(Object.assign({}, state), {
      contractedRates: state.contractedRates.concat(newContractedRates)
    }));
    this.updateContractedRates = this.updater((state, updatedContractedRates) => {
      return Object.assign(Object.assign({}, state), {
        contractedRates: state.contractedRates.map(contractedRate => {
          const updated = updatedContractedRates.find(el => el.id === contractedRate.id);
          return updated ? updated : contractedRate;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadContractedRateEffect = this.effect(contractedRateId$ => contractedRateId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(contractedRateId => this.data.userContractedRate({
      contractedRateId
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
    this.loadContractedRatesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userContractedRates({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      contractedRates: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createContractedRateEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.contractedRateService.createContractedRate(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contractedRate => {
      this.addNewContractedRate(contractedRate);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: contractedRate,
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
    this.updateContractedRateEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.contractedRateService.updateContractedRate(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contractedRate => {
      this.updateContractedRate(contractedRate);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: contractedRate,
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
    this.deleteContractedRateEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, contractedRate]) => {
      return this.data.userDeleteContractedRate({
        contractedRateId: contractedRate.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.contractedRateService.importContractedRates(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addContractedRates(created);
      this.updateContractedRates(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('contractedRateId')) {
      var contractedRateId = this.route.snapshot.paramMap.get('contractedRateId');
      this.setFormName('contractedRate_edit');
    } else {
      this.setFormName('contractedRate_create');
    }
    if (this.route.snapshot.paramMap.has("contractId")) {
      var contractId = this.route.snapshot.paramMap.get("contractId");
      this.setContractId(contractId);
    }
    if (this.route.snapshot.paramMap.has("contractedRateKindId")) {
      var contractedRateKindId = this.route.snapshot.paramMap.get("contractedRateKindId");
      this.setContractedRateKindId(contractedRateKindId);
    }
    if (this.route.snapshot.paramMap.has("contractKindId")) {
      var contractKindId = this.route.snapshot.paramMap.get("contractKindId");
      this.setContractKindId(contractKindId);
    }
    if (this.route.snapshot.paramMap.has("visitKindId")) {
      var visitKindId = this.route.snapshot.paramMap.get("visitKindId");
      this.setVisitKindId(visitKindId);
    }
    if (this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId");
      this.setClinicalProviderId(clinicalProviderId);
    }
    if (this.route.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.route.snapshot.paramMap.get("specialtyId");
      this.setSpecialtyId(specialtyId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.contractedRateService.validateContractedRateExcelData(excelData, vm.contracts, vm.contractedRateKinds, vm.contractKinds, vm.visitKinds, vm.clinicalProviders, vm.specialties);
    }));
  }
}
WebContractedRateFeatureStore.ɵfac = function WebContractedRateFeatureStore_Factory(t) {
  return new (t || WebContractedRateFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_contracted_rate_service__WEBPACK_IMPORTED_MODULE_12__.ContractedRateService));
};
WebContractedRateFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebContractedRateFeatureStore,
  factory: WebContractedRateFeatureStore.ɵfac
});

/***/ }),

/***/ 882851:
/*!*************************************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/rules/contracted-rate-name-is-valid.rule.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractedRateNameIsValidRule": () => (/* binding */ ContractedRateNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ContractedRateNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 88869:
/*!*********************************************************************************************!*\
  !*** ./libs/web/contracted-rate/shared/rules/create-contracted-rate-input-is-valid.rule.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContractedRateInputIsValidRule": () => (/* binding */ CreateContractedRateInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _contracted_rate_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracted-rate-name-is-valid.rule */ 882851);


class CreateContractedRateInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _contracted_rate_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ContractedRateNameIsValidRule('name', 'The contractedrate name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 426107:
/*!************************************************************************************************************************!*\
  !*** ./libs/web/contracted-rate/ui/web-contracted-rate-select-form/web-contracted-rate-select-table-view.component.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractedRateSelectTableViewComponent": () => (/* binding */ WebContractedRateSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebContractedRateSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.contractedRates = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'contract.name',
      headerName: 'Contract',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contractedRateKind.name',
      headerName: 'Contracted Rate Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contractKind.name',
      headerName: 'Contract Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'visitKind.name',
      headerName: 'Visit Kind',
      filter: 'agTextColumnFilter'
    }, {
      field: 'clinicalProvider.name',
      headerName: 'Clinical Provider',
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
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.amount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Percentage',
      field: 'percentage',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.percentage, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Reimbursed Rate',
      field: 'reimbursedRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.reimbursedRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Bill on Behalf',
      field: 'billOnBehalf',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'contractId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractedRateKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'visitKindId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'clinicalProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'specialtyId',
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
WebContractedRateSelectTableViewComponent.ɵfac = function WebContractedRateSelectTableViewComponent_Factory(t) {
  return new (t || WebContractedRateSelectTableViewComponent)();
};
WebContractedRateSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebContractedRateSelectTableViewComponent,
  selectors: [["ui-contracted-rate-select-table-view"]],
  viewQuery: function WebContractedRateSelectTableViewComponent_Query(rf, ctx) {
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
    contractedRates: "contractedRates"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebContractedRateSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebContractedRateSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebContractedRateSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.contractedRates)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);