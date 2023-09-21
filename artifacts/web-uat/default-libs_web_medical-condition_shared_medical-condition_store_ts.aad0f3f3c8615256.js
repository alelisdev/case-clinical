"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_medical-condition_shared_medical-condition_store_ts"],{

/***/ 136203:
/*!**************************************************************************************!*\
  !*** ./libs/web/medical-condition/shared/actions/create-medical-condition.action.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMedicalConditionAction": () => (/* binding */ CreateMedicalConditionAction)
/* harmony export */ });
/* harmony import */ var _medical_condition_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./medical-condition.business-action-base */ 496593);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_medical_condition_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-medical-condition-input-is-valid.rule */ 305478);




class CreateMedicalConditionAction extends _medical_condition_business_action_base__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionBusinessActionBase {
  constructor(input) {
    super('CreateMedicalConditionAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_medical_condition_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateMedicalConditionInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateMedicalCondition({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 496593:
/*!*********************************************************************************************!*\
  !*** ./libs/web/medical-condition/shared/actions/medical-condition.business-action-base.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MedicalConditionBusinessActionBase": () => (/* binding */ MedicalConditionBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class MedicalConditionBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 815186:
/*!***************************************************************************************!*\
  !*** ./libs/web/medical-condition/shared/actions/update-medical-conditions.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateMedicalConditionAction": () => (/* binding */ UpdateMedicalConditionAction),
/* harmony export */   "UpdateMedicalConditionsAction": () => (/* binding */ UpdateMedicalConditionsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _medical_condition_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./medical-condition.business-action-base */ 496593);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateMedicalConditionsAction extends _medical_condition_business_action_base__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionBusinessActionBase {
  constructor(medicalConditions) {
    super('UpdateMedicalConditionsAction');
    this.medicalConditions = medicalConditions;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.medicalConditions, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateMedicalConditions({
      input: {
        medicalConditions: this.medicalConditions
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateMedicalConditionAction extends _medical_condition_business_action_base__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionBusinessActionBase {
  constructor(medicalCondition, medicalConditionId) {
    super('UpdateMedicalConditionAction');
    this.medicalCondition = medicalCondition;
    this.medicalConditionId = medicalConditionId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.medicalCondition, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.medicalConditionId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateMedicalCondition({
      medicalConditionId: this.medicalConditionId,
      input: this.medicalCondition
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 470535:
/*!***************************************************************************************************!*\
  !*** ./libs/web/medical-condition/shared/actions/validate-medical-condition-excel-data.action.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateMedicalConditionExcelDataAction": () => (/* binding */ ValidateMedicalConditionExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _medical_condition_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./medical-condition.business-action-base */ 496593);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateMedicalConditionExcelDataAction extends _medical_condition_business_action_base__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionBusinessActionBase {
  constructor(excelData) {
    super('ValidateMedicalConditionExcelDataAction');
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

/***/ 875734:
/*!******************************************************************************************!*\
  !*** ./libs/web/medical-condition/shared/medical-condition.business-provider.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MedicalConditionBusinessProviderService": () => (/* binding */ MedicalConditionBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_medical_condition_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-medical-condition-excel-data.action */ 470535);
/* harmony import */ var _actions_create_medical_condition_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-medical-condition.action */ 136203);
/* harmony import */ var _actions_update_medical_conditions_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-medical-conditions.action */ 815186);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class MedicalConditionBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.MedicalConditionBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createMedicalCondition(input) {
    const action = new _actions_create_medical_condition_action__WEBPACK_IMPORTED_MODULE_2__.CreateMedicalConditionAction(input);
    action.Do(this);
    return action.response;
  }
  updateMedicalCondition(input, medicalConditionId) {
    const action = new _actions_update_medical_conditions_action__WEBPACK_IMPORTED_MODULE_3__.UpdateMedicalConditionAction(input, medicalConditionId);
    action.Do(this);
    return action.response;
  }
  importMedicalConditions(medicalConditions) {
    const updateMedicalConditionsAction = new _actions_update_medical_conditions_action__WEBPACK_IMPORTED_MODULE_3__.UpdateMedicalConditionsAction(medicalConditions);
    updateMedicalConditionsAction.Do(this);
    return updateMedicalConditionsAction.response;
  }
  validateMedicalConditionExcelData(excelData) {
    const validateMedicalConditionExcelDataAction = new _actions_validate_medical_condition_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateMedicalConditionExcelDataAction(excelData);
    validateMedicalConditionExcelDataAction.Do(this);
    return validateMedicalConditionExcelDataAction.response;
  }
}
MedicalConditionBusinessProviderService.ɵfac = function MedicalConditionBusinessProviderService_Factory(t) {
  return new (t || MedicalConditionBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
MedicalConditionBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: MedicalConditionBusinessProviderService,
  factory: MedicalConditionBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 777390:
/*!************************************************************************!*\
  !*** ./libs/web/medical-condition/shared/medical-condition.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MedicalConditionService": () => (/* binding */ MedicalConditionService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _medical_condition_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./medical-condition.business-provider.service */ 875734);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class MedicalConditionService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("MedicalConditionService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createMedicalCondition(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createMedicalCondition(filteredObj);
  }
  updateMedicalCondition(input, medicalConditionId) {
    return this.businessProvider.updateMedicalCondition(input, medicalConditionId);
  }
  importMedicalConditions(medicalConditions) {
    return this.businessProvider.importMedicalConditions(medicalConditions);
  }
  validateMedicalConditionExcelData(excelData) {
    return this.businessProvider.validateMedicalConditionExcelData(excelData);
  }
}
MedicalConditionService.ɵfac = function MedicalConditionService_Factory(t) {
  return new (t || MedicalConditionService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_medical_condition_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.MedicalConditionBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_medical_condition_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.MedicalConditionBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
MedicalConditionService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: MedicalConditionService,
  factory: MedicalConditionService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 685499:
/*!**********************************************************************!*\
  !*** ./libs/web/medical-condition/shared/medical-condition.store.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebMedicalConditionFeatureStore": () => (/* binding */ WebMedicalConditionFeatureStore)
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
/* harmony import */ var _medical_condition_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./medical-condition.service */ 777390);














class WebMedicalConditionFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, medicalConditionService) {
    super({
      loading: false,
      medicalConditions: [],
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
    this.medicalConditionService = medicalConditionService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.medicalConditions$ = this.select(s => s.medicalConditions);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.medicalConditions$, (errors, loading, item, formName, medicalConditions) => ({
      errors,
      loading,
      item,
      formName,
      medicalConditions
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
    this.addNewMedicalCondition = this.updater((state, medicalCondition) => Object.assign(Object.assign({}, state), {
      medicalConditions: [...state.medicalConditions, medicalCondition]
    }));
    this.updateMedicalCondition = this.updater((state, medicalCondition) => {
      return Object.assign(Object.assign({}, state), {
        medicalConditions: state.medicalConditions.map(el => {
          if (el.id === medicalCondition.id) {
            return medicalCondition;
          } else {
            return el;
          }
        })
      });
    });
    this.addMedicalConditions = this.updater((state, newMedicalConditions) => Object.assign(Object.assign({}, state), {
      medicalConditions: state.medicalConditions.concat(newMedicalConditions)
    }));
    this.updateMedicalConditions = this.updater((state, updatedMedicalConditions) => {
      return Object.assign(Object.assign({}, state), {
        medicalConditions: state.medicalConditions.map(medicalCondition => {
          const updated = updatedMedicalConditions.find(el => el.id === medicalCondition.id);
          return updated ? updated : medicalCondition;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadMedicalConditionEffect = this.effect(medicalConditionId$ => medicalConditionId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(medicalConditionId => this.data.userMedicalCondition({
      medicalConditionId
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
    this.loadMedicalConditionsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userMedicalConditions({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      medicalConditions: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createMedicalConditionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.medicalConditionService.createMedicalCondition(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(medicalCondition => {
      this.addNewMedicalCondition(medicalCondition);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: medicalCondition,
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
    this.updateMedicalConditionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.medicalConditionService.updateMedicalCondition(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(medicalCondition => {
      this.updateMedicalCondition(medicalCondition);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: medicalCondition,
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
    this.deleteMedicalConditionEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, medicalCondition]) => {
      return this.data.userDeleteMedicalCondition({
        medicalConditionId: medicalCondition.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.medicalConditionService.importMedicalConditions(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addMedicalConditions(created);
      this.updateMedicalConditions(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('medicalConditionId')) {
      var medicalConditionId = this.route.snapshot.paramMap.get('medicalConditionId');
      this.setFormName('medicalCondition_edit');
    } else {
      this.setFormName('medicalCondition_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.medicalConditionService.validateMedicalConditionExcelData(excelData);
    }));
  }
}
WebMedicalConditionFeatureStore.ɵfac = function WebMedicalConditionFeatureStore_Factory(t) {
  return new (t || WebMedicalConditionFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_medical_condition_service__WEBPACK_IMPORTED_MODULE_11__.MedicalConditionService));
};
WebMedicalConditionFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebMedicalConditionFeatureStore,
  factory: WebMedicalConditionFeatureStore.ɵfac
});

/***/ }),

/***/ 305478:
/*!*************************************************************************************************!*\
  !*** ./libs/web/medical-condition/shared/rules/create-medical-condition-input-is-valid.rule.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMedicalConditionInputIsValidRule": () => (/* binding */ CreateMedicalConditionInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _medical_condition_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./medical-condition-name-is-valid.rule */ 340282);


class CreateMedicalConditionInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _medical_condition_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.MedicalConditionNameIsValidRule('name', 'The medicalcondition name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 340282:
/*!*****************************************************************************************!*\
  !*** ./libs/web/medical-condition/shared/rules/medical-condition-name-is-valid.rule.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MedicalConditionNameIsValidRule": () => (/* binding */ MedicalConditionNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class MedicalConditionNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);