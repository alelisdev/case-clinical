"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_document_feature_src_lib_web-document-detail_web-document-detail_module_ts"],{

/***/ 209605:
/*!**********************************************************************************************!*\
  !*** ./libs/web/document/feature/src/lib/web-document-detail/overview/overview.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDocumentOverviewComponent": () => (/* binding */ WebDocumentOverviewComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _case_clinical_web_document_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/document/shared */ 946247);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);









function WebDocumentOverviewComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "section", 1)(2, "div", 2)(3, "div", 3)(4, "ui-formly-json-form", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("formIsReady", function WebDocumentOverviewComponent_ng_container_0_Template_ui_formly_json_form_formIsReady_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.formIsReady());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", "document_overview")("showSubmitButton", true)("componentStore", ctx_r0.store)("model", vm_r1.item);
  }
}
class WebDocumentOverviewComponent {
  constructor(store, route) {
    this.store = store;
    this.route = route;
    this.vm$ = this.store.vm$;
  }
  formIsReady() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
      yield this.store.loadDocumentEffect(this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(route => route === null || route === void 0 ? void 0 : route.documentId)));
      return true;
    });
  }
  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteDocumentEffect(item);
    }
  }
  assignedDocumentAdded($event) {
    console.log('from the overview in Document, added: ', $event);
  }
  firmAdded($event) {
    console.log('from the overview in Document, added: ', $event);
  }
  priorAuthorizationRequestAdded($event) {
    console.log('from the overview in Document, added: ', $event);
  }
}
WebDocumentOverviewComponent.ɵfac = function WebDocumentOverviewComponent_Factory(t) {
  return new (t || WebDocumentOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_document_shared__WEBPACK_IMPORTED_MODULE_3__.WebDocumentFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute));
};
WebDocumentOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebDocumentOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_document_shared__WEBPACK_IMPORTED_MODULE_3__.WebDocumentFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["aria-labelledby", "document-information-title", 1, "flex", "w-full", "m-4"], [1, "bg-white", "shadow", "sm:rounded-lg", "flex-column", "w-full"], [1, "border-t", "border-gray-200", "px-4", "py-5", "sm:px-6", "w-full"], [3, "formName", "showSubmitButton", "componentStore", "model", "formIsReady"]],
  template: function WebDocumentOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebDocumentOverviewComponent_ng_container_0_Template, 5, 4, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_6__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 997134:
/*!************************************************************************************************!*\
  !*** ./libs/web/document/feature/src/lib/web-document-detail/web-document-detail.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDocumentDetailComponent": () => (/* binding */ WebDocumentDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_document_detail_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-document-detail.store */ 341611);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/components/navigation/vertical/vertical.component */ 156739);
/* harmony import */ var _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fuse/directives/scroll-reset/scroll-reset.directive */ 932871);















const _c0 = ["matDrawer"];
class WebDocumentDetailComponent {
  constructor(store, route, _changeDetectorRef, _fuseMediaWatcherService) {
    this.store = store;
    this.route = route;
    this._changeDetectorRef = _changeDetectorRef;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this.menuData = [];
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.vm$ = this.store.vm$;
  }
  ngAfterViewInit() {
    var routeString = this.route.snapshot.pathFromRoot.map(r => r.url).join('/').replace('//', '/');
    this.vm$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(s => {
      var _a;
      if (((_a = s === null || s === void 0 ? void 0 : s.item) === null || _a === void 0 ? void 0 : _a.id) != undefined) {
        this.menuData = [{
          id: 'Details',
          title: 'Document Details',
          type: 'group',
          children: [{
            id: 'details.overview',
            title: 'Overview',
            type: 'basic',
            link: `${routeString}/overview`
          }, {
            id: 'details.assignedDocument',
            title: 'Assigned Documents',
            type: 'basic',
            link: `${routeString}/assigned-documents`
          }, {
            id: 'details.firm',
            title: 'Firms',
            type: 'basic',
            link: `${routeString}/firms`
          }, {
            id: 'details.priorAuthorizationRequest',
            title: 'Prior Authorization Requests',
            type: 'basic',
            link: `${routeString}/prior-authorization-requests`
          }, {
            id: 'details.priorAuthorizationRequest',
            title: 'Prior Authorization Requests',
            type: 'basic',
            link: `${routeString}/prior-authorization-requests`
          }, {
            id: 'details.priorAuthorizationRequest',
            title: 'Prior Authorization Requests',
            type: 'basic',
            link: `${routeString}/prior-authorization-requests`
          }]
        }];
      }
    })).subscribe();
  }
  ngOnInit() {
    // Subscribe to media query change
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('md')) {
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
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteDocumentEffect(item);
    }
  }
}
WebDocumentDetailComponent.ɵfac = function WebDocumentDetailComponent_Factory(t) {
  return new (t || WebDocumentDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_document_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebDocumentDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__.FuseMediaWatcherService));
};
WebDocumentDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: WebDocumentDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebDocumentDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_web_document_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebDocumentDetailStore])],
  decls: 10,
  vars: 9,
  consts: [[1, "flex", "flex-col", "w-full", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto", "flex", "flex-col"], ["mat-icon-button", "", 1, "ml-4", "md:hidden", "absolute", "left-4", "top-2", "sm:left-1", "sm:top-8", 3, "click"], [3, "svgIcon"]],
  template: function WebDocumentDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "fuse-vertical-navigation", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-drawer-content", 5)(6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WebDocumentDetailComponent_Template_button_click_8_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](_r0.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "mat-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("autoFocus", false)("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("navigation", ctx.menuData)("inner", true)("mode", "side")("name", "docs-guides-navigation")("opened", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("svgIcon", "heroicons_outline:menu");
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__.MatDrawerContent, _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_10__.FuseVerticalNavigationComponent, _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_11__.FuseScrollResetDirective, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 832165:
/*!*********************************************************************************************!*\
  !*** ./libs/web/document/feature/src/lib/web-document-detail/web-document-detail.module.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDocumentDetailModule": () => (/* binding */ WebDocumentDetailModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tree */ 135423);
/* harmony import */ var _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/components/highlight */ 205029);
/* harmony import */ var _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/components/alert */ 718413);
/* harmony import */ var _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/components/navigation */ 352221);
/* harmony import */ var _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/directives/scroll-reset */ 634697);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _web_document_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./web-document-detail.component */ 997134);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./overview/overview.component */ 209605);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
























class WebDocumentDetailModule {}
WebDocumentDetailModule.ɵfac = function WebDocumentDetailModule_Factory(t) {
  return new (t || WebDocumentDetailModule)();
};
WebDocumentDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebDocumentDetailModule
});
WebDocumentDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild([{
    path: '',
    component: _web_document_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebDocumentDetailComponent,
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebDocumentOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("libs_web_document_feature_src_lib_web-document-edit_web-document-edit_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../web-document-edit/web-document-edit.module */ 471585)).then(m => m.WebDocumentEditModule)
    }, {
      path: 'assigned-documents',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/assigned-document/feature */ 445376)).then(m => m.WebAssignedDocumentFeatureModule)
    }, {
      path: 'firms',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/firm/feature */ 853822)).then(m => m.WebFirmFeatureModule)
    }, {
      path: 'prior-authorization-requests',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/prior-authorization-request/feature */ 170682)).then(m => m.WebPriorAuthorizationRequestFeatureModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    }]
  }]), _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebDocumentDetailModule, {
    declarations: [_web_document_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebDocumentDetailComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebDocumentOverviewComponent],
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 341611:
/*!********************************************************************************************!*\
  !*** ./libs/web/document/feature/src/lib/web-document-detail/web-document-detail.store.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDocumentDetailStore": () => (/* binding */ WebDocumentDetailStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);







class WebDocumentDetailStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
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
    this.displayItems$ = this.select(this.item$, item => [{
      label: 'Id',
      value: item === null || item === void 0 ? void 0 : item.id
    }, {
      label: 'Name',
      value: item === null || item === void 0 ? void 0 : item.name
    }, {
      label: 'Attachment',
      value: item === null || item === void 0 ? void 0 : item.attachment
    }, {
      label: 'Encoding',
      value: item === null || item === void 0 ? void 0 : item.encoding
    }, {
      label: 'Extension',
      value: item === null || item === void 0 ? void 0 : item.extension
    }, {
      label: 'Assigned Documents',
      value: item === null || item === void 0 ? void 0 : item.assignedDocuments
    }, {
      label: 'Medical Reports',
      value: item === null || item === void 0 ? void 0 : item.medicalReports
    }, {
      label: 'Bills',
      value: item === null || item === void 0 ? void 0 : item.bills
    }, {
      label: 'Prescriptions',
      value: item === null || item === void 0 ? void 0 : item.prescriptions
    }, {
      label: 'Eulas',
      value: item === null || item === void 0 ? void 0 : item.eulas
    }]);
    this.tabs$ = this.select(this.item$, item => [{
      label: 'Details',
      path: 'details',
      data: item
    }]);
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
      errors,
      loading,
      item: Object.assign({}, item),
      tabs
    }), {
      debounce: true
    });
    this.loadDocumentEffect = this.effect(documentId$ => documentId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(documentId => this.data.userDocument({
      documentId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      item: res.data.item,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.deleteDocumentEffect = this.effect(document$ => document$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(document => this.data.userDeleteDocument({
      documentId: document.id,
      featureName: ''
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.router.navigate(['/queues/documents']), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadDocumentEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.pluck)('documentId')));
  }
}
WebDocumentDetailStore.ɵfac = function WebDocumentDetailStore_Factory(t) {
  return new (t || WebDocumentDetailStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute));
};
WebDocumentDetailStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebDocumentDetailStore,
  factory: WebDocumentDetailStore.ɵfac
});

/***/ })

}]);