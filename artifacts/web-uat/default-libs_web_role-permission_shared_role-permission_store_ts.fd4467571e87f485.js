"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_role-permission_shared_role-permission_store_ts"],{

/***/ 392507:
/*!**********************************************************************************!*\
  !*** ./libs/web/role-permission/shared/actions/create-role-permission.action.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRolePermissionAction": () => (/* binding */ CreateRolePermissionAction)
/* harmony export */ });
/* harmony import */ var _role_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role-permission.business-action-base */ 762718);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_role_permission_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-role-permission-input-is-valid.rule */ 819403);




class CreateRolePermissionAction extends _role_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RolePermissionBusinessActionBase {
  constructor(input) {
    super('CreateRolePermissionAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_role_permission_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateRolePermissionInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateRolePermission({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 762718:
/*!*****************************************************************************************!*\
  !*** ./libs/web/role-permission/shared/actions/role-permission.business-action-base.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolePermissionBusinessActionBase": () => (/* binding */ RolePermissionBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class RolePermissionBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 895989:
/*!***********************************************************************************!*\
  !*** ./libs/web/role-permission/shared/actions/update-role-permissions.action.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateRolePermissionAction": () => (/* binding */ UpdateRolePermissionAction),
/* harmony export */   "UpdateRolePermissionsAction": () => (/* binding */ UpdateRolePermissionsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _role_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role-permission.business-action-base */ 762718);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateRolePermissionsAction extends _role_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RolePermissionBusinessActionBase {
  constructor(rolePermissions) {
    super('UpdateRolePermissionsAction');
    this.rolePermissions = rolePermissions;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.rolePermissions, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRolePermissions({
      input: {
        rolePermissions: this.rolePermissions
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateRolePermissionAction extends _role_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RolePermissionBusinessActionBase {
  constructor(rolePermission, rolePermissionId) {
    super('UpdateRolePermissionAction');
    this.rolePermission = rolePermission;
    this.rolePermissionId = rolePermissionId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.rolePermission, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.rolePermissionId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRolePermission({
      rolePermissionId: this.rolePermissionId,
      input: this.rolePermission
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 323212:
/*!***********************************************************************************************!*\
  !*** ./libs/web/role-permission/shared/actions/validate-role-permission-excel-data.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateRolePermissionExcelDataAction": () => (/* binding */ ValidateRolePermissionExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _role_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role-permission.business-action-base */ 762718);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateRolePermissionExcelDataAction extends _role_permission_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RolePermissionBusinessActionBase {
  constructor(excelData, permissions) {
    super('ValidateRolePermissionExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.permissions = permissions;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`permissionName_${index}_is_valid}`, "Permission Is Not Valid", 'permission.name', datum['permission'], this.permissions, true));
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

/***/ 643309:
/*!**************************************************************************************!*\
  !*** ./libs/web/role-permission/shared/role-permission.business-provider.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolePermissionBusinessProviderService": () => (/* binding */ RolePermissionBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_role_permission_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-role-permission-excel-data.action */ 323212);
/* harmony import */ var _actions_create_role_permission_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-role-permission.action */ 392507);
/* harmony import */ var _actions_update_role_permissions_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-role-permissions.action */ 895989);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class RolePermissionBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.RolePermissionBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createRolePermission(input) {
    const action = new _actions_create_role_permission_action__WEBPACK_IMPORTED_MODULE_2__.CreateRolePermissionAction(input);
    action.Do(this);
    return action.response;
  }
  updateRolePermission(input, rolePermissionId) {
    const action = new _actions_update_role_permissions_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRolePermissionAction(input, rolePermissionId);
    action.Do(this);
    return action.response;
  }
  importRolePermissions(rolePermissions) {
    const updateRolePermissionsAction = new _actions_update_role_permissions_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRolePermissionsAction(rolePermissions);
    updateRolePermissionsAction.Do(this);
    return updateRolePermissionsAction.response;
  }
  validateRolePermissionExcelData(excelData, permissions) {
    const validateRolePermissionExcelDataAction = new _actions_validate_role_permission_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateRolePermissionExcelDataAction(excelData, permissions);
    validateRolePermissionExcelDataAction.Do(this);
    return validateRolePermissionExcelDataAction.response;
  }
}
RolePermissionBusinessProviderService.ɵfac = function RolePermissionBusinessProviderService_Factory(t) {
  return new (t || RolePermissionBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
RolePermissionBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: RolePermissionBusinessProviderService,
  factory: RolePermissionBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 662843:
/*!********************************************************************!*\
  !*** ./libs/web/role-permission/shared/role-permission.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolePermissionService": () => (/* binding */ RolePermissionService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _role_permission_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./role-permission.business-provider.service */ 643309);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class RolePermissionService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("RolePermissionService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createRolePermission(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createRolePermission(filteredObj);
  }
  updateRolePermission(input, rolePermissionId) {
    return this.businessProvider.updateRolePermission(input, rolePermissionId);
  }
  importRolePermissions(rolePermissions) {
    return this.businessProvider.importRolePermissions(rolePermissions);
  }
  validateRolePermissionExcelData(excelData, permissions) {
    return this.businessProvider.validateRolePermissionExcelData(excelData, permissions);
  }
}
RolePermissionService.ɵfac = function RolePermissionService_Factory(t) {
  return new (t || RolePermissionService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_role_permission_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RolePermissionBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_role_permission_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RolePermissionBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
RolePermissionService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: RolePermissionService,
  factory: RolePermissionService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 774617:
/*!******************************************************************!*\
  !*** ./libs/web/role-permission/shared/role-permission.store.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRolePermissionFeatureStore": () => (/* binding */ WebRolePermissionFeatureStore)
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
/* harmony import */ var _role_permission_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./role-permission.service */ 662843);














class WebRolePermissionFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, rolePermissionService) {
    super({
      loading: false,
      rolePermissions: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      permissionId: undefined,
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
    this.rolePermissionService = rolePermissionService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.rolePermissions$ = this.select(s => s.rolePermissions);
    this.permissions$ = this.select(s => s.permissions || []);
    this.permissionId$ = this.select(s => s.permissionId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.rolePermissions$, this.permissions$, (errors, loading, item, formName, rolePermissions, permissions) => ({
      errors,
      loading,
      item,
      formName,
      rolePermissions,
      permissions
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.permissionId$, this.searchQuery$, (paging, permissionId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      permissionId: permissionId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setPermissionId = this.updater((state, permissionId) => Object.assign(Object.assign({}, state), {
      permissionId
    }));
    this.filterPermissions = term => this.data.userSelectPermissions({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let permissions = res.data.items;
      this.patchState({
        permissions
      });
      return permissions;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addPermission = this.updater((state, permission) => Object.assign(Object.assign({}, state), {
      permissions: state.permissions.concat(permission)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewRolePermission = this.updater((state, rolePermission) => Object.assign(Object.assign({}, state), {
      rolePermissions: [...state.rolePermissions, rolePermission]
    }));
    this.updateRolePermission = this.updater((state, rolePermission) => {
      return Object.assign(Object.assign({}, state), {
        rolePermissions: state.rolePermissions.map(el => {
          if (el.id === rolePermission.id) {
            return rolePermission;
          } else {
            return el;
          }
        })
      });
    });
    this.addRolePermissions = this.updater((state, newRolePermissions) => Object.assign(Object.assign({}, state), {
      rolePermissions: state.rolePermissions.concat(newRolePermissions)
    }));
    this.updateRolePermissions = this.updater((state, updatedRolePermissions) => {
      return Object.assign(Object.assign({}, state), {
        rolePermissions: state.rolePermissions.map(rolePermission => {
          const updated = updatedRolePermissions.find(el => el.id === rolePermission.id);
          return updated ? updated : rolePermission;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadRolePermissionEffect = this.effect(rolePermissionId$ => rolePermissionId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(rolePermissionId => this.data.userRolePermission({
      rolePermissionId
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
    this.loadRolePermissionsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userRolePermissions({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      rolePermissions: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createRolePermissionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.rolePermissionService.createRolePermission(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(rolePermission => {
      this.addNewRolePermission(rolePermission);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: rolePermission,
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
    this.updateRolePermissionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.rolePermissionService.updateRolePermission(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(rolePermission => {
      this.updateRolePermission(rolePermission);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: rolePermission,
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
    this.deleteRolePermissionEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, rolePermission]) => {
      return this.data.userDeleteRolePermission({
        rolePermissionId: rolePermission.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.rolePermissionService.importRolePermissions(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addRolePermissions(created);
      this.updateRolePermissions(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('rolePermissionId')) {
      var rolePermissionId = this.route.snapshot.paramMap.get('rolePermissionId');
      this.setFormName('rolePermission_edit');
    } else {
      this.setFormName('rolePermission_create');
    }
    if (this.route.snapshot.paramMap.has("permissionId")) {
      var permissionId = this.route.snapshot.paramMap.get("permissionId");
      this.setPermissionId(permissionId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.rolePermissionService.validateRolePermissionExcelData(excelData, vm.permissions);
    }));
  }
}
WebRolePermissionFeatureStore.ɵfac = function WebRolePermissionFeatureStore_Factory(t) {
  return new (t || WebRolePermissionFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_role_permission_service__WEBPACK_IMPORTED_MODULE_12__.RolePermissionService));
};
WebRolePermissionFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebRolePermissionFeatureStore,
  factory: WebRolePermissionFeatureStore.ɵfac
});

/***/ }),

/***/ 819403:
/*!*********************************************************************************************!*\
  !*** ./libs/web/role-permission/shared/rules/create-role-permission-input-is-valid.rule.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRolePermissionInputIsValidRule": () => (/* binding */ CreateRolePermissionInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _role_permission_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role-permission-name-is-valid.rule */ 835952);


class CreateRolePermissionInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _role_permission_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.RolePermissionNameIsValidRule('name', 'The rolepermission name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 835952:
/*!*************************************************************************************!*\
  !*** ./libs/web/role-permission/shared/rules/role-permission-name-is-valid.rule.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolePermissionNameIsValidRule": () => (/* binding */ RolePermissionNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class RolePermissionNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);