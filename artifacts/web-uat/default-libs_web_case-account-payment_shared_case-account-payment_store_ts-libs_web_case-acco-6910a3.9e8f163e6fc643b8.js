"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_case-account-payment_shared_case-account-payment_store_ts-libs_web_case-acco-6910a3"],{

/***/ 154139:
/*!***************************************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/actions/case-account-payment.business-action-base.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseAccountPaymentBusinessActionBase": () => (/* binding */ CaseAccountPaymentBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class CaseAccountPaymentBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 858068:
/*!********************************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/actions/create-case-account-payment.action.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseAccountPaymentAction": () => (/* binding */ CreateCaseAccountPaymentAction)
/* harmony export */ });
/* harmony import */ var _case_account_payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-account-payment.business-action-base */ 154139);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_case_account_payment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-case-account-payment-input-is-valid.rule */ 212941);




class CreateCaseAccountPaymentAction extends _case_account_payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseAccountPaymentBusinessActionBase {
  constructor(input) {
    super('CreateCaseAccountPaymentAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_case_account_payment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateCaseAccountPaymentInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateCaseAccountPayment({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 607153:
/*!*********************************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/actions/update-case-account-payments.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCaseAccountPaymentAction": () => (/* binding */ UpdateCaseAccountPaymentAction),
/* harmony export */   "UpdateCaseAccountPaymentsAction": () => (/* binding */ UpdateCaseAccountPaymentsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_account_payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-account-payment.business-action-base */ 154139);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateCaseAccountPaymentsAction extends _case_account_payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseAccountPaymentBusinessActionBase {
  constructor(caseAccountPayments) {
    super('UpdateCaseAccountPaymentsAction');
    this.caseAccountPayments = caseAccountPayments;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseAccountPayments, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseAccountPayments({
      input: {
        caseAccountPayments: this.caseAccountPayments
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateCaseAccountPaymentAction extends _case_account_payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseAccountPaymentBusinessActionBase {
  constructor(caseAccountPayment, caseAccountPaymentId) {
    super('UpdateCaseAccountPaymentAction');
    this.caseAccountPayment = caseAccountPayment;
    this.caseAccountPaymentId = caseAccountPaymentId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseAccountPayment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.caseAccountPaymentId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseAccountPayment({
      caseAccountPaymentId: this.caseAccountPaymentId,
      input: this.caseAccountPayment
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 876533:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/actions/validate-case-account-payment-excel-data.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateCaseAccountPaymentExcelDataAction": () => (/* binding */ ValidateCaseAccountPaymentExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_account_payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-account-payment.business-action-base */ 154139);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateCaseAccountPaymentExcelDataAction extends _case_account_payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseAccountPaymentBusinessActionBase {
  constructor(excelData, payments, caseAccounts) {
    super('ValidateCaseAccountPaymentExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.payments = payments;
    this.caseAccounts = caseAccounts;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`paymentName_${index}_is_valid}`, "Payment Is Not Valid", 'payment.name', datum['payment'], this.payments, true));
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

/***/ 922489:
/*!************************************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/case-account-payment.business-provider.service.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseAccountPaymentBusinessProviderService": () => (/* binding */ CaseAccountPaymentBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_case_account_payment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-case-account-payment-excel-data.action */ 876533);
/* harmony import */ var _actions_create_case_account_payment_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-case-account-payment.action */ 858068);
/* harmony import */ var _actions_update_case_account_payments_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-case-account-payments.action */ 607153);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class CaseAccountPaymentBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.CaseAccountPaymentBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createCaseAccountPayment(input) {
    const action = new _actions_create_case_account_payment_action__WEBPACK_IMPORTED_MODULE_2__.CreateCaseAccountPaymentAction(input);
    action.Do(this);
    return action.response;
  }
  updateCaseAccountPayment(input, caseAccountPaymentId) {
    const action = new _actions_update_case_account_payments_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseAccountPaymentAction(input, caseAccountPaymentId);
    action.Do(this);
    return action.response;
  }
  importCaseAccountPayments(caseAccountPayments) {
    const updateCaseAccountPaymentsAction = new _actions_update_case_account_payments_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseAccountPaymentsAction(caseAccountPayments);
    updateCaseAccountPaymentsAction.Do(this);
    return updateCaseAccountPaymentsAction.response;
  }
  validateCaseAccountPaymentExcelData(excelData, payments, caseAccounts) {
    const validateCaseAccountPaymentExcelDataAction = new _actions_validate_case_account_payment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateCaseAccountPaymentExcelDataAction(excelData, payments, caseAccounts);
    validateCaseAccountPaymentExcelDataAction.Do(this);
    return validateCaseAccountPaymentExcelDataAction.response;
  }
}
CaseAccountPaymentBusinessProviderService.ɵfac = function CaseAccountPaymentBusinessProviderService_Factory(t) {
  return new (t || CaseAccountPaymentBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
CaseAccountPaymentBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: CaseAccountPaymentBusinessProviderService,
  factory: CaseAccountPaymentBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 380224:
/*!******************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/case-account-payment.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseAccountPaymentService": () => (/* binding */ CaseAccountPaymentService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _case_account_payment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./case-account-payment.business-provider.service */ 922489);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class CaseAccountPaymentService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("CaseAccountPaymentService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createCaseAccountPayment(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createCaseAccountPayment(filteredObj);
  }
  updateCaseAccountPayment(input, caseAccountPaymentId) {
    return this.businessProvider.updateCaseAccountPayment(input, caseAccountPaymentId);
  }
  importCaseAccountPayments(caseAccountPayments) {
    return this.businessProvider.importCaseAccountPayments(caseAccountPayments);
  }
  validateCaseAccountPaymentExcelData(excelData, payments, caseAccounts) {
    return this.businessProvider.validateCaseAccountPaymentExcelData(excelData, payments, caseAccounts);
  }
}
CaseAccountPaymentService.ɵfac = function CaseAccountPaymentService_Factory(t) {
  return new (t || CaseAccountPaymentService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_account_payment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseAccountPaymentBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_account_payment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseAccountPaymentBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
CaseAccountPaymentService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CaseAccountPaymentService,
  factory: CaseAccountPaymentService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 292793:
/*!****************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/case-account-payment.store.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountPaymentFeatureStore": () => (/* binding */ WebCaseAccountPaymentFeatureStore)
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
/* harmony import */ var _case_account_payment_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./case-account-payment.service */ 380224);














class WebCaseAccountPaymentFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, caseAccountPaymentService) {
    super({
      loading: false,
      caseAccountPayments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      paymentId: undefined,
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
    this.caseAccountPaymentService = caseAccountPaymentService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.caseAccountPayments$ = this.select(s => s.caseAccountPayments);
    this.payments$ = this.select(s => s.payments || []);
    this.caseAccounts$ = this.select(s => s.caseAccounts || []);
    this.paymentId$ = this.select(s => s.paymentId);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseAccountPayments$, this.payments$, this.caseAccounts$, (errors, loading, item, formName, caseAccountPayments, payments, caseAccounts) => ({
      errors,
      loading,
      item,
      formName,
      caseAccountPayments,
      payments,
      caseAccounts
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.paymentId$, this.caseAccountId$, this.searchQuery$, (paging, paymentId, caseAccountId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      paymentId: paymentId,
      caseAccountId: caseAccountId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setPaymentId = this.updater((state, paymentId) => Object.assign(Object.assign({}, state), {
      paymentId
    }));
    this.setCaseAccountId = this.updater((state, caseAccountId) => Object.assign(Object.assign({}, state), {
      caseAccountId
    }));
    this.filterPayments = term => this.data.userSelectPayments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let payments = res.data.items;
      this.patchState({
        payments
      });
      return payments;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
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
    this.addPayment = this.updater((state, payment) => Object.assign(Object.assign({}, state), {
      payments: state.payments.concat(payment)
    }));
    this.addCaseAccount = this.updater((state, caseAccount) => Object.assign(Object.assign({}, state), {
      caseAccounts: state.caseAccounts.concat(caseAccount)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewCaseAccountPayment = this.updater((state, caseAccountPayment) => Object.assign(Object.assign({}, state), {
      caseAccountPayments: [...state.caseAccountPayments, caseAccountPayment]
    }));
    this.updateCaseAccountPayment = this.updater((state, caseAccountPayment) => {
      return Object.assign(Object.assign({}, state), {
        caseAccountPayments: state.caseAccountPayments.map(el => {
          if (el.id === caseAccountPayment.id) {
            return caseAccountPayment;
          } else {
            return el;
          }
        })
      });
    });
    this.addCaseAccountPayments = this.updater((state, newCaseAccountPayments) => Object.assign(Object.assign({}, state), {
      caseAccountPayments: state.caseAccountPayments.concat(newCaseAccountPayments)
    }));
    this.updateCaseAccountPayments = this.updater((state, updatedCaseAccountPayments) => {
      return Object.assign(Object.assign({}, state), {
        caseAccountPayments: state.caseAccountPayments.map(caseAccountPayment => {
          const updated = updatedCaseAccountPayments.find(el => el.id === caseAccountPayment.id);
          return updated ? updated : caseAccountPayment;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadCaseAccountPaymentEffect = this.effect(caseAccountPaymentId$ => caseAccountPaymentId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(caseAccountPaymentId => this.data.userCaseAccountPayment({
      caseAccountPaymentId
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
    this.loadCaseAccountPaymentsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userCaseAccountPayments({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      caseAccountPayments: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createCaseAccountPaymentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.caseAccountPaymentService.createCaseAccountPayment(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseAccountPayment => {
      this.addNewCaseAccountPayment(caseAccountPayment);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: caseAccountPayment,
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
    this.updateCaseAccountPaymentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.caseAccountPaymentService.updateCaseAccountPayment(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseAccountPayment => {
      this.updateCaseAccountPayment(caseAccountPayment);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: caseAccountPayment,
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
    this.deleteCaseAccountPaymentEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, caseAccountPayment]) => {
      return this.data.userDeleteCaseAccountPayment({
        caseAccountPaymentId: caseAccountPayment.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.caseAccountPaymentService.importCaseAccountPayments(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addCaseAccountPayments(created);
      this.updateCaseAccountPayments(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('caseAccountPaymentId')) {
      var caseAccountPaymentId = this.route.snapshot.paramMap.get('caseAccountPaymentId');
      this.setFormName('caseAccountPayment_edit');
    } else {
      this.setFormName('caseAccountPayment_create');
    }
    if (this.route.snapshot.paramMap.has("paymentId")) {
      var paymentId = this.route.snapshot.paramMap.get("paymentId");
      this.setPaymentId(paymentId);
    }
    if (this.route.snapshot.paramMap.has("caseAccountId")) {
      var caseAccountId = this.route.snapshot.paramMap.get("caseAccountId");
      this.setCaseAccountId(caseAccountId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.caseAccountPaymentService.validateCaseAccountPaymentExcelData(excelData, vm.payments, vm.caseAccounts);
    }));
  }
}
WebCaseAccountPaymentFeatureStore.ɵfac = function WebCaseAccountPaymentFeatureStore_Factory(t) {
  return new (t || WebCaseAccountPaymentFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_account_payment_service__WEBPACK_IMPORTED_MODULE_12__.CaseAccountPaymentService));
};
WebCaseAccountPaymentFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebCaseAccountPaymentFeatureStore,
  factory: WebCaseAccountPaymentFeatureStore.ɵfac
});

/***/ }),

/***/ 899441:
/*!***********************************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/rules/case-account-payment-name-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseAccountPaymentNameIsValidRule": () => (/* binding */ CaseAccountPaymentNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CaseAccountPaymentNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 212941:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/case-account-payment/shared/rules/create-case-account-payment-input-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseAccountPaymentInputIsValidRule": () => (/* binding */ CreateCaseAccountPaymentInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _case_account_payment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-account-payment-name-is-valid.rule */ 899441);


class CreateCaseAccountPaymentInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _case_account_payment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.CaseAccountPaymentNameIsValidRule('name', 'The caseaccountpayment name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 139173:
/*!***************************************************************************************************************************************!*\
  !*** ./libs/web/case-account-payment/ui/web-case-account-payment-select-form/web-case-account-payment-select-table-view.component.ts ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountPaymentSelectTableViewComponent": () => (/* binding */ WebCaseAccountPaymentSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebCaseAccountPaymentSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.caseAccountPayments = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'payment.name',
      headerName: 'Payment',
      filter: 'agTextColumnFilter'
    }, {
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
      headerName: 'Amount Applied',
      field: 'amountApplied',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.amountApplied, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'paymentId',
      filter: 'agTextColumnFilter',
      hide: true
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
WebCaseAccountPaymentSelectTableViewComponent.ɵfac = function WebCaseAccountPaymentSelectTableViewComponent_Factory(t) {
  return new (t || WebCaseAccountPaymentSelectTableViewComponent)();
};
WebCaseAccountPaymentSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebCaseAccountPaymentSelectTableViewComponent,
  selectors: [["ui-case-account-payment-select-table-view"]],
  viewQuery: function WebCaseAccountPaymentSelectTableViewComponent_Query(rf, ctx) {
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
    caseAccountPayments: "caseAccountPayments"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebCaseAccountPaymentSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebCaseAccountPaymentSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebCaseAccountPaymentSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.caseAccountPayments)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);