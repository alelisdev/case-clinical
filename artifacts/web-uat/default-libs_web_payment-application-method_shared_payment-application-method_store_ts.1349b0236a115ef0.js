"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_payment-application-method_shared_payment-application-method_store_ts"],{

/***/ 789757:
/*!********************************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/actions/create-payment-application-method.action.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePaymentApplicationMethodAction": () => (/* binding */ CreatePaymentApplicationMethodAction)
/* harmony export */ });
/* harmony import */ var _payment_application_method_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-application-method.business-action-base */ 19887);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_payment_application_method_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-payment-application-method-input-is-valid.rule */ 265635);




class CreatePaymentApplicationMethodAction extends _payment_application_method_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PaymentApplicationMethodBusinessActionBase {
  constructor(input) {
    super('CreatePaymentApplicationMethodAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_payment_application_method_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePaymentApplicationMethodInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePaymentApplicationMethod({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 19887:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/actions/payment-application-method.business-action-base.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentApplicationMethodBusinessActionBase": () => (/* binding */ PaymentApplicationMethodBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PaymentApplicationMethodBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 411442:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/actions/update-payment-application-methods.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePaymentApplicationMethodAction": () => (/* binding */ UpdatePaymentApplicationMethodAction),
/* harmony export */   "UpdatePaymentApplicationMethodsAction": () => (/* binding */ UpdatePaymentApplicationMethodsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _payment_application_method_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-application-method.business-action-base */ 19887);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePaymentApplicationMethodsAction extends _payment_application_method_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PaymentApplicationMethodBusinessActionBase {
  constructor(paymentApplicationMethods) {
    super('UpdatePaymentApplicationMethodsAction');
    this.paymentApplicationMethods = paymentApplicationMethods;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.paymentApplicationMethods, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePaymentApplicationMethods({
      input: {
        paymentApplicationMethods: this.paymentApplicationMethods
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePaymentApplicationMethodAction extends _payment_application_method_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PaymentApplicationMethodBusinessActionBase {
  constructor(paymentApplicationMethod, paymentApplicationMethodId) {
    super('UpdatePaymentApplicationMethodAction');
    this.paymentApplicationMethod = paymentApplicationMethod;
    this.paymentApplicationMethodId = paymentApplicationMethodId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.paymentApplicationMethod, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.paymentApplicationMethodId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePaymentApplicationMethod({
      paymentApplicationMethodId: this.paymentApplicationMethodId,
      input: this.paymentApplicationMethod
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 758042:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/actions/validate-payment-application-method-excel-data.action.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePaymentApplicationMethodExcelDataAction": () => (/* binding */ ValidatePaymentApplicationMethodExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _payment_application_method_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-application-method.business-action-base */ 19887);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePaymentApplicationMethodExcelDataAction extends _payment_application_method_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PaymentApplicationMethodBusinessActionBase {
  constructor(excelData) {
    super('ValidatePaymentApplicationMethodExcelDataAction');
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

/***/ 371792:
/*!************************************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/payment-application-method.business-provider.service.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentApplicationMethodBusinessProviderService": () => (/* binding */ PaymentApplicationMethodBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_payment_application_method_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-payment-application-method-excel-data.action */ 758042);
/* harmony import */ var _actions_create_payment_application_method_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-payment-application-method.action */ 789757);
/* harmony import */ var _actions_update_payment_application_methods_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-payment-application-methods.action */ 411442);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PaymentApplicationMethodBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PaymentApplicationMethodBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPaymentApplicationMethod(input) {
    const action = new _actions_create_payment_application_method_action__WEBPACK_IMPORTED_MODULE_2__.CreatePaymentApplicationMethodAction(input);
    action.Do(this);
    return action.response;
  }
  updatePaymentApplicationMethod(input, paymentApplicationMethodId) {
    const action = new _actions_update_payment_application_methods_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePaymentApplicationMethodAction(input, paymentApplicationMethodId);
    action.Do(this);
    return action.response;
  }
  importPaymentApplicationMethods(paymentApplicationMethods) {
    const updatePaymentApplicationMethodsAction = new _actions_update_payment_application_methods_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePaymentApplicationMethodsAction(paymentApplicationMethods);
    updatePaymentApplicationMethodsAction.Do(this);
    return updatePaymentApplicationMethodsAction.response;
  }
  validatePaymentApplicationMethodExcelData(excelData) {
    const validatePaymentApplicationMethodExcelDataAction = new _actions_validate_payment_application_method_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePaymentApplicationMethodExcelDataAction(excelData);
    validatePaymentApplicationMethodExcelDataAction.Do(this);
    return validatePaymentApplicationMethodExcelDataAction.response;
  }
}
PaymentApplicationMethodBusinessProviderService.ɵfac = function PaymentApplicationMethodBusinessProviderService_Factory(t) {
  return new (t || PaymentApplicationMethodBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PaymentApplicationMethodBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PaymentApplicationMethodBusinessProviderService,
  factory: PaymentApplicationMethodBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 574970:
/*!******************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/payment-application-method.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentApplicationMethodService": () => (/* binding */ PaymentApplicationMethodService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _payment_application_method_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment-application-method.business-provider.service */ 371792);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PaymentApplicationMethodService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PaymentApplicationMethodService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPaymentApplicationMethod(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPaymentApplicationMethod(filteredObj);
  }
  updatePaymentApplicationMethod(input, paymentApplicationMethodId) {
    return this.businessProvider.updatePaymentApplicationMethod(input, paymentApplicationMethodId);
  }
  importPaymentApplicationMethods(paymentApplicationMethods) {
    return this.businessProvider.importPaymentApplicationMethods(paymentApplicationMethods);
  }
  validatePaymentApplicationMethodExcelData(excelData) {
    return this.businessProvider.validatePaymentApplicationMethodExcelData(excelData);
  }
}
PaymentApplicationMethodService.ɵfac = function PaymentApplicationMethodService_Factory(t) {
  return new (t || PaymentApplicationMethodService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_payment_application_method_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PaymentApplicationMethodBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_payment_application_method_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PaymentApplicationMethodBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PaymentApplicationMethodService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PaymentApplicationMethodService,
  factory: PaymentApplicationMethodService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 423809:
/*!****************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/payment-application-method.store.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPaymentApplicationMethodFeatureStore": () => (/* binding */ WebPaymentApplicationMethodFeatureStore)
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
/* harmony import */ var _payment_application_method_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./payment-application-method.service */ 574970);














class WebPaymentApplicationMethodFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, paymentApplicationMethodService) {
    super({
      loading: false,
      paymentApplicationMethods: [],
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
    this.paymentApplicationMethodService = paymentApplicationMethodService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.paymentApplicationMethods$ = this.select(s => s.paymentApplicationMethods);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.paymentApplicationMethods$, (errors, loading, item, formName, paymentApplicationMethods) => ({
      errors,
      loading,
      item,
      formName,
      paymentApplicationMethods
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
    this.addNewPaymentApplicationMethod = this.updater((state, paymentApplicationMethod) => Object.assign(Object.assign({}, state), {
      paymentApplicationMethods: [...state.paymentApplicationMethods, paymentApplicationMethod]
    }));
    this.updatePaymentApplicationMethod = this.updater((state, paymentApplicationMethod) => {
      return Object.assign(Object.assign({}, state), {
        paymentApplicationMethods: state.paymentApplicationMethods.map(el => {
          if (el.id === paymentApplicationMethod.id) {
            return paymentApplicationMethod;
          } else {
            return el;
          }
        })
      });
    });
    this.addPaymentApplicationMethods = this.updater((state, newPaymentApplicationMethods) => Object.assign(Object.assign({}, state), {
      paymentApplicationMethods: state.paymentApplicationMethods.concat(newPaymentApplicationMethods)
    }));
    this.updatePaymentApplicationMethods = this.updater((state, updatedPaymentApplicationMethods) => {
      return Object.assign(Object.assign({}, state), {
        paymentApplicationMethods: state.paymentApplicationMethods.map(paymentApplicationMethod => {
          const updated = updatedPaymentApplicationMethods.find(el => el.id === paymentApplicationMethod.id);
          return updated ? updated : paymentApplicationMethod;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPaymentApplicationMethodEffect = this.effect(paymentApplicationMethodId$ => paymentApplicationMethodId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(paymentApplicationMethodId => this.data.userPaymentApplicationMethod({
      paymentApplicationMethodId
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
    this.loadPaymentApplicationMethodsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userPaymentApplicationMethods({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      paymentApplicationMethods: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPaymentApplicationMethodEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.paymentApplicationMethodService.createPaymentApplicationMethod(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(paymentApplicationMethod => {
      this.addNewPaymentApplicationMethod(paymentApplicationMethod);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: paymentApplicationMethod,
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
    this.updatePaymentApplicationMethodEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.paymentApplicationMethodService.updatePaymentApplicationMethod(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(paymentApplicationMethod => {
      this.updatePaymentApplicationMethod(paymentApplicationMethod);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: paymentApplicationMethod,
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
    this.deletePaymentApplicationMethodEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, paymentApplicationMethod]) => {
      return this.data.userDeletePaymentApplicationMethod({
        paymentApplicationMethodId: paymentApplicationMethod.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.paymentApplicationMethodService.importPaymentApplicationMethods(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addPaymentApplicationMethods(created);
      this.updatePaymentApplicationMethods(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('paymentApplicationMethodId')) {
      var paymentApplicationMethodId = this.route.snapshot.paramMap.get('paymentApplicationMethodId');
      this.setFormName('paymentApplicationMethod_edit');
    } else {
      this.setFormName('paymentApplicationMethod_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.paymentApplicationMethodService.validatePaymentApplicationMethodExcelData(excelData);
    }));
  }
}
WebPaymentApplicationMethodFeatureStore.ɵfac = function WebPaymentApplicationMethodFeatureStore_Factory(t) {
  return new (t || WebPaymentApplicationMethodFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_payment_application_method_service__WEBPACK_IMPORTED_MODULE_11__.PaymentApplicationMethodService));
};
WebPaymentApplicationMethodFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebPaymentApplicationMethodFeatureStore,
  factory: WebPaymentApplicationMethodFeatureStore.ɵfac
});

/***/ }),

/***/ 265635:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/rules/create-payment-application-method-input-is-valid.rule.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePaymentApplicationMethodInputIsValidRule": () => (/* binding */ CreatePaymentApplicationMethodInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _payment_application_method_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-application-method-name-is-valid.rule */ 140170);


class CreatePaymentApplicationMethodInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _payment_application_method_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PaymentApplicationMethodNameIsValidRule('name', 'The paymentapplicationmethod name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 140170:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/payment-application-method/shared/rules/payment-application-method-name-is-valid.rule.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentApplicationMethodNameIsValidRule": () => (/* binding */ PaymentApplicationMethodNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PaymentApplicationMethodNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);