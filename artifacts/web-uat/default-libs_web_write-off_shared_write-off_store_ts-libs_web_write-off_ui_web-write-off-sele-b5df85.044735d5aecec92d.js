"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_write-off_shared_write-off_store_ts-libs_web_write-off_ui_web-write-off-sele-b5df85"],{

/***/ 728502:
/*!**********************************************************************!*\
  !*** ./libs/web/write-off/shared/actions/create-write-off.action.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateWriteOffAction": () => (/* binding */ CreateWriteOffAction)
/* harmony export */ });
/* harmony import */ var _write_off_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./write-off.business-action-base */ 315055);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_write_off_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-write-off-input-is-valid.rule */ 192779);




class CreateWriteOffAction extends _write_off_business_action_base__WEBPACK_IMPORTED_MODULE_1__.WriteOffBusinessActionBase {
  constructor(input) {
    super('CreateWriteOffAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_write_off_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateWriteOffInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateWriteOff({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 357185:
/*!***********************************************************************!*\
  !*** ./libs/web/write-off/shared/actions/update-write-offs.action.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateWriteOffAction": () => (/* binding */ UpdateWriteOffAction),
/* harmony export */   "UpdateWriteOffsAction": () => (/* binding */ UpdateWriteOffsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _write_off_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./write-off.business-action-base */ 315055);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateWriteOffsAction extends _write_off_business_action_base__WEBPACK_IMPORTED_MODULE_1__.WriteOffBusinessActionBase {
  constructor(writeOffs) {
    super('UpdateWriteOffsAction');
    this.writeOffs = writeOffs;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.writeOffs, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateWriteOffs({
      input: {
        writeOffs: this.writeOffs
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateWriteOffAction extends _write_off_business_action_base__WEBPACK_IMPORTED_MODULE_1__.WriteOffBusinessActionBase {
  constructor(writeOff, writeOffId) {
    super('UpdateWriteOffAction');
    this.writeOff = writeOff;
    this.writeOffId = writeOffId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.writeOff, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.writeOffId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateWriteOff({
      writeOffId: this.writeOffId,
      input: this.writeOff
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 727834:
/*!***********************************************************************************!*\
  !*** ./libs/web/write-off/shared/actions/validate-write-off-excel-data.action.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateWriteOffExcelDataAction": () => (/* binding */ ValidateWriteOffExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _write_off_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./write-off.business-action-base */ 315055);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateWriteOffExcelDataAction extends _write_off_business_action_base__WEBPACK_IMPORTED_MODULE_1__.WriteOffBusinessActionBase {
  constructor(excelData, accounts, writeOffStatuses) {
    super('ValidateWriteOffExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.accounts = accounts;
    this.writeOffStatuses = writeOffStatuses;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`accountName_${index}_is_valid}`, "Account Is Not Valid", 'account.name', datum['account'], this.accounts, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`writeOffStatusName_${index}_is_valid}`, "Write off Status Is Not Valid", 'writeOffStatus.name', datum['writeOffStatus'], this.writeOffStatuses, true));
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

/***/ 315055:
/*!*****************************************************************************!*\
  !*** ./libs/web/write-off/shared/actions/write-off.business-action-base.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WriteOffBusinessActionBase": () => (/* binding */ WriteOffBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class WriteOffBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 192779:
/*!*********************************************************************************!*\
  !*** ./libs/web/write-off/shared/rules/create-write-off-input-is-valid.rule.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateWriteOffInputIsValidRule": () => (/* binding */ CreateWriteOffInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _write_off_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./write-off-name-is-valid.rule */ 985202);


class CreateWriteOffInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _write_off_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.WriteOffNameIsValidRule('name', 'The writeoff name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 985202:
/*!*************************************************************************!*\
  !*** ./libs/web/write-off/shared/rules/write-off-name-is-valid.rule.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WriteOffNameIsValidRule": () => (/* binding */ WriteOffNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class WriteOffNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 76144:
/*!**************************************************************************!*\
  !*** ./libs/web/write-off/shared/write-off.business-provider.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WriteOffBusinessProviderService": () => (/* binding */ WriteOffBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_write_off_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-write-off-excel-data.action */ 727834);
/* harmony import */ var _actions_create_write_off_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-write-off.action */ 728502);
/* harmony import */ var _actions_update_write_offs_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-write-offs.action */ 357185);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class WriteOffBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.WriteOffBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createWriteOff(input) {
    const action = new _actions_create_write_off_action__WEBPACK_IMPORTED_MODULE_2__.CreateWriteOffAction(input);
    action.Do(this);
    return action.response;
  }
  updateWriteOff(input, writeOffId) {
    const action = new _actions_update_write_offs_action__WEBPACK_IMPORTED_MODULE_3__.UpdateWriteOffAction(input, writeOffId);
    action.Do(this);
    return action.response;
  }
  importWriteOffs(writeOffs) {
    const updateWriteOffsAction = new _actions_update_write_offs_action__WEBPACK_IMPORTED_MODULE_3__.UpdateWriteOffsAction(writeOffs);
    updateWriteOffsAction.Do(this);
    return updateWriteOffsAction.response;
  }
  validateWriteOffExcelData(excelData, accounts, writeOffStatuses) {
    const validateWriteOffExcelDataAction = new _actions_validate_write_off_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateWriteOffExcelDataAction(excelData, accounts, writeOffStatuses);
    validateWriteOffExcelDataAction.Do(this);
    return validateWriteOffExcelDataAction.response;
  }
}
WriteOffBusinessProviderService.ɵfac = function WriteOffBusinessProviderService_Factory(t) {
  return new (t || WriteOffBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
WriteOffBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: WriteOffBusinessProviderService,
  factory: WriteOffBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 122818:
/*!********************************************************!*\
  !*** ./libs/web/write-off/shared/write-off.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WriteOffService": () => (/* binding */ WriteOffService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _write_off_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./write-off.business-provider.service */ 76144);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class WriteOffService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("WriteOffService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createWriteOff(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createWriteOff(filteredObj);
  }
  updateWriteOff(input, writeOffId) {
    return this.businessProvider.updateWriteOff(input, writeOffId);
  }
  importWriteOffs(writeOffs) {
    return this.businessProvider.importWriteOffs(writeOffs);
  }
  validateWriteOffExcelData(excelData, accounts, writeOffStatuses) {
    return this.businessProvider.validateWriteOffExcelData(excelData, accounts, writeOffStatuses);
  }
}
WriteOffService.ɵfac = function WriteOffService_Factory(t) {
  return new (t || WriteOffService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_write_off_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.WriteOffBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_write_off_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.WriteOffBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
WriteOffService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: WriteOffService,
  factory: WriteOffService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 209426:
/*!******************************************************!*\
  !*** ./libs/web/write-off/shared/write-off.store.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebWriteOffFeatureStore": () => (/* binding */ WebWriteOffFeatureStore)
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
/* harmony import */ var _write_off_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./write-off.service */ 122818);














class WebWriteOffFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, writeOffService) {
    super({
      loading: false,
      writeOffs: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      accountId: undefined,
      writeOffStatusId: undefined,
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
    this.writeOffService = writeOffService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.writeOffs$ = this.select(s => s.writeOffs);
    this.caseAccounts$ = this.select(s => s.caseAccounts || []);
    this.writeOffStatuses$ = this.select(s => s.writeOffStatuses || []);
    this.accountId$ = this.select(s => s.accountId);
    this.writeOffStatusId$ = this.select(s => s.writeOffStatusId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.writeOffs$, this.caseAccounts$, this.writeOffStatuses$, (errors, loading, item, formName, writeOffs, caseAccounts, writeOffStatuses) => ({
      errors,
      loading,
      item,
      formName,
      writeOffs,
      caseAccounts,
      writeOffStatuses
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.accountId$, this.writeOffStatusId$, this.searchQuery$, (paging, accountId, writeOffStatusId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      accountId: accountId,
      writeOffStatusId: writeOffStatusId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setAccountId = this.updater((state, accountId) => Object.assign(Object.assign({}, state), {
      accountId
    }));
    this.setWriteOffStatusId = this.updater((state, writeOffStatusId) => Object.assign(Object.assign({}, state), {
      writeOffStatusId
    }));
    this.filterCaseAccounts = term => this.data.userSelectCaseAccounts({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let caseAccounts = res.data.items;
      this.patchState({
        caseAccounts
      });
      return caseAccounts;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterWriteOffStatuses = term => this.data.userSelectWriteOffStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let writeOffStatuses = res.data.items;
      this.patchState({
        writeOffStatuses
      });
      return writeOffStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addCaseAccount = this.updater((state, caseAccount) => Object.assign(Object.assign({}, state), {
      caseAccounts: state.caseAccounts.concat(caseAccount)
    }));
    this.addWriteOffStatus = this.updater((state, writeOffStatus) => Object.assign(Object.assign({}, state), {
      writeOffStatuses: state.writeOffStatuses.concat(writeOffStatus)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewWriteOff = this.updater((state, writeOff) => Object.assign(Object.assign({}, state), {
      writeOffs: [...state.writeOffs, writeOff]
    }));
    this.updateWriteOff = this.updater((state, writeOff) => {
      return Object.assign(Object.assign({}, state), {
        writeOffs: state.writeOffs.map(el => {
          if (el.id === writeOff.id) {
            return writeOff;
          } else {
            return el;
          }
        })
      });
    });
    this.addWriteOffs = this.updater((state, newWriteOffs) => Object.assign(Object.assign({}, state), {
      writeOffs: state.writeOffs.concat(newWriteOffs)
    }));
    this.updateWriteOffs = this.updater((state, updatedWriteOffs) => {
      return Object.assign(Object.assign({}, state), {
        writeOffs: state.writeOffs.map(writeOff => {
          const updated = updatedWriteOffs.find(el => el.id === writeOff.id);
          return updated ? updated : writeOff;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadWriteOffEffect = this.effect(writeOffId$ => writeOffId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(writeOffId => this.data.userWriteOff({
      writeOffId
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
    this.loadWriteOffsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userWriteOffs({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      writeOffs: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createWriteOffEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.writeOffService.createWriteOff(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(writeOff => {
      this.addNewWriteOff(writeOff);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: writeOff,
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
    this.updateWriteOffEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.writeOffService.updateWriteOff(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(writeOff => {
      this.updateWriteOff(writeOff);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: writeOff,
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
    this.deleteWriteOffEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, writeOff]) => {
      return this.data.userDeleteWriteOff({
        writeOffId: writeOff.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.writeOffService.importWriteOffs(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addWriteOffs(created);
      this.updateWriteOffs(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('writeOffId')) {
      var writeOffId = this.route.snapshot.paramMap.get('writeOffId');
      this.setFormName('writeOff_edit');
    } else {
      this.setFormName('writeOff_create');
    }
    if (this.route.snapshot.paramMap.has("accountId")) {
      var accountId = this.route.snapshot.paramMap.get("accountId");
      this.setAccountId(accountId);
    }
    if (this.route.snapshot.paramMap.has("writeOffStatusId")) {
      var writeOffStatusId = this.route.snapshot.paramMap.get("writeOffStatusId");
      this.setWriteOffStatusId(writeOffStatusId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.writeOffService.validateWriteOffExcelData(excelData, vm.caseAccounts, vm.writeOffStatuses);
    }));
  }
}
WebWriteOffFeatureStore.ɵfac = function WebWriteOffFeatureStore_Factory(t) {
  return new (t || WebWriteOffFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_write_off_service__WEBPACK_IMPORTED_MODULE_12__.WriteOffService));
};
WebWriteOffFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebWriteOffFeatureStore,
  factory: WebWriteOffFeatureStore.ɵfac
});

/***/ }),

/***/ 100744:
/*!******************************************************************************************************!*\
  !*** ./libs/web/write-off/ui/web-write-off-select-form/web-write-off-select-table-view.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebWriteOffSelectTableViewComponent": () => (/* binding */ WebWriteOffSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebWriteOffSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.writeOffs = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'account.name',
      headerName: 'Account',
      filter: 'agTextColumnFilter'
    }, {
      field: 'writeOffStatus.name',
      headerName: 'Write off Status',
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
      field: 'accountId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'writeOffStatusId',
      filter: 'agTextColumnFilter',
      hide: true
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
      field: 'createdBy',
      filter: 'agTextColumnFilter'
    }, {
      field: 'dateCreated',
      filter: 'agDateColumnFilter'
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
WebWriteOffSelectTableViewComponent.ɵfac = function WebWriteOffSelectTableViewComponent_Factory(t) {
  return new (t || WebWriteOffSelectTableViewComponent)();
};
WebWriteOffSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebWriteOffSelectTableViewComponent,
  selectors: [["ui-write-off-select-table-view"]],
  viewQuery: function WebWriteOffSelectTableViewComponent_Query(rf, ctx) {
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
    writeOffs: "writeOffs"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebWriteOffSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebWriteOffSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebWriteOffSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.writeOffs)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);