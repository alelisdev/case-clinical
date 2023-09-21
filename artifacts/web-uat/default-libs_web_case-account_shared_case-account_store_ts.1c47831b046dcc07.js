"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_case-account_shared_case-account_store_ts"],{

/***/ 875905:
/*!***********************************************************************************!*\
  !*** ./libs/web/case-account/shared/actions/case-account.business-action-base.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseAccountBusinessActionBase": () => (/* binding */ CaseAccountBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class CaseAccountBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 950049:
/*!****************************************************************************!*\
  !*** ./libs/web/case-account/shared/actions/create-case-account.action.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseAccountAction": () => (/* binding */ CreateCaseAccountAction)
/* harmony export */ });
/* harmony import */ var _case_account_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-account.business-action-base */ 875905);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_case_account_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-case-account-input-is-valid.rule */ 343432);




class CreateCaseAccountAction extends _case_account_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseAccountBusinessActionBase {
  constructor(input) {
    super('CreateCaseAccountAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_case_account_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateCaseAccountInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateCaseAccount({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 889121:
/*!*****************************************************************************!*\
  !*** ./libs/web/case-account/shared/actions/update-case-accounts.action.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCaseAccountAction": () => (/* binding */ UpdateCaseAccountAction),
/* harmony export */   "UpdateCaseAccountsAction": () => (/* binding */ UpdateCaseAccountsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_account_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-account.business-action-base */ 875905);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateCaseAccountsAction extends _case_account_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseAccountBusinessActionBase {
  constructor(caseAccounts) {
    super('UpdateCaseAccountsAction');
    this.caseAccounts = caseAccounts;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseAccounts, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseAccounts({
      input: {
        caseAccounts: this.caseAccounts
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateCaseAccountAction extends _case_account_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseAccountBusinessActionBase {
  constructor(caseAccount, caseAccountId) {
    super('UpdateCaseAccountAction');
    this.caseAccount = caseAccount;
    this.caseAccountId = caseAccountId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseAccount, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.caseAccountId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseAccount({
      caseAccountId: this.caseAccountId,
      input: this.caseAccount
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 556580:
/*!*****************************************************************************************!*\
  !*** ./libs/web/case-account/shared/actions/validate-case-account-excel-data.action.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateCaseAccountExcelDataAction": () => (/* binding */ ValidateCaseAccountExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_account_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-account.business-action-base */ 875905);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateCaseAccountExcelDataAction extends _case_account_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseAccountBusinessActionBase {
  constructor(excelData, legalCases, locations, vendors, accountStatuses, procedureTypes, agreementTypes, claimProcedures, invoiceDetails, contracts, portfolios, procedureVendors) {
    super('ValidateCaseAccountExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.legalCases = legalCases;
    this.locations = locations;
    this.vendors = vendors;
    this.accountStatuses = accountStatuses;
    this.procedureTypes = procedureTypes;
    this.agreementTypes = agreementTypes;
    this.claimProcedures = claimProcedures;
    this.invoiceDetails = invoiceDetails;
    this.contracts = contracts;
    this.portfolios = portfolios;
    this.procedureVendors = procedureVendors;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`locationName_${index}_is_valid}`, "Location Is Not Valid", 'location.name', datum['location'], this.locations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`accountStatusName_${index}_is_valid}`, "Account Status Is Not Valid", 'accountStatus.name', datum['accountStatus'], this.accountStatuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`procedureTypeName_${index}_is_valid}`, "Procedure Type Is Not Valid", 'procedureType.name', datum['procedureType'], this.procedureTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`agreementTypeName_${index}_is_valid}`, "Agreement Type Is Not Valid", 'agreementType.name', datum['agreementType'], this.agreementTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`claimProcedureName_${index}_is_valid}`, "Claim Procedure Is Not Valid", 'claimProcedure.name', datum['claimProcedure'], this.claimProcedures, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`invoiceDetailName_${index}_is_valid}`, "Invoice Detail Is Not Valid", 'invoiceDetail.name', datum['invoiceDetail'], this.invoiceDetails, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`contractName_${index}_is_valid}`, "Contract Is Not Valid", 'contract.name', datum['contract'], this.contracts, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`portfolioName_${index}_is_valid}`, "Portfolio Is Not Valid", 'portfolio.name', datum['portfolio'], this.portfolios, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`procedureVendorName_${index}_is_valid}`, "Procedure Vendor Is Not Valid", 'procedureVendor.name', datum['procedureVendor'], this.procedureVendors, true));
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

/***/ 164496:
/*!********************************************************************************!*\
  !*** ./libs/web/case-account/shared/case-account.business-provider.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseAccountBusinessProviderService": () => (/* binding */ CaseAccountBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_case_account_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-case-account-excel-data.action */ 556580);
/* harmony import */ var _actions_create_case_account_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-case-account.action */ 950049);
/* harmony import */ var _actions_update_case_accounts_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-case-accounts.action */ 889121);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class CaseAccountBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.CaseAccountBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createCaseAccount(input) {
    const action = new _actions_create_case_account_action__WEBPACK_IMPORTED_MODULE_2__.CreateCaseAccountAction(input);
    action.Do(this);
    return action.response;
  }
  updateCaseAccount(input, caseAccountId) {
    const action = new _actions_update_case_accounts_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseAccountAction(input, caseAccountId);
    action.Do(this);
    return action.response;
  }
  importCaseAccounts(caseAccounts) {
    const updateCaseAccountsAction = new _actions_update_case_accounts_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseAccountsAction(caseAccounts);
    updateCaseAccountsAction.Do(this);
    return updateCaseAccountsAction.response;
  }
  validateCaseAccountExcelData(excelData, legalCases, locations, vendors, accountStatuses, procedureTypes, agreementTypes, claimProcedures, invoiceDetails, contracts, portfolios, procedureVendors) {
    const validateCaseAccountExcelDataAction = new _actions_validate_case_account_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateCaseAccountExcelDataAction(excelData, legalCases, locations, vendors, accountStatuses, procedureTypes, agreementTypes, claimProcedures, invoiceDetails, contracts, portfolios, procedureVendors);
    validateCaseAccountExcelDataAction.Do(this);
    return validateCaseAccountExcelDataAction.response;
  }
}
CaseAccountBusinessProviderService.ɵfac = function CaseAccountBusinessProviderService_Factory(t) {
  return new (t || CaseAccountBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
CaseAccountBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: CaseAccountBusinessProviderService,
  factory: CaseAccountBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 441098:
/*!**************************************************************!*\
  !*** ./libs/web/case-account/shared/case-account.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseAccountService": () => (/* binding */ CaseAccountService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _case_account_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./case-account.business-provider.service */ 164496);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class CaseAccountService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("CaseAccountService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createCaseAccount(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createCaseAccount(filteredObj);
  }
  updateCaseAccount(input, caseAccountId) {
    return this.businessProvider.updateCaseAccount(input, caseAccountId);
  }
  importCaseAccounts(caseAccounts) {
    return this.businessProvider.importCaseAccounts(caseAccounts);
  }
  validateCaseAccountExcelData(excelData, legalCases, locations, vendors, accountStatuses, procedureTypes, agreementTypes, claimProcedures, invoiceDetails, contracts, portfolios, procedureVendors) {
    return this.businessProvider.validateCaseAccountExcelData(excelData, legalCases, locations, vendors, accountStatuses, procedureTypes, agreementTypes, claimProcedures, invoiceDetails, contracts, portfolios, procedureVendors);
  }
}
CaseAccountService.ɵfac = function CaseAccountService_Factory(t) {
  return new (t || CaseAccountService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_account_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseAccountBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_account_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseAccountBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
CaseAccountService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CaseAccountService,
  factory: CaseAccountService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 42897:
/*!************************************************************!*\
  !*** ./libs/web/case-account/shared/case-account.store.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountFeatureStore": () => (/* binding */ WebCaseAccountFeatureStore)
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
/* harmony import */ var _case_account_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./case-account.service */ 441098);














class WebCaseAccountFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, caseAccountService) {
    super({
      loading: false,
      caseAccounts: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      legalCaseId: undefined,
      locationId: undefined,
      vendorId: undefined,
      accountStatusId: undefined,
      procedureTypeId: undefined,
      agreementTypeId: undefined,
      claimProcedureId: undefined,
      invoiceDetailId: undefined,
      contractId: undefined,
      portfolioId: undefined,
      procedureVendorId: undefined,
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
    this.caseAccountService = caseAccountService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.caseAccounts$ = this.select(s => s.caseAccounts);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.locations$ = this.select(s => s.locations || []);
    this.vendors$ = this.select(s => s.vendors || []);
    this.accountStatuses$ = this.select(s => s.accountStatuses || []);
    this.procedureTypes$ = this.select(s => s.procedureTypes || []);
    this.agreementTypes$ = this.select(s => s.agreementTypes || []);
    this.claimProcedures$ = this.select(s => s.claimProcedures || []);
    this.invoiceDetails$ = this.select(s => s.invoiceDetails || []);
    this.contracts$ = this.select(s => s.contracts || []);
    this.portfolios$ = this.select(s => s.portfolios || []);
    this.procedureVendors$ = this.select(s => s.procedureVendors || []);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.locationId$ = this.select(s => s.locationId);
    this.vendorId$ = this.select(s => s.vendorId);
    this.accountStatusId$ = this.select(s => s.accountStatusId);
    this.procedureTypeId$ = this.select(s => s.procedureTypeId);
    this.agreementTypeId$ = this.select(s => s.agreementTypeId);
    this.claimProcedureId$ = this.select(s => s.claimProcedureId);
    this.invoiceDetailId$ = this.select(s => s.invoiceDetailId);
    this.contractId$ = this.select(s => s.contractId);
    this.portfolioId$ = this.select(s => s.portfolioId);
    this.procedureVendorId$ = this.select(s => s.procedureVendorId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseAccounts$, this.legalCases$, this.locations$, this.vendors$, this.accountStatuses$, this.procedureTypes$, this.agreementTypes$, this.claimProcedures$, this.invoiceDetails$, this.contracts$, this.portfolios$, this.procedureVendors$, (errors, loading, item, formName, caseAccounts, legalCases, locations, vendors, accountStatuses, procedureTypes, agreementTypes, claimProcedures, invoiceDetails, contracts, portfolios, procedureVendors) => ({
      errors,
      loading,
      item,
      formName,
      caseAccounts,
      legalCases,
      locations,
      vendors,
      accountStatuses,
      procedureTypes,
      agreementTypes,
      claimProcedures,
      invoiceDetails,
      contracts,
      portfolios,
      procedureVendors
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.legalCaseId$, this.locationId$, this.vendorId$, this.accountStatusId$, this.procedureTypeId$, this.agreementTypeId$, this.claimProcedureId$, this.invoiceDetailId$, this.contractId$, this.portfolioId$, this.procedureVendorId$, this.searchQuery$, (paging, legalCaseId, locationId, vendorId, accountStatusId, procedureTypeId, agreementTypeId, claimProcedureId, invoiceDetailId, contractId, portfolioId, procedureVendorId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      legalCaseId: legalCaseId,
      locationId: locationId,
      vendorId: vendorId,
      accountStatusId: accountStatusId,
      procedureTypeId: procedureTypeId,
      agreementTypeId: agreementTypeId,
      claimProcedureId: claimProcedureId,
      invoiceDetailId: invoiceDetailId,
      contractId: contractId,
      portfolioId: portfolioId,
      procedureVendorId: procedureVendorId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
    }));
    this.setLocationId = this.updater((state, locationId) => Object.assign(Object.assign({}, state), {
      locationId
    }));
    this.setVendorId = this.updater((state, vendorId) => Object.assign(Object.assign({}, state), {
      vendorId
    }));
    this.setAccountStatusId = this.updater((state, accountStatusId) => Object.assign(Object.assign({}, state), {
      accountStatusId
    }));
    this.setProcedureTypeId = this.updater((state, procedureTypeId) => Object.assign(Object.assign({}, state), {
      procedureTypeId
    }));
    this.setAgreementTypeId = this.updater((state, agreementTypeId) => Object.assign(Object.assign({}, state), {
      agreementTypeId
    }));
    this.setClaimProcedureId = this.updater((state, claimProcedureId) => Object.assign(Object.assign({}, state), {
      claimProcedureId
    }));
    this.setInvoiceDetailId = this.updater((state, invoiceDetailId) => Object.assign(Object.assign({}, state), {
      invoiceDetailId
    }));
    this.setContractId = this.updater((state, contractId) => Object.assign(Object.assign({}, state), {
      contractId
    }));
    this.setPortfolioId = this.updater((state, portfolioId) => Object.assign(Object.assign({}, state), {
      portfolioId
    }));
    this.setProcedureVendorId = this.updater((state, procedureVendorId) => Object.assign(Object.assign({}, state), {
      procedureVendorId
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
    this.filterAccountStatuses = term => this.data.userSelectAccountStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let accountStatuses = res.data.items;
      this.patchState({
        accountStatuses
      });
      return accountStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterProcedureTypes = term => this.data.userSelectProcedureTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedureTypes = res.data.items;
      this.patchState({
        procedureTypes
      });
      return procedureTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAgreementTypes = term => this.data.userSelectAgreementTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let agreementTypes = res.data.items;
      this.patchState({
        agreementTypes
      });
      return agreementTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterClaimProcedures = term => this.data.userSelectClaimProcedures({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let claimProcedures = res.data.items;
      this.patchState({
        claimProcedures
      });
      return claimProcedures;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterInvoiceDetails = term => this.data.userSelectInvoiceDetails({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let invoiceDetails = res.data.items;
      this.patchState({
        invoiceDetails
      });
      return invoiceDetails;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
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
    this.filterPortfolios = term => this.data.userSelectPortfolios({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let portfolios = res.data.items;
      this.patchState({
        portfolios
      });
      return portfolios;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterProcedureVendors = term => this.data.userSelectProcedureVendors({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedureVendors = res.data.items;
      this.patchState({
        procedureVendors
      });
      return procedureVendors;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.addLocation = this.updater((state, location) => Object.assign(Object.assign({}, state), {
      locations: state.locations.concat(location)
    }));
    this.addVendor = this.updater((state, vendor) => Object.assign(Object.assign({}, state), {
      vendors: state.vendors.concat(vendor)
    }));
    this.addAccountStatus = this.updater((state, accountStatus) => Object.assign(Object.assign({}, state), {
      accountStatuses: state.accountStatuses.concat(accountStatus)
    }));
    this.addProcedureType = this.updater((state, procedureType) => Object.assign(Object.assign({}, state), {
      procedureTypes: state.procedureTypes.concat(procedureType)
    }));
    this.addAgreementType = this.updater((state, agreementType) => Object.assign(Object.assign({}, state), {
      agreementTypes: state.agreementTypes.concat(agreementType)
    }));
    this.addClaimProcedure = this.updater((state, claimProcedure) => Object.assign(Object.assign({}, state), {
      claimProcedures: state.claimProcedures.concat(claimProcedure)
    }));
    this.addInvoiceDetail = this.updater((state, invoiceDetail) => Object.assign(Object.assign({}, state), {
      invoiceDetails: state.invoiceDetails.concat(invoiceDetail)
    }));
    this.addContract = this.updater((state, contract) => Object.assign(Object.assign({}, state), {
      contracts: state.contracts.concat(contract)
    }));
    this.addPortfolio = this.updater((state, portfolio) => Object.assign(Object.assign({}, state), {
      portfolios: state.portfolios.concat(portfolio)
    }));
    this.addProcedureVendor = this.updater((state, procedureVendor) => Object.assign(Object.assign({}, state), {
      procedureVendors: state.procedureVendors.concat(procedureVendor)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewCaseAccount = this.updater((state, caseAccount) => Object.assign(Object.assign({}, state), {
      caseAccounts: [...state.caseAccounts, caseAccount]
    }));
    this.updateCaseAccount = this.updater((state, caseAccount) => {
      return Object.assign(Object.assign({}, state), {
        caseAccounts: state.caseAccounts.map(el => {
          if (el.id === caseAccount.id) {
            return caseAccount;
          } else {
            return el;
          }
        })
      });
    });
    this.addCaseAccounts = this.updater((state, newCaseAccounts) => Object.assign(Object.assign({}, state), {
      caseAccounts: state.caseAccounts.concat(newCaseAccounts)
    }));
    this.updateCaseAccounts = this.updater((state, updatedCaseAccounts) => {
      return Object.assign(Object.assign({}, state), {
        caseAccounts: state.caseAccounts.map(caseAccount => {
          const updated = updatedCaseAccounts.find(el => el.id === caseAccount.id);
          return updated ? updated : caseAccount;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadCaseAccountEffect = this.effect(caseAccountId$ => caseAccountId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(caseAccountId => this.data.userCaseAccount({
      caseAccountId
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
    this.loadCaseAccountsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userCaseAccounts({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      caseAccounts: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createCaseAccountEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.caseAccountService.createCaseAccount(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseAccount => {
      this.addNewCaseAccount(caseAccount);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: caseAccount,
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
    this.updateCaseAccountEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.caseAccountService.updateCaseAccount(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseAccount => {
      this.updateCaseAccount(caseAccount);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: caseAccount,
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
    this.deleteCaseAccountEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, caseAccount]) => {
      return this.data.userDeleteCaseAccount({
        caseAccountId: caseAccount.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.caseAccountService.importCaseAccounts(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addCaseAccounts(created);
      this.updateCaseAccounts(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('caseAccountId')) {
      var caseAccountId = this.route.snapshot.paramMap.get('caseAccountId');
      this.setFormName('caseAccount_edit');
    } else {
      this.setFormName('caseAccount_create');
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
    if (this.route.snapshot.paramMap.has("locationId")) {
      var locationId = this.route.snapshot.paramMap.get("locationId");
      this.setLocationId(locationId);
    }
    if (this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId");
      this.setVendorId(vendorId);
    }
    if (this.route.snapshot.paramMap.has("accountStatusId")) {
      var accountStatusId = this.route.snapshot.paramMap.get("accountStatusId");
      this.setAccountStatusId(accountStatusId);
    }
    if (this.route.snapshot.paramMap.has("procedureTypeId")) {
      var procedureTypeId = this.route.snapshot.paramMap.get("procedureTypeId");
      this.setProcedureTypeId(procedureTypeId);
    }
    if (this.route.snapshot.paramMap.has("agreementTypeId")) {
      var agreementTypeId = this.route.snapshot.paramMap.get("agreementTypeId");
      this.setAgreementTypeId(agreementTypeId);
    }
    if (this.route.snapshot.paramMap.has("claimProcedureId")) {
      var claimProcedureId = this.route.snapshot.paramMap.get("claimProcedureId");
      this.setClaimProcedureId(claimProcedureId);
    }
    if (this.route.snapshot.paramMap.has("invoiceDetailId")) {
      var invoiceDetailId = this.route.snapshot.paramMap.get("invoiceDetailId");
      this.setInvoiceDetailId(invoiceDetailId);
    }
    if (this.route.snapshot.paramMap.has("contractId")) {
      var contractId = this.route.snapshot.paramMap.get("contractId");
      this.setContractId(contractId);
    }
    if (this.route.snapshot.paramMap.has("portfolioId")) {
      var portfolioId = this.route.snapshot.paramMap.get("portfolioId");
      this.setPortfolioId(portfolioId);
    }
    if (this.route.snapshot.paramMap.has("procedureVendorId")) {
      var procedureVendorId = this.route.snapshot.paramMap.get("procedureVendorId");
      this.setProcedureVendorId(procedureVendorId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.caseAccountService.validateCaseAccountExcelData(excelData, vm.legalCases, vm.locations, vm.vendors, vm.accountStatuses, vm.procedureTypes, vm.agreementTypes, vm.claimProcedures, vm.invoiceDetails, vm.contracts, vm.portfolios, vm.procedureVendors);
    }));
  }
}
WebCaseAccountFeatureStore.ɵfac = function WebCaseAccountFeatureStore_Factory(t) {
  return new (t || WebCaseAccountFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_account_service__WEBPACK_IMPORTED_MODULE_12__.CaseAccountService));
};
WebCaseAccountFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebCaseAccountFeatureStore,
  factory: WebCaseAccountFeatureStore.ɵfac
});

/***/ }),

/***/ 595247:
/*!*******************************************************************************!*\
  !*** ./libs/web/case-account/shared/rules/case-account-name-is-valid.rule.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseAccountNameIsValidRule": () => (/* binding */ CaseAccountNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CaseAccountNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 343432:
/*!***************************************************************************************!*\
  !*** ./libs/web/case-account/shared/rules/create-case-account-input-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseAccountInputIsValidRule": () => (/* binding */ CreateCaseAccountInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _case_account_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-account-name-is-valid.rule */ 595247);


class CreateCaseAccountInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _case_account_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.CaseAccountNameIsValidRule('name', 'The caseaccount name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);