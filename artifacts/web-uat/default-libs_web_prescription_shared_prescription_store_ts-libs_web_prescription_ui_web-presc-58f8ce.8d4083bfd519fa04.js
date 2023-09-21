"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prescription_shared_prescription_store_ts-libs_web_prescription_ui_web-presc-58f8ce"],{

/***/ 463506:
/*!****************************************************************************!*\
  !*** ./libs/web/prescription/shared/actions/create-prescription.action.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePrescriptionAction": () => (/* binding */ CreatePrescriptionAction)
/* harmony export */ });
/* harmony import */ var _prescription_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prescription.business-action-base */ 69950);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prescription_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prescription-input-is-valid.rule */ 559018);




class CreatePrescriptionAction extends _prescription_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PrescriptionBusinessActionBase {
  constructor(input) {
    super('CreatePrescriptionAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prescription_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePrescriptionInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePrescription({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 69950:
/*!***********************************************************************************!*\
  !*** ./libs/web/prescription/shared/actions/prescription.business-action-base.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrescriptionBusinessActionBase": () => (/* binding */ PrescriptionBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PrescriptionBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 980470:
/*!*****************************************************************************!*\
  !*** ./libs/web/prescription/shared/actions/update-prescriptions.action.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePrescriptionAction": () => (/* binding */ UpdatePrescriptionAction),
/* harmony export */   "UpdatePrescriptionsAction": () => (/* binding */ UpdatePrescriptionsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prescription_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prescription.business-action-base */ 69950);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePrescriptionsAction extends _prescription_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PrescriptionBusinessActionBase {
  constructor(prescriptions) {
    super('UpdatePrescriptionsAction');
    this.prescriptions = prescriptions;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.prescriptions, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePrescriptions({
      input: {
        prescriptions: this.prescriptions
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePrescriptionAction extends _prescription_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PrescriptionBusinessActionBase {
  constructor(prescription, prescriptionId) {
    super('UpdatePrescriptionAction');
    this.prescription = prescription;
    this.prescriptionId = prescriptionId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.prescription, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.prescriptionId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePrescription({
      prescriptionId: this.prescriptionId,
      input: this.prescription
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 8826:
/*!*****************************************************************************************!*\
  !*** ./libs/web/prescription/shared/actions/validate-prescription-excel-data.action.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePrescriptionExcelDataAction": () => (/* binding */ ValidatePrescriptionExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prescription_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prescription.business-action-base */ 69950);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePrescriptionExcelDataAction extends _prescription_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PrescriptionBusinessActionBase {
  constructor(excelData, patients, documents) {
    super('ValidatePrescriptionExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.patients = patients;
    this.documents = documents;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`documentName_${index}_is_valid}`, "Document Is Not Valid", 'document.name', datum['document'], this.documents, true));
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

/***/ 778667:
/*!********************************************************************************!*\
  !*** ./libs/web/prescription/shared/prescription.business-provider.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrescriptionBusinessProviderService": () => (/* binding */ PrescriptionBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prescription_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prescription-excel-data.action */ 8826);
/* harmony import */ var _actions_create_prescription_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prescription.action */ 463506);
/* harmony import */ var _actions_update_prescriptions_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prescriptions.action */ 980470);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PrescriptionBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PrescriptionBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPrescription(input) {
    const action = new _actions_create_prescription_action__WEBPACK_IMPORTED_MODULE_2__.CreatePrescriptionAction(input);
    action.Do(this);
    return action.response;
  }
  updatePrescription(input, prescriptionId) {
    const action = new _actions_update_prescriptions_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePrescriptionAction(input, prescriptionId);
    action.Do(this);
    return action.response;
  }
  importPrescriptions(prescriptions) {
    const updatePrescriptionsAction = new _actions_update_prescriptions_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePrescriptionsAction(prescriptions);
    updatePrescriptionsAction.Do(this);
    return updatePrescriptionsAction.response;
  }
  validatePrescriptionExcelData(excelData, patients, documents) {
    const validatePrescriptionExcelDataAction = new _actions_validate_prescription_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePrescriptionExcelDataAction(excelData, patients, documents);
    validatePrescriptionExcelDataAction.Do(this);
    return validatePrescriptionExcelDataAction.response;
  }
}
PrescriptionBusinessProviderService.ɵfac = function PrescriptionBusinessProviderService_Factory(t) {
  return new (t || PrescriptionBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PrescriptionBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PrescriptionBusinessProviderService,
  factory: PrescriptionBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 328646:
/*!**************************************************************!*\
  !*** ./libs/web/prescription/shared/prescription.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrescriptionService": () => (/* binding */ PrescriptionService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prescription_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prescription.business-provider.service */ 778667);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PrescriptionService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PrescriptionService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPrescription(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPrescription(filteredObj);
  }
  updatePrescription(input, prescriptionId) {
    return this.businessProvider.updatePrescription(input, prescriptionId);
  }
  importPrescriptions(prescriptions) {
    return this.businessProvider.importPrescriptions(prescriptions);
  }
  validatePrescriptionExcelData(excelData, patients, documents) {
    return this.businessProvider.validatePrescriptionExcelData(excelData, patients, documents);
  }
}
PrescriptionService.ɵfac = function PrescriptionService_Factory(t) {
  return new (t || PrescriptionService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prescription_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PrescriptionBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prescription_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PrescriptionBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PrescriptionService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PrescriptionService,
  factory: PrescriptionService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 499909:
/*!************************************************************!*\
  !*** ./libs/web/prescription/shared/prescription.store.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPrescriptionFeatureStore": () => (/* binding */ WebPrescriptionFeatureStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 670262);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _prescription_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./prescription.service */ 328646);















class WebPrescriptionFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.ComponentStore {
  constructor(data, router, route, toast, formService, prescriptionService) {
    super({
      loading: false,
      prescriptions: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      patientId: undefined,
      documentId: undefined,
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
    this.prescriptionService = prescriptionService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.prescriptions$ = this.select(s => {
      const sortedPrescriptions = s.prescriptions;
      console.log('-----------------');
      sortedPrescriptions.sort((prescription1, prescription2) => {
        if (moment__WEBPACK_IMPORTED_MODULE_0__(prescription1.createdAt).isBefore(moment__WEBPACK_IMPORTED_MODULE_0__(prescription2.createdAt))) {
          return 1;
        } else return -1;
      });
      return sortedPrescriptions;
    });
    this.patients$ = this.select(s => s.patients || []);
    this.documents$ = this.select(s => s.documents || []);
    this.patientId$ = this.select(s => s.patientId);
    this.documentId$ = this.select(s => s.documentId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.prescriptions$, this.patients$, this.documents$, (errors, loading, item, formName, prescriptions, patients, documents) => ({
      errors,
      loading,
      item,
      formName,
      prescriptions,
      patients,
      documents
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.patientId$, this.documentId$, this.searchQuery$, (paging, patientId, documentId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      patientId: patientId,
      documentId: documentId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setPatientId = this.updater((state, patientId) => Object.assign(Object.assign({}, state), {
      patientId
    }));
    this.setDocumentId = this.updater((state, documentId) => Object.assign(Object.assign({}, state), {
      documentId
    }));
    this.setSkip = this.updater((state, skip) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        skip: skip
      })
    }));
    this.setLimit = this.updater((state, limit) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        limit: limit
      })
    }));
    this.filterPatients = term => this.data.userSelectPatients({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
      const patients = res.data.items;
      this.patchState({
        patients
      });
      return patients;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(result => {
      return result.data.items;
    }));
    this.filterDocuments = term => this.data.userSelectDocuments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
      const documents = res.data.items;
      this.patchState({
        documents
      });
      return documents;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(result => {
      return result.data.items;
    }));
    this.addPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(patient)
    }));
    this.addDocument = this.updater((state, document) => Object.assign(Object.assign({}, state), {
      documents: state.documents.concat(document)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPrescription = this.updater((state, prescription) => Object.assign(Object.assign({}, state), {
      prescriptions: [...state.prescriptions, prescription]
    }));
    this.updatePrescription = this.updater((state, prescription) => {
      return Object.assign(Object.assign({}, state), {
        prescriptions: state.prescriptions.map(el => {
          if (el.id === prescription.id) {
            return prescription;
          } else {
            return el;
          }
        })
      });
    });
    this.addPrescriptions = this.updater((state, newPrescriptions) => Object.assign(Object.assign({}, state), {
      prescriptions: state.prescriptions.concat(newPrescriptions)
    }));
    this.updatePrescriptions = this.updater((state, updatedPrescriptions) => {
      return Object.assign(Object.assign({}, state), {
        prescriptions: state.prescriptions.map(prescription => {
          const updated = updatedPrescriptions.find(el => el.id === prescription.id);
          return updated ? updated : prescription;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPrescriptionEffect = this.effect(prescriptionId$ => prescriptionId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(prescriptionId => this.data.userPrescription({
      prescriptionId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
      this.patchState({
        item: res.data.item,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadPrescriptionsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(([_, input]) => this.data.userPrescriptions({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      prescriptions: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPrescriptionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(input => this.prescriptionService.createPrescription(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(prescription => {
      this.addNewPrescription(prescription);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: prescription,
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
    this.updatePrescriptionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(([input, item]) => this.prescriptionService.updatePrescription(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(prescription => {
      this.updatePrescription(prescription);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: prescription,
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
    this.deletePrescriptionEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(([_, prescription]) => {
      return this.data.userDeletePrescription({
        prescriptionId: prescription.id
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => {
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
    this.importExcelEffect = this.effect($data => $data.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(data => this.prescriptionService.importPrescriptions(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
      var _a;
      this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
        duration: 3000
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_7__.EMPTY;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(updateResult => {
      const created = JSON.parse(updateResult.created);
      const updated = JSON.parse(updateResult.updated);
      const failed = JSON.parse(updateResult.failed);
      const total = created.length + updated.length + failed.length;
      this.addPrescriptions(created);
      this.updatePrescriptions(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('prescriptionId')) {
      const prescriptionId = this.route.snapshot.paramMap.get('prescriptionId');
      this.setFormName('prescription_edit');
    } else {
      this.setFormName('prescription_create');
    }
    if (this.route.snapshot.paramMap.has('patientId')) {
      const patientId = this.route.snapshot.paramMap.get('patientId');
      this.setPatientId(patientId);
    }
    if (this.route.snapshot.paramMap.has('documentId')) {
      const documentId = this.route.snapshot.paramMap.get('documentId');
      this.setDocumentId(documentId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(vm => {
      return this.prescriptionService.validatePrescriptionExcelData(excelData, vm.patients, vm.documents);
    }));
  }
}
WebPrescriptionFeatureStore.ɵfac = function WebPrescriptionFeatureStore_Factory(t) {
  return new (t || WebPrescriptionFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_9__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_11__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_12__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_prescription_service__WEBPACK_IMPORTED_MODULE_13__.PrescriptionService));
};
WebPrescriptionFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: WebPrescriptionFeatureStore,
  factory: WebPrescriptionFeatureStore.ɵfac
});

/***/ }),

/***/ 559018:
/*!***************************************************************************************!*\
  !*** ./libs/web/prescription/shared/rules/create-prescription-input-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePrescriptionInputIsValidRule": () => (/* binding */ CreatePrescriptionInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prescription_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prescription-name-is-valid.rule */ 804996);


class CreatePrescriptionInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prescription_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PrescriptionNameIsValidRule('name', 'The prescription name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 804996:
/*!*******************************************************************************!*\
  !*** ./libs/web/prescription/shared/rules/prescription-name-is-valid.rule.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrescriptionNameIsValidRule": () => (/* binding */ PrescriptionNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PrescriptionNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 950319:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/prescription/ui/web-prescription-select-form/web-prescription-select-table-view.component.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPrescriptionSelectTableViewComponent": () => (/* binding */ WebPrescriptionSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPrescriptionSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.prescriptions = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'patient.name',
      headerName: 'Patient',
      filter: 'agTextColumnFilter'
    }, {
      field: 'document.name',
      headerName: 'Document',
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
      field: 'medicalProvider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'dateWritten',
      filter: 'agDateColumnFilter'
    }, {
      field: 'days',
      filter: 'agTextColumnFilter'
    }, {
      field: 'note',
      filter: 'agTextColumnFilter'
    }, {
      field: 'category',
      filter: 'agTextColumnFilter'
    }, {
      field: 'kind',
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
      field: 'refills',
      filter: 'agTextColumnFilter'
    }, {
      field: 'rxNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'sig',
      filter: 'agTextColumnFilter'
    }, {
      field: 'strength',
      filter: 'agTextColumnFilter'
    }, {
      field: 'unit',
      filter: 'agTextColumnFilter'
    }, {
      field: 'patientId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'documentId',
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
WebPrescriptionSelectTableViewComponent.ɵfac = function WebPrescriptionSelectTableViewComponent_Factory(t) {
  return new (t || WebPrescriptionSelectTableViewComponent)();
};
WebPrescriptionSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPrescriptionSelectTableViewComponent,
  selectors: [["ui-prescription-select-table-view"]],
  viewQuery: function WebPrescriptionSelectTableViewComponent_Query(rf, ctx) {
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
    prescriptions: "prescriptions"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPrescriptionSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPrescriptionSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPrescriptionSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.prescriptions)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);