"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_user-feature_feature_src_lib_web-user-feature-list_web-user-feature-list_mo-e6765a"],{

/***/ 959542:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature/feature/src/lib/web-user-feature-list/web-user-feature-list.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeatureListComponent": () => (/* binding */ WebUserFeatureListComponent)
/* harmony export */ });
/* harmony import */ var _ag_grid_community_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ag-grid-community/core */ 620491);
/* harmony import */ var _ag_grid_community_client_side_row_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ag-grid-community/client-side-row-model */ 131889);
/* harmony import */ var _ag_grid_enterprise_set_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ag-grid-enterprise/set-filter */ 585506);
/* harmony import */ var _ag_grid_enterprise_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ag-grid-enterprise/menu */ 268357);
/* harmony import */ var _ag_grid_enterprise_column_tool_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ag-grid-enterprise/column-tool-panel */ 495098);
/* harmony import */ var _ag_grid_enterprise_filter_tool_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ag-grid-enterprise/filter-tool-panel */ 911184);
/* harmony import */ var _web_user_feature_list_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./web-user-feature-list.store */ 613388);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _ui_pagination_src_lib_web_ui_pagination_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../ui/pagination/src/lib/web-ui-pagination.component */ 632485);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../ui/panel/src/lib/web-ui-panel.component */ 619797);
/* harmony import */ var _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../ui/card-header/src/lib/web-ui-card-header.component */ 80194);
/* harmony import */ var _ui_stacked_list_src_lib_web_ui_stacked_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../ui/stacked-list/src/lib/web-ui-stacked-list.component */ 584309);
/* harmony import */ var _ui_icon_src_lib_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../ui/icon/src/lib/web-ui-icon.component */ 768164);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_search_src_lib_web_ui_search_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../../ui/search/src/lib/web-ui-search.component */ 442617);
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ag-grid-community/angular */ 99377);





















const _c0 = ["agGrid"];
function WebUserFeatureListComponent_ng_container_0_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "ui-search", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueChange", function WebUserFeatureListComponent_ng_container_0_ng_template_2_Template_ui_search_valueChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r12.onSearchQueryChange($event));
    })("submit", function WebUserFeatureListComponent_ng_container_0_ng_template_2_Template_ui_search_submit_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r14.onSubmitSearchQuery());
    })("focus", function WebUserFeatureListComponent_ng_container_0_ng_template_2_Template_ui_search_focus_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.setSearchFocus(true));
    })("blur", function WebUserFeatureListComponent_ng_container_0_ng_template_2_Template_ui_search_blur_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r16.setSearchFocus(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 13)(4, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function WebUserFeatureListComponent_ng_container_0_ng_template_2_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r17.setActiveView("list"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "ui-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function WebUserFeatureListComponent_ng_container_0_ng_template_2_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r18.setActiveView("card"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "ui-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function WebUserFeatureListComponent_ng_container_0_ng_template_2_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r19.setActiveView("table"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "ui-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "ui-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("width", vm_r1.searchFocused || (vm_r1.searchQuery == null ? null : vm_r1.searchQuery.name == null ? null : vm_r1.searchQuery.name.length) > 0 ? 200 : 140, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", vm_r1.searchQuery == null ? null : vm_r1.searchQuery.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("border-blue-600", ctx_r3.activeView === "list");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("border-blue-600", ctx_r3.activeView === "card");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("border-blue-600", ctx_r3.activeView === "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", "Create")("icon", "plusCircle")("variant", "primary")("routerLink", "create");
  }
}
function WebUserFeatureListComponent_ng_container_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "ui-card-header", 21);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "User Feature")("controlsTemplate", _r2);
  }
}
function WebUserFeatureListComponent_ng_container_0_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ui-pagination", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("skipChange", function WebUserFeatureListComponent_ng_container_0_ng_template_6_Template_ui_pagination_skipChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r21.onSkipChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("skip", vm_r1.paging == null ? null : vm_r1.paging.skip)("total", vm_r1.paging == null ? null : vm_r1.paging.total)("limit", vm_r1.paging == null ? null : vm_r1.paging.limit);
  }
}
function WebUserFeatureListComponent_ng_container_0_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "No User Feature found...");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
}
const _c1 = function () {
  return {
    margin: ".5rem",
    height: "180px",
    width: "372px"
  };
};
function WebUserFeatureListComponent_ng_container_0_ng_container_12_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ngx-skeleton-loader", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("theme", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](1, _c1));
  }
}
const _c2 = function (a0) {
  return [a0];
};
function WebUserFeatureListComponent_ng_container_0_ng_container_12_li_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 31)(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "h3", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "p", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 38)(9, "div", 39)(10, "div", 40)(11, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "svg", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "path", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "a", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "View Details");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const item_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", item_r26.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](3, _c2, item_r26.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c2, item_r26.id));
  }
}
function WebUserFeatureListComponent_ng_container_0_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 24)(2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, WebUserFeatureListComponent_ng_container_0_ng_container_12_div_3_Template, 2, 2, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "ul", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, WebUserFeatureListComponent_ng_container_0_ng_container_12_li_6_Template, 16, 7, "li", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().ngIf;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 2, ctx_r9.loading$));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", vm_r1.data);
  }
}
function WebUserFeatureListComponent_ng_container_0_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ag-grid-angular", 45, 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("selectionChanged", function WebUserFeatureListComponent_ng_container_0_ng_container_13_Template_ag_grid_angular_selectionChanged_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r29.onSelectionChanged());
    })("sortChanged", function WebUserFeatureListComponent_ng_container_0_ng_container_13_Template_ag_grid_angular_sortChanged_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r31.onSortChanged($event));
    })("filterChanged", function WebUserFeatureListComponent_ng_container_0_ng_container_13_Template_ag_grid_angular_filterChanged_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r32.onFilterChanged($event));
    })("firstDataRendered", function WebUserFeatureListComponent_ng_container_0_ng_container_13_Template_ag_grid_angular_firstDataRendered_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r33.onFirstDataRendered($event));
    })("gridReady", function WebUserFeatureListComponent_ng_container_0_ng_container_13_Template_ag_grid_angular_gridReady_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r34.onGridReady($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().ngIf;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rowData", vm_r1.data)("columnDefs", ctx_r10.columnDefs)("modules", ctx_r10.modules)("rowSelection", "single")("enableColResize", true)("enableSorting", true)("enableFilter", true)("sideBar", ctx_r10.sideBar)("frameworkComponents", ctx_r10.frameworkComponents)("defaultColDef", ctx_r10.defaultColDef);
  }
}
function WebUserFeatureListComponent_ng_container_0_ui_stacked_list_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "ui-stacked-list", 47);
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("items", vm_r1.items);
  }
}
function WebUserFeatureListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, WebUserFeatureListComponent_ng_container_0_ng_template_2_Template, 11, 13, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, WebUserFeatureListComponent_ng_container_0_ng_template_4_Template, 1, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, WebUserFeatureListComponent_ng_container_0_ng_template_6_Template, 1, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "ui-panel", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](9, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, WebUserFeatureListComponent_ng_container_0_ng_container_10_Template, 3, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](11, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, WebUserFeatureListComponent_ng_container_0_ng_container_12_Template, 7, 4, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, WebUserFeatureListComponent_ng_container_0_ng_container_13_Template, 3, 10, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, WebUserFeatureListComponent_ng_container_0_ui_stacked_list_14_Template, 1, 1, "ui-stacked-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](7);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("headerTemplate", _r4)("footerTemplate", _r6)("disableHeaderPadding", true)("disableBodyPadding", true)("disableFooterPadding", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !(vm_r1.items == null ? null : vm_r1.items.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitch", ctx_r0.activeView);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "card");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "table");
  }
}
class WebUserFeatureListComponent {
  constructor(store, route, router) {
    this.store = store;
    this.route = route;
    this.router = router;
    this.vm$ = this.store.vm$;
    this.activeView = 'table';
    this.modules = [_ag_grid_community_client_side_row_model__WEBPACK_IMPORTED_MODULE_1__.ClientSideRowModelModule, _ag_grid_enterprise_set_filter__WEBPACK_IMPORTED_MODULE_2__.SetFilterModule, _ag_grid_enterprise_menu__WEBPACK_IMPORTED_MODULE_3__.MenuModule, _ag_grid_enterprise_column_tool_panel__WEBPACK_IMPORTED_MODULE_4__.ColumnsToolPanelModule, _ag_grid_enterprise_filter_tool_panel__WEBPACK_IMPORTED_MODULE_5__.FiltersToolPanelModule];
    this.columnDefs = [{
      field: 'feature.name',
      headerName: 'Feature',
      filter: 'agTextColumnFilter'
    }, {
      field: 'user.name',
      headerName: 'User',
      filter: 'agTextColumnFilter'
    }, {
      field: 'id',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'createdAt',
      filter: 'agDateColumnFilter',
      hide: true
    }, {
      field: 'updatedAt',
      filter: 'agDateColumnFilter',
      hide: true
    }, {
      field: 'name',
      filter: 'agTextColumnFilter'
    }, {
      field: 'featureId',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'userId',
      filter: 'agTextColumnFilter',
      hide: true
    }];
    this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
      sortable: true
    };
    this.rowSelection = 'single';
    this.sideBar = 'filters';
  }
  ngOnInit() {
    this.store.loadUserFeaturesEffect();
  }
  onSkipChange(pageIndex) {
    this.store.setSkip(pageIndex);
    this.store.loadUserFeaturesEffect();
  }
  onSearchQueryChange(searchQuery) {
    if (searchQuery.length > 0) {
      this.store.setSearchQuery(searchQuery);
    } else {
      this.store.setSearchQuery('');
      this.store.loadUserFeaturesEffect();
    }
  }
  onSubmitSearchQuery() {
    this.store.setSkip(0);
    this.store.loadUserFeaturesEffect();
  }
  setSearchFocus(searchFocused) {
    this.store.setSearchBarInFocus(searchFocused);
  }
  setActiveView(viewName) {
    this.activeView = viewName;
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  autoSizeAll(skipHeader) {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(column => {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sizeToFit();
  }
  onSelectionChanged() {
    var _a;
    var selectedRows = this.gridApi.getSelectedRows();
    this.router.navigate([(_a = selectedRows[0]) === null || _a === void 0 ? void 0 : _a.id], {
      relativeTo: this.route
    });
  }
  onSortChanged({
    columnApi
  }) {
    this.store.setSortState(columnApi.getColumnState());
  }
  onFilterChanged({
    api
  }) {
    this.store.setFilterState(api.getFilterModel());
  }
  onFirstDataRendered(event) {
    this.store.restoreFilterAndSortState();
    this.store.filterSettings$.subscribe(filterSettings => {
      this.gridApi.setFilterModel(filterSettings);
    }).unsubscribe();
    this.store.sortSettings$.subscribe(sortSettings => {
      this.gridColumnApi.applyColumnState(sortSettings);
    }).unsubscribe();
  }
}
WebUserFeatureListComponent.ɵfac = function WebUserFeatureListComponent_Factory(t) {
  return new (t || WebUserFeatureListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_web_user_feature_list_store__WEBPACK_IMPORTED_MODULE_7__.WebUserFeatureListStore), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router));
};
WebUserFeatureListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: WebUserFeatureListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebUserFeatureListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.agGrid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([_web_user_feature_list_store__WEBPACK_IMPORTED_MODULE_7__.WebUserFeatureListStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], [1, "md:p-4", "w-full", "h-full", "flex", "flex-col", "min-h-0"], ["controlsTemplate", ""], ["headerTemplate", ""], ["paginationTemplate", ""], [1, "flex", "flex-col", "w-full", "h-full", "relative", 3, "headerTemplate", "footerTemplate", "disableHeaderPadding", "disableBodyPadding", "disableFooterPadding"], [1, "flex-auto"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "items", 4, "ngSwitchDefault"], [1, "flex", "items-center", "space-x-4"], [1, "transition-all", "duration-100", "ease-in"], [3, "value", "valueChange", "submit", "focus", "blur"], [1, "relative", "z-0", "inline-flex", "h-full", "shadow-sm", "rounded-md"], ["type", "button", 1, "relative", "inline-flex", "text-center", "justify-center", "items-center", "px-4", "py-2", "rounded-l-md", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-transparent", "text-sm", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:z-10", "focus:outline-none", "focus:ring-1", "focus:ring-indigo-500", "focus:border-indigo-500", 3, "click"], ["icon", "list", 1, "h-4", "w-4", "dark:text-gray-200"], ["type", "button", 1, "relative", "inline-flex", "text-center", "justify-center", "items-center", "px-4", "py-2", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-transparent", "text-sm", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:z-10", "focus:outline-none", "focus:ring-1", "focus:ring-indigo-500", "focus:border-indigo-500", 3, "click"], ["icon", "viewGrid", 1, "h-4", "w-4", "dark:text-gray-200"], ["type", "button", 1, "-ml-px", "text-center", "dark:bg-transparent", "dark:border-gray-600", "relative", "justify-center", "inline-flex", "items-center", "px-4", "py-2", "rounded-r-md", "border", "border-gray-300", "bg-white", "text-sm", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:z-10", "focus:outline-none", "focus:ring-1", "focus:ring-indigo-500", "focus:border-indigo-500", 3, "click"], ["icon", "table", 1, "h-4", "w-4", "dark:text-gray-200"], [3, "label", "icon", "variant", "routerLink"], [3, "title", "controlsTemplate"], [3, "skip", "total", "limit", "skipChange"], [1, "flex", "py-19", "justify-center", "align-center"], [1, "flex", "flex-1"], [1, "px-4", "py-8", "sm:px-0"], ["class", "grid-cols-3", 4, "ngIf"], [1, "grid", "grid-cols-1", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3"], ["class", "col-span-1 bg-white rounded-lg shadow", 4, "ngFor", "ngForOf"], [1, "grid-cols-3"], ["count", "8", 3, "theme"], [1, "col-span-1", "bg-white", "rounded-lg", "shadow"], [1, "flex", "items-center", "justify-between", "w-full", "p-6", "space-x-6"], [1, "flex-1", "truncate"], [1, "flex", "items-center", "space-x-3"], [1, "text-sm", "font-medium", "leading-5", "text-gray-900", "truncate"], [1, "mt-1", "text-sm", "leading-5", "text-gray-500", "truncate"], ["src", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60", "alt", "", 1, "flex-shrink-0", "w-10", "h-10", "bg-gray-300", "rounded-full"], [1, "border-t", "border-gray-200"], [1, "flex", "-mt-px"], [1, "flex", "flex-1", "w-0", "border-r", "border-gray-200"], [1, "relative", "inline-flex", "items-center", "justify-center", "flex-1", "w-0", "py-4", "-mr-px", "text-sm", "font-medium", "leading-5", "text-gray-700", "transition", "duration-150", "ease-in-out", "border", "border-transparent", "rounded-bl-lg", "hover:text-gray-500", "focus:outline-none", "focus:shadow-outline-blue", "focus:border-blue-300", "focus:z-10", 3, "routerLink"], ["fill", "none", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-gray-400"], ["d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"], [1, "ml-3", 3, "routerLink"], ["id", "myGrid", 1, "ag-theme-alpine", "h-full", "w-full", 3, "rowData", "columnDefs", "modules", "rowSelection", "enableColResize", "enableSorting", "enableFilter", "sideBar", "frameworkComponents", "defaultColDef", "selectionChanged", "sortChanged", "filterChanged", "firstDataRendered", "gridReady"], ["agGrid", ""], [3, "items"]],
  template: function WebUserFeatureListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, WebUserFeatureListComponent_ng_container_0_Template, 15, 9, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_ui_pagination_src_lib_web_ui_pagination_component__WEBPACK_IMPORTED_MODULE_9__.WebUiPaginationComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgSwitchCase, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgSwitchDefault, _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelComponent, _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_12__.WebUiCardHeaderComponent, _ui_stacked_list_src_lib_web_ui_stacked_list_component__WEBPACK_IMPORTED_MODULE_13__.WebUiStackedListComponent, _ui_icon_src_lib_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_14__.WebUiIconComponent, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_15__.WebUiButtonComponent, _ui_search_src_lib_web_ui_search_component__WEBPACK_IMPORTED_MODULE_16__.WebUiSearchComponent, _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_17__.AgGridAngular, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 79663:
/*!**************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature/feature/src/lib/web-user-feature-list/web-user-feature-list.module.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeatureListModule": () => (/* binding */ WebUserFeatureListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ag-grid-community/angular */ 99377);
/* harmony import */ var _web_user_feature_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./web-user-feature-list.component */ 959542);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_stacked_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/stacked-list */ 221438);
/* harmony import */ var _case_clinical_web_ui_dropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/dropdown */ 420910);
/* harmony import */ var _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/icon */ 320558);
/* harmony import */ var _case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/pagination */ 986409);
/* harmony import */ var _case_clinical_web_ui_search__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/search */ 235310);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
















class WebUserFeatureListModule {}
WebUserFeatureListModule.ɵfac = function WebUserFeatureListModule_Factory(t) {
  return new (t || WebUserFeatureListModule)();
};
WebUserFeatureListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUserFeatureListModule
});
WebUserFeatureListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_1__.WebUiPaginationModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_stacked_list__WEBPACK_IMPORTED_MODULE_5__.WebUiStackedListModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_6__.WebUiIconModule, _case_clinical_web_ui_dropdown__WEBPACK_IMPORTED_MODULE_7__.WebUiDropdownModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_8__.WebUiButtonModule, _case_clinical_web_ui_search__WEBPACK_IMPORTED_MODULE_9__.WebUiSearchModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_10__.WebUiPageHeaderModule, _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_11__.AgGridModule.withComponents([]), _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule.forChild([{
    path: '',
    component: _web_user_feature_list_component__WEBPACK_IMPORTED_MODULE_13__.WebUserFeatureListComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUserFeatureListModule, {
    declarations: [_web_user_feature_list_component__WEBPACK_IMPORTED_MODULE_13__.WebUserFeatureListComponent],
    imports: [_case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_1__.WebUiPaginationModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_stacked_list__WEBPACK_IMPORTED_MODULE_5__.WebUiStackedListModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_6__.WebUiIconModule, _case_clinical_web_ui_dropdown__WEBPACK_IMPORTED_MODULE_7__.WebUiDropdownModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_8__.WebUiButtonModule, _case_clinical_web_ui_search__WEBPACK_IMPORTED_MODULE_9__.WebUiSearchModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_10__.WebUiPageHeaderModule, _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_11__.AgGridModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule]
  });
})();

/***/ }),

/***/ 613388:
/*!*************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature/feature/src/lib/web-user-feature-list/web-user-feature-list.store.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeatureListStore": () => (/* binding */ WebUserFeatureListStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var _ag_grid_community_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ag-grid-community/core */ 620491);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);








class WebUserFeatureListStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.ComponentStore {
  constructor(data, router) {
    super({
      headerTitle: 'UserFeatures',
      searchFocused: false,
      searchQuery: '',
      featureId: undefined,
      userId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0
      }
    });
    this.data = data;
    this.router = router;
    this.setSkip = this.updater((state, skip) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        skip
      })
    }));
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.setSearchBarInFocus = this.updater((state, searchFocused) => Object.assign(Object.assign({}, state), {
      searchFocused
    }));
    this.setFeatureId = this.updater((state, featureId) => Object.assign(Object.assign({}, state), {
      featureId
    }));
    this.setUserId = this.updater((state, userId) => Object.assign(Object.assign({}, state), {
      userId
    }));
    this.headerTitle$ = this.select(s => s.headerTitle);
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.paging$ = this.select(s => s.paging);
    this.searchFocused$ = this.select(s => s.searchFocused);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.featureId$ = this.select(s => s.featureId);
    this.userId$ = this.select(s => s.userId);
    this.data$ = this.select(s => s.data);
    this.items$ = this.select(this.data$, this.mapDataToItems);
    this.sortSettings$ = this.select(s => s.sortSettings);
    this.filterSettings$ = this.select(s => s.filterSettings);
    this.input$ = this.select(this.paging$, this.featureId$, this.userId$, this.searchQuery$, (paging, featureId, userId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      featureId: featureId,
      userId: userId,
      total: paging.total
    }));
    this.vm$ = this.select(this.paging$, this.errors$, this.loading$, this.searchFocused$, this.searchQuery$, this.featureId$, this.userId$, this.data$, this.items$, (paging, errors, loading, searchFocused, searchQuery, featureId, userId, data, items) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      featureId,
      userId,
      data,
      items
    }));
    this.loadUserFeaturesEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(([_, input]) => this.data.userUserFeatures({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_1__.tapResponse)(res => this.patchState({
      paging: {
        limit: input.limit,
        skip: input.skip,
        total: res.data.count.total
      },
      data: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    if (this.router.snapshot.paramMap.has("featureId")) {
      var featureId = this.router.snapshot.paramMap.get("featureId");
      this.setFeatureId(featureId);
    }
    if (this.router.snapshot.paramMap.has("userId")) {
      var userId = this.router.snapshot.paramMap.get("userId");
      this.setUserId(userId);
    }
  }
  mapDataToItems(data) {
    return (data || []).map(({
      name,
      id,
      createdAt
    }) => ({
      title: name,
      path: id,
      leftMeta: {
        icon: 'calendar',
        text: createdAt
      }
    }));
  }
  setSortState(data) {
    this.patchState({
      sortSettings: data
    });
    localStorage.setItem('sortStateUserFeaturesList', JSON.stringify(data));
  }
  setFilterState(newFilterSettings) {
    this.patchState({
      filterSettings: newFilterSettings
    });
    localStorage.setItem('filterStateUserFeaturesList', JSON.stringify(newFilterSettings));
  }
  restoreFilterAndSortState() {
    const sortSettings = localStorage.getItem('sortStateUserFeaturesList');
    const filterSettings = localStorage.getItem('filterStateUserFeaturesList');
    if (sortSettings) {
      this.patchState({
        sortSettings: JSON.parse(sortSettings)
      });
    }
    if (filterSettings) {
      this.patchState({
        filterSettings: JSON.parse(filterSettings)
      });
    }
  }
}
WebUserFeatureListStore.ɵfac = function WebUserFeatureListStore_Factory(t) {
  return new (t || WebUserFeatureListStore)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute));
};
WebUserFeatureListStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: WebUserFeatureListStore,
  factory: WebUserFeatureListStore.ɵfac
});

/***/ })

}]);