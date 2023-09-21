"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_contact-phone-number_shared_contact-phone-number_store_ts-libs_web_contact-p-a414b9"],{

/***/ 264755:
/*!***************************************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/actions/contact-phone-number.business-action-base.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactPhoneNumberBusinessActionBase": () => (/* binding */ ContactPhoneNumberBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class ContactPhoneNumberBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 152074:
/*!********************************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/actions/create-contact-phone-number.action.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContactPhoneNumberAction": () => (/* binding */ CreateContactPhoneNumberAction)
/* harmony export */ });
/* harmony import */ var _contact_phone_number_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact-phone-number.business-action-base */ 264755);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_contact_phone_number_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rules/create-contact-phone-number-input-is-valid.rule */ 392);




class CreateContactPhoneNumberAction extends _contact_phone_number_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContactPhoneNumberBusinessActionBase {
  constructor(input) {
    super('CreateContactPhoneNumberAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_contact_phone_number_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_2__.CreateContactPhoneNumberInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateContactPhoneNumber({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 679805:
/*!*********************************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/actions/update-contact-phone-numbers.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateContactPhoneNumberAction": () => (/* binding */ UpdateContactPhoneNumberAction),
/* harmony export */   "UpdateContactPhoneNumbersAction": () => (/* binding */ UpdateContactPhoneNumbersAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contact_phone_number_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact-phone-number.business-action-base */ 264755);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateContactPhoneNumbersAction extends _contact_phone_number_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContactPhoneNumberBusinessActionBase {
  constructor(contactPhoneNumbers) {
    super('UpdateContactPhoneNumbersAction');
    this.contactPhoneNumbers = contactPhoneNumbers;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contactPhoneNumbers, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContactPhoneNumbers({
      input: {
        contactPhoneNumbers: this.contactPhoneNumbers
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateContactPhoneNumberAction extends _contact_phone_number_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContactPhoneNumberBusinessActionBase {
  constructor(contactPhoneNumber, contactPhoneNumberId) {
    super('UpdateContactPhoneNumberAction');
    this.contactPhoneNumber = contactPhoneNumber;
    this.contactPhoneNumberId = contactPhoneNumberId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.contactPhoneNumber, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.contactPhoneNumberId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateContactPhoneNumber({
      contactPhoneNumberId: this.contactPhoneNumberId,
      input: this.contactPhoneNumber
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 28488:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/actions/validate-contact-phone-number-excel-data.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateContactPhoneNumberExcelDataAction": () => (/* binding */ ValidateContactPhoneNumberExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _contact_phone_number_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact-phone-number.business-action-base */ 264755);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateContactPhoneNumberExcelDataAction extends _contact_phone_number_business_action_base__WEBPACK_IMPORTED_MODULE_1__.ContactPhoneNumberBusinessActionBase {
  constructor(excelData, countries, contacts) {
    super('ValidateContactPhoneNumberExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.countries = countries;
    this.contacts = contacts;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`countryName_${index}_is_valid}`, "Country Is Not Valid", 'country.name', datum['country'], this.countries, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`contactName_${index}_is_valid}`, "Contact Is Not Valid", 'contact.name', datum['contact'], this.contacts, true));
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

/***/ 524980:
/*!************************************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/contact-phone-number.business-provider.service.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactPhoneNumberBusinessProviderService": () => (/* binding */ ContactPhoneNumberBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_contact_phone_number_excel_data_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/validate-contact-phone-number-excel-data.action */ 28488);
/* harmony import */ var _actions_create_contact_phone_number_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-contact-phone-number.action */ 152074);
/* harmony import */ var _actions_update_contact_phone_numbers_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-contact-phone-numbers.action */ 679805);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class ContactPhoneNumberBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.ContactPhoneNumberBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createContactPhoneNumber(input) {
    const action = new _actions_create_contact_phone_number_action__WEBPACK_IMPORTED_MODULE_2__.CreateContactPhoneNumberAction(input);
    action.Do(this);
    return action.response;
  }
  updateContactPhoneNumber(input, contactPhoneNumberId) {
    const action = new _actions_update_contact_phone_numbers_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContactPhoneNumberAction(input, contactPhoneNumberId);
    action.Do(this);
    return action.response;
  }
  importContactPhoneNumbers(contactPhoneNumbers) {
    const updateContactPhoneNumbersAction = new _actions_update_contact_phone_numbers_action__WEBPACK_IMPORTED_MODULE_3__.UpdateContactPhoneNumbersAction(contactPhoneNumbers);
    updateContactPhoneNumbersAction.Do(this);
    return updateContactPhoneNumbersAction.response;
  }
  validateContactPhoneNumberExcelData(excelData, countries, contacts) {
    const validateContactPhoneNumberExcelDataAction = new _actions_validate_contact_phone_number_excel_data_action__WEBPACK_IMPORTED_MODULE_4__.ValidateContactPhoneNumberExcelDataAction(excelData, countries, contacts);
    validateContactPhoneNumberExcelDataAction.Do(this);
    return validateContactPhoneNumberExcelDataAction.response;
  }
}
ContactPhoneNumberBusinessProviderService.ɵfac = function ContactPhoneNumberBusinessProviderService_Factory(t) {
  return new (t || ContactPhoneNumberBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
ContactPhoneNumberBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ContactPhoneNumberBusinessProviderService,
  factory: ContactPhoneNumberBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 682565:
/*!******************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/contact-phone-number.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactPhoneNumberService": () => (/* binding */ ContactPhoneNumberService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _contact_phone_number_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact-phone-number.business-provider.service */ 524980);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class ContactPhoneNumberService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("ContactPhoneNumberService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createContactPhoneNumber(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createContactPhoneNumber(filteredObj);
  }
  updateContactPhoneNumber(input, contactPhoneNumberId) {
    return this.businessProvider.updateContactPhoneNumber(input, contactPhoneNumberId);
  }
  importContactPhoneNumbers(contactPhoneNumbers) {
    return this.businessProvider.importContactPhoneNumbers(contactPhoneNumbers);
  }
  validateContactPhoneNumberExcelData(excelData, countries, contacts) {
    return this.businessProvider.validateContactPhoneNumberExcelData(excelData, countries, contacts);
  }
}
ContactPhoneNumberService.ɵfac = function ContactPhoneNumberService_Factory(t) {
  return new (t || ContactPhoneNumberService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contact_phone_number_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContactPhoneNumberBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_contact_phone_number_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.ContactPhoneNumberBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
ContactPhoneNumberService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: ContactPhoneNumberService,
  factory: ContactPhoneNumberService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 267269:
/*!****************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/contact-phone-number.store.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContactPhoneNumberFeatureStore": () => (/* binding */ WebContactPhoneNumberFeatureStore)
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
/* harmony import */ var _contact_phone_number_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./contact-phone-number.service */ 682565);














class WebContactPhoneNumberFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, contactPhoneNumberService) {
    super({
      loading: false,
      contactPhoneNumbers: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      countryId: undefined,
      contactId: undefined,
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
    this.contactPhoneNumberService = contactPhoneNumberService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.contactPhoneNumbers$ = this.select(s => s.contactPhoneNumbers);
    this.countries$ = this.select(s => s.countries || []);
    this.contacts$ = this.select(s => s.contacts || []);
    this.countryId$ = this.select(s => s.countryId);
    this.contactId$ = this.select(s => s.contactId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contactPhoneNumbers$, this.countries$, this.contacts$, (errors, loading, item, formName, contactPhoneNumbers, countries, contacts) => ({
      errors,
      loading,
      item,
      formName,
      contactPhoneNumbers,
      countries,
      contacts
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.countryId$, this.contactId$, this.searchQuery$, (paging, countryId, contactId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      countryId: countryId,
      contactId: contactId,
      total: paging.total
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setCountryId = this.updater((state, countryId) => Object.assign(Object.assign({}, state), {
      countryId
    }));
    this.setContactId = this.updater((state, contactId) => Object.assign(Object.assign({}, state), {
      contactId
    }));
    this.filterCountries = term => this.data.userSelectCountries({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let countries = res.data.items;
      this.patchState({
        countries
      });
      return countries;
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
    this.addCountry = this.updater((state, country) => Object.assign(Object.assign({}, state), {
      countries: state.countries.concat(country)
    }));
    this.addContact = this.updater((state, contact) => Object.assign(Object.assign({}, state), {
      contacts: state.contacts.concat(contact)
    }));
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewContactPhoneNumber = this.updater((state, contactPhoneNumber) => Object.assign(Object.assign({}, state), {
      contactPhoneNumbers: [...state.contactPhoneNumbers, contactPhoneNumber]
    }));
    this.updateContactPhoneNumber = this.updater((state, contactPhoneNumber) => {
      return Object.assign(Object.assign({}, state), {
        contactPhoneNumbers: state.contactPhoneNumbers.map(el => {
          if (el.id === contactPhoneNumber.id) {
            return contactPhoneNumber;
          } else {
            return el;
          }
        })
      });
    });
    this.addContactPhoneNumbers = this.updater((state, newContactPhoneNumbers) => Object.assign(Object.assign({}, state), {
      contactPhoneNumbers: state.contactPhoneNumbers.concat(newContactPhoneNumbers)
    }));
    this.updateContactPhoneNumbers = this.updater((state, updatedContactPhoneNumbers) => {
      return Object.assign(Object.assign({}, state), {
        contactPhoneNumbers: state.contactPhoneNumbers.map(contactPhoneNumber => {
          const updated = updatedContactPhoneNumbers.find(el => el.id === contactPhoneNumber.id);
          return updated ? updated : contactPhoneNumber;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadContactPhoneNumberEffect = this.effect(contactPhoneNumberId$ => contactPhoneNumberId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(contactPhoneNumberId => this.data.userContactPhoneNumber({
      contactPhoneNumberId
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
    this.loadContactPhoneNumbersEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userContactPhoneNumbers({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      contactPhoneNumbers: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.createContactPhoneNumberEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.contactPhoneNumberService.createContactPhoneNumber(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contactPhoneNumber => {
      this.addNewContactPhoneNumber(contactPhoneNumber);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: contactPhoneNumber,
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
    this.updateContactPhoneNumberEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.contactPhoneNumberService.updateContactPhoneNumber(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(contactPhoneNumber => {
      this.updateContactPhoneNumber(contactPhoneNumber);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: contactPhoneNumber,
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
    this.deleteContactPhoneNumberEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, contactPhoneNumber]) => {
      return this.data.userDeleteContactPhoneNumber({
        contactPhoneNumberId: contactPhoneNumber.id
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
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.contactPhoneNumberService.importContactPhoneNumbers(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
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
      this.addContactPhoneNumbers(created);
      this.updateContactPhoneNumbers(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    if (this.route.snapshot.paramMap.has('contactPhoneNumberId')) {
      var contactPhoneNumberId = this.route.snapshot.paramMap.get('contactPhoneNumberId');
      this.setFormName('contactPhoneNumber_edit');
    } else {
      this.setFormName('contactPhoneNumber_create');
    }
    if (this.route.snapshot.paramMap.has("countryId")) {
      var countryId = this.route.snapshot.paramMap.get("countryId");
      this.setCountryId(countryId);
    }
    if (this.route.snapshot.paramMap.has("contactId")) {
      var contactId = this.route.snapshot.paramMap.get("contactId");
      this.setContactId(contactId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(vm => {
      return this.contactPhoneNumberService.validateContactPhoneNumberExcelData(excelData, vm.countries, vm.contacts);
    }));
  }
}
WebContactPhoneNumberFeatureStore.ɵfac = function WebContactPhoneNumberFeatureStore_Factory(t) {
  return new (t || WebContactPhoneNumberFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_10__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_11__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_contact_phone_number_service__WEBPACK_IMPORTED_MODULE_12__.ContactPhoneNumberService));
};
WebContactPhoneNumberFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: WebContactPhoneNumberFeatureStore,
  factory: WebContactPhoneNumberFeatureStore.ɵfac
});

/***/ }),

/***/ 715345:
/*!***********************************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/rules/contact-phone-number-name-is-valid.rule.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactPhoneNumberNameIsValidRule": () => (/* binding */ ContactPhoneNumberNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class ContactPhoneNumberNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 392:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/contact-phone-number/shared/rules/create-contact-phone-number-input-is-valid.rule.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateContactPhoneNumberInputIsValidRule": () => (/* binding */ CreateContactPhoneNumberInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _contact_phone_number_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact-phone-number-name-is-valid.rule */ 715345);


class CreateContactPhoneNumberInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _contact_phone_number_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.ContactPhoneNumberNameIsValidRule('name', 'The contactphonenumber name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ }),

/***/ 864678:
/*!***************************************************************************************************************************************!*\
  !*** ./libs/web/contact-phone-number/ui/web-contact-phone-number-select-form/web-contact-phone-number-select-table-view.component.ts ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebContactPhoneNumberSelectTableViewComponent": () => (/* binding */ WebContactPhoneNumberSelectTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 251645);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);





class WebContactPhoneNumberSelectTableViewComponent {
  constructor() {
    this.autoHeight = false;
    this.contactPhoneNumbers = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'country.name',
      headerName: 'Country',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contact.name',
      headerName: 'Contact',
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
      field: 'countryId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'phoneNumber',
      filter: 'agTextColumnFilter'
    }, {
      field: 'label',
      filter: 'agTextColumnFilter'
    }, {
      field: 'contactId',
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
WebContactPhoneNumberSelectTableViewComponent.ɵfac = function WebContactPhoneNumberSelectTableViewComponent_Factory(t) {
  return new (t || WebContactPhoneNumberSelectTableViewComponent)();
};
WebContactPhoneNumberSelectTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebContactPhoneNumberSelectTableViewComponent,
  selectors: [["ui-contact-phone-number-select-table-view"]],
  viewQuery: function WebContactPhoneNumberSelectTableViewComponent_Query(rf, ctx) {
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
    contactPhoneNumbers: "contactPhoneNumbers"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "autoHeight", "showSidebar", "data", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebContactPhoneNumberSelectTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebContactPhoneNumberSelectTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebContactPhoneNumberSelectTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoHeight", ctx.autoHeight)("showSidebar", false)("data", ctx.contactPhoneNumbers)("suppressRowClickSelection", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent],
  encapsulation: 2
});

/***/ })

}]);