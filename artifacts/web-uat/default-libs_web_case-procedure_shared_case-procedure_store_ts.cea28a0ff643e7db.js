"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_case-procedure_shared_case-procedure_store_ts"],{

/***/ 299038:
/*!***************************************************************************************!*\
  !*** ./libs/web/case-procedure/shared/actions/case-procedure.business-action-base.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseProcedureBusinessActionBase": () => (/* binding */ CaseProcedureBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class CaseProcedureBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 23113:
/*!********************************************************************************!*\
  !*** ./libs/web/case-procedure/shared/actions/create-case-procedure.action.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseProcedureAction": () => (/* binding */ CreateCaseProcedureAction)
/* harmony export */ });
/* harmony import */ var _case_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-procedure.business-action-base */ 299038);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_case_procedure_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-case-procedure-input-is-valid.rule */ 69170);




class CreateCaseProcedureAction extends _case_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseProcedureBusinessActionBase {
  constructor(input) {
    super('CreateCaseProcedureAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_case_procedure_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateCaseProcedureInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateCaseProcedure({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 40832:
/*!*********************************************************************************!*\
  !*** ./libs/web/case-procedure/shared/actions/update-case-procedures.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCaseProcedureAction": () => (/* binding */ UpdateCaseProcedureAction),
/* harmony export */   "UpdateCaseProceduresAction": () => (/* binding */ UpdateCaseProceduresAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-procedure.business-action-base */ 299038);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateCaseProceduresAction extends _case_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseProcedureBusinessActionBase {
  constructor(caseProcedures) {
    super('UpdateCaseProceduresAction');
    this.caseProcedures = caseProcedures;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseProcedures, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseProcedures({
      input: {
        caseProcedures: this.caseProcedures
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateCaseProcedureAction extends _case_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseProcedureBusinessActionBase {
  constructor(caseProcedure, caseProcedureId) {
    super('UpdateCaseProcedureAction');
    this.caseProcedure = caseProcedure;
    this.caseProcedureId = caseProcedureId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.caseProcedure, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.caseProcedureId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCaseProcedure({
      caseProcedureId: this.caseProcedureId,
      input: this.caseProcedure
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 334687:
/*!*********************************************************************************************!*\
  !*** ./libs/web/case-procedure/shared/actions/validate-case-procedure-excel-data.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateCaseProcedureExcelDataAction": () => (/* binding */ ValidateCaseProcedureExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _case_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-procedure.business-action-base */ 299038);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateCaseProcedureExcelDataAction extends _case_procedure_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CaseProcedureBusinessActionBase {
  constructor(excelData, legalCases, appointments, locations) {
    super('ValidateCaseProcedureExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.legalCases = legalCases;
    this.appointments = appointments;
    this.locations = locations;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`appointmentName_${index}_is_valid}`, "Appointment Is Not Valid", 'appointment.name', datum['appointment'], this.appointments, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`locationName_${index}_is_valid}`, "Location Is Not Valid", 'location.name', datum['location'], this.locations, true));
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

/***/ 847280:
/*!************************************************************************************!*\
  !*** ./libs/web/case-procedure/shared/case-procedure.business-provider.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseProcedureBusinessProviderService": () => (/* binding */ CaseProcedureBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_case_procedure_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-case-procedure-excel-data.action */ 334687);
/* harmony import */ var _actions_create_case_procedure_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-case-procedure.action */ 23113);
/* harmony import */ var _actions_update_case_procedures_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-case-procedures.action */ 40832);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class CaseProcedureBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.CaseProcedureBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createCaseProcedure(input) {
    const action = new _actions_create_case_procedure_action__WEBPACK_IMPORTED_MODULE_2__.CreateCaseProcedureAction(input);
    action.Do(this);
    return action.response;
  }
  updateCaseProcedure(input, caseProcedureId) {
    const action = new _actions_update_case_procedures_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseProcedureAction(input, caseProcedureId);
    action.Do(this);
    return action.response;
  }
  importCaseProcedures(caseProcedures) {
    const updateCaseProceduresAction = new _actions_update_case_procedures_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCaseProceduresAction(caseProcedures);
    updateCaseProceduresAction.Do(this);
    return updateCaseProceduresAction.response;
  }
  validateCaseProcedureExcelData(excelData, legalCases, appointments, locations) {
    const validateCaseProcedureExcelDataAction = new _actions_validate_case_procedure_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateCaseProcedureExcelDataAction(excelData, legalCases, appointments, locations);
    validateCaseProcedureExcelDataAction.Do(this);
    return validateCaseProcedureExcelDataAction.response;
  }
}
CaseProcedureBusinessProviderService.ɵfac = function CaseProcedureBusinessProviderService_Factory(t) {
  return new (t || CaseProcedureBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
CaseProcedureBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: CaseProcedureBusinessProviderService,
  factory: CaseProcedureBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 648223:
/*!******************************************************************!*\
  !*** ./libs/web/case-procedure/shared/case-procedure.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseProcedureService": () => (/* binding */ CaseProcedureService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _case_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./case-procedure.business-provider.service */ 847280);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class CaseProcedureService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("CaseProcedureService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createCaseProcedure(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createCaseProcedure(filteredObj);
  }
  updateCaseProcedure(input, caseProcedureId) {
    return this.businessProvider.updateCaseProcedure(input, caseProcedureId);
  }
  importCaseProcedures(caseProcedures) {
    return this.businessProvider.importCaseProcedures(caseProcedures);
  }
  validateCaseProcedureExcelData(excelData, legalCases, appointments, locations) {
    return this.businessProvider.validateCaseProcedureExcelData(excelData, legalCases, appointments, locations);
  }
}
CaseProcedureService.ɵfac = function CaseProcedureService_Factory(t) {
  return new (t || CaseProcedureService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseProcedureBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_case_procedure_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CaseProcedureBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
CaseProcedureService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CaseProcedureService,
  factory: CaseProcedureService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 87804:
/*!****************************************************************!*\
  !*** ./libs/web/case-procedure/shared/case-procedure.store.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseProcedureFeatureStore": () => (/* binding */ WebCaseProcedureFeatureStore)
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
/* harmony import */ var _case_procedure_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./case-procedure.service */ 648223);














class WebCaseProcedureFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, caseProcedureService) {
    super({
      loading: false,
      caseProcedures: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      legalCaseId: undefined,
      appointmentId: undefined,
      locationId: undefined,
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
    this.caseProcedureService = caseProcedureService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.caseProcedures$ = this.select(s => s.caseProcedures);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.appointments$ = this.select(s => s.appointments || []);
    this.locations$ = this.select(s => s.locations || []);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.appointmentId$ = this.select(s => s.appointmentId);
    this.locationId$ = this.select(s => s.locationId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseProcedures$, this.legalCases$, this.appointments$, this.locations$, (errors, loading, item, formName, caseProcedures, legalCases, appointments, locations) => ({
      errors,
      loading,
      item,
      formName,
      caseProcedures,
      legalCases,
      appointments,
      locations
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.legalCaseId$, this.appointmentId$, this.locationId$, this.searchQuery$, (paging, legalCaseId, appointmentId, locationId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      legalCaseId: legalCaseId,
      appointmentId: appointmentId,
      locationId: locationId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
    }));
    this.setAppointmentId = this.updater((state, appointmentId) => Object.assign(Object.assign({}, state), {
      appointmentId
    }));
    this.setLocationId = this.updater((state, locationId) => Object.assign(Object.assign({}, state), {
      locationId
    }));
    this.setSelectedCaseProcedures = this.updater((state, selectedRows) => Object.assign(Object.assign({}, state), {
      selectedCaseProcedure: selectedRows
    }));
    this.filterLegalCases = term => this.data.userSelectLegalCases({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let legalCases = res.data.items;
      this.patchState({
        legalCases
      });
      return legalCases;
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
    this.filterLocations = term => this.data.userSelectLocations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let locations = res.data.items;
      this.patchState({
        locations
      });
      return locations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.addAppointment = this.updater((state, appointment) => Object.assign(Object.assign({}, state), {
      appointments: state.appointments.concat(appointment)
    }));
    this.addLocation = this.updater((state, location) => Object.assign(Object.assign({}, state), {
      locations: state.locations.concat(location)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewCaseProcedure = this.updater((state, caseProcedure) => Object.assign(Object.assign({}, state), {
      caseProcedures: [...state.caseProcedures, caseProcedure]
    }));
    this.updateCaseProcedure = this.updater((state, caseProcedure) => {
      return Object.assign(Object.assign({}, state), {
        caseProcedures: state.caseProcedures.map(el => {
          if (el.id === caseProcedure.id) {
            return caseProcedure;
          } else {
            return el;
          }
        })
      });
    });
    this.addCaseProcedures = this.updater((state, newCaseProcedures) => Object.assign(Object.assign({}, state), {
      caseProcedures: state.caseProcedures.concat(newCaseProcedures)
    }));
    this.updateCaseProcedures = this.updater((state, updatedCaseProcedures) => {
      return Object.assign(Object.assign({}, state), {
        caseProcedures: state.caseProcedures.map(caseProcedure => {
          const updated = updatedCaseProcedures.find(el => el.id === caseProcedure.id);
          return updated ? updated : caseProcedure;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadCaseProcedureEffect = this.effect(caseProcedureId$ => caseProcedureId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(caseProcedureId => this.data.userCaseProcedure({
      caseProcedureId
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
    this.loadCaseProceduresEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => {
      console.log('hit the load effect');
      return this.data.userSelectDetailCaseProcedures({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        console.log(res.data.items);
        this.patchState({
          paging: {
            limit: input.limit,
            skip: input.skip,
            total: res.data.count.total
          },
          caseProcedures: res.data.items,
          errors: res.errors,
          loading: false
        });
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.createCaseProcedureEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.caseProcedureService.createCaseProcedure(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseProcedure => {
      this.addNewCaseProcedure(caseProcedure);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: caseProcedure,
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
    this.updateCaseProcedureEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.caseProcedureService.updateCaseProcedure(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(caseProcedure => {
      this.updateCaseProcedure(caseProcedure);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: caseProcedure,
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
    this.deleteCaseProcedureEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, caseProcedure]) => {
      return this.data.userDeleteCaseProcedure({
        caseProcedureId: caseProcedure.id
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.toast.success('Deleted successfully!', {
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.caseProcedureService.importCaseProcedures(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addCaseProcedures(created);
      this.updateCaseProcedures(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('caseProcedureId')) {
      var caseProcedureId = this.route.snapshot.paramMap.get('caseProcedureId');
      this.setFormName('caseProcedure_edit');
    } else {
      this.setFormName('caseProcedure_create');
    }
    if (this.route.snapshot.paramMap.has('legalCaseId')) {
      var legalCaseId = this.route.snapshot.paramMap.get('legalCaseId');
      this.setLegalCaseId(legalCaseId);
    }
    if (this.route.snapshot.paramMap.has('appointmentId')) {
      var appointmentId = this.route.snapshot.paramMap.get('appointmentId');
      this.setAppointmentId(appointmentId);
    }
    if (this.route.snapshot.paramMap.has('locationId')) {
      var locationId = this.route.snapshot.paramMap.get('locationId');
      this.setLocationId(locationId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.caseProcedureService.validateCaseProcedureExcelData(excelData, vm.legalCases, vm.appointments, vm.locations);
    }));
  }
}
WebCaseProcedureFeatureStore.ɵfac = function WebCaseProcedureFeatureStore_Factory(t) {
  return new (t || WebCaseProcedureFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_procedure_service__WEBPACK_IMPORTED_MODULE_12__.CaseProcedureService));
};
WebCaseProcedureFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebCaseProcedureFeatureStore,
  factory: WebCaseProcedureFeatureStore.ɵfac
});

/***/ }),

/***/ 765132:
/*!***********************************************************************************!*\
  !*** ./libs/web/case-procedure/shared/rules/case-procedure-name-is-valid.rule.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseProcedureNameIsValidRule": () => (/* binding */ CaseProcedureNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CaseProcedureNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 69170:
/*!*******************************************************************************************!*\
  !*** ./libs/web/case-procedure/shared/rules/create-case-procedure-input-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCaseProcedureInputIsValidRule": () => (/* binding */ CreateCaseProcedureInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _case_procedure_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./case-procedure-name-is-valid.rule */ 765132);


class CreateCaseProcedureInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _case_procedure_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.CaseProcedureNameIsValidRule('name', 'The caseprocedure name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);