"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_lead_shared_lead_store_ts"],{

/***/ 82580:
/*!************************************************************!*\
  !*** ./libs/web/lead/shared/actions/create-lead.action.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateLeadAction": () => (/* binding */ CreateLeadAction)
/* harmony export */ });
/* harmony import */ var _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead.business-action-base */ 548125);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_lead_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-lead-input-is-valid.rule */ 447516);




class CreateLeadAction extends _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadBusinessActionBase {
  constructor(input) {
    super('CreateLeadAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_lead_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateLeadInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateLead({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 548125:
/*!*******************************************************************!*\
  !*** ./libs/web/lead/shared/actions/lead.business-action-base.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadBusinessActionBase": () => (/* binding */ LeadBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class LeadBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 151737:
/*!*********************************************************************!*\
  !*** ./libs/web/lead/shared/actions/sync-mrn-to-pharmacy.action.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncMrnToPharmacyAction": () => (/* binding */ SyncMrnToPharmacyAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead.business-action-base */ 548125);


class SyncMrnToPharmacyAction extends _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadBusinessActionBase {
  constructor(input) {
    super('SyncMrnToPharmacyAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.input, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.input.id, true));
  }
  performAction() {
    // this.response = this.businessProvider.data.userSync({leadId: this.leadId, input: this.lead }).pipe(
    //         switchMap((response) => of(response.data.updated))
    //     )
  }
}

/***/ }),

/***/ 396907:
/*!*************************************************************!*\
  !*** ./libs/web/lead/shared/actions/update-leads.action.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateLeadAction": () => (/* binding */ UpdateLeadAction),
/* harmony export */   "UpdateLeadsAction": () => (/* binding */ UpdateLeadsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead.business-action-base */ 548125);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateLeadsAction extends _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadBusinessActionBase {
  constructor(leads) {
    super('UpdateLeadsAction');
    this.leads = leads;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.leads, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateLeads({
      input: {
        leads: this.leads
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateLeadAction extends _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadBusinessActionBase {
  constructor(lead, leadId) {
    super('UpdateLeadAction');
    this.lead = lead;
    this.leadId = leadId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.lead, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.leadId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateLead({
      leadId: this.leadId,
      input: this.lead
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 300747:
/*!*************************************************************************!*\
  !*** ./libs/web/lead/shared/actions/validate-lead-excel-data.action.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateLeadExcelDataAction": () => (/* binding */ ValidateLeadExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lead.business-action-base */ 548125);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateLeadExcelDataAction extends _lead_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LeadBusinessActionBase {
  constructor(excelData, accidentTypes, statuses, sourceOfLeads, submittedBies) {
    super('ValidateLeadExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.accidentTypes = accidentTypes;
    this.statuses = statuses;
    this.sourceOfLeads = sourceOfLeads;
    this.submittedBies = submittedBies;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`accidentTypeName_${index}_is_valid}`, "Accident Type Is Not Valid", 'accidentType.name', datum['accidentType'], this.accidentTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`statusName_${index}_is_valid}`, "Status Is Not Valid", 'status.name', datum['status'], this.statuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`sourceOfLeadName_${index}_is_valid}`, "Source of Lead Is Not Valid", 'sourceOfLead.name', datum['sourceOfLead'], this.sourceOfLeads, true));
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

/***/ 473606:
/*!****************************************************************!*\
  !*** ./libs/web/lead/shared/lead.business-provider.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadBusinessProviderService": () => (/* binding */ LeadBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_lead_excel_data_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions/validate-lead-excel-data.action */ 300747);
/* harmony import */ var _actions_create_lead_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-lead.action */ 82580);
/* harmony import */ var _actions_sync_mrn_to_pharmacy_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/sync-mrn-to-pharmacy.action */ 151737);
/* harmony import */ var _actions_update_leads_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-leads.action */ 396907);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);












class LeadBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.LeadBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createLead(input) {
    const action = new _actions_create_lead_action__WEBPACK_IMPORTED_MODULE_2__.CreateLeadAction(input);
    action.Do(this);
    return action.response;
  }
  updateLead(input, leadId) {
    const action = new _actions_update_leads_action__WEBPACK_IMPORTED_MODULE_3__.UpdateLeadAction(input, leadId);
    action.Do(this);
    return action.response;
  }
  userSyncMrnToPharmacy(input) {
    const action = new _actions_sync_mrn_to_pharmacy_action__WEBPACK_IMPORTED_MODULE_4__.SyncMrnToPharmacyAction(input);
    action.Do(this);
    return action.response;
  }
  importLeads(leads) {
    const updateLeadsAction = new _actions_update_leads_action__WEBPACK_IMPORTED_MODULE_3__.UpdateLeadsAction(leads);
    updateLeadsAction.Do(this);
    return updateLeadsAction.response;
  }
  validateLeadExcelData(excelData, accidentTypes, statuses, sourceOfLeads, submittedBies) {
    const validateLeadExcelDataAction = new _actions_validate_lead_excel_data_action__WEBPACK_IMPORTED_MODULE_5__.ValidateLeadExcelDataAction(excelData, accidentTypes, statuses, sourceOfLeads, submittedBies);
    validateLeadExcelDataAction.Do(this);
    return validateLeadExcelDataAction.response;
  }
}
LeadBusinessProviderService.ɵfac = function LeadBusinessProviderService_Factory(t) {
  return new (t || LeadBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
LeadBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: LeadBusinessProviderService,
  factory: LeadBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 795119:
/*!**********************************************!*\
  !*** ./libs/web/lead/shared/lead.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadService": () => (/* binding */ LeadService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _lead_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lead.business-provider.service */ 473606);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);








class LeadService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("LeadService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createLead(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createLead(filteredObj);
  }
  updateLead(input, leadId) {
    return this.businessProvider.updateLead(input, leadId);
  }
  userSyncMrnToPharmacy(input) {
    return this.businessProvider.userSyncMrnToPharmacy(input);
  }
  importLeads(leads) {
    return this.businessProvider.importLeads(leads);
  }
  validateLeadExcelData(excelData, accidentTypes, statuses, sourceOfLeads, submittedBies) {
    return this.businessProvider.validateLeadExcelData(excelData, accidentTypes, statuses, sourceOfLeads, submittedBies);
  }
}
LeadService.ɵfac = function LeadService_Factory(t) {
  return new (t || LeadService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_lead_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.LeadBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_lead_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.LeadBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
LeadService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: LeadService,
  factory: LeadService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 208758:
/*!********************************************!*\
  !*** ./libs/web/lead/shared/lead.store.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadFeatureStore": () => (/* binding */ WebLeadFeatureStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 670262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _lead_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lead.service */ 795119);














class WebLeadFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, leadService) {
    super({
      loading: false,
      leads: [],
      done: false,
      searchQuery: '',
      mrn: '',
      formName: undefined,
      accidentTypeId: undefined,
      driversLicenseId: undefined,
      policeReportAttachmentId: undefined,
      phoneRecordingId: undefined,
      leadStatusId: undefined,
      leadSourceId: undefined,
      submittedById: undefined,
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
    this.leadService = leadService;
    this.bodyPartInjured = [];
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.leads$ = this.select(s => s.leads);
    this.accidentTypes$ = this.select(s => s.accidentTypes || []);
    this.documents$ = this.select(s => s.documents || []);
    this.leadStatuses$ = this.select(s => s.leadStatuses || []);
    this.leadSources$ = this.select(s => s.leadSources || []);
    this.users$ = this.select(s => s.users || []);
    this.accidentTypeId$ = this.select(s => s.accidentTypeId);
    this.driversLicenseId$ = this.select(s => s.driversLicenseId);
    this.policeReportAttachmentId$ = this.select(s => s.policeReportAttachmentId);
    this.phoneRecordingId$ = this.select(s => s.phoneRecordingId);
    this.leadStatusId$ = this.select(s => s.leadStatusId);
    this.leadSourceId$ = this.select(s => s.leadSourceId);
    this.submittedById$ = this.select(s => s.submittedById);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.leads$, this.accidentTypes$, this.documents$, this.leadStatuses$, this.leadSources$, this.users$, (errors, loading, item, formName, leads, accidentTypes, documents, leadStatuses, leadSources, users) => ({
      errors,
      loading,
      item,
      formName,
      leads,
      accidentTypes,
      documents,
      leadStatuses,
      leadSources,
      users
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.accidentTypeId$, this.driversLicenseId$, this.policeReportAttachmentId$, this.phoneRecordingId$, this.leadStatusId$, this.leadSourceId$, this.submittedById$, this.searchQuery$, (paging, accidentTypeId, driversLicenseId, policeReportAttachmentId, phoneRecordingId, leadStatusId, leadSourceId, submittedById, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      accidentTypeId: accidentTypeId,
      driversLicenseId: driversLicenseId,
      policeReportAttachmentId: policeReportAttachmentId,
      phoneRecordingId: phoneRecordingId,
      leadStatusId: leadStatusId,
      leadSourceId: leadSourceId,
      submittedById: submittedById,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setAccidentTypeId = this.updater((state, accidentTypeId) => Object.assign(Object.assign({}, state), {
      accidentTypeId
    }));
    this.setDriversLicenseId = this.updater((state, driversLicenseId) => Object.assign(Object.assign({}, state), {
      driversLicenseId
    }));
    this.setPoliceReportAttachmentId = this.updater((state, policeReportAttachmentId) => Object.assign(Object.assign({}, state), {
      policeReportAttachmentId
    }));
    this.setPhoneRecordingId = this.updater((state, phoneRecordingId) => Object.assign(Object.assign({}, state), {
      phoneRecordingId
    }));
    this.setLeadStatusId = this.updater((state, leadStatusId) => Object.assign(Object.assign({}, state), {
      leadStatusId
    }));
    this.setLeadSourceId = this.updater((state, leadSourceId) => Object.assign(Object.assign({}, state), {
      leadSourceId
    }));
    this.setSubmittedById = this.updater((state, submittedById) => Object.assign(Object.assign({}, state), {
      submittedById
    }));
    this.filterAccidentTypes = term => this.data.userSelectAccidentTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const accidentTypes = res.data.items;
      console.log('AccidentTypes', res.data.items);
      this.patchState({
        accidentTypes
      });
      return accidentTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      console.log('filterAccidentTypes', result.data.items);
      return result.data.items;
    }));
    this.filterDocuments = term => this.data.userSelectDocuments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const documents = res.data.items;
      this.patchState({
        documents
      });
      return documents;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterLeadStatuses = term => this.data.userSelectLeadStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const leadStatuses = res.data.items;
      this.patchState({
        leadStatuses
      });
      return leadStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterLeadSources = term => this.data.userSelectLeadSources({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const leadSources = res.data.items;
      this.patchState({
        leadSources
      });
      return leadSources;
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
      const users = res.data.items;
      this.patchState({
        users
      });
      return users;
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
      const bodyParts = res.data.items;
      this.patchState({
        bodyParts
      });
      return bodyParts;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addAccidentType = this.updater((state, accidentType) => Object.assign(Object.assign({}, state), {
      accidentTypes: state.accidentTypes.concat(accidentType)
    }));
    this.addDocument = this.updater((state, document) => Object.assign(Object.assign({}, state), {
      documents: state.documents.concat(document)
    }));
    this.addLeadStatus = this.updater((state, leadStatus) => Object.assign(Object.assign({}, state), {
      leadStatuses: state.leadStatuses.concat(leadStatus)
    }));
    this.addLeadSource = this.updater((state, leadSource) => Object.assign(Object.assign({}, state), {
      leadSources: state.leadSources.concat(leadSource)
    }));
    this.addUser = this.updater((state, user) => Object.assign(Object.assign({}, state), {
      users: state.users.concat(user)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewLead = this.updater((state, lead) => Object.assign(Object.assign({}, state), {
      leads: [...state.leads, lead]
    }));
    this.updateLead = this.updater((state, lead) => {
      return Object.assign(Object.assign({}, state), {
        leads: state.leads.map(el => {
          if (el.id === lead.id) {
            return lead;
          } else {
            return el;
          }
        })
      });
    });
    this.addLeads = this.updater((state, newLeads) => Object.assign(Object.assign({}, state), {
      leads: state.leads.concat(newLeads)
    }));
    this.updateLeads = this.updater((state, updatedLeads) => {
      return Object.assign(Object.assign({}, state), {
        leads: state.leads.map(lead => {
          const updated = updatedLeads.find(el => el.id === lead.id);
          return updated ? updated : lead;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadLeadEffect = this.effect(leadId$ => leadId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(leadId => this.data.userLead({
      leadId
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
    this.loadLeadsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userLeads({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      leads: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createLeadEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => {
      console.log('input', input);
      return this.leadService.createLead(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(lead => {
        this.addNewLead(lead);
        this.toast.success('Created Successfully!');
        setTimeout(() => this.patchState({
          item: lead,
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
    this.updateLeadEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.leadService.updateLead(item, item.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(lead => {
      this.updateLead(lead);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: lead,
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
    this.userSyncMrnToPharmacyEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.data.userSyncMrnToPharmacy({
      input,
      mrn: input.legalCase.medicalRecordNumber
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success('Successfully synced mrn to pharmacy', {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    }, error => {
      this.toast.error("Failed to ", {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
    this.deleteLeadEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, lead]) => {
      return this.data.userDeleteLead({
        leadId: lead.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.leadService.importLeads(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addLeads(created);
      this.updateLeads(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('leadId')) {
      const leadId = this.route.snapshot.paramMap.get('leadId');
      this.setFormName('lead_edit');
    } else {
      this.setFormName('lead_create');
    }
    if (this.route.snapshot.paramMap.has('accidentTypeId')) {
      const accidentTypeId = this.route.snapshot.paramMap.get('accidentTypeId');
      this.setAccidentTypeId(accidentTypeId);
    }
    if (this.route.snapshot.paramMap.has('driversLicenseId')) {
      const driversLicenseId = this.route.snapshot.paramMap.get('driversLicenseId');
      this.setDriversLicenseId(driversLicenseId);
    }
    if (this.route.snapshot.paramMap.has('policeReportAttachmentId')) {
      const policeReportAttachmentId = this.route.snapshot.paramMap.get('policeReportAttachmentId');
      this.setPoliceReportAttachmentId(policeReportAttachmentId);
    }
    if (this.route.snapshot.paramMap.has('phoneRecordingId')) {
      const phoneRecordingId = this.route.snapshot.paramMap.get('phoneRecordingId');
      this.setPhoneRecordingId(phoneRecordingId);
    }
    if (this.route.snapshot.paramMap.has('leadStatusId')) {
      const leadStatusId = this.route.snapshot.paramMap.get('leadStatusId');
      this.setLeadStatusId(leadStatusId);
    }
    if (this.route.snapshot.paramMap.has('leadSourceId')) {
      const leadSourceId = this.route.snapshot.paramMap.get('leadSourceId');
      this.setLeadSourceId(leadSourceId);
    }
    if (this.route.snapshot.paramMap.has('submittedById')) {
      const submittedById = this.route.snapshot.paramMap.get('submittedById');
      this.setSubmittedById(submittedById);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.leadService.validateLeadExcelData(excelData, vm.accidentTypes, vm.leadStatuses, vm.leadSources, vm.users);
    }));
  }
  syncMrnToPharmacy() {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      const mrn = '123456';
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(this.data.userSyncMrnToPharmacy({
        input: vm.item,
        mrn
      })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
        var _a;
        this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
          duration: 3000
        });
        return rxjs__WEBPACK_IMPORTED_MODULE_6__.EMPTY;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(result => {
        if (result) {
          this.toast.success(`Successfully synced to pharmacy, {result}`, {
            duration: 3000
          });
        }
      }));
    }));
  }
  getMrn() {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(this.data.getPatientMrnNumber({
        dateOfBirth: vm.item.dateOfBirth,
        dateOfLoss: vm.item.dateOfLoss,
        accidentKind: vm.item.accidentTypeId,
        legalCaseId: vm.item.id
      })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
        var _a;
        this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
          duration: 3000
        });
        return rxjs__WEBPACK_IMPORTED_MODULE_6__.EMPTY;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(result => {
        if (result) {
          console.log(result);
          //interpolate result into the toast message.
          this.toast.success(`Success, new MRN: ${result}`, {
            duration: 3000
          });
        }
      }));
    }));
  }
  BodyPartsInjuredChanged(bodyParts) {
    console.log('bodyParts', bodyParts);
    this.bodyPartInjured = bodyParts.map(value => {
      return {
        bodyPartId: value
      };
    });
  }
}
WebLeadFeatureStore.ɵfac = function WebLeadFeatureStore_Factory(t) {
  return new (t || WebLeadFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_9__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_11__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_12__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_lead_service__WEBPACK_IMPORTED_MODULE_13__.LeadService));
};
WebLeadFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: WebLeadFeatureStore,
  factory: WebLeadFeatureStore.ɵfac
});

/***/ }),

/***/ 447516:
/*!***********************************************************************!*\
  !*** ./libs/web/lead/shared/rules/create-lead-input-is-valid.rule.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateLeadInputIsValidRule": () => (/* binding */ CreateLeadInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CreateLeadInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
  }
}

/***/ })

}]);