"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-auth-guideline_shared_prior-auth-guideline_store_ts-libs_web_prior-aut-56399b"],{

/***/ 903646:
/*!********************************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/actions/create-prior-auth-guideline.action.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthGuidelineAction": () => (/* binding */ CreatePriorAuthGuidelineAction)
/* harmony export */ });
/* harmony import */ var _prior_auth_guideline_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-auth-guideline.business-action-base */ 18600);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_auth_guideline_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-auth-guideline-input-is-valid.rule */ 812985);




class CreatePriorAuthGuidelineAction extends _prior_auth_guideline_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthGuidelineBusinessActionBase {
  constructor(input) {
    super('CreatePriorAuthGuidelineAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_auth_guideline_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthGuidelineInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthGuideline({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 18600:
/*!***************************************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/actions/prior-auth-guideline.business-action-base.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthGuidelineBusinessActionBase": () => (/* binding */ PriorAuthGuidelineBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorAuthGuidelineBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 746696:
/*!*********************************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/actions/update-prior-auth-guidelines.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorAuthGuidelineAction": () => (/* binding */ UpdatePriorAuthGuidelineAction),
/* harmony export */   "UpdatePriorAuthGuidelinesAction": () => (/* binding */ UpdatePriorAuthGuidelinesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_auth_guideline_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-auth-guideline.business-action-base */ 18600);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorAuthGuidelinesAction extends _prior_auth_guideline_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthGuidelineBusinessActionBase {
  constructor(priorAuthGuidelines) {
    super('UpdatePriorAuthGuidelinesAction');
    this.priorAuthGuidelines = priorAuthGuidelines;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthGuidelines, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthGuidelines({
      input: {
        priorAuthGuidelines: this.priorAuthGuidelines
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorAuthGuidelineAction extends _prior_auth_guideline_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthGuidelineBusinessActionBase {
  constructor(priorAuthGuideline, priorAuthGuidelineId) {
    super('UpdatePriorAuthGuidelineAction');
    this.priorAuthGuideline = priorAuthGuideline;
    this.priorAuthGuidelineId = priorAuthGuidelineId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthGuideline, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorAuthGuidelineId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthGuideline({
      priorAuthGuidelineId: this.priorAuthGuidelineId,
      input: this.priorAuthGuideline
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 302651:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/actions/validate-prior-auth-guideline-excel-data.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorAuthGuidelineExcelDataAction": () => (/* binding */ ValidatePriorAuthGuidelineExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_auth_guideline_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-auth-guideline.business-action-base */ 18600);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorAuthGuidelineExcelDataAction extends _prior_auth_guideline_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthGuidelineBusinessActionBase {
  constructor(excelData, guidelines, priorAuthorizationRequests) {
    super('ValidatePriorAuthGuidelineExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.guidelines = guidelines;
    this.priorAuthorizationRequests = priorAuthorizationRequests;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`guidelineName_${index}_is_valid}`, "Guideline Is Not Valid", 'guideline.name', datum['guideline'], this.guidelines, true));
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

/***/ 701793:
/*!************************************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/prior-auth-guideline.business-provider.service.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthGuidelineBusinessProviderService": () => (/* binding */ PriorAuthGuidelineBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_auth_guideline_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-auth-guideline-excel-data.action */ 302651);
/* harmony import */ var _actions_create_prior_auth_guideline_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-auth-guideline.action */ 903646);
/* harmony import */ var _actions_update_prior_auth_guidelines_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-auth-guidelines.action */ 746696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorAuthGuidelineBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorAuthGuidelineBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorAuthGuideline(input) {
    const action = new _actions_create_prior_auth_guideline_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthGuidelineAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorAuthGuideline(input, priorAuthGuidelineId) {
    const action = new _actions_update_prior_auth_guidelines_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthGuidelineAction(input, priorAuthGuidelineId);
    action.Do(this);
    return action.response;
  }
  importPriorAuthGuidelines(priorAuthGuidelines) {
    const updatePriorAuthGuidelinesAction = new _actions_update_prior_auth_guidelines_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthGuidelinesAction(priorAuthGuidelines);
    updatePriorAuthGuidelinesAction.Do(this);
    return updatePriorAuthGuidelinesAction.response;
  }
  validatePriorAuthGuidelineExcelData(excelData, guidelines, priorAuthorizationRequests) {
    const validatePriorAuthGuidelineExcelDataAction = new _actions_validate_prior_auth_guideline_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorAuthGuidelineExcelDataAction(excelData, guidelines, priorAuthorizationRequests);
    validatePriorAuthGuidelineExcelDataAction.Do(this);
    return validatePriorAuthGuidelineExcelDataAction.response;
  }
}
PriorAuthGuidelineBusinessProviderService.ɵfac = function PriorAuthGuidelineBusinessProviderService_Factory(t) {
  return new (t || PriorAuthGuidelineBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorAuthGuidelineBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorAuthGuidelineBusinessProviderService,
  factory: PriorAuthGuidelineBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 79990:
/*!******************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/prior-auth-guideline.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthGuidelineService": () => (/* binding */ PriorAuthGuidelineService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_auth_guideline_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-auth-guideline.business-provider.service */ 701793);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorAuthGuidelineService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorAuthGuidelineService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorAuthGuideline(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorAuthGuideline(filteredObj);
  }
  updatePriorAuthGuideline(input, priorAuthGuidelineId) {
    return this.businessProvider.updatePriorAuthGuideline(input, priorAuthGuidelineId);
  }
  importPriorAuthGuidelines(priorAuthGuidelines) {
    return this.businessProvider.importPriorAuthGuidelines(priorAuthGuidelines);
  }
  validatePriorAuthGuidelineExcelData(excelData, guidelines, priorAuthorizationRequests) {
    return this.businessProvider.validatePriorAuthGuidelineExcelData(excelData, guidelines, priorAuthorizationRequests);
  }
}
PriorAuthGuidelineService.ɵfac = function PriorAuthGuidelineService_Factory(t) {
  return new (t || PriorAuthGuidelineService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_auth_guideline_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthGuidelineBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_auth_guideline_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthGuidelineBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorAuthGuidelineService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorAuthGuidelineService,
  factory: PriorAuthGuidelineService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 875741:
/*!****************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/prior-auth-guideline.store.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthGuidelineFeatureStore": () => (/* binding */ WebPriorAuthGuidelineFeatureStore)
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
/* harmony import */ var _prior_auth_guideline_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prior-auth-guideline.service */ 79990);














class WebPriorAuthGuidelineFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorAuthGuidelineService) {
    super({
      loading: false,
      priorAuthGuidelines: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      guidelineId: undefined,
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
    this.priorAuthGuidelineService = priorAuthGuidelineService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorAuthGuidelines$ = this.select(s => s.priorAuthGuidelines);
    this.guidelines$ = this.select(s => s.guidelines || []);
    this.priorAuthorizationRequests$ = this.select(s => s.priorAuthorizationRequests || []);
    this.guidelineId$ = this.select(s => s.guidelineId);
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthGuidelines$, this.guidelines$, this.priorAuthorizationRequests$, (errors, loading, item, formName, priorAuthGuidelines, guidelines, priorAuthorizationRequests) => ({
      errors,
      loading,
      item,
      formName,
      priorAuthGuidelines,
      guidelines,
      priorAuthorizationRequests
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.guidelineId$, this.priorAuthorizationRequestId$, this.searchQuery$, (paging, guidelineId, priorAuthorizationRequestId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      guidelineId: guidelineId,
      priorAuthorizationRequestId: priorAuthorizationRequestId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setGuidelineId = this.updater((state, guidelineId) => Object.assign(Object.assign({}, state), {
      guidelineId
    }));
    this.setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequestId
    }));
    this.filterGuidelines = term => this.data.userSelectGuidelines({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let guidelines = res.data.items;
      this.patchState({
        guidelines
      });
      return guidelines;
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
    this.addGuideline = this.updater((state, guideline) => Object.assign(Object.assign({}, state), {
      guidelines: state.guidelines.concat(guideline)
    }));
    this.addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPriorAuthGuideline = this.updater((state, priorAuthGuideline) => Object.assign(Object.assign({}, state), {
      priorAuthGuidelines: [...state.priorAuthGuidelines, priorAuthGuideline]
    }));
    this.updatePriorAuthGuideline = this.updater((state, priorAuthGuideline) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthGuidelines: state.priorAuthGuidelines.map(el => {
          if (el.id === priorAuthGuideline.id) {
            return priorAuthGuideline;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorAuthGuidelines = this.updater((state, newPriorAuthGuidelines) => Object.assign(Object.assign({}, state), {
      priorAuthGuidelines: state.priorAuthGuidelines.concat(newPriorAuthGuidelines)
    }));
    this.updatePriorAuthGuidelines = this.updater((state, updatedPriorAuthGuidelines) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthGuidelines: state.priorAuthGuidelines.map(priorAuthGuideline => {
          const updated = updatedPriorAuthGuidelines.find(el => el.id === priorAuthGuideline.id);
          return updated ? updated : priorAuthGuideline;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorAuthGuidelineEffect = this.effect(priorAuthGuidelineId$ => priorAuthGuidelineId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(priorAuthGuidelineId => this.data.userPriorAuthGuideline({
      priorAuthGuidelineId
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
    this.loadPriorAuthGuidelinesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPriorAuthGuidelines({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      priorAuthGuidelines: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorAuthGuidelineEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.priorAuthGuidelineService.createPriorAuthGuideline(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthGuideline => {
      this.addNewPriorAuthGuideline(priorAuthGuideline);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthGuideline,
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
    this.updatePriorAuthGuidelineEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.priorAuthGuidelineService.updatePriorAuthGuideline(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthGuideline => {
      this.updatePriorAuthGuideline(priorAuthGuideline);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthGuideline,
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
    this.deletePriorAuthGuidelineEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, priorAuthGuideline]) => {
      return this.data.userDeletePriorAuthGuideline({
        priorAuthGuidelineId: priorAuthGuideline.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.priorAuthGuidelineService.importPriorAuthGuidelines(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPriorAuthGuidelines(created);
      this.updatePriorAuthGuidelines(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorAuthGuidelineId')) {
      var priorAuthGuidelineId = this.route.snapshot.paramMap.get('priorAuthGuidelineId');
      this.setFormName('priorAuthGuideline_edit');
    } else {
      this.setFormName('priorAuthGuideline_create');
    }
    if (this.route.snapshot.paramMap.has("guidelineId")) {
      var guidelineId = this.route.snapshot.paramMap.get("guidelineId");
      this.setGuidelineId(guidelineId);
    }
    if (this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId");
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.priorAuthGuidelineService.validatePriorAuthGuidelineExcelData(excelData, vm.guidelines, vm.priorAuthorizationRequests);
    }));
  }
}
WebPriorAuthGuidelineFeatureStore.ɵfac = function WebPriorAuthGuidelineFeatureStore_Factory(t) {
  return new (t || WebPriorAuthGuidelineFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_prior_auth_guideline_service__WEBPACK_IMPORTED_MODULE_12__.PriorAuthGuidelineService));
};
WebPriorAuthGuidelineFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPriorAuthGuidelineFeatureStore,
  factory: WebPriorAuthGuidelineFeatureStore.ɵfac
});

/***/ }),

/***/ 812985:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/rules/create-prior-auth-guideline-input-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthGuidelineInputIsValidRule": () => (/* binding */ CreatePriorAuthGuidelineInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_auth_guideline_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-auth-guideline-name-is-valid.rule */ 776191);


class CreatePriorAuthGuidelineInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_auth_guideline_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorAuthGuidelineNameIsValidRule('name', 'The priorauthguideline name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 776191:
/*!***********************************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/shared/rules/prior-auth-guideline-name-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthGuidelineNameIsValidRule": () => (/* binding */ PriorAuthGuidelineNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorAuthGuidelineNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 473619:
/*!***************************************************************************************************************************************!*\
  !*** ./libs/web/prior-auth-guideline/ui/web-prior-auth-guideline-select-form/web-prior-auth-guideline-select-table-view.component.ts ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthGuidelineSelectTableViewComponent": () => (/* binding */ WebPriorAuthGuidelineSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPriorAuthGuidelineSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.priorAuthGuidelines = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'guideline.name',
      headerName: 'Guideline',
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
      field: 'guidelineId',
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
WebPriorAuthGuidelineSelectTableViewComponent.ɵfac = function WebPriorAuthGuidelineSelectTableViewComponent_Factory(t) {
  return new (t || WebPriorAuthGuidelineSelectTableViewComponent)();
};
WebPriorAuthGuidelineSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthGuidelineSelectTableViewComponent,
  selectors: [["ui-prior-auth-guideline-select-table-view"]],
  viewQuery: function WebPriorAuthGuidelineSelectTableViewComponent_Query(rf, ctx) {
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
    priorAuthGuidelines: "priorAuthGuidelines"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPriorAuthGuidelineSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPriorAuthGuidelineSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPriorAuthGuidelineSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.priorAuthGuidelines)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);