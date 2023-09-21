"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_implant-category_shared_implant-category_store_ts"],{

/***/ 242913:
/*!************************************************************************************!*\
  !*** ./libs/web/implant-category/shared/actions/create-implant-category.action.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateImplantCategoryAction": () => (/* binding */ CreateImplantCategoryAction)
/* harmony export */ });
/* harmony import */ var _implant_category_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implant-category.business-action-base */ 481128);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_implant_category_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-implant-category-input-is-valid.rule */ 419644);




class CreateImplantCategoryAction extends _implant_category_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ImplantCategoryBusinessActionBase {
  constructor(input) {
    super('CreateImplantCategoryAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_implant_category_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateImplantCategoryInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateImplantCategory({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 481128:
/*!*******************************************************************************************!*\
  !*** ./libs/web/implant-category/shared/actions/implant-category.business-action-base.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplantCategoryBusinessActionBase": () => (/* binding */ ImplantCategoryBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ImplantCategoryBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 189583:
/*!**************************************************************************************!*\
  !*** ./libs/web/implant-category/shared/actions/update-implant-categories.action.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateImplantCategoriesAction": () => (/* binding */ UpdateImplantCategoriesAction),
/* harmony export */   "UpdateImplantCategoryAction": () => (/* binding */ UpdateImplantCategoryAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _implant_category_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implant-category.business-action-base */ 481128);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateImplantCategoriesAction extends _implant_category_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ImplantCategoryBusinessActionBase {
  constructor(implantCategories) {
    super('UpdateImplantCategoriesAction');
    this.implantCategories = implantCategories;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.implantCategories, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateImplantCategories({
      input: {
        implantCategories: this.implantCategories
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateImplantCategoryAction extends _implant_category_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ImplantCategoryBusinessActionBase {
  constructor(implantCategory, implantCategoryId) {
    super('UpdateImplantCategoryAction');
    this.implantCategory = implantCategory;
    this.implantCategoryId = implantCategoryId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.implantCategory, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.implantCategoryId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateImplantCategory({
      implantCategoryId: this.implantCategoryId,
      input: this.implantCategory
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 52371:
/*!*************************************************************************************************!*\
  !*** ./libs/web/implant-category/shared/actions/validate-implant-category-excel-data.action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateImplantCategoryExcelDataAction": () => (/* binding */ ValidateImplantCategoryExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _implant_category_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implant-category.business-action-base */ 481128);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateImplantCategoryExcelDataAction extends _implant_category_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ImplantCategoryBusinessActionBase {
  constructor(excelData) {
    super('ValidateImplantCategoryExcelDataAction');
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

/***/ 335393:
/*!****************************************************************************************!*\
  !*** ./libs/web/implant-category/shared/implant-category.business-provider.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplantCategoryBusinessProviderService": () => (/* binding */ ImplantCategoryBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_implant_category_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-implant-category-excel-data.action */ 52371);
/* harmony import */ var _actions_create_implant_category_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-implant-category.action */ 242913);
/* harmony import */ var _actions_update_implant_categories_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-implant-categories.action */ 189583);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ImplantCategoryBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ImplantCategoryBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createImplantCategory(input) {
    const action = new _actions_create_implant_category_action__WEBPACK_IMPORTED_MODULE_2__.CreateImplantCategoryAction(input);
    action.Do(this);
    return action.response;
  }
  updateImplantCategory(input, implantCategoryId) {
    const action = new _actions_update_implant_categories_action__WEBPACK_IMPORTED_MODULE_3__.UpdateImplantCategoryAction(input, implantCategoryId);
    action.Do(this);
    return action.response;
  }
  importImplantCategories(implantCategories) {
    const updateImplantCategoriesAction = new _actions_update_implant_categories_action__WEBPACK_IMPORTED_MODULE_3__.UpdateImplantCategoriesAction(implantCategories);
    updateImplantCategoriesAction.Do(this);
    return updateImplantCategoriesAction.response;
  }
  validateImplantCategoryExcelData(excelData) {
    const validateImplantCategoryExcelDataAction = new _actions_validate_implant_category_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateImplantCategoryExcelDataAction(excelData);
    validateImplantCategoryExcelDataAction.Do(this);
    return validateImplantCategoryExcelDataAction.response;
  }
}
ImplantCategoryBusinessProviderService.ɵfac = function ImplantCategoryBusinessProviderService_Factory(t) {
  return new (t || ImplantCategoryBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ImplantCategoryBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ImplantCategoryBusinessProviderService,
  factory: ImplantCategoryBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 803947:
/*!**********************************************************************!*\
  !*** ./libs/web/implant-category/shared/implant-category.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplantCategoryService": () => (/* binding */ ImplantCategoryService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _implant_category_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./implant-category.business-provider.service */ 335393);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ImplantCategoryService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ImplantCategoryService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createImplantCategory(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createImplantCategory(filteredObj);
  }
  updateImplantCategory(input, implantCategoryId) {
    return this.businessProvider.updateImplantCategory(input, implantCategoryId);
  }
  importImplantCategories(implantCategories) {
    return this.businessProvider.importImplantCategories(implantCategories);
  }
  validateImplantCategoryExcelData(excelData) {
    return this.businessProvider.validateImplantCategoryExcelData(excelData);
  }
}
ImplantCategoryService.ɵfac = function ImplantCategoryService_Factory(t) {
  return new (t || ImplantCategoryService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_implant_category_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ImplantCategoryBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_implant_category_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ImplantCategoryBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ImplantCategoryService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ImplantCategoryService,
  factory: ImplantCategoryService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 291237:
/*!********************************************************************!*\
  !*** ./libs/web/implant-category/shared/implant-category.store.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebImplantCategoryFeatureStore": () => (/* binding */ WebImplantCategoryFeatureStore)
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
/* harmony import */ var _implant_category_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./implant-category.service */ 803947);














class WebImplantCategoryFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, implantCategoryService) {
    super({
      loading: false,
      implantCategories: [],
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
    this.implantCategoryService = implantCategoryService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.implantCategories$ = this.select(s => s.implantCategories);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.implantCategories$, (errors, loading, item, formName, implantCategories) => ({
      errors,
      loading,
      item,
      formName,
      implantCategories
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
    this.addNewImplantCategory = this.updater((state, implantCategory) => Object.assign(Object.assign({}, state), {
      implantCategories: [...state.implantCategories, implantCategory]
    }));
    this.updateImplantCategory = this.updater((state, implantCategory) => {
      return Object.assign(Object.assign({}, state), {
        implantCategories: state.implantCategories.map(el => {
          if (el.id === implantCategory.id) {
            return implantCategory;
          } else {
            return el;
          }
        })
      });
    });
    this.addImplantCategories = this.updater((state, newImplantCategories) => Object.assign(Object.assign({}, state), {
      implantCategories: state.implantCategories.concat(newImplantCategories)
    }));
    this.updateImplantCategories = this.updater((state, updatedImplantCategories) => {
      return Object.assign(Object.assign({}, state), {
        implantCategories: state.implantCategories.map(implantCategory => {
          const updated = updatedImplantCategories.find(el => el.id === implantCategory.id);
          return updated ? updated : implantCategory;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadImplantCategoryEffect = this.effect(implantCategoryId$ => implantCategoryId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(implantCategoryId => this.data.userImplantCategory({
      implantCategoryId
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
    this.loadImplantCategoriesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userImplantCategories({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      implantCategories: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createImplantCategoryEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.implantCategoryService.createImplantCategory(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(implantCategory => {
      this.addNewImplantCategory(implantCategory);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: implantCategory,
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
    this.updateImplantCategoryEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.implantCategoryService.updateImplantCategory(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(implantCategory => {
      this.updateImplantCategory(implantCategory);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: implantCategory,
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
    this.deleteImplantCategoryEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, implantCategory]) => {
      return this.data.userDeleteImplantCategory({
        implantCategoryId: implantCategory.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.implantCategoryService.importImplantCategories(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addImplantCategories(created);
      this.updateImplantCategories(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('implantCategoryId')) {
      var implantCategoryId = this.route.snapshot.paramMap.get('implantCategoryId');
      this.setFormName('implantCategory_edit');
    } else {
      this.setFormName('implantCategory_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.implantCategoryService.validateImplantCategoryExcelData(excelData);
    }));
  }
}
WebImplantCategoryFeatureStore.ɵfac = function WebImplantCategoryFeatureStore_Factory(t) {
  return new (t || WebImplantCategoryFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_implant_category_service__WEBPACK_IMPORTED_MODULE_11__.ImplantCategoryService));
};
WebImplantCategoryFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebImplantCategoryFeatureStore,
  factory: WebImplantCategoryFeatureStore.ɵfac
});

/***/ }),

/***/ 419644:
/*!***********************************************************************************************!*\
  !*** ./libs/web/implant-category/shared/rules/create-implant-category-input-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateImplantCategoryInputIsValidRule": () => (/* binding */ CreateImplantCategoryInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _implant_category_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implant-category-name-is-valid.rule */ 812950);


class CreateImplantCategoryInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _implant_category_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ImplantCategoryNameIsValidRule('name', 'The implantcategory name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 812950:
/*!***************************************************************************************!*\
  !*** ./libs/web/implant-category/shared/rules/implant-category-name-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplantCategoryNameIsValidRule": () => (/* binding */ ImplantCategoryNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ImplantCategoryNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);