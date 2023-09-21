"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_calculation-basis-type_shared_calculation-basis-type_store_ts"],{

/***/ 324017:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/actions/calculation-basis-type.business-action-base.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculationBasisTypeBusinessActionBase": () => (/* binding */ CalculationBasisTypeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class CalculationBasisTypeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 173477:
/*!************************************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/actions/create-calculation-basis-type.action.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCalculationBasisTypeAction": () => (/* binding */ CreateCalculationBasisTypeAction)
/* harmony export */ });
/* harmony import */ var _calculation_basis_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculation-basis-type.business-action-base */ 324017);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_calculation_basis_type_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-calculation-basis-type-input-is-valid.rule */ 485035);




class CreateCalculationBasisTypeAction extends _calculation_basis_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CalculationBasisTypeBusinessActionBase {
  constructor(input) {
    super('CreateCalculationBasisTypeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_calculation_basis_type_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateCalculationBasisTypeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateCalculationBasisType({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 93401:
/*!*************************************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/actions/update-calculation-basis-types.action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCalculationBasisTypeAction": () => (/* binding */ UpdateCalculationBasisTypeAction),
/* harmony export */   "UpdateCalculationBasisTypesAction": () => (/* binding */ UpdateCalculationBasisTypesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _calculation_basis_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculation-basis-type.business-action-base */ 324017);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateCalculationBasisTypesAction extends _calculation_basis_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CalculationBasisTypeBusinessActionBase {
  constructor(calculationBasisTypes) {
    super('UpdateCalculationBasisTypesAction');
    this.calculationBasisTypes = calculationBasisTypes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.calculationBasisTypes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCalculationBasisTypes({
      input: {
        calculationBasisTypes: this.calculationBasisTypes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateCalculationBasisTypeAction extends _calculation_basis_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CalculationBasisTypeBusinessActionBase {
  constructor(calculationBasisType, calculationBasisTypeId) {
    super('UpdateCalculationBasisTypeAction');
    this.calculationBasisType = calculationBasisType;
    this.calculationBasisTypeId = calculationBasisTypeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.calculationBasisType, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.calculationBasisTypeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCalculationBasisType({
      calculationBasisTypeId: this.calculationBasisTypeId,
      input: this.calculationBasisType
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 173851:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/actions/validate-calculation-basis-type-excel-data.action.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateCalculationBasisTypeExcelDataAction": () => (/* binding */ ValidateCalculationBasisTypeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _calculation_basis_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculation-basis-type.business-action-base */ 324017);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateCalculationBasisTypeExcelDataAction extends _calculation_basis_type_business_action_base__WEBPACK_IMPORTED_MODULE_1__.CalculationBasisTypeBusinessActionBase {
  constructor(excelData) {
    super('ValidateCalculationBasisTypeExcelDataAction');
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

/***/ 463574:
/*!****************************************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/calculation-basis-type.business-provider.service.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculationBasisTypeBusinessProviderService": () => (/* binding */ CalculationBasisTypeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_calculation_basis_type_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-calculation-basis-type-excel-data.action */ 173851);
/* harmony import */ var _actions_create_calculation_basis_type_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-calculation-basis-type.action */ 173477);
/* harmony import */ var _actions_update_calculation_basis_types_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-calculation-basis-types.action */ 93401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class CalculationBasisTypeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.CalculationBasisTypeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createCalculationBasisType(input) {
    const action = new _actions_create_calculation_basis_type_action__WEBPACK_IMPORTED_MODULE_2__.CreateCalculationBasisTypeAction(input);
    action.Do(this);
    return action.response;
  }
  updateCalculationBasisType(input, calculationBasisTypeId) {
    const action = new _actions_update_calculation_basis_types_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCalculationBasisTypeAction(input, calculationBasisTypeId);
    action.Do(this);
    return action.response;
  }
  importCalculationBasisTypes(calculationBasisTypes) {
    const updateCalculationBasisTypesAction = new _actions_update_calculation_basis_types_action__WEBPACK_IMPORTED_MODULE_3__.UpdateCalculationBasisTypesAction(calculationBasisTypes);
    updateCalculationBasisTypesAction.Do(this);
    return updateCalculationBasisTypesAction.response;
  }
  validateCalculationBasisTypeExcelData(excelData) {
    const validateCalculationBasisTypeExcelDataAction = new _actions_validate_calculation_basis_type_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateCalculationBasisTypeExcelDataAction(excelData);
    validateCalculationBasisTypeExcelDataAction.Do(this);
    return validateCalculationBasisTypeExcelDataAction.response;
  }
}
CalculationBasisTypeBusinessProviderService.ɵfac = function CalculationBasisTypeBusinessProviderService_Factory(t) {
  return new (t || CalculationBasisTypeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
CalculationBasisTypeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: CalculationBasisTypeBusinessProviderService,
  factory: CalculationBasisTypeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 253427:
/*!**********************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/calculation-basis-type.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculationBasisTypeService": () => (/* binding */ CalculationBasisTypeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _calculation_basis_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calculation-basis-type.business-provider.service */ 463574);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class CalculationBasisTypeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("CalculationBasisTypeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createCalculationBasisType(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createCalculationBasisType(filteredObj);
  }
  updateCalculationBasisType(input, calculationBasisTypeId) {
    return this.businessProvider.updateCalculationBasisType(input, calculationBasisTypeId);
  }
  importCalculationBasisTypes(calculationBasisTypes) {
    return this.businessProvider.importCalculationBasisTypes(calculationBasisTypes);
  }
  validateCalculationBasisTypeExcelData(excelData) {
    return this.businessProvider.validateCalculationBasisTypeExcelData(excelData);
  }
}
CalculationBasisTypeService.ɵfac = function CalculationBasisTypeService_Factory(t) {
  return new (t || CalculationBasisTypeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_calculation_basis_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CalculationBasisTypeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_calculation_basis_type_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.CalculationBasisTypeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
CalculationBasisTypeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: CalculationBasisTypeService,
  factory: CalculationBasisTypeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 417811:
/*!********************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/calculation-basis-type.store.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCalculationBasisTypeFeatureStore": () => (/* binding */ WebCalculationBasisTypeFeatureStore)
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
/* harmony import */ var _calculation_basis_type_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./calculation-basis-type.service */ 253427);














class WebCalculationBasisTypeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, calculationBasisTypeService) {
    super({
      loading: false,
      calculationBasisTypes: [],
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
    this.calculationBasisTypeService = calculationBasisTypeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.calculationBasisTypes$ = this.select(s => s.calculationBasisTypes);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.calculationBasisTypes$, (errors, loading, item, formName, calculationBasisTypes) => ({
      errors,
      loading,
      item,
      formName,
      calculationBasisTypes
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
    this.addNewCalculationBasisType = this.updater((state, calculationBasisType) => Object.assign(Object.assign({}, state), {
      calculationBasisTypes: [...state.calculationBasisTypes, calculationBasisType]
    }));
    this.updateCalculationBasisType = this.updater((state, calculationBasisType) => {
      return Object.assign(Object.assign({}, state), {
        calculationBasisTypes: state.calculationBasisTypes.map(el => {
          if (el.id === calculationBasisType.id) {
            return calculationBasisType;
          } else {
            return el;
          }
        })
      });
    });
    this.addCalculationBasisTypes = this.updater((state, newCalculationBasisTypes) => Object.assign(Object.assign({}, state), {
      calculationBasisTypes: state.calculationBasisTypes.concat(newCalculationBasisTypes)
    }));
    this.updateCalculationBasisTypes = this.updater((state, updatedCalculationBasisTypes) => {
      return Object.assign(Object.assign({}, state), {
        calculationBasisTypes: state.calculationBasisTypes.map(calculationBasisType => {
          const updated = updatedCalculationBasisTypes.find(el => el.id === calculationBasisType.id);
          return updated ? updated : calculationBasisType;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadCalculationBasisTypeEffect = this.effect(calculationBasisTypeId$ => calculationBasisTypeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(calculationBasisTypeId => this.data.userCalculationBasisType({
      calculationBasisTypeId
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
    this.loadCalculationBasisTypesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userCalculationBasisTypes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      calculationBasisTypes: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createCalculationBasisTypeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.calculationBasisTypeService.createCalculationBasisType(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(calculationBasisType => {
      this.addNewCalculationBasisType(calculationBasisType);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: calculationBasisType,
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
    this.updateCalculationBasisTypeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.calculationBasisTypeService.updateCalculationBasisType(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(calculationBasisType => {
      this.updateCalculationBasisType(calculationBasisType);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: calculationBasisType,
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
    this.deleteCalculationBasisTypeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, calculationBasisType]) => {
      return this.data.userDeleteCalculationBasisType({
        calculationBasisTypeId: calculationBasisType.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.calculationBasisTypeService.importCalculationBasisTypes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addCalculationBasisTypes(created);
      this.updateCalculationBasisTypes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('calculationBasisTypeId')) {
      var calculationBasisTypeId = this.route.snapshot.paramMap.get('calculationBasisTypeId');
      this.setFormName('calculationBasisType_edit');
    } else {
      this.setFormName('calculationBasisType_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.calculationBasisTypeService.validateCalculationBasisTypeExcelData(excelData);
    }));
  }
}
WebCalculationBasisTypeFeatureStore.ɵfac = function WebCalculationBasisTypeFeatureStore_Factory(t) {
  return new (t || WebCalculationBasisTypeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_calculation_basis_type_service__WEBPACK_IMPORTED_MODULE_11__.CalculationBasisTypeService));
};
WebCalculationBasisTypeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebCalculationBasisTypeFeatureStore,
  factory: WebCalculationBasisTypeFeatureStore.ɵfac
});

/***/ }),

/***/ 752363:
/*!***************************************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/rules/calculation-basis-type-name-is-valid.rule.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculationBasisTypeNameIsValidRule": () => (/* binding */ CalculationBasisTypeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class CalculationBasisTypeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 485035:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/calculation-basis-type/shared/rules/create-calculation-basis-type-input-is-valid.rule.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCalculationBasisTypeInputIsValidRule": () => (/* binding */ CreateCalculationBasisTypeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _calculation_basis_type_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculation-basis-type-name-is-valid.rule */ 752363);


class CreateCalculationBasisTypeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _calculation_basis_type_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.CalculationBasisTypeNameIsValidRule('name', 'The calculationbasistype name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);