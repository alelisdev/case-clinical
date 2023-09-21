"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_medical-condition-provider_shared_medical-condition-provider_store_ts-libs_w-eec0ae"],{

/***/ 497524:
/*!********************************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/actions/create-medical-condition-provider.action.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMedicalConditionProviderAction": () => (/* binding */ CreateMedicalConditionProviderAction)
/* harmony export */ });
/* harmony import */ var _medical_condition_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./medical-condition-provider.business-action-base */ 615920);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_medical_condition_provider_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-medical-condition-provider-input-is-valid.rule */ 675714);




class CreateMedicalConditionProviderAction extends _medical_condition_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionProviderBusinessActionBase {
  constructor(input) {
    super('CreateMedicalConditionProviderAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_medical_condition_provider_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateMedicalConditionProviderInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateMedicalConditionProvider({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 615920:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/actions/medical-condition-provider.business-action-base.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MedicalConditionProviderBusinessActionBase": () => (/* binding */ MedicalConditionProviderBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class MedicalConditionProviderBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 512375:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/actions/update-medical-condition-providers.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateMedicalConditionProviderAction": () => (/* binding */ UpdateMedicalConditionProviderAction),
/* harmony export */   "UpdateMedicalConditionProvidersAction": () => (/* binding */ UpdateMedicalConditionProvidersAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _medical_condition_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./medical-condition-provider.business-action-base */ 615920);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateMedicalConditionProvidersAction extends _medical_condition_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionProviderBusinessActionBase {
  constructor(medicalConditionProviders) {
    super('UpdateMedicalConditionProvidersAction');
    this.medicalConditionProviders = medicalConditionProviders;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.medicalConditionProviders, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateMedicalConditionProviders({
      input: {
        medicalConditionProviders: this.medicalConditionProviders
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateMedicalConditionProviderAction extends _medical_condition_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionProviderBusinessActionBase {
  constructor(medicalConditionProvider, medicalConditionProviderId) {
    super('UpdateMedicalConditionProviderAction');
    this.medicalConditionProvider = medicalConditionProvider;
    this.medicalConditionProviderId = medicalConditionProviderId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.medicalConditionProvider, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.medicalConditionProviderId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateMedicalConditionProvider({
      medicalConditionProviderId: this.medicalConditionProviderId,
      input: this.medicalConditionProvider
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 67178:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/actions/validate-medical-condition-provider-excel-data.action.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateMedicalConditionProviderExcelDataAction": () => (/* binding */ ValidateMedicalConditionProviderExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _medical_condition_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./medical-condition-provider.business-action-base */ 615920);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateMedicalConditionProviderExcelDataAction extends _medical_condition_provider_business_action_base__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionProviderBusinessActionBase {
  constructor(excelData, clinicalProviders) {
    super('ValidateMedicalConditionProviderExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.clinicalProviders = clinicalProviders;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true));
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

/***/ 13355:
/*!************************************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/medical-condition-provider.business-provider.service.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MedicalConditionProviderBusinessProviderService": () => (/* binding */ MedicalConditionProviderBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_medical_condition_provider_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-medical-condition-provider-excel-data.action */ 67178);
/* harmony import */ var _actions_create_medical_condition_provider_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-medical-condition-provider.action */ 497524);
/* harmony import */ var _actions_update_medical_condition_providers_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-medical-condition-providers.action */ 512375);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class MedicalConditionProviderBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.MedicalConditionProviderBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createMedicalConditionProvider(input) {
    const action = new _actions_create_medical_condition_provider_action__WEBPACK_IMPORTED_MODULE_2__.CreateMedicalConditionProviderAction(input);
    action.Do(this);
    return action.response;
  }
  updateMedicalConditionProvider(input, medicalConditionProviderId) {
    const action = new _actions_update_medical_condition_providers_action__WEBPACK_IMPORTED_MODULE_3__.UpdateMedicalConditionProviderAction(input, medicalConditionProviderId);
    action.Do(this);
    return action.response;
  }
  importMedicalConditionProviders(medicalConditionProviders) {
    const updateMedicalConditionProvidersAction = new _actions_update_medical_condition_providers_action__WEBPACK_IMPORTED_MODULE_3__.UpdateMedicalConditionProvidersAction(medicalConditionProviders);
    updateMedicalConditionProvidersAction.Do(this);
    return updateMedicalConditionProvidersAction.response;
  }
  validateMedicalConditionProviderExcelData(excelData, clinicalProviders) {
    const validateMedicalConditionProviderExcelDataAction = new _actions_validate_medical_condition_provider_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateMedicalConditionProviderExcelDataAction(excelData, clinicalProviders);
    validateMedicalConditionProviderExcelDataAction.Do(this);
    return validateMedicalConditionProviderExcelDataAction.response;
  }
}
MedicalConditionProviderBusinessProviderService.ɵfac = function MedicalConditionProviderBusinessProviderService_Factory(t) {
  return new (t || MedicalConditionProviderBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
MedicalConditionProviderBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: MedicalConditionProviderBusinessProviderService,
  factory: MedicalConditionProviderBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 987414:
/*!******************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/medical-condition-provider.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MedicalConditionProviderService": () => (/* binding */ MedicalConditionProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _medical_condition_provider_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./medical-condition-provider.business-provider.service */ 13355);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class MedicalConditionProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("MedicalConditionProviderService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createMedicalConditionProvider(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createMedicalConditionProvider(filteredObj);
  }
  updateMedicalConditionProvider(input, medicalConditionProviderId) {
    return this.businessProvider.updateMedicalConditionProvider(input, medicalConditionProviderId);
  }
  importMedicalConditionProviders(medicalConditionProviders) {
    return this.businessProvider.importMedicalConditionProviders(medicalConditionProviders);
  }
  validateMedicalConditionProviderExcelData(excelData, clinicalProviders) {
    return this.businessProvider.validateMedicalConditionProviderExcelData(excelData, clinicalProviders);
  }
}
MedicalConditionProviderService.ɵfac = function MedicalConditionProviderService_Factory(t) {
  return new (t || MedicalConditionProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_medical_condition_provider_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.MedicalConditionProviderBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_medical_condition_provider_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.MedicalConditionProviderBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
MedicalConditionProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: MedicalConditionProviderService,
  factory: MedicalConditionProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 138959:
/*!****************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/medical-condition-provider.store.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebMedicalConditionProviderFeatureStore": () => (/* binding */ WebMedicalConditionProviderFeatureStore)
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
/* harmony import */ var _medical_condition_provider_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./medical-condition-provider.service */ 987414);














class WebMedicalConditionProviderFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, medicalConditionProviderService) {
    super({
      loading: false,
      medicalConditionProviders: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      clinicalProviderId: undefined,
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
    this.medicalConditionProviderService = medicalConditionProviderService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.medicalConditionProviders$ = this.select(s => s.medicalConditionProviders);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.medicalConditionProviders$, this.clinicalProviders$, (errors, loading, item, formName, medicalConditionProviders, clinicalProviders) => ({
      errors,
      loading,
      item,
      formName,
      medicalConditionProviders,
      clinicalProviders
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.clinicalProviderId$, this.searchQuery$, (paging, clinicalProviderId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      clinicalProviderId: clinicalProviderId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
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
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewMedicalConditionProvider = this.updater((state, medicalConditionProvider) => Object.assign(Object.assign({}, state), {
      medicalConditionProviders: [...state.medicalConditionProviders, medicalConditionProvider]
    }));
    this.updateMedicalConditionProvider = this.updater((state, medicalConditionProvider) => {
      return Object.assign(Object.assign({}, state), {
        medicalConditionProviders: state.medicalConditionProviders.map(el => {
          if (el.id === medicalConditionProvider.id) {
            return medicalConditionProvider;
          } else {
            return el;
          }
        })
      });
    });
    this.addMedicalConditionProviders = this.updater((state, newMedicalConditionProviders) => Object.assign(Object.assign({}, state), {
      medicalConditionProviders: state.medicalConditionProviders.concat(newMedicalConditionProviders)
    }));
    this.updateMedicalConditionProviders = this.updater((state, updatedMedicalConditionProviders) => {
      return Object.assign(Object.assign({}, state), {
        medicalConditionProviders: state.medicalConditionProviders.map(medicalConditionProvider => {
          const updated = updatedMedicalConditionProviders.find(el => el.id === medicalConditionProvider.id);
          return updated ? updated : medicalConditionProvider;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadMedicalConditionProviderEffect = this.effect(medicalConditionProviderId$ => medicalConditionProviderId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(medicalConditionProviderId => this.data.userMedicalConditionProvider({
      medicalConditionProviderId
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
    this.loadMedicalConditionProvidersEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userMedicalConditionProviders({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      medicalConditionProviders: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createMedicalConditionProviderEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.medicalConditionProviderService.createMedicalConditionProvider(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(medicalConditionProvider => {
      this.addNewMedicalConditionProvider(medicalConditionProvider);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: medicalConditionProvider,
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
    this.updateMedicalConditionProviderEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.medicalConditionProviderService.updateMedicalConditionProvider(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(medicalConditionProvider => {
      this.updateMedicalConditionProvider(medicalConditionProvider);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: medicalConditionProvider,
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
    this.deleteMedicalConditionProviderEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, medicalConditionProvider]) => {
      return this.data.userDeleteMedicalConditionProvider({
        medicalConditionProviderId: medicalConditionProvider.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.medicalConditionProviderService.importMedicalConditionProviders(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addMedicalConditionProviders(created);
      this.updateMedicalConditionProviders(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('medicalConditionProviderId')) {
      var medicalConditionProviderId = this.route.snapshot.paramMap.get('medicalConditionProviderId');
      this.setFormName('medicalConditionProvider_edit');
    } else {
      this.setFormName('medicalConditionProvider_create');
    }
    if (this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId");
      this.setClinicalProviderId(clinicalProviderId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.medicalConditionProviderService.validateMedicalConditionProviderExcelData(excelData, vm.clinicalProviders);
    }));
  }
}
WebMedicalConditionProviderFeatureStore.ɵfac = function WebMedicalConditionProviderFeatureStore_Factory(t) {
  return new (t || WebMedicalConditionProviderFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_medical_condition_provider_service__WEBPACK_IMPORTED_MODULE_12__.MedicalConditionProviderService));
};
WebMedicalConditionProviderFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebMedicalConditionProviderFeatureStore,
  factory: WebMedicalConditionProviderFeatureStore.ɵfac
});

/***/ }),

/***/ 675714:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/rules/create-medical-condition-provider-input-is-valid.rule.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMedicalConditionProviderInputIsValidRule": () => (/* binding */ CreateMedicalConditionProviderInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _medical_condition_provider_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./medical-condition-provider-name-is-valid.rule */ 151085);


class CreateMedicalConditionProviderInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _medical_condition_provider_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionProviderNameIsValidRule('name', 'The medicalconditionprovider name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 151085:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/shared/rules/medical-condition-provider-name-is-valid.rule.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MedicalConditionProviderNameIsValidRule": () => (/* binding */ MedicalConditionProviderNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class MedicalConditionProviderNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 91681:
/*!*********************************************************************************************************************************************************!*\
  !*** ./libs/web/medical-condition-provider/ui/web-medical-condition-provider-select-form/web-medical-condition-provider-select-table-view.component.ts ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebMedicalConditionProviderSelectTableViewComponent": () => (/* binding */ WebMedicalConditionProviderSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebMedicalConditionProviderSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.medicalConditionProviders = [];
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
      field: 'medicalConditionId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'clinicalProviderId',
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
WebMedicalConditionProviderSelectTableViewComponent.ɵfac = function WebMedicalConditionProviderSelectTableViewComponent_Factory(t) {
  return new (t || WebMedicalConditionProviderSelectTableViewComponent)();
};
WebMedicalConditionProviderSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebMedicalConditionProviderSelectTableViewComponent,
  selectors: [["ui-medical-condition-provider-select-table-view"]],
  viewQuery: function WebMedicalConditionProviderSelectTableViewComponent_Query(rf, ctx) {
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
    medicalConditionProviders: "medicalConditionProviders"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebMedicalConditionProviderSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebMedicalConditionProviderSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebMedicalConditionProviderSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.medicalConditionProviders)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);