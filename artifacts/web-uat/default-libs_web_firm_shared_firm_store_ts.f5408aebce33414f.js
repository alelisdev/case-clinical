"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_firm_shared_firm_store_ts"],{

/***/ 233070:
/*!************************************************************!*\
  !*** ./libs/web/firm/shared/actions/create-firm.action.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateFirmAction": () => (/* binding */ CreateFirmAction)
/* harmony export */ });
/* harmony import */ var _firm_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firm.business-action-base */ 398023);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_firm_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-firm-input-is-valid.rule */ 444710);




class CreateFirmAction extends _firm_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FirmBusinessActionBase {
  constructor(input) {
    super('CreateFirmAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_firm_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateFirmInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateFirm({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 398023:
/*!*******************************************************************!*\
  !*** ./libs/web/firm/shared/actions/firm.business-action-base.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmBusinessActionBase": () => (/* binding */ FirmBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class FirmBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 912856:
/*!*************************************************************!*\
  !*** ./libs/web/firm/shared/actions/update-firms.action.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateFirmAction": () => (/* binding */ UpdateFirmAction),
/* harmony export */   "UpdateFirmsAction": () => (/* binding */ UpdateFirmsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _firm_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firm.business-action-base */ 398023);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateFirmsAction extends _firm_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FirmBusinessActionBase {
  constructor(firms) {
    super('UpdateFirmsAction');
    this.firms = firms;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.firms, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateFirms({
      input: {
        firms: this.firms
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateFirmAction extends _firm_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FirmBusinessActionBase {
  constructor(firm, firmId) {
    super('UpdateFirmAction');
    this.firm = firm;
    this.firmId = firmId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.firm, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.firmId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateFirm({
      firmId: this.firmId,
      input: this.firm
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 801618:
/*!*************************************************************************!*\
  !*** ./libs/web/firm/shared/actions/validate-firm-excel-data.action.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateFirmExcelDataAction": () => (/* binding */ ValidateFirmExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _firm_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firm.business-action-base */ 398023);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateFirmExcelDataAction extends _firm_business_action_base__WEBPACK_IMPORTED_MODULE_1__.FirmBusinessActionBase {
  constructor(excelData, firmStatuses, eulas) {
    super('ValidateFirmExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.firmStatuses = firmStatuses;
    this.eulas = eulas;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`firmStatusName_${index}_is_valid}`, "Firm Status Is Not Valid", 'firmStatus.name', datum['firmStatus'], this.firmStatuses, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`eulaName_${index}_is_valid}`, "Eula Is Not Valid", 'eula.name', datum['eula'], this.eulas, true));
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

/***/ 478500:
/*!****************************************************************!*\
  !*** ./libs/web/firm/shared/firm.business-provider.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmBusinessProviderService": () => (/* binding */ FirmBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_firm_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-firm-excel-data.action */ 801618);
/* harmony import */ var _actions_create_firm_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-firm.action */ 233070);
/* harmony import */ var _actions_update_firms_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-firms.action */ 912856);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class FirmBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.FirmBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createFirm(input) {
    const action = new _actions_create_firm_action__WEBPACK_IMPORTED_MODULE_2__.CreateFirmAction(input);
    action.Do(this);
    return action.response;
  }
  updateFirm(input, firmId) {
    const action = new _actions_update_firms_action__WEBPACK_IMPORTED_MODULE_3__.UpdateFirmAction(input, firmId);
    action.Do(this);
    return action.response;
  }
  importFirms(firms) {
    const updateFirmsAction = new _actions_update_firms_action__WEBPACK_IMPORTED_MODULE_3__.UpdateFirmsAction(firms);
    updateFirmsAction.Do(this);
    return updateFirmsAction.response;
  }
  validateFirmExcelData(excelData, firmStatuses, eulas) {
    const validateFirmExcelDataAction = new _actions_validate_firm_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateFirmExcelDataAction(excelData, firmStatuses, eulas);
    validateFirmExcelDataAction.Do(this);
    return validateFirmExcelDataAction.response;
  }
}
FirmBusinessProviderService.ɵfac = function FirmBusinessProviderService_Factory(t) {
  return new (t || FirmBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
FirmBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: FirmBusinessProviderService,
  factory: FirmBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 941765:
/*!**********************************************!*\
  !*** ./libs/web/firm/shared/firm.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmService": () => (/* binding */ FirmService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _firm_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./firm.business-provider.service */ 478500);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class FirmService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("FirmService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createFirm(input) {
    var _a, _b, _c, _d, _e, _f;
    input.firmStatusNote = ((_a = input.firmStatusNote) === null || _a === void 0 ? void 0 : _a.length) > 1000 ? (_b = input.firmStatusNote) === null || _b === void 0 ? void 0 : _b.substring(0, 999) : input.firmStatusNote;
    input.reductionNotes = ((_c = input.reductionNotes) === null || _c === void 0 ? void 0 : _c.length) > 1000 ? (_d = input.reductionNotes) === null || _d === void 0 ? void 0 : _d.substring(0, 999) : input.reductionNotes;
    input.notes = ((_e = input.notes) === null || _e === void 0 ? void 0 : _e.length) > 1000 ? (_f = input.notes) === null || _f === void 0 ? void 0 : _f.substring(0, 999) : input.notes;
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createFirm(filteredObj);
  }
  updateFirm(input, firmId) {
    var _a, _b, _c, _d, _e, _f;
    input.firmStatusNote = ((_a = input.firmStatusNote) === null || _a === void 0 ? void 0 : _a.length) > 1000 ? (_b = input.firmStatusNote) === null || _b === void 0 ? void 0 : _b.substring(0, 999) : input.firmStatusNote;
    input.reductionNotes = ((_c = input.reductionNotes) === null || _c === void 0 ? void 0 : _c.length) > 1000 ? (_d = input.reductionNotes) === null || _d === void 0 ? void 0 : _d.substring(0, 999) : input.reductionNotes;
    input.notes = ((_e = input.notes) === null || _e === void 0 ? void 0 : _e.length) > 1000 ? (_f = input.notes) === null || _f === void 0 ? void 0 : _f.substring(0, 999) : input.notes;
    return this.businessProvider.updateFirm(input, firmId);
  }
  importFirms(firms) {
    return this.businessProvider.importFirms(firms);
  }
  validateFirmExcelData(excelData, firmStatuses, eulas) {
    return this.businessProvider.validateFirmExcelData(excelData, firmStatuses, eulas);
  }
}
FirmService.ɵfac = function FirmService_Factory(t) {
  return new (t || FirmService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_firm_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.FirmBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_firm_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.FirmBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
FirmService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: FirmService,
  factory: FirmService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 228366:
/*!********************************************!*\
  !*** ./libs/web/firm/shared/firm.store.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFirmFeatureStore": () => (/* binding */ WebFirmFeatureStore)
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
/* harmony import */ var _firm_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./firm.service */ 941765);














class WebFirmFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, firmService) {
    super({
      loading: false,
      firms: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      firmStatusId: undefined,
      eulaId: undefined,
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
    this.firmService = firmService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.firms$ = this.select(s => s.firms);
    this.firmStatuses$ = this.select(s => s.firmStatuses || []);
    this.documents$ = this.select(s => s.documents || []);
    this.firmStatusId$ = this.select(s => s.firmStatusId);
    this.eulaId$ = this.select(s => s.eulaId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.firms$, this.firmStatuses$, this.documents$, (errors, loading, item, formName, firms, firmStatuses, documents) => ({
      errors,
      loading,
      item,
      formName,
      firms,
      firmStatuses,
      documents
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.firmStatusId$, this.eulaId$, this.searchQuery$, (paging, firmStatusId, eulaId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      firmStatusId: firmStatusId,
      eulaId: eulaId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setFirmStatusId = this.updater((state, firmStatusId) => Object.assign(Object.assign({}, state), {
      firmStatusId
    }));
    this.setEulaId = this.updater((state, eulaId) => Object.assign(Object.assign({}, state), {
      eulaId
    }));
    this.filterFirmStatuses = term => this.data.userSelectFirmStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let firmStatuses = res.data.items;
      this.patchState({
        firmStatuses
      });
      return firmStatuses;
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
    this.addFirmStatus = this.updater((state, firmStatus) => Object.assign(Object.assign({}, state), {
      firmStatuses: state.firmStatuses.concat(firmStatus)
    }));
    this.addDocument = this.updater((state, document) => Object.assign(Object.assign({}, state), {
      documents: state.documents.concat(document)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewFirm = this.updater((state, firm) => Object.assign(Object.assign({}, state), {
      firms: [...state.firms, firm]
    }));
    this.updateFirm = this.updater((state, firm) => {
      return Object.assign(Object.assign({}, state), {
        firms: state.firms.map(el => {
          if (el.id === firm.id) {
            return firm;
          } else {
            return el;
          }
        })
      });
    });
    this.addFirms = this.updater((state, newFirms) => Object.assign(Object.assign({}, state), {
      firms: state.firms.concat(newFirms)
    }));
    this.updateFirms = this.updater((state, updatedFirms) => {
      return Object.assign(Object.assign({}, state), {
        firms: state.firms.map(firm => {
          const updated = updatedFirms.find(el => el.id === firm.id);
          return updated ? updated : firm;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadFirmEffect = this.effect(firmId$ => firmId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(firmId => this.data.userFirm({
      firmId
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
    this.loadFirmsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userFirms({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      firms: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createFirmEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.firmService.createFirm(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(firm => {
      this.addNewFirm(firm);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: firm,
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
    this.updateFirmEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.firmService.updateFirm(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(firm => {
      this.updateFirm(firm);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: firm,
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
    this.deleteFirmEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, firm]) => {
      return this.data.userDeleteFirm({
        firmId: firm.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.firmService.importFirms(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addFirms(created);
      this.updateFirms(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('firmId')) {
      var firmId = this.route.snapshot.paramMap.get('firmId');
      this.setFormName('firm_edit');
    } else {
      this.setFormName('firm_create');
    }
    if (this.route.snapshot.paramMap.has("firmStatusId")) {
      var firmStatusId = this.route.snapshot.paramMap.get("firmStatusId");
      this.setFirmStatusId(firmStatusId);
    }
    if (this.route.snapshot.paramMap.has("eulaId")) {
      var eulaId = this.route.snapshot.paramMap.get("eulaId");
      this.setEulaId(eulaId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.firmService.validateFirmExcelData(excelData, vm.firmStatuses, vm.documents);
    }));
  }
}
WebFirmFeatureStore.ɵfac = function WebFirmFeatureStore_Factory(t) {
  return new (t || WebFirmFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_firm_service__WEBPACK_IMPORTED_MODULE_12__.FirmService));
};
WebFirmFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebFirmFeatureStore,
  factory: WebFirmFeatureStore.ɵfac
});

/***/ }),

/***/ 444710:
/*!***********************************************************************!*\
  !*** ./libs/web/firm/shared/rules/create-firm-input-is-valid.rule.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateFirmInputIsValidRule": () => (/* binding */ CreateFirmInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _firm_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firm-name-is-valid.rule */ 359021);


class CreateFirmInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _firm_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.FirmNameIsValidRule('name', 'The firm name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 359021:
/*!***************************************************************!*\
  !*** ./libs/web/firm/shared/rules/firm-name-is-valid.rule.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmNameIsValidRule": () => (/* binding */ FirmNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class FirmNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);