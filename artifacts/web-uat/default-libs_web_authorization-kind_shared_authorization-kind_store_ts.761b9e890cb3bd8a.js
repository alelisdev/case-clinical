"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_authorization-kind_shared_authorization-kind_store_ts"],{

/***/ 717699:
/*!***********************************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/actions/authorization-kind.business-action-base.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationKindBusinessActionBase": () => (/* binding */ AuthorizationKindBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AuthorizationKindBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 864792:
/*!****************************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/actions/create-authorization-kind.action.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationKindAction": () => (/* binding */ CreateAuthorizationKindAction)
/* harmony export */ });
/* harmony import */ var _authorization_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-kind.business-action-base */ 717699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_authorization_kind_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-authorization-kind-input-is-valid.rule */ 15827);




class CreateAuthorizationKindAction extends _authorization_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationKindBusinessActionBase {
  constructor(input) {
    super('CreateAuthorizationKindAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_authorization_kind_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationKindInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationKind({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 491528:
/*!*****************************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/actions/update-authorization-kinds.action.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAuthorizationKindAction": () => (/* binding */ UpdateAuthorizationKindAction),
/* harmony export */   "UpdateAuthorizationKindsAction": () => (/* binding */ UpdateAuthorizationKindsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-kind.business-action-base */ 717699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateAuthorizationKindsAction extends _authorization_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationKindBusinessActionBase {
  constructor(authorizationKinds) {
    super('UpdateAuthorizationKindsAction');
    this.authorizationKinds = authorizationKinds;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizationKinds, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizationKinds({
      input: {
        authorizationKinds: this.authorizationKinds
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateAuthorizationKindAction extends _authorization_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationKindBusinessActionBase {
  constructor(authorizationKind, authorizationKindId) {
    super('UpdateAuthorizationKindAction');
    this.authorizationKind = authorizationKind;
    this.authorizationKindId = authorizationKindId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizationKind, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.authorizationKindId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizationKind({
      authorizationKindId: this.authorizationKindId,
      input: this.authorizationKind
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 906857:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/actions/validate-authorization-kind-excel-data.action.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateAuthorizationKindExcelDataAction": () => (/* binding */ ValidateAuthorizationKindExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-kind.business-action-base */ 717699);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateAuthorizationKindExcelDataAction extends _authorization_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationKindBusinessActionBase {
  constructor(excelData, categories) {
    super('ValidateAuthorizationKindExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.categories = categories;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`categoryName_${index}_is_valid}`, "Category Is Not Valid", 'category.name', datum['category'], this.categories, true));
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

/***/ 837826:
/*!********************************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/authorization-kind.business-provider.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationKindBusinessProviderService": () => (/* binding */ AuthorizationKindBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_authorization_kind_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-authorization-kind-excel-data.action */ 906857);
/* harmony import */ var _actions_create_authorization_kind_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-authorization-kind.action */ 864792);
/* harmony import */ var _actions_update_authorization_kinds_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-authorization-kinds.action */ 491528);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class AuthorizationKindBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AuthorizationKindBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAuthorizationKind(input) {
    const action = new _actions_create_authorization_kind_action__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationKindAction(input);
    action.Do(this);
    return action.response;
  }
  updateAuthorizationKind(input, authorizationKindId) {
    const action = new _actions_update_authorization_kinds_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationKindAction(input, authorizationKindId);
    action.Do(this);
    return action.response;
  }
  importAuthorizationKinds(authorizationKinds) {
    const updateAuthorizationKindsAction = new _actions_update_authorization_kinds_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationKindsAction(authorizationKinds);
    updateAuthorizationKindsAction.Do(this);
    return updateAuthorizationKindsAction.response;
  }
  validateAuthorizationKindExcelData(excelData, categories) {
    const validateAuthorizationKindExcelDataAction = new _actions_validate_authorization_kind_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateAuthorizationKindExcelDataAction(excelData, categories);
    validateAuthorizationKindExcelDataAction.Do(this);
    return validateAuthorizationKindExcelDataAction.response;
  }
}
AuthorizationKindBusinessProviderService.ɵfac = function AuthorizationKindBusinessProviderService_Factory(t) {
  return new (t || AuthorizationKindBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AuthorizationKindBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: AuthorizationKindBusinessProviderService,
  factory: AuthorizationKindBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 237037:
/*!**************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/authorization-kind.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationKindService": () => (/* binding */ AuthorizationKindService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _authorization_kind_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorization-kind.business-provider.service */ 837826);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class AuthorizationKindService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("AuthorizationKindService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createAuthorizationKind(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createAuthorizationKind(filteredObj);
  }
  updateAuthorizationKind(input, authorizationKindId) {
    return this.businessProvider.updateAuthorizationKind(input, authorizationKindId);
  }
  importAuthorizationKinds(authorizationKinds) {
    return this.businessProvider.importAuthorizationKinds(authorizationKinds);
  }
  validateAuthorizationKindExcelData(excelData, categories) {
    return this.businessProvider.validateAuthorizationKindExcelData(excelData, categories);
  }
}
AuthorizationKindService.ɵfac = function AuthorizationKindService_Factory(t) {
  return new (t || AuthorizationKindService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_kind_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationKindBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_kind_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationKindBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
AuthorizationKindService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AuthorizationKindService,
  factory: AuthorizationKindService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 154500:
/*!************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/authorization-kind.store.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAuthorizationKindFeatureStore": () => (/* binding */ WebAuthorizationKindFeatureStore)
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
/* harmony import */ var _authorization_kind_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./authorization-kind.service */ 237037);














class WebAuthorizationKindFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, authorizationKindService) {
    super({
      loading: false,
      authorizationKinds: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      categoryId: undefined,
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
    this.authorizationKindService = authorizationKindService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.authorizationKinds$ = this.select(s => s.authorizationKinds);
    this.categories$ = this.select(s => s.categories || []);
    this.categoryId$ = this.select(s => s.categoryId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationKinds$, this.categories$, (errors, loading, item, formName, authorizationKinds, categories) => ({
      errors,
      loading,
      item,
      formName,
      authorizationKinds,
      categories
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.categoryId$, this.searchQuery$, (paging, categoryId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      categoryId: categoryId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setCategoryId = this.updater((state, categoryId) => Object.assign(Object.assign({}, state), {
      categoryId
    }));
    this.filterCategories = term => this.data.userSelectCategories({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let categories = res.data.items;
      this.patchState({
        categories
      });
      return categories;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addCategory = this.updater((state, category) => Object.assign(Object.assign({}, state), {
      categories: state.categories.concat(category)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewAuthorizationKind = this.updater((state, authorizationKind) => Object.assign(Object.assign({}, state), {
      authorizationKinds: [...state.authorizationKinds, authorizationKind]
    }));
    this.updateAuthorizationKind = this.updater((state, authorizationKind) => {
      return Object.assign(Object.assign({}, state), {
        authorizationKinds: state.authorizationKinds.map(el => {
          if (el.id === authorizationKind.id) {
            return authorizationKind;
          } else {
            return el;
          }
        })
      });
    });
    this.addAuthorizationKinds = this.updater((state, newAuthorizationKinds) => Object.assign(Object.assign({}, state), {
      authorizationKinds: state.authorizationKinds.concat(newAuthorizationKinds)
    }));
    this.updateAuthorizationKinds = this.updater((state, updatedAuthorizationKinds) => {
      return Object.assign(Object.assign({}, state), {
        authorizationKinds: state.authorizationKinds.map(authorizationKind => {
          const updated = updatedAuthorizationKinds.find(el => el.id === authorizationKind.id);
          return updated ? updated : authorizationKind;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadAuthorizationKindEffect = this.effect(authorizationKindId$ => authorizationKindId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(authorizationKindId => this.data.userAuthorizationKind({
      authorizationKindId
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
    this.loadAuthorizationKindsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userAuthorizationKinds({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      authorizationKinds: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createAuthorizationKindEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.authorizationKindService.createAuthorizationKind(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorizationKind => {
      this.addNewAuthorizationKind(authorizationKind);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: authorizationKind,
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
    this.updateAuthorizationKindEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.authorizationKindService.updateAuthorizationKind(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorizationKind => {
      this.updateAuthorizationKind(authorizationKind);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: authorizationKind,
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
    this.deleteAuthorizationKindEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, authorizationKind]) => {
      return this.data.userDeleteAuthorizationKind({
        authorizationKindId: authorizationKind.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.authorizationKindService.importAuthorizationKinds(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addAuthorizationKinds(created);
      this.updateAuthorizationKinds(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('authorizationKindId')) {
      var authorizationKindId = this.route.snapshot.paramMap.get('authorizationKindId');
      this.setFormName('authorizationKind_edit');
    } else {
      this.setFormName('authorizationKind_create');
    }
    if (this.route.snapshot.paramMap.has("categoryId")) {
      var categoryId = this.route.snapshot.paramMap.get("categoryId");
      this.setCategoryId(categoryId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.authorizationKindService.validateAuthorizationKindExcelData(excelData, vm.categories);
    }));
  }
}
WebAuthorizationKindFeatureStore.ɵfac = function WebAuthorizationKindFeatureStore_Factory(t) {
  return new (t || WebAuthorizationKindFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_authorization_kind_service__WEBPACK_IMPORTED_MODULE_12__.AuthorizationKindService));
};
WebAuthorizationKindFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebAuthorizationKindFeatureStore,
  factory: WebAuthorizationKindFeatureStore.ɵfac
});

/***/ }),

/***/ 49630:
/*!*******************************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/rules/authorization-kind-name-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationKindNameIsValidRule": () => (/* binding */ AuthorizationKindNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class AuthorizationKindNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 15827:
/*!***************************************************************************************************!*\
  !*** ./libs/web/authorization-kind/shared/rules/create-authorization-kind-input-is-valid.rule.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationKindInputIsValidRule": () => (/* binding */ CreateAuthorizationKindInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _authorization_kind_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-kind-name-is-valid.rule */ 49630);


class CreateAuthorizationKindInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _authorization_kind_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.AuthorizationKindNameIsValidRule('name', 'The authorizationkind name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);