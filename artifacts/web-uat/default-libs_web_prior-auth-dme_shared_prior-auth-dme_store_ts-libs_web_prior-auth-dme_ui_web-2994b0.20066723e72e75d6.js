"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-auth-dme_shared_prior-auth-dme_store_ts-libs_web_prior-auth-dme_ui_web-2994b0"],{

/***/ 173143:
/*!********************************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/actions/create-prior-auth-dme.action.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthDmeAction": () => (/* binding */ CreatePriorAuthDmeAction)
/* harmony export */ });
/* harmony import */ var _prior_auth_dme_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-auth-dme.business-action-base */ 797155);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_auth_dme_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-auth-dme-input-is-valid.rule */ 497833);




class CreatePriorAuthDmeAction extends _prior_auth_dme_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthDmeBusinessActionBase {
  constructor(input) {
    super('CreatePriorAuthDmeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_auth_dme_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthDmeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthDme({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 797155:
/*!***************************************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/actions/prior-auth-dme.business-action-base.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthDmeBusinessActionBase": () => (/* binding */ PriorAuthDmeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorAuthDmeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 990630:
/*!*********************************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/actions/update-prior-auth-dmes.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorAuthDmeAction": () => (/* binding */ UpdatePriorAuthDmeAction),
/* harmony export */   "UpdatePriorAuthDmesAction": () => (/* binding */ UpdatePriorAuthDmesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_auth_dme_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-auth-dme.business-action-base */ 797155);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorAuthDmesAction extends _prior_auth_dme_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthDmeBusinessActionBase {
  constructor(priorAuthDmes) {
    super('UpdatePriorAuthDmesAction');
    this.priorAuthDmes = priorAuthDmes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthDmes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthDmes({
      input: {
        priorAuthDmes: this.priorAuthDmes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorAuthDmeAction extends _prior_auth_dme_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthDmeBusinessActionBase {
  constructor(priorAuthDme, priorAuthDmeId) {
    super('UpdatePriorAuthDmeAction');
    this.priorAuthDme = priorAuthDme;
    this.priorAuthDmeId = priorAuthDmeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthDme, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorAuthDmeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthDme({
      priorAuthDmeId: this.priorAuthDmeId,
      input: this.priorAuthDme
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 998594:
/*!*********************************************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/actions/validate-prior-auth-dme-excel-data.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorAuthDmeExcelDataAction": () => (/* binding */ ValidatePriorAuthDmeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_auth_dme_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-auth-dme.business-action-base */ 797155);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorAuthDmeExcelDataAction extends _prior_auth_dme_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthDmeBusinessActionBase {
  constructor(excelData, priorAuthorizationRequests, durableMedicalEquipments) {
    super('ValidatePriorAuthDmeExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.priorAuthorizationRequests = priorAuthorizationRequests;
    this.durableMedicalEquipments = durableMedicalEquipments;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`priorAuthorizationRequestName_${index}_is_valid}`, "Prior Authorization Request Is Not Valid", 'priorAuthorizationRequest.name', datum['priorAuthorizationRequest'], this.priorAuthorizationRequests, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`durableMedicalEquipmentName_${index}_is_valid}`, "Durable Medical Equipment Is Not Valid", 'durableMedicalEquipment.name', datum['durableMedicalEquipment'], this.durableMedicalEquipments, true));
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

/***/ 74986:
/*!************************************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/prior-auth-dme.business-provider.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthDmeBusinessProviderService": () => (/* binding */ PriorAuthDmeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_auth_dme_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-auth-dme-excel-data.action */ 998594);
/* harmony import */ var _actions_create_prior_auth_dme_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-auth-dme.action */ 173143);
/* harmony import */ var _actions_update_prior_auth_dmes_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-auth-dmes.action */ 990630);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorAuthDmeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorAuthDmeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorAuthDme(input) {
    const action = new _actions_create_prior_auth_dme_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthDmeAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorAuthDme(input, priorAuthDmeId) {
    const action = new _actions_update_prior_auth_dmes_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthDmeAction(input, priorAuthDmeId);
    action.Do(this);
    return action.response;
  }
  importPriorAuthDmes(priorAuthDmes) {
    const updatePriorAuthDmesAction = new _actions_update_prior_auth_dmes_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthDmesAction(priorAuthDmes);
    updatePriorAuthDmesAction.Do(this);
    return updatePriorAuthDmesAction.response;
  }
  validatePriorAuthDmeExcelData(excelData, priorAuthorizationRequests, durableMedicalEquipments) {
    const validatePriorAuthDmeExcelDataAction = new _actions_validate_prior_auth_dme_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorAuthDmeExcelDataAction(excelData, priorAuthorizationRequests, durableMedicalEquipments);
    validatePriorAuthDmeExcelDataAction.Do(this);
    return validatePriorAuthDmeExcelDataAction.response;
  }
}
PriorAuthDmeBusinessProviderService.ɵfac = function PriorAuthDmeBusinessProviderService_Factory(t) {
  return new (t || PriorAuthDmeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorAuthDmeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorAuthDmeBusinessProviderService,
  factory: PriorAuthDmeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 401901:
/*!******************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/prior-auth-dme.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthDmeService": () => (/* binding */ PriorAuthDmeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_auth_dme_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-auth-dme.business-provider.service */ 74986);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorAuthDmeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorAuthDmeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorAuthDme(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorAuthDme(filteredObj);
  }
  updatePriorAuthDme(input, priorAuthDmeId) {
    return this.businessProvider.updatePriorAuthDme(input, priorAuthDmeId);
  }
  importPriorAuthDmes(priorAuthDmes) {
    return this.businessProvider.importPriorAuthDmes(priorAuthDmes);
  }
  validatePriorAuthDmeExcelData(excelData, priorAuthorizationRequests, durableMedicalEquipments) {
    return this.businessProvider.validatePriorAuthDmeExcelData(excelData, priorAuthorizationRequests, durableMedicalEquipments);
  }
}
PriorAuthDmeService.ɵfac = function PriorAuthDmeService_Factory(t) {
  return new (t || PriorAuthDmeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_auth_dme_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthDmeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_auth_dme_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthDmeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorAuthDmeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorAuthDmeService,
  factory: PriorAuthDmeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 405062:
/*!****************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/prior-auth-dme.store.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthDmeFeatureStore": () => (/* binding */ WebPriorAuthDmeFeatureStore)
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
/* harmony import */ var _prior_auth_dme_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prior-auth-dme.service */ 401901);














class WebPriorAuthDmeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorAuthDmeService) {
    super({
      loading: false,
      priorAuthDmes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      priorAuthId: undefined,
      durableMedicalEquipmentId: undefined,
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
    this.priorAuthDmeService = priorAuthDmeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorAuthDmes$ = this.select(s => s.priorAuthDmes);
    this.priorAuthorizationRequests$ = this.select(s => s.priorAuthorizationRequests || []);
    this.durableMedicalEquipments$ = this.select(s => s.durableMedicalEquipments || []);
    this.priorAuthId$ = this.select(s => s.priorAuthId);
    this.durableMedicalEquipmentId$ = this.select(s => s.durableMedicalEquipmentId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthDmes$, this.priorAuthorizationRequests$, this.durableMedicalEquipments$, (errors, loading, item, formName, priorAuthDmes, priorAuthorizationRequests, durableMedicalEquipments) => ({
      errors,
      loading,
      item,
      formName,
      priorAuthDmes,
      priorAuthorizationRequests,
      durableMedicalEquipments
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.priorAuthId$, this.durableMedicalEquipmentId$, this.searchQuery$, (paging, priorAuthId, durableMedicalEquipmentId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      priorAuthId: priorAuthId,
      durableMedicalEquipmentId: durableMedicalEquipmentId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setPriorAuthId = this.updater((state, priorAuthId) => Object.assign(Object.assign({}, state), {
      priorAuthId
    }));
    this.setDurableMedicalEquipmentId = this.updater((state, durableMedicalEquipmentId) => Object.assign(Object.assign({}, state), {
      durableMedicalEquipmentId
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
    this.filterDurableMedicalEquipments = term => this.data.userSelectDurableMedicalEquipments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let durableMedicalEquipments = res.data.items;
      this.patchState({
        durableMedicalEquipments
      });
      return durableMedicalEquipments;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
    }));
    this.addDurableMedicalEquipment = this.updater((state, durableMedicalEquipment) => Object.assign(Object.assign({}, state), {
      durableMedicalEquipments: state.durableMedicalEquipments.concat(durableMedicalEquipment)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPriorAuthDme = this.updater((state, priorAuthDme) => Object.assign(Object.assign({}, state), {
      priorAuthDmes: [...state.priorAuthDmes, priorAuthDme]
    }));
    this.updatePriorAuthDme = this.updater((state, priorAuthDme) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthDmes: state.priorAuthDmes.map(el => {
          if (el.id === priorAuthDme.id) {
            return priorAuthDme;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorAuthDmes = this.updater((state, newPriorAuthDmes) => Object.assign(Object.assign({}, state), {
      priorAuthDmes: state.priorAuthDmes.concat(newPriorAuthDmes)
    }));
    this.updatePriorAuthDmes = this.updater((state, updatedPriorAuthDmes) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthDmes: state.priorAuthDmes.map(priorAuthDme => {
          const updated = updatedPriorAuthDmes.find(el => el.id === priorAuthDme.id);
          return updated ? updated : priorAuthDme;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorAuthDmeEffect = this.effect(priorAuthDmeId$ => priorAuthDmeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(priorAuthDmeId => this.data.userPriorAuthDme({
      priorAuthDmeId
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
    this.loadPriorAuthDmesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPriorAuthDmes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      console.log('$$$$$$$$$$$$$$$$$$$$$$');
      console.log(res.data.items);
      return this.patchState({
        paging: {
          limit: input.limit,
          skip: input.skip,
          total: res.data.count.total
        },
        priorAuthDmes: res.data.items,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorAuthDmeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => {
      const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
      return this.priorAuthDmeService.createPriorAuthDme(filteredObj).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthDme => {
        this.addNewPriorAuthDme(priorAuthDme);
        this.toast.success('Created Successfully!');
        setTimeout(() => this.patchState({
          item: priorAuthDme,
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
    this.updatePriorAuthDmeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.priorAuthDmeService.updatePriorAuthDme(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthDme => {
      this.updatePriorAuthDme(priorAuthDme);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthDme,
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
    this.deletePriorAuthDmeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, priorAuthDme]) => {
      return this.data.userDeletePriorAuthDme({
        priorAuthDmeId: priorAuthDme.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.priorAuthDmeService.importPriorAuthDmes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPriorAuthDmes(created);
      this.updatePriorAuthDmes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorAuthDmeId')) {
      var priorAuthDmeId = this.route.snapshot.paramMap.get('priorAuthDmeId');
      this.setFormName('priorAuthDme_edit');
    } else {
      this.setFormName('priorAuthDme_create');
    }
    if (this.route.snapshot.paramMap.has("priorAuthId")) {
      var priorAuthId = this.route.snapshot.paramMap.get("priorAuthId");
      this.setPriorAuthId(priorAuthId);
    }
    if (this.route.snapshot.paramMap.has("durableMedicalEquipmentId")) {
      var durableMedicalEquipmentId = this.route.snapshot.paramMap.get("durableMedicalEquipmentId");
      this.setDurableMedicalEquipmentId(durableMedicalEquipmentId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.priorAuthDmeService.validatePriorAuthDmeExcelData(excelData, vm.priorAuthorizationRequests, vm.durableMedicalEquipments);
    }));
  }
}
WebPriorAuthDmeFeatureStore.ɵfac = function WebPriorAuthDmeFeatureStore_Factory(t) {
  return new (t || WebPriorAuthDmeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_prior_auth_dme_service__WEBPACK_IMPORTED_MODULE_12__.PriorAuthDmeService));
};
WebPriorAuthDmeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPriorAuthDmeFeatureStore,
  factory: WebPriorAuthDmeFeatureStore.ɵfac
});

/***/ }),

/***/ 497833:
/*!*******************************************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/rules/create-prior-auth-dme-input-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthDmeInputIsValidRule": () => (/* binding */ CreatePriorAuthDmeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_auth_dme_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-auth-dme-name-is-valid.rule */ 13104);


class CreatePriorAuthDmeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_auth_dme_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorAuthDmeNameIsValidRule('name', 'The priorauthdme name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 13104:
/*!***********************************************************************************!*\
  !*** ./libs/web/prior-auth-dme/shared/rules/prior-auth-dme-name-is-valid.rule.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthDmeNameIsValidRule": () => (/* binding */ PriorAuthDmeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorAuthDmeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 395529:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/prior-auth-dme/ui/web-prior-auth-dme-select-form/web-prior-auth-dme-select-table-view.component.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthDmeSelectTableViewComponent": () => (/* binding */ WebPriorAuthDmeSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPriorAuthDmeSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.priorAuthDmes = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'priorAuthorizationRequest.name',
      headerName: 'Prior Authorization Request',
      filter: 'agTextColumnFilter'
    }, {
      field: 'durableMedicalEquipment.name',
      headerName: 'Durable Medical Equipment',
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
      field: 'priorAuthId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'durableMedicalEquipmentId',
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
WebPriorAuthDmeSelectTableViewComponent.ɵfac = function WebPriorAuthDmeSelectTableViewComponent_Factory(t) {
  return new (t || WebPriorAuthDmeSelectTableViewComponent)();
};
WebPriorAuthDmeSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthDmeSelectTableViewComponent,
  selectors: [["ui-prior-auth-dme-select-table-view"]],
  viewQuery: function WebPriorAuthDmeSelectTableViewComponent_Query(rf, ctx) {
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
    priorAuthDmes: "priorAuthDmes"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPriorAuthDmeSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPriorAuthDmeSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPriorAuthDmeSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.priorAuthDmes)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);