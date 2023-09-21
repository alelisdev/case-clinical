"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_role-feature-permission_shared_role-feature-permission_store_ts"],{

/***/ 460451:
/*!**************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/actions/create-role-feature-permission.action.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRoleFeaturePermissionAction": () => (/* binding */ CreateRoleFeaturePermissionAction)
/* harmony export */ });
/* harmony import */ var _role_feature_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role-feature-permission.business-action-base */ 887652);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_role_feature_permission_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-role-feature-permission-input-is-valid.rule */ 580150);




class CreateRoleFeaturePermissionAction extends _role_feature_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RoleFeaturePermissionBusinessActionBase {
  constructor(input) {
    super('CreateRoleFeaturePermissionAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_role_feature_permission_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateRoleFeaturePermissionInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateRoleFeaturePermission({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 887652:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/actions/role-feature-permission.business-action-base.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoleFeaturePermissionBusinessActionBase": () => (/* binding */ RoleFeaturePermissionBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class RoleFeaturePermissionBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 10497:
/*!***************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/actions/update-role-feature-permissions.action.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateRoleFeaturePermissionAction": () => (/* binding */ UpdateRoleFeaturePermissionAction),
/* harmony export */   "UpdateRoleFeaturePermissionsAction": () => (/* binding */ UpdateRoleFeaturePermissionsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _role_feature_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role-feature-permission.business-action-base */ 887652);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateRoleFeaturePermissionsAction extends _role_feature_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RoleFeaturePermissionBusinessActionBase {
  constructor(roleFeaturePermissions) {
    super('UpdateRoleFeaturePermissionsAction');
    this.roleFeaturePermissions = roleFeaturePermissions;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.roleFeaturePermissions, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRoleFeaturePermissions({
      input: {
        roleFeaturePermissions: this.roleFeaturePermissions
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateRoleFeaturePermissionAction extends _role_feature_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RoleFeaturePermissionBusinessActionBase {
  constructor(roleFeaturePermission, roleFeaturePermissionId) {
    super('UpdateRoleFeaturePermissionAction');
    this.roleFeaturePermission = roleFeaturePermission;
    this.roleFeaturePermissionId = roleFeaturePermissionId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.roleFeaturePermission, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.roleFeaturePermissionId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRoleFeaturePermission({
      roleFeaturePermissionId: this.roleFeaturePermissionId,
      input: this.roleFeaturePermission
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 122353:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/actions/validate-role-feature-permission-excel-data.action.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateRoleFeaturePermissionExcelDataAction": () => (/* binding */ ValidateRoleFeaturePermissionExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _role_feature_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role-feature-permission.business-action-base */ 887652);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateRoleFeaturePermissionExcelDataAction extends _role_feature_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RoleFeaturePermissionBusinessActionBase {
  constructor(excelData, featurePermissions, roles) {
    super('ValidateRoleFeaturePermissionExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.featurePermissions = featurePermissions;
    this.roles = roles;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`featurePermissionName_${index}_is_valid}`, "Feature Permission Is Not Valid", 'featurePermission.name', datum['featurePermission'], this.featurePermissions, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`roleName_${index}_is_valid}`, "Role Is Not Valid", 'role.name', datum['role'], this.roles, true));
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

/***/ 200477:
/*!******************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/role-feature-permission.business-provider.service.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoleFeaturePermissionBusinessProviderService": () => (/* binding */ RoleFeaturePermissionBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_role_feature_permission_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-role-feature-permission-excel-data.action */ 122353);
/* harmony import */ var _actions_create_role_feature_permission_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-role-feature-permission.action */ 460451);
/* harmony import */ var _actions_update_role_feature_permissions_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-role-feature-permissions.action */ 10497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class RoleFeaturePermissionBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.RoleFeaturePermissionBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createRoleFeaturePermission(input) {
    const action = new _actions_create_role_feature_permission_action__WEBPACK_IMPORTED_MODULE_2__.CreateRoleFeaturePermissionAction(input);
    action.Do(this);
    return action.response;
  }
  updateRoleFeaturePermission(input, roleFeaturePermissionId) {
    const action = new _actions_update_role_feature_permissions_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRoleFeaturePermissionAction(input, roleFeaturePermissionId);
    action.Do(this);
    return action.response;
  }
  importRoleFeaturePermissions(roleFeaturePermissions) {
    const updateRoleFeaturePermissionsAction = new _actions_update_role_feature_permissions_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRoleFeaturePermissionsAction(roleFeaturePermissions);
    updateRoleFeaturePermissionsAction.Do(this);
    return updateRoleFeaturePermissionsAction.response;
  }
  validateRoleFeaturePermissionExcelData(excelData, featurePermissions, roles) {
    const validateRoleFeaturePermissionExcelDataAction = new _actions_validate_role_feature_permission_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateRoleFeaturePermissionExcelDataAction(excelData, featurePermissions, roles);
    validateRoleFeaturePermissionExcelDataAction.Do(this);
    return validateRoleFeaturePermissionExcelDataAction.response;
  }
}
RoleFeaturePermissionBusinessProviderService.ɵfac = function RoleFeaturePermissionBusinessProviderService_Factory(t) {
  return new (t || RoleFeaturePermissionBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
RoleFeaturePermissionBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: RoleFeaturePermissionBusinessProviderService,
  factory: RoleFeaturePermissionBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 973422:
/*!************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/role-feature-permission.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoleFeaturePermissionService": () => (/* binding */ RoleFeaturePermissionService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _role_feature_permission_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./role-feature-permission.business-provider.service */ 200477);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class RoleFeaturePermissionService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("RoleFeaturePermissionService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createRoleFeaturePermission(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createRoleFeaturePermission(filteredObj);
  }
  updateRoleFeaturePermission(input, roleFeaturePermissionId) {
    return this.businessProvider.updateRoleFeaturePermission(input, roleFeaturePermissionId);
  }
  importRoleFeaturePermissions(roleFeaturePermissions) {
    return this.businessProvider.importRoleFeaturePermissions(roleFeaturePermissions);
  }
  validateRoleFeaturePermissionExcelData(excelData, featurePermissions, roles) {
    return this.businessProvider.validateRoleFeaturePermissionExcelData(excelData, featurePermissions, roles);
  }
}
RoleFeaturePermissionService.ɵfac = function RoleFeaturePermissionService_Factory(t) {
  return new (t || RoleFeaturePermissionService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_role_feature_permission_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RoleFeaturePermissionBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_role_feature_permission_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RoleFeaturePermissionBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
RoleFeaturePermissionService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: RoleFeaturePermissionService,
  factory: RoleFeaturePermissionService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 613851:
/*!**********************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/role-feature-permission.store.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRoleFeaturePermissionFeatureStore": () => (/* binding */ WebRoleFeaturePermissionFeatureStore)
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
/* harmony import */ var _role_feature_permission_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./role-feature-permission.service */ 973422);














class WebRoleFeaturePermissionFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, roleFeaturePermissionService) {
    super({
      loading: false,
      roleFeaturePermissions: [],
      done: false,
      searchQuery: '',
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
    this.roleFeaturePermissionService = roleFeaturePermissionService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.roleFeaturePermissions$ = this.select(s => s.roleFeaturePermissions);
    this.featurePermissions$ = this.select(s => s.featurePermissions || []);
    this.roles$ = this.select(s => s.roles || []);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.roleFeaturePermissions$, this.featurePermissions$, this.roles$, (errors, loading, item, roleFeaturePermissions, featurePermissions, roles) => ({
      errors,
      loading,
      item,
      roleFeaturePermissions,
      featurePermissions,
      roles
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      total: paging.total
    }));
    this.filterFeaturePermissions = term => this.data.userSelectFeaturePermissions({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let featurePermissions = res.data.items;
      this.patchState({
        featurePermissions
      });
      return featurePermissions;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterRoles = term => this.data.userSelectRoles({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let roles = res.data.items;
      this.patchState({
        roles
      });
      return roles;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addFeaturePermission = this.updater((state, featurePermission) => Object.assign(Object.assign({}, state), {
      featurePermissions: state.featurePermissions.concat(featurePermission)
    }));
    this.addRole = this.updater((state, role) => Object.assign(Object.assign({}, state), {
      roles: state.roles.concat(role)
    }));
    this.addNewRoleFeaturePermission = this.updater((state, roleFeaturePermission) => Object.assign(Object.assign({}, state), {
      roleFeaturePermissions: [...state.roleFeaturePermissions, roleFeaturePermission]
    }));
    this.updateRoleFeaturePermission = this.updater((state, roleFeaturePermission) => {
      return Object.assign(Object.assign({}, state), {
        roleFeaturePermissions: state.roleFeaturePermissions.map(el => {
          if (el.id === roleFeaturePermission.id) {
            return roleFeaturePermission;
          } else {
            return el;
          }
        })
      });
    });
    this.addRoleFeaturePermissions = this.updater((state, newRoleFeaturePermissions) => Object.assign(Object.assign({}, state), {
      roleFeaturePermissions: state.roleFeaturePermissions.concat(newRoleFeaturePermissions)
    }));
    this.updateRoleFeaturePermissions = this.updater((state, updatedRoleFeaturePermissions) => {
      return Object.assign(Object.assign({}, state), {
        roleFeaturePermissions: state.roleFeaturePermissions.map(roleFeaturePermission => {
          const updated = updatedRoleFeaturePermissions.find(el => el.id === roleFeaturePermission.id);
          return updated ? updated : roleFeaturePermission;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadRoleFeaturePermissionEffect = this.effect(roleFeaturePermissionId$ => roleFeaturePermissionId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(roleFeaturePermissionId => this.data.userRoleFeaturePermission({
      roleFeaturePermissionId
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
    this.loadRoleFeaturePermissionsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userRoleFeaturePermissions({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.patchState({
        paging: {
          limit: input.limit,
          skip: input.skip,
          total: res.data.count.total
        },
        roleFeaturePermissions: res.data.items,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createRoleFeaturePermissionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.roleFeaturePermissionService.createRoleFeaturePermission(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(roleFeaturePermission => {
      this.addNewRoleFeaturePermission(roleFeaturePermission);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: roleFeaturePermission,
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
    this.updateRoleFeaturePermissionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.roleFeaturePermissionService.updateRoleFeaturePermission(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(roleFeaturePermission => {
      this.updateRoleFeaturePermission(roleFeaturePermission);
      this.toast.success('Updated Successfully');
      setTimeout(() => this.patchState({
        item: roleFeaturePermission,
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
    this.deleteRoleFeaturePermissionEffect = this.effect(roleFeaturePermission$ => roleFeaturePermission$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(roleFeaturePermission => this.data.userDeleteRoleFeaturePermission({
      roleFeaturePermissionId: roleFeaturePermission.id
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
    })))));
    this.importExcelEffect = this.effect($data => $data.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.roleFeaturePermissionService.importRoleFeaturePermissions(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addRoleFeaturePermissions(created);
      this.updateRoleFeaturePermissions(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.roleFeaturePermissionService.validateRoleFeaturePermissionExcelData(excelData, vm.featurePermissions, vm.roles);
    }));
  }
}
WebRoleFeaturePermissionFeatureStore.ɵfac = function WebRoleFeaturePermissionFeatureStore_Factory(t) {
  return new (t || WebRoleFeaturePermissionFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_role_feature_permission_service__WEBPACK_IMPORTED_MODULE_12__.RoleFeaturePermissionService));
};
WebRoleFeaturePermissionFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebRoleFeaturePermissionFeatureStore,
  factory: WebRoleFeaturePermissionFeatureStore.ɵfac
});

/***/ }),

/***/ 580150:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/rules/create-role-feature-permission-input-is-valid.rule.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRoleFeaturePermissionInputIsValidRule": () => (/* binding */ CreateRoleFeaturePermissionInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _role_feature_permission_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role-feature-permission-name-is-valid.rule */ 208495);


class CreateRoleFeaturePermissionInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _role_feature_permission_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.RoleFeaturePermissionNameIsValidRule('name', 'The rolefeaturepermission name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 208495:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/shared/rules/role-feature-permission-name-is-valid.rule.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoleFeaturePermissionNameIsValidRule": () => (/* binding */ RoleFeaturePermissionNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class RoleFeaturePermissionNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);