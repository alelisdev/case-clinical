"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_payment_shared_payment_store_ts"],{

/***/ 292799:
/*!******************************************************************!*\
  !*** ./libs/web/payment/shared/actions/create-payment.action.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePaymentAction": () => (/* binding */ CreatePaymentAction)
/* harmony export */ });
/* harmony import */ var _payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment.business-action-base */ 531300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_payment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-payment-input-is-valid.rule */ 147901);




class CreatePaymentAction extends _payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PaymentBusinessActionBase {
  constructor(input) {
    super('CreatePaymentAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_payment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePaymentInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePayment({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 531300:
/*!*************************************************************************!*\
  !*** ./libs/web/payment/shared/actions/payment.business-action-base.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentBusinessActionBase": () => (/* binding */ PaymentBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PaymentBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 9213:
/*!*******************************************************************!*\
  !*** ./libs/web/payment/shared/actions/update-payments.action.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePaymentAction": () => (/* binding */ UpdatePaymentAction),
/* harmony export */   "UpdatePaymentsAction": () => (/* binding */ UpdatePaymentsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment.business-action-base */ 531300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePaymentsAction extends _payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PaymentBusinessActionBase {
  constructor(payments) {
    super('UpdatePaymentsAction');
    this.payments = payments;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.payments, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePayments({
      input: {
        payments: this.payments
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePaymentAction extends _payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PaymentBusinessActionBase {
  constructor(payment, paymentId) {
    super('UpdatePaymentAction');
    this.payment = payment;
    this.paymentId = paymentId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.payment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.paymentId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePayment({
      paymentId: this.paymentId,
      input: this.payment
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 435003:
/*!*******************************************************************************!*\
  !*** ./libs/web/payment/shared/actions/validate-payment-excel-data.action.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePaymentExcelDataAction": () => (/* binding */ ValidatePaymentExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment.business-action-base */ 531300);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePaymentExcelDataAction extends _payment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PaymentBusinessActionBase {
  constructor(excelData, batchControls, banks, payorTypes, paymentTypes, paymentApplicationMethods) {
    super('ValidatePaymentExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.batchControls = batchControls;
    this.banks = banks;
    this.payorTypes = payorTypes;
    this.paymentTypes = paymentTypes;
    this.paymentApplicationMethods = paymentApplicationMethods;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`batchControlName_${index}_is_valid}`, "Batch Control Is Not Valid", 'batchControl.name', datum['batchControl'], this.batchControls, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`bankName_${index}_is_valid}`, "Bank Is Not Valid", 'bank.name', datum['bank'], this.banks, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`payorTypeName_${index}_is_valid}`, "Payor Type Is Not Valid", 'payorType.name', datum['payorType'], this.payorTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`paymentTypeName_${index}_is_valid}`, "Payment Type Is Not Valid", 'paymentType.name', datum['paymentType'], this.paymentTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`paymentApplicationMethodName_${index}_is_valid}`, "Payment Application Method Is Not Valid", 'paymentApplicationMethod.name', datum['paymentApplicationMethod'], this.paymentApplicationMethods, true));
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

/***/ 537824:
/*!**********************************************************************!*\
  !*** ./libs/web/payment/shared/payment.business-provider.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentBusinessProviderService": () => (/* binding */ PaymentBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_payment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-payment-excel-data.action */ 435003);
/* harmony import */ var _actions_create_payment_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-payment.action */ 292799);
/* harmony import */ var _actions_update_payments_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-payments.action */ 9213);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PaymentBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PaymentBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPayment(input) {
    const action = new _actions_create_payment_action__WEBPACK_IMPORTED_MODULE_2__.CreatePaymentAction(input);
    action.Do(this);
    return action.response;
  }
  updatePayment(input, paymentId) {
    const action = new _actions_update_payments_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePaymentAction(input, paymentId);
    action.Do(this);
    return action.response;
  }
  importPayments(payments) {
    const updatePaymentsAction = new _actions_update_payments_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePaymentsAction(payments);
    updatePaymentsAction.Do(this);
    return updatePaymentsAction.response;
  }
  validatePaymentExcelData(excelData, batchControls, banks, payorTypes, paymentTypes, paymentApplicationMethods) {
    const validatePaymentExcelDataAction = new _actions_validate_payment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePaymentExcelDataAction(excelData, batchControls, banks, payorTypes, paymentTypes, paymentApplicationMethods);
    validatePaymentExcelDataAction.Do(this);
    return validatePaymentExcelDataAction.response;
  }
}
PaymentBusinessProviderService.ɵfac = function PaymentBusinessProviderService_Factory(t) {
  return new (t || PaymentBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PaymentBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PaymentBusinessProviderService,
  factory: PaymentBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 745168:
/*!****************************************************!*\
  !*** ./libs/web/payment/shared/payment.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentService": () => (/* binding */ PaymentService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _payment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment.business-provider.service */ 537824);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PaymentService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PaymentService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPayment(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPayment(filteredObj);
  }
  updatePayment(input, paymentId) {
    return this.businessProvider.updatePayment(input, paymentId);
  }
  importPayments(payments) {
    return this.businessProvider.importPayments(payments);
  }
  validatePaymentExcelData(excelData, batchControls, banks, payorTypes, paymentTypes, paymentApplicationMethods) {
    return this.businessProvider.validatePaymentExcelData(excelData, batchControls, banks, payorTypes, paymentTypes, paymentApplicationMethods);
  }
}
PaymentService.ɵfac = function PaymentService_Factory(t) {
  return new (t || PaymentService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_payment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PaymentBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_payment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PaymentBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PaymentService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PaymentService,
  factory: PaymentService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 113727:
/*!**************************************************!*\
  !*** ./libs/web/payment/shared/payment.store.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPaymentFeatureStore": () => (/* binding */ WebPaymentFeatureStore)
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
/* harmony import */ var _payment_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./payment.service */ 745168);














class WebPaymentFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, paymentService) {
    super({
      loading: false,
      payments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      batchControlId: undefined,
      bankId: undefined,
      payorTypeId: undefined,
      paymentTypeId: undefined,
      paymentApplicationMethodId: undefined,
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
    this.paymentService = paymentService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.payments$ = this.select(s => s.payments);
    this.batchControls$ = this.select(s => s.batchControls || []);
    this.banks$ = this.select(s => s.banks || []);
    this.payorTypes$ = this.select(s => s.payorTypes || []);
    this.paymentTypes$ = this.select(s => s.paymentTypes || []);
    this.paymentApplicationMethods$ = this.select(s => s.paymentApplicationMethods || []);
    this.batchControlId$ = this.select(s => s.batchControlId);
    this.bankId$ = this.select(s => s.bankId);
    this.payorTypeId$ = this.select(s => s.payorTypeId);
    this.paymentTypeId$ = this.select(s => s.paymentTypeId);
    this.paymentApplicationMethodId$ = this.select(s => s.paymentApplicationMethodId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.payments$, this.batchControls$, this.banks$, this.payorTypes$, this.paymentTypes$, this.paymentApplicationMethods$, (errors, loading, item, formName, payments, batchControls, banks, payorTypes, paymentTypes, paymentApplicationMethods) => ({
      errors,
      loading,
      item,
      formName,
      payments,
      batchControls,
      banks,
      payorTypes,
      paymentTypes,
      paymentApplicationMethods
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.batchControlId$, this.bankId$, this.payorTypeId$, this.paymentTypeId$, this.paymentApplicationMethodId$, this.searchQuery$, (paging, batchControlId, bankId, payorTypeId, paymentTypeId, paymentApplicationMethodId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      batchControlId: batchControlId,
      bankId: bankId,
      payorTypeId: payorTypeId,
      paymentTypeId: paymentTypeId,
      paymentApplicationMethodId: paymentApplicationMethodId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setBatchControlId = this.updater((state, batchControlId) => Object.assign(Object.assign({}, state), {
      batchControlId
    }));
    this.setBankId = this.updater((state, bankId) => Object.assign(Object.assign({}, state), {
      bankId
    }));
    this.setPayorTypeId = this.updater((state, payorTypeId) => Object.assign(Object.assign({}, state), {
      payorTypeId
    }));
    this.setPaymentTypeId = this.updater((state, paymentTypeId) => Object.assign(Object.assign({}, state), {
      paymentTypeId
    }));
    this.setPaymentApplicationMethodId = this.updater((state, paymentApplicationMethodId) => Object.assign(Object.assign({}, state), {
      paymentApplicationMethodId
    }));
    this.filterBatchControls = term => this.data.userSelectBatchControls({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let batchControls = res.data.items;
      this.patchState({
        batchControls
      });
      return batchControls;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterBanks = term => this.data.userSelectBanks({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let banks = res.data.items;
      this.patchState({
        banks
      });
      return banks;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPayorTypes = term => this.data.userSelectPayorTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let payorTypes = res.data.items;
      this.patchState({
        payorTypes
      });
      return payorTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPaymentTypes = term => this.data.userSelectPaymentTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let paymentTypes = res.data.items;
      this.patchState({
        paymentTypes
      });
      return paymentTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPaymentApplicationMethods = term => this.data.userSelectPaymentApplicationMethods({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let paymentApplicationMethods = res.data.items;
      this.patchState({
        paymentApplicationMethods
      });
      return paymentApplicationMethods;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addBatchControl = this.updater((state, batchControl) => Object.assign(Object.assign({}, state), {
      batchControls: state.batchControls.concat(batchControl)
    }));
    this.addBank = this.updater((state, bank) => Object.assign(Object.assign({}, state), {
      banks: state.banks.concat(bank)
    }));
    this.addPayorType = this.updater((state, payorType) => Object.assign(Object.assign({}, state), {
      payorTypes: state.payorTypes.concat(payorType)
    }));
    this.addPaymentType = this.updater((state, paymentType) => Object.assign(Object.assign({}, state), {
      paymentTypes: state.paymentTypes.concat(paymentType)
    }));
    this.addPaymentApplicationMethod = this.updater((state, paymentApplicationMethod) => Object.assign(Object.assign({}, state), {
      paymentApplicationMethods: state.paymentApplicationMethods.concat(paymentApplicationMethod)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPayment = this.updater((state, payment) => Object.assign(Object.assign({}, state), {
      payments: [...state.payments, payment]
    }));
    this.updatePayment = this.updater((state, payment) => {
      return Object.assign(Object.assign({}, state), {
        payments: state.payments.map(el => {
          if (el.id === payment.id) {
            return payment;
          } else {
            return el;
          }
        })
      });
    });
    this.addPayments = this.updater((state, newPayments) => Object.assign(Object.assign({}, state), {
      payments: state.payments.concat(newPayments)
    }));
    this.updatePayments = this.updater((state, updatedPayments) => {
      return Object.assign(Object.assign({}, state), {
        payments: state.payments.map(payment => {
          const updated = updatedPayments.find(el => el.id === payment.id);
          return updated ? updated : payment;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPaymentEffect = this.effect(paymentId$ => paymentId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(paymentId => this.data.userPayment({
      paymentId
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
    this.loadPaymentsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPayments({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      payments: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPaymentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.paymentService.createPayment(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(payment => {
      this.addNewPayment(payment);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: payment,
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
    this.updatePaymentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.paymentService.updatePayment(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(payment => {
      this.updatePayment(payment);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: payment,
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
    this.deletePaymentEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, payment]) => {
      return this.data.userDeletePayment({
        paymentId: payment.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.paymentService.importPayments(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPayments(created);
      this.updatePayments(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('paymentId')) {
      var paymentId = this.route.snapshot.paramMap.get('paymentId');
      this.setFormName('payment_edit');
    } else {
      this.setFormName('payment_create');
    }
    if (this.route.snapshot.paramMap.has("batchControlId")) {
      var batchControlId = this.route.snapshot.paramMap.get("batchControlId");
      this.setBatchControlId(batchControlId);
    }
    if (this.route.snapshot.paramMap.has("bankId")) {
      var bankId = this.route.snapshot.paramMap.get("bankId");
      this.setBankId(bankId);
    }
    if (this.route.snapshot.paramMap.has("payorTypeId")) {
      var payorTypeId = this.route.snapshot.paramMap.get("payorTypeId");
      this.setPayorTypeId(payorTypeId);
    }
    if (this.route.snapshot.paramMap.has("paymentTypeId")) {
      var paymentTypeId = this.route.snapshot.paramMap.get("paymentTypeId");
      this.setPaymentTypeId(paymentTypeId);
    }
    if (this.route.snapshot.paramMap.has("paymentApplicationMethodId")) {
      var paymentApplicationMethodId = this.route.snapshot.paramMap.get("paymentApplicationMethodId");
      this.setPaymentApplicationMethodId(paymentApplicationMethodId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.paymentService.validatePaymentExcelData(excelData, vm.batchControls, vm.banks, vm.payorTypes, vm.paymentTypes, vm.paymentApplicationMethods);
    }));
  }
}
WebPaymentFeatureStore.ɵfac = function WebPaymentFeatureStore_Factory(t) {
  return new (t || WebPaymentFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_payment_service__WEBPACK_IMPORTED_MODULE_12__.PaymentService));
};
WebPaymentFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPaymentFeatureStore,
  factory: WebPaymentFeatureStore.ɵfac
});

/***/ }),

/***/ 147901:
/*!*****************************************************************************!*\
  !*** ./libs/web/payment/shared/rules/create-payment-input-is-valid.rule.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePaymentInputIsValidRule": () => (/* binding */ CreatePaymentInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _payment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-name-is-valid.rule */ 970722);


class CreatePaymentInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _payment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PaymentNameIsValidRule('name', 'The payment name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 970722:
/*!*********************************************************************!*\
  !*** ./libs/web/payment/shared/rules/payment-name-is-valid.rule.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentNameIsValidRule": () => (/* binding */ PaymentNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PaymentNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);