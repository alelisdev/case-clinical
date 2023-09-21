"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_journal-entry_shared_journal-entry_store_ts-libs_web_journal-entry_ui_web-jo-3ae9e3"],{

/***/ 855433:
/*!******************************************************************************!*\
  !*** ./libs/web/journal-entry/shared/actions/create-journal-entry.action.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateJournalEntryAction": () => (/* binding */ CreateJournalEntryAction)
/* harmony export */ });
/* harmony import */ var _journal_entry_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journal-entry.business-action-base */ 477413);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_journal_entry_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-journal-entry-input-is-valid.rule */ 49710);




class CreateJournalEntryAction extends _journal_entry_business_action_base__WEBPACK_IMPORTED_MODULE_1__.JournalEntryBusinessActionBase {
  constructor(input) {
    super('CreateJournalEntryAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_journal_entry_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateJournalEntryInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateJournalEntry({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 477413:
/*!*************************************************************************************!*\
  !*** ./libs/web/journal-entry/shared/actions/journal-entry.business-action-base.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JournalEntryBusinessActionBase": () => (/* binding */ JournalEntryBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class JournalEntryBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 543426:
/*!********************************************************************************!*\
  !*** ./libs/web/journal-entry/shared/actions/update-journal-entries.action.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateJournalEntriesAction": () => (/* binding */ UpdateJournalEntriesAction),
/* harmony export */   "UpdateJournalEntryAction": () => (/* binding */ UpdateJournalEntryAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _journal_entry_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journal-entry.business-action-base */ 477413);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateJournalEntriesAction extends _journal_entry_business_action_base__WEBPACK_IMPORTED_MODULE_1__.JournalEntryBusinessActionBase {
  constructor(journalEntries) {
    super('UpdateJournalEntriesAction');
    this.journalEntries = journalEntries;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.journalEntries, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateJournalEntries({
      input: {
        journalEntries: this.journalEntries
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateJournalEntryAction extends _journal_entry_business_action_base__WEBPACK_IMPORTED_MODULE_1__.JournalEntryBusinessActionBase {
  constructor(journalEntry, journalEntryId) {
    super('UpdateJournalEntryAction');
    this.journalEntry = journalEntry;
    this.journalEntryId = journalEntryId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.journalEntry, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.journalEntryId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateJournalEntry({
      journalEntryId: this.journalEntryId,
      input: this.journalEntry
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 644843:
/*!*******************************************************************************************!*\
  !*** ./libs/web/journal-entry/shared/actions/validate-journal-entry-excel-data.action.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateJournalEntryExcelDataAction": () => (/* binding */ ValidateJournalEntryExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _journal_entry_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journal-entry.business-action-base */ 477413);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateJournalEntryExcelDataAction extends _journal_entry_business_action_base__WEBPACK_IMPORTED_MODULE_1__.JournalEntryBusinessActionBase {
  constructor(excelData, caseAccounts) {
    super('ValidateJournalEntryExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.caseAccounts = caseAccounts;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`caseAccountName_${index}_is_valid}`, "Case Account Is Not Valid", 'caseAccount.name', datum['caseAccount'], this.caseAccounts, true));
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

/***/ 693927:
/*!**********************************************************************************!*\
  !*** ./libs/web/journal-entry/shared/journal-entry.business-provider.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JournalEntryBusinessProviderService": () => (/* binding */ JournalEntryBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_journal_entry_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-journal-entry-excel-data.action */ 644843);
/* harmony import */ var _actions_create_journal_entry_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-journal-entry.action */ 855433);
/* harmony import */ var _actions_update_journal_entries_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-journal-entries.action */ 543426);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class JournalEntryBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.JournalEntryBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createJournalEntry(input) {
    const action = new _actions_create_journal_entry_action__WEBPACK_IMPORTED_MODULE_2__.CreateJournalEntryAction(input);
    action.Do(this);
    return action.response;
  }
  updateJournalEntry(input, journalEntryId) {
    const action = new _actions_update_journal_entries_action__WEBPACK_IMPORTED_MODULE_3__.UpdateJournalEntryAction(input, journalEntryId);
    action.Do(this);
    return action.response;
  }
  importJournalEntries(journalEntries) {
    const updateJournalEntriesAction = new _actions_update_journal_entries_action__WEBPACK_IMPORTED_MODULE_3__.UpdateJournalEntriesAction(journalEntries);
    updateJournalEntriesAction.Do(this);
    return updateJournalEntriesAction.response;
  }
  validateJournalEntryExcelData(excelData, caseAccounts) {
    const validateJournalEntryExcelDataAction = new _actions_validate_journal_entry_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateJournalEntryExcelDataAction(excelData, caseAccounts);
    validateJournalEntryExcelDataAction.Do(this);
    return validateJournalEntryExcelDataAction.response;
  }
}
JournalEntryBusinessProviderService.ɵfac = function JournalEntryBusinessProviderService_Factory(t) {
  return new (t || JournalEntryBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
JournalEntryBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: JournalEntryBusinessProviderService,
  factory: JournalEntryBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 997064:
/*!****************************************************************!*\
  !*** ./libs/web/journal-entry/shared/journal-entry.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JournalEntryService": () => (/* binding */ JournalEntryService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _journal_entry_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./journal-entry.business-provider.service */ 693927);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class JournalEntryService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("JournalEntryService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createJournalEntry(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createJournalEntry(filteredObj);
  }
  updateJournalEntry(input, journalEntryId) {
    return this.businessProvider.updateJournalEntry(input, journalEntryId);
  }
  importJournalEntries(journalEntries) {
    return this.businessProvider.importJournalEntries(journalEntries);
  }
  validateJournalEntryExcelData(excelData, caseAccounts) {
    return this.businessProvider.validateJournalEntryExcelData(excelData, caseAccounts);
  }
}
JournalEntryService.ɵfac = function JournalEntryService_Factory(t) {
  return new (t || JournalEntryService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_journal_entry_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.JournalEntryBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_journal_entry_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.JournalEntryBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
JournalEntryService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: JournalEntryService,
  factory: JournalEntryService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 234351:
/*!**************************************************************!*\
  !*** ./libs/web/journal-entry/shared/journal-entry.store.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebJournalEntryFeatureStore": () => (/* binding */ WebJournalEntryFeatureStore)
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
/* harmony import */ var _journal_entry_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./journal-entry.service */ 997064);














class WebJournalEntryFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, journalEntryService) {
    super({
      loading: false,
      journalEntries: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      caseAccountId: undefined,
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
    this.journalEntryService = journalEntryService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.journalEntries$ = this.select(s => s.journalEntries);
    this.caseAccounts$ = this.select(s => s.caseAccounts || []);
    this.caseAccountId$ = this.select(s => s.caseAccountId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.journalEntries$, this.caseAccounts$, (errors, loading, item, formName, journalEntries, caseAccounts) => ({
      errors,
      loading,
      item,
      formName,
      journalEntries,
      caseAccounts
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.caseAccountId$, this.searchQuery$, (paging, caseAccountId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      caseAccountId: caseAccountId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setCaseAccountId = this.updater((state, caseAccountId) => Object.assign(Object.assign({}, state), {
      caseAccountId
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
    this.addCaseAccount = this.updater((state, caseAccount) => Object.assign(Object.assign({}, state), {
      caseAccounts: state.caseAccounts.concat(caseAccount)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewJournalEntry = this.updater((state, journalEntry) => Object.assign(Object.assign({}, state), {
      journalEntries: [...state.journalEntries, journalEntry]
    }));
    this.updateJournalEntry = this.updater((state, journalEntry) => {
      return Object.assign(Object.assign({}, state), {
        journalEntries: state.journalEntries.map(el => {
          if (el.id === journalEntry.id) {
            return journalEntry;
          } else {
            return el;
          }
        })
      });
    });
    this.addJournalEntries = this.updater((state, newJournalEntries) => Object.assign(Object.assign({}, state), {
      journalEntries: state.journalEntries.concat(newJournalEntries)
    }));
    this.updateJournalEntries = this.updater((state, updatedJournalEntries) => {
      return Object.assign(Object.assign({}, state), {
        journalEntries: state.journalEntries.map(journalEntry => {
          const updated = updatedJournalEntries.find(el => el.id === journalEntry.id);
          return updated ? updated : journalEntry;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadJournalEntryEffect = this.effect(journalEntryId$ => journalEntryId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(journalEntryId => this.data.userJournalEntry({
      journalEntryId
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
    this.loadJournalEntriesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userJournalEntries({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      journalEntries: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createJournalEntryEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.journalEntryService.createJournalEntry(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(journalEntry => {
      this.addNewJournalEntry(journalEntry);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: journalEntry,
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
    this.updateJournalEntryEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.journalEntryService.updateJournalEntry(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(journalEntry => {
      this.updateJournalEntry(journalEntry);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: journalEntry,
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
    this.deleteJournalEntryEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, journalEntry]) => {
      return this.data.userDeleteJournalEntry({
        journalEntryId: journalEntry.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.journalEntryService.importJournalEntries(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addJournalEntries(created);
      this.updateJournalEntries(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('journalEntryId')) {
      var journalEntryId = this.route.snapshot.paramMap.get('journalEntryId');
      this.setFormName('journalEntry_edit');
    } else {
      this.setFormName('journalEntry_create');
    }
    if (this.route.snapshot.paramMap.has("caseAccountId")) {
      var caseAccountId = this.route.snapshot.paramMap.get("caseAccountId");
      this.setCaseAccountId(caseAccountId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.journalEntryService.validateJournalEntryExcelData(excelData, vm.caseAccounts);
    }));
  }
}
WebJournalEntryFeatureStore.ɵfac = function WebJournalEntryFeatureStore_Factory(t) {
  return new (t || WebJournalEntryFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_journal_entry_service__WEBPACK_IMPORTED_MODULE_12__.JournalEntryService));
};
WebJournalEntryFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebJournalEntryFeatureStore,
  factory: WebJournalEntryFeatureStore.ɵfac
});

/***/ }),

/***/ 49710:
/*!*****************************************************************************************!*\
  !*** ./libs/web/journal-entry/shared/rules/create-journal-entry-input-is-valid.rule.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateJournalEntryInputIsValidRule": () => (/* binding */ CreateJournalEntryInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _journal_entry_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journal-entry-name-is-valid.rule */ 234836);


class CreateJournalEntryInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _journal_entry_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.JournalEntryNameIsValidRule('name', 'The journalentry name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 234836:
/*!*********************************************************************************!*\
  !*** ./libs/web/journal-entry/shared/rules/journal-entry-name-is-valid.rule.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JournalEntryNameIsValidRule": () => (/* binding */ JournalEntryNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class JournalEntryNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 319311:
/*!******************************************************************************************************************!*\
  !*** ./libs/web/journal-entry/ui/web-journal-entry-select-form/web-journal-entry-select-table-view.component.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebJournalEntrySelectTableViewComponent": () => (/* binding */ WebJournalEntrySelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebJournalEntrySelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.journalEntries = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'caseAccount.name',
      headerName: 'Case Account',
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
      field: 'locationName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'fromTo',
      filter: 'agTextColumnFilter'
    }, {
      field: 'frequency',
      filter: 'agTextColumnFilter'
    }, {
      field: 'autoOrManual',
      filter: 'agTextColumnFilter'
    }, {
      field: 'process',
      filter: 'agTextColumnFilter'
    }, {
      field: 'perAccountOrAggregateJE',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Cost Rate',
      field: 'costRate',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.costRate, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'postingDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'documentDate',
      filter: 'agDateColumnFilter'
    }, {
      field: 'dueDate',
      filter: 'agDateColumnFilter'
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
      field: 'accountType',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accountNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'costCenter',
      filter: 'agTextColumnFilter'
    }, {
      field: 'appliesToDocumentNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'caseAccountId',
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
WebJournalEntrySelectTableViewComponent.ɵfac = function WebJournalEntrySelectTableViewComponent_Factory(t) {
  return new (t || WebJournalEntrySelectTableViewComponent)();
};
WebJournalEntrySelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebJournalEntrySelectTableViewComponent,
  selectors: [["ui-journal-entry-select-table-view"]],
  viewQuery: function WebJournalEntrySelectTableViewComponent_Query(rf, ctx) {
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
    journalEntries: "journalEntries"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebJournalEntrySelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebJournalEntrySelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebJournalEntrySelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.journalEntries)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);