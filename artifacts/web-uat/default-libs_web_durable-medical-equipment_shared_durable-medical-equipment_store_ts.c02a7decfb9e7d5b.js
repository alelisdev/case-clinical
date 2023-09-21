"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_durable-medical-equipment_shared_durable-medical-equipment_store_ts"],{

/***/ 996240:
/*!******************************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/actions/create-durable-medical-equipment.action.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateDurableMedicalEquipmentAction": () => (/* binding */ CreateDurableMedicalEquipmentAction)
/* harmony export */ });
/* harmony import */ var _durable_medical_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./durable-medical-equipment.business-action-base */ 834435);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_durable_medical_equipment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-durable-medical-equipment-input-is-valid.rule */ 326954);




class CreateDurableMedicalEquipmentAction extends _durable_medical_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.DurableMedicalEquipmentBusinessActionBase {
  constructor(input) {
    super('CreateDurableMedicalEquipmentAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_durable_medical_equipment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateDurableMedicalEquipmentInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateDurableMedicalEquipment({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 834435:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/actions/durable-medical-equipment.business-action-base.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DurableMedicalEquipmentBusinessActionBase": () => (/* binding */ DurableMedicalEquipmentBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class DurableMedicalEquipmentBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 167196:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/actions/update-durable-medical-equipments.action.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateDurableMedicalEquipmentAction": () => (/* binding */ UpdateDurableMedicalEquipmentAction),
/* harmony export */   "UpdateDurableMedicalEquipmentsAction": () => (/* binding */ UpdateDurableMedicalEquipmentsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _durable_medical_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./durable-medical-equipment.business-action-base */ 834435);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateDurableMedicalEquipmentsAction extends _durable_medical_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.DurableMedicalEquipmentBusinessActionBase {
  constructor(durableMedicalEquipments) {
    super('UpdateDurableMedicalEquipmentsAction');
    this.durableMedicalEquipments = durableMedicalEquipments;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.durableMedicalEquipments, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateDurableMedicalEquipments({
      input: {
        durableMedicalEquipments: this.durableMedicalEquipments
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateDurableMedicalEquipmentAction extends _durable_medical_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.DurableMedicalEquipmentBusinessActionBase {
  constructor(durableMedicalEquipment, durableMedicalEquipmentId) {
    super('UpdateDurableMedicalEquipmentAction');
    this.durableMedicalEquipment = durableMedicalEquipment;
    this.durableMedicalEquipmentId = durableMedicalEquipmentId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.durableMedicalEquipment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.durableMedicalEquipmentId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateDurableMedicalEquipment({
      durableMedicalEquipmentId: this.durableMedicalEquipmentId,
      input: this.durableMedicalEquipment
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 683462:
/*!*******************************************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/actions/validate-durable-medical-equipment-excel-data.action.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateDurableMedicalEquipmentExcelDataAction": () => (/* binding */ ValidateDurableMedicalEquipmentExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _durable_medical_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./durable-medical-equipment.business-action-base */ 834435);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateDurableMedicalEquipmentExcelDataAction extends _durable_medical_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.DurableMedicalEquipmentBusinessActionBase {
  constructor(excelData, vendors) {
    super('ValidateDurableMedicalEquipmentExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.vendors = vendors;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true));
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

/***/ 257975:
/*!**********************************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/durable-medical-equipment.business-provider.service.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DurableMedicalEquipmentBusinessProviderService": () => (/* binding */ DurableMedicalEquipmentBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_durable_medical_equipment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-durable-medical-equipment-excel-data.action */ 683462);
/* harmony import */ var _actions_create_durable_medical_equipment_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-durable-medical-equipment.action */ 996240);
/* harmony import */ var _actions_update_durable_medical_equipments_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-durable-medical-equipments.action */ 167196);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class DurableMedicalEquipmentBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.DurableMedicalEquipmentBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createDurableMedicalEquipment(input) {
    const action = new _actions_create_durable_medical_equipment_action__WEBPACK_IMPORTED_MODULE_2__.CreateDurableMedicalEquipmentAction(input);
    action.Do(this);
    return action.response;
  }
  updateDurableMedicalEquipment(input, durableMedicalEquipmentId) {
    const action = new _actions_update_durable_medical_equipments_action__WEBPACK_IMPORTED_MODULE_3__.UpdateDurableMedicalEquipmentAction(input, durableMedicalEquipmentId);
    action.Do(this);
    return action.response;
  }
  importDurableMedicalEquipments(durableMedicalEquipments) {
    const updateDurableMedicalEquipmentsAction = new _actions_update_durable_medical_equipments_action__WEBPACK_IMPORTED_MODULE_3__.UpdateDurableMedicalEquipmentsAction(durableMedicalEquipments);
    updateDurableMedicalEquipmentsAction.Do(this);
    return updateDurableMedicalEquipmentsAction.response;
  }
  validateDurableMedicalEquipmentExcelData(excelData, vendors) {
    const validateDurableMedicalEquipmentExcelDataAction = new _actions_validate_durable_medical_equipment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateDurableMedicalEquipmentExcelDataAction(excelData, vendors);
    validateDurableMedicalEquipmentExcelDataAction.Do(this);
    return validateDurableMedicalEquipmentExcelDataAction.response;
  }
}
DurableMedicalEquipmentBusinessProviderService.ɵfac = function DurableMedicalEquipmentBusinessProviderService_Factory(t) {
  return new (t || DurableMedicalEquipmentBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
DurableMedicalEquipmentBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: DurableMedicalEquipmentBusinessProviderService,
  factory: DurableMedicalEquipmentBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 334347:
/*!****************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/durable-medical-equipment.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DurableMedicalEquipmentService": () => (/* binding */ DurableMedicalEquipmentService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _durable_medical_equipment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./durable-medical-equipment.business-provider.service */ 257975);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class DurableMedicalEquipmentService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("DurableMedicalEquipmentService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createDurableMedicalEquipment(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createDurableMedicalEquipment(filteredObj);
  }
  updateDurableMedicalEquipment(input, durableMedicalEquipmentId) {
    return this.businessProvider.updateDurableMedicalEquipment(input, durableMedicalEquipmentId);
  }
  importDurableMedicalEquipments(durableMedicalEquipments) {
    return this.businessProvider.importDurableMedicalEquipments(durableMedicalEquipments);
  }
  validateDurableMedicalEquipmentExcelData(excelData, vendors) {
    return this.businessProvider.validateDurableMedicalEquipmentExcelData(excelData, vendors);
  }
}
DurableMedicalEquipmentService.ɵfac = function DurableMedicalEquipmentService_Factory(t) {
  return new (t || DurableMedicalEquipmentService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_durable_medical_equipment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.DurableMedicalEquipmentBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_durable_medical_equipment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.DurableMedicalEquipmentBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
DurableMedicalEquipmentService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: DurableMedicalEquipmentService,
  factory: DurableMedicalEquipmentService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 912165:
/*!**************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/durable-medical-equipment.store.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDurableMedicalEquipmentFeatureStore": () => (/* binding */ WebDurableMedicalEquipmentFeatureStore)
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
/* harmony import */ var _durable_medical_equipment_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./durable-medical-equipment.service */ 334347);














class WebDurableMedicalEquipmentFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, durableMedicalEquipmentService) {
    super({
      loading: false,
      durableMedicalEquipments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      vendorId: undefined,
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
    this.durableMedicalEquipmentService = durableMedicalEquipmentService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.durableMedicalEquipments$ = this.select(s => s.durableMedicalEquipments);
    this.vendors$ = this.select(s => s.vendors || []);
    this.vendorId$ = this.select(s => s.vendorId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.durableMedicalEquipments$, this.vendors$, (errors, loading, item, formName, durableMedicalEquipments, vendors) => ({
      errors,
      loading,
      item,
      formName,
      durableMedicalEquipments,
      vendors
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.vendorId$, this.searchQuery$, (paging, vendorId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      vendorId: vendorId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setVendorId = this.updater((state, vendorId) => Object.assign(Object.assign({}, state), {
      vendorId
    }));
    this.filterVendors = term => this.data.userSelectVendors({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let vendors = res.data.items;
      this.patchState({
        vendors
      });
      return vendors;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addVendor = this.updater((state, vendor) => Object.assign(Object.assign({}, state), {
      vendors: state.vendors.concat(vendor)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewDurableMedicalEquipment = this.updater((state, durableMedicalEquipment) => Object.assign(Object.assign({}, state), {
      durableMedicalEquipments: [...state.durableMedicalEquipments, durableMedicalEquipment]
    }));
    this.updateDurableMedicalEquipment = this.updater((state, durableMedicalEquipment) => {
      return Object.assign(Object.assign({}, state), {
        durableMedicalEquipments: state.durableMedicalEquipments.map(el => {
          if (el.id === durableMedicalEquipment.id) {
            return durableMedicalEquipment;
          } else {
            return el;
          }
        })
      });
    });
    this.addDurableMedicalEquipments = this.updater((state, newDurableMedicalEquipments) => Object.assign(Object.assign({}, state), {
      durableMedicalEquipments: state.durableMedicalEquipments.concat(newDurableMedicalEquipments)
    }));
    this.updateDurableMedicalEquipments = this.updater((state, updatedDurableMedicalEquipments) => {
      return Object.assign(Object.assign({}, state), {
        durableMedicalEquipments: state.durableMedicalEquipments.map(durableMedicalEquipment => {
          const updated = updatedDurableMedicalEquipments.find(el => el.id === durableMedicalEquipment.id);
          return updated ? updated : durableMedicalEquipment;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadDurableMedicalEquipmentEffect = this.effect(durableMedicalEquipmentId$ => durableMedicalEquipmentId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(durableMedicalEquipmentId => this.data.userDurableMedicalEquipment({
      durableMedicalEquipmentId
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
    this.loadDurableMedicalEquipmentsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userDurableMedicalEquipments({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      durableMedicalEquipments: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createDurableMedicalEquipmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.durableMedicalEquipmentService.createDurableMedicalEquipment(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(durableMedicalEquipment => {
      this.addNewDurableMedicalEquipment(durableMedicalEquipment);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: durableMedicalEquipment,
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
    this.updateDurableMedicalEquipmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.durableMedicalEquipmentService.updateDurableMedicalEquipment(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(durableMedicalEquipment => {
      this.updateDurableMedicalEquipment(durableMedicalEquipment);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: durableMedicalEquipment,
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
    this.deleteDurableMedicalEquipmentEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, durableMedicalEquipment]) => {
      return this.data.userDeleteDurableMedicalEquipment({
        durableMedicalEquipmentId: durableMedicalEquipment.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.durableMedicalEquipmentService.importDurableMedicalEquipments(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addDurableMedicalEquipments(created);
      this.updateDurableMedicalEquipments(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('durableMedicalEquipmentId')) {
      var durableMedicalEquipmentId = this.route.snapshot.paramMap.get('durableMedicalEquipmentId');
      this.setFormName('durableMedicalEquipment_edit');
    } else {
      this.setFormName('durableMedicalEquipment_create');
    }
    if (this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId");
      this.setVendorId(vendorId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.durableMedicalEquipmentService.validateDurableMedicalEquipmentExcelData(excelData, vm.vendors);
    }));
  }
}
WebDurableMedicalEquipmentFeatureStore.ɵfac = function WebDurableMedicalEquipmentFeatureStore_Factory(t) {
  return new (t || WebDurableMedicalEquipmentFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_durable_medical_equipment_service__WEBPACK_IMPORTED_MODULE_12__.DurableMedicalEquipmentService));
};
WebDurableMedicalEquipmentFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebDurableMedicalEquipmentFeatureStore,
  factory: WebDurableMedicalEquipmentFeatureStore.ɵfac
});

/***/ }),

/***/ 326954:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/rules/create-durable-medical-equipment-input-is-valid.rule.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateDurableMedicalEquipmentInputIsValidRule": () => (/* binding */ CreateDurableMedicalEquipmentInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _durable_medical_equipment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./durable-medical-equipment-name-is-valid.rule */ 332490);


class CreateDurableMedicalEquipmentInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _durable_medical_equipment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.DurableMedicalEquipmentNameIsValidRule('name', 'The durablemedicalequipment name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 332490:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/durable-medical-equipment/shared/rules/durable-medical-equipment-name-is-valid.rule.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DurableMedicalEquipmentNameIsValidRule": () => (/* binding */ DurableMedicalEquipmentNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class DurableMedicalEquipmentNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);