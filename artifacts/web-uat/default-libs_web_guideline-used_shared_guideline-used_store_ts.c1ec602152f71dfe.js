"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_guideline-used_shared_guideline-used_store_ts"],{

/***/ 237357:
/*!********************************************************************************!*\
  !*** ./libs/web/guideline-used/shared/actions/create-guideline-used.action.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateGuidelineUsedAction": () => (/* binding */ CreateGuidelineUsedAction)
/* harmony export */ });
/* harmony import */ var _guideline_used_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guideline-used.business-action-base */ 652677);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_guideline_used_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-guideline-used-input-is-valid.rule */ 113243);




class CreateGuidelineUsedAction extends _guideline_used_business_action_base__WEBPACK_IMPORTED_MODULE_1__.GuidelineUsedBusinessActionBase {
  constructor(input) {
    super('CreateGuidelineUsedAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_guideline_used_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateGuidelineUsedInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateGuidelineUsed({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 652677:
/*!***************************************************************************************!*\
  !*** ./libs/web/guideline-used/shared/actions/guideline-used.business-action-base.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GuidelineUsedBusinessActionBase": () => (/* binding */ GuidelineUsedBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class GuidelineUsedBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 18108:
/*!*********************************************************************************!*\
  !*** ./libs/web/guideline-used/shared/actions/update-guideline-useds.action.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateGuidelineUsedAction": () => (/* binding */ UpdateGuidelineUsedAction),
/* harmony export */   "UpdateGuidelineUsedsAction": () => (/* binding */ UpdateGuidelineUsedsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _guideline_used_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guideline-used.business-action-base */ 652677);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateGuidelineUsedsAction extends _guideline_used_business_action_base__WEBPACK_IMPORTED_MODULE_1__.GuidelineUsedBusinessActionBase {
  constructor(guidelineUseds) {
    super('UpdateGuidelineUsedsAction');
    this.guidelineUseds = guidelineUseds;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.guidelineUseds, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateGuidelineUseds({
      input: {
        guidelineUseds: this.guidelineUseds
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateGuidelineUsedAction extends _guideline_used_business_action_base__WEBPACK_IMPORTED_MODULE_1__.GuidelineUsedBusinessActionBase {
  constructor(guidelineUsed, guidelineUsedId) {
    super('UpdateGuidelineUsedAction');
    this.guidelineUsed = guidelineUsed;
    this.guidelineUsedId = guidelineUsedId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.guidelineUsed, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.guidelineUsedId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateGuidelineUsed({
      guidelineUsedId: this.guidelineUsedId,
      input: this.guidelineUsed
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 228496:
/*!*********************************************************************************************!*\
  !*** ./libs/web/guideline-used/shared/actions/validate-guideline-used-excel-data.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateGuidelineUsedExcelDataAction": () => (/* binding */ ValidateGuidelineUsedExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _guideline_used_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guideline-used.business-action-base */ 652677);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateGuidelineUsedExcelDataAction extends _guideline_used_business_action_base__WEBPACK_IMPORTED_MODULE_1__.GuidelineUsedBusinessActionBase {
  constructor(excelData) {
    super('ValidateGuidelineUsedExcelDataAction');
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

/***/ 104084:
/*!************************************************************************************!*\
  !*** ./libs/web/guideline-used/shared/guideline-used.business-provider.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GuidelineUsedBusinessProviderService": () => (/* binding */ GuidelineUsedBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_guideline_used_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-guideline-used-excel-data.action */ 228496);
/* harmony import */ var _actions_create_guideline_used_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-guideline-used.action */ 237357);
/* harmony import */ var _actions_update_guideline_useds_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-guideline-useds.action */ 18108);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class GuidelineUsedBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.GuidelineUsedBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createGuidelineUsed(input) {
    const action = new _actions_create_guideline_used_action__WEBPACK_IMPORTED_MODULE_2__.CreateGuidelineUsedAction(input);
    action.Do(this);
    return action.response;
  }
  updateGuidelineUsed(input, guidelineUsedId) {
    const action = new _actions_update_guideline_useds_action__WEBPACK_IMPORTED_MODULE_3__.UpdateGuidelineUsedAction(input, guidelineUsedId);
    action.Do(this);
    return action.response;
  }
  importGuidelineUseds(guidelineUseds) {
    const updateGuidelineUsedsAction = new _actions_update_guideline_useds_action__WEBPACK_IMPORTED_MODULE_3__.UpdateGuidelineUsedsAction(guidelineUseds);
    updateGuidelineUsedsAction.Do(this);
    return updateGuidelineUsedsAction.response;
  }
  validateGuidelineUsedExcelData(excelData) {
    const validateGuidelineUsedExcelDataAction = new _actions_validate_guideline_used_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateGuidelineUsedExcelDataAction(excelData);
    validateGuidelineUsedExcelDataAction.Do(this);
    return validateGuidelineUsedExcelDataAction.response;
  }
}
GuidelineUsedBusinessProviderService.ɵfac = function GuidelineUsedBusinessProviderService_Factory(t) {
  return new (t || GuidelineUsedBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
GuidelineUsedBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: GuidelineUsedBusinessProviderService,
  factory: GuidelineUsedBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 170501:
/*!******************************************************************!*\
  !*** ./libs/web/guideline-used/shared/guideline-used.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GuidelineUsedService": () => (/* binding */ GuidelineUsedService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _guideline_used_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./guideline-used.business-provider.service */ 104084);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class GuidelineUsedService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("GuidelineUsedService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createGuidelineUsed(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createGuidelineUsed(filteredObj);
  }
  updateGuidelineUsed(input, guidelineUsedId) {
    return this.businessProvider.updateGuidelineUsed(input, guidelineUsedId);
  }
  importGuidelineUseds(guidelineUseds) {
    return this.businessProvider.importGuidelineUseds(guidelineUseds);
  }
  validateGuidelineUsedExcelData(excelData) {
    return this.businessProvider.validateGuidelineUsedExcelData(excelData);
  }
}
GuidelineUsedService.ɵfac = function GuidelineUsedService_Factory(t) {
  return new (t || GuidelineUsedService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_guideline_used_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.GuidelineUsedBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_guideline_used_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.GuidelineUsedBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
GuidelineUsedService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: GuidelineUsedService,
  factory: GuidelineUsedService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 92154:
/*!****************************************************************!*\
  !*** ./libs/web/guideline-used/shared/guideline-used.store.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebGuidelineUsedFeatureStore": () => (/* binding */ WebGuidelineUsedFeatureStore)
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
/* harmony import */ var _guideline_used_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./guideline-used.service */ 170501);














class WebGuidelineUsedFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, guidelineUsedService) {
    super({
      loading: false,
      guidelineUseds: [],
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
    this.guidelineUsedService = guidelineUsedService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.guidelineUseds$ = this.select(s => s.guidelineUseds);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.guidelineUseds$, (errors, loading, item, formName, guidelineUseds) => ({
      errors,
      loading,
      item,
      formName,
      guidelineUseds
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
    this.addNewGuidelineUsed = this.updater((state, guidelineUsed) => Object.assign(Object.assign({}, state), {
      guidelineUseds: [...state.guidelineUseds, guidelineUsed]
    }));
    this.updateGuidelineUsed = this.updater((state, guidelineUsed) => {
      return Object.assign(Object.assign({}, state), {
        guidelineUseds: state.guidelineUseds.map(el => {
          if (el.id === guidelineUsed.id) {
            return guidelineUsed;
          } else {
            return el;
          }
        })
      });
    });
    this.addGuidelineUseds = this.updater((state, newGuidelineUseds) => Object.assign(Object.assign({}, state), {
      guidelineUseds: state.guidelineUseds.concat(newGuidelineUseds)
    }));
    this.updateGuidelineUseds = this.updater((state, updatedGuidelineUseds) => {
      return Object.assign(Object.assign({}, state), {
        guidelineUseds: state.guidelineUseds.map(guidelineUsed => {
          const updated = updatedGuidelineUseds.find(el => el.id === guidelineUsed.id);
          return updated ? updated : guidelineUsed;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadGuidelineUsedEffect = this.effect(guidelineUsedId$ => guidelineUsedId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(guidelineUsedId => this.data.userGuidelineUsed({
      guidelineUsedId
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
    this.loadGuidelineUsedsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userGuidelineUseds({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      guidelineUseds: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createGuidelineUsedEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.guidelineUsedService.createGuidelineUsed(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(guidelineUsed => {
      this.addNewGuidelineUsed(guidelineUsed);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: guidelineUsed,
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
    this.updateGuidelineUsedEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.guidelineUsedService.updateGuidelineUsed(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(guidelineUsed => {
      this.updateGuidelineUsed(guidelineUsed);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: guidelineUsed,
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
    this.deleteGuidelineUsedEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, guidelineUsed]) => {
      return this.data.userDeleteGuidelineUsed({
        guidelineUsedId: guidelineUsed.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.guidelineUsedService.importGuidelineUseds(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addGuidelineUseds(created);
      this.updateGuidelineUseds(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('guidelineUsedId')) {
      var guidelineUsedId = this.route.snapshot.paramMap.get('guidelineUsedId');
      this.setFormName('guidelineUsed_edit');
    } else {
      this.setFormName('guidelineUsed_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.guidelineUsedService.validateGuidelineUsedExcelData(excelData);
    }));
  }
}
WebGuidelineUsedFeatureStore.ɵfac = function WebGuidelineUsedFeatureStore_Factory(t) {
  return new (t || WebGuidelineUsedFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_guideline_used_service__WEBPACK_IMPORTED_MODULE_11__.GuidelineUsedService));
};
WebGuidelineUsedFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebGuidelineUsedFeatureStore,
  factory: WebGuidelineUsedFeatureStore.ɵfac
});

/***/ }),

/***/ 113243:
/*!*******************************************************************************************!*\
  !*** ./libs/web/guideline-used/shared/rules/create-guideline-used-input-is-valid.rule.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateGuidelineUsedInputIsValidRule": () => (/* binding */ CreateGuidelineUsedInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _guideline_used_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guideline-used-name-is-valid.rule */ 295261);


class CreateGuidelineUsedInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _guideline_used_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.GuidelineUsedNameIsValidRule('name', 'The guidelineused name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 295261:
/*!***********************************************************************************!*\
  !*** ./libs/web/guideline-used/shared/rules/guideline-used-name-is-valid.rule.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GuidelineUsedNameIsValidRule": () => (/* binding */ GuidelineUsedNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class GuidelineUsedNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);