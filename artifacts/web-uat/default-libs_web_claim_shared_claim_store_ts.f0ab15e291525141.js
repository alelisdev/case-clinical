"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_claim_shared_claim_store_ts"],{

/***/ 827399:
/*!*********************************************************************!*\
  !*** ./libs/web/claim/shared/actions/claim.business-action-base.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClaimBusinessActionBase": () => (/* binding */ ClaimBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ClaimBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 438281:
/*!**************************************************************!*\
  !*** ./libs/web/claim/shared/actions/create-claim.action.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClaimAction": () => (/* binding */ CreateClaimAction)
/* harmony export */ });
/* harmony import */ var _claim_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim.business-action-base */ 827399);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_claim_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-claim-input-is-valid.rule */ 550657);




class CreateClaimAction extends _claim_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClaimBusinessActionBase {
  constructor(input) {
    super('CreateClaimAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_claim_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateClaimInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateClaim({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 551726:
/*!***************************************************************!*\
  !*** ./libs/web/claim/shared/actions/update-claims.action.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateClaimAction": () => (/* binding */ UpdateClaimAction),
/* harmony export */   "UpdateClaimsAction": () => (/* binding */ UpdateClaimsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _claim_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim.business-action-base */ 827399);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateClaimsAction extends _claim_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClaimBusinessActionBase {
  constructor(claims) {
    super('UpdateClaimsAction');
    this.claims = claims;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.claims, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClaims({
      input: {
        claims: this.claims
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateClaimAction extends _claim_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClaimBusinessActionBase {
  constructor(claim, claimId) {
    super('UpdateClaimAction');
    this.claim = claim;
    this.claimId = claimId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.claim, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.claimId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClaim({
      claimId: this.claimId,
      input: this.claim
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 566599:
/*!***************************************************************************!*\
  !*** ./libs/web/claim/shared/actions/validate-claim-excel-data.action.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateClaimExcelDataAction": () => (/* binding */ ValidateClaimExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _claim_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim.business-action-base */ 827399);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateClaimExcelDataAction extends _claim_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClaimBusinessActionBase {
  constructor(excelData, priorAuthorizationRequests, claims, explanationOfPayments, patients) {
    super('ValidateClaimExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.priorAuthorizationRequests = priorAuthorizationRequests;
    this.claims = claims;
    this.explanationOfPayments = explanationOfPayments;
    this.patients = patients;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`priorAuthorizationRequestName_${index}_is_valid}`, "Prior Authorization Request Is Not Valid", 'priorAuthorizationRequest.name', datum['priorAuthorizationRequest'], this.priorAuthorizationRequests, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`claimName_${index}_is_valid}`, "Claim Is Not Valid", 'claim.name', datum['claim'], this.claims, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`explanationOfPaymentName_${index}_is_valid}`, "Explanation of Payment Is Not Valid", 'explanationOfPayment.name', datum['explanationOfPayment'], this.explanationOfPayments, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true));
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

/***/ 210500:
/*!******************************************************************!*\
  !*** ./libs/web/claim/shared/claim.business-provider.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClaimBusinessProviderService": () => (/* binding */ ClaimBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_claim_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-claim-excel-data.action */ 566599);
/* harmony import */ var _actions_create_claim_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-claim.action */ 438281);
/* harmony import */ var _actions_update_claims_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-claims.action */ 551726);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ClaimBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ClaimBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createClaim(input) {
    const action = new _actions_create_claim_action__WEBPACK_IMPORTED_MODULE_2__.CreateClaimAction(input);
    action.Do(this);
    return action.response;
  }
  updateClaim(input, claimId) {
    const action = new _actions_update_claims_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClaimAction(input, claimId);
    action.Do(this);
    return action.response;
  }
  importClaims(claims) {
    const updateClaimsAction = new _actions_update_claims_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClaimsAction(claims);
    updateClaimsAction.Do(this);
    return updateClaimsAction.response;
  }
  validateClaimExcelData(excelData, priorAuthorizationRequests, claims, explanationOfPayments, patients) {
    const validateClaimExcelDataAction = new _actions_validate_claim_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateClaimExcelDataAction(excelData, priorAuthorizationRequests, claims, explanationOfPayments, patients);
    validateClaimExcelDataAction.Do(this);
    return validateClaimExcelDataAction.response;
  }
}
ClaimBusinessProviderService.ɵfac = function ClaimBusinessProviderService_Factory(t) {
  return new (t || ClaimBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ClaimBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ClaimBusinessProviderService,
  factory: ClaimBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 516453:
/*!************************************************!*\
  !*** ./libs/web/claim/shared/claim.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClaimService": () => (/* binding */ ClaimService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _claim_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./claim.business-provider.service */ 210500);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ClaimService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ClaimService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createClaim(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createClaim(filteredObj);
  }
  updateClaim(input, claimId) {
    return this.businessProvider.updateClaim(input, claimId);
  }
  importClaims(claims) {
    return this.businessProvider.importClaims(claims);
  }
  validateClaimExcelData(excelData, priorAuthorizationRequests, claims, explanationOfPayments, patients) {
    return this.businessProvider.validateClaimExcelData(excelData, priorAuthorizationRequests, claims, explanationOfPayments, patients);
  }
}
ClaimService.ɵfac = function ClaimService_Factory(t) {
  return new (t || ClaimService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_claim_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClaimBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_claim_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClaimBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ClaimService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ClaimService,
  factory: ClaimService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 415832:
/*!**********************************************!*\
  !*** ./libs/web/claim/shared/claim.store.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClaimFeatureStore": () => (/* binding */ WebClaimFeatureStore)
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
/* harmony import */ var _claim_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./claim.service */ 516453);














class WebClaimFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, claimService) {
    super({
      loading: false,
      claims: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      priorAuthorizationRequestId: undefined,
      claimId: undefined,
      explanationOfPaymentId: undefined,
      patientId: undefined,
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
    this.claimService = claimService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.claims$ = this.select(s => s.claims);
    this.priorAuthorizationRequests$ = this.select(s => s.priorAuthorizationRequests || []);
    this.documents$ = this.select(s => s.documents || []);
    this.patients$ = this.select(s => s.patients || []);
    this.priorAuthorizationRequestId$ = this.select(s => s.priorAuthorizationRequestId);
    this.claimId$ = this.select(s => s.claimId);
    this.explanationOfPaymentId$ = this.select(s => s.explanationOfPaymentId);
    this.patientId$ = this.select(s => s.patientId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.claims$, this.priorAuthorizationRequests$, this.documents$, this.patients$, (errors, loading, item, formName, claims, priorAuthorizationRequests, documents, patients) => ({
      errors,
      loading,
      item,
      formName,
      claims,
      priorAuthorizationRequests,
      documents,
      patients
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.priorAuthorizationRequestId$, this.claimId$, this.explanationOfPaymentId$, this.patientId$, this.searchQuery$, (paging, priorAuthorizationRequestId, claimId, explanationOfPaymentId, patientId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      priorAuthorizationRequestId: priorAuthorizationRequestId,
      claimId: claimId,
      explanationOfPaymentId: explanationOfPaymentId,
      patientId: patientId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequestId
    }));
    this.setClaimId = this.updater((state, claimId) => Object.assign(Object.assign({}, state), {
      claimId
    }));
    this.setExplanationOfPaymentId = this.updater((state, explanationOfPaymentId) => Object.assign(Object.assign({}, state), {
      explanationOfPaymentId
    }));
    this.setPatientId = this.updater((state, patientId) => Object.assign(Object.assign({}, state), {
      patientId
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
    this.filterDocuments = term => this.data.userSelectDocuments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let documents = res.data.items;
      this.patchState({
        documents
      });
      return documents;
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
      let patients = res.data.items;
      this.patchState({
        patients
      });
      return patients;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
    }));
    this.addDocument = this.updater((state, document) => Object.assign(Object.assign({}, state), {
      documents: state.documents.concat(document)
    }));
    this.addPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(patient)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewClaim = this.updater((state, claim) => Object.assign(Object.assign({}, state), {
      claims: [...state.claims, claim]
    }));
    this.updateClaim = this.updater((state, claim) => {
      return Object.assign(Object.assign({}, state), {
        claims: state.claims.map(el => {
          if (el.id === claim.id) {
            return claim;
          } else {
            return el;
          }
        })
      });
    });
    this.addClaims = this.updater((state, newClaims) => Object.assign(Object.assign({}, state), {
      claims: state.claims.concat(newClaims)
    }));
    this.updateClaims = this.updater((state, updatedClaims) => {
      return Object.assign(Object.assign({}, state), {
        claims: state.claims.map(claim => {
          const updated = updatedClaims.find(el => el.id === claim.id);
          return updated ? updated : claim;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadClaimEffect = this.effect(claimId$ => claimId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(claimId => this.data.userClaim({
      claimId
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
    this.loadClaimsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userClaims({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      claims: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createClaimEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.claimService.createClaim(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(claim => {
      this.addNewClaim(claim);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: claim,
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
    this.updateClaimEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.claimService.updateClaim(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(claim => {
      this.updateClaim(claim);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: claim,
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
    this.deleteClaimEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, claim]) => {
      return this.data.userDeleteClaim({
        claimId: claim.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.claimService.importClaims(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addClaims(created);
      this.updateClaims(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('claimId')) {
      var claimId = this.route.snapshot.paramMap.get('claimId');
      this.setFormName('claim_edit');
    } else {
      this.setFormName('claim_create');
    }
    if (this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId");
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId);
    }
    if (this.route.snapshot.paramMap.has("claimId")) {
      var claimId = this.route.snapshot.paramMap.get("claimId");
      this.setClaimId(claimId);
    }
    if (this.route.snapshot.paramMap.has("explanationOfPaymentId")) {
      var explanationOfPaymentId = this.route.snapshot.paramMap.get("explanationOfPaymentId");
      this.setExplanationOfPaymentId(explanationOfPaymentId);
    }
    if (this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId");
      this.setPatientId(patientId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.claimService.validateClaimExcelData(excelData, vm.priorAuthorizationRequests, vm.documents, vm.documents, vm.patients);
    }));
  }
}
WebClaimFeatureStore.ɵfac = function WebClaimFeatureStore_Factory(t) {
  return new (t || WebClaimFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_claim_service__WEBPACK_IMPORTED_MODULE_12__.ClaimService));
};
WebClaimFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebClaimFeatureStore,
  factory: WebClaimFeatureStore.ɵfac
});

/***/ }),

/***/ 979754:
/*!*****************************************************************!*\
  !*** ./libs/web/claim/shared/rules/claim-name-is-valid.rule.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClaimNameIsValidRule": () => (/* binding */ ClaimNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ClaimNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 550657:
/*!*************************************************************************!*\
  !*** ./libs/web/claim/shared/rules/create-claim-input-is-valid.rule.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClaimInputIsValidRule": () => (/* binding */ CreateClaimInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _claim_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claim-name-is-valid.rule */ 979754);


class CreateClaimInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _claim_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ClaimNameIsValidRule('name', 'The claim name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);