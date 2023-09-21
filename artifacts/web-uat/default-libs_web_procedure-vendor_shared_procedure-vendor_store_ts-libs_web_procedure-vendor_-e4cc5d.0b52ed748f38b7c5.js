"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_procedure-vendor_shared_procedure-vendor_store_ts-libs_web_procedure-vendor_-e4cc5d"],{

/***/ 136856:
/*!************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/actions/create-procedure-vendor.action.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureVendorAction": () => (/* binding */ CreateProcedureVendorAction)
/* harmony export */ });
/* harmony import */ var _procedure_vendor_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-vendor.business-action-base */ 414002);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_procedure_vendor_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-procedure-vendor-input-is-valid.rule */ 670453);




class CreateProcedureVendorAction extends _procedure_vendor_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorBusinessActionBase {
  constructor(input) {
    super('CreateProcedureVendorAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_procedure_vendor_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureVendorInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureVendor({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 414002:
/*!*******************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/actions/procedure-vendor.business-action-base.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureVendorBusinessActionBase": () => (/* binding */ ProcedureVendorBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ProcedureVendorBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 905524:
/*!*************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/actions/update-procedure-vendors.action.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateProcedureVendorAction": () => (/* binding */ UpdateProcedureVendorAction),
/* harmony export */   "UpdateProcedureVendorsAction": () => (/* binding */ UpdateProcedureVendorsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_vendor_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-vendor.business-action-base */ 414002);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateProcedureVendorsAction extends _procedure_vendor_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorBusinessActionBase {
  constructor(procedureVendors) {
    super('UpdateProcedureVendorsAction');
    this.procedureVendors = procedureVendors;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureVendors, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureVendors({
      input: {
        procedureVendors: this.procedureVendors
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateProcedureVendorAction extends _procedure_vendor_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorBusinessActionBase {
  constructor(procedureVendor, procedureVendorId) {
    super('UpdateProcedureVendorAction');
    this.procedureVendor = procedureVendor;
    this.procedureVendorId = procedureVendorId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.procedureVendor, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.procedureVendorId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateProcedureVendor({
      procedureVendorId: this.procedureVendorId,
      input: this.procedureVendor
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 509982:
/*!*************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/actions/validate-procedure-vendor-excel-data.action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateProcedureVendorExcelDataAction": () => (/* binding */ ValidateProcedureVendorExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _procedure_vendor_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-vendor.business-action-base */ 414002);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateProcedureVendorExcelDataAction extends _procedure_vendor_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorBusinessActionBase {
  constructor(excelData, procedures, contracts, vendors, statuses) {
    super('ValidateProcedureVendorExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.procedures = procedures;
    this.contracts = contracts;
    this.vendors = vendors;
    this.statuses = statuses;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`procedureName_${index}_is_valid}`, "Procedure Is Not Valid", 'procedure.name', datum['procedure'], this.procedures, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`contractName_${index}_is_valid}`, "Contract Is Not Valid", 'contract.name', datum['contract'], this.contracts, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`statusName_${index}_is_valid}`, "Status Is Not Valid", 'status.name', datum['status'], this.statuses, true));
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

/***/ 820535:
/*!****************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/procedure-vendor.business-provider.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureVendorBusinessProviderService": () => (/* binding */ ProcedureVendorBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_procedure_vendor_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-procedure-vendor-excel-data.action */ 509982);
/* harmony import */ var _actions_create_procedure_vendor_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-procedure-vendor.action */ 136856);
/* harmony import */ var _actions_update_procedure_vendors_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-procedure-vendors.action */ 905524);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ProcedureVendorBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ProcedureVendorBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createProcedureVendor(input) {
    const action = new _actions_create_procedure_vendor_action__WEBPACK_IMPORTED_MODULE_2__.CreateProcedureVendorAction(input);
    action.Do(this);
    return action.response;
  }
  updateProcedureVendor(input, procedureVendorId) {
    const action = new _actions_update_procedure_vendors_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureVendorAction(input, procedureVendorId);
    action.Do(this);
    return action.response;
  }
  importProcedureVendors(procedureVendors) {
    const updateProcedureVendorsAction = new _actions_update_procedure_vendors_action__WEBPACK_IMPORTED_MODULE_3__.UpdateProcedureVendorsAction(procedureVendors);
    updateProcedureVendorsAction.Do(this);
    return updateProcedureVendorsAction.response;
  }
  validateProcedureVendorExcelData(excelData, procedures, contracts, vendors, statuses) {
    const validateProcedureVendorExcelDataAction = new _actions_validate_procedure_vendor_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateProcedureVendorExcelDataAction(excelData, procedures, contracts, vendors, statuses);
    validateProcedureVendorExcelDataAction.Do(this);
    return validateProcedureVendorExcelDataAction.response;
  }
}
ProcedureVendorBusinessProviderService.ɵfac = function ProcedureVendorBusinessProviderService_Factory(t) {
  return new (t || ProcedureVendorBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ProcedureVendorBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ProcedureVendorBusinessProviderService,
  factory: ProcedureVendorBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 663812:
/*!**********************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/procedure-vendor.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureVendorService": () => (/* binding */ ProcedureVendorService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _procedure_vendor_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./procedure-vendor.business-provider.service */ 820535);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ProcedureVendorService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ProcedureVendorService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createProcedureVendor(input) {
    return this.businessProvider.createProcedureVendor(input);
  }
  updateProcedureVendor(input, procedureVendorId) {
    return this.businessProvider.updateProcedureVendor(input, procedureVendorId);
  }
  importProcedureVendors(procedureVendors) {
    return this.businessProvider.importProcedureVendors(procedureVendors);
  }
  validateProcedureVendorExcelData(excelData, procedures, contracts, vendors, statuses) {
    return this.businessProvider.validateProcedureVendorExcelData(excelData, procedures, contracts, vendors, statuses);
  }
}
ProcedureVendorService.ɵfac = function ProcedureVendorService_Factory(t) {
  return new (t || ProcedureVendorService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_vendor_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureVendorBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_procedure_vendor_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ProcedureVendorBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ProcedureVendorService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ProcedureVendorService,
  factory: ProcedureVendorService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 232634:
/*!********************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/procedure-vendor.store.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureVendorFeatureStore": () => (/* binding */ WebProcedureVendorFeatureStore)
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
/* harmony import */ var _procedure_vendor_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./procedure-vendor.service */ 663812);














class WebProcedureVendorFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, procedureVendorService) {
    super({
      loading: false,
      procedureVendors: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      procedureId: undefined,
      contractId: undefined,
      vendorId: undefined,
      statusId: undefined,
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
    this.procedureVendorService = procedureVendorService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.procedureVendors$ = this.select(s => s.procedureVendors);
    this.caseProcedures$ = this.select(s => s.caseProcedures || []);
    this.contracts$ = this.select(s => s.contracts || []);
    this.vendors$ = this.select(s => s.vendors || []);
    this.procedureVendorStatuses$ = this.select(s => s.procedureVendorStatuses || []);
    this.procedureId$ = this.select(s => s.procedureId);
    this.contractId$ = this.select(s => s.contractId);
    this.vendorId$ = this.select(s => s.vendorId);
    this.statusId$ = this.select(s => s.statusId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureVendors$, this.caseProcedures$, this.contracts$, this.vendors$, this.procedureVendorStatuses$, (errors, loading, item, formName, procedureVendors, caseProcedures, contracts, vendors, procedureVendorStatuses) => ({
      errors,
      loading,
      item,
      formName,
      procedureVendors,
      caseProcedures,
      contracts,
      vendors,
      procedureVendorStatuses
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.procedureId$, this.contractId$, this.vendorId$, this.statusId$, this.searchQuery$, (paging, procedureId, contractId, vendorId, statusId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      procedureId: procedureId,
      contractId: contractId,
      vendorId: vendorId,
      statusId: statusId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setProcedureId = this.updater((state, procedureId) => Object.assign(Object.assign({}, state), {
      procedureId
    }));
    this.setContractId = this.updater((state, contractId) => Object.assign(Object.assign({}, state), {
      contractId
    }));
    this.setVendorId = this.updater((state, vendorId) => Object.assign(Object.assign({}, state), {
      vendorId
    }));
    this.setStatusId = this.updater((state, statusId) => Object.assign(Object.assign({}, state), {
      statusId
    }));
    this.filterCaseProcedures = term => this.data.userSelectCaseProcedures({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let caseProcedures = res.data.items;
      this.patchState({
        caseProcedures
      });
      return caseProcedures;
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
    this.filterProcedureVendorStatuses = term => this.data.userSelectProcedureVendorStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedureVendorStatuses = res.data.items;
      this.patchState({
        procedureVendorStatuses
      });
      return procedureVendorStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addCaseProcedure = this.updater((state, caseProcedure) => Object.assign(Object.assign({}, state), {
      caseProcedures: state.caseProcedures.concat(caseProcedure)
    }));
    this.addContract = this.updater((state, contract) => Object.assign(Object.assign({}, state), {
      contracts: state.contracts.concat(contract)
    }));
    this.addVendor = this.updater((state, vendor) => Object.assign(Object.assign({}, state), {
      vendors: state.vendors.concat(vendor)
    }));
    this.addProcedureVendorStatus = this.updater((state, procedureVendorStatus) => Object.assign(Object.assign({}, state), {
      procedureVendorStatuses: state.procedureVendorStatuses.concat(procedureVendorStatus)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewProcedureVendor = this.updater((state, procedureVendor) => Object.assign(Object.assign({}, state), {
      procedureVendors: [...state.procedureVendors, procedureVendor]
    }));
    this.updateProcedureVendor = this.updater((state, procedureVendor) => {
      return Object.assign(Object.assign({}, state), {
        procedureVendors: state.procedureVendors.map(el => {
          if (el.id === procedureVendor.id) {
            return procedureVendor;
          } else {
            return el;
          }
        })
      });
    });
    this.addProcedureVendors = this.updater((state, newProcedureVendors) => Object.assign(Object.assign({}, state), {
      procedureVendors: state.procedureVendors.concat(newProcedureVendors)
    }));
    this.updateProcedureVendors = this.updater((state, updatedProcedureVendors) => {
      return Object.assign(Object.assign({}, state), {
        procedureVendors: state.procedureVendors.map(procedureVendor => {
          const updated = updatedProcedureVendors.find(el => el.id === procedureVendor.id);
          return updated ? updated : procedureVendor;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadProcedureVendorEffect = this.effect(procedureVendorId$ => procedureVendorId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(procedureVendorId => this.data.userProcedureVendor({
      procedureVendorId
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
    this.loadProcedureVendorsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userProcedureVendors({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      procedureVendors: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createProcedureVendorEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.procedureVendorService.createProcedureVendor(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureVendor => {
      this.addNewProcedureVendor(procedureVendor);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: procedureVendor,
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
    this.updateProcedureVendorEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.procedureVendorService.updateProcedureVendor(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(procedureVendor => {
      this.updateProcedureVendor(procedureVendor);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: procedureVendor,
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
    this.deleteProcedureVendorEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, procedureVendor]) => {
      return this.data.userDeleteProcedureVendor({
        procedureVendorId: procedureVendor.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.procedureVendorService.importProcedureVendors(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addProcedureVendors(created);
      this.updateProcedureVendors(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('procedureVendorId')) {
      var procedureVendorId = this.route.snapshot.paramMap.get('procedureVendorId');
      this.setFormName('procedureVendor_edit');
    } else {
      this.setFormName('procedureVendor_create');
    }
    if (this.route.snapshot.paramMap.has("caseProcedureId")) {
      var procedureId = this.route.snapshot.paramMap.get("caseProcedureId");
      this.setProcedureId(procedureId);
    }
    if (this.route.snapshot.paramMap.has("contractId")) {
      var contractId = this.route.snapshot.paramMap.get("contractId");
      this.setContractId(contractId);
    }
    if (this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId");
      this.setVendorId(vendorId);
    }
    if (this.route.snapshot.paramMap.has("statusId")) {
      var statusId = this.route.snapshot.paramMap.get("statusId");
      this.setStatusId(statusId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.procedureVendorService.validateProcedureVendorExcelData(excelData, vm.caseProcedures, vm.contracts, vm.vendors, vm.procedureVendorStatuses);
    }));
  }
}
WebProcedureVendorFeatureStore.ɵfac = function WebProcedureVendorFeatureStore_Factory(t) {
  return new (t || WebProcedureVendorFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_procedure_vendor_service__WEBPACK_IMPORTED_MODULE_12__.ProcedureVendorService));
};
WebProcedureVendorFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebProcedureVendorFeatureStore,
  factory: WebProcedureVendorFeatureStore.ɵfac
});

/***/ }),

/***/ 670453:
/*!***********************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/rules/create-procedure-vendor-input-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateProcedureVendorInputIsValidRule": () => (/* binding */ CreateProcedureVendorInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _procedure_vendor_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedure-vendor-name-is-valid.rule */ 535345);


class CreateProcedureVendorInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _procedure_vendor_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ProcedureVendorNameIsValidRule('name', 'The procedurevendor name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 535345:
/*!***************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/shared/rules/procedure-vendor-name-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcedureVendorNameIsValidRule": () => (/* binding */ ProcedureVendorNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ProcedureVendorNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 376790:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor/ui/web-procedure-vendor-select-form/web-procedure-vendor-select-table-view.component.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureVendorSelectTableViewComponent": () => (/* binding */ WebProcedureVendorSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebProcedureVendorSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.procedureVendors = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'procedure.name',
      headerName: 'Procedure',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contract.name',
      headerName: 'Contract',
      filter: 'agTextColumnFilter'
    }, {
      field: 'vendor.name',
      headerName: 'Vendor',
      filter: 'agTextColumnFilter'
    }, {
      field: 'status.name',
      headerName: 'Status',
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
      field: 'procedureId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'contractId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'vendorId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'statusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Estimate',
      field: 'estimate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.estimate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Funding Approved',
      field: 'fundingApproved',
      filter: 'agSetColumnFilter',
      cellRenderer: 'checkboxRenderer'
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
WebProcedureVendorSelectTableViewComponent.ɵfac = function WebProcedureVendorSelectTableViewComponent_Factory(t) {
  return new (t || WebProcedureVendorSelectTableViewComponent)();
};
WebProcedureVendorSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebProcedureVendorSelectTableViewComponent,
  selectors: [["ui-procedure-vendor-select-table-view"]],
  viewQuery: function WebProcedureVendorSelectTableViewComponent_Query(rf, ctx) {
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
    procedureVendors: "procedureVendors"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "data", "showSidebar", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebProcedureVendorSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebProcedureVendorSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebProcedureVendorSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("data", ctx.procedureVendors)("showSidebar", false)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);