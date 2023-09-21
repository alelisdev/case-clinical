"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_concrete_user_shared_user_store_ts"],{

/***/ 504479:
/*!*********************************************************************!*\
  !*** ./libs/web/concrete/user/shared/actions/create-user.action.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateUserAction": () => (/* binding */ CreateUserAction)
/* harmony export */ });
/* harmony import */ var _user_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.business-action-base */ 48110);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_user_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-user-input-is-valid.rule */ 235034);




class CreateUserAction extends _user_business_action_base__WEBPACK_IMPORTED_MODULE_1__.UserBusinessActionBase {
  constructor(input) {
    super('CreateUserAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_user_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateUserInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateUser({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(() => {
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_4__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 202626:
/*!**********************************************************************!*\
  !*** ./libs/web/concrete/user/shared/actions/update-users.action.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateUserAction": () => (/* binding */ UpdateUserAction),
/* harmony export */   "UpdateUsersAction": () => (/* binding */ UpdateUsersAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _user_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.business-action-base */ 48110);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateUsersAction extends _user_business_action_base__WEBPACK_IMPORTED_MODULE_1__.UserBusinessActionBase {
  constructor(users) {
    super('UpdateUsersAction');
    this.users = users;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.users, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateUsers({
      input: {
        users: this.users
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateUserAction extends _user_business_action_base__WEBPACK_IMPORTED_MODULE_1__.UserBusinessActionBase {
  constructor(user, userId) {
    super('UpdateUserAction');
    this.user = user;
    this.userId = userId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.user, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.userId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateUser({
      userId: this.userId,
      input: this.user
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(true)));
  }
}

/***/ }),

/***/ 48110:
/*!****************************************************************************!*\
  !*** ./libs/web/concrete/user/shared/actions/user.business-action-base.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserBusinessActionBase": () => (/* binding */ UserBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class UserBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 131168:
/*!**********************************************************************************!*\
  !*** ./libs/web/concrete/user/shared/actions/validate-user-excel-data.action.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateUserExcelDataAction": () => (/* binding */ ValidateUserExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _user_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.business-action-base */ 48110);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateUserExcelDataAction extends _user_business_action_base__WEBPACK_IMPORTED_MODULE_1__.UserBusinessActionBase {
  constructor(excelData) {
    super('ValidateUserExcelDataAction');
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

/***/ 235034:
/*!********************************************************************************!*\
  !*** ./libs/web/concrete/user/shared/rules/create-user-input-is-valid.rule.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateUserInputIsValidRule": () => (/* binding */ CreateUserInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _user_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-name-is-valid.rule */ 701975);


class CreateUserInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _user_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.UserNameIsValidRule('name', 'The user name is not valid. Must be within 2 and 255 characters.', this.target.firstName, 2, 255));
  }
}

/***/ }),

/***/ 701975:
/*!************************************************************************!*\
  !*** ./libs/web/concrete/user/shared/rules/user-name-is-valid.rule.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserNameIsValidRule": () => (/* binding */ UserNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class UserNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 142501:
/*!*************************************************************************!*\
  !*** ./libs/web/concrete/user/shared/user.business-provider.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserBusinessProviderService": () => (/* binding */ UserBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _actions_create_user_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-user.action */ 504479);
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_update_users_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-users.action */ 202626);
/* harmony import */ var _actions_validate_user_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-user-excel-data.action */ 131168);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);











class UserBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.UserBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createUser(input) {
    const action = new _actions_create_user_action__WEBPACK_IMPORTED_MODULE_2__.CreateUserAction(input);
    action.Do(this);
    return action.response;
  }
  updateUser(input, userId) {
    const action = new _actions_update_users_action__WEBPACK_IMPORTED_MODULE_3__.UpdateUserAction(input, userId);
    action.Do(this);
    return action.response;
  }
  importUsers(users) {
    const updateUsersAction = new _actions_update_users_action__WEBPACK_IMPORTED_MODULE_3__.UpdateUsersAction(users);
    updateUsersAction.Do(this);
    return updateUsersAction.response;
  }
  validateUserExcelData(excelData) {
    const validateUserExcelDataAction = new _actions_validate_user_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateUserExcelDataAction(excelData);
    validateUserExcelDataAction.Do(this);
    return validateUserExcelDataAction.response;
  }
}
UserBusinessProviderService.ɵfac = function UserBusinessProviderService_Factory(t) {
  return new (t || UserBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
UserBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: UserBusinessProviderService,
  factory: UserBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 320947:
/*!*******************************************************!*\
  !*** ./libs/web/concrete/user/shared/user.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _user_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.business-provider.service */ 142501);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class UserService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("UserService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createUser(input) {
    return this.businessProvider.createUser(input);
  }
  updateUser(input, userId) {
    return this.businessProvider.updateUser(input, userId);
  }
  importUsers(users) {
    return this.businessProvider.importUsers(users);
  }
  validateUserExcelData(excelData) {
    return this.businessProvider.validateUserExcelData(excelData);
  }
}
UserService.ɵfac = function UserService_Factory(t) {
  return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_user_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.UserBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_user_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.UserBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
UserService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: UserService,
  factory: UserService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 666012:
/*!*****************************************************!*\
  !*** ./libs/web/concrete/user/shared/user.store.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeatureStore": () => (/* binding */ WebUserFeatureStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user.service */ 320947);













class WebUserFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, userService) {
    super({
      loading: false,
      users: [],
      done: false
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.formService = formService;
    this.userService = userService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.users$ = this.select(s => s.users);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, (errors, loading, item) => ({
      errors,
      loading,
      item
    }), {
      debounce: true
    });
    this.initialize = this.updater(state => Object.assign(Object.assign({}, state), {
      item: null,
      done: false
    }));
    this.addNewUser = this.updater((state, user) => Object.assign(Object.assign({}, state), {
      users: [...state.users, user]
    }));
    this.updateUser = this.updater((state, user) => {
      return Object.assign(Object.assign({}, state), {
        users: state.users.map(el => {
          if (el.id === user.id) {
            return user;
          } else {
            return el;
          }
        })
      });
    });
    this.loadUserEffect = this.effect(userId$ => userId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(userId => this.data.userUser({
      userId
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
    this.loadUsersEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => this.data.userUsers({
      input: {}
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.patchState({
        loading: false,
        users: data.data.items
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.updateUserEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.userService.updateUser(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(user => {
      this.updateUser(user);
      this.toast.success('Changed Successfully');
      this.patchState({
        done: true,
        item: user
      });
    }, errors => {
      this.toast.error(errors.Message);
      this.formService.setErrors(errors.Data);
      this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      });
    })))));
    this.createUserEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.userService.createUser(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(user => {
      this.patchState({
        item: user,
        loading: false
      });
      return this.router.navigate(['..', user === null || user === void 0 ? void 0 : user.id], {
        relativeTo: this.route
      });
    }, errors => {
      this.toast.error(errors.Message);
      this.formService.setErrors(errors.Data);
      this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      });
    })))));
  }
}
WebUserFeatureStore.ɵfac = function WebUserFeatureStore_Factory(t) {
  return new (t || WebUserFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_9__.UserService));
};
WebUserFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebUserFeatureStore,
  factory: WebUserFeatureStore.ɵfac
});

/***/ })

}]);