"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_modules_admin_apps_scrumboard_scrumboard_module_ts"],{

/***/ 426792:
/*!*************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/board/add-card/add-card.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrumboardBoardAddCardComponent": () => (/* binding */ ScrumboardBoardAddCardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/text-field */ 139349);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 836895);









const _c0 = ["titleInput"];
const _c1 = ["titleAutosize"];
const _c2 = function (a0) {
  return {
    "opacity-0 pointer-events-none": a0
  };
};
const _c3 = function (a0) {
  return {
    "opacity-0": a0
  };
};
class ScrumboardBoardAddCardComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _formBuilder) {
    this._changeDetectorRef = _changeDetectorRef;
    this._formBuilder = _formBuilder;
    this.buttonTitle = 'Add a card';
    this.saved = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.formVisible = false;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Initialize the new list form
    this.form = this._formBuilder.group({
      title: ['']
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Save
   */
  save() {
    // Get the new list title
    const title = this.form.get('title').value;
    // Return, if the title is empty
    if (!title || title.trim() === '') {
      return;
    }
    // Execute the observable
    this.saved.next(title.trim());
    // Clear the new list title and hide the form
    this.formVisible = false;
    this.form.get('title').setValue('');
    // Reset the size of the textarea
    setTimeout(() => {
      this.titleInput.nativeElement.value = '';
      this.titleAutosize.reset();
    });
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Toggle the visibility of the form
   */
  toggleFormVisibility() {
    // Toggle the visibility
    this.formVisible = !this.formVisible;
    // If the form becomes visible, focus on the title field
    if (this.formVisible) {
      this.titleInput.nativeElement.focus();
    }
  }
}
ScrumboardBoardAddCardComponent.ɵfac = function ScrumboardBoardAddCardComponent_Factory(t) {
  return new (t || ScrumboardBoardAddCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder));
};
ScrumboardBoardAddCardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ScrumboardBoardAddCardComponent,
  selectors: [["scrumboard-board-add-card"]],
  viewQuery: function ScrumboardBoardAddCardComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.titleInput = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.titleAutosize = _t.first);
    }
  },
  inputs: {
    buttonTitle: "buttonTitle"
  },
  outputs: {
    saved: "saved"
  },
  decls: 17,
  vars: 18,
  consts: [[1, "p-3", "pt-0"], [1, "relative", "flex", "w-full", "h-full", "rounded-lg"], ["mat-button", "", "disableRipple", "", 1, "absolute", "inset-0", "justify-center", "w-full", "px-5", "py-6", "rounded-lg", "border-1", "border-dashed", "border-gray-300", 3, "ngClass", "click"], [1, "icon-size-6", 3, "svgIcon"], [1, "ml-1", "text-secondary", "text-lg", "font-semibold"], [1, "flex", "flex-col", "items-start", "w-full", 3, "ngClass", "formGroup"], [1, "flex", "w-full", "p-5", "rounded-lg", "shadow", "bg-card"], ["cdkTextareaAutosize", "", 1, "w-full", "text-lg", "font-medium", "leading-6", "h-10", "rounded-md", 3, "spellcheck", "formControlName", "placeholder", "keydown.enter"], ["titleInput", "", "titleAutosize", "cdkTextareaAutosize"], [1, "flex", "items-center", "mt-2"], ["mat-flat-button", "", 1, "h-8", "min-h-8", "text-white", 3, "type", "color", "click"], ["mat-flat-button", "", 1, "h-8", "min-h-8", "text-white", "ml-3", "bg-red-500", 3, "type", "color", "click"]],
  template: function ScrumboardBoardAddCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScrumboardBoardAddCardComponent_Template_button_click_2_listener() {
        return ctx.toggleFormVisibility();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 5)(7, "div", 6)(8, "textarea", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown.enter", function ScrumboardBoardAddCardComponent_Template_textarea_keydown_enter_8_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "                ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9)(13, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScrumboardBoardAddCardComponent_Template_button_click_13_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Add card ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScrumboardBoardAddCardComponent_Template_button_click_15_listener() {
        return ctx.toggleFormVisibility();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Cancel ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("h-13", !ctx.formVisible);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](14, _c2, ctx.formVisible));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.buttonTitle);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](16, _c3, !ctx.formVisible))("formGroup", ctx.form);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("spellcheck", "off")("formControlName", "title")("placeholder", "Enter card title...");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("type", "button")("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("type", "button")("color", "warning");
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_4__.CdkTextareaAutosize, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 674764:
/*!*************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/board/add-list/add-list.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrumboardBoardAddListComponent": () => (/* binding */ ScrumboardBoardAddListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);







const _c0 = ["titleInput"];
const _c1 = function (a0) {
  return {
    "opacity-0 pointer-events-none": a0
  };
};
const _c2 = function (a0) {
  return {
    "opacity-0": a0
  };
};
class ScrumboardBoardAddListComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _formBuilder) {
    this._changeDetectorRef = _changeDetectorRef;
    this._formBuilder = _formBuilder;
    this.buttonTitle = 'Add a list';
    this.saved = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.formVisible = false;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Initialize the new list form
    this.form = this._formBuilder.group({
      title: ['']
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Save
   */
  save() {
    // Get the new list title
    const title = this.form.get('title').value;
    // Return, if the title is empty
    if (!title || title.trim() === '') {
      return;
    }
    // Execute the observable
    this.saved.next(title.trim());
    // Clear the new list title and hide the form
    this.form.get('title').setValue('');
    this.formVisible = false;
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Toggle the visibility of the form
   */
  toggleFormVisibility() {
    // Toggle the visibility
    this.formVisible = !this.formVisible;
    // If the form becomes visible, focus on the title field
    if (this.formVisible) {
      this.titleInput.nativeElement.focus();
    }
  }
}
ScrumboardBoardAddListComponent.ɵfac = function ScrumboardBoardAddListComponent_Factory(t) {
  return new (t || ScrumboardBoardAddListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder));
};
ScrumboardBoardAddListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ScrumboardBoardAddListComponent,
  selectors: [["scrumboard-board-add-list"]],
  viewQuery: function ScrumboardBoardAddListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.titleInput = _t.first);
    }
  },
  inputs: {
    buttonTitle: "buttonTitle"
  },
  outputs: {
    saved: "saved"
  },
  decls: 14,
  vars: 18,
  consts: [[1, "mt-14", "w-100"], [1, "relative", "flex", "w-full", "h-full", "overflow-hidden", "rounded-lg"], ["mat-button", "", "disableRipple", "", 1, "absolute", "inset-0", "justify-center", "w-full", "px-5", "py-6", "rounded-lg", "border-1", "border-dashed", "border-gray-300", 3, "ngClass", "click"], [1, "icon-size-6", 3, "svgIcon"], [1, "m1-1", "text-lg", "font-semibold"], [1, "flex", "flex-col", "items-start", "w-full", "p-3", 3, "ngClass", "formGroup"], [1, "w-full", "py-2", "px-3", "leading-5", "rounded-md", "shadow-sm", "border", "border-gray-300", "bg-white", "focus:border-primary", "dark:border-gray-500", "dark:focus:border-primary", "dark:bg-black", "dark:bg-opacity-5", 3, "autocomplete", "formControlName", "placeholder", "keydown.enter"], ["titleInput", ""], [1, "flex", "items-center", "mt-2"], ["mat-flat-button", "", 1, "h-8", "min-h-8", "text-white", 3, "color", "type", "click"], ["mat-flat-button", "", 1, "h-8", "min-h-8", "text-white", "ml-3", "bg-red-500", 3, "type", "color", "click"]],
  template: function ScrumboardBoardAddListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScrumboardBoardAddListComponent_Template_button_click_2_listener() {
        return ctx.toggleFormVisibility();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 5)(7, "input", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown.enter", function ScrumboardBoardAddListComponent_Template_input_keydown_enter_7_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8)(10, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScrumboardBoardAddListComponent_Template_button_click_10_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Add list ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScrumboardBoardAddListComponent_Template_button_click_12_listener() {
        return ctx.toggleFormVisibility();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Cancel ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("h-15", !ctx.formVisible);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](14, _c1, ctx.formVisible));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.buttonTitle);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](16, _c2, !ctx.formVisible))("formGroup", ctx.form);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autocomplete", "off")("formControlName", "title")("placeholder", "Enter list title...");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("type", "button");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("type", "button")("color", "warning");
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 512570:
/*!*************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/board/board.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrumboardBoardComponent": () => (/* binding */ ScrumboardBoardComponent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 573555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _board_details_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./board.details.store */ 252732);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/services/confirmation */ 50253);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/scrolling */ 867376);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_board_add_card_add_card_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/board/add-card/add-card.component */ 426792);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_board_add_list_add_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/board/add-list/add-list.component */ 674764);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_card_details_details_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/card/details/details.component */ 632237);
























const _c0 = ["dlg"];
function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const card_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", card_r9.coverImage, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_5_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", label_r16.title, " ");
  }
}
function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div")(2, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_5_ng_container_3_Template, 3, 1, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const card_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", card_r9.labels)("ngForTrackBy", ctx_r11.trackByFn);
  }
}
function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
}
function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_7_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39)(2, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const board_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" +", board_r3.members.slice(5).length, " ");
  }
}
function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_7_ng_container_2_Template, 2, 0, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_7_ng_container_3_Template, 4, 1, "ng-container", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const board_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3).ngIf;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", board_r3.members.slice(0, 5))("ngForTrackBy", ctx_r12.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (board_r3.members == null ? null : board_r3.members.length) > 5);
  }
}
const _c1 = function (a0) {
  return {
    "text-violet-800": a0
  };
};
function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const card_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c1, ctx_r13.isOverdue(card_r9.dueDate)));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:clock");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](5, 3, card_r9.dueDate, "longDate"), " ");
  }
}
function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r25);
      const card_r9 = restoredCtx.$implicit;
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      ctx_r24.store.selectCard(card_r9);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r24.open());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_2_Template, 3, 1, "ng-container", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_5_Template, 4, 2, "ng-container", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_7_Template, 4, 3, "ng-container", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_ng_container_8_Template, 6, 8, "ng-container", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const card_r9 = ctx.$implicit;
    const board_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", card_r9.coverImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](card_r9.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", card_r9.labels == null ? null : card_r9.labels.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", board_r3.members == null ? null : board_r3.members.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", card_r9.dueDate);
  }
}
function ScrumboardBoardComponent_div_0_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 16)(2, "div", 17)(3, "div", 18)(4, "input", 19, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("focusout", function ScrumboardBoardComponent_div_0_ng_container_15_Template_input_focusout_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const list_r5 = restoredCtx.$implicit;
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r27.updateListTitle($event, list_r5));
    })("keydown.enter", function ScrumboardBoardComponent_div_0_ng_container_15_Template_input_keydown_enter_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](_r6.blur());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 22)(9, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "mat-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-menu", null, 25)(13, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ScrumboardBoardComponent_div_0_ng_container_15_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](5);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r30.renameList(_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "mat-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " Rename list ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ScrumboardBoardComponent_div_0_ng_container_15_Template_button_click_16_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const list_r5 = restoredCtx.$implicit;
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r31.deleteList(list_r5.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "mat-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, " Delete list ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 27)(20, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("cdkDropListDropped", function ScrumboardBoardComponent_div_0_ng_container_15_Template_div_cdkDropListDropped_20_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r32.cardDropped($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, ScrumboardBoardComponent_div_0_ng_container_15_ng_container_21_Template, 9, 5, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "scrumboard-board-add-card", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("saved", function ScrumboardBoardComponent_div_0_ng_container_15_Template_scrumboard_board_add_card_saved_22_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const list_r5 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r33.addCard(list_r5, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const list_r5 = ctx.$implicit;
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](12);
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    let tmp_3_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdkDragLockAxis", "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("spellcheck", "false")("value", list_r5.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (tmp_3_0 = list_r5.cards == null ? null : list_r5.cards.length) !== null && tmp_3_0 !== undefined ? tmp_3_0 : 0, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matMenuTriggerFor", _r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:dots-vertical");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:pencil-alt");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:trash");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("id", list_r5.id)("cdkDropListData", list_r5.cards);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", list_r5.cards)("ngForTrackBy", ctx_r4.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("buttonTitle", (list_r5.cards == null ? null : list_r5.cards.length) ? "Add another card" : "Add a card");
  }
}
const _c2 = function () {
  return [".."];
};
function ScrumboardBoardComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "h2", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 7)(6, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Boards ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, " Settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 11)(13, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("cdkDropListDropped", function ScrumboardBoardComponent_div_0_Template_div_cdkDropListDropped_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r34.listDropped($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, ScrumboardBoardComponent_div_0_ng_container_15_Template, 23, 13, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "scrumboard-board-add-list", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("saved", function ScrumboardBoardComponent_div_0_Template_scrumboard_board_add_list_saved_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r35);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r36.addList($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const board_r3 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", board_r3.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](9, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:view-boards");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:cog");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdkDropListData", board_r3.lists)("cdkDropListOrientation", "horizontal");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", board_r3.lists)("ngForTrackBy", ctx_r0.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("buttonTitle", (board_r3.lists == null ? null : board_r3.lists.length) ? "Add another list" : "Add a list");
  }
}
function ScrumboardBoardComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "scrumboard-card-details");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class ScrumboardBoardComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _formBuilder, store, dialog, _fuseConfirmationService) {
    this._changeDetectorRef = _changeDetectorRef;
    this._formBuilder = _formBuilder;
    this.store = store;
    this.dialog = dialog;
    this._fuseConfirmationService = _fuseConfirmationService;
    this._maxListCount = 200;
    this._positionStep = 65536;
    this._maxPosition = this._positionStep * 500;
    this.board$ = this.store.board$;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Initialize the list title form
    this.listTitleForm = this._formBuilder.group({
      title: ['']
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
   * Focus on the given element to start editing the list title
   *
   * @param listTitleInput
   */
  renameList(listTitleInput) {
    // Use timeout so it can wait for menu to close
    setTimeout(() => {
      listTitleInput.focus();
    });
  }
  /**
   * Add new list
   *
   * @param title
   */
  addList(title) {
    this.store.addListEffect(title);
  }
  /**
   * Update the list title
   *
   * @param event
   * @param list
   */
  updateListTitle(event, list) {
    // Get the target element
    const element = event.target;
    // Get the new title
    const newTitle = element.value;
    // If the title is empty...
    if (!newTitle || newTitle.trim() === '') {
      // Reset to original title and return
      element.value = list.title;
      return;
    }
    if (list.title !== newTitle.trim()) this.store.renameBoardListEffect({
      listId: list.id,
      title: newTitle.trim()
    });
  }
  /**
   * Delete the list
   *
   * @param id
   */
  deleteList(id) {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete list',
      message: 'Are you sure you want to delete this list and its cards? This action cannot be undone!',
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
        this.store.deleteBoardListEffect(id);
      }
    });
  }
  /**
   * Add new card
   */
  addCard(list, title) {
    // Create a new card model
    const card = {
      boardListId: list.id,
      title: title
    };
    // Save the card
    this.store.addCardEffect(card);
  }
  /**
   * List dropped
   *
   * @param event
   */
  listDropped(event) {
    // Move the item
    (0,_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.moveItemInArray)(event.container.data, event.previousIndex, event.currentIndex);
    // Calculate the positions
    const updated = this._calculatePositions(event);
    console.log(updated);
    if ((updated === null || updated === void 0 ? void 0 : updated.length) > 0) {
      const {
        id,
        position
      } = updated[0];
      this.store.changeListPositionEffect({
        boardListId: id,
        position
      });
    }
  }
  /**
   * Card dropped
   *
   * @param event
   */
  cardDropped(event) {
    // Move or transfer the item
    if (event.previousContainer === event.container) {
      // Move the item
      (0,_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.moveItemInArray)(event.container.data, event.previousIndex, event.currentIndex);
      const updated = this._calculatePositions(event);
      const {
        boardListId
      } = updated[0];
      const boardList = [event.container.data[event.previousIndex], event.container.data[event.currentIndex]];
      console.log("data: ", event);
      for (const item of boardList) {
        //console.log(item)
        const {
          id,
          title,
          description,
          position,
          dueDate
        } = item;
        this.store.updateCardEffect({
          id,
          title,
          description,
          boardListId,
          position,
          dueDate
        });
      }
      //console.log("Moved in one container: ", updated)
    } else {
      // Transfer the item
      (0,_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.transferArrayItem)(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // Update the card's list it
      //const updated = this._calculatePositions(event);
      //const {boardListId} = event.previousContainer.data
      event.container.data[event.currentIndex].listId = event.container.id;
      const boardListId = event.container.id;
      const {
        id,
        title,
        description,
        position,
        dueDate
      } = event.container.data[event.currentIndex];
      this.store.updateCardEffect({
        id,
        title,
        description,
        boardListId,
        position,
        dueDate
      });
      console.log("Moved in other container", event);
    }
    // Calculate the positions
    const updated = this._calculatePositions(event);
    // Update the cards
    // this._scrumboardService.updateCards(updated).subscribe();
  }
  /**
   * Check if the given ISO_8601 date string is overdue
   *
   * @param date
   */
  isOverdue(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0__(date, moment__WEBPACK_IMPORTED_MODULE_0__.ISO_8601).isBefore(moment__WEBPACK_IMPORTED_MODULE_0__(), 'days');
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
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Calculate and set item positions
   * from given CdkDragDrop event
   *
   * @param event
   * @private
   */
  _calculatePositions(event) {
    // Get the items
    let items = event.container.data;
    const currentItem = items[event.currentIndex];
    const prevItem = items[event.currentIndex - 1] || null;
    const nextItem = items[event.currentIndex + 1] || null;
    // If the item moved to the top...
    if (!prevItem) {
      // If the item moved to an empty container
      if (!nextItem) {
        currentItem.position = this._positionStep;
      } else {
        currentItem.position = nextItem.position / 2;
      }
    }
    // If the item moved to the bottom...
    else if (!nextItem) {
      currentItem.position = prevItem.position + this._positionStep;
    }
    // If the item moved in between other items...
    else {
      currentItem.position = (prevItem.position + nextItem.position) / 2;
    }
    // Check if all item positions need to be updated
    if (!Number.isInteger(currentItem.position) || currentItem.position >= this._maxPosition) {
      // Re-calculate all orders
      items = items.map((value, index) => {
        value.position = (index + 1) * this._positionStep;
        return value;
      });
      // Return items
      return items;
    }
    // Return currentItem
    return [currentItem];
  }
  open() {
    this.ref = this.dialog.open(this.dlgTpl);
  }
}
ScrumboardBoardComponent.ɵfac = function ScrumboardBoardComponent_Factory(t) {
  return new (t || ScrumboardBoardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_board_details_store__WEBPACK_IMPORTED_MODULE_5__.BoardDetailsStore), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_7__.FuseConfirmationService));
};
ScrumboardBoardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ScrumboardBoardComponent,
  selectors: [["scrumboard-board"]],
  viewQuery: function ScrumboardBoardComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.dlgTpl = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_board_details_store__WEBPACK_IMPORTED_MODULE_5__.BoardDetailsStore])],
  decls: 6,
  vars: 3,
  consts: [["class", "absolute inset-0 flex flex-col min-w-0 overflow-hidden", 4, "ngIf"], [1, "absolute", "invisible", "w-0", "h-0", "opacity-0", "pointer-events-none"], ["dlg", ""], [1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "flex", "flex-col", "sm:flex-row", "flex-0", "sm:items-center", "sm:justify-between", "p-6", "sm:py-6", "sm:px-10", "border-b", "bg-card", "dark:bg-transparent"], [1, "flex-1", "min-w-0"], [1, "text-3xl", "md:text-4xl", "font-extrabold", "tracking-tight", "leading-7", "sm:leading-10", "truncate"], [1, "flex", "shrink-0", "items-center", "mt-6", "sm:mt-0", "sm:ml-4"], ["mat-stroked-button", "", 3, "routerLink"], [1, "icon-size-5", "mr-2", 3, "svgIcon"], ["mat-stroked-button", "", 1, "ml-3"], ["cdkScrollable", "", 1, "flex-auto", "p-6", "sm:p-8", "sm:pt-4", "bg-gray-50", "overflow-y-auto"], ["cdkDropList", "", 1, "flex", 3, "cdkDropListData", "cdkDropListOrientation", "cdkDropListDropped"], ["cdkDropListGroup", "", 1, "flex", "items-start"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "buttonTitle", "saved"], ["cdkDrag", "", 1, "flex-0", "w-100", "rounded-2xl", "bg-gray-50", 3, "cdkDragLockAxis"], ["cdkDragHandle", "", 1, "flex", "items-center", "justify-between"], [1, "flex", "items-center", "w-full", "py-2", "px-3", "rounded-md", "cursor-text", "border", "border-transparent", "focus-within:bg-white", "focus-within:shadow-sm", "focus-within:border-primary", "dark:focus-within:bg-gray-900"], [1, "w-full", "font-semibold", "text-lg", "leading-6", "px-2", "bg-transparent", 3, "spellcheck", "value", "focusout", "keydown.enter"], ["listTitleInput", ""], [1, "flex", "items-center", "justify-center", "min-w-6", "ml-4", "text-sm", "font-semibold", "leading-6", "rounded-full", "bg-gray-200", "text-secondary", "dark:bg-gray-700"], [1, "ml-1"], ["mat-icon-button", "", 1, "w-8", "h-8", "min-h-8", 3, "matMenuTriggerFor"], [1, "icon-size-5", 3, "svgIcon"], ["listMenu", "matMenu"], ["mat-menu-item", "", 3, "click"], [1, "mt-2", "rounded-xl", "bg-gray-50", "dark:bg-transparent", "dark:border"], ["cdkDropList", "", 1, "p-2", "pb-0", "cursor-pointer", 3, "id", "cdkDropListData", "cdkDropListDropped"], ["cdkDrag", "", 1, "flex", "flex-col", "items-start", "mb-4", "p-5", "space-y-3", "shadow", "rounded-lg", "overflow-hidden", "bg-card", 3, "click"], [4, "ngIf"], [1, "text-lg", "font-semibold", "leading-6"], [1, "flex", "items-center", "justify-between", "w-full"], [1, "-mx-5", "-mt-5", "mb-2"], ["alt", "Card Image", 1, "w-full", "object-cover", 3, "src"], [1, "flex", "flex-wrap", "-mx-1", "-mb-2"], [1, "mx-1", "mb-2", "py-0.5", "px-3", "rounded-full", "text-sm", "font-medium", "text-gray-500", "bg-gray-100", "dark:text-gray-300", "dark:bg-gray-700"], [1, "flex", "items-center-space-x-1.5"], ["src", "assets/images/avatars/female-03.jpg", "alt", "Member avatar", 1, "flex-0", "w-8", "h-8", "rounded-full", "ring", "ring-offset-1", "ring-bg-card", "ring-offset-transparent", "object-cover"], [1, "flex", "flex-0", "items-center", "justify-center", "w-8", "h-8", "rounded-full", "ring", "ring-offset-1", "ring-bg-card", "ring-offset-transparent", "bg-gray-200", "text-gray-500"], [1, "text-md", "font-semibold"], [1, "flex", "items-center", "rounded", "text-base", "font-semibold", "leading-6", "bg-violet-100", "text-violet-800", "px-2", 3, "ngClass"], [1, "icon-size-4", "text-current", 3, "svgIcon"], [1, "w-auto", "h-auto", "min-w-80", "min-h-26", 2, "overflow", "auto"]],
  template: function ScrumboardBoardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, ScrumboardBoardComponent_div_0_Template, 17, 10, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ScrumboardBoardComponent_ng_template_4_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 1, ctx.board$));
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__.CdkScrollable, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.CdkDropList, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.CdkDropListGroup, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.CdkDrag, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.CdkDragHandle, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuTrigger, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, libs_web_modules_admin_apps_scrumboard_board_add_card_add_card_component__WEBPACK_IMPORTED_MODULE_14__.ScrumboardBoardAddCardComponent, libs_web_modules_admin_apps_scrumboard_board_add_list_add_list_component__WEBPACK_IMPORTED_MODULE_15__.ScrumboardBoardAddListComponent, libs_web_modules_admin_apps_scrumboard_card_details_details_component__WEBPACK_IMPORTED_MODULE_16__.ScrumboardCardDetailsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.DatePipe],
  styles: [".cdk-drag-preview {\n  --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);\n  --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.cdk-drag-placeholder {\n  opacity: 0;\n}\n\n.cdk-drag-animating {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.cdk-drop-list-dragging div:not(.cdk-drag-placeholder) {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}"],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 252732:
/*!*****************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/board/board.details.store.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoardDetailsStore": () => (/* binding */ BoardDetailsStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 911365);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 134793);











class BoardDetailsStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(loading, toast, data, route) {
    super({
      query: "",
      loading: false,
      done: false
    });
    this.loading = loading;
    this.toast = toast;
    this.data = data;
    this.route = route;
    this._maxListCount = 200;
    this._positionStep = 65536;
    this._maxPosition = this._positionStep * 500;
    this.loading$ = this.select(s => s.loading);
    this.selectedCard$ = this.select(s => s.selectedCard);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.boardOrigin$ = this.select(s => s.board);
    this.board$ = this.select(this.boardOrigin$, boardOrigin => {
      var _a, _b;
      console.log("boardOrigin: ", boardOrigin);
      const lists = (_b = (_a = boardOrigin === null || boardOrigin === void 0 ? void 0 : boardOrigin.lists) === null || _a === void 0 ? void 0 : _a.sort((a, b) => a.position - b.position)) !== null && _b !== void 0 ? _b : [];
      const sortedList = [];
      lists === null || lists === void 0 ? void 0 : lists.forEach(item => {
        var _a;
        sortedList.push(Object.assign(Object.assign({}, item), {
          cards: (_a = item === null || item === void 0 ? void 0 : item.cards) === null || _a === void 0 ? void 0 : _a.sort((a, b) => a.position - b.position)
        }));
      });
      return Object.assign(Object.assign({}, boardOrigin), {
        lists: sortedList
      });
    });
    this.vm$ = this.select(this.loading$, loading => ({
      loading
    }));
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.selectCard = this.updater((state, selectedCard) => Object.assign(Object.assign({}, state), {
      selectedCard
    }));
    this.addList = this.updater((state, list) => {
      return Object.assign(Object.assign({}, state), {
        board: Object.assign(Object.assign({}, state.board), {
          lists: [...state.board.lists, list]
        })
      });
    });
    this.updateList = this.updater((state, list) => {
      return Object.assign(Object.assign({}, state), {
        board: Object.assign(Object.assign({}, state.board), {
          lists: [...state.board.lists.map(boardList => {
            if (list.id === boardList.id) return list;else return boardList;
          })]
        })
      });
    });
    this.deleteList = this.updater((state, deleted) => {
      return Object.assign(Object.assign({}, state), {
        board: Object.assign(Object.assign({}, state.board), {
          lists: [...state.board.lists.filter(boardList => {
            return boardList.id !== deleted.id;
          })]
        })
      });
    });
    this.addCard = this.updater((state, newCard) => {
      return Object.assign(Object.assign({}, state), {
        board: Object.assign(Object.assign({}, state.board), {
          lists: [...state.board.lists.map(boardList => {
            if (newCard.boardListId === boardList.id) {
              return Object.assign(Object.assign({}, boardList), {
                cards: [...boardList.cards, newCard]
              });
            } else return boardList;
          })]
        })
      });
    });
    this.updateCard = this.updater((state, updateCard) => {
      return Object.assign(Object.assign({}, state), {
        board: Object.assign(Object.assign({}, state.board), {
          lists: [...state.board.lists.map(boardList => {
            if (updateCard.boardListId === boardList.id) {
              return Object.assign(Object.assign({}, boardList), {
                cards: [...boardList.cards]
              });
            } else return boardList;
          })]
        })
      });
    });
    this.loadBoardEffect = this.effect(boardId$ => boardId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(boardId => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(boardId => this.data.userBoard({
      boardId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.patchState({
        loading: false,
        board: res.data.board
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.addListEffect = this.effect(title$ => title$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(title => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.board$), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([title, board]) => {
      var _a, _b;
      // Limit the max list count
      if (((_a = board.lists) === null || _a === void 0 ? void 0 : _a.length) >= this._maxListCount) {
        this.toast.error('Cannot add another list because of max list size');
        return rxjs__WEBPACK_IMPORTED_MODULE_4__.EMPTY;
      }
      const input = {
        position: ((_b = board.lists) === null || _b === void 0 ? void 0 : _b.length) ? board.lists[board.lists.length - 1].position + this._positionStep : this._positionStep,
        title,
        boardId: board.id
      };
      return this.data.userCreateBoardList({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.toast.success('Successfully added new list', {
          duration: 3000
        });
        this.addList(res.data.created);
        this.patchState({
          loading: false
        });
      }, error => {
        this.toast.error("Failed to ", {
          duration: 3000
        });
        this.patchState({
          loading: false
        });
      }));
    })));
    this.renameBoardListEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(({
      listId,
      title
    }) => this.data.userUpdateBoardList({
      boardListId: listId,
      input: {
        title
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success('Successfully renamed list', {
        duration: 3000
      });
      this.updateList(res.data.updated);
      this.patchState({
        loading: false
      });
    }, error => {
      this.toast.error("Failed to rename", {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
    this.deleteBoardListEffect = this.effect(boardListId$ => boardListId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(boardListId => this.data.userDeleteBoardList({
      boardListId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success('Successfully deleted list', {
        duration: 3000
      });
      this.deleteList(res.data.deleted);
      this.patchState({
        loading: false
      });
    }, error => {
      this.toast.error("Failed to delete list", {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
    this.addCardEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(input => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.board$), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([input, board]) => {
      var _a;
      const list = board.lists.find(el => el.id === input.boardListId);
      input.position = ((_a = list.cards) === null || _a === void 0 ? void 0 : _a.length) ? list.cards[list.cards.length - 1].position + this._positionStep : this._positionStep;
      return this.data.userCreateBoardCard({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.toast.success('Successfully added card', {
          duration: 3000
        });
        this.addCard(res.data.created);
        console.log(res.data.created);
        this.patchState({
          loading: false
        });
      }, error => {
        this.toast.error("Failed to add card", {
          duration: 3000
        });
        this.patchState({
          loading: false
        });
      }));
    })));
    this.updateCardEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => {
      return this.data.userUpdateBoardCard({
        boardCardId: data.id,
        input: data
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.toast.success('Successfully updated card', {
          duration: 3000
        });
        this.updateCard(res.data.updated);
        console.log("Updated BoardCard: ", res.data.updated);
        this.patchState({
          loading: false
        });
      }, error => {
        this.toast.error("Failed to update card", {
          duration: 3000
        });
        this.patchState({
          loading: false
        });
      }));
    })));
    this.changeListPositionEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(input => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => {
      const {
        boardListId,
        position
      } = input;
      return this.data.userUpdateBoardList({
        boardListId,
        input: {
          position
        }
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.toast.success('Successfully updated', {
          duration: 3000
        });
        this.patchState({
          loading: false
        });
      }, error => {
        this.toast.error("Failed to update", {
          duration: 3000
        });
        this.patchState({
          loading: false
        });
      }));
    })));
    if (this.route.snapshot.paramMap.has('boardId')) {
      const boardId = this.route.snapshot.paramMap.get('boardId');
      this.loadBoardEffect(boardId);
    }
  }
}
BoardDetailsStore.ɵfac = function BoardDetailsStore_Factory(t) {
  return new (t || BoardDetailsStore)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
};
BoardDetailsStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: BoardDetailsStore,
  factory: BoardDetailsStore.ɵfac
});

/***/ }),

/***/ 424455:
/*!***************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/boards/board.list.store.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoardListStore": () => (/* binding */ BoardListStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);









class BoardListStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(loading, toast, data) {
    super({
      query: "",
      loading: false,
      boards: [],
      done: false
    });
    this.loading = loading;
    this.toast = toast;
    this.data = data;
    this.loading$ = this.select(s => s.loading);
    this.boards$ = this.select(s => s.boards);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => s.item);
    this.vm$ = this.select(this.loading$, loading => ({
      loading
    }));
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    this.addBoard = this.updater((state, board) => {
      return Object.assign(Object.assign({}, state), {
        boards: [...state.boards, board]
      });
    });
    this.loadBoardsEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => this.data.userBoards({
      input: {}
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.patchState({
        boards: res.data.boards
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.createBoardEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(input => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.data.userCreateBoard({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success('Successfully created new board', {
        duration: 3000
      });
      this.addBoard(res.data.created);
      setTimeout(() => this.patchState({
        item: res.data.created,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, error => {
      this.toast.error("Failed to ", {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
  }
}
BoardListStore.ɵfac = function BoardListStore_Factory(t) {
  return new (t || BoardListStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService));
};
BoardListStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: BoardListStore,
  factory: BoardListStore.ɵfac
});

/***/ }),

/***/ 83921:
/*!***************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/boards/boards.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrumboardBoardsComponent": () => (/* binding */ ScrumboardBoardsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _board_list_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./board.list.store */ 424455);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/scrolling */ 867376);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 836895);

















const _c0 = ["dlg"];
function ScrumboardBoardsComponent_div_4_ng_container_1_ng_container_8_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const member_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", member_r9.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function ScrumboardBoardsComponent_div_4_ng_container_1_ng_container_8_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 21)(2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const board_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" +", board_r5.members.slice(5).length, " ");
  }
}
function ScrumboardBoardsComponent_div_4_ng_container_1_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ScrumboardBoardsComponent_div_4_ng_container_1_ng_container_8_ng_container_3_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ScrumboardBoardsComponent_div_4_ng_container_1_ng_container_8_ng_container_4_Template, 4, 1, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const board_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", board_r5.members.slice(0, 5))("ngForTrackBy", ctx_r6.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", board_r5.members.length > 5);
  }
}
const _c1 = function (a0) {
  return [a0];
};
function ScrumboardBoardsComponent_div_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 9)(2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ScrumboardBoardsComponent_div_4_ng_container_1_ng_container_8_Template, 5, 3, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 15)(10, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Edited:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const board_r5 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c1, board_r5.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", board_r5.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](board_r5.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](board_r5.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", board_r5.members == null ? null : board_r5.members.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r4.formatDateAsRelative(board_r5.lastActivity));
  }
}
function ScrumboardBoardsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ScrumboardBoardsComponent_div_4_ng_container_1_Template, 14, 8, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ScrumboardBoardsComponent_div_4_Template_div_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r12.open());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "mat-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const boards_r3 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", boards_r3)("ngForTrackBy", ctx_r0.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
  }
}
function ScrumboardBoardsComponent_ng_template_6_form_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function ScrumboardBoardsComponent_ng_template_6_form_4_Template_form_ngSubmit_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r17.submit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "formly-form", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r15.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("model", ctx_r15.model)("fields", ctx_r15.fields)("options", ctx_r15.options)("form", ctx_r15.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r15.form.valid);
  }
}
function ScrumboardBoardsComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23)(1, "p", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Add New Board");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ui-context-provider", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ScrumboardBoardsComponent_ng_template_6_form_4_Template, 5, 6, "form", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("data", ctx_r2.formData);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.fields);
  }
}
class ScrumboardBoardsComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, store, dialog) {
    this._changeDetectorRef = _changeDetectorRef;
    this.store = store;
    this.dialog = dialog;
    // Private
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.boards$ = this.store.boards$;
    this.formData = {};
    this.model = {};
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({});
    this.options = {
      formState: this.formData ? Object.assign({}, this.formData) : {}
    };
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.WebUiFormField.input('title', {
      label: "Title",
      required: true
    }, {
      className: 'w-full'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.WebUiFormField.textarea('description', {
      label: "Description",
      required: true
    }, {
      className: 'w-full'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.WebUiFormField.input('icon', {
      label: "Icon",
      required: true
    }, {
      className: 'w-full'
    })])];
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this.store.loadBoardsEffect();
  }
  /**
   * On destroy
   */
  ngOnDestroy() {}
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Format the given ISO_8601 date as a relative date
   *
   * @param date
   */
  formatDateAsRelative(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0__(date, moment__WEBPACK_IMPORTED_MODULE_0__.ISO_8601).fromNow();
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
  open() {
    this.ref = this.dialog.open(this.dlgTpl, {
      data: {
        value: {}
      },
      closeButton: false,
      height: 'auto',
      width: 'auto'
    });
  }
  submit() {
    const subscriber = this.store.actionResult$.subscribe(result => {
      const {
        done
      } = result;
      if (done) {
        subscriber.unsubscribe();
        this.ref.close();
      }
    });
    this.store.createBoardEffect(this.form.value);
  }
}
ScrumboardBoardsComponent.ɵfac = function ScrumboardBoardsComponent_Factory(t) {
  return new (t || ScrumboardBoardsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_board_list_store__WEBPACK_IMPORTED_MODULE_5__.BoardListStore), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_6__.DialogService));
};
ScrumboardBoardsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ScrumboardBoardsComponent,
  selectors: [["scrumboard-boards"]],
  viewQuery: function ScrumboardBoardsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.dlgTpl = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_board_list_store__WEBPACK_IMPORTED_MODULE_5__.BoardListStore])],
  decls: 8,
  vars: 3,
  consts: [["cdkScrollable", "", 1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-y-auto"], [1, "flex", "flex-col", "flex-auto", "items-center", "p-6", "sm:p-10"], [1, "mt-4", "md:mt-24", "text-3xl", "md:text-6xl", "font-extrabold", "tracking-tight", "leading-7", "sm:leading-10"], ["class", "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 md:mt-16", 4, "ngIf"], ["dlg", ""], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4", "mt-8", "md:mt-16"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-col", "items-center", "justify-center", "w-56", "rounded-lg", "cursor-pointer", "border-2", "border-gray-300", "border-dashed", "hover:bg-hover", "transition-colors", "duration-150", "ease-in-out", 3, "click"], [1, "icon-size-12", "text-hint", 3, "svgIcon"], [1, "flex", "flex-col", "items-start", "w-56", "p-6", "rounded-lg", "shadow", "bg-card", "rounded-lg", "hover:shadow-xl", "transition-shadow", "duration-150", "ease-in-out", 3, "routerLink"], [1, "flex", "items-center", "justify-center", "p-4", "rounded-full", "bg-primary-50", "text-primary-700", "dark:bg-primary", "dark:text-on-primary"], [1, "text-current", 3, "svgIcon"], [1, "mt-5", "text-lg", "font-medium", "leading-5"], [1, "mt-0.5", "line-clamp-2", "text-secondary"], [4, "ngIf"], [1, "flex", "items-center", "mt-4", "text-md", "font-md"], [1, "text-secondary"], [1, "ml-1"], [1, "w-12", "h-1", "mt-6", "border-t-2"], [1, "flex", "items-center", "mt-6", "-space-x-1.5"], ["alt", "Member avatar", 1, "flex-0", "w-8", "h-8", "rounded-full", "ring", "ring-offset-1", "ring-bg-card", "ring-offset-transparent", "object-cover", 3, "src"], [1, "flex", "flex-0", "items-center", "justify-center", "w-8", "h-8", "rounded-full", "ring", "ring-offset-1", "ring-bg-card", "ring-offset-transparent", "bg-gray-200", "text-gray-500"], [1, "text-md", "font-semibold"], [1, "w-auto", "h-auto", "min-w-80", "min-h-26", "p-4", 2, "overflow", "auto"], [1, "text-3xl", "text-center", "font-bold", "py-3", "text-gray-900", "dark:text-gray-50"], [3, "data"], ["class", "relative", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "relative", 3, "formGroup", "ngSubmit"], ["ngForm", ""], [1, "w-full", 3, "model", "fields", "options", "form"], ["mat-flat-button", "", "type", "submit", 1, "bg-blue-600", "rounded-md", "mt-2", "text-white", "py-5", "px-6", 3, "disabled"]],
  template: function ScrumboardBoardsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Scrumboard Boards ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ScrumboardBoardsComponent_div_4_Template, 4, 3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, ScrumboardBoardsComponent_ng_template_6_Template, 5, 2, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 1, ctx.boards$));
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_8__.CdkScrollable, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_11__.FormlyForm, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 742262:
/*!***********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/card/card.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrumboardCardComponent": () => (/* binding */ ScrumboardCardComponent)
/* harmony export */ });
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_card_details_details_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/card/details/details.component */ 632237);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 665938);






class ScrumboardCardComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _matDialog, _router) {
    this._activatedRoute = _activatedRoute;
    this._matDialog = _matDialog;
    this._router = _router;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Launch the modal
    this._matDialog.open(libs_web_modules_admin_apps_scrumboard_card_details_details_component__WEBPACK_IMPORTED_MODULE_0__.ScrumboardCardDetailsComponent, {
      autoFocus: false
    }).afterClosed().subscribe(() => {
      // Go up twice because card routes are setup like this; "card/CARD_ID"
      this._router.navigate(['./../..'], {
        relativeTo: this._activatedRoute
      });
    });
  }
}
ScrumboardCardComponent.ɵfac = function ScrumboardCardComponent_Factory(t) {
  return new (t || ScrumboardCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
};
ScrumboardCardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ScrumboardCardComponent,
  selectors: [["scrumboard-card"]],
  decls: 1,
  vars: 0,
  template: function ScrumboardCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, "SCRUMBOARD -> BOARDS -> LIST -> CARD\n");
    }
  },
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 632237:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/card/details/details.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrumboardCardDetailsComponent": () => (/* binding */ ScrumboardCardDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 178372);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash-es */ 949858);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _board_board_details_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../board/board.details.store */ 252732);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/datepicker */ 499602);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/text-field */ 139349);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 836895);



















const _c0 = ["labelInput"];
function ScrumboardCardDetailsComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, ctx_r0.card.dueDate, "longDate"));
  }
}
function ScrumboardCardDetailsComponent_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Not set");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
}
function ScrumboardCardDetailsComponent_ng_container_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-checkbox", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ScrumboardCardDetailsComponent_ng_container_40_Template_mat_checkbox_change_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const label_r4 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r5.toggleProductTag(label_r4, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const label_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", "primary")("checked", ctx_r3.hasLabel(label_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", label_r4.title, " ");
  }
}
const _c1 = function (a0, a1, a2) {
  return {
    "text-gray-500 bg-gray-100 dark:text-gray-300 dark:bg-gray-700": a0,
    "text-green-800 bg-green-200 dark:text-green-100 dark:bg-green-500": a1,
    "text-red-800 bg-red-200 dark:text-red-100 dark:bg-red-500": a2
  };
};
class ScrumboardCardDetailsComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _formBuilder, store, matDialogRef) {
    this._changeDetectorRef = _changeDetectorRef;
    this._formBuilder = _formBuilder;
    this.store = store;
    this.matDialogRef = matDialogRef;
    // Private
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the board
    this.store.board$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(board => {
      // Board data
      this.board = board;
      // Get the labels
      this.labels = this.filteredLabels = board.labels;
    });
    // Prepare the card form
    this.cardForm = this._formBuilder.group({
      id: [''],
      title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      description: [''],
      boardListId: [''],
      position: [''],
      dueDate: [null]
    });
    // Update card when there is a value change on the card form
    this.cardForm.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.tap)(value => {
      // Update the card object
      this.card = (0,lodash_es__WEBPACK_IMPORTED_MODULE_6__["default"])(this.card, value);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(value => {
      // Update the card on the server
      // this._scrumboardService.updateCard(value.id, value).subscribe();
      console.log("Updated Server, ", value);
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the card details
    this.store.selectedCard$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(card => {
      this.card = card;
      // Fill the form
      this.cardForm.patchValue({
        id: this.card.id,
        title: this.card.title,
        description: this.card.description,
        boardListId: this.card.boardListId,
        position: this.card.position,
        dueDate: this.card.dueDate
      });
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
   * Return whether the card has the given label
   *
   * @param label
   */
  hasLabel(label) {
    return !!this.card.labels.find(cardLabel => cardLabel.id === label.id);
  }
  /**
   * Filter labels
   *
   * @param event
   */
  filterLabels(event) {
    // Get the value
    const value = event.target.value.toLowerCase();
    // Filter the labels
    this.filteredLabels = this.labels.filter(label => label.title.toLowerCase().includes(value));
  }
  update() {
    console.log("CardForm Value: ", this.cardForm.value);
    this.store.updateCardEffect(this.cardForm.value);
  }
  /**
   * Filter labels input key down event
   *
   * @param event
   */
  filterLabelsInputKeyDown(event) {
    // Return if the pressed key is not 'Enter'
    if (event.key !== 'Enter') {
      return;
    }
    // If there is no label available...
    if (this.filteredLabels.length === 0) {
      // Return
      return;
    }
    // If there is a label...
    const label = this.filteredLabels[0];
    const isLabelApplied = this.card.labels.find(cardLabel => cardLabel.id === label.id);
    // If the found label is already applied to the card...
    if (isLabelApplied) {
      // Remove the label from the card
      this.removeLabelFromCard(label);
    } else {
      // Otherwise add the label to the card
      this.addLabelToCard(label);
    }
  }
  /**
   * Toggle card label
   *
   * @param label
   * @param change
   */
  toggleProductTag(label, change) {
    if (change.checked) {
      this.addLabelToCard(label);
    } else {
      this.removeLabelFromCard(label);
    }
  }
  /**
   * Add label to the card
   *
   * @param label
   */
  addLabelToCard(label) {
    // Add the label
    this.card.labels.unshift(label);
    // Update the card form data
    this.cardForm.get('labels').patchValue(this.card.labels);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Remove label from the card
   *
   * @param label
   */
  removeLabelFromCard(label) {
    // Remove the label
    this.card.labels.splice(this.card.labels.findIndex(cardLabel => cardLabel.id === label.id), 1);
    // Update the card form data
    this.cardForm.get('labels').patchValue(this.card.labels);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Check if the given date is overdue
   */
  isOverdue(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0__(date, moment__WEBPACK_IMPORTED_MODULE_0__.ISO_8601).isBefore(moment__WEBPACK_IMPORTED_MODULE_0__(), 'days');
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
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Read the given file for demonstration purposes
   *
   * @param file
   */
  _readAsDataURL(file) {
    // Return a new promise
    return new Promise((resolve, reject) => {
      // Create a new reader
      const reader = new FileReader();
      // Resolve the promise on success
      reader.onload = () => {
        resolve(reader.result);
      };
      // Reject the promise on error
      reader.onerror = e => {
        reject(e);
      };
      // Read the file as the
      reader.readAsDataURL(file);
    });
  }
}
ScrumboardCardDetailsComponent.ɵfac = function ScrumboardCardDetailsComponent_Factory(t) {
  return new (t || ScrumboardCardDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_board_board_details_store__WEBPACK_IMPORTED_MODULE_8__.BoardDetailsStore), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialogRef));
};
ScrumboardCardDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ScrumboardCardDetailsComponent,
  selectors: [["scrumboard-card-details"]],
  viewQuery: function ScrumboardCardDetailsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.labelInput = _t.first);
    }
  },
  decls: 43,
  vars: 24,
  consts: [[1, "flex", "flex-col", "h-full", "flex-auto", "md:w-200", "md:min-w-200", "max-h-180"], [1, "flex", "flex-0", "items-center", "justify-between", "h-16", "pr-3", "sm:pr-5", "pl-6", "sm:pl-8", "bg-primary", "text-on-primary"], [1, "text-lg", "font-semiboold"], ["mat-icon-button", "", 3, "tabIndex", "click"], [1, "text-current", 3, "svgIcon"], [1, "flex", "flex-col", "flex-0", "items-start", "w-full", "p-6", "sm:p-8", "space-y-3", "overflow-y-auto", 3, "formGroup"], [1, "input-field", "fuse-mat-textarea", "fuse-mat-no-subscript", "w-full"], ["name", "id", "type", "text", "matInput", "", "placeholder", "Title", "required", "", 3, "formControlName"], [1, "fuse-mat-textarea", "fuse-mat-no-subscript", "w-full"], ["matInput", "", "placeholder", "Input description here", "cdkTextareaAutosize", "", 3, "formControlName", "rows", "cdkAutosizeMinRows"], [1, "font-medium"], [1, "relative", "flex", "items-center", "mt-1.5", "px-4", "leading-9", "rounded-full", "cursor-pointer", 3, "ngClass", "click"], [1, "icon-size-5", "text-current", 3, "svgIcon"], [1, "ml-2", "text-md", "font-medium"], [4, "ngIf"], [1, "fuse-mat-no-subscript", "fuse-mat-dense", "invisible", "absolute", "inset-0", "-mt-2.5", "opacity-0", "pointer-events-none"], ["matInput", "", 3, "formControlName", "matDatepicker"], ["dueDatePicker", ""], ["mat-button", "", "matDatepickerCancel", "", 3, "click"], ["mat-flat-button", "", "matDatepickerApply", "", 3, "color"], [1, "w-full"], [1, "mt-1", "rounded-md", "border", "border-gray-300", "shadow-sm", "overflow-hidden"], [1, "flex", "items-center", "my-2", "mx-3"], [1, "flex", "items-center", "flex-auto", "min-w-0"], [1, "icon-size-5", 3, "svgIcon"], ["type", "text", "placeholder", "Enter label name", 1, "min-w-0", "ml-2", "py-1", "border-0", 3, "maxLength", "input", "keydown"], [1, "max-h-40", "leading-none", "overflow-y-auto", "border-t"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["mat-flat-button", "", 1, "h-8", "min-h-8", "text-white", 3, "type", "color", "click"], [1, "flex", "items-center", "h-10", "min-h-10", "px-4", 3, "color", "checked", "change"]],
  template: function ScrumboardCardDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Card");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ScrumboardCardDetailsComponent_Template_button_click_4_listener() {
        return ctx.matDialogRef.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "form", 5)(7, "mat-form-field", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-form-field", 8)(10, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Description");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "textarea", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "            ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div")(15, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Due date");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ScrumboardCardDetailsComponent_Template_div_click_17_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](25);
        return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](_r2.open());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "mat-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "span", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, ScrumboardCardDetailsComponent_ng_container_20_Template, 3, 4, "ng-container", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, ScrumboardCardDetailsComponent_ng_container_21_Template, 2, 0, "ng-container", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "mat-form-field", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "input", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "mat-datepicker", null, 17)(26, "mat-datepicker-actions")(27, "button", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ScrumboardCardDetailsComponent_Template_button_click_27_listener() {
        return ctx.cardForm.get("dueDate").setValue(null);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, " Clear ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "button", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, " Select ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 20)(32, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Labels");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "div", 21)(35, "div", 22)(36, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](37, "mat-icon", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "input", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function ScrumboardCardDetailsComponent_Template_input_input_38_listener($event) {
        return ctx.filterLabels($event);
      })("keydown", function ScrumboardCardDetailsComponent_Template_input_keydown_38_listener($event) {
        return ctx.filterLabelsInputKeyDown($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](40, ScrumboardCardDetailsComponent_ng_container_40_Template, 3, 3, "ng-container", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "button", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ScrumboardCardDetailsComponent_Template_button_click_41_listener() {
        return ctx.update();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, " Update card ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("tabIndex", -1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.cardForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", "title");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", "description")("rows", 2)("cdkAutosizeMinRows", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](20, _c1, !ctx.card.dueDate, ctx.card.dueDate && !ctx.isOverdue(ctx.card.dueDate), ctx.card.dueDate && ctx.isOverdue(ctx.card.dueDate)));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:calendar");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.card.dueDate);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.card.dueDate);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", "dueDate")("matDatepicker", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("maxLength", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.filteredLabels)("ngForTrackBy", ctx.trackByFn);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", "button")("color", "primary");
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__.MatCheckbox, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__.MatDatepickerActions, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__.MatDatepickerCancel, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__.MatDatepickerApply, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatLabel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_16__.CdkTextareaAutosize, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_17__.DatePipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 218365:
/*!************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/scrumboard.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrumboardComponent": () => (/* binding */ ScrumboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class ScrumboardComponent {
  /**
   * Constructor
   */
  constructor() {}
}
ScrumboardComponent.ɵfac = function ScrumboardComponent_Factory(t) {
  return new (t || ScrumboardComponent)();
};
ScrumboardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ScrumboardComponent,
  selectors: [["scrumboard"]],
  decls: 1,
  vars: 0,
  template: function ScrumboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 33200:
/*!*********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/scrumboard.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrumboardModule": () => (/* binding */ ScrumboardModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 573555);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/datepicker */ 499602);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material-moment-adapter */ 808277);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_scrumboard_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/scrumboard.component */ 218365);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_boards_boards_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/boards/boards.component */ 83921);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_board_board_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/board/board.component */ 512570);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_board_add_card_add_card_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/board/add-card/add-card.component */ 426792);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_board_add_list_add_list_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/board/add-list/add-list.component */ 674764);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_card_card_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/card/card.component */ 742262);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_card_details_details_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/card/details/details.component */ 632237);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_scrumboard_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/scrumboard.routing */ 309409);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var libs_web_ui_form_src_lib_wrappers_context_provider_ui_context_provider_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! libs/web/ui/form/src/lib/wrappers/context-provider/ui-context-provider.module */ 476039);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);




























class ScrumboardModule {}
ScrumboardModule.ɵfac = function ScrumboardModule_Factory(t) {
  return new (t || ScrumboardModule)();
};
ScrumboardModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: ScrumboardModule
});
ScrumboardModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: [{
    provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MAT_DATE_FORMATS,
    useValue: {
      parse: {
        dateInput: moment__WEBPACK_IMPORTED_MODULE_0__.ISO_8601
      },
      display: {
        dateInput: 'll',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
      }
    }
  }],
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(libs_web_modules_admin_apps_scrumboard_scrumboard_routing__WEBPACK_IMPORTED_MODULE_4__.scrumboardRoutes), _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.DragDropModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckboxModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDatepickerModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialogModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.WebUiFormModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_14__.FormlyModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__.MatMenuModule, libs_web_ui_form_src_lib_wrappers_context_provider_ui_context_provider_module__WEBPACK_IMPORTED_MODULE_16__.UiContextProviderModule, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_17__.MatMomentDateModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_18__.MatProgressBarModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_19__.SharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ScrumboardModule, {
    declarations: [libs_web_modules_admin_apps_scrumboard_scrumboard_component__WEBPACK_IMPORTED_MODULE_20__.ScrumboardComponent, libs_web_modules_admin_apps_scrumboard_boards_boards_component__WEBPACK_IMPORTED_MODULE_21__.ScrumboardBoardsComponent, libs_web_modules_admin_apps_scrumboard_board_board_component__WEBPACK_IMPORTED_MODULE_22__.ScrumboardBoardComponent, libs_web_modules_admin_apps_scrumboard_board_add_card_add_card_component__WEBPACK_IMPORTED_MODULE_23__.ScrumboardBoardAddCardComponent, libs_web_modules_admin_apps_scrumboard_board_add_list_add_list_component__WEBPACK_IMPORTED_MODULE_24__.ScrumboardBoardAddListComponent, libs_web_modules_admin_apps_scrumboard_card_card_component__WEBPACK_IMPORTED_MODULE_25__.ScrumboardCardComponent, libs_web_modules_admin_apps_scrumboard_card_details_details_component__WEBPACK_IMPORTED_MODULE_26__.ScrumboardCardDetailsComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.DragDropModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckboxModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDatepickerModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialogModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_10__.WebUiFormModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_14__.FormlyModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__.MatMenuModule, libs_web_ui_form_src_lib_wrappers_context_provider_ui_context_provider_module__WEBPACK_IMPORTED_MODULE_16__.UiContextProviderModule, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_17__.MatMomentDateModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_18__.MatProgressBarModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_19__.SharedModule]
  });
})();

/***/ }),

/***/ 309409:
/*!**********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/scrumboard/scrumboard.routing.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scrumboardRoutes": () => (/* binding */ scrumboardRoutes)
/* harmony export */ });
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_boards_boards_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/boards/boards.component */ 83921);
/* harmony import */ var libs_web_modules_admin_apps_scrumboard_board_board_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/scrumboard/board/board.component */ 512570);


const scrumboardRoutes = [{
  path: '',
  component: libs_web_modules_admin_apps_scrumboard_boards_boards_component__WEBPACK_IMPORTED_MODULE_0__.ScrumboardBoardsComponent
}, {
  path: ':boardId',
  component: libs_web_modules_admin_apps_scrumboard_board_board_component__WEBPACK_IMPORTED_MODULE_1__.ScrumboardBoardComponent
}];

/***/ })

}]);