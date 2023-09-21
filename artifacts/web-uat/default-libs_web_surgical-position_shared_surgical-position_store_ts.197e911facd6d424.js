"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_surgical-position_shared_surgical-position_store_ts"],{

/***/ 396722:
/*!**************************************************************************************!*\
  !*** ./libs/web/surgical-position/shared/actions/create-surgical-position.action.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateSurgicalPositionAction": () => (/* binding */ CreateSurgicalPositionAction)
/* harmony export */ });
/* harmony import */ var _surgical_position_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./surgical-position.business-action-base */ 122840);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_surgical_position_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-surgical-position-input-is-valid.rule */ 868987);




class CreateSurgicalPositionAction extends _surgical_position_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SurgicalPositionBusinessActionBase {
  constructor(input) {
    super('CreateSurgicalPositionAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_surgical_position_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateSurgicalPositionInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateSurgicalPosition({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 122840:
/*!*********************************************************************************************!*\
  !*** ./libs/web/surgical-position/shared/actions/surgical-position.business-action-base.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurgicalPositionBusinessActionBase": () => (/* binding */ SurgicalPositionBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class SurgicalPositionBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 355810:
/*!***************************************************************************************!*\
  !*** ./libs/web/surgical-position/shared/actions/update-surgical-positions.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateSurgicalPositionAction": () => (/* binding */ UpdateSurgicalPositionAction),
/* harmony export */   "UpdateSurgicalPositionsAction": () => (/* binding */ UpdateSurgicalPositionsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _surgical_position_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./surgical-position.business-action-base */ 122840);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateSurgicalPositionsAction extends _surgical_position_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SurgicalPositionBusinessActionBase {
  constructor(surgicalPositions) {
    super('UpdateSurgicalPositionsAction');
    this.surgicalPositions = surgicalPositions;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.surgicalPositions, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateSurgicalPositions({
      input: {
        surgicalPositions: this.surgicalPositions
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateSurgicalPositionAction extends _surgical_position_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SurgicalPositionBusinessActionBase {
  constructor(surgicalPosition, surgicalPositionId) {
    super('UpdateSurgicalPositionAction');
    this.surgicalPosition = surgicalPosition;
    this.surgicalPositionId = surgicalPositionId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.surgicalPosition, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.surgicalPositionId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateSurgicalPosition({
      surgicalPositionId: this.surgicalPositionId,
      input: this.surgicalPosition
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 439519:
/*!***************************************************************************************************!*\
  !*** ./libs/web/surgical-position/shared/actions/validate-surgical-position-excel-data.action.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateSurgicalPositionExcelDataAction": () => (/* binding */ ValidateSurgicalPositionExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _surgical_position_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./surgical-position.business-action-base */ 122840);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateSurgicalPositionExcelDataAction extends _surgical_position_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SurgicalPositionBusinessActionBase {
  constructor(excelData) {
    super('ValidateSurgicalPositionExcelDataAction');
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

/***/ 868987:
/*!*************************************************************************************************!*\
  !*** ./libs/web/surgical-position/shared/rules/create-surgical-position-input-is-valid.rule.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateSurgicalPositionInputIsValidRule": () => (/* binding */ CreateSurgicalPositionInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _surgical_position_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./surgical-position-name-is-valid.rule */ 66901);


class CreateSurgicalPositionInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _surgical_position_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.SurgicalPositionNameIsValidRule('name', 'The surgicalposition name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 66901:
/*!*****************************************************************************************!*\
  !*** ./libs/web/surgical-position/shared/rules/surgical-position-name-is-valid.rule.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurgicalPositionNameIsValidRule": () => (/* binding */ SurgicalPositionNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class SurgicalPositionNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 594409:
/*!******************************************************************************************!*\
  !*** ./libs/web/surgical-position/shared/surgical-position.business-provider.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurgicalPositionBusinessProviderService": () => (/* binding */ SurgicalPositionBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_surgical_position_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-surgical-position-excel-data.action */ 439519);
/* harmony import */ var _actions_create_surgical_position_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-surgical-position.action */ 396722);
/* harmony import */ var _actions_update_surgical_positions_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-surgical-positions.action */ 355810);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class SurgicalPositionBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.SurgicalPositionBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createSurgicalPosition(input) {
    const action = new _actions_create_surgical_position_action__WEBPACK_IMPORTED_MODULE_2__.CreateSurgicalPositionAction(input);
    action.Do(this);
    return action.response;
  }
  updateSurgicalPosition(input, surgicalPositionId) {
    const action = new _actions_update_surgical_positions_action__WEBPACK_IMPORTED_MODULE_3__.UpdateSurgicalPositionAction(input, surgicalPositionId);
    action.Do(this);
    return action.response;
  }
  importSurgicalPositions(surgicalPositions) {
    const updateSurgicalPositionsAction = new _actions_update_surgical_positions_action__WEBPACK_IMPORTED_MODULE_3__.UpdateSurgicalPositionsAction(surgicalPositions);
    updateSurgicalPositionsAction.Do(this);
    return updateSurgicalPositionsAction.response;
  }
  validateSurgicalPositionExcelData(excelData) {
    const validateSurgicalPositionExcelDataAction = new _actions_validate_surgical_position_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateSurgicalPositionExcelDataAction(excelData);
    validateSurgicalPositionExcelDataAction.Do(this);
    return validateSurgicalPositionExcelDataAction.response;
  }
}
SurgicalPositionBusinessProviderService.ɵfac = function SurgicalPositionBusinessProviderService_Factory(t) {
  return new (t || SurgicalPositionBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
SurgicalPositionBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: SurgicalPositionBusinessProviderService,
  factory: SurgicalPositionBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 841817:
/*!************************************************************************!*\
  !*** ./libs/web/surgical-position/shared/surgical-position.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurgicalPositionService": () => (/* binding */ SurgicalPositionService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _surgical_position_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./surgical-position.business-provider.service */ 594409);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class SurgicalPositionService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("SurgicalPositionService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createSurgicalPosition(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createSurgicalPosition(filteredObj);
  }
  updateSurgicalPosition(input, surgicalPositionId) {
    return this.businessProvider.updateSurgicalPosition(input, surgicalPositionId);
  }
  importSurgicalPositions(surgicalPositions) {
    return this.businessProvider.importSurgicalPositions(surgicalPositions);
  }
  validateSurgicalPositionExcelData(excelData) {
    return this.businessProvider.validateSurgicalPositionExcelData(excelData);
  }
}
SurgicalPositionService.ɵfac = function SurgicalPositionService_Factory(t) {
  return new (t || SurgicalPositionService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_surgical_position_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.SurgicalPositionBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_surgical_position_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.SurgicalPositionBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
SurgicalPositionService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: SurgicalPositionService,
  factory: SurgicalPositionService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 487885:
/*!**********************************************************************!*\
  !*** ./libs/web/surgical-position/shared/surgical-position.store.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSurgicalPositionFeatureStore": () => (/* binding */ WebSurgicalPositionFeatureStore)
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
/* harmony import */ var _surgical_position_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./surgical-position.service */ 841817);














class WebSurgicalPositionFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, surgicalPositionService) {
    super({
      loading: false,
      surgicalPositions: [],
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
    this.surgicalPositionService = surgicalPositionService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.surgicalPositions$ = this.select(s => s.surgicalPositions);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.surgicalPositions$, (errors, loading, item, formName, surgicalPositions) => ({
      errors,
      loading,
      item,
      formName,
      surgicalPositions
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
    this.addNewSurgicalPosition = this.updater((state, surgicalPosition) => Object.assign(Object.assign({}, state), {
      surgicalPositions: [...state.surgicalPositions, surgicalPosition]
    }));
    this.updateSurgicalPosition = this.updater((state, surgicalPosition) => {
      return Object.assign(Object.assign({}, state), {
        surgicalPositions: state.surgicalPositions.map(el => {
          if (el.id === surgicalPosition.id) {
            return surgicalPosition;
          } else {
            return el;
          }
        })
      });
    });
    this.addSurgicalPositions = this.updater((state, newSurgicalPositions) => Object.assign(Object.assign({}, state), {
      surgicalPositions: state.surgicalPositions.concat(newSurgicalPositions)
    }));
    this.updateSurgicalPositions = this.updater((state, updatedSurgicalPositions) => {
      return Object.assign(Object.assign({}, state), {
        surgicalPositions: state.surgicalPositions.map(surgicalPosition => {
          const updated = updatedSurgicalPositions.find(el => el.id === surgicalPosition.id);
          return updated ? updated : surgicalPosition;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadSurgicalPositionEffect = this.effect(surgicalPositionId$ => surgicalPositionId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(surgicalPositionId => this.data.userSurgicalPosition({
      surgicalPositionId
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
    this.loadSurgicalPositionsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userSurgicalPositions({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      surgicalPositions: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createSurgicalPositionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.surgicalPositionService.createSurgicalPosition(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(surgicalPosition => {
      this.addNewSurgicalPosition(surgicalPosition);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: surgicalPosition,
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
    this.updateSurgicalPositionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.surgicalPositionService.updateSurgicalPosition(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(surgicalPosition => {
      this.updateSurgicalPosition(surgicalPosition);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: surgicalPosition,
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
    this.deleteSurgicalPositionEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, surgicalPosition]) => {
      return this.data.userDeleteSurgicalPosition({
        surgicalPositionId: surgicalPosition.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.surgicalPositionService.importSurgicalPositions(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addSurgicalPositions(created);
      this.updateSurgicalPositions(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('surgicalPositionId')) {
      var surgicalPositionId = this.route.snapshot.paramMap.get('surgicalPositionId');
      this.setFormName('surgicalPosition_edit');
    } else {
      this.setFormName('surgicalPosition_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.surgicalPositionService.validateSurgicalPositionExcelData(excelData);
    }));
  }
}
WebSurgicalPositionFeatureStore.ɵfac = function WebSurgicalPositionFeatureStore_Factory(t) {
  return new (t || WebSurgicalPositionFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_surgical_position_service__WEBPACK_IMPORTED_MODULE_11__.SurgicalPositionService));
};
WebSurgicalPositionFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebSurgicalPositionFeatureStore,
  factory: WebSurgicalPositionFeatureStore.ɵfac
});

/***/ })

}]);