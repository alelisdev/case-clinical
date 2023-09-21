"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_template_feature_src_lib_web-template-create_web-template-create_module_ts"],{

/***/ 771987:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-create/web-template-create.component.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateCreateComponent": () => (/* binding */ WebTemplateCreateComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _web_template_create_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-template-create.store */ 131345);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 311481);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../ui/form/src/lib/web-ui-form.component */ 834077);
/* harmony import */ var angular_split__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-split */ 180926);
/* harmony import */ var _ui_page_header_src_lib_web_ui_page_header_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../ui/page-header/src/lib/web-ui-page-header.component */ 586477);
/* harmony import */ var _txtextcontrol_tx_ng_ds_document_editor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @txtextcontrol/tx-ng-ds-document-editor */ 121124);
















function WebTemplateCreateComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ui-page-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "as-split", 3)(4, "as-split-area", 4)(5, "div", 5)(6, "ui-form", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitForm", function WebTemplateCreateComponent_ng_container_0_Template_ui_form_submitForm_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.createTemplate($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 9)(10, "ui-button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebTemplateCreateComponent_ng_container_0_Template_ui_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r4.loadJsonData());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "ui-button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "as-split-area", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "tx-ds-document-editor", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("useTransition", true)("unit", "pixel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("order", 0)("size", 500);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("fields", ctx_r0.fields)("model", ctx_r0.model);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("order", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("serviceURL", ctx_r0.safeResourceUrl);
  }
}
class WebTemplateCreateComponent {
  constructor(store, domSanitizer, data) {
    this.store = store;
    this.domSanitizer = domSanitizer;
    this.data = data;
    this.vm$ = this.store.vm$;
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('id', {
      label: 'Id'
    }, {
      className: 'w-1/2  px-1',
      hide: true
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('name', {
      label: 'Name'
    }, {
      className: 'w-full px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.jsonEditor('code', {
      label: 'Json Object'
    }, {
      className: 'w-full px-1'
    }) // need a code field here
    ]), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.fieldRow([
    // WebUiFormField.file(
    //   'attachment',
    //   {
    //     label: 'Attachment',
    //     registerOnChange: (changes) => {
    //       console.log('file:', changes)
    //     },
    //   },
    //   { className: 'w-1/2  px-1' },
    // ),
    _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('encoding', {
      label: 'Encoding'
    }, {
      className: 'w-1/2  px-1',
      defaultValue: 'DocX',
      hide: true
    })])];
    this.rawUrl = 'https://trial.dsserver.io';
    this.safeResourceUrl = '';
    this.model = {
      name: '',
      attachment: '',
      code: {
        name: 'test'
      }
    };
    this.secureUrl = this.domSanitizer.bypassSecurityTrustUrl(this.rawUrl);
    this.safeResourceUrl = domSanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__.SecurityContext.URL, this.secureUrl);
  }
  onTxDocumentEditorLoaded() {
    if (TXTextControl != undefined) {
      try {
        TXTextControl.addEventListener('ribbonTabsLoaded', () => (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
          console.log('Loading the json data now');
          this.loadJsonData();
        }));
      } catch (error) {
        window.location.reload();
      }
    }
  }
  createTemplate(input) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      yield this.getFileContent(input, this.store);
    });
  }
  getFileContent(input, store) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      let result = yield TXTextControl.saveDocument(TXTextControl.StreamType.WordprocessingML, function (e) {
        console.log('in the file content', e);
        input.attachment = e.data;
        input.code = JSON.stringify(input.code);
        store.createTemplateEffect(input);
        return e.data;
      });
      return result;
    });
  }
  loadJsonData() {
    var _a;
    console.log('loading data now', this.model.code);
    let arr;
    if ((_a = this.model.code) === null || _a === void 0 ? void 0 : _a.length) {
      arr = this.model.code;
    } else {
      arr = [this.model.code];
    }
    if (TXTextControl) {
      console.log('loading data now', this.model.code);
      TXTextControl.loadJsonData(JSON.stringify(arr));
    }
  }
  onCloseDocument() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {});
  }
  ngOnDestroy() {
    //removeEditorFromDom()
  }
}
WebTemplateCreateComponent.ɵfac = function WebTemplateCreateComponent_Factory(t) {
  return new (t || WebTemplateCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_template_create_store__WEBPACK_IMPORTED_MODULE_3__.WebTemplateCreateStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService));
};
WebTemplateCreateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebTemplateCreateComponent,
  selectors: [["ng-component"]],
  hostBindings: function WebTemplateCreateComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("txDocumentEditorLoaded", function WebTemplateCreateComponent_txDocumentEditorLoaded_HostBindingHandler($event) {
        return ctx.onTxDocumentEditorLoaded($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"]);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_web_template_create_store__WEBPACK_IMPORTED_MODULE_3__.WebTemplateCreateStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], [1, "w-full", "flex", "flex-col"], ["title", "Create Template", "linkPath", "..", "linkTitle", "Back", 1, "w-full"], ["direction", "horizontal", 1, "w-full", "flex-1", "flex", "flex-row", 3, "useTransition", "unit"], [3, "order", "size"], [1, "dark:bg-gray-800", "px-6", "py-4", "rounded-md"], [3, "fields", "model", "submitForm"], [1, "flex", "flex-row"], [1, "flex", "w-full"], [1, "flex-none", "space-x-2"], ["label", "Load Data", "type", "button", 3, "click"], ["label", "Submit", "type", "submit"], [3, "order"], ["width", "1000px", "height", "90vh", "oauthClientID", "dsserver.N1iQJDbpsexFM1a3nBkMUD172Ukcg5nf", "oauthClientSecret", "PIaXRPf2cCQ7z1LT4yGns3cKznD1bI5S", 1, "w-full", 3, "serviceURL"]],
  template: function WebTemplateCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebTemplateCreateComponent_ng_container_0_Template, 14, 8, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__.WebUiButtonComponent, _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__.WebUiFormComponent, angular_split__WEBPACK_IMPORTED_MODULE_9__.SplitComponent, angular_split__WEBPACK_IMPORTED_MODULE_9__.SplitAreaDirective, _ui_page_header_src_lib_web_ui_page_header_component__WEBPACK_IMPORTED_MODULE_10__.WebUiPageHeaderComponent, _txtextcontrol_tx_ng_ds_document_editor__WEBPACK_IMPORTED_MODULE_11__.DocumentEditorComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 671872:
/*!******************************************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-create/web-template-create.module.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateCreateModule": () => (/* binding */ WebTemplateCreateModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var angular_split__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-split */ 180926);
/* harmony import */ var _web_template_create_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./web-template-create.component */ 771987);
/* harmony import */ var _txtextcontrol_tx_ng_ds_document_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @txtextcontrol/tx-ng-ds-document-editor */ 121124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);












class WebTemplateCreateModule {}
WebTemplateCreateModule.ɵfac = function WebTemplateCreateModule_Factory(t) {
  return new (t || WebTemplateCreateModule)();
};
WebTemplateCreateModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebTemplateCreateModule
});
WebTemplateCreateModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, angular_split__WEBPACK_IMPORTED_MODULE_6__.AngularSplitModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_7__.WebUiPageHeaderModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild([{
    path: '',
    component: _web_template_create_component__WEBPACK_IMPORTED_MODULE_9__.WebTemplateCreateComponent
  }]), _txtextcontrol_tx_ng_ds_document_editor__WEBPACK_IMPORTED_MODULE_10__.DocumentEditorModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebTemplateCreateModule, {
    declarations: [_web_template_create_component__WEBPACK_IMPORTED_MODULE_9__.WebTemplateCreateComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, angular_split__WEBPACK_IMPORTED_MODULE_6__.AngularSplitModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_7__.WebUiPageHeaderModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule, _txtextcontrol_tx_ng_ds_document_editor__WEBPACK_IMPORTED_MODULE_10__.DocumentEditorModule]
  });
})();

/***/ }),

/***/ 131345:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-create/web-template-create.store.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateCreateStore": () => (/* binding */ WebTemplateCreateStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 134793);







class WebTemplateCreateStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
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
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, (errors, loading, item) => ({
      errors,
      loading,
      item
    }), {
      debounce: true
    });
    this.createTemplateEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.data.userCreateTemplate({
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
WebTemplateCreateStore.ɵfac = function WebTemplateCreateStore_Factory(t) {
  return new (t || WebTemplateCreateStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_4__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute));
};
WebTemplateCreateStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: WebTemplateCreateStore,
  factory: WebTemplateCreateStore.ɵfac
});

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

/***/ }),

/***/ 121124:
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@txtextcontrol/tx-ng-ds-document-editor/fesm2020/txtextcontrol-tx-ng-ds-document-editor.mjs ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentEditorComponent": () => (/* binding */ DocumentEditorComponent),
/* harmony export */   "DocumentEditorModule": () => (/* binding */ DocumentEditorModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);




const _c0 = ["txDocumentEditorContainer"];
const _c1 = function (a0, a1) {
  return {
    "width": a0,
    "height": a1,
    "display": "inline-block"
  };
};
class DocumentEditorComponent {
  constructor(hostElement) {
    this.hostElement = hostElement;
    this.editMode = 'Edit';
    this.contextMenusEnabled = true;
    this.formattingPrinter = '';
    this.culture = '';
    this.uiCulture = '';
    this.userNames = [];
    this.reconnectTimeout = 0;
    this.customQueryParams = {};
  }
  ngOnInit() {
    // Remove confidential information before rendering the page
    this.hostElement.nativeElement.removeAttribute("oauthClientID");
    this.hostElement.nativeElement.removeAttribute("oauthClientSecret");
    if (!this.serviceURL.toLowerCase().startsWith('http://') && !this.serviceURL.toLowerCase().startsWith('https://')) {
      throw new Error(`Invalid service URL ${this.serviceURL}`);
    }
  }
  ngAfterViewInit() {
    this.init();
  }
  init() {
    // Dynamically add necessary script to dom
    let elemScript = document.createElement('script');
    elemScript.src = `${this.serviceURL}/documenteditor/JS/ds-server-document-editor.js`;
    elemScript.addEventListener("load", () => {
      // Fire "editor loaded" event (TXTextControl object exists from now on)
      var evt = new CustomEvent("dsDocumentEditorLoaded", {
        detail: {/* Empty event argument */}
      });
      document.dispatchEvent(evt);
      // Initialize editor
      let settings = {
        containerID: 'txDocumentEditorContainer',
        serviceURL: this.serviceURL,
        editorSettings: {
          culture: this.culture,
          uiCulture: this.uiCulture,
          editMode: DocumentEditorComponent.editModeFromString(this.editMode),
          contextMenusEnabled: this.contextMenusEnabled,
          formattingPrinter: this.formattingPrinter,
          reconnectTimeout: this.reconnectTimeout,
          userNames: this.userNames,
          customQueryParams: this.customQueryParams
        }
      };
      if (this.accessToken) {
        settings.authSettings = {
          accessToken: this.accessToken
        };
      } else if (this.oauthClientID) {
        settings.authSettings = {
          clientId: this.oauthClientID,
          clientSecret: this.oauthClientSecret
        };
      }
      TXTextControl.init(settings);
      if (this.documentData) {
        TXTextControl.addEventListener('textControlLoaded', () => {
          let streamType = DocumentEditorComponent.streamTypeFromDocumentFileFormat(this.documentFileFormat);
          TXTextControl.loadDocument(streamType, this.documentData);
        });
      }
      if (this.jsonData) {
        TXTextControl.addEventListener('ribbonTabsLoaded', () => {
          TXTextControl.loadJsonData(this.jsonData);
        });
      }
    });
    this.containerDiv.nativeElement.appendChild(elemScript);
  }
  static editModeFromString(value) {
    switch (value) {
      case 'Edit':
        return 1;
      case 'ReadAndSelect':
        return 2;
      case 'ReadOnly':
        return 3;
      case 'UsePassword':
        return 2048;
    }
    return 1; // EditMode.Edit
  }

  static streamTypeFromDocumentFileFormat(value) {
    switch (value.trim().toUpperCase()) {
      case 'HTML':
        return 4;
      // StreamType.HTMLFormat
      case 'RTF':
        return 8;
      // StreamType.RichTextFormat
      case 'TXT':
        return 16;
      // StreamType.PlainText
      case 'TX':
        return 32;
      // StreamType.InternalUnicodeFormat
      case 'DOC':
        return 64;
      // StreamType.MSWord
      case 'PDF':
        return 512;
      // StreamType.AdobePDF
      case 'DOCX':
        return 1024;
      // StreamType.WordprocessingML
      case 'XLSX':
        return 4096;
      // StreamType.SpreadsheetML
    }

    return 4; // StreamType.HTMLFormat
  }
}

DocumentEditorComponent.ɵfac = function DocumentEditorComponent_Factory(t) {
  return new (t || DocumentEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
DocumentEditorComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: DocumentEditorComponent,
  selectors: [["tx-ds-document-editor"]],
  viewQuery: function DocumentEditorComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerDiv = _t.first);
    }
  },
  inputs: {
    width: "width",
    height: "height",
    documentData: "documentData",
    documentFileFormat: "documentFileFormat",
    jsonData: "jsonData",
    serviceURL: "serviceURL",
    editMode: "editMode",
    contextMenusEnabled: "contextMenusEnabled",
    formattingPrinter: "formattingPrinter",
    culture: "culture",
    uiCulture: "uiCulture",
    userNames: "userNames",
    reconnectTimeout: "reconnectTimeout",
    oauthClientID: "oauthClientID",
    oauthClientSecret: "oauthClientSecret",
    accessToken: "accessToken",
    customQueryParams: "customQueryParams"
  },
  decls: 2,
  vars: 4,
  consts: [["id", "txDocumentEditorContainer", 3, "ngStyle"], ["txDocumentEditorContainer", ""]],
  template: function DocumentEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](1, _c1, ctx.width, ctx.height));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgStyle]
});
DocumentEditorComponent.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: DocumentEditorComponent,
  factory: DocumentEditorComponent.ɵfac
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DocumentEditorComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'tx-ds-document-editor',
      template: "<div id=\"txDocumentEditorContainer\" #txDocumentEditorContainer [ngStyle]=\"{ 'width': width, 'height': height, 'display': 'inline-block' }\">\r\n</div>"
    }]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, {
    containerDiv: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['txDocumentEditorContainer', {
        static: true
      }]
    }],
    width: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    height: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    documentData: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    documentFileFormat: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    jsonData: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    serviceURL: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    editMode: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    contextMenusEnabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    formattingPrinter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    culture: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    uiCulture: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    userNames: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    reconnectTimeout: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    oauthClientID: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    oauthClientSecret: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    accessToken: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    customQueryParams: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
class DocumentEditorModule {}
DocumentEditorModule.ɵfac = function DocumentEditorModule_Factory(t) {
  return new (t || DocumentEditorModule)();
};
DocumentEditorModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: DocumentEditorModule
});
DocumentEditorModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DocumentEditorModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [DocumentEditorComponent],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
      exports: [DocumentEditorComponent]
    }]
  }], null, null);
})();

/*
 * Public API Surface of tx-ng-ds-document-editor
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=txtextcontrol-tx-ng-ds-document-editor.mjs.map

/***/ })

}]);