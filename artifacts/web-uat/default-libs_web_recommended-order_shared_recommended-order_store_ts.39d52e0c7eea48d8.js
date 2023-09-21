"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_recommended-order_shared_recommended-order_store_ts"],{

/***/ 219456:
/*!**************************************************************************************!*\
  !*** ./libs/web/recommended-order/shared/actions/create-recommended-order.action.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRecommendedOrderAction": () => (/* binding */ CreateRecommendedOrderAction)
/* harmony export */ });
/* harmony import */ var _recommended_order_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order.business-action-base */ 434567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_recommended_order_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-recommended-order-input-is-valid.rule */ 807834);




class CreateRecommendedOrderAction extends _recommended_order_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderBusinessActionBase {
  constructor(input) {
    super('CreateRecommendedOrderAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_recommended_order_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateRecommendedOrderInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateRecommendedOrder({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 434567:
/*!*********************************************************************************************!*\
  !*** ./libs/web/recommended-order/shared/actions/recommended-order.business-action-base.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderBusinessActionBase": () => (/* binding */ RecommendedOrderBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class RecommendedOrderBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 996263:
/*!***************************************************************************************!*\
  !*** ./libs/web/recommended-order/shared/actions/update-recommended-orders.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateRecommendedOrderAction": () => (/* binding */ UpdateRecommendedOrderAction),
/* harmony export */   "UpdateRecommendedOrdersAction": () => (/* binding */ UpdateRecommendedOrdersAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _recommended_order_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order.business-action-base */ 434567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateRecommendedOrdersAction extends _recommended_order_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderBusinessActionBase {
  constructor(recommendedOrders) {
    super('UpdateRecommendedOrdersAction');
    this.recommendedOrders = recommendedOrders;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.recommendedOrders, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRecommendedOrders({
      input: {
        recommendedOrders: this.recommendedOrders
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateRecommendedOrderAction extends _recommended_order_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderBusinessActionBase {
  constructor(recommendedOrder, recommendedOrderId) {
    super('UpdateRecommendedOrderAction');
    this.recommendedOrder = recommendedOrder;
    this.recommendedOrderId = recommendedOrderId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.recommendedOrder, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.recommendedOrderId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRecommendedOrder({
      recommendedOrderId: this.recommendedOrderId,
      input: this.recommendedOrder
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 431722:
/*!***************************************************************************************************!*\
  !*** ./libs/web/recommended-order/shared/actions/validate-recommended-order-excel-data.action.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateRecommendedOrderExcelDataAction": () => (/* binding */ ValidateRecommendedOrderExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _recommended_order_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order.business-action-base */ 434567);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateRecommendedOrderExcelDataAction extends _recommended_order_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderBusinessActionBase {
  constructor(excelData) {
    super('ValidateRecommendedOrderExcelDataAction');
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

/***/ 94097:
/*!******************************************************************************************!*\
  !*** ./libs/web/recommended-order/shared/recommended-order.business-provider.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderBusinessProviderService": () => (/* binding */ RecommendedOrderBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_recommended_order_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-recommended-order-excel-data.action */ 431722);
/* harmony import */ var _actions_create_recommended_order_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-recommended-order.action */ 219456);
/* harmony import */ var _actions_update_recommended_orders_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-recommended-orders.action */ 996263);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class RecommendedOrderBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.RecommendedOrderBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createRecommendedOrder(input) {
    const action = new _actions_create_recommended_order_action__WEBPACK_IMPORTED_MODULE_2__.CreateRecommendedOrderAction(input);
    action.Do(this);
    return action.response;
  }
  updateRecommendedOrder(input, recommendedOrderId) {
    const action = new _actions_update_recommended_orders_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRecommendedOrderAction(input, recommendedOrderId);
    action.Do(this);
    return action.response;
  }
  importRecommendedOrders(recommendedOrders) {
    const updateRecommendedOrdersAction = new _actions_update_recommended_orders_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRecommendedOrdersAction(recommendedOrders);
    updateRecommendedOrdersAction.Do(this);
    return updateRecommendedOrdersAction.response;
  }
  validateRecommendedOrderExcelData(excelData) {
    const validateRecommendedOrderExcelDataAction = new _actions_validate_recommended_order_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateRecommendedOrderExcelDataAction(excelData);
    validateRecommendedOrderExcelDataAction.Do(this);
    return validateRecommendedOrderExcelDataAction.response;
  }
}
RecommendedOrderBusinessProviderService.ɵfac = function RecommendedOrderBusinessProviderService_Factory(t) {
  return new (t || RecommendedOrderBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
RecommendedOrderBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: RecommendedOrderBusinessProviderService,
  factory: RecommendedOrderBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 993271:
/*!************************************************************************!*\
  !*** ./libs/web/recommended-order/shared/recommended-order.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderService": () => (/* binding */ RecommendedOrderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _recommended_order_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommended-order.business-provider.service */ 94097);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class RecommendedOrderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("RecommendedOrderService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createRecommendedOrder(input) {
    return this.businessProvider.createRecommendedOrder(input);
  }
  updateRecommendedOrder(input, recommendedOrderId) {
    return this.businessProvider.updateRecommendedOrder(input, recommendedOrderId);
  }
  importRecommendedOrders(recommendedOrders) {
    return this.businessProvider.importRecommendedOrders(recommendedOrders);
  }
  validateRecommendedOrderExcelData(excelData) {
    return this.businessProvider.validateRecommendedOrderExcelData(excelData);
  }
}
RecommendedOrderService.ɵfac = function RecommendedOrderService_Factory(t) {
  return new (t || RecommendedOrderService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_recommended_order_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RecommendedOrderBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_recommended_order_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RecommendedOrderBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
RecommendedOrderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: RecommendedOrderService,
  factory: RecommendedOrderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 959522:
/*!**********************************************************************!*\
  !*** ./libs/web/recommended-order/shared/recommended-order.store.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRecommendedOrderFeatureStore": () => (/* binding */ WebRecommendedOrderFeatureStore)
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
/* harmony import */ var _recommended_order_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./recommended-order.service */ 993271);














class WebRecommendedOrderFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, recommendedOrderService) {
    super({
      loading: false,
      recommendedOrders: [],
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
    this.recommendedOrderService = recommendedOrderService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.recommendedOrders$ = this.select(s => s.recommendedOrders);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.recommendedOrders$, (errors, loading, item, formName, recommendedOrders) => ({
      errors,
      loading,
      item,
      formName,
      recommendedOrders
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
    this.addNewRecommendedOrder = this.updater((state, recommendedOrder) => Object.assign(Object.assign({}, state), {
      recommendedOrders: [...state.recommendedOrders, recommendedOrder]
    }));
    this.updateRecommendedOrder = this.updater((state, recommendedOrder) => {
      return Object.assign(Object.assign({}, state), {
        recommendedOrders: state.recommendedOrders.map(el => {
          if (el.id === recommendedOrder.id) {
            return recommendedOrder;
          } else {
            return el;
          }
        })
      });
    });
    this.addRecommendedOrders = this.updater((state, newRecommendedOrders) => Object.assign(Object.assign({}, state), {
      recommendedOrders: state.recommendedOrders.concat(newRecommendedOrders)
    }));
    this.updateRecommendedOrders = this.updater((state, updatedRecommendedOrders) => {
      return Object.assign(Object.assign({}, state), {
        recommendedOrders: state.recommendedOrders.map(recommendedOrder => {
          const updated = updatedRecommendedOrders.find(el => el.id === recommendedOrder.id);
          return updated ? updated : recommendedOrder;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadRecommendedOrderEffect = this.effect(recommendedOrderId$ => recommendedOrderId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(recommendedOrderId => this.data.userRecommendedOrder({
      recommendedOrderId
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
    this.loadRecommendedOrdersEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userRecommendedOrders({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      recommendedOrders: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createRecommendedOrderEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.recommendedOrderService.createRecommendedOrder(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(recommendedOrder => {
      this.addNewRecommendedOrder(recommendedOrder);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: recommendedOrder,
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
    this.updateRecommendedOrderEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.recommendedOrderService.updateRecommendedOrder(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(recommendedOrder => {
      this.updateRecommendedOrder(recommendedOrder);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: recommendedOrder,
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
    this.deleteRecommendedOrderEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, recommendedOrder]) => {
      return this.data.userDeleteRecommendedOrder({
        recommendedOrderId: recommendedOrder.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.recommendedOrderService.importRecommendedOrders(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addRecommendedOrders(created);
      this.updateRecommendedOrders(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('recommendedOrderId')) {
      var recommendedOrderId = this.route.snapshot.paramMap.get('recommendedOrderId');
      this.setFormName('recommendedOrder_edit');
    } else {
      this.setFormName('recommendedOrder_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.recommendedOrderService.validateRecommendedOrderExcelData(excelData);
    }));
  }
}
WebRecommendedOrderFeatureStore.ɵfac = function WebRecommendedOrderFeatureStore_Factory(t) {
  return new (t || WebRecommendedOrderFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_recommended_order_service__WEBPACK_IMPORTED_MODULE_11__.RecommendedOrderService));
};
WebRecommendedOrderFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebRecommendedOrderFeatureStore,
  factory: WebRecommendedOrderFeatureStore.ɵfac
});

/***/ }),

/***/ 807834:
/*!*************************************************************************************************!*\
  !*** ./libs/web/recommended-order/shared/rules/create-recommended-order-input-is-valid.rule.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRecommendedOrderInputIsValidRule": () => (/* binding */ CreateRecommendedOrderInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _recommended_order_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-name-is-valid.rule */ 586367);


class CreateRecommendedOrderInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _recommended_order_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderNameIsValidRule('name', 'The recommendedorder name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 586367:
/*!*****************************************************************************************!*\
  !*** ./libs/web/recommended-order/shared/rules/recommended-order-name-is-valid.rule.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderNameIsValidRule": () => (/* binding */ RecommendedOrderNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class RecommendedOrderNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);