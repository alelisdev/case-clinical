"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_navigation_feature_src_lib_web-navigation-list_web-navigation-list_module_ts"],{

/***/ 636236:
/*!**************************************************************************************************!*\
  !*** ./libs/web/navigation/feature/src/lib/web-navigation-list/web-navigation-list.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebNavigationListComponent": () => (/* binding */ WebNavigationListComponent)
/* harmony export */ });
/* harmony import */ var ag_grid_enterprise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ag-grid-enterprise */ 693497);
/* harmony import */ var _ag_grid_community_client_side_row_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ag-grid-community/client-side-row-model */ 131889);
/* harmony import */ var _ag_grid_enterprise_set_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ag-grid-enterprise/set-filter */ 585506);
/* harmony import */ var _ag_grid_enterprise_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ag-grid-enterprise/menu */ 268357);
/* harmony import */ var _ag_grid_enterprise_column_tool_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ag-grid-enterprise/column-tool-panel */ 495098);
/* harmony import */ var _web_navigation_list_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web-navigation-list.store */ 212656);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _ui_pagination_src_lib_web_ui_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../ui/pagination/src/lib/web-ui-pagination.component */ 632485);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../ui/panel/src/lib/web-ui-panel.component */ 619797);
/* harmony import */ var _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../ui/card-header/src/lib/web-ui-card-header.component */ 80194);
/* harmony import */ var _ui_stacked_list_src_lib_web_ui_stacked_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../ui/stacked-list/src/lib/web-ui-stacked-list.component */ 584309);
/* harmony import */ var _ui_icon_src_lib_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../ui/icon/src/lib/web-ui-icon.component */ 768164);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_search_src_lib_web_ui_search_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../ui/search/src/lib/web-ui-search.component */ 442617);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ag-grid-angular */ 427869);




















const _c0 = ["agGrid"];
function WebNavigationListComponent_ng_container_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "ui-search", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function WebNavigationListComponent_ng_container_0_ng_template_1_Template_ui_search_valueChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r12.onSearchQueryChange($event));
    })("submit", function WebNavigationListComponent_ng_container_0_ng_template_1_Template_ui_search_submit_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r14.onSubmitSearchQuery());
    })("focus", function WebNavigationListComponent_ng_container_0_ng_template_1_Template_ui_search_focus_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r15.setSearchFocus(true));
    })("blur", function WebNavigationListComponent_ng_container_0_ng_template_1_Template_ui_search_blur_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r16.setSearchFocus(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 13)(4, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WebNavigationListComponent_ng_container_0_ng_template_1_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r17.setActiveView("list"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "ui-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WebNavigationListComponent_ng_container_0_ng_template_1_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r18.setActiveView("card"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ui-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WebNavigationListComponent_ng_container_0_ng_template_1_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r19.setActiveView("table"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "ui-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "ui-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("width", vm_r1.searchFocused || (vm_r1.searchQuery == null ? null : vm_r1.searchQuery.length) > 0 ? 300 : 140, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", vm_r1.searchQuery);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("border-blue-600", ctx_r3.activeView === "list");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("border-blue-600", ctx_r3.activeView === "card");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("border-blue-600", ctx_r3.activeView === "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("label", "Create")("icon", "plusCircle")("variant", "primary")("routerLink", "create");
  }
}
function WebNavigationListComponent_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ui-card-header", 21);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("title", "Navigation")("controlsTemplate", _r2);
  }
}
function WebNavigationListComponent_ng_container_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ui-pagination", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("skipChange", function WebNavigationListComponent_ng_container_0_ng_template_5_Template_ui_pagination_skipChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r21.onSkipChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("skip", vm_r1.paging == null ? null : vm_r1.paging.skip)("total", vm_r1.paging == null ? null : vm_r1.paging.total)("limit", vm_r1.paging == null ? null : vm_r1.paging.limit);
  }
}
function WebNavigationListComponent_ng_container_0_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "No Navigation found...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
}
const _c1 = function () {
  return {
    margin: ".5rem",
    height: "180px",
    width: "372px"
  };
};
function WebNavigationListComponent_ng_container_0_ng_container_11_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ngx-skeleton-loader", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("theme", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](1, _c1));
  }
}
const _c2 = function (a0) {
  return [a0];
};
function WebNavigationListComponent_ng_container_0_ng_container_11_li_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "li", 31)(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "h3", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "p", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 38)(9, "div", 39)(10, "div", 40)(11, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "svg", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "path", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "a", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "View Details");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const item_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", item_r26.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](3, _c2, item_r26.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](5, _c2, item_r26.id));
  }
}
function WebNavigationListComponent_ng_container_0_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 24)(2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, WebNavigationListComponent_ng_container_0_ng_container_11_div_3_Template, 2, 2, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ul", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, WebNavigationListComponent_ng_container_0_ng_container_11_li_6_Template, 16, 7, "li", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 2, ctx_r9.loading$));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", vm_r1.data);
  }
}
function WebNavigationListComponent_ng_container_0_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 45)(2, "ag-grid-angular", 46, 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChanged", function WebNavigationListComponent_ng_container_0_ng_container_12_Template_ag_grid_angular_selectionChanged_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r29.onSelectionChanged());
    })("gridReady", function WebNavigationListComponent_ng_container_0_ng_container_12_Template_ag_grid_angular_gridReady_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r30);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r31.onGridReady($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rowData", vm_r1.data)("columnDefs", ctx_r10.columnDefs)("rowSelection", "single")("enableColResize", true)("enableSorting", true)("enableFilter", true)("sideBar", ctx_r10.sideBar)("frameworkComponents", ctx_r10.frameworkComponents)("defaultColDef", ctx_r10.defaultColDef);
  }
}
function WebNavigationListComponent_ng_container_0_ui_stacked_list_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ui-stacked-list", 48);
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("items", vm_r1.items);
  }
}
function WebNavigationListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, WebNavigationListComponent_ng_container_0_ng_template_1_Template, 11, 13, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, WebNavigationListComponent_ng_container_0_ng_template_3_Template, 1, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, WebNavigationListComponent_ng_container_0_ng_template_5_Template, 1, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ui-panel", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](8, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, WebNavigationListComponent_ng_container_0_ng_container_9_Template, 3, 0, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](10, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, WebNavigationListComponent_ng_container_0_ng_container_11_Template, 7, 4, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, WebNavigationListComponent_ng_container_0_ng_container_12_Template, 4, 9, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, WebNavigationListComponent_ng_container_0_ui_stacked_list_13_Template, 1, 1, "ui-stacked-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](4);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](6);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("headerTemplate", _r4)("footerTemplate", _r6)("disableHeaderPadding", true)("disableBodyPadding", true)("disableFooterPadding", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !(vm_r1.items == null ? null : vm_r1.items.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngSwitch", ctx_r0.activeView);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngSwitchCase", "card");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngSwitchCase", "table");
  }
}
class WebNavigationListComponent {
  constructor(store, route, router) {
    this.store = store;
    this.route = route;
    this.router = router;
    this.vm$ = this.store.vm$;
    this.activeView = 'table';
    this.modules = [_ag_grid_community_client_side_row_model__WEBPACK_IMPORTED_MODULE_1__.ClientSideRowModelModule, _ag_grid_enterprise_set_filter__WEBPACK_IMPORTED_MODULE_2__.SetFilterModule, _ag_grid_enterprise_menu__WEBPACK_IMPORTED_MODULE_3__.MenuModule, _ag_grid_enterprise_column_tool_panel__WEBPACK_IMPORTED_MODULE_4__.ColumnsToolPanelModule];
    this.columnDefs = [{
      field: 'user.name',
      filter: "'agSetColumnFilter'"
    }, {
      field: 'parent.name',
      filter: "'agSetColumnFilter'"
    }, {
      field: 'id',
      filter: 'agTextColumnFilter'
    }, {
      field: 'createdAt',
      filter: 'agDateColumnFilter'
    }, {
      field: 'updatedAt',
      filter: 'agDateColumnFilter'
    }, {
      field: 'name',
      filter: 'agTextColumnFilter'
    }, {
      field: 'title',
      filter: 'agTextColumnFilter'
    }, {
      field: 'subtitle',
      filter: 'agTextColumnFilter'
    }, {
      field: 'type',
      filter: 'agTextColumnFilter'
    }, {
      field: 'icon',
      filter: 'agTextColumnFilter'
    }, {
      field: 'link',
      filter: 'agTextColumnFilter'
    }, {
      field: 'userId',
      filter: 'agTextColumnFilter'
    }, {
      field: 'parentId',
      filter: 'agTextColumnFilter'
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
    this.store.loadNavigationsEffect();
  }
  onSkipChange(pageIndex) {
    this.store.setSkip(pageIndex);
    this.store.loadNavigationsEffect();
  }
  onSearchQueryChange(searchQuery) {
    if (searchQuery.length > 0) {
      this.store.setSearchQuery(searchQuery);
    } else {
      this.store.setSearchQuery('');
      this.store.loadNavigationsEffect();
    }
  }
  onSubmitSearchQuery() {
    this.store.setSkip(0);
    this.store.loadNavigationsEffect();
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
}
WebNavigationListComponent.ɵfac = function WebNavigationListComponent_Factory(t) {
  return new (t || WebNavigationListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_web_navigation_list_store__WEBPACK_IMPORTED_MODULE_6__.WebNavigationListStore), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
};
WebNavigationListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: WebNavigationListComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebNavigationListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.agGrid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([_web_navigation_list_store__WEBPACK_IMPORTED_MODULE_6__.WebNavigationListStore])],
  decls: 2,
  vars: 3,
  consts: [["class", "flex-auto", 4, "ngIf"], [1, "flex-auto"], ["controlsTemplate", ""], ["headerTemplate", ""], ["paginationTemplate", ""], [1, "flex-auto", 3, "headerTemplate", "footerTemplate", "disableHeaderPadding", "disableBodyPadding", "disableFooterPadding"], [4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "items", 4, "ngSwitchDefault"], [1, "flex", "items-center", "space-x-4"], [1, "transition-all", "duration-100", "ease-in"], [3, "value", "valueChange", "submit", "focus", "blur"], [1, "relative", "z-0", "inline-flex", "h-full", "shadow-sm", "rounded-md"], ["type", "button", 1, "relative", "inline-flex", "text-center", "justify-center", "items-center", "px-4", "py-2", "rounded-l-md", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-transparent", "text-sm", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:z-10", "focus:outline-none", "focus:ring-1", "focus:ring-indigo-500", "focus:border-indigo-500", 3, "click"], ["icon", "list", 1, "h-4", "w-4", "dark:text-gray-200"], ["type", "button", 1, "relative", "inline-flex", "text-center", "justify-center", "items-center", "px-4", "py-2", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-transparent", "text-sm", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:z-10", "focus:outline-none", "focus:ring-1", "focus:ring-indigo-500", "focus:border-indigo-500", 3, "click"], ["icon", "viewGrid", 1, "h-4", "w-4", "dark:text-gray-200"], ["type", "button", 1, "-ml-px", "text-center", "dark:bg-transparent", "dark:border-gray-600", "relative", "justify-center", "inline-flex", "items-center", "px-4", "py-2", "rounded-r-md", "border", "border-gray-300", "bg-white", "text-sm", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:z-10", "focus:outline-none", "focus:ring-1", "focus:ring-indigo-500", "focus:border-indigo-500", 3, "click"], ["icon", "table", 1, "h-4", "w-4", "dark:text-gray-200"], [3, "label", "icon", "variant", "routerLink"], [3, "title", "controlsTemplate"], [3, "skip", "total", "limit", "skipChange"], [1, "flex", "py-19", "justify-center", "align-center"], [1, "flex", "flex-1"], [1, "px-4", "py-8", "sm:px-0"], ["class", "grid-cols-3", 4, "ngIf"], [1, "grid", "grid-cols-1", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3"], ["class", "col-span-1 bg-white rounded-lg shadow", 4, "ngFor", "ngForOf"], [1, "grid-cols-3"], ["count", "8", 3, "theme"], [1, "col-span-1", "bg-white", "rounded-lg", "shadow"], [1, "flex", "items-center", "justify-between", "w-full", "p-6", "space-x-6"], [1, "flex-1", "truncate"], [1, "flex", "items-center", "space-x-3"], [1, "text-sm", "font-medium", "leading-5", "text-gray-900", "truncate"], [1, "mt-1", "text-sm", "leading-5", "text-gray-500", "truncate"], ["src", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60", "alt", "", 1, "flex-shrink-0", "w-10", "h-10", "bg-gray-300", "rounded-full"], [1, "border-t", "border-gray-200"], [1, "flex", "-mt-px"], [1, "flex", "flex-1", "w-0", "border-r", "border-gray-200"], [1, "relative", "inline-flex", "items-center", "justify-center", "flex-1", "w-0", "py-4", "-mr-px", "text-sm", "font-medium", "leading-5", "text-gray-700", "transition", "duration-150", "ease-in-out", "border", "border-transparent", "rounded-bl-lg", "hover:text-gray-500", "focus:outline-none", "focus:shadow-outline-blue", "focus:border-blue-300", "focus:z-10", 3, "routerLink"], ["fill", "none", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-gray-400"], ["d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"], [1, "ml-3", 3, "routerLink"], [1, "h-full", "w-full"], ["id", "myGrid", 1, "ag-theme-alpine", 2, "width", "68vw", "height", "68vh", 3, "rowData", "columnDefs", "rowSelection", "enableColResize", "enableSorting", "enableFilter", "sideBar", "frameworkComponents", "defaultColDef", "selectionChanged", "gridReady"], ["agGrid", ""], [3, "items"]],
  template: function WebNavigationListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, WebNavigationListComponent_ng_container_0_Template, 14, 9, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_ui_pagination_src_lib_web_ui_pagination_component__WEBPACK_IMPORTED_MODULE_8__.WebUiPaginationComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgSwitchCase, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgSwitchDefault, _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_10__.WebUiPanelComponent, _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_11__.WebUiCardHeaderComponent, _ui_stacked_list_src_lib_web_ui_stacked_list_component__WEBPACK_IMPORTED_MODULE_12__.WebUiStackedListComponent, _ui_icon_src_lib_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_13__.WebUiIconComponent, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_14__.WebUiButtonComponent, _ui_search_src_lib_web_ui_search_component__WEBPACK_IMPORTED_MODULE_15__.WebUiSearchComponent, ag_grid_angular__WEBPACK_IMPORTED_MODULE_16__.AgGridAngular, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 199637:
/*!***********************************************************************************************!*\
  !*** ./libs/web/navigation/feature/src/lib/web-navigation-list/web-navigation-list.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebNavigationListModule": () => (/* binding */ WebNavigationListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ag-grid-angular */ 427869);
/* harmony import */ var _web_navigation_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./web-navigation-list.component */ 636236);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_stacked_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/stacked-list */ 221438);
/* harmony import */ var _case_clinical_web_ui_dropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/dropdown */ 420910);
/* harmony import */ var _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/icon */ 320558);
/* harmony import */ var _case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/pagination */ 986409);
/* harmony import */ var _case_clinical_web_ui_search__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/search */ 235310);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
















class WebNavigationListModule {}
WebNavigationListModule.ɵfac = function WebNavigationListModule_Factory(t) {
  return new (t || WebNavigationListModule)();
};
WebNavigationListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebNavigationListModule
});
WebNavigationListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_1__.WebUiPaginationModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_stacked_list__WEBPACK_IMPORTED_MODULE_5__.WebUiStackedListModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_6__.WebUiIconModule, _case_clinical_web_ui_dropdown__WEBPACK_IMPORTED_MODULE_7__.WebUiDropdownModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_8__.WebUiButtonModule, _case_clinical_web_ui_search__WEBPACK_IMPORTED_MODULE_9__.WebUiSearchModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_10__.WebUiPageHeaderModule, ag_grid_angular__WEBPACK_IMPORTED_MODULE_11__.AgGridModule.withComponents([]), _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule.forChild([{
    path: '',
    component: _web_navigation_list_component__WEBPACK_IMPORTED_MODULE_13__.WebNavigationListComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebNavigationListModule, {
    declarations: [_web_navigation_list_component__WEBPACK_IMPORTED_MODULE_13__.WebNavigationListComponent],
    imports: [_case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_1__.WebUiPaginationModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_stacked_list__WEBPACK_IMPORTED_MODULE_5__.WebUiStackedListModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_6__.WebUiIconModule, _case_clinical_web_ui_dropdown__WEBPACK_IMPORTED_MODULE_7__.WebUiDropdownModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_8__.WebUiButtonModule, _case_clinical_web_ui_search__WEBPACK_IMPORTED_MODULE_9__.WebUiSearchModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_10__.WebUiPageHeaderModule, ag_grid_angular__WEBPACK_IMPORTED_MODULE_11__.AgGridModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule]
  });
})();

/***/ }),

/***/ 212656:
/*!**********************************************************************************************!*\
  !*** ./libs/web/navigation/feature/src/lib/web-navigation-list/web-navigation-list.store.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebNavigationListStore": () => (/* binding */ WebNavigationListStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);





class WebNavigationListStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data) {
    super({
      headerTitle: 'Navigations',
      searchFocused: false,
      searchQuery: '',
      paging: {
        limit: 10000,
        skip: 0
      }
    });
    this.data = data;
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
    this.headerTitle$ = this.select(s => s.headerTitle);
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.paging$ = this.select(s => s.paging);
    this.searchFocused$ = this.select(s => s.searchFocused);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.data$ = this.select(s => s.data);
    this.items$ = this.select(this.data$, this.mapDataToItems);
    this.input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery
    }));
    this.vm$ = this.select(this.paging$, this.errors$, this.loading$, this.searchFocused$, this.searchQuery$, this.data$, this.items$, (paging, errors, loading, searchFocused, searchQuery, data, items) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      data,
      items
    }));
    this.loadNavigationsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([_, input]) => this.data.userNavigations({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      paging: res.data.count,
      data: res.data.items,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
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
}
WebNavigationListStore.ɵfac = function WebNavigationListStore_Factory(t) {
  return new (t || WebNavigationListStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService));
};
WebNavigationListStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebNavigationListStore,
  factory: WebNavigationListStore.ɵfac
});

/***/ })

}]);