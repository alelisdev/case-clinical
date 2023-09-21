"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_place-of-service_shared_place-of-service_store_ts"],{

/***/ 790529:
/*!************************************************************************************!*\
  !*** ./libs/web/place-of-service/shared/actions/create-place-of-service.action.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePlaceOfServiceAction": () => (/* binding */ CreatePlaceOfServiceAction)
/* harmony export */ });
/* harmony import */ var _place_of_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./place-of-service.business-action-base */ 517211);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_place_of_service_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-place-of-service-input-is-valid.rule */ 137068);




class CreatePlaceOfServiceAction extends _place_of_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PlaceOfServiceBusinessActionBase {
  constructor(input) {
    super('CreatePlaceOfServiceAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_place_of_service_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePlaceOfServiceInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePlaceOfService({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 517211:
/*!*******************************************************************************************!*\
  !*** ./libs/web/place-of-service/shared/actions/place-of-service.business-action-base.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaceOfServiceBusinessActionBase": () => (/* binding */ PlaceOfServiceBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PlaceOfServiceBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 338682:
/*!*************************************************************************************!*\
  !*** ./libs/web/place-of-service/shared/actions/update-place-of-services.action.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePlaceOfServiceAction": () => (/* binding */ UpdatePlaceOfServiceAction),
/* harmony export */   "UpdatePlaceOfServicesAction": () => (/* binding */ UpdatePlaceOfServicesAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _place_of_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./place-of-service.business-action-base */ 517211);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePlaceOfServicesAction extends _place_of_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PlaceOfServiceBusinessActionBase {
  constructor(placeOfServices) {
    super('UpdatePlaceOfServicesAction');
    this.placeOfServices = placeOfServices;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.placeOfServices, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePlaceOfServices({
      input: {
        placeOfServices: this.placeOfServices
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePlaceOfServiceAction extends _place_of_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PlaceOfServiceBusinessActionBase {
  constructor(placeOfService, placeOfServiceId) {
    super('UpdatePlaceOfServiceAction');
    this.placeOfService = placeOfService;
    this.placeOfServiceId = placeOfServiceId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.placeOfService, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.placeOfServiceId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePlaceOfService({
      placeOfServiceId: this.placeOfServiceId,
      input: this.placeOfService
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 318045:
/*!*************************************************************************************************!*\
  !*** ./libs/web/place-of-service/shared/actions/validate-place-of-service-excel-data.action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePlaceOfServiceExcelDataAction": () => (/* binding */ ValidatePlaceOfServiceExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _place_of_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./place-of-service.business-action-base */ 517211);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePlaceOfServiceExcelDataAction extends _place_of_service_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PlaceOfServiceBusinessActionBase {
  constructor(excelData) {
    super('ValidatePlaceOfServiceExcelDataAction');
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

/***/ 194515:
/*!****************************************************************************************!*\
  !*** ./libs/web/place-of-service/shared/place-of-service.business-provider.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaceOfServiceBusinessProviderService": () => (/* binding */ PlaceOfServiceBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_place_of_service_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-place-of-service-excel-data.action */ 318045);
/* harmony import */ var _actions_create_place_of_service_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-place-of-service.action */ 790529);
/* harmony import */ var _actions_update_place_of_services_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-place-of-services.action */ 338682);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PlaceOfServiceBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PlaceOfServiceBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPlaceOfService(input) {
    const action = new _actions_create_place_of_service_action__WEBPACK_IMPORTED_MODULE_2__.CreatePlaceOfServiceAction(input);
    action.Do(this);
    return action.response;
  }
  updatePlaceOfService(input, placeOfServiceId) {
    const action = new _actions_update_place_of_services_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePlaceOfServiceAction(input, placeOfServiceId);
    action.Do(this);
    return action.response;
  }
  importPlaceOfServices(placeOfServices) {
    const updatePlaceOfServicesAction = new _actions_update_place_of_services_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePlaceOfServicesAction(placeOfServices);
    updatePlaceOfServicesAction.Do(this);
    return updatePlaceOfServicesAction.response;
  }
  validatePlaceOfServiceExcelData(excelData) {
    const validatePlaceOfServiceExcelDataAction = new _actions_validate_place_of_service_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePlaceOfServiceExcelDataAction(excelData);
    validatePlaceOfServiceExcelDataAction.Do(this);
    return validatePlaceOfServiceExcelDataAction.response;
  }
}
PlaceOfServiceBusinessProviderService.ɵfac = function PlaceOfServiceBusinessProviderService_Factory(t) {
  return new (t || PlaceOfServiceBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PlaceOfServiceBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PlaceOfServiceBusinessProviderService,
  factory: PlaceOfServiceBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 306370:
/*!**********************************************************************!*\
  !*** ./libs/web/place-of-service/shared/place-of-service.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaceOfServiceService": () => (/* binding */ PlaceOfServiceService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _place_of_service_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./place-of-service.business-provider.service */ 194515);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PlaceOfServiceService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PlaceOfServiceService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPlaceOfService(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPlaceOfService(filteredObj);
  }
  updatePlaceOfService(input, placeOfServiceId) {
    return this.businessProvider.updatePlaceOfService(input, placeOfServiceId);
  }
  importPlaceOfServices(placeOfServices) {
    return this.businessProvider.importPlaceOfServices(placeOfServices);
  }
  validatePlaceOfServiceExcelData(excelData) {
    return this.businessProvider.validatePlaceOfServiceExcelData(excelData);
  }
}
PlaceOfServiceService.ɵfac = function PlaceOfServiceService_Factory(t) {
  return new (t || PlaceOfServiceService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_place_of_service_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PlaceOfServiceBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_place_of_service_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PlaceOfServiceBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PlaceOfServiceService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PlaceOfServiceService,
  factory: PlaceOfServiceService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 199428:
/*!********************************************************************!*\
  !*** ./libs/web/place-of-service/shared/place-of-service.store.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPlaceOfServiceFeatureStore": () => (/* binding */ WebPlaceOfServiceFeatureStore)
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
/* harmony import */ var _place_of_service_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./place-of-service.service */ 306370);














class WebPlaceOfServiceFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, placeOfServiceService) {
    super({
      loading: false,
      placeOfServices: [],
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
    this.placeOfServiceService = placeOfServiceService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.placeOfServices$ = this.select(s => s.placeOfServices);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.placeOfServices$, (errors, loading, item, formName, placeOfServices) => ({
      errors,
      loading,
      item,
      formName,
      placeOfServices
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
    this.addNewPlaceOfService = this.updater((state, placeOfService) => Object.assign(Object.assign({}, state), {
      placeOfServices: [...state.placeOfServices, placeOfService]
    }));
    this.updatePlaceOfService = this.updater((state, placeOfService) => {
      return Object.assign(Object.assign({}, state), {
        placeOfServices: state.placeOfServices.map(el => {
          if (el.id === placeOfService.id) {
            return placeOfService;
          } else {
            return el;
          }
        })
      });
    });
    this.addPlaceOfServices = this.updater((state, newPlaceOfServices) => Object.assign(Object.assign({}, state), {
      placeOfServices: state.placeOfServices.concat(newPlaceOfServices)
    }));
    this.updatePlaceOfServices = this.updater((state, updatedPlaceOfServices) => {
      return Object.assign(Object.assign({}, state), {
        placeOfServices: state.placeOfServices.map(placeOfService => {
          const updated = updatedPlaceOfServices.find(el => el.id === placeOfService.id);
          return updated ? updated : placeOfService;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPlaceOfServiceEffect = this.effect(placeOfServiceId$ => placeOfServiceId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(placeOfServiceId => this.data.userPlaceOfService({
      placeOfServiceId
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
    this.loadPlaceOfServicesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userPlaceOfServices({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      placeOfServices: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPlaceOfServiceEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.placeOfServiceService.createPlaceOfService(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(placeOfService => {
      this.addNewPlaceOfService(placeOfService);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: placeOfService,
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
    this.updatePlaceOfServiceEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.placeOfServiceService.updatePlaceOfService(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(placeOfService => {
      this.updatePlaceOfService(placeOfService);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: placeOfService,
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
    this.deletePlaceOfServiceEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, placeOfService]) => {
      return this.data.userDeletePlaceOfService({
        placeOfServiceId: placeOfService.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.placeOfServiceService.importPlaceOfServices(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addPlaceOfServices(created);
      this.updatePlaceOfServices(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('placeOfServiceId')) {
      var placeOfServiceId = this.route.snapshot.paramMap.get('placeOfServiceId');
      this.setFormName('placeOfService_edit');
    } else {
      this.setFormName('placeOfService_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.placeOfServiceService.validatePlaceOfServiceExcelData(excelData);
    }));
  }
}
WebPlaceOfServiceFeatureStore.ɵfac = function WebPlaceOfServiceFeatureStore_Factory(t) {
  return new (t || WebPlaceOfServiceFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_place_of_service_service__WEBPACK_IMPORTED_MODULE_11__.PlaceOfServiceService));
};
WebPlaceOfServiceFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebPlaceOfServiceFeatureStore,
  factory: WebPlaceOfServiceFeatureStore.ɵfac
});

/***/ }),

/***/ 137068:
/*!***********************************************************************************************!*\
  !*** ./libs/web/place-of-service/shared/rules/create-place-of-service-input-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePlaceOfServiceInputIsValidRule": () => (/* binding */ CreatePlaceOfServiceInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _place_of_service_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./place-of-service-name-is-valid.rule */ 546756);


class CreatePlaceOfServiceInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _place_of_service_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PlaceOfServiceNameIsValidRule('name', 'The placeofservice name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 546756:
/*!***************************************************************************************!*\
  !*** ./libs/web/place-of-service/shared/rules/place-of-service-name-is-valid.rule.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaceOfServiceNameIsValidRule": () => (/* binding */ PlaceOfServiceNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PlaceOfServiceNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);