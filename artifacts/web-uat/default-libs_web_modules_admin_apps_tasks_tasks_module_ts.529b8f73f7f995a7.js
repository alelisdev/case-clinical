"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_modules_admin_apps_tasks_tasks_module_ts"],{

/***/ 681281:
/*!************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/tasks/details/details.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksDetailsComponent": () => (/* binding */ TasksDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/portal */ 984080);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 178372);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash-es */ 949858);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fuse/services/confirmation */ 50253);
/* harmony import */ var libs_web_modules_admin_apps_tasks_list_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/list/list.component */ 537573);
/* harmony import */ var libs_web_modules_admin_apps_tasks_tasks_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/tasks.service */ 791235);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/overlay */ 598184);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/datepicker */ 499602);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/divider */ 44850);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _fuse_pipes_find_by_key_find_by_key_pipe__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @fuse/pipes/find-by-key/find-by-key.pipe */ 437249);





























const _c0 = ["tagsPanelOrigin"];
const _c1 = ["tagsPanel"];
const _c2 = ["titleField"];
function TasksDetailsComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "MARK AS COMPLETE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:check-circle");
  }
}
function TasksDetailsComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "mat-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "MARK AS INCOMPLETE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:check-circle");
  }
}
function TasksDetailsComponent_ng_container_28_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 43)(2, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](tag_r18.title);
  }
}
function TasksDetailsComponent_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TasksDetailsComponent_ng_container_28_ng_container_1_Template, 4, 1, "ng-container", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "fuseFindByKey");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](2, 2, ctx_r4.task.tags, "id", ctx_r4.tags))("ngForTrackBy", ctx_r4.trackByFn);
  }
}
function TasksDetailsComponent_ng_container_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:pencil-alt");
  }
}
function TasksDetailsComponent_ng_container_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Add");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
  }
}
function TasksDetailsComponent_ng_template_33_mat_icon_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 45);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:pencil-alt");
  }
}
function TasksDetailsComponent_ng_template_33_mat_icon_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 45);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:check");
  }
}
function TasksDetailsComponent_ng_template_33_ng_container_11_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_ng_template_33_ng_container_11_ng_container_1_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const tag_r26 = restoredCtx.$implicit;
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r27.toggleTaskTag(tag_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "mat-checkbox", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r26 = ctx.$implicit;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", "primary")("checked", ctx_r25.task.tags.includes(tag_r26.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](tag_r26.title);
  }
}
function TasksDetailsComponent_ng_template_33_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TasksDetailsComponent_ng_template_33_ng_container_11_ng_container_1_Template, 5, 3, "ng-container", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r22.filteredTags)("ngForTrackBy", ctx_r22.trackByFn);
  }
}
function TasksDetailsComponent_ng_template_33_ng_container_12_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 5)(2, "mat-form-field", 60)(3, "input", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function TasksDetailsComponent_ng_template_33_ng_container_12_ng_container_2_Template_input_input_3_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r32);
      const tag_r30 = restoredCtx.$implicit;
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r31.updateTagTitle(tag_r30, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_ng_template_33_ng_container_12_ng_container_2_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r32);
      const tag_r30 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r33.deleteTag(tag_r30));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "mat-icon", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", tag_r30.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:trash");
  }
}
function TasksDetailsComponent_ng_template_33_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, TasksDetailsComponent_ng_template_33_ng_container_12_ng_container_2_Template, 6, 2, "ng-container", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r23.filteredTags)("ngForTrackBy", ctx_r23.trackByFn);
  }
}
function TasksDetailsComponent_ng_template_33_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_ng_template_33_div_13_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r35);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      ctx_r34.createTag(_r19.value);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](_r19.value = "");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Create \"");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\"");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_r19.value);
  }
}
function TasksDetailsComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 47)(1, "div", 48)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "mat-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 49)(5, "input", 50, 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function TasksDetailsComponent_ng_template_33_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r36.filterTags($event));
    })("keydown", function TasksDetailsComponent_ng_template_33_Template_input_keydown_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r37);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r38.filterTagsInputKeyDown($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_ng_template_33_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r37);
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r39.toggleTagsEditMode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, TasksDetailsComponent_ng_template_33_mat_icon_8_Template, 1, 1, "mat-icon", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, TasksDetailsComponent_ng_template_33_mat_icon_9_Template, 1, 1, "mat-icon", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, TasksDetailsComponent_ng_template_33_ng_container_11_Template, 2, 2, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, TasksDetailsComponent_ng_template_33_ng_container_12_Template, 3, 2, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, TasksDetailsComponent_ng_template_33_div_13_Template, 7, 2, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6);
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("maxLength", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r9.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r9.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r9.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r9.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r9.shouldShowCreateTagButton(_r19.value));
  }
}
function TasksDetailsComponent_ng_container_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Low");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-down");
  }
}
function TasksDetailsComponent_ng_container_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Normal");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:minus");
  }
}
function TasksDetailsComponent_ng_container_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "High");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-up");
  }
}
function TasksDetailsComponent_ng_container_66_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, ctx_r14.task.dueDate, "longDate"));
  }
}
function TasksDetailsComponent_ng_container_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Not set");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
}
const _c3 = function () {
  return ["../"];
};
const _c4 = function (a0, a1, a2) {
  return {
    "text-green-800 bg-green-200 dark:text-green-100 dark:bg-green-500": a0,
    "text-gray-800 bg-gray-200 dark:text-gray-100 dark:bg-gray-500": a1,
    "text-red-800 bg-red-200 dark:text-red-100 dark:bg-red-500": a2
  };
};
const _c5 = function (a0) {
  return {
    "bg-hover": a0
  };
};
const _c6 = function (a0, a1, a2) {
  return {
    "text-gray-500 bg-gray-100 dark:text-gray-300 dark:bg-gray-700": a0,
    "text-green-800 bg-green-200 dark:text-green-100 dark:bg-green-500": a1,
    "text-red-800 bg-red-200 dark:text-red-100 dark:bg-red-500": a2
  };
};
class TasksDetailsComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _changeDetectorRef, _formBuilder, _fuseConfirmationService, _renderer2, _router, _tasksListComponent, _tasksService, _overlay, _viewContainerRef) {
    this._activatedRoute = _activatedRoute;
    this._changeDetectorRef = _changeDetectorRef;
    this._formBuilder = _formBuilder;
    this._fuseConfirmationService = _fuseConfirmationService;
    this._renderer2 = _renderer2;
    this._router = _router;
    this._tasksListComponent = _tasksListComponent;
    this._tasksService = _tasksService;
    this._overlay = _overlay;
    this._viewContainerRef = _viewContainerRef;
    this.tagsEditMode = false;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Open the drawer
    this._tasksListComponent.matDrawer.open();
    // Create the task form
    this.taskForm = this._formBuilder.group({
      id: [''],
      type: [''],
      title: [''],
      notes: [''],
      completed: [false],
      dueDate: [null],
      priority: [0],
      tags: [[]],
      order: [0]
    });
    // Get the tags
    this._tasksService.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(tags => {
      this.tags = tags;
      this.filteredTags = tags;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the tasks
    this._tasksService.tasks$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(tasks => {
      this.tasks = tasks;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the task
    this._tasksService.task$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(task => {
      // Open the drawer in case it is closed
      this._tasksListComponent.matDrawer.open();
      // Get the task
      this.task = task;
      // Patch values to the form from the task
      this.taskForm.patchValue(task, {
        emitEvent: false
      });
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Update task when there is a value change on the task form
    this.taskForm.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(value => {
      // Update the task object
      this.task = (0,lodash_es__WEBPACK_IMPORTED_MODULE_5__["default"])(this.task, value);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(value => {
      // Update the task on the server
      this._tasksService.updateTask(value.id, value).subscribe();
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Listen for NavigationEnd event to focus on the title field
    this._router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__.NavigationEnd)).subscribe(() => {
      // Focus on the title field
      this._titleField.nativeElement.focus();
    });
  }
  /**
   * After view init
   */
  ngAfterViewInit() {
    // Listen for matDrawer opened change
    this._tasksListComponent.matDrawer.openedChange.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(opened => opened)).subscribe(() => {
      // Focus on the title element
      this._titleField.nativeElement.focus();
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    // Dispose the overlay
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
    return this._tasksListComponent.matDrawer.close();
  }
  /**
   * Toggle the completed status
   */
  toggleCompleted() {
    // Get the form control for 'completed'
    const completedFormControl = this.taskForm.get('completed');
    // Toggle the completed status
    completedFormControl.setValue(!completedFormControl.value);
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
      // Focus to the search input once the overlay has been attached
      this._tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
    });
    // Create a portal from the template
    const templatePortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_9__.TemplatePortal(this._tagsPanel, this._viewContainerRef);
    // Attach the portal to the overlay
    this._tagsPanelOverlayRef.attach(templatePortal);
    // Subscribe to the backdrop click
    this._tagsPanelOverlayRef.backdropClick().subscribe(() => {
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
    const isTagApplied = this.task.tags.find(id => id === tag.id);
    // If the found tag is already applied to the task...
    if (isTagApplied) {
      // Remove the tag from the task
      this.deleteTagFromTask(tag);
    } else {
      // Otherwise add the tag to the task
      this.addTagToTask(tag);
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
    this._tasksService.createTag(tag).subscribe(response => {
      // Add the tag to the task
      this.addTagToTask(response);
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
    this._tasksService.updateTag(tag.id, tag).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.debounceTime)(300)).subscribe();
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
    this._tasksService.deleteTag(tag.id).subscribe();
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Add tag to the task
   *
   * @param tag
   */
  addTagToTask(tag) {
    // Add the tag
    this.task.tags.unshift(tag.id);
    // Update the task form
    this.taskForm.get('tags').patchValue(this.task.tags);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Delete tag from the task
   *
   * @param tag
   */
  deleteTagFromTask(tag) {
    // Remove the tag
    this.task.tags.splice(this.task.tags.findIndex(item => item === tag.id), 1);
    // Update the task form
    this.taskForm.get('tags').patchValue(this.task.tags);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Toggle task tag
   *
   * @param tag
   */
  toggleTaskTag(tag) {
    if (this.task.tags.includes(tag.id)) {
      this.deleteTagFromTask(tag);
    } else {
      this.addTagToTask(tag);
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
   * Set the task priority
   *
   * @param priority
   */
  setTaskPriority(priority) {
    // Set the value
    this.taskForm.get('priority').setValue(priority);
  }
  /**
   * Check if the task is overdue or not
   */
  isOverdue() {
    return moment__WEBPACK_IMPORTED_MODULE_0__(this.task.dueDate, moment__WEBPACK_IMPORTED_MODULE_0__.ISO_8601).isBefore(moment__WEBPACK_IMPORTED_MODULE_0__(), 'days');
  }
  /**
   * Delete the task
   */
  deleteTask() {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete task',
      message: 'Are you sure you want to delete this task? This action cannot be undone!',
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
        // Get the current task's id
        const id = this.task.id;
        // Get the next/previous task's id
        const currentTaskIndex = this.tasks.findIndex(item => item.id === id);
        const nextTaskIndex = currentTaskIndex + (currentTaskIndex === this.tasks.length - 1 ? -1 : 1);
        const nextTaskId = this.tasks.length === 1 && this.tasks[0].id === id ? null : this.tasks[nextTaskIndex].id;
        // Delete the task
        this._tasksService.deleteTask(id).subscribe(isDeleted => {
          // Return if the task wasn't deleted...
          if (!isDeleted) {
            return;
          }
          // Navigate to the next task if available
          if (nextTaskId) {
            this._router.navigate(['../', nextTaskId], {
              relativeTo: this._activatedRoute
            });
          }
          // Otherwise, navigate to the parent
          else {
            this._router.navigate(['../'], {
              relativeTo: this._activatedRoute
            });
          }
        });
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
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
TasksDetailsComponent.ɵfac = function TasksDetailsComponent_Factory(t) {
  return new (t || TasksDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_11__.FuseConfirmationService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_tasks_list_list_component__WEBPACK_IMPORTED_MODULE_12__.TasksListComponent), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_tasks_tasks_service__WEBPACK_IMPORTED_MODULE_13__.TasksService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_14__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef));
};
TasksDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: TasksDetailsComponent,
  selectors: [["tasks-details"]],
  viewQuery: function TasksDetailsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._tagsPanelOrigin = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._tagsPanel = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._titleField = _t.first);
    }
  },
  decls: 82,
  vars: 50,
  consts: [[1, "flex", "flex-auto"], [1, "flex", "flex-col", "flex-auto", "p-6", "pt-10", "sm:p-8", "sm:pt-10", "overflow-y-auto", 3, "formGroup"], [1, "flex", "items-center", "justify-between", "-mt-3", "-ml-4"], ["mat-button", "", 1, "pr-4", "pl-3.5", 3, "click"], [4, "ngIf"], [1, "flex", "items-center"], ["mat-icon-button", "", 3, "matMenuTriggerFor"], [3, "svgIcon"], ["moreMenu", "matMenu"], ["mat-menu-item", "", 3, "click"], ["mat-icon-button", "", 3, "routerLink"], [1, "mt-6", "mb-8"], [1, "fuse-mat-textarea", "fuse-mat-no-subscript", "w-full"], ["matInput", "", "matTextareaAutosize", "", 3, "formControlName", "spellcheck"], ["titleField", ""], [1, "mt-8"], [1, "font-medium", "mb-1.5"], [1, "flex", "flex-wrap", "items-center", "-m-1.5"], [1, "flex", "items-center", "justify-center", "px-4", "m-1.5", "rounded-full", "leading-9", "cursor-pointer", "text-gray-500", "bg-gray-100", "dark:text-gray-300", "dark:bg-gray-700", 3, "click"], ["tagsPanelOrigin", ""], ["tagsPanel", ""], [1, "flex", "flex-wrap", "items-center", "mt-8"], [1, "font-medium"], [1, "flex", "items-center", "mt-1.5", "px-4", "leading-9", "rounded-full", "cursor-pointer", 3, "ngClass", "matMenuTriggerFor"], ["priorityMenu", "matMenu"], ["mat-menu-item", "", 3, "ngClass", "click"], [1, "inline-flex", "items-center", "justify-between", "w-full", "min-w-30", "leading-5"], [1, "mr-0", "icon-size-4", "text-green-600", "dark:text-green-500", 3, "svgIcon"], [1, "mr-0", "icon-size-4", "text-gray-600", "dark:text-gray-500", 3, "svgIcon"], [1, "mr-0", "icon-size-4", "text-red-600", "dark:text-red-500", 3, "svgIcon"], [1, "ml-6"], [1, "relative", "flex", "items-center", "mt-1.5", "px-4", "leading-9", "rounded-full", "cursor-pointer", 3, "ngClass", "click"], [1, "icon-size-5", "text-current", 3, "svgIcon"], [1, "ml-2", "text-md", "font-medium"], [1, "fuse-mat-no-subscript", "fuse-mat-dense", "invisible", "absolute", "inset-0", "-mt-2.5", "opacity-0", "pointer-events-none"], ["matInput", "", 3, "formControlName", "matDatepicker"], ["dueDatePicker", ""], ["mat-button", "", "matDatepickerCancel", "", 3, "click"], ["mat-flat-button", "", "matDatepickerApply", "", 1, "", 3, "color"], [1, "flex", "items-center", "justify-center"], [1, "ml-2", "font-semibold"], [1, "text-primary", 3, "svgIcon"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "items-center", "justify-center", "px-4", "m-1.5", "rounded-full", "leading-9", "text-gray-500", "bg-gray-100", "dark:text-gray-300", "dark:bg-gray-700"], [1, "text-md", "font-medium", "whitespace-nowrap"], [1, "icon-size-5", 3, "svgIcon"], [1, "ml-1.5", "text-md", "font-medium", "whitespace-nowrap"], [1, "w-60", "rounded", "border", "shadow-md", "bg-card"], [1, "flex", "items-center", "m-3", "mr-2"], [1, "ml-2"], ["type", "text", "placeholder", "Enter tag name", 1, "w-full", "min-w-0", "py-1", "border-0", 3, "maxLength", "input", "keydown"], ["newTagInput", ""], ["mat-icon-button", "", 1, "ml-1", 3, "click"], ["class", "icon-size-5", 3, "svgIcon", 4, "ngIf"], [1, "flex", "flex-col", "max-h-64", "py-2", "border-t", "overflow-y-auto"], ["class", "flex items-center h-10 min-h-10 -ml-0.5 pl-4 pr-3 leading-none cursor-pointer hover:bg-hover", "matRipple", "", 3, "click", 4, "ngIf"], ["matRipple", "", 1, "flex", "items-center", "h-10", "min-h-10", "px-4", "cursor-pointer", "hover:bg-hover", 3, "click"], [1, "flex", "items-center", "h-10", "min-h-10", 3, "color", "checked"], [1, "ml-1"], [1, "py-2", "space-y-2"], [1, "fuse-mat-dense", "fuse-mat-no-subscript", "w-full", "mx-4"], ["matInput", "", 3, "value", "input"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "icon-size-5", "ml-2", 3, "svgIcon"], ["matRipple", "", 1, "flex", "items-center", "h-10", "min-h-10", "-ml-0.5", "pl-4", "pr-3", "leading-none", "cursor-pointer", "hover:bg-hover", 3, "click"], [1, "mr-2", "icon-size-5", 3, "svgIcon"], [1, "break-all"], [1, "ml-2", "mr-1", "text-md", "font-medium"], [1, "icon-size-4", "text-current", 3, "svgIcon"]],
  template: function TasksDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "form", 1)(2, "div", 2)(3, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_Template_button_click_3_listener() {
        return ctx.toggleCompleted();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, TasksDetailsComponent_ng_container_4_Template, 5, 1, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, TasksDetailsComponent_ng_container_5_Template, 5, 1, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5)(7, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "mat-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-menu", null, 8)(11, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_Template_button_click_11_listener() {
        return ctx.deleteTask();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "mat-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "mat-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "mat-divider", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div")(19, "mat-form-field", 12)(20, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "textarea", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 15)(25, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Tags");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, TasksDetailsComponent_ng_container_28_Template, 3, 6, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 18, 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_Template_div_click_29_listener() {
        return ctx.openTagsPanel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, TasksDetailsComponent_ng_container_31_Template, 4, 1, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, TasksDetailsComponent_ng_container_32_Template, 4, 1, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](33, TasksDetailsComponent_ng_template_33_Template, 14, 7, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 21)(36, "div")(37, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Priority");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](40, TasksDetailsComponent_ng_container_40_Template, 4, 1, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](41, TasksDetailsComponent_ng_container_41_Template, 4, 1, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](42, TasksDetailsComponent_ng_container_42_Template, 4, 1, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "mat-menu", null, 24)(45, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_Template_button_click_45_listener() {
        return ctx.setTaskPriority(0);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "span", 26)(47, "span", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, "Low");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](49, "mat-icon", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_Template_button_click_50_listener() {
        return ctx.setTaskPriority(1);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "span", 26)(52, "span", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "Normal");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](54, "mat-icon", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_Template_button_click_55_listener() {
        return ctx.setTaskPriority(2);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "span", 26)(57, "span", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "High");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](59, "mat-icon", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "div", 30)(61, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](62, "Due date");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "div", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_Template_div_click_63_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r40);
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](71);
        return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](_r16.open());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](64, "mat-icon", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "span", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](66, TasksDetailsComponent_ng_container_66_Template, 3, 4, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](67, TasksDetailsComponent_ng_container_67_Template, 2, 0, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](68, "mat-form-field", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](69, "input", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "mat-datepicker", null, 36)(72, "mat-datepicker-actions")(73, "button", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TasksDetailsComponent_Template_button_click_73_listener() {
        return ctx.taskForm.get("dueDate").setValue(null);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](74, "Clear ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](75, "button", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](76, "Select ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](77, "div", 15)(78, "mat-form-field", 12)(79, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](80, "Notes");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](81, "textarea", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](10);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](44);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](71);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.taskForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.taskForm.get("completed").value);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.taskForm.get("completed").value);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matMenuTriggerFor", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:dots-vertical");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:trash");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Delete ", ctx.task.type === "task" ? "task" : "section", "");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](35, _c3));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.task.type === "task" ? "Task title" : "Section title");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", "title")("spellcheck", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.task.tags.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.task.tags.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.task.tags.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](36, _c4, ctx.task.priority === 0, ctx.task.priority === 1, ctx.task.priority === 2))("matMenuTriggerFor", _r13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.task.priority === 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.task.priority === 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.task.priority === 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](40, _c5, ctx.task.priority === 0));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-down");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](42, _c5, ctx.task.priority === 1));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:minus");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](44, _c5, ctx.task.priority === 2));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-up");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](46, _c6, !ctx.task.dueDate, ctx.task.dueDate && !ctx.isOverdue(), ctx.task.dueDate && ctx.isOverdue()));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_solid:calendar");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.task.dueDate);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.task.dueDate);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", "dueDate")("matDatepicker", _r16);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", "notes")("spellcheck", false);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__.MatCheckbox, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerActions, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerCancel, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerApply, _angular_material_divider__WEBPACK_IMPORTED_MODULE_18__.MatDivider, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__.MatInput, _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__.MatMenuTrigger, _angular_material_core__WEBPACK_IMPORTED_MODULE_23__.MatRipple, _angular_common__WEBPACK_IMPORTED_MODULE_24__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_24__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormControlName, _fuse_pipes_find_by_key_find_by_key_pipe__WEBPACK_IMPORTED_MODULE_25__.FuseFindByKeyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_24__.DatePipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 537573:
/*!******************************************************************!*\
  !*** ./libs/web/modules/admin/apps/tasks/list/list.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksListComponent": () => (/* binding */ TasksListComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 573555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 754968);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var libs_web_modules_admin_apps_tasks_tasks_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/tasks.service */ 791235);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/components/navigation */ 359741);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);




















const _c0 = ["matDrawer"];
function TasksListComponent_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "All tasks completed!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function TasksListComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r2.tasksCount.incomplete, " remaining tasks");
  }
}
function TasksListComponent_ng_container_23_ng_container_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 28);
  }
}
function TasksListComponent_ng_container_23_ng_container_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function TasksListComponent_ng_container_23_ng_container_2_button_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:check-circle");
  }
}
function TasksListComponent_ng_container_23_ng_container_2_button_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:check-circle");
  }
}
function TasksListComponent_ng_container_23_ng_container_2_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TasksListComponent_ng_container_23_ng_container_2_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20);
      const task_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r18.toggleCompleted(task_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TasksListComponent_ng_container_23_ng_container_2_button_7_ng_container_1_Template, 2, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TasksListComponent_ng_container_23_ng_container_2_button_7_ng_container_2_Template, 2, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const task_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", task_r7.completed);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !task_r7.completed);
  }
}
function TasksListComponent_ng_container_23_ng_container_2_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const task_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](task_r7.title);
  }
}
function TasksListComponent_ng_container_23_ng_container_2_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const task_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 1, task_r7.type), " title");
  }
}
function TasksListComponent_ng_container_23_ng_container_2_ng_container_12_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 37);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-down")("title", "Low");
  }
}
function TasksListComponent_ng_container_23_ng_container_2_ng_container_12_mat_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 38);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-up")("title", "High");
  }
}
function TasksListComponent_ng_container_23_ng_container_2_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TasksListComponent_ng_container_23_ng_container_2_ng_container_12_mat_icon_2_Template, 1, 2, "mat-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TasksListComponent_ng_container_23_ng_container_2_ng_container_12_mat_icon_3_Template, 1, 2, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const task_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", task_r7.priority === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", task_r7.priority === 2);
  }
}
function TasksListComponent_ng_container_23_ng_container_2_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const task_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, task_r7.dueDate, "LLL dd"), " ");
  }
}
const _c1 = function (a0, a1, a2) {
  return {
    "h-12 text-lg font-semibold bg-gray-50 dark:bg-transparent": a0,
    "h-16": a1,
    "text-hint": a2
  };
};
const _c2 = function (a0) {
  return [a0];
};
function TasksListComponent_ng_container_23_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TasksListComponent_ng_container_23_ng_container_2_div_2_Template, 1, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TasksListComponent_ng_container_23_ng_container_2_ng_container_4_Template, 2, 0, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, TasksListComponent_ng_container_23_ng_container_2_button_7_Template, 3, 2, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 25)(9, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, TasksListComponent_ng_container_23_ng_container_2_ng_container_10_Template, 3, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, TasksListComponent_ng_container_23_ng_container_2_ng_container_11_Template, 4, 3, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, TasksListComponent_ng_container_23_ng_container_2_ng_container_12_Template, 4, 2, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, TasksListComponent_ng_container_23_ng_container_2_div_13_Template, 3, 4, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const task_r7 = ctx.$implicit;
    const first_r8 = ctx.first;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("border-t", first_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "task-" + task_r7.id)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](13, _c1, task_r7.type === "section", task_r7.type === "task", task_r7.completed))("cdkDragLockAxis", "y");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.selectedTask && ctx_r6.selectedTask.id === task_r7.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", task_r7.type === "task");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](17, _c2, task_r7.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", task_r7.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !task_r7.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", task_r7.type === "task");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", task_r7.type === "task");
  }
}
function TasksListComponent_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkDropListDropped", function TasksListComponent_ng_container_23_Template_div_cdkDropListDropped_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r28.dropped($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TasksListComponent_ng_container_23_ng_container_2_Template, 14, 19, "ng-container", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkDropListData", ctx_r3.tasks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.tasks)("ngForTrackBy", ctx_r3.trackByFn);
  }
}
function TasksListComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Add a task to start planning!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "iconsmind:bulleted_list");
  }
}
class TasksListComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _changeDetectorRef, _document, _router, _tasksService, _fuseMediaWatcherService, _fuseNavigationService) {
    this._activatedRoute = _activatedRoute;
    this._changeDetectorRef = _changeDetectorRef;
    this._document = _document;
    this._router = _router;
    this._tasksService = _tasksService;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this._fuseNavigationService = _fuseNavigationService;
    this.tasksCount = {
      completed: 0,
      incomplete: 0,
      total: 0
    };
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the tags
    this._tasksService.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(tags => {
      this.tags = tags;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the tasks
    this._tasksService.tasks$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(tasks => {
      this.tasks = tasks;
      // Update the counts
      this.tasksCount.total = this.tasks.filter(task => task.type === 'task').length;
      this.tasksCount.completed = this.tasks.filter(task => task.type === 'task' && task.completed).length;
      this.tasksCount.incomplete = this.tasksCount.total - this.tasksCount.completed;
      // Mark for check
      this._changeDetectorRef.markForCheck();
      // Update the count on the navigation
      setTimeout(() => {
        // Get the component -> navigation data -> item
        const mainNavigationComponent = this._fuseNavigationService.getComponent('mainNavigation');
        // If the main navigation component exists...
        if (mainNavigationComponent) {
          const mainNavigation = mainNavigationComponent.navigation;
          const menuItem = this._fuseNavigationService.getItem('apps.tasks', mainNavigation);
          // Update the subtitle of the item
          menuItem.subtitle = this.tasksCount.incomplete + ' remaining tasks';
          // Refresh the navigation
          mainNavigationComponent.refresh();
        }
      });
    });
    // Get the task
    this._tasksService.task$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(task => {
      this.selectedTask = task;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Subscribe to media query change
    this._fuseMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(state => {
      // Calculate the drawer mode
      this.drawerMode = state.matches ? 'side' : 'over';
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Listen for shortcuts
    (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.fromEvent)(this._document, 'keydown').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(event => (event.ctrlKey === true || event.metaKey // Ctrl or Cmd
    ) && (event.key === '/' || event.key === '.') // '/' or '.' key
    )).subscribe(event => {
      // If the '/' pressed
      if (event.key === '/') {
        this.createTask('task');
      }
      // If the '.' pressed
      if (event.key === '.') {
        this.createTask('section');
      }
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
   * Create task
   *
   * @param type
   */
  createTask(type) {
    // Create the task
    this._tasksService.createTask(type).subscribe(newTask => {
      // Go to the new task
      this._router.navigate(['./', newTask.id], {
        relativeTo: this._activatedRoute
      });
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * Toggle the completed status
   * of the given task
   *
   * @param task
   */
  toggleCompleted(task) {
    // Toggle the completed status
    task.completed = !task.completed;
    // Update the task on the server
    this._tasksService.updateTask(task.id, task).subscribe();
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Task dropped
   *
   * @param event
   */
  dropped(event) {
    // Move the item in the array
    (0,_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.moveItemInArray)(event.container.data, event.previousIndex, event.currentIndex);
    // Save the new order
    this._tasksService.updateTasksOrders(event.container.data).subscribe();
    // Mark for check
    this._changeDetectorRef.markForCheck();
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
TasksListComponent.ɵfac = function TasksListComponent_Factory(t) {
  return new (t || TasksListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_tasks_tasks_service__WEBPACK_IMPORTED_MODULE_8__.TasksService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_9__.FuseMediaWatcherService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_components_navigation__WEBPACK_IMPORTED_MODULE_10__.FuseNavigationService));
};
TasksListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TasksListComponent,
  selectors: [["tasks-list"]],
  viewQuery: function TasksListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  decls: 26,
  vars: 14,
  consts: [[1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "flex-auto", "h-full", "bg-card", "dark:bg-transparent", 3, "backdropClick"], [1, "w-full", "sm:w-128", "dark:bg-gray-900", 3, "mode", "opened", "position", "disableClose"], ["matDrawer", ""], [1, "flex", "flex-col"], [1, "flex", "flex-col", "flex-auto"], [1, "flex", "flex-col", "sm:flex-row", "items-start", "sm:items-center", "sm:justify-between", "py-8", "px-6", "md:px-8"], [1, "text-4xl", "font-extrabold", "tracking-tight", "leading-none"], [1, "ml-0.5", "font-medium", "text-secondary"], [4, "ngIf"], [1, "mt-4", "sm:mt-0"], ["mat-flat-button", "", 3, "color", "matTooltip", "click"], [3, "svgIcon"], [1, "ml-2", "mr-1"], ["mat-flat-button", "", 1, "ml-3", 3, "color", "matTooltip", "click"], [4, "ngIf", "ngIfElse"], ["noTasks", ""], ["cdkDropList", "", 1, "divide-y", 3, "cdkDropListData", "cdkDropListDropped"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["cdkDrag", "", 1, "group", "w-full", "select-none", "hover:bg-gray-100", "dark:hover:bg-hover", 3, "id", "ngClass", "cdkDragLockAxis"], ["class", "flex flex-0 w-0 h-0", 4, "cdkDragPreview"], [1, "relative", "flex", "items-center", "h-full", "pl-10"], ["cdkDragHandle", "", 1, "md:hidden", "absolute", "flex", "items-center", "justify-center", "inset-y-0", "left-0", "w-8", "cursor-move", "md:group-hover:flex"], [1, "icon-size-5", "text-hint", 3, "svgIcon"], ["class", "mr-2 -ml-2.5 leading-none", "mat-icon-button", "", 3, "click", 4, "ngIf"], [1, "flex", "flex-auto", "items-center", "min-w-0", "h-full", "pr-7", 3, "routerLink"], [1, "flex-auto", "mr-2", "truncate"], ["class", "text-sm whitespace-nowrap text-secondary", 4, "ngIf"], [1, "flex", "flex-0", "w-0", "h-0"], [1, "z-10", "absolute", "-top-px", "right-0", "-bottom-px", "flex", "flex-0", "w-1", "bg-primary"], ["mat-icon-button", "", 1, "mr-2", "-ml-2.5", "leading-none", 3, "click"], [1, "text-primary", 3, "svgIcon"], [1, "text-hint", 3, "svgIcon"], [1, "select-none", "text-hint"], [1, "w-4", "h-4", "mr-3"], ["class", "icon-size-4 text-green-600 dark:text-green-400", 3, "svgIcon", "title", 4, "ngIf"], ["class", "icon-size-4 text-red-600 dark:text-red-400", 3, "svgIcon", "title", 4, "ngIf"], [1, "icon-size-4", "text-green-600", "dark:text-green-400", 3, "svgIcon", "title"], [1, "icon-size-4", "text-red-600", "dark:text-red-400", 3, "svgIcon", "title"], [1, "text-sm", "whitespace-nowrap", "text-secondary"], [1, "flex", "flex-auto", "flex-col", "items-center", "justify-center", "bg-gray-100", "dark:bg-transparent"], [1, "icon-size-24", 3, "svgIcon"], [1, "mt-4", "text-2xl", "font-semibold", "tracking-tight", "text-secondary"]],
  template: function TasksListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("backdropClick", function TasksListComponent_Template_mat_drawer_container_backdropClick_1_listener() {
        return ctx.onBackdropClicked();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-drawer-content", 4)(6, "div", 5)(7, "div", 6)(8, "div")(9, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Tasks");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, TasksListComponent_span_12_Template, 2, 0, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, TasksListComponent_span_13_Template, 2, 1, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 10)(15, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TasksListComponent_Template_button_click_15_listener() {
        return ctx.createTask("section");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "mat-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Add Section");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TasksListComponent_Template_button_click_19_listener() {
        return ctx.createTask("task");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "mat-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Add Task");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, TasksListComponent_ng_container_23_Template, 3, 3, "ng-container", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, TasksListComponent_ng_template_24_Template, 4, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", ctx.drawerMode)("opened", false)("position", "end")("disableClose", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tasksCount.incomplete === 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tasksCount.incomplete !== 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "accent")("matTooltip", "Shortcut: Ctrl + .");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("matTooltip", "Shortcut: Ctrl + /");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tasks && ctx.tasks.length > 0)("ngIfElse", _r4);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.CdkDropList, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.CdkDrag, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.CdkDragHandle, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.CdkDragPreview, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__.MatDrawerContent, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__.MatTooltip, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.TitleCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 370927:
/*!**************************************************************!*\
  !*** ./libs/web/modules/admin/apps/tasks/tasks.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksComponent": () => (/* binding */ TasksComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class TasksComponent {
  /**
   * Constructor
   */
  constructor() {}
}
TasksComponent.ɵfac = function TasksComponent_Factory(t) {
  return new (t || TasksComponent)();
};
TasksComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TasksComponent,
  selectors: [["tasks"]],
  decls: 1,
  vars: 0,
  template: function TasksComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 978707:
/*!***********************************************************!*\
  !*** ./libs/web/modules/admin/apps/tasks/tasks.guards.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanDeactivateTasksDetails": () => (/* binding */ CanDeactivateTasksDetails)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);


class CanDeactivateTasksDetails {
  canDeactivate(component, currentRoute, currentState, nextState) {
    // Get the next route
    let nextRoute = nextState.root;
    while (nextRoute.firstChild) {
      nextRoute = nextRoute.firstChild;
    }
    // If the next state doesn't contain '/tasks'
    // it means we are navigating away from the
    // tasks app
    if (!nextState.url.includes('/tasks')) {
      // Let it navigate
      return true;
    }
    // If we are navigating to another task...
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
CanDeactivateTasksDetails.ɵfac = function CanDeactivateTasksDetails_Factory(t) {
  return new (t || CanDeactivateTasksDetails)();
};
CanDeactivateTasksDetails.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: CanDeactivateTasksDetails,
  factory: CanDeactivateTasksDetails.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 239905:
/*!***********************************************************!*\
  !*** ./libs/web/modules/admin/apps/tasks/tasks.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksModule": () => (/* binding */ TasksModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 573555);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/autocomplete */ 647957);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/datepicker */ 499602);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/divider */ 44850);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material-moment-adapter */ 808277);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/radio */ 971948);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fuse/pipes/find-by-key */ 747922);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var libs_web_modules_admin_apps_tasks_tasks_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/tasks.routing */ 585008);
/* harmony import */ var libs_web_modules_admin_apps_tasks_tasks_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/tasks.component */ 370927);
/* harmony import */ var libs_web_modules_admin_apps_tasks_details_details_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/details/details.component */ 681281);
/* harmony import */ var libs_web_modules_admin_apps_tasks_list_list_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/list/list.component */ 537573);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);



























class TasksModule {}
TasksModule.ɵfac = function TasksModule_Factory(t) {
  return new (t || TasksModule)();
};
TasksModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: TasksModule
});
TasksModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
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
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(libs_web_modules_admin_apps_tasks_tasks_routing__WEBPACK_IMPORTED_MODULE_4__.tasksRoutes), _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.DragDropModule, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__.MatAutocompleteModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__.MatCheckboxModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDatepickerModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_10__.MatDividerModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuModule, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_15__.MatMomentDateModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__.MatProgressBarModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatRippleModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__.MatSidenavModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__.MatTooltipModule, _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_21__.FuseFindByKeyPipeModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_22__.SharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](TasksModule, {
    declarations: [libs_web_modules_admin_apps_tasks_tasks_component__WEBPACK_IMPORTED_MODULE_23__.TasksComponent, libs_web_modules_admin_apps_tasks_details_details_component__WEBPACK_IMPORTED_MODULE_24__.TasksDetailsComponent, libs_web_modules_admin_apps_tasks_list_list_component__WEBPACK_IMPORTED_MODULE_25__.TasksListComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.DragDropModule, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__.MatAutocompleteModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__.MatCheckboxModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__.MatDatepickerModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_10__.MatDividerModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuModule, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_15__.MatMomentDateModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__.MatProgressBarModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatRippleModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__.MatSidenavModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__.MatTooltipModule, _fuse_pipes_find_by_key__WEBPACK_IMPORTED_MODULE_21__.FuseFindByKeyPipeModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_22__.SharedModule]
  });
})();

/***/ }),

/***/ 427110:
/*!**************************************************************!*\
  !*** ./libs/web/modules/admin/apps/tasks/tasks.resolvers.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksResolver": () => (/* binding */ TasksResolver),
/* harmony export */   "TasksTagsResolver": () => (/* binding */ TasksTagsResolver),
/* harmony export */   "TasksTaskResolver": () => (/* binding */ TasksTaskResolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_tasks_tasks_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/tasks.service */ 791235);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);






class TasksTagsResolver {
  /**
   * Constructor
   */
  constructor(_tasksService) {
    this._tasksService = _tasksService;
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
    return this._tasksService.getTags();
  }
}
TasksTagsResolver.ɵfac = function TasksTagsResolver_Factory(t) {
  return new (t || TasksTagsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_tasks_tasks_service__WEBPACK_IMPORTED_MODULE_1__.TasksService));
};
TasksTagsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: TasksTagsResolver,
  factory: TasksTagsResolver.ɵfac,
  providedIn: 'root'
});
class TasksResolver {
  /**
   * Constructor
   */
  constructor(_tasksService) {
    this._tasksService = _tasksService;
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
    return this._tasksService.getTasks();
  }
}
TasksResolver.ɵfac = function TasksResolver_Factory(t) {
  return new (t || TasksResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_tasks_tasks_service__WEBPACK_IMPORTED_MODULE_1__.TasksService));
};
TasksResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: TasksResolver,
  factory: TasksResolver.ɵfac,
  providedIn: 'root'
});
class TasksTaskResolver {
  /**
   * Constructor
   */
  constructor(_router, _tasksService) {
    this._router = _router;
    this._tasksService = _tasksService;
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
    return this._tasksService.getTaskById(route.paramMap.get('id')).pipe(
    // Error here means the requested task is not available
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
TasksTaskResolver.ɵfac = function TasksTaskResolver_Factory(t) {
  return new (t || TasksTaskResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_tasks_tasks_service__WEBPACK_IMPORTED_MODULE_1__.TasksService));
};
TasksTaskResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: TasksTaskResolver,
  factory: TasksTaskResolver.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 585008:
/*!************************************************************!*\
  !*** ./libs/web/modules/admin/apps/tasks/tasks.routing.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tasksRoutes": () => (/* binding */ tasksRoutes)
/* harmony export */ });
/* harmony import */ var libs_web_modules_admin_apps_tasks_tasks_guards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/tasks.guards */ 978707);
/* harmony import */ var libs_web_modules_admin_apps_tasks_tasks_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/tasks.resolvers */ 427110);
/* harmony import */ var libs_web_modules_admin_apps_tasks_tasks_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/tasks.component */ 370927);
/* harmony import */ var libs_web_modules_admin_apps_tasks_list_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/list/list.component */ 537573);
/* harmony import */ var libs_web_modules_admin_apps_tasks_details_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/web/modules/admin/apps/tasks/details/details.component */ 681281);





const tasksRoutes = [{
  path: '',
  component: libs_web_modules_admin_apps_tasks_tasks_component__WEBPACK_IMPORTED_MODULE_0__.TasksComponent,
  resolve: {
    tags: libs_web_modules_admin_apps_tasks_tasks_resolvers__WEBPACK_IMPORTED_MODULE_1__.TasksTagsResolver
  },
  children: [{
    path: '',
    component: libs_web_modules_admin_apps_tasks_list_list_component__WEBPACK_IMPORTED_MODULE_2__.TasksListComponent,
    resolve: {
      tasks: libs_web_modules_admin_apps_tasks_tasks_resolvers__WEBPACK_IMPORTED_MODULE_1__.TasksResolver
    },
    children: [{
      path: ':id',
      component: libs_web_modules_admin_apps_tasks_details_details_component__WEBPACK_IMPORTED_MODULE_3__.TasksDetailsComponent,
      resolve: {
        task: libs_web_modules_admin_apps_tasks_tasks_resolvers__WEBPACK_IMPORTED_MODULE_1__.TasksTaskResolver
      },
      canDeactivate: [libs_web_modules_admin_apps_tasks_tasks_guards__WEBPACK_IMPORTED_MODULE_4__.CanDeactivateTasksDetails]
    }]
  }]
}];

/***/ }),

/***/ 791235:
/*!************************************************************!*\
  !*** ./libs/web/modules/admin/apps/tasks/tasks.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksService": () => (/* binding */ TasksService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 80529);




class TasksService {
  /**
   * Constructor
   */
  constructor(_httpClient) {
    this._httpClient = _httpClient;
    // Private
    this._tags = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._task = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._tasks = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for tags
   */
  get tags$() {
    return this._tags.asObservable();
  }
  /**
   * Getter for task
   */
  get task$() {
    return this._task.asObservable();
  }
  /**
   * Getter for tasks
   */
  get tasks$() {
    return this._tasks.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get tags
   */
  getTags() {
    return this._httpClient.get('api/apps/tasks/tags').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._tags.next(response);
    }));
  }
  /**
   * Crate tag
   *
   * @param tag
   */
  createTag(tag) {
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(tags => this._httpClient.post('api/apps/tasks/tag', {
      tag
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(newTag => {
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
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(tags => this._httpClient.patch('api/apps/tasks/tag', {
      id,
      tag
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(updatedTag => {
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
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(tags => this._httpClient.delete('api/apps/tasks/tag', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(isDeleted => {
      // Find the index of the deleted tag
      const index = tags.findIndex(item => item.id === id);
      // Delete the tag
      tags.splice(index, 1);
      // Update the tags
      this._tags.next(tags);
      // Return the deleted status
      return isDeleted;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)(isDeleted => isDeleted), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(isDeleted => this.tasks$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(tasks => {
      // Iterate through the tasks
      tasks.forEach(task => {
        const tagIndex = task.tags.findIndex(tag => tag === id);
        // If the task has a tag, remove it
        if (tagIndex > -1) {
          task.tags.splice(tagIndex, 1);
        }
      });
      // Return the deleted status
      return isDeleted;
    }))))));
  }
  /**
   * Get tasks
   */
  getTasks() {
    return this._httpClient.get('api/apps/tasks/all').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._tasks.next(response);
    }));
  }
  /**
   * Update tasks orders
   *
   * @param tasks
   */
  updateTasksOrders(tasks) {
    return this._httpClient.patch('api/apps/tasks/order', {
      tasks
    });
  }
  /**
   * Search tasks with given query
   *
   * @param query
   */
  searchTasks(query) {
    return this._httpClient.get('api/apps/tasks/search', {
      params: {
        query
      }
    });
  }
  /**
   * Get task by id
   */
  getTaskById(id) {
    return this._tasks.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(tasks => {
      // Find the task
      const task = tasks.find(item => item.id === id) || null;
      // Update the task
      this._task.next(task);
      // Return the task
      return task;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(task => {
      if (!task) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)('Could not found task with id of ' + id + '!');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(task);
    }));
  }
  /**
   * Create task
   *
   * @param type
   */
  createTask(type) {
    return this.tasks$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(tasks => this._httpClient.post('api/apps/tasks/task', {
      type
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(newTask => {
      // Update the tasks with the new task
      this._tasks.next([newTask, ...tasks]);
      // Return the new task
      return newTask;
    }))));
  }
  /**
   * Update task
   *
   * @param id
   * @param task
   */
  updateTask(id, task) {
    return this.tasks$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(tasks => this._httpClient.patch('api/apps/tasks/task', {
      id,
      task
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(updatedTask => {
      // Find the index of the updated task
      const index = tasks.findIndex(item => item.id === id);
      // Update the task
      tasks[index] = updatedTask;
      // Update the tasks
      this._tasks.next(tasks);
      // Return the updated task
      return updatedTask;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(updatedTask => this.task$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)(item => item && item.id === id), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      // Update the task if it's selected
      this._task.next(updatedTask);
      // Return the updated task
      return updatedTask;
    }))))));
  }
  /**
   * Delete the task
   *
   * @param id
   */
  deleteTask(id) {
    return this.tasks$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(tasks => this._httpClient.delete('api/apps/tasks/task', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(isDeleted => {
      // Find the index of the deleted task
      const index = tasks.findIndex(item => item.id === id);
      // Delete the task
      tasks.splice(index, 1);
      // Update the tasks
      this._tasks.next(tasks);
      // Return the deleted status
      return isDeleted;
    }))));
  }
}
TasksService.ɵfac = function TasksService_Factory(t) {
  return new (t || TasksService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient));
};
TasksService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: TasksService,
  factory: TasksService.ɵfac,
  providedIn: 'root'
});

/***/ })

}]);