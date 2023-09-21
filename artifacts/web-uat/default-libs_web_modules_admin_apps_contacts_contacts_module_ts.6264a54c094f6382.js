"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_modules_admin_apps_contacts_contacts_module_ts"],{

/***/ 631026:
/*!********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/contacts/contacts.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactsComponent": () => (/* binding */ ContactsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class ContactsComponent {
  /**
   * Constructor
   */
  constructor() {}
}
ContactsComponent.ɵfac = function ContactsComponent_Factory(t) {
  return new (t || ContactsComponent)();
};
ContactsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ContactsComponent,
  selectors: [["contacts"]],
  decls: 1,
  vars: 0,
  template: function ContactsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 566443:
/*!*****************************************************************!*\
  !*** ./libs/web/modules/admin/apps/contacts/contacts.guards.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanDeactivateContactsDetails": () => (/* binding */ CanDeactivateContactsDetails)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);


class CanDeactivateContactsDetails {
  canDeactivate(component, currentRoute, currentState, nextState) {
    // Get the next route
    let nextRoute = nextState.root;
    while (nextRoute.firstChild) {
      nextRoute = nextRoute.firstChild;
    }
    // If the next state doesn't contain '/contacts'
    // it means we are navigating away from the
    // contacts app
    if (!nextState.url.includes('/contacts')) {
      // Let it navigate
      return true;
    }
    // If we are navigating to another contact...
    if (nextRoute.paramMap.get('id')) {
      // Just navigate
      return true;
    }
    // Otherwise...
    else {
      // Close the drawer first, and then navigate
      return component.closeDrawer().then(() => true);
    }
  }
}
CanDeactivateContactsDetails.ɵfac = function CanDeactivateContactsDetails_Factory(t) {
  return new (t || CanDeactivateContactsDetails)();
};
CanDeactivateContactsDetails.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: CanDeactivateContactsDetails,
  factory: CanDeactivateContactsDetails.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 191975:
/*!*****************************************************************!*\
  !*** ./libs/web/modules/admin/apps/contacts/contacts.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactsModule": () => (/* binding */ ContactsModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/datepicker */ 499602);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/divider */ 44850);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material-moment-adapter */ 808277);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/radio */ 971948);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/table */ 853626);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @fuse/pipes/find-by-key */ 747922);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var libs_web_modules_admin_apps_contacts_contacts_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/contacts.routing */ 104652);
/* harmony import */ var libs_web_modules_admin_apps_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/contacts.component */ 631026);
/* harmony import */ var libs_web_modules_admin_apps_contacts_details_details_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/details/details.component */ 592487);
/* harmony import */ var libs_web_modules_admin_apps_contacts_list_list_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/list/list.component */ 973563);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);


























class ContactsModule {}
ContactsModule.ɵfac = function ContactsModule_Factory(t) {
  return new (t || ContactsModule)();
};
ContactsModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: ContactsModule
});
ContactsModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: [{
    provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MAT_DATE_FORMATS,
    useValue: {
      parse: {
        dateInput: moment__WEBPACK_IMPORTED_MODULE_0__.ISO_8601
      },
      display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
      }
    }
  }],
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(libs_web_modules_admin_apps_contacts_contacts_routing__WEBPACK_IMPORTED_MODULE_4__.contactsRoutes), _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__.MatCheckboxModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__.MatDatepickerModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__.MatDividerModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuModule, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MatMomentDateModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__.MatProgressBarModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__.MatRadioModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatRippleModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__.MatSidenavModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_18__.MatTableModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltipModule, _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_20__.FuseFindByKeyPipeModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_21__.SharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ContactsModule, {
    declarations: [libs_web_modules_admin_apps_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_22__.ContactsComponent, libs_web_modules_admin_apps_contacts_list_list_component__WEBPACK_IMPORTED_MODULE_23__.ContactsListComponent, libs_web_modules_admin_apps_contacts_details_details_component__WEBPACK_IMPORTED_MODULE_24__.ContactsDetailsComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__.MatCheckboxModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__.MatDatepickerModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__.MatDividerModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuModule, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MatMomentDateModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__.MatProgressBarModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__.MatRadioModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatRippleModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__.MatSidenavModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_18__.MatTableModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltipModule, _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_20__.FuseFindByKeyPipeModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_21__.SharedModule]
  });
})();

/***/ }),

/***/ 32522:
/*!********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/contacts/contacts.resolvers.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactsContactResolver": () => (/* binding */ ContactsContactResolver),
/* harmony export */   "ContactsCountriesResolver": () => (/* binding */ ContactsCountriesResolver),
/* harmony export */   "ContactsResolver": () => (/* binding */ ContactsResolver),
/* harmony export */   "ContactsTagsResolver": () => (/* binding */ ContactsTagsResolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/contacts.service */ 570389);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);






class ContactsResolver {
  /**
   * Constructor
   */
  constructor(_contactsService) {
    this._contactsService = _contactsService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._contactsService.getContacts();
  }
}
ContactsResolver.ɵfac = function ContactsResolver_Factory(t) {
  return new (t || ContactsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_1__.ContactsService));
};
ContactsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ContactsResolver,
  factory: ContactsResolver.ɵfac,
  providedIn: 'root'
});
class ContactsContactResolver {
  /**
   * Constructor
   */
  constructor(_contactsService, _router) {
    this._contactsService = _contactsService;
    this._router = _router;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._contactsService.getContactById(route.paramMap.get('id')).pipe(
    // Error here means the requested contact is not available
    (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      // Log the error
      console.error(error);
      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');
      // Navigate to there
      this._router.navigateByUrl(parentUrl);
      // Throw an error
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(error);
    }));
  }
}
ContactsContactResolver.ɵfac = function ContactsContactResolver_Factory(t) {
  return new (t || ContactsContactResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_1__.ContactsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
ContactsContactResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ContactsContactResolver,
  factory: ContactsContactResolver.ɵfac,
  providedIn: 'root'
});
class ContactsCountriesResolver {
  /**
   * Constructor
   */
  constructor(_contactsService) {
    this._contactsService = _contactsService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._contactsService.getCountries();
  }
}
ContactsCountriesResolver.ɵfac = function ContactsCountriesResolver_Factory(t) {
  return new (t || ContactsCountriesResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_1__.ContactsService));
};
ContactsCountriesResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ContactsCountriesResolver,
  factory: ContactsCountriesResolver.ɵfac,
  providedIn: 'root'
});
class ContactsTagsResolver {
  /**
   * Constructor
   */
  constructor(_contactsService) {
    this._contactsService = _contactsService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._contactsService.getTags();
  }
}
ContactsTagsResolver.ɵfac = function ContactsTagsResolver_Factory(t) {
  return new (t || ContactsTagsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_1__.ContactsService));
};
ContactsTagsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ContactsTagsResolver,
  factory: ContactsTagsResolver.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 104652:
/*!******************************************************************!*\
  !*** ./libs/web/modules/admin/apps/contacts/contacts.routing.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contactsRoutes": () => (/* binding */ contactsRoutes)
/* harmony export */ });
/* harmony import */ var libs_web_modules_admin_apps_contacts_contacts_guards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/contacts.guards */ 566443);
/* harmony import */ var libs_web_modules_admin_apps_contacts_contacts_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/contacts.resolvers */ 32522);
/* harmony import */ var libs_web_modules_admin_apps_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/contacts.component */ 631026);
/* harmony import */ var libs_web_modules_admin_apps_contacts_list_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/list/list.component */ 973563);
/* harmony import */ var libs_web_modules_admin_apps_contacts_details_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/details/details.component */ 592487);





const contactsRoutes = [{
  path: '',
  component: libs_web_modules_admin_apps_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_0__.ContactsComponent,
  resolve: {
    tags: libs_web_modules_admin_apps_contacts_contacts_resolvers__WEBPACK_IMPORTED_MODULE_1__.ContactsTagsResolver
  },
  children: [{
    path: '',
    component: libs_web_modules_admin_apps_contacts_list_list_component__WEBPACK_IMPORTED_MODULE_2__.ContactsListComponent,
    resolve: {
      tasks: libs_web_modules_admin_apps_contacts_contacts_resolvers__WEBPACK_IMPORTED_MODULE_1__.ContactsResolver,
      countries: libs_web_modules_admin_apps_contacts_contacts_resolvers__WEBPACK_IMPORTED_MODULE_1__.ContactsCountriesResolver
    },
    children: [{
      path: ':id',
      component: libs_web_modules_admin_apps_contacts_details_details_component__WEBPACK_IMPORTED_MODULE_3__.ContactsDetailsComponent,
      resolve: {
        task: libs_web_modules_admin_apps_contacts_contacts_resolvers__WEBPACK_IMPORTED_MODULE_1__.ContactsContactResolver,
        countries: libs_web_modules_admin_apps_contacts_contacts_resolvers__WEBPACK_IMPORTED_MODULE_1__.ContactsCountriesResolver
      },
      canDeactivate: [libs_web_modules_admin_apps_contacts_contacts_guards__WEBPACK_IMPORTED_MODULE_4__.CanDeactivateContactsDetails]
    }]
  }]
}];

/***/ }),

/***/ 570389:
/*!******************************************************************!*\
  !*** ./libs/web/modules/admin/apps/contacts/contacts.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactsService": () => (/* binding */ ContactsService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 80529);




class ContactsService {
  /**
   * Constructor
   */
  constructor(_httpClient) {
    this._httpClient = _httpClient;
    // Private
    this._contact = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._contacts = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._countries = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._tags = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for contact
   */
  get contact$() {
    return this._contact.asObservable();
  }
  /**
   * Getter for contacts
   */
  get contacts$() {
    return this._contacts.asObservable();
  }
  /**
   * Getter for countries
   */
  get countries$() {
    return this._countries.asObservable();
  }
  /**
   * Getter for tags
   */
  get tags$() {
    return this._tags.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get contacts
   */
  getContacts() {
    return this._httpClient.get('api/apps/contacts/all').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(contacts => {
      this._contacts.next(contacts);
    }));
  }
  /**
   * Search contacts with given query
   *
   * @param query
   */
  searchContacts(query) {
    return this._httpClient.get('api/apps/contacts/search', {
      params: {
        query
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(contacts => {
      this._contacts.next(contacts);
    }));
  }
  /**
   * Get contact by id
   */
  getContactById(id) {
    return this._contacts.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(contacts => {
      // Find the contact
      const contact = contacts.find(item => item.id === id) || null;
      // Update the contact
      this._contact.next(contact);
      // Return the contact
      return contact;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(contact => {
      if (!contact) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)('Could not found contact with id of ' + id + '!');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(contact);
    }));
  }
  /**
   * Create contact
   */
  createContact() {
    return this.contacts$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(contacts => this._httpClient.post('api/apps/contacts/contact', {}).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(newContact => {
      // Update the contacts with the new contact
      this._contacts.next([newContact, ...contacts]);
      // Return the new contact
      return newContact;
    }))));
  }
  /**
   * Update contact
   *
   * @param id
   * @param contact
   */
  updateContact(id, contact) {
    return this.contacts$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(contacts => this._httpClient.patch('api/apps/contacts/contact', {
      id,
      contact
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(updatedContact => {
      // Find the index of the updated contact
      const index = contacts.findIndex(item => item.id === id);
      // Update the contact
      contacts[index] = updatedContact;
      // Update the contacts
      this._contacts.next(contacts);
      // Return the updated contact
      return updatedContact;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(updatedContact => this.contact$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(item => item && item.id === id), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      // Update the contact if it's selected
      this._contact.next(updatedContact);
      // Return the updated contact
      return updatedContact;
    }))))));
  }
  /**
   * Delete the contact
   *
   * @param id
   */
  deleteContact(id) {
    return this.contacts$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(contacts => this._httpClient.delete('api/apps/contacts/contact', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(isDeleted => {
      // Find the index of the deleted contact
      const index = contacts.findIndex(item => item.id === id);
      // Delete the contact
      contacts.splice(index, 1);
      // Update the contacts
      this._contacts.next(contacts);
      // Return the deleted status
      return isDeleted;
    }))));
  }
  /**
   * Get countries
   */
  getCountries() {
    return this._httpClient.get('api/apps/contacts/countries').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(countries => {
      this._countries.next(countries);
    }));
  }
  /**
   * Get tags
   */
  getTags() {
    return this._httpClient.get('api/apps/contacts/tags').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(tags => {
      this._tags.next(tags);
    }));
  }
  /**
   * Create tag
   *
   * @param tag
   */
  createTag(tag) {
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(tags => this._httpClient.post('api/apps/contacts/tag', {
      tag
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(newTag => {
      // Update the tags with the new tag
      this._tags.next([...tags, newTag]);
      // Return new tag from observable
      return newTag;
    }))));
  }
  /**
   * Update the tag
   *
   * @param id
   * @param tag
   */
  updateTag(id, tag) {
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(tags => this._httpClient.patch('api/apps/contacts/tag', {
      id,
      tag
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(updatedTag => {
      // Find the index of the updated tag
      const index = tags.findIndex(item => item.id === id);
      // Update the tag
      tags[index] = updatedTag;
      // Update the tags
      this._tags.next(tags);
      // Return the updated tag
      return updatedTag;
    }))));
  }
  /**
   * Delete the tag
   *
   * @param id
   */
  deleteTag(id) {
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(tags => this._httpClient.delete('api/apps/contacts/tag', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(isDeleted => {
      // Find the index of the deleted tag
      const index = tags.findIndex(item => item.id === id);
      // Delete the tag
      tags.splice(index, 1);
      // Update the tags
      this._tags.next(tags);
      // Return the deleted status
      return isDeleted;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(isDeleted => isDeleted), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(isDeleted => this.contacts$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(contacts => {
      // Iterate through the contacts
      contacts.forEach(contact => {
        const tagIndex = contact.tags.findIndex(tag => tag === id);
        // If the contact has the tag, remove it
        if (tagIndex > -1) {
          contact.tags.splice(tagIndex, 1);
        }
      });
      // Return the deleted status
      return isDeleted;
    }))))));
  }
  /**
   * Update the avatar of the given contact
   *
   * @param id
   * @param avatar
   */
  uploadAvatar(id, avatar) {
    return this.contacts$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(contacts => this._httpClient.post('api/apps/contacts/avatar', {
      id,
      avatar
    }, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': avatar.type
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(updatedContact => {
      // Find the index of the updated contact
      const index = contacts.findIndex(item => item.id === id);
      // Update the contact
      contacts[index] = updatedContact;
      // Update the contacts
      this._contacts.next(contacts);
      // Return the updated contact
      return updatedContact;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(updatedContact => this.contact$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(item => item && item.id === id), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      // Update the contact if it's selected
      this._contact.next(updatedContact);
      // Return the updated contact
      return updatedContact;
    }))))));
  }
}
ContactsService.ɵfac = function ContactsService_Factory(t) {
  return new (t || ContactsService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient));
};
ContactsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: ContactsService,
  factory: ContactsService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 592487:
/*!***************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/contacts/details/details.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactsDetailsComponent": () => (/* binding */ ContactsDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/portal */ 984080);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 178372);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var libs_web_modules_admin_apps_contacts_list_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/list/list.component */ 973563);
/* harmony import */ var libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/contacts.service */ 570389);
/* harmony import */ var _fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fuse/services/confirmation */ 50253);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/overlay */ 598184);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/datepicker */ 499602);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _fuse_pipes_find_by_key_find_by_key_pipe__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fuse/pipes/find-by-key/find-by-key.pipe */ 437249);



























const _c0 = ["avatarFileInput"];
const _c1 = ["tagsPanel"];
const _c2 = ["tagsPanelOrigin"];
function ContactsDetailsComponent_ng_container_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r2.contact.background, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function ContactsDetailsComponent_ng_container_1_img_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 19);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r3.contact.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function ContactsDetailsComponent_ng_container_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r4.contact.name.charAt(0), " ");
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_19_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 23)(2, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](tag_r14.title);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ContactsDetailsComponent_ng_container_1_ng_container_19_ng_container_2_Template, 4, 1, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "fuseFindByKey");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind3"](3, 2, ctx_r5.contact.tags, "id", ctx_r5.tags))("ngForTrackBy", ctx_r5.trackByFn);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:briefcase");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6.contact.title);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:office-building");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r7.contact.company);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_23_ng_container_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 33)(1, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\u2022");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const email_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](email_r16.label);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_23_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 30)(2, "a", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ContactsDetailsComponent_ng_container_1_ng_container_23_ng_container_4_div_4_Template, 5, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const email_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", "mailto:" + email_r16.email, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", email_r16.email, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", email_r16.label);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ContactsDetailsComponent_ng_container_1_ng_container_23_ng_container_4_Template, 5, 3, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:mail");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r8.contact.emails)("ngForTrackBy", ctx_r8.trackByFn);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_24_ng_container_4_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 33)(1, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\u2022");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const phoneNumber_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](phoneNumber_r20.label);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_24_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 30)(2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ContactsDetailsComponent_ng_container_1_ng_container_24_ng_container_4_div_6_Template, 5, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const phoneNumber_r20 = ctx.$implicit;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r19.getCountryByIso(phoneNumber_r20.country).code);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](phoneNumber_r20.phoneNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", phoneNumber_r20.label);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ContactsDetailsComponent_ng_container_1_ng_container_24_ng_container_4_Template, 7, 3, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r9.contact.phoneNumbers)("ngForTrackBy", ctx_r9.trackByFn);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:location-marker");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r10.contact.address);
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:cake");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](5, 2, ctx_r11.contact.birthday, "longDate"));
  }
}
function ContactsDetailsComponent_ng_container_1_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 26)(3, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:menu-alt-2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r12.contact.notes, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
  }
}
const _c3 = function () {
  return ["../"];
};
function ContactsDetailsComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ContactsDetailsComponent_ng_container_1_ng_container_2_Template, 2, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3)(4, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, ContactsDetailsComponent_ng_container_1_img_10_Template, 1, 1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ContactsDetailsComponent_ng_container_1_div_11_Template, 2, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 12)(13, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_1_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r24);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r23.toggleEditMode(true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, ContactsDetailsComponent_ng_container_1_ng_container_19_Template, 4, 6, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, ContactsDetailsComponent_ng_container_1_ng_container_21_Template, 5, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, ContactsDetailsComponent_ng_container_1_ng_container_22_Template, 5, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, ContactsDetailsComponent_ng_container_1_ng_container_23_Template, 5, 3, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, ContactsDetailsComponent_ng_container_1_ng_container_24_Template, 5, 3, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, ContactsDetailsComponent_ng_container_1_ng_container_25_Template, 5, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, ContactsDetailsComponent_ng_container_1_ng_container_26_Template, 6, 5, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, ContactsDetailsComponent_ng_container_1_ng_container_27_Template, 4, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.background);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", "Close")("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](16, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.contact.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:pencil-alt");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.contact.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.tags.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.company);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.emails.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.phoneNumbers.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.address);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.birthday);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.contact.notes);
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r25.contact.background, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function ContactsDetailsComponent_ng_container_2_img_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 19);
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r27.contact.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function ContactsDetailsComponent_ng_container_2_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r28.contact.name.charAt(0), " ");
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_30_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 69)(2, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](tag_r39.title);
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ContactsDetailsComponent_ng_container_2_ng_container_30_ng_container_1_Template, 4, 1, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "fuseFindByKey");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind3"](2, 2, ctx_r29.contact.tags, "id", ctx_r29.tags))("ngForTrackBy", ctx_r29.trackByFn);
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:pencil-alt");
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Add");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
  }
}
function ContactsDetailsComponent_ng_container_2_ng_template_35_mat_icon_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 14);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:pencil-alt");
  }
}
function ContactsDetailsComponent_ng_container_2_ng_template_35_mat_icon_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 14);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check");
  }
}
function ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_11_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_11_ng_container_1_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r49);
      const tag_r47 = restoredCtx.$implicit;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r48.toggleContactTag(tag_r47));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-checkbox", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r47 = ctx.$implicit;
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx_r46.contact.tags.includes(tag_r47.id))("color", "primary")("disableRipple", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](tag_r47.title);
  }
}
function ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_11_ng_container_1_Template, 5, 4, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r43.filteredTags)("ngForTrackBy", ctx_r43.trackByFn);
  }
}
function ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_12_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 74)(2, "mat-form-field", 85)(3, "input", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_12_ng_container_2_Template_input_input_3_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53);
      const tag_r51 = restoredCtx.$implicit;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r52.updateTagTitle(tag_r51, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_12_ng_container_2_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53);
      const tag_r51 = restoredCtx.$implicit;
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r54.deleteTag(tag_r51));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", tag_r51.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:trash");
  }
}
function ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_12_ng_container_2_Template, 6, 2, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r44.filteredTags)("ngForTrackBy", ctx_r44.trackByFn);
  }
}
function ContactsDetailsComponent_ng_container_2_ng_template_35_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_ng_template_35_div_13_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      ctx_r55.createTag(_r40.value);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r40.value = "");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Create \"");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\"");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_r40.value);
  }
}
function ContactsDetailsComponent_ng_container_2_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 72)(1, "div", 73)(2, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 15)(5, "input", 75, 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ContactsDetailsComponent_ng_container_2_ng_template_35_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r58);
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r57.filterTags($event));
    })("keydown", function ContactsDetailsComponent_ng_container_2_ng_template_35_Template_input_keydown_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r58);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r59.filterTagsInputKeyDown($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_ng_template_35_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r58);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r60.toggleTagsEditMode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ContactsDetailsComponent_ng_container_2_ng_template_35_mat_icon_8_Template, 1, 1, "mat-icon", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ContactsDetailsComponent_ng_container_2_ng_template_35_mat_icon_9_Template, 1, 1, "mat-icon", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_11_Template, 2, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ContactsDetailsComponent_ng_container_2_ng_template_35_ng_container_12_Template, 3, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ContactsDetailsComponent_ng_container_2_ng_template_35_div_13_Template, 7, 2, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("maxLength", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r34.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r34.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r34.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r34.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r34.shouldShowCreateTagButton(_r40.value));
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_51_mat_label_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_51_mat_label_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
const _c4 = function (a0) {
  return {
    "mt-6": a0
  };
};
function ContactsDetailsComponent_ng_container_2_ng_container_51_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 96)(2, "button", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_ng_container_51_ng_container_10_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r70);
      const i_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
      const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r68.removeEmailField(i_r62));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const first_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().first;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c4, first_r63));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:trash");
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28)(2, "mat-form-field", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ContactsDetailsComponent_ng_container_2_ng_container_51_mat_label_3_Template, 2, 0, "mat-label", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 50)(5, "input", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-form-field", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ContactsDetailsComponent_ng_container_2_ng_container_51_mat_label_7_Template, 2, 0, "mat-label", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "mat-icon", 50)(9, "input", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, ContactsDetailsComponent_ng_container_2_ng_container_51_ng_container_10_Template, 4, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const email_r61 = ctx.$implicit;
    const first_r63 = ctx.first;
    const last_r64 = ctx.last;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", first_r63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:mail");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", email_r61.get("email"))("placeholder", "Email address")("spellcheck", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", first_r63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:tag");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", email_r61.get("label"))("placeholder", "Label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(first_r63 && last_r64));
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_58_mat_label_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_58_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-option", 102)(2, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "span", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const country_r80 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", country_r80.iso);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background", "url('/assets/images/apps/contacts/flags.png') no-repeat 0 0")("background-size", "24px 3876px")("background-position", country_r80.flagImagePos);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](country_r80.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](country_r80.code);
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_58_mat_label_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_58_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r83 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 96)(2, "button", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_ng_container_58_ng_container_16_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);
      const i_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
      const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r81.removePhoneNumberField(i_r73));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const first_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().first;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c4, first_r74));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:trash");
  }
}
function ContactsDetailsComponent_ng_container_2_ng_container_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 98)(2, "mat-form-field", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ContactsDetailsComponent_ng_container_2_ng_container_58_mat_label_3_Template, 2, 0, "mat-label", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-select", 99)(6, "mat-select-trigger")(7, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ContactsDetailsComponent_ng_container_2_ng_container_58_ng_container_11_Template, 8, 9, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-form-field", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ContactsDetailsComponent_ng_container_2_ng_container_58_mat_label_13_Template, 2, 0, "mat-label", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "mat-icon", 50)(15, "input", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ContactsDetailsComponent_ng_container_2_ng_container_58_ng_container_16_Template, 4, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const phoneNumber_r72 = ctx.$implicit;
    const first_r74 = ctx.first;
    const last_r75 = ctx.last;
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", first_r74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", phoneNumber_r72.get("phoneNumber"))("placeholder", "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", phoneNumber_r72.get("country"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background", "url('/assets/images/apps/contacts/flags.png') no-repeat 0 0")("background-size", "24px 3876px")("background-position", ctx_r36.getCountryByIso(phoneNumber_r72.get("country").value).flagImagePos);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r36.getCountryByIso(phoneNumber_r72.get("country").value).code);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r36.countries)("ngForTrackBy", ctx_r36.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", first_r74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:tag");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", phoneNumber_r72.get("label"))("placeholder", "Label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(first_r74 && last_r75));
  }
}
function ContactsDetailsComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r86 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ContactsDetailsComponent_ng_container_2_ng_container_2_Template, 2, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3)(4, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 39)(7, "div", 7)(8, "form", 40)(9, "div", 8)(10, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 43)(13, "div")(14, "input", 44, 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ContactsDetailsComponent_ng_container_2_Template_input_change_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r86);
      const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](15);
      const ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r85.uploadAvatar(_r26.files));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "label", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div")(19, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_Template_button_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r86);
      const ctx_r87 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r87.removeAvatar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, ContactsDetailsComponent_ng_container_2_img_21_Template, 1, 1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, ContactsDetailsComponent_ng_container_2_div_22_Template, 2, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 48)(24, "mat-form-field", 49)(25, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "mat-icon", 50)(28, "input", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, ContactsDetailsComponent_ng_container_2_ng_container_30_Template, 3, 6, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 53, 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_Template_div_click_31_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r86);
      const ctx_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r88.openTagsPanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, ContactsDetailsComponent_ng_container_2_ng_container_33_Template, 4, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, ContactsDetailsComponent_ng_container_2_ng_container_34_Template, 4, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, ContactsDetailsComponent_ng_container_2_ng_template_35_Template, 14, 7, "ng-template", null, 55, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 48)(38, "mat-form-field", 49)(39, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Title");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "mat-icon", 50)(42, "input", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 48)(44, "mat-form-field", 49)(45, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Company");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "mat-icon", 50)(48, "input", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 48)(50, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](51, ContactsDetailsComponent_ng_container_2_ng_container_51_Template, 11, 10, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_Template_div_click_52_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r86);
      const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r89.addEmailField());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Add an email address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 48)(57, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](58, ContactsDetailsComponent_ng_container_2_ng_container_58_Template, 17, 18, "ng-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_Template_div_click_59_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r86);
      const ctx_r90 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r90.addPhoneNumberField());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Add a phone number");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 48)(64, "mat-form-field", 49)(65, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "mat-icon", 50)(68, "input", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 48)(70, "mat-form-field", 49)(71, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "Birthday");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "mat-icon", 50)(74, "input", 60)(75, "mat-datepicker-toggle", 61)(76, "mat-datepicker", null, 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 48)(79, "mat-form-field", 63)(80, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "Notes");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "mat-icon", 50)(83, "textarea", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 65)(85, "button", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_Template_button_click_85_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r86);
      const ctx_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r91.deleteContact());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, " Delete ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_Template_button_click_87_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r86);
      const ctx_r92 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r92.toggleEditMode(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, " Cancel ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsDetailsComponent_ng_container_2_Template_button_click_89_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r86);
      const ctx_r93 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r93.updateContact());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, " Save ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](77);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.contact.background);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", "Close")("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](49, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r1.contactForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("multiple", false)("accept", "image/jpeg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:camera");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:trash");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.contact.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.contact.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:user-circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "name")("placeholder", "Name")("spellcheck", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.contact.tags.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.contact.tags.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.contact.tags.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:briefcase");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "title")("placeholder", "Job title");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:office-building");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "company")("placeholder", "Company");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.contactForm.get("emails")["controls"])("ngForTrackBy", ctx_r1.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.contactForm.get("phoneNumbers")["controls"])("ngForTrackBy", ctx_r1.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:location-marker");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "address")("placeholder", "Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:cake");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matDatepicker", _r37)("formControlName", "birthday")("placeholder", "Birthday");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("for", _r37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:menu-alt-2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "notes")("placeholder", "Notes")("rows", 5)("spellcheck", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "warn")("matTooltip", "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("disabled", ctx_r1.contactForm.invalid)("matTooltip", "Save");
  }
}
class ContactsDetailsComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _changeDetectorRef, _contactsListComponent, _contactsService, _formBuilder, _fuseConfirmationService, _renderer2, _router, _overlay, _viewContainerRef) {
    this._activatedRoute = _activatedRoute;
    this._changeDetectorRef = _changeDetectorRef;
    this._contactsListComponent = _contactsListComponent;
    this._contactsService = _contactsService;
    this._formBuilder = _formBuilder;
    this._fuseConfirmationService = _fuseConfirmationService;
    this._renderer2 = _renderer2;
    this._router = _router;
    this._overlay = _overlay;
    this._viewContainerRef = _viewContainerRef;
    this.editMode = false;
    this.tagsEditMode = false;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Open the drawer
    this._contactsListComponent.matDrawer.open();
    // Create the contact form
    this.contactForm = this._formBuilder.group({
      id: [''],
      avatar: [null],
      name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]],
      emails: this._formBuilder.array([]),
      phoneNumbers: this._formBuilder.array([]),
      title: [''],
      company: [''],
      birthday: [null],
      address: [null],
      notes: [null],
      tags: [[]]
    });
    // Get the contacts
    this._contactsService.contacts$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(contacts => {
      this.contacts = contacts;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the contact
    this._contactsService.contact$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(contact => {
      // Open the drawer in case it is closed
      this._contactsListComponent.matDrawer.open();
      // Get the contact
      this.contact = contact;
      // Clear the emails and phoneNumbers form arrays
      this.contactForm.get('emails').clear();
      this.contactForm.get('phoneNumbers').clear();
      // Patch values to the form
      this.contactForm.patchValue(contact);
      // Setup the emails form array
      const emailFormGroups = [];
      if (contact.emails.length > 0) {
        // Iterate through them
        contact.emails.forEach(email => {
          // Create an email form group
          emailFormGroups.push(this._formBuilder.group({
            email: [email.email],
            label: [email.label]
          }));
        });
      } else {
        // Create an email form group
        emailFormGroups.push(this._formBuilder.group({
          email: [''],
          label: ['']
        }));
      }
      // Add the email form groups to the emails form array
      emailFormGroups.forEach(emailFormGroup => {
        this.contactForm.get('emails').push(emailFormGroup);
      });
      // Setup the phone numbers form array
      const phoneNumbersFormGroups = [];
      if (contact.phoneNumbers.length > 0) {
        // Iterate through them
        contact.phoneNumbers.forEach(phoneNumber => {
          // Create an email form group
          phoneNumbersFormGroups.push(this._formBuilder.group({
            country: [phoneNumber.country],
            phoneNumber: [phoneNumber.phoneNumber],
            label: [phoneNumber.label]
          }));
        });
      } else {
        // Create a phone number form group
        phoneNumbersFormGroups.push(this._formBuilder.group({
          country: ['us'],
          phoneNumber: [''],
          label: ['']
        }));
      }
      // Add the phone numbers form groups to the phone numbers form array
      phoneNumbersFormGroups.forEach(phoneNumbersFormGroup => {
        this.contactForm.get('phoneNumbers').push(phoneNumbersFormGroup);
      });
      // Toggle the edit mode off
      this.toggleEditMode(false);
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the country telephone codes
    this._contactsService.countries$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(codes => {
      this.countries = codes;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the tags
    this._contactsService.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(tags => {
      this.tags = tags;
      this.filteredTags = tags;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    // Dispose the overlays if they are still on the DOM
    if (this._tagsPanelOverlayRef) {
      this._tagsPanelOverlayRef.dispose();
    }
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Close the drawer
   */
  closeDrawer() {
    return this._contactsListComponent.matDrawer.close();
  }
  /**
   * Toggle edit mode
   *
   * @param editMode
   */
  toggleEditMode(editMode = null) {
    if (editMode === null) {
      this.editMode = !this.editMode;
    } else {
      this.editMode = editMode;
    }
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Update the contact
   */
  updateContact() {
    // Get the contact object
    const contact = this.contactForm.getRawValue();
    // Go through the contact object and clear empty values
    contact.emails = contact.emails.filter(email => email.email);
    contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);
    // Update the contact on the server
    this._contactsService.updateContact(contact.id, contact).subscribe(() => {
      // Toggle the edit mode off
      this.toggleEditMode(false);
    });
  }
  /**
   * Delete the contact
   */
  deleteContact() {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete contact',
      message: 'Are you sure you want to delete this contact? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe(result => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Get the current contact's id
        const id = this.contact.id;
        // Get the next/previous contact's id
        const currentContactIndex = this.contacts.findIndex(item => item.id === id);
        const nextContactIndex = currentContactIndex + (currentContactIndex === this.contacts.length - 1 ? -1 : 1);
        const nextContactId = this.contacts.length === 1 && this.contacts[0].id === id ? null : this.contacts[nextContactIndex].id;
        // Delete the contact
        this._contactsService.deleteContact(id).subscribe(isDeleted => {
          // Return if the contact wasn't deleted...
          if (!isDeleted) {
            return;
          }
          // Navigate to the next contact if available
          if (nextContactId) {
            this._router.navigate(['../', nextContactId], {
              relativeTo: this._activatedRoute
            });
          }
          // Otherwise, navigate to the parent
          else {
            this._router.navigate(['../'], {
              relativeTo: this._activatedRoute
            });
          }
          // Toggle the edit mode off
          this.toggleEditMode(false);
        });
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
  }
  /**
   * Upload avatar
   *
   * @param fileList
   */
  uploadAvatar(fileList) {
    // Return if canceled
    if (!fileList.length) {
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];
    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }
    // Upload the avatar
    this._contactsService.uploadAvatar(this.contact.id, file).subscribe();
  }
  /**
   * Remove the avatar
   */
  removeAvatar() {
    // Get the form control for 'avatar'
    const avatarFormControl = this.contactForm.get('avatar');
    // Set the avatar as null
    avatarFormControl.setValue(null);
    // Set the file input value as null
    this._avatarFileInput.nativeElement.value = null;
    // Update the contact
    this.contact.avatar = null;
  }
  /**
   * Open tags panel
   */
  openTagsPanel() {
    // Create the overlay
    this._tagsPanelOverlayRef = this._overlay.create({
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().flexibleConnectedTo(this._tagsPanelOrigin.nativeElement).withFlexibleDimensions(true).withViewportMargin(64).withLockedPosition(true).withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }])
    });
    // Subscribe to the attachments observable
    this._tagsPanelOverlayRef.attachments().subscribe(() => {
      // Add a class to the origin
      this._renderer2.addClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');
      // Focus to the search input once the overlay has been attached
      this._tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
    });
    // Create a portal from the template
    const templatePortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_4__.TemplatePortal(this._tagsPanel, this._viewContainerRef);
    // Attach the portal to the overlay
    this._tagsPanelOverlayRef.attach(templatePortal);
    // Subscribe to the backdrop click
    this._tagsPanelOverlayRef.backdropClick().subscribe(() => {
      // Remove the class from the origin
      this._renderer2.removeClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');
      // If overlay exists and attached...
      if (this._tagsPanelOverlayRef && this._tagsPanelOverlayRef.hasAttached()) {
        // Detach it
        this._tagsPanelOverlayRef.detach();
        // Reset the tag filter
        this.filteredTags = this.tags;
        // Toggle the edit mode off
        this.tagsEditMode = false;
      }
      // If template portal exists and attached...
      if (templatePortal && templatePortal.isAttached) {
        // Detach it
        templatePortal.detach();
      }
    });
  }
  /**
   * Toggle the tags edit mode
   */
  toggleTagsEditMode() {
    this.tagsEditMode = !this.tagsEditMode;
  }
  /**
   * Filter tags
   *
   * @param event
   */
  filterTags(event) {
    // Get the value
    const value = event.target.value.toLowerCase();
    // Filter the tags
    this.filteredTags = this.tags.filter(tag => tag.title.toLowerCase().includes(value));
  }
  /**
   * Filter tags input key down event
   *
   * @param event
   */
  filterTagsInputKeyDown(event) {
    // Return if the pressed key is not 'Enter'
    if (event.key !== 'Enter') {
      return;
    }
    // If there is no tag available...
    if (this.filteredTags.length === 0) {
      // Create the tag
      this.createTag(event.target.value);
      // Clear the input
      event.target.value = '';
      // Return
      return;
    }
    // If there is a tag...
    const tag = this.filteredTags[0];
    const isTagApplied = this.contact.tags.find(id => id === tag.id);
    // If the found tag is already applied to the contact...
    if (isTagApplied) {
      // Remove the tag from the contact
      this.removeTagFromContact(tag);
    } else {
      // Otherwise add the tag to the contact
      this.addTagToContact(tag);
    }
  }
  /**
   * Create a new tag
   *
   * @param title
   */
  createTag(title) {
    const tag = {
      title
    };
    // Create tag on the server
    this._contactsService.createTag(tag).subscribe(response => {
      // Add the tag to the contact
      this.addTagToContact(response);
    });
  }
  /**
   * Update the tag title
   *
   * @param tag
   * @param event
   */
  updateTagTitle(tag, event) {
    // Update the title on the tag
    tag.title = event.target.value;
    // Update the tag on the server
    this._contactsService.updateTag(tag.id, tag).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.debounceTime)(300)).subscribe();
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Delete the tag
   *
   * @param tag
   */
  deleteTag(tag) {
    // Delete the tag from the server
    this._contactsService.deleteTag(tag.id).subscribe();
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Add tag to the contact
   *
   * @param tag
   */
  addTagToContact(tag) {
    // Add the tag
    this.contact.tags.unshift(tag.id);
    // Update the contact form
    this.contactForm.get('tags').patchValue(this.contact.tags);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Remove tag from the contact
   *
   * @param tag
   */
  removeTagFromContact(tag) {
    // Remove the tag
    this.contact.tags.splice(this.contact.tags.findIndex(item => item === tag.id), 1);
    // Update the contact form
    this.contactForm.get('tags').patchValue(this.contact.tags);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Toggle contact tag
   *
   * @param tag
   */
  toggleContactTag(tag) {
    if (this.contact.tags.includes(tag.id)) {
      this.removeTagFromContact(tag);
    } else {
      this.addTagToContact(tag);
    }
  }
  /**
   * Should the create tag button be visible
   *
   * @param inputValue
   */
  shouldShowCreateTagButton(inputValue) {
    return !!!(inputValue === '' || this.tags.findIndex(tag => tag.title.toLowerCase() === inputValue.toLowerCase()) > -1);
  }
  /**
   * Add the email field
   */
  addEmailField() {
    // Create an empty email form group
    const emailFormGroup = this._formBuilder.group({
      email: [''],
      label: ['']
    });
    // Add the email form group to the emails form array
    this.contactForm.get('emails').push(emailFormGroup);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Remove the email field
   *
   * @param index
   */
  removeEmailField(index) {
    // Get form array for emails
    const emailsFormArray = this.contactForm.get('emails');
    // Remove the email field
    emailsFormArray.removeAt(index);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Add an empty phone number field
   */
  addPhoneNumberField() {
    // Create an empty phone number form group
    const phoneNumberFormGroup = this._formBuilder.group({
      country: ['us'],
      phoneNumber: [''],
      label: ['']
    });
    // Add the phone number form group to the phoneNumbers form array
    this.contactForm.get('phoneNumbers').push(phoneNumberFormGroup);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Remove the phone number field
   *
   * @param index
   */
  removePhoneNumberField(index) {
    // Get form array for phone numbers
    const phoneNumbersFormArray = this.contactForm.get('phoneNumbers');
    // Remove the phone number field
    phoneNumbersFormArray.removeAt(index);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Get country info by iso code
   *
   * @param iso
   */
  getCountryByIso(iso) {
    return this.countries.find(country => country.iso === iso);
  }
  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
ContactsDetailsComponent.ɵfac = function ContactsDetailsComponent_Factory(t) {
  return new (t || ContactsDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_contacts_list_list_component__WEBPACK_IMPORTED_MODULE_7__.ContactsListComponent), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_8__.ContactsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_9__.FuseConfirmationService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef));
};
ContactsDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ContactsDetailsComponent,
  selectors: [["contacts-details"]],
  viewQuery: function ContactsDetailsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._avatarFileInput = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tagsPanel = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tagsPanelOrigin = _t.first);
    }
  },
  decls: 3,
  vars: 2,
  consts: [[1, "flex", "flex-col", "w-full"], [4, "ngIf"], [1, "relative", "w-full", "h-40", "px-8", "sm:h-48", "sm:px-12", "bg-accent-100", "dark:bg-accent-700"], [1, "flex", "items-center", "justify-end", "w-full", "max-w-3xl", "pt-6", "mx-auto"], ["mat-icon-button", "", 3, "matTooltip", "routerLink"], [1, "text-white", 3, "svgIcon"], [1, "relative", "flex", "flex-col", "items-center", "flex-auto", "p-6", "pt-0", "sm:p-12", "sm:pt-0"], [1, "w-full", "max-w-3xl"], [1, "flex", "items-end", "flex-auto", "-mt-16"], [1, "flex", "items-center", "justify-center", "w-32", "h-32", "overflow-hidden", "rounded-full", "ring-4", "ring-bg-card"], ["class", "object-cover w-full h-full", 3, "src", 4, "ngIf"], ["class", "flex items-center justify-center w-full h-full overflow-hidden font-bold leading-none text-gray-600 uppercase bg-gray-200 rounded text-8xl dark:bg-gray-700 dark:text-gray-200", 4, "ngIf"], [1, "flex", "items-center", "mb-1", "ml-auto"], ["mat-stroked-button", "", 3, "click"], [1, "icon-size-5", 3, "svgIcon"], [1, "ml-2"], [1, "mt-3", "text-4xl", "font-bold", "truncate"], [1, "flex", "flex-col", "pt-6", "mt-4", "space-y-8", "border-t"], [1, "absolute", "inset-0", "object-cover", "w-full", "h-full", 3, "src"], [1, "object-cover", "w-full", "h-full", 3, "src"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "overflow-hidden", "font-bold", "leading-none", "text-gray-600", "uppercase", "bg-gray-200", "rounded", "text-8xl", "dark:bg-gray-700", "dark:text-gray-200"], [1, "flex", "flex-wrap", "items-center", "mt-2"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "items-center", "justify-center", "px-3", "py-1", "mb-3", "mr-3", "leading-normal", "text-gray-500", "bg-gray-100", "rounded-full", "dark:text-gray-300", "dark:bg-gray-700"], [1, "text-sm", "font-medium", "whitespace-nowrap"], [1, "flex", "sm:items-center"], [3, "svgIcon"], [1, "ml-6", "leading-6"], [1, "flex"], [1, "min-w-0", "ml-6", "space-y-1"], [1, "flex", "items-center", "leading-6"], ["target", "_blank", 1, "hover:underline", "text-primary-500", 3, "href"], ["class", "truncate text-md text-secondary", 4, "ngIf"], [1, "truncate", "text-md", "text-secondary"], [1, "mx-2"], [1, "font-medium"], [1, "font-mono", "sm:ml-3"], [1, "ml-2.5", "font-mono"], [1, "ml-6", "prose-sm", "prose", "max-w-none", 3, "innerHTML"], [1, "relative", "flex", "flex-col", "items-center", "flex-auto", "px-6", "sm:px-12"], [3, "formGroup"], [1, "relative", "flex", "items-center", "justify-center", "w-32", "h-32", "overflow-hidden", "rounded-full", "ring-4", "ring-bg-card"], [1, "absolute", "inset-0", "z-10", "bg-black", "bg-opacity-50"], [1, "absolute", "inset-0", "z-20", "flex", "items-center", "justify-center"], ["id", "avatar-file-input", "type", "file", 1, "absolute", "invisible", "w-0", "h-0", "opacity-0", "pointer-events-none", 3, "multiple", "accept", "change"], ["avatarFileInput", ""], ["for", "avatar-file-input", "matRipple", "", 1, "flex", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "cursor-pointer", "hover:bg-hover"], ["mat-icon-button", "", 3, "click"], [1, "mt-8"], [1, "w-full", "fuse-mat-no-subscript"], ["matPrefix", "", 1, "hidden", "sm:flex", "icon-size-5", 3, "svgIcon"], ["matInput", "", 3, "formControlName", "placeholder", "spellcheck"], [1, "flex", "flex-wrap", "items-center", "-m-1.5", "mt-6"], [1, "flex", "items-center", "justify-center", "px-4", "m-1.5", "rounded-full", "leading-9", "cursor-pointer", "text-gray-500", "bg-gray-100", "dark:text-gray-300", "dark:bg-gray-700", 3, "click"], ["tagsPanelOrigin", ""], ["tagsPanel", ""], ["matInput", "", 3, "formControlName", "placeholder"], [1, "space-y-4"], [1, "inline-flex", "items-center", "px-4", "py-2", "mt-2", "-ml-4", "rounded", "cursor-pointer", "group", 3, "click"], [1, "ml-2", "font-medium", "text-secondary", "group-hover:underline"], ["matInput", "", 3, "matDatepicker", "formControlName", "placeholder"], ["matSuffix", "", 3, "for"], ["birthdayDatepicker", ""], [1, "w-full", "fuse-mat-textarea", "fuse-mat-no-subscript"], ["matInput", "", "matTextareaAutosize", "", 3, "formControlName", "placeholder", "rows", "spellcheck"], [1, "flex", "items-center", "py-4", "pl-1", "pr-4", "mt-10", "-mx-6", "border-t", "sm:-mx-12", "sm:pr-12", "sm:pl-7", "bg-gray-50", "dark:bg-transparent"], ["mat-button", "", 3, "color", "matTooltip", "click"], ["mat-button", "", 1, "ml-auto", 3, "matTooltip", "click"], ["mat-flat-button", "", 1, "ml-2", 3, "color", "disabled", "matTooltip", "click"], [1, "flex", "items-center", "justify-center", "px-4", "m-1.5", "rounded-full", "leading-9", "text-gray-500", "bg-gray-100", "dark:text-gray-300", "dark:bg-gray-700"], [1, "font-medium", "text-md", "whitespace-nowrap"], [1, "ml-1.5", "text-md", "font-medium", "whitespace-nowrap"], [1, "border", "rounded", "shadow-md", "w-60", "bg-card"], [1, "flex", "items-center", "m-3", "mr-2"], [1, "flex", "items-center"], ["type", "text", "placeholder", "Enter tag name", 1, "w-full", "min-w-0", "py-1", "border-0", 3, "maxLength", "input", "keydown"], ["newTagInput", ""], ["mat-icon-button", "", 1, "ml-1", 3, "click"], ["class", "icon-size-5", 3, "svgIcon", 4, "ngIf"], [1, "flex", "flex-col", "py-2", "overflow-y-auto", "border-t", "max-h-64"], ["class", "flex items-center h-10 min-h-10 -ml-0.5 pl-4 pr-3 leading-none cursor-pointer hover:bg-hover", "matRipple", "", 3, "click", 4, "ngIf"], ["matRipple", "", 1, "flex", "items-center", "h-10", "px-4", "cursor-pointer", "min-h-10", "hover:bg-hover", 3, "click"], [1, "flex", "items-center", "h-10", "pointer-events-none", "min-h-10", 3, "checked", "color", "disableRipple"], [1, "ml-1"], [1, "py-2", "space-y-2"], [1, "w-full", "mx-4", "fuse-mat-dense", "fuse-mat-no-subscript"], ["matInput", "", 3, "value", "input"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "ml-2", "icon-size-5", 3, "svgIcon"], ["matRipple", "", 1, "flex", "items-center", "h-10", "min-h-10", "-ml-0.5", "pl-4", "pr-3", "leading-none", "cursor-pointer", "hover:bg-hover", 3, "click"], [1, "mr-2", "icon-size-5", 3, "svgIcon"], [1, "break-all"], [1, "flex-auto", "fuse-mat-no-subscript"], ["matInput", "", 3, "formControl", "placeholder", "spellcheck"], [1, "flex-auto", "w-full", "ml-2", "fuse-mat-no-subscript", "max-w-24", "sm:max-w-40", "sm:ml-4"], ["matInput", "", 3, "formControl", "placeholder"], [1, "flex", "items-center", "w-10", "pl-2", 3, "ngClass"], ["mat-icon-button", "", "matTooltip", "Remove", 1, "w-8", "h-8", "min-h-8", 3, "click"], [1, "relative", "flex"], ["matPrefix", "", 1, "mr-1.5", 3, "formControl"], [1, "hidden", "w-6", "h-4", "mr-1", "overflow-hidden", "sm:flex"], [1, "sm:mx-0.5", "font-medium", "text-default"], [3, "value"], [1, "w-6", "h-4", "overflow-hidden"], [1, "ml-2", "font-medium"]],
  template: function ContactsDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ContactsDetailsComponent_ng_container_1_Template, 28, 17, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ContactsDetailsComponent_ng_container_2_Template, 91, 50, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.editMode);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.editMode);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__.MatCheckbox, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _angular_material_core__WEBPACK_IMPORTED_MODULE_17__.MatRipple, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelect, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelectTrigger, _angular_material_core__WEBPACK_IMPORTED_MODULE_17__.MatOption, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltip, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _fuse_pipes_find_by_key_find_by_key_pipe__WEBPACK_IMPORTED_MODULE_21__.FuseFindByKeyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_20__.DatePipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 973563:
/*!*********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/contacts/list/list.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactsListComponent": () => (/* binding */ ContactsListComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 754968);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! libs/web/modules/admin/apps/contacts/contacts.service */ 570389);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);



















const _c0 = ["matDrawer"];
function ContactsListComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.contactsCount, " ");
  }
}
function ContactsListComponent_ng_container_25_ng_container_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const contact_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", contact_r8.name.charAt(0), " ");
  }
}
function ContactsListComponent_ng_container_25_ng_container_1_ng_container_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const contact_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", contact_r8.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function ContactsListComponent_ng_container_25_ng_container_1_ng_container_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const contact_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", contact_r8.name.charAt(0), " ");
  }
}
const _c1 = function (a0, a1) {
  return {
    "hover:bg-gray-100 dark:hover:bg-hover": a0,
    "bg-primary-50 dark:bg-hover": a1
  };
};
const _c2 = function (a1) {
  return ["./", a1];
};
function ContactsListComponent_ng_container_25_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ContactsListComponent_ng_container_25_ng_container_1_ng_container_1_ng_container_1_Template, 3, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 21)(3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ContactsListComponent_ng_container_25_ng_container_1_ng_container_1_ng_container_4_Template, 2, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ContactsListComponent_ng_container_25_ng_container_1_ng_container_1_ng_container_5_Template, 3, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 23)(7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const contact_r8 = ctx.$implicit;
    const i_r9 = ctx.index;
    const contacts_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r9 === 0 || contact_r8.name.charAt(0) !== contacts_r5[i_r9 - 1].name.charAt(0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](7, _c1, !ctx_r7.selectedContact || ctx_r7.selectedContact.id !== contact_r8.id, ctx_r7.selectedContact && ctx_r7.selectedContact.id === contact_r8.id))("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](10, _c2, contact_r8.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", contact_r8.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !contact_r8.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](contact_r8.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](contact_r8.title);
  }
}
function ContactsListComponent_ng_container_25_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ContactsListComponent_ng_container_25_ng_container_1_ng_container_1_Template, 11, 12, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const contacts_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", contacts_r5)("ngForTrackBy", ctx_r6.trackByFn);
  }
}
function ContactsListComponent_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ContactsListComponent_ng_container_25_ng_container_1_Template, 2, 2, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const contacts_r5 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", contacts_r5.length)("ngIfElse", _r3);
  }
}
function ContactsListComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "There are no contacts!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
const _c3 = function () {
  return {
    "=0": "No contacts",
    "=1": "contact",
    "other": "contacts"
  };
};
class ContactsListComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _changeDetectorRef, _contactsService, _document, _router, _fuseMediaWatcherService) {
    this._activatedRoute = _activatedRoute;
    this._changeDetectorRef = _changeDetectorRef;
    this._contactsService = _contactsService;
    this._document = _document;
    this._router = _router;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this.contactsCount = 0;
    this.contactsTableColumns = ['name', 'email', 'phoneNumber', 'job'];
    this.searchInputControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl();
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the contacts
    this.contacts$ = this._contactsService.contacts$;
    this._contactsService.contacts$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(contacts => {
      // Update the counts
      this.contactsCount = contacts.length;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the contact
    this._contactsService.contact$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(contact => {
      // Update the selected contact
      this.selectedContact = contact;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the countries
    this._contactsService.countries$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(countries => {
      // Update the countries
      this.countries = countries;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(query =>
    // Search
    this._contactsService.searchContacts(query))).subscribe();
    // Subscribe to MatDrawer opened change
    this.matDrawer.openedChange.subscribe(opened => {
      if (!opened) {
        // Remove the selected contact when drawer closed
        this.selectedContact = null;
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode if the given breakpoint is active
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
      } else {
        this.drawerMode = 'over';
      }
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Listen for shortcuts
    (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.fromEvent)(this._document, 'keydown').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)(event => (event.ctrlKey === true || event.metaKey // Ctrl or Cmd
    ) && event.key === '/' // '/'
    )).subscribe(() => {
      this.createContact();
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * On backdrop clicked
   */
  onBackdropClicked() {
    // Go back to the list
    this._router.navigate(['./'], {
      relativeTo: this._activatedRoute
    });
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Create contact
   */
  createContact() {
    // Create the contact
    this._contactsService.createContact().subscribe(newContact => {
      // Go to the new contact
      this._router.navigate(['./', newContact.id], {
        relativeTo: this._activatedRoute
      });
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
ContactsListComponent.ɵfac = function ContactsListComponent_Factory(t) {
  return new (t || ContactsListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_contacts_contacts_service__WEBPACK_IMPORTED_MODULE_8__.ContactsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_9__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_10__.FuseMediaWatcherService));
};
ContactsListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ContactsListComponent,
  selectors: [["contacts-list"]],
  viewQuery: function ContactsListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  decls: 29,
  vars: 19,
  consts: [[1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "flex-auto", "h-full", "bg-card", "dark:bg-transparent", 3, "backdropClick"], [1, "w-full", "md:w-160", "dark:bg-gray-900", 3, "mode", "opened", "position", "disableClose"], ["matDrawer", ""], [1, "flex", "flex-col"], [1, "flex-auto"], [1, "flex", "flex-col", "sm:flex-row", "md:flex-col", "flex-auto", "justify-between", "py-8", "px-6", "md:px-8", "border-b"], [1, "text-4xl", "font-extrabold", "tracking-tight", "leading-none"], [1, "ml-0.5", "font-medium", "text-secondary"], [4, "ngIf"], [1, "flex", "items-center", "mt-4", "sm:mt-0", "md:mt-4"], [1, "fuse-mat-dense", "fuse-mat-no-subscript", "fuse-mat-rounded", "w-full", "min-w-50"], ["matPrefix", "", 1, "icon-size-5", 3, "svgIcon"], ["matInput", "", 3, "formControl", "autocomplete", "placeholder"], ["mat-flat-button", "", 1, "ml-4", 3, "color", "click"], [3, "svgIcon"], [1, "ml-2", "mr-1"], [1, "relative"], ["noContacts", ""], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "z-20", "flex", "items-center", "px-6", "py-4", "md:px-8", "cursor-pointer", "border-b", 3, "ngClass", "routerLink"], [1, "flex", "flex-0", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "overflow-hidden"], [1, "min-w-0", "ml-4"], [1, "font-medium", "leading-5", "truncate"], [1, "leading-5", "truncate", "text-secondary"], [1, "z-10", "sticky", "top-0", "-mt-px", "px-6", "py-1", "md:px-8", "border-t", "border-b", "font-medium", "uppercase", "text-secondary", "bg-gray-50", "dark:bg-gray-900"], ["alt", "Contact avatar", 1, "object-cover", "w-full", "h-full", 3, "src"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-lg", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "p-8", "sm:p-16", "border-t", "text-4xl", "font-semibold", "tracking-tight", "text-center"]],
  template: function ContactsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("backdropClick", function ContactsListComponent_Template_mat_drawer_container_backdropClick_1_listener() {
        return ctx.onBackdropClicked();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-drawer-content", 4)(6, "div", 5)(7, "div", 6)(8, "div")(9, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Contacts");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ContactsListComponent_ng_container_12_Template, 2, 1, "ng-container", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](14, "i18nPlural");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 10)(16, "div", 5)(17, "mat-form-field", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "mat-icon", 12)(19, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactsListComponent_Template_button_click_20_listener() {
        return ctx.createContact();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "mat-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Add");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, ContactsListComponent_ng_container_25_Template, 2, 2, "ng-container", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](26, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, ContactsListComponent_ng_template_27_Template, 2, 0, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", ctx.drawerMode)("opened", false)("position", "end")("disableClose", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.contactsCount > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](14, 13, ctx.contactsCount, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](18, _c3)), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.searchInputControl)("autocomplete", "off")("placeholder", "Search contacts");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](26, 16, ctx.contacts$));
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatPrefix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInput, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__.MatDrawerContent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_9__.I18nPluralPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 808277:
/*!********************************************************************************************!*\
  !*** ./node_modules/@angular/material-moment-adapter/fesm2020/material-moment-adapter.mjs ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

var moment__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MAT_MOMENT_DATE_ADAPTER_OPTIONS": () => (/* binding */ MAT_MOMENT_DATE_ADAPTER_OPTIONS),
/* harmony export */   "MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY": () => (/* binding */ MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY),
/* harmony export */   "MAT_MOMENT_DATE_FORMATS": () => (/* binding */ MAT_MOMENT_DATE_FORMATS),
/* harmony export */   "MatMomentDateModule": () => (/* binding */ MatMomentDateModule),
/* harmony export */   "MomentDateAdapter": () => (/* binding */ MomentDateAdapter),
/* harmony export */   "MomentDateModule": () => (/* binding */ MomentDateModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);






/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const moment = moment__WEBPACK_IMPORTED_MODULE_0__ || /*#__PURE__*/ (moment__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (moment__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(moment__WEBPACK_IMPORTED_MODULE_0__, 2)));
/** InjectionToken for moment date adapter to configure options. */
const MAT_MOMENT_DATE_ADAPTER_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('MAT_MOMENT_DATE_ADAPTER_OPTIONS', {
  providedIn: 'root',
  factory: MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/** @docs-private */
function MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
  return {
    useUtc: false
  };
}
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}
/** Adapts Moment.js Dates for use with Angular Material. */
class MomentDateAdapter extends _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.DateAdapter {
  constructor(dateLocale, _options) {
    super();
    this._options = _options;
    this.setLocale(dateLocale || moment.locale());
  }
  setLocale(locale) {
    super.setLocale(locale);
    let momentLocaleData = moment.localeData(locale);
    this._localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      dates: range(31, i => this.createDate(2017, 0, i + 1).format('D')),
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin()
    };
  }
  getYear(date) {
    return this.clone(date).year();
  }
  getMonth(date) {
    return this.clone(date).month();
  }
  getDate(date) {
    return this.clone(date).date();
  }
  getDayOfWeek(date) {
    return this.clone(date).day();
  }
  getMonthNames(style) {
    // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
    return style == 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
  }
  getDateNames() {
    return this._localeData.dates;
  }
  getDayOfWeekNames(style) {
    if (style == 'long') {
      return this._localeData.longDaysOfWeek;
    }
    if (style == 'short') {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }
  getYearName(date) {
    return this.clone(date).format('YYYY');
  }
  getFirstDayOfWeek() {
    return this._localeData.firstDayOfWeek;
  }
  getNumDaysInMonth(date) {
    return this.clone(date).daysInMonth();
  }
  clone(date) {
    return date.clone().locale(this.locale);
  }
  createDate(year, month, date) {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (month < 0 || month > 11) {
        throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
      }
      if (date < 1) {
        throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
      }
    }
    const result = this._createMoment({
      year,
      month,
      date
    }).locale(this.locale);
    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
  today() {
    return this._createMoment().locale(this.locale);
  }
  parse(value, parseFormat) {
    if (value && typeof value == 'string') {
      return this._createMoment(value, parseFormat, this.locale);
    }
    return value ? this._createMoment(value).locale(this.locale) : null;
  }
  format(date, displayFormat) {
    date = this.clone(date);
    if (!this.isValid(date) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error('MomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }
  addCalendarYears(date, years) {
    return this.clone(date).add({
      years
    });
  }
  addCalendarMonths(date, months) {
    return this.clone(date).add({
      months
    });
  }
  addCalendarDays(date, days) {
    return this.clone(date).add({
      days
    });
  }
  toIso8601(date) {
    return this.clone(date).format();
  }
  /**
   * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
   * string into null. Returns an invalid date for all other values.
   */
  deserialize(value) {
    let date;
    if (value instanceof Date) {
      date = this._createMoment(value).locale(this.locale);
    } else if (this.isDateInstance(value)) {
      // Note: assumes that cloning also sets the correct locale.
      return this.clone(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = this._createMoment(value, moment.ISO_8601).locale(this.locale);
    }
    if (date && this.isValid(date)) {
      return this._createMoment(date).locale(this.locale);
    }
    return super.deserialize(value);
  }
  isDateInstance(obj) {
    return moment.isMoment(obj);
  }
  isValid(date) {
    return this.clone(date).isValid();
  }
  invalid() {
    return moment.invalid();
  }
  /** Creates a Moment instance while respecting the current UTC settings. */
  _createMoment(date, format, locale) {
    const {
      strict,
      useUtc
    } = this._options || {};
    return useUtc ? moment.utc(date, format, locale, strict) : moment(date, format, locale, strict);
  }
}
MomentDateAdapter.ɵfac = function MomentDateAdapter_Factory(t) {
  return new (t || MomentDateAdapter)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MAT_DATE_LOCALE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](MAT_MOMENT_DATE_ADAPTER_OPTIONS, 8));
};
MomentDateAdapter.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: MomentDateAdapter,
  factory: MomentDateAdapter.ɵfac
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MomentDateAdapter, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MAT_DATE_LOCALE]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      }]
    }];
  }, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MAT_MOMENT_DATE_FORMATS = {
  parse: {
    dateInput: 'l'
  },
  display: {
    dateInput: 'l',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MomentDateModule {}
MomentDateModule.ɵfac = function MomentDateModule_Factory(t) {
  return new (t || MomentDateModule)();
};
MomentDateModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: MomentDateModule
});
MomentDateModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: [{
    provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.DateAdapter,
    useClass: MomentDateAdapter,
    deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  }]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MomentDateModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      providers: [{
        provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.DateAdapter,
        useClass: MomentDateAdapter,
        deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      }]
    }]
  }], null, null);
})();
class MatMomentDateModule {}
MatMomentDateModule.ɵfac = function MatMomentDateModule_Factory(t) {
  return new (t || MatMomentDateModule)();
};
MatMomentDateModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: MatMomentDateModule
});
MatMomentDateModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: [{
    provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MAT_DATE_FORMATS,
    useValue: MAT_MOMENT_DATE_FORMATS
  }],
  imports: [MomentDateModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatMomentDateModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [MomentDateModule],
      providers: [{
        provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MAT_DATE_FORMATS,
        useValue: MAT_MOMENT_DATE_FORMATS
      }]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=material-moment-adapter.mjs.map

/***/ })

}]);