"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_diagnosis-code_shared_diagnosis-code_store_ts"],{

/***/ 116507:
/*!********************************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/actions/create-diagnosis-code.action.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateDiagnosisCodeAction": () => (/* binding */ CreateDiagnosisCodeAction)
/* harmony export */ });
/* harmony import */ var _diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagnosis-code.business-action-base */ 782612);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-diagnosis-code-input-is-valid.rule */ 922349);




class CreateDiagnosisCodeAction extends _diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.DiagnosisCodeBusinessActionBase {
  constructor(input) {
    super('CreateDiagnosisCodeAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_diagnosis_code_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateDiagnosisCodeInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateDiagnosisCode({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 782612:
/*!***************************************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/actions/diagnosis-code.business-action-base.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiagnosisCodeBusinessActionBase": () => (/* binding */ DiagnosisCodeBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class DiagnosisCodeBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 149744:
/*!*********************************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/actions/update-diagnosis-codes.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateDiagnosisCodeAction": () => (/* binding */ UpdateDiagnosisCodeAction),
/* harmony export */   "UpdateDiagnosisCodesAction": () => (/* binding */ UpdateDiagnosisCodesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagnosis-code.business-action-base */ 782612);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateDiagnosisCodesAction extends _diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.DiagnosisCodeBusinessActionBase {
  constructor(diagnosisCodes) {
    super('UpdateDiagnosisCodesAction');
    this.diagnosisCodes = diagnosisCodes;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.diagnosisCodes, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateDiagnosisCodes({
      input: {
        diagnosisCodes: this.diagnosisCodes
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateDiagnosisCodeAction extends _diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.DiagnosisCodeBusinessActionBase {
  constructor(diagnosisCode, diagnosisCodeId) {
    super('UpdateDiagnosisCodeAction');
    this.diagnosisCode = diagnosisCode;
    this.diagnosisCodeId = diagnosisCodeId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.diagnosisCode, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.diagnosisCodeId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateDiagnosisCode({
      diagnosisCodeId: this.diagnosisCodeId,
      input: this.diagnosisCode
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 197346:
/*!*********************************************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/actions/validate-diagnosis-code-excel-data.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateDiagnosisCodeExcelDataAction": () => (/* binding */ ValidateDiagnosisCodeExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagnosis-code.business-action-base */ 782612);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateDiagnosisCodeExcelDataAction extends _diagnosis_code_business_action_base__WEBPACK_IMPORTED_MODULE_1__.DiagnosisCodeBusinessActionBase {
  constructor(excelData) {
    super('ValidateDiagnosisCodeExcelDataAction');
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

/***/ 945561:
/*!************************************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/diagnosis-code.business-provider.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiagnosisCodeBusinessProviderService": () => (/* binding */ DiagnosisCodeBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-diagnosis-code-excel-data.action */ 197346);
/* harmony import */ var _actions_create_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-diagnosis-code.action */ 116507);
/* harmony import */ var _actions_update_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-diagnosis-codes.action */ 149744);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class DiagnosisCodeBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.DiagnosisCodeBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createDiagnosisCode(input) {
    const action = new _actions_create_diagnosis_code_action__WEBPACK_IMPORTED_MODULE_2__.CreateDiagnosisCodeAction(input);
    action.Do(this);
    return action.response;
  }
  updateDiagnosisCode(input, diagnosisCodeId) {
    const action = new _actions_update_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdateDiagnosisCodeAction(input, diagnosisCodeId);
    action.Do(this);
    return action.response;
  }
  importDiagnosisCodes(diagnosisCodes) {
    const updateDiagnosisCodesAction = new _actions_update_diagnosis_codes_action__WEBPACK_IMPORTED_MODULE_3__.UpdateDiagnosisCodesAction(diagnosisCodes);
    updateDiagnosisCodesAction.Do(this);
    return updateDiagnosisCodesAction.response;
  }
  validateDiagnosisCodeExcelData(excelData) {
    const validateDiagnosisCodeExcelDataAction = new _actions_validate_diagnosis_code_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateDiagnosisCodeExcelDataAction(excelData);
    validateDiagnosisCodeExcelDataAction.Do(this);
    return validateDiagnosisCodeExcelDataAction.response;
  }
}
DiagnosisCodeBusinessProviderService.ɵfac = function DiagnosisCodeBusinessProviderService_Factory(t) {
  return new (t || DiagnosisCodeBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
DiagnosisCodeBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: DiagnosisCodeBusinessProviderService,
  factory: DiagnosisCodeBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 881310:
/*!******************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/diagnosis-code.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiagnosisCodeService": () => (/* binding */ DiagnosisCodeService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diagnosis-code.business-provider.service */ 945561);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class DiagnosisCodeService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("DiagnosisCodeService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createDiagnosisCode(input) {
    return this.businessProvider.createDiagnosisCode(input);
  }
  updateDiagnosisCode(input, diagnosisCodeId) {
    return this.businessProvider.updateDiagnosisCode(input, diagnosisCodeId);
  }
  importDiagnosisCodes(diagnosisCodes) {
    return this.businessProvider.importDiagnosisCodes(diagnosisCodes);
  }
  validateDiagnosisCodeExcelData(excelData) {
    return this.businessProvider.validateDiagnosisCodeExcelData(excelData);
  }
}
DiagnosisCodeService.ɵfac = function DiagnosisCodeService_Factory(t) {
  return new (t || DiagnosisCodeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.DiagnosisCodeBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_diagnosis_code_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.DiagnosisCodeBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
DiagnosisCodeService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: DiagnosisCodeService,
  factory: DiagnosisCodeService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 634614:
/*!****************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/diagnosis-code.store.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDiagnosisCodeFeatureStore": () => (/* binding */ WebDiagnosisCodeFeatureStore)
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
/* harmony import */ var _diagnosis_code_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./diagnosis-code.service */ 881310);














class WebDiagnosisCodeFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, diagnosisCodeService) {
    super({
      loading: false,
      diagnosisCodes: [],
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
    this.diagnosisCodeService = diagnosisCodeService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.diagnosisCodes$ = this.select(s => s.diagnosisCodes);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.diagnosisCodes$, (errors, loading, item, formName, diagnosisCodes) => ({
      errors,
      loading,
      item,
      formName,
      diagnosisCodes
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
    this.addNewDiagnosisCode = this.updater((state, diagnosisCode) => Object.assign(Object.assign({}, state), {
      diagnosisCodes: [...state.diagnosisCodes, diagnosisCode]
    }));
    this.updateDiagnosisCode = this.updater((state, diagnosisCode) => {
      return Object.assign(Object.assign({}, state), {
        diagnosisCodes: state.diagnosisCodes.map(el => {
          if (el.id === diagnosisCode.id) {
            return diagnosisCode;
          } else {
            return el;
          }
        })
      });
    });
    this.addDiagnosisCodes = this.updater((state, newDiagnosisCodes) => Object.assign(Object.assign({}, state), {
      diagnosisCodes: state.diagnosisCodes.concat(newDiagnosisCodes)
    }));
    this.updateDiagnosisCodes = this.updater((state, updatedDiagnosisCodes) => {
      return Object.assign(Object.assign({}, state), {
        diagnosisCodes: state.diagnosisCodes.map(diagnosisCode => {
          const updated = updatedDiagnosisCodes.find(el => el.id === diagnosisCode.id);
          return updated ? updated : diagnosisCode;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadDiagnosisCodeEffect = this.effect(diagnosisCodeId$ => diagnosisCodeId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(diagnosisCodeId => this.data.userDiagnosisCode({
      diagnosisCodeId
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
    this.loadDiagnosisCodesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userDiagnosisCodes({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      diagnosisCodes: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.diagnosisCodeService.createDiagnosisCode(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(diagnosisCode => {
      this.addNewDiagnosisCode(diagnosisCode);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: diagnosisCode,
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
    this.updateDiagnosisCodeEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.diagnosisCodeService.updateDiagnosisCode(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(diagnosisCode => {
      this.updateDiagnosisCode(diagnosisCode);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: diagnosisCode,
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
    this.deleteDiagnosisCodeEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, diagnosisCode]) => {
      return this.data.userDeleteDiagnosisCode({
        diagnosisCodeId: diagnosisCode.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.diagnosisCodeService.importDiagnosisCodes(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addDiagnosisCodes(created);
      this.updateDiagnosisCodes(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('diagnosisCodeId')) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get('diagnosisCodeId');
      this.setFormName('diagnosisCode_edit');
    } else {
      this.setFormName('diagnosisCode_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.diagnosisCodeService.validateDiagnosisCodeExcelData(excelData);
    }));
  }
}
WebDiagnosisCodeFeatureStore.ɵfac = function WebDiagnosisCodeFeatureStore_Factory(t) {
  return new (t || WebDiagnosisCodeFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_diagnosis_code_service__WEBPACK_IMPORTED_MODULE_11__.DiagnosisCodeService));
};
WebDiagnosisCodeFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebDiagnosisCodeFeatureStore,
  factory: WebDiagnosisCodeFeatureStore.ɵfac
});

/***/ }),

/***/ 922349:
/*!*******************************************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/rules/create-diagnosis-code-input-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateDiagnosisCodeInputIsValidRule": () => (/* binding */ CreateDiagnosisCodeInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagnosis-code-name-is-valid.rule */ 382022);


class CreateDiagnosisCodeInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _diagnosis_code_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.DiagnosisCodeNameIsValidRule('name', 'The diagnosiscode name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 382022:
/*!***********************************************************************************!*\
  !*** ./libs/web/diagnosis-code/shared/rules/diagnosis-code-name-is-valid.rule.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiagnosisCodeNameIsValidRule": () => (/* binding */ DiagnosisCodeNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class DiagnosisCodeNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);