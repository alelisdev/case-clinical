"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_legal-case_shared_legal-case_store_ts"],{

/***/ 83105:
/*!************************************************************************!*\
  !*** ./libs/web/legal-case/shared/actions/create-legal-case.action.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateLegalCaseAction": () => (/* binding */ CreateLegalCaseAction)
/* harmony export */ });
/* harmony import */ var _legal_case_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legal-case.business-action-base */ 185872);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_legal_case_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-legal-case-input-is-valid.rule */ 16205);




class CreateLegalCaseAction extends _legal_case_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LegalCaseBusinessActionBase {
  constructor(input) {
    super('CreateLegalCaseAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_legal_case_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateLegalCaseInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateLegalCase({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 185872:
/*!*******************************************************************************!*\
  !*** ./libs/web/legal-case/shared/actions/legal-case.business-action-base.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LegalCaseBusinessActionBase": () => (/* binding */ LegalCaseBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class LegalCaseBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 603852:
/*!*************************************************************************!*\
  !*** ./libs/web/legal-case/shared/actions/update-legal-cases.action.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateLegalCaseAction": () => (/* binding */ UpdateLegalCaseAction),
/* harmony export */   "UpdateLegalCasesAction": () => (/* binding */ UpdateLegalCasesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _legal_case_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legal-case.business-action-base */ 185872);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateLegalCasesAction extends _legal_case_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LegalCaseBusinessActionBase {
  constructor(legalCases) {
    super('UpdateLegalCasesAction');
    this.legalCases = legalCases;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.legalCases, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateLegalCases({
      input: {
        legalCases: this.legalCases
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateLegalCaseAction extends _legal_case_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LegalCaseBusinessActionBase {
  constructor(legalCase, legalCaseId) {
    super('UpdateLegalCaseAction');
    this.legalCase = legalCase;
    this.legalCaseId = legalCaseId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.legalCase, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.legalCaseId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateLegalCase({
      legalCaseId: this.legalCaseId,
      input: this.legalCase
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 295735:
/*!*************************************************************************************!*\
  !*** ./libs/web/legal-case/shared/actions/validate-legal-case-excel-data.action.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateLegalCaseExcelDataAction": () => (/* binding */ ValidateLegalCaseExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _legal_case_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legal-case.business-action-base */ 185872);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateLegalCaseExcelDataAction extends _legal_case_business_action_base__WEBPACK_IMPORTED_MODULE_1__.LegalCaseBusinessActionBase {
  constructor(excelData, accidentTypes, patients, medLevels, firms, attorneys, caseStatuses, caseTypes, patientTreatmentStatuses, caseProgressStatuses, adverseInsuranceStatuses) {
    super('ValidateLegalCaseExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.accidentTypes = accidentTypes;
    this.patients = patients;
    this.medLevels = medLevels;
    this.firms = firms;
    this.attorneys = attorneys;
    this.caseStatuses = caseStatuses;
    this.caseTypes = caseTypes;
    this.patientTreatmentStatuses = patientTreatmentStatuses;
    this.caseProgressStatuses = caseProgressStatuses;
    this.adverseInsuranceStatuses = adverseInsuranceStatuses;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`accidentTypeName_${index}_is_valid}`, "Accident Type Is Not Valid", 'accidentType.name', datum['accidentType'], this.accidentTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`medLevelName_${index}_is_valid}`, "Med Level Is Not Valid", 'medLevel.name', datum['medLevel'], this.medLevels, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`firmName_${index}_is_valid}`, "Firm Is Not Valid", 'firm.name', datum['firm'], this.firms, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`attorneyName_${index}_is_valid}`, "Attorney Is Not Valid", 'attorney.name', datum['attorney'], this.attorneys, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`caseStatusName_${index}_is_valid}`, "Case Status Is Not Valid", 'caseStatus.name', datum['caseStatus'], this.caseStatuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`caseTypeName_${index}_is_valid}`, "Case Type Is Not Valid", 'caseType.name', datum['caseType'], this.caseTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`patientTreatmentStatusName_${index}_is_valid}`, "Patient Treatment Status Is Not Valid", 'patientTreatmentStatus.name', datum['patientTreatmentStatus'], this.patientTreatmentStatuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`caseProgressStatusName_${index}_is_valid}`, "Case Progress Status Is Not Valid", 'caseProgressStatus.name', datum['caseProgressStatus'], this.caseProgressStatuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`adverseInsuranceStatusName_${index}_is_valid}`, "Adverse Insurance Status Is Not Valid", 'adverseInsuranceStatus.name', datum['adverseInsuranceStatus'], this.adverseInsuranceStatuses, true));
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

/***/ 773820:
/*!****************************************************************************!*\
  !*** ./libs/web/legal-case/shared/legal-case.business-provider.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LegalCaseBusinessProviderService": () => (/* binding */ LegalCaseBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_legal_case_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-legal-case-excel-data.action */ 295735);
/* harmony import */ var _actions_create_legal_case_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-legal-case.action */ 83105);
/* harmony import */ var _actions_update_legal_cases_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-legal-cases.action */ 603852);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class LegalCaseBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.LegalCaseBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createLegalCase(input) {
    const action = new _actions_create_legal_case_action__WEBPACK_IMPORTED_MODULE_2__.CreateLegalCaseAction(input);
    action.Do(this);
    return action.response;
  }
  updateLegalCase(input, legalCaseId) {
    const action = new _actions_update_legal_cases_action__WEBPACK_IMPORTED_MODULE_3__.UpdateLegalCaseAction(input, legalCaseId);
    action.Do(this);
    return action.response;
  }
  importLegalCases(legalCases) {
    const updateLegalCasesAction = new _actions_update_legal_cases_action__WEBPACK_IMPORTED_MODULE_3__.UpdateLegalCasesAction(legalCases);
    updateLegalCasesAction.Do(this);
    return updateLegalCasesAction.response;
  }
  validateLegalCaseExcelData(excelData, accidentTypes, patients, medLevels, firms, attorneys, caseStatuses, caseTypes, patientTreatmentStatuses, caseProgressStatuses, adverseInsuranceStatuses) {
    const validateLegalCaseExcelDataAction = new _actions_validate_legal_case_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateLegalCaseExcelDataAction(excelData, accidentTypes, patients, medLevels, firms, attorneys, caseStatuses, caseTypes, patientTreatmentStatuses, caseProgressStatuses, adverseInsuranceStatuses);
    validateLegalCaseExcelDataAction.Do(this);
    return validateLegalCaseExcelDataAction.response;
  }
}
LegalCaseBusinessProviderService.ɵfac = function LegalCaseBusinessProviderService_Factory(t) {
  return new (t || LegalCaseBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
LegalCaseBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: LegalCaseBusinessProviderService,
  factory: LegalCaseBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 888750:
/*!**********************************************************!*\
  !*** ./libs/web/legal-case/shared/legal-case.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LegalCaseService": () => (/* binding */ LegalCaseService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _legal_case_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./legal-case.business-provider.service */ 773820);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class LegalCaseService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("LegalCaseService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createLegalCase(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createLegalCase(filteredObj);
  }
  updateLegalCase(input, legalCaseId) {
    return this.businessProvider.updateLegalCase(input, legalCaseId);
  }
  importLegalCases(legalCases) {
    return this.businessProvider.importLegalCases(legalCases);
  }
  validateLegalCaseExcelData(excelData, accidentTypes, patients, medLevels, firms, attorneys, caseStatuses, caseTypes, patientTreatmentStatuses, caseProgressStatuses, adverseInsuranceStatuses) {
    return this.businessProvider.validateLegalCaseExcelData(excelData, accidentTypes, patients, medLevels, firms, attorneys, caseStatuses, caseTypes, patientTreatmentStatuses, caseProgressStatuses, adverseInsuranceStatuses);
  }
}
LegalCaseService.ɵfac = function LegalCaseService_Factory(t) {
  return new (t || LegalCaseService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_legal_case_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.LegalCaseBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_legal_case_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.LegalCaseBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
LegalCaseService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: LegalCaseService,
  factory: LegalCaseService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 715922:
/*!********************************************************!*\
  !*** ./libs/web/legal-case/shared/legal-case.store.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLegalCaseFeatureStore": () => (/* binding */ WebLegalCaseFeatureStore)
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
/* harmony import */ var _legal_case_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./legal-case.service */ 888750);















class WebLegalCaseFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, legalCaseService) {
    super({
      loading: false,
      legalCases: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      accidentTypeId: undefined,
      patientId: undefined,
      medLevelId: undefined,
      firmId: undefined,
      attorneyId: undefined,
      caseStatusId: undefined,
      caseTypeId: undefined,
      patientTreatmentStatusId: undefined,
      caseProgressStatusId: undefined,
      adverseInsuranceStatusId: undefined,
      legalCaseUpdates: [],
      mrnNumber: undefined,
      currentLegalCaseId: undefined,
      paging: {
        limit: 10000,
        skip: 0
      },
      summary: [{
        month: 'Jan',
        settlement: 45,
        prorata: 78
      }, {
        month: 'Feb',
        settlement: 50,
        prorata: 82
      }, {
        month: 'Mar',
        settlement: 70,
        prorata: 110
      }, {
        month: 'Apr',
        settlement: 76,
        prorata: 90
      }]
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.formService = formService;
    this.legalCaseService = legalCaseService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.summary$ = this.select(s => s.summary);
    this.done$ = this.select(s => s.done);
    this.currentLegalCaseId$ = this.select(s => s.currentLegalCaseId);
    this.item$ = this.select(s => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
      if (s.item) {
        let sumOfMinAmount = 0;
        let sumOfPriorMedsToDateAmount = 0;
        (_b = (_a = s.item) === null || _a === void 0 ? void 0 : _a.insurances) === null || _b === void 0 ? void 0 : _b.map(insurance => {
          var _a, _b;
          insurance.minimumCoverageAmount = (_a = insurance.minimumCoverageAmount) !== null && _a !== void 0 ? _a : 0;
          insurance.maximumCoverageAmount = (_b = insurance.maximumCoverageAmount) !== null && _b !== void 0 ? _b : 0;
          sumOfMinAmount += insurance.minimumCoverageAmount;
        });
        (_d = (_c = s.item) === null || _c === void 0 ? void 0 : _c.priorMedsToDates) === null || _d === void 0 ? void 0 : _d.map(priorMTD => {
          var _a;
          priorMTD.amount = (_a = priorMTD.amount) !== null && _a !== void 0 ? _a : 0;
          sumOfPriorMedsToDateAmount += priorMTD.amount;
        });
        const totalPendingRequestEstimate = (_g = (_f = (_e = s.item) === null || _e === void 0 ? void 0 : _e.caseProcedures) === null || _f === void 0 ? void 0 : _f.map(x => x.estimate)) === null || _g === void 0 ? void 0 : _g.reduce((a, b) => a + b, 0);
        const totalCaseAccountsSiteCost = (_k = (_j = (_h = s.item) === null || _h === void 0 ? void 0 : _h.caseAccounts) === null || _j === void 0 ? void 0 : _j.map(x => x.contractedAmount)) === null || _k === void 0 ? void 0 : _k.reduce((a, b) => a + b, 0);
        return Object.assign(Object.assign({}, s.item), {
          sumOfMinAmount: sumOfMinAmount.toFixed(2),
          totalPendingRequestEstimate: totalPendingRequestEstimate.toFixed(2),
          sumOfPriorMedsToDateAmount: sumOfPriorMedsToDateAmount.toFixed(2),
          totalCaseAccountsSiteCost: totalCaseAccountsSiteCost.toFixed(2),
          totalMedsToDates: (_l = totalPendingRequestEstimate + sumOfPriorMedsToDateAmount + totalCaseAccountsSiteCost) === null || _l === void 0 ? void 0 : _l.toFixed(2)
        });
      } else {
        return undefined;
      }
    });
    this.legalCases$ = this.select(s => s.legalCases);
    this.legalCaseUpdates$ = this.select(s => s.legalCaseUpdates);
    this.accidentTypes$ = this.select(s => s.accidentTypes || []);
    this.patients$ = this.select(s => s.patients || []);
    this.medLevels$ = this.select(s => s.medLevels || []);
    this.firms$ = this.select(s => s.firms || []);
    this.attorneys$ = this.select(s => s.attorneys || []);
    this.caseStatuses$ = this.select(s => s.caseStatuses || []);
    this.caseTypes$ = this.select(s => s.caseTypes || []);
    this.mrnNumber$ = this.select(s => s.mrnNumber || '');
    this.patientTreatmentStatuses$ = this.select(s => s.patientTreatmentStatuses || []);
    this.caseProgressStatuses$ = this.select(s => s.caseProgressStatuses || []);
    this.adverseInsuranceStatuses$ = this.select(s => s.adverseInsuranceStatuses || []);
    this.accidentTypeId$ = this.select(s => s.accidentTypeId);
    this.patientId$ = this.select(s => s.patientId);
    this.medLevelId$ = this.select(s => s.medLevelId);
    this.firmId$ = this.select(s => s.firmId);
    this.attorneyId$ = this.select(s => s.attorneyId);
    this.caseStatusId$ = this.select(s => s.caseStatusId);
    this.caseTypeId$ = this.select(s => s.caseTypeId);
    this.patientTreatmentStatusId$ = this.select(s => s.patientTreatmentStatusId);
    this.caseProgressStatusId$ = this.select(s => s.caseProgressStatusId);
    this.adverseInsuranceStatusId$ = this.select(s => s.adverseInsuranceStatusId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.legalCases$, this.accidentTypes$, this.patients$, this.medLevels$, this.firms$, this.attorneys$, this.caseStatuses$, this.caseTypes$, this.patientTreatmentStatuses$, this.caseProgressStatuses$, this.adverseInsuranceStatuses$, this.mrnNumber$, (errors, loading, item, formName, legalCases, accidentTypes, patients, medLevels, firms, attorneys, caseStatuses, caseTypes, patientTreatmentStatuses, caseProgressStatuses, adverseInsuranceStatuses, mrnNumber) => ({
      errors,
      loading,
      item,
      formName,
      legalCases,
      accidentTypes,
      patients,
      medLevels,
      firms,
      attorneys,
      caseStatuses,
      caseTypes,
      patientTreatmentStatuses,
      caseProgressStatuses,
      adverseInsuranceStatuses,
      mrnNumber
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.accidentTypeId$, this.patientId$, this.medLevelId$, this.firmId$, this.attorneyId$, this.caseStatusId$, this.caseTypeId$, this.patientTreatmentStatusId$, this.caseProgressStatusId$, this.adverseInsuranceStatusId$, this.searchQuery$, (paging, accidentTypeId, patientId, medLevelId, firmId, attorneyId, caseStatusId, caseTypeId, patientTreatmentStatusId, caseProgressStatusId, adverseInsuranceStatusId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      accidentTypeId: accidentTypeId,
      patientId: patientId,
      medLevelId: medLevelId,
      firmId: firmId,
      attorneyId: attorneyId,
      caseStatusId: caseStatusId,
      caseTypeId: caseTypeId,
      patientTreatmentStatusId: patientTreatmentStatusId,
      caseProgressStatusId: caseProgressStatusId,
      adverseInsuranceStatusId: adverseInsuranceStatusId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setAccidentTypeId = this.updater((state, accidentTypeId) => Object.assign(Object.assign({}, state), {
      accidentTypeId
    }));
    this.setPatientId = this.updater((state, patientId) => Object.assign(Object.assign({}, state), {
      patientId
    }));
    this.setMedLevelId = this.updater((state, medLevelId) => Object.assign(Object.assign({}, state), {
      medLevelId
    }));
    this.setFirmId = this.updater((state, firmId) => Object.assign(Object.assign({}, state), {
      firmId
    }));
    this.setAttorneyId = this.updater((state, attorneyId) => Object.assign(Object.assign({}, state), {
      attorneyId
    }));
    this.setCaseStatusId = this.updater((state, caseStatusId) => Object.assign(Object.assign({}, state), {
      caseStatusId
    }));
    this.setCurrentLegalCaseId = this.updater((state, currentLegalCaseId) => Object.assign(Object.assign({}, state), {
      currentLegalCaseId
    }));
    this.setCaseTypeId = this.updater((state, caseTypeId) => Object.assign(Object.assign({}, state), {
      caseTypeId
    }));
    this.setPatientTreatmentStatusId = this.updater((state, patientTreatmentStatusId) => Object.assign(Object.assign({}, state), {
      patientTreatmentStatusId
    }));
    this.setCaseProgressStatusId = this.updater((state, caseProgressStatusId) => Object.assign(Object.assign({}, state), {
      caseProgressStatusId
    }));
    this.setAdverseInsuranceStatusId = this.updater((state, adverseInsuranceStatusId) => Object.assign(Object.assign({}, state), {
      adverseInsuranceStatusId
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
    this.filterAccidentTypes = term => this.data.userSelectAccidentTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const accidentTypes = res.data.items;
      this.patchState({
        accidentTypes
      });
      return accidentTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPatients = term => this.data.userSelectPatients({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const patients = res.data.items;
      this.patchState({
        patients
      });
      return patients;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterMedLevels = term => this.data.userSelectMedLevels({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const medLevels = res.data.items;
      this.patchState({
        medLevels
      });
      return medLevels;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterFirms = term => this.data.userSelectFirms({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const firms = res.data.items;
      this.patchState({
        firms
      });
      return firms;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAttorneys = term => this.data.userSelectAttorneys({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const attorneys = res.data.items;
      this.patchState({
        attorneys
      });
      return attorneys;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterCaseStatuses = term => this.data.userSelectCaseStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const caseStatuses = res.data.items;
      this.patchState({
        caseStatuses
      });
      return caseStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterCaseTypes = term => this.data.userSelectCaseTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const caseTypes = res.data.items;
      this.patchState({
        caseTypes
      });
      return caseTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPatientTreatmentStatuses = term => this.data.userSelectPatientTreatmentStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const patientTreatmentStatuses = res.data.items;
      this.patchState({
        patientTreatmentStatuses
      });
      return patientTreatmentStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterCaseProgressStatuses = term => this.data.userSelectCaseProgressStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const caseProgressStatuses = res.data.items;
      this.patchState({
        caseProgressStatuses
      });
      return caseProgressStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterAdverseInsuranceStatuses = term => this.data.userSelectAdverseInsuranceStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const adverseInsuranceStatuses = res.data.items;
      this.patchState({
        adverseInsuranceStatuses
      });
      return adverseInsuranceStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addAccidentType = this.updater((state, accidentType) => Object.assign(Object.assign({}, state), {
      accidentTypes: state.accidentTypes.concat(accidentType)
    }));
    this.addPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(patient)
    }));
    this.addMedLevel = this.updater((state, medLevel) => Object.assign(Object.assign({}, state), {
      medLevels: state.medLevels.concat(medLevel)
    }));
    this.addFirm = this.updater((state, firm) => Object.assign(Object.assign({}, state), {
      firms: state.firms.concat(firm)
    }));
    this.addAttorney = this.updater((state, attorney) => Object.assign(Object.assign({}, state), {
      attorneys: state.attorneys.concat(attorney)
    }));
    this.addCaseStatus = this.updater((state, caseStatus) => Object.assign(Object.assign({}, state), {
      caseStatuses: state.caseStatuses.concat(caseStatus)
    }));
    this.addCaseType = this.updater((state, caseType) => Object.assign(Object.assign({}, state), {
      caseTypes: state.caseTypes.concat(caseType)
    }));
    this.addPatientTreatmentStatus = this.updater((state, patientTreatmentStatus) => Object.assign(Object.assign({}, state), {
      patientTreatmentStatuses: state.patientTreatmentStatuses.concat(patientTreatmentStatus)
    }));
    this.addCaseProgressStatus = this.updater((state, caseProgressStatus) => Object.assign(Object.assign({}, state), {
      caseProgressStatuses: state.caseProgressStatuses.concat(caseProgressStatus)
    }));
    this.addAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus) => Object.assign(Object.assign({}, state), {
      adverseInsuranceStatuses: state.adverseInsuranceStatuses.concat(adverseInsuranceStatus)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: [...state.legalCases, legalCase]
    }));
    this.updateLegalCase = this.updater((state, legalCase) => {
      return Object.assign(Object.assign({}, state), {
        legalCases: state.legalCases.map(el => {
          if (el.id === legalCase.id) {
            return legalCase;
          } else {
            return el;
          }
        })
      });
    });
    this.addLegalCases = this.updater((state, newLegalCases) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(newLegalCases)
    }));
    this.updateLegalCases = this.updater((state, updatedLegalCases) => {
      return Object.assign(Object.assign({}, state), {
        legalCases: state.legalCases.map(legalCase => {
          const updated = updatedLegalCases.find(el => el.id === legalCase.id);
          return updated ? updated : legalCase;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    //(contextData) => {console.log('clicked, contextData = ', contextData); this.store.updateFundingApproved(contextData,false)}
    this.loadLegalCaseEffect = this.effect(legalCaseId$ => legalCaseId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(legalCaseId => {
      this.setCurrentLegalCaseId(legalCaseId);
      return this.data.userLegalCase({
        legalCaseId
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        var _a, _b, _c, _d;
        const estimateForCaseProcedure = (_b = (_a = res.data.item) === null || _a === void 0 ? void 0 : _a.caseProcedures) === null || _b === void 0 ? void 0 : _b.map(caseProcedure => {
          var _a;
          return Object.assign(Object.assign({}, caseProcedure), {
            estimate: (_a = caseProcedure.procedureVendors) === null || _a === void 0 ? void 0 : _a.map(x => x.estimate).reduce((a, b) => a + b)
          });
        });
        console.log("caseAccounts:", res.data.item.caseAccounts);
        return this.patchState({
          item: Object.assign(Object.assign({}, res.data.item), {
            caseProcedures: (_d = (_c = res.data.item) === null || _c === void 0 ? void 0 : _c.caseProcedures) === null || _d === void 0 ? void 0 : _d.map(caseProcedure => {
              var _a;
              return Object.assign(Object.assign({}, caseProcedure), {
                estimate: (_a = caseProcedure.procedureVendors) === null || _a === void 0 ? void 0 : _a.map(x => x.estimate).reduce((a, b) => a + b)
              });
            })
          }),
          errors: res.errors,
          loading: false
        });
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.loadLegalCasesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userLegalCases({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      legalCases: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadLegalCasesUpdatesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.data.userLegalCaseUpdates().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      legalCaseUpdates: res.data.legalCases,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createLegalCaseEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.legalCaseService.createLegalCase(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(legalCase => {
      this.addNewLegalCase(legalCase);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: legalCase,
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
    this.createPatientDocumentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => {
      input.patientId = this.get().item.patientId;
      console.log(input.patientId);
      return this.data.userCreateDocument({
        input: input
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(res => console.log(res.data.created)));
    })));
    this.getMrnNumberEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => {
      console.log(input);
      return this.data.getPatientMrnNumber({
        dateOfBirth: input.dateOfBirth,
        dateOfLoss: input.dateOfLoss,
        accidentKind: input.accidentKind,
        legalCaseId: input.legalCaseId
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(res => console.log('Mrn Output', res.data.patientMrn)));
    })));
    this.updateLegalCaseEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.legalCaseService.updateLegalCase(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(legalCase => {
      this.updateLegalCase(legalCase);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: legalCase,
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
    this.deleteLegalCaseEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, legalCase]) => {
      return this.data.userDeleteLegalCase({
        legalCaseId: legalCase.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.legalCaseService.importLegalCases(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addLegalCases(created);
      this.updateLegalCases(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    this.updateCaseStatusEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(input => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.data.userUpdateLegalCase({
      legalCaseId: input.legalCaseId,
      input: {
        name: input.name,
        firmId: input.firmId,
        patientId: input.patientId,
        caseStatusId: input.caseStatusId
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      var _a, _b, _c;
      this.toast.success(`Successfully updated case status to ${(_c = (_b = (_a = res.data.updated) === null || _a === void 0 ? void 0 : _a.caseStatus) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : ''}`, {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    }, error => {
      this.toast.error("Failed to update status", {
        duration: 3000
      });
      console.log(error);
      this.patchState({
        loading: false
      });
    })))));
    this.updateFundingApproved = this.effect(data$ => data$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => {
      console.log('updateFundingApproved', data);
      return this.data.userUpdateProcedureVendor({
        procedureVendorId: data.input.id,
        input: data.input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.currentLegalCaseId$.subscribe(currentLegalCaseId => {
          this.loadLegalCaseEffect(currentLegalCaseId);
        }).unsubscribe();
        this.patchState({
          errors: res.errors,
          loading: false
        });
        data.resultEmitter.emit(res.data.updated);
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    if (this.route.snapshot.paramMap.has('legalCaseId')) {
      const legalCaseId = this.route.snapshot.paramMap.get('legalCaseId');
      this.setFormName('legalCase_edit');
    } else {
      this.setFormName('legalCase_create');
    }
    if (this.route.snapshot.paramMap.has('accidentTypeId')) {
      const accidentTypeId = this.route.snapshot.paramMap.get('accidentTypeId');
      this.setAccidentTypeId(accidentTypeId);
    }
    if (this.route.snapshot.paramMap.has('patientId')) {
      const patientId = this.route.snapshot.paramMap.get('patientId');
      this.setPatientId(patientId);
    }
    if (this.route.snapshot.paramMap.has('medLevelId')) {
      const medLevelId = this.route.snapshot.paramMap.get('medLevelId');
      this.setMedLevelId(medLevelId);
    }
    if (this.route.snapshot.paramMap.has('firmId')) {
      const firmId = this.route.snapshot.paramMap.get('firmId');
      this.setFirmId(firmId);
    }
    if (this.route.snapshot.paramMap.has('attorneyId')) {
      const attorneyId = this.route.snapshot.paramMap.get('attorneyId');
      this.setAttorneyId(attorneyId);
    }
    if (this.route.snapshot.paramMap.has('caseStatusId')) {
      const caseStatusId = this.route.snapshot.paramMap.get('caseStatusId');
      this.setCaseStatusId(caseStatusId);
    }
    if (this.route.snapshot.paramMap.has('caseTypeId')) {
      const caseTypeId = this.route.snapshot.paramMap.get('caseTypeId');
      this.setCaseTypeId(caseTypeId);
    }
    if (this.route.snapshot.paramMap.has('patientTreatmentStatusId')) {
      const patientTreatmentStatusId = this.route.snapshot.paramMap.get('patientTreatmentStatusId');
      this.setPatientTreatmentStatusId(patientTreatmentStatusId);
    }
    if (this.route.snapshot.paramMap.has('caseProgressStatusId')) {
      const caseProgressStatusId = this.route.snapshot.paramMap.get('caseProgressStatusId');
      this.setCaseProgressStatusId(caseProgressStatusId);
    }
    if (this.route.snapshot.paramMap.has('adverseInsuranceStatusId')) {
      const adverseInsuranceStatusId = this.route.snapshot.paramMap.get('adverseInsuranceStatusId');
      this.setAdverseInsuranceStatusId(adverseInsuranceStatusId);
    }
    //this.getMrnNumberEffect({dateOfBirth: "1984-01-01", dateOfLoss: "2021-01-01", accidentKind: "Motor Vehicle Accident"})
  }

  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.legalCaseService.validateLegalCaseExcelData(excelData, vm.accidentTypes, vm.patients, vm.medLevels, vm.firms, vm.attorneys, vm.caseStatuses, vm.caseTypes, vm.patientTreatmentStatuses, vm.caseProgressStatuses, vm.adverseInsuranceStatuses);
    }));
  }
}
WebLegalCaseFeatureStore.ɵfac = function WebLegalCaseFeatureStore_Factory(t) {
  return new (t || WebLegalCaseFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_legal_case_service__WEBPACK_IMPORTED_MODULE_12__.LegalCaseService));
};
WebLegalCaseFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebLegalCaseFeatureStore,
  factory: WebLegalCaseFeatureStore.ɵfac
});

/***/ }),

/***/ 16205:
/*!***********************************************************************************!*\
  !*** ./libs/web/legal-case/shared/rules/create-legal-case-input-is-valid.rule.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateLegalCaseInputIsValidRule": () => (/* binding */ CreateLegalCaseInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _legal_case_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legal-case-name-is-valid.rule */ 340861);


class CreateLegalCaseInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _legal_case_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.LegalCaseNameIsValidRule('name', 'The legalcase name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 340861:
/*!***************************************************************************!*\
  !*** ./libs/web/legal-case/shared/rules/legal-case-name-is-valid.rule.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LegalCaseNameIsValidRule": () => (/* binding */ LegalCaseNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class LegalCaseNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);