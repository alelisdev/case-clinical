"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_clinical-provider-tag_shared_clinical-provider-tag_store_ts-libs_web_clinica-6c8728"],{

/***/ 11837:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/actions/clinical-provider-tag.business-action-base.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderTagBusinessActionBase": () => (/* binding */ ClinicalProviderTagBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ClinicalProviderTagBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 503698:
/*!**********************************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/actions/create-clinical-provider-tag.action.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderTagAction": () => (/* binding */ CreateClinicalProviderTagAction)
/* harmony export */ });
/* harmony import */ var _clinical_provider_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-tag.business-action-base */ 11837);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_clinical_provider_tag_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-clinical-provider-tag-input-is-valid.rule */ 718267);




class CreateClinicalProviderTagAction extends _clinical_provider_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderTagBusinessActionBase {
  constructor(input) {
    super('CreateClinicalProviderTagAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_clinical_provider_tag_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderTagInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderTag({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 79657:
/*!***********************************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/actions/update-clinical-provider-tags.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateClinicalProviderTagAction": () => (/* binding */ UpdateClinicalProviderTagAction),
/* harmony export */   "UpdateClinicalProviderTagsAction": () => (/* binding */ UpdateClinicalProviderTagsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-tag.business-action-base */ 11837);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateClinicalProviderTagsAction extends _clinical_provider_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderTagBusinessActionBase {
  constructor(clinicalProviderTags) {
    super('UpdateClinicalProviderTagsAction');
    this.clinicalProviderTags = clinicalProviderTags;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderTags, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderTags({
      input: {
        clinicalProviderTags: this.clinicalProviderTags
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateClinicalProviderTagAction extends _clinical_provider_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderTagBusinessActionBase {
  constructor(clinicalProviderTag, clinicalProviderTagId) {
    super('UpdateClinicalProviderTagAction');
    this.clinicalProviderTag = clinicalProviderTag;
    this.clinicalProviderTagId = clinicalProviderTagId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.clinicalProviderTag, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.clinicalProviderTagId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateClinicalProviderTag({
      clinicalProviderTagId: this.clinicalProviderTagId,
      input: this.clinicalProviderTag
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 416700:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/actions/validate-clinical-provider-tag-excel-data.action.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateClinicalProviderTagExcelDataAction": () => (/* binding */ ValidateClinicalProviderTagExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _clinical_provider_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-tag.business-action-base */ 11837);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateClinicalProviderTagExcelDataAction extends _clinical_provider_tag_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderTagBusinessActionBase {
  constructor(excelData, clinicalProviders, tags) {
    super('ValidateClinicalProviderTagExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.clinicalProviders = clinicalProviders;
    this.tags = tags;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`tagName_${index}_is_valid}`, "Tag Is Not Valid", 'tag.name', datum['tag'], this.tags, true));
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

/***/ 925898:
/*!**************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/clinical-provider-tag.business-provider.service.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderTagBusinessProviderService": () => (/* binding */ ClinicalProviderTagBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_clinical_provider_tag_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-clinical-provider-tag-excel-data.action */ 416700);
/* harmony import */ var _actions_create_clinical_provider_tag_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-clinical-provider-tag.action */ 503698);
/* harmony import */ var _actions_update_clinical_provider_tags_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-clinical-provider-tags.action */ 79657);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ClinicalProviderTagBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ClinicalProviderTagBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createClinicalProviderTag(input) {
    const action = new _actions_create_clinical_provider_tag_action__WEBPACK_IMPORTED_MODULE_2__.CreateClinicalProviderTagAction(input);
    action.Do(this);
    return action.response;
  }
  updateClinicalProviderTag(input, clinicalProviderTagId) {
    const action = new _actions_update_clinical_provider_tags_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderTagAction(input, clinicalProviderTagId);
    action.Do(this);
    return action.response;
  }
  importClinicalProviderTags(clinicalProviderTags) {
    const updateClinicalProviderTagsAction = new _actions_update_clinical_provider_tags_action__WEBPACK_IMPORTED_MODULE_3__.UpdateClinicalProviderTagsAction(clinicalProviderTags);
    updateClinicalProviderTagsAction.Do(this);
    return updateClinicalProviderTagsAction.response;
  }
  validateClinicalProviderTagExcelData(excelData, clinicalProviders, tags) {
    const validateClinicalProviderTagExcelDataAction = new _actions_validate_clinical_provider_tag_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateClinicalProviderTagExcelDataAction(excelData, clinicalProviders, tags);
    validateClinicalProviderTagExcelDataAction.Do(this);
    return validateClinicalProviderTagExcelDataAction.response;
  }
}
ClinicalProviderTagBusinessProviderService.ɵfac = function ClinicalProviderTagBusinessProviderService_Factory(t) {
  return new (t || ClinicalProviderTagBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ClinicalProviderTagBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ClinicalProviderTagBusinessProviderService,
  factory: ClinicalProviderTagBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 871550:
/*!********************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/clinical-provider-tag.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderTagService": () => (/* binding */ ClinicalProviderTagService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _clinical_provider_tag_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clinical-provider-tag.business-provider.service */ 925898);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ClinicalProviderTagService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ClinicalProviderTagService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createClinicalProviderTag(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createClinicalProviderTag(filteredObj);
  }
  updateClinicalProviderTag(input, clinicalProviderTagId) {
    return this.businessProvider.updateClinicalProviderTag(input, clinicalProviderTagId);
  }
  importClinicalProviderTags(clinicalProviderTags) {
    return this.businessProvider.importClinicalProviderTags(clinicalProviderTags);
  }
  validateClinicalProviderTagExcelData(excelData, clinicalProviders, tags) {
    return this.businessProvider.validateClinicalProviderTagExcelData(excelData, clinicalProviders, tags);
  }
}
ClinicalProviderTagService.ɵfac = function ClinicalProviderTagService_Factory(t) {
  return new (t || ClinicalProviderTagService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_tag_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderTagBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_clinical_provider_tag_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ClinicalProviderTagBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ClinicalProviderTagService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ClinicalProviderTagService,
  factory: ClinicalProviderTagService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 389377:
/*!******************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/clinical-provider-tag.store.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderTagFeatureStore": () => (/* binding */ WebClinicalProviderTagFeatureStore)
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
/* harmony import */ var _clinical_provider_tag_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./clinical-provider-tag.service */ 871550);














class WebClinicalProviderTagFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, clinicalProviderTagService) {
    super({
      loading: false,
      clinicalProviderTags: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      clinicalProviderId: undefined,
      tagId: undefined,
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
    this.clinicalProviderTagService = clinicalProviderTagService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.clinicalProviderTags$ = this.select(s => s.clinicalProviderTags);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.tags$ = this.select(s => s.tags || []);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.tagId$ = this.select(s => s.tagId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderTags$, this.clinicalProviders$, this.tags$, (errors, loading, item, formName, clinicalProviderTags, clinicalProviders, tags) => ({
      errors,
      loading,
      item,
      formName,
      clinicalProviderTags,
      clinicalProviders,
      tags
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.clinicalProviderId$, this.tagId$, this.searchQuery$, (paging, clinicalProviderId, tagId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      clinicalProviderId: clinicalProviderId,
      tagId: tagId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.setTagId = this.updater((state, tagId) => Object.assign(Object.assign({}, state), {
      tagId
    }));
    this.filterClinicalProviders = term => this.data.userSelectClinicalProviders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let clinicalProviders = res.data.items;
      this.patchState({
        clinicalProviders
      });
      return clinicalProviders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterTags = term => this.data.userSelectTags({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let tags = res.data.items;
      this.patchState({
        tags
      });
      return tags;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.addTag = this.updater((state, tag) => Object.assign(Object.assign({}, state), {
      tags: state.tags.concat(tag)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewClinicalProviderTag = this.updater((state, clinicalProviderTag) => Object.assign(Object.assign({}, state), {
      clinicalProviderTags: [...state.clinicalProviderTags, clinicalProviderTag]
    }));
    this.updateClinicalProviderTag = this.updater((state, clinicalProviderTag) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderTags: state.clinicalProviderTags.map(el => {
          if (el.id === clinicalProviderTag.id) {
            return clinicalProviderTag;
          } else {
            return el;
          }
        })
      });
    });
    this.addClinicalProviderTags = this.updater((state, newClinicalProviderTags) => Object.assign(Object.assign({}, state), {
      clinicalProviderTags: state.clinicalProviderTags.concat(newClinicalProviderTags)
    }));
    this.updateClinicalProviderTags = this.updater((state, updatedClinicalProviderTags) => {
      return Object.assign(Object.assign({}, state), {
        clinicalProviderTags: state.clinicalProviderTags.map(clinicalProviderTag => {
          const updated = updatedClinicalProviderTags.find(el => el.id === clinicalProviderTag.id);
          return updated ? updated : clinicalProviderTag;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadClinicalProviderTagEffect = this.effect(clinicalProviderTagId$ => clinicalProviderTagId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(clinicalProviderTagId => this.data.userClinicalProviderTag({
      clinicalProviderTagId
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
    this.loadClinicalProviderTagsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userClinicalProviderTags({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      clinicalProviderTags: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createClinicalProviderTagEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.clinicalProviderTagService.createClinicalProviderTag(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProviderTag => {
      this.addNewClinicalProviderTag(clinicalProviderTag);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderTag,
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
    this.updateClinicalProviderTagEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.clinicalProviderTagService.updateClinicalProviderTag(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(clinicalProviderTag => {
      this.updateClinicalProviderTag(clinicalProviderTag);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: clinicalProviderTag,
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
    this.deleteClinicalProviderTagEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, clinicalProviderTag]) => {
      return this.data.userDeleteClinicalProviderTag({
        clinicalProviderTagId: clinicalProviderTag.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.clinicalProviderTagService.importClinicalProviderTags(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addClinicalProviderTags(created);
      this.updateClinicalProviderTags(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('clinicalProviderTagId')) {
      var clinicalProviderTagId = this.route.snapshot.paramMap.get('clinicalProviderTagId');
      this.setFormName('clinicalProviderTag_edit');
    } else {
      this.setFormName('clinicalProviderTag_create');
    }
    if (this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId");
      this.setClinicalProviderId(clinicalProviderId);
    }
    if (this.route.snapshot.paramMap.has("tagId")) {
      var tagId = this.route.snapshot.paramMap.get("tagId");
      this.setTagId(tagId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.clinicalProviderTagService.validateClinicalProviderTagExcelData(excelData, vm.clinicalProviders, vm.tags);
    }));
  }
}
WebClinicalProviderTagFeatureStore.ɵfac = function WebClinicalProviderTagFeatureStore_Factory(t) {
  return new (t || WebClinicalProviderTagFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_clinical_provider_tag_service__WEBPACK_IMPORTED_MODULE_12__.ClinicalProviderTagService));
};
WebClinicalProviderTagFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebClinicalProviderTagFeatureStore,
  factory: WebClinicalProviderTagFeatureStore.ɵfac
});

/***/ }),

/***/ 618212:
/*!*************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/rules/clinical-provider-tag-name-is-valid.rule.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClinicalProviderTagNameIsValidRule": () => (/* binding */ ClinicalProviderTagNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ClinicalProviderTagNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 718267:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/shared/rules/create-clinical-provider-tag-input-is-valid.rule.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateClinicalProviderTagInputIsValidRule": () => (/* binding */ CreateClinicalProviderTagInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _clinical_provider_tag_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinical-provider-tag-name-is-valid.rule */ 618212);


class CreateClinicalProviderTagInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _clinical_provider_tag_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ClinicalProviderTagNameIsValidRule('name', 'The clinicalprovidertag name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 409201:
/*!******************************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider-tag/ui/web-clinical-provider-tag-select-form/web-clinical-provider-tag-select-table-view.component.ts ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderTagSelectTableViewComponent": () => (/* binding */ WebClinicalProviderTagSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebClinicalProviderTagSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.clinicalProviderTags = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'clinicalProvider.name',
      headerName: 'Clinical Provider',
      filter: 'agTextColumnFilter'
    }, {
      field: 'tag.name',
      headerName: 'Tag',
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
      field: 'clinicalProviderId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'tagId',
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
WebClinicalProviderTagSelectTableViewComponent.ɵfac = function WebClinicalProviderTagSelectTableViewComponent_Factory(t) {
  return new (t || WebClinicalProviderTagSelectTableViewComponent)();
};
WebClinicalProviderTagSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebClinicalProviderTagSelectTableViewComponent,
  selectors: [["ui-clinical-provider-tag-select-table-view"]],
  viewQuery: function WebClinicalProviderTagSelectTableViewComponent_Query(rf, ctx) {
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
    clinicalProviderTags: "clinicalProviderTags"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebClinicalProviderTagSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebClinicalProviderTagSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebClinicalProviderTagSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.clinicalProviderTags)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);