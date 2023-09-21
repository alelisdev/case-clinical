"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_body-part-lead_shared_body-part-lead_store_ts-libs_web_body-part-lead_ui_web-e1c300"],{

/***/ 685671:
/*!***************************************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/actions/body-part-lead.business-action-base.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BodyPartLeadBusinessActionBase": () => (/* binding */ BodyPartLeadBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class BodyPartLeadBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 207130:
/*!********************************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/actions/create-body-part-lead.action.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateBodyPartLeadAction": () => (/* binding */ CreateBodyPartLeadAction)
/* harmony export */ });
/* harmony import */ var _body_part_lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body-part-lead.business-action-base */ 685671);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_body_part_lead_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-body-part-lead-input-is-valid.rule */ 535566);




class CreateBodyPartLeadAction extends _body_part_lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.BodyPartLeadBusinessActionBase {
  constructor(input) {
    super('CreateBodyPartLeadAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_body_part_lead_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateBodyPartLeadInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateBodyPartLead({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 117839:
/*!*********************************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/actions/update-body-part-leads.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateBodyPartLeadAction": () => (/* binding */ UpdateBodyPartLeadAction),
/* harmony export */   "UpdateBodyPartLeadsAction": () => (/* binding */ UpdateBodyPartLeadsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _body_part_lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body-part-lead.business-action-base */ 685671);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateBodyPartLeadsAction extends _body_part_lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.BodyPartLeadBusinessActionBase {
  constructor(bodyPartLeads) {
    super('UpdateBodyPartLeadsAction');
    this.bodyPartLeads = bodyPartLeads;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.bodyPartLeads, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateBodyPartLeads({
      input: {
        bodyPartLeads: this.bodyPartLeads
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateBodyPartLeadAction extends _body_part_lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.BodyPartLeadBusinessActionBase {
  constructor(bodyPartLead, bodyPartLeadId) {
    super('UpdateBodyPartLeadAction');
    this.bodyPartLead = bodyPartLead;
    this.bodyPartLeadId = bodyPartLeadId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.bodyPartLead, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.bodyPartLeadId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateBodyPartLead({
      bodyPartLeadId: this.bodyPartLeadId,
      input: this.bodyPartLead
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 162772:
/*!*********************************************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/actions/validate-body-part-lead-excel-data.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateBodyPartLeadExcelDataAction": () => (/* binding */ ValidateBodyPartLeadExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _body_part_lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body-part-lead.business-action-base */ 685671);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateBodyPartLeadExcelDataAction extends _body_part_lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.BodyPartLeadBusinessActionBase {
  constructor(excelData, leads, bodyParts) {
    super('ValidateBodyPartLeadExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.leads = leads;
    this.bodyParts = bodyParts;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`leadName_${index}_is_valid}`, "Lead Is Not Valid", 'lead.name', datum['lead'], this.leads, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`bodyPartName_${index}_is_valid}`, "Body Part Is Not Valid", 'bodyPart.name', datum['bodyPart'], this.bodyParts, true));
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

/***/ 39526:
/*!************************************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/body-part-lead.business-provider.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BodyPartLeadBusinessProviderService": () => (/* binding */ BodyPartLeadBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_body_part_lead_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-body-part-lead-excel-data.action */ 162772);
/* harmony import */ var _actions_create_body_part_lead_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-body-part-lead.action */ 207130);
/* harmony import */ var _actions_update_body_part_leads_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-body-part-leads.action */ 117839);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class BodyPartLeadBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.BodyPartLeadBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createBodyPartLead(input) {
    const action = new _actions_create_body_part_lead_action__WEBPACK_IMPORTED_MODULE_2__.CreateBodyPartLeadAction(input);
    action.Do(this);
    return action.response;
  }
  updateBodyPartLead(input, bodyPartLeadId) {
    const action = new _actions_update_body_part_leads_action__WEBPACK_IMPORTED_MODULE_3__.UpdateBodyPartLeadAction(input, bodyPartLeadId);
    action.Do(this);
    return action.response;
  }
  importBodyPartLeads(bodyPartLeads) {
    const updateBodyPartLeadsAction = new _actions_update_body_part_leads_action__WEBPACK_IMPORTED_MODULE_3__.UpdateBodyPartLeadsAction(bodyPartLeads);
    updateBodyPartLeadsAction.Do(this);
    return updateBodyPartLeadsAction.response;
  }
  validateBodyPartLeadExcelData(excelData, leads, bodyParts) {
    const validateBodyPartLeadExcelDataAction = new _actions_validate_body_part_lead_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateBodyPartLeadExcelDataAction(excelData, leads, bodyParts);
    validateBodyPartLeadExcelDataAction.Do(this);
    return validateBodyPartLeadExcelDataAction.response;
  }
}
BodyPartLeadBusinessProviderService.ɵfac = function BodyPartLeadBusinessProviderService_Factory(t) {
  return new (t || BodyPartLeadBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
BodyPartLeadBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: BodyPartLeadBusinessProviderService,
  factory: BodyPartLeadBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 189438:
/*!******************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/body-part-lead.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BodyPartLeadService": () => (/* binding */ BodyPartLeadService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _body_part_lead_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./body-part-lead.business-provider.service */ 39526);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class BodyPartLeadService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("BodyPartLeadService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createBodyPartLead(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createBodyPartLead(filteredObj);
  }
  updateBodyPartLead(input, bodyPartLeadId) {
    return this.businessProvider.updateBodyPartLead(input, bodyPartLeadId);
  }
  importBodyPartLeads(bodyPartLeads) {
    return this.businessProvider.importBodyPartLeads(bodyPartLeads);
  }
  validateBodyPartLeadExcelData(excelData, leads, bodyParts) {
    return this.businessProvider.validateBodyPartLeadExcelData(excelData, leads, bodyParts);
  }
}
BodyPartLeadService.ɵfac = function BodyPartLeadService_Factory(t) {
  return new (t || BodyPartLeadService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_body_part_lead_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.BodyPartLeadBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_body_part_lead_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.BodyPartLeadBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
BodyPartLeadService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: BodyPartLeadService,
  factory: BodyPartLeadService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 513855:
/*!****************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/body-part-lead.store.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebBodyPartLeadFeatureStore": () => (/* binding */ WebBodyPartLeadFeatureStore)
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
/* harmony import */ var _body_part_lead_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./body-part-lead.service */ 189438);














class WebBodyPartLeadFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, bodyPartLeadService) {
    super({
      loading: false,
      bodyPartLeads: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      leadId: undefined,
      bodyPartId: undefined,
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
    this.bodyPartLeadService = bodyPartLeadService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.bodyPartLeads$ = this.select(s => s.bodyPartLeads);
    this.leads$ = this.select(s => s.leads || []);
    this.bodyParts$ = this.select(s => s.bodyParts || []);
    this.leadId$ = this.select(s => s.leadId);
    this.bodyPartId$ = this.select(s => s.bodyPartId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.bodyPartLeads$, this.leads$, this.bodyParts$, (errors, loading, item, formName, bodyPartLeads, leads, bodyParts) => ({
      errors,
      loading,
      item,
      formName,
      bodyPartLeads,
      leads,
      bodyParts
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.leadId$, this.bodyPartId$, this.searchQuery$, (paging, leadId, bodyPartId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      leadId: leadId,
      bodyPartId: bodyPartId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLeadId = this.updater((state, leadId) => Object.assign(Object.assign({}, state), {
      leadId
    }));
    this.setBodyPartId = this.updater((state, bodyPartId) => Object.assign(Object.assign({}, state), {
      bodyPartId
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
    this.filterBodyParts = term => this.data.userSelectBodyParts({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let bodyParts = res.data.items;
      this.patchState({
        bodyParts
      });
      return bodyParts;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addLead = this.updater((state, lead) => Object.assign(Object.assign({}, state), {
      leads: state.leads.concat(lead)
    }));
    this.addBodyPart = this.updater((state, bodyPart) => Object.assign(Object.assign({}, state), {
      bodyParts: state.bodyParts.concat(bodyPart)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewBodyPartLead = this.updater((state, bodyPartLead) => Object.assign(Object.assign({}, state), {
      bodyPartLeads: [...state.bodyPartLeads, bodyPartLead]
    }));
    this.updateBodyPartLead = this.updater((state, bodyPartLead) => {
      return Object.assign(Object.assign({}, state), {
        bodyPartLeads: state.bodyPartLeads.map(el => {
          if (el.id === bodyPartLead.id) {
            return bodyPartLead;
          } else {
            return el;
          }
        })
      });
    });
    this.addBodyPartLeads = this.updater((state, newBodyPartLeads) => Object.assign(Object.assign({}, state), {
      bodyPartLeads: state.bodyPartLeads.concat(newBodyPartLeads)
    }));
    this.updateBodyPartLeads = this.updater((state, updatedBodyPartLeads) => {
      return Object.assign(Object.assign({}, state), {
        bodyPartLeads: state.bodyPartLeads.map(bodyPartLead => {
          const updated = updatedBodyPartLeads.find(el => el.id === bodyPartLead.id);
          return updated ? updated : bodyPartLead;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadBodyPartLeadEffect = this.effect(bodyPartLeadId$ => bodyPartLeadId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(bodyPartLeadId => this.data.userBodyPartLead({
      bodyPartLeadId
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
    this.loadBodyPartLeadsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userBodyPartLeads({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      bodyPartLeads: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createBodyPartLeadEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.bodyPartLeadService.createBodyPartLead(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(bodyPartLead => {
      this.addNewBodyPartLead(bodyPartLead);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: bodyPartLead,
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
    this.updateBodyPartLeadEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.bodyPartLeadService.updateBodyPartLead(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(bodyPartLead => {
      this.updateBodyPartLead(bodyPartLead);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: bodyPartLead,
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
    this.deleteBodyPartLeadEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, bodyPartLead]) => {
      return this.data.userDeleteBodyPartLead({
        bodyPartLeadId: bodyPartLead.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.bodyPartLeadService.importBodyPartLeads(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addBodyPartLeads(created);
      this.updateBodyPartLeads(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('bodyPartLeadId')) {
      var bodyPartLeadId = this.route.snapshot.paramMap.get('bodyPartLeadId');
      this.setFormName('bodyPartLead_edit');
    } else {
      this.setFormName('bodyPartLead_create');
    }
    if (this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId");
      this.setLeadId(leadId);
    }
    if (this.route.snapshot.paramMap.has("bodyPartId")) {
      var bodyPartId = this.route.snapshot.paramMap.get("bodyPartId");
      this.setBodyPartId(bodyPartId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.bodyPartLeadService.validateBodyPartLeadExcelData(excelData, vm.leads, vm.bodyParts);
    }));
  }
}
WebBodyPartLeadFeatureStore.ɵfac = function WebBodyPartLeadFeatureStore_Factory(t) {
  return new (t || WebBodyPartLeadFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_body_part_lead_service__WEBPACK_IMPORTED_MODULE_12__.BodyPartLeadService));
};
WebBodyPartLeadFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebBodyPartLeadFeatureStore,
  factory: WebBodyPartLeadFeatureStore.ɵfac
});

/***/ }),

/***/ 436237:
/*!***********************************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/rules/body-part-lead-name-is-valid.rule.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BodyPartLeadNameIsValidRule": () => (/* binding */ BodyPartLeadNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class BodyPartLeadNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 535566:
/*!*******************************************************************************************!*\
  !*** ./libs/web/body-part-lead/shared/rules/create-body-part-lead-input-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateBodyPartLeadInputIsValidRule": () => (/* binding */ CreateBodyPartLeadInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _body_part_lead_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body-part-lead-name-is-valid.rule */ 436237);


class CreateBodyPartLeadInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _body_part_lead_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.BodyPartLeadNameIsValidRule('name', 'The bodypartlead name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 453770:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/body-part-lead/ui/web-body-part-lead-select-form/web-body-part-lead-select-table-view.component.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebBodyPartLeadSelectTableViewComponent": () => (/* binding */ WebBodyPartLeadSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebBodyPartLeadSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.bodyPartLeads = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'lead.name',
      headerName: 'Lead',
      filter: 'agTextColumnFilter'
    }, {
      field: 'bodyPart.name',
      headerName: 'Body Part',
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
      field: 'leadId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'bodyPartId',
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
WebBodyPartLeadSelectTableViewComponent.ɵfac = function WebBodyPartLeadSelectTableViewComponent_Factory(t) {
  return new (t || WebBodyPartLeadSelectTableViewComponent)();
};
WebBodyPartLeadSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebBodyPartLeadSelectTableViewComponent,
  selectors: [["ui-body-part-lead-select-table-view"]],
  viewQuery: function WebBodyPartLeadSelectTableViewComponent_Query(rf, ctx) {
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
    bodyPartLeads: "bodyPartLeads"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebBodyPartLeadSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebBodyPartLeadSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebBodyPartLeadSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.bodyPartLeads)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);