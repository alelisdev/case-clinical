"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_patient_shared_patient_store_ts"],{

/***/ 636654:
/*!******************************************************************!*\
  !*** ./libs/web/patient/shared/actions/create-patient.action.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePatientAction": () => (/* binding */ CreatePatientAction)
/* harmony export */ });
/* harmony import */ var _patient_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patient.business-action-base */ 571469);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_patient_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-patient-input-is-valid.rule */ 656304);




class CreatePatientAction extends _patient_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PatientBusinessActionBase {
  constructor(input) {
    super('CreatePatientAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_patient_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePatientInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePatient({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 571469:
/*!*************************************************************************!*\
  !*** ./libs/web/patient/shared/actions/patient.business-action-base.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatientBusinessActionBase": () => (/* binding */ PatientBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PatientBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 375558:
/*!*******************************************************************!*\
  !*** ./libs/web/patient/shared/actions/update-patients.action.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePatientAction": () => (/* binding */ UpdatePatientAction),
/* harmony export */   "UpdatePatientsAction": () => (/* binding */ UpdatePatientsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _patient_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patient.business-action-base */ 571469);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePatientsAction extends _patient_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PatientBusinessActionBase {
  constructor(patients) {
    super('UpdatePatientsAction');
    this.patients = patients;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.patients, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePatients({
      input: {
        patients: this.patients
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePatientAction extends _patient_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PatientBusinessActionBase {
  constructor(patient, patientId) {
    super('UpdatePatientAction');
    this.patient = patient;
    this.patientId = patientId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.patient, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.patientId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePatient({
      patientId: this.patientId,
      input: this.patient
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 440050:
/*!*******************************************************************************!*\
  !*** ./libs/web/patient/shared/actions/validate-patient-excel-data.action.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePatientExcelDataAction": () => (/* binding */ ValidatePatientExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _patient_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patient.business-action-base */ 571469);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePatientExcelDataAction extends _patient_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PatientBusinessActionBase {
  constructor(excelData, ethnicities, genders, languages) {
    super('ValidatePatientExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.ethnicities = ethnicities;
    this.genders = genders;
    this.languages = languages;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`ethnicityName_${index}_is_valid}`, "Ethnicity Is Not Valid", 'ethnicity.name', datum['ethnicity'], this.ethnicities, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`genderName_${index}_is_valid}`, "Gender Is Not Valid", 'gender.name', datum['gender'], this.genders, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`languageName_${index}_is_valid}`, "Language Is Not Valid", 'language.name', datum['language'], this.languages, true));
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

/***/ 120087:
/*!**********************************************************************!*\
  !*** ./libs/web/patient/shared/patient.business-provider.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatientBusinessProviderService": () => (/* binding */ PatientBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_patient_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-patient-excel-data.action */ 440050);
/* harmony import */ var _actions_create_patient_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-patient.action */ 636654);
/* harmony import */ var _actions_update_patients_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-patients.action */ 375558);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PatientBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PatientBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPatient(input) {
    const action = new _actions_create_patient_action__WEBPACK_IMPORTED_MODULE_2__.CreatePatientAction(input);
    action.Do(this);
    return action.response;
  }
  updatePatient(input, patientId) {
    const action = new _actions_update_patients_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePatientAction(input, patientId);
    action.Do(this);
    return action.response;
  }
  importPatients(patients) {
    const updatePatientsAction = new _actions_update_patients_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePatientsAction(patients);
    updatePatientsAction.Do(this);
    return updatePatientsAction.response;
  }
  validatePatientExcelData(excelData, ethnicities, genders, languages) {
    const validatePatientExcelDataAction = new _actions_validate_patient_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePatientExcelDataAction(excelData, ethnicities, genders, languages);
    validatePatientExcelDataAction.Do(this);
    return validatePatientExcelDataAction.response;
  }
}
PatientBusinessProviderService.ɵfac = function PatientBusinessProviderService_Factory(t) {
  return new (t || PatientBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PatientBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PatientBusinessProviderService,
  factory: PatientBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 840970:
/*!****************************************************!*\
  !*** ./libs/web/patient/shared/patient.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatientService": () => (/* binding */ PatientService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _patient_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./patient.business-provider.service */ 120087);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PatientService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PatientService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPatient(input) {
    var _a, _b, _c, _d;
    input.notes = ((_a = input.notes) === null || _a === void 0 ? void 0 : _a.length) > 1000 ? (_b = input.notes) === null || _b === void 0 ? void 0 : _b.substring(0, 999) : input.notes;
    input.debtorRemarks = ((_c = input.debtorRemarks) === null || _c === void 0 ? void 0 : _c.length) > 1000 ? (_d = input.debtorRemarks) === null || _d === void 0 ? void 0 : _d.substring(0, 999) : input.debtorRemarks;
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPatient(filteredObj);
  }
  updatePatient(input, patientId) {
    var _a, _b, _c, _d;
    input.notes = ((_a = input.notes) === null || _a === void 0 ? void 0 : _a.length) > 1000 ? (_b = input.notes) === null || _b === void 0 ? void 0 : _b.substring(0, 999) : input.notes;
    input.debtorRemarks = ((_c = input.debtorRemarks) === null || _c === void 0 ? void 0 : _c.length) > 1000 ? (_d = input.debtorRemarks) === null || _d === void 0 ? void 0 : _d.substring(0, 999) : input.debtorRemarks;
    return this.businessProvider.updatePatient(input, patientId);
  }
  importPatients(patients) {
    return this.businessProvider.importPatients(patients);
  }
  validatePatientExcelData(excelData, ethnicities, genders, languages) {
    return this.businessProvider.validatePatientExcelData(excelData, ethnicities, genders, languages);
  }
}
PatientService.ɵfac = function PatientService_Factory(t) {
  return new (t || PatientService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_patient_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PatientBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_patient_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PatientBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PatientService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PatientService,
  factory: PatientService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 949657:
/*!**************************************************!*\
  !*** ./libs/web/patient/shared/patient.store.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientFeatureStore": () => (/* binding */ WebPatientFeatureStore)
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
/* harmony import */ var _patient_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./patient.service */ 840970);














class WebPatientFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, patientService) {
    super({
      loading: false,
      patients: [],
      done: false,
      searchQuery: '',
      memberRegistrationNumber: undefined,
      formName: undefined,
      ethnicityId: undefined,
      genderId: undefined,
      languageId: undefined,
      clinicalProviderId: undefined,
      locationId: undefined,
      vendorLocationId: undefined,
      isAllPatients: false,
      fromDate: undefined,
      toDate: undefined,
      paging: {
        limit: 10000,
        skip: 0
      },
      mrn: undefined
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.formService = formService;
    this.patientService = patientService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.isAllPatients$ = this.select(s => s.isAllPatients);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.patients$ = this.select(s => s.patients);
    this.ethnicities$ = this.select(s => s.ethnicities || []);
    this.genders$ = this.select(s => s.genders || []);
    this.languages$ = this.select(s => s.languages || []);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.locationId$ = this.select(s => s.locationId);
    this.ethnicityId$ = this.select(s => s.ethnicityId);
    this.genderId$ = this.select(s => s.genderId);
    this.languageId$ = this.select(s => s.languageId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.memberRegistrationNumber$ = this.select(s => s.memberRegistrationNumber);
    this.fromDate$ = this.select(s => s.fromDate);
    this.toDate$ = this.select(s => s.toDate);
    this.vendorLocationId$ = this.select(s => s.vendorLocationId);
    this.formName$ = this.select(s => s.formName);
    this.mrn$ = this.select(s => s.mrn);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.patients$, this.ethnicities$, this.genders$, this.languages$, (errors, loading, item, formName, patients, ethnicities, genders, languages) => ({
      errors,
      loading,
      item,
      formName,
      patients,
      ethnicities,
      genders,
      languages
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.ethnicityId$, this.genderId$, this.clinicalProviderId$, this.locationId$, this.vendorLocationId$, this.languageId$, this.searchQuery$, this.memberRegistrationNumber$, this.fromDate$, this.toDate$, this.isAllPatients$, this.mrn$, (paging, ethnicityId, genderId, clinicalProviderId, locationId, vendorLocationId, languageId, searchQuery, memberRegistrationNumber, fromDate, toDate, isAllPatients, medicalRecordNumber) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      ethnicityId: ethnicityId,
      genderId: genderId,
      languageId: languageId,
      total: paging.total,
      clinicalProviderId: clinicalProviderId,
      locationId: locationId,
      vendorLocationId: vendorLocationId,
      memberRegistrationNumber: memberRegistrationNumber,
      fromDate: fromDate,
      toDate: toDate,
      medicalRecordNumber,
      isAllPatients: isAllPatients
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setEthnicityId = this.updater((state, ethnicityId) => Object.assign(Object.assign({}, state), {
      ethnicityId
    }));
    this.setIsAllPatients = this.updater((state, isAllPatients) => Object.assign(Object.assign({}, state), {
      isAllPatients
    }));
    this.setmedicalRecordNumber = this.updater((state, mrn) => Object.assign(Object.assign({}, state), {
      mrn
    }));
    this.setGenderId = this.updater((state, genderId) => Object.assign(Object.assign({}, state), {
      genderId
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.setLocationId = this.updater((state, locationId) => Object.assign(Object.assign({}, state), {
      locationId
    }));
    this.setVendorLocationId = this.updater((state, vendorLocationId) => Object.assign(Object.assign({}, state), {
      vendorLocationId
    }));
    this.setLanguageId = this.updater((state, languageId) => Object.assign(Object.assign({}, state), {
      languageId
    }));
    this.setLimit = this.updater((state, limit) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        limit
      })
    }));
    this.setSkip = this.updater((state, skip) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        skip
      })
    }));
    this.filterEthnicities = term => this.data.userSelectEthnicities({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let ethnicities = res.data.items;
      this.patchState({
        ethnicities
      });
      return ethnicities;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterGenders = term => this.data.userSelectGenders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let genders = res.data.items;
      this.patchState({
        genders
      });
      return genders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterLanguages = term => this.data.userSelectLanguages({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let languages = res.data.items;
      this.patchState({
        languages
      });
      return languages;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addEthnicity = this.updater((state, ethnicity) => Object.assign(Object.assign({}, state), {
      ethnicities: state.ethnicities.concat(ethnicity)
    }));
    this.addGender = this.updater((state, gender) => Object.assign(Object.assign({}, state), {
      genders: state.genders.concat(gender)
    }));
    this.addLanguage = this.updater((state, language) => Object.assign(Object.assign({}, state), {
      languages: state.languages.concat(language)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: [...state.patients, patient]
    }));
    this.updatePatient = this.updater((state, patient) => {
      return Object.assign(Object.assign({}, state), {
        patients: state.patients.map(el => {
          return el.id === patient.id ? patient : el;
        })
      });
    });
    this.addPatients = this.updater((state, newPatients) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(newPatients)
    }));
    this.updatePatients = this.updater((state, updatedPatients) => {
      return Object.assign(Object.assign({}, state), {
        patients: state.patients.map(patient => {
          const updated = updatedPatients.find(el => el.id === patient.id);
          return updated ? updated : patient;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.setMemberRegistrationNumber = this.updater((state, memberRegistrationNumber) => Object.assign(Object.assign({}, state), {
      memberRegistrationNumber
    }));
    this.setFromDate = this.updater((state, fromDate) => Object.assign(Object.assign({}, state), {
      fromDate
    }));
    this.setToDate = this.updater((state, toDate) => Object.assign(Object.assign({}, state), {
      toDate
    }));
    this.loadPatientEffect = this.effect(patientId$ => patientId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(patientId => this.data.userPatient({
      patientId
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
    this.loadPatientsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPatients({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      console.log('Skip:::::', res);
      return this.patchState({
        paging: {
          limit: input.limit,
          skip: input.skip,
          total: res.data.count.total
        },
        patients: res.data.items,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPatientEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.patientService.createPatient(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(patient => {
      this.addNewPatient(patient);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: patient,
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
    this.updatePatientEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => {
      return this.patientService.updatePatient(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(patient => {
        this.updatePatient(patient);
        this.toast.success('Updated Successfully!');
        setTimeout(() => this.patchState({
          item: patient,
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
    this.deletePatientEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, patient]) => {
      return this.data.userDeletePatient({
        patientId: patient.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.patientService.importPatients(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPatients(created);
      this.updatePatients(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('patientId')) {
      var patientId = this.route.snapshot.paramMap.get('patientId');
      this.setFormName('patient_edit');
    } else {
      this.setFormName('patient_create');
    }
    if (this.route.snapshot.paramMap.has('ethnicityId')) {
      var ethnicityId = this.route.snapshot.paramMap.get('ethnicityId');
      this.setEthnicityId(ethnicityId);
    }
    if (this.route.snapshot.paramMap.has('genderId')) {
      var genderId = this.route.snapshot.paramMap.get('genderId');
      this.setGenderId(genderId);
    }
    if (this.route.snapshot.paramMap.has('languageId')) {
      var languageId = this.route.snapshot.paramMap.get('languageId');
      this.setLanguageId(languageId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.patientService.validatePatientExcelData(excelData, vm.ethnicities, vm.genders, vm.languages);
    }));
  }
}
WebPatientFeatureStore.ɵfac = function WebPatientFeatureStore_Factory(t) {
  return new (t || WebPatientFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_patient_service__WEBPACK_IMPORTED_MODULE_12__.PatientService));
};
WebPatientFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPatientFeatureStore,
  factory: WebPatientFeatureStore.ɵfac
});

/***/ }),

/***/ 656304:
/*!*****************************************************************************!*\
  !*** ./libs/web/patient/shared/rules/create-patient-input-is-valid.rule.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePatientInputIsValidRule": () => (/* binding */ CreatePatientInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _patient_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patient-name-is-valid.rule */ 542517);


class CreatePatientInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _patient_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PatientNameIsValidRule('name', 'The patient name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 542517:
/*!*********************************************************************!*\
  !*** ./libs/web/patient/shared/rules/patient-name-is-valid.rule.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PatientNameIsValidRule": () => (/* binding */ PatientNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PatientNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);