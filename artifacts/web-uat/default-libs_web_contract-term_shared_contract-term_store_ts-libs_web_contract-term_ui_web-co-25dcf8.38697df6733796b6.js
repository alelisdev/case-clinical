"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_contract-term_shared_contract-term_store_ts-libs_web_contract-term_ui_web-co-25dcf8"],{

/***/ 221028:
/*!*************************************************************************************!*\
  !*** ./libs/web/contract-term/shared/actions/contract-term.business-action-base.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractTermBusinessActionBase": () => (/* binding */ ContractTermBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ContractTermBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 93678:
/*!******************************************************************************!*\
  !*** ./libs/web/contract-term/shared/actions/create-contract-term.action.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContractTermAction": () => (/* binding */ CreateContractTermAction)
/* harmony export */ });
/* harmony import */ var _contract_term_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract-term.business-action-base */ 221028);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_contract_term_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-contract-term-input-is-valid.rule */ 820987);




class CreateContractTermAction extends _contract_term_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractTermBusinessActionBase {
  constructor(input) {
    super('CreateContractTermAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_contract_term_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateContractTermInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateContractTerm({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 194773:
/*!*******************************************************************************!*\
  !*** ./libs/web/contract-term/shared/actions/update-contract-terms.action.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateContractTermAction": () => (/* binding */ UpdateContractTermAction),
/* harmony export */   "UpdateContractTermsAction": () => (/* binding */ UpdateContractTermsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contract_term_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract-term.business-action-base */ 221028);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateContractTermsAction extends _contract_term_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractTermBusinessActionBase {
  constructor(contractTerms) {
    super('UpdateContractTermsAction');
    this.contractTerms = contractTerms;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contractTerms, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContractTerms({
      input: {
        contractTerms: this.contractTerms
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateContractTermAction extends _contract_term_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractTermBusinessActionBase {
  constructor(contractTerm, contractTermId) {
    super('UpdateContractTermAction');
    this.contractTerm = contractTerm;
    this.contractTermId = contractTermId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contractTerm, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.contractTermId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContractTerm({
      contractTermId: this.contractTermId,
      input: this.contractTerm
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 346356:
/*!*******************************************************************************************!*\
  !*** ./libs/web/contract-term/shared/actions/validate-contract-term-excel-data.action.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateContractTermExcelDataAction": () => (/* binding */ ValidateContractTermExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contract_term_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract-term.business-action-base */ 221028);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateContractTermExcelDataAction extends _contract_term_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractTermBusinessActionBase {
  constructor(excelData, contracts) {
    super('ValidateContractTermExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.contracts = contracts;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`contractName_${index}_is_valid}`, "Contract Is Not Valid", 'contract.name', datum['contract'], this.contracts, true));
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

/***/ 400002:
/*!**********************************************************************************!*\
  !*** ./libs/web/contract-term/shared/contract-term.business-provider.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractTermBusinessProviderService": () => (/* binding */ ContractTermBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_contract_term_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-contract-term-excel-data.action */ 346356);
/* harmony import */ var _actions_create_contract_term_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-contract-term.action */ 93678);
/* harmony import */ var _actions_update_contract_terms_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-contract-terms.action */ 194773);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ContractTermBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ContractTermBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createContractTerm(input) {
    const action = new _actions_create_contract_term_action__WEBPACK_IMPORTED_MODULE_2__.CreateContractTermAction(input);
    action.Do(this);
    return action.response;
  }
  updateContractTerm(input, contractTermId) {
    const action = new _actions_update_contract_terms_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContractTermAction(input, contractTermId);
    action.Do(this);
    return action.response;
  }
  importContractTerms(contractTerms) {
    const updateContractTermsAction = new _actions_update_contract_terms_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContractTermsAction(contractTerms);
    updateContractTermsAction.Do(this);
    return updateContractTermsAction.response;
  }
  validateContractTermExcelData(excelData, contracts) {
    const validateContractTermExcelDataAction = new _actions_validate_contract_term_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateContractTermExcelDataAction(excelData, contracts);
    validateContractTermExcelDataAction.Do(this);
    return validateContractTermExcelDataAction.response;
  }
}
ContractTermBusinessProviderService.ɵfac = function ContractTermBusinessProviderService_Factory(t) {
  return new (t || ContractTermBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ContractTermBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ContractTermBusinessProviderService,
  factory: ContractTermBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 704221:
/*!****************************************************************!*\
  !*** ./libs/web/contract-term/shared/contract-term.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractTermService": () => (/* binding */ ContractTermService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _contract_term_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contract-term.business-provider.service */ 400002);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ContractTermService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ContractTermService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createContractTerm(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createContractTerm(filteredObj);
  }
  updateContractTerm(input, contractTermId) {
    return this.businessProvider.updateContractTerm(input, contractTermId);
  }
  importContractTerms(contractTerms) {
    return this.businessProvider.importContractTerms(contractTerms);
  }
  validateContractTermExcelData(excelData, contracts) {
    return this.businessProvider.validateContractTermExcelData(excelData, contracts);
  }
}
ContractTermService.ɵfac = function ContractTermService_Factory(t) {
  return new (t || ContractTermService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contract_term_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContractTermBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contract_term_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContractTermBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ContractTermService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ContractTermService,
  factory: ContractTermService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 836500:
/*!**************************************************************!*\
  !*** ./libs/web/contract-term/shared/contract-term.store.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractTermFeatureStore": () => (/* binding */ WebContractTermFeatureStore)
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
/* harmony import */ var _contract_term_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./contract-term.service */ 704221);














class WebContractTermFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, contractTermService) {
    super({
      loading: false,
      contractTerms: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      contractTermId: undefined,
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
    this.contractTermService = contractTermService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.contractTerms$ = this.select(s => s.contractTerms);
    this.contracts$ = this.select(s => s.contracts || []);
    this.contractTermId$ = this.select(s => s.contractTermId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contractTerms$, this.contracts$, (errors, loading, item, formName, contractTerms, contracts) => ({
      errors,
      loading,
      item,
      formName,
      contractTerms,
      contracts
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.contractTermId$, this.searchQuery$, (paging, contractTermId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      contractTermId: contractTermId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setContractTermId = this.updater((state, contractTermId) => Object.assign(Object.assign({}, state), {
      contractTermId
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
    this.addContract = this.updater((state, contract) => Object.assign(Object.assign({}, state), {
      contracts: state.contracts.concat(contract)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewContractTerm = this.updater((state, contractTerm) => Object.assign(Object.assign({}, state), {
      contractTerms: [...state.contractTerms, contractTerm]
    }));
    this.updateContractTerm = this.updater((state, contractTerm) => {
      return Object.assign(Object.assign({}, state), {
        contractTerms: state.contractTerms.map(el => {
          if (el.id === contractTerm.id) {
            return contractTerm;
          } else {
            return el;
          }
        })
      });
    });
    this.addContractTerms = this.updater((state, newContractTerms) => Object.assign(Object.assign({}, state), {
      contractTerms: state.contractTerms.concat(newContractTerms)
    }));
    this.updateContractTerms = this.updater((state, updatedContractTerms) => {
      return Object.assign(Object.assign({}, state), {
        contractTerms: state.contractTerms.map(contractTerm => {
          const updated = updatedContractTerms.find(el => el.id === contractTerm.id);
          return updated ? updated : contractTerm;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadContractTermEffect = this.effect(contractTermId$ => contractTermId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(contractTermId => this.data.userContractTerm({
      contractTermId
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
    this.loadContractTermsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userContractTerms({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      contractTerms: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createContractTermEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.contractTermService.createContractTerm(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contractTerm => {
      this.addNewContractTerm(contractTerm);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: contractTerm,
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
    this.updateContractTermEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.contractTermService.updateContractTerm(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contractTerm => {
      this.updateContractTerm(contractTerm);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: contractTerm,
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
    this.deleteContractTermEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, contractTerm]) => {
      return this.data.userDeleteContractTerm({
        contractTermId: contractTerm.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.contractTermService.importContractTerms(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addContractTerms(created);
      this.updateContractTerms(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('contractTermId')) {
      var contractTermId = this.route.snapshot.paramMap.get('contractTermId');
      this.setFormName('contractTerm_edit');
    } else {
      this.setFormName('contractTerm_create');
    }
    if (this.route.snapshot.paramMap.has("contractTermId")) {
      var contractTermId = this.route.snapshot.paramMap.get("contractTermId");
      this.setContractTermId(contractTermId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.contractTermService.validateContractTermExcelData(excelData, vm.contracts);
    }));
  }
}
WebContractTermFeatureStore.ɵfac = function WebContractTermFeatureStore_Factory(t) {
  return new (t || WebContractTermFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_contract_term_service__WEBPACK_IMPORTED_MODULE_12__.ContractTermService));
};
WebContractTermFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebContractTermFeatureStore,
  factory: WebContractTermFeatureStore.ɵfac
});

/***/ }),

/***/ 296960:
/*!*********************************************************************************!*\
  !*** ./libs/web/contract-term/shared/rules/contract-term-name-is-valid.rule.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractTermNameIsValidRule": () => (/* binding */ ContractTermNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ContractTermNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 820987:
/*!*****************************************************************************************!*\
  !*** ./libs/web/contract-term/shared/rules/create-contract-term-input-is-valid.rule.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContractTermInputIsValidRule": () => (/* binding */ CreateContractTermInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _contract_term_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contract-term-name-is-valid.rule */ 296960);


class CreateContractTermInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _contract_term_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ContractTermNameIsValidRule('name', 'The contractterm name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 172752:
/*!******************************************************************************************************************!*\
  !*** ./libs/web/contract-term/ui/web-contract-term-select-form/web-contract-term-select-table-view.component.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractTermSelectTableViewComponent": () => (/* binding */ WebContractTermSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebContractTermSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.contractTerms = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'contract.name',
      headerName: 'Contract',
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
      headerName: 'Max Approved',
      field: 'maxApproved',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.maxApproved, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Number Included',
      field: 'numberIncluded',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.numberIncluded, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Factor',
      field: 'factor',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.factor, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'contractTermId',
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
WebContractTermSelectTableViewComponent.ɵfac = function WebContractTermSelectTableViewComponent_Factory(t) {
  return new (t || WebContractTermSelectTableViewComponent)();
};
WebContractTermSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebContractTermSelectTableViewComponent,
  selectors: [["ui-contract-term-select-table-view"]],
  viewQuery: function WebContractTermSelectTableViewComponent_Query(rf, ctx) {
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
    contractTerms: "contractTerms"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebContractTermSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebContractTermSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebContractTermSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.contractTerms)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);