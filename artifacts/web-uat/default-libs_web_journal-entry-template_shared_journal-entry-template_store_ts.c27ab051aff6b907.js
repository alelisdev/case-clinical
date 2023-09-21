"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_journal-entry-template_shared_journal-entry-template_store_ts"],{

/***/ 886161:
/*!************************************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/actions/create-journal-entry-template.action.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateJournalEntryTemplateAction": () => (/* binding */ CreateJournalEntryTemplateAction)
/* harmony export */ });
/* harmony import */ var _journal_entry_template_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journal-entry-template.business-action-base */ 101264);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_journal_entry_template_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-journal-entry-template-input-is-valid.rule */ 74214);




class CreateJournalEntryTemplateAction extends _journal_entry_template_business_action_base__WEBPACK_IMPORTED_MODULE_1__.JournalEntryTemplateBusinessActionBase {
  constructor(input) {
    super('CreateJournalEntryTemplateAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_journal_entry_template_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateJournalEntryTemplateInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateJournalEntryTemplate({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 101264:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/actions/journal-entry-template.business-action-base.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JournalEntryTemplateBusinessActionBase": () => (/* binding */ JournalEntryTemplateBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class JournalEntryTemplateBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 427052:
/*!*************************************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/actions/update-journal-entry-templates.action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateJournalEntryTemplateAction": () => (/* binding */ UpdateJournalEntryTemplateAction),
/* harmony export */   "UpdateJournalEntryTemplatesAction": () => (/* binding */ UpdateJournalEntryTemplatesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _journal_entry_template_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journal-entry-template.business-action-base */ 101264);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateJournalEntryTemplatesAction extends _journal_entry_template_business_action_base__WEBPACK_IMPORTED_MODULE_1__.JournalEntryTemplateBusinessActionBase {
  constructor(journalEntryTemplates) {
    super('UpdateJournalEntryTemplatesAction');
    this.journalEntryTemplates = journalEntryTemplates;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.journalEntryTemplates, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateJournalEntryTemplates({
      input: {
        journalEntryTemplates: this.journalEntryTemplates
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateJournalEntryTemplateAction extends _journal_entry_template_business_action_base__WEBPACK_IMPORTED_MODULE_1__.JournalEntryTemplateBusinessActionBase {
  constructor(journalEntryTemplate, journalEntryTemplateId) {
    super('UpdateJournalEntryTemplateAction');
    this.journalEntryTemplate = journalEntryTemplate;
    this.journalEntryTemplateId = journalEntryTemplateId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.journalEntryTemplate, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.journalEntryTemplateId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateJournalEntryTemplate({
      journalEntryTemplateId: this.journalEntryTemplateId,
      input: this.journalEntryTemplate
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 976502:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/actions/validate-journal-entry-template-excel-data.action.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateJournalEntryTemplateExcelDataAction": () => (/* binding */ ValidateJournalEntryTemplateExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _journal_entry_template_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journal-entry-template.business-action-base */ 101264);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateJournalEntryTemplateExcelDataAction extends _journal_entry_template_business_action_base__WEBPACK_IMPORTED_MODULE_1__.JournalEntryTemplateBusinessActionBase {
  constructor(excelData, caseAccounts) {
    super('ValidateJournalEntryTemplateExcelDataAction');
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

/***/ 2358:
/*!****************************************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/journal-entry-template.business-provider.service.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JournalEntryTemplateBusinessProviderService": () => (/* binding */ JournalEntryTemplateBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_journal_entry_template_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-journal-entry-template-excel-data.action */ 976502);
/* harmony import */ var _actions_create_journal_entry_template_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-journal-entry-template.action */ 886161);
/* harmony import */ var _actions_update_journal_entry_templates_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-journal-entry-templates.action */ 427052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class JournalEntryTemplateBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.JournalEntryTemplateBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createJournalEntryTemplate(input) {
    const action = new _actions_create_journal_entry_template_action__WEBPACK_IMPORTED_MODULE_2__.CreateJournalEntryTemplateAction(input);
    action.Do(this);
    return action.response;
  }
  updateJournalEntryTemplate(input, journalEntryTemplateId) {
    const action = new _actions_update_journal_entry_templates_action__WEBPACK_IMPORTED_MODULE_3__.UpdateJournalEntryTemplateAction(input, journalEntryTemplateId);
    action.Do(this);
    return action.response;
  }
  importJournalEntryTemplates(journalEntryTemplates) {
    const updateJournalEntryTemplatesAction = new _actions_update_journal_entry_templates_action__WEBPACK_IMPORTED_MODULE_3__.UpdateJournalEntryTemplatesAction(journalEntryTemplates);
    updateJournalEntryTemplatesAction.Do(this);
    return updateJournalEntryTemplatesAction.response;
  }
  validateJournalEntryTemplateExcelData(excelData, caseAccounts) {
    const validateJournalEntryTemplateExcelDataAction = new _actions_validate_journal_entry_template_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateJournalEntryTemplateExcelDataAction(excelData, caseAccounts);
    validateJournalEntryTemplateExcelDataAction.Do(this);
    return validateJournalEntryTemplateExcelDataAction.response;
  }
}
JournalEntryTemplateBusinessProviderService.ɵfac = function JournalEntryTemplateBusinessProviderService_Factory(t) {
  return new (t || JournalEntryTemplateBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
JournalEntryTemplateBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: JournalEntryTemplateBusinessProviderService,
  factory: JournalEntryTemplateBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 217908:
/*!**********************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/journal-entry-template.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JournalEntryTemplateService": () => (/* binding */ JournalEntryTemplateService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _journal_entry_template_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./journal-entry-template.business-provider.service */ 2358);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class JournalEntryTemplateService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("JournalEntryTemplateService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createJournalEntryTemplate(input) {
    return this.businessProvider.createJournalEntryTemplate(input);
  }
  updateJournalEntryTemplate(input, journalEntryTemplateId) {
    return this.businessProvider.updateJournalEntryTemplate(input, journalEntryTemplateId);
  }
  importJournalEntryTemplates(journalEntryTemplates) {
    return this.businessProvider.importJournalEntryTemplates(journalEntryTemplates);
  }
  validateJournalEntryTemplateExcelData(excelData, caseAccounts) {
    return this.businessProvider.validateJournalEntryTemplateExcelData(excelData, caseAccounts);
  }
}
JournalEntryTemplateService.ɵfac = function JournalEntryTemplateService_Factory(t) {
  return new (t || JournalEntryTemplateService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_journal_entry_template_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.JournalEntryTemplateBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_journal_entry_template_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.JournalEntryTemplateBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
JournalEntryTemplateService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: JournalEntryTemplateService,
  factory: JournalEntryTemplateService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 370365:
/*!********************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/journal-entry-template.store.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebJournalEntryTemplateFeatureStore": () => (/* binding */ WebJournalEntryTemplateFeatureStore)
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
/* harmony import */ var _journal_entry_template_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./journal-entry-template.service */ 217908);














class WebJournalEntryTemplateFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, journalEntryTemplateService) {
    super({
      loading: false,
      journalEntryTemplates: [],
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
    this.journalEntryTemplateService = journalEntryTemplateService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.journalEntryTemplates$ = this.select(s => s.journalEntryTemplates);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.journalEntryTemplates$, this.caseAccounts$, (errors, loading, item, formName, journalEntryTemplates, caseAccounts) => ({
      errors,
      loading,
      item,
      formName,
      journalEntryTemplates,
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
    this.addNewJournalEntryTemplate = this.updater((state, journalEntryTemplate) => Object.assign(Object.assign({}, state), {
      journalEntryTemplates: [...state.journalEntryTemplates, journalEntryTemplate]
    }));
    this.updateJournalEntryTemplate = this.updater((state, journalEntryTemplate) => {
      return Object.assign(Object.assign({}, state), {
        journalEntryTemplates: state.journalEntryTemplates.map(el => {
          if (el.id === journalEntryTemplate.id) {
            return journalEntryTemplate;
          } else {
            return el;
          }
        })
      });
    });
    this.addJournalEntryTemplates = this.updater((state, newJournalEntryTemplates) => Object.assign(Object.assign({}, state), {
      journalEntryTemplates: state.journalEntryTemplates.concat(newJournalEntryTemplates)
    }));
    this.updateJournalEntryTemplates = this.updater((state, updatedJournalEntryTemplates) => {
      return Object.assign(Object.assign({}, state), {
        journalEntryTemplates: state.journalEntryTemplates.map(journalEntryTemplate => {
          const updated = updatedJournalEntryTemplates.find(el => el.id === journalEntryTemplate.id);
          return updated ? updated : journalEntryTemplate;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadJournalEntryTemplateEffect = this.effect(journalEntryTemplateId$ => journalEntryTemplateId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(journalEntryTemplateId => this.data.userJournalEntryTemplate({
      journalEntryTemplateId
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
    this.loadJournalEntryTemplatesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userJournalEntryTemplates({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      journalEntryTemplates: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createJournalEntryTemplateEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.journalEntryTemplateService.createJournalEntryTemplate(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(journalEntryTemplate => {
      this.addNewJournalEntryTemplate(journalEntryTemplate);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: journalEntryTemplate,
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
    this.updateJournalEntryTemplateEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.journalEntryTemplateService.updateJournalEntryTemplate(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(journalEntryTemplate => {
      this.updateJournalEntryTemplate(journalEntryTemplate);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: journalEntryTemplate,
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
    this.deleteJournalEntryTemplateEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, journalEntryTemplate]) => {
      return this.data.userDeleteJournalEntryTemplate({
        journalEntryTemplateId: journalEntryTemplate.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.journalEntryTemplateService.importJournalEntryTemplates(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addJournalEntryTemplates(created);
      this.updateJournalEntryTemplates(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('journalEntryTemplateId')) {
      var journalEntryTemplateId = this.route.snapshot.paramMap.get('journalEntryTemplateId');
      this.setFormName('journalEntryTemplate_edit');
    } else {
      this.setFormName('journalEntryTemplate_create');
    }
    if (this.route.snapshot.paramMap.has("caseAccountId")) {
      var caseAccountId = this.route.snapshot.paramMap.get("caseAccountId");
      this.setCaseAccountId(caseAccountId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.journalEntryTemplateService.validateJournalEntryTemplateExcelData(excelData, vm.caseAccounts);
    }));
  }
}
WebJournalEntryTemplateFeatureStore.ɵfac = function WebJournalEntryTemplateFeatureStore_Factory(t) {
  return new (t || WebJournalEntryTemplateFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_journal_entry_template_service__WEBPACK_IMPORTED_MODULE_12__.JournalEntryTemplateService));
};
WebJournalEntryTemplateFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebJournalEntryTemplateFeatureStore,
  factory: WebJournalEntryTemplateFeatureStore.ɵfac
});

/***/ }),

/***/ 74214:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/rules/create-journal-entry-template-input-is-valid.rule.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateJournalEntryTemplateInputIsValidRule": () => (/* binding */ CreateJournalEntryTemplateInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _journal_entry_template_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journal-entry-template-name-is-valid.rule */ 526487);


class CreateJournalEntryTemplateInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _journal_entry_template_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.JournalEntryTemplateNameIsValidRule('name', 'The journalentrytemplate name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 526487:
/*!***************************************************************************************************!*\
  !*** ./libs/web/journal-entry-template/shared/rules/journal-entry-template-name-is-valid.rule.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JournalEntryTemplateNameIsValidRule": () => (/* binding */ JournalEntryTemplateNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class JournalEntryTemplateNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);