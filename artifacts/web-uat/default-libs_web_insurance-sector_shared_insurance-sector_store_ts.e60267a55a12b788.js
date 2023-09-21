"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_insurance-sector_shared_insurance-sector_store_ts"],{

/***/ 662086:
/*!************************************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/actions/create-insurance-sector.action.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateInsuranceSectorAction": () => (/* binding */ CreateInsuranceSectorAction)
/* harmony export */ });
/* harmony import */ var _insurance_sector_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance-sector.business-action-base */ 455218);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_insurance_sector_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-insurance-sector-input-is-valid.rule */ 675284);




class CreateInsuranceSectorAction extends _insurance_sector_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InsuranceSectorBusinessActionBase {
  constructor(input) {
    super('CreateInsuranceSectorAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_insurance_sector_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateInsuranceSectorInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateInsuranceSector({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 455218:
/*!*******************************************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/actions/insurance-sector.business-action-base.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsuranceSectorBusinessActionBase": () => (/* binding */ InsuranceSectorBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class InsuranceSectorBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 742867:
/*!*************************************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/actions/update-insurance-sectors.action.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateInsuranceSectorAction": () => (/* binding */ UpdateInsuranceSectorAction),
/* harmony export */   "UpdateInsuranceSectorsAction": () => (/* binding */ UpdateInsuranceSectorsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _insurance_sector_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance-sector.business-action-base */ 455218);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateInsuranceSectorsAction extends _insurance_sector_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InsuranceSectorBusinessActionBase {
  constructor(insuranceSectors) {
    super('UpdateInsuranceSectorsAction');
    this.insuranceSectors = insuranceSectors;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.insuranceSectors, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateInsuranceSectors({
      input: {
        insuranceSectors: this.insuranceSectors
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateInsuranceSectorAction extends _insurance_sector_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InsuranceSectorBusinessActionBase {
  constructor(insuranceSector, insuranceSectorId) {
    super('UpdateInsuranceSectorAction');
    this.insuranceSector = insuranceSector;
    this.insuranceSectorId = insuranceSectorId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.insuranceSector, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.insuranceSectorId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateInsuranceSector({
      insuranceSectorId: this.insuranceSectorId,
      input: this.insuranceSector
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 492825:
/*!*************************************************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/actions/validate-insurance-sector-excel-data.action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateInsuranceSectorExcelDataAction": () => (/* binding */ ValidateInsuranceSectorExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _insurance_sector_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance-sector.business-action-base */ 455218);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateInsuranceSectorExcelDataAction extends _insurance_sector_business_action_base__WEBPACK_IMPORTED_MODULE_1__.InsuranceSectorBusinessActionBase {
  constructor(excelData) {
    super('ValidateInsuranceSectorExcelDataAction');
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

/***/ 822620:
/*!****************************************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/insurance-sector.business-provider.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsuranceSectorBusinessProviderService": () => (/* binding */ InsuranceSectorBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_insurance_sector_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-insurance-sector-excel-data.action */ 492825);
/* harmony import */ var _actions_create_insurance_sector_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-insurance-sector.action */ 662086);
/* harmony import */ var _actions_update_insurance_sectors_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-insurance-sectors.action */ 742867);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class InsuranceSectorBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.InsuranceSectorBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createInsuranceSector(input) {
    const action = new _actions_create_insurance_sector_action__WEBPACK_IMPORTED_MODULE_2__.CreateInsuranceSectorAction(input);
    action.Do(this);
    return action.response;
  }
  updateInsuranceSector(input, insuranceSectorId) {
    const action = new _actions_update_insurance_sectors_action__WEBPACK_IMPORTED_MODULE_3__.UpdateInsuranceSectorAction(input, insuranceSectorId);
    action.Do(this);
    return action.response;
  }
  importInsuranceSectors(insuranceSectors) {
    const updateInsuranceSectorsAction = new _actions_update_insurance_sectors_action__WEBPACK_IMPORTED_MODULE_3__.UpdateInsuranceSectorsAction(insuranceSectors);
    updateInsuranceSectorsAction.Do(this);
    return updateInsuranceSectorsAction.response;
  }
  validateInsuranceSectorExcelData(excelData) {
    const validateInsuranceSectorExcelDataAction = new _actions_validate_insurance_sector_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateInsuranceSectorExcelDataAction(excelData);
    validateInsuranceSectorExcelDataAction.Do(this);
    return validateInsuranceSectorExcelDataAction.response;
  }
}
InsuranceSectorBusinessProviderService.ɵfac = function InsuranceSectorBusinessProviderService_Factory(t) {
  return new (t || InsuranceSectorBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
InsuranceSectorBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: InsuranceSectorBusinessProviderService,
  factory: InsuranceSectorBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 945425:
/*!**********************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/insurance-sector.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsuranceSectorService": () => (/* binding */ InsuranceSectorService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _insurance_sector_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insurance-sector.business-provider.service */ 822620);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class InsuranceSectorService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("InsuranceSectorService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createInsuranceSector(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createInsuranceSector(filteredObj);
  }
  updateInsuranceSector(input, insuranceSectorId) {
    return this.businessProvider.updateInsuranceSector(input, insuranceSectorId);
  }
  importInsuranceSectors(insuranceSectors) {
    return this.businessProvider.importInsuranceSectors(insuranceSectors);
  }
  validateInsuranceSectorExcelData(excelData) {
    return this.businessProvider.validateInsuranceSectorExcelData(excelData);
  }
}
InsuranceSectorService.ɵfac = function InsuranceSectorService_Factory(t) {
  return new (t || InsuranceSectorService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_insurance_sector_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.InsuranceSectorBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_insurance_sector_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.InsuranceSectorBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
InsuranceSectorService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: InsuranceSectorService,
  factory: InsuranceSectorService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 975667:
/*!********************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/insurance-sector.store.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebInsuranceSectorFeatureStore": () => (/* binding */ WebInsuranceSectorFeatureStore)
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
/* harmony import */ var _insurance_sector_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./insurance-sector.service */ 945425);














class WebInsuranceSectorFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, insuranceSectorService) {
    super({
      loading: false,
      insuranceSectors: [],
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
    this.insuranceSectorService = insuranceSectorService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.insuranceSectors$ = this.select(s => s.insuranceSectors);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.insuranceSectors$, (errors, loading, item, formName, insuranceSectors) => ({
      errors,
      loading,
      item,
      formName,
      insuranceSectors
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
    this.addNewInsuranceSector = this.updater((state, insuranceSector) => Object.assign(Object.assign({}, state), {
      insuranceSectors: [...state.insuranceSectors, insuranceSector]
    }));
    this.updateInsuranceSector = this.updater((state, insuranceSector) => {
      return Object.assign(Object.assign({}, state), {
        insuranceSectors: state.insuranceSectors.map(el => {
          if (el.id === insuranceSector.id) {
            return insuranceSector;
          } else {
            return el;
          }
        })
      });
    });
    this.addInsuranceSectors = this.updater((state, newInsuranceSectors) => Object.assign(Object.assign({}, state), {
      insuranceSectors: state.insuranceSectors.concat(newInsuranceSectors)
    }));
    this.updateInsuranceSectors = this.updater((state, updatedInsuranceSectors) => {
      return Object.assign(Object.assign({}, state), {
        insuranceSectors: state.insuranceSectors.map(insuranceSector => {
          const updated = updatedInsuranceSectors.find(el => el.id === insuranceSector.id);
          return updated ? updated : insuranceSector;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadInsuranceSectorEffect = this.effect(insuranceSectorId$ => insuranceSectorId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(insuranceSectorId => this.data.userInsuranceSector({
      insuranceSectorId
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
    this.loadInsuranceSectorsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userInsuranceSectors({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      insuranceSectors: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createInsuranceSectorEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.insuranceSectorService.createInsuranceSector(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(insuranceSector => {
      this.addNewInsuranceSector(insuranceSector);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: insuranceSector,
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
    this.updateInsuranceSectorEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.insuranceSectorService.updateInsuranceSector(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(insuranceSector => {
      this.updateInsuranceSector(insuranceSector);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: insuranceSector,
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
    this.deleteInsuranceSectorEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, insuranceSector]) => {
      return this.data.userDeleteInsuranceSector({
        insuranceSectorId: insuranceSector.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.insuranceSectorService.importInsuranceSectors(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addInsuranceSectors(created);
      this.updateInsuranceSectors(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('insuranceSectorId')) {
      var insuranceSectorId = this.route.snapshot.paramMap.get('insuranceSectorId');
      this.setFormName('insuranceSector_edit');
    } else {
      this.setFormName('insuranceSector_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.insuranceSectorService.validateInsuranceSectorExcelData(excelData);
    }));
  }
}
WebInsuranceSectorFeatureStore.ɵfac = function WebInsuranceSectorFeatureStore_Factory(t) {
  return new (t || WebInsuranceSectorFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_insurance_sector_service__WEBPACK_IMPORTED_MODULE_11__.InsuranceSectorService));
};
WebInsuranceSectorFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebInsuranceSectorFeatureStore,
  factory: WebInsuranceSectorFeatureStore.ɵfac
});

/***/ }),

/***/ 675284:
/*!***********************************************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/rules/create-insurance-sector-input-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateInsuranceSectorInputIsValidRule": () => (/* binding */ CreateInsuranceSectorInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _insurance_sector_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance-sector-name-is-valid.rule */ 220585);


class CreateInsuranceSectorInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _insurance_sector_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.InsuranceSectorNameIsValidRule('name', 'The insurancesector name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 220585:
/*!***************************************************************************************!*\
  !*** ./libs/web/insurance-sector/shared/rules/insurance-sector-name-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsuranceSectorNameIsValidRule": () => (/* binding */ InsuranceSectorNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class InsuranceSectorNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);