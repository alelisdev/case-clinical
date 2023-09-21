"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_modules_admin_apps_academy_academy_module_ts"],{

/***/ 642155:
/*!**********************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/academy-category-select/academy-category-edit.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyCategoryEditComponent": () => (/* binding */ AcademyCategoryEditComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _academy_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../academy.store */ 378220);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../ui/form/src/lib/web-ui-form.component */ 834077);












const _c0 = function () {
  return {};
};
class AcademyCategoryEditComponent {
  constructor(store, route, ref, formService) {
    this.store = store;
    this.route = route;
    this.ref = ref;
    this.formService = formService;
    this.customer = {};
    this.send = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({});
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('title', {
      label: 'Title',
      required: true
    }, {
      className: 'w-full px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('slug', {
      label: 'Slug',
      required: true
    }, {
      className: 'w-full px-1'
    })])];
  }
  submit({
    id,
    title,
    slug
  }) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
      if (id) {
        this.store.updateAcademyCategoryEffect({
          categoryId: id,
          input: {
            title,
            slug
          },
          sendEmitter: this.send
        });
      } else {
        this.store.createAcademyCategoryEffect({
          input: {
            title,
            slug
          },
          sendEmitter: this.send
        });
      }
    });
  }
  handleDiscardClick(event) {
    this.close.emit(event);
  }
}
AcademyCategoryEditComponent.ɵfac = function AcademyCategoryEditComponent_Factory(t) {
  return new (t || AcademyCategoryEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_academy_store__WEBPACK_IMPORTED_MODULE_4__.AcademyStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_6__.FormService));
};
AcademyCategoryEditComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AcademyCategoryEditComponent,
  selectors: [["academy-category-edit-form"]],
  inputs: {
    customer: "customer"
  },
  outputs: {
    send: "send",
    close: "close"
  },
  decls: 6,
  vars: 5,
  consts: [[1, "md:px-2", "lg:px-0", "lg:col-span-9", "dark:bg-gray-800", "bg-gray-100", "rounded-lg", "shadow", "p-4"], [1, "px-6", "pt-6"], [3, "model", "fields", "form", "submitForm"], [1, "-mx-6", "-mb-4", "mt-4", "px-4", "py-3", "bg-gray-100", "dark:bg-gray-800", "border-t", "border-transparent", "dark:border-gray-700", "text-right", "sm:px-6", "rounded-b-lg", "space-x-3"], ["label", "Discard", "type", "button", "variant", "white", 3, "click"], ["label", "Save", "type", "submit", 3, "disabled"]],
  template: function AcademyCategoryEditComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "ui-form", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitForm", function AcademyCategoryEditComponent_Template_ui_form_submitForm_2_listener() {
        return ctx.submit(ctx.customer);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3)(4, "ui-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyCategoryEditComponent_Template_ui_button_click_4_listener($event) {
        return ctx.handleDiscardClick($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "ui-button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("model", (tmp_0_0 = ctx.customer) !== null && tmp_0_0 !== undefined ? tmp_0_0 : _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c0))("fields", ctx.fields)("form", ctx.form);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.form.valid);
    }
  },
  dependencies: [_ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__.WebUiButtonComponent, _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__.WebUiFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 40252:
/*!************************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/academy-category-select/academy-category-select.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyCategorySelectComponent": () => (/* binding */ AcademyCategorySelectComponent)
/* harmony export */ });
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_select_form_src_lib_web_ui_select_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../ui/select-form/src/lib/web-ui-select-form.component */ 715909);
/* harmony import */ var _academy_category_edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./academy-category-edit */ 642155);
/* harmony import */ var _academy_category_table_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./academy-category-table-view */ 246752);





const _c0 = function () {
  return {};
};
function AcademyCategorySelectComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "academy-category-edit-form", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("send", function AcademyCategorySelectComponent_ng_template_1_Template_academy_category_edit_form_send_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const context_r4 = restoredCtx.data;
      context_r4.onSave($event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](context_r4.ref.close());
    })("close", function AcademyCategorySelectComponent_ng_template_1_Template_academy_category_edit_form_close_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const context_r4 = restoredCtx.data;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](context_r4.ref.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const context_r4 = ctx.data;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("customer", context_r4.value || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
  }
}
function AcademyCategorySelectComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-academy-category-table-view", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function AcademyCategorySelectComponent_ng_template_3_Template_ui_academy_category_table_view_itemDidSelect_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);
      const context_r8 = restoredCtx.data;
      context_r8.itemDidSelect($event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](context_r8.ref.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const context_r8 = ctx.data;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("customers", context_r8.items);
  }
}
class AcademyCategorySelectComponent extends _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__.FieldType {}
AcademyCategorySelectComponent.ɵfac = /*@__PURE__*/function () {
  let ɵAcademyCategorySelectComponent_BaseFactory;
  return function AcademyCategorySelectComponent_Factory(t) {
    return (ɵAcademyCategorySelectComponent_BaseFactory || (ɵAcademyCategorySelectComponent_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](AcademyCategorySelectComponent)))(t || AcademyCategorySelectComponent);
  };
}();
AcademyCategorySelectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AcademyCategorySelectComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 5,
  vars: 5,
  consts: [[3, "to", "control", "listTemplate", "editTemplate", "createTemplate"], ["editTemplate", ""], ["listTemplate", ""], [1, "flex-grow", "flex", "flex-col", 3, "customer", "send", "close"], [1, "w-full", "h-full", "bg-white", 3, "customers", "itemDidSelect"]],
  template: function AcademyCategorySelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-select-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AcademyCategorySelectComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AcademyCategorySelectComponent_ng_template_3_Template, 1, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("to", ctx.to)("control", ctx.formControl)("listTemplate", _r2)("editTemplate", _r0)("createTemplate", _r0);
    }
  },
  dependencies: [_ui_select_form_src_lib_web_ui_select_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiSelectFormComponent, _academy_category_edit__WEBPACK_IMPORTED_MODULE_3__.AcademyCategoryEditComponent, _academy_category_table_view__WEBPACK_IMPORTED_MODULE_4__.WebAcademyCategoryTableViewComponent],
  encapsulation: 2
});

/***/ }),

/***/ 246752:
/*!****************************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/academy-category-select/academy-category-table-view.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAcademyCategoryTableViewComponent": () => (/* binding */ WebAcademyCategoryTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _datatable_ui_src_lib_table_view_table_view_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);



class WebAcademyCategoryTableViewComponent {
  constructor() {
    this.customers = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'id',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'title',
      filter: 'agTextColumnFilter'
    }, {
      field: 'slug',
      filter: 'agTextColumnFilter'
    }, {
      field: 'createdAt',
      filter: 'agDateColumnFilter',
      hide: true
    }, {
      field: 'updatedAt',
      filter: 'agDateColumnFilter',
      hide: true
    }];
  }
  onSelected(selected) {
    this.itemDidSelect.emit(selected);
  }
}
WebAcademyCategoryTableViewComponent.ɵfac = function WebAcademyCategoryTableViewComponent_Factory(t) {
  return new (t || WebAcademyCategoryTableViewComponent)();
};
WebAcademyCategoryTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebAcademyCategoryTableViewComponent,
  selectors: [["ui-academy-category-table-view"]],
  inputs: {
    customers: "customers"
  },
  outputs: {
    itemDidSelect: "itemDidSelect"
  },
  decls: 1,
  vars: 2,
  consts: [[1, "w-full", "h-full", 3, "data", "columnDefs", "itemDidSelect"]],
  template: function WebAcademyCategoryTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebAcademyCategoryTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.customers)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_datatable_ui_src_lib_table_view_table_view_component__WEBPACK_IMPORTED_MODULE_1__.TableViewComponent],
  encapsulation: 2
});

/***/ }),

/***/ 572253:
/*!******************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/academy.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyComponent": () => (/* binding */ AcademyComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class AcademyComponent {
  /**
   * Constructor
   */
  constructor() {}
}
AcademyComponent.ɵfac = function AcademyComponent_Factory(t) {
  return new (t || AcademyComponent)();
};
AcademyComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AcademyComponent,
  selectors: [["academy"]],
  decls: 1,
  vars: 0,
  template: function AcademyComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 595588:
/*!***************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/academy.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyModule": () => (/* binding */ AcademyModule)
/* harmony export */ });
/* harmony import */ var _academy_category_select_academy_category_edit__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./academy-category-select/academy-category-edit */ 642155);
/* harmony import */ var _academy_category_select_academy_category_select__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./academy-category-select/academy-category-select */ 40252);
/* harmony import */ var _academy_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./academy.component */ 572253);
/* harmony import */ var _details_details_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./details/details.component */ 264751);
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./list/list.component */ 86907);
/* harmony import */ var _academy_routing__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./academy.routing */ 562663);
/* harmony import */ var _academy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.service */ 527000);
/* harmony import */ var _academy_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./academy.store */ 378220);
/* harmony import */ var _course_edit_course_edit_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./course-edit/course-edit.component */ 824054);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 573555);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fuse/pipes/find-by-key */ 747922);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/slide-toggle */ 690455);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tabs */ 503848);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _step_edit_step_edit_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./step-edit/step-edit.component */ 928632);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngneat/transloco */ 846367);
/* harmony import */ var _academy_category_select_academy_category_table_view__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./academy-category-select/academy-category-table-view */ 246752);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @case-clinical/web/datatable/ui */ 62106);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_select_form__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @case-clinical/web/ui/select-form */ 131276);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);




































class AcademyModule {}
AcademyModule.ɵfac = function AcademyModule_Factory(t) {
  return new (t || AcademyModule)();
};
AcademyModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: AcademyModule
});
AcademyModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [_academy_service__WEBPACK_IMPORTED_MODULE_1__.AcademyService, _academy_store__WEBPACK_IMPORTED_MODULE_2__.AcademyStore],
  imports: [_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.DragDropModule, _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_4__.FuseFindByKeyPipeModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__.MatProgressBarModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatSidenavModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__.MatSlideToggleModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__.MatTabsModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__.MatTooltipModule, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule.forChild(_academy_routing__WEBPACK_IMPORTED_MODULE_16__.academyRoutes), libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_17__.SharedModule, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_18__.TranslocoModule, _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_19__.WebDatatableUiModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_20__.WebUiButtonModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_21__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_22__.WebUiFormModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_23__.WebUiPanelModule, _case_clinical_web_ui_select_form__WEBPACK_IMPORTED_MODULE_24__.WebUiSelectFormModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_25__.FormlyModule.forChild({
    types: [{
      name: 'academy-category-select',
      component: _academy_category_select_academy_category_select__WEBPACK_IMPORTED_MODULE_26__.AcademyCategorySelectComponent,
      wrappers: ['form-field']
    }]
  })]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AcademyModule, {
    declarations: [_academy_category_select_academy_category_edit__WEBPACK_IMPORTED_MODULE_27__.AcademyCategoryEditComponent, _academy_category_select_academy_category_select__WEBPACK_IMPORTED_MODULE_26__.AcademyCategorySelectComponent, _academy_component__WEBPACK_IMPORTED_MODULE_28__.AcademyComponent, _details_details_component__WEBPACK_IMPORTED_MODULE_29__.AcademyDetailsComponent, _list_list_component__WEBPACK_IMPORTED_MODULE_30__.AcademyListComponent, _course_edit_course_edit_component__WEBPACK_IMPORTED_MODULE_31__.CourseEditComponent, _step_edit_step_edit_component__WEBPACK_IMPORTED_MODULE_32__.StepEditComponent, _academy_category_select_academy_category_table_view__WEBPACK_IMPORTED_MODULE_33__.WebAcademyCategoryTableViewComponent],
    imports: [_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.DragDropModule, _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_4__.FuseFindByKeyPipeModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__.MatProgressBarModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatSidenavModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__.MatSlideToggleModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__.MatTabsModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__.MatTooltipModule, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_17__.SharedModule, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_18__.TranslocoModule, _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_19__.WebDatatableUiModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_20__.WebUiButtonModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_21__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_22__.WebUiFormModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_23__.WebUiPanelModule, _case_clinical_web_ui_select_form__WEBPACK_IMPORTED_MODULE_24__.WebUiSelectFormModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_25__.FormlyModule]
  });
})();

/***/ }),

/***/ 562663:
/*!****************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/academy.routing.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "academyRoutes": () => (/* binding */ academyRoutes)
/* harmony export */ });
/* harmony import */ var _academy_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./academy.component */ 572253);
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list/list.component */ 86907);
/* harmony import */ var _details_details_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./details/details.component */ 264751);



const academyRoutes = [{
  path: '',
  component: _academy_component__WEBPACK_IMPORTED_MODULE_0__.AcademyComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    component: _list_list_component__WEBPACK_IMPORTED_MODULE_1__.AcademyListComponent
  }, {
    path: ':id',
    component: _details_details_component__WEBPACK_IMPORTED_MODULE_2__.AcademyDetailsComponent
  }]
}];

/***/ }),

/***/ 527000:
/*!****************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/academy.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyService": () => (/* binding */ AcademyService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _business_academy_business_provider_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./business/academy.business-provider.service */ 7975);
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);










class AcademyService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  /**
   * Constructor
   */
  constructor(serviceContext, businessProvider, loggingService, data) {
    super("AcademyService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
    this.data = data;
  }
  createAcademyCategory(input) {
    return this.businessProvider.createAcademyCategory(input);
  }
  updateAcademyCategory(categoryId, input) {
    return this.businessProvider.updateAcademyCategory(categoryId, input);
  }
  createCourse(input) {
    return this.businessProvider.createCourse(input);
  }
  updateCourse(courseId, input) {
    return this.businessProvider.updateCourse(courseId, input);
  }
  createCourseStep(input) {
    return this.businessProvider.createCourseStep(input);
  }
  updateCourseStep(stepId, input) {
    return this.businessProvider.updateCourseStep(stepId, input);
  }
  updateStepOrder(stepId, order) {
    return this.data.userUpdateStepOrder({
      stepId,
      order
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.result)));
  }
  createCourseProgress(input) {
    return this.businessProvider.createCourseProgress(input);
  }
  updateCourseProgress(courseProgressId, input) {
    return this.businessProvider.updateCourseProgress(courseProgressId, input);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get categories
   */
  getCategories() {
    return this.data.userAcademyCategories({
      input: {}
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.items)));
  }
  /**
   * Get courses
   */
  getCourses() {
    return this.data.userCourses({
      input: {}
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.items)));
  }
  /**
   * Get course by id
   */
  getCourseById(id) {
    return this.data.userCourse({
      courseId: id
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.course)));
  }
}
AcademyService.ɵfac = function AcademyService_Factory(t) {
  return new (t || AcademyService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_business_academy_business_provider_service__WEBPACK_IMPORTED_MODULE_5__.AcademyBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_business_academy_business_provider_service__WEBPACK_IMPORTED_MODULE_5__.AcademyBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService));
};
AcademyService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: AcademyService,
  factory: AcademyService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 378220:
/*!**************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/academy.store.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyStore": () => (/* binding */ AcademyStore)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _academy_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./academy.service */ 527000);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);











class AcademyStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(academyService, formService, toast) {
    super({
      categories: [],
      courses: [],
      course: null,
      categorySlug: 'all',
      searchQuery: '',
      hideCompleted: false
    });
    this.academyService = academyService;
    this.formService = formService;
    this.toast = toast;
    this.categories$ = this.select(s => s.categories);
    this.courses$ = this.select(s => {
      let filteredCoures = Object.assign(s.courses);
      if (s.categorySlug !== 'all') {
        filteredCoures = filteredCoures.filter(course => course.category.slug === s.categorySlug);
      }
      if (s.searchQuery !== '') {
        filteredCoures = filteredCoures.filter(course => course.title.toLowerCase().includes(s.searchQuery.toLowerCase()) || course.description.toLowerCase().includes(s.searchQuery.toLowerCase()) || course.category.title.toLowerCase().includes(s.searchQuery.toLowerCase()));
      }
      // Filter by completed
      if (s.hideCompleted) {
        filteredCoures = filteredCoures.filter(course => {
          var _a;
          return (((_a = course.progress) === null || _a === void 0 ? void 0 : _a.completed) || 0) === 0;
        });
      }
      return filteredCoures;
    });
    this.course$ = this.select(s => {
      var _a, _b;
      if ((_b = (_a = s.course) === null || _a === void 0 ? void 0 : _a.steps) === null || _b === void 0 ? void 0 : _b.length) {
        s.course.steps = s.course.steps.sort((a, b) => a.order - b.order);
      }
      return s.course;
    });
    this.vm$ = this.select(this.categories$, this.courses$, this.course$, (categories, courses, course) => ({
      categories,
      courses,
      course
    }));
    this.addNewCategory = this.updater((state, category) => Object.assign(Object.assign({}, state), {
      categories: [...state.categories, category]
    }));
    this.updateCategory = this.updater((state, data) => {
      const index = state.categories.findIndex(category => category.id === data.categoryId);
      if (index != -1) {
        state.categories[index] = data.updated;
      }
      return Object.assign(Object.assign({}, state), {
        categories: state.categories
      });
    });
    this.setCategorySlug = this.updater((state, slug) => Object.assign(Object.assign({}, state), {
      categorySlug: slug
    }));
    this.setSearchQuery = this.updater((state, query) => Object.assign(Object.assign({}, state), {
      searchQuery: query
    }));
    this.setHideCompleted = this.updater((state, hide) => Object.assign(Object.assign({}, state), {
      hideCompleted: hide
    }));
    this.addNewCourse = this.updater((state, newCourse) => Object.assign(Object.assign({}, state), {
      courses: [...state.courses, newCourse]
    }));
    this.updateCourse = this.updater((state, data) => {
      const index = state.courses.findIndex(course => course.id === data.courseId);
      if (index != -1) {
        state.courses[index] = data.updated;
      }
      return Object.assign(Object.assign({}, state), {
        courses: state.courses
      });
    });
    this.filterCategories = term => this.academyService.getCategories();
    this.updateStepOrderEffect = this.effect(data$ => data$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.withLatestFrom)(this.course$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(([data, course]) => {
      const selectedStep = course.steps.find(step => step.id === data.stepId);
      if (selectedStep.order < data.order) {
        course.steps.forEach(step => {
          if (step.order <= data.order && step.order > selectedStep.order) step.order = step.order - 1;
        });
      } else if (selectedStep.order > data.order) {
        course.steps.forEach(step => {
          if (step.order >= data.order && step.order < selectedStep.order) step.order = step.order + 1;
        });
      }
      selectedStep.order = data.order;
      this.patchState({
        course: course
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([data, course]) => this.academyService.updateStepOrder(data.stepId, data.order).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(result => {
      console.log('update order result: ', result);
    })))));
    this.loadCategoriesEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(_ => this.academyService.getCategories().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      console.log(data);
      this.patchState({
        categories: data
      });
    }, error => {
      console.log(error);
    })))));
    this.loadCoursesEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(_ => this.academyService.getCourses().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      const latestCompletedCourseId = localStorage.getItem('latest_completed_course_id');
      if (latestCompletedCourseId) {
        localStorage.removeItem('latest_completed_course_id');
        const latestCompletedCoure = data.find(course => course.id === latestCompletedCourseId);
        if (latestCompletedCoure) {
          if (latestCompletedCoure.progress.currentStep !== 0) {
            latestCompletedCoure.progress.completed += 1;
            latestCompletedCoure.progress.currentStep = 0;
          }
        }
      }
      this.patchState({
        courses: data
      });
    }, error => {})))));
    this.loadCourseByIdEffect = this.effect(id$ => id$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(id => this.academyService.getCourseById(id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(course => {
      this.patchState({
        course: course
      });
    }, error => {})))));
    this.createAcademyCategoryEffect = this.effect(data$ => data$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.academyService.createAcademyCategory(data.input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(created => {
      this.toast.success('Created new category', {
        duration: 3000
      });
      this.addNewCategory(created);
      data.sendEmitter.emit(created);
    }, error => {
      this.toast.error(error.Message, {
        duration: 3000
      });
      this.formService.setErrors(error.Data);
    })))));
    this.createCourseEffect = this.effect(data$ => data$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.academyService.createCourse(data.input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(created => {
      this.toast.success('Created new course', {
        duration: 3000
      });
      this.addNewCourse(created);
      data.sendEmitter.emit();
    }, error => {
      this.toast.error(error.Message, {
        duration: 3000
      });
      this.formService.setErrors(error.Data);
    })))));
    this.updateAcademyCategoryEffect = this.effect(data$ => data$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.academyService.updateAcademyCategory(data.categoryId, data.input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(updated => {
      this.toast.success('Updated course', {
        duration: 3000
      });
      this.updateCategory({
        categoryId: data.categoryId,
        updated: updated
      });
      data.sendEmitter.emit(updated);
    }, error => {
      this.toast.error(error.Message, {
        duration: 3000
      });
      this.formService.setErrors(error.Data);
    })))));
    this.updateCourseEffect = this.effect(data$ => data$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(data => this.academyService.updateCourse(data.courseId, data.input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(updated => {
      this.toast.success('Updated course', {
        duration: 3000
      });
      this.updateCourse({
        courseId: data.courseId,
        updated: updated
      });
      data.sendEmitter.emit();
    }, error => {
      this.toast.error(error.Message, {
        duration: 3000
      });
      this.formService.setErrors(error.Data);
    })))));
    this.createCourseStepEffect = this.effect(data$ => data$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.withLatestFrom)(this.course$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([data, course]) => this.academyService.createCourseStep(data.input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(created => {
      this.patchState({
        course: Object.assign(Object.assign({}, course), {
          totalSteps: course.totalSteps + 1,
          steps: [...course.steps, created]
        })
      });
      this.toast.success('Create new course step', {
        duration: 3000
      });
      data.sendEmitter.emit();
    }, error => {
      this.toast.error(error.Message, {
        duration: 3000
      });
      this.formService.setErrors(error.Data);
    })))));
    this.updateCourseStepEffect = this.effect(data$ => data$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.withLatestFrom)(this.course$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([data, course]) => this.academyService.updateCourseStep(data.stepId, data.input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(updated => {
      const steps = Object.assign(course.steps);
      const updatedStepIndex = steps.findIndex(step => step.id === data.stepId);
      if (updatedStepIndex != -1) {
        steps[updatedStepIndex] = updated;
        this.patchState({
          course: Object.assign(Object.assign({}, course), {
            steps: steps
          })
        });
      }
      data.sendEmitter.emit();
      this.toast.success('Updated course step', {
        duration: 3000
      });
    }, error => {
      this.toast.error(error.Message, {
        duration: 3000
      });
      this.formService.setErrors(error.Data);
    })))));
    this.crateCoureProgressEffect = this.effect(data$ => data$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.withLatestFrom)(this.course$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([data, course]) => this.academyService.createCourseProgress({
      courseId: data.courseId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(created => {
      this.patchState({
        course: Object.assign(Object.assign({}, course), {
          progress: {
            courseProgressId: created.id,
            currentStep: created.currentStep,
            completed: created.completed
          }
        })
      });
    }, error => {
      console.log(error);
    })))));
    this.updateCourseProgressEffect = this.effect(data$ => data$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.withLatestFrom)(this.course$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([data, course]) => {
      if (data.currentStep === course.totalSteps) {
        localStorage.setItem('latest_completed_course_id', course.id);
      }
      return this.academyService.updateCourseProgress(data.courseProgressId, {
        currentStep: data.currentStep
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(updated => {
        this.patchState({
          course: Object.assign(Object.assign({}, course), {
            progress: Object.assign(Object.assign({}, course.progress), {
              currentStep: updated.currentStep,
              completed: updated.completed
            })
          })
        });
      }, error => {
        console.log(error);
      }));
    })));
  }
}
AcademyStore.ɵfac = function AcademyStore_Factory(t) {
  return new (t || AcademyStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_academy_service__WEBPACK_IMPORTED_MODULE_5__.AcademyService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_6__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService));
};
AcademyStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: AcademyStore,
  factory: AcademyStore.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 7975:
/*!*******************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/academy.business-provider.service.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyBusinessProviderService": () => (/* binding */ AcademyBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _actions_create_academy_category_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-academy-category.action */ 266704);
/* harmony import */ var _actions_create_course_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/create-course.action */ 956288);
/* harmony import */ var _actions_create_course_progress_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./actions/create-course-progress.action */ 287338);
/* harmony import */ var _actions_create_step_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./actions/create-step.action */ 814465);
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_update_academy_category_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-academy-category.action */ 1337);
/* harmony import */ var _actions_update_course_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions/update-course.action */ 451901);
/* harmony import */ var _actions_update_course_progress_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./actions/update-course-progress.action */ 98325);
/* harmony import */ var _actions_update_course_step_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./actions/update-course-step.action */ 922414);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);















class AcademyBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AcademyBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAcademyCategory(input) {
    const action = new _actions_create_academy_category_action__WEBPACK_IMPORTED_MODULE_2__.CreateAcademyCategoryAction(input);
    action.Do(this);
    return action.response;
  }
  updateAcademyCategory(categoryId, input) {
    const action = new _actions_update_academy_category_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAcademyCategoryAction(categoryId, input);
    action.Do(this);
    return action.response;
  }
  createCourse(input) {
    const action = new _actions_create_course_action__WEBPACK_IMPORTED_MODULE_4__.CreateCourseAction(input);
    action.Do(this);
    console.log(action.response);
    return action.response;
  }
  updateCourse(courseId, input) {
    const action = new _actions_update_course_action__WEBPACK_IMPORTED_MODULE_5__.UpdateCourseAction(courseId, input);
    action.Do(this);
    return action.response;
  }
  createCourseStep(input) {
    const action = new _actions_create_step_action__WEBPACK_IMPORTED_MODULE_6__.CreateCourseStepAction(input);
    action.Do(this);
    return action.response;
  }
  updateCourseStep(stepId, input) {
    console.log('business-provider, stepId = ', stepId);
    const action = new _actions_update_course_step_action__WEBPACK_IMPORTED_MODULE_7__.UpdateCourseStepAction(stepId, input);
    action.Do(this);
    return action.response;
  }
  createCourseProgress(input) {
    const action = new _actions_create_course_progress_action__WEBPACK_IMPORTED_MODULE_8__.CreateCourseProgressAction(input);
    action.Do(this);
    return action.response;
  }
  updateCourseProgress(courseProgressId, input) {
    const action = new _actions_update_course_progress_action__WEBPACK_IMPORTED_MODULE_9__.UpdateCourseProgressAction(courseProgressId, input);
    action.Do(this);
    return action.response;
  }
}
AcademyBusinessProviderService.ɵfac = function AcademyBusinessProviderService_Factory(t) {
  return new (t || AcademyBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_11__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AcademyBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
  token: AcademyBusinessProviderService,
  factory: AcademyBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 746252:
/*!**********************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/academy.business-action-base.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyBusinessActionBase": () => (/* binding */ AcademyBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AcademyBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
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

/***/ 266704:
/*!************************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/create-academy-category.action.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAcademyCategoryAction": () => (/* binding */ CreateAcademyCategoryAction)
/* harmony export */ });
/* harmony import */ var _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.business-action-base */ 746252);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class CreateAcademyCategoryAction extends _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AcademyBusinessActionBase {
  constructor(input) {
    super('CreateAcademyCategoryAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('slug', 'Slug should be more than 2 characters', this.input.slug, 2, 100000, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAcademyCategory({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      console.log('catChError');
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 287338:
/*!***********************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/create-course-progress.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCourseProgressAction": () => (/* binding */ CreateCourseProgressAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.business-action-base */ 746252);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class CreateCourseProgressAction extends _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AcademyBusinessActionBase {
  constructor(input) {
    super('CreateCourseProgressAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('courseId', 'CourseId is required', this.input.courseId, true));
  }
  performAction() {
    console.log(this.input);
    this.response = this.businessProvider.data.userCreateUserCourseProgress({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => {
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 956288:
/*!**************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/create-course.action.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCourseAction": () => (/* binding */ CreateCourseAction)
/* harmony export */ });
/* harmony import */ var _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.business-action-base */ 746252);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class CreateCourseAction extends _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AcademyBusinessActionBase {
  constructor(input) {
    super('CreateCourseAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('categoryId', 'You have to choose one of the category', this.input.categoryId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('slug', 'Slug should be more than 2 characters', this.input.slug, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('description', 'Description should be more than 2 characters', this.input.description, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNumber('duration', 'Duration should be integer', this.input.duration, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Min('duration', 'Duration should be greater than 1', this.input.duration, 1, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Max('duration', 'Duration should be smaller than 1000', this.input.duration, 1000, true));
  }
  performAction() {
    console.log('performAction');
    this.response = this.businessProvider.data.userCreateCourse({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      console.log('catChError');
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 814465:
/*!************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/create-step.action.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCourseStepAction": () => (/* binding */ CreateCourseStepAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.business-action-base */ 746252);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class CreateCourseStepAction extends _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AcademyBusinessActionBase {
  constructor(input) {
    super('CreateCourseStepAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('courseId', 'CourseId is required', this.input.courseId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 1000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('subtitle', 'Subtitle should be more than 2 characters', this.input.subtitle, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('content', 'Content should be more than 2 characters', this.input.content, 2, 100000, true));
  }
  performAction() {
    console.log(this.input);
    this.response = this.businessProvider.data.userCreateStep({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => {
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 1337:
/*!************************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/update-academy-category.action.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAcademyCategoryAction": () => (/* binding */ UpdateAcademyCategoryAction)
/* harmony export */ });
/* harmony import */ var _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.business-action-base */ 746252);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class UpdateAcademyCategoryAction extends _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AcademyBusinessActionBase {
  constructor(categoryId, input) {
    super('UpdateAcademyCategoryAction');
    this.categoryId = categoryId;
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('categoryId', 'CategoryId should not be null', this.categoryId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('slug', 'Slug should be more than 2 characters', this.input.slug, 2, 100000, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAcademyCategory({
      academyCategoryId: this.categoryId,
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      console.log('catChError');
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.updated);
    }));
  }
}

/***/ }),

/***/ 98325:
/*!***********************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/update-course-progress.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCourseProgressAction": () => (/* binding */ UpdateCourseProgressAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.business-action-base */ 746252);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class UpdateCourseProgressAction extends _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AcademyBusinessActionBase {
  constructor(courseProgressId, input) {
    super('UpdateCourseProgressAction');
    this.courseProgressId = courseProgressId;
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('courseProgressId', 'CourseProgressId is required', this.courseProgressId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNumber('currentStep', 'curretStep should be number', this.input.currentStep, true));
  }
  performAction() {
    console.log(this.input);
    this.response = this.businessProvider.data.userUpdateUserCourseProgress({
      userCourseProgressId: this.courseProgressId,
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => {
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.updated);
    }));
  }
}

/***/ }),

/***/ 922414:
/*!*******************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/update-course-step.action.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCourseStepAction": () => (/* binding */ UpdateCourseStepAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.business-action-base */ 746252);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class UpdateCourseStepAction extends _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AcademyBusinessActionBase {
  constructor(stepId, input) {
    super('UpdateCourseStepAction');
    this.stepId = stepId;
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('id', 'CourseStep id is required', this.stepId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('courseId', 'CourseId is required', this.input.courseId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 1000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('subtitle', 'Subtitle should be more than 2 characters', this.input.subtitle, 2, 1000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('content', 'Content should be more than 2 characters', this.input.content, 2, 1000000, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateStep({
      stepId: this.stepId,
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => {
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.updated);
    }));
  }
}

/***/ }),

/***/ 451901:
/*!**************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/business/actions/update-course.action.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCourseAction": () => (/* binding */ UpdateCourseAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./academy.business-action-base */ 746252);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class UpdateCourseAction extends _academy_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AcademyBusinessActionBase {
  constructor(courseId, input) {
    super('UpdateCourseAction');
    this.courseId = courseId;
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('id', 'Course id is required', this.courseId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('categoryId', 'You have to choose one of the category', this.input.categoryId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('slug', 'Slug should be more than 2 characters', this.input.title, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('description', 'Description should be more than 2 characters', this.input.title, 2, 100000, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNumber('duration', 'Duration should be integer', this.input.duration, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Min('duration', 'Duration should be greater than 1', this.input.duration, 1, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Max('duration', 'Duration should be smaller than 1000', this.input.duration, 1000, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateCourse({
      courseId: this.courseId,
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => {
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.updated);
    }));
  }
}

/***/ }),

/***/ 824054:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/course-edit/course-edit.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CourseEditComponent": () => (/* binding */ CourseEditComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _academy_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../academy.store */ 378220);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/transloco */ 846367);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../ui/form/src/lib/web-ui-form.component */ 834077);












function CourseEditComponent_ui_form_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-form", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitForm", function CourseEditComponent_ui_form_2_Template_ui_form_submitForm_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.onSubmit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ui-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseEditComponent_ui_form_2_Template_ui_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r4.send.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx_r0.form)("fields", ctx_r0.fields)("model", ctx_r0.model)("options", ctx_r0.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r0.form.valid)("label", t_r1("save"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", t_r1("discard"));
  }
}
class CourseEditComponent {
  constructor(formService, toast, store) {
    this.formService = formService;
    this.toast = toast;
    this.store = store;
    this.send = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({});
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
  }
  ngOnInit() {
    var _a, _b;
    if (this.course) {
      this.model = {
        title: this.course.title,
        slug: this.course.slug,
        description: this.course.description,
        duration: this.course.duration
      };
    }
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.selectForm('academy-category', 'categoryId', {
      initialValue: (_b = (_a = this.course) === null || _a === void 0 ? void 0 : _a.category) === null || _b === void 0 ? void 0 : _b.id,
      label: 'Category',
      valueProp: 'id',
      labelProp: 'title',
      source: this.store.filterCategories,
      debounceTime: 5,
      onCreate: event => {
        console.log('category created: ', event);
      },
      onUpdate: event => {
        console.log('category updated: ', event);
      }
    }, {
      className: 'w-full'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('title', {
      label: 'Title',
      required: true
    }, {
      className: 'w-full px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('slug', {
      label: 'Slug',
      required: true
    }, {
      className: 'w-full px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.textarea('description', {
      label: 'Description',
      required: true
    }, {
      className: 'w-full px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.number('duration', {
      label: 'Duration',
      required: true
    }, {
      className: 'w-full px-1'
    })])];
  }
  onSubmit($event) {
    if (this.course) {
      this.store.updateCourseEffect({
        input: $event,
        courseId: this.course.id,
        sendEmitter: this.send
      });
    } else {
      this.store.createCourseEffect({
        input: $event,
        sendEmitter: this.send
      });
    }
  }
}
CourseEditComponent.ɵfac = function CourseEditComponent_Factory(t) {
  return new (t || CourseEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_4__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_academy_store__WEBPACK_IMPORTED_MODULE_5__.AcademyStore));
};
CourseEditComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: CourseEditComponent,
  selectors: [["course-edit"]],
  inputs: {
    course: "course",
    categories: "categories"
  },
  outputs: {
    send: "send"
  },
  decls: 3,
  vars: 0,
  consts: [[1, "flex", "flex-col", "flex-grow"], [1, "w-full", "h-full"], [3, "form", "fields", "model", "options", "submitForm", 4, "transloco"], [3, "form", "fields", "model", "options", "submitForm"], ["type", "submit", 1, "mr-2", 3, "disabled", "label"], ["type", "button", 3, "label", "click"]],
  template: function CourseEditComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CourseEditComponent_ui_form_2_Template, 3, 7, "ui-form", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    }
  },
  dependencies: [_ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__.TranslocoDirective, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__.WebUiButtonComponent, _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__.WebUiFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 264751:
/*!**************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/details/details.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyDetailsComponent": () => (/* binding */ AcademyDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _academy_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../academy.store */ 378220);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var ngx_markdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-markdown */ 145432);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/scrolling */ 867376);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 573555);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tabs */ 503848);
/* harmony import */ var _step_edit_step_edit_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../step-edit/step-edit.component */ 928632);

























const _c0 = ["courseSteps"];
const _c1 = function (a0, a1, a2, a3) {
  return {
    "text-blue-800 bg-blue-100 dark:text-blue-50 dark:bg-blue-500": a0,
    "text-green-800 bg-green-100 dark:text-green-50 dark:bg-green-500": a1,
    "text-pink-800 bg-pink-100 dark:text-pink-50 dark:bg-pink-500": a2,
    "text-amber-800 bg-amber-100 dark:text-amber-50 dark:bg-amber-500": a3
  };
};
function AcademyDetailsComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const category_r7 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction4"](2, _c1, category_r7.slug === "web", category_r7.slug === "android", category_r7.slug === "cloud", category_r7.slug === "firebase"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", category_r7.title, " ");
  }
}
const _c2 = function (a0, a1) {
  return {
    "bg-primary": a0,
    "bg-gray-300 dark:bg-gray-600": a1
  };
};
function AcademyDetailsComponent_ng_container_31_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const step_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](1, _c2, step_r8.order < ctx_r10.currentStep, step_r8.order >= ctx_r10.currentStep));
  }
}
function AcademyDetailsComponent_ng_container_31_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check");
  }
}
function AcademyDetailsComponent_ng_container_31_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const step_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", step_r8.order + 1, " ");
  }
}
function AcademyDetailsComponent_ng_container_31_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const step_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", step_r8.order + 1, " ");
  }
}
const _c3 = function (a0, a1, a2) {
  return {
    "bg-primary dark:bg-primary text-on-primary group-hover:bg-primary-800": a0,
    "ring-primary": a1,
    "ring-gray-300 dark:ring-gray-600 group-hover:ring-gray-400": a2
  };
};
function AcademyDetailsComponent_ng_container_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AcademyDetailsComponent_ng_container_31_ng_container_2_Template, 2, 4, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 48)(4, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, AcademyDetailsComponent_ng_container_31_ng_container_5_Template, 2, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AcademyDetailsComponent_ng_container_31_ng_container_6_Template, 3, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, AcademyDetailsComponent_ng_container_31_ng_container_7_Template, 3, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 50)(9, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const step_r8 = ctx.$implicit;
    const last_r9 = ctx.last;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("current-step", step_r8.order === ctx_r2.currentStep);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkDragData", step_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !last_r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](10, _c3, step_r8.order < ctx_r2.currentStep, step_r8.order === ctx_r2.currentStep, step_r8.order > ctx_r2.currentStep));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", step_r8.order < ctx_r2.currentStep);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", step_r8.order === ctx_r2.currentStep);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", step_r8.order > ctx_r2.currentStep);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](step_r8.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](step_r8.subtitle);
  }
}
function AcademyDetailsComponent_ng_container_42_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 57);
  }
  if (rf & 2) {
    const step_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r18.markdownService.compile(step_r17.content), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
  }
}
function AcademyDetailsComponent_ng_container_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AcademyDetailsComponent_ng_container_42_ng_template_2_Template, 1, 1, "ng-template", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function AcademyDetailsComponent_ng_template_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 58)(1, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "step-edit", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("send", function AcademyDetailsComponent_ng_template_75_Template_step_edit_send_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22);
      const ref_r20 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ref_r20.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ref_r20 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ref_r20.data.step ? "Update Course Step" : "Create Course Step", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("courseId", ctx_r6.course == null ? null : ctx_r6.course.id)("step", ref_r20.data == null ? null : ref_r20.data.step);
  }
}
const _c4 = function () {
  return [".."];
};
class AcademyDetailsComponent {
  /**
   * Constructor
   */
  constructor(_document, _changeDetectorRef, _elementRef, route, store, dialog, markdownService, _fuseMediaWatcherService) {
    this._document = _document;
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    this.route = route;
    this.store = store;
    this.dialog = dialog;
    this.markdownService = markdownService;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this.currentStep = -1;
    this.drawerMode = 'side';
    this.drawerOpened = true;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.store.loadCourseByIdEffect(params.get("id"));
    });
    // Get the course
    this.store.course$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(course => {
      var _a, _b;
      if (course) {
        console.log(course);
        if (!course.progress) {
          this.store.crateCoureProgressEffect({
            courseId: course.id
          });
          return;
        }
        // Get the course
        this.course = course;
        if (((_a = this.course.steps) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
          return;
        }
        // Go to step
        this.currentStep = ((_b = course.progress) === null || _b === void 0 ? void 0 : _b.currentStep) || 0;
        this.goToCurrentStep();
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    if (this.course) {
      const totalSteps = this.course.totalSteps || 0;
      const currentStep = this.currentStep || 0;
      if (totalSteps === currentStep + 1 && totalSteps > 0) {
        this.store.updateCourseProgressEffect({
          courseProgressId: this.course.progress.courseProgressId,
          currentStep: currentStep + 1
        });
      }
    }
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Go to given step
   *
   * @param step
   */
  goToCurrentStep() {
    // Go to the step
    this.courseSteps.selectedIndex = this.currentStep;
    // this._scrollCurrentStepElementIntoView()
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  get getCurrentStep() {
    var _a;
    if (this.currentStep >= 0) {
      if (this.course) {
        const step = (_a = this.course.steps) === null || _a === void 0 ? void 0 : _a.find(step => step.order === this.currentStep);
        return step;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  /**
   * Go to previous step
   */
  goToPreviousStep() {
    // Return if we already on the first step
    if (this.currentStep === 0) {
      return;
    }
    // Set the current step
    this.currentStep = this.currentStep - 1;
    this.store.updateCourseProgressEffect({
      courseProgressId: this.course.progress.courseProgressId,
      currentStep: this.currentStep
    });
  }
  /**
   * Go to next step
   */
  goToNextStep() {
    // Return if we already on the last step
    if (this.currentStep === this.course.totalSteps - 1) {
      return;
    }
    this.currentStep = this.currentStep + 1;
    this.store.updateCourseProgressEffect({
      courseProgressId: this.course.progress.courseProgressId,
      currentStep: this.currentStep
    });
  }
  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.order || index;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Scrolls the current step element from
   * sidenav into the view. This only happens when
   * previous/next buttons pressed as we don't want
   * to change the scroll position of the sidebar
   * when the user actually clicks around the sidebar.
   *
   * @private
   */
  _scrollCurrentStepElementIntoView() {
    // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
    setTimeout(() => {
      // Get the current step element and scroll it into view
      const currentStepElement = this._document.getElementsByClassName('current-step')[0];
      if (currentStepElement) {
        currentStepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
  drop($event) {
    console.log($event);
    if ($event.previousIndex != $event.currentIndex) {
      this.store.updateStepOrderEffect({
        courseId: this.course.id,
        stepId: $event.item.data.id,
        order: $event.currentIndex
      });
    }
  }
  openDialog(tpl, {
    step
  }) {
    this.dialog.open(tpl, {
      data: {
        step
      },
      width: '80%',
      closeButton: false
    });
  }
}
AcademyDetailsComponent.ɵfac = function AcademyDetailsComponent_Factory(t) {
  return new (t || AcademyDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_academy_store__WEBPACK_IMPORTED_MODULE_5__.AcademyStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_6__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_markdown__WEBPACK_IMPORTED_MODULE_7__.MarkdownService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_8__.FuseMediaWatcherService));
};
AcademyDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AcademyDetailsComponent,
  selectors: [["academy-details"]],
  viewQuery: function AcademyDetailsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.courseSteps = _t.first);
    }
  },
  decls: 77,
  vars: 37,
  consts: [[1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-90", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [1, "flex", "flex-col", "items-start", "p-8", "border-b"], [1, "inline-flex", "items-center", "leading-6", "text-primary", "hover:underline", 3, "routerLink"], [1, "inline-flex", "items-center"], [1, "icon-size-5", "text-current", 3, "svgIcon"], [1, "ml-1.5", "font-medium", "leading-5"], [4, "ngIf"], [1, "mt-3", "text-2xl", "font-semibold"], [1, "text-secondary"], [1, "mt-6"], ["mat-flat-button", "", 1, "flex-1", "h-12", 3, "color", "click"], [1, "ml-1"], [1, "ml-2", 3, "svgIcon"], ["mat-flat-button", "", 1, "flex-1", "h-12", "ml-3", 3, "color", "disabled", "click"], [1, "mt-6", "flex", "items-center", "leading-5", "text-md", "text-secondary"], [1, "icon-size-5", "text-hint", 3, "svgIcon"], [1, "ml-1.5"], [1, "py-2", "px-8"], ["cdkDropList", "", 1, "cdk-list", "step-boundary", 3, "cdkDropListDropped"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-col", "overflow-hidden"], [1, "lg:hidden", "flex", "flex-0", "items-center", "py-2", "pl-4", "pr-6", "sm:py-4", "md:pl-6", "md:pr-8", "border-b", "lg:border-b-0", "bg-card", "dark:bg-transparent"], ["mat-icon-button", "", 3, "routerLink"], [3, "svgIcon"], [1, "ml-2.5", "text-md", "sm:text-xl", "font-medium", "tracking-tight", "truncate"], [1, "hidden", "lg:block", "flex-0", "h-0.5", "w-full", 3, "value"], ["cdkScrollable", "", 1, "flex-auto", "overflow-y-auto"], [1, "fuse-mat-no-header", 3, "animationDuration"], ["courseSteps", ""], [1, "z-10", "sticky", "hidden", "lg:flex", "bottom-4", "p-4"], [1, "flex", "items-center", "justify-center", "mx-auto", "p-2", "rounded-full", "shadow-lg", "bg-primary"], ["mat-flat-button", "", 1, "flex-0", 3, "color", "click"], [1, "mr-2", 3, "svgIcon"], [1, "mr-1"], [1, "flex", "items-center", "justify-center", "mx-2.5", "font-medium", "leading-5", "text-on-primary"], [1, "mx-0.5", "text-hint"], [1, "lg:hidden", "flex", "items-center", "p-4", "border-t", "bg-card"], ["mat-icon-button", "", 3, "click"], [1, "flex", "items-center", "justify-center", "ml-1", "lg:ml-2", "font-medium", "leading-5"], [1, "flex-auto", "ml-6", "rounded-full", 3, "value"], ["mat-icon-button", "", 1, "ml-4", 3, "click"], ["mat-icon-button", "", 1, "ml-0.5", 3, "click"], ["editStepTpl", ""], [1, "mt-7", "py-0.5", "px-3", "rounded-full", "text-sm", "font-semibold", 3, "ngClass"], ["cdkDrag", "", "cdkDragLockAxis", "y", "cdkDragBoundary", ".step-boundary", 1, "cdk-box", "relative", "group", "py-6", 3, "cdkDragData"], [1, "relative", "flex", "items-start", "cursor-pointer"], [1, "flex", "flex-0", "items-center", "justify-center", "w-8", "h-8", "rounded-full", "ring-2", "ring-inset", "ring-transparent", "bg-card", "dark:bg-default", 3, "ngClass"], [1, "ml-4"], [1, "font-medium", "leading-4"], [1, "mt-1.5", "text-md", "leading-4", "text-secondary"], [1, "line", "absolute", "top-6", "left-4", "w-0.5", "h-full", "-ml-px", 3, "ngClass"], [1, "text-md", "font-semibold", "text-primary", "dark:text-primary-500"], [1, "text-md", "font-semibold", "text-hint", "group-hover:text-secondary"], ["matTabContent", ""], [1, "prose", "prose-sm", "max-w-3xl", "mx-auto", "sm:my-2", "lg:mt-4", "p-6", "sm:p-10", "sm:py-12", "rounded-2xl", "shadow", "overflow-hidden", "bg-card", 3, "innerHTML"], [1, "flex-grow", "flex", "flex-col", "p-4", "gap-2"], [1, "text-semibold", "text-gray-800", "dark:text-gray-50", "text-lg", "dark:bg-gray-800", "px-6", "py-4", 2, "border-radius", "10px 10px 0px 0px"], [1, "flex", "flex-col", "dark:bg-gray-800", "px-6", "py-4", 2, "border-radius", "0px 0px 10px 10px", 3, "courseId", "step", "send"]],
  template: function AcademyDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0)(2, "mat-drawer-container", 1)(3, "mat-drawer", 2, 3)(5, "div", 4)(6, "a", 5)(7, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "mat-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Back to courses");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, AcademyDetailsComponent_ng_container_11_Template, 3, 7, "ng-container", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 12)(17, "button", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyDetailsComponent_Template_button_click_17_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](76);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx.openDialog(_r5, {
          step: null
        }));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Add Step");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "mat-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyDetailsComponent_Template_button_click_21_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](76);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx.openDialog(_r5, {
          step: ctx.getCurrentStep
        }));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "span", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Edit Step");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "mat-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "mat-icon", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 20)(30, "ol", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkDropListDropped", function AcademyDetailsComponent_Template_ol_cdkDropListDropped_30_listener($event) {
        return ctx.drop($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, AcademyDetailsComponent_ng_container_31_Template, 13, 14, "ng-container", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "mat-drawer-content", 23)(33, "div", 24)(34, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "mat-icon", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "h2", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "mat-progress-bar", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 29)(40, "mat-tab-group", 30, 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, AcademyDetailsComponent_ng_container_42_Template, 3, 0, "ng-container", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 32)(44, "div", 33)(45, "button", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyDetailsComponent_Template_button_click_45_listener() {
        return ctx.goToPreviousStep();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "mat-icon", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "span", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Prev");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 37)(50, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "span", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "/");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "button", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyDetailsComponent_Template_button_click_56_listener() {
        return ctx.goToNextStep();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "span", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Next");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "mat-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 39)(61, "button", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyDetailsComponent_Template_button_click_61_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "mat-icon", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 41)(64, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "span", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "/");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "mat-progress-bar", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "button", 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyDetailsComponent_Template_button_click_71_listener() {
        return ctx.goToPreviousStep();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "mat-icon", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "button", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyDetailsComponent_Template_button_click_73_listener() {
        return ctx.goToNextStep();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "mat-icon", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](75, AcademyDetailsComponent_ng_template_75_Template, 4, 3, "ng-template", null, 45, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoFocus", false)("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/apps/academy");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-sm-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.course == null ? null : ctx.course.category);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.course == null ? null : ctx.course.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.course == null ? null : ctx.course.description);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("disabled", !ctx.getCurrentStep);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:pencil");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:clock");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.course == null ? null : ctx.course.duration, " minutes");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.course == null ? null : ctx.course.steps)("ngForTrackBy", ctx.trackByFn);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](36, _c4));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-sm-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.course == null ? null : ctx.course.title, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", 100 * (ctx.currentStep + 1) / (ctx.course == null ? null : ctx.course.totalSteps));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("animationDuration", "200");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.course == null ? null : ctx.course.steps)("ngForTrackBy", ctx.trackByFn);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.currentStep + 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((ctx.course == null ? null : ctx.course.totalSteps) || 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-right");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:view-list");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.currentStep + 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.course == null ? null : ctx.course.totalSteps);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", 100 * (ctx.currentStep + 1) / (ctx.course == null ? null : ctx.course.totalSteps));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-right");
    }
  },
  dependencies: [_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__.CdkScrollable, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_10__.CdkDropList, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_10__.CdkDrag, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__.MatProgressBar, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__.MatDrawerContent, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__.MatTabContent, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__.MatTabGroup, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _step_edit_step_edit_component__WEBPACK_IMPORTED_MODULE_16__.StepEditComponent],
  styles: [".cdk-list[_ngcontent-%COMP%] {\r\n    \r\n    \r\n    \r\n    \r\n    \r\n    \r\n    \r\n    \r\n  }\r\n  .cdk-box[_ngcontent-%COMP%] {\r\n    \r\n    \r\n    \r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    box-sizing: border-box;\r\n    \r\n    \r\n    \r\n  }\r\n.cdk-drag-preview[_ngcontent-%COMP%] {\r\n    box-sizing: border-box;\r\n    border-radius: 4px;\r\n    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),\r\n                0 8px 10px 1px rgba(0, 0, 0, 0.14),\r\n                0 3px 14px 2px rgba(0, 0, 0, 0.12);\r\n    filter: drop-shadow(0px 0px 5px rgba(255,255, 255, 0.1));\r\n  }\r\n\r\n  .cdk-drag-preview[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  .cdk-drag-placeholder[_ngcontent-%COMP%] {\r\n    opacity: 0;\r\n  }\r\n\r\n  .cdk-drag-animating[_ngcontent-%COMP%] {\r\n    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\r\n  }\r\n\r\n  .cdk-box[_ngcontent-%COMP%]:last-child {\r\n    border: none;\r\n  }\r\n\r\n  .cdk-list.cdk-drop-list-dragging[_ngcontent-%COMP%]   .cdk-box[_ngcontent-%COMP%]:not(.cdk-drag-placeholder) {\r\n    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\r\n  }\r\n\r\n  [_nghost-%COMP%]     .mat-mdc-tab-header{\r\n    display:none;\r\n  }\r\n\r\n  [_nghost-%COMP%]     .mdc-button__label span{\r\n    color:white;\r\n  }\r\n  [_nghost-%COMP%]     .mat-icon.notranslate.mat-icon-no-color{\r\n    color:white;\r\n  }\r\n  [_nghost-%COMP%]     .mdc-linear-progress__buffer{\r\n    display: none;\r\n  }\r\n  [_nghost-%COMP%]     .mdc-linear-progress__bar.mdc-linear-progress__secondary-bar{\r\n    display: none;\r\n  }"],
  changeDetection: 0
});

/***/ }),

/***/ 86907:
/*!********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/list/list.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcademyListComponent": () => (/* binding */ AcademyListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _academy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../academy.service */ 527000);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var _academy_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../academy.store */ 378220);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/scrolling */ 867376);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/slide-toggle */ 690455);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _course_edit_course_edit_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../course-edit/course-edit.component */ 824054);





















function AcademyListComponent_ng_container_0_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const category_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", category_r9.slug);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](category_r9.title);
  }
}
const _c0 = function (a0, a1, a2, a3) {
  return {
    "text-blue-800 bg-blue-100 dark:text-blue-50 dark:bg-blue-500": a0,
    "text-green-800 bg-green-100 dark:text-green-50 dark:bg-green-500": a1,
    "text-pink-800 bg-pink-100 dark:text-pink-50 dark:bg-pink-500": a2,
    "text-amber-800 bg-amber-100 dark:text-amber-50 dark:bg-amber-500": a3
  };
};
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const category_r18 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction4"](2, _c0, category_r18.slug === "web", category_r18.slug === "android", category_r18.slug === "cloud", category_r18.slug === "firebase"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", category_r18.title, " ");
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:badge-check")("matTooltip", "You completed this course at least once");
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Never completed");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_19_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "once");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_19_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "twice");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
const _c1 = function () {
  return {
    "=0": "time",
    "=1": "time",
    "other": "times"
  };
};
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_19_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "i18nPlural");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const course_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", (course_r11.progress == null ? null : course_r11.progress.completed) || 0, " ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 2, (course_r11.progress == null ? null : course_r11.progress.completed) || 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c1)), " ");
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 39)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Completed");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_19_ng_container_5_Template, 2, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_19_ng_container_6_Template, 2, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_19_ng_container_7_Template, 3, 6, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const course_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.completed) || 0) === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.completed) || 0) === 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.completed) || 0) > 2);
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_28_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Start");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_28_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Start again");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_28_ng_container_1_Template, 3, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_28_ng_container_2_Template, 3, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const course_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.completed) || 0 || 0) === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.completed) || 0) > 0);
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Continue");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
const _c2 = function (a0) {
  return [a0];
};
function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 30)(2, "div", 31)(3, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_4_Template, 3, 7, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_6_Template, 2, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "mat-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "mat-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_18_Template, 3, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_19_Template, 8, 3, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 41)(21, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](23, "percent");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "mat-progress-bar", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 45)(26, "button", 46)(27, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_28_Template, 3, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_ng_container_29_Template, 3, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "mat-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_Template_button_click_31_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28);
      const course_r11 = restoredCtx.$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](37);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r27.openDialog(_r7, {
        course: course_r11
      }));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 24)(33, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "mat-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const course_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", course_r11.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.completed) || 0) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r11.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r11.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:clock");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", course_r11.duration, " minutes");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:academic-cap");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.completed) || 0) === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.completed) || 0) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](23, 18, ((course_r11.progress == null ? null : course_r11.progress.currentStep) || 0) / course_r11.totalSteps))("matTooltipPosition", "above")("matTooltipClass", "-mb-0.5");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", 100 * ((course_r11.progress == null ? null : course_r11.progress.currentStep) || 0) / course_r11.totalSteps);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](20, _c2, course_r11.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.currentStep) || 0) === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ((course_r11.progress == null ? null : course_r11.progress.currentStep) || 0) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-sm-right");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:pencil");
  }
}
function AcademyListComponent_ng_container_0_ng_container_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AcademyListComponent_ng_container_0_ng_container_33_ng_container_2_Template, 36, 22, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", vm_r1.courses)("ngForTrackBy", ctx_r4.trackByFn);
  }
}
function AcademyListComponent_ng_container_0_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "No courses found!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "iconsmind:file_search");
  }
}
function AcademyListComponent_ng_container_0_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 54)(1, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "course-edit", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("send", function AcademyListComponent_ng_container_0_ng_template_36_Template_course_edit_send_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r32);
      const ref_r30 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ref_r30.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ref_r30 = ctx.$implicit;
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ref_r30.data.course ? "Update Course" : "Create Course");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("course", ref_r30.data == null ? null : ref_r30.data.course)("categories", vm_r1.categories);
  }
}
function AcademyListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1)(2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 3)(4, "g", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "circle", 5)(6, "circle", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7)(8, "h2", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "FUSE ACADEMY");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " What do you want to learn today? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Our courses will step you through the process of a building small applications, or adding new features to existing applications. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11)(15, "div", 12)(16, "div", 13)(17, "mat-form-field", 14)(18, "mat-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectionChange", function AcademyListComponent_ng_container_0_Template_mat_select_selectionChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r34.filterByCategory($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "All");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, AcademyListComponent_ng_container_0_ng_container_21_Template, 3, 2, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "mat-form-field", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "input", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function AcademyListComponent_ng_container_0_Template_input_input_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](25);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r36.filterByQuery(_r3.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-slide-toggle", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function AcademyListComponent_ng_container_0_Template_mat_slide_toggle_change_26_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r37.toggleCompleted($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " Hide completed ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcademyListComponent_ng_container_0_Template_button_click_28_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](37);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r38.openDialog(_r7, {
        course: null
      }));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "span", 24)(30, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Add Course");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "mat-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, AcademyListComponent_ng_container_0_ng_container_33_Template, 3, 2, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, AcademyListComponent_ng_container_0_ng_template_34_Template, 4, 1, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, AcademyListComponent_ng_container_0_ng_template_36_Template, 4, 3, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](35);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "all");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "all");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", vm_r1.categories)("ngForTrackBy", ctx_r0.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("floatLabel", "always");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r1.courses.length)("ngIfElse", _r5);
  }
}
class AcademyListComponent {
  /**
   * Constructor
   */
  constructor(_academyService, dialog, store) {
    this._academyService = _academyService;
    this.dialog = dialog;
    this.store = store;
    this.vm$ = this.store.vm$;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    console.log(localStorage.getItem('accessToken'));
    this.store.loadCategoriesEffect();
    this.store.loadCoursesEffect();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Filter by search query
   *
   * @param query
   */
  filterByQuery(query) {
    this.store.setSearchQuery(query);
  }
  /**
   * Filter by category
   *
   * @param change
   */
  filterByCategory(change) {
    this.store.setCategorySlug(change.value);
  }
  /**
   * Show/hide completed courses
   *
   * @param change
   */
  toggleCompleted(change) {
    this.store.setHideCompleted(change.checked);
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
  openDialog(tpl, {
    course
  }) {
    this.dialog.open(tpl, {
      data: {
        course
      },
      closeButton: false
    });
  }
}
AcademyListComponent.ɵfac = function AcademyListComponent_Factory(t) {
  return new (t || AcademyListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_academy_service__WEBPACK_IMPORTED_MODULE_1__.AcademyService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_academy_store__WEBPACK_IMPORTED_MODULE_3__.AcademyStore));
};
AcademyListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AcademyListComponent,
  selectors: [["academy-list"]],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["cdkScrollable", "", 1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-y-auto"], [1, "relative", "flex-0", "py-8", "px-4", "sm:p-16", "overflow-hidden", "bg-gray-800", "dark"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], [1, "z-10", "relative", "flex", "flex-col", "items-center"], [1, "text-xl", "font-semibold"], [1, "mt-1", "text-4xl", "sm:text-7xl", "font-extrabold", "tracking-tight", "leading-tight", "text-center"], [1, "max-w-2xl", "mt-6", "sm:text-2xl", "text-center", "tracking-tight", "text-secondary"], [1, "flex", "flex-auto", "p-6", "sm:p-10"], [1, "flex", "flex-col", "flex-auto", "w-full", "max-w-xs", "sm:max-w-5xl", "mx-auto"], [1, "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "w-full", "max-w-xs", "sm:max-w-none"], [1, "fuse-mat-no-subscript", "w-full", "sm:w-36"], [3, "value", "selectionChange"], [3, "value"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "fuse-mat-no-subscript", "w-full", "sm:w-72", "mt-4", "sm:mt-0", "sm:ml-4", 3, "floatLabel"], ["matPrefix", "", 1, "icon-size-5", 3, "svgIcon"], ["placeholder", "Search by title or description", "matInput", "", 3, "input"], ["query", ""], [1, "mt-8", "sm:mt-0", "sm:ml-auto", 3, "color", "change"], ["mat-stroked-button", "", 1, "ml-4", 3, "click"], [1, "inline-flex", "items-center"], [1, "ml-1.5", "icon-size-5", 3, "svgIcon"], [4, "ngIf", "ngIfElse"], ["noCourses", ""], ["editCourseTpl", ""], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-8", "mt-8", "sm:mt-10"], [1, "flex", "flex-col", "h-96", "shadow", "rounded-2xl", "overflow-hidden", "bg-card"], [1, "flex", "flex-col", "p-6"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center"], [1, "mt-4", "text-lg", "font-medium"], [1, "mt-0.5", "line-clamp-2", "text-secondary"], [1, "w-12", "h-1", "my-6", "border-t-2"], [1, "flex", "items-center", "leading-5", "text-md", "text-secondary"], [1, "icon-size-5", "text-hint", 3, "svgIcon"], [1, "ml-1.5"], [1, "flex", "items-center", "mt-2", "leading-5", "text-md", "text-secondary"], [1, "flex", "flex-col", "w-full", "mt-auto"], [1, "relative", "h-0.5"], [1, "z-10", "absolute", "inset-x-0", "h-6", "-mt-3", 3, "matTooltip", "matTooltipPosition", "matTooltipClass"], [1, "h-0.5", 3, "value"], [1, "px-2", "py-4", "flex", "flex-row", "justify-between", "bg-gray-50", "dark:bg-transparent"], ["mat-stroked-button", "", 3, "routerLink"], ["mat-stroked-button", "", 3, "click"], [1, "py-0.5", "px-3", "rounded-full", "text-sm", "font-semibold", 3, "ngClass"], [1, "icon-size-5", "text-green-600", 3, "svgIcon", "matTooltip"], [1, "ml-1"], [1, "flex", "flex-auto", "flex-col", "items-center", "justify-center", "bg-gray-100", "dark:bg-transparent"], [1, "icon-size-20", 3, "svgIcon"], [1, "mt-6", "text-2xl", "font-semibold", "tracking-tight", "text-secondary"], [1, "flex-grow", "flex", "flex-col", "p-4", "gap-2"], [1, "text-semibold", "text-gray-800", "dark:text-white", "text-lg", "bg-gray-100", "dark:bg-gray-800", "px-6", "py-4", 2, "border-radius", "10px 10px 0px 0px"], [1, "flex", "flex-col", "bg-gray-100", "dark:bg-gray-800", "px-6", "py-4", 2, "border-radius", "0px 0px 10px 10px", 3, "course", "categories", "send"]],
  template: function AcademyListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AcademyListComponent_ng_container_0_Template, 38, 10, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__.CdkScrollable, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatPrefix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__.MatProgressBar, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__.MatSlideToggle, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__.MatTooltip, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _course_edit_course_edit_component__WEBPACK_IMPORTED_MODULE_16__.CourseEditComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.PercentPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.I18nPluralPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 928632:
/*!******************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/academy/step-edit/step-edit.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StepEditComponent": () => (/* binding */ StepEditComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _academy_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../academy.store */ 378220);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/transloco */ 846367);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../ui/form/src/lib/web-ui-form.component */ 834077);













function StepEditComponent_ui_form_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-form", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitForm", function StepEditComponent_ui_form_2_Template_ui_form_submitForm_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.onSubmit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ui-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StepEditComponent_ui_form_2_Template_ui_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r4.send.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx_r0.form)("fields", ctx_r0.fields)("model", ctx_r0.model)("options", ctx_r0.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r0.form.valid)("label", t_r1("save"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", t_r1("discard"));
  }
}
class StepEditComponent {
  constructor(formService, toast, store) {
    this.formService = formService;
    this.toast = toast;
    this.store = store;
    this.send = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({});
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
  }
  ngOnInit() {
    var _a;
    console.log(this.courseId, this.step);
    this.model = {
      courseId: this.courseId
    };
    if (this.step) {
      this.model = Object.assign(Object.assign({}, this.model), {
        title: this.step.title,
        subtitle: this.step.subtitle,
        content: this.step.content
      });
    }
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('title', {
      label: 'Title',
      required: true
    }, {
      className: 'w-full px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('subtitle', {
      label: 'SubTitle',
      required: true
    }, {
      className: 'w-full px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.markdown('content', {
      label: 'Content',
      value: (_a = this.step) === null || _a === void 0 ? void 0 : _a.content
    }, {
      className: 'w-full px-1'
    })])];
  }
  onSubmit($event) {
    if (this.step) {
      console.log(this.step);
      this.store.updateCourseStepEffect({
        input: $event,
        stepId: this.step.id,
        sendEmitter: this.send
      });
    } else {
      this.store.createCourseStepEffect({
        input: $event,
        sendEmitter: this.send
      });
    }
  }
}
StepEditComponent.ɵfac = function StepEditComponent_Factory(t) {
  return new (t || StepEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_4__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_academy_store__WEBPACK_IMPORTED_MODULE_5__.AcademyStore));
};
StepEditComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: StepEditComponent,
  selectors: [["step-edit"]],
  inputs: {
    courseId: "courseId",
    step: "step"
  },
  outputs: {
    send: "send"
  },
  decls: 3,
  vars: 0,
  consts: [[1, "flex", "flex-col", "flex-grow"], [1, "w-full", "h-full"], [3, "form", "fields", "model", "options", "submitForm", 4, "transloco"], [3, "form", "fields", "model", "options", "submitForm"], ["type", "submit", 1, "mr-2", 3, "disabled", "label"], ["type", "button", 3, "label", "click"]],
  template: function StepEditComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, StepEditComponent_ui_form_2_Template, 3, 7, "ui-form", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    }
  },
  dependencies: [_ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__.TranslocoDirective, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__.WebUiButtonComponent, _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__.WebUiFormComponent],
  encapsulation: 2
});

/***/ })

}]);