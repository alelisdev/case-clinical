"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_contracted-rate-kind_shared_contracted-rate-kind_store_ts"],{

/***/ 480145:
/*!***************************************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/actions/contracted-rate-kind.business-action-base.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractedRateKindBusinessActionBase": () => (/* binding */ ContractedRateKindBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ContractedRateKindBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 73221:
/*!********************************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/actions/create-contracted-rate-kind.action.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContractedRateKindAction": () => (/* binding */ CreateContractedRateKindAction)
/* harmony export */ });
/* harmony import */ var _contracted_rate_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracted-rate-kind.business-action-base */ 480145);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_contracted_rate_kind_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-contracted-rate-kind-input-is-valid.rule */ 80966);




class CreateContractedRateKindAction extends _contracted_rate_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractedRateKindBusinessActionBase {
  constructor(input) {
    super('CreateContractedRateKindAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_contracted_rate_kind_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateContractedRateKindInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateContractedRateKind({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 47977:
/*!*********************************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/actions/update-contracted-rate-kinds.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateContractedRateKindAction": () => (/* binding */ UpdateContractedRateKindAction),
/* harmony export */   "UpdateContractedRateKindsAction": () => (/* binding */ UpdateContractedRateKindsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contracted_rate_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracted-rate-kind.business-action-base */ 480145);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateContractedRateKindsAction extends _contracted_rate_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractedRateKindBusinessActionBase {
  constructor(contractedRateKinds) {
    super('UpdateContractedRateKindsAction');
    this.contractedRateKinds = contractedRateKinds;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contractedRateKinds, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContractedRateKinds({
      input: {
        contractedRateKinds: this.contractedRateKinds
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateContractedRateKindAction extends _contracted_rate_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractedRateKindBusinessActionBase {
  constructor(contractedRateKind, contractedRateKindId) {
    super('UpdateContractedRateKindAction');
    this.contractedRateKind = contractedRateKind;
    this.contractedRateKindId = contractedRateKindId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contractedRateKind, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.contractedRateKindId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContractedRateKind({
      contractedRateKindId: this.contractedRateKindId,
      input: this.contractedRateKind
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 93579:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/actions/validate-contracted-rate-kind-excel-data.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateContractedRateKindExcelDataAction": () => (/* binding */ ValidateContractedRateKindExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contracted_rate_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracted-rate-kind.business-action-base */ 480145);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateContractedRateKindExcelDataAction extends _contracted_rate_kind_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContractedRateKindBusinessActionBase {
  constructor(excelData) {
    super('ValidateContractedRateKindExcelDataAction');
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

/***/ 438478:
/*!************************************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/contracted-rate-kind.business-provider.service.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractedRateKindBusinessProviderService": () => (/* binding */ ContractedRateKindBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_contracted_rate_kind_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-contracted-rate-kind-excel-data.action */ 93579);
/* harmony import */ var _actions_create_contracted_rate_kind_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-contracted-rate-kind.action */ 73221);
/* harmony import */ var _actions_update_contracted_rate_kinds_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-contracted-rate-kinds.action */ 47977);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ContractedRateKindBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ContractedRateKindBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createContractedRateKind(input) {
    const action = new _actions_create_contracted_rate_kind_action__WEBPACK_IMPORTED_MODULE_2__.CreateContractedRateKindAction(input);
    action.Do(this);
    return action.response;
  }
  updateContractedRateKind(input, contractedRateKindId) {
    const action = new _actions_update_contracted_rate_kinds_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContractedRateKindAction(input, contractedRateKindId);
    action.Do(this);
    return action.response;
  }
  importContractedRateKinds(contractedRateKinds) {
    const updateContractedRateKindsAction = new _actions_update_contracted_rate_kinds_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContractedRateKindsAction(contractedRateKinds);
    updateContractedRateKindsAction.Do(this);
    return updateContractedRateKindsAction.response;
  }
  validateContractedRateKindExcelData(excelData) {
    const validateContractedRateKindExcelDataAction = new _actions_validate_contracted_rate_kind_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateContractedRateKindExcelDataAction(excelData);
    validateContractedRateKindExcelDataAction.Do(this);
    return validateContractedRateKindExcelDataAction.response;
  }
}
ContractedRateKindBusinessProviderService.ɵfac = function ContractedRateKindBusinessProviderService_Factory(t) {
  return new (t || ContractedRateKindBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ContractedRateKindBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ContractedRateKindBusinessProviderService,
  factory: ContractedRateKindBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 636756:
/*!******************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/contracted-rate-kind.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractedRateKindService": () => (/* binding */ ContractedRateKindService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _contracted_rate_kind_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contracted-rate-kind.business-provider.service */ 438478);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ContractedRateKindService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ContractedRateKindService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createContractedRateKind(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createContractedRateKind(filteredObj);
  }
  updateContractedRateKind(input, contractedRateKindId) {
    return this.businessProvider.updateContractedRateKind(input, contractedRateKindId);
  }
  importContractedRateKinds(contractedRateKinds) {
    return this.businessProvider.importContractedRateKinds(contractedRateKinds);
  }
  validateContractedRateKindExcelData(excelData) {
    return this.businessProvider.validateContractedRateKindExcelData(excelData);
  }
}
ContractedRateKindService.ɵfac = function ContractedRateKindService_Factory(t) {
  return new (t || ContractedRateKindService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contracted_rate_kind_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContractedRateKindBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contracted_rate_kind_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContractedRateKindBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ContractedRateKindService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ContractedRateKindService,
  factory: ContractedRateKindService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 778594:
/*!****************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/contracted-rate-kind.store.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContractedRateKindFeatureStore": () => (/* binding */ WebContractedRateKindFeatureStore)
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
/* harmony import */ var _contracted_rate_kind_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contracted-rate-kind.service */ 636756);














class WebContractedRateKindFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, contractedRateKindService) {
    super({
      loading: false,
      contractedRateKinds: [],
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
    this.contractedRateKindService = contractedRateKindService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.contractedRateKinds$ = this.select(s => s.contractedRateKinds);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contractedRateKinds$, (errors, loading, item, formName, contractedRateKinds) => ({
      errors,
      loading,
      item,
      formName,
      contractedRateKinds
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
    this.addNewContractedRateKind = this.updater((state, contractedRateKind) => Object.assign(Object.assign({}, state), {
      contractedRateKinds: [...state.contractedRateKinds, contractedRateKind]
    }));
    this.updateContractedRateKind = this.updater((state, contractedRateKind) => {
      return Object.assign(Object.assign({}, state), {
        contractedRateKinds: state.contractedRateKinds.map(el => {
          if (el.id === contractedRateKind.id) {
            return contractedRateKind;
          } else {
            return el;
          }
        })
      });
    });
    this.addContractedRateKinds = this.updater((state, newContractedRateKinds) => Object.assign(Object.assign({}, state), {
      contractedRateKinds: state.contractedRateKinds.concat(newContractedRateKinds)
    }));
    this.updateContractedRateKinds = this.updater((state, updatedContractedRateKinds) => {
      return Object.assign(Object.assign({}, state), {
        contractedRateKinds: state.contractedRateKinds.map(contractedRateKind => {
          const updated = updatedContractedRateKinds.find(el => el.id === contractedRateKind.id);
          return updated ? updated : contractedRateKind;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadContractedRateKindEffect = this.effect(contractedRateKindId$ => contractedRateKindId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(contractedRateKindId => this.data.userContractedRateKind({
      contractedRateKindId
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
    this.loadContractedRateKindsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userContractedRateKinds({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      contractedRateKinds: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createContractedRateKindEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.contractedRateKindService.createContractedRateKind(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contractedRateKind => {
      this.addNewContractedRateKind(contractedRateKind);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: contractedRateKind,
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
    this.updateContractedRateKindEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.contractedRateKindService.updateContractedRateKind(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contractedRateKind => {
      this.updateContractedRateKind(contractedRateKind);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: contractedRateKind,
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
    this.deleteContractedRateKindEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, contractedRateKind]) => {
      return this.data.userDeleteContractedRateKind({
        contractedRateKindId: contractedRateKind.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.contractedRateKindService.importContractedRateKinds(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addContractedRateKinds(created);
      this.updateContractedRateKinds(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('contractedRateKindId')) {
      var contractedRateKindId = this.route.snapshot.paramMap.get('contractedRateKindId');
      this.setFormName('contractedRateKind_edit');
    } else {
      this.setFormName('contractedRateKind_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.contractedRateKindService.validateContractedRateKindExcelData(excelData);
    }));
  }
}
WebContractedRateKindFeatureStore.ɵfac = function WebContractedRateKindFeatureStore_Factory(t) {
  return new (t || WebContractedRateKindFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_contracted_rate_kind_service__WEBPACK_IMPORTED_MODULE_11__.ContractedRateKindService));
};
WebContractedRateKindFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebContractedRateKindFeatureStore,
  factory: WebContractedRateKindFeatureStore.ɵfac
});

/***/ }),

/***/ 167227:
/*!***********************************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/rules/contracted-rate-kind-name-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContractedRateKindNameIsValidRule": () => (/* binding */ ContractedRateKindNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ContractedRateKindNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 80966:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/contracted-rate-kind/shared/rules/create-contracted-rate-kind-input-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContractedRateKindInputIsValidRule": () => (/* binding */ CreateContractedRateKindInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _contracted_rate_kind_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contracted-rate-kind-name-is-valid.rule */ 167227);


class CreateContractedRateKindInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _contracted_rate_kind_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ContractedRateKindNameIsValidRule('name', 'The contractedratekind name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);