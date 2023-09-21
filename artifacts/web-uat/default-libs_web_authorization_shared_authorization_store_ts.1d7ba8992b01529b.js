"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_authorization_shared_authorization_store_ts"],{

/***/ 546207:
/*!*************************************************************************************!*\
  !*** ./libs/web/authorization/shared/actions/authorization.business-action-base.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationBusinessActionBase": () => (/* binding */ AuthorizationBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AuthorizationBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 116488:
/*!******************************************************************************!*\
  !*** ./libs/web/authorization/shared/actions/create-authorization.action.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationAction": () => (/* binding */ CreateAuthorizationAction)
/* harmony export */ });
/* harmony import */ var _authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization.business-action-base */ 546207);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_authorization_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-authorization-input-is-valid.rule */ 688148);




class CreateAuthorizationAction extends _authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationBusinessActionBase {
  constructor(input) {
    super('CreateAuthorizationAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_authorization_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorization({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 122504:
/*!*******************************************************************************!*\
  !*** ./libs/web/authorization/shared/actions/update-authorizations.action.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAuthorizationAction": () => (/* binding */ UpdateAuthorizationAction),
/* harmony export */   "UpdateAuthorizationsAction": () => (/* binding */ UpdateAuthorizationsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization.business-action-base */ 546207);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateAuthorizationsAction extends _authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationBusinessActionBase {
  constructor(authorizations) {
    super('UpdateAuthorizationsAction');
    this.authorizations = authorizations;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizations, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizations({
      input: {
        authorizations: this.authorizations
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateAuthorizationAction extends _authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationBusinessActionBase {
  constructor(authorization, authorizationId) {
    super('UpdateAuthorizationAction');
    this.authorization = authorization;
    this.authorizationId = authorizationId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorization, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.authorizationId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorization({
      authorizationId: this.authorizationId,
      input: this.authorization
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 903693:
/*!*******************************************************************************************!*\
  !*** ./libs/web/authorization/shared/actions/validate-authorization-excel-data.action.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateAuthorizationExcelDataAction": () => (/* binding */ ValidateAuthorizationExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization.business-action-base */ 546207);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateAuthorizationExcelDataAction extends _authorization_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationBusinessActionBase {
  constructor(excelData, vendors, authorizationCategories, authorizationTypes, procedures) {
    super('ValidateAuthorizationExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.vendors = vendors;
    this.authorizationCategories = authorizationCategories;
    this.authorizationTypes = authorizationTypes;
    this.procedures = procedures;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`authorizationCategoryName_${index}_is_valid}`, "Authorization Category Is Not Valid", 'authorizationCategory.name', datum['authorizationCategory'], this.authorizationCategories, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`authorizationTypeName_${index}_is_valid}`, "Authorization Type Is Not Valid", 'authorizationType.name', datum['authorizationType'], this.authorizationTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`procedureName_${index}_is_valid}`, "Procedure Is Not Valid", 'procedure.name', datum['procedure'], this.procedures, true));
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

/***/ 459806:
/*!**********************************************************************************!*\
  !*** ./libs/web/authorization/shared/authorization.business-provider.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationBusinessProviderService": () => (/* binding */ AuthorizationBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_authorization_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-authorization-excel-data.action */ 903693);
/* harmony import */ var _actions_create_authorization_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-authorization.action */ 116488);
/* harmony import */ var _actions_update_authorizations_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-authorizations.action */ 122504);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class AuthorizationBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AuthorizationBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAuthorization(input) {
    const action = new _actions_create_authorization_action__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationAction(input);
    action.Do(this);
    return action.response;
  }
  updateAuthorization(input, authorizationId) {
    const action = new _actions_update_authorizations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationAction(input, authorizationId);
    action.Do(this);
    return action.response;
  }
  importAuthorizations(authorizations) {
    const updateAuthorizationsAction = new _actions_update_authorizations_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationsAction(authorizations);
    updateAuthorizationsAction.Do(this);
    return updateAuthorizationsAction.response;
  }
  validateAuthorizationExcelData(excelData, vendors, authorizationCategories, authorizationTypes, procedures) {
    const validateAuthorizationExcelDataAction = new _actions_validate_authorization_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateAuthorizationExcelDataAction(excelData, vendors, authorizationCategories, authorizationTypes, procedures);
    validateAuthorizationExcelDataAction.Do(this);
    return validateAuthorizationExcelDataAction.response;
  }
}
AuthorizationBusinessProviderService.ɵfac = function AuthorizationBusinessProviderService_Factory(t) {
  return new (t || AuthorizationBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AuthorizationBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: AuthorizationBusinessProviderService,
  factory: AuthorizationBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 140628:
/*!****************************************************************!*\
  !*** ./libs/web/authorization/shared/authorization.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationService": () => (/* binding */ AuthorizationService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorization.business-provider.service */ 459806);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class AuthorizationService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("AuthorizationService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createAuthorization(input) {
    return this.businessProvider.createAuthorization(input);
  }
  updateAuthorization(input, authorizationId) {
    return this.businessProvider.updateAuthorization(input, authorizationId);
  }
  importAuthorizations(authorizations) {
    return this.businessProvider.importAuthorizations(authorizations);
  }
  validateAuthorizationExcelData(excelData, vendors, authorizationCategories, authorizationTypes, procedures) {
    return this.businessProvider.validateAuthorizationExcelData(excelData, vendors, authorizationCategories, authorizationTypes, procedures);
  }
}
AuthorizationService.ɵfac = function AuthorizationService_Factory(t) {
  return new (t || AuthorizationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
AuthorizationService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AuthorizationService,
  factory: AuthorizationService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 778774:
/*!**************************************************************!*\
  !*** ./libs/web/authorization/shared/authorization.store.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAuthorizationFeatureStore": () => (/* binding */ WebAuthorizationFeatureStore)
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
/* harmony import */ var _authorization_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./authorization.service */ 140628);














class WebAuthorizationFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, authorizationService) {
    super({
      loading: false,
      authorizations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      vendorId: undefined,
      authorizationCategoryId: undefined,
      authorizationTypeId: undefined,
      procedureId: undefined,
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
    this.authorizationService = authorizationService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.authorizations$ = this.select(s => s.authorizations);
    this.vendors$ = this.select(s => s.vendors || []);
    this.authorizationCategories$ = this.select(s => s.authorizationCategories || []);
    this.authorizationTypes$ = this.select(s => s.authorizationTypes || []);
    this.procedures$ = this.select(s => s.procedures || []);
    this.vendorId$ = this.select(s => s.vendorId);
    this.authorizationCategoryId$ = this.select(s => s.authorizationCategoryId);
    this.authorizationTypeId$ = this.select(s => s.authorizationTypeId);
    this.procedureId$ = this.select(s => s.procedureId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizations$, this.vendors$, this.authorizationCategories$, this.authorizationTypes$, this.procedures$, (errors, loading, item, formName, authorizations, vendors, authorizationCategories, authorizationTypes, procedures) => ({
      errors,
      loading,
      item,
      formName,
      authorizations,
      vendors,
      authorizationCategories,
      authorizationTypes,
      procedures
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.vendorId$, this.authorizationCategoryId$, this.authorizationTypeId$, this.procedureId$, this.searchQuery$, (paging, vendorId, authorizationCategoryId, authorizationTypeId, procedureId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      vendorId: vendorId,
      authorizationCategoryId: authorizationCategoryId,
      authorizationTypeId: authorizationTypeId,
      procedureId: procedureId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setVendorId = this.updater((state, vendorId) => Object.assign(Object.assign({}, state), {
      vendorId
    }));
    this.setAuthorizationCategoryId = this.updater((state, authorizationCategoryId) => Object.assign(Object.assign({}, state), {
      authorizationCategoryId
    }));
    this.setAuthorizationTypeId = this.updater((state, authorizationTypeId) => Object.assign(Object.assign({}, state), {
      authorizationTypeId
    }));
    this.setProcedureId = this.updater((state, procedureId) => Object.assign(Object.assign({}, state), {
      procedureId
    }));
    this.filterVendors = term => this.data.userSelectVendors({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let vendors = res.data.items;
      this.patchState({
        vendors
      });
      return vendors;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAuthorizationCategories = term => this.data.userSelectAuthorizationCategories({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let authorizationCategories = res.data.items;
      this.patchState({
        authorizationCategories
      });
      return authorizationCategories;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAuthorizationTypes = term => this.data.userSelectAuthorizationTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let authorizationTypes = res.data.items;
      this.patchState({
        authorizationTypes
      });
      return authorizationTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterProcedures = term => this.data.userSelectProcedures({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedures = res.data.items;
      this.patchState({
        procedures
      });
      return procedures;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addVendor = this.updater((state, vendor) => Object.assign(Object.assign({}, state), {
      vendors: state.vendors.concat(vendor)
    }));
    this.addAuthorizationCategory = this.updater((state, authorizationCategory) => Object.assign(Object.assign({}, state), {
      authorizationCategories: state.authorizationCategories.concat(authorizationCategory)
    }));
    this.addAuthorizationType = this.updater((state, authorizationType) => Object.assign(Object.assign({}, state), {
      authorizationTypes: state.authorizationTypes.concat(authorizationType)
    }));
    this.addProcedure = this.updater((state, procedure) => Object.assign(Object.assign({}, state), {
      procedures: state.procedures.concat(procedure)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewAuthorization = this.updater((state, authorization) => Object.assign(Object.assign({}, state), {
      authorizations: [...state.authorizations, authorization]
    }));
    this.updateAuthorization = this.updater((state, authorization) => {
      return Object.assign(Object.assign({}, state), {
        authorizations: state.authorizations.map(el => {
          if (el.id === authorization.id) {
            return authorization;
          } else {
            return el;
          }
        })
      });
    });
    this.addAuthorizations = this.updater((state, newAuthorizations) => Object.assign(Object.assign({}, state), {
      authorizations: state.authorizations.concat(newAuthorizations)
    }));
    this.updateAuthorizations = this.updater((state, updatedAuthorizations) => {
      return Object.assign(Object.assign({}, state), {
        authorizations: state.authorizations.map(authorization => {
          const updated = updatedAuthorizations.find(el => el.id === authorization.id);
          return updated ? updated : authorization;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadAuthorizationEffect = this.effect(authorizationId$ => authorizationId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(authorizationId => this.data.userAuthorization({
      authorizationId
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
    this.loadAuthorizationsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userAuthorizations({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      authorizations: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createAuthorizationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.authorizationService.createAuthorization(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorization => {
      this.addNewAuthorization(authorization);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: authorization,
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
    this.updateAuthorizationEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.authorizationService.updateAuthorization(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorization => {
      this.updateAuthorization(authorization);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: authorization,
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
    this.deleteAuthorizationEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, authorization]) => {
      return this.data.userDeleteAuthorization({
        authorizationId: authorization.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.authorizationService.importAuthorizations(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addAuthorizations(created);
      this.updateAuthorizations(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('authorizationId')) {
      var authorizationId = this.route.snapshot.paramMap.get('authorizationId');
      this.setFormName('authorization_edit');
    } else {
      this.setFormName('authorization_create');
    }
    if (this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId");
      this.setVendorId(vendorId);
    }
    if (this.route.snapshot.paramMap.has("authorizationCategoryId")) {
      var authorizationCategoryId = this.route.snapshot.paramMap.get("authorizationCategoryId");
      this.setAuthorizationCategoryId(authorizationCategoryId);
    }
    if (this.route.snapshot.paramMap.has("authorizationTypeId")) {
      var authorizationTypeId = this.route.snapshot.paramMap.get("authorizationTypeId");
      this.setAuthorizationTypeId(authorizationTypeId);
    }
    if (this.route.snapshot.paramMap.has("procedureId")) {
      var procedureId = this.route.snapshot.paramMap.get("procedureId");
      this.setProcedureId(procedureId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.authorizationService.validateAuthorizationExcelData(excelData, vm.vendors, vm.authorizationCategories, vm.authorizationTypes, vm.procedures);
    }));
  }
}
WebAuthorizationFeatureStore.ɵfac = function WebAuthorizationFeatureStore_Factory(t) {
  return new (t || WebAuthorizationFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_authorization_service__WEBPACK_IMPORTED_MODULE_12__.AuthorizationService));
};
WebAuthorizationFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebAuthorizationFeatureStore,
  factory: WebAuthorizationFeatureStore.ɵfac
});

/***/ }),

/***/ 186231:
/*!*********************************************************************************!*\
  !*** ./libs/web/authorization/shared/rules/authorization-name-is-valid.rule.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationNameIsValidRule": () => (/* binding */ AuthorizationNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class AuthorizationNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 688148:
/*!*****************************************************************************************!*\
  !*** ./libs/web/authorization/shared/rules/create-authorization-input-is-valid.rule.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationInputIsValidRule": () => (/* binding */ CreateAuthorizationInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _authorization_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-name-is-valid.rule */ 186231);


class CreateAuthorizationInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _authorization_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.AuthorizationNameIsValidRule('name', 'The authorization name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);