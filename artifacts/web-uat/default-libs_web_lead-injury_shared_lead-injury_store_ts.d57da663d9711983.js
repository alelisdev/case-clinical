"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_lead-injury_shared_lead-injury_store_ts"],{

/***/ 633661:
/*!**************************************************************************!*\
  !*** ./libs/web/lead-injury/shared/actions/create-lead-injury.action.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateLeadInjuryAction": () => (/* binding */ CreateLeadInjuryAction)
/* harmony export */ });
/* harmony import */ var _lead_injury_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead-injury.business-action-base */ 197067);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_lead_injury_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-lead-injury-input-is-valid.rule */ 656279);




class CreateLeadInjuryAction extends _lead_injury_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadInjuryBusinessActionBase {
  constructor(input) {
    super('CreateLeadInjuryAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_lead_injury_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateLeadInjuryInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateLeadInjury({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 197067:
/*!*********************************************************************************!*\
  !*** ./libs/web/lead-injury/shared/actions/lead-injury.business-action-base.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadInjuryBusinessActionBase": () => (/* binding */ LeadInjuryBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class LeadInjuryBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 849712:
/*!****************************************************************************!*\
  !*** ./libs/web/lead-injury/shared/actions/update-lead-injuries.action.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateLeadInjuriesAction": () => (/* binding */ UpdateLeadInjuriesAction),
/* harmony export */   "UpdateLeadInjuryAction": () => (/* binding */ UpdateLeadInjuryAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _lead_injury_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead-injury.business-action-base */ 197067);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateLeadInjuriesAction extends _lead_injury_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadInjuryBusinessActionBase {
  constructor(leadInjuries) {
    super('UpdateLeadInjuriesAction');
    this.leadInjuries = leadInjuries;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.leadInjuries, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateLeadInjuries({
      input: {
        leadInjuries: this.leadInjuries
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateLeadInjuryAction extends _lead_injury_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadInjuryBusinessActionBase {
  constructor(leadInjury, leadInjuryId) {
    super('UpdateLeadInjuryAction');
    this.leadInjury = leadInjury;
    this.leadInjuryId = leadInjuryId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.leadInjury, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.leadInjuryId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateLeadInjury({
      leadInjuryId: this.leadInjuryId,
      input: this.leadInjury
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 138858:
/*!***************************************************************************************!*\
  !*** ./libs/web/lead-injury/shared/actions/validate-lead-injury-excel-data.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateLeadInjuryExcelDataAction": () => (/* binding */ ValidateLeadInjuryExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _lead_injury_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead-injury.business-action-base */ 197067);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateLeadInjuryExcelDataAction extends _lead_injury_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadInjuryBusinessActionBase {
  constructor(excelData, leads, severities) {
    super('ValidateLeadInjuryExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.leads = leads;
    this.severities = severities;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`leadName_${index}_is_valid}`, "Lead Is Not Valid", 'lead.name', datum['lead'], this.leads, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`severityName_${index}_is_valid}`, "Severity Is Not Valid", 'severity.name', datum['severity'], this.severities, true));
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

/***/ 509569:
/*!******************************************************************************!*\
  !*** ./libs/web/lead-injury/shared/lead-injury.business-provider.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadInjuryBusinessProviderService": () => (/* binding */ LeadInjuryBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_lead_injury_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-lead-injury-excel-data.action */ 138858);
/* harmony import */ var _actions_create_lead_injury_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-lead-injury.action */ 633661);
/* harmony import */ var _actions_update_lead_injuries_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-lead-injuries.action */ 849712);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class LeadInjuryBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.LeadInjuryBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createLeadInjury(input) {
    const action = new _actions_create_lead_injury_action__WEBPACK_IMPORTED_MODULE_2__.CreateLeadInjuryAction(input);
    action.Do(this);
    return action.response;
  }
  updateLeadInjury(input, leadInjuryId) {
    const action = new _actions_update_lead_injuries_action__WEBPACK_IMPORTED_MODULE_3__.UpdateLeadInjuryAction(input, leadInjuryId);
    action.Do(this);
    return action.response;
  }
  importLeadInjuries(leadInjuries) {
    const updateLeadInjuriesAction = new _actions_update_lead_injuries_action__WEBPACK_IMPORTED_MODULE_3__.UpdateLeadInjuriesAction(leadInjuries);
    updateLeadInjuriesAction.Do(this);
    return updateLeadInjuriesAction.response;
  }
  validateLeadInjuryExcelData(excelData, leads, severities) {
    const validateLeadInjuryExcelDataAction = new _actions_validate_lead_injury_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateLeadInjuryExcelDataAction(excelData, leads, severities);
    validateLeadInjuryExcelDataAction.Do(this);
    return validateLeadInjuryExcelDataAction.response;
  }
}
LeadInjuryBusinessProviderService.ɵfac = function LeadInjuryBusinessProviderService_Factory(t) {
  return new (t || LeadInjuryBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
LeadInjuryBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: LeadInjuryBusinessProviderService,
  factory: LeadInjuryBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 43006:
/*!************************************************************!*\
  !*** ./libs/web/lead-injury/shared/lead-injury.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadInjuryService": () => (/* binding */ LeadInjuryService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _lead_injury_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lead-injury.business-provider.service */ 509569);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class LeadInjuryService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("LeadInjuryService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createLeadInjury(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createLeadInjury(filteredObj);
  }
  updateLeadInjury(input, leadInjuryId) {
    return this.businessProvider.updateLeadInjury(input, leadInjuryId);
  }
  importLeadInjuries(leadInjuries) {
    return this.businessProvider.importLeadInjuries(leadInjuries);
  }
  validateLeadInjuryExcelData(excelData, leads, severities) {
    return this.businessProvider.validateLeadInjuryExcelData(excelData, leads, severities);
  }
}
LeadInjuryService.ɵfac = function LeadInjuryService_Factory(t) {
  return new (t || LeadInjuryService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_lead_injury_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.LeadInjuryBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_lead_injury_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.LeadInjuryBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
LeadInjuryService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: LeadInjuryService,
  factory: LeadInjuryService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 540734:
/*!**********************************************************!*\
  !*** ./libs/web/lead-injury/shared/lead-injury.store.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadInjuryFeatureStore": () => (/* binding */ WebLeadInjuryFeatureStore)
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
/* harmony import */ var _lead_injury_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lead-injury.service */ 43006);














class WebLeadInjuryFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, leadInjuryService) {
    super({
      loading: false,
      leadInjuries: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      leadId: undefined,
      severityId: undefined,
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
    this.leadInjuryService = leadInjuryService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.leadInjuries$ = this.select(s => s.leadInjuries);
    this.leads$ = this.select(s => s.leads || []);
    this.severities$ = this.select(s => s.severities || []);
    this.leadId$ = this.select(s => s.leadId);
    this.severityId$ = this.select(s => s.severityId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.leadInjuries$, this.leads$, this.severities$, (errors, loading, item, formName, leadInjuries, leads, severities) => ({
      errors,
      loading,
      item,
      formName,
      leadInjuries,
      leads,
      severities
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.leadId$, this.severityId$, this.searchQuery$, (paging, leadId, severityId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      leadId: leadId,
      severityId: severityId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLeadId = this.updater((state, leadId) => Object.assign(Object.assign({}, state), {
      leadId
    }));
    this.setSeverityId = this.updater((state, severityId) => Object.assign(Object.assign({}, state), {
      severityId
    }));
    this.filterLeads = term => this.data.userSelectLeads({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let leads = res.data.items;
      this.patchState({
        leads
      });
      return leads;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterSeverities = term => this.data.userSelectSeverities({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let severities = res.data.items;
      this.patchState({
        severities
      });
      return severities;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addLead = this.updater((state, lead) => Object.assign(Object.assign({}, state), {
      leads: state.leads.concat(lead)
    }));
    this.addSeverity = this.updater((state, severity) => Object.assign(Object.assign({}, state), {
      severities: state.severities.concat(severity)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewLeadInjury = this.updater((state, leadInjury) => Object.assign(Object.assign({}, state), {
      leadInjuries: [...state.leadInjuries, leadInjury]
    }));
    this.updateLeadInjury = this.updater((state, leadInjury) => {
      return Object.assign(Object.assign({}, state), {
        leadInjuries: state.leadInjuries.map(el => {
          if (el.id === leadInjury.id) {
            return leadInjury;
          } else {
            return el;
          }
        })
      });
    });
    this.addLeadInjuries = this.updater((state, newLeadInjuries) => Object.assign(Object.assign({}, state), {
      leadInjuries: state.leadInjuries.concat(newLeadInjuries)
    }));
    this.updateLeadInjuries = this.updater((state, updatedLeadInjuries) => {
      return Object.assign(Object.assign({}, state), {
        leadInjuries: state.leadInjuries.map(leadInjury => {
          const updated = updatedLeadInjuries.find(el => el.id === leadInjury.id);
          return updated ? updated : leadInjury;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadLeadInjuryEffect = this.effect(leadInjuryId$ => leadInjuryId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(leadInjuryId => this.data.userLeadInjury({
      leadInjuryId
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
    this.loadLeadInjuriesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userLeadInjuries({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      leadInjuries: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createLeadInjuryEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.leadInjuryService.createLeadInjury(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(leadInjury => {
      this.addNewLeadInjury(leadInjury);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: leadInjury,
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
    this.updateLeadInjuryEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.leadInjuryService.updateLeadInjury(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(leadInjury => {
      this.updateLeadInjury(leadInjury);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: leadInjury,
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
    this.deleteLeadInjuryEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, leadInjury]) => {
      return this.data.userDeleteLeadInjury({
        leadInjuryId: leadInjury.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.leadInjuryService.importLeadInjuries(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addLeadInjuries(created);
      this.updateLeadInjuries(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('leadInjuryId')) {
      var leadInjuryId = this.route.snapshot.paramMap.get('leadInjuryId');
      this.setFormName('leadInjury_edit');
    } else {
      this.setFormName('leadInjury_create');
    }
    if (this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId");
      this.setLeadId(leadId);
    }
    if (this.route.snapshot.paramMap.has("severityId")) {
      var severityId = this.route.snapshot.paramMap.get("severityId");
      this.setSeverityId(severityId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.leadInjuryService.validateLeadInjuryExcelData(excelData, vm.leads, vm.severities);
    }));
  }
}
WebLeadInjuryFeatureStore.ɵfac = function WebLeadInjuryFeatureStore_Factory(t) {
  return new (t || WebLeadInjuryFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_lead_injury_service__WEBPACK_IMPORTED_MODULE_12__.LeadInjuryService));
};
WebLeadInjuryFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebLeadInjuryFeatureStore,
  factory: WebLeadInjuryFeatureStore.ɵfac
});

/***/ }),

/***/ 656279:
/*!*************************************************************************************!*\
  !*** ./libs/web/lead-injury/shared/rules/create-lead-injury-input-is-valid.rule.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateLeadInjuryInputIsValidRule": () => (/* binding */ CreateLeadInjuryInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _lead_injury_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead-injury-name-is-valid.rule */ 772175);


class CreateLeadInjuryInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _lead_injury_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.LeadInjuryNameIsValidRule('name', 'The leadinjury name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 772175:
/*!*****************************************************************************!*\
  !*** ./libs/web/lead-injury/shared/rules/lead-injury-name-is-valid.rule.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadInjuryNameIsValidRule": () => (/* binding */ LeadInjuryNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class LeadInjuryNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);