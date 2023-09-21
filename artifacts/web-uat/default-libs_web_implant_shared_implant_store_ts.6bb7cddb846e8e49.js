"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_implant_shared_implant_store_ts"],{

/***/ 911761:
/*!******************************************************************!*\
  !*** ./libs/web/implant/shared/actions/create-implant.action.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateImplantAction": () => (/* binding */ CreateImplantAction)
/* harmony export */ });
/* harmony import */ var _implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implant.business-action-base */ 789369);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_implant_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-implant-input-is-valid.rule */ 113289);




class CreateImplantAction extends _implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ImplantBusinessActionBase {
  constructor(input) {
    super('CreateImplantAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_implant_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateImplantInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateImplant({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 789369:
/*!*************************************************************************!*\
  !*** ./libs/web/implant/shared/actions/implant.business-action-base.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplantBusinessActionBase": () => (/* binding */ ImplantBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ImplantBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 399373:
/*!*******************************************************************!*\
  !*** ./libs/web/implant/shared/actions/update-implants.action.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateImplantAction": () => (/* binding */ UpdateImplantAction),
/* harmony export */   "UpdateImplantsAction": () => (/* binding */ UpdateImplantsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implant.business-action-base */ 789369);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateImplantsAction extends _implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ImplantBusinessActionBase {
  constructor(implants) {
    super('UpdateImplantsAction');
    this.implants = implants;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.implants, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateImplants({
      input: {
        implants: this.implants
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateImplantAction extends _implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ImplantBusinessActionBase {
  constructor(implant, implantId) {
    super('UpdateImplantAction');
    this.implant = implant;
    this.implantId = implantId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.implant, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.implantId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateImplant({
      implantId: this.implantId,
      input: this.implant
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 645719:
/*!*******************************************************************************!*\
  !*** ./libs/web/implant/shared/actions/validate-implant-excel-data.action.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateImplantExcelDataAction": () => (/* binding */ ValidateImplantExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implant.business-action-base */ 789369);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateImplantExcelDataAction extends _implant_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ImplantBusinessActionBase {
  constructor(excelData, implantCategories, salesRepresentatives, manufacturers) {
    super('ValidateImplantExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.implantCategories = implantCategories;
    this.salesRepresentatives = salesRepresentatives;
    this.manufacturers = manufacturers;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`implantCategoryName_${index}_is_valid}`, "Implant Category Is Not Valid", 'implantCategory.name', datum['implantCategory'], this.implantCategories, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`salesRepresentativeName_${index}_is_valid}`, "Sales Representative Is Not Valid", 'salesRepresentative.name', datum['salesRepresentative'], this.salesRepresentatives, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`manufacturerName_${index}_is_valid}`, "Manufacturer Is Not Valid", 'manufacturer.name', datum['manufacturer'], this.manufacturers, true));
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

/***/ 256534:
/*!**********************************************************************!*\
  !*** ./libs/web/implant/shared/implant.business-provider.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplantBusinessProviderService": () => (/* binding */ ImplantBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_implant_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-implant-excel-data.action */ 645719);
/* harmony import */ var _actions_create_implant_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-implant.action */ 911761);
/* harmony import */ var _actions_update_implants_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-implants.action */ 399373);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ImplantBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ImplantBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createImplant(input) {
    const action = new _actions_create_implant_action__WEBPACK_IMPORTED_MODULE_2__.CreateImplantAction(input);
    action.Do(this);
    return action.response;
  }
  updateImplant(input, implantId) {
    const action = new _actions_update_implants_action__WEBPACK_IMPORTED_MODULE_3__.UpdateImplantAction(input, implantId);
    action.Do(this);
    return action.response;
  }
  importImplants(implants) {
    const updateImplantsAction = new _actions_update_implants_action__WEBPACK_IMPORTED_MODULE_3__.UpdateImplantsAction(implants);
    updateImplantsAction.Do(this);
    return updateImplantsAction.response;
  }
  validateImplantExcelData(excelData, implantCategories, salesRepresentatives, manufacturers) {
    const validateImplantExcelDataAction = new _actions_validate_implant_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateImplantExcelDataAction(excelData, implantCategories, salesRepresentatives, manufacturers);
    validateImplantExcelDataAction.Do(this);
    return validateImplantExcelDataAction.response;
  }
}
ImplantBusinessProviderService.ɵfac = function ImplantBusinessProviderService_Factory(t) {
  return new (t || ImplantBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ImplantBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ImplantBusinessProviderService,
  factory: ImplantBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 51378:
/*!****************************************************!*\
  !*** ./libs/web/implant/shared/implant.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplantService": () => (/* binding */ ImplantService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _implant_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./implant.business-provider.service */ 256534);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ImplantService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ImplantService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createImplant(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createImplant(filteredObj);
  }
  updateImplant(input, implantId) {
    return this.businessProvider.updateImplant(input, implantId);
  }
  importImplants(implants) {
    return this.businessProvider.importImplants(implants);
  }
  validateImplantExcelData(excelData, implantCategories, salesRepresentatives, manufacturers) {
    return this.businessProvider.validateImplantExcelData(excelData, implantCategories, salesRepresentatives, manufacturers);
  }
}
ImplantService.ɵfac = function ImplantService_Factory(t) {
  return new (t || ImplantService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_implant_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ImplantBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_implant_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ImplantBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ImplantService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ImplantService,
  factory: ImplantService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 228210:
/*!**************************************************!*\
  !*** ./libs/web/implant/shared/implant.store.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebImplantFeatureStore": () => (/* binding */ WebImplantFeatureStore)
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
/* harmony import */ var _implant_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./implant.service */ 51378);














class WebImplantFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, implantService) {
    super({
      loading: false,
      implants: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      implantCategoryId: undefined,
      salesRepresentativeId: undefined,
      manufacturerId: undefined,
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
    this.implantService = implantService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.implants$ = this.select(s => s.implants);
    this.implantCategories$ = this.select(s => s.implantCategories || []);
    this.contacts$ = this.select(s => s.contacts || []);
    this.manufacturers$ = this.select(s => s.manufacturers || []);
    this.implantCategoryId$ = this.select(s => s.implantCategoryId);
    this.salesRepresentativeId$ = this.select(s => s.salesRepresentativeId);
    this.manufacturerId$ = this.select(s => s.manufacturerId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.implants$, this.implantCategories$, this.contacts$, this.manufacturers$, (errors, loading, item, formName, implants, implantCategories, contacts, manufacturers) => ({
      errors,
      loading,
      item,
      formName,
      implants,
      implantCategories,
      contacts,
      manufacturers
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.implantCategoryId$, this.salesRepresentativeId$, this.manufacturerId$, this.searchQuery$, (paging, implantCategoryId, salesRepresentativeId, manufacturerId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      implantCategoryId: implantCategoryId,
      salesRepresentativeId: salesRepresentativeId,
      manufacturerId: manufacturerId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setImplantCategoryId = this.updater((state, implantCategoryId) => Object.assign(Object.assign({}, state), {
      implantCategoryId
    }));
    this.setSalesRepresentativeId = this.updater((state, salesRepresentativeId) => Object.assign(Object.assign({}, state), {
      salesRepresentativeId
    }));
    this.setManufacturerId = this.updater((state, manufacturerId) => Object.assign(Object.assign({}, state), {
      manufacturerId
    }));
    this.filterImplantCategories = term => this.data.userSelectImplantCategories({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let implantCategories = res.data.items;
      this.patchState({
        implantCategories
      });
      return implantCategories;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterContacts = term => this.data.userSelectContacts({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let contacts = res.data.items;
      this.patchState({
        contacts
      });
      return contacts;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterManufacturers = term => this.data.userSelectManufacturers({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let manufacturers = res.data.items;
      this.patchState({
        manufacturers
      });
      return manufacturers;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addImplantCategory = this.updater((state, implantCategory) => Object.assign(Object.assign({}, state), {
      implantCategories: state.implantCategories.concat(implantCategory)
    }));
    this.addContact = this.updater((state, contact) => Object.assign(Object.assign({}, state), {
      contacts: state.contacts.concat(contact)
    }));
    this.addManufacturer = this.updater((state, manufacturer) => Object.assign(Object.assign({}, state), {
      manufacturers: state.manufacturers.concat(manufacturer)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewImplant = this.updater((state, implant) => Object.assign(Object.assign({}, state), {
      implants: [...state.implants, implant]
    }));
    this.updateImplant = this.updater((state, implant) => {
      return Object.assign(Object.assign({}, state), {
        implants: state.implants.map(el => {
          if (el.id === implant.id) {
            return implant;
          } else {
            return el;
          }
        })
      });
    });
    this.addImplants = this.updater((state, newImplants) => Object.assign(Object.assign({}, state), {
      implants: state.implants.concat(newImplants)
    }));
    this.updateImplants = this.updater((state, updatedImplants) => {
      return Object.assign(Object.assign({}, state), {
        implants: state.implants.map(implant => {
          const updated = updatedImplants.find(el => el.id === implant.id);
          return updated ? updated : implant;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadImplantEffect = this.effect(implantId$ => implantId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(implantId => this.data.userImplant({
      implantId
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
    this.loadImplantsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userImplants({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      implants: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createImplantEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.implantService.createImplant(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(implant => {
      this.addNewImplant(implant);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: implant,
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
    this.updateImplantEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.implantService.updateImplant(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(implant => {
      this.updateImplant(implant);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: implant,
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
    this.deleteImplantEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, implant]) => {
      return this.data.userDeleteImplant({
        implantId: implant.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.implantService.importImplants(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addImplants(created);
      this.updateImplants(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('implantId')) {
      var implantId = this.route.snapshot.paramMap.get('implantId');
      this.setFormName('implant_edit');
    } else {
      this.setFormName('implant_create');
    }
    if (this.route.snapshot.paramMap.has("implantCategoryId")) {
      var implantCategoryId = this.route.snapshot.paramMap.get("implantCategoryId");
      this.setImplantCategoryId(implantCategoryId);
    }
    if (this.route.snapshot.paramMap.has("salesRepresentativeId")) {
      var salesRepresentativeId = this.route.snapshot.paramMap.get("salesRepresentativeId");
      this.setSalesRepresentativeId(salesRepresentativeId);
    }
    if (this.route.snapshot.paramMap.has("manufacturerId")) {
      var manufacturerId = this.route.snapshot.paramMap.get("manufacturerId");
      this.setManufacturerId(manufacturerId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.implantService.validateImplantExcelData(excelData, vm.implantCategories, vm.contacts, vm.manufacturers);
    }));
  }
}
WebImplantFeatureStore.ɵfac = function WebImplantFeatureStore_Factory(t) {
  return new (t || WebImplantFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_implant_service__WEBPACK_IMPORTED_MODULE_12__.ImplantService));
};
WebImplantFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebImplantFeatureStore,
  factory: WebImplantFeatureStore.ɵfac
});

/***/ }),

/***/ 113289:
/*!*****************************************************************************!*\
  !*** ./libs/web/implant/shared/rules/create-implant-input-is-valid.rule.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateImplantInputIsValidRule": () => (/* binding */ CreateImplantInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _implant_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implant-name-is-valid.rule */ 775131);


class CreateImplantInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _implant_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ImplantNameIsValidRule('name', 'The implant name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 775131:
/*!*********************************************************************!*\
  !*** ./libs/web/implant/shared/rules/implant-name-is-valid.rule.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplantNameIsValidRule": () => (/* binding */ ImplantNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ImplantNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);