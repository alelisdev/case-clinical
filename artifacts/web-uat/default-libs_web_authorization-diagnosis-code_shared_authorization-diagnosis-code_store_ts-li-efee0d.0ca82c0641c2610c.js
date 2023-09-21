"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_authorization-diagnosis-code_shared_authorization-diagnosis-code_store_ts-li-efee0d"],{

/***/ 806604:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/actions/authorization-diagnosis-code.business-action-base.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationDiagnosisCodeBusinessActionBase": () => (/* binding */ AuthorizationDiagnosisCodeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AuthorizationDiagnosisCodeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 380445:
/*!************************************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/actions/create-authorization-diagnosis-code.action.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationDiagnosisCodeAction": () => (/* binding */ CreateAuthorizationDiagnosisCodeAction)
/* harmony export */ });
/* harmony import */ var _authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-diagnosis-code.business-action-base */ 806604);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_authorization_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-authorization-diagnosis-code-input-is-valid.rule */ 388529);




class CreateAuthorizationDiagnosisCodeAction extends _authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationDiagnosisCodeBusinessActionBase {
  constructor(input) {
    super('CreateAuthorizationDiagnosisCodeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_authorization_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationDiagnosisCodeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationDiagnosisCode({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 993998:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/actions/update-authorization-diagnosis-codes.action.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAuthorizationDiagnosisCodeAction": () => (/* binding */ UpdateAuthorizationDiagnosisCodeAction),
/* harmony export */   "UpdateAuthorizationDiagnosisCodesAction": () => (/* binding */ UpdateAuthorizationDiagnosisCodesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-diagnosis-code.business-action-base */ 806604);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateAuthorizationDiagnosisCodesAction extends _authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationDiagnosisCodeBusinessActionBase {
  constructor(authorizationDiagnosisCodes) {
    super('UpdateAuthorizationDiagnosisCodesAction');
    this.authorizationDiagnosisCodes = authorizationDiagnosisCodes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizationDiagnosisCodes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizationDiagnosisCodes({
      input: {
        authorizationDiagnosisCodes: this.authorizationDiagnosisCodes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateAuthorizationDiagnosisCodeAction extends _authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationDiagnosisCodeBusinessActionBase {
  constructor(authorizationDiagnosisCode, authorizationDiagnosisCodeId) {
    super('UpdateAuthorizationDiagnosisCodeAction');
    this.authorizationDiagnosisCode = authorizationDiagnosisCode;
    this.authorizationDiagnosisCodeId = authorizationDiagnosisCodeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizationDiagnosisCode, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.authorizationDiagnosisCodeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizationDiagnosisCode({
      authorizationDiagnosisCodeId: this.authorizationDiagnosisCodeId,
      input: this.authorizationDiagnosisCode
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 289864:
/*!*************************************************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/actions/validate-authorization-diagnosis-code-excel-data.action.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateAuthorizationDiagnosisCodeExcelDataAction": () => (/* binding */ ValidateAuthorizationDiagnosisCodeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-diagnosis-code.business-action-base */ 806604);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateAuthorizationDiagnosisCodeExcelDataAction extends _authorization_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationDiagnosisCodeBusinessActionBase {
  constructor(excelData, diagnoses, authorizations) {
    super('ValidateAuthorizationDiagnosisCodeExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.diagnoses = diagnoses;
    this.authorizations = authorizations;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`diagnosisName_${index}_is_valid}`, "Diagnosis Is Not Valid", 'diagnosis.name', datum['diagnosis'], this.diagnoses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`authorizationName_${index}_is_valid}`, "Authorization Is Not Valid", 'authorization.name', datum['authorization'], this.authorizations, true));
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

/***/ 200281:
/*!****************************************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/authorization-diagnosis-code.business-provider.service.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationDiagnosisCodeBusinessProviderService": () => (/* binding */ AuthorizationDiagnosisCodeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_authorization_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-authorization-diagnosis-code-excel-data.action */ 289864);
/* harmony import */ var _actions_create_authorization_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-authorization-diagnosis-code.action */ 380445);
/* harmony import */ var _actions_update_authorization_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-authorization-diagnosis-codes.action */ 993998);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class AuthorizationDiagnosisCodeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AuthorizationDiagnosisCodeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAuthorizationDiagnosisCode(input) {
    const action = new _actions_create_authorization_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationDiagnosisCodeAction(input);
    action.Do(this);
    return action.response;
  }
  updateAuthorizationDiagnosisCode(input, authorizationDiagnosisCodeId) {
    const action = new _actions_update_authorization_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationDiagnosisCodeAction(input, authorizationDiagnosisCodeId);
    action.Do(this);
    return action.response;
  }
  importAuthorizationDiagnosisCodes(authorizationDiagnosisCodes) {
    const updateAuthorizationDiagnosisCodesAction = new _actions_update_authorization_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationDiagnosisCodesAction(authorizationDiagnosisCodes);
    updateAuthorizationDiagnosisCodesAction.Do(this);
    return updateAuthorizationDiagnosisCodesAction.response;
  }
  validateAuthorizationDiagnosisCodeExcelData(excelData, diagnoses, authorizations) {
    const validateAuthorizationDiagnosisCodeExcelDataAction = new _actions_validate_authorization_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateAuthorizationDiagnosisCodeExcelDataAction(excelData, diagnoses, authorizations);
    validateAuthorizationDiagnosisCodeExcelDataAction.Do(this);
    return validateAuthorizationDiagnosisCodeExcelDataAction.response;
  }
}
AuthorizationDiagnosisCodeBusinessProviderService.ɵfac = function AuthorizationDiagnosisCodeBusinessProviderService_Factory(t) {
  return new (t || AuthorizationDiagnosisCodeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AuthorizationDiagnosisCodeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: AuthorizationDiagnosisCodeBusinessProviderService,
  factory: AuthorizationDiagnosisCodeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 673934:
/*!**********************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/authorization-diagnosis-code.service.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationDiagnosisCodeService": () => (/* binding */ AuthorizationDiagnosisCodeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _authorization_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorization-diagnosis-code.business-provider.service */ 200281);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class AuthorizationDiagnosisCodeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("AuthorizationDiagnosisCodeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createAuthorizationDiagnosisCode(input) {
    return this.businessProvider.createAuthorizationDiagnosisCode(input);
  }
  updateAuthorizationDiagnosisCode(input, authorizationDiagnosisCodeId) {
    return this.businessProvider.updateAuthorizationDiagnosisCode(input, authorizationDiagnosisCodeId);
  }
  importAuthorizationDiagnosisCodes(authorizationDiagnosisCodes) {
    return this.businessProvider.importAuthorizationDiagnosisCodes(authorizationDiagnosisCodes);
  }
  validateAuthorizationDiagnosisCodeExcelData(excelData, diagnoses, authorizations) {
    return this.businessProvider.validateAuthorizationDiagnosisCodeExcelData(excelData, diagnoses, authorizations);
  }
}
AuthorizationDiagnosisCodeService.ɵfac = function AuthorizationDiagnosisCodeService_Factory(t) {
  return new (t || AuthorizationDiagnosisCodeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationDiagnosisCodeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationDiagnosisCodeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
AuthorizationDiagnosisCodeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AuthorizationDiagnosisCodeService,
  factory: AuthorizationDiagnosisCodeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 973865:
/*!********************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/authorization-diagnosis-code.store.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAuthorizationDiagnosisCodeFeatureStore": () => (/* binding */ WebAuthorizationDiagnosisCodeFeatureStore)
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
/* harmony import */ var _authorization_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./authorization-diagnosis-code.service */ 673934);














class WebAuthorizationDiagnosisCodeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, authorizationDiagnosisCodeService) {
    super({
      loading: false,
      authorizationDiagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      diagnosisCodeId: undefined,
      authorizationId: undefined,
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
    this.authorizationDiagnosisCodeService = authorizationDiagnosisCodeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.authorizationDiagnosisCodes$ = this.select(s => s.authorizationDiagnosisCodes);
    this.diagnosisCodes$ = this.select(s => s.diagnosisCodes || []);
    this.authorizations$ = this.select(s => s.authorizations || []);
    this.diagnosisCodeId$ = this.select(s => s.diagnosisCodeId);
    this.authorizationId$ = this.select(s => s.authorizationId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationDiagnosisCodes$, this.diagnosisCodes$, this.authorizations$, (errors, loading, item, formName, authorizationDiagnosisCodes, diagnosisCodes, authorizations) => ({
      errors,
      loading,
      item,
      formName,
      authorizationDiagnosisCodes,
      diagnosisCodes,
      authorizations
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.diagnosisCodeId$, this.authorizationId$, this.searchQuery$, (paging, diagnosisCodeId, authorizationId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      diagnosisCodeId: diagnosisCodeId,
      authorizationId: authorizationId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setDiagnosisCodeId = this.updater((state, diagnosisCodeId) => Object.assign(Object.assign({}, state), {
      diagnosisCodeId
    }));
    this.setAuthorizationId = this.updater((state, authorizationId) => Object.assign(Object.assign({}, state), {
      authorizationId
    }));
    this.filterDiagnosisCodes = term => this.data.userSelectDiagnosisCodes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let diagnosisCodes = res.data.items;
      this.patchState({
        diagnosisCodes
      });
      return diagnosisCodes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
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
    this.addDiagnosisCode = this.updater((state, diagnosisCode) => Object.assign(Object.assign({}, state), {
      diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
    }));
    this.addAuthorization = this.updater((state, authorization) => Object.assign(Object.assign({}, state), {
      authorizations: state.authorizations.concat(authorization)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewAuthorizationDiagnosisCode = this.updater((state, authorizationDiagnosisCode) => Object.assign(Object.assign({}, state), {
      authorizationDiagnosisCodes: [...state.authorizationDiagnosisCodes, authorizationDiagnosisCode]
    }));
    this.updateAuthorizationDiagnosisCode = this.updater((state, authorizationDiagnosisCode) => {
      return Object.assign(Object.assign({}, state), {
        authorizationDiagnosisCodes: state.authorizationDiagnosisCodes.map(el => {
          if (el.id === authorizationDiagnosisCode.id) {
            return authorizationDiagnosisCode;
          } else {
            return el;
          }
        })
      });
    });
    this.addAuthorizationDiagnosisCodes = this.updater((state, newAuthorizationDiagnosisCodes) => Object.assign(Object.assign({}, state), {
      authorizationDiagnosisCodes: state.authorizationDiagnosisCodes.concat(newAuthorizationDiagnosisCodes)
    }));
    this.updateAuthorizationDiagnosisCodes = this.updater((state, updatedAuthorizationDiagnosisCodes) => {
      return Object.assign(Object.assign({}, state), {
        authorizationDiagnosisCodes: state.authorizationDiagnosisCodes.map(authorizationDiagnosisCode => {
          const updated = updatedAuthorizationDiagnosisCodes.find(el => el.id === authorizationDiagnosisCode.id);
          return updated ? updated : authorizationDiagnosisCode;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadAuthorizationDiagnosisCodeEffect = this.effect(authorizationDiagnosisCodeId$ => authorizationDiagnosisCodeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(authorizationDiagnosisCodeId => this.data.userAuthorizationDiagnosisCode({
      authorizationDiagnosisCodeId
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
    this.loadAuthorizationDiagnosisCodesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userAuthorizationDiagnosisCodes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      authorizationDiagnosisCodes: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createAuthorizationDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.authorizationDiagnosisCodeService.createAuthorizationDiagnosisCode(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorizationDiagnosisCode => {
      this.addNewAuthorizationDiagnosisCode(authorizationDiagnosisCode);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: authorizationDiagnosisCode,
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
    this.updateAuthorizationDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.authorizationDiagnosisCodeService.updateAuthorizationDiagnosisCode(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorizationDiagnosisCode => {
      this.updateAuthorizationDiagnosisCode(authorizationDiagnosisCode);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: authorizationDiagnosisCode,
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
    this.deleteAuthorizationDiagnosisCodeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, authorizationDiagnosisCode]) => {
      return this.data.userDeleteAuthorizationDiagnosisCode({
        authorizationDiagnosisCodeId: authorizationDiagnosisCode.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.authorizationDiagnosisCodeService.importAuthorizationDiagnosisCodes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addAuthorizationDiagnosisCodes(created);
      this.updateAuthorizationDiagnosisCodes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('authorizationDiagnosisCodeId')) {
      var authorizationDiagnosisCodeId = this.route.snapshot.paramMap.get('authorizationDiagnosisCodeId');
      this.setFormName('authorizationDiagnosisCode_edit');
    } else {
      this.setFormName('authorizationDiagnosisCode_create');
    }
    if (this.route.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get("diagnosisCodeId");
      this.setDiagnosisCodeId(diagnosisCodeId);
    }
    if (this.route.snapshot.paramMap.has("authorizationId")) {
      var authorizationId = this.route.snapshot.paramMap.get("authorizationId");
      this.setAuthorizationId(authorizationId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.authorizationDiagnosisCodeService.validateAuthorizationDiagnosisCodeExcelData(excelData, vm.diagnosisCodes, vm.authorizations);
    }));
  }
}
WebAuthorizationDiagnosisCodeFeatureStore.ɵfac = function WebAuthorizationDiagnosisCodeFeatureStore_Factory(t) {
  return new (t || WebAuthorizationDiagnosisCodeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_authorization_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_12__.AuthorizationDiagnosisCodeService));
};
WebAuthorizationDiagnosisCodeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebAuthorizationDiagnosisCodeFeatureStore,
  factory: WebAuthorizationDiagnosisCodeFeatureStore.ɵfac
});

/***/ }),

/***/ 490622:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/rules/authorization-diagnosis-code-name-is-valid.rule.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationDiagnosisCodeNameIsValidRule": () => (/* binding */ AuthorizationDiagnosisCodeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class AuthorizationDiagnosisCodeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 388529:
/*!***********************************************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/shared/rules/create-authorization-diagnosis-code-input-is-valid.rule.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationDiagnosisCodeInputIsValidRule": () => (/* binding */ CreateAuthorizationDiagnosisCodeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _authorization_diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-diagnosis-code-name-is-valid.rule */ 490622);


class CreateAuthorizationDiagnosisCodeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _authorization_diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.AuthorizationDiagnosisCodeNameIsValidRule('name', 'The authorizationdiagnosiscode name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 38940:
/*!***************************************************************************************************************************************************************!*\
  !*** ./libs/web/authorization-diagnosis-code/ui/web-authorization-diagnosis-code-select-form/web-authorization-diagnosis-code-select-table-view.component.ts ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAuthorizationDiagnosisCodeSelectTableViewComponent": () => (/* binding */ WebAuthorizationDiagnosisCodeSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebAuthorizationDiagnosisCodeSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.authorizationDiagnosisCodes = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'diagnosis.name',
      headerName: 'Diagnosis',
      filter: 'agTextColumnFilter'
    }, {
      field: 'authorization.name',
      headerName: 'Authorization',
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
      field: 'diagnosisCodeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'authorizationId',
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
WebAuthorizationDiagnosisCodeSelectTableViewComponent.ɵfac = function WebAuthorizationDiagnosisCodeSelectTableViewComponent_Factory(t) {
  return new (t || WebAuthorizationDiagnosisCodeSelectTableViewComponent)();
};
WebAuthorizationDiagnosisCodeSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebAuthorizationDiagnosisCodeSelectTableViewComponent,
  selectors: [["ui-authorization-diagnosis-code-select-table-view"]],
  viewQuery: function WebAuthorizationDiagnosisCodeSelectTableViewComponent_Query(rf, ctx) {
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
    authorizationDiagnosisCodes: "authorizationDiagnosisCodes"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 6,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebAuthorizationDiagnosisCodeSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebAuthorizationDiagnosisCodeSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebAuthorizationDiagnosisCodeSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.authorizationDiagnosisCodes)("showSidebar", false)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);