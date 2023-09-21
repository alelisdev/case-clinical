"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_gender_shared_gender_store_ts"],{

/***/ 169464:
/*!****************************************************************!*\
  !*** ./libs/web/gender/shared/actions/create-gender.action.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateGenderAction": () => (/* binding */ CreateGenderAction)
/* harmony export */ });
/* harmony import */ var _gender_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gender.business-action-base */ 905072);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_gender_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-gender-input-is-valid.rule */ 406172);




class CreateGenderAction extends _gender_business_action_base__WEBPACK_IMPORTED_MODULE_1__.GenderBusinessActionBase {
  constructor(input) {
    super('CreateGenderAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_gender_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateGenderInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateGender({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 905072:
/*!***********************************************************************!*\
  !*** ./libs/web/gender/shared/actions/gender.business-action-base.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenderBusinessActionBase": () => (/* binding */ GenderBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class GenderBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 354984:
/*!*****************************************************************!*\
  !*** ./libs/web/gender/shared/actions/update-genders.action.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateGenderAction": () => (/* binding */ UpdateGenderAction),
/* harmony export */   "UpdateGendersAction": () => (/* binding */ UpdateGendersAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _gender_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gender.business-action-base */ 905072);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateGendersAction extends _gender_business_action_base__WEBPACK_IMPORTED_MODULE_1__.GenderBusinessActionBase {
  constructor(genders) {
    super('UpdateGendersAction');
    this.genders = genders;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.genders, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateGenders({
      input: {
        genders: this.genders
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateGenderAction extends _gender_business_action_base__WEBPACK_IMPORTED_MODULE_1__.GenderBusinessActionBase {
  constructor(gender, genderId) {
    super('UpdateGenderAction');
    this.gender = gender;
    this.genderId = genderId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.gender, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.genderId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateGender({
      genderId: this.genderId,
      input: this.gender
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 923074:
/*!*****************************************************************************!*\
  !*** ./libs/web/gender/shared/actions/validate-gender-excel-data.action.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateGenderExcelDataAction": () => (/* binding */ ValidateGenderExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _gender_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gender.business-action-base */ 905072);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateGenderExcelDataAction extends _gender_business_action_base__WEBPACK_IMPORTED_MODULE_1__.GenderBusinessActionBase {
  constructor(excelData) {
    super('ValidateGenderExcelDataAction');
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

/***/ 108830:
/*!********************************************************************!*\
  !*** ./libs/web/gender/shared/gender.business-provider.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenderBusinessProviderService": () => (/* binding */ GenderBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_gender_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-gender-excel-data.action */ 923074);
/* harmony import */ var _actions_create_gender_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-gender.action */ 169464);
/* harmony import */ var _actions_update_genders_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-genders.action */ 354984);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class GenderBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.GenderBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createGender(input) {
    const action = new _actions_create_gender_action__WEBPACK_IMPORTED_MODULE_2__.CreateGenderAction(input);
    action.Do(this);
    return action.response;
  }
  updateGender(input, genderId) {
    const action = new _actions_update_genders_action__WEBPACK_IMPORTED_MODULE_3__.UpdateGenderAction(input, genderId);
    action.Do(this);
    return action.response;
  }
  importGenders(genders) {
    const updateGendersAction = new _actions_update_genders_action__WEBPACK_IMPORTED_MODULE_3__.UpdateGendersAction(genders);
    updateGendersAction.Do(this);
    return updateGendersAction.response;
  }
  validateGenderExcelData(excelData) {
    const validateGenderExcelDataAction = new _actions_validate_gender_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateGenderExcelDataAction(excelData);
    validateGenderExcelDataAction.Do(this);
    return validateGenderExcelDataAction.response;
  }
}
GenderBusinessProviderService.ɵfac = function GenderBusinessProviderService_Factory(t) {
  return new (t || GenderBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
GenderBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: GenderBusinessProviderService,
  factory: GenderBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 219490:
/*!**************************************************!*\
  !*** ./libs/web/gender/shared/gender.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenderService": () => (/* binding */ GenderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _gender_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gender.business-provider.service */ 108830);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class GenderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("GenderService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createGender(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createGender(filteredObj);
  }
  updateGender(input, genderId) {
    return this.businessProvider.updateGender(input, genderId);
  }
  importGenders(genders) {
    return this.businessProvider.importGenders(genders);
  }
  validateGenderExcelData(excelData) {
    return this.businessProvider.validateGenderExcelData(excelData);
  }
}
GenderService.ɵfac = function GenderService_Factory(t) {
  return new (t || GenderService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_gender_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.GenderBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_gender_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.GenderBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
GenderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: GenderService,
  factory: GenderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 137373:
/*!************************************************!*\
  !*** ./libs/web/gender/shared/gender.store.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebGenderFeatureStore": () => (/* binding */ WebGenderFeatureStore)
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
/* harmony import */ var _gender_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./gender.service */ 219490);














class WebGenderFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, genderService) {
    super({
      loading: false,
      genders: [],
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
    this.genderService = genderService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.genders$ = this.select(s => s.genders);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.genders$, (errors, loading, item, formName, genders) => ({
      errors,
      loading,
      item,
      formName,
      genders
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
    this.addNewGender = this.updater((state, gender) => Object.assign(Object.assign({}, state), {
      genders: [...state.genders, gender]
    }));
    this.updateGender = this.updater((state, gender) => {
      return Object.assign(Object.assign({}, state), {
        genders: state.genders.map(el => {
          if (el.id === gender.id) {
            return gender;
          } else {
            return el;
          }
        })
      });
    });
    this.addGenders = this.updater((state, newGenders) => Object.assign(Object.assign({}, state), {
      genders: state.genders.concat(newGenders)
    }));
    this.updateGenders = this.updater((state, updatedGenders) => {
      return Object.assign(Object.assign({}, state), {
        genders: state.genders.map(gender => {
          const updated = updatedGenders.find(el => el.id === gender.id);
          return updated ? updated : gender;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadGenderEffect = this.effect(genderId$ => genderId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(genderId => this.data.userGender({
      genderId
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
    this.loadGendersEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, input]) => this.data.userGenders({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      genders: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createGenderEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.genderService.createGender(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(gender => {
      this.addNewGender(gender);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: gender,
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
    this.updateGenderEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, item]) => this.genderService.updateGender(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(gender => {
      this.updateGender(gender);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: gender,
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
    this.deleteGenderEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, gender]) => {
      return this.data.userDeleteGender({
        genderId: gender.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.genderService.importGenders(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
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
      this.addGenders(created);
      this.updateGenders(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('genderId')) {
      var genderId = this.route.snapshot.paramMap.get('genderId');
      this.setFormName('gender_edit');
    } else {
      this.setFormName('gender_create');
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vm => {
      return this.genderService.validateGenderExcelData(excelData);
    }));
  }
}
WebGenderFeatureStore.ɵfac = function WebGenderFeatureStore_Factory(t) {
  return new (t || WebGenderFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_gender_service__WEBPACK_IMPORTED_MODULE_11__.GenderService));
};
WebGenderFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WebGenderFeatureStore,
  factory: WebGenderFeatureStore.ɵfac
});

/***/ }),

/***/ 406172:
/*!***************************************************************************!*\
  !*** ./libs/web/gender/shared/rules/create-gender-input-is-valid.rule.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateGenderInputIsValidRule": () => (/* binding */ CreateGenderInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _gender_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gender-name-is-valid.rule */ 528061);


class CreateGenderInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _gender_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.GenderNameIsValidRule('name', 'The gender name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 528061:
/*!*******************************************************************!*\
  !*** ./libs/web/gender/shared/rules/gender-name-is-valid.rule.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenderNameIsValidRule": () => (/* binding */ GenderNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class GenderNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ })

}]);