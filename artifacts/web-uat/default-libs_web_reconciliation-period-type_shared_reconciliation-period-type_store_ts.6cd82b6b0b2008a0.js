"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_reconciliation-period-type_shared_reconciliation-period-type_store_ts"],{

/***/ 309585:
/*!********************************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/actions/create-reconciliation-period-type.action.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateReconciliationPeriodTypeAction": () => (/* binding */ CreateReconciliationPeriodTypeAction)
/* harmony export */ });
/* harmony import */ var _reconciliation_period_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation-period-type.business-action-base */ 578579);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_reconciliation_period_type_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-reconciliation-period-type-input-is-valid.rule */ 122263);




class CreateReconciliationPeriodTypeAction extends _reconciliation_period_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ReconciliationPeriodTypeBusinessActionBase {
  constructor(input) {
    super('CreateReconciliationPeriodTypeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_reconciliation_period_type_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateReconciliationPeriodTypeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateReconciliationPeriodType({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 578579:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/actions/reconciliation-period-type.business-action-base.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReconciliationPeriodTypeBusinessActionBase": () => (/* binding */ ReconciliationPeriodTypeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ReconciliationPeriodTypeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 394101:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/actions/update-reconciliation-period-types.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateReconciliationPeriodTypeAction": () => (/* binding */ UpdateReconciliationPeriodTypeAction),
/* harmony export */   "UpdateReconciliationPeriodTypesAction": () => (/* binding */ UpdateReconciliationPeriodTypesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _reconciliation_period_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation-period-type.business-action-base */ 578579);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateReconciliationPeriodTypesAction extends _reconciliation_period_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ReconciliationPeriodTypeBusinessActionBase {
  constructor(reconciliationPeriodTypes) {
    super('UpdateReconciliationPeriodTypesAction');
    this.reconciliationPeriodTypes = reconciliationPeriodTypes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.reconciliationPeriodTypes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateReconciliationPeriodTypes({
      input: {
        reconciliationPeriodTypes: this.reconciliationPeriodTypes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateReconciliationPeriodTypeAction extends _reconciliation_period_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ReconciliationPeriodTypeBusinessActionBase {
  constructor(reconciliationPeriodType, reconciliationPeriodTypeId) {
    super('UpdateReconciliationPeriodTypeAction');
    this.reconciliationPeriodType = reconciliationPeriodType;
    this.reconciliationPeriodTypeId = reconciliationPeriodTypeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.reconciliationPeriodType, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.reconciliationPeriodTypeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateReconciliationPeriodType({
      reconciliationPeriodTypeId: this.reconciliationPeriodTypeId,
      input: this.reconciliationPeriodType
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 804812:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/actions/validate-reconciliation-period-type-excel-data.action.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateReconciliationPeriodTypeExcelDataAction": () => (/* binding */ ValidateReconciliationPeriodTypeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _reconciliation_period_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation-period-type.business-action-base */ 578579);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateReconciliationPeriodTypeExcelDataAction extends _reconciliation_period_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ReconciliationPeriodTypeBusinessActionBase {
  constructor(excelData) {
    super('ValidateReconciliationPeriodTypeExcelDataAction');
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

/***/ 449084:
/*!************************************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/reconciliation-period-type.business-provider.service.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReconciliationPeriodTypeBusinessProviderService": () => (/* binding */ ReconciliationPeriodTypeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_reconciliation_period_type_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-reconciliation-period-type-excel-data.action */ 804812);
/* harmony import */ var _actions_create_reconciliation_period_type_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-reconciliation-period-type.action */ 309585);
/* harmony import */ var _actions_update_reconciliation_period_types_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-reconciliation-period-types.action */ 394101);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ReconciliationPeriodTypeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ReconciliationPeriodTypeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createReconciliationPeriodType(input) {
    const action = new _actions_create_reconciliation_period_type_action__WEBPACK_IMPORTED_MODULE_2__.CreateReconciliationPeriodTypeAction(input);
    action.Do(this);
    return action.response;
  }
  updateReconciliationPeriodType(input, reconciliationPeriodTypeId) {
    const action = new _actions_update_reconciliation_period_types_action__WEBPACK_IMPORTED_MODULE_3__.UpdateReconciliationPeriodTypeAction(input, reconciliationPeriodTypeId);
    action.Do(this);
    return action.response;
  }
  importReconciliationPeriodTypes(reconciliationPeriodTypes) {
    const updateReconciliationPeriodTypesAction = new _actions_update_reconciliation_period_types_action__WEBPACK_IMPORTED_MODULE_3__.UpdateReconciliationPeriodTypesAction(reconciliationPeriodTypes);
    updateReconciliationPeriodTypesAction.Do(this);
    return updateReconciliationPeriodTypesAction.response;
  }
  validateReconciliationPeriodTypeExcelData(excelData) {
    const validateReconciliationPeriodTypeExcelDataAction = new _actions_validate_reconciliation_period_type_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateReconciliationPeriodTypeExcelDataAction(excelData);
    validateReconciliationPeriodTypeExcelDataAction.Do(this);
    return validateReconciliationPeriodTypeExcelDataAction.response;
  }
}
ReconciliationPeriodTypeBusinessProviderService.ɵfac = function ReconciliationPeriodTypeBusinessProviderService_Factory(t) {
  return new (t || ReconciliationPeriodTypeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ReconciliationPeriodTypeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ReconciliationPeriodTypeBusinessProviderService,
  factory: ReconciliationPeriodTypeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 412521:
/*!******************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/reconciliation-period-type.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReconciliationPeriodTypeService": () => (/* binding */ ReconciliationPeriodTypeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _reconciliation_period_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reconciliation-period-type.business-provider.service */ 449084);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ReconciliationPeriodTypeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ReconciliationPeriodTypeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createReconciliationPeriodType(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createReconciliationPeriodType(filteredObj);
  }
  updateReconciliationPeriodType(input, reconciliationPeriodTypeId) {
    return this.businessProvider.updateReconciliationPeriodType(input, reconciliationPeriodTypeId);
  }
  importReconciliationPeriodTypes(reconciliationPeriodTypes) {
    return this.businessProvider.importReconciliationPeriodTypes(reconciliationPeriodTypes);
  }
  validateReconciliationPeriodTypeExcelData(excelData) {
    return this.businessProvider.validateReconciliationPeriodTypeExcelData(excelData);
  }
}
ReconciliationPeriodTypeService.ɵfac = function ReconciliationPeriodTypeService_Factory(t) {
  return new (t || ReconciliationPeriodTypeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_reconciliation_period_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ReconciliationPeriodTypeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_reconciliation_period_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ReconciliationPeriodTypeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ReconciliationPeriodTypeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ReconciliationPeriodTypeService,
  factory: ReconciliationPeriodTypeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 674877:
/*!****************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/reconciliation-period-type.store.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebReconciliationPeriodTypeFeatureStore": () => (/* binding */ WebReconciliationPeriodTypeFeatureStore)
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
/* harmony import */ var _reconciliation_period_type_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./reconciliation-period-type.service */ 412521);














class WebReconciliationPeriodTypeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, reconciliationPeriodTypeService) {
    super({
      loading: false,
      reconciliationPeriodTypes: [],
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
    this.reconciliationPeriodTypeService = reconciliationPeriodTypeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.reconciliationPeriodTypes$ = this.select(s => s.reconciliationPeriodTypes);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.reconciliationPeriodTypes$, (errors, loading, item, formName, reconciliationPeriodTypes) => ({
      errors,
      loading,
      item,
      formName,
      reconciliationPeriodTypes
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
    this.addNewReconciliationPeriodType = this.updater((state, reconciliationPeriodType) => Object.assign(Object.assign({}, state), {
      reconciliationPeriodTypes: [...state.reconciliationPeriodTypes, reconciliationPeriodType]
    }));
    this.updateReconciliationPeriodType = this.updater((state, reconciliationPeriodType) => {
      return Object.assign(Object.assign({}, state), {
        reconciliationPeriodTypes: state.reconciliationPeriodTypes.map(el => {
          if (el.id === reconciliationPeriodType.id) {
            return reconciliationPeriodType;
          } else {
            return el;
          }
        })
      });
    });
    this.addReconciliationPeriodTypes = this.updater((state, newReconciliationPeriodTypes) => Object.assign(Object.assign({}, state), {
      reconciliationPeriodTypes: state.reconciliationPeriodTypes.concat(newReconciliationPeriodTypes)
    }));
    this.updateReconciliationPeriodTypes = this.updater((state, updatedReconciliationPeriodTypes) => {
      return Object.assign(Object.assign({}, state), {
        reconciliationPeriodTypes: state.reconciliationPeriodTypes.map(reconciliationPeriodType => {
          const updated = updatedReconciliationPeriodTypes.find(el => el.id === reconciliationPeriodType.id);
          return updated ? updated : reconciliationPeriodType;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadReconciliationPeriodTypeEffect = this.effect(reconciliationPeriodTypeId$ => reconciliationPeriodTypeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(reconciliationPeriodTypeId => this.data.userReconciliationPeriodType({
      reconciliationPeriodTypeId
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
    this.loadReconciliationPeriodTypesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userReconciliationPeriodTypes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      reconciliationPeriodTypes: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createReconciliationPeriodTypeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.reconciliationPeriodTypeService.createReconciliationPeriodType(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(reconciliationPeriodType => {
      this.addNewReconciliationPeriodType(reconciliationPeriodType);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: reconciliationPeriodType,
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
    this.updateReconciliationPeriodTypeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.reconciliationPeriodTypeService.updateReconciliationPeriodType(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(reconciliationPeriodType => {
      this.updateReconciliationPeriodType(reconciliationPeriodType);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: reconciliationPeriodType,
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
    this.deleteReconciliationPeriodTypeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, reconciliationPeriodType]) => {
      return this.data.userDeleteReconciliationPeriodType({
        reconciliationPeriodTypeId: reconciliationPeriodType.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.reconciliationPeriodTypeService.importReconciliationPeriodTypes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addReconciliationPeriodTypes(created);
      this.updateReconciliationPeriodTypes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('reconciliationPeriodTypeId')) {
      var reconciliationPeriodTypeId = this.route.snapshot.paramMap.get('reconciliationPeriodTypeId');
      this.setFormName('reconciliationPeriodType_edit');
    } else {
      this.setFormName('reconciliationPeriodType_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.reconciliationPeriodTypeService.validateReconciliationPeriodTypeExcelData(excelData);
    }));
  }
}
WebReconciliationPeriodTypeFeatureStore.ɵfac = function WebReconciliationPeriodTypeFeatureStore_Factory(t) {
  return new (t || WebReconciliationPeriodTypeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_reconciliation_period_type_service__WEBPACK_IMPORTED_MODULE_11__.ReconciliationPeriodTypeService));
};
WebReconciliationPeriodTypeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebReconciliationPeriodTypeFeatureStore,
  factory: WebReconciliationPeriodTypeFeatureStore.ɵfac
});

/***/ }),

/***/ 122263:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/rules/create-reconciliation-period-type-input-is-valid.rule.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateReconciliationPeriodTypeInputIsValidRule": () => (/* binding */ CreateReconciliationPeriodTypeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _reconciliation_period_type_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation-period-type-name-is-valid.rule */ 371365);


class CreateReconciliationPeriodTypeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _reconciliation_period_type_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ReconciliationPeriodTypeNameIsValidRule('name', 'The reconciliationperiodtype name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 371365:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/reconciliation-period-type/shared/rules/reconciliation-period-type-name-is-valid.rule.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReconciliationPeriodTypeNameIsValidRule": () => (/* binding */ ReconciliationPeriodTypeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ReconciliationPeriodTypeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);