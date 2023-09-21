"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_authorization-type_shared_authorization-type_store_ts"],{

/***/ 104054:
/*!***********************************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/actions/authorization-type.business-action-base.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationTypeBusinessActionBase": () => (/* binding */ AuthorizationTypeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AuthorizationTypeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 664477:
/*!****************************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/actions/create-authorization-type.action.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationTypeAction": () => (/* binding */ CreateAuthorizationTypeAction)
/* harmony export */ });
/* harmony import */ var _authorization_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-type.business-action-base */ 104054);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_authorization_type_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-authorization-type-input-is-valid.rule */ 865237);




class CreateAuthorizationTypeAction extends _authorization_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationTypeBusinessActionBase {
  constructor(input) {
    super('CreateAuthorizationTypeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_authorization_type_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationTypeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationType({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 745165:
/*!*****************************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/actions/update-authorization-types.action.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAuthorizationTypeAction": () => (/* binding */ UpdateAuthorizationTypeAction),
/* harmony export */   "UpdateAuthorizationTypesAction": () => (/* binding */ UpdateAuthorizationTypesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-type.business-action-base */ 104054);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateAuthorizationTypesAction extends _authorization_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationTypeBusinessActionBase {
  constructor(authorizationTypes) {
    super('UpdateAuthorizationTypesAction');
    this.authorizationTypes = authorizationTypes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizationTypes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizationTypes({
      input: {
        authorizationTypes: this.authorizationTypes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateAuthorizationTypeAction extends _authorization_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationTypeBusinessActionBase {
  constructor(authorizationType, authorizationTypeId) {
    super('UpdateAuthorizationTypeAction');
    this.authorizationType = authorizationType;
    this.authorizationTypeId = authorizationTypeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.authorizationType, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.authorizationTypeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAuthorizationType({
      authorizationTypeId: this.authorizationTypeId,
      input: this.authorizationType
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 500818:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/actions/validate-authorization-type-excel-data.action.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateAuthorizationTypeExcelDataAction": () => (/* binding */ ValidateAuthorizationTypeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _authorization_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-type.business-action-base */ 104054);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateAuthorizationTypeExcelDataAction extends _authorization_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AuthorizationTypeBusinessActionBase {
  constructor(excelData) {
    super('ValidateAuthorizationTypeExcelDataAction');
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

/***/ 290806:
/*!********************************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/authorization-type.business-provider.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationTypeBusinessProviderService": () => (/* binding */ AuthorizationTypeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_authorization_type_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-authorization-type-excel-data.action */ 500818);
/* harmony import */ var _actions_create_authorization_type_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-authorization-type.action */ 664477);
/* harmony import */ var _actions_update_authorization_types_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-authorization-types.action */ 745165);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class AuthorizationTypeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AuthorizationTypeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAuthorizationType(input) {
    const action = new _actions_create_authorization_type_action__WEBPACK_IMPORTED_MODULE_2__.CreateAuthorizationTypeAction(input);
    action.Do(this);
    return action.response;
  }
  updateAuthorizationType(input, authorizationTypeId) {
    const action = new _actions_update_authorization_types_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationTypeAction(input, authorizationTypeId);
    action.Do(this);
    return action.response;
  }
  importAuthorizationTypes(authorizationTypes) {
    const updateAuthorizationTypesAction = new _actions_update_authorization_types_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAuthorizationTypesAction(authorizationTypes);
    updateAuthorizationTypesAction.Do(this);
    return updateAuthorizationTypesAction.response;
  }
  validateAuthorizationTypeExcelData(excelData) {
    const validateAuthorizationTypeExcelDataAction = new _actions_validate_authorization_type_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateAuthorizationTypeExcelDataAction(excelData);
    validateAuthorizationTypeExcelDataAction.Do(this);
    return validateAuthorizationTypeExcelDataAction.response;
  }
}
AuthorizationTypeBusinessProviderService.ɵfac = function AuthorizationTypeBusinessProviderService_Factory(t) {
  return new (t || AuthorizationTypeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AuthorizationTypeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: AuthorizationTypeBusinessProviderService,
  factory: AuthorizationTypeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 755767:
/*!**************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/authorization-type.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationTypeService": () => (/* binding */ AuthorizationTypeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _authorization_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorization-type.business-provider.service */ 290806);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class AuthorizationTypeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("AuthorizationTypeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createAuthorizationType(input) {
    return this.businessProvider.createAuthorizationType(input);
  }
  updateAuthorizationType(input, authorizationTypeId) {
    return this.businessProvider.updateAuthorizationType(input, authorizationTypeId);
  }
  importAuthorizationTypes(authorizationTypes) {
    return this.businessProvider.importAuthorizationTypes(authorizationTypes);
  }
  validateAuthorizationTypeExcelData(excelData) {
    return this.businessProvider.validateAuthorizationTypeExcelData(excelData);
  }
}
AuthorizationTypeService.ɵfac = function AuthorizationTypeService_Factory(t) {
  return new (t || AuthorizationTypeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationTypeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authorization_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationTypeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
AuthorizationTypeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AuthorizationTypeService,
  factory: AuthorizationTypeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 900269:
/*!************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/authorization-type.store.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAuthorizationTypeFeatureStore": () => (/* binding */ WebAuthorizationTypeFeatureStore)
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
/* harmony import */ var _authorization_type_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./authorization-type.service */ 755767);














class WebAuthorizationTypeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, authorizationTypeService) {
    super({
      loading: false,
      authorizationTypes: [],
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
    this.authorizationTypeService = authorizationTypeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.authorizationTypes$ = this.select(s => s.authorizationTypes);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationTypes$, (errors, loading, item, formName, authorizationTypes) => ({
      errors,
      loading,
      item,
      formName,
      authorizationTypes
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
    this.addNewAuthorizationType = this.updater((state, authorizationType) => Object.assign(Object.assign({}, state), {
      authorizationTypes: [...state.authorizationTypes, authorizationType]
    }));
    this.updateAuthorizationType = this.updater((state, authorizationType) => {
      return Object.assign(Object.assign({}, state), {
        authorizationTypes: state.authorizationTypes.map(el => {
          if (el.id === authorizationType.id) {
            return authorizationType;
          } else {
            return el;
          }
        })
      });
    });
    this.addAuthorizationTypes = this.updater((state, newAuthorizationTypes) => Object.assign(Object.assign({}, state), {
      authorizationTypes: state.authorizationTypes.concat(newAuthorizationTypes)
    }));
    this.updateAuthorizationTypes = this.updater((state, updatedAuthorizationTypes) => {
      return Object.assign(Object.assign({}, state), {
        authorizationTypes: state.authorizationTypes.map(authorizationType => {
          const updated = updatedAuthorizationTypes.find(el => el.id === authorizationType.id);
          return updated ? updated : authorizationType;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadAuthorizationTypeEffect = this.effect(authorizationTypeId$ => authorizationTypeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(authorizationTypeId => this.data.userAuthorizationType({
      authorizationTypeId
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
    this.loadAuthorizationTypesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userAuthorizationTypes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.patchState({
        paging: {
          limit: input.limit,
          skip: input.skip,
          total: res.data.count.total
        },
        authorizationTypes: res.data.items,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createAuthorizationTypeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.authorizationTypeService.createAuthorizationType(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorizationType => {
      this.addNewAuthorizationType(authorizationType);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: authorizationType,
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
    this.updateAuthorizationTypeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.authorizationTypeService.updateAuthorizationType(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(authorizationType => {
      this.updateAuthorizationType(authorizationType);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: authorizationType,
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
    this.deleteAuthorizationTypeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, authorizationType]) => {
      return this.data.userDeleteAuthorizationType({
        authorizationTypeId: authorizationType.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.authorizationTypeService.importAuthorizationTypes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addAuthorizationTypes(created);
      this.updateAuthorizationTypes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('authorizationTypeId')) {
      var authorizationTypeId = this.route.snapshot.paramMap.get('authorizationTypeId');
      this.setFormName('authorizationType_edit');
    } else {
      this.setFormName('authorizationType_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.authorizationTypeService.validateAuthorizationTypeExcelData(excelData);
    }));
  }
}
WebAuthorizationTypeFeatureStore.ɵfac = function WebAuthorizationTypeFeatureStore_Factory(t) {
  return new (t || WebAuthorizationTypeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_authorization_type_service__WEBPACK_IMPORTED_MODULE_11__.AuthorizationTypeService));
};
WebAuthorizationTypeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebAuthorizationTypeFeatureStore,
  factory: WebAuthorizationTypeFeatureStore.ɵfac
});

/***/ }),

/***/ 818522:
/*!*******************************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/rules/authorization-type-name-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationTypeNameIsValidRule": () => (/* binding */ AuthorizationTypeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class AuthorizationTypeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 865237:
/*!***************************************************************************************************!*\
  !*** ./libs/web/authorization-type/shared/rules/create-authorization-type-input-is-valid.rule.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAuthorizationTypeInputIsValidRule": () => (/* binding */ CreateAuthorizationTypeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _authorization_type_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization-type-name-is-valid.rule */ 818522);


class CreateAuthorizationTypeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _authorization_type_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.AuthorizationTypeNameIsValidRule('name', 'The authorizationtype name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);