"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_team-user_shared_team-user_store_ts"],{

/***/ 204273:
/*!**********************************************************************!*\
  !*** ./libs/web/team-user/shared/actions/create-team-user.action.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTeamUserAction": () => (/* binding */ CreateTeamUserAction)
/* harmony export */ });
/* harmony import */ var _team_user_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./team-user.business-action-base */ 843797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_team_user_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-team-user-input-is-valid.rule */ 231183);




class CreateTeamUserAction extends _team_user_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TeamUserBusinessActionBase {
  constructor(input) {
    super('CreateTeamUserAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_team_user_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateTeamUserInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateTeamUser({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 843797:
/*!*****************************************************************************!*\
  !*** ./libs/web/team-user/shared/actions/team-user.business-action-base.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamUserBusinessActionBase": () => (/* binding */ TeamUserBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class TeamUserBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 456094:
/*!***********************************************************************!*\
  !*** ./libs/web/team-user/shared/actions/update-team-users.action.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateTeamUserAction": () => (/* binding */ UpdateTeamUserAction),
/* harmony export */   "UpdateTeamUsersAction": () => (/* binding */ UpdateTeamUsersAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _team_user_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./team-user.business-action-base */ 843797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateTeamUsersAction extends _team_user_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TeamUserBusinessActionBase {
  constructor(teamUsers) {
    super('UpdateTeamUsersAction');
    this.teamUsers = teamUsers;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.teamUsers, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateTeamUsers({
      input: {
        teamUsers: this.teamUsers
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateTeamUserAction extends _team_user_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TeamUserBusinessActionBase {
  constructor(teamUser, teamUserId) {
    super('UpdateTeamUserAction');
    this.teamUser = teamUser;
    this.teamUserId = teamUserId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.teamUser, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.teamUserId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateTeamUser({
      teamUserId: this.teamUserId,
      input: this.teamUser
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 763639:
/*!***********************************************************************************!*\
  !*** ./libs/web/team-user/shared/actions/validate-team-user-excel-data.action.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateTeamUserExcelDataAction": () => (/* binding */ ValidateTeamUserExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _team_user_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./team-user.business-action-base */ 843797);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateTeamUserExcelDataAction extends _team_user_business_action_base__WEBPACK_IMPORTED_MODULE_1__.TeamUserBusinessActionBase {
  constructor(excelData, teams, users, teamRoles) {
    super('ValidateTeamUserExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.teams = teams;
    this.users = users;
    this.teamRoles = teamRoles;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`teamName_${index}_is_valid}`, "Team Is Not Valid", 'team.name', datum['team'], this.teams, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`userName_${index}_is_valid}`, "User Is Not Valid", 'user.name', datum['user'], this.users, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`teamRoleName_${index}_is_valid}`, "Team Role Is Not Valid", 'teamRole.name', datum['teamRole'], this.teamRoles, true));
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

/***/ 231183:
/*!*********************************************************************************!*\
  !*** ./libs/web/team-user/shared/rules/create-team-user-input-is-valid.rule.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTeamUserInputIsValidRule": () => (/* binding */ CreateTeamUserInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _team_user_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./team-user-name-is-valid.rule */ 538188);


class CreateTeamUserInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _team_user_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.TeamUserNameIsValidRule('name', 'The teamuser name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 538188:
/*!*************************************************************************!*\
  !*** ./libs/web/team-user/shared/rules/team-user-name-is-valid.rule.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamUserNameIsValidRule": () => (/* binding */ TeamUserNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class TeamUserNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 273955:
/*!**************************************************************************!*\
  !*** ./libs/web/team-user/shared/team-user.business-provider.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamUserBusinessProviderService": () => (/* binding */ TeamUserBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_team_user_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-team-user-excel-data.action */ 763639);
/* harmony import */ var _actions_create_team_user_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-team-user.action */ 204273);
/* harmony import */ var _actions_update_team_users_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-team-users.action */ 456094);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class TeamUserBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.TeamUserBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createTeamUser(input) {
    const action = new _actions_create_team_user_action__WEBPACK_IMPORTED_MODULE_2__.CreateTeamUserAction(input);
    action.Do(this);
    return action.response;
  }
  updateTeamUser(input, teamUserId) {
    const action = new _actions_update_team_users_action__WEBPACK_IMPORTED_MODULE_3__.UpdateTeamUserAction(input, teamUserId);
    action.Do(this);
    return action.response;
  }
  importTeamUsers(teamUsers) {
    const updateTeamUsersAction = new _actions_update_team_users_action__WEBPACK_IMPORTED_MODULE_3__.UpdateTeamUsersAction(teamUsers);
    updateTeamUsersAction.Do(this);
    return updateTeamUsersAction.response;
  }
  validateTeamUserExcelData(excelData, teams, users, teamRoles) {
    const validateTeamUserExcelDataAction = new _actions_validate_team_user_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateTeamUserExcelDataAction(excelData, teams, users, teamRoles);
    validateTeamUserExcelDataAction.Do(this);
    return validateTeamUserExcelDataAction.response;
  }
}
TeamUserBusinessProviderService.ɵfac = function TeamUserBusinessProviderService_Factory(t) {
  return new (t || TeamUserBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
TeamUserBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: TeamUserBusinessProviderService,
  factory: TeamUserBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 859364:
/*!********************************************************!*\
  !*** ./libs/web/team-user/shared/team-user.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamUserService": () => (/* binding */ TeamUserService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _team_user_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./team-user.business-provider.service */ 273955);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class TeamUserService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("TeamUserService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createTeamUser(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createTeamUser(filteredObj);
  }
  updateTeamUser(input, teamUserId) {
    return this.businessProvider.updateTeamUser(input, teamUserId);
  }
  importTeamUsers(teamUsers) {
    return this.businessProvider.importTeamUsers(teamUsers);
  }
  validateTeamUserExcelData(excelData, teams, users, teamRoles) {
    return this.businessProvider.validateTeamUserExcelData(excelData, teams, users, teamRoles);
  }
}
TeamUserService.ɵfac = function TeamUserService_Factory(t) {
  return new (t || TeamUserService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_team_user_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.TeamUserBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_team_user_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.TeamUserBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
TeamUserService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: TeamUserService,
  factory: TeamUserService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 693340:
/*!******************************************************!*\
  !*** ./libs/web/team-user/shared/team-user.store.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTeamUserFeatureStore": () => (/* binding */ WebTeamUserFeatureStore)
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
/* harmony import */ var _team_user_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./team-user.service */ 859364);














class WebTeamUserFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, teamUserService) {
    super({
      loading: false,
      teamUsers: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      teamId: undefined,
      userId: undefined,
      teamRoleId: undefined,
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
    this.teamUserService = teamUserService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.teamUsers$ = this.select(s => s.teamUsers);
    this.teams$ = this.select(s => s.teams || []);
    this.users$ = this.select(s => s.users || []);
    this.teamRoles$ = this.select(s => s.teamRoles || []);
    this.teamId$ = this.select(s => s.teamId);
    this.userId$ = this.select(s => s.userId);
    this.teamRoleId$ = this.select(s => s.teamRoleId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.teamUsers$, this.teams$, this.users$, this.teamRoles$, (errors, loading, item, formName, teamUsers, teams, users, teamRoles) => ({
      errors,
      loading,
      item,
      formName,
      teamUsers,
      teams,
      users,
      teamRoles
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.teamId$, this.userId$, this.teamRoleId$, this.searchQuery$, (paging, teamId, userId, teamRoleId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      teamId: teamId,
      userId: userId,
      teamRoleId: teamRoleId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setTeamId = this.updater((state, teamId) => Object.assign(Object.assign({}, state), {
      teamId
    }));
    this.setUserId = this.updater((state, userId) => Object.assign(Object.assign({}, state), {
      userId
    }));
    this.setTeamRoleId = this.updater((state, teamRoleId) => Object.assign(Object.assign({}, state), {
      teamRoleId
    }));
    this.filterTeams = term => this.data.userSelectTeams({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let teams = res.data.items;
      this.patchState({
        teams
      });
      return teams;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterUsers = term => this.data.userSelectUsers({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let users = res.data.items;
      this.patchState({
        users
      });
      return users;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterTeamRoles = term => this.data.userSelectTeamRoles({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let teamRoles = res.data.items;
      this.patchState({
        teamRoles
      });
      return teamRoles;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addTeam = this.updater((state, team) => Object.assign(Object.assign({}, state), {
      teams: state.teams.concat(team)
    }));
    this.addUser = this.updater((state, user) => Object.assign(Object.assign({}, state), {
      users: state.users.concat(user)
    }));
    this.addTeamRole = this.updater((state, teamRole) => Object.assign(Object.assign({}, state), {
      teamRoles: state.teamRoles.concat(teamRole)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewTeamUser = this.updater((state, teamUser) => Object.assign(Object.assign({}, state), {
      teamUsers: [...state.teamUsers, teamUser]
    }));
    this.updateTeamUser = this.updater((state, teamUser) => {
      return Object.assign(Object.assign({}, state), {
        teamUsers: state.teamUsers.map(el => {
          if (el.id === teamUser.id) {
            return teamUser;
          } else {
            return el;
          }
        })
      });
    });
    this.addTeamUsers = this.updater((state, newTeamUsers) => Object.assign(Object.assign({}, state), {
      teamUsers: state.teamUsers.concat(newTeamUsers)
    }));
    this.updateTeamUsers = this.updater((state, updatedTeamUsers) => {
      return Object.assign(Object.assign({}, state), {
        teamUsers: state.teamUsers.map(teamUser => {
          const updated = updatedTeamUsers.find(el => el.id === teamUser.id);
          return updated ? updated : teamUser;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadTeamUserEffect = this.effect(teamUserId$ => teamUserId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(teamUserId => this.data.userTeamUser({
      teamUserId
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
    this.loadTeamUsersEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userTeamUsers({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      teamUsers: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createTeamUserEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.teamUserService.createTeamUser(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(teamUser => {
      this.addNewTeamUser(teamUser);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: teamUser,
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
    this.updateTeamUserEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.teamUserService.updateTeamUser(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(teamUser => {
      this.updateTeamUser(teamUser);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: teamUser,
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
    this.deleteTeamUserEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, teamUser]) => {
      return this.data.userDeleteTeamUser({
        teamUserId: teamUser.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.teamUserService.importTeamUsers(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addTeamUsers(created);
      this.updateTeamUsers(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('teamUserId')) {
      var teamUserId = this.route.snapshot.paramMap.get('teamUserId');
      this.setFormName('teamUser_edit');
    } else {
      this.setFormName('teamUser_create');
    }
    if (this.route.snapshot.paramMap.has("teamId")) {
      var teamId = this.route.snapshot.paramMap.get("teamId");
      this.setTeamId(teamId);
    }
    if (this.route.snapshot.paramMap.has("userId")) {
      var userId = this.route.snapshot.paramMap.get("userId");
      this.setUserId(userId);
    }
    if (this.route.snapshot.paramMap.has("teamRoleId")) {
      var teamRoleId = this.route.snapshot.paramMap.get("teamRoleId");
      this.setTeamRoleId(teamRoleId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.teamUserService.validateTeamUserExcelData(excelData, vm.teams, vm.users, vm.teamRoles);
    }));
  }
}
WebTeamUserFeatureStore.ɵfac = function WebTeamUserFeatureStore_Factory(t) {
  return new (t || WebTeamUserFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_team_user_service__WEBPACK_IMPORTED_MODULE_12__.TeamUserService));
};
WebTeamUserFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebTeamUserFeatureStore,
  factory: WebTeamUserFeatureStore.ɵfac
});

/***/ })

}]);