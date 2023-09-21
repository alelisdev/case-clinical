"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_claim-procedure_shared_claim-procedure_store_ts-libs_web_claim-procedure_ui_-012d30"],{

/***/ 772979:
/*!*****************************************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/actions/claim-procedure.business-action-base.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClaimProcedureBusinessActionBase": () => (/* binding */ ClaimProcedureBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ClaimProcedureBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 452918:
/*!**********************************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/actions/create-claim-procedure.action.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClaimProcedureAction": () => (/* binding */ CreateClaimProcedureAction)
/* harmony export */ });
/* harmony import */ var _claim_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim-procedure.business-action-base */ 772979);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_claim_procedure_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-claim-procedure-input-is-valid.rule */ 870728);




class CreateClaimProcedureAction extends _claim_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClaimProcedureBusinessActionBase {
  constructor(input) {
    super('CreateClaimProcedureAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_claim_procedure_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateClaimProcedureInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateClaimProcedure({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 570751:
/*!***********************************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/actions/update-claim-procedures.action.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateClaimProcedureAction": () => (/* binding */ UpdateClaimProcedureAction),
/* harmony export */   "UpdateClaimProceduresAction": () => (/* binding */ UpdateClaimProceduresAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _claim_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim-procedure.business-action-base */ 772979);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateClaimProceduresAction extends _claim_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClaimProcedureBusinessActionBase {
  constructor(claimProcedures) {
    super('UpdateClaimProceduresAction');
    this.claimProcedures = claimProcedures;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.claimProcedures, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClaimProcedures({
      input: {
        claimProcedures: this.claimProcedures
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateClaimProcedureAction extends _claim_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClaimProcedureBusinessActionBase {
  constructor(claimProcedure, claimProcedureId) {
    super('UpdateClaimProcedureAction');
    this.claimProcedure = claimProcedure;
    this.claimProcedureId = claimProcedureId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.claimProcedure, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.claimProcedureId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClaimProcedure({
      claimProcedureId: this.claimProcedureId,
      input: this.claimProcedure
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 171784:
/*!***********************************************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/actions/validate-claim-procedure-excel-data.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateClaimProcedureExcelDataAction": () => (/* binding */ ValidateClaimProcedureExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _claim_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim-procedure.business-action-base */ 772979);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateClaimProcedureExcelDataAction extends _claim_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClaimProcedureBusinessActionBase {
  constructor(excelData, placeOfServices, claimStatuses, claims, appointments, procedures) {
    super('ValidateClaimProcedureExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.placeOfServices = placeOfServices;
    this.claimStatuses = claimStatuses;
    this.claims = claims;
    this.appointments = appointments;
    this.procedures = procedures;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`placeOfServiceName_${index}_is_valid}`, "Place of Service Is Not Valid", 'placeOfService.name', datum['placeOfService'], this.placeOfServices, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`claimStatusName_${index}_is_valid}`, "Claim Status Is Not Valid", 'claimStatus.name', datum['claimStatus'], this.claimStatuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`claimName_${index}_is_valid}`, "Claim Is Not Valid", 'claim.name', datum['claim'], this.claims, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`appointmentName_${index}_is_valid}`, "Appointment Is Not Valid", 'appointment.name', datum['appointment'], this.appointments, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`procedureName_${index}_is_valid}`, "Procedure Is Not Valid", 'procedure.name', datum['procedure'], this.procedures, true));
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

/***/ 534477:
/*!**************************************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/claim-procedure.business-provider.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClaimProcedureBusinessProviderService": () => (/* binding */ ClaimProcedureBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_claim_procedure_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-claim-procedure-excel-data.action */ 171784);
/* harmony import */ var _actions_create_claim_procedure_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-claim-procedure.action */ 452918);
/* harmony import */ var _actions_update_claim_procedures_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-claim-procedures.action */ 570751);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ClaimProcedureBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ClaimProcedureBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createClaimProcedure(input) {
    const action = new _actions_create_claim_procedure_action__WEBPACK_IMPORTED_MODULE_2__.CreateClaimProcedureAction(input);
    action.Do(this);
    return action.response;
  }
  updateClaimProcedure(input, claimProcedureId) {
    const action = new _actions_update_claim_procedures_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClaimProcedureAction(input, claimProcedureId);
    action.Do(this);
    return action.response;
  }
  importClaimProcedures(claimProcedures) {
    const updateClaimProceduresAction = new _actions_update_claim_procedures_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClaimProceduresAction(claimProcedures);
    updateClaimProceduresAction.Do(this);
    return updateClaimProceduresAction.response;
  }
  validateClaimProcedureExcelData(excelData, placeOfServices, claimStatuses, claims, appointments, procedures) {
    const validateClaimProcedureExcelDataAction = new _actions_validate_claim_procedure_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateClaimProcedureExcelDataAction(excelData, placeOfServices, claimStatuses, claims, appointments, procedures);
    validateClaimProcedureExcelDataAction.Do(this);
    return validateClaimProcedureExcelDataAction.response;
  }
}
ClaimProcedureBusinessProviderService.ɵfac = function ClaimProcedureBusinessProviderService_Factory(t) {
  return new (t || ClaimProcedureBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ClaimProcedureBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ClaimProcedureBusinessProviderService,
  factory: ClaimProcedureBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 245189:
/*!********************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/claim-procedure.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClaimProcedureService": () => (/* binding */ ClaimProcedureService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _claim_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./claim-procedure.business-provider.service */ 534477);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ClaimProcedureService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ClaimProcedureService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createClaimProcedure(input) {
    return this.businessProvider.createClaimProcedure(input);
  }
  updateClaimProcedure(input, claimProcedureId) {
    return this.businessProvider.updateClaimProcedure(input, claimProcedureId);
  }
  importClaimProcedures(claimProcedures) {
    return this.businessProvider.importClaimProcedures(claimProcedures);
  }
  validateClaimProcedureExcelData(excelData, placeOfServices, claimStatuses, claims, appointments, procedures) {
    return this.businessProvider.validateClaimProcedureExcelData(excelData, placeOfServices, claimStatuses, claims, appointments, procedures);
  }
}
ClaimProcedureService.ɵfac = function ClaimProcedureService_Factory(t) {
  return new (t || ClaimProcedureService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_claim_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClaimProcedureBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_claim_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClaimProcedureBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ClaimProcedureService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ClaimProcedureService,
  factory: ClaimProcedureService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 753903:
/*!******************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/claim-procedure.store.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClaimProcedureFeatureStore": () => (/* binding */ WebClaimProcedureFeatureStore)
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
/* harmony import */ var _claim_procedure_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./claim-procedure.service */ 245189);














class WebClaimProcedureFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, claimProcedureService) {
    super({
      loading: false,
      claimProcedures: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      placeOfServiceId: undefined,
      claimStatusId: undefined,
      claimId: undefined,
      appointmentId: undefined,
      procedureId: undefined,
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
    this.claimProcedureService = claimProcedureService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.claimProcedures$ = this.select(s => s.claimProcedures);
    this.placeOfServices$ = this.select(s => s.placeOfServices || []);
    this.claimStatuses$ = this.select(s => s.claimStatuses || []);
    this.claims$ = this.select(s => s.claims || []);
    this.appointments$ = this.select(s => s.appointments || []);
    this.procedures$ = this.select(s => s.procedures || []);
    this.placeOfServiceId$ = this.select(s => s.placeOfServiceId);
    this.claimStatusId$ = this.select(s => s.claimStatusId);
    this.claimId$ = this.select(s => s.claimId);
    this.appointmentId$ = this.select(s => s.appointmentId);
    this.procedureId$ = this.select(s => s.procedureId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.claimProcedures$, this.placeOfServices$, this.claimStatuses$, this.claims$, this.appointments$, this.procedures$, (errors, loading, item, formName, claimProcedures, placeOfServices, claimStatuses, claims, appointments, procedures) => ({
      errors,
      loading,
      item,
      formName,
      claimProcedures,
      placeOfServices,
      claimStatuses,
      claims,
      appointments,
      procedures
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.placeOfServiceId$, this.claimStatusId$, this.claimId$, this.appointmentId$, this.procedureId$, this.searchQuery$, (paging, placeOfServiceId, claimStatusId, claimId, appointmentId, procedureId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      placeOfServiceId: placeOfServiceId,
      claimStatusId: claimStatusId,
      claimId: claimId,
      appointmentId: appointmentId,
      procedureId: procedureId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setPlaceOfServiceId = this.updater((state, placeOfServiceId) => Object.assign(Object.assign({}, state), {
      placeOfServiceId
    }));
    this.setClaimStatusId = this.updater((state, claimStatusId) => Object.assign(Object.assign({}, state), {
      claimStatusId
    }));
    this.setClaimId = this.updater((state, claimId) => Object.assign(Object.assign({}, state), {
      claimId
    }));
    this.setAppointmentId = this.updater((state, appointmentId) => Object.assign(Object.assign({}, state), {
      appointmentId
    }));
    this.setProcedureId = this.updater((state, procedureId) => Object.assign(Object.assign({}, state), {
      procedureId
    }));
    this.filterPlaceOfServices = term => this.data.userSelectPlaceOfServices({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let placeOfServices = res.data.items;
      this.patchState({
        placeOfServices
      });
      return placeOfServices;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterClaimStatuses = term => this.data.userSelectClaimStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let claimStatuses = res.data.items;
      this.patchState({
        claimStatuses
      });
      return claimStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterClaims = term => this.data.userSelectClaims({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let claims = res.data.items;
      this.patchState({
        claims
      });
      return claims;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAppointments = term => this.data.userSelectAppointments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let appointments = res.data.items;
      this.patchState({
        appointments
      });
      return appointments;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterProcedures = term => this.data.userSelectProcedures({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedures = res.data.items;
      this.patchState({
        procedures
      });
      return procedures;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addPlaceOfService = this.updater((state, placeOfService) => Object.assign(Object.assign({}, state), {
      placeOfServices: state.placeOfServices.concat(placeOfService)
    }));
    this.addClaimStatus = this.updater((state, claimStatus) => Object.assign(Object.assign({}, state), {
      claimStatuses: state.claimStatuses.concat(claimStatus)
    }));
    this.addClaim = this.updater((state, claim) => Object.assign(Object.assign({}, state), {
      claims: state.claims.concat(claim)
    }));
    this.addAppointment = this.updater((state, appointment) => Object.assign(Object.assign({}, state), {
      appointments: state.appointments.concat(appointment)
    }));
    this.addProcedure = this.updater((state, procedure) => Object.assign(Object.assign({}, state), {
      procedures: state.procedures.concat(procedure)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewClaimProcedure = this.updater((state, claimProcedure) => Object.assign(Object.assign({}, state), {
      claimProcedures: [...state.claimProcedures, claimProcedure]
    }));
    this.updateClaimProcedure = this.updater((state, claimProcedure) => {
      return Object.assign(Object.assign({}, state), {
        claimProcedures: state.claimProcedures.map(el => {
          if (el.id === claimProcedure.id) {
            return claimProcedure;
          } else {
            return el;
          }
        })
      });
    });
    this.addClaimProcedures = this.updater((state, newClaimProcedures) => Object.assign(Object.assign({}, state), {
      claimProcedures: state.claimProcedures.concat(newClaimProcedures)
    }));
    this.updateClaimProcedures = this.updater((state, updatedClaimProcedures) => {
      return Object.assign(Object.assign({}, state), {
        claimProcedures: state.claimProcedures.map(claimProcedure => {
          const updated = updatedClaimProcedures.find(el => el.id === claimProcedure.id);
          return updated ? updated : claimProcedure;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadClaimProcedureEffect = this.effect(claimProcedureId$ => claimProcedureId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(claimProcedureId => this.data.userClaimProcedure({
      claimProcedureId
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
    this.loadClaimProceduresEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userClaimProcedures({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      claimProcedures: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createClaimProcedureEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.claimProcedureService.createClaimProcedure(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(claimProcedure => {
      this.addNewClaimProcedure(claimProcedure);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: claimProcedure,
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
    this.updateClaimProcedureEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.claimProcedureService.updateClaimProcedure(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(claimProcedure => {
      this.updateClaimProcedure(claimProcedure);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: claimProcedure,
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
    this.deleteClaimProcedureEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, claimProcedure]) => {
      return this.data.userDeleteClaimProcedure({
        claimProcedureId: claimProcedure.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.claimProcedureService.importClaimProcedures(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addClaimProcedures(created);
      this.updateClaimProcedures(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('claimProcedureId')) {
      var claimProcedureId = this.route.snapshot.paramMap.get('claimProcedureId');
      this.setFormName('claimProcedure_edit');
    } else {
      this.setFormName('claimProcedure_create');
    }
    if (this.route.snapshot.paramMap.has("placeOfServiceId")) {
      var placeOfServiceId = this.route.snapshot.paramMap.get("placeOfServiceId");
      this.setPlaceOfServiceId(placeOfServiceId);
    }
    if (this.route.snapshot.paramMap.has("claimStatusId")) {
      var claimStatusId = this.route.snapshot.paramMap.get("claimStatusId");
      this.setClaimStatusId(claimStatusId);
    }
    if (this.route.snapshot.paramMap.has("claimId")) {
      var claimId = this.route.snapshot.paramMap.get("claimId");
      this.setClaimId(claimId);
    }
    if (this.route.snapshot.paramMap.has("appointmentId")) {
      var appointmentId = this.route.snapshot.paramMap.get("appointmentId");
      this.setAppointmentId(appointmentId);
    }
    if (this.route.snapshot.paramMap.has("procedureId")) {
      var procedureId = this.route.snapshot.paramMap.get("procedureId");
      this.setProcedureId(procedureId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.claimProcedureService.validateClaimProcedureExcelData(excelData, vm.placeOfServices, vm.claimStatuses, vm.claims, vm.appointments, vm.procedures);
    }));
  }
}
WebClaimProcedureFeatureStore.ɵfac = function WebClaimProcedureFeatureStore_Factory(t) {
  return new (t || WebClaimProcedureFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_claim_procedure_service__WEBPACK_IMPORTED_MODULE_12__.ClaimProcedureService));
};
WebClaimProcedureFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebClaimProcedureFeatureStore,
  factory: WebClaimProcedureFeatureStore.ɵfac
});

/***/ }),

/***/ 865350:
/*!*************************************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/rules/claim-procedure-name-is-valid.rule.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClaimProcedureNameIsValidRule": () => (/* binding */ ClaimProcedureNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ClaimProcedureNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 870728:
/*!*********************************************************************************************!*\
  !*** ./libs/web/claim-procedure/shared/rules/create-claim-procedure-input-is-valid.rule.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClaimProcedureInputIsValidRule": () => (/* binding */ CreateClaimProcedureInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _claim_procedure_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim-procedure-name-is-valid.rule */ 865350);


class CreateClaimProcedureInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _claim_procedure_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ClaimProcedureNameIsValidRule('name', 'The claimprocedure name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 159602:
/*!************************************************************************************************************************!*\
  !*** ./libs/web/claim-procedure/ui/web-claim-procedure-select-form/web-claim-procedure-select-table-view.component.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClaimProcedureSelectTableViewComponent": () => (/* binding */ WebClaimProcedureSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebClaimProcedureSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.claimProcedures = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'placeOfService.name',
      headerName: 'Place of Service',
      filter: 'agTextColumnFilter'
    }, {
      field: 'claimStatus.name',
      headerName: 'Claim Status',
      filter: 'agTextColumnFilter'
    }, {
      field: 'claim.name',
      headerName: 'Claim',
      filter: 'agTextColumnFilter'
    }, {
      field: 'appointment.name',
      headerName: 'Appointment',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedure.name',
      headerName: 'Procedure',
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
      field: 'claimProcedureCodeId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureCodeId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'claimId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'fromDateOfService',
      filter: 'agDateColumnFilter'
    }, {
      field: 'toDateOfService',
      filter: 'agDateColumnFilter'
    }, {
      field: 'placeOfServiceId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'nationalDrugCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'drugUnit',
      filter: 'agTextColumnFilter'
    }, {
      field: 'drugQuantity',
      filter: 'agTextColumnFilter'
    }, {
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.quantity, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Billed Amount',
      field: 'billedAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.billedAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Approved Amount',
      field: 'approvedAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.approvedAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Adjustment Amount',
      field: 'adjustmentAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.adjustmentAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      headerName: 'Net Payment Amount',
      field: 'netPaymentAmount',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.netPaymentAmount, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'paymentMethod',
      filter: 'agTextColumnFilter'
    }, {
      field: 'internalMemo',
      filter: 'agTextColumnFilter'
    }, {
      field: 'explainationOfBenefitsComment',
      filter: 'agTextColumnFilter'
    }, {
      field: 'claimStatusId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'reason',
      filter: 'agTextColumnFilter'
    }, {
      field: 'procedureCode',
      filter: 'agTextColumnFilter'
    }, {
      field: 'diagnosisPointer',
      filter: 'agTextColumnFilter'
    }, {
      field: 'modifier1',
      filter: 'agTextColumnFilter'
    }, {
      field: 'modifier2',
      filter: 'agTextColumnFilter'
    }, {
      field: 'modifier3',
      filter: 'agTextColumnFilter'
    }, {
      field: 'modifier4',
      filter: 'agTextColumnFilter'
    }, {
      field: 'appointmentId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'procedureId',
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
WebClaimProcedureSelectTableViewComponent.ɵfac = function WebClaimProcedureSelectTableViewComponent_Factory(t) {
  return new (t || WebClaimProcedureSelectTableViewComponent)();
};
WebClaimProcedureSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebClaimProcedureSelectTableViewComponent,
  selectors: [["ui-claim-procedure-select-table-view"]],
  viewQuery: function WebClaimProcedureSelectTableViewComponent_Query(rf, ctx) {
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
    claimProcedures: "claimProcedures"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "data", "showSidebar", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebClaimProcedureSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebClaimProcedureSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebClaimProcedureSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("data", ctx.claimProcedures)("showSidebar", false)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);