"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_recommended-order-authorization_shared_recommended-order-authorization_store_ts"],{

/***/ 819590:
/*!******************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/actions/create-recommended-order-authorization.action.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRecommendedOrderAuthorizationAction": () => (/* binding */ CreateRecommendedOrderAuthorizationAction)
/* harmony export */ });
/* harmony import */ var _recommended_order_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-authorization.business-action-base */ 439726);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_recommended_order_authorization_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-recommended-order-authorization-input-is-valid.rule */ 12373);




class CreateRecommendedOrderAuthorizationAction extends _recommended_order_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderAuthorizationBusinessActionBase {
  constructor(input) {
    super('CreateRecommendedOrderAuthorizationAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_recommended_order_authorization_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateRecommendedOrderAuthorizationInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateRecommendedOrderAuthorization({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 439726:
/*!*************************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/actions/recommended-order-authorization.business-action-base.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderAuthorizationBusinessActionBase": () => (/* binding */ RecommendedOrderAuthorizationBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class RecommendedOrderAuthorizationBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 534400:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/actions/update-recommended-order-authorizations.action.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateRecommendedOrderAuthorizationAction": () => (/* binding */ UpdateRecommendedOrderAuthorizationAction),
/* harmony export */   "UpdateRecommendedOrderAuthorizationsAction": () => (/* binding */ UpdateRecommendedOrderAuthorizationsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _recommended_order_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-authorization.business-action-base */ 439726);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateRecommendedOrderAuthorizationsAction extends _recommended_order_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderAuthorizationBusinessActionBase {
  constructor(recommendedOrderAuthorizations) {
    super('UpdateRecommendedOrderAuthorizationsAction');
    this.recommendedOrderAuthorizations = recommendedOrderAuthorizations;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.recommendedOrderAuthorizations, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRecommendedOrderAuthorizations({
      input: {
        recommendedOrderAuthorizations: this.recommendedOrderAuthorizations
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateRecommendedOrderAuthorizationAction extends _recommended_order_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderAuthorizationBusinessActionBase {
  constructor(recommendedOrderAuthorization, recommendedOrderAuthorizationId) {
    super('UpdateRecommendedOrderAuthorizationAction');
    this.recommendedOrderAuthorization = recommendedOrderAuthorization;
    this.recommendedOrderAuthorizationId = recommendedOrderAuthorizationId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.recommendedOrderAuthorization, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.recommendedOrderAuthorizationId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRecommendedOrderAuthorization({
      recommendedOrderAuthorizationId: this.recommendedOrderAuthorizationId,
      input: this.recommendedOrderAuthorization
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 54444:
/*!*******************************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/actions/validate-recommended-order-authorization-excel-data.action.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateRecommendedOrderAuthorizationExcelDataAction": () => (/* binding */ ValidateRecommendedOrderAuthorizationExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _recommended_order_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-authorization.business-action-base */ 439726);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateRecommendedOrderAuthorizationExcelDataAction extends _recommended_order_authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderAuthorizationBusinessActionBase {
  constructor(excelData, authorizations, recommendedOrders) {
    super('ValidateRecommendedOrderAuthorizationExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.authorizations = authorizations;
    this.recommendedOrders = recommendedOrders;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`authorizationName_${index}_is_valid}`, "Authorization Is Not Valid", 'authorization.name', datum['authorization'], this.authorizations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`recommendedOrderName_${index}_is_valid}`, "Recommended Order Is Not Valid", 'recommendedOrder.name', datum['recommendedOrder'], this.recommendedOrders, true));
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

/***/ 669074:
/*!**********************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/recommended-order-authorization.business-provider.service.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderAuthorizationBusinessProviderService": () => (/* binding */ RecommendedOrderAuthorizationBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_recommended_order_authorization_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-recommended-order-authorization-excel-data.action */ 54444);
/* harmony import */ var _actions_create_recommended_order_authorization_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-recommended-order-authorization.action */ 819590);
/* harmony import */ var _actions_update_recommended_order_authorizations_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-recommended-order-authorizations.action */ 534400);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class RecommendedOrderAuthorizationBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.RecommendedOrderAuthorizationBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createRecommendedOrderAuthorization(input) {
    const action = new _actions_create_recommended_order_authorization_action__WEBPACK_IMPORTED_MODULE_2__.CreateRecommendedOrderAuthorizationAction(input);
    action.Do(this);
    return action.response;
  }
  updateRecommendedOrderAuthorization(input, recommendedOrderAuthorizationId) {
    const action = new _actions_update_recommended_order_authorizations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRecommendedOrderAuthorizationAction(input, recommendedOrderAuthorizationId);
    action.Do(this);
    return action.response;
  }
  importRecommendedOrderAuthorizations(recommendedOrderAuthorizations) {
    const updateRecommendedOrderAuthorizationsAction = new _actions_update_recommended_order_authorizations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRecommendedOrderAuthorizationsAction(recommendedOrderAuthorizations);
    updateRecommendedOrderAuthorizationsAction.Do(this);
    return updateRecommendedOrderAuthorizationsAction.response;
  }
  validateRecommendedOrderAuthorizationExcelData(excelData, authorizations, recommendedOrders) {
    const validateRecommendedOrderAuthorizationExcelDataAction = new _actions_validate_recommended_order_authorization_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateRecommendedOrderAuthorizationExcelDataAction(excelData, authorizations, recommendedOrders);
    validateRecommendedOrderAuthorizationExcelDataAction.Do(this);
    return validateRecommendedOrderAuthorizationExcelDataAction.response;
  }
}
RecommendedOrderAuthorizationBusinessProviderService.ɵfac = function RecommendedOrderAuthorizationBusinessProviderService_Factory(t) {
  return new (t || RecommendedOrderAuthorizationBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
RecommendedOrderAuthorizationBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: RecommendedOrderAuthorizationBusinessProviderService,
  factory: RecommendedOrderAuthorizationBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 820542:
/*!****************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/recommended-order-authorization.service.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderAuthorizationService": () => (/* binding */ RecommendedOrderAuthorizationService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _recommended_order_authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommended-order-authorization.business-provider.service */ 669074);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class RecommendedOrderAuthorizationService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("RecommendedOrderAuthorizationService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createRecommendedOrderAuthorization(input) {
    return this.businessProvider.createRecommendedOrderAuthorization(input);
  }
  updateRecommendedOrderAuthorization(input, recommendedOrderAuthorizationId) {
    return this.businessProvider.updateRecommendedOrderAuthorization(input, recommendedOrderAuthorizationId);
  }
  importRecommendedOrderAuthorizations(recommendedOrderAuthorizations) {
    return this.businessProvider.importRecommendedOrderAuthorizations(recommendedOrderAuthorizations);
  }
  validateRecommendedOrderAuthorizationExcelData(excelData, authorizations, recommendedOrders) {
    return this.businessProvider.validateRecommendedOrderAuthorizationExcelData(excelData, authorizations, recommendedOrders);
  }
}
RecommendedOrderAuthorizationService.ɵfac = function RecommendedOrderAuthorizationService_Factory(t) {
  return new (t || RecommendedOrderAuthorizationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_recommended_order_authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RecommendedOrderAuthorizationBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_recommended_order_authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RecommendedOrderAuthorizationBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
RecommendedOrderAuthorizationService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: RecommendedOrderAuthorizationService,
  factory: RecommendedOrderAuthorizationService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 862945:
/*!**************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/recommended-order-authorization.store.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRecommendedOrderAuthorizationFeatureStore": () => (/* binding */ WebRecommendedOrderAuthorizationFeatureStore)
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
/* harmony import */ var _recommended_order_authorization_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./recommended-order-authorization.service */ 820542);














class WebRecommendedOrderAuthorizationFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, recommendedOrderAuthorizationService) {
    super({
      loading: false,
      recommendedOrderAuthorizations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      authorizationId: undefined,
      recommendedOrderId: undefined,
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
    this.recommendedOrderAuthorizationService = recommendedOrderAuthorizationService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.recommendedOrderAuthorizations$ = this.select(s => s.recommendedOrderAuthorizations);
    this.authorizations$ = this.select(s => s.authorizations || []);
    this.recommendedOrders$ = this.select(s => s.recommendedOrders || []);
    this.authorizationId$ = this.select(s => s.authorizationId);
    this.recommendedOrderId$ = this.select(s => s.recommendedOrderId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.recommendedOrderAuthorizations$, this.authorizations$, this.recommendedOrders$, (errors, loading, item, formName, recommendedOrderAuthorizations, authorizations, recommendedOrders) => ({
      errors,
      loading,
      item,
      formName,
      recommendedOrderAuthorizations,
      authorizations,
      recommendedOrders
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.authorizationId$, this.recommendedOrderId$, this.searchQuery$, (paging, authorizationId, recommendedOrderId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      authorizationId: authorizationId,
      recommendedOrderId: recommendedOrderId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setAuthorizationId = this.updater((state, authorizationId) => Object.assign(Object.assign({}, state), {
      authorizationId
    }));
    this.setRecommendedOrderId = this.updater((state, recommendedOrderId) => Object.assign(Object.assign({}, state), {
      recommendedOrderId
    }));
    this.filterAuthorizations = term => this.data.userSelectAuthorizations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let authorizations = res.data.items;
      this.patchState({
        authorizations
      });
      return authorizations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterRecommendedOrders = term => this.data.userSelectRecommendedOrders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let recommendedOrders = res.data.items;
      this.patchState({
        recommendedOrders
      });
      return recommendedOrders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addAuthorization = this.updater((state, authorization) => Object.assign(Object.assign({}, state), {
      authorizations: state.authorizations.concat(authorization)
    }));
    this.addRecommendedOrder = this.updater((state, recommendedOrder) => Object.assign(Object.assign({}, state), {
      recommendedOrders: state.recommendedOrders.concat(recommendedOrder)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewRecommendedOrderAuthorization = this.updater((state, recommendedOrderAuthorization) => Object.assign(Object.assign({}, state), {
      recommendedOrderAuthorizations: [...state.recommendedOrderAuthorizations, recommendedOrderAuthorization]
    }));
    this.updateRecommendedOrderAuthorization = this.updater((state, recommendedOrderAuthorization) => {
      return Object.assign(Object.assign({}, state), {
        recommendedOrderAuthorizations: state.recommendedOrderAuthorizations.map(el => {
          if (el.id === recommendedOrderAuthorization.id) {
            return recommendedOrderAuthorization;
          } else {
            return el;
          }
        })
      });
    });
    this.addRecommendedOrderAuthorizations = this.updater((state, newRecommendedOrderAuthorizations) => Object.assign(Object.assign({}, state), {
      recommendedOrderAuthorizations: state.recommendedOrderAuthorizations.concat(newRecommendedOrderAuthorizations)
    }));
    this.updateRecommendedOrderAuthorizations = this.updater((state, updatedRecommendedOrderAuthorizations) => {
      return Object.assign(Object.assign({}, state), {
        recommendedOrderAuthorizations: state.recommendedOrderAuthorizations.map(recommendedOrderAuthorization => {
          const updated = updatedRecommendedOrderAuthorizations.find(el => el.id === recommendedOrderAuthorization.id);
          return updated ? updated : recommendedOrderAuthorization;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadRecommendedOrderAuthorizationEffect = this.effect(recommendedOrderAuthorizationId$ => recommendedOrderAuthorizationId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(recommendedOrderAuthorizationId => this.data.userRecommendedOrderAuthorization({
      recommendedOrderAuthorizationId
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
    this.loadRecommendedOrderAuthorizationsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userRecommendedOrderAuthorizations({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      recommendedOrderAuthorizations: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createRecommendedOrderAuthorizationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.recommendedOrderAuthorizationService.createRecommendedOrderAuthorization(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(recommendedOrderAuthorization => {
      this.addNewRecommendedOrderAuthorization(recommendedOrderAuthorization);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: recommendedOrderAuthorization,
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
    this.updateRecommendedOrderAuthorizationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.recommendedOrderAuthorizationService.updateRecommendedOrderAuthorization(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(recommendedOrderAuthorization => {
      this.updateRecommendedOrderAuthorization(recommendedOrderAuthorization);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: recommendedOrderAuthorization,
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
    this.deleteRecommendedOrderAuthorizationEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, recommendedOrderAuthorization]) => {
      return this.data.userDeleteRecommendedOrderAuthorization({
        recommendedOrderAuthorizationId: recommendedOrderAuthorization.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.recommendedOrderAuthorizationService.importRecommendedOrderAuthorizations(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addRecommendedOrderAuthorizations(created);
      this.updateRecommendedOrderAuthorizations(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('recommendedOrderAuthorizationId')) {
      var recommendedOrderAuthorizationId = this.route.snapshot.paramMap.get('recommendedOrderAuthorizationId');
      this.setFormName('recommendedOrderAuthorization_edit');
    } else {
      this.setFormName('recommendedOrderAuthorization_create');
    }
    if (this.route.snapshot.paramMap.has("authorizationId")) {
      var authorizationId = this.route.snapshot.paramMap.get("authorizationId");
      this.setAuthorizationId(authorizationId);
    }
    if (this.route.snapshot.paramMap.has("recommendedOrderId")) {
      var recommendedOrderId = this.route.snapshot.paramMap.get("recommendedOrderId");
      this.setRecommendedOrderId(recommendedOrderId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.recommendedOrderAuthorizationService.validateRecommendedOrderAuthorizationExcelData(excelData, vm.authorizations, vm.recommendedOrders);
    }));
  }
}
WebRecommendedOrderAuthorizationFeatureStore.ɵfac = function WebRecommendedOrderAuthorizationFeatureStore_Factory(t) {
  return new (t || WebRecommendedOrderAuthorizationFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_recommended_order_authorization_service__WEBPACK_IMPORTED_MODULE_12__.RecommendedOrderAuthorizationService));
};
WebRecommendedOrderAuthorizationFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebRecommendedOrderAuthorizationFeatureStore,
  factory: WebRecommendedOrderAuthorizationFeatureStore.ɵfac
});

/***/ }),

/***/ 12373:
/*!*****************************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/rules/create-recommended-order-authorization-input-is-valid.rule.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRecommendedOrderAuthorizationInputIsValidRule": () => (/* binding */ CreateRecommendedOrderAuthorizationInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _recommended_order_authorization_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-authorization-name-is-valid.rule */ 609341);


class CreateRecommendedOrderAuthorizationInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _recommended_order_authorization_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderAuthorizationNameIsValidRule('name', 'The recommendedorderauthorization name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 609341:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-authorization/shared/rules/recommended-order-authorization-name-is-valid.rule.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderAuthorizationNameIsValidRule": () => (/* binding */ RecommendedOrderAuthorizationNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class RecommendedOrderAuthorizationNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);