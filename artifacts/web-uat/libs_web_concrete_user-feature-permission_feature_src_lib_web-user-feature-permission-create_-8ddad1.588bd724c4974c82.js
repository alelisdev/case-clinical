"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_user-feature-permission_feature_src_lib_web-user-feature-permission-create_-8ddad1"],{

/***/ 564659:
/*!******************************************************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-create/web-user-feature-permission-create.component.ts ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionCreateComponent": () => (/* binding */ WebUserFeaturePermissionCreateComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _web_user_feature_permission_create_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./web-user-feature-permission-create.store */ 331045);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../ui/panel/src/lib/web-ui-panel.component */ 619797);
/* harmony import */ var _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../ui/card-header/src/lib/web-ui-card-header.component */ 80194);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../ui/form/src/lib/web-ui-form.component */ 834077);















function WebUserFeaturePermissionCreateComponent_ng_container_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9)(1, "ui-button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUserFeaturePermissionCreateComponent_ng_container_0_ng_template_1_Template_ui_button_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r8.handleDiscardClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function WebUserFeaturePermissionCreateComponent_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-card-header", 11);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", "Create New")("controlsTemplate", _r2);
  }
}
function WebUserFeaturePermissionCreateComponent_ng_container_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUserFeaturePermissionCreateComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUserFeaturePermissionCreateComponent_ng_container_0_ng_template_1_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUserFeaturePermissionCreateComponent_ng_container_0_ng_template_3_Template, 1, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUserFeaturePermissionCreateComponent_ng_container_0_ng_template_5_Template, 2, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ui-panel", 5)(8, "div", 6)(9, "ui-form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitForm", function WebUserFeaturePermissionCreateComponent_ng_container_0_Template_ui_form_submitForm_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.createUserFeaturePermission($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "ui-button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTemplate", _r4)("footerTemplate", _r6)("disableHeaderPadding", true)("disableBodyPadding", true)("disableFooterPadding", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx_r0.form)("fields", ctx_r0.fields)("model", ctx_r0.model)("options", ctx_r0.options);
  }
}
class WebUserFeaturePermissionCreateComponent {
  constructor(store, router, route, ref) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.ref = ref;
    this.vm$ = this.store.vm$;
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({});
    this.featurePermissions$ = this.store.featurePermissions$;
    this.users$ = this.store.users$;
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('name', {
      label: 'Name'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4 px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.selectForm('feature-permission', 'featurePermissionId', {
      defaultValues: {},
      className: 'sm:w-full md:w-1/4 px-1',
      createFeaturePermission: event => {
        if (event === null || event === void 0 ? void 0 : event.name) {
          this.store.addFeaturePermission(event);
          this.model.featurePermissionId = event.id;
          this.form.controls['featurePermissionId'].patchValue(event.id);
          this.form.controls['featurePermissionId'].markAsDirty();
          this.ref.markForCheck();
          this.ref.detectChanges();
        }
      },
      label: 'Feature Permission',
      options: this.store.featurePermissions$,
      valueProp: 'id',
      labelProp: 'name'
    }, {
      hooks: {
        onInit: field => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
          this.store.filterFeaturePermissions('').subscribe();
          this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.pluck)('featurePermissionId')).subscribe(s => {
            var _a;
            (_a = field.formControl) === null || _a === void 0 ? void 0 : _a.setValue(s);
            this.model.featurePermissionId = s;
            if (s != undefined || s != null) {
              field.hide = true;
            }
          });
        })
      }
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.select('userId', {
      defaultValues: {},
      className: 'sm:w-full md:w-1/4 px-1',
      createUser: event => {
        if (event === null || event === void 0 ? void 0 : event.name) {
          this.store.addUser(event);
          this.model.userId = event.id;
          this.form.controls['userId'].patchValue(event.id);
          this.form.controls['userId'].markAsDirty();
          this.ref.markForCheck();
          this.ref.detectChanges();
        }
      },
      label: 'User',
      options: this.store.users$,
      valueProp: 'id',
      labelProp: 'name'
    }, {
      hooks: {
        onInit: field => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
          this.store.filterUsers('').subscribe();
          this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.pluck)('userId')).subscribe(s => {
            var _a;
            (_a = field.formControl) === null || _a === void 0 ? void 0 : _a.setValue(s);
            this.model.userId = s;
            if (s != undefined || s != null) {
              field.hide = true;
            }
          });
        })
      }
    })])];
  }
  handleDiscardClick(evt) {
    evt === null || evt === void 0 ? void 0 : evt.preventDefault();
    this.router.navigate(['..'], {
      relativeTo: this.route
    });
  }
  createUserFeaturePermission(input) {
    this.store.createUserFeaturePermissionEffect(input);
  }
}
WebUserFeaturePermissionCreateComponent.ɵfac = function WebUserFeaturePermissionCreateComponent_Factory(t) {
  return new (t || WebUserFeaturePermissionCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_user_feature_permission_create_store__WEBPACK_IMPORTED_MODULE_5__.WebUserFeaturePermissionCreateStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
WebUserFeaturePermissionCreateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUserFeaturePermissionCreateComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_web_user_feature_permission_create_store__WEBPACK_IMPORTED_MODULE_5__.WebUserFeaturePermissionCreateStore])],
  decls: 2,
  vars: 3,
  consts: [["class", "absolute inset-0 flex flex-col overflow-y-hidden", 4, "ngIf"], [1, "absolute", "inset-0", "flex", "flex-col", "overflow-y-hidden"], ["controlsTemplate", ""], ["headerTemplate", ""], ["footerTemplate", ""], [1, "absolute", "inset-0", "overflow-y-auto", "p-2", "md:p-4", 3, "headerTemplate", "footerTemplate", "disableHeaderPadding", "disableBodyPadding", "disableFooterPadding"], [1, "px-6", "py-4", "w-full", "h-full"], [3, "form", "fields", "model", "options", "submitForm"], ["label", "Save", "type", "submit"], [1, "space-x-3", "px-6"], ["label", "Discard", "variant", "white", 3, "click"], [3, "title", "controlsTemplate"], [1, "flex", "items-center", "justify-end", "pb-6", "pt-3", "dark:bg-transparent"]],
  template: function WebUserFeaturePermissionCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebUserFeaturePermissionCreateComponent_ng_container_0_Template, 11, 9, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_8__.WebUiButtonComponent, _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_9__.WebUiPanelComponent, _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_10__.WebUiCardHeaderComponent, _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_11__.WebUiFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 347769:
/*!***************************************************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-create/web-user-feature-permission-create.module.ts ***!
  \***************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionCreateModule": () => (/* binding */ WebUserFeaturePermissionCreateModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _web_user_feature_permission_create_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./web-user-feature-permission-create.component */ 564659);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);










class WebUserFeaturePermissionCreateModule {}
WebUserFeaturePermissionCreateModule.ɵfac = function WebUserFeaturePermissionCreateModule_Factory(t) {
  return new (t || WebUserFeaturePermissionCreateModule)();
};
WebUserFeaturePermissionCreateModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUserFeaturePermissionCreateModule
});
WebUserFeaturePermissionCreateModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_6__.WebUiPageHeaderModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild([{
    path: '',
    component: _web_user_feature_permission_create_component__WEBPACK_IMPORTED_MODULE_8__.WebUserFeaturePermissionCreateComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUserFeaturePermissionCreateModule, {
    declarations: [_web_user_feature_permission_create_component__WEBPACK_IMPORTED_MODULE_8__.WebUserFeaturePermissionCreateComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_6__.WebUiPageHeaderModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ }),

/***/ 331045:
/*!**************************************************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-create/web-user-feature-permission-create.store.ts ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionCreateStore": () => (/* binding */ WebUserFeaturePermissionCreateStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);







class WebUserFeaturePermissionCreateStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route) {
    super({
      loading: false
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.item$ = this.select(s => s.item);
    this.featurePermissions$ = this.select(s => s.featurePermissions || []);
    this.users$ = this.select(s => s.users || []);
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.featurePermissions$, this.users$, (errors, loading, item, featurePermissions, users) => ({
      errors,
      loading,
      item,
      featurePermissions,
      users
    }), {
      debounce: true
    });
    this.filterFeaturePermissions = term => this.data.userSelectFeaturePermissions({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let featurePermissions = res.data.items;
      this.patchState({
        featurePermissions
      });
      return featurePermissions;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterUsers = term => this.data.userUsers({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let users = res.data.items;
      this.patchState({
        users
      });
      return users;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addFeaturePermission = this.updater((state, featurePermission) => Object.assign(Object.assign({}, state), {
      featurePermissions: state.featurePermissions.concat(featurePermission)
    }));
    this.addUser = this.updater((state, user) => Object.assign(Object.assign({}, state), {
      users: state.users.concat(user)
    }));
    this.createUserFeaturePermissionEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.data.userCreateUserFeaturePermission({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      var _a, _b;
      this.patchState({
        item: res.data.created,
        errors: res.errors,
        loading: false
      });
      return this.router.navigate(['..', (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.created) === null || _b === void 0 ? void 0 : _b.id], {
        relativeTo: this.route
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
  }
}
WebUserFeaturePermissionCreateStore.ɵfac = function WebUserFeaturePermissionCreateStore_Factory(t) {
  return new (t || WebUserFeaturePermissionCreateStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute));
};
WebUserFeaturePermissionCreateStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebUserFeaturePermissionCreateStore,
  factory: WebUserFeaturePermissionCreateStore.ɵfac
});

/***/ })

}]);