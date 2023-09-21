"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_insurance_shared_insurance_store_ts-libs_web_insurance_ui_web-insurance-sele-1582a5"],{

/***/ 963881:
/*!**********************************************************************!*\
  !*** ./libs/web/insurance/shared/actions/create-insurance.action.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateInsuranceAction": () => (/* binding */ CreateInsuranceAction)
/* harmony export */ });
/* harmony import */ var _insurance_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance.business-action-base */ 216621);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_insurance_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-insurance-input-is-valid.rule */ 562599);




class CreateInsuranceAction extends _insurance_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InsuranceBusinessActionBase {
  constructor(input) {
    super('CreateInsuranceAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_insurance_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateInsuranceInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateInsurance({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 216621:
/*!*****************************************************************************!*\
  !*** ./libs/web/insurance/shared/actions/insurance.business-action-base.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsuranceBusinessActionBase": () => (/* binding */ InsuranceBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class InsuranceBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 450889:
/*!***********************************************************************!*\
  !*** ./libs/web/insurance/shared/actions/update-insurances.action.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateInsuranceAction": () => (/* binding */ UpdateInsuranceAction),
/* harmony export */   "UpdateInsurancesAction": () => (/* binding */ UpdateInsurancesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _insurance_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance.business-action-base */ 216621);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateInsurancesAction extends _insurance_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InsuranceBusinessActionBase {
  constructor(insurances) {
    super('UpdateInsurancesAction');
    this.insurances = insurances;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.insurances, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateInsurances({
      input: {
        insurances: this.insurances
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateInsuranceAction extends _insurance_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InsuranceBusinessActionBase {
  constructor(insurance, insuranceId) {
    super('UpdateInsuranceAction');
    this.insurance = insurance;
    this.insuranceId = insuranceId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.insurance, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.insuranceId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateInsurance({
      insuranceId: this.insuranceId,
      input: this.insurance
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 914763:
/*!***********************************************************************************!*\
  !*** ./libs/web/insurance/shared/actions/validate-insurance-excel-data.action.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateInsuranceExcelDataAction": () => (/* binding */ ValidateInsuranceExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _insurance_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance.business-action-base */ 216621);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateInsuranceExcelDataAction extends _insurance_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InsuranceBusinessActionBase {
  constructor(excelData, legalCases, insuranceTypes, insuranceSectors, leads) {
    super('ValidateInsuranceExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.legalCases = legalCases;
    this.insuranceTypes = insuranceTypes;
    this.insuranceSectors = insuranceSectors;
    this.leads = leads;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`insuranceTypeName_${index}_is_valid}`, "Insurance Type Is Not Valid", 'insuranceType.name', datum['insuranceType'], this.insuranceTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`insuranceSectorName_${index}_is_valid}`, "Insurance Sector Is Not Valid", 'insuranceSector.name', datum['insuranceSector'], this.insuranceSectors, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`leadName_${index}_is_valid}`, "Lead Is Not Valid", 'lead.name', datum['lead'], this.leads, true));
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

/***/ 154990:
/*!**************************************************************************!*\
  !*** ./libs/web/insurance/shared/insurance.business-provider.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsuranceBusinessProviderService": () => (/* binding */ InsuranceBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_insurance_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-insurance-excel-data.action */ 914763);
/* harmony import */ var _actions_create_insurance_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-insurance.action */ 963881);
/* harmony import */ var _actions_update_insurances_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-insurances.action */ 450889);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class InsuranceBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.InsuranceBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createInsurance(input) {
    const action = new _actions_create_insurance_action__WEBPACK_IMPORTED_MODULE_2__.CreateInsuranceAction(input);
    action.Do(this);
    return action.response;
  }
  updateInsurance(input, insuranceId) {
    const action = new _actions_update_insurances_action__WEBPACK_IMPORTED_MODULE_3__.UpdateInsuranceAction(input, insuranceId);
    action.Do(this);
    return action.response;
  }
  importInsurances(insurances) {
    const updateInsurancesAction = new _actions_update_insurances_action__WEBPACK_IMPORTED_MODULE_3__.UpdateInsurancesAction(insurances);
    updateInsurancesAction.Do(this);
    return updateInsurancesAction.response;
  }
  validateInsuranceExcelData(excelData, legalCases, insuranceTypes, insuranceSectors, leads) {
    const validateInsuranceExcelDataAction = new _actions_validate_insurance_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateInsuranceExcelDataAction(excelData, legalCases, insuranceTypes, insuranceSectors, leads);
    validateInsuranceExcelDataAction.Do(this);
    return validateInsuranceExcelDataAction.response;
  }
}
InsuranceBusinessProviderService.ɵfac = function InsuranceBusinessProviderService_Factory(t) {
  return new (t || InsuranceBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
InsuranceBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: InsuranceBusinessProviderService,
  factory: InsuranceBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 106107:
/*!********************************************************!*\
  !*** ./libs/web/insurance/shared/insurance.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsuranceService": () => (/* binding */ InsuranceService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _insurance_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insurance.business-provider.service */ 154990);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class InsuranceService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("InsuranceService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createInsurance(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createInsurance(filteredObj);
  }
  updateInsurance(input, insuranceId) {
    return this.businessProvider.updateInsurance(input, insuranceId);
  }
  importInsurances(insurances) {
    return this.businessProvider.importInsurances(insurances);
  }
  validateInsuranceExcelData(excelData, legalCases, insuranceTypes, insuranceSectors, leads) {
    return this.businessProvider.validateInsuranceExcelData(excelData, legalCases, insuranceTypes, insuranceSectors, leads);
  }
}
InsuranceService.ɵfac = function InsuranceService_Factory(t) {
  return new (t || InsuranceService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_insurance_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.InsuranceBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_insurance_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.InsuranceBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
InsuranceService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: InsuranceService,
  factory: InsuranceService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 675525:
/*!******************************************************!*\
  !*** ./libs/web/insurance/shared/insurance.store.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebInsuranceFeatureStore": () => (/* binding */ WebInsuranceFeatureStore)
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
/* harmony import */ var _insurance_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./insurance.service */ 106107);














class WebInsuranceFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, insuranceService) {
    super({
      loading: false,
      insurances: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      legalCaseId: undefined,
      insuranceTypeId: undefined,
      insuranceSectorId: undefined,
      leadId: undefined,
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
    this.insuranceService = insuranceService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.insurances$ = this.select(s => s.insurances);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.insuranceTypes$ = this.select(s => s.insuranceTypes || []);
    this.insuranceSectors$ = this.select(s => s.insuranceSectors || []);
    this.leads$ = this.select(s => s.leads || []);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.insuranceTypeId$ = this.select(s => s.insuranceTypeId);
    this.insuranceSectorId$ = this.select(s => s.insuranceSectorId);
    this.leadId$ = this.select(s => s.leadId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.insurances$, this.legalCases$, this.insuranceTypes$, this.insuranceSectors$, this.leads$, (errors, loading, item, formName, insurances, legalCases, insuranceTypes, insuranceSectors, leads) => ({
      errors,
      loading,
      item,
      formName,
      insurances,
      legalCases,
      insuranceTypes,
      insuranceSectors,
      leads
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.legalCaseId$, this.insuranceTypeId$, this.insuranceSectorId$, this.leadId$, this.searchQuery$, (paging, legalCaseId, insuranceTypeId, insuranceSectorId, leadId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      legalCaseId: legalCaseId,
      insuranceTypeId: insuranceTypeId,
      insuranceSectorId: insuranceSectorId,
      leadId: leadId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
    }));
    this.setInsuranceTypeId = this.updater((state, insuranceTypeId) => Object.assign(Object.assign({}, state), {
      insuranceTypeId
    }));
    this.setInsuranceSectorId = this.updater((state, insuranceSectorId) => Object.assign(Object.assign({}, state), {
      insuranceSectorId
    }));
    this.setLeadId = this.updater((state, leadId) => Object.assign(Object.assign({}, state), {
      leadId
    }));
    this.filterLegalCases = term => this.data.userSelectLegalCases({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let legalCases = res.data.items;
      this.patchState({
        legalCases
      });
      return legalCases;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterInsuranceTypes = term => this.data.userSelectInsuranceTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let insuranceTypes = res.data.items;
      this.patchState({
        insuranceTypes
      });
      return insuranceTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterInsuranceSectors = term => this.data.userSelectInsuranceSectors({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let insuranceSectors = res.data.items;
      this.patchState({
        insuranceSectors
      });
      return insuranceSectors;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterLeads = term => this.data.userSelectLeads({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let leads = res.data.items;
      this.patchState({
        leads
      });
      return leads;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.addInsuranceType = this.updater((state, insuranceType) => Object.assign(Object.assign({}, state), {
      insuranceTypes: state.insuranceTypes.concat(insuranceType)
    }));
    this.addInsuranceSector = this.updater((state, insuranceSector) => Object.assign(Object.assign({}, state), {
      insuranceSectors: state.insuranceSectors.concat(insuranceSector)
    }));
    this.addLead = this.updater((state, lead) => Object.assign(Object.assign({}, state), {
      leads: state.leads.concat(lead)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewInsurance = this.updater((state, insurance) => Object.assign(Object.assign({}, state), {
      insurances: [...state.insurances, insurance]
    }));
    this.updateInsurance = this.updater((state, insurance) => {
      return Object.assign(Object.assign({}, state), {
        insurances: state.insurances.map(el => {
          if (el.id === insurance.id) {
            return insurance;
          } else {
            return el;
          }
        })
      });
    });
    this.addInsurances = this.updater((state, newInsurances) => Object.assign(Object.assign({}, state), {
      insurances: state.insurances.concat(newInsurances)
    }));
    this.updateInsurances = this.updater((state, updatedInsurances) => {
      return Object.assign(Object.assign({}, state), {
        insurances: state.insurances.map(insurance => {
          const updated = updatedInsurances.find(el => el.id === insurance.id);
          return updated ? updated : insurance;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadInsuranceEffect = this.effect(insuranceId$ => insuranceId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(insuranceId => this.data.userInsurance({
      insuranceId
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
    this.loadInsurancesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userInsurances({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      insurances: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createInsuranceEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.insuranceService.createInsurance(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(insurance => {
      this.addNewInsurance(insurance);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: insurance,
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
    this.updateInsuranceEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.insuranceService.updateInsurance(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(insurance => {
      this.updateInsurance(insurance);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: insurance,
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
    this.deleteInsuranceEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, insurance]) => {
      return this.data.userDeleteInsurance({
        insuranceId: insurance.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.insuranceService.importInsurances(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addInsurances(created);
      this.updateInsurances(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('insuranceId')) {
      var insuranceId = this.route.snapshot.paramMap.get('insuranceId');
      this.setFormName('insurance_edit');
    } else {
      this.setFormName('insurance_create');
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
    if (this.route.snapshot.paramMap.has("insuranceTypeId")) {
      var insuranceTypeId = this.route.snapshot.paramMap.get("insuranceTypeId");
      this.setInsuranceTypeId(insuranceTypeId);
    }
    if (this.route.snapshot.paramMap.has("insuranceSectorId")) {
      var insuranceSectorId = this.route.snapshot.paramMap.get("insuranceSectorId");
      this.setInsuranceSectorId(insuranceSectorId);
    }
    if (this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId");
      this.setLeadId(leadId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.insuranceService.validateInsuranceExcelData(excelData, vm.legalCases, vm.insuranceTypes, vm.insuranceSectors, vm.leads);
    }));
  }
}
WebInsuranceFeatureStore.ɵfac = function WebInsuranceFeatureStore_Factory(t) {
  return new (t || WebInsuranceFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_insurance_service__WEBPACK_IMPORTED_MODULE_12__.InsuranceService));
};
WebInsuranceFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebInsuranceFeatureStore,
  factory: WebInsuranceFeatureStore.ɵfac
});

/***/ }),

/***/ 562599:
/*!*********************************************************************************!*\
  !*** ./libs/web/insurance/shared/rules/create-insurance-input-is-valid.rule.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateInsuranceInputIsValidRule": () => (/* binding */ CreateInsuranceInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _insurance_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance-name-is-valid.rule */ 847631);


class CreateInsuranceInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _insurance_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.InsuranceNameIsValidRule('name', 'The insurance name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 847631:
/*!*************************************************************************!*\
  !*** ./libs/web/insurance/shared/rules/insurance-name-is-valid.rule.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsuranceNameIsValidRule": () => (/* binding */ InsuranceNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class InsuranceNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 524156:
/*!******************************************************************************************************!*\
  !*** ./libs/web/insurance/ui/web-insurance-select-form/web-insurance-select-table-view.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebInsuranceSelectTableViewComponent": () => (/* binding */ WebInsuranceSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebInsuranceSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.insurances = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'insuranceType.name',
      headerName: 'Insurance Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'insuranceSector.name',
      headerName: 'Insurance Sector',
      filter: 'agTextColumnFilter'
    }, {
      field: 'lead.name',
      headerName: 'Lead',
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
      field: 'legalCaseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'insuranceTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'insuranceSectorId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'policyNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'insuranceCompany',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Minimum Coverage Amount',
      field: 'minimumCoverageAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.minimumCoverageAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Maximum Coverage Amount',
      field: 'maximumCoverageAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.maximumCoverageAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Is Stackable',
      field: 'isStackable',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
    }, {
      field: 'adjuster',
      filter: 'agTextColumnFilter'
    }, {
      field: 'leadId',
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
WebInsuranceSelectTableViewComponent.ɵfac = function WebInsuranceSelectTableViewComponent_Factory(t) {
  return new (t || WebInsuranceSelectTableViewComponent)();
};
WebInsuranceSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebInsuranceSelectTableViewComponent,
  selectors: [["ui-insurance-select-table-view"]],
  viewQuery: function WebInsuranceSelectTableViewComponent_Query(rf, ctx) {
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
    insurances: "insurances"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebInsuranceSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebInsuranceSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebInsuranceSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.insurances)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);