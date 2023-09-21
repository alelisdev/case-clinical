"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-authorization-implant_shared_prior-authorization-implant_store_ts-libs-2cf330"],{

/***/ 455792:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/actions/create-prior-authorization-implant.action.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationImplantAction": () => (/* binding */ CreatePriorAuthorizationImplantAction)
/* harmony export */ });
/* harmony import */ var _prior_authorization_implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-implant.business-action-base */ 396721);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_authorization_implant_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-authorization-implant-input-is-valid.rule */ 702258);




class CreatePriorAuthorizationImplantAction extends _prior_authorization_implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationImplantBusinessActionBase {
  constructor(input) {
    super('CreatePriorAuthorizationImplantAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_authorization_implant_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationImplantInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationImplant({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 396721:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/actions/prior-authorization-implant.business-action-base.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationImplantBusinessActionBase": () => (/* binding */ PriorAuthorizationImplantBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorAuthorizationImplantBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 228409:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/actions/update-prior-authorization-implants.action.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorAuthorizationImplantAction": () => (/* binding */ UpdatePriorAuthorizationImplantAction),
/* harmony export */   "UpdatePriorAuthorizationImplantsAction": () => (/* binding */ UpdatePriorAuthorizationImplantsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-implant.business-action-base */ 396721);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorAuthorizationImplantsAction extends _prior_authorization_implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationImplantBusinessActionBase {
  constructor(priorAuthorizationImplants) {
    super('UpdatePriorAuthorizationImplantsAction');
    this.priorAuthorizationImplants = priorAuthorizationImplants;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationImplants, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationImplants({
      input: {
        priorAuthorizationImplants: this.priorAuthorizationImplants
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorAuthorizationImplantAction extends _prior_authorization_implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationImplantBusinessActionBase {
  constructor(priorAuthorizationImplant, priorAuthorizationImplantId) {
    super('UpdatePriorAuthorizationImplantAction');
    this.priorAuthorizationImplant = priorAuthorizationImplant;
    this.priorAuthorizationImplantId = priorAuthorizationImplantId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationImplant, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorAuthorizationImplantId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationImplant({
      priorAuthorizationImplantId: this.priorAuthorizationImplantId,
      input: this.priorAuthorizationImplant
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 564390:
/*!***********************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/actions/validate-prior-authorization-implant-excel-data.action.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorAuthorizationImplantExcelDataAction": () => (/* binding */ ValidatePriorAuthorizationImplantExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-implant.business-action-base */ 396721);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorAuthorizationImplantExcelDataAction extends _prior_authorization_implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationImplantBusinessActionBase {
  constructor(excelData, implants, priorAuthorizationRequests) {
    super('ValidatePriorAuthorizationImplantExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.implants = implants;
    this.priorAuthorizationRequests = priorAuthorizationRequests;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`implantName_${index}_is_valid}`, "Implant Is Not Valid", 'implant.name', datum['implant'], this.implants, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`priorAuthorizationRequestName_${index}_is_valid}`, "Prior Authorization Request Is Not Valid", 'priorAuthorizationRequest.name', datum['priorAuthorizationRequest'], this.priorAuthorizationRequests, true));
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

/***/ 347282:
/*!**************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/prior-authorization-implant.business-provider.service.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationImplantBusinessProviderService": () => (/* binding */ PriorAuthorizationImplantBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_authorization_implant_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-authorization-implant-excel-data.action */ 564390);
/* harmony import */ var _actions_create_prior_authorization_implant_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-authorization-implant.action */ 455792);
/* harmony import */ var _actions_update_prior_authorization_implants_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-authorization-implants.action */ 228409);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorAuthorizationImplantBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorAuthorizationImplantBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorAuthorizationImplant(input) {
    const action = new _actions_create_prior_authorization_implant_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationImplantAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorAuthorizationImplant(input, priorAuthorizationImplantId) {
    const action = new _actions_update_prior_authorization_implants_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationImplantAction(input, priorAuthorizationImplantId);
    action.Do(this);
    return action.response;
  }
  importPriorAuthorizationImplants(priorAuthorizationImplants) {
    const updatePriorAuthorizationImplantsAction = new _actions_update_prior_authorization_implants_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationImplantsAction(priorAuthorizationImplants);
    updatePriorAuthorizationImplantsAction.Do(this);
    return updatePriorAuthorizationImplantsAction.response;
  }
  validatePriorAuthorizationImplantExcelData(excelData, implants, priorAuthorizationRequests) {
    const validatePriorAuthorizationImplantExcelDataAction = new _actions_validate_prior_authorization_implant_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorAuthorizationImplantExcelDataAction(excelData, implants, priorAuthorizationRequests);
    validatePriorAuthorizationImplantExcelDataAction.Do(this);
    return validatePriorAuthorizationImplantExcelDataAction.response;
  }
}
PriorAuthorizationImplantBusinessProviderService.ɵfac = function PriorAuthorizationImplantBusinessProviderService_Factory(t) {
  return new (t || PriorAuthorizationImplantBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorAuthorizationImplantBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationImplantBusinessProviderService,
  factory: PriorAuthorizationImplantBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 468954:
/*!********************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/prior-authorization-implant.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationImplantService": () => (/* binding */ PriorAuthorizationImplantService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_authorization_implant_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-authorization-implant.business-provider.service */ 347282);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorAuthorizationImplantService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorAuthorizationImplantService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorAuthorizationImplant(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorAuthorizationImplant(filteredObj);
  }
  updatePriorAuthorizationImplant(input, priorAuthorizationImplantId) {
    return this.businessProvider.updatePriorAuthorizationImplant(input, priorAuthorizationImplantId);
  }
  importPriorAuthorizationImplants(priorAuthorizationImplants) {
    return this.businessProvider.importPriorAuthorizationImplants(priorAuthorizationImplants);
  }
  validatePriorAuthorizationImplantExcelData(excelData, implants, priorAuthorizationRequests) {
    return this.businessProvider.validatePriorAuthorizationImplantExcelData(excelData, implants, priorAuthorizationRequests);
  }
}
PriorAuthorizationImplantService.ɵfac = function PriorAuthorizationImplantService_Factory(t) {
  return new (t || PriorAuthorizationImplantService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_implant_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationImplantBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_implant_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationImplantBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorAuthorizationImplantService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationImplantService,
  factory: PriorAuthorizationImplantService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 596280:
/*!******************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/prior-authorization-implant.store.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationImplantFeatureStore": () => (/* binding */ WebPriorAuthorizationImplantFeatureStore)
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
/* harmony import */ var _prior_authorization_implant_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prior-authorization-implant.service */ 468954);














class WebPriorAuthorizationImplantFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorAuthorizationImplantService) {
    super({
      loading: false,
      priorAuthorizationImplants: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      implantId: undefined,
      priorAuthorizationRequestId: undefined,
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
    this.priorAuthorizationImplantService = priorAuthorizationImplantService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorAuthorizationImplants$ = this.select(s => s.priorAuthorizationImplants);
    this.implants$ = this.select(s => s.implants || []);
    this.priorAuthorizationRequests$ = this.select(s => s.priorAuthorizationRequests || []);
    this.implantId$ = this.select(s => s.implantId);
    this.priorAuthorizationRequestId$ = this.select(s => s.priorAuthorizationRequestId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationImplants$, this.implants$, this.priorAuthorizationRequests$, (errors, loading, item, formName, priorAuthorizationImplants, implants, priorAuthorizationRequests) => ({
      errors,
      loading,
      item,
      formName,
      priorAuthorizationImplants,
      implants,
      priorAuthorizationRequests
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.implantId$, this.priorAuthorizationRequestId$, this.searchQuery$, (paging, implantId, priorAuthorizationRequestId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      implantId: implantId,
      priorAuthorizationRequestId: priorAuthorizationRequestId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setImplantId = this.updater((state, implantId) => Object.assign(Object.assign({}, state), {
      implantId
    }));
    this.setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequestId
    }));
    this.filterImplants = term => this.data.userSelectImplants({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let implants = res.data.items;
      this.patchState({
        implants
      });
      return implants;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPriorAuthorizationRequests = term => this.data.userSelectPriorAuthorizationRequests({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let priorAuthorizationRequests = res.data.items;
      this.patchState({
        priorAuthorizationRequests
      });
      return priorAuthorizationRequests;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addImplant = this.updater((state, implant) => Object.assign(Object.assign({}, state), {
      implants: state.implants.concat(implant)
    }));
    this.addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPriorAuthorizationImplant = this.updater((state, priorAuthorizationImplant) => Object.assign(Object.assign({}, state), {
      priorAuthorizationImplants: [...state.priorAuthorizationImplants, priorAuthorizationImplant]
    }));
    this.updatePriorAuthorizationImplant = this.updater((state, priorAuthorizationImplant) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationImplants: state.priorAuthorizationImplants.map(el => {
          if (el.id === priorAuthorizationImplant.id) {
            return priorAuthorizationImplant;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorAuthorizationImplants = this.updater((state, newPriorAuthorizationImplants) => Object.assign(Object.assign({}, state), {
      priorAuthorizationImplants: state.priorAuthorizationImplants.concat(newPriorAuthorizationImplants)
    }));
    this.updatePriorAuthorizationImplants = this.updater((state, updatedPriorAuthorizationImplants) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationImplants: state.priorAuthorizationImplants.map(priorAuthorizationImplant => {
          const updated = updatedPriorAuthorizationImplants.find(el => el.id === priorAuthorizationImplant.id);
          return updated ? updated : priorAuthorizationImplant;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorAuthorizationImplantEffect = this.effect(priorAuthorizationImplantId$ => priorAuthorizationImplantId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(priorAuthorizationImplantId => this.data.userPriorAuthorizationImplant({
      priorAuthorizationImplantId
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
    this.loadPriorAuthorizationImplantsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPriorAuthorizationImplants({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      priorAuthorizationImplants: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorAuthorizationImplantEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.priorAuthorizationImplantService.createPriorAuthorizationImplant(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationImplant => {
      this.addNewPriorAuthorizationImplant(priorAuthorizationImplant);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationImplant,
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
    this.updatePriorAuthorizationImplantEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.priorAuthorizationImplantService.updatePriorAuthorizationImplant(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationImplant => {
      this.updatePriorAuthorizationImplant(priorAuthorizationImplant);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationImplant,
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
    this.deletePriorAuthorizationImplantEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, priorAuthorizationImplant]) => {
      return this.data.userDeletePriorAuthorizationImplant({
        priorAuthorizationImplantId: priorAuthorizationImplant.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.priorAuthorizationImplantService.importPriorAuthorizationImplants(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPriorAuthorizationImplants(created);
      this.updatePriorAuthorizationImplants(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorAuthorizationImplantId')) {
      var priorAuthorizationImplantId = this.route.snapshot.paramMap.get('priorAuthorizationImplantId');
      this.setFormName('priorAuthorizationImplant_edit');
    } else {
      this.setFormName('priorAuthorizationImplant_create');
    }
    if (this.route.snapshot.paramMap.has("implantId")) {
      var implantId = this.route.snapshot.paramMap.get("implantId");
      this.setImplantId(implantId);
    }
    if (this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId");
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.priorAuthorizationImplantService.validatePriorAuthorizationImplantExcelData(excelData, vm.implants, vm.priorAuthorizationRequests);
    }));
  }
}
WebPriorAuthorizationImplantFeatureStore.ɵfac = function WebPriorAuthorizationImplantFeatureStore_Factory(t) {
  return new (t || WebPriorAuthorizationImplantFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_prior_authorization_implant_service__WEBPACK_IMPORTED_MODULE_12__.PriorAuthorizationImplantService));
};
WebPriorAuthorizationImplantFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPriorAuthorizationImplantFeatureStore,
  factory: WebPriorAuthorizationImplantFeatureStore.ɵfac
});

/***/ }),

/***/ 702258:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/rules/create-prior-authorization-implant-input-is-valid.rule.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationImplantInputIsValidRule": () => (/* binding */ CreatePriorAuthorizationImplantInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_authorization_implant_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-implant-name-is-valid.rule */ 146289);


class CreatePriorAuthorizationImplantInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_authorization_implant_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationImplantNameIsValidRule('name', 'The priorauthorizationimplant name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 146289:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/shared/rules/prior-authorization-implant-name-is-valid.rule.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationImplantNameIsValidRule": () => (/* binding */ PriorAuthorizationImplantNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorAuthorizationImplantNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 753693:
/*!************************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-implant/ui/web-prior-authorization-implant-select-form/web-prior-authorization-implant-select-table-view.component.ts ***!
  \************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationImplantSelectTableViewComponent": () => (/* binding */ WebPriorAuthorizationImplantSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPriorAuthorizationImplantSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.priorAuthorizationImplants = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'implant.name',
      headerName: 'Implant',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorAuthorizationRequest.name',
      headerName: 'Prior Authorization Request',
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
      headerName: 'Estimated Cost',
      field: 'estimatedCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.estimatedCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'implantId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'priorAuthorizationRequestId',
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
WebPriorAuthorizationImplantSelectTableViewComponent.ɵfac = function WebPriorAuthorizationImplantSelectTableViewComponent_Factory(t) {
  return new (t || WebPriorAuthorizationImplantSelectTableViewComponent)();
};
WebPriorAuthorizationImplantSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthorizationImplantSelectTableViewComponent,
  selectors: [["ui-prior-authorization-implant-select-table-view"]],
  viewQuery: function WebPriorAuthorizationImplantSelectTableViewComponent_Query(rf, ctx) {
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
    priorAuthorizationImplants: "priorAuthorizationImplants"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPriorAuthorizationImplantSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPriorAuthorizationImplantSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPriorAuthorizationImplantSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.priorAuthorizationImplants)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);