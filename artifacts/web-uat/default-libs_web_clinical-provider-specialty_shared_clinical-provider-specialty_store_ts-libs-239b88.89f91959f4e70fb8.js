"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_clinical-provider-specialty_shared_clinical-provider-specialty_store_ts-libs-239b88"],{

/***/ 663262:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/actions/clinical-provider-specialty.business-action-base.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderSpecialtyBusinessActionBase": () => (/* binding */ ClinicalProviderSpecialtyBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ClinicalProviderSpecialtyBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 775600:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/actions/create-clinical-provider-specialty.action.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderSpecialtyAction": () => (/* binding */ CreateClinicalProviderSpecialtyAction)
/* harmony export */ });
/* harmony import */ var _clinical_provider_specialty_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-specialty.business-action-base */ 663262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_clinical_provider_specialty_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-clinical-provider-specialty-input-is-valid.rule */ 847750);




class CreateClinicalProviderSpecialtyAction extends _clinical_provider_specialty_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderSpecialtyBusinessActionBase {
  constructor(input) {
    super('CreateClinicalProviderSpecialtyAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_clinical_provider_specialty_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderSpecialtyInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderSpecialty({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 182902:
/*!************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/actions/update-clinical-provider-specialties.action.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateClinicalProviderSpecialtiesAction": () => (/* binding */ UpdateClinicalProviderSpecialtiesAction),
/* harmony export */   "UpdateClinicalProviderSpecialtyAction": () => (/* binding */ UpdateClinicalProviderSpecialtyAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_specialty_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-specialty.business-action-base */ 663262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateClinicalProviderSpecialtiesAction extends _clinical_provider_specialty_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderSpecialtyBusinessActionBase {
  constructor(clinicalProviderSpecialties) {
    super('UpdateClinicalProviderSpecialtiesAction');
    this.clinicalProviderSpecialties = clinicalProviderSpecialties;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderSpecialties, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderSpecialties({
      input: {
        clinicalProviderSpecialties: this.clinicalProviderSpecialties
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateClinicalProviderSpecialtyAction extends _clinical_provider_specialty_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderSpecialtyBusinessActionBase {
  constructor(clinicalProviderSpecialty, clinicalProviderSpecialtyId) {
    super('UpdateClinicalProviderSpecialtyAction');
    this.clinicalProviderSpecialty = clinicalProviderSpecialty;
    this.clinicalProviderSpecialtyId = clinicalProviderSpecialtyId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderSpecialty, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.clinicalProviderSpecialtyId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderSpecialty({
      clinicalProviderSpecialtyId: this.clinicalProviderSpecialtyId,
      input: this.clinicalProviderSpecialty
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 923883:
/*!***********************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/actions/validate-clinical-provider-specialty-excel-data.action.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateClinicalProviderSpecialtyExcelDataAction": () => (/* binding */ ValidateClinicalProviderSpecialtyExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_specialty_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-specialty.business-action-base */ 663262);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateClinicalProviderSpecialtyExcelDataAction extends _clinical_provider_specialty_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderSpecialtyBusinessActionBase {
  constructor(excelData, clinicalProviders, specialties) {
    super('ValidateClinicalProviderSpecialtyExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.clinicalProviders = clinicalProviders;
    this.specialties = specialties;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`specialtyName_${index}_is_valid}`, "Specialty Is Not Valid", 'specialty.name', datum['specialty'], this.specialties, true));
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

/***/ 257715:
/*!**************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/clinical-provider-specialty.business-provider.service.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderSpecialtyBusinessProviderService": () => (/* binding */ ClinicalProviderSpecialtyBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_clinical_provider_specialty_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-clinical-provider-specialty-excel-data.action */ 923883);
/* harmony import */ var _actions_create_clinical_provider_specialty_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-clinical-provider-specialty.action */ 775600);
/* harmony import */ var _actions_update_clinical_provider_specialties_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-clinical-provider-specialties.action */ 182902);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ClinicalProviderSpecialtyBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ClinicalProviderSpecialtyBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createClinicalProviderSpecialty(input) {
    const action = new _actions_create_clinical_provider_specialty_action__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderSpecialtyAction(input);
    action.Do(this);
    return action.response;
  }
  updateClinicalProviderSpecialty(input, clinicalProviderSpecialtyId) {
    const action = new _actions_update_clinical_provider_specialties_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderSpecialtyAction(input, clinicalProviderSpecialtyId);
    action.Do(this);
    return action.response;
  }
  importClinicalProviderSpecialties(clinicalProviderSpecialties) {
    const updateClinicalProviderSpecialtiesAction = new _actions_update_clinical_provider_specialties_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderSpecialtiesAction(clinicalProviderSpecialties);
    updateClinicalProviderSpecialtiesAction.Do(this);
    return updateClinicalProviderSpecialtiesAction.response;
  }
  validateClinicalProviderSpecialtyExcelData(excelData, clinicalProviders, specialties) {
    const validateClinicalProviderSpecialtyExcelDataAction = new _actions_validate_clinical_provider_specialty_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateClinicalProviderSpecialtyExcelDataAction(excelData, clinicalProviders, specialties);
    validateClinicalProviderSpecialtyExcelDataAction.Do(this);
    return validateClinicalProviderSpecialtyExcelDataAction.response;
  }
}
ClinicalProviderSpecialtyBusinessProviderService.ɵfac = function ClinicalProviderSpecialtyBusinessProviderService_Factory(t) {
  return new (t || ClinicalProviderSpecialtyBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ClinicalProviderSpecialtyBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ClinicalProviderSpecialtyBusinessProviderService,
  factory: ClinicalProviderSpecialtyBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 598275:
/*!********************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/clinical-provider-specialty.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderSpecialtyService": () => (/* binding */ ClinicalProviderSpecialtyService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _clinical_provider_specialty_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clinical-provider-specialty.business-provider.service */ 257715);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ClinicalProviderSpecialtyService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ClinicalProviderSpecialtyService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createClinicalProviderSpecialty(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createClinicalProviderSpecialty(filteredObj);
  }
  updateClinicalProviderSpecialty(input, clinicalProviderSpecialtyId) {
    return this.businessProvider.updateClinicalProviderSpecialty(input, clinicalProviderSpecialtyId);
  }
  importClinicalProviderSpecialties(clinicalProviderSpecialties) {
    return this.businessProvider.importClinicalProviderSpecialties(clinicalProviderSpecialties);
  }
  validateClinicalProviderSpecialtyExcelData(excelData, clinicalProviders, specialties) {
    return this.businessProvider.validateClinicalProviderSpecialtyExcelData(excelData, clinicalProviders, specialties);
  }
}
ClinicalProviderSpecialtyService.ɵfac = function ClinicalProviderSpecialtyService_Factory(t) {
  return new (t || ClinicalProviderSpecialtyService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_specialty_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderSpecialtyBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_specialty_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderSpecialtyBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ClinicalProviderSpecialtyService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ClinicalProviderSpecialtyService,
  factory: ClinicalProviderSpecialtyService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 877547:
/*!******************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/clinical-provider-specialty.store.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderSpecialtyFeatureStore": () => (/* binding */ WebClinicalProviderSpecialtyFeatureStore)
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
/* harmony import */ var _clinical_provider_specialty_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./clinical-provider-specialty.service */ 598275);














class WebClinicalProviderSpecialtyFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, clinicalProviderSpecialtyService) {
    super({
      loading: false,
      clinicalProviderSpecialties: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      clinicalProviderId: undefined,
      specialtyId: undefined,
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
    this.clinicalProviderSpecialtyService = clinicalProviderSpecialtyService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.clinicalProviderSpecialties$ = this.select(s => s.clinicalProviderSpecialties);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.specialties$ = this.select(s => s.specialties || []);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.specialtyId$ = this.select(s => s.specialtyId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderSpecialties$, this.clinicalProviders$, this.specialties$, (errors, loading, item, formName, clinicalProviderSpecialties, clinicalProviders, specialties) => ({
      errors,
      loading,
      item,
      formName,
      clinicalProviderSpecialties,
      clinicalProviders,
      specialties
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.clinicalProviderId$, this.specialtyId$, this.searchQuery$, (paging, clinicalProviderId, specialtyId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      clinicalProviderId: clinicalProviderId,
      specialtyId: specialtyId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.setSpecialtyId = this.updater((state, specialtyId) => Object.assign(Object.assign({}, state), {
      specialtyId
    }));
    this.filterClinicalProviders = term => this.data.userSelectClinicalProviders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let clinicalProviders = res.data.items;
      this.patchState({
        clinicalProviders
      });
      return clinicalProviders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterSpecialties = term => this.data.userSelectSpecialties({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let specialties = res.data.items;
      this.patchState({
        specialties
      });
      return specialties;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.addSpecialty = this.updater((state, specialty) => Object.assign(Object.assign({}, state), {
      specialties: state.specialties.concat(specialty)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewClinicalProviderSpecialty = this.updater((state, clinicalProviderSpecialty) => Object.assign(Object.assign({}, state), {
      clinicalProviderSpecialties: [...state.clinicalProviderSpecialties, clinicalProviderSpecialty]
    }));
    this.updateClinicalProviderSpecialty = this.updater((state, clinicalProviderSpecialty) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderSpecialties: state.clinicalProviderSpecialties.map(el => {
          if (el.id === clinicalProviderSpecialty.id) {
            return clinicalProviderSpecialty;
          } else {
            return el;
          }
        })
      });
    });
    this.addClinicalProviderSpecialties = this.updater((state, newClinicalProviderSpecialties) => Object.assign(Object.assign({}, state), {
      clinicalProviderSpecialties: state.clinicalProviderSpecialties.concat(newClinicalProviderSpecialties)
    }));
    this.updateClinicalProviderSpecialties = this.updater((state, updatedClinicalProviderSpecialties) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderSpecialties: state.clinicalProviderSpecialties.map(clinicalProviderSpecialty => {
          const updated = updatedClinicalProviderSpecialties.find(el => el.id === clinicalProviderSpecialty.id);
          return updated ? updated : clinicalProviderSpecialty;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadClinicalProviderSpecialtyEffect = this.effect(clinicalProviderSpecialtyId$ => clinicalProviderSpecialtyId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(clinicalProviderSpecialtyId => this.data.userClinicalProviderSpecialty({
      clinicalProviderSpecialtyId
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
    this.loadClinicalProviderSpecialtiesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userClinicalProviderSpecialties({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      clinicalProviderSpecialties: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createClinicalProviderSpecialtyEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.clinicalProviderSpecialtyService.createClinicalProviderSpecialty(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProviderSpecialty => {
      this.addNewClinicalProviderSpecialty(clinicalProviderSpecialty);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderSpecialty,
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
    this.updateClinicalProviderSpecialtyEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.clinicalProviderSpecialtyService.updateClinicalProviderSpecialty(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProviderSpecialty => {
      this.updateClinicalProviderSpecialty(clinicalProviderSpecialty);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderSpecialty,
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
    this.deleteClinicalProviderSpecialtyEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, clinicalProviderSpecialty]) => {
      return this.data.userDeleteClinicalProviderSpecialty({
        clinicalProviderSpecialtyId: clinicalProviderSpecialty.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.clinicalProviderSpecialtyService.importClinicalProviderSpecialties(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addClinicalProviderSpecialties(created);
      this.updateClinicalProviderSpecialties(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('clinicalProviderSpecialtyId')) {
      var clinicalProviderSpecialtyId = this.route.snapshot.paramMap.get('clinicalProviderSpecialtyId');
      this.setFormName('clinicalProviderSpecialty_edit');
    } else {
      this.setFormName('clinicalProviderSpecialty_create');
    }
    if (this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId");
      this.setClinicalProviderId(clinicalProviderId);
    }
    if (this.route.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.route.snapshot.paramMap.get("specialtyId");
      this.setSpecialtyId(specialtyId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.clinicalProviderSpecialtyService.validateClinicalProviderSpecialtyExcelData(excelData, vm.clinicalProviders, vm.specialties);
    }));
  }
}
WebClinicalProviderSpecialtyFeatureStore.ɵfac = function WebClinicalProviderSpecialtyFeatureStore_Factory(t) {
  return new (t || WebClinicalProviderSpecialtyFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_clinical_provider_specialty_service__WEBPACK_IMPORTED_MODULE_12__.ClinicalProviderSpecialtyService));
};
WebClinicalProviderSpecialtyFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebClinicalProviderSpecialtyFeatureStore,
  factory: WebClinicalProviderSpecialtyFeatureStore.ɵfac
});

/***/ }),

/***/ 557780:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/rules/clinical-provider-specialty-name-is-valid.rule.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderSpecialtyNameIsValidRule": () => (/* binding */ ClinicalProviderSpecialtyNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ClinicalProviderSpecialtyNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 847750:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/shared/rules/create-clinical-provider-specialty-input-is-valid.rule.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderSpecialtyInputIsValidRule": () => (/* binding */ CreateClinicalProviderSpecialtyInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _clinical_provider_specialty_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-specialty-name-is-valid.rule */ 557780);


class CreateClinicalProviderSpecialtyInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _clinical_provider_specialty_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderSpecialtyNameIsValidRule('name', 'The clinicalproviderspecialty name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 630706:
/*!************************************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-specialty/ui/web-clinical-provider-specialty-select-form/web-clinical-provider-specialty-select-table-view.component.ts ***!
  \************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderSpecialtySelectTableViewComponent": () => (/* binding */ WebClinicalProviderSpecialtySelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebClinicalProviderSpecialtySelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.clinicalProviderSpecialties = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'clinicalProvider.name',
      headerName: 'Clinical Provider',
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
      field: 'npi',
      filter: 'agTextColumnFilter'
    }, {
      field: 'clinicalProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'clinicalProvider.name',
      header: 'ClinicalProvider',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'specialtyId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'specialty.name',
      header: 'Specialty',
      filter: 'agTextColumnFilter'
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
WebClinicalProviderSpecialtySelectTableViewComponent.ɵfac = function WebClinicalProviderSpecialtySelectTableViewComponent_Factory(t) {
  return new (t || WebClinicalProviderSpecialtySelectTableViewComponent)();
};
WebClinicalProviderSpecialtySelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebClinicalProviderSpecialtySelectTableViewComponent,
  selectors: [["ui-clinical-provider-specialty-select-table-view"]],
  viewQuery: function WebClinicalProviderSpecialtySelectTableViewComponent_Query(rf, ctx) {
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
    clinicalProviderSpecialties: "clinicalProviderSpecialties"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "data", "showSidebar", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebClinicalProviderSpecialtySelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebClinicalProviderSpecialtySelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebClinicalProviderSpecialtySelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("data", ctx.clinicalProviderSpecialties)("showSidebar", false)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);