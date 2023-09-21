"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_recommended-order-diagnosis-code_shared_recommended-order-diagnosis-code_store_ts"],{

/***/ 239443:
/*!********************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/actions/create-recommended-order-diagnosis-code.action.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRecommendedOrderDiagnosisCodeAction": () => (/* binding */ CreateRecommendedOrderDiagnosisCodeAction)
/* harmony export */ });
/* harmony import */ var _recommended_order_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-diagnosis-code.business-action-base */ 500821);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_recommended_order_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-recommended-order-diagnosis-code-input-is-valid.rule */ 521183);




class CreateRecommendedOrderDiagnosisCodeAction extends _recommended_order_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderDiagnosisCodeBusinessActionBase {
  constructor(input) {
    super('CreateRecommendedOrderDiagnosisCodeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_recommended_order_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateRecommendedOrderDiagnosisCodeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateRecommendedOrderDiagnosisCode({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 500821:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/actions/recommended-order-diagnosis-code.business-action-base.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderDiagnosisCodeBusinessActionBase": () => (/* binding */ RecommendedOrderDiagnosisCodeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class RecommendedOrderDiagnosisCodeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 134731:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/actions/update-recommended-order-diagnosis-codes.action.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateRecommendedOrderDiagnosisCodeAction": () => (/* binding */ UpdateRecommendedOrderDiagnosisCodeAction),
/* harmony export */   "UpdateRecommendedOrderDiagnosisCodesAction": () => (/* binding */ UpdateRecommendedOrderDiagnosisCodesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _recommended_order_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-diagnosis-code.business-action-base */ 500821);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateRecommendedOrderDiagnosisCodesAction extends _recommended_order_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderDiagnosisCodeBusinessActionBase {
  constructor(recommendedOrderDiagnosisCodes) {
    super('UpdateRecommendedOrderDiagnosisCodesAction');
    this.recommendedOrderDiagnosisCodes = recommendedOrderDiagnosisCodes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.recommendedOrderDiagnosisCodes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRecommendedOrderDiagnosisCodes({
      input: {
        recommendedOrderDiagnosisCodes: this.recommendedOrderDiagnosisCodes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateRecommendedOrderDiagnosisCodeAction extends _recommended_order_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderDiagnosisCodeBusinessActionBase {
  constructor(recommendedOrderDiagnosisCode, recommendedOrderDiagnosisCodeId) {
    super('UpdateRecommendedOrderDiagnosisCodeAction');
    this.recommendedOrderDiagnosisCode = recommendedOrderDiagnosisCode;
    this.recommendedOrderDiagnosisCodeId = recommendedOrderDiagnosisCodeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.recommendedOrderDiagnosisCode, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.recommendedOrderDiagnosisCodeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRecommendedOrderDiagnosisCode({
      recommendedOrderDiagnosisCodeId: this.recommendedOrderDiagnosisCodeId,
      input: this.recommendedOrderDiagnosisCode
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 928165:
/*!*********************************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/actions/validate-recommended-order-diagnosis-code-excel-data.action.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateRecommendedOrderDiagnosisCodeExcelDataAction": () => (/* binding */ ValidateRecommendedOrderDiagnosisCodeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _recommended_order_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-diagnosis-code.business-action-base */ 500821);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateRecommendedOrderDiagnosisCodeExcelDataAction extends _recommended_order_diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderDiagnosisCodeBusinessActionBase {
  constructor(excelData, diagnoses, recommendedOrders) {
    super('ValidateRecommendedOrderDiagnosisCodeExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.diagnoses = diagnoses;
    this.recommendedOrders = recommendedOrders;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`diagnosisName_${index}_is_valid}`, "Diagnosis Is Not Valid", 'diagnosis.name', datum['diagnosis'], this.diagnoses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`recommendedOrderName_${index}_is_valid}`, "Recommended Order Is Not Valid", 'recommendedOrder.name', datum['recommendedOrder'], this.recommendedOrders, true));
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

/***/ 6526:
/*!************************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/recommended-order-diagnosis-code.business-provider.service.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderDiagnosisCodeBusinessProviderService": () => (/* binding */ RecommendedOrderDiagnosisCodeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_recommended_order_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-recommended-order-diagnosis-code-excel-data.action */ 928165);
/* harmony import */ var _actions_create_recommended_order_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-recommended-order-diagnosis-code.action */ 239443);
/* harmony import */ var _actions_update_recommended_order_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-recommended-order-diagnosis-codes.action */ 134731);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class RecommendedOrderDiagnosisCodeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.RecommendedOrderDiagnosisCodeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createRecommendedOrderDiagnosisCode(input) {
    const action = new _actions_create_recommended_order_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__.CreateRecommendedOrderDiagnosisCodeAction(input);
    action.Do(this);
    return action.response;
  }
  updateRecommendedOrderDiagnosisCode(input, recommendedOrderDiagnosisCodeId) {
    const action = new _actions_update_recommended_order_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRecommendedOrderDiagnosisCodeAction(input, recommendedOrderDiagnosisCodeId);
    action.Do(this);
    return action.response;
  }
  importRecommendedOrderDiagnosisCodes(recommendedOrderDiagnosisCodes) {
    const updateRecommendedOrderDiagnosisCodesAction = new _actions_update_recommended_order_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRecommendedOrderDiagnosisCodesAction(recommendedOrderDiagnosisCodes);
    updateRecommendedOrderDiagnosisCodesAction.Do(this);
    return updateRecommendedOrderDiagnosisCodesAction.response;
  }
  validateRecommendedOrderDiagnosisCodeExcelData(excelData, diagnoses, recommendedOrders) {
    const validateRecommendedOrderDiagnosisCodeExcelDataAction = new _actions_validate_recommended_order_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateRecommendedOrderDiagnosisCodeExcelDataAction(excelData, diagnoses, recommendedOrders);
    validateRecommendedOrderDiagnosisCodeExcelDataAction.Do(this);
    return validateRecommendedOrderDiagnosisCodeExcelDataAction.response;
  }
}
RecommendedOrderDiagnosisCodeBusinessProviderService.ɵfac = function RecommendedOrderDiagnosisCodeBusinessProviderService_Factory(t) {
  return new (t || RecommendedOrderDiagnosisCodeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
RecommendedOrderDiagnosisCodeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: RecommendedOrderDiagnosisCodeBusinessProviderService,
  factory: RecommendedOrderDiagnosisCodeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 70895:
/*!******************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/recommended-order-diagnosis-code.service.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderDiagnosisCodeService": () => (/* binding */ RecommendedOrderDiagnosisCodeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _recommended_order_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommended-order-diagnosis-code.business-provider.service */ 6526);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class RecommendedOrderDiagnosisCodeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("RecommendedOrderDiagnosisCodeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createRecommendedOrderDiagnosisCode(input) {
    return this.businessProvider.createRecommendedOrderDiagnosisCode(input);
  }
  updateRecommendedOrderDiagnosisCode(input, recommendedOrderDiagnosisCodeId) {
    return this.businessProvider.updateRecommendedOrderDiagnosisCode(input, recommendedOrderDiagnosisCodeId);
  }
  importRecommendedOrderDiagnosisCodes(recommendedOrderDiagnosisCodes) {
    return this.businessProvider.importRecommendedOrderDiagnosisCodes(recommendedOrderDiagnosisCodes);
  }
  validateRecommendedOrderDiagnosisCodeExcelData(excelData, diagnoses, recommendedOrders) {
    return this.businessProvider.validateRecommendedOrderDiagnosisCodeExcelData(excelData, diagnoses, recommendedOrders);
  }
}
RecommendedOrderDiagnosisCodeService.ɵfac = function RecommendedOrderDiagnosisCodeService_Factory(t) {
  return new (t || RecommendedOrderDiagnosisCodeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_recommended_order_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RecommendedOrderDiagnosisCodeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_recommended_order_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RecommendedOrderDiagnosisCodeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
RecommendedOrderDiagnosisCodeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: RecommendedOrderDiagnosisCodeService,
  factory: RecommendedOrderDiagnosisCodeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 416728:
/*!****************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/recommended-order-diagnosis-code.store.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRecommendedOrderDiagnosisCodeFeatureStore": () => (/* binding */ WebRecommendedOrderDiagnosisCodeFeatureStore)
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
/* harmony import */ var _recommended_order_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./recommended-order-diagnosis-code.service */ 70895);














class WebRecommendedOrderDiagnosisCodeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, recommendedOrderDiagnosisCodeService) {
    super({
      loading: false,
      recommendedOrderDiagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      diagnosisCodeId: undefined,
      recommendedOrderId: undefined,
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
    this.recommendedOrderDiagnosisCodeService = recommendedOrderDiagnosisCodeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.recommendedOrderDiagnosisCodes$ = this.select(s => s.recommendedOrderDiagnosisCodes);
    this.diagnosisCodes$ = this.select(s => s.diagnosisCodes || []);
    this.recommendedOrders$ = this.select(s => s.recommendedOrders || []);
    this.diagnosisCodeId$ = this.select(s => s.diagnosisCodeId);
    this.recommendedOrderId$ = this.select(s => s.recommendedOrderId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.recommendedOrderDiagnosisCodes$, this.diagnosisCodes$, this.recommendedOrders$, (errors, loading, item, formName, recommendedOrderDiagnosisCodes, diagnosisCodes, recommendedOrders) => ({
      errors,
      loading,
      item,
      formName,
      recommendedOrderDiagnosisCodes,
      diagnosisCodes,
      recommendedOrders
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.diagnosisCodeId$, this.recommendedOrderId$, this.searchQuery$, (paging, diagnosisCodeId, recommendedOrderId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      diagnosisCodeId: diagnosisCodeId,
      recommendedOrderId: recommendedOrderId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setDiagnosisCodeId = this.updater((state, diagnosisCodeId) => Object.assign(Object.assign({}, state), {
      diagnosisCodeId
    }));
    this.setRecommendedOrderId = this.updater((state, recommendedOrderId) => Object.assign(Object.assign({}, state), {
      recommendedOrderId
    }));
    this.filterDiagnosisCodes = term => this.data.userSelectDiagnosisCodes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let diagnosisCodes = res.data.items;
      this.patchState({
        diagnosisCodes
      });
      return diagnosisCodes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterRecommendedOrders = term => this.data.userSelectRecommendedOrders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let recommendedOrders = res.data.items;
      this.patchState({
        recommendedOrders
      });
      return recommendedOrders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addDiagnosisCode = this.updater((state, diagnosisCode) => Object.assign(Object.assign({}, state), {
      diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
    }));
    this.addRecommendedOrder = this.updater((state, recommendedOrder) => Object.assign(Object.assign({}, state), {
      recommendedOrders: state.recommendedOrders.concat(recommendedOrder)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewRecommendedOrderDiagnosisCode = this.updater((state, recommendedOrderDiagnosisCode) => Object.assign(Object.assign({}, state), {
      recommendedOrderDiagnosisCodes: [...state.recommendedOrderDiagnosisCodes, recommendedOrderDiagnosisCode]
    }));
    this.updateRecommendedOrderDiagnosisCode = this.updater((state, recommendedOrderDiagnosisCode) => {
      return Object.assign(Object.assign({}, state), {
        recommendedOrderDiagnosisCodes: state.recommendedOrderDiagnosisCodes.map(el => {
          if (el.id === recommendedOrderDiagnosisCode.id) {
            return recommendedOrderDiagnosisCode;
          } else {
            return el;
          }
        })
      });
    });
    this.addRecommendedOrderDiagnosisCodes = this.updater((state, newRecommendedOrderDiagnosisCodes) => Object.assign(Object.assign({}, state), {
      recommendedOrderDiagnosisCodes: state.recommendedOrderDiagnosisCodes.concat(newRecommendedOrderDiagnosisCodes)
    }));
    this.updateRecommendedOrderDiagnosisCodes = this.updater((state, updatedRecommendedOrderDiagnosisCodes) => {
      return Object.assign(Object.assign({}, state), {
        recommendedOrderDiagnosisCodes: state.recommendedOrderDiagnosisCodes.map(recommendedOrderDiagnosisCode => {
          const updated = updatedRecommendedOrderDiagnosisCodes.find(el => el.id === recommendedOrderDiagnosisCode.id);
          return updated ? updated : recommendedOrderDiagnosisCode;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadRecommendedOrderDiagnosisCodeEffect = this.effect(recommendedOrderDiagnosisCodeId$ => recommendedOrderDiagnosisCodeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(recommendedOrderDiagnosisCodeId => this.data.userRecommendedOrderDiagnosisCode({
      recommendedOrderDiagnosisCodeId
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
    this.loadRecommendedOrderDiagnosisCodesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userRecommendedOrderDiagnosisCodes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      recommendedOrderDiagnosisCodes: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createRecommendedOrderDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.recommendedOrderDiagnosisCodeService.createRecommendedOrderDiagnosisCode(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(recommendedOrderDiagnosisCode => {
      this.addNewRecommendedOrderDiagnosisCode(recommendedOrderDiagnosisCode);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: recommendedOrderDiagnosisCode,
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
    this.updateRecommendedOrderDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.recommendedOrderDiagnosisCodeService.updateRecommendedOrderDiagnosisCode(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(recommendedOrderDiagnosisCode => {
      this.updateRecommendedOrderDiagnosisCode(recommendedOrderDiagnosisCode);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: recommendedOrderDiagnosisCode,
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
    this.deleteRecommendedOrderDiagnosisCodeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, recommendedOrderDiagnosisCode]) => {
      return this.data.userDeleteRecommendedOrderDiagnosisCode({
        recommendedOrderDiagnosisCodeId: recommendedOrderDiagnosisCode.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.recommendedOrderDiagnosisCodeService.importRecommendedOrderDiagnosisCodes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addRecommendedOrderDiagnosisCodes(created);
      this.updateRecommendedOrderDiagnosisCodes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('recommendedOrderDiagnosisCodeId')) {
      var recommendedOrderDiagnosisCodeId = this.route.snapshot.paramMap.get('recommendedOrderDiagnosisCodeId');
      this.setFormName('recommendedOrderDiagnosisCode_edit');
    } else {
      this.setFormName('recommendedOrderDiagnosisCode_create');
    }
    if (this.route.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get("diagnosisCodeId");
      this.setDiagnosisCodeId(diagnosisCodeId);
    }
    if (this.route.snapshot.paramMap.has("recommendedOrderId")) {
      var recommendedOrderId = this.route.snapshot.paramMap.get("recommendedOrderId");
      this.setRecommendedOrderId(recommendedOrderId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.recommendedOrderDiagnosisCodeService.validateRecommendedOrderDiagnosisCodeExcelData(excelData, vm.diagnosisCodes, vm.recommendedOrders);
    }));
  }
}
WebRecommendedOrderDiagnosisCodeFeatureStore.ɵfac = function WebRecommendedOrderDiagnosisCodeFeatureStore_Factory(t) {
  return new (t || WebRecommendedOrderDiagnosisCodeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_recommended_order_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_12__.RecommendedOrderDiagnosisCodeService));
};
WebRecommendedOrderDiagnosisCodeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebRecommendedOrderDiagnosisCodeFeatureStore,
  factory: WebRecommendedOrderDiagnosisCodeFeatureStore.ɵfac
});

/***/ }),

/***/ 521183:
/*!*******************************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/rules/create-recommended-order-diagnosis-code-input-is-valid.rule.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRecommendedOrderDiagnosisCodeInputIsValidRule": () => (/* binding */ CreateRecommendedOrderDiagnosisCodeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _recommended_order_diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommended-order-diagnosis-code-name-is-valid.rule */ 870491);


class CreateRecommendedOrderDiagnosisCodeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _recommended_order_diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.RecommendedOrderDiagnosisCodeNameIsValidRule('name', 'The recommendedorderdiagnosiscode name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 870491:
/*!***********************************************************************************************************************!*\
  !*** ./libs/web/recommended-order-diagnosis-code/shared/rules/recommended-order-diagnosis-code-name-is-valid.rule.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecommendedOrderDiagnosisCodeNameIsValidRule": () => (/* binding */ RecommendedOrderDiagnosisCodeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class RecommendedOrderDiagnosisCodeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);