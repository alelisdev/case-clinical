"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_invoice_shared_invoice_store_ts-libs_web_invoice_ui_web-invoice-select-form_-a27280"],{

/***/ 466774:
/*!******************************************************************!*\
  !*** ./libs/web/invoice/shared/actions/create-invoice.action.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateInvoiceAction": () => (/* binding */ CreateInvoiceAction)
/* harmony export */ });
/* harmony import */ var _invoice_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoice.business-action-base */ 731606);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_invoice_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-invoice-input-is-valid.rule */ 391025);




class CreateInvoiceAction extends _invoice_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InvoiceBusinessActionBase {
  constructor(input) {
    super('CreateInvoiceAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_invoice_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateInvoiceInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateInvoice({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 731606:
/*!*************************************************************************!*\
  !*** ./libs/web/invoice/shared/actions/invoice.business-action-base.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvoiceBusinessActionBase": () => (/* binding */ InvoiceBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class InvoiceBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 222856:
/*!*******************************************************************!*\
  !*** ./libs/web/invoice/shared/actions/update-invoices.action.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateInvoiceAction": () => (/* binding */ UpdateInvoiceAction),
/* harmony export */   "UpdateInvoicesAction": () => (/* binding */ UpdateInvoicesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _invoice_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoice.business-action-base */ 731606);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateInvoicesAction extends _invoice_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InvoiceBusinessActionBase {
  constructor(invoices) {
    super('UpdateInvoicesAction');
    this.invoices = invoices;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.invoices, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateInvoices({
      input: {
        invoices: this.invoices
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateInvoiceAction extends _invoice_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InvoiceBusinessActionBase {
  constructor(invoice, invoiceId) {
    super('UpdateInvoiceAction');
    this.invoice = invoice;
    this.invoiceId = invoiceId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.invoice, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.invoiceId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateInvoice({
      invoiceId: this.invoiceId,
      input: this.invoice
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 606235:
/*!*******************************************************************************!*\
  !*** ./libs/web/invoice/shared/actions/validate-invoice-excel-data.action.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateInvoiceExcelDataAction": () => (/* binding */ ValidateInvoiceExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _invoice_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoice.business-action-base */ 731606);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateInvoiceExcelDataAction extends _invoice_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InvoiceBusinessActionBase {
  constructor(excelData, billingOrganizations, legalCases, invoices) {
    super('ValidateInvoiceExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.billingOrganizations = billingOrganizations;
    this.legalCases = legalCases;
    this.invoices = invoices;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`billingOrganizationName_${index}_is_valid}`, "Billing Organization Is Not Valid", 'billingOrganization.name', datum['billingOrganization'], this.billingOrganizations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`invoiceName_${index}_is_valid}`, "Invoice Is Not Valid", 'invoice.name', datum['invoice'], this.invoices, true));
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

/***/ 252155:
/*!**********************************************************************!*\
  !*** ./libs/web/invoice/shared/invoice.business-provider.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvoiceBusinessProviderService": () => (/* binding */ InvoiceBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_invoice_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-invoice-excel-data.action */ 606235);
/* harmony import */ var _actions_create_invoice_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-invoice.action */ 466774);
/* harmony import */ var _actions_update_invoices_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-invoices.action */ 222856);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class InvoiceBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.InvoiceBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createInvoice(input) {
    const action = new _actions_create_invoice_action__WEBPACK_IMPORTED_MODULE_2__.CreateInvoiceAction(input);
    action.Do(this);
    return action.response;
  }
  updateInvoice(input, invoiceId) {
    const action = new _actions_update_invoices_action__WEBPACK_IMPORTED_MODULE_3__.UpdateInvoiceAction(input, invoiceId);
    action.Do(this);
    return action.response;
  }
  importInvoices(invoices) {
    const updateInvoicesAction = new _actions_update_invoices_action__WEBPACK_IMPORTED_MODULE_3__.UpdateInvoicesAction(invoices);
    updateInvoicesAction.Do(this);
    return updateInvoicesAction.response;
  }
  validateInvoiceExcelData(excelData, billingOrganizations, legalCases, invoices) {
    const validateInvoiceExcelDataAction = new _actions_validate_invoice_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateInvoiceExcelDataAction(excelData, billingOrganizations, legalCases, invoices);
    validateInvoiceExcelDataAction.Do(this);
    return validateInvoiceExcelDataAction.response;
  }
}
InvoiceBusinessProviderService.ɵfac = function InvoiceBusinessProviderService_Factory(t) {
  return new (t || InvoiceBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
InvoiceBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: InvoiceBusinessProviderService,
  factory: InvoiceBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 179095:
/*!****************************************************!*\
  !*** ./libs/web/invoice/shared/invoice.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvoiceService": () => (/* binding */ InvoiceService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _invoice_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invoice.business-provider.service */ 252155);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class InvoiceService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("InvoiceService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createInvoice(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createInvoice(filteredObj);
  }
  updateInvoice(input, invoiceId) {
    return this.businessProvider.updateInvoice(input, invoiceId);
  }
  importInvoices(invoices) {
    return this.businessProvider.importInvoices(invoices);
  }
  validateInvoiceExcelData(excelData, billingOrganizations, legalCases, invoices) {
    return this.businessProvider.validateInvoiceExcelData(excelData, billingOrganizations, legalCases, invoices);
  }
}
InvoiceService.ɵfac = function InvoiceService_Factory(t) {
  return new (t || InvoiceService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_invoice_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.InvoiceBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_invoice_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.InvoiceBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
InvoiceService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: InvoiceService,
  factory: InvoiceService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 21327:
/*!**************************************************!*\
  !*** ./libs/web/invoice/shared/invoice.store.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebInvoiceFeatureStore": () => (/* binding */ WebInvoiceFeatureStore)
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
/* harmony import */ var _invoice_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./invoice.service */ 179095);














class WebInvoiceFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, invoiceService) {
    super({
      loading: false,
      invoices: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      organizationId: undefined,
      legalCaseId: undefined,
      invoiceId: undefined,
      clinicalProviderId: undefined,
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
    this.invoiceService = invoiceService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.invoices$ = this.select(s => s.invoices);
    this.organizations$ = this.select(s => s.organizations || []);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.attorneyId$ = this.select(s => s.attorneyId);
    this.documents$ = this.select(s => s.documents || []);
    this.organizationId$ = this.select(s => s.organizationId);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.invoiceId$ = this.select(s => s.invoiceId);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.invoices$, this.organizations$, this.legalCases$, this.documents$, (errors, loading, item, formName, invoices, organizations, legalCases, documents) => ({
      errors,
      loading,
      item,
      formName,
      invoices,
      organizations,
      legalCases,
      documents
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.organizationId$, this.legalCaseId$, this.invoiceId$, this.searchQuery$, this.attorneyId$, this.clinicalProviderId$, (paging, organizationId, legalCaseId, invoiceId, searchQuery, attorneyId, clinicalProviderId) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      attorneyId,
      clinicalProviderId,
      organizationId: organizationId,
      legalCaseId: legalCaseId,
      invoiceId: invoiceId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setOrganizationId = this.updater((state, organizationId) => Object.assign(Object.assign({}, state), {
      organizationId
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.setAttorneyId = this.updater((state, attorneyId) => Object.assign(Object.assign({}, state), {
      attorneyId
    }));
    this.setInvoiceId = this.updater((state, invoiceId) => Object.assign(Object.assign({}, state), {
      invoiceId
    }));
    this.setSkip = this.updater((state, skip) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        skip: skip
      })
    }));
    this.setLimit = this.updater((state, limit) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        limit: limit
      })
    }));
    this.filterOrganizations = term => this.data.userSelectOrganizations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let organizations = res.data.items;
      this.patchState({
        organizations
      });
      return organizations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
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
    this.filterDocuments = term => this.data.userSelectDocuments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let documents = res.data.items;
      this.patchState({
        documents
      });
      return documents;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addOrganization = this.updater((state, organization) => Object.assign(Object.assign({}, state), {
      organizations: state.organizations.concat(organization)
    }));
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.addDocument = this.updater((state, document) => Object.assign(Object.assign({}, state), {
      documents: state.documents.concat(document)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewInvoice = this.updater((state, invoice) => Object.assign(Object.assign({}, state), {
      invoices: [...state.invoices, invoice]
    }));
    this.updateInvoice = this.updater((state, invoice) => {
      return Object.assign(Object.assign({}, state), {
        invoices: state.invoices.map(el => {
          if (el.id === invoice.id) {
            return invoice;
          } else {
            return el;
          }
        })
      });
    });
    this.addInvoices = this.updater((state, newInvoices) => Object.assign(Object.assign({}, state), {
      invoices: state.invoices.concat(newInvoices)
    }));
    this.updateInvoices = this.updater((state, updatedInvoices) => {
      return Object.assign(Object.assign({}, state), {
        invoices: state.invoices.map(invoice => {
          const updated = updatedInvoices.find(el => el.id === invoice.id);
          return updated ? updated : invoice;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadInvoiceEffect = this.effect(invoiceId$ => invoiceId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(invoiceId => this.data.userInvoice({
      invoiceId
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
    this.loadInvoicesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userInvoices({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      console.log({
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      });
      this.patchState({
        paging: {
          limit: input.limit,
          skip: input.skip,
          total: res.data.count.total
        },
        invoices: res.data.items,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createInvoiceEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.invoiceService.createInvoice(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(invoice => {
      this.addNewInvoice(invoice);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: invoice,
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
    this.updateInvoiceEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.invoiceService.updateInvoice(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(invoice => {
      this.updateInvoice(invoice);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: invoice,
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
    this.deleteInvoiceEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, invoice]) => {
      return this.data.userDeleteInvoice({
        invoiceId: invoice.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.invoiceService.importInvoices(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addInvoices(created);
      this.updateInvoices(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('invoiceId')) {
      var invoiceId = this.route.snapshot.paramMap.get('invoiceId');
      this.setFormName('invoice_edit');
    } else {
      this.setFormName('invoice_create');
    }
    if (this.route.snapshot.paramMap.has("organizationId")) {
      var organizationId = this.route.snapshot.paramMap.get("organizationId");
      this.setOrganizationId(organizationId);
    }
    if (this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId");
      this.setLegalCaseId(legalCaseId);
    }
    if (this.route.snapshot.paramMap.has("invoiceId")) {
      var invoiceId = this.route.snapshot.paramMap.get("invoiceId");
      this.setInvoiceId(invoiceId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.invoiceService.validateInvoiceExcelData(excelData, vm.organizations, vm.legalCases, vm.documents);
    }));
  }
}
WebInvoiceFeatureStore.ɵfac = function WebInvoiceFeatureStore_Factory(t) {
  return new (t || WebInvoiceFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_invoice_service__WEBPACK_IMPORTED_MODULE_12__.InvoiceService));
};
WebInvoiceFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebInvoiceFeatureStore,
  factory: WebInvoiceFeatureStore.ɵfac
});

/***/ }),

/***/ 391025:
/*!*****************************************************************************!*\
  !*** ./libs/web/invoice/shared/rules/create-invoice-input-is-valid.rule.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateInvoiceInputIsValidRule": () => (/* binding */ CreateInvoiceInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _invoice_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoice-name-is-valid.rule */ 718831);


class CreateInvoiceInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _invoice_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.InvoiceNameIsValidRule('name', 'The invoice name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 718831:
/*!*********************************************************************!*\
  !*** ./libs/web/invoice/shared/rules/invoice-name-is-valid.rule.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvoiceNameIsValidRule": () => (/* binding */ InvoiceNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class InvoiceNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 132872:
/*!************************************************************************************************!*\
  !*** ./libs/web/invoice/ui/web-invoice-select-form/web-invoice-select-table-view.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebInvoiceSelectTableViewComponent": () => (/* binding */ WebInvoiceSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebInvoiceSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.invoices = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'billingOrganization.name',
      headerName: 'Billing Organization',
      filter: 'agTextColumnFilter'
    }, {
      field: 'clinicalProvider.name',
      headerName: 'Clinical Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'legalCase.name',
      headerName: 'Legal Case',
      filter: 'agTextColumnFilter'
    }, {
      field: 'invoice.name',
      headerName: 'Invoice',
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
      field: 'invoiceNumber',
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
      headerName: 'Paid',
      field: 'paid',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.paid, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Due',
      field: 'due',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.due, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'organizationId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'legalCaseId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'invoiceId',
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
WebInvoiceSelectTableViewComponent.ɵfac = function WebInvoiceSelectTableViewComponent_Factory(t) {
  return new (t || WebInvoiceSelectTableViewComponent)();
};
WebInvoiceSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebInvoiceSelectTableViewComponent,
  selectors: [["ui-invoice-select-table-view"]],
  viewQuery: function WebInvoiceSelectTableViewComponent_Query(rf, ctx) {
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
    invoices: "invoices"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebInvoiceSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebInvoiceSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebInvoiceSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.invoices)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);