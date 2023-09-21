"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_bank_shared_bank_store_ts"],{

/***/ 104676:
/*!*******************************************************************!*\
  !*** ./libs/web/bank/shared/actions/bank.business-action-base.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BankBusinessActionBase": () => (/* binding */ BankBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class BankBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 429511:
/*!************************************************************!*\
  !*** ./libs/web/bank/shared/actions/create-bank.action.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateBankAction": () => (/* binding */ CreateBankAction)
/* harmony export */ });
/* harmony import */ var _bank_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bank.business-action-base */ 104676);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_bank_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-bank-input-is-valid.rule */ 325452);




class CreateBankAction extends _bank_business_action_base__WEBPACK_IMPORTED_MODULE_1__.BankBusinessActionBase {
  constructor(input) {
    super('CreateBankAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_bank_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateBankInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateBank({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 362354:
/*!*************************************************************!*\
  !*** ./libs/web/bank/shared/actions/update-banks.action.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateBankAction": () => (/* binding */ UpdateBankAction),
/* harmony export */   "UpdateBanksAction": () => (/* binding */ UpdateBanksAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _bank_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bank.business-action-base */ 104676);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateBanksAction extends _bank_business_action_base__WEBPACK_IMPORTED_MODULE_1__.BankBusinessActionBase {
  constructor(banks) {
    super('UpdateBanksAction');
    this.banks = banks;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.banks, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateBanks({
      input: {
        banks: this.banks
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateBankAction extends _bank_business_action_base__WEBPACK_IMPORTED_MODULE_1__.BankBusinessActionBase {
  constructor(bank, bankId) {
    super('UpdateBankAction');
    this.bank = bank;
    this.bankId = bankId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.bank, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.bankId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateBank({
      bankId: this.bankId,
      input: this.bank
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 338298:
/*!*************************************************************************!*\
  !*** ./libs/web/bank/shared/actions/validate-bank-excel-data.action.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateBankExcelDataAction": () => (/* binding */ ValidateBankExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _bank_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bank.business-action-base */ 104676);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateBankExcelDataAction extends _bank_business_action_base__WEBPACK_IMPORTED_MODULE_1__.BankBusinessActionBase {
  constructor(excelData) {
    super('ValidateBankExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
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

/***/ 586847:
/*!****************************************************************!*\
  !*** ./libs/web/bank/shared/bank.business-provider.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BankBusinessProviderService": () => (/* binding */ BankBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_bank_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-bank-excel-data.action */ 338298);
/* harmony import */ var _actions_create_bank_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-bank.action */ 429511);
/* harmony import */ var _actions_update_banks_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-banks.action */ 362354);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class BankBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.BankBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createBank(input) {
    const action = new _actions_create_bank_action__WEBPACK_IMPORTED_MODULE_2__.CreateBankAction(input);
    action.Do(this);
    return action.response;
  }
  updateBank(input, bankId) {
    const action = new _actions_update_banks_action__WEBPACK_IMPORTED_MODULE_3__.UpdateBankAction(input, bankId);
    action.Do(this);
    return action.response;
  }
  importBanks(banks) {
    const updateBanksAction = new _actions_update_banks_action__WEBPACK_IMPORTED_MODULE_3__.UpdateBanksAction(banks);
    updateBanksAction.Do(this);
    return updateBanksAction.response;
  }
  validateBankExcelData(excelData) {
    const validateBankExcelDataAction = new _actions_validate_bank_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateBankExcelDataAction(excelData);
    validateBankExcelDataAction.Do(this);
    return validateBankExcelDataAction.response;
  }
}
BankBusinessProviderService.ɵfac = function BankBusinessProviderService_Factory(t) {
  return new (t || BankBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
BankBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: BankBusinessProviderService,
  factory: BankBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 593685:
/*!**********************************************!*\
  !*** ./libs/web/bank/shared/bank.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BankService": () => (/* binding */ BankService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _bank_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bank.business-provider.service */ 586847);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class BankService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("BankService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createBank(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createBank(filteredObj);
  }
  updateBank(input, bankId) {
    return this.businessProvider.updateBank(input, bankId);
  }
  importBanks(banks) {
    return this.businessProvider.importBanks(banks);
  }
  validateBankExcelData(excelData) {
    return this.businessProvider.validateBankExcelData(excelData);
  }
}
BankService.ɵfac = function BankService_Factory(t) {
  return new (t || BankService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_bank_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.BankBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_bank_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.BankBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
BankService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: BankService,
  factory: BankService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 493702:
/*!********************************************!*\
  !*** ./libs/web/bank/shared/bank.store.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebBankFeatureStore": () => (/* binding */ WebBankFeatureStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 670262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _bank_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bank.service */ 593685);














class WebBankFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, bankService) {
    super({
      loading: false,
      banks: [],
      done: false,
      searchQuery: '',
      formName: undefined,
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
    this.bankService = bankService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.banks$ = this.select(s => s.banks);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.banks$, (errors, loading, item, formName, banks) => ({
      errors,
      loading,
      item,
      formName,
      banks
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewBank = this.updater((state, bank) => Object.assign(Object.assign({}, state), {
      banks: [...state.banks, bank]
    }));
    this.updateBank = this.updater((state, bank) => {
      return Object.assign(Object.assign({}, state), {
        banks: state.banks.map(el => {
          if (el.id === bank.id) {
            return bank;
          } else {
            return el;
          }
        })
      });
    });
    this.addBanks = this.updater((state, newBanks) => Object.assign(Object.assign({}, state), {
      banks: state.banks.concat(newBanks)
    }));
    this.updateBanks = this.updater((state, updatedBanks) => {
      return Object.assign(Object.assign({}, state), {
        banks: state.banks.map(bank => {
          const updated = updatedBanks.find(el => el.id === bank.id);
          return updated ? updated : bank;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadBankEffect = this.effect(bankId$ => bankId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(bankId => this.data.userBank({
      bankId
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
    this.loadBanksEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userBanks({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      banks: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createBankEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.bankService.createBank(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(bank => {
      this.addNewBank(bank);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: bank,
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
    this.updateBankEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.bankService.updateBank(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(bank => {
      this.updateBank(bank);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: bank,
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
    this.deleteBankEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, bank]) => {
      return this.data.userDeleteBank({
        bankId: bank.id
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
    this.importExcelEffect = this.effect($data => $data.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.bankService.importBanks(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      var _a;
      this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
        duration: 3000
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_5__.EMPTY;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(updateResult => {
      const created = JSON.parse(updateResult.created);
      const updated = JSON.parse(updateResult.updated);
      const failed = JSON.parse(updateResult.failed);
      const total = created.length + updated.length + failed.length;
      this.addBanks(created);
      this.updateBanks(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('bankId')) {
      var bankId = this.route.snapshot.paramMap.get('bankId');
      this.setFormName('bank_edit');
    } else {
      this.setFormName('bank_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.bankService.validateBankExcelData(excelData);
    }));
  }
}
WebBankFeatureStore.ɵfac = function WebBankFeatureStore_Factory(t) {
  return new (t || WebBankFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_bank_service__WEBPACK_IMPORTED_MODULE_11__.BankService));
};
WebBankFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebBankFeatureStore,
  factory: WebBankFeatureStore.ɵfac
});

/***/ }),

/***/ 332814:
/*!***************************************************************!*\
  !*** ./libs/web/bank/shared/rules/bank-name-is-valid.rule.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BankNameIsValidRule": () => (/* binding */ BankNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class BankNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 325452:
/*!***********************************************************************!*\
  !*** ./libs/web/bank/shared/rules/create-bank-input-is-valid.rule.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateBankInputIsValidRule": () => (/* binding */ CreateBankInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _bank_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bank-name-is-valid.rule */ 332814);


class CreateBankInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _bank_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.BankNameIsValidRule('name', 'The bank name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);