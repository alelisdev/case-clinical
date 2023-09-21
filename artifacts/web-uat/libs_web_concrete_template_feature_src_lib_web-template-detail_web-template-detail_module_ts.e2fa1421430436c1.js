"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_template_feature_src_lib_web-template-detail_web-template-detail_module_ts"],{

/***/ 90521:
/*!*******************************************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-detail/overview/overview.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateOverviewComponent": () => (/* binding */ WebTemplateOverviewComponent)
/* harmony export */ });
/* harmony import */ var _web_template_detail_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web-template-detail.store */ 413019);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);






const _c0 = function (a1, a2, a3, a4, a5) {
  return {
    showSignatureBar: true,
    signatureBoxName: a1,
    redirectUrlAfterSignature: a2,
    ownerName: a3,
    signerName: a4,
    signerInitials: a5
  };
};
function WebTemplateOverviewComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ui-formly-json-form", 2)(3, "tx-document-viewer", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("componentStore", ctx_r2.store)("model", vm_r1.item);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("signatureSettings", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction5"](4, _c0, vm_r1.item.code == null ? null : vm_r1.item.code.signatureBoxName, vm_r1.item.code == null ? null : vm_r1.item.code.redirectUrlAfterSignature, vm_r1.item.code == null ? null : vm_r1.item.code.ownerName, vm_r1.item.code == null ? null : vm_r1.item.code.signatureName, vm_r1.item.code == null ? null : vm_r1.item.code.signerInitials));
  }
}
function WebTemplateOverviewComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebTemplateOverviewComponent_ng_container_0_ng_container_1_Template, 4, 10, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r1.item);
  }
}
class WebTemplateOverviewComponent {
  constructor(store) {
    this.store = store;
    this.vm$ = this.store.vm$;
  }
  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteTemplateEffect(item);
    }
  }
}
WebTemplateOverviewComponent.ɵfac = function WebTemplateOverviewComponent_Factory(t) {
  return new (t || WebTemplateOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_template_detail_store__WEBPACK_IMPORTED_MODULE_1__.WebTemplateDetailStore));
};
WebTemplateOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebTemplateOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_web_template_detail_store__WEBPACK_IMPORTED_MODULE_1__.WebTemplateDetailStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], [1, "w-full", "flex", "flex-col"], ["formName", "template_overview", 1, "w-full", 3, "showSubmitButton", "componentStore", "model"], ["width", "1400px", "height", "800px", "basePath", "https://documentserver.caseclinical.com:443/MemberOnboarding", "documentData", "vm.item.attachment", 3, "signatureSettings"]],
  template: function WebTemplateOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebTemplateOverviewComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_4__.DocumentViewerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 946626:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-detail/web-template-detail.component.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateDetailComponent": () => (/* binding */ WebTemplateDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_template_detail_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-template-detail.store */ 413019);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/components/navigation/vertical/vertical.component */ 156739);
/* harmony import */ var _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/directives/scroll-reset/scroll-reset.directive */ 932871);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 134793);












const _c0 = ["matDrawer"];
class WebTemplateDetailComponent {
  constructor(store, _changeDetectorRef, _fuseMediaWatcherService) {
    this.store = store;
    this._changeDetectorRef = _changeDetectorRef;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this.menuData = [];
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.vm$ = this.store.vm$;
  }
  ngAfterViewInit() {
    this.vm$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(s => {
      var _a, _b;
      this.menuData = [{
        id: 'Details',
        title: 'Template Details',
        type: 'group',
        children: [{
          id: 'details.overview',
          title: 'Overview',
          type: 'basic',
          link: `/queues/templates/${(_a = s === null || s === void 0 ? void 0 : s.item) === null || _a === void 0 ? void 0 : _a.id}/details/overview`
        }, {
          id: 'details.assignedDocument',
          title: 'Assigned Documents',
          type: 'basic',
          link: `/queues/templates/${(_b = s === null || s === void 0 ? void 0 : s.item) === null || _b === void 0 ? void 0 : _b.id}/details/assigned-documents`
        }]
      }];
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
      this.store.deleteTemplateEffect(item);
    }
  }
}
WebTemplateDetailComponent.ɵfac = function WebTemplateDetailComponent_Factory(t) {
  return new (t || WebTemplateDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_template_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebTemplateDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_5__.FuseMediaWatcherService));
};
WebTemplateDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: WebTemplateDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebTemplateDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_web_template_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebTemplateDetailStore])],
  decls: 8,
  vars: 8,
  consts: [[1, "w-full", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto"]],
  template: function WebTemplateDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "fuse-vertical-navigation", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-drawer-content", 5)(6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("autoFocus", false)("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("navigation", ctx.menuData)("inner", true)("mode", "side")("name", "docs-guides-navigation")("opened", true);
    }
  },
  dependencies: [_angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__.MatDrawerContent, _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_7__.FuseVerticalNavigationComponent, _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetDirective, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 169715:
/*!******************************************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-detail/web-template-detail.module.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateDetailModule": () => (/* binding */ WebTemplateDetailModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tree */ 135423);
/* harmony import */ var _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/components/highlight */ 205029);
/* harmony import */ var _fuse_components_alert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/components/alert */ 718413);
/* harmony import */ var _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fuse/components/navigation */ 352221);
/* harmony import */ var _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/directives/scroll-reset */ 634697);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _web_template_detail_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./web-template-detail.component */ 946626);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./overview/overview.component */ 90521);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
























class WebTemplateDetailModule {}
WebTemplateDetailModule.ɵfac = function WebTemplateDetailModule_Factory(t) {
  return new (t || WebTemplateDetailModule)();
};
WebTemplateDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebTemplateDetailModule
});
WebTemplateDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_1__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_6__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_7__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_8__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_9__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_10__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_11__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_13__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_14__.WebUiDescriptionListModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_15__.DocumentViewerModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_16__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_17__.WebUiPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterModule.forChild([{
    path: '',
    component: _web_template_detail_component__WEBPACK_IMPORTED_MODULE_19__.WebTemplateDetailComponent,
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_20__.WebTemplateOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_concrete_template_feature_src_lib_web-template-edit_web-template-edit_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../web-template-edit/web-template-edit.module */ 551210)).then(m => m.WebTemplateEditModule)
    }, {
      path: 'assigned-documents',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/assigned-document/feature */ 445376)).then(m => m.WebAssignedDocumentFeatureModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    }]
  }]), _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_21__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_22__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebTemplateDetailModule, {
    declarations: [_web_template_detail_component__WEBPACK_IMPORTED_MODULE_19__.WebTemplateDetailComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_20__.WebTemplateOverviewComponent],
    imports: [_case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_1__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_6__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_7__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_8__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_9__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_10__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_11__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_13__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_14__.WebUiDescriptionListModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_15__.DocumentViewerModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_16__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_17__.WebUiPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_21__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_22__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 586477:
/*!*************************************************************************!*\
  !*** ./libs/web/ui/page-header/src/lib/web-ui-page-header.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPageHeaderComponent": () => (/* binding */ WebUiPageHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../button/src/lib/web-ui-button.component */ 797800);




function WebUiPageHeaderComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showLeftArrowIcon", true);
  }
}
function WebUiPageHeaderComponent_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
function WebUiPageHeaderComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiPageHeaderComponent_ng_container_4_ng_container_1_Template, 1, 0, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.controls);
  }
}
function WebUiPageHeaderComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", ctx_r2.linkTitle)("link", ctx_r2.linkPath);
  }
}
class WebUiPageHeaderComponent {}
WebUiPageHeaderComponent.ɵfac = function WebUiPageHeaderComponent_Factory(t) {
  return new (t || WebUiPageHeaderComponent)();
};
WebUiPageHeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiPageHeaderComponent,
  selectors: [["ui-page-header"]],
  inputs: {
    title: "title",
    linkPath: "linkPath",
    linkTitle: "linkTitle",
    showBackButton: "showBackButton",
    controls: "controls"
  },
  decls: 6,
  vars: 4,
  consts: [[1, "flex", "items-center", "px-6", "py-3", "border-b", "dark:border-gray-700", "border-gray-200", "dark:text-gray-100"], [4, "ngIf"], [1, "text-lg", "font-medium", "text-gray-900", "dark:text-gray-100"], ["link", "..", "label", "Back", "variant", "white", 1, "mr-4", 3, "showLeftArrowIcon"], [4, "ngTemplateOutlet"], [1, "ml-auto", 3, "label", "link"]],
  template: function WebUiPageHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiPageHeaderComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WebUiPageHeaderComponent_ng_container_4_Template, 2, 1, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUiPageHeaderComponent_ng_container_5_Template, 2, 2, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showBackButton);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.title, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.controls);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.linkTitle && ctx.linkPath);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet, _button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonComponent],
  encapsulation: 2
});

/***/ }),

/***/ 752707:
/*!**********************************************************************!*\
  !*** ./libs/web/ui/page-header/src/lib/web-ui-page-header.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPageHeaderModule": () => (/* binding */ WebUiPageHeaderModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _web_ui_page_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-ui-page-header.component */ 586477);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class WebUiPageHeaderModule {}
WebUiPageHeaderModule.ɵfac = function WebUiPageHeaderModule_Factory(t) {
  return new (t || WebUiPageHeaderModule)();
};
WebUiPageHeaderModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiPageHeaderModule
});
WebUiPageHeaderModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiPageHeaderModule, {
    declarations: [_web_ui_page_header_component__WEBPACK_IMPORTED_MODULE_4__.WebUiPageHeaderComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule],
    exports: [_web_ui_page_header_component__WEBPACK_IMPORTED_MODULE_4__.WebUiPageHeaderComponent]
  });
})();

/***/ })

}]);