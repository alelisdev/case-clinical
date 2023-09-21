"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_authorization-status_shared_authorization-status_store_ts"],{

/***/ 820173:
/*!***************************************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/actions/authorization-status.business-action-base.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationStatusBusinessActionBase": () => (/* binding */ AuthorizationStatusBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AuthorizationStatusBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 672041:
/*!********************************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/actions/create-authorization-status.action.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationStatusAction": () => (/* binding */ CreateAuthorizationStatusAction)
/* harmony export */ });
/* harmony import */ var _authorization_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-status.business-action-base */ 820173);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_authorization_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-authorization-status-input-is-valid.rule */ 146747);




class CreateAuthorizationStatusAction extends _authorization_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationStatusBusinessActionBase {
  constructor(input) {
    super('CreateAuthorizationStatusAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_authorization_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationStatusInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationStatus({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 67641:
/*!**********************************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/actions/update-authorization-statuses.action.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAuthorizationStatusAction": () => (/* binding */ UpdateAuthorizationStatusAction),
/* harmony export */   "UpdateAuthorizationStatusesAction": () => (/* binding */ UpdateAuthorizationStatusesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-status.business-action-base */ 820173);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateAuthorizationStatusesAction extends _authorization_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationStatusBusinessActionBase {
  constructor(authorizationStatuses) {
    super('UpdateAuthorizationStatusesAction');
    this.authorizationStatuses = authorizationStatuses;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizationStatuses, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizationStatuses({
      input: {
        authorizationStatuses: this.authorizationStatuses
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateAuthorizationStatusAction extends _authorization_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationStatusBusinessActionBase {
  constructor(authorizationStatus, authorizationStatusId) {
    super('UpdateAuthorizationStatusAction');
    this.authorizationStatus = authorizationStatus;
    this.authorizationStatusId = authorizationStatusId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizationStatus, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.authorizationStatusId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizationStatus({
      authorizationStatusId: this.authorizationStatusId,
      input: this.authorizationStatus
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 714855:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/actions/validate-authorization-status-excel-data.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateAuthorizationStatusExcelDataAction": () => (/* binding */ ValidateAuthorizationStatusExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-status.business-action-base */ 820173);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateAuthorizationStatusExcelDataAction extends _authorization_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationStatusBusinessActionBase {
  constructor(excelData) {
    super('ValidateAuthorizationStatusExcelDataAction');
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

/***/ 536557:
/*!************************************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/authorization-status.business-provider.service.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationStatusBusinessProviderService": () => (/* binding */ AuthorizationStatusBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_authorization_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-authorization-status-excel-data.action */ 714855);
/* harmony import */ var _actions_create_authorization_status_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-authorization-status.action */ 672041);
/* harmony import */ var _actions_update_authorization_statuses_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-authorization-statuses.action */ 67641);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class AuthorizationStatusBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AuthorizationStatusBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAuthorizationStatus(input) {
    const action = new _actions_create_authorization_status_action__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationStatusAction(input);
    action.Do(this);
    return action.response;
  }
  updateAuthorizationStatus(input, authorizationStatusId) {
    const action = new _actions_update_authorization_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationStatusAction(input, authorizationStatusId);
    action.Do(this);
    return action.response;
  }
  importAuthorizationStatuses(authorizationStatuses) {
    const updateAuthorizationStatusesAction = new _actions_update_authorization_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationStatusesAction(authorizationStatuses);
    updateAuthorizationStatusesAction.Do(this);
    return updateAuthorizationStatusesAction.response;
  }
  validateAuthorizationStatusExcelData(excelData) {
    const validateAuthorizationStatusExcelDataAction = new _actions_validate_authorization_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateAuthorizationStatusExcelDataAction(excelData);
    validateAuthorizationStatusExcelDataAction.Do(this);
    return validateAuthorizationStatusExcelDataAction.response;
  }
}
AuthorizationStatusBusinessProviderService.ɵfac = function AuthorizationStatusBusinessProviderService_Factory(t) {
  return new (t || AuthorizationStatusBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AuthorizationStatusBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: AuthorizationStatusBusinessProviderService,
  factory: AuthorizationStatusBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 714100:
/*!******************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/authorization-status.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationStatusService": () => (/* binding */ AuthorizationStatusService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _authorization_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorization-status.business-provider.service */ 536557);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class AuthorizationStatusService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("AuthorizationStatusService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createAuthorizationStatus(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createAuthorizationStatus(filteredObj);
  }
  updateAuthorizationStatus(input, authorizationStatusId) {
    return this.businessProvider.updateAuthorizationStatus(input, authorizationStatusId);
  }
  importAuthorizationStatuses(authorizationStatuses) {
    return this.businessProvider.importAuthorizationStatuses(authorizationStatuses);
  }
  validateAuthorizationStatusExcelData(excelData) {
    return this.businessProvider.validateAuthorizationStatusExcelData(excelData);
  }
}
AuthorizationStatusService.ɵfac = function AuthorizationStatusService_Factory(t) {
  return new (t || AuthorizationStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationStatusBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationStatusBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
AuthorizationStatusService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AuthorizationStatusService,
  factory: AuthorizationStatusService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 243205:
/*!****************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/authorization-status.store.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAuthorizationStatusFeatureStore": () => (/* binding */ WebAuthorizationStatusFeatureStore)
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
/* harmony import */ var _authorization_status_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./authorization-status.service */ 714100);














class WebAuthorizationStatusFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, authorizationStatusService) {
    super({
      loading: false,
      authorizationStatuses: [],
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
    this.authorizationStatusService = authorizationStatusService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.authorizationStatuses$ = this.select(s => s.authorizationStatuses);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationStatuses$, (errors, loading, item, formName, authorizationStatuses) => ({
      errors,
      loading,
      item,
      formName,
      authorizationStatuses
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
    this.addNewAuthorizationStatus = this.updater((state, authorizationStatus) => Object.assign(Object.assign({}, state), {
      authorizationStatuses: [...state.authorizationStatuses, authorizationStatus]
    }));
    this.updateAuthorizationStatus = this.updater((state, authorizationStatus) => {
      return Object.assign(Object.assign({}, state), {
        authorizationStatuses: state.authorizationStatuses.map(el => {
          if (el.id === authorizationStatus.id) {
            return authorizationStatus;
          } else {
            return el;
          }
        })
      });
    });
    this.addAuthorizationStatuses = this.updater((state, newAuthorizationStatuses) => Object.assign(Object.assign({}, state), {
      authorizationStatuses: state.authorizationStatuses.concat(newAuthorizationStatuses)
    }));
    this.updateAuthorizationStatuses = this.updater((state, updatedAuthorizationStatuses) => {
      return Object.assign(Object.assign({}, state), {
        authorizationStatuses: state.authorizationStatuses.map(authorizationStatus => {
          const updated = updatedAuthorizationStatuses.find(el => el.id === authorizationStatus.id);
          return updated ? updated : authorizationStatus;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadAuthorizationStatusEffect = this.effect(authorizationStatusId$ => authorizationStatusId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(authorizationStatusId => this.data.userAuthorizationStatus({
      authorizationStatusId
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
    this.loadAuthorizationStatusesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userAuthorizationStatuses({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      authorizationStatuses: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createAuthorizationStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.authorizationStatusService.createAuthorizationStatus(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorizationStatus => {
      this.addNewAuthorizationStatus(authorizationStatus);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: authorizationStatus,
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
    this.updateAuthorizationStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.authorizationStatusService.updateAuthorizationStatus(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorizationStatus => {
      this.updateAuthorizationStatus(authorizationStatus);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: authorizationStatus,
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
    this.deleteAuthorizationStatusEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, authorizationStatus]) => {
      return this.data.userDeleteAuthorizationStatus({
        authorizationStatusId: authorizationStatus.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.authorizationStatusService.importAuthorizationStatuses(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addAuthorizationStatuses(created);
      this.updateAuthorizationStatuses(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('authorizationStatusId')) {
      var authorizationStatusId = this.route.snapshot.paramMap.get('authorizationStatusId');
      this.setFormName('authorizationStatus_edit');
    } else {
      this.setFormName('authorizationStatus_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.authorizationStatusService.validateAuthorizationStatusExcelData(excelData);
    }));
  }
}
WebAuthorizationStatusFeatureStore.ɵfac = function WebAuthorizationStatusFeatureStore_Factory(t) {
  return new (t || WebAuthorizationStatusFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_authorization_status_service__WEBPACK_IMPORTED_MODULE_11__.AuthorizationStatusService));
};
WebAuthorizationStatusFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebAuthorizationStatusFeatureStore,
  factory: WebAuthorizationStatusFeatureStore.ɵfac
});

/***/ }),

/***/ 154:
/*!***********************************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/rules/authorization-status-name-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationStatusNameIsValidRule": () => (/* binding */ AuthorizationStatusNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class AuthorizationStatusNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 146747:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/authorization-status/shared/rules/create-authorization-status-input-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationStatusInputIsValidRule": () => (/* binding */ CreateAuthorizationStatusInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _authorization_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-status-name-is-valid.rule */ 154);


class CreateAuthorizationStatusInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _authorization_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.AuthorizationStatusNameIsValidRule('name', 'The authorizationstatus name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);