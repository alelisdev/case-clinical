"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_required-field_shared_required-field_store_ts-libs_web_required-field_ui_web-792930"],{

/***/ 145983:
/*!********************************************************************************!*\
  !*** ./libs/web/required-field/shared/actions/create-required-field.action.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRequiredFieldAction": () => (/* binding */ CreateRequiredFieldAction)
/* harmony export */ });
/* harmony import */ var _required_field_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./required-field.business-action-base */ 918359);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_required_field_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-required-field-input-is-valid.rule */ 735167);




class CreateRequiredFieldAction extends _required_field_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RequiredFieldBusinessActionBase {
  constructor(input) {
    super('CreateRequiredFieldAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_required_field_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateRequiredFieldInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateRequiredField({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 918359:
/*!***************************************************************************************!*\
  !*** ./libs/web/required-field/shared/actions/required-field.business-action-base.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequiredFieldBusinessActionBase": () => (/* binding */ RequiredFieldBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class RequiredFieldBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 730256:
/*!*********************************************************************************!*\
  !*** ./libs/web/required-field/shared/actions/update-required-fields.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateRequiredFieldAction": () => (/* binding */ UpdateRequiredFieldAction),
/* harmony export */   "UpdateRequiredFieldsAction": () => (/* binding */ UpdateRequiredFieldsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _required_field_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./required-field.business-action-base */ 918359);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateRequiredFieldsAction extends _required_field_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RequiredFieldBusinessActionBase {
  constructor(requiredFields) {
    super('UpdateRequiredFieldsAction');
    this.requiredFields = requiredFields;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.requiredFields, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRequiredFields({
      input: {
        requiredFields: this.requiredFields
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateRequiredFieldAction extends _required_field_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RequiredFieldBusinessActionBase {
  constructor(requiredField, requiredFieldId) {
    super('UpdateRequiredFieldAction');
    this.requiredField = requiredField;
    this.requiredFieldId = requiredFieldId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.requiredField, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.requiredFieldId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateRequiredField({
      requiredFieldId: this.requiredFieldId,
      input: this.requiredField
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 208309:
/*!*********************************************************************************************!*\
  !*** ./libs/web/required-field/shared/actions/validate-required-field-excel-data.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateRequiredFieldExcelDataAction": () => (/* binding */ ValidateRequiredFieldExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _required_field_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./required-field.business-action-base */ 918359);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateRequiredFieldExcelDataAction extends _required_field_business_action_base__WEBPACK_IMPORTED_MODULE_1__.RequiredFieldBusinessActionBase {
  constructor(excelData, accidentTypes, medLevels) {
    super('ValidateRequiredFieldExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.accidentTypes = accidentTypes;
    this.medLevels = medLevels;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`accidentTypeName_${index}_is_valid}`, "Accident Type Is Not Valid", 'accidentType.name', datum['accidentType'], this.accidentTypes, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`medLevelName_${index}_is_valid}`, "Med Level Is Not Valid", 'medLevel.name', datum['medLevel'], this.medLevels, true));
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

/***/ 361592:
/*!************************************************************************************!*\
  !*** ./libs/web/required-field/shared/required-field.business-provider.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequiredFieldBusinessProviderService": () => (/* binding */ RequiredFieldBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_required_field_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-required-field-excel-data.action */ 208309);
/* harmony import */ var _actions_create_required_field_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-required-field.action */ 145983);
/* harmony import */ var _actions_update_required_fields_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-required-fields.action */ 730256);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class RequiredFieldBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.RequiredFieldBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createRequiredField(input) {
    const action = new _actions_create_required_field_action__WEBPACK_IMPORTED_MODULE_2__.CreateRequiredFieldAction(input);
    action.Do(this);
    return action.response;
  }
  updateRequiredField(input, requiredFieldId) {
    const action = new _actions_update_required_fields_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRequiredFieldAction(input, requiredFieldId);
    action.Do(this);
    return action.response;
  }
  importRequiredFields(requiredFields) {
    const updateRequiredFieldsAction = new _actions_update_required_fields_action__WEBPACK_IMPORTED_MODULE_3__.UpdateRequiredFieldsAction(requiredFields);
    updateRequiredFieldsAction.Do(this);
    return updateRequiredFieldsAction.response;
  }
  validateRequiredFieldExcelData(excelData, accidentTypes, medLevels) {
    const validateRequiredFieldExcelDataAction = new _actions_validate_required_field_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateRequiredFieldExcelDataAction(excelData, accidentTypes, medLevels);
    validateRequiredFieldExcelDataAction.Do(this);
    return validateRequiredFieldExcelDataAction.response;
  }
}
RequiredFieldBusinessProviderService.ɵfac = function RequiredFieldBusinessProviderService_Factory(t) {
  return new (t || RequiredFieldBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
RequiredFieldBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: RequiredFieldBusinessProviderService,
  factory: RequiredFieldBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 952098:
/*!******************************************************************!*\
  !*** ./libs/web/required-field/shared/required-field.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequiredFieldService": () => (/* binding */ RequiredFieldService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _required_field_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./required-field.business-provider.service */ 361592);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class RequiredFieldService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("RequiredFieldService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createRequiredField(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createRequiredField(filteredObj);
  }
  updateRequiredField(input, requiredFieldId) {
    return this.businessProvider.updateRequiredField(input, requiredFieldId);
  }
  importRequiredFields(requiredFields) {
    return this.businessProvider.importRequiredFields(requiredFields);
  }
  validateRequiredFieldExcelData(excelData, accidentTypes, medLevels) {
    return this.businessProvider.validateRequiredFieldExcelData(excelData, accidentTypes, medLevels);
  }
}
RequiredFieldService.ɵfac = function RequiredFieldService_Factory(t) {
  return new (t || RequiredFieldService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_required_field_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RequiredFieldBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_required_field_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.RequiredFieldBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
RequiredFieldService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: RequiredFieldService,
  factory: RequiredFieldService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 710710:
/*!****************************************************************!*\
  !*** ./libs/web/required-field/shared/required-field.store.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRequiredFieldFeatureStore": () => (/* binding */ WebRequiredFieldFeatureStore)
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
/* harmony import */ var _required_field_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./required-field.service */ 952098);














class WebRequiredFieldFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, requiredFieldService) {
    super({
      loading: false,
      requiredFields: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      accidentTypeId: undefined,
      medLevelId: undefined,
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
    this.requiredFieldService = requiredFieldService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.requiredFields$ = this.select(s => s.requiredFields);
    this.accidentTypes$ = this.select(s => s.accidentTypes || []);
    this.medLevels$ = this.select(s => s.medLevels || []);
    this.accidentTypeId$ = this.select(s => s.accidentTypeId);
    this.medLevelId$ = this.select(s => s.medLevelId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.requiredFields$, this.accidentTypes$, this.medLevels$, (errors, loading, item, formName, requiredFields, accidentTypes, medLevels) => ({
      errors,
      loading,
      item,
      formName,
      requiredFields,
      accidentTypes,
      medLevels
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.accidentTypeId$, this.medLevelId$, this.searchQuery$, (paging, accidentTypeId, medLevelId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      accidentTypeId: accidentTypeId,
      medLevelId: medLevelId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setAccidentTypeId = this.updater((state, accidentTypeId) => Object.assign(Object.assign({}, state), {
      accidentTypeId
    }));
    this.setMedLevelId = this.updater((state, medLevelId) => Object.assign(Object.assign({}, state), {
      medLevelId
    }));
    this.filterAccidentTypes = term => this.data.userSelectAccidentTypes({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let accidentTypes = res.data.items;
      this.patchState({
        accidentTypes
      });
      return accidentTypes;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterMedLevels = term => this.data.userSelectMedLevels({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let medLevels = res.data.items;
      this.patchState({
        medLevels
      });
      return medLevels;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addAccidentType = this.updater((state, accidentType) => Object.assign(Object.assign({}, state), {
      accidentTypes: state.accidentTypes.concat(accidentType)
    }));
    this.addMedLevel = this.updater((state, medLevel) => Object.assign(Object.assign({}, state), {
      medLevels: state.medLevels.concat(medLevel)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewRequiredField = this.updater((state, requiredField) => Object.assign(Object.assign({}, state), {
      requiredFields: [...state.requiredFields, requiredField]
    }));
    this.updateRequiredField = this.updater((state, requiredField) => {
      return Object.assign(Object.assign({}, state), {
        requiredFields: state.requiredFields.map(el => {
          if (el.id === requiredField.id) {
            return requiredField;
          } else {
            return el;
          }
        })
      });
    });
    this.addRequiredFields = this.updater((state, newRequiredFields) => Object.assign(Object.assign({}, state), {
      requiredFields: state.requiredFields.concat(newRequiredFields)
    }));
    this.updateRequiredFields = this.updater((state, updatedRequiredFields) => {
      return Object.assign(Object.assign({}, state), {
        requiredFields: state.requiredFields.map(requiredField => {
          const updated = updatedRequiredFields.find(el => el.id === requiredField.id);
          return updated ? updated : requiredField;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadRequiredFieldEffect = this.effect(requiredFieldId$ => requiredFieldId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(requiredFieldId => this.data.userRequiredField({
      requiredFieldId
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
    this.loadRequiredFieldsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userRequiredFields({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      requiredFields: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createRequiredFieldEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.requiredFieldService.createRequiredField(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(requiredField => {
      this.addNewRequiredField(requiredField);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: requiredField,
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
    this.updateRequiredFieldEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.requiredFieldService.updateRequiredField(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(requiredField => {
      this.updateRequiredField(requiredField);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: requiredField,
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
    this.deleteRequiredFieldEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, requiredField]) => {
      return this.data.userDeleteRequiredField({
        requiredFieldId: requiredField.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.requiredFieldService.importRequiredFields(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addRequiredFields(created);
      this.updateRequiredFields(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('requiredFieldId')) {
      var requiredFieldId = this.route.snapshot.paramMap.get('requiredFieldId');
      this.setFormName('requiredField_edit');
    } else {
      this.setFormName('requiredField_create');
    }
    if (this.route.snapshot.paramMap.has("accidentTypeId")) {
      var accidentTypeId = this.route.snapshot.paramMap.get("accidentTypeId");
      this.setAccidentTypeId(accidentTypeId);
    }
    if (this.route.snapshot.paramMap.has("medLevelId")) {
      var medLevelId = this.route.snapshot.paramMap.get("medLevelId");
      this.setMedLevelId(medLevelId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.requiredFieldService.validateRequiredFieldExcelData(excelData, vm.accidentTypes, vm.medLevels);
    }));
  }
}
WebRequiredFieldFeatureStore.ɵfac = function WebRequiredFieldFeatureStore_Factory(t) {
  return new (t || WebRequiredFieldFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_required_field_service__WEBPACK_IMPORTED_MODULE_12__.RequiredFieldService));
};
WebRequiredFieldFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebRequiredFieldFeatureStore,
  factory: WebRequiredFieldFeatureStore.ɵfac
});

/***/ }),

/***/ 735167:
/*!*******************************************************************************************!*\
  !*** ./libs/web/required-field/shared/rules/create-required-field-input-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRequiredFieldInputIsValidRule": () => (/* binding */ CreateRequiredFieldInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _required_field_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./required-field-name-is-valid.rule */ 347151);


class CreateRequiredFieldInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _required_field_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.RequiredFieldNameIsValidRule('name', 'The requiredfield name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 347151:
/*!***********************************************************************************!*\
  !*** ./libs/web/required-field/shared/rules/required-field-name-is-valid.rule.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequiredFieldNameIsValidRule": () => (/* binding */ RequiredFieldNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class RequiredFieldNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 559407:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/required-field/ui/web-required-field-select-form/web-required-field-select-table-view.component.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRequiredFieldSelectTableViewComponent": () => (/* binding */ WebRequiredFieldSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebRequiredFieldSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.requiredFields = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'accidentType.name',
      headerName: 'Accident Type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'medLevel.name',
      headerName: 'Med Level',
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
      field: 'entityName',
      filter: 'agTextColumnFilter'
    }, {
      field: 'accidentTypeId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'medLevelId',
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
WebRequiredFieldSelectTableViewComponent.ɵfac = function WebRequiredFieldSelectTableViewComponent_Factory(t) {
  return new (t || WebRequiredFieldSelectTableViewComponent)();
};
WebRequiredFieldSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebRequiredFieldSelectTableViewComponent,
  selectors: [["ui-required-field-select-table-view"]],
  viewQuery: function WebRequiredFieldSelectTableViewComponent_Query(rf, ctx) {
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
    requiredFields: "requiredFields"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebRequiredFieldSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebRequiredFieldSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebRequiredFieldSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.requiredFields)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);