"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_lead-treatment_shared_lead-treatment_store_ts"],{

/***/ 323241:
/*!********************************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/actions/create-lead-treatment.action.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateLeadTreatmentAction": () => (/* binding */ CreateLeadTreatmentAction)
/* harmony export */ });
/* harmony import */ var _lead_treatment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead-treatment.business-action-base */ 428664);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_lead_treatment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-lead-treatment-input-is-valid.rule */ 683429);




class CreateLeadTreatmentAction extends _lead_treatment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadTreatmentBusinessActionBase {
  constructor(input) {
    super('CreateLeadTreatmentAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_lead_treatment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateLeadTreatmentInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateLeadTreatment({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 428664:
/*!***************************************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/actions/lead-treatment.business-action-base.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadTreatmentBusinessActionBase": () => (/* binding */ LeadTreatmentBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class LeadTreatmentBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 469021:
/*!*********************************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/actions/update-lead-treatments.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateLeadTreatmentAction": () => (/* binding */ UpdateLeadTreatmentAction),
/* harmony export */   "UpdateLeadTreatmentsAction": () => (/* binding */ UpdateLeadTreatmentsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _lead_treatment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead-treatment.business-action-base */ 428664);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateLeadTreatmentsAction extends _lead_treatment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadTreatmentBusinessActionBase {
  constructor(leadTreatments) {
    super('UpdateLeadTreatmentsAction');
    this.leadTreatments = leadTreatments;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.leadTreatments, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateLeadTreatments({
      input: {
        leadTreatments: this.leadTreatments
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateLeadTreatmentAction extends _lead_treatment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadTreatmentBusinessActionBase {
  constructor(leadTreatment, leadTreatmentId) {
    super('UpdateLeadTreatmentAction');
    this.leadTreatment = leadTreatment;
    this.leadTreatmentId = leadTreatmentId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.leadTreatment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.leadTreatmentId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateLeadTreatment({
      leadTreatmentId: this.leadTreatmentId,
      input: this.leadTreatment
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 301501:
/*!*********************************************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/actions/validate-lead-treatment-excel-data.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateLeadTreatmentExcelDataAction": () => (/* binding */ ValidateLeadTreatmentExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _lead_treatment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead-treatment.business-action-base */ 428664);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateLeadTreatmentExcelDataAction extends _lead_treatment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadTreatmentBusinessActionBase {
  constructor(excelData, leads, treatments) {
    super('ValidateLeadTreatmentExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.leads = leads;
    this.treatments = treatments;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`leadName_${index}_is_valid}`, "Lead Is Not Valid", 'lead.name', datum['lead'], this.leads, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`treatmentName_${index}_is_valid}`, "Treatment Is Not Valid", 'treatment.name', datum['treatment'], this.treatments, true));
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

/***/ 635443:
/*!************************************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/lead-treatment.business-provider.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadTreatmentBusinessProviderService": () => (/* binding */ LeadTreatmentBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_lead_treatment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-lead-treatment-excel-data.action */ 301501);
/* harmony import */ var _actions_create_lead_treatment_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-lead-treatment.action */ 323241);
/* harmony import */ var _actions_update_lead_treatments_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-lead-treatments.action */ 469021);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class LeadTreatmentBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.LeadTreatmentBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createLeadTreatment(input) {
    const action = new _actions_create_lead_treatment_action__WEBPACK_IMPORTED_MODULE_2__.CreateLeadTreatmentAction(input);
    action.Do(this);
    return action.response;
  }
  updateLeadTreatment(input, leadTreatmentId) {
    const action = new _actions_update_lead_treatments_action__WEBPACK_IMPORTED_MODULE_3__.UpdateLeadTreatmentAction(input, leadTreatmentId);
    action.Do(this);
    return action.response;
  }
  importLeadTreatments(leadTreatments) {
    const updateLeadTreatmentsAction = new _actions_update_lead_treatments_action__WEBPACK_IMPORTED_MODULE_3__.UpdateLeadTreatmentsAction(leadTreatments);
    updateLeadTreatmentsAction.Do(this);
    return updateLeadTreatmentsAction.response;
  }
  validateLeadTreatmentExcelData(excelData, leads, treatments) {
    const validateLeadTreatmentExcelDataAction = new _actions_validate_lead_treatment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateLeadTreatmentExcelDataAction(excelData, leads, treatments);
    validateLeadTreatmentExcelDataAction.Do(this);
    return validateLeadTreatmentExcelDataAction.response;
  }
}
LeadTreatmentBusinessProviderService.ɵfac = function LeadTreatmentBusinessProviderService_Factory(t) {
  return new (t || LeadTreatmentBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
LeadTreatmentBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: LeadTreatmentBusinessProviderService,
  factory: LeadTreatmentBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 105558:
/*!******************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/lead-treatment.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadTreatmentService": () => (/* binding */ LeadTreatmentService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _lead_treatment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lead-treatment.business-provider.service */ 635443);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class LeadTreatmentService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("LeadTreatmentService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createLeadTreatment(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createLeadTreatment(filteredObj);
  }
  updateLeadTreatment(input, leadTreatmentId) {
    return this.businessProvider.updateLeadTreatment(input, leadTreatmentId);
  }
  importLeadTreatments(leadTreatments) {
    return this.businessProvider.importLeadTreatments(leadTreatments);
  }
  validateLeadTreatmentExcelData(excelData, leads, treatments) {
    return this.businessProvider.validateLeadTreatmentExcelData(excelData, leads, treatments);
  }
}
LeadTreatmentService.ɵfac = function LeadTreatmentService_Factory(t) {
  return new (t || LeadTreatmentService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_lead_treatment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.LeadTreatmentBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_lead_treatment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.LeadTreatmentBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
LeadTreatmentService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: LeadTreatmentService,
  factory: LeadTreatmentService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 7375:
/*!****************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/lead-treatment.store.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadTreatmentFeatureStore": () => (/* binding */ WebLeadTreatmentFeatureStore)
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
/* harmony import */ var _lead_treatment_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lead-treatment.service */ 105558);














class WebLeadTreatmentFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, leadTreatmentService) {
    super({
      loading: false,
      leadTreatments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      leadId: undefined,
      treatmentId: undefined,
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
    this.leadTreatmentService = leadTreatmentService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.leadTreatments$ = this.select(s => s.leadTreatments);
    this.leads$ = this.select(s => s.leads || []);
    this.treatments$ = this.select(s => s.treatments || []);
    this.leadId$ = this.select(s => s.leadId);
    this.treatmentId$ = this.select(s => s.treatmentId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.leadTreatments$, this.leads$, this.treatments$, (errors, loading, item, formName, leadTreatments, leads, treatments) => ({
      errors,
      loading,
      item,
      formName,
      leadTreatments,
      leads,
      treatments
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.leadId$, this.treatmentId$, this.searchQuery$, (paging, leadId, treatmentId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      leadId: leadId,
      treatmentId: treatmentId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLeadId = this.updater((state, leadId) => Object.assign(Object.assign({}, state), {
      leadId
    }));
    this.setTreatmentId = this.updater((state, treatmentId) => Object.assign(Object.assign({}, state), {
      treatmentId
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
    this.filterTreatments = term => this.data.userSelectTreatments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let treatments = res.data.items;
      this.patchState({
        treatments
      });
      return treatments;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addLead = this.updater((state, lead) => Object.assign(Object.assign({}, state), {
      leads: state.leads.concat(lead)
    }));
    this.addTreatment = this.updater((state, treatment) => Object.assign(Object.assign({}, state), {
      treatments: state.treatments.concat(treatment)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewLeadTreatment = this.updater((state, leadTreatment) => Object.assign(Object.assign({}, state), {
      leadTreatments: [...state.leadTreatments, leadTreatment]
    }));
    this.updateLeadTreatment = this.updater((state, leadTreatment) => {
      return Object.assign(Object.assign({}, state), {
        leadTreatments: state.leadTreatments.map(el => {
          if (el.id === leadTreatment.id) {
            return leadTreatment;
          } else {
            return el;
          }
        })
      });
    });
    this.addLeadTreatments = this.updater((state, newLeadTreatments) => Object.assign(Object.assign({}, state), {
      leadTreatments: state.leadTreatments.concat(newLeadTreatments)
    }));
    this.updateLeadTreatments = this.updater((state, updatedLeadTreatments) => {
      return Object.assign(Object.assign({}, state), {
        leadTreatments: state.leadTreatments.map(leadTreatment => {
          const updated = updatedLeadTreatments.find(el => el.id === leadTreatment.id);
          return updated ? updated : leadTreatment;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadLeadTreatmentEffect = this.effect(leadTreatmentId$ => leadTreatmentId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(leadTreatmentId => this.data.userLeadTreatment({
      leadTreatmentId
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
    this.loadLeadTreatmentsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userLeadTreatments({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      leadTreatments: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createLeadTreatmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.leadTreatmentService.createLeadTreatment(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(leadTreatment => {
      this.addNewLeadTreatment(leadTreatment);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: leadTreatment,
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
    this.updateLeadTreatmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.leadTreatmentService.updateLeadTreatment(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(leadTreatment => {
      this.updateLeadTreatment(leadTreatment);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: leadTreatment,
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
    this.deleteLeadTreatmentEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, leadTreatment]) => {
      return this.data.userDeleteLeadTreatment({
        leadTreatmentId: leadTreatment.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.leadTreatmentService.importLeadTreatments(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addLeadTreatments(created);
      this.updateLeadTreatments(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('leadTreatmentId')) {
      var leadTreatmentId = this.route.snapshot.paramMap.get('leadTreatmentId');
      this.setFormName('leadTreatment_edit');
    } else {
      this.setFormName('leadTreatment_create');
    }
    if (this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId");
      this.setLeadId(leadId);
    }
    if (this.route.snapshot.paramMap.has("treatmentId")) {
      var treatmentId = this.route.snapshot.paramMap.get("treatmentId");
      this.setTreatmentId(treatmentId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.leadTreatmentService.validateLeadTreatmentExcelData(excelData, vm.leads, vm.treatments);
    }));
  }
}
WebLeadTreatmentFeatureStore.ɵfac = function WebLeadTreatmentFeatureStore_Factory(t) {
  return new (t || WebLeadTreatmentFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_lead_treatment_service__WEBPACK_IMPORTED_MODULE_12__.LeadTreatmentService));
};
WebLeadTreatmentFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebLeadTreatmentFeatureStore,
  factory: WebLeadTreatmentFeatureStore.ɵfac
});

/***/ }),

/***/ 683429:
/*!*******************************************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/rules/create-lead-treatment-input-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateLeadTreatmentInputIsValidRule": () => (/* binding */ CreateLeadTreatmentInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _lead_treatment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead-treatment-name-is-valid.rule */ 748011);


class CreateLeadTreatmentInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _lead_treatment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.LeadTreatmentNameIsValidRule('name', 'The leadtreatment name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 748011:
/*!***********************************************************************************!*\
  !*** ./libs/web/lead-treatment/shared/rules/lead-treatment-name-is-valid.rule.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadTreatmentNameIsValidRule": () => (/* binding */ LeadTreatmentNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class LeadTreatmentNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);