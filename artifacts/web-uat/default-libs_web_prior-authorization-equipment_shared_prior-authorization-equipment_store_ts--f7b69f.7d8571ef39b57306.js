"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_prior-authorization-equipment_shared_prior-authorization-equipment_store_ts--f7b69f"],{

/***/ 486049:
/*!**************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/actions/create-prior-authorization-equipment.action.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationEquipmentAction": () => (/* binding */ CreatePriorAuthorizationEquipmentAction)
/* harmony export */ });
/* harmony import */ var _prior_authorization_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-equipment.business-action-base */ 913180);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_prior_authorization_equipment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-prior-authorization-equipment-input-is-valid.rule */ 191099);




class CreatePriorAuthorizationEquipmentAction extends _prior_authorization_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationEquipmentBusinessActionBase {
  constructor(input) {
    super('CreatePriorAuthorizationEquipmentAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_prior_authorization_equipment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationEquipmentInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationEquipment({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 913180:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/actions/prior-authorization-equipment.business-action-base.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationEquipmentBusinessActionBase": () => (/* binding */ PriorAuthorizationEquipmentBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class PriorAuthorizationEquipmentBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 510870:
/*!***************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/actions/update-prior-authorization-equipments.action.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePriorAuthorizationEquipmentAction": () => (/* binding */ UpdatePriorAuthorizationEquipmentAction),
/* harmony export */   "UpdatePriorAuthorizationEquipmentsAction": () => (/* binding */ UpdatePriorAuthorizationEquipmentsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-equipment.business-action-base */ 913180);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdatePriorAuthorizationEquipmentsAction extends _prior_authorization_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationEquipmentBusinessActionBase {
  constructor(priorAuthorizationEquipments) {
    super('UpdatePriorAuthorizationEquipmentsAction');
    this.priorAuthorizationEquipments = priorAuthorizationEquipments;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationEquipments, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationEquipments({
      input: {
        priorAuthorizationEquipments: this.priorAuthorizationEquipments
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdatePriorAuthorizationEquipmentAction extends _prior_authorization_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationEquipmentBusinessActionBase {
  constructor(priorAuthorizationEquipment, priorAuthorizationEquipmentId) {
    super('UpdatePriorAuthorizationEquipmentAction');
    this.priorAuthorizationEquipment = priorAuthorizationEquipment;
    this.priorAuthorizationEquipmentId = priorAuthorizationEquipmentId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.priorAuthorizationEquipment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.priorAuthorizationEquipmentId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdatePriorAuthorizationEquipment({
      priorAuthorizationEquipmentId: this.priorAuthorizationEquipmentId,
      input: this.priorAuthorizationEquipment
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 293755:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/actions/validate-prior-authorization-equipment-excel-data.action.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidatePriorAuthorizationEquipmentExcelDataAction": () => (/* binding */ ValidatePriorAuthorizationEquipmentExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _prior_authorization_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-equipment.business-action-base */ 913180);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidatePriorAuthorizationEquipmentExcelDataAction extends _prior_authorization_equipment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationEquipmentBusinessActionBase {
  constructor(excelData, equipment, priorAuthorizationRequests) {
    super('ValidatePriorAuthorizationEquipmentExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.equipment = equipment;
    this.priorAuthorizationRequests = priorAuthorizationRequests;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`equipmentName_${index}_is_valid}`, "Equipment Is Not Valid", 'equipment.name', datum['equipment'], this.equipment, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`priorAuthorizationRequestName_${index}_is_valid}`, "Prior Authorization Request Is Not Valid", 'priorAuthorizationRequest.name', datum['priorAuthorizationRequest'], this.priorAuthorizationRequests, true));
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

/***/ 576596:
/*!******************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/prior-authorization-equipment.business-provider.service.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationEquipmentBusinessProviderService": () => (/* binding */ PriorAuthorizationEquipmentBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_prior_authorization_equipment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-prior-authorization-equipment-excel-data.action */ 293755);
/* harmony import */ var _actions_create_prior_authorization_equipment_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-prior-authorization-equipment.action */ 486049);
/* harmony import */ var _actions_update_prior_authorization_equipments_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-prior-authorization-equipments.action */ 510870);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class PriorAuthorizationEquipmentBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.PriorAuthorizationEquipmentBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createPriorAuthorizationEquipment(input) {
    const action = new _actions_create_prior_authorization_equipment_action__WEBPACK_IMPORTED_MODULE_2__.CreatePriorAuthorizationEquipmentAction(input);
    action.Do(this);
    return action.response;
  }
  updatePriorAuthorizationEquipment(input, priorAuthorizationEquipmentId) {
    const action = new _actions_update_prior_authorization_equipments_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationEquipmentAction(input, priorAuthorizationEquipmentId);
    action.Do(this);
    return action.response;
  }
  importPriorAuthorizationEquipments(priorAuthorizationEquipments) {
    const updatePriorAuthorizationEquipmentsAction = new _actions_update_prior_authorization_equipments_action__WEBPACK_IMPORTED_MODULE_3__.UpdatePriorAuthorizationEquipmentsAction(priorAuthorizationEquipments);
    updatePriorAuthorizationEquipmentsAction.Do(this);
    return updatePriorAuthorizationEquipmentsAction.response;
  }
  validatePriorAuthorizationEquipmentExcelData(excelData, equipment, priorAuthorizationRequests) {
    const validatePriorAuthorizationEquipmentExcelDataAction = new _actions_validate_prior_authorization_equipment_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidatePriorAuthorizationEquipmentExcelDataAction(excelData, equipment, priorAuthorizationRequests);
    validatePriorAuthorizationEquipmentExcelDataAction.Do(this);
    return validatePriorAuthorizationEquipmentExcelDataAction.response;
  }
}
PriorAuthorizationEquipmentBusinessProviderService.ɵfac = function PriorAuthorizationEquipmentBusinessProviderService_Factory(t) {
  return new (t || PriorAuthorizationEquipmentBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
PriorAuthorizationEquipmentBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationEquipmentBusinessProviderService,
  factory: PriorAuthorizationEquipmentBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 911618:
/*!************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/prior-authorization-equipment.service.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationEquipmentService": () => (/* binding */ PriorAuthorizationEquipmentService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _prior_authorization_equipment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prior-authorization-equipment.business-provider.service */ 576596);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class PriorAuthorizationEquipmentService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("PriorAuthorizationEquipmentService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createPriorAuthorizationEquipment(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createPriorAuthorizationEquipment(filteredObj);
  }
  updatePriorAuthorizationEquipment(input, priorAuthorizationEquipmentId) {
    return this.businessProvider.updatePriorAuthorizationEquipment(input, priorAuthorizationEquipmentId);
  }
  importPriorAuthorizationEquipments(priorAuthorizationEquipments) {
    return this.businessProvider.importPriorAuthorizationEquipments(priorAuthorizationEquipments);
  }
  validatePriorAuthorizationEquipmentExcelData(excelData, equipment, priorAuthorizationRequests) {
    return this.businessProvider.validatePriorAuthorizationEquipmentExcelData(excelData, equipment, priorAuthorizationRequests);
  }
}
PriorAuthorizationEquipmentService.ɵfac = function PriorAuthorizationEquipmentService_Factory(t) {
  return new (t || PriorAuthorizationEquipmentService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_equipment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationEquipmentBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_prior_authorization_equipment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.PriorAuthorizationEquipmentBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
PriorAuthorizationEquipmentService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: PriorAuthorizationEquipmentService,
  factory: PriorAuthorizationEquipmentService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 12040:
/*!**********************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/prior-authorization-equipment.store.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationEquipmentFeatureStore": () => (/* binding */ WebPriorAuthorizationEquipmentFeatureStore)
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
/* harmony import */ var _prior_authorization_equipment_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prior-authorization-equipment.service */ 911618);














class WebPriorAuthorizationEquipmentFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, priorAuthorizationEquipmentService) {
    super({
      loading: false,
      priorAuthorizationEquipments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      equipmentId: undefined,
      priorAuthorizationRequestId: undefined,
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
    this.priorAuthorizationEquipmentService = priorAuthorizationEquipmentService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.priorAuthorizationEquipments$ = this.select(s => s.priorAuthorizationEquipments);
    this.equipments$ = this.select(s => s.equipments || []);
    this.priorAuthorizationRequests$ = this.select(s => s.priorAuthorizationRequests || []);
    this.equipmentId$ = this.select(s => s.equipmentId);
    this.priorAuthorizationRequestId$ = this.select(s => s.priorAuthorizationRequestId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationEquipments$, this.equipments$, this.priorAuthorizationRequests$, (errors, loading, item, formName, priorAuthorizationEquipments, equipments, priorAuthorizationRequests) => ({
      errors,
      loading,
      item,
      formName,
      priorAuthorizationEquipments,
      equipments,
      priorAuthorizationRequests
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.equipmentId$, this.priorAuthorizationRequestId$, this.searchQuery$, (paging, equipmentId, priorAuthorizationRequestId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      equipmentId: equipmentId,
      priorAuthorizationRequestId: priorAuthorizationRequestId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setEquipmentId = this.updater((state, equipmentId) => Object.assign(Object.assign({}, state), {
      equipmentId
    }));
    this.setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequestId
    }));
    this.filterEquipments = term => this.data.userSelectEquipments({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let equipments = res.data.items;
      this.patchState({
        equipments
      });
      return equipments;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPriorAuthorizationRequests = term => this.data.userSelectPriorAuthorizationRequests({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let priorAuthorizationRequests = res.data.items;
      this.patchState({
        priorAuthorizationRequests
      });
      return priorAuthorizationRequests;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addEquipment = this.updater((state, equipment) => Object.assign(Object.assign({}, state), {
      equipments: state.equipments.concat(equipment)
    }));
    this.addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest) => Object.assign(Object.assign({}, state), {
      priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewPriorAuthorizationEquipment = this.updater((state, priorAuthorizationEquipment) => Object.assign(Object.assign({}, state), {
      priorAuthorizationEquipments: [...state.priorAuthorizationEquipments, priorAuthorizationEquipment]
    }));
    this.updatePriorAuthorizationEquipment = this.updater((state, priorAuthorizationEquipment) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationEquipments: state.priorAuthorizationEquipments.map(el => {
          if (el.id === priorAuthorizationEquipment.id) {
            return priorAuthorizationEquipment;
          } else {
            return el;
          }
        })
      });
    });
    this.addPriorAuthorizationEquipments = this.updater((state, newPriorAuthorizationEquipments) => Object.assign(Object.assign({}, state), {
      priorAuthorizationEquipments: state.priorAuthorizationEquipments.concat(newPriorAuthorizationEquipments)
    }));
    this.updatePriorAuthorizationEquipments = this.updater((state, updatedPriorAuthorizationEquipments) => {
      return Object.assign(Object.assign({}, state), {
        priorAuthorizationEquipments: state.priorAuthorizationEquipments.map(priorAuthorizationEquipment => {
          const updated = updatedPriorAuthorizationEquipments.find(el => el.id === priorAuthorizationEquipment.id);
          return updated ? updated : priorAuthorizationEquipment;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadPriorAuthorizationEquipmentEffect = this.effect(priorAuthorizationEquipmentId$ => priorAuthorizationEquipmentId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(priorAuthorizationEquipmentId => this.data.userPriorAuthorizationEquipment({
      priorAuthorizationEquipmentId
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
    this.loadPriorAuthorizationEquipmentsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userPriorAuthorizationEquipments({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      priorAuthorizationEquipments: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createPriorAuthorizationEquipmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.priorAuthorizationEquipmentService.createPriorAuthorizationEquipment(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationEquipment => {
      this.addNewPriorAuthorizationEquipment(priorAuthorizationEquipment);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationEquipment,
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
    this.updatePriorAuthorizationEquipmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.priorAuthorizationEquipmentService.updatePriorAuthorizationEquipment(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(priorAuthorizationEquipment => {
      this.updatePriorAuthorizationEquipment(priorAuthorizationEquipment);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: priorAuthorizationEquipment,
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
    this.deletePriorAuthorizationEquipmentEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, priorAuthorizationEquipment]) => {
      return this.data.userDeletePriorAuthorizationEquipment({
        priorAuthorizationEquipmentId: priorAuthorizationEquipment.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.priorAuthorizationEquipmentService.importPriorAuthorizationEquipments(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addPriorAuthorizationEquipments(created);
      this.updatePriorAuthorizationEquipments(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('priorAuthorizationEquipmentId')) {
      var priorAuthorizationEquipmentId = this.route.snapshot.paramMap.get('priorAuthorizationEquipmentId');
      this.setFormName('priorAuthorizationEquipment_edit');
    } else {
      this.setFormName('priorAuthorizationEquipment_create');
    }
    if (this.route.snapshot.paramMap.has("equipmentId")) {
      var equipmentId = this.route.snapshot.paramMap.get("equipmentId");
      this.setEquipmentId(equipmentId);
    }
    if (this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId");
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.priorAuthorizationEquipmentService.validatePriorAuthorizationEquipmentExcelData(excelData, vm.equipments, vm.priorAuthorizationRequests);
    }));
  }
}
WebPriorAuthorizationEquipmentFeatureStore.ɵfac = function WebPriorAuthorizationEquipmentFeatureStore_Factory(t) {
  return new (t || WebPriorAuthorizationEquipmentFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_prior_authorization_equipment_service__WEBPACK_IMPORTED_MODULE_12__.PriorAuthorizationEquipmentService));
};
WebPriorAuthorizationEquipmentFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebPriorAuthorizationEquipmentFeatureStore,
  factory: WebPriorAuthorizationEquipmentFeatureStore.ɵfac
});

/***/ }),

/***/ 191099:
/*!*************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/rules/create-prior-authorization-equipment-input-is-valid.rule.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePriorAuthorizationEquipmentInputIsValidRule": () => (/* binding */ CreatePriorAuthorizationEquipmentInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _prior_authorization_equipment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prior-authorization-equipment-name-is-valid.rule */ 75370);


class CreatePriorAuthorizationEquipmentInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _prior_authorization_equipment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.PriorAuthorizationEquipmentNameIsValidRule('name', 'The priorauthorizationequipment name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 75370:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/shared/rules/prior-authorization-equipment-name-is-valid.rule.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorAuthorizationEquipmentNameIsValidRule": () => (/* binding */ PriorAuthorizationEquipmentNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class PriorAuthorizationEquipmentNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 652590:
/*!******************************************************************************************************************************************************************!*\
  !*** ./libs/web/prior-authorization-equipment/ui/web-prior-authorization-equipment-select-form/web-prior-authorization-equipment-select-table-view.component.ts ***!
  \******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPriorAuthorizationEquipmentSelectTableViewComponent": () => (/* binding */ WebPriorAuthorizationEquipmentSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebPriorAuthorizationEquipmentSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.priorAuthorizationEquipments = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'equipment.name',
      headerName: 'Equipment',
      filter: 'agTextColumnFilter'
    }, {
      field: 'priorAuthorizationRequest.name',
      headerName: 'Prior Authorization Request',
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
      headerName: 'Estimated Cost',
      field: 'estimatedCost',
      valueFormatter: params => {
        var _a;
        return (0,_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.currencyFormatter)((_a = params.data) === null || _a === void 0 ? void 0 : _a.estimatedCost, '$', 2);
      },
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum'
    }, {
      field: 'equipmentId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'priorAuthorizationRequestId',
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
WebPriorAuthorizationEquipmentSelectTableViewComponent.ɵfac = function WebPriorAuthorizationEquipmentSelectTableViewComponent_Factory(t) {
  return new (t || WebPriorAuthorizationEquipmentSelectTableViewComponent)();
};
WebPriorAuthorizationEquipmentSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPriorAuthorizationEquipmentSelectTableViewComponent,
  selectors: [["ui-prior-authorization-equipment-select-table-view"]],
  viewQuery: function WebPriorAuthorizationEquipmentSelectTableViewComponent_Query(rf, ctx) {
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
    priorAuthorizationEquipments: "priorAuthorizationEquipments"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebPriorAuthorizationEquipmentSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebPriorAuthorizationEquipmentSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebPriorAuthorizationEquipmentSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.priorAuthorizationEquipments)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);