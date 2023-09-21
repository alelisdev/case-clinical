"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_contract_shared_contract_store_ts"],{

/***/ 301926:
/*!**************************************************************************!*\
  !*** ./libs/web/contract/shared/actions/check-required-fields.action.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckRequiredFieldsAction": () => (/* binding */ CheckRequiredFieldsAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract.business-action-base */ 251983);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



const requiredFields = ['name', 'organization', 'vendor',
// 'template',
'billingOrganization', 'reconciliationPeriodType', 'calculationBasisType', 'process'];
class CheckRequiredFieldsAction extends _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractBusinessActionBase {
  constructor(excelData) {
    super('CheckRequiredFieldsAction');
    this.excelData = excelData;
    console.log(excelData);
  }
  preValidateAction() {
    this.excelData.map((datum, index) => {
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportRowHasRequiredFields(`row_${index}_is_valid`, `Row ${index} is not valid`, datum, requiredFields, true));
    });
  }
  finish() {
    super.finish();
    let data = [];
    const badData = [];
    if (this.validationContext.hasRuleViolations()) {
      this.validationContext.rules.map(rule => {
        if (rule instanceof _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportRowHasRequiredFields) {
          if (rule.isValid) {
            data.push(rule.target);
          } else {
            badData.push(rule.target);
          }
        }
      });
    } else {
      data = this.excelData;
    }
    this.response = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)({
      data,
      badData,
      requiredFields
    });
  }
}

/***/ }),

/***/ 251983:
/*!***************************************************************************!*\
  !*** ./libs/web/contract/shared/actions/contract.business-action-base.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractBusinessActionBase": () => (/* binding */ ContractBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ContractBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 823449:
/*!********************************************************************!*\
  !*** ./libs/web/contract/shared/actions/create-contract.action.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContractAction": () => (/* binding */ CreateContractAction)
/* harmony export */ });
/* harmony import */ var _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract.business-action-base */ 251983);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_contract_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-contract-input-is-valid.rule */ 408513);




class CreateContractAction extends _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractBusinessActionBase {
  constructor(input) {
    super('CreateContractAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_contract_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateContractInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateContract({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 9165:
/*!*********************************************************************!*\
  !*** ./libs/web/contract/shared/actions/update-contracts.action.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateContractAction": () => (/* binding */ UpdateContractAction),
/* harmony export */   "UpdateContractsAction": () => (/* binding */ UpdateContractsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract.business-action-base */ 251983);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateContractsAction extends _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractBusinessActionBase {
  constructor(contracts) {
    super('UpdateContractsAction');
    this.contracts = contracts;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contracts, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContracts({
      input: {
        contracts: this.contracts
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateContractAction extends _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractBusinessActionBase {
  constructor(contract, contractId) {
    super('UpdateContractAction');
    this.contract = contract;
    this.contractId = contractId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contract, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.contractId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContract({
      contractId: this.contractId,
      input: this.contract
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 339314:
/*!*********************************************************************************!*\
  !*** ./libs/web/contract/shared/actions/validate-contract-excel-data.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateContractExcelDataAction": () => (/* binding */ ValidateContractExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract.business-action-base */ 251983);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateContractExcelDataAction extends _contract_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractBusinessActionBase {
  constructor(excelData, organizations, billingOrganizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes) {
    super('ValidateContractExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.organizations = organizations;
    this.billingOrganizations = billingOrganizations;
    this.templates = templates;
    this.vendors = vendors;
    this.reconciliationPeriodTypes = reconciliationPeriodTypes;
    this.calculationBasisTypes = calculationBasisTypes;
    this.processes = processes;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`organizationName_${index}_is_valid}`, "Organization Is Not Valid", 'organization.name', datum['organization'], this.organizations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`billingOrganizationName_${index}_is_valid}`, "Billing Organization Is Not Valid", 'billingOrganization.name', datum['billingOrganization'], this.billingOrganizations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`templateName_${index}_is_valid}`, "Template Is Not Valid", 'template.name', datum['template'], this.templates, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`reconciliationPeriodTypeName_${index}_is_valid}`, "Reconciliation Period Type Is Not Valid", 'reconciliationPeriodType.name', datum['reconciliationPeriodType'], this.reconciliationPeriodTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`calculationBasisTypeName_${index}_is_valid}`, "Calculation Basis Type Is Not Valid", 'calculationBasisType.name', datum['calculationBasisType'], this.calculationBasisTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`processName_${index}_is_valid}`, "Process Is Not Valid", 'process.name', datum['process'], this.processes, true));
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

/***/ 117662:
/*!************************************************************************!*\
  !*** ./libs/web/contract/shared/contract.business-provider.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractBusinessProviderService": () => (/* binding */ ContractBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_contract_excel_data_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions/validate-contract-excel-data.action */ 339314);
/* harmony import */ var _actions_create_contract_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-contract.action */ 823449);
/* harmony import */ var _actions_update_contracts_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-contracts.action */ 9165);
/* harmony import */ var _actions_check_required_fields_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/check-required-fields.action */ 301926);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);











class ContractBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ContractBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createContract(input) {
    const action = new _actions_create_contract_action__WEBPACK_IMPORTED_MODULE_2__.CreateContractAction(input);
    action.Do(this);
    return action.response;
  }
  updateContract(input, contractId) {
    const action = new _actions_update_contracts_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContractAction(input, contractId);
    action.Do(this);
    return action.response;
  }
  importContracts(contracts) {
    const updateContractsAction = new _actions_update_contracts_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContractsAction(contracts);
    updateContractsAction.Do(this);
    return updateContractsAction.response;
  }
  validateRequredFields(excelData) {
    const validateRequredFieldsAction = new _actions_check_required_fields_action__WEBPACK_IMPORTED_MODULE_4__.CheckRequiredFieldsAction(excelData);
    validateRequredFieldsAction.Do(this);
    return validateRequredFieldsAction.response;
  }
  validateContractExcelData(excelData, organizations, billingOrganizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes) {
    const validateContractExcelDataAction = new _actions_validate_contract_excel_data_action__WEBPACK_IMPORTED_MODULE_5__.ValidateContractExcelDataAction(excelData, organizations, billingOrganizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes);
    validateContractExcelDataAction.Do(this);
    return validateContractExcelDataAction.response;
  }
}
ContractBusinessProviderService.ɵfac = function ContractBusinessProviderService_Factory(t) {
  return new (t || ContractBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ContractBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: ContractBusinessProviderService,
  factory: ContractBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 908415:
/*!******************************************************!*\
  !*** ./libs/web/contract/shared/contract.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractService": () => (/* binding */ ContractService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _contract_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contract.business-provider.service */ 117662);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ContractService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ContractService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createContract(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createContract(filteredObj);
  }
  updateContract(input, contractId) {
    return this.businessProvider.updateContract(input, contractId);
  }
  importContracts(contracts) {
    return this.businessProvider.importContracts(contracts);
  }
  checkRequiredFields(excelData) {
    return this.businessProvider.validateRequredFields(excelData);
  }
  validateContractExcelData(excelData, organizations, billingOrganizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes) {
    return this.businessProvider.validateContractExcelData(excelData, organizations, billingOrganizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes);
  }
}
ContractService.ɵfac = function ContractService_Factory(t) {
  return new (t || ContractService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contract_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContractBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contract_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContractBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ContractService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ContractService,
  factory: ContractService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 895333:
/*!****************************************************!*\
  !*** ./libs/web/contract/shared/contract.store.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractFeatureStore": () => (/* binding */ WebContractFeatureStore)
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
/* harmony import */ var _contract_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./contract.service */ 908415);














class WebContractFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, contractService) {
    super({
      loading: false,
      contracts: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      organizationId: undefined,
      billingOrganizationId: undefined,
      templateId: undefined,
      vendorId: undefined,
      reconciliationPeriodTypeId: undefined,
      calculationBasisTypeId: undefined,
      processId: undefined,
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
    this.contractService = contractService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.contracts$ = this.select(s => s.contracts);
    this.organizations$ = this.select(s => s.organizations || []);
    this.templates$ = this.select(s => s.templates || []);
    this.vendors$ = this.select(s => s.vendors || []);
    this.reconciliationPeriodTypes$ = this.select(s => s.reconciliationPeriodTypes || []);
    this.calculationBasisTypes$ = this.select(s => s.calculationBasisTypes || []);
    this.processes$ = this.select(s => s.processes || []);
    this.organizationId$ = this.select(s => s.organizationId);
    this.billingOrganizationId$ = this.select(s => s.billingOrganizationId);
    this.templateId$ = this.select(s => s.templateId);
    this.vendorId$ = this.select(s => s.vendorId);
    this.reconciliationPeriodTypeId$ = this.select(s => s.reconciliationPeriodTypeId);
    this.calculationBasisTypeId$ = this.select(s => s.calculationBasisTypeId);
    this.processId$ = this.select(s => s.processId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contracts$, this.organizations$, this.templates$, this.vendors$, this.reconciliationPeriodTypes$, this.calculationBasisTypes$, this.processes$, (errors, loading, item, formName, contracts, organizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes) => ({
      errors,
      loading,
      item,
      formName,
      contracts,
      organizations,
      templates,
      vendors,
      reconciliationPeriodTypes,
      calculationBasisTypes,
      processes
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.organizationId$, this.billingOrganizationId$, this.templateId$, this.vendorId$, this.reconciliationPeriodTypeId$, this.calculationBasisTypeId$, this.processId$, this.searchQuery$, (paging, organizationId, billingOrganizationId, templateId, vendorId, reconciliationPeriodTypeId, calculationBasisTypeId, processId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      organizationId: organizationId,
      billingOrganizationId: billingOrganizationId,
      templateId: templateId,
      vendorId: vendorId,
      reconciliationPeriodTypeId: reconciliationPeriodTypeId,
      calculationBasisTypeId: calculationBasisTypeId,
      processId: processId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setOrganizationId = this.updater((state, organizationId) => Object.assign(Object.assign({}, state), {
      organizationId
    }));
    this.setBillingOrganizationId = this.updater((state, billingOrganizationId) => Object.assign(Object.assign({}, state), {
      billingOrganizationId
    }));
    this.setTemplateId = this.updater((state, templateId) => Object.assign(Object.assign({}, state), {
      templateId
    }));
    this.setVendorId = this.updater((state, vendorId) => Object.assign(Object.assign({}, state), {
      vendorId
    }));
    this.setReconciliationPeriodTypeId = this.updater((state, reconciliationPeriodTypeId) => Object.assign(Object.assign({}, state), {
      reconciliationPeriodTypeId
    }));
    this.setCalculationBasisTypeId = this.updater((state, calculationBasisTypeId) => Object.assign(Object.assign({}, state), {
      calculationBasisTypeId
    }));
    this.setProcessId = this.updater((state, processId) => Object.assign(Object.assign({}, state), {
      processId
    }));
    this.filterOrganizations = term => this.data.userSelectOrganizations({
      input: {
        name: term,
        limit: 1000
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const organizations = res.data.items;
      this.patchState({
        organizations
      });
      return organizations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterTemplates = term => this.data.userSelectTemplates({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const templates = res.data.items;
      this.patchState({
        templates
      });
      return templates;
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
    this.filterReconciliationPeriodTypes = term => this.data.userSelectReconciliationPeriodTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const reconciliationPeriodTypes = res.data.items;
      this.patchState({
        reconciliationPeriodTypes
      });
      return reconciliationPeriodTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterCalculationBasisTypes = term => this.data.userSelectCalculationBasisTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const calculationBasisTypes = res.data.items;
      this.patchState({
        calculationBasisTypes
      });
      return calculationBasisTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterProcesses = term => this.data.userSelectProcesses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const processes = res.data.items;
      this.patchState({
        processes
      });
      return processes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addOrganization = this.updater((state, organization) => Object.assign(Object.assign({}, state), {
      organizations: state.organizations.concat(organization)
    }));
    this.addTemplate = this.updater((state, template) => Object.assign(Object.assign({}, state), {
      templates: state.templates.concat(template)
    }));
    this.addVendor = this.updater((state, vendor) => Object.assign(Object.assign({}, state), {
      vendors: state.vendors.concat(vendor)
    }));
    this.addReconciliationPeriodType = this.updater((state, reconciliationPeriodType) => Object.assign(Object.assign({}, state), {
      reconciliationPeriodTypes: state.reconciliationPeriodTypes.concat(reconciliationPeriodType)
    }));
    this.addCalculationBasisType = this.updater((state, calculationBasisType) => Object.assign(Object.assign({}, state), {
      calculationBasisTypes: state.calculationBasisTypes.concat(calculationBasisType)
    }));
    this.addProcess = this.updater((state, process) => Object.assign(Object.assign({}, state), {
      processes: state.processes.concat(process)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewContract = this.updater((state, contract) => Object.assign(Object.assign({}, state), {
      contracts: [...state.contracts, contract]
    }));
    this.updateContract = this.updater((state, contract) => {
      return Object.assign(Object.assign({}, state), {
        contracts: state.contracts.map(el => {
          if (el.id === contract.id) {
            return contract;
          } else {
            return el;
          }
        })
      });
    });
    this.addContracts = this.updater((state, newContracts) => Object.assign(Object.assign({}, state), {
      contracts: state.contracts.concat(newContracts)
    }));
    this.updateContracts = this.updater((state, updatedContracts) => {
      return Object.assign(Object.assign({}, state), {
        contracts: state.contracts.map(contract => {
          const updated = updatedContracts.find(el => el.id === contract.id);
          return updated ? updated : contract;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadContractEffect = this.effect(contractId$ => contractId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(contractId => this.data.userContract({
      contractId
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
    this.loadContractsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userContracts({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      contracts: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createContractEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.contractService.createContract(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contract => {
      this.addNewContract(contract);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: contract,
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
    this.updateContractEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.contractService.updateContract(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contract => {
      this.updateContract(contract);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: contract,
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
    this.deleteContractEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, contract]) => {
      return this.data.userDeleteContract({
        contractId: contract.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.contractService.importContracts(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addContracts(created);
      this.updateContracts(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('contractId')) {
      const contractId = this.route.snapshot.paramMap.get('contractId');
      this.setFormName('contract_edit');
    } else {
      this.setFormName('contract_create');
    }
    if (this.route.snapshot.paramMap.has("organizationId")) {
      const organizationId = this.route.snapshot.paramMap.get("organizationId");
      this.setOrganizationId(organizationId);
    }
    if (this.route.snapshot.paramMap.has("billingOrganizationId")) {
      const billingOrganizationId = this.route.snapshot.paramMap.get("billingOrganizationId");
      this.setBillingOrganizationId(billingOrganizationId);
    }
    if (this.route.snapshot.paramMap.has("templateId")) {
      const templateId = this.route.snapshot.paramMap.get("templateId");
      this.setTemplateId(templateId);
    }
    if (this.route.snapshot.paramMap.has("vendorId")) {
      const vendorId = this.route.snapshot.paramMap.get("vendorId");
      this.setVendorId(vendorId);
    }
    if (this.route.snapshot.paramMap.has("reconciliationPeriodTypeId")) {
      const reconciliationPeriodTypeId = this.route.snapshot.paramMap.get("reconciliationPeriodTypeId");
      this.setReconciliationPeriodTypeId(reconciliationPeriodTypeId);
    }
    if (this.route.snapshot.paramMap.has("calculationBasisTypeId")) {
      const calculationBasisTypeId = this.route.snapshot.paramMap.get("calculationBasisTypeId");
      this.setCalculationBasisTypeId(calculationBasisTypeId);
    }
    if (this.route.snapshot.paramMap.has("processId")) {
      const processId = this.route.snapshot.paramMap.get("processId");
      this.setProcessId(processId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.contractService.checkRequiredFields(excelData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(({
        data,
        badData,
        requiredFields
      }) => {
        if ((badData === null || badData === void 0 ? void 0 : badData.length) > 0) {
          this.toast.error(`${badData.length} rows do not have all required fields. All rows should contain ${requiredFields.join(', ')}`, {
            duration: 3000
          });
        }
        return this.contractService.validateContractExcelData(data, vm.organizations, vm.organizations, vm.templates, vm.vendors, vm.reconciliationPeriodTypes, vm.calculationBasisTypes, vm.processes);
      }));
    }));
  }
}
WebContractFeatureStore.ɵfac = function WebContractFeatureStore_Factory(t) {
  return new (t || WebContractFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_contract_service__WEBPACK_IMPORTED_MODULE_12__.ContractService));
};
WebContractFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebContractFeatureStore,
  factory: WebContractFeatureStore.ɵfac
});

/***/ }),

/***/ 466348:
/*!***********************************************************************!*\
  !*** ./libs/web/contract/shared/rules/contract-name-is-valid.rule.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractNameIsValidRule": () => (/* binding */ ContractNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ContractNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 408513:
/*!*******************************************************************************!*\
  !*** ./libs/web/contract/shared/rules/create-contract-input-is-valid.rule.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContractInputIsValidRule": () => (/* binding */ CreateContractInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _contract_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract-name-is-valid.rule */ 466348);


class CreateContractInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _contract_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ContractNameIsValidRule('name', 'The contract name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);