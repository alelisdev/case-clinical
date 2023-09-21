"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_ui_file-preview_web-ui-file-preview_module_ts"],{

/***/ 5551:
/*!*******************************************************************!*\
  !*** ./libs/web/ui/file-preview/web-ui-file-preview.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiFilePreviewComponent": () => (/* binding */ WebUiFilePreviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _toast_src__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../toast/src */ 971873);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 311481);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-extended-pdf-viewer */ 803930);
/* harmony import */ var _button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);

















const _c0 = ["documentTpl"];
function WebUiFilePreviewComponent_ng_container_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4)(1, "a", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_0_div_2_Template_a_click_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const file_r7 = restoredCtx.$implicit;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.openDocument(file_r7, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const file_r7 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("download", file_r7 == null ? null : file_r7.name)("formControl", ctx_r6.formControl)("formlyAttributes", ctx_r6.field)("matTooltip", file_r7 == null ? null : file_r7.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r6.getAbbrName(file_r7 == null ? null : file_r7.name), " ");
  }
}
function WebUiFilePreviewComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_container_0_div_2_Template, 4, 5, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.documents);
  }
}
function WebUiFilePreviewComponent_ng_container_1_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const doc_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background-image", "url(" + doc_r15.attachment + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", doc_r15.attachment, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function WebUiFilePreviewComponent_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_1_ng_container_1_div_1_Template, 2, 3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r15 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r15.extension.split("/")[0] === "image");
  }
}
function WebUiFilePreviewComponent_ng_container_1_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r14.loadingText, " ");
  }
}
function WebUiFilePreviewComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_1_ng_container_1_Template, 2, 1, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiFilePreviewComponent_ng_container_1_ng_template_3_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r1.avatarImage))("ngIfElse", _r13);
  }
}
function WebUiFilePreviewComponent_ng_container_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4)(1, "a", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_2_div_2_Template_a_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r20.openDocument(ctx_r20.documents, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("download", ctx_r18.documents == null ? null : ctx_r18.documents.name)("formControl", ctx_r18.formControl)("formlyAttributes", ctx_r18.field)("matTooltip", ctx_r18.documents == null ? null : ctx_r18.documents.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r18.getAbbrName(ctx_r18.documents == null ? null : ctx_r18.documents.name), " ");
  }
}
function WebUiFilePreviewComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_container_2_div_2_Template, 4, 5, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.documents == null ? null : ctx_r2.documents.id);
  }
}
function WebUiFilePreviewComponent_ng_template_3_div_0_div_1_ui_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_template_3_div_0_div_1_ui_button_5_Template_ui_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r32);
      const doc_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r30.download(doc_r24));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiFilePreviewComponent_ng_template_3_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18)(1, "span", 19, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUiFilePreviewComponent_ng_template_3_div_0_div_1_ui_button_5_Template, 1, 0, "ui-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ui-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_template_3_div_0_div_1_Template_ui_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35);
      const ref_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ref_r22.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const doc_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", doc_r24 == null ? null : doc_r24.name.split(".")[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r25.getAbbrName(doc_r24 == null ? null : doc_r24.name.split(".")[0]));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r25.isDownloadable && doc_r24.extension.split("/")[0] === "image");
  }
}
function WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 24)(2, "ngx-extended-pdf-viewer", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("progress", function WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_3_Template_ngx_extended_pdf_viewer_progress_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r38);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r37.progressLog($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-progress-bar", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const doc_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r26.loading ? "opacity-0" : "opacity-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("base64Src", ctx_r26.getDataUrl(doc_r24 == null ? null : doc_r24.attachment))("useBrowserLocale", true)("textLayer", false)("enableDragAndDrop", false)("showHandToolButton", true)("showOpenFileButton", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r26.loading ? "flex" : "hidden");
  }
}
function WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const doc_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
    const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r40.safeUrl(doc_r24.attachment), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_4_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29)(1, "p", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "This image is invalid.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_4_div_1_Template, 2, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_4_div_2_Template, 3, 0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r27.validImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r27.validImage);
  }
}
function WebUiFilePreviewComponent_ng_template_3_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_template_3_div_0_div_1_Template, 7, 3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_3_Template, 5, 8, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WebUiFilePreviewComponent_ng_template_3_div_0_ng_container_4_Template, 3, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const doc_r24 = ctx.ngIf;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r23.mode !== "avatar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r24.extension === "application/pdf");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", doc_r24.extension.split("/")[0] === "image");
  }
}
function WebUiFilePreviewComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebUiFilePreviewComponent_ng_template_3_div_0_Template, 5, 3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx_r4.document));
  }
}
function WebUiFilePreviewComponent_ng_container_5_div_1_ng_container_1_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 42)(2, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_5_div_1_ng_container_1_ng_container_9_Template_img_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r51);
      const i_r49 = restoredCtx.index;
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r50.setCurrent(i_r49));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const img_r48 = ctx.$implicit;
    const i_r49 = ctx.index;
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", i_r49 === ctx_r47.currentGalleryIndex ? "border border-blue-500" : "opacity-50");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r47.safeUrl(img_r48 == null ? null : img_r48.attachment), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function WebUiFilePreviewComponent_ng_container_5_div_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 35)(2, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_5_div_1_ng_container_1_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r52.setPrevious());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiFilePreviewComponent_ng_container_5_div_1_ng_container_1_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53);
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r54.setNext());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "svg", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "path", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WebUiFilePreviewComponent_ng_container_5_div_1_ng_container_1_ng_container_9_Template, 3, 2, "ng-container", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background-image", "url(" + ctx_r44.getCurrentGallery() + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r44.galleryImages);
  }
}
function WebUiFilePreviewComponent_ng_container_5_div_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h4", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "No Images Uploaded");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiFilePreviewComponent_ng_container_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_5_div_1_ng_container_1_Template, 10, 3, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_container_5_div_1_ng_template_2_Template, 2, 0, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r43.galleryImages.length > 0)("ngIfElse", _r45);
  }
}
function WebUiFilePreviewComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_5_div_1_Template, 4, 2, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.galleryImages);
  }
}
class WebUiFilePreviewComponent {
  getEventLog(data) {
    // console.log('event called' ,data)
  }
  constructor(dialog, webData, toast, el, sanitized, ref) {
    this.dialog = dialog;
    this.webData = webData;
    this.toast = toast;
    this.el = el;
    this.sanitized = sanitized;
    this.ref = ref;
    this.isDownloadable = false;
    this.mode = 'default';
    this.loadingText = '';
    this.document = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
    this.avatarImage = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
    this.show = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
    this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.fetchedDocs = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.hideButtonEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._loading = false;
    this.currentGalleryIndex = 0;
    this.galleryImages = [];
    this.document.subscribe(doc => {
      var _a, _b;
      // console.log(doc)
      if (!doc) return;
      if (doc.attachment && doc.attachment != '') {
        try {
          this.validImage = !((_a = doc.attachment) !== null && _a !== void 0 ? _a : 'null').includes('null');
        } catch (e) {
          this.validImage = false;
        }
        if (doc.extension === 'application/pdf') {
          this.openDialog();
          this._loading = true;
        } else if (((_b = doc.extension) === null || _b === void 0 ? void 0 : _b.split('/')[0]) === 'image') {
          this.openDialog('lg');
        } else {
          const downloadLink = document.createElement('a');
          downloadLink.href = doc.attachment;
          downloadLink.download = doc.name;
          downloadLink.click();
          this.toast.warning('Only PDF and Image View are supported for now'); // Add Downlaod functionality
        }
      } else if (doc.id) {
        // its from server
        this.getDoc(doc.id);
      }
    });
  }
  ngOnInit() {
    if (this.mode === 'avatar' && !Array.isArray(this.documents)) {
      // make sure its an avatar and a single upload Document object
      //this.getDoc(this.avatarImage)
    } else if (this.mode === 'gallery' && Array.isArray(this.documents) && this.documents.length > 0) {
      // const docs = this.documents.filter(ele=>{
      //   if(this.documents[0].id) return true;
      //   return false;
      // })
      // this.getDocs(docs.map(ele=>ele.id), this.fetchedDocs);
      // console.log(this.fetchedDocs)
      // this.fetchedDocs.subscribe(val=>{
      //   this.galleryImages = val.filter(ele=>{return ele?.extension?.split('/')[0] === 'image'})
      //   if(this.galleryImages.length<1) this.hideButtonEvent.emit(true);
      //   this.ref.detectChanges()
      //   //console.log(this.galleryImages)
      // })
    }
  }
  getAbbrName(s) {
    const maxLength = 30; //30 Characters + ... returned
    if (!s) return '';
    return s.length > 30 ? s.slice(0, 30) + '...' : s;
  }
  get loading() {
    return this._loading;
  }
  getDataUrl(s) {
    return s.split('base64,')[1];
  }
  download(doc) {
    const downloadLink = document.createElement('a');
    downloadLink.href = doc.attachment;
    downloadLink.download = doc.name;
    downloadLink.click();
  }
  openDocument(file, e) {
    e.stopImmediatePropagation();
    console.log(file);
    this.document.next(file);
  }
  progressLog(e) {
    var _a;
    if (((_a = e === null || e === void 0 ? void 0 : e.source) === null || _a === void 0 ? void 0 : _a.downloadComplete) === false) {
      let int = setInterval(() => {
        if (e.source.downloadComplete === true) {
          this._loading = false;
          clearInterval(int);
        }
      }, 150);
    }
  }
  openDialog(size = 'xxl') {
    this.dialog.open(this.documentTpl, {
      size: size,
      resizable: false,
      closeButton: false
    });
  }
  closeDialog(e) {
    this.dialog.closeAll();
  }
  safeUrl(url) {
    const imageUrl = this.sanitized.bypassSecurityTrustUrl(url);
    return imageUrl;
  }
  getDoc(documentId, customSubject) {
    this.webData.getDocument(documentId).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_3__.tapResponse)(document => {
      if (customSubject) customSubject.next(document);else this.document.next(document);
      this.destroy$.next(true);
    }, errors => {
      this.toast.error(errors.message || 'error while fetching data');
      this.destroy$.next(true);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.destroy$)).subscribe();
  }
  getDocs(docIds, customSubject) {
    const temp = [];
    docIds.forEach(docId => {
      const destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
      this.webData.getDocument(docId).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_3__.tapResponse)(document => {
        temp.push(document);
        customSubject === null || customSubject === void 0 ? void 0 : customSubject.next(temp);
        destroy$.next(true);
      }, errors => {
        this.toast.error(errors.message || 'error while fetching data');
        destroy$.next(true);
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(destroy$)).subscribe();
    });
  }
  ngAfterViewChecked() {}
  getCurrentGallery() {
    var _a;
    if (!this.currentGalleryIndex && this.galleryImages.length > 0) this.currentGalleryIndex = 0;
    console.log(this.currentGalleryIndex);
    return (_a = this.galleryImages[this.currentGalleryIndex]) === null || _a === void 0 ? void 0 : _a.attachment;
  }
  setCurrent(i) {
    this.currentGalleryIndex = i;
  }
  setPrevious() {
    if (this.currentGalleryIndex > 0) this.currentGalleryIndex -= 1;else this.currentGalleryIndex = this.galleryImages.length - 1;
  }
  setNext() {
    if (this.currentGalleryIndex < this.galleryImages.length - 1) this.currentGalleryIndex += 1;else this.currentGalleryIndex = 0;
  }
}
WebUiFilePreviewComponent.ɵfac = function WebUiFilePreviewComponent_Factory(t) {
  return new (t || WebUiFilePreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_5__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_toast_src__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
WebUiFilePreviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiFilePreviewComponent,
  selectors: [["ui-file-preview"]],
  viewQuery: function WebUiFilePreviewComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.documentTpl = _t.first);
    }
  },
  inputs: {
    isDownloadable: "isDownloadable",
    documents: "documents",
    mode: "mode",
    loadingText: ["textWhileLoading", "loadingText"]
  },
  outputs: {
    hideButtonEvent: "hideButton"
  },
  decls: 6,
  vars: 4,
  consts: [[4, "ngIf"], ["documentTpl", ""], [1, "flex", "flex-wrap", "gap-2", "items-stretch"], ["class", "rounded-xl p-2.5 bg-stone-200", 4, "ngFor", "ngForOf"], [1, "rounded-xl", "p-2.5", "bg-stone-200"], ["webUiFormFieldFile", "", "ngDefaultControl", "", 1, "text-blue-500", "no-underline", "hover:cursor-pointer", "break-all", 3, "download", "formControl", "formlyAttributes", "matTooltip", "click"], ["tooltip", "matTooltip"], [4, "ngIf", "ngIfElse"], ["whileLoading", ""], ["class", "h-full w-full center-image", 3, "backgroundImage", 4, "ngIf"], [1, "h-full", "w-full", "center-image"], [1, "w-full", "h-auto", 3, "src"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "overflow-hidden", "font-bold", "leading-none", "text-gray-600", "uppercase", "bg-gray-200", "rounded", "text-2xl", "dark:bg-gray-700", "dark:text-gray-200"], ["class", "rounded-xl p-2.5 bg-stone-200", 4, "ngIf"], ["class", "flex flex-col flex-grow overflow-y-auto", 4, "ngIf"], [1, "flex", "flex-col", "flex-grow", "overflow-y-auto"], ["class", "flex justify-between px-3 py-3", 4, "ngIf"], [1, "flex-grow", "flex-shrink-0", "basis-200px", "basis", "relative"], [1, "flex", "justify-between", "px-3", "py-3"], [1, "text-xl", "font-bold", "truncate", 3, "matTooltip"], [1, "flex", "items-center", "gap-4"], ["label", "Download", "variant", "Default", 3, "click", 4, "ngIf"], ["label", "Close", "variant", "white", 3, "click"], ["label", "Download", "variant", "Default", 3, "click"], [1, "h-full", "w-full", 3, "ngClass"], [3, "base64Src", "useBrowserLocale", "textLayer", "enableDragAndDrop", "showHandToolButton", "showOpenFileButton", "progress"], [1, "w-full", "h-full", "absolute", "top-0", "left-0", 3, "ngClass"], ["mode", "indeterminate"], ["class", "overflow-x-auto flex h-full items-center justify-center p-2", 4, "ngIf"], [1, "overflow-x-auto", "flex", "h-full", "items-center", "justify-center", "p-2"], ["alt", "Image from server", 1, "h-full", "w-full", "minImage", 3, "src"], [1, "text-5xl", "bg-cyan-400", "p-5", "rounded-md", "text-white"], ["class", "w-full my-4 mx-2", 4, "ngIf"], [1, "w-full", "my-4", "mx-2"], ["noImages", ""], [1, "w-full", "flex", "items-stretch", "justify-between", "current-image-gallery", "h-100", "transition-all"], [1, "px-4", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor", 1, "w-10", "h-10"], ["fill-rule", "evenodd", "fill", "#3B82F6", "d", "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "fill", "#3B82F6", "d", "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z", "clip-rule", "evenodd"], [1, "w-full", "flex", "flex-wrap", "justify-center", "gap-2", "items-center", "py-2", "px-4", "my-4"], [4, "ngFor", "ngForOf"], [1, "h-12", "transition-all", "rounded", "p-1", 3, "ngClass"], ["alt", "thumbnail", 1, "h-full", "w-auto", 3, "src", "click"], [1, "text-gray-500", "text-center", "text-2xl", "font-semibold"]],
  template: function WebUiFilePreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebUiFilePreviewComponent_ng_container_0_Template, 3, 1, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiFilePreviewComponent_ng_container_1_Template, 5, 4, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiFilePreviewComponent_ng_container_2_Template, 3, 1, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiFilePreviewComponent_ng_template_3_Template, 2, 3, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUiFilePreviewComponent_ng_container_5_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.documents && ctx.documents.length > 0 && ctx.mode === "default");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mode === "avatar");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mode === "edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.mode === "gallery");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_10__.NgxExtendedPdfViewerComponent, _button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_11__.WebUiButtonComponent, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__.MatProgressBar, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__.MatTooltip, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe],
  styles: [".basis-200px[_ngcontent-%COMP%] {\n  flex-basis: 20rem;\n}", ".minImage[_ngcontent-%COMP%] {\n  min-width: 200px;\n  max-height: 800px;\n}", "ngx-extended-pdf-viewer .toolbarField.pageNumber.visiblePageIsLoading {\n  background: transparent !important;\n}", "ngx-extended-pdf-viewer .toolbarField.pageNumber {\n  text-align: center !important;\n  margin: 5px 0 !important;\n}", "ngx-extended-pdf-viewer #scaleSelectContainer select {\n  width: 120px !important;\n  padding-left: 15px;\n}", ".toolbarButton svg {\n  height: calc(100% - 5px) !important;\n  width: auto !important;\n  margin: 0 auto !important;\n}", "ngx-extended-pdf-viewer #secondaryToolbarButtonContainer {\n  display: flex !important;\n  flex-direction: column !important;\n  padding: 10px 0;\n}", "ngx-extended-pdf-viewer #secondaryToolbarButtonContainer button {\n  width: auto !important;\n}", "ngx-extended-pdf-viewer div.zoom {\n  height: 600px !important;\n  width: 1450px !important;\n}", ".mat-tooltip {\n  word-break: break-all !important;\n  white-space: normal !important;\n  \n}", "ngx-extended-pdf-viewer #numPages {\n  padding-top: 1px;\n}", ".center-image {\n  background-position: center !important;\n  background-size: cover !important;\n  background-repeat: no-repeat !important;\n}\n\n  ngneat-dialog .ngneat-dialog-backdrop {\n  z-index: 998 !important;\n}", "ui-file-preview .ngneat-dialog-content {\n  width: 80% !important;\n}", ".gallery-wrapper[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 50px;\n}\n\n.current-image-gallery[_ngcontent-%COMP%] {\n  background-position: center !important;\n  background-size: contain !important;\n  background-repeat: no-repeat !important;\n}"]
});

/***/ }),

/***/ 442875:
/*!****************************************************************!*\
  !*** ./libs/web/ui/file-preview/web-ui-file-preview.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiFilePreviewModule": () => (/* binding */ WebUiFilePreviewModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web-ui-file-preview.component */ 5551);
/* harmony import */ var ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-extended-pdf-viewer */ 803930);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);







class WebUiFilePreviewModule {}
WebUiFilePreviewModule.ɵfac = function WebUiFilePreviewModule_Factory(t) {
  return new (t || WebUiFilePreviewModule)();
};
WebUiFilePreviewModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiFilePreviewModule
});
WebUiFilePreviewModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_2__.NgxExtendedPdfViewerModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__.MatProgressBarModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__.MatTooltipModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiFilePreviewModule, {
    declarations: [_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_6__.WebUiFilePreviewComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, ngx_extended_pdf_viewer__WEBPACK_IMPORTED_MODULE_2__.NgxExtendedPdfViewerModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__.MatProgressBarModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__.MatTooltipModule],
    exports: [_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_6__.WebUiFilePreviewComponent]
  });
})();

/***/ })

}]);