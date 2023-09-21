"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_patient-treatment-status_shared_patient-treatment-status_store_ts"],{

/***/ 682667:
/*!****************************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/actions/create-patient-treatment-status.action.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePatientTreatmentStatusAction": () => (/* binding */ CreatePatientTreatmentStatusAction)
/* harmony export */ });
/* harmony import */ var _patient_treatment_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patient-treatment-status.business-action-base */ 452024);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_patient_treatment_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-patient-treatment-status-input-is-valid.rule */ 623501);




class CreatePatientTreatmentStatusAction extends _patient_treatment_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PatientTreatmentStatusBusinessActionBase {
  constructor(input) {
    super('CreatePatientTreatmentStatusAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_patient_treatment_status_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePatientTreatmentStatusInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePatientTreatmentStatus({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 452024:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/actions/patient-treatment-status.business-action-base.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatientTreatmentStatusBusinessActionBase": () => (/* binding */ PatientTreatmentStatusBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PatientTreatmentStatusBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 255789:
/*!******************************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/actions/update-patient-treatment-statuses.action.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePatientTreatmentStatusAction": () => (/* binding */ UpdatePatientTreatmentStatusAction),
/* harmony export */   "UpdatePatientTreatmentStatusesAction": () => (/* binding */ UpdatePatientTreatmentStatusesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _patient_treatment_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patient-treatment-status.business-action-base */ 452024);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePatientTreatmentStatusesAction extends _patient_treatment_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PatientTreatmentStatusBusinessActionBase {
  constructor(patientTreatmentStatuses) {
    super('UpdatePatientTreatmentStatusesAction');
    this.patientTreatmentStatuses = patientTreatmentStatuses;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.patientTreatmentStatuses, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePatientTreatmentStatuses({
      input: {
        patientTreatmentStatuses: this.patientTreatmentStatuses
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePatientTreatmentStatusAction extends _patient_treatment_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PatientTreatmentStatusBusinessActionBase {
  constructor(patientTreatmentStatus, patientTreatmentStatusId) {
    super('UpdatePatientTreatmentStatusAction');
    this.patientTreatmentStatus = patientTreatmentStatus;
    this.patientTreatmentStatusId = patientTreatmentStatusId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.patientTreatmentStatus, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.patientTreatmentStatusId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePatientTreatmentStatus({
      patientTreatmentStatusId: this.patientTreatmentStatusId,
      input: this.patientTreatmentStatus
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 426924:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/actions/validate-patient-treatment-status-excel-data.action.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePatientTreatmentStatusExcelDataAction": () => (/* binding */ ValidatePatientTreatmentStatusExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _patient_treatment_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patient-treatment-status.business-action-base */ 452024);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePatientTreatmentStatusExcelDataAction extends _patient_treatment_status_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PatientTreatmentStatusBusinessActionBase {
  constructor(excelData) {
    super('ValidatePatientTreatmentStatusExcelDataAction');
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

/***/ 68390:
/*!********************************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/patient-treatment-status.business-provider.service.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatientTreatmentStatusBusinessProviderService": () => (/* binding */ PatientTreatmentStatusBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_patient_treatment_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-patient-treatment-status-excel-data.action */ 426924);
/* harmony import */ var _actions_create_patient_treatment_status_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-patient-treatment-status.action */ 682667);
/* harmony import */ var _actions_update_patient_treatment_statuses_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-patient-treatment-statuses.action */ 255789);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PatientTreatmentStatusBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PatientTreatmentStatusBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPatientTreatmentStatus(input) {
    const action = new _actions_create_patient_treatment_status_action__WEBPACK_IMPORTED_MODULE_2__.CreatePatientTreatmentStatusAction(input);
    action.Do(this);
    return action.response;
  }
  updatePatientTreatmentStatus(input, patientTreatmentStatusId) {
    const action = new _actions_update_patient_treatment_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePatientTreatmentStatusAction(input, patientTreatmentStatusId);
    action.Do(this);
    return action.response;
  }
  importPatientTreatmentStatuses(patientTreatmentStatuses) {
    const updatePatientTreatmentStatusesAction = new _actions_update_patient_treatment_statuses_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePatientTreatmentStatusesAction(patientTreatmentStatuses);
    updatePatientTreatmentStatusesAction.Do(this);
    return updatePatientTreatmentStatusesAction.response;
  }
  validatePatientTreatmentStatusExcelData(excelData) {
    const validatePatientTreatmentStatusExcelDataAction = new _actions_validate_patient_treatment_status_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePatientTreatmentStatusExcelDataAction(excelData);
    validatePatientTreatmentStatusExcelDataAction.Do(this);
    return validatePatientTreatmentStatusExcelDataAction.response;
  }
}
PatientTreatmentStatusBusinessProviderService.ɵfac = function PatientTreatmentStatusBusinessProviderService_Factory(t) {
  return new (t || PatientTreatmentStatusBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PatientTreatmentStatusBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PatientTreatmentStatusBusinessProviderService,
  factory: PatientTreatmentStatusBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 624877:
/*!**************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/patient-treatment-status.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatientTreatmentStatusService": () => (/* binding */ PatientTreatmentStatusService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _patient_treatment_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./patient-treatment-status.business-provider.service */ 68390);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PatientTreatmentStatusService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PatientTreatmentStatusService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPatientTreatmentStatus(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPatientTreatmentStatus(filteredObj);
  }
  updatePatientTreatmentStatus(input, patientTreatmentStatusId) {
    return this.businessProvider.updatePatientTreatmentStatus(input, patientTreatmentStatusId);
  }
  importPatientTreatmentStatuses(patientTreatmentStatuses) {
    return this.businessProvider.importPatientTreatmentStatuses(patientTreatmentStatuses);
  }
  validatePatientTreatmentStatusExcelData(excelData) {
    return this.businessProvider.validatePatientTreatmentStatusExcelData(excelData);
  }
}
PatientTreatmentStatusService.ɵfac = function PatientTreatmentStatusService_Factory(t) {
  return new (t || PatientTreatmentStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_patient_treatment_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PatientTreatmentStatusBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_patient_treatment_status_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PatientTreatmentStatusBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PatientTreatmentStatusService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PatientTreatmentStatusService,
  factory: PatientTreatmentStatusService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 997203:
/*!************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/patient-treatment-status.store.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientTreatmentStatusFeatureStore": () => (/* binding */ WebPatientTreatmentStatusFeatureStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 670262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _patient_treatment_status_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./patient-treatment-status.service */ 624877);














class WebPatientTreatmentStatusFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, patientTreatmentStatusService) {
    super({
      loading: false,
      patientTreatmentStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,
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
    this.patientTreatmentStatusService = patientTreatmentStatusService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.patientTreatmentStatuses$ = this.select(s => s.patientTreatmentStatuses);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.patientTreatmentStatuses$, (errors, loading, item, formName, patientTreatmentStatuses) => ({
      errors,
      loading,
      item,
      formName,
      patientTreatmentStatuses
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPatientTreatmentStatus = this.updater((state, patientTreatmentStatus) => Object.assign(Object.assign({}, state), {
      patientTreatmentStatuses: [...state.patientTreatmentStatuses, patientTreatmentStatus]
    }));
    this.updatePatientTreatmentStatus = this.updater((state, patientTreatmentStatus) => {
      return Object.assign(Object.assign({}, state), {
        patientTreatmentStatuses: state.patientTreatmentStatuses.map(el => {
          if (el.id === patientTreatmentStatus.id) {
            return patientTreatmentStatus;
          } else {
            return el;
          }
        })
      });
    });
    this.addPatientTreatmentStatuses = this.updater((state, newPatientTreatmentStatuses) => Object.assign(Object.assign({}, state), {
      patientTreatmentStatuses: state.patientTreatmentStatuses.concat(newPatientTreatmentStatuses)
    }));
    this.updatePatientTreatmentStatuses = this.updater((state, updatedPatientTreatmentStatuses) => {
      return Object.assign(Object.assign({}, state), {
        patientTreatmentStatuses: state.patientTreatmentStatuses.map(patientTreatmentStatus => {
          const updated = updatedPatientTreatmentStatuses.find(el => el.id === patientTreatmentStatus.id);
          return updated ? updated : patientTreatmentStatus;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPatientTreatmentStatusEffect = this.effect(patientTreatmentStatusId$ => patientTreatmentStatusId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(patientTreatmentStatusId => this.data.userPatientTreatmentStatus({
      patientTreatmentStatusId
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
    this.loadPatientTreatmentStatusesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userPatientTreatmentStatuses({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      patientTreatmentStatuses: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPatientTreatmentStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.patientTreatmentStatusService.createPatientTreatmentStatus(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(patientTreatmentStatus => {
      this.addNewPatientTreatmentStatus(patientTreatmentStatus);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: patientTreatmentStatus,
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
    this.updatePatientTreatmentStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.patientTreatmentStatusService.updatePatientTreatmentStatus(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(patientTreatmentStatus => {
      this.updatePatientTreatmentStatus(patientTreatmentStatus);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: patientTreatmentStatus,
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
    this.deletePatientTreatmentStatusEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, patientTreatmentStatus]) => {
      return this.data.userDeletePatientTreatmentStatus({
        patientTreatmentStatusId: patientTreatmentStatus.id
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
    this.importExcelEffect = this.effect($data => $data.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.patientTreatmentStatusService.importPatientTreatmentStatuses(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      var _a;
      this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
        duration: 3000
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_5__.EMPTY;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(updateResult => {
      const created = JSON.parse(updateResult.created);
      const updated = JSON.parse(updateResult.updated);
      const failed = JSON.parse(updateResult.failed);
      const total = created.length + updated.length + failed.length;
      this.addPatientTreatmentStatuses(created);
      this.updatePatientTreatmentStatuses(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('patientTreatmentStatusId')) {
      var patientTreatmentStatusId = this.route.snapshot.paramMap.get('patientTreatmentStatusId');
      this.setFormName('patientTreatmentStatus_edit');
    } else {
      this.setFormName('patientTreatmentStatus_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.patientTreatmentStatusService.validatePatientTreatmentStatusExcelData(excelData);
    }));
  }
}
WebPatientTreatmentStatusFeatureStore.ɵfac = function WebPatientTreatmentStatusFeatureStore_Factory(t) {
  return new (t || WebPatientTreatmentStatusFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_patient_treatment_status_service__WEBPACK_IMPORTED_MODULE_11__.PatientTreatmentStatusService));
};
WebPatientTreatmentStatusFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebPatientTreatmentStatusFeatureStore,
  factory: WebPatientTreatmentStatusFeatureStore.ɵfac
});

/***/ }),

/***/ 623501:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/rules/create-patient-treatment-status-input-is-valid.rule.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePatientTreatmentStatusInputIsValidRule": () => (/* binding */ CreatePatientTreatmentStatusInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _patient_treatment_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patient-treatment-status-name-is-valid.rule */ 244663);


class CreatePatientTreatmentStatusInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _patient_treatment_status_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PatientTreatmentStatusNameIsValidRule('name', 'The patienttreatmentstatus name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 244663:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/patient-treatment-status/shared/rules/patient-treatment-status-name-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatientTreatmentStatusNameIsValidRule": () => (/* binding */ PatientTreatmentStatusNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PatientTreatmentStatusNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);